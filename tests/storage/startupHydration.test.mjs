/**
 * Focused regression suite for Issue #9 startup hydration and stale localStorage.
 * All data is synthetic; no real browser profiles or user records are used.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { coordinateHydration } from '../../src/utils/hydrationCoordinator.js';
import { createIndexedDbStorage } from '../../src/storage/zustandIndexedDbStorage.js';

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}
function makeStore(hydrationPromise = Promise.resolve(), hasHydrated = () => true) {
  let ready = false;
  const store = {
    persist: { rehydrate: () => hydrationPromise, hasHydrated },
    getState: () => ({ setHasHydrated(value) { ready = value; } }),
  };
  return { store, isReady: () => ready };
}
async function withWindow(fake, fn) {
  const had = Object.prototype.hasOwnProperty.call(globalThis, 'window');
  const old = globalThis.window;
  if (fake === undefined) delete globalThis.window;
  else globalThis.window = fake;
  try { return await fn(); }
  finally { if (had) globalThis.window = old; else delete globalThis.window; }
}

test('each store becomes ready only after its own hydration has finished', async () => {
  const pending = deferred();
  const slow = makeStore(pending.promise);
  const fast = makeStore();
  let prepared = false;
  const result = coordinateHydration({
    stores: [{ name: 'fast', store: fast.store }, { name: 'slow', store: slow.store }],
    prepare: async () => { prepared = true; },
    timeoutMs: 150,
  });
  await new Promise(resolve => setTimeout(resolve, 5));
  assert.equal(prepared, true);
  assert.equal(fast.isReady(), true);
  assert.equal(slow.isReady(), false);
  pending.resolve();
  assert.deepEqual(await result, { success: true });
  assert.equal(slow.isReady(), true);
});

test('timeout rejects and does not mark a blocked store hydrated', async () => {
  const pending = deferred();
  const blocked = makeStore(pending.promise);
  await assert.rejects(
    coordinateHydration({ stores: [{ name: 'blocked', store: blocked.store }], timeoutMs: 15 }),
    /timed out/
  );
  assert.equal(blocked.isReady(), false);
});

test('migration/preparation failure prevents hydration', async () => {
  let hydrated = false;
  const store = makeStore();
  store.store.persist.rehydrate = () => { hydrated = true; return Promise.resolve(); };
  await assert.rejects(
    coordinateHydration({
      stores: [{ name: 'notes', store: store.store }],
      prepare: async () => { throw new Error('Migration failed'); },
      timeoutMs: 100,
    }),
    /Migration failed/
  );
  assert.equal(hydrated, false);
  assert.equal(store.isReady(), false);
});

test('Zustand hydration status is checked even after rehydrate resolves', async () => {
  const falseReady = makeStore(Promise.resolve(), () => false);
  await assert.rejects(
    coordinateHydration({ stores: [{ name: 'finance', store: falseReady.store }], timeoutMs: 100 }),
    /Storage hydration failed/
  );
  assert.equal(falseReady.isReady(), false);
});

test('stale localStorage never replaces an absent IndexedDB value', async () => {
  const stale = '{"state":{"notes":[{"id":"deleted-note"}]},"version":0}';
  const calls = [];
  const localStorage = {
    getItem: key => { calls.push(key); return stale; },
    setItem: () => { throw new Error('No writes expected'); },
    removeItem: () => {},
  };
  await withWindow({ localStorage }, async () => {
    const adapter = createIndexedDbStorage();
    assert.equal(await adapter.getItem('momentum-notes-storage'), null);
    assert.deepEqual(calls, []);
  });
});

test('failed durable save never updates the localStorage mirror', async () => {
  const written = [];
  const localStorage = {
    getItem: () => null,
    setItem: (key, value) => written.push({ key, value }),
    removeItem: () => {},
  };
  await withWindow({ localStorage }, async () => {
    const adapter = createIndexedDbStorage();
    await assert.rejects(adapter.setItem('qa-hydration-mirror', '{"state":{"synthetic":true}}'), /Durable save failed/);
    assert.equal(written.length, 0);
  });
});

test('failed IndexedDB read rejects rather than restoring stale localStorage', async () => {
  // Inject a synthetic read error through an isolated connection; no real IDB.
  const localStorage = { getItem: () => '{"state":{"stale":true}}', setItem: () => {}, removeItem: () => {} };
  const fakeDb = {
    close: () => {},
    transaction: () => ({
      objectStore: () => ({
        get: () => {
          const req = { onsuccess: null, onerror: null, error: new Error('Injected read error') };
          queueMicrotask(() => req.onerror?.({ target: req }));
          return req;
        },
      }),
    }),
  };
  const fakeIndexedDB = {
    open: () => {
      const req = { result: fakeDb, onsuccess: null, onerror: null };
      queueMicrotask(() => req.onsuccess?.({ target: req }));
      return req;
    },
  };
  await withWindow({ localStorage, indexedDB: fakeIndexedDB }, async () => {
    const adapter = createIndexedDbStorage();
    await assert.rejects(adapter.getItem('synthetic-unknown-key'), /Injected read error/);
  });
});
