/**
 * Momentum Central Database Service (IndexedDB)
 * High-performance, offline-first storage for structured data and binary attachments.
 * Bypasses the 5MB localStorage limit and provides durable, transactional storage.
 */

const DB_NAME = 'momentum_app_db';
const DB_VERSION = 1;

export const STORES = {
  DATA: 'stores',
  ATTACHMENTS: 'attachments',
  MIGRATION: 'migration_meta',
};

export const RESTORE_JOURNAL_KEY = 'cross_db_restore_journal_v1';

let dbInstance = null;
let dbOpenPromise = null;
const memoryFallback = new Map();

/**
 * Returns true if IndexedDB is supported in the current runtime.
 */
export function isIndexedDbSupported() {
  return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';
}

/**
 * Open or retrieve the cached IndexedDB database connection.
 */
export function openAppDB() {
  if (dbInstance) return Promise.resolve(dbInstance);
  if (dbOpenPromise) return dbOpenPromise;
  if (!isIndexedDbSupported()) return Promise.resolve(null);

  // A blocked upgrade must not leave startup waiting forever or use volatile data.
  const opening = new Promise((resolve) => {
    let settled = false;
    let timeoutId;
    const finish = (db) => {
      if (settled) return false;
      settled = true;
      clearTimeout(timeoutId);
      resolve(db);
      return true;
    };

    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORES.DATA)) {
          db.createObjectStore(STORES.DATA, { keyPath: 'name' });
        }
        if (!db.objectStoreNames.contains(STORES.ATTACHMENTS)) {
          const attachments = db.createObjectStore(STORES.ATTACHMENTS, { keyPath: 'id' });
          attachments.createIndex('noteId', 'noteId', { unique: false });
          attachments.createIndex('createdAt', 'createdAt', { unique: false });
        }
        if (!db.objectStoreNames.contains(STORES.MIGRATION)) {
          db.createObjectStore(STORES.MIGRATION, { keyPath: 'key' });
        }
      };
      request.onsuccess = () => {
        const opened = request.result;
        // Late success after a blocked/timeout failure must not be reused.
        if (settled) {
          opened.close();
          return;
        }
        const invalidate = () => {
          if (dbInstance === opened) {
            dbInstance = null;
            dbOpenPromise = null;
          }
        };
        opened.onversionchange = () => {
          invalidate();
          opened.close();
        };
        opened.onclose = invalidate;
        dbInstance = opened;
        finish(opened);
      };
      request.onerror = (event) => {
        console.warn('[Momentum DB] IndexedDB open error:', request.error || event);
        finish(null);
      };
      request.onblocked = () => {
        console.warn('[Momentum DB] IndexedDB open blocked; refusing to report storage ready');
        finish(null);
      };
      timeoutId = setTimeout(() => {
        console.warn('[Momentum DB] IndexedDB open timed out');
        finish(null);
      }, 8000);
    } catch (err) {
      console.warn('[Momentum DB] Initialization exception:', err);
      finish(null);
    }
  });

  dbOpenPromise = opening.then((db) => {
    // Allow a safe retry after the other tab closes; never erase stored data.
    if (!db) dbOpenPromise = null;
    return db;
  });
  return dbOpenPromise;
}

/**
 * Read a record from the 'stores' object store.
 */
export async function getStoreItem(name) {
  const db = await openAppDB();
  if (!db) {
    return memoryFallback.get(`store:${name}`) ?? null;
  }

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORES.DATA, 'readonly');
      const store = tx.objectStore(STORES.DATA);
      const req = store.get(name);
      req.onsuccess = () => resolve(req.result ? req.result.value : null);
      req.onerror = () => {
        console.warn('[Momentum DB] getStoreItem error:', req.error);
        reject(req.error || new Error('[Momentum DB] Store read failed'));
      };
      tx.onabort = () => reject(tx.error || new Error('[Momentum DB] Store read transaction aborted'));
    } catch (err) {
      console.warn('[Momentum DB] getStoreItem exception:', err);
      reject(err);
    }
  });
}

