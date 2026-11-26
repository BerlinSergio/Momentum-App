/**
 * Phase 2.14: isolated two-tab Calendar/Tasbeeh CAS and mirror regressions.
 * 25 paired IDB write races per domain (50 pairs total); synthetic data only.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');

const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const DOMAINS = {
  calendar: { name: 'momentum-calendar-storage-v1', store: 'useCalendarStore', field: 'events' },
  tasbeeh: { name: 'momentum-tasbeeh-storage', store: 'useTasbeehStore', field: 'historyLogs' },
};

async function boot(tab, kind) {
  await tab.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await tab.waitForFunction(store => (
    window[store]?.persist?.hasHydrated?.() === true &&
    window[store]?.getState?.()._hasHydrated === true
  ), { timeout: 45000, polling: 200 }, DOMAINS[kind].store);
}

async function record(tab, kind) {
  return tab.evaluate(async name => {
    const db = await import('/src/storage/db.js');
    return db.getCommittedStoreRecord(name);
  }, DOMAINS[kind].name);
}

async function action(tab, kind, id) {
  await tab.evaluate(({ kind, id }) => {
    if (kind === 'calendar') window.useCalendarStore.getState().addEvent({
      id, title: 'QA event ' + id, date: '2026-11-25', time: '10:00 AM',
    });
    else window.useTasbeehStore.getState().increment();
  }, { kind, id });
}

function durablePayload(row, kind) {
  const state = row?.value?.state || {};
  if (kind === 'calendar') return state.events || [];
  return Number(state.currentCount || 0);
}

async function awaitChange(tab, kind, previous, id) {
  await tab.waitForFunction(async ({ kind, name, previous, id }) => {
    const db = await import('/src/storage/db.js');
    const saved = await db.getStoreItem(name);
    return kind === 'calendar'
      ? saved?.state?.events?.some(event => event.id === id)
      : Number(saved?.state?.currentCount) === Number(previous) + 1;
  }, { timeout: 30000, polling: 200 },
  { kind, name: DOMAINS[kind].name, previous, id });
}

async function uiRace(browser, kind) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage(), b = await context.newPage();
    await boot(a, kind);
    await boot(b, kind);
    await new Promise(resolve => setTimeout(resolve, 250));
    const starting = await record(a, kind);
    const first = 'qa214-' + kind + '-a', stale = 'qa214-' + kind + '-stale';
    const previous = durablePayload(starting, kind);
    await action(a, kind, first);
    await awaitChange(a, kind, previous, first);
    const committed = await record(a, kind);
    await action(b, kind, stale);
    await b.waitForSelector('[data-testid="domain-storage-conflict"]',
      { timeout: 30000 });
    const failure = await b.evaluate(async () => {
      const adapter = await import('/src/storage/zustandIndexedDbStorage.js');
      return {
        detail: adapter.getDomainStorageFailure(),
        banner: document.querySelector('[data-testid="domain-storage-conflict"]')?.textContent || '',
      };
    });
    assert.equal(failure.detail?.domain, DOMAINS[kind].name);
    assert.equal(failure.detail?.code, 'DOMAIN_WRITE_CONFLICT');
    assert.match(failure.banner, new RegExp(kind === 'calendar' ? 'Calendar changes' : 'Tasbeeh changes', 'i'));
    assert.deepEqual(await record(a, kind), committed, kind + ' stale edit overwrote durable data');
    console.log('PASS: ' + kind + ' stale whole-domain edit rejected with visible conflict and no data overwrite.');

    // Mirror values are never trusted on reload; a failed local edit is not
    // silently resurrected from a stale or malicious localStorage mirror.
    await b.evaluate(({ key, kind }) => {
      const state = kind === 'calendar'
        ? { events: [{ id: 'qa214-mirror-only' }] }
        : { currentCount: 999999, historyLogs: [{ id: 'qa214-mirror-only' }] };
      localStorage.setItem(key, JSON.stringify({ state, version: 0 }));
    }, { key: DOMAINS[kind].name, kind });
    await b.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await b.waitForFunction(store => (
      window[store]?.persist?.hasHydrated?.() === true &&
      window[store]?.getState?.()._hasHydrated === true
    ), { timeout: 45000, polling: 200 }, DOMAINS[kind].store);
    const reloaded = await b.evaluate(({ kind }) => {
      const current = kind === 'calendar'
        ? window.useCalendarStore.getState()
        : window.useTasbeehStore.getState();
      return {
        mirrorResurrected: kind === 'calendar'
          ? current.events.some(item => item.id === 'qa214-mirror-only')
          : current.historyLogs.some(item => item.id === 'qa214-mirror-only'),
        count: kind === 'tasbeeh' ? current.currentCount : null,
        warning: Boolean(document.querySelector('[data-testid="domain-storage-conflict"]')),
      };
    }, { kind });
    assert.equal(reloaded.mirrorResurrected, false);
    if (kind === 'tasbeeh') assert.equal(reloaded.count, durablePayload(committed, kind));
    assert.equal(reloaded.warning, false);
    const afterReloadOld = durablePayload(await record(b, kind), kind);
    await action(b, kind, 'qa214-' + kind + '-recovered');
    await awaitChange(b, kind, afterReloadOld, 'qa214-' + kind + '-recovered');
    console.log('PASS: ' + kind + ' safe reload ignored stale mirror and enabled new durable edits.');
  } finally {
    await context.close();
  }
}

async function contention(browser, kind, rounds=25) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage(), b = await context.newPage();
    await boot(a, kind);
    await boot(b, kind);
    const name = DOMAINS[kind].name;
    for (let i=0; i<rounds; i++) {
      const before = await record(a, kind);
      await Promise.all([a,b].map(tab => tab.evaluate(async name => {
        const db = await import('/src/storage/db.js');
        window.__qa214Baseline = await db.getCommittedStoreRecord(name);
      }, name)));
      const results = await Promise.all([a,b].map((tab,index) => tab.evaluate(async ({ kind, name, id }) => {
        const db = await import('/src/storage/db.js');
        const baseline = window.__qa214Baseline;
        const prev = baseline?.value || { version: 0, state: {} };
        const state = { ...(prev.state || {}) };
        if (kind === 'calendar') {
          state.events = [...(state.events || []), { id, title: 'QA race ' + id, date: '2026-11-25' }];
        } else {
          state.historyLogs = [...(state.historyLogs || []), { id, date: '2026-11-25', count: 1 }];
          state.currentCount = (Number(state.currentCount) || 0) + 1;
        }
        try {
          await db.compareAndSwapDomainStore(name, { ...prev, state }, baseline);
          return 'saved';
        } catch (e) {
          return e.code || 'unexpected-error';
        }
      }, { kind, name, id: 'qa214-' + kind + '-round-' + i + '-' + index })));
      assert.deepEqual(results.sort(), ['DOMAIN_WRITE_CONFLICT','saved']);
      const after = await record(a, kind);
      assert.notEqual(after?.revisionId, before?.revisionId);
      const prefix = 'qa214-' + kind + '-round-' + i + '-';
      const collection = after?.value?.state?.[DOMAINS[kind].field] || [];
      assert.equal(collection.filter(item => item.id.startsWith(prefix)).length, 1,
        kind + ' round ' + i + ' committed both stale writes');
    }
    console.log('PASS: ' + kind + ' ' + rounds + ' simultaneous two-tab CAS races; exactly one commit per revision.');
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    await uiRace(browser, 'calendar');
    await uiRace(browser, 'tasbeeh');
    await contention(browser, 'calendar');
    await contention(browser, 'tasbeeh');
  } finally {
    await browser.close();
  }
}
main().catch(error => {
  console.error('FAIL: Phase 2.14 Calendar/Tasbeeh cross-tab stress:', error);
  process.exitCode = 1;
});
