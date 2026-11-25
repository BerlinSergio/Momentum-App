/**
 * Phase 2.12 — real Chromium cross-tab optimistic task writes.
 * Disposable incognito browser contexts + synthetic tasks only.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');

const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const TASKS = 'momentum-task-storage';

async function ready(tab) {
  tab.on('pageerror', error => console.warn('QA startup pageerror:', error.message));
  tab.on('console', message => {
    if (message.type() === 'error' || message.type() === 'warning') {
      console.warn('QA startup console:', message.text().slice(0, 280));
    }
  });
  await tab.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  try {
    await tab.waitForFunction(() =>
      window.useTaskStore?.persist?.hasHydrated?.() === true &&
      window.useTaskStore?.getState?.()._hasHydrated === true &&
      window.useProfileStore?.persist?.hasHydrated?.() === true,
      { timeout: 16000 }
    );
  } catch (error) {
    const diagnostic = await tab.evaluate(async () => {
      const storage = await import('/src/storage/zustandIndexedDbStorage.js');
      return {
        taskHydrated: window.useTaskStore?.persist?.hasHydrated?.(),
        taskFlag: window.useTaskStore?.getState?.()._hasHydrated,
        profileHydrated: window.useProfileStore?.persist?.hasHydrated?.(),
        alert: [...document.querySelectorAll('[role="alert"]')].map(x => x.textContent?.slice(0, 180)),
        text: document.body?.innerText?.slice(0, 320),
        storageError: storage.getTaskStorageFailure(),
      };
    }).catch(e => ({ diagnosticError: String(e) }));
    throw new Error('Task hydration did not settle: ' + JSON.stringify(diagnostic), { cause: error });
  }
}

async function durable(tab) {
  return tab.evaluate(async key => {
    const db = await import('/src/storage/db.js');
    const record = await db.getCommittedStoreRecord(key);
    return {
      tasks: record?.value?.state?.tasks?.map(item => item.id) || [],
      revision: record?.revisionId || null,
    };
  }, TASKS);
}

async function add(tab, id) {
  await tab.evaluate(taskId => {
    window.useTaskStore.getState().addTask({
      id: taskId, title: 'QA concurrent edit ' + taskId, status: 'todo',
    });
  }, id);
}

async function awaitDurableTask(tab, id) {
  await tab.waitForFunction(async ({ id, key }) => {
    const db = await import('/src/storage/db.js');
    return (await db.getStoreItem(key))?.state?.tasks?.some(task => task.id === id) === true;
  }, { timeout: 25000 }, { id, key: TASKS });
}

async function awaitConflict(tab) {
  await tab.waitForSelector('[data-testid="task-storage-conflict"]', { timeout: 25000 });
  const failure = await tab.evaluate(async () => {
    const storage = await import('/src/storage/zustandIndexedDbStorage.js');
    return {
      code: storage.getTaskStorageFailure()?.code,
      message: document.querySelector('[data-testid="task-storage-conflict"]')?.textContent || '',
      reloadButton: Boolean([...document.querySelectorAll('[data-testid="task-storage-conflict"] button')]
        .find(button => button.textContent.includes('Reload saved tasks'))),
    };
  });
  assert.equal(failure.code, 'TASK_WRITE_CONFLICT');
  assert.match(failure.message, /latest task edit.*not saved/i);
  assert.equal(failure.reloadButton, true);
}

async function testStaleTab(browser) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage();
    const b = await context.newPage();
    await ready(a);
    await ready(b);

    const initial = await durable(a);
    assert.deepEqual(initial, await durable(b));

    await add(a, 'qa212-tab-a');
    await awaitDurableTask(a, 'qa212-tab-a');
    const afterA = await durable(a);
    assert.ok(afterA.tasks.includes('qa212-tab-a'));
    assert.ok(afterA.revision && afterA.revision !== initial.revision);

    // B is hydrated from the previous revision; it must not overwrite A.
    await add(b, 'qa212-stale-tab-b');
    await awaitConflict(b);
    const afterB = await durable(a);
    assert.deepEqual(afterB, afterA);
    assert.ok(!afterB.tasks.includes('qa212-stale-tab-b'));
    console.log('PASS: Stale tab receives a persistent task conflict banner; newer data is intact.');

    // After a conflict all future writes in this stale tab remain blocked
    // rather than silently retrying from an invalid in-memory snapshot.
    await add(b, 'qa212-must-remain-uncommitted');
    await new Promise(resolve => setTimeout(resolve, 300));
    assert.deepEqual(await durable(a), afterA);

    await Promise.all([
      b.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 }),
      b.evaluate(() => [...document.querySelectorAll('[data-testid="task-storage-conflict"] button')]
        .find(button => button.textContent.includes('Reload saved tasks'))?.click()),
    ]);
    await b.waitForFunction(() =>
      window.useTaskStore?.persist?.hasHydrated?.() === true &&
      window.useTaskStore?.getState?.()._hasHydrated === true,
      { timeout: 35000 });

    const refreshed = await b.evaluate(() => ({
      ids: window.useTaskStore.getState().tasks.map(task => task.id),
      hasBanner: Boolean(document.querySelector('[data-testid="task-storage-conflict"]')),
    }));
    assert.ok(refreshed.ids.includes('qa212-tab-a'));
    assert.ok(!refreshed.ids.includes('qa212-stale-tab-b'));
    assert.ok(!refreshed.ids.includes('qa212-must-remain-uncommitted'));
    assert.equal(refreshed.hasBanner, false);
    await add(b, 'qa212-after-safe-reload');
    await awaitDurableTask(b, 'qa212-after-safe-reload');
    const afterReload = await durable(b);
    assert.ok(afterReload.tasks.includes('qa212-tab-a'));
    assert.ok(afterReload.tasks.includes('qa212-after-safe-reload'));
    console.log('PASS: Reload discards unsaved stale edits, rehydrates current records, and permits new durable edits.');

  } finally {
    // Incognito context disposal protects user profiles and test isolation.
    await context.close().catch(() => {});
  }
}

async function testSimultaneousTabs(browser) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage();
    const b = await context.newPage();
    await ready(a);
    await ready(b);
    assert.deepEqual(await durable(a), await durable(b));

    // Both tabs add to the same original persisted task snapshot at once.
    await Promise.all([add(a, 'qa212-simultaneous-a'), add(b, 'qa212-simultaneous-b')]);
    await Promise.race([
      a.waitForSelector('[data-testid="task-storage-conflict"]', { timeout: 25000 }),
      b.waitForSelector('[data-testid="task-storage-conflict"]', { timeout: 25000 }),
    ]);
    const saved = await durable(a);
    const numberSaved = ['qa212-simultaneous-a', 'qa212-simultaneous-b']
      .filter(id => saved.tasks.includes(id)).length;
    assert.equal(numberSaved, 1, 'Only one conflicting whole-domain update may commit');
    const conflicts = await Promise.all([a,b].map(tab=>tab.evaluate(() =>
      Boolean(document.querySelector('[data-testid="task-storage-conflict"]')))));
    assert.deepEqual(conflicts.sort(), [false, true]);
    console.log('PASS: Two simultaneous tabs cannot silently overwrite each other; exactly one is rejected.');

  } finally {
    await context.close().catch(() => {});
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    await testStaleTab(browser);
    await testSimultaneousTabs(browser);
  } finally {
    await browser.close();
  }
}
main().catch(error => {
  console.error('FAIL: Cross-tab task CAS Chromium:', error);
  process.exitCode = 1;
});
