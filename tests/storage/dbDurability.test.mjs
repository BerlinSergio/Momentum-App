/**
 * Momentum storage regression tests — Issue #9 (AUD-001 and AUD-004).
 * Synthetic IndexedDB transactions only; no real user data is accessed.
 *
 * Run: node --test tests/storage/dbDurability.test.mjs
 */
import test from 'node:test';
import assert from 'node:assert/strict';

let counter = 0;
async function freshDatabaseModule() {
  const url = new URL('../../src/storage/db.js', import.meta.url);
  url.searchParams.set('isolated-test', String(counter++));
  return import(url.href);
}

async function withWindow(fakeWindow, fn) {
  const had = Object.prototype.hasOwnProperty.call(globalThis, 'window');
  const previous = globalThis.window;
  if (fakeWindow === undefined) delete globalThis.window;
  else globalThis.window = fakeWindow;
  try {
    return await fn();
  } finally {
    if (had) globalThis.window = previous;
    else delete globalThis.window;
  }
}

/**
 * IndexedDB requests succeed, but their parent transactions either commit
 * or abort afterward. An onsuccess event is NOT proof of a durable commit.
 */
function fakeWindowWithTransactions(finalOutcome) {
  const database = {
    close() {},
    transaction() {
      const tx = {
        oncomplete: null,
        onabort: null,
        onerror: null,
        objectStore() {
          return {
            put: () => issueRequest(),
            delete: () => issueRequest(),
          };
        },
      };
      function issueRequest() {
        const req = { onsuccess: null, onerror: null };
        queueMicrotask(() => {
          req.onsuccess?.({ target: req });
          queueMicrotask(() => {
            if (finalOutcome === 'abort') tx.onabort?.({ target: tx });
            else tx.oncomplete?.({ target: tx });
          });
        });
        return req;
      }
      return tx;
    },
  };

  return {
    indexedDB: {
      open() {
        const req = { result: database, onsuccess: null, onerror: null };
        queueMicrotask(() => req.onsuccess?.({ target: req }));
        return req;
      },
    },
  };
}

test('without IndexedDB, volatile writes/deletes must NOT claim durability', async () => {
  await withWindow(undefined, async () => {
    const db = await freshDatabaseModule();
    assert.equal(await db.setStoreItem('test', { value: 'synthetic' }), false);
    assert.equal(await db.setAttachmentRecord({ id: 'synthetic-attachment' }), false);
    assert.equal(await db.setMigrationMeta('schema_version', { status: 'completed' }), false);
    assert.equal(await db.removeStoreItem('test'), false);
    assert.equal(await db.removeAttachmentRecord('synthetic-attachment'), false);
    assert.equal(await db.removeStoreItems(['test']), false);
  });
});

test('a successful IDB request followed by transaction abort must report failure', async () => {
  await withWindow(fakeWindowWithTransactions('abort'), async () => {
    const db = await freshDatabaseModule();
    assert.equal(await db.setStoreItem('test', { value: 42 }), false);
    assert.equal(await db.setAttachmentRecord({ id: 'synthetic-attachment' }), false);
    assert.equal(await db.setMigrationMeta('schema_version', { status: 'completed' }), false);
    assert.equal(await db.removeStoreItem('test'), false);
    assert.equal(await db.removeAttachmentRecord('synthetic-attachment'), false);
    assert.equal(await db.removeStoreItems(['test']), false);
  });
});

test('transaction completion reports durable write/delete success', async () => {
  await withWindow(fakeWindowWithTransactions('complete'), async () => {
    const db = await freshDatabaseModule();
    assert.equal(await db.setStoreItem('test', { value: 42 }), true);
    assert.equal(await db.setAttachmentRecord({ id: 'synthetic-attachment' }), true);
    assert.equal(await db.setMigrationMeta('schema_version', { status: 'completed' }), true);
    assert.equal(await db.removeStoreItem('test'), true);
    assert.equal(await db.removeAttachmentRecord('synthetic-attachment'), true);
    assert.equal(await db.removeStoreItems(['test']), true);
  });
});

test('Zustand adapter rejects saves when only volatile memory is available', async () => {
  await withWindow(undefined, async () => {
    const { createIndexedDbStorage } = await import('../../src/storage/zustandIndexedDbStorage.js');
    const storage = createIndexedDbStorage({ mirrorToLocalStorage: false });
    await assert.rejects(
      storage.setItem('qa-only-storage', JSON.stringify({ synthetic: true })),
      /Durable save failed/
    );
    await assert.rejects(
      storage.removeItem('qa-only-storage'),
      /Durable delete failed/
    );
  });
});
