/**
 * Backup/restore failure-injection tests, Phase 2.3.
 * All records and passwords here are synthetic; no browser/user profile is used.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createBackupPackage, restoreBackup } from '../../src/utils/backupService.js';
import { encryptBackupPayload, decryptBackupPayload } from '../../src/utils/backupCrypto.js';
import { commitRestoreBatch, setAttachmentRecord, beginRestoreJournal, getPendingRestoreJournal } from '../../src/storage/db.js';

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
  const migration = new Map();
  const localWrites = new Map();
  const tables = { stores: records, attachments, wallpapers, migration_meta: migration };
  const db = {
    close() {},
    transaction(storeNames) {
      const targets = Array.isArray(storeNames) ? storeNames : [storeNames];
      const pending = [];
      let activeReads = 0;
      let scheduled = false;
      let settled = false;
      const tx = {
        oncomplete: null, onabort: null, onerror: null,
        abort() {
          if (settled) return;
          settled = true;
          this.onabort?.({ target: this });
        },
        objectStore(name) {
          if (!targets.includes(name)) throw new Error('Store not in transaction');
          const table = tables[name];
          if (!table) throw new Error('Unknown store ' + name);

          function scheduleCompletion() {
            if (scheduled || settled) return;
            scheduled = true;
            queueMicrotask(() => {
              scheduled = false;
              if (settled || activeReads) return;
              if ((abortWrites && pending.some(op => op.store === 'stores')) ||
                  (abortOnAttachment && pending.some(op => op.store === 'attachments'))) {
                // Model the crucial false-positive request-success case.
                for (const op of pending) op.request.onsuccess?.({ target: op.request });
                tx.abort();
                return;
              }
              for (const op of pending) {
                if (op.type === 'put') tables[op.store].set(op.key, structuredClone(op.value));
                else tables[op.store].delete(op.key);
                op.request.onsuccess?.({ target: op.request });
              }
              settled = true;
              tx.oncomplete?.({ target: tx });
            });
          }
          function queueRead(read) {
            const req = { result: null, onsuccess: null, onerror: null };
            activeReads += 1;
            queueMicrotask(() => {
              if (settled) return;
              req.result = read();
              req.onsuccess?.({ target: req });
              activeReads -= 1;
              scheduleCompletion();
            });
            return req;
          }
          return {
            get(key) { return queueRead(() => table.get(key) ?? null); },
            getAll() { return queueRead(() => [...table.values()]); },
            put(record) {
              const req = { onsuccess: null, onerror: null };
              const key = name === 'stores' ? record.name :
                          name === 'migration_meta' ? record.key : record.id;
              pending.push({ type: 'put', store: name, key, value: record, request: req });
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
    navigator: {
      locks: {
        async request(_name, _options, callback) { return callback(); },
      },
    },
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
  return { db, fakeWindow, records, attachments, migration, localWrites };
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

test('cross-database restore without Web Locks fails before writing anything', async () => {
  const fixture = fakeDatabase();
  delete fixture.fakeWindow.navigator; // This case deliberately simulates missing Web Locks.
  const envelope = await encryptBackupPayload(JSON.stringify({
    manifest: { version: 1 },
    domains: { [STORE]: { state: { tasks: [{ id: 'must-not-write' }] }, version: 0 } },
    attachments: [],
    customWallpapers: [{ id: 'custom_active', dataUrl: 'data:image/png;base64,AA==' }],
  }), passphrase);
  await withWindow(fixture.fakeWindow, async () => {
    await assert.rejects(
      restoreBackup(envelope, passphrase),
      error => error?.code === 'RESTORE_LOCKS_UNAVAILABLE'
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

test('backup without Web Locks fails rather than exporting a potentially mixed database snapshot', async () => {
  const fixture = fakeDatabase();
  delete fixture.fakeWindow.navigator;
  await withWindow(fixture.fakeWindow, async () => {
    await assert.rejects(
      createBackupPackage(passphrase),
      error => error?.code === 'BACKUP_LOCKS_UNAVAILABLE'
    );
  }, () => fixture.db.onclose?.());
});

test('backup rejects an aborted combined main-database readonly transaction', async () => {
  const fixture = fakeDatabase();
  const original = fixture.db.transaction;
  fixture.db.transaction = function(stores, mode) {
    if (Array.isArray(stores) && stores.includes('stores') && stores.includes('attachments') && mode === 'readonly') {
      const tx = { oncomplete: null, onabort: null, onerror: null };
      let reads = 0;
      tx.objectStore = () => ({
        getAll() {
          const req = { result: [], onsuccess: null, onerror: null };
          queueMicrotask(() => {
            req.onsuccess?.({ target: req });
            reads += 1;
            if (reads === 2) tx.onabort?.({ target: tx });
          });
          return req;
        },
      });
      return tx;
    }
    return original.call(this, stores, mode);
  };
  await withWindow(fixture.fakeWindow, async () => {
    await assert.rejects(
      createBackupPackage(passphrase),
      /main database snapshot transaction aborted/
    );
  }, () => fixture.db.onclose?.());
});

test('backup fails closed when recovery journal read aborts after the request succeeds', async () => {
  const fixture = fakeDatabase();
  const original = fixture.db.transaction;
  fixture.db.transaction = function(storeNames, mode) {
    if (storeNames === 'migration_meta' && mode === 'readonly') {
      const tx = { oncomplete: null, onabort: null, onerror: null };
      tx.objectStore = () => ({
        get() {
          const req = { result: null, onsuccess: null, onerror: null };
          queueMicrotask(() => {
            req.onsuccess?.({ target: req });
            tx.onabort?.({ target: tx });
          });
          return req;
        },
      });
      return tx;
    }
    return original.call(this, storeNames, mode);
  };
  await withWindow(fixture.fakeWindow, async () => {
    await assert.rejects(
      createBackupPackage(passphrase),
      /Journal read transaction aborted/
    );
  }, () => fixture.db.onclose?.());
});

test('stale domain snapshot cannot overwrite a newer task update from another tab', async () => {
  const fixture = fakeDatabase();
  const initial = { state: { tasks: [{ id: 'original' }] }, version: 0 };
  fixture.records.set(STORE, { name: STORE, value: structuredClone(initial) });
  await withWindow(fixture.fakeWindow, async () => {
    // A staged its merge from the earlier original state.
    const expectedStoreValues = { [STORE]: structuredClone(initial) };
    // B committed an edit while A was preparing its restore.
    fixture.records.set(STORE, {
      name: STORE, value: { state: { tasks: [{ id: 'other-tab' }] }, version: 0 },
    });
    await assert.rejects(
      commitRestoreBatch({
        stores: [{ name: STORE, value: { state: { tasks: [{ id: 'restored' }] }, version: 0 } }],
        expectedStoreValues,
      }),
      error => error?.code === 'RESTORE_CONFLICT' && /domain/.test(error.message)
    );
    assert.equal(fixture.records.get(STORE).value.state.tasks[0].id, 'other-tab');
  }, () => fixture.db.onclose?.());
});

test('attachment version conflict rejects the entire task and attachment restore', async () => {
  const fixture = fakeDatabase();
  const before = {
    id: 'note-attachment', updatedAt: 100, fileName: 'document.txt',
    mimeType: 'text/plain', blob: new Blob(['before']),
  };
  fixture.attachments.set(before.id, before);
  await withWindow(fixture.fakeWindow, async () => {
    // Same identifier, changed by another tab after the restore snapshot.
    fixture.attachments.set(before.id, {
      ...before, updatedAt: 101, blob: new Blob(['newer']),
    });
    await assert.rejects(
      commitRestoreBatch({
        stores: [{ name: STORE, value: { state: { tasks: [{ id: 'must-not-write' }] } } }],
        attachments: [{ ...before, blob: new Blob(['restore']) }],
        expectedStoreValues: { [STORE]: null },
        expectedAttachmentRecords: { [before.id]: before },
      }),
      error => error?.code === 'RESTORE_CONFLICT' && /attachment/.test(error.message)
    );
    assert.equal(fixture.records.has(STORE), false);
    assert.equal(fixture.attachments.get(before.id).updatedAt, 101);
  }, () => fixture.db.onclose?.());
});

test('unchanged optimistic snapshot commits domain and attachment together', async () => {
  const fixture = fakeDatabase();
  await withWindow(fixture.fakeWindow, async () => {
    const committed = await commitRestoreBatch({
      stores: [{ name: STORE, value: { state: { tasks: [{ id: 'committed' }] }, version: 0 } }],
      attachments: [{ id: 'new-attachment', blob: new Blob(['safe']) }],
      expectedStoreValues: { [STORE]: null },
      expectedAttachmentRecords: { 'new-attachment': null },
    });
    assert.equal(committed, true);
    assert.equal(fixture.records.get(STORE).value.state.tasks[0].id, 'committed');
    assert.equal(await fixture.attachments.get('new-attachment').blob.text(), 'safe');
  }, () => fixture.db.onclose?.());
});

test('each attachment write mints a new revision even with identical metadata, clock and Blob length', async () => {
  const fixture = fakeDatabase();
  const originalClock = Date.now;
  await withWindow(fixture.fakeWindow, async () => {
    try {
      Date.now = () => 1700000000000;
      assert.equal(await setAttachmentRecord({
        id: 'qa-revision-file', blob: new Blob(['AAAA']),
        revisionId: 'forged-caller-revision',
        mimeType: 'text/plain', sizeBytes: 4,
      }), true);
      const before = fixture.attachments.get('qa-revision-file');
      assert.match(before.revisionId, /^[0-9a-f]{40}$/);
      assert.notEqual(before.revisionId, 'forged-caller-revision');

      assert.equal(await setAttachmentRecord({
        id: 'qa-revision-file', blob: new Blob(['BBBB']),
        revisionId: before.revisionId, mimeType: 'text/plain', sizeBytes: 4,
      }), true);
      const after = fixture.attachments.get('qa-revision-file');
      assert.notEqual(after.revisionId, before.revisionId);
      assert.equal(after.updatedAt, before.updatedAt);
      assert.equal(after.blob.size, before.blob.size);

      // A restore based on the first snapshot must fail, even though metadata
      // and the millisecond timestamp are identical.
      await assert.rejects(
        commitRestoreBatch({
          attachments: [{ id: 'qa-revision-file', blob: new Blob(['CCCC']) }],
          expectedAttachmentRecords: { 'qa-revision-file': before },
        }),
        error => error?.code === 'RESTORE_CONFLICT'
      );
      assert.equal(await fixture.attachments.get('qa-revision-file').blob.text(), 'BBBB');
    } finally {
      Date.now = originalClock;
    }
  }, () => fixture.db.onclose?.());
});

test('atomic restore overwrites caller-supplied revision with a fresh durable attachment token', async () => {
  const fixture = fakeDatabase();
  await withWindow(fixture.fakeWindow, async () => {
    const value = { id: 'qa-restore-file', blob: new Blob(['first']) };
    assert.equal(await commitRestoreBatch({ attachments: [value] }), true);
    const before = fixture.attachments.get(value.id);
    assert.match(before.revisionId, /^[0-9a-f]{40}$/);

    assert.equal(await commitRestoreBatch({ attachments: [{
      ...value, blob: new Blob(['other']), revisionId: before.revisionId,
    }] }), true);
    const after = fixture.attachments.get(value.id);
    assert.notEqual(after.revisionId, before.revisionId);
    assert.equal(await after.blob.text(), 'other');
  }, () => fixture.db.onclose?.());
});

test('QuotaExceededError during attachment put aborts earlier queued domain writes', async () => {
  const fixture = fakeDatabase();
  const original = fixture.db.transaction;
  fixture.db.transaction = function(stores, mode) {
    const tx = original.call(this, stores, mode);
    if (mode !== 'readwrite' || !Array.isArray(stores) || !stores.includes('attachments')) return tx;
    const objectStore = tx.objectStore;
    tx.objectStore = function(name) {
      const store = objectStore.call(this, name);
      if (name === 'attachments') {
        store.put = () => { throw new DOMException('Synthetic disk quota', 'QuotaExceededError'); };
      }
      return store;
    };
    return tx;
  };
  fixture.records.set(STORE, { name: STORE, value: { state: { tasks: [{ id: 'before-quota' }] } } });
  await withWindow(fixture.fakeWindow, async () => {
    assert.equal(await commitRestoreBatch({
      stores: [{ name: STORE, value: { state: { tasks: [{ id: 'should-abort' }] } } }],
      attachments: [{ id: 'quota-attachment', blob: new Blob(['synthetic']) }],
    }), false);
    assert.equal(fixture.records.get(STORE).value.state.tasks[0].id, 'before-quota');
    assert.equal(fixture.attachments.has('quota-attachment'), false);
  }, () => fixture.db.onclose?.());
});

test('QuotaExceededError on recovery journal put leaves no pending journal and fails closed', async () => {
  const fixture = fakeDatabase();
  const original = fixture.db.transaction;
  fixture.db.transaction = function(stores, mode) {
    const tx = original.call(this, stores, mode);
    if (stores !== 'migration_meta' || mode !== 'readwrite') return tx;
    const objectStore = tx.objectStore;
    tx.objectStore = function(name) {
      const store = objectStore.call(this, name);
      store.put = () => { throw new DOMException('Synthetic journal quota', 'QuotaExceededError'); };
      return store;
    };
    return tx;
  };
  await withWindow(fixture.fakeWindow, async () => {
    assert.equal(await beginRestoreJournal({
      token: 'qa-journal-quota', wallpaperBefore: [{ id: 'qa-wall', previous: null }],
    }), false);
    assert.equal(await getPendingRestoreJournal(), null);
  }, () => fixture.db.onclose?.());
});
