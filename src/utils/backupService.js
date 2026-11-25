/**
 * Momentum Central Backup & Restore Service
 *
 * Implements genuine encrypted backup creation, file export, inspection,
 * preview, atomic main-database restoration, and attachment recovery.
 */

import {
  encryptBackupPayload,
  decryptBackupPayload,
  computeSha256,
  bufferToBase64,
  base64ToBuffer,
  constantTimeEqual,
} from './backupCrypto.js';

import {
  openAppDB,
  getAllStoreItems,
  getAllAttachmentRecords,
  commitRestoreBatch,
} from '../storage/db.js';

import { getAllCustomWallpapersForBackup } from './wallpaperStorage.js';
import {
  recoverInterruptedRestore,
  commitCoordinatedMainRestore,
  commitCoordinatedCrossDbRestore,
} from './crossDatabaseRestore.js';

// Specific store keys containing durable user data
export const SUPPORTED_BACKUP_STORES = [
  'momentum-finance-storage',
  'momentum-notes-storage',
  'momentum-task-storage',
  'momentum-routine-storage',
  'momentum-calendar-storage-v1',
  'momentum-tasbeeh-storage',
  'momentum-prayer-storage',
  'momentum-location-storage',
  'momentum-profile-storage',
  'momentum_settings_store',
  'momentum_appearance_settings_v1',
  'momentum-time-storage',
  'momentum-locale-storage',
];

/**
 * Convert a Blob into a Base64 string
 */
async function blobToBase64(blob) {
  if (!blob) return '';
  if (typeof blob === 'string') return blob;
  const arrayBuffer = await blob.arrayBuffer();
  return bufferToBase64(arrayBuffer);
}

/**
 * Reconstruct a Blob from Base64 string and MIME type
 */
function base64ToBlob(base64, mimeType = 'application/octet-stream') {
  const bytes = base64ToBuffer(base64);
  return new Blob([bytes], { type: mimeType });
}

/**
 * Safely parse store payload whether it is stored as JSON string or object
 */
