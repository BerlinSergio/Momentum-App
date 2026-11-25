/**
 * Cross-database restore coordinator.
 *
 * IndexedDB cannot atomically commit two independent databases. To make
 * crashes recoverable, persist the wallpaper preimage in momentum_app_db,
 * write the wallpaper DB, then atomically commit the main DB records AND
 * delete the pending journal in one main-DB transaction.
 *
 * Invariant:
 * - Journal present: main-db restore has NOT committed; roll wallpapers back.
 * - Journal absent after a successful final commit: both databases committed.
 *
 * Browser Web Locks serialize recovery and restores across same-origin tabs.
 * Without Web Locks we fail closed for cross-DB restore/recovery, but ordinary
 * main-DB-only operations remain available when no journal exists.
 */
import {
  beginRestoreJournal,
  clearRestoreJournal,
  commitRestoreBatch,
  getPendingRestoreJournal,
  getCommittedBackupSnapshot,
} from '../storage/db.js';
import {
  commitWallpaperRestoreBatch,
  getAllCustomWallpapersForBackup,
  restoreWallpaperPreimage,
} from './wallpaperStorage.js';

const LOCK_NAME = 'momentum-cross-db-restore-v1';

function lockManager() {
  return globalThis.navigator?.locks || globalThis.window?.navigator?.locks || null;
}

function makeRestoreToken() {
  const provider = globalThis.crypto || globalThis.window?.crypto;
  if (!provider?.getRandomValues) {
    throw new Error('Cross-database restore requires cryptographic random identifiers');
  }
  const bytes = provider.getRandomValues(new Uint8Array(20));
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

function recoveryError(message, cause) {
  const error = new Error(message, cause ? { cause } : undefined);
  error.code = 'RESTORE_RECOVERY_REQUIRED';
  return error;
}

/**
 * Assumes exclusive LOCK_NAME is held. Fail before opening any app screen if
 * wallpaper preimages cannot be fully restored and the journal cleared.
 */
async function recoverUnlocked() {
  const pending = await getPendingRestoreJournal();
  if (!pending) return { recovered: false };
  if (pending.status !== 'pending' || !pending.token ||
      !Array.isArray(pending.wallpaperBefore)) {
    throw recoveryError('Unknown restore journal format: manual recovery required');
  }

  const ok = await restoreWallpaperPreimage(pending.wallpaperBefore);
  if (ok !== true) {
    throw recoveryError('Interrupted restore: wallpaper rollback failed; data is still protected by the journal');
  }
  if ((await clearRestoreJournal(pending.token)) !== true) {
    throw recoveryError('Interrupted restore: could not durably clear recovery journal');
  }
  return { recovered: true };
}

/**
 * Called at startup BEFORE Zustand hydration, and available to backup flows.
 * An absent Web Locks API is acceptable only when there is no pending journal.
 */
export async function recoverInterruptedRestore() {
  const manager = lockManager();
  if (!manager?.request) {
    const pending = await getPendingRestoreJournal();
    if (pending) {
      throw recoveryError('Cannot safely recover cross-database restore without Web Locks');
    }
    return { recovered: false };
  }
  return manager.request(LOCK_NAME, { mode: 'exclusive' }, recoverUnlocked);
}

/**
 * Take a backup snapshot under one origin-wide exclusive lock. Recovery,
 * domain/attachment readonly transaction and strict wallpaper read all happen
 * before releasing the lock; expensive Blob conversion/encryption happens later.
 *
 * Without Web Locks we cannot stop a cross-database restore in another tab
 * while collecting the two database snapshots. Refuse an apparently complete
 * encrypted backup rather than silently combining two different versions.
 */
export async function captureCoordinatedBackupSnapshot() {
  const manager = lockManager();
  if (!manager?.request) {
    const error = new Error('Backup requires browser Web Locks to capture consistent data across databases');
    error.code = 'BACKUP_LOCKS_UNAVAILABLE';
    throw error;
  }
  return manager.request(LOCK_NAME, { mode: 'exclusive' }, async () => {
    await recoverUnlocked();
    const main = await getCommittedBackupSnapshot();
    const wallpapers = await getAllCustomWallpapersForBackup();
    return { ...main, wallpapers };
  });
}

/** Commit ordinary main-DB restore under the same lock when available. */
export async function commitCoordinatedMainRestore({ stores, attachments }) {
  const manager = lockManager();
  const commit = async () => {
    await recoverUnlocked();
    return commitRestoreBatch({ stores, attachments });
  };
  if (manager?.request) {
    return manager.request(LOCK_NAME, { mode: 'exclusive' }, commit);
  }
  // No cross-database restore can be initiated without Web Locks, so only
  // fail closed if an unfinished journal already exists.
  if (await getPendingRestoreJournal()) {
    throw recoveryError('Pending restore journal requires browser Web Locks to recover');
  }
  return commitRestoreBatch({ stores, attachments });
}

/**
 * Recoverable two-database restore. The final/main commit also clears the
 * journal atomically. If interrupted at any earlier step, the journal remains
 * on disk and the next startup will restore the wallpaper preimage.
 */
export async function commitCoordinatedCrossDbRestore({ stores, attachments, wallpapers }) {
  if (!Array.isArray(wallpapers) || !wallpapers.length ||
      wallpapers.some(wp => !wp || typeof wp.id !== 'string' || !wp.id ||
        typeof wp.dataUrl !== 'string' || !wp.dataUrl) ||
      new Set(wallpapers.map(wp => wp.id)).size !== wallpapers.length) {
    throw new TypeError('Invalid cross-database wallpaper restore input');
  }
  const manager = lockManager();
  if (!manager?.request) {
    const error = new Error('Cross-database restore needs Web Locks; refusing unsafe partial restore');
    error.code = 'RESTORE_LOCKS_UNAVAILABLE';
    throw error;
  }

  return manager.request(LOCK_NAME, { mode: 'exclusive' }, async () => {
    await recoverUnlocked();

    // Snapshot precisely the wallpaper IDs we will overwrite.
    // The full read is strict: errors may not be treated as empty wallpaper data.
    const current = await getAllCustomWallpapersForBackup();
    const byId = new Map(current.map(item => [item.id, item]));
    const wallpaperBefore = wallpapers.map(wp => ({
      id: wp.id, previous: byId.get(wp.id) || null,
    }));
    const token = makeRestoreToken();

    if ((await beginRestoreJournal({ token, wallpaperBefore })) !== true) {
      throw recoveryError('Failed to durably create recovery journal before modifying wallpapers');
    }
    try {
      if ((await commitWallpaperRestoreBatch(wallpapers)) !== true) {
        throw new Error('Wallpaper restore transaction was not committed');
      }
      // The journal deletion and all main-db modifications are one transaction.
      const committed = await commitRestoreBatch({
        stores, attachments, restoreJournalToken: token,
      });
      if (committed !== true) {
        throw new Error('Main database restore transaction aborted');
      }
      return true;
    } catch (error) {
      try {
        await recoverUnlocked();
      } catch (rollbackFailure) {
        throw recoveryError(
          'Restore could not finish and automatic wallpaper recovery failed; app startup must retry before using data',
          rollbackFailure
        );
      }
      throw error;
    }
  });
}
