/**
 * Phase 2.3: isolated legacy migration verification with simulated IndexedDB.
 * Test data is synthetic; no real profile or local storage is read.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { runStorageMigration, MIGRATION_KEY } from '../../src/storage/migration.js';

const FINANCE = 'momentum-finance-storage';

async function withFixture({ legacy = {}, abortKey = null, corruptKey = null }, callback) {
  const oldWindow = globalThis.window;
  const hadWindow = Object.prototype.hasOwnProperty.call(globalThis, 'window');
  const records = new Map();
  const meta = new Map();
  const attachments = new Map();
  const local = new Map(Object.entries(legacy));
  const db = {
    close() {},
    transaction(storeName) {
      const map = storeName === 'stores' ? records : storeName === 'migration_meta' ? meta : attachments;
      const tx = {
        oncomplete: null, onerror: null, onabort: null,
        objectStore() {
          return {
            get(key) {
              const req = { result: null, onsuccess: null, onerror: null };
              queueMicrotask(() => {
                req.result = map.get(key) ?? null;
                if (storeName === 'stores' && key === corruptKey && records.has(key)) {
                  req.result = { name: key, value: { state: { transactions: [{ id: 'wrong' }] } } };
                }
                req.onsuccess?.({ target: req });
              });
              return req;
            },
            put(value) {
              const req = { result: undefined, onsuccess: null, onerror: null };
              queueMicrotask(() => {
                const key = value.name ?? value.key ?? value.id;
                if (key === abortKey) {
                  tx.onabort?.({ target: tx });
                  return;
                }
                map.set(key, structuredClone(value));
                req.onsuccess?.({ target: req });
                tx.oncomplete?.({ target: tx });
              });
              return req;
            },
          };
        },
      };
      return tx;
    },
  };
  const fakeWindow = {
    localStorage: {
      getItem: key => local.get(key) ?? null,
      setItem: (key, value) => local.set(key, value),
      removeItem: key => local.delete(key),
    },
    indexedDB: {
      open() {
        const req = { result: db, onsuccess: null, onerror: null };
        queueMicrotask(() => req.onsuccess?.({ target: req }));
        return req;
      },
    },
  };
  globalThis.window = fakeWindow;
  try { return await callback({ records, meta, local }); }
  finally {
    // Release the singleton DB connection before the next fixture.
    db.onclose?.();
    if (hadWindow) globalThis.window = oldWindow;
    else delete globalThis.window;
  }
}

const source = JSON.stringify({
  state: { transactions: [{ id: 'synthetic-1', amount: 73 }], accounts: [{ id: 'synthetic-a' }] },
  version: 6,
});

test('successful legacy migration verifies IndexedDB and preserves original local data', async () => {
  await withFixture({ legacy: { [FINANCE]: source } }, async ({ records, meta, local }) => {
    const summary = await runStorageMigration();
    assert.equal(summary.success, true, JSON.stringify(summary.details));
    assert.equal(summary.migratedCount, 1);
    assert.deepEqual(records.get(FINANCE)?.value, JSON.parse(source));
    assert.equal(meta.get(MIGRATION_KEY)?.status, 'completed');
    assert.equal(local.get(FINANCE), source);
    const second = await runStorageMigration();
    assert.equal(second.success, true);
    assert.equal(second.migratedCount, 0);
  });
});

test('aborted IndexedDB write does not mark migration complete or delete source data', async () => {
  await withFixture({ legacy: { [FINANCE]: source }, abortKey: FINANCE }, async ({ records, meta, local }) => {
    const summary = await runStorageMigration();
    assert.equal(summary.success, false);
    assert.equal(summary.migratedCount, 0);
    assert.equal(records.has(FINANCE), false);
    assert.equal(meta.has(MIGRATION_KEY), false);
    assert.equal(local.get(FINANCE), source);
  });
});

test('read-back mismatch blocks the completed marker and keeps legacy source', async () => {
  await withFixture({ legacy: { [FINANCE]: source }, corruptKey: FINANCE }, async ({ meta, local }) => {
    const summary = await runStorageMigration();
    assert.equal(summary.success, false);
    assert.ok(summary.details.errors.some(e => /read-back mismatch/.test(e.error)));
    assert.equal(meta.has(MIGRATION_KEY), false);
    assert.equal(local.get(FINANCE), source);
  });
});

test('malformed legacy JSON does not produce a completed migration marker', async () => {
  await withFixture({ legacy: { [FINANCE]: '{broken-json' } }, async ({ records, meta, local }) => {
    const summary = await runStorageMigration();
    assert.equal(summary.success, false);
    assert.equal(records.has(FINANCE), false);
    assert.equal(meta.has(MIGRATION_KEY), false);
    assert.equal(local.get(FINANCE), '{broken-json');
  });
});

test('credential migration failure leaves completion marker absent and can be retried', async () => {
  await withFixture({ legacy: { [FINANCE]: source } }, async ({ meta, records, local }) => {
    let attempts = 0;
    const migrateCredential = async () => {
      assert.equal(meta.has(MIGRATION_KEY), false);
      attempts++;
      return attempts === 1 ? { error: 'INJECTED_FAILURE' } : { migrated: true };
    };
    const first = await runStorageMigration({ migrateCredential });
    assert.equal(first.success, false);
    assert.equal(meta.has(MIGRATION_KEY), false);
    assert.ok(first.details.errors.some(e => e.key === 'momentum-credential-verifier'));
    assert.equal(local.get(FINANCE), source);
    assert.deepEqual(records.get(FINANCE)?.value, JSON.parse(source));
    const retry = await runStorageMigration({ migrateCredential });
    assert.equal(retry.success, true);
    assert.equal(meta.get(MIGRATION_KEY)?.status, 'completed');
    assert.equal(attempts, 2);
    const third = await runStorageMigration({ migrateCredential });
    assert.equal(third.details.alreadyCompleted, true);
    assert.equal(attempts, 2);
  });
});

test('credential callback rejection fails closed before completion marker', async () => {
  await withFixture({ legacy: { [FINANCE]: source } }, async ({ meta, local }) => {
    const result = await runStorageMigration({
      migrateCredential: async () => { throw new Error('INJECTED_CREDENTIAL_REJECTION'); },
    });
    assert.equal(result.success, false);
    assert.equal(meta.has(MIGRATION_KEY), false);
    assert.equal(local.get(FINANCE), source);
  });
});

test('credential callback is not invoked after an ordinary migration failure', async () => {
  await withFixture({ legacy: { [FINANCE]: source }, abortKey: FINANCE }, async ({ meta }) => {
    let called = false;
    const result = await runStorageMigration({
      migrateCredential: async () => { called = true; return { migrated: true }; },
    });
    assert.equal(result.success, false);
    assert.equal(called, false);
    assert.equal(meta.has(MIGRATION_KEY), false);
  });
});