function parseStoreValue(raw) {
  if (!raw) return null;
  if (typeof raw === 'object') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * 1. CREATE BACKUP PACKAGE
 *
 * Extracts all authoritative committed data from IndexedDB, bundles attachments
 * with SHA-256 checksums, and encrypts the entire package with AES-256-GCM.
 *
 * @param {string} passphrase - User backup passphrase
 * @param {Object} [options]
 * @returns {Promise<Object>} Result object with encrypted envelope and manifest
 */
export async function createBackupPackage(passphrase, options = {}) {
  const onProgress = typeof options.onProgress === 'function' ? options.onProgress : () => {};

  onProgress({ stage: 'COLLECTING_RECORDS', percent: 15, message: 'Collecting application records...' });

  // Never export a plausible but incomplete backup from volatile memory.
  if (!(await openAppDB())) throw new Error('Backup unavailable: IndexedDB cannot be opened safely');
  // A pending cross-DB journal means wallpaper changes may be uncommitted.
  // Reconcile first rather than encrypting a mixture of old and new records.
  await recoverInterruptedRestore();
  // 1. Read all authoritative records from IndexedDB 'stores' table
  const allDbStores = await getAllStoreItems();

  const domains = {};
  const recordCounts = {
    tasks: 0,
    routines: 0,
    notes: 0,
    transactions: 0,
    accounts: 0,
    incomes: 0,
    expenses: 0,
    attachments: 0,
    customWallpapers: 0,
    tasbeehItems: 0,
    calendarEvents: 0,
  };

  for (const storeKey of SUPPORTED_BACKUP_STORES) {
    let storeRecord = parseStoreValue(allDbStores[storeKey]);

    // LocalStorage mirrors are not authoritative after migration; never
    // silently resurrect deleted/stale data into an encrypted backup.
    if (storeRecord && storeRecord.state) {
      // Security Exclusion: Never export credentials or active lock state
      const sanitizedState = { ...storeRecord.state };
      delete sanitizedState.pin;
      delete sanitizedState.alphanumeric;
      delete sanitizedState.hasPin;
      delete sanitizedState.isLocked;
      delete sanitizedState.biometricsEnabled;

      domains[storeKey] = {
        state: sanitizedState,
        version: storeRecord.version ?? 0,
      };

      // Calculate record counts
      if (Array.isArray(sanitizedState.tasks)) {
        recordCounts.tasks += sanitizedState.tasks.length;
      }
      if (Array.isArray(sanitizedState.routines)) {
        recordCounts.routines += sanitizedState.routines.length;
      }
      if (Array.isArray(sanitizedState.notes)) {
        recordCounts.notes += sanitizedState.notes.length;
      }
      if (Array.isArray(sanitizedState.transactions)) {
        recordCounts.transactions += sanitizedState.transactions.length;
      }
      if (Array.isArray(sanitizedState.accounts)) {
        recordCounts.accounts += sanitizedState.accounts.length;
      }
      if (Array.isArray(sanitizedState.incomes)) {
        recordCounts.incomes += sanitizedState.incomes.length;
      }
      if (Array.isArray(sanitizedState.expenses)) {
        recordCounts.expenses += sanitizedState.expenses.length;
      }
      if (Array.isArray(sanitizedState.dhikrItems)) {
        recordCounts.tasbeehItems += sanitizedState.dhikrItems.length;
      }
      if (Array.isArray(sanitizedState.events)) {
        recordCounts.calendarEvents += sanitizedState.events.length;
      }
    }
  }

  onProgress({ stage: 'COLLECTING_ATTACHMENTS', percent: 40, message: 'Bundling binary attachments...' });

  // 2. Collect all durable binary attachments
  const rawAttachments = await getAllAttachmentRecords();
  const bundledAttachments = [];
  const attachmentChecksums = {};

  for (const att of rawAttachments) {
    if (!att || !att.id) {
      throw new Error('Backup aborted: an attachment record is missing its id');
    }
    try {
      let base64Bytes = '';
      let sha256 = '';

      if (att.blob instanceof Blob) {
        base64Bytes = await blobToBase64(att.blob);
        sha256 = await computeSha256(att.blob);
      } else if (typeof att.blob === 'string' && att.blob.startsWith('data:')) {
        const rawBlob = base64ToBlob(att.blob.split(',')[1], att.mimeType);
        base64Bytes = att.blob.split(',')[1];
        sha256 = await computeSha256(rawBlob);
      }

      if (!base64Bytes) {
        throw new Error(`Attachment ${att.id} has no readable binary data`);
      }

      if (base64Bytes) {
        bundledAttachments.push({
          id: att.id,
          noteId: att.noteId || null,
          fileName: att.fileName || att.name || 'attachment',
          name: att.name || att.fileName || 'attachment',
          mimeType: att.mimeType || 'application/octet-stream',
          sizeBytes: att.sizeBytes || 0,
          type: att.type || 'document',
          createdAt: att.createdAt || new Date().toISOString(),
          base64Bytes,
          sha256,
        });

        attachmentChecksums[att.id] = {
          sha256,
          sizeBytes: att.sizeBytes || 0,
          mimeType: att.mimeType,
          fileName: att.fileName || att.name,
        };
      }
    } catch (attErr) {
      throw new Error(`Backup aborted: attachment ${att.id} could not be bundled`, { cause: attErr });
    }
  }
  recordCounts.attachments = bundledAttachments.length;

  onProgress({ stage: 'COLLECTING_WALLPAPERS', percent: 65, message: 'Packaging custom media...' });

  // 3. Collect custom wallpapers
  const rawWallpapers = await getAllCustomWallpapersForBackup();
  const customWallpapers = (rawWallpapers || []).map((w) => ({
    id: w.id,
    dataUrl: w.dataUrl,
    meta: w.meta || {},
  }));
  recordCounts.customWallpapers = customWallpapers.length;

  onProgress({ stage: 'ENCRYPTING', percent: 80, message: 'Encrypting backup with AES-256-GCM...' });

  // 4. Construct unencrypted payload with integrity manifest
  const payload = {
    manifest: {
      version: 1,
      appVersion: '1.0.0',
      createdAt: new Date().toISOString(),
      recordCounts,
      attachmentChecksums,
    },
    domains,
    attachments: bundledAttachments,
    customWallpapers,
  };

  const payloadJson = JSON.stringify(payload);

  // 5. Encrypt using AES-256-GCM envelope encryption
  const envelope = await encryptBackupPayload(payloadJson, passphrase);

  onProgress({ stage: 'COMPLETE', percent: 100, message: 'Encrypted backup ready.' });

  return {
    success: true,
    envelope,
    serialized: JSON.stringify(envelope, null, 2),
    manifest: payload.manifest,
  };
}

/**
 * 2. EXPORT BACKUP FILE (Web & Native)
 *
 * Saves or downloads the encrypted backup file to the user's device.
 */
export async function exportBackupToFile(envelope, customFilename = null) {
  const jsonString = typeof envelope === 'string' ? envelope : JSON.stringify(envelope, null, 2);
  const dateStr = new Date().toISOString().slice(0, 10);
  const timeStr = new Date().toISOString().slice(11, 16).replace(':', '');
  const fileName = customFilename || `momentum_backup_${dateStr}_${timeStr}.momentum-backup`;

  // 1. Web browser download mechanism
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(url), 1500);

    return {
      success: true,
      fileName,
      sizeBytes: blob.size,
      exportedAt: new Date().toISOString(),
    };
  }

  throw new Error('File export environment unavailable');
}

