/**
 * Momentum Zustand IndexedDB Storage Adapter
 * Provides asynchronous, transactional persistence backed by IndexedDB with
 * serialized FIFO write queues and a post-commit localStorage mirror.
 */

import { getStoreItem, setStoreItem, removeStoreItem } from './db.js';

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
 * @param {string} [options.legacyLocalStorageKey] - Retained for caller compatibility; migration is separate
 * @param {boolean} [options.mirrorToLocalStorage=true] - Mirror committed small payloads only
 */
export function createIndexedDbStorage(options = {}) {
  const { mirrorToLocalStorage = true } = options;

  return {
    /**
     * Retrieve persisted state string.
     */
    getItem: async (name) => {
      try {
        // IndexedDB is authoritative. Only runStorageMigration may import
        // legacy localStorage: otherwise stale mirrors can revive deleted data.
        const idbValue = await getStoreItem(name);
        if (idbValue === null || idbValue === undefined) return null;
        return typeof idbValue === 'string' ? idbValue : JSON.stringify(idbValue);
      } catch (err) {
        console.warn(`[Momentum Storage] IndexedDB read failed for "${name}":`, err);
        // Propagate failures: a missing record is not the same as a failed read.
        throw err;
      }
    },

    /**
     * Persist state string with queued FIFO serialization.
     */
    setItem: async (name, value) => {
      return enqueueWrite(name, async () => {
        let parsed;
        try {
          parsed = typeof value === 'string' ? JSON.parse(value) : value;
        } catch {
          parsed = value;
        }
        const ok = await setStoreItem(name, parsed);
        if (ok !== true) {
          throw new Error(`[Momentum Storage] Durable save failed for store "${name}"`);
        }

        // Mirror only committed data, never speculative changes from an
        // aborted transaction. The mirror is not authoritative on next boot.
        if (mirrorToLocalStorage && typeof window !== 'undefined' && window.localStorage) {
          try {
            window.localStorage.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
          } catch (mirrorError) {
            console.warn('[Momentum Storage] Local mirror unavailable:', mirrorError);
          }
        }
        return true;
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
