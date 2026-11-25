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
  const hadStorage = Object.prototype.hasOwnProperty.call(globalThis, 'localStorage');
  const oldStorage = globalThis.localStorage;
  if (fakeWindow === undefined) delete globalThis.window;
  else globalThis.window = fakeWindow;
  // Browser scripts can access localStorage both via window and as a global.
  // Recreate both aliases so the synthetic fixture models browser semantics.
  if (fakeWindow?.localStorage) globalThis.localStorage = fakeWindow.localStorage;
  else delete globalThis.localStorage;
  try { return await work(); }
  finally {
    cleanup();
    if (had) globalThis.window = old;
    else delete globalThis.window;
    if (hadStorage) globalThis.localStorage = oldStorage;
    else delete globalThis.localStorage;
  }
}

function fakeDatabase({ abortWrites = false, abortOnAttachment = false } = {}) {
  const records = new Map();
  const attachments = new Map();
  const wallpapers = new Map();
  const localWrites = new Map();
  const db = {
    close() {},
    transaction(storeNames) {
      const targets = Array.isArray(storeNames) ? storeNames : [storeNames];
      const tables = { stores: records, attachments, wallpapers };
      const pending = [];
      let scheduled = false;
      const tx = {
        oncomplete: null, onabort: null, onerror: null,
        abort() { this.onabort?.({ target: this }); },
        objectStore(name) {
          if (!targets.includes(name)) throw new Error('Store not in transaction');
          const table = tables[name];
          if (!table) throw new Error('Unknown store ' + name);
          function scheduleCompletion() {
            if (scheduled) return;
            scheduled = true;
            queueMicrotask(() => {
              if ((abortWrites && targets.includes('stores')) ||
                  (abortOnAttachment && pending.some(op => op.store === 'attachments'))) {
                for (const op of pending) op.request.onsuccess?.({ target: op.request });
                tx.onabort?.({ target: tx });
                return;
              }
              for (const op of pending) {
                if (op.type === 'put') tables[op.store].set(op.key, structuredClone(op.value));
                else tables[op.store].delete(op.key);
                op.request.onsuccess?.({ target: op.request });
              }
              tx.oncomplete?.({ target: tx });
            });
          }
          return {
            getAll() {
              const req = { result: null, onsuccess: null, onerror: null };
              queueMicrotask(() => {
                req.result = [...table.values()];
                req.onsuccess?.({ target: req });
                tx.oncomplete?.({ target: tx });
              });
              return req;
            },
            put(record) {
              const req = { onsuccess: null, onerror: null };
              pending.push({ type: 'put', store: name, key: name === 'stores' ? record.name : record.id, value: record, request: req });
              scheduleCompletion();
              return req;
            },
            delete(key) {
              const req = { onsuccess: null, onerror: null };
              pending.push({ type: 'delete', store: name, key, request: req });
              scheduleCompletion();
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
      getItem: key => localWrites.get(key) ?? JSON.stringify({ state: { tasks: [{ id: 'stale-mirror' }] }, version: 0 }),
      setItem: (key, value) => localWrites.set(key, value),
      removeItem: key => localWrites.delete(key),
    },
    indexedDB: {
      open() {
        const request = { result: db, onsuccess: null, onerror: null };
        queueMicrotask(() => request.onsuccess?.({ target: request }));
        return request;
      },
    },
  };
  return { db, fakeWindow, records, attachments, localWrites };
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
      /atomic IndexedDB transaction failed/
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

test('one committed main-database restore includes both domain and binary attachment', async () => {
  const fixture = fakeDatabase();
  const envelope = await encryptBackupPayload(JSON.stringify({
    manifest: { version: 1 },
    domains: { [STORE]: { state: { tasks: [{ id: 'restored-task' }] }, version: 0 } },
    attachments: [{
      id: 'restored-file', noteId: 'qa-note', mimeType: 'text/plain',
      base64Bytes: 'aGVsbG8=', sha256: await (async () => {
        const { computeSha256 } = await import('../../src/utils/backupCrypto.js');
        return computeSha256(new TextEncoder().encode('hello'));
      })(),
    }],
    customWallpapers: [],
  }), passphrase);

  await withWindow(fixture.fakeWindow, async () => {
    const result = await restoreBackup(envelope, passphrase);
    assert.equal(result.success, true);
    assert.deepEqual(fixture.records.get(STORE).value.state.tasks.map(t => t.id), ['restored-task']);
    assert.ok(fixture.attachments.has('restored-file'), 'attachment keys after successful transaction: ' + JSON.stringify([...fixture.attachments.keys()]));
    assert.equal(fixture.attachments.get('restored-file').blob.size, 5);
    assert.equal(JSON.parse(fixture.localWrites.get(STORE)).state.tasks[0].id, 'restored-task');
  }, () => fixture.db.onclose?.());
});

test('attachment transaction abort preserves prior domain and attachment data', async () => {
  const fixture = fakeDatabase({ abortOnAttachment: true });
  fixture.records.set(STORE, { name: STORE, value: { state: { tasks: [{ id: 'original-task' }] }, version: 0 } });
  fixture.attachments.set('original-file', { id: 'original-file', blob: new Blob(['original']) });
  const envelope = await encryptBackupPayload(JSON.stringify({
    manifest: { version: 1 },
    domains: { [STORE]: { state: { tasks: [{ id: 'new-task' }] }, version: 0 } },
    attachments: [{ id: 'new-file', mimeType: 'text/plain', base64Bytes: 'aGVsbG8=' }],
    customWallpapers: [],
  }), passphrase);
  await withWindow(fixture.fakeWindow, async () => {
    await assert.rejects(restoreBackup(envelope, passphrase), /atomic IndexedDB transaction failed/);
    assert.deepEqual(fixture.records.get(STORE).value.state.tasks.map(t => t.id), ['original-task']);
    assert.deepEqual([...fixture.attachments.keys()], ['original-file']);
    assert.equal(fixture.localWrites.has(STORE), false);
  }, () => fixture.db.onclose?.());
});

test('restore containing separate-database custom wallpapers is rejected before any writes', async () => {
  const fixture = fakeDatabase();
  const envelope = await encryptBackupPayload(JSON.stringify({
    manifest: { version: 1 },
    domains: { [STORE]: { state: { tasks: [{ id: 'must-not-write' }] }, version: 0 } },
    attachments: [],
    customWallpapers: [{ id: 'custom_active', dataUrl: 'data:image/png;base64,AA==' }],
  }), passphrase);
  await withWindow(fixture.fakeWindow, async () => {
    await assert.rejects(
      restoreBackup(envelope, passphrase),
      error => error?.code === 'CROSS_DATABASE_RESTORE_UNSAFE'
    );
    assert.equal(fixture.records.size, 0);
    assert.equal(fixture.attachments.size, 0);
    assert.equal(fixture.localWrites.size, 0);
  }, () => fixture.db.onclose?.());
});

test('backup aborts instead of silently dropping an unreadable attachment', async () => {
  const fixture = fakeDatabase();
  fixture.attachments.set('unreadable-file', { id: 'unreadable-file', blob: 'not-a-blob-or-data-url' });
  await withWindow(fixture.fakeWindow, async () => {
    await assert.rejects(
      createBackupPackage(passphrase),
      /Backup aborted: attachment unreadable-file could not be bundled/
    );
    assert.equal(fixture.attachments.has('unreadable-file'), true);
  }, () => fixture.db.onclose?.());
});

test('backup rejects a failed wallpaper query rather than producing an incomplete archive', async () => {
  const fixture = fakeDatabase();
  const original = fixture.db.transaction;
  fixture.db.transaction = function(storeNames, mode) {
    if (storeNames === 'wallpapers') throw new Error('Injected wallpaper database read error');
    return original.call(this, storeNames, mode);
  };
  await withWindow(fixture.fakeWindow, async () => {
    await assert.rejects(
      createBackupPackage(passphrase),
      /Injected wallpaper database read error/
    );
  }, () => fixture.db.onclose?.());
});

test('backup refuses a wallpaper transaction aborted after request success', async () => {
  const fixture = fakeDatabase();
  const original = fixture.db.transaction;
  fixture.db.transaction = function(storeNames, mode) {
    if (storeNames !== 'wallpapers') return original.call(this, storeNames, mode);
    const tx = { oncomplete: null, onabort: null, onerror: null };
    tx.objectStore = () => ({
      getAll() {
        const req = { result: [], onsuccess: null, onerror: null };
        queueMicrotask(() => {
          req.onsuccess?.({ target: req });
          tx.onabort?.({ target: tx });
        });
        return req;
      },
    });
    return tx;
  };
  await withWindow(fixture.fakeWindow, async () => {
    await assert.rejects(
      createBackupPackage(passphrase),
      /wallpaper read transaction aborted/
    );
  }, () => fixture.db.onclose?.());
});
