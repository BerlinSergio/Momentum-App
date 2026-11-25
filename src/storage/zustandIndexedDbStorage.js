/**
 * Momentum Zustand IndexedDB Storage Adapter
 * Provides asynchronous, transactional persistence backed by IndexedDB with
 * serialized FIFO write queues and a post-commit localStorage mirror.
 */

import {
  getStoreItem, setStoreItem, removeStoreItem,
  getCommittedStoreRecord, compareAndSwapDomainStore, GUARDED_DOMAINS,
} from './db.js';

const TASK_STORE = 'momentum-task-storage';
const NOTES_STORE = 'momentum-notes-storage';
const FINANCE_STORE = 'momentum-finance-storage';
const guardedFailures = new Map();

/** Retained in this tab until reload, never stored in localStorage. */
export function getTaskStorageFailure() {
  return guardedFailures.get(TASK_STORE) || null;
}

export function getDomainStorageFailure() {
  return [...guardedFailures.entries()].reverse()
    .find(([domain]) => domain !== TASK_STORE)?.[1] || null;
}

function notifyDomainStorageFailure(domain, error) {
  if (!guardedFailures.has(domain)) {
    guardedFailures.set(domain, {
      domain,
      code: error?.code || 'DOMAIN_STORAGE_UNAVAILABLE',
      message: error?.message || 'Stored data could not be safely saved',
    });
  }
  const detail = guardedFailures.get(domain);
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' &&
      typeof CustomEvent !== 'undefined') {
    window.dispatchEvent(new CustomEvent('momentum:domain-storage-failure', { detail }));
    // Preserve the Phase 2.12 task-specific event for consumers.
    if (domain === TASK_STORE) {
      window.dispatchEvent(new CustomEvent('momentum:task-storage-failure', { detail }));
    }
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
  const { mirrorToLocalStorage = true, optimisticTaskWrites = false, optimisticDomains = [] } = options;
  if (!Array.isArray(optimisticDomains) ||
      optimisticDomains.some(name => !GUARDED_DOMAINS.includes(name))) {
    throw new TypeError('Guarded storage domains must be an allowlisted array');
  }
  const guardedNames = new Set([
    ...optimisticDomains,
    ...(optimisticTaskWrites ? [TASK_STORE] : []),
  ]);
  // Each adapter instance owns its baseline, captured from a completed IDB
  // readonly transaction at coordinated hydration or after a successful CAS.
  const baselines = new Map();
  const isGuarded = name => guardedNames.has(name);

  const persistedState = value => {
    try {
      const decoded = typeof value === 'string' ? JSON.parse(value) : value;
      return decoded && typeof decoded.state === 'object' && decoded.state
        ? decoded.state : {};
    } catch { return {}; }
  };

  // Transient editor/hydration fields must not bump durable revision IDs.
  // Preserve unknown fields (including new finance fields), so future domain
  // changes are not silently dropped as 'no-op' writes.
  const durableProjection = (name, value) => {
    const state = { ...persistedState(value) };
    delete state._hasHydrated;
    if (name === TASK_STORE) {
      return { tasks: Array.isArray(state.tasks) ? state.tasks : [] };
    }
    if (name === NOTES_STORE) {
      delete state.activeNoteId;
      delete state.activeAttachmentId;
      if (!Array.isArray(state.notes)) state.notes = [];
      if (state.reflectionStreak === undefined) state.reflectionStreak = 0;
    }
    if (name === FINANCE_STORE) {
      delete state.editingIncome;
      delete state.editingTransaction;
      delete state.pendingTransactionType;
      for (const field of ['accounts', 'transactions', 'incomes', 'budgets']) {
        if (!Array.isArray(state[field])) state[field] = [];
      }
      if (state.monthlyBudgetCap === undefined) state.monthlyBudgetCap = { AFN: 0, USD: 0 };
      if (state.savingsTarget === undefined) state.savingsTarget = null;
    }
    return state;
  };
  const sameDomainContent = (name, a, b) => {
    try {
      return JSON.stringify(durableProjection(name, a)) ===
             JSON.stringify(durableProjection(name, b));
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
          baselines.set(name, record);
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
          const existingFailure = guardedFailures.get(name);
          if (existingFailure) {
            const error = new Error(existingFailure.message);
            error.code = existingFailure.code;
            throw error;
          }
          if (!baselines.has(name)) {
            const error = new Error('Guarded write rejected before authoritative IndexedDB hydration for ' + name);
            error.code = name === TASK_STORE ? 'TASK_HYDRATION_REQUIRED' : 'DOMAIN_HYDRATION_REQUIRED';
            notifyDomainStorageFailure(name, error);
            throw error;
          }
          const previous = baselines.get(name);
          // Editor-only state changes do not supersede committed user records.
          if (sameDomainContent(name, parsed, previous?.value)) return true;
          try {
            const committed = await compareAndSwapDomainStore(name, parsed, previous);
            baselines.set(name, committed);
          } catch (error) {
            notifyDomainStorageFailure(name, error);
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
        // Never let reset/removeItem bypass guarded domain CAS.
        if (isGuarded(name)) {
          const error = new Error('Deleting a guarded domain requires an audited conflict-aware reset: ' + name);
          error.code = name === TASK_STORE ? 'TASK_DELETE_UNSUPPORTED' : 'DOMAIN_DELETE_UNSUPPORTED';
          notifyDomainStorageFailure(name, error);
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