/**
 * 3. INSPECT BACKUP FILE (No Passphrase Required)
 *
 * Safely inspects the outer envelope of a backup file without decrypting its contents.
 */
export function inspectBackupFile(fileContent) {
  let envelope;
  try {
    envelope = typeof fileContent === 'string' ? JSON.parse(fileContent) : fileContent;
  } catch {
    return { valid: false, error: 'File is not valid JSON' };
  }

  if (!envelope || typeof envelope !== 'object') {
    return { valid: false, error: 'Invalid backup envelope structure' };
  }

  if (envelope.envelope && typeof envelope.envelope === 'object') {
    envelope = envelope.envelope;
  }

  if (envelope.format !== 'momentum-backup') {
    return { valid: false, error: `Invalid format: Expected "momentum-backup", got "${envelope.format}"` };
  }

  if (typeof envelope.version !== 'number' || envelope.version > 1) {
    return { valid: false, error: `Unsupported backup version: ${envelope.version}` };
  }

  return {
    valid: true,
    format: envelope.format,
    version: envelope.version,
    appVersion: envelope.appVersion || 'Unknown',
    createdAt: envelope.createdAt,
    kdfAlgorithm: envelope.kdf?.algorithm || 'PBKDF2-SHA256',
    kdfIterations: envelope.kdf?.iterations || 0,
    cipher: envelope.encryption?.cipher || 'AES-256-GCM',
    hasPayload: Boolean(envelope.encryptedPayload && envelope.wrappedKey),
  };
}

/**
 * 4. DECRYPT AND PREVIEW BACKUP
 *
 * Decrypts the backup envelope with the user's passphrase and extracts
 * the integrity manifest and domain counts for pre-restore confirmation.
 */
