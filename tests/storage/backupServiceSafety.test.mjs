/**
 * Backup/restore failure-injection tests, Phase 2.3.
 * All records and passwords here are synthetic; no browser/user profile is used.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createBackupPackage, restoreBackup } from '../../src/utils/backupService.js';
import { encryptBackupPayload, decryptBackupPayload } from '../../src/utils/backupCrypto.js';

const STORE = 'momentum-task-storage';
const passphrase = 'synthetic-qa-restore-only';

async function withWindow(fakeWindow, work, cleanup = () => {}) {
  const had = Object.prototype.hasOwnProperty.call(globalThis, 'window');
  const old = globalThis.window;
  if (fakeWindow === undefined) delete globalThis.window;
  else globalThis.window = fakeWindow;
  try { return await work(); }
  finally {
    cleanup();
    if (had) globalThis.window = old;
    else delete globalThis.window;
  }
}

function fakeDatabase({ abortWrites = false } = {}) {
  const records = new Map();
  const attachments = new Map();
  const wallpapers = new Map();
  const db = {
    close() {},
    transaction(storeName) {
      const table = storeName === 'stores' ? records : storeName === 'attachments' ? attachments : wallpapers;
      const tx = {
        oncomplete: null, onabort: null, onerror: null,
        objectStore() {
          return {
            getAll() {
              const req = { result: null, onsuccess: null, onerror: null };
              queueMicrotask(() => {
                req.result = [...table.values()];
                req.onsuccess?.({ target: req });
              });
              return req;
            },
            put(record) {
              const req = { onsuccess: null, onerror: null };
              queueMicrotask(() => {
                if (abortWrites && storeName === 'stores') {
                  req.onsuccess?.({ target: req });
                  tx.onabort?.({ target: tx });
                  return;
                }
                table.set(record.name ?? record.id, structuredClone(record));
                req.onsuccess?.({ target: req });
                tx.oncomplete?.({ target: tx });
              });
              return req;
            },
            delete(key) {
              const req = { onsuccess: null, onerror: null };
              queueMicrotask(() => {
                table.delete(key);
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
      getItem: () => JSON.stringify({ state: { tasks: [{ id: 'stale-mirror' }] }, version: 0 }),
      setItem() {},
      removeItem() {},
    },
    indexedDB: {
      open() {
        const request = { result: db, onsuccess: null, onerror: null };
        queueMicrotask(() => request.onsuccess?.({ target: request }));
        return request;
      },
    },
  };
  return { db, fakeWindow, records, attachments };
}

test('backup refuses an unavailable IndexedDB rather than exporting a stale mirror', async () => {
  await withWindow({ localStorage: { getItem: () => '{"state":{"tasks":[{"id":"stale"}]}}' } }, async () => {
    await assert.rejects(createBackupPackage(passphrase), /IndexedDB cannot be opened safely/);
  });
});

test('backup with an empty authoritative database never resurrects stale localStorage state', async () => {
  const fixture = fakeDatabase();
  await withWindow(fixture.fakeWindow, async () => {
    const backup = await createBackupPackage(passphrase);
    assert.equal(backup.success, true);
    const payload = await decryptBackupPayload(backup.envelope, passphrase);
    assert.equal(Object.hasOwn(payload.domains, STORE), false);
    assert.equal(payload.manifest.recordCounts.tasks, 0);
  }, () => fixture.db.onclose?.());
});

test('restore aborts on a failed durable transaction and leaves no new record behind', async () => {
  const fixture = fakeDatabase({ abortWrites: true });
  const envelope = await encryptBackupPayload(JSON.stringify({
    manifest: { version: 1 },
    domains: {
      [STORE]: { state: { tasks: [{ id: 'synthetic-task', title: 'QA only' }] }, version: 0 },
    },
    attachments: [],
    customWallpapers: [],
  }), passphrase);

  await withWindow(fixture.fakeWindow, async () => {
    await assert.rejects(
      restoreBackup(envelope, passphrase, { mode: 'merge' }),
      /durable save failed/
    );
    assert.equal(fixture.records.has(STORE), false);
  }, () => fixture.db.onclose?.());
});

test('invalid attachment checksum is rejected before any restore mutation', async () => {
  const fixture = fakeDatabase();
  const envelope = await encryptBackupPayload(JSON.stringify({
    manifest: { version: 1 },
    domains: {
      [STORE]: { state: { tasks: [{ id: 'never-write' }] }, version: 0 },
    },
    attachments: [{
      id: 'synthetic-attachment',
      mimeType: 'text/plain',
      base64Bytes: 'aGVsbG8=',
      sha256: '0'.repeat(64),
    }],
    customWallpapers: [],
  }), passphrase);

  await withWindow(fixture.fakeWindow, async () => {
    await assert.rejects(
      restoreBackup(envelope, passphrase),
      error => error?.code === 'ATTACHMENT_CHECKSUM_MISMATCH'
    );
    assert.equal(fixture.records.has(STORE), false);
    assert.equal(fixture.attachments.size, 0);
  }, () => fixture.db.onclose?.());
});

test('repeated synthetic merge restore does not duplicate tasks', async () => {
  const fixture = fakeDatabase();
  const envelope = await encryptBackupPayload(JSON.stringify({
    manifest: { version: 1 },
    domains: {
      [STORE]: { state: { tasks: [{ id: 'qa-task-1', title: 'One' }] }, version: 0 },
    },
    attachments: [],
    customWallpapers: [],
  }), passphrase);

  await withWindow(fixture.fakeWindow, async () => {
    const first = await restoreBackup(envelope, passphrase);
    assert.equal(first.success, true);
    const second = await restoreBackup(envelope, passphrase);
    assert.equal(second.success, true);
    const stored = fixture.records.get(STORE)?.value;
    assert.deepEqual(stored?.state?.tasks?.map(task => task.id), ['qa-task-1']);
  }, () => fixture.db.onclose?.());
});
