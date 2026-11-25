/**
 * Momentum Zustand IndexedDB Storage Adapter
 * Provides asynchronous, transactional persistence backed by IndexedDB with
 * serialized FIFO write queues and a post-commit localStorage mirror.
 */

import {
  getStoreItem, setStoreItem, removeStoreItem,
  getCommittedStoreRecord, compareAndSwapTaskStore,
} from './db.js';

const TASK_STORE = 'momentum-task-storage';
let taskStorageFailure = null;

/** A retained, non-sensitive warning until the user reloads authoritative data. */
export function getTaskStorageFailure() {
  return taskStorageFailure;
}

function notifyTaskStorageFailure(error) {
  if (!taskStorageFailure) {
    taskStorageFailure = {
      code: error?.code || 'TASK_STORAGE_UNAVAILABLE',
      message: error?.message || 'Task data could not be safely saved',
    };
  }
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' &&
      typeof CustomEvent !== 'undefined') {
    window.dispatchEvent(new CustomEvent('momentum:task-storage-failure', { detail: taskStorageFailure }));
  }
}


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
  const { mirrorToLocalStorage = true, optimisticTaskWrites = false } = options;
  // This baseline belongs to one tab/adapter instance and is obtained from
  // the committed IndexedDB record at coordinated hydration, never a mirror.
  let taskBaseline = undefined;
  const isGuarded = name => optimisticTaskWrites && name === TASK_STORE;
  const parsedState = value => {
    if (typeof value !== 'string') return value;
    try { return JSON.parse(value); } catch { return null; }
  };
  const sameTaskItems = (a, b) => {
    try {
      return JSON.stringify(parsedState(a)?.state?.tasks || []) ===
             JSON.stringify(parsedState(b)?.state?.tasks || []);
    } catch { return false; }
  };

  return {
    /**
     * Retrieve persisted state string.
     */
    getItem: async (name) => {
      try {
        // IndexedDB is authoritative. Only runStorageMigration may import
        // legacy localStorage: otherwise stale mirrors can revive deleted data.
        if (isGuarded(name)) {
          const record = await getCommittedStoreRecord(name);
          taskBaseline = record;
          if (!record) return null;
          const value = record.value;
          return typeof value === 'string' ? value : JSON.stringify(value);
        }
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
        if (isGuarded(name)) {
          if (taskStorageFailure) {
            const error = new Error(taskStorageFailure.message);
            error.code = taskStorageFailure.code;
            throw error;
          }
          if (taskBaseline === undefined) {
            const error = new Error('Task write rejected before authoritative IndexedDB hydration');
            error.code = 'TASK_HYDRATION_REQUIRED';
            notifyTaskStorageFailure(error);
            throw error;
          }
          // setHasHydrated/editingTaskId mutate transient in-memory state; they
          // must not cause a spurious whole-task-domain write or revision bump.
          if (sameTaskItems(parsed, taskBaseline?.value)) return true;

          try {
            const committed = await compareAndSwapTaskStore(name, parsed, taskBaseline);
            taskBaseline = committed;
          } catch (error) {
            notifyTaskStorageFailure(error);
            throw error;
          }
        } else {
          const ok = await setStoreItem(name, parsed);
          if (ok !== true) {
            throw new Error(`[Momentum Storage] Durable save failed for store "${name}"`);
          }
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
        // A stale tab must NEVER delete the entire current task record by
        // bypassing our compare-and-swap protocol.
        if (isGuarded(name)) {
          const error = new Error('Deleting the task domain requires a reviewed conflict-aware reset');
          error.code = 'TASK_DELETE_UNSUPPORTED';
          notifyTaskStorageFailure(error);
          throw error;
        }
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
