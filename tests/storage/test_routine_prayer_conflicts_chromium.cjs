/**
 * Phase 2.15 — real Chromium Routine + Prayer CAS and derived-write safety.
 * Fresh isolated contexts, synthetic records, no production or device data.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');
const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const DOMAINS = {
  routine: { key: 'momentum-routine-storage', store: 'useRoutineStore', field: 'routines' },
  prayer: { key: 'momentum-prayer-storage', store: 'usePrayerStore', field: 'prayerLogs' },
};
const PRAYER_DATE = '2040-01-01';

async function boot(page, domain, navigate = true) {
  if (navigate) await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(store =>
    window[store]?.persist?.hasHydrated?.() === true &&
    window[store]?.getState?.()._hasHydrated === true,
    { timeout: 45000, polling: 200 }, DOMAINS[domain].store);
}

async function committed(page, domain) {
  return page.evaluate(async key => {
    const db = await import('/src/storage/db.js');
    return db.getCommittedStoreRecord(key);
  }, DOMAINS[domain].key);
}

function data(record, domain) {
  return record?.value?.state?.[DOMAINS[domain].field] || [];
}

async function action(page, domain, id) {
  await page.evaluate(({ domain, id, date }) => {
    if (domain === 'routine') window.useRoutineStore.getState().addRoutine({
      id, title: 'QA Phase 215 ' + id, frequency: 'Every Day',
      completedDates: {}, reminderEnabled: false,
    });
    else window.usePrayerStore.getState().logPrayer(id, {
      dateKey: date, status: 'completed', isOnTime: true,
    });
  }, { domain, id, date: PRAYER_DATE });
}

async function waitCommitted(page, domain, id) {
  await page.waitForFunction(async ({ key, field, id, date }) => {
    const db = await import('/src/storage/db.js');
    const record = await db.getStoreItem(key);
    const items = record?.state?.[field] || [];
    return field === 'routines'
      ? items.some(item => item.id === id)
      : items.some(item => item.prayerId === id && item.date === date);
  }, { timeout: 25000, polling: 200 },
  { ...DOMAINS[domain], id, date: PRAYER_DATE });
}

async function conflict(page, domain) {
  await page.waitForSelector('[data-testid="domain-storage-conflict"]',
    { timeout: 25000 });
  const response = await page.evaluate(async () => {
    const adapter = await import('/src/storage/zustandIndexedDbStorage.js');
    return {
      failure: adapter.getDomainStorageFailure(),
      banner: document.querySelector('[data-testid="domain-storage-conflict"]')?.textContent || '',
    };
  });
  assert.equal(response.failure?.domain, DOMAINS[domain].key);
  assert.equal(response.failure?.code, 'DOMAIN_WRITE_CONFLICT');
  assert.match(response.banner, /latest edit.*not saved/i);
  assert.match(response.banner,
    domain === 'routine' ? /Routine changes/ : /Prayer changes/);
}

async function twoTab(browser, domain) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage(), b = await context.newPage();
    await boot(a, domain);
    await boot(b, domain);
    const initial = await committed(a, domain);
    assert.deepEqual(initial, await committed(b, domain));
    const winner = domain === 'routine' ? 'qa215-routine-winner' : 'fajr';
    const loser = domain === 'routine' ? 'qa215-routine-stale' : 'dhuhr';
    const refreshedId = domain === 'routine' ? 'qa215-routine-refreshed' : 'asr';

    await action(a, domain, winner);
    await waitCommitted(a, domain, winner);
    const afterA = await committed(a, domain);
    assert.notEqual(afterA?.revisionId, initial?.revisionId);
    await action(b, domain, loser);
    await conflict(b, domain);
    assert.deepEqual(await committed(a, domain), afterA);
    console.log('PASS: ' + domain + ' stale tab rejected; committed user records preserved.');

    await b.evaluate(({ domain, key }) => {
      const state = domain === 'routine'
        ? { routines: [{ id: 'qa215-stale-mirror-only', title: 'SHOULD NOT RETURN' }] }
        : { prayerLogs: [{ id: 'qa215-stale-mirror-only', prayerId: 'isha', date: '2040-01-01' }] };
      localStorage.setItem(key, JSON.stringify({ version: 0, state }));
    }, { domain, key: DOMAINS[domain].key });
    await b.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await boot(b, domain, false);
    const reloaded = await b.evaluate(domain => {
      const store = domain === 'routine' ? window.useRoutineStore.getState() :
        window.usePrayerStore.getState();
      const rows = domain === 'routine' ? store.routines : store.prayerLogs;
      return {
        mirrorOnly: rows.some(item => item.id === 'qa215-stale-mirror-only'),
        hasWarning: Boolean(document.querySelector('[data-testid="domain-storage-conflict"]')),
      };
    }, domain);
    assert.deepEqual(reloaded, { mirrorOnly: false, hasWarning: false });
    assert.deepEqual(data(await committed(b, domain), domain), data(afterA, domain));
    await action(b, domain, refreshedId);
    await waitCommitted(b, domain, refreshedId);
    console.log('PASS: ' + domain + ' reload rejected stale mirror and accepted new user edit.');

    const beforeDerived = await committed(b, domain);
    if (domain === 'routine') {
      // An advance to a future day recomputes completed/streak locally.
      await b.evaluate(() => window.useRoutineStore.getState()
        .performDayRollover('2041-02-08'));
      const visibleDate = await b.evaluate(() =>
        window.useRoutineStore.getState().lastActiveDateKey);
      assert.equal(visibleDate, '2041-02-08');
    } else {
      // Countdown only changes the displayed prayer schedule; it must NEVER
      // create a worship completion log or advance a durable revision.
      await b.evaluate(() => {
        window.usePrayerStore.setState(state => ({
          prayers: state.prayers.map(p => p.id === 'fajr' ? { ...p, isNext: true } : p),
        }));
        window.usePrayerStore.getState().advanceToNextPrayer('fajr');
      });
    }
    await new Promise(resolve => setTimeout(resolve, 350));
    const afterDerived = await committed(b, domain);
    assert.deepEqual(afterDerived, beforeDerived,
      domain + ' display-only time progression changed committed user data');
    console.log('PASS: ' + domain + ' derived daily/schedule state did not bump durable revision or synthesize user activity.');
  } finally {
    await context.close();
  }
}

async function stress(browser, domain, rounds = 25) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage(), b = await context.newPage();
    await boot(a, domain);
    await boot(b, domain);
    const { key, field } = DOMAINS[domain];
    for (let i=0; i<rounds; i++) {
      const before = await committed(a, domain);
      await Promise.all([a, b].map(page => page.evaluate(async key => {
        const db = await import('/src/storage/db.js');
        window.__qa215Baseline = await db.getCommittedStoreRecord(key);
      }, key)));
      const results = await Promise.all([a, b].map((page, index) =>
        page.evaluate(async ({ key, field, id }) => {
          const db = await import('/src/storage/db.js');
          const baseline = window.__qa215Baseline;
          const previous = baseline?.value || { state: {}, version: 0 };
          const state = { ...(previous.state || {}) };
          if (field === 'routines') {
            state.routines = [...(state.routines || []),
              { id, title: id, completedDates: {}, active: true }];
          } else {
            state.prayerLogs = [...(state.prayerLogs || []),
              { id, prayerId: 'fajr', date: id, status: 'completed', isOnTime: true }];
          }
          try {
            await db.compareAndSwapDomainStore(key, { ...previous, state }, baseline);
            return 'saved';
          } catch (error) {
            return error.code || 'unexpected-error';
          }
        }, { key, field, id: 'qa215-' + domain + '-race-' + i + '-' + index })));
      assert.deepEqual(results.sort(), ['DOMAIN_WRITE_CONFLICT', 'saved']);
      const after = await committed(a, domain);
      assert.notEqual(after?.revisionId, before?.revisionId);
      assert.equal(data(after, domain).filter(row =>
        row.id?.startsWith('qa215-' + domain + '-race-' + i + '-')).length, 1);
    }
    console.log('PASS: ' + domain + ' ' + rounds +
      ' simultaneous two-tab CAS races; no stale whole-domain overwrites.');
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    await twoTab(browser, 'routine');
    await twoTab(browser, 'prayer');
    await stress(browser, 'routine');
    await stress(browser, 'prayer');
  } finally {
    await browser.close();
  }
}
main().catch(error => {
  console.error('FAIL: Routine/Prayer cross-tab CAS Chromium:', error);
  process.exitCode = 1;
});
