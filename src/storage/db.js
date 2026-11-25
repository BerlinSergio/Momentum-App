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

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.DATA, 'readonly');
      const store = tx.objectStore(STORES.DATA);
      const req = store.getAll();
      req.onsuccess = () => {
        const records = req.result || [];
        const result = {};
        for (const item of records) {
          if (item && item.name) {
            result[item.name] = item.value;
          }
        }
        resolve(result);
      };
      req.onerror = () => resolve({});
    } catch {
      resolve({});
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

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORES.ATTACHMENTS, 'readonly');
      const store = tx.objectStore(STORES.ATTACHMENTS);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
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

