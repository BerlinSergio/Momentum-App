/**
 * Phase 2.3 — isolated IndexedDB connection lifecycle regression tests.
 * No real browser profile, actual user records, or persistent database.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

let sequence = 0;
async function freshDb() {
  const url = new URL('../../src/storage/db.js', import.meta.url);
  url.searchParams.set('lifecycle-test', String(sequence++));
  return import(url.href);
}

async function withWindow(fake, callback) {
  const hadWindow = Object.prototype.hasOwnProperty.call(globalThis, 'window');
  const oldWindow = globalThis.window;
  globalThis.window = fake;
  try { return await callback(); }
  finally {
    if (hadWindow) globalThis.window = oldWindow;
    else delete globalThis.window;
  }
}

function fakeOpenSequence() {
  const requests = [];
  const databases = [];
  const indexedDB = {
    open() {
      const db = {
        closeCalls: 0,
        close() { this.closeCalls += 1; },
        onclose: null,
        onversionchange: null,
      };
      databases.push(db);
      const request = { result: db, onsuccess: null, onerror: null, onblocked: null };
      requests.push(request);
      return request;
    },
  };
  return { indexedDB, requests, databases };
}

test('blocked database open returns unavailable without indefinite hydration wait', async () => {
  const fixture = fakeOpenSequence();
  await withWindow({ indexedDB: fixture.indexedDB }, async () => {
    const db = await freshDb();
    const opening = db.openAppDB();
    fixture.requests[0].onblocked();
    assert.equal(await opening, null);
    // A synthetic memory write is not presented as durable.
    const pendingWrite = db.setStoreItem('synthetic', { balance: 17 });
    fixture.requests[1].onblocked();
    assert.equal(await pendingWrite, false);
  });
});

test('late open success after a blocked result is closed and never cached', async () => {
  const fixture = fakeOpenSequence();
  await withWindow({ indexedDB: fixture.indexedDB }, async () => {
    const db = await freshDb();
    const opening = db.openAppDB();
    fixture.requests[0].onblocked();
    assert.equal(await opening, null);
    fixture.requests[0].onsuccess();
    assert.equal(fixture.databases[0].closeCalls, 1);

    const retry = db.openAppDB();
    fixture.requests[1].onsuccess();
    assert.strictEqual(await retry, fixture.databases[1]);
    assert.strictEqual(await db.openAppDB(), fixture.databases[1]);
    assert.equal(fixture.requests.length, 2);
  });
});

test('versionchange invalidates connection so retry opens a new database', async () => {
  const fixture = fakeOpenSequence();
  await withWindow({ indexedDB: fixture.indexedDB }, async () => {
    const db = await freshDb();
    const first = db.openAppDB();
    fixture.requests[0].onsuccess();
    assert.strictEqual(await first, fixture.databases[0]);
    fixture.databases[0].onversionchange();
    assert.equal(fixture.databases[0].closeCalls, 1);

    const second = db.openAppDB();
    fixture.requests[1].onsuccess();
    assert.strictEqual(await second, fixture.databases[1]);
  });
});

test('unexpected close invalidates cached database connection', async () => {
  const fixture = fakeOpenSequence();
  await withWindow({ indexedDB: fixture.indexedDB }, async () => {
    const db = await freshDb();
    const first = db.openAppDB();
    fixture.requests[0].onsuccess();
    await first;
    fixture.databases[0].onclose();

    const retry = db.openAppDB();
    fixture.requests[1].onsuccess();
    assert.strictEqual(await retry, fixture.databases[1]);
  });
});

test('failed open request can retry without clearing IndexedDB', async () => {
  const fixture = fakeOpenSequence();
  await withWindow({ indexedDB: fixture.indexedDB }, async () => {
    const db = await freshDb();
    const first = db.openAppDB();
    fixture.requests[0].error = new Error('Synthetic IDB denial');
    fixture.requests[0].onerror({ target: fixture.requests[0] });
    assert.equal(await first, null);

    const retry = db.openAppDB();
    fixture.requests[1].onsuccess();
    assert.strictEqual(await retry, fixture.databases[1]);
  });
});
