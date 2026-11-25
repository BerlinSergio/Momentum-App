/**
 * Phase 2.11 regression for Task Store's former stale mirror double writer.
 * Real IndexedDB, fresh isolated Chromium context, synthetic tasks only.
 *
 * Checks the invariant we can honestly guarantee: one Zustand mutation
 * produces one authoritative task-domain put and reload cannot revive a
 * stale localStorage mirror. Uncoordinated simultaneous edits from two
 * stale in-memory tabs still need a separate cross-tab CAS design.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');
const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const KEY = 'momentum-task-storage';

async function waitReady(page) {
  await page.waitForFunction(() =>
    window.useTaskStore?.persist?.hasHydrated?.() === true &&
    window.useTaskStore?.getState?.()._hasHydrated === true &&
    window.useProfileStore?.persist?.hasHydrated?.() === true,
    { timeout: 35000 });
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const context = await browser.createBrowserContext();
    const a = await context.newPage();
    await a.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitReady(a);

    const id = 'qa-task-phase211';
    // Startup marks multiple stores hydrated and can persist metadata after
    // the rehydrate promise reports done; isolate the test action from that
    // unrelated startup settling work.
    await new Promise(resolve => setTimeout(resolve, 300));
    await a.evaluate(({ key, id }) => {
      const original = IDBObjectStore.prototype.put;
      window.__qaTaskPuts = 0;
      window.__qaTaskPutDetails = [];
      window.__qaOriginalPut = original;
      IDBObjectStore.prototype.put = function(record, ...args) {
        if (this.name === 'stores' && record?.name === key) {
          const includesTarget = record?.value?.state?.tasks?.some(t => t.id === id) === true;
          window.__qaTaskPutDetails.push({ includesTarget, taskCount: record?.value?.state?.tasks?.length });
          if (includesTarget) window.__qaTaskPuts++;
        }
        return original.call(this, record, ...args);
      };
    }, { key: KEY, id });

    await a.evaluate(id => {
      window.useTaskStore.getState().addTask({
        id, title: 'Phase 2.11 synthetic task', status: 'todo',
      });
    }, id);
    await a.waitForFunction(async ({ key, id }) => {
      const db = await import('/src/storage/db.js');
      const persisted = await db.getStoreItem(key);
      return persisted?.state?.tasks?.some(item => item.id === id) === true;
    }, { timeout: 30000 }, { key: KEY, id });
    // Allow all asynchronous persistence calls from this action to finish
    // before asserting. Count only writes that contain this synthetic task.
    await new Promise(resolve => setTimeout(resolve, 300));
    const captured = await a.evaluate(() => ({
      count: window.__qaTaskPuts, writes: window.__qaTaskPutDetails,
    }));
    assert.equal(captured.count, 1,
      'Each task add must persist its target task once: ' + JSON.stringify(captured.writes));
    console.log('PASS: Single task add persisted with exactly one authoritative IDB task write.');

    await a.evaluate(() => {
      IDBObjectStore.prototype.put = window.__qaOriginalPut;
    });

    // The mirror is a disposable post-commit cache. It must never replace
    // the committed task state during startup, even when it lies.
    const b = await context.newPage();
    await b.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitReady(b);
    const originallyPersisted = await b.evaluate(async ({ key, id }) => {
      const db = await import('/src/storage/db.js');
      return {
        visible: window.useTaskStore.getState().tasks.some(task => task.id === id),
        durable: (await db.getStoreItem(key))?.state?.tasks?.some(task => task.id === id),
      };
    }, { key: KEY, id });
    assert.deepEqual(originallyPersisted, { visible: true, durable: true });

    await b.evaluate(key => {
      localStorage.setItem(key, JSON.stringify({
        version: 0, state: {
          tasks: [{ id: 'qa-stale-mirror-only', title: 'Must not revive' }],
        },
      }));
    }, KEY);
    await b.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitReady(b);
    const afterReload = await b.evaluate(async key => {
      const db = await import('/src/storage/db.js');
      const list = window.useTaskStore.getState().tasks;
      const durable = (await db.getStoreItem(key))?.state?.tasks || [];
      return {
        kept: list.some(task => task.id === 'qa-task-phase211'),
        resurrected: list.some(task => task.id === 'qa-stale-mirror-only'),
        durableKept: durable.some(task => task.id === 'qa-task-phase211'),
      };
    }, KEY);
    assert.deepEqual(afterReload, {
      kept: true, resurrected: false, durableKept: true,
    });
    console.log('PASS: Stale localStorage mirror cannot replace already committed task data after reload.');

    await b.evaluate(id => window.useTaskStore.getState().deleteTask(id), id);
    await b.waitForFunction(async ({ key, id }) => {
      const db = await import('/src/storage/db.js');
      const stored = await db.getStoreItem(key);
      return stored?.state?.tasks?.every(task => task.id !== id) === true;
    }, { timeout: 30000 }, { key: KEY, id });
    await b.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitReady(b);
    const deletedAfterReload = await b.evaluate(id =>
      !window.useTaskStore.getState().tasks.some(task => task.id === id),
    id);
    assert.equal(deletedAfterReload, true);
    console.log('PASS: Task deletion remains deleted after reload; no mirror resurrection.');

    await context.close();
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('FAIL: Phase 2.11 task single writer Chromium:', err);
  process.exitCode = 1;
});