/**
 * Write a record into the 'stores' object store.
 */
export async function setStoreItem(name, value, meta = {}) {
  const db = await openAppDB();
  if (!db) {
    memoryFallback.set(`store:${name}`, value);
    // Volatile fallback is usable in-session, but is NOT a durable save.
    return false;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.DATA, 'readwrite');
      const store = tx.objectStore(STORES.DATA);
      const record = {
        name,
        value,
        updatedAt: Date.now(),
        ...meta,
      };
      const req = store.put(record);
      // A request can succeed even if its containing transaction later aborts.
      tx.oncomplete = () => resolve(true);
      tx.onerror = (e) => {
        console.warn('[Momentum DB] setStoreItem transaction error:', e);
        resolve(false);
      };
      tx.onabort = () => resolve(false);
      req.onerror = (e) => {
        console.warn('[Momentum DB] setStoreItem error:', e);
        resolve(false);
      };
    } catch (err) {
      console.warn('[Momentum DB] setStoreItem exception:', err);
      resolve(false);
    }
  });
}

/**
 * Delete a record from the 'stores' object store.
 */
export async function removeStoreItem(name) {
  const db = await openAppDB();
  if (!db) {
    memoryFallback.delete(`store:${name}`);
    return false; // In-memory deletion is not a durable database transaction.

  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.DATA, 'readwrite');
      const store = tx.objectStore(STORES.DATA);
      const req = store.delete(name);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      tx.onabort = () => resolve(false);
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

/**
 * Read an attachment record from the 'attachments' object store.
 */
export async function getAttachmentRecord(id) {
  const db = await openAppDB();
  if (!db) {
    return memoryFallback.get(`att:${id}`) ?? null;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.ATTACHMENTS, 'readonly');
      const store = tx.objectStore(STORES.ATTACHMENTS);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

/**
 * Write an attachment record to the 'attachments' object store.
 */
export async function setAttachmentRecord(record) {
  if (!record || !record.id) return false;
  const db = await openAppDB();
  if (!db) {
    memoryFallback.set(`att:${record.id}`, record);
    return false; // In-memory attachment can disappear on reload.

  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.ATTACHMENTS, 'readwrite');
      const store = tx.objectStore(STORES.ATTACHMENTS);
      const req = store.put({
        ...record,
        updatedAt: Date.now(),
      });
      tx.oncomplete = () => resolve(true);
      tx.onerror = (e) => {
        console.warn('[Momentum DB] setAttachmentRecord transaction error:', e);
        resolve(false);
      };
      tx.onabort = () => resolve(false);
      req.onerror = (e) => {
        console.warn('[Momentum DB] setAttachmentRecord error:', e);
        resolve(false);
      };
    } catch (err) {
      console.warn('[Momentum DB] setAttachmentRecord exception:', err);
      resolve(false);
    }
  });
}

/**
 * Delete an attachment record from the 'attachments' object store.
 */
