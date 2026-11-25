/**
 * Phase 2.11 guarded task persistence: isolated synthetic IndexedDB.
 * Tests the compare-and-swap contract without using real user records.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createIndexedDbStorage } from '../../src/storage/zustandIndexedDbStorage.js';

const TASK = 'momentum-task-storage';

function fakeBrowser() {
  const rows = new Map();
  const events = [];
  const fakeDb = {
    close() {},
    transaction(storeName) {
      if (storeName !== 'stores') throw Error('Unexpected store ' + storeName);
      let settled = false;
      let activeReads = 0;
      const changes = [];
      const tx = {
        oncomplete: null, onabort: null, onerror: null,
        abort() {
          if (settled) return;
          settled = true;
          this.onabort?.();
        },
        objectStore() {
          const complete = () => {
            if (settled || activeReads) return;
            queueMicrotask(() => {
              if (settled || activeReads) return;
              for (const change of changes) {
                if (change.type === 'put') rows.set(change.value.name, structuredClone(change.value));
                else rows.delete(change.key);
              }
              settled = true;
              tx.oncomplete?.();
            });
          };
          return {
            get(key) {
              activeReads++;
              const req = { result: null, onsuccess: null, onerror: null };
              queueMicrotask(() => {
                if (settled) return;
                req.result = rows.get(key) ? structuredClone(rows.get(key)) : null;
                req.onsuccess?.();
                activeReads--;
                complete();
              });
              return req;
            },
            put(value) {
              changes.push({ type: 'put', value });
              queueMicrotask(complete);
              return { onsuccess: null, onerror: null };
            },
            delete(key) {
              changes.push({ type: 'delete', key });
              queueMicrotask(complete);
              return { onsuccess: null, onerror: null };
            },
          };
        },
      };
      return tx;
    },
  };
  const mirror = new Map();
  const browser = {
    indexedDB: {
      open() {
        const req = { result: fakeDb, onsuccess: null, onerror: null };
        queueMicrotask(() => req.onsuccess?.());
        return req;
      },
    },
    localStorage: {
      getItem(key) { return mirror.get(key) || null; },
      setItem(key, value) { mirror.set(key, value); },
      removeItem(key) { mirror.delete(key); },
    },
    CustomEvent: class {
      constructor(type, options) { this.type = type; this.detail = options.detail; }
    },
    dispatchEvent(event) { events.push(event); },
  };
  return { browser, rows, mirror, events };
}
async function withBrowser(browser, fn) {
  const had = Object.hasOwn(globalThis, 'window');
  const old = globalThis.window;
  globalThis.window = browser;
  try { return await fn(); }
  finally {
    if (had) globalThis.window = old;
    else delete globalThis.window;
  }
}
const value = id => JSON.stringify({ state: { tasks: [{ id }] }, version: 0 });
// The production DB module caches one connection per process. Reuse the same
// synthetic browser connection across tests and reset only its contents.
const sharedFixture = fakeBrowser();

test('separate tabs hydrate the same durable task snapshot; stale second write is rejected', async () => {
  const { browser, rows, events } = sharedFixture;
  rows.clear();
  events.length = 0;
  delete browser.__momentumStorageConflict;
  await withBrowser(browser, async () => {
    const a = createIndexedDbStorage({ preventConcurrentWrites: true });
    const b = createIndexedDbStorage({ preventConcurrentWrites: true });
    assert.equal(await a.getItem(TASK), null);
    assert.equal(await b.getItem(TASK), null);

    assert.equal(await a.setItem(TASK, value('tab-a')), true);
    await assert.rejects(b.setItem(TASK, value('stale-tab-b')),
      error => error.code === 'STORAGE_WRITE_CONFLICT');
    assert.equal(rows.get(TASK).value.state.tasks[0].id, 'tab-a');
    assert.equal(events.filter(e => e.type === 'momentum:storage-conflict').length, 1);
    assert.equal(browser.__momentumStorageConflict, TASK);
    await assert.rejects(b.setItem(TASK, value('stale-again')),
      error => error.code === 'STORAGE_WRITE_CONFLICT');
    assert.equal(rows.get(TASK).value.state.tasks[0].id, 'tab-a');

    // After rehydration on a fresh tab instance, new tasks can be saved.
    const fresh = createIndexedDbStorage({ preventConcurrentWrites: true });
    assert.equal(JSON.parse(await fresh.getItem(TASK)).state.tasks[0].id, 'tab-a');
    assert.equal(await fresh.setItem(TASK, value('fresh-tab-b')), true);
    assert.equal(rows.get(TASK).value.state.tasks[0].id, 'fresh-tab-b');
  });
});

test('identical already-durable task values are safe no-ops across tabs', async () => {
  const { browser, rows } = sharedFixture;
  rows.clear();
  delete browser.__momentumStorageConflict;
  await withBrowser(browser, async () => {
    const a = createIndexedDbStorage({ preventConcurrentWrites: true });
    const b = createIndexedDbStorage({ preventConcurrentWrites: true });
    await a.getItem(TASK);
    await b.getItem(TASK);
    assert.equal(await a.setItem(TASK, value('same')), true);
    assert.equal(await b.setItem(TASK, value('same')), true);
    assert.equal(rows.get(TASK).value.state.tasks[0].id, 'same');
    assert.equal(await b.setItem(TASK, value('b-next')), true);
    assert.equal(rows.get(TASK).value.state.tasks[0].id, 'b-next');
  });
});

test('guarded task store refuses an edit before authoritative hydration', async () => {
  const { browser, rows } = sharedFixture;
  rows.clear();
  delete browser.__momentumStorageConflict;
  await withBrowser(browser, async () => {
    const guarded = createIndexedDbStorage({ preventConcurrentWrites: true });
    await assert.rejects(guarded.setItem(TASK, value('unhydrated')), /not finished authoritative hydration/);
    assert.equal(rows.has(TASK), false);
  });
});
