/**
 * Momentum Zustand IndexedDB Storage Adapter
 * Provides asynchronous, transactional persistence backed by IndexedDB with
 * serialized FIFO write queues and seamless localStorage fallback/fast-boot mirroring.
 */

import { getStoreItem, setStoreItem, removeStoreItem, getMigrationMeta } from './db.js';

// Per-key FIFO write queues to guarantee strict sequential consistency
const writeQueues = new Map();

/**
 * Enqueue a task to be executed sequentially for a specific key.
 */
function enqueueWrite(key, task) {
  const currentPromise = writeQueues.get(key) || Promise.resolve();
  const taskPromise = currentPromise.then(task);
  // Keep the queue alive for subsequent tasks by catching errors in the chained queue promise
  const queuePromise = taskPromise.catch((err) => {
    console.warn(`[Momentum Storage] Write error for key "${key}":`, err);
  });
  writeQueues.set(key, queuePromise);
  // Return the direct taskPromise so caller can await and detect failures
  return taskPromise;
}

/**
 * Creates a Zustand-compatible storage engine backed by IndexedDB.
 *
 * @param {Object} options
 * @param {string} [options.legacyLocalStorageKey] - Legacy key to check if IDB is empty
 * @param {boolean} [options.mirrorToLocalStorage=true] - Mirror small payloads to localStorage for instant boot
 */
export function createIndexedDbStorage(options = {}) {
  const { mirrorToLocalStorage = true } = options;

  return {
    /**
     * Retrieve persisted state string.
     */
    getItem: async (name) => {
      try {
        // 1. Try reading authoritative record from IndexedDB
        const idbValue = await getStoreItem(name);
        if (idbValue !== null && idbValue !== undefined) {
          // If stored as object/string, return as string for Zustand's JSON deserializer
          return typeof idbValue === 'string' ? idbValue : JSON.stringify(idbValue);
        }

        // 2. Check if migration has completed. If so, do NOT fall back to stale localStorage.
        const migMeta = await getMigrationMeta('schema_version');
        const isMigrated = migMeta && migMeta.status === 'completed';

        // 3. Fallback to localStorage only if migration has not yet completed
        if (!isMigrated && typeof window !== 'undefined' && window.localStorage) {
          const localVal = window.localStorage.getItem(name);
          if (localVal) {
            try {
              // Validate that localVal is valid JSON before seeding or returning
              JSON.parse(localVal);
              setStoreItem(name, localVal).catch((seedErr) => {
                console.warn('[Momentum Storage] Failed to seed IndexedDB from localStorage:', seedErr);
              });
              return localVal;
            } catch (parseErr) {
              console.warn(`[Momentum Storage] Corrupted localStorage record detected for "${name}", ignoring:`, parseErr);
              return null;
            }
          }
        }
      } catch (err) {
        console.warn(`[Momentum Storage] getItem error for "${name}":`, err);
        // Fallback to localStorage on error only if migration meta check allows
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(name);
        }
      }
      return null;
    },

    /**
     * Persist state string with queued FIFO serialization.
     */
    setItem: async (name, value) => {
      // 1. Synchronously mirror to localStorage if requested for zero-flicker reloads
      if (mirrorToLocalStorage && typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
        } catch {
          // QuotaExceededError or security block in iframe: ignore safely as IndexedDB is primary
        }
      }

      // 2. Queue authoritative transactional write to IndexedDB
      return enqueueWrite(name, async () => {
        let parsed;
        try {
          parsed = typeof value === 'string' ? JSON.parse(value) : value;
        } catch {
          // If JSON.parse fails, store raw value
          parsed = value;
        }
        const ok = await setStoreItem(name, parsed);
        if (ok === false) {
          throw new Error(`[Momentum Storage] Durable save failed for store "${name}"`);
        }
        return ok;
      });
    },

    /**
     * Remove persisted state.
     */
    removeItem: async (name) => {
      return enqueueWrite(name, async () => {
        // Do not erase the durable mirror until IndexedDB deletion commits.
        const ok = await removeStoreItem(name);
        if (ok !== true) {
          throw new Error(`[Momentum Storage] Durable delete failed for store "${name}"`);
        }
        if (typeof window !== 'undefined' && window.localStorage) {
          try {
            window.localStorage.removeItem(name);
          } catch (e) {
            console.warn('[Momentum Storage] Error removing localStorage item:', e);
          }
        }
      });
    },
  };
}