export async function decryptAndPreviewBackup(fileContent, passphrase) {
  const decrypted = await decryptBackupPayload(fileContent, passphrase);

  const manifest = decrypted.manifest || {};
  const recordCounts = manifest.recordCounts || {};

  // Extract non-sensitive profile summary
  const profileState = decrypted.domains?.['momentum-profile-storage']?.state || {};

  const computedRecordCounts = {
    tasks: recordCounts.tasks || (decrypted.domains?.['momentum-task-storage']?.state?.tasks || []).length,
    routines: recordCounts.routines || (decrypted.domains?.['momentum-routine-storage']?.state?.routines || []).length,
    notes: recordCounts.notes || (decrypted.domains?.['momentum-notes-storage']?.state?.notes || []).length,
    transactions: recordCounts.transactions || (decrypted.domains?.['momentum-finance-storage']?.state?.transactions || []).length,
    accounts: recordCounts.accounts || (decrypted.domains?.['momentum-finance-storage']?.state?.accounts || []).length,
    attachments: recordCounts.attachments || (decrypted.attachments || []).length,
    customWallpapers: recordCounts.customWallpapers || (decrypted.customWallpapers || []).length,
    tasbeehItems: recordCounts.tasbeehItems || (decrypted.domains?.['momentum-tasbeeh-storage']?.state?.dhikrItems || []).length,
    calendarEvents: recordCounts.calendarEvents || (decrypted.domains?.['momentum-calendar-storage-v1']?.state?.events || []).length,
  };

  return {
    success: true,
    valid: true,
    manifest,
    recordCounts: computedRecordCounts,
    summary: computedRecordCounts,
    preview: {
      createdAt: manifest.createdAt,
      sourceVersion: manifest.appVersion || '1.0.0',
      profileName: profileState.fullName || 'User',
      recordCounts: computedRecordCounts,
    },
    rawDecrypted: decrypted,
  };
}

/**
 * 5. RESTORE BACKUP (Staged, Atomic & Non-Destructive)
 *
 * Restores records and durable attachments.
 * In 'merge' mode: combines backup data with local data without duplicates or double-counting.
 * Enforces strict verification of attachment SHA-256 hashes and rehydrates Zustand stores.
 *
 * @param {string|Object} fileContent - Backup envelope
 * @param {string} passphrase - User backup passphrase
 * @param {Object} [options]
 * @param {'merge'|'replace'} [options.mode='merge']
 * @returns {Promise<Object>} Restoration summary
 */
