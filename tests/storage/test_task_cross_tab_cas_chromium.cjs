/**
 * Phase 2.11: real-Chromium task Zustand persistence across two independent tabs.
 * Verifies only one writer per task action, optimistic compare-and-swap, and
 * an in-app warning rather than silently overwriting the other tab.
 * Uses disposable browser contexts and synthetic task IDs.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');
const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const KEY = 'momentum-task-storage';

async function loadReady(page, label) {
  const runtimeErrors = [];
  page.on('pageerror', error => runtimeErrors.push(String(error.stack || error)));
  page.on('console', msg => {
    if (msg.type() === 'error') runtimeErrors.push(msg.text().slice(0, 400));
  });
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await page.waitForFunction(() => {
        const hydrated = window.useTaskStore?.persist?.hasHydrated?.() === true &&
          window.useProfileStore?.persist?.hasHydrated?.() === true;
        const error = [...document.querySelectorAll('[role="alert"]')]
          .some(el => el.textContent?.includes('Cannot safely load saved data'));
        return hydrated || error;
      }, { polling: 100, timeout: 18000 });
    } catch (error) {
      const snapshot = await page.evaluate(() => ({
        taskStore: Boolean(window.useTaskStore),
        profileStore: Boolean(window.useProfileStore),
        taskHydrated: window.useTaskStore?.persist?.hasHydrated?.() ?? null,
        profileHydrated: window.useProfileStore?.persist?.hasHydrated?.() ?? null,
        taskFlag: window.useTaskStore?.getState?.()._hasHydrated ?? null,
        storageConflict: window.__momentumStorageConflict ?? null,
        visible: document.body?.innerText?.slice(0, 450) || '',
      }));
      throw new Error(label + ' startup diagnostic: ' +
        JSON.stringify({ snapshot, runtimeErrors: runtimeErrors.slice(0, 8) }), { cause: error });
    }
    const state = await page.evaluate(() => ({
      tasksReady: window.useTaskStore?.persist?.hasHydrated?.() === true,
      profileReady: window.useProfileStore?.persist?.hasHydrated?.() === true,
      safeError: [...document.querySelectorAll('[role="alert"]')].some(
        el => el.textContent?.includes('Cannot safely load saved data')
      ),
    }));
    if (state.tasksReady && state.profileReady) return;
    assert.equal(state.safeError, true, label + ' must fail closed');
    if (attempt === 1) throw new Error(label + ' not safely hydrated after reload');
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
  }
}
async function readTasks(page) {
  return page.evaluate(async () => {
    const { getCommittedStoreValue } = await import('/src/storage/db.js');
    return (await getCommittedStoreValue('momentum-task-storage'))?.state?.tasks || [];
  });
}
async function waitForDurableTask(page, id) {
  await page.waitForFunction(async taskId => {
    const { getCommittedStoreValue } = await import('/src/storage/db.js');
    const snapshot = await getCommittedStoreValue('momentum-task-storage');
    return snapshot?.state?.tasks?.some(task => task.id === taskId);
  }, { polling: 100, timeout: 15000 }, id);
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const context = await browser.createBrowserContext();
    const a = await context.newPage();
    const b = await context.newPage();
    await loadReady(a, 'first task tab');
    await loadReady(b, 'second task tab');

    // Observe the actual native IndexedDB put count for the task domain.
    await a.evaluate(key => {
      const originalPut = IDBObjectStore.prototype.put;
      window.__qaTaskWriteCount = 0;
      window.__qaRestorePut = () => {
        IDBObjectStore.prototype.put = originalPut;
      };
      IDBObjectStore.prototype.put = function(record, ...args) {
        if (this.name === 'stores' && record?.name === key) {
          window.__qaTaskWriteCount += 1;
        }
        return originalPut.call(this, record, ...args);
      };
    }, KEY);

    // The task store is not initially writable from localStorage mirrors.
    const firstId = 'qa-task-tab-A-211';
    await a.evaluate(id => {
      window.useTaskStore.getState().addTask({
        id, title: 'Concurrent writer A', description: 'Synthetic safe test',
      });
    }, firstId);
    await waitForDurableTask(a, firstId);
    const writes = await a.evaluate(() => window.__qaTaskWriteCount);
    assert.equal(writes, 1, 'A task action must make exactly one authoritative IDB write');
    console.log('PASS: A task mutation issues one committed IDB write, not duplicate mirror writes.');

    // B hydrated BEFORE A saved its task. Its local task snapshot is now
    // stale, so it cannot overwrite the authoritative task from A.
    const staleId = 'qa-task-tab-B-211';
    await b.evaluate(id => {
      window.useTaskStore.getState().addTask({
        id, title: 'Stale tab B', description: 'Must not overwrite tab A',
      });
    }, staleId);
    await b.waitForFunction(() =>
      window.__momentumStorageConflict === 'momentum-task-storage' &&
      [...document.querySelectorAll('[role="alert"]')].some(el =>
        el.textContent?.includes('Another Momentum tab has newer saved data')),
      { polling: 100, timeout: 15000 }
    );
    const recordsAfterConflict = await readTasks(a);
    assert.ok(recordsAfterConflict.some(task => task.id === firstId));
    assert.ok(!recordsAfterConflict.some(task => task.id === staleId));
    console.log('PASS: Stale tab rejects task overwrite and exposes a persistent safe-reload warning.');

    // Additional stale writes must remain blocked until that tab is reloaded.
    // Zustand may surface the rejected persistence synchronously to callers.
    let staleAttemptError = null;
    try {
      await b.evaluate(() => window.useTaskStore.getState().addTask({
        id: 'qa-task-tab-B-second', title: 'Another stale attempt',
      }));
    } catch (error) {
      staleAttemptError = String(error);
    }
    if (staleAttemptError) assert.match(staleAttemptError, /stale data from another tab/);
    const afterSecondAttempt = await readTasks(a);
    assert.equal(afterSecondAttempt.some(task => task.id === 'qa-task-tab-B-second'), false);

    // A can continue saving, and B can reload to obtain the authoritative
    // record set before making a new valid edit.
    const secondId = 'qa-task-tab-A-second-211';
    await a.evaluate(id => window.useTaskStore.getState().addTask({
      id, title: 'A second durable update',
    }), secondId);
    await waitForDurableTask(a, secondId);
    await b.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await b.waitForFunction(() =>
      window.useTaskStore?.persist?.hasHydrated?.() === true,
      { polling: 100, timeout: 30000 }
    );
    const bTasks = await b.evaluate(() => window.useTaskStore.getState().tasks.map(x => x.id));
    assert.ok(bTasks.includes(firstId));
    assert.ok(bTasks.includes(secondId));
    assert.equal(bTasks.includes(staleId), false);

    const freshId = 'qa-task-tab-B-fresh-211';
    await b.evaluate(id => window.useTaskStore.getState().addTask({
      id, title: 'Fresh edit after reload',
    }), freshId);
    await waitForDurableTask(b, freshId);
    const final = await readTasks(b);
    for(const id of [firstId, secondId, freshId]) {
      assert.ok(final.some(task => task.id === id), 'Expected preserved task ' + id);
    }
    console.log('PASS: Reloaded stale tab sees authoritative tasks and safely resumes saving.');

    await a.evaluate(() => window.__qaRestorePut?.());
    await context.close();
  } finally {
    await browser.close();
  }
}
main().catch(error => {
  console.error('FAIL: Task cross-tab CAS Chromium:', error);
  process.exitCode = 1;
});
