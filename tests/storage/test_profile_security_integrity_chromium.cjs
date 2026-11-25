/**
 * Phase 2.16: Profile / Security metadata CAS and credential integrity.
 * All browser contexts isolated and seeded with synthetic dummy values.
 * Never logs an actual PIN or cryptographic verifier.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');
const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const DOMAINS = {
  profile: { name: 'momentum-profile-storage', store: 'useProfileStore' },
  security: { name: 'momentum-security-storage', store: 'useSecurityStore' },
};

async function boot(page, domain, navigate = true) {
  if (navigate) await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(store =>
    window[store]?.persist?.hasHydrated?.() === true &&
    window[store]?.getState?.()._hasHydrated === true,
    { timeout: 45000, polling: 200 }, DOMAINS[domain].store);
}

async function record(page, domain) {
  return page.evaluate(async name => {
    const db = await import('/src/storage/db.js');
    return db.getCommittedStoreRecord(name);
  }, DOMAINS[domain].name);
}

async function change(page, domain, label) {
  await page.evaluate(({ domain, label }) => {
    if (domain === 'profile') {
      window.useProfileStore.getState().updateProfile({
        fullName: label, onboardingStep: 'completed', setupCompleted: true,
      });
    } else if (label === 'first') {
      window.useSecurityStore.getState().setLockFinance(false);
    } else if (label === 'stale') {
      window.useSecurityStore.getState().setLockReflections(false);
    } else {
      window.useSecurityStore.getState().setAllowQuickDhikr(false);
    }
  }, { domain, label });
}

async function awaitChange(page, domain, label) {
  try {
    await page.waitForFunction(async ({ name, domain, label }) => {
      const db = await import('/src/storage/db.js');
      const data = (await db.getStoreItem(name))?.state;
      if (domain === 'profile') return data?.fullName === label;
      return label === 'first' ? data?.lockFinance === false
        : label === 'recovered' ? data?.allowQuickDhikr === false : false;
    }, { timeout: 18000, polling: 200 },
    { name: DOMAINS[domain].name, domain, label });
  } catch (error) {
    const details = await page.evaluate(async ({ domain, key }) => {
      const db = await import('/src/storage/db.js');
      const adapter = await import('/src/storage/zustandIndexedDbStorage.js');
      const current = domain === 'profile' ? window.useProfileStore.getState()
        : window.useSecurityStore.getState();
      const stored = await db.getCommittedStoreRecord(key);
      return {
        domain,
        inMemory: domain === 'profile'
          ? { fullName: current.fullName, hydrated: current._hasHydrated }
          : { lockFinance: current.lockFinance,
              lockReflections: current.lockReflections, hydrated: current._hasHydrated },
        persisted: domain === 'profile'
          ? { fullName: stored?.value?.state?.fullName, revision: stored?.revisionId }
          : { lockFinance: stored?.value?.state?.lockFinance,
              lockReflections: stored?.value?.state?.lockReflections,
              revision: stored?.revisionId },
        failure: adapter.getDomainStorageFailure(),
        alerts: [...document.querySelectorAll('[role="alert"]')]
          .map(x => x.textContent?.slice(0, 160)),
      };
    }, { domain, key: DOMAINS[domain].name })
      .catch(e => ({ diagnosticFailure: String(e) }));
    throw new Error('Durable ' + domain + ' edit not committed: ' +
      JSON.stringify(details), { cause: error });
  }
}

async function expectedConflict(page, domain) {
  await page.waitForSelector('[data-testid="domain-storage-conflict"]', { timeout: 30000 });
  const warning = await page.evaluate(async () => {
    const adapter = await import('/src/storage/zustandIndexedDbStorage.js');
    return {
      failure: adapter.getDomainStorageFailure(),
      text: document.querySelector('[data-testid="domain-storage-conflict"]')?.textContent || '',
    };
  });
  assert.equal(warning.failure?.domain, DOMAINS[domain].name);
  assert.equal(warning.failure?.code, 'DOMAIN_WRITE_CONFLICT');
  assert.match(warning.text, /your latest edit.*not saved/i);
  assert.match(warning.text,
    domain === 'profile' ? /Profile changes/i : /Security settings/i);
}

async function uiConflict(browser, domain) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage(), b = await context.newPage();
    await boot(a, domain);
    await boot(b, domain);
    assert.deepEqual(await record(a, domain), await record(b, domain));
    const winner = domain === 'profile' ? 'QA profile committed 216' : 'first';
    await change(a, domain, winner);
    await awaitChange(a, domain, winner);
    const saved = await record(a, domain);
    await change(b, domain, domain === 'profile' ? 'QA profile stale 216' : 'stale');
    await expectedConflict(b, domain);
    assert.deepEqual(await record(a, domain), saved);
    console.log('PASS: ' + domain + ' stale tab rejected without overwriting durable records.');

    // A forged mirror must not cause a resurrected onboarding profile or
    // bypass the active PIN metadata on reload.
    await b.evaluate(({ domain, key }) => {
      const state = domain === 'profile'
        ? { fullName: 'QA PHANTOM PROFILE', setupCompleted: false }
        : { hasPin: true, isAppLockActive: true, pin: '0000' };
      localStorage.setItem(key, JSON.stringify({ state, version: 0 }));
    }, { domain, key: DOMAINS[domain].name });
    await b.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await boot(b, domain, false);
    const actual = await b.evaluate(domain => domain === 'profile'
      ? {
          phantom: window.useProfileStore.getState().fullName === 'QA PHANTOM PROFILE',
          current: window.useProfileStore.getState().fullName,
        }
      : {
          phantom: window.useSecurityStore.getState().hasPin === true,
          pin: window.useSecurityStore.getState().pin,
        }, domain);
    if (domain === 'profile') {
      assert.deepEqual(actual, { phantom: false, current: winner });
    } else {
      assert.deepEqual(actual, { phantom: false, pin: '' });
      // A forged/plaintext mirror AFTER the completed migration marker
      // must NOT silently become a fresh PBKDF2 verifier on reload.
      const credentials = await b.evaluate(async () => {
        const service = await import('/src/utils/credentialService.js');
        return service.hasCredential();
      });
      assert.equal(credentials, false,
        'Post-migration stale PIN mirror must not create a credential');
    }
    assert.equal(await b.$('[data-testid="domain-storage-conflict"]'), null);
    await change(b, domain, domain === 'profile' ? 'QA profile recovered 216' : 'recovered');
    await awaitChange(b, domain, domain === 'profile' ? 'QA profile recovered 216' : 'recovered');
    console.log('PASS: ' + domain + ' reload ignored injected mirror and accepted fresh CAS edit.');
  } finally { await context.close(); }
}

async function casStress(browser, domain, rounds = 20) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage(), b = await context.newPage();
    await boot(a, domain);
    await boot(b, domain);
    const key = DOMAINS[domain].name;
    for (let i = 0; i < rounds; i++) {
      const before = await record(a, domain);
      await Promise.all([a,b].map(page => page.evaluate(async key => {
        const db = await import('/src/storage/db.js');
        window.__qa216Baseline = await db.getCommittedStoreRecord(key);
      }, key)));
      const outcome = await Promise.all([a,b].map((page,index) => page.evaluate(
        async ({ key, label }) => {
          const db = await import('/src/storage/db.js');
          const previous = window.__qa216Baseline;
          const body = previous?.value || { state: {}, version: 0 };
          const state = { ...body.state };
          if (key === 'momentum-profile-storage') state.fullName = label;
          else state.lastModified = label; // Synthetic metadata, never PIN.
          try {
            await db.compareAndSwapDomainStore(key, { ...body, state }, previous);
            return 'saved';
          } catch (error) { return error.code || 'unexpected-error'; }
        }, { key, label: 'qa216-' + domain + '-round-' + i + '-' + index })));
      assert.deepEqual(outcome.sort(), ['DOMAIN_WRITE_CONFLICT','saved']);
      const after = await record(a, domain);
      assert.notEqual(after?.revisionId, before?.revisionId);
      const winner = domain === 'profile' ? after?.value?.state?.fullName
        : after?.value?.state?.lastModified;
      assert.match(winner, new RegExp('^qa216-' + domain + '-round-' + i + '-[01]$'));
    }
    console.log('PASS: ' + domain + ' ' + rounds +
      ' simultaneous two-tab revision races; exactly one committed.');
  } finally { await context.close(); }
}

async function credentialIntegrity(browser) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage(), b = await context.newPage();
    await boot(a, 'security');
    await boot(b, 'security');
    // Hydrated is not the same as a pending initial default-state write
    // having committed. Two concurrently opened new tabs may still be
    // completing the idempotent default bootstrap. Finish that bootstrap
    // and refresh both authoritative baselines before PIN setup.
    await a.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      const row = await db.getCommittedStoreRecord('momentum-security-storage');
      return row?.revisionId && row?.value?.state?.hasPin === false;
    }, { timeout: 30000, polling: 200 });
    await new Promise(resolve => setTimeout(resolve, 300));
    await a.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await boot(a, 'security', false);
    await b.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await boot(b, 'security', false);
    assert.deepEqual(await record(a, 'security'), await record(b, 'security'));
    const invalid = await a.evaluate(() => window.useSecurityStore.getState().setPin('12'));
    assert.equal(invalid.success, false);
    assert.notEqual((await record(a, 'security'))?.value?.state?.hasPin, true,
      'Invalid PIN must not set hasPin or persist secrets');
    const initial = await a.evaluate(() => window.useSecurityStore.getState().setPin('2468'));
    assert.equal(initial.success, true);
    await a.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      const security = await db.getStoreItem('momentum-security-storage');
      return security?.state?.hasPin === true;
    }, { timeout: 30000, polling: 200 });
    const securityRecord = await record(a, 'security');
    assert.equal(securityRecord.value.state.pin, '');
    assert.equal(securityRecord.value.state.alphanumeric, '');
    assert.doesNotMatch(JSON.stringify(securityRecord.value), /2468/);
    const blockedMetadata = await a.evaluate(async () => {
      const db = await import('/src/storage/db.js');
      const store = window.useSecurityStore.getState();
      const key = 'momentum-security-storage';
      const before = await db.getCommittedStoreRecord(key);
      const outcomes = [
        store.setHasPin(false),
        store.setAlphanumeric('synthetic-passcode'),
        store.setGuardrail('hasPin', false),
        store.updatePreferences({ hasPin: false, lockFinance: false }),
        store.updatePreferences(() => ({ pin: '0000' })),
        store.updatePreferences({ _hasHydrated: false, isLocked: false }),
      ];
      const current = window.useSecurityStore.getState();
      const after = await db.getCommittedStoreRecord(key);
      return {
        rejected: outcomes.every(result => result?.success === false),
        unchanged: JSON.stringify(before) === JSON.stringify(after),
        hasPin: current.hasPin,
        hydrated: current._hasHydrated,
        noPlaintext: current.pin === '' && current.alphanumeric === '',
        passcodeType: current.passcodeType,
        lockFinanceUnchanged: current.lockFinance === store.lockFinance,
      };
    });
    assert.deepEqual(blockedMetadata, {
      rejected: true, unchanged: true, hasPin: true, hydrated: true,
      noPlaintext: true, passcodeType: 'pin', lockFinanceUnchanged: true,
    });
    console.log('PASS: generic security preferences cannot mutate credential metadata.');
    const lockedBefore = await a.evaluate(() => {
      window.useSecurityStore.getState().setAppLockActive(true);
      return window.useSecurityStore.getState().isAppLockActive;
    });
    assert.equal(lockedBefore, true);
    await a.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      return (await db.getStoreItem('momentum-security-storage'))?.state?.isAppLockActive === true;
    }, { timeout: 30000, polling: 200 });
    await a.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await boot(a, 'security', false);
    const reloaded = await a.evaluate(() => {
      const s = window.useSecurityStore.getState();
      return { active: s.isAppLockActive, hasPin: s.hasPin, locked: s.isLocked, pin: s.pin };
    });
    assert.deepEqual(reloaded, { active: true, hasPin: true, locked: true, pin: '' });
    console.log('PASS: Reloaded active PIN app-lock is locked; no plaintext PIN in store.');

    const disallowed = await b.evaluate(() => window.useSecurityStore.getState().changePin('1357'));
    assert.equal(disallowed.success, false);
    const rotated = await b.evaluate(async () => {
      const creds = await import('/src/utils/credentialService.js');
      return creds.changeCredential('2468', '1357');
    });
    assert.equal(rotated.success, true);
    // Tab A may have previously read the first verifier; every verification
    // must now read the latest committed verifier from IndexedDB.
    const verification = await a.evaluate(async () => {
      const creds = await import('/src/utils/credentialService.js');
      const old = await creds.verifyCredential('2468');
      const next = await creds.verifyCredential('1357');
      return { old: old.success, next: next.success };
    });
    assert.deepEqual(verification, { old: false, next: true });
    const rejected = await b.evaluate(async () => {
      const creds = await import('/src/utils/credentialService.js');
      return creds.removeCredential();
    });
    assert.equal(rejected.success, false);
    // Force the second put to throw after the first request is queued.
    // IndexedDB must roll back BOTH records; test only isolated synthetic data.
    const rollback = await a.evaluate(async () => {
      const db = await import('/src/storage/db.js');
      const svc = await import('/src/utils/credentialService.js');
      const key = 'momentum-credential-verifier', meta = 'momentum-security-storage';
      const before = [await db.getCommittedStoreRecord(key), await db.getCommittedStoreRecord(meta)];
      const put = IDBObjectStore.prototype.put;
      let injected = false;
      IDBObjectStore.prototype.put = function(value, ...args) {
        if (value?.name === meta) { injected = true; throw new Error('QA injected second-write failure'); }
        return put.call(this, value, ...args);
      };
      let result;
      try { result = await svc.changeCredential('1357','9753'); }
      finally { IDBObjectStore.prototype.put = put; }
      const after = [await db.getCommittedStoreRecord(key), await db.getCommittedStoreRecord(meta)];
      return {injected, rejected: !result.success, unchanged: JSON.stringify(before) === JSON.stringify(after)};
    });
    assert.deepEqual(rollback, {injected:true,rejected:true,unchanged:true});
    console.log('PASS: second-write failure rolls back both credential and metadata.');
    const race = await Promise.all([a,b].map((page,i) => page.evaluate(async i => {
      const svc = await import('/src/utils/credentialService.js');
      return (await svc.changeCredential('1357', i ? '8642' : '9753')).success;
    },i)));
    assert.equal(race.filter(Boolean).length,1);
    const winnerPin = race[0] ? '9753' : '8642';
    const removed = await b.evaluate(async (winnerPin) => {
      const creds = await import('/src/utils/credentialService.js');
      return creds.removeCredential(winnerPin);
    }, winnerPin);
    assert.equal(removed.success, true);
    const afterRemove = await a.evaluate(async () => {
      const creds = await import('/src/utils/credentialService.js');
      return { configured: await creds.hasCredential(),
        stillValid: (await creds.verifyCredential('1357')).success };
    });
    assert.deepEqual(afterRemove, { configured: false, stillValid: false });
    assert.equal((await record(a, 'security')).value.state.hasPin, false);
    assert.equal((await record(a, 'security')).value.state.isAppLockActive, false);
    console.log('PASS: Cross-tab PIN rotation and committed deletion revoke old verifier; no cache fallback.');
  } finally { await context.close(); }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    await uiConflict(browser, 'profile');
    await uiConflict(browser, 'security');
    await casStress(browser, 'profile');
    await casStress(browser, 'security');
    await credentialIntegrity(browser);
  } finally { await browser.close(); }
}
main().catch(err => {
  console.error('FAIL: Phase 2.16 profile/security/credential regression:', err);
  process.exitCode = 1;
});
