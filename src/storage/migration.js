/**
 * Momentum Non-Destructive Storage Migration Engine
 * Migrates legacy localStorage records into durable IndexedDB storage without deleting
 * or corrupting existing user records. Fully idempotent and safe against mid-run interruptions.
 */

import { getStoreItem, setStoreItem, getMigrationMeta, setMigrationMeta } from './db.js';
import { migrateLegacyNoteAttachments } from './attachmentStorage.js';

export const CURRENT_SCHEMA_VERSION = 1;
export const MIGRATION_KEY = 'schema_version';

export const LEGACY_STORAGE_KEYS = [
  { key: 'momentum-finance-storage', fallbackKey: 'momentum-finance-storage-v6', domain: 'finance' },
  { key: 'momentum-notes-storage', domain: 'notes', hasAttachments: true },
  { key: 'momentum-task-storage', domain: 'tasks' },
  { key: 'momentum-routine-storage', domain: 'routines' },
  { key: 'momentum-calendar-storage-v1', domain: 'calendar' },
  { key: 'momentum-prayer-storage', domain: 'prayer' },
  { key: 'momentum-location-storage', domain: 'location' },
  { key: 'momentum-tasbeeh-storage', domain: 'tasbeeh' },
  { key: 'momentum-security-storage', domain: 'security' },
  { key: 'momentum-profile-storage', domain: 'profile' },
  { key: 'momentum_settings_store', domain: 'settings' },
  { key: 'momentum_appearance_settings_v1', domain: 'theme' },
  { key: 'momentum-navigation-storage', domain: 'navigation' },
  { key: 'momentum-time-storage', domain: 'time' },
  { key: 'momentum-locale-storage', domain: 'locale' },
];

/**
 * Execute the non-destructive migration process from localStorage to IndexedDB.
 *
 * @returns {Promise<{ success: boolean, migratedCount: number, skippedCount: number, details: Object }>}
 */
export async function runStorageMigration() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { success: true, migratedCount: 0, skippedCount: 0, details: { reason: 'No localStorage available' } };
  }

  try {
    // 1. Check if migration has already been verified and completed
    const existingMeta = await getMigrationMeta(MIGRATION_KEY);
    if (existingMeta && existingMeta.version >= CURRENT_SCHEMA_VERSION && existingMeta.status === 'completed') {
      return {
        success: true,
        migratedCount: 0,
        skippedCount: LEGACY_STORAGE_KEYS.length,
        details: { alreadyCompleted: true, version: existingMeta.version },
      };
    }

    const migrationSummary = {
      migrated: [],
      skipped: [],
      errors: [],
    };

    // 2. Iterate through all legacy keys without touching or deleting original records
    for (const item of LEGACY_STORAGE_KEYS) {
      const { key, fallbackKey, domain, hasAttachments } = item;

      // Check if already present in destination IndexedDB
      const existingInIdb = await getStoreItem(key);
      if (existingInIdb && existingInIdb.state) {
        // Sanitize any existing plaintext security credentials in IndexedDB
        if (domain === 'security' && (existingInIdb.state.pin || existingInIdb.state.alphanumeric)) {
          const hasPin = Boolean(
            existingInIdb.state.hasPin ||
            (existingInIdb.state.pin && String(existingInIdb.state.pin).trim().length === 4)
          );
          const sanitizedRecord = {
            ...existingInIdb,
            state: {
              ...existingInIdb.state,
              pin: '',
              alphanumeric: '',
              hasPin,
            },
          };
          await setStoreItem(key, sanitizedRecord);
        }
        migrationSummary.skipped.push({ key, reason: 'Already in IndexedDB' });
        continue;
      }

      // Read from localStorage (trying primary key, then fallback key)
      let rawData = window.localStorage.getItem(key);
      let usedKey = key;
      if (!rawData && fallbackKey) {
        rawData = window.localStorage.getItem(fallbackKey);
        usedKey = fallbackKey;
      }

      if (!rawData) {
        migrationSummary.skipped.push({ key, reason: 'Not in localStorage' });
        continue;
      }

      try {
        const parsed = JSON.parse(rawData);
        let transformedState = parsed;

        // If security domain, strip plaintext PIN and credentials before persisting into IndexedDB
        if (domain === 'security' && parsed?.state) {
          const hasPin = Boolean(
            parsed.state.hasPin ||
            (parsed.state.pin && String(parsed.state.pin).trim().length === 4)
          );
          transformedState = {
            ...parsed,
            state: {
              ...parsed.state,
              pin: '',
              alphanumeric: '',
              hasPin,
            },
          };
        }

        // If notes domain, extract embedded Data URLs into durable attachments
        if (hasAttachments && parsed?.state?.notes) {
          const migratedNotes = await migrateLegacyNoteAttachments(parsed.state.notes);
          transformedState = {
            ...parsed,
            state: {
              ...parsed.state,
              notes: migratedNotes,
            },
          };
        }

        // Write to IndexedDB
        const writeSuccess = await setStoreItem(key, transformedState, {
          migratedFrom: usedKey,
          domain,
          migratedAt: Date.now(),
        });

        if (writeSuccess) {
          migrationSummary.migrated.push({
            key,
            domain,
            recordCount: getDomainRecordCount(domain, transformedState),
          });
        } else {
          migrationSummary.errors.push({ key, error: 'IndexedDB write failed' });
        }
      } catch (err) {
        console.warn(`[Migration] Error migrating key "${key}":`, err);
        migrationSummary.errors.push({ key, error: String(err) });
      }
    }

    // 3. Verify destination integrity
    const hasCriticalErrors = migrationSummary.errors.length > 0;
    if (!hasCriticalErrors) {
      await setMigrationMeta(MIGRATION_KEY, {
        version: CURRENT_SCHEMA_VERSION,
        status: 'completed',
        completedAt: new Date().toISOString(),
        summary: migrationSummary,
      });
    }

    return {
      success: !hasCriticalErrors,
      migratedCount: migrationSummary.migrated.length,
      skippedCount: migrationSummary.skipped.length,
      details: migrationSummary,
    };
  } catch (fatalErr) {
    console.error('[Migration] Fatal migration engine exception:', fatalErr);
    return {
      success: false,
      migratedCount: 0,
      skippedCount: 0,
      details: { fatalError: String(fatalErr) },
    };
  }
}

/**
 * Helper to count records inside domain state for migration verification reporting.
 */
function getDomainRecordCount(domain, parsed) {
  const state = parsed?.state || parsed;
  if (!state) return 0;
  switch (domain) {
    case 'finance':
      return (state.transactions?.length || 0) + (state.incomes?.length || 0) + (state.accounts?.length || 0);
    case 'notes':
      return state.notes?.length || 0;
    case 'tasks':
      return state.tasks?.length || 0;
    case 'routines':
      return state.routines?.length || 0;
    case 'calendar':
      return state.events?.length || 0;
    case 'prayer':
      return Object.keys(state.prayerLogs || {}).length;
    case 'tasbeeh':
      return (state.customDhikr?.length || 0) + (state.sessions?.length || 0);
    default:
      return 1;
  }
}