export async function restoreBackup(fileContent, passphrase, options = {}) {
  const mode = options.mode || 'merge';
  const onProgress = typeof options.onProgress === 'function' ? options.onProgress : () => {};

  onProgress({ stage: 'DECRYPTING', percent: 10, message: 'Authenticating and decrypting backup...' });

  // 1. Decrypt and validate backup envelope
  const decrypted = await decryptBackupPayload(fileContent, passphrase);
  if (!decrypted.domains || typeof decrypted.domains !== 'object') {
    throw new Error('Corrupted backup payload: Missing domains data');
  }

  onProgress({ stage: 'VALIDATING_ATTACHMENTS', percent: 25, message: 'Verifying attachment integrity...' });

  // 2. Validate all attachment SHA-256 checksums before touching any database records
  const attachments = Array.isArray(decrypted.attachments) ? decrypted.attachments : [];
  for (const att of attachments) {
    const rawBase64 = att.base64Bytes || att.dataBase64;
    if (rawBase64 && att.sha256) {
      const blob = base64ToBlob(rawBase64, att.mimeType || att.type);
      const computedHash = await computeSha256(blob);
      if (!constantTimeEqual(computedHash, att.sha256)) {
        const err = new Error(`Attachment verification failed for "${att.name || att.id}": Checksum mismatch`);
        err.code = 'ATTACHMENT_CHECKSUM_MISMATCH';
        throw err;
      }
    }
  }

  onProgress({ stage: 'CREATING_SNAPSHOT', percent: 40, message: 'Taking pre-restore safety snapshot...' });

  // Never accept a volatile-only restoration or an incomplete safety snapshot.
  if (!(await openAppDB())) throw new Error('Restore unavailable: IndexedDB cannot be opened safely');
  // 3. Staging Snapshot: Read all existing stores to enable safe rollback if restoration fails
  const existingStores = await getAllStoreItems();
  // Prepare ALL mutations before opening a write transaction. No partial
  // domain is visible to another reader while a restore batch is staged.
  const stagedStores = [];
  const stagedAttachments = [];

  onProgress({ stage: 'MERGING_RECORDS', percent: 60, message: 'Staging data records...' });

  try {
    // 4. Process and stage each supported domain
    for (const storeKey of SUPPORTED_BACKUP_STORES) {
      const backupDomain = decrypted.domains[storeKey];
      if (!backupDomain || !backupDomain.state) continue;

      const backupState = backupDomain.state;
      const currentRaw = existingStores[storeKey];
      const currentState = parseStoreValue(currentRaw)?.state || {};

      let finalState = { ...currentState };

      if (mode === 'replace') {
        // Replace mode: Adopt backup state entirely
        finalState = { ...backupState };
      } else {
        // MERGE MODE: Deterministic domain reconciliation

        if (storeKey === 'momentum-task-storage') {
          // Tasks: Merge by ID, new tasks added, subtasks merged
          const currentTasks = Array.isArray(currentState.tasks) ? [...currentState.tasks] : [];
          const currentMap = new Map(currentTasks.map((t) => [t.id, t]));

          for (const bTask of backupState.tasks || []) {
            if (!currentMap.has(bTask.id)) {
              currentTasks.push(bTask);
            } else {
              // Existing task: Merge subtasks
              const existing = currentMap.get(bTask.id);
              const subtaskMap = new Map((existing.subtasks || []).map((s) => [s.id, s]));
              for (const bSub of bTask.subtasks || []) {
                if (!subtaskMap.has(bSub.id)) {
                  existing.subtasks = [...(existing.subtasks || []), bSub];
                }
              }
            }
          }
          finalState.tasks = currentTasks;
        } else if (storeKey === 'momentum-routine-storage') {
          // Routines: Merge by ID and merge completion history date-by-date
          const currentRoutines = Array.isArray(currentState.routines) ? [...currentState.routines] : [];
          const routineMap = new Map(currentRoutines.map((r) => [r.id, r]));

          for (const bRoutine of backupState.routines || []) {
            if (!routineMap.has(bRoutine.id)) {
              currentRoutines.push(bRoutine);
            } else {
              const existing = routineMap.get(bRoutine.id);
              const mergedHistory = {
                ...(bRoutine.completedDates || bRoutine.completionHistory || bRoutine.history || {}),
                ...(existing.completedDates || existing.completionHistory || existing.history || {}),
              };
              existing.completedDates = mergedHistory;
              existing.completionHistory = mergedHistory;
              existing.history = mergedHistory;
            }
          }
          finalState.routines = currentRoutines;
        } else if (storeKey === 'momentum-notes-storage') {
          // Notes: Merge by ID
          const currentNotes = Array.isArray(currentState.notes) ? [...currentState.notes] : [];
          const noteMap = new Map(currentNotes.map((n) => [n.id, n]));

          for (const bNote of backupState.notes || []) {
            if (!noteMap.has(bNote.id)) {
              currentNotes.push(bNote);
            }
          }
          finalState.notes = currentNotes;

          // Merge categories
          const cats = new Set([...(currentState.categories || []), ...(backupState.categories || [])]);
          finalState.categories = Array.from(cats);
        } else if (storeKey === 'momentum-finance-storage') {
          // Finance: Merge accounts, incomes, expenses, and transactions by stable ID
          // Prevents duplicate transactions and prevents balance double-counting!
          const currentAccounts = Array.isArray(currentState.accounts) ? [...currentState.accounts] : [];
          const accountMap = new Map(currentAccounts.map((a) => [a.id, a]));
          for (const bAcc of backupState.accounts || []) {
            if (!accountMap.has(bAcc.id)) {
              currentAccounts.push(bAcc);
            }
          }
          finalState.accounts = currentAccounts;

          const currentTx = Array.isArray(currentState.transactions) ? [...currentState.transactions] : [];
          const txMap = new Map(currentTx.map((t) => [t.id, t]));
          for (const bTx of backupState.transactions || []) {
            if (!txMap.has(bTx.id)) {
              currentTx.push(bTx);
            }
          }
          finalState.transactions = currentTx;

          const currentIncomes = Array.isArray(currentState.incomes) ? [...currentState.incomes] : [];
          const incMap = new Map(currentIncomes.map((i) => [i.id, i]));
          for (const bInc of backupState.incomes || []) {
            if (!incMap.has(bInc.id)) {
              currentIncomes.push(bInc);
            }
          }
          finalState.incomes = currentIncomes;

          const currentExpenses = Array.isArray(currentState.expenses) ? [...currentState.expenses] : [];
          const expMap = new Map(currentExpenses.map((e) => [e.id, e]));
          for (const bExp of backupState.expenses || []) {
            if (!expMap.has(bExp.id)) {
              currentExpenses.push(bExp);
            }
          }
          finalState.expenses = currentExpenses;

          // Merge budgets & savings goals
          const currentBudgets = Array.isArray(currentState.budgets) ? [...currentState.budgets] : [];
          const bgtMap = new Map(currentBudgets.map((b) => [b.id, b]));
          for (const bBgt of backupState.budgets || []) {
            if (!bgtMap.has(bBgt.id)) {
              currentBudgets.push(bBgt);
            }
          }
          finalState.budgets = currentBudgets;

          const currentGoals = Array.isArray(currentState.savingsGoals) ? [...currentState.savingsGoals] : [];
          const goalMap = new Map(currentGoals.map((g) => [g.id, g]));
          for (const bGoal of backupState.savingsGoals || []) {
            if (!goalMap.has(bGoal.id)) {
              currentGoals.push(bGoal);
            }
          }
          finalState.savingsGoals = currentGoals;
        } else if (storeKey === 'momentum-tasbeeh-storage') {
          // Tasbeeh: Merge custom items and logs
          const currentDhikr = Array.isArray(currentState.dhikrItems) ? [...currentState.dhikrItems] : [];
          const dhikrMap = new Map(currentDhikr.map((d) => [d.id, d]));
          for (const bDhikr of backupState.dhikrItems || []) {
            if (!dhikrMap.has(bDhikr.id)) {
              currentDhikr.push(bDhikr);
            }
          }
          finalState.dhikrItems = currentDhikr;

          const currentLogs = Array.isArray(currentState.historyLogs) ? [...currentState.historyLogs] : [];
          const logMap = new Map(currentLogs.map((l) => [l.id || l.timestamp, l]));
          for (const bLog of backupState.historyLogs || []) {
            const key = bLog.id || bLog.timestamp;
            if (!logMap.has(key)) {
              currentLogs.push(bLog);
            }
          }
          finalState.historyLogs = currentLogs;
        } else if (storeKey === 'momentum-prayer-storage') {
          // Prayer: Merge prayer completion history date-by-date
          finalState.prayerHistory = {
            ...(backupState.prayerHistory || {}),
            ...(currentState.prayerHistory || {}),
          };
          if (!currentState.calculationMethod && backupState.calculationMethod) {
            finalState.calculationMethod = backupState.calculationMethod;
          }
        } else if (storeKey === 'momentum-calendar-storage-v1') {
          // Calendar: Merge personal events by ID
          const currentEvents = Array.isArray(currentState.events) ? [...currentState.events] : [];
          const eventMap = new Map(currentEvents.map((e) => [e.id, e]));
          for (const bEvent of backupState.events || []) {
            if (!eventMap.has(bEvent.id)) {
              currentEvents.push(bEvent);
            }
          }
          finalState.events = currentEvents;
        } else if (storeKey === 'momentum-profile-storage') {
          // Profile: Restore user profile metadata
          finalState = {
            ...currentState,
            fullName: currentState.fullName || backupState.fullName || '',
            email: currentState.email || backupState.email || '',
            avatar: currentState.avatar || backupState.avatar || null,
            currency: currentState.currency || backupState.currency,
            timezone: currentState.timezone || backupState.timezone,
            city: currentState.city || backupState.city,
            setupCompleted: true,
            onboardingStep: 'completed',
          };
        } else {
          // Settings, appearance, time
          finalState = {
            ...backupState,
            ...currentState,
          };
        }
      }

      // Security isolation guard: Never overwrite security secrets!
      delete finalState.pin;
      delete finalState.alphanumeric;

      const updatedPayload = {
        state: finalState,
        version: backupDomain.version ?? 0,
      };

      if (options._simulateWriteError) {
        throw new Error('SIMULATED_TRANSACTION_FAILURE_MID_RESTORE');
      }

      stagedStores.push({ name: storeKey, value: updatedPayload });
    }

    onProgress({ stage: 'STAGING_ATTACHMENTS', percent: 80, message: 'Staging verified binary attachments...' });

    // 5. Restore binary attachments into IndexedDB 'attachments' store
    for (const att of attachments) {
      if (att.id && att.base64Bytes) {
        const blob = base64ToBlob(att.base64Bytes, att.mimeType);
        const record = {
          id: att.id,
          noteId: att.noteId || null,
          fileName: att.fileName || att.name || 'attachment',
          name: att.name || att.fileName || 'attachment',
          mimeType: att.mimeType,
          sizeBytes: att.sizeBytes || blob.size,
          type: att.type || 'document',
          blob,
          createdAt: att.createdAt || new Date().toISOString(),
        };
        stagedAttachments.push(record);
      }
    }

    const customWallpapers = Array.isArray(decrypted.customWallpapers) ? decrypted.customWallpapers : [];
    if (customWallpapers.some(wp => !wp || typeof wp.id !== 'string' || !wp.id ||
        typeof wp.dataUrl !== 'string' || !wp.dataUrl) ||
        new Set(customWallpapers.map(wp => wp.id)).size !== customWallpapers.length) {
      throw new Error('Invalid custom wallpaper records in backup');
    }

    onProgress({ stage: 'COMMITTING', percent: 90, message: 'Committing recoverable backup restore...' });
    // The main DB remains atomic. For wallpaper restores the recovery journal
    // is persisted BEFORE separate-DB changes, and removed atomically only
    // with the final main-DB commit. Startup reverts any interrupted restore.
    const committed = customWallpapers.length > 0
      ? await commitCoordinatedCrossDbRestore({
          stores: stagedStores, attachments: stagedAttachments,
          wallpapers: customWallpapers,
        })
      : await commitCoordinatedMainRestore({
          stores: stagedStores, attachments: stagedAttachments,
        });
    if (committed !== true) {
      throw new Error('Restore aborted: atomic IndexedDB transaction failed; existing records were preserved');
    }
    // Update disposable mirrors only after a successful transaction commit.
    if (typeof localStorage !== 'undefined') {
      for (const { name, value } of stagedStores) {
        try { localStorage.setItem(name, JSON.stringify(value)); }
        catch { /* IndexedDB remains the single source of truth */ }
      }
    }

    onProgress({ stage: 'REHYDRATING', percent: 95, message: 'Rehydrating application state...' });

    // 7. Rehydrate in-memory Zustand persistent stores
    if (typeof window !== 'undefined') {
      try {
        const startup = await import('./startupController.js');
        await startup.hydrateAllStores(3000);
      } catch (hydrateErr) {
        console.warn('[BackupService] Rehydration warning:', hydrateErr);
      }
    }

    onProgress({ stage: 'COMPLETE', percent: 100, message: 'Restoration completed successfully!' });

    return {
      success: true,
      mode,
      restoredAt: new Date().toISOString(),
      manifest: decrypted.manifest,
    };
  } catch (restoreError) {
    // Main-db writes are one transaction. Cross-DB restores retain a
    // durable wallpaper recovery journal until main-db commit or rollback.
    console.error('[BackupService] Restore not completed:', restoreError);
    throw restoreError;
  }
}
