/**
 * Isolated wallpaper persistence transaction regressions.
 * All wallpaper records are synthetic. No user profile or actual IndexedDB.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { saveWallpaperToIndexedDB, deleteWallpaperFromIndexedDB } from '../../src/utils/wallpaperStorage.js';

async function withWindow(value, callback) {
  const existed = Object.hasOwn(globalThis, 'window');
  const old = globalThis.window;
  globalThis.window = value;
  try { return await callback(); }
  finally {
    if (existed) globalThis.window = old;
    else delete globalThis.window;
  }
}

function fakeDatabase(outcome = 'commit') {
  const values = new Map();
  let closeCount = 0;
  const database = {
    close() { closeCount += 1; },
    transaction() {
      const writes = [];
      const tx = {
        oncomplete: null, onabort: null, onerror: null,
        abort() { this.onabort?.({ target: this }); },
        objectStore() {
          return {
            put(record) {
              const req = { onsuccess: null, onerror: null };
              writes.push({ type: 'put', record, req });
              queueMicrotask(finish);
              return req;
            },
            delete(key) {
              const req = { onsuccess: null, onerror: null };
              writes.push({ type: 'delete', key, req });
              queueMicrotask(finish);
              return req;
            },
          };
        },
      };
      function finish() {
        for (const op of writes) op.req.onsuccess?.({ target: op.req });
        if (outcome === 'abort') tx.onabort?.({ target: tx });
        else {
          for (const op of writes) {
            if (op.type === 'put') values.set(op.record.id, op.record);
            else values.delete(op.key);
          }
          tx.oncomplete?.({ target: tx });
        }
      }
      return tx;
    },
  };
  return {
    values,
    closeCount: () => closeCount,
    fakeWindow: {
      indexedDB: {
        open() {
          const req = { result: database, onsuccess: null, onerror: null };
          queueMicrotask(() => req.onsuccess?.({ target: req }));
          return req;
        },
      },
    },
  };
}

test('wallpaper put request success followed by transaction abort returns false', async () => {
  const mock = fakeDatabase('abort');
  await withWindow(mock.fakeWindow, async () => {
    assert.equal(await saveWallpaperToIndexedDB('qa-wall', 'data:image/png;base64,YQ=='), false);
    assert.equal(mock.values.has('qa-wall'), false);
    assert.equal(mock.closeCount(), 1);
  });
});

test('wallpaper committed save and delete return true', async () => {
  const mock = fakeDatabase('commit');
  await withWindow(mock.fakeWindow, async () => {
    assert.equal(await saveWallpaperToIndexedDB('qa-wall', 'data:image/png;base64,YQ=='), true);
    assert.equal(mock.values.get('qa-wall')?.dataUrl, 'data:image/png;base64,YQ==');
    assert.equal(await deleteWallpaperFromIndexedDB('qa-wall'), true);
    assert.equal(mock.values.has('qa-wall'), false);
    assert.equal(mock.closeCount(), 2);
  });
});

test('wallpaper delete request success followed by transaction abort returns false', async () => {
  const mock = fakeDatabase('abort');
  mock.values.set('qa-wall', { id: 'qa-wall', dataUrl: 'data:image/png;base64,YQ==' });
  await withWindow(mock.fakeWindow, async () => {
    assert.equal(await deleteWallpaperFromIndexedDB('qa-wall'), false);
    assert.equal(mock.values.has('qa-wall'), true);
  });
});

test('wallpaper store unavailable does not falsely report durable success', async () => {
  await withWindow({}, async () => {
    assert.equal(await saveWallpaperToIndexedDB('qa-wall', 'data:image/png;base64,YQ=='), false);
    assert.equal(await deleteWallpaperFromIndexedDB('qa-wall'), false);
  });
});