export async function removeAttachmentRecord(id) {
  const db = await openAppDB();
  if (!db) {
    memoryFallback.delete(`att:${id}`);
    return false;

  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.ATTACHMENTS, 'readwrite');
      const store = tx.objectStore(STORES.ATTACHMENTS);
      const req = store.delete(id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      tx.onabort = () => resolve(false);
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

/**
 * Get all attachments belonging to a given noteId.
 */
export async function getAttachmentsByNoteId(noteId) {
  const db = await openAppDB();
  if (!db) {
    const results = [];
    for (const [k, v] of memoryFallback.entries()) {
      if (k.startsWith('att:') && v?.noteId === noteId) {
        results.push(v);
      }
    }
    return results;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.ATTACHMENTS, 'readonly');
      const store = tx.objectStore(STORES.ATTACHMENTS);
      const index = store.index('noteId');
      const req = index.getAll(noteId);
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

/**
 * Get migration metadata record by key.
 */
export async function getMigrationMeta(key) {
  const db = await openAppDB();
  if (!db) {
    return memoryFallback.get(`mig:${key}`) ?? null;
  }

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORES.MIGRATION, 'readonly');
      const store = tx.objectStore(STORES.MIGRATION);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error || new Error('[Momentum DB] Migration metadata read failed'));
      tx.onabort = () => reject(tx.error || new Error('[Momentum DB] Migration metadata transaction aborted'));
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Save migration metadata record.
 */
export async function setMigrationMeta(key, data) {
  const db = await openAppDB();
  const record = { key, ...data, timestamp: Date.now() };
  if (!db) {
    memoryFallback.set(`mig:${key}`, record);
    return false; // Never mark volatile migration metadata as committed.

  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.MIGRATION, 'readwrite');
      const store = tx.objectStore(STORES.MIGRATION);
      const req = store.put(record);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      tx.onabort = () => resolve(false);
      req.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

/**
 * Retrieve all store items from the 'stores' object store as a key-value map.
 */
export async function getAllStoreItems() {
  const db = await openAppDB();
  if (!db) {
    const map = {};
    for (const [k, v] of memoryFallback.entries()) {
      if (k.startsWith('store:')) {
        map[k.slice(6)] = v;
      }
    }
    return map;
  }

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORES.DATA, 'readonly');
      const req = tx.objectStore(STORES.DATA).getAll();
      req.onsuccess = () => {
        const result = {};
        for (const item of req.result || []) {
          if (item && item.name) result[item.name] = item.value;
        }
        resolve(result);
      };
      req.onerror = () => reject(req.error || new Error('[Momentum DB] Bulk store read failed'));
      tx.onabort = () => reject(tx.error || new Error('[Momentum DB] Bulk store read aborted'));
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Retrieve all attachment records from the 'attachments' object store.
 */
export async function getAllAttachmentRecords() {
  const db = await openAppDB();
  if (!db) {
    const list = [];
    for (const [k, v] of memoryFallback.entries()) {
      if (k.startsWith('att:')) {
        list.push(v);
      }
    }
    return list;
  }

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORES.ATTACHMENTS, 'readonly');
      const req = tx.objectStore(STORES.ATTACHMENTS).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error || new Error('[Momentum DB] Bulk attachment read failed'));
      tx.onabort = () => reject(tx.error || new Error('[Momentum DB] Bulk attachment read aborted'));
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Consistent, fail-closed backup snapshot across the two stores within the
 * central IndexedDB database. A single readonly transaction guarantees that
 * domain records and attachment records represent one committed DB version.
 * Wallpaper storage is a different DB and needs an application Web Lock.
 *
 * Never substitute the volatile memory fallback for an encrypted backup.
 */
export async function getCommittedBackupSnapshot() {
  const db = await openAppDB();
  if (!db) throw new Error('Backup unavailable: IndexedDB cannot be opened safely');

  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction([STORES.DATA, STORES.ATTACHMENTS], 'readonly');
      let stored = null;
      let attachments = null;
      const storeReq = tx.objectStore(STORES.DATA).getAll();
      const attachmentReq = tx.objectStore(STORES.ATTACHMENTS).getAll();
      storeReq.onsuccess = () => {
        stored = {};
        for (const record of storeReq.result || []) {
          if (!record || typeof record.name !== 'string' || !record.name) {
            reject(new Error('Backup aborted: malformed store record'));
            tx.abort();
            return;
          }
          stored[record.name] = record.value;
        }
      };
      attachmentReq.onsuccess = () => { attachments = attachmentReq.result || []; };
      storeReq.onerror = () => reject(storeReq.error || new Error('Backup aborted: domain snapshot read failed'));
      attachmentReq.onerror = () => reject(attachmentReq.error || new Error('Backup aborted: attachment snapshot read failed'));
      tx.onabort = () => reject(tx.error || new Error('Backup aborted: main database snapshot transaction aborted'));
      tx.onerror = () => reject(tx.error || new Error('Backup aborted: main database snapshot transaction failed'));
      tx.oncomplete = () => {
        if (stored === null || attachments === null) {
          reject(new Error('Backup aborted: database snapshot was not fully read'));
        } else {
          resolve({ stores: stored, attachments });
        }
      };
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Clear multiple store records by name.
 */
export async function removeStoreItems(names) {
  if (!Array.isArray(names) || names.length === 0) return true;
  const db = await openAppDB();
  if (!db) {
    for (const name of names) {
      memoryFallback.delete(`store:${name}`);
    }
    return false;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.DATA, 'readwrite');
      const store = tx.objectStore(STORES.DATA);
      for (const name of names) {
        store.delete(name);
      }
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
      tx.onabort = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}


/**
 * Commit staged backup domain records and binary attachments atomically within
 * momentum_app_db. Never await between IDB requests: a transaction can become
 * inactive across event-loop turns. Callers must fully validate/prepare first.
 *
 * This does NOT cover the separate momentum_wallpaper_db. Never advertise
 * atomicity across those two databases.
 *
 * @param {{stores?: Array<{name: string, value: any}>, attachments?: Array<Object>}} batch
 * @returns {Promise<boolean>} true only after the *entire* transaction commits.
 */
export async function commitRestoreBatch({ stores = [], attachments = [], restoreJournalToken = null } = {}) {
  if (!Array.isArray(stores) || !Array.isArray(attachments)) {
    throw new TypeError('Restore batch must contain arrays of stores and attachments');
  }
  if (stores.some(item => !item || typeof item.name !== 'string' || !item.name)) {
    throw new TypeError('Restore batch contains an invalid store record');
  }
  if (attachments.some(item => !item || typeof item.id !== 'string' || !item.id)) {
    throw new TypeError('Restore batch contains an invalid attachment record');
  }
  if (new Set(stores.map(item => item.name)).size !== stores.length ||
      new Set(attachments.map(item => item.id)).size !== attachments.length) {
    throw new TypeError('Restore batch contains duplicate record keys');
  }

  const db = await openAppDB();
  if (!db) return false;
  if (!stores.length && !attachments.length && !restoreJournalToken) return true;

  return new Promise((resolve) => {
    let tx;
    let finished = false;
    const finish = (ok) => {
      if (finished) return;
      finished = true;
      resolve(ok);
    };
    try {
      const targets = [];
      if (stores.length) targets.push(STORES.DATA);
      if (attachments.length) targets.push(STORES.ATTACHMENTS);
      if (restoreJournalToken) targets.push(STORES.MIGRATION);
      tx = db.transaction(targets, 'readwrite');
      tx.oncomplete = () => finish(true);
      tx.onabort = () => finish(false);
      tx.onerror = () => finish(false);

      // Both object stores participate in exactly one IndexedDB transaction.
      // Synchronous DataCloneError, quota error, or subsequent abort must
      // roll back all the writes, including earlier request successes.
      if (stores.length) {
        const destination = tx.objectStore(STORES.DATA);
        for (const item of stores) {
          destination.put({ name: item.name, value: item.value, updatedAt: Date.now() });
        }
      }
      if (attachments.length) {
        const destination = tx.objectStore(STORES.ATTACHMENTS);
        for (const item of attachments) {
          destination.put({ ...item, updatedAt: Date.now() });
        }
      }
      // Commit restored application records and remove the pending cross-DB
      // journal in the SAME transaction. If this aborts the journal remains,
      // so startup can roll the wallpaper database back to its preimage.
      if (restoreJournalToken) {
        const meta = tx.objectStore(STORES.MIGRATION);
        const check = meta.get(RESTORE_JOURNAL_KEY);
        check.onsuccess = () => {
          if (check.result?.token !== restoreJournalToken) {
            try { tx.abort(); } catch { finish(false); }
            return;
          }
          meta.delete(RESTORE_JOURNAL_KEY);
        };
        check.onerror = () => {
          try { tx.abort(); } catch { finish(false); }
        };
      }
    } catch (err) {
      console.warn('[Momentum DB] Atomic restore transaction failed:', err);
      try { tx?.abort(); } catch { /* transaction may already be inactive */ }
      finish(false);
    }
  });
}

/**
 * Read the crash-recovery journal from the authoritative main database.
 * A read failure is an error, not proof that no incomplete restore exists.
 */
export async function getPendingRestoreJournal() {
  const db = await openAppDB();
  if (!db) throw new Error('[Momentum Restore] IndexedDB unavailable');
  return new Promise((resolve, reject) => {
    try {
      const tx = db.transaction(STORES.MIGRATION, 'readonly');
      const req = tx.objectStore(STORES.MIGRATION).get(RESTORE_JOURNAL_KEY);
      let record = null;
      req.onsuccess = () => { record = req.result || null; };
      req.onerror = () => reject(req.error || new Error('[Momentum Restore] Journal read failed'));
      // A get request may succeed before its containing transaction aborts.
      // Never interpret a pre-commit read as absence of a recovery journal.
      tx.onabort = () => reject(tx.error || new Error('[Momentum Restore] Journal read transaction aborted'));
      tx.onerror = () => reject(tx.error || new Error('[Momentum Restore] Journal read transaction failed'));
      tx.oncomplete = () => resolve(record);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Create a pending journal only if no other journal already exists.
 * The complete wallpaper preimage is stored durably before changing any
 * wallpaper. Access should be coordinated via navigator.locks across tabs.
 */
export async function beginRestoreJournal({ token, wallpaperBefore }) {
  if (typeof token !== 'string' || !token ||
      !Array.isArray(wallpaperBefore) ||
      wallpaperBefore.some(item => !item || typeof item.id !== 'string' || !item.id ||
        (item.previous !== null && (!item.previous || item.previous.id !== item.id)))) {
    throw new TypeError('Invalid cross-database recovery journal');
  }
  const db = await openAppDB();
  if (!db) return false;
  return new Promise((resolve) => {
    let tx;
    try {
      tx = db.transaction(STORES.MIGRATION, 'readwrite');
      tx.oncomplete = () => resolve(true);
      tx.onabort = () => resolve(false);
      tx.onerror = () => resolve(false);
      const meta = tx.objectStore(STORES.MIGRATION);
      const req = meta.get(RESTORE_JOURNAL_KEY);
      req.onsuccess = () => {
        if (req.result) {
          tx.abort();
          return;
        }
        meta.put({
          key: RESTORE_JOURNAL_KEY, token,
          status: 'pending',
          wallpaperBefore,
          createdAt: new Date().toISOString(),
        });
      };
      req.onerror = () => tx.abort();
    } catch (err) {
      console.warn('[Momentum Restore] Journal creation failed:', err);
      try { tx?.abort(); } catch { /* already inactive */ }
      resolve(false);
    }
  });
}

/**
 * Clear a journal only after its wallpaper preimage has been restored.
 * Compare tokens within the transaction, so a stale recovery cannot clear a
 * different restore's journal. Main-db finalize clears it atomically instead.
 */
export async function clearRestoreJournal(token) {
  if (typeof token !== 'string' || !token) throw new TypeError('Invalid journal token');
  const db = await openAppDB();
  if (!db) return false;
  return new Promise((resolve) => {
    let tx;
    try {
      tx = db.transaction(STORES.MIGRATION, 'readwrite');
      tx.oncomplete = () => resolve(true);
      tx.onabort = () => resolve(false);
      tx.onerror = () => resolve(false);
      const meta = tx.objectStore(STORES.MIGRATION);
      const req = meta.get(RESTORE_JOURNAL_KEY);
      req.onsuccess = () => {
        if (req.result?.token !== token) {
          tx.abort();
          return;
        }
        meta.delete(RESTORE_JOURNAL_KEY);
      };
      req.onerror = () => tx.abort();
    } catch (err) {
      console.warn('[Momentum Restore] Failed to clear journal:', err);
      try { tx?.abort(); } catch { /* already inactive */ }
      resolve(false);
    }
  });
}
