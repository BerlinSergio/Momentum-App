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
    // A hydration flag is not a durable bootstrap barrier. Establish the
    // initial security record before the second tab captures its baseline.
    // Do not retry or suppress any conflict after a user edit.
    if (domain === 'security') {
      await a.waitForFunction(async () => {
        const db = await import('/src/storage/db.js');
        const row = await db.getCommittedStoreRecord('momentum-security-storage');
        return row?.revisionId && row?.value?.state?.hasPin === false &&
          row.value.state.lockFinance === true;
      }, { timeout: 30000, polling: 200 });
      await a.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
      await boot(a, domain, false);
    }
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

    // Reset must neither unlock a protected session nor fabricate readiness.
    const resetBlocked = await a.evaluate(async () => {
      const db = await import('/src/storage/db.js');
      const store = window.useSecurityStore;
      const key = 'momentum-security-storage';
      const before = await db.getCommittedStoreRecord(key);
      const lockedReset = await store.getState().resetToDefaults();
      // Only in this isolated test, simulate a pending hydration flag.
      await store.getState().setHasHydrated(false);
      const notReadyReset = await store.getState().resetToDefaults();
      const stillNotReady = store.getState()._hasHydrated === false;
      await store.getState().setHasHydrated(true);
      const after = await db.getCommittedStoreRecord(key);
      const current = store.getState();
      return { lockedRejected: lockedReset?.success === false,
        notReadyRejected: notReadyReset?.success === false, stillNotReady,
        locked: current.isLocked, hasPin: current.hasPin, active: current.isAppLockActive,
        unchanged: JSON.stringify(before) === JSON.stringify(after) };
    });
    assert.deepEqual(resetBlocked, { lockedRejected: true, notReadyRejected: true,
      stillNotReady: true, locked: true, hasPin: true, active: true, unchanged: true });
    console.log('PASS: reset rejects locked and unhydrated sessions without changing durable metadata.');

    const unauthorizedPause = await a.evaluate(async () => {
      const db = await import('/src/storage/db.js');
      const before = await db.getCommittedStoreRecord('momentum-security-storage');
      const store = window.useSecurityStore.getState();
      const direct = await store.setAppLockActive(false);
      const generic = await store.updatePreferences({ isAppLockActive: false });
      const wrongPin = await store.pauseAppLock('0000');
      const after = await db.getCommittedStoreRecord('momentum-security-storage');
      return { rejected: [direct, generic, wrongPin].every(r => r?.success === false),
        unchanged: JSON.stringify(before) === JSON.stringify(after),
        active: window.useSecurityStore.getState().isAppLockActive };
    });
    assert.deepEqual(unauthorizedPause, { rejected: true, unchanged: true, active: true });

    const authorizedPause = await a.evaluate(async () => {
      const db = await import('/src/storage/db.js');
      const svc = await import('/src/utils/credentialService.js');
      const key = 'momentum-credential-verifier';
      const before = await db.getCommittedStoreRecord(key);
      const result = await window.useSecurityStore.getState().pauseAppLock('2468');
      const after = await db.getCommittedStoreRecord(key);
      const metadata = await db.getStoreItem('momentum-security-storage');
      return { success: result.success, retained: JSON.stringify(before) === JSON.stringify(after),
        pinValid: (await svc.verifyCredential('2468')).success, active: metadata.state.isAppLockActive,
        hasPin: metadata.state.hasPin };
    });
    assert.deepEqual(authorizedPause, { success: true, retained: true, pinValid: true, active: false, hasPin: true });

    const resetAllowed = await a.evaluate(async () => {
      const db = await import('/src/storage/db.js');
      const svc = await import('/src/utils/credentialService.js');
      const store = window.useSecurityStore;
      const before = await db.getCommittedStoreRecord(svc.CREDENTIAL_STORE_KEY);
      await store.getState().setLockTiming('5min');
      await store.getState().resetToDefaults();
      const after = await db.getCommittedStoreRecord(svc.CREDENTIAL_STORE_KEY);
      const meta = (await db.getCommittedStoreRecord('momentum-security-storage')).value.state;
      return { retained: JSON.stringify(before) === JSON.stringify(after),
        pinValid: (await svc.verifyCredential('2468')).success,
        hasPin: meta.hasPin, active: meta.isAppLockActive, timing: meta.lockTiming };
    });
    assert.deepEqual(resetAllowed, { retained: true, pinValid: true, hasPin: true, active: false, timing: 'immediate' });
    console.log('PASS: preference reset retains the committed credential and paused lock state.');

    await a.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await boot(a, 'security', false);
    assert.deepEqual(await a.evaluate(() => {
      const s = window.useSecurityStore.getState();
      return { active: s.isAppLockActive, hasPin: s.hasPin, locked: s.isLocked };
    }), { active: false, hasPin: true, locked: false });
    // Observe the actual commit instead of masking a rejected write with
    // a generic polling timeout. Do not log PINs or verifier contents.
    const enabled = await a.evaluate(async () => {
      const db = await import('/src/storage/db.js');
      const adapter = await import('/src/storage/zustandIndexedDbStorage.js');
      const store = window.useSecurityStore;
      let error = null;
      try {
        const result = await store.getState().setAppLockActive(true);
        if (result?.success === false) error = result.error;
      } catch (e) { error = e.code || e.message; }
      const row = await db.getCommittedStoreRecord('momentum-security-storage');
      return { error, active: store.getState().isAppLockActive,
        durable: row?.value?.state?.isAppLockActive,
        failure: adapter.getDomainStorageFailure() };
    });
    assert.equal(enabled.error, null, JSON.stringify(enabled));
    assert.equal(enabled.active, true, JSON.stringify(enabled));
    assert.equal(enabled.durable, true, JSON.stringify(enabled));
    const transient = await a.evaluate(async () => {
      const db = await import('/src/storage/db.js');
      const store = window.useSecurityStore;
      const key = 'momentum-security-storage';
      const before = await db.getCommittedStoreRecord(key);
      store.getState().setLocked(true);
      const locked = store.getState().isLocked;
      store.getState().setLocked(false);
      const unlocked = !store.getState().isLocked;
      const after = await db.getCommittedStoreRecord(key);
      return { locked, unlocked, unchanged: JSON.stringify(before) === JSON.stringify(after) };
    });
    assert.deepEqual(transient, { locked:true, unlocked:true, unchanged:true });
    console.log('PASS: App Lock pause requires current PIN and retains the verifier across reload.');


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

async function credentialAttemptLimits(browser) {
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    await boot(page, 'security');
    await page.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      return Boolean((await db.getCommittedStoreRecord('momentum-security-storage'))?.revisionId);
    }, {timeout:30000, polling:200});
    const outcome = await page.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      const db = await import('/src/storage/db.js');
      const snapshot = async () => [
        await db.getCommittedStoreRecord(svc.CREDENTIAL_STORE_KEY),
        await db.getCommittedStoreRecord('momentum-security-storage')
      ];
      const setup = await svc.createCredential('2468');
      if (!setup.success) return {setup:false};
      const before = await snapshot();
      await svc.clearLockoutState();
      for (let i = 0; i < 4; i++) await svc.recordFailedAttempt();
      const wrong = await svc.changeCredential('0000','1357');
      const locked = (await svc.readCommittedLockoutState()).isLockedOut;
      const change = await svc.changeCredential('2468','1357');
      const remove = await svc.removeCredential('2468');
      const pause = await svc.pauseAppLock('2468');
      const unchanged = JSON.stringify(before) === JSON.stringify(await snapshot());
      // Simulate expiry in the isolated test session only.
      const state = (await db.getCommittedStoreRecord(svc.LOCKOUT_RECORD_KEY)).value;
      if (!await db.setStoreItem(svc.LOCKOUT_RECORD_KEY,{...state,lockedUntil:Date.now()-1})) throw Error('Test expiry write failed');
      const recovered = await svc.changeCredential('2468','1357');
      const cleared = (await svc.readCommittedLockoutState()).failedAttempts === 0;
      const finalRemove = await svc.removeCredential('1357');
      return {setup:true,wrong:!wrong.success,locked,blocked:[change,remove,pause].every(r=>!r.success),
        unchanged,recovered:recovered.success,cleared,removed:finalRemove.success};
    });
    assert.deepEqual(outcome,{setup:true,wrong:true,locked:true,blocked:true,unchanged:true,recovered:true,cleared:true,removed:true});
    console.log('PASS: credential mutations share the shared persistent attempt limit and recover after expiry.');
  } finally { await context.close(); }
}

async function durableAttemptReservation(browser) {
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    await boot(page,'security');
    await page.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      return Boolean((await db.getCommittedStoreRecord('momentum-security-storage'))?.revisionId);
    }, {timeout:30000,polling:200});
    const outcome = await page.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      const db = await import('/src/storage/db.js');
      const created = await svc.createCredential('2468');
      if (!created.success) return {setupError:created.error};
      localStorage.setItem(svc.LOCKOUT_STORAGE_KEY,JSON.stringify({failedAttempts:1,lockedUntil:0}));
      sessionStorage.setItem(svc.LOCKOUT_STORAGE_KEY,JSON.stringify({failedAttempts:3,lockedUntil:0}));
      const migrated = await svc.authenticatePin('0000');
      const initial = await svc.readCommittedLockoutState();
      sessionStorage.removeItem(svc.LOCKOUT_STORAGE_KEY);
      const put = IDBObjectStore.prototype.put;
      const derive = SubtleCrypto.prototype.deriveBits;
      let injected = false;
      let verifications = 0;
      IDBObjectStore.prototype.put = function(value,...args) {
        if (value?.name === svc.LOCKOUT_RECORD_KEY) {
          injected = true;
          throw new Error('QA reservation write failure');
        }
        return put.call(this,value,...args);
      };
      SubtleCrypto.prototype.deriveBits = function(...args) {
        verifications++;
        return derive.apply(this,args);
      };
      let denied;
      try { denied = await svc.authenticatePin('2468'); }
      finally { IDBObjectStore.prototype.put = put; SubtleCrypto.prototype.deriveBits = derive; }
      const afterFailure = await svc.readCommittedLockoutState();
      // The valid fifth attempt must be allowed to finish and clear its own reservation.
      const recovered = await svc.authenticatePin('2468');
      const cleared = await svc.readCommittedLockoutState();
      // A malformed committed record must never fall back to a permissive mirror.
      localStorage.setItem(svc.LOCKOUT_STORAGE_KEY,JSON.stringify({failedAttempts:0,lockedUntil:0}));
      if (!await db.setStoreItem(svc.LOCKOUT_RECORD_KEY,{failedAttempts:-1,lockedUntil:0})) throw Error('QA corrupt record write failed');
      const invalid = await svc.readCommittedLockoutState();
      const rejected = await svc.authenticatePin('2468');
      return {migration:!migrated.success && initial.failedAttempts===4,
        injected,denied:!denied.success,verifications,unchanged:afterFailure.failedAttempts===4,
        recovered:recovered.success,cleared:cleared.failedAttempts===0&&!cleared.isLockedOut,
        corruptDenied:invalid.unavailable&&invalid.isLockedOut&&!rejected.success};
    });
    assert.deepEqual(outcome,{migration:true,injected:true,denied:true,verifications:0,unchanged:true,
      recovered:true,cleared:true,corruptDenied:true});
    console.log('PASS: PIN attempts reserve durably before crypto, migrate legacy counters, and fail closed on write errors or corruption.');
  } finally { await context.close(); }
}

async function sharedAttemptLimits(browser) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage();
    const b = await context.newPage();
    await boot(a,'security');
    await a.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      return Boolean((await db.getCommittedStoreRecord('momentum-security-storage'))?.revisionId);
    }, {timeout:30000,polling:200});
    assert.equal((await a.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      return svc.createCredential('2468');
    })).success,true);
    await boot(b,'security');
    // Concurrent checks must share a single counter, without lost increments.
    const attempts = await Promise.all(Array.from({length:6},(_,i) =>
      (i%2 ? a:b).evaluate(async () => {
        const svc = await import('/src/utils/credentialService.js');
        return svc.authenticatePin('0000');
      })));
    assert.equal(attempts.every(r=>!r.success),true);
    const read = page => page.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      return svc.readCommittedLockoutState();
    });
    for (const page of [a,b]) {
      const state = await read(page);
      assert.equal(state.failedAttempts,5);
      assert.equal(state.isLockedOut,true);
    }
    await b.close();
    const reopened = await context.newPage();
    await boot(reopened,'security');
    assert.equal((await read(reopened)).isLockedOut,true);
    // Simulate an outdated permissive localStorage mirror; authority remains locked.
    await reopened.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      localStorage.setItem(svc.LOCKOUT_STORAGE_KEY, JSON.stringify({failedAttempts:0,lockedUntil:0}));
    });
    const blocked = await reopened.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      return Promise.all([svc.authenticatePin('2468'),svc.changeCredential('2468','1357'),
        svc.removeCredential('2468'),svc.pauseAppLock('2468')]);
    });
    assert.equal(blocked.every(r=>!r.success),true);
    const recovered = await a.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      const db = await import('/src/storage/db.js');
      const state = (await db.getCommittedStoreRecord(svc.LOCKOUT_RECORD_KEY)).value;
      if (!await db.setStoreItem(svc.LOCKOUT_RECORD_KEY,{...state,lockedUntil:Date.now()-1})) throw Error('Test expiry write failed');
      return svc.authenticatePin('2468');
    });
    assert.equal(recovered.success,true);
    await reopened.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      localStorage.setItem(svc.LOCKOUT_STORAGE_KEY, JSON.stringify({failedAttempts:5,lockedUntil:Date.now()+30000}));
    });
    assert.equal((await read(reopened)).failedAttempts,0);
    assert.equal((await read(reopened)).isLockedOut,false);
    console.log('PASS: shared PIN attempt limit serializes tabs, survives tab closure, and clears on successful authentication.');
  } finally { await context.close(); }
}

async function freshUnlockReceipts(browser) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage();
    await boot(a,'security');
    await a.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      return Boolean((await db.getCommittedStoreRecord('momentum-security-storage'))?.revisionId);
    }, {timeout:30000,polling:200});
    const created = await a.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      return svc.createCredential('2468');
    });
    assert.equal(created.success,true);
    const prepared = await a.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      window.__qaOldUnlock = await svc.authenticatePin('2468');
      return window.__qaOldUnlock.success;
    });
    assert.equal(prepared,true);
    const b = await context.newPage();
    await boot(b,'security');
    assert.equal((await b.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      return svc.changeCredential('2468','1357');
    })).success,true);
    const result = await a.evaluate(async () => {
      const svc = await import('/src/utils/credentialService.js');
      let unlocks = 0;
      const unlock = () => { unlocks++; return true; };
      const stale = await svc.completePinUnlock(window.__qaOldUnlock,unlock);
      delete window.__qaOldUnlock;
      const raw = await svc.verifyCredential('1357');
      const rawDenied = await svc.completePinUnlock(raw,unlock);
      const fresh = await svc.authenticatePin('1357');
      const accepted = await svc.completePinUnlock(fresh,unlock);
      const replay = await svc.completePinUnlock(fresh,unlock);
      return {staleDenied:!stale.success,rawDenied:!rawDenied.success,
        accepted:accepted.success,replayDenied:!replay.success,unlocks};
    });
    assert.deepEqual(result,{staleDenied:true,rawDenied:true,accepted:true,replayDenied:true,unlocks:1});
    console.log('PASS: PIN session unlock rejects obsolete, raw and replayed authorizations across tabs.');
  } finally { await context.close(); }
}

async function lockScreenSingleFlight(browser) {
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    await page.bringToFront();
    await boot(page, 'security');
    await page.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      return Boolean((await db.getCommittedStoreRecord('momentum-security-storage'))?.revisionId);
    }, {timeout:30000, polling:200});
    assert.equal((await page.evaluate(() => window.useSecurityStore.getState().setPin('2468'))).success, true);
    await page.reload({waitUntil:'domcontentloaded', timeout:60000});
    await boot(page, 'security', false);
    await page.waitForSelector('[data-testid="app-lock-screen"]', {timeout:45000});
    await page.evaluate(() => {
      const original = SubtleCrypto.prototype.deriveBits;
      window.__qaDerivations = 0;
      SubtleCrypto.prototype.deriveBits = async function(...args) {
        window.__qaDerivations++;
        await new Promise(resolve => { window.__qaReleaseDerivation = resolve; });
        return original.apply(this,args);
      };
      window.__qaRestoreDeriveBits = () => { SubtleCrypto.prototype.deriveBits = original; };
    });
    const enter = async () => {
      for (const digit of '2468') {
        await page.keyboard.press(digit);
        await new Promise(resolve => setTimeout(resolve, 75));
      }
    };
    await enter();
    await page.waitForFunction(() => window.__qaDerivations === 1, {timeout:10000});
    assert.equal(await page.evaluate(() =>
      [...document.querySelectorAll('[data-testid="app-lock-screen"] button')].every(b => b.disabled)), true);
    await page.keyboard.press('Backspace');
    await enter();
    assert.equal(await page.evaluate(() => window.__qaDerivations), 1);

    // Simulate background/foreground while the real verifier is pending.
    await page.evaluate(() => {
      Object.defineProperty(document,'hidden',{configurable:true,value:true});
      document.dispatchEvent(new Event('visibilitychange'));
      delete document.hidden;
      document.dispatchEvent(new Event('visibilitychange'));
      window.__qaRestoreDeriveBits();
      window.__qaReleaseDerivation();
    });
    await page.waitForFunction(() => {
      const screen = document.querySelector('[data-testid="app-lock-screen"]');
      return screen && [...screen.querySelectorAll('button')].some(b => !b.disabled);
    }, {timeout:15000});
    assert.equal(await page.evaluate(() => window.useSecurityStore.getState().isLocked), true);
    await enter();
    await page.waitForFunction(() => !window.useSecurityStore.getState().isLocked &&
      !document.querySelector('[data-testid="app-lock-screen"]'), {timeout:15000});
    console.log('PASS: lock screen permits one authentication at a time and rejects backgrounded results.');
  } finally { await context.close(); }
}

async function externalLockActivation(browser) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage();
    const b = await context.newPage();
    await boot(a,'security');
    await a.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      return Boolean((await db.getCommittedStoreRecord('momentum-security-storage'))?.revisionId);
    },{timeout:30000,polling:200});
    await boot(b,'security');
    await a.bringToFront();
    assert.equal(await a.$('[data-testid="app-lock-screen"]'),null);
    assert.equal(await a.$('[data-testid="security-session-revoked"]'),null);
    assert.equal((await b.evaluate(()=>window.useSecurityStore.getState().setPin('2468'))).success,true);
    await a.waitForSelector('[data-testid="security-session-revoked"]',{timeout:15000});
    assert.equal(await a.evaluate(()=>window.useSecurityStore.getState().isLocked),true);
    await b.waitForSelector('[data-testid="app-lock-screen"]',{timeout:15000});
    assert.equal(await b.$('[data-testid="security-session-revoked"]'),null);
    await a.reload({waitUntil:'domcontentloaded',timeout:60000});
    await boot(a,'security',false);
    await a.waitForSelector('[data-testid="app-lock-screen"]',{timeout:15000});
    assert.equal(await a.$('[data-testid="security-session-revoked"]'),null);
    assert.equal((await b.evaluate(()=>window.useSecurityStore.getState().pauseAppLock('2468'))).success,true);
    assert.equal(await b.evaluate(()=>window.useSecurityStore.getState().isLocked),false);
    await b.reload({waitUntil:'domcontentloaded',timeout:60000});
    await boot(b,'security',false);
    await b.bringToFront();
    assert.equal(await b.$('[data-testid="app-lock-screen"]'),null);
    assert.equal(await b.$('[data-testid="security-session-revoked"]'),null);
    await a.reload({waitUntil:'domcontentloaded',timeout:60000});
    await boot(a,'security',false);
    await a.evaluate(async()=>{ await window.useSecurityStore.getState().setAppLockActive(true); });
    assert.equal(await a.evaluate(()=>window.useSecurityStore.getState().isLocked),true);
    await b.waitForSelector('[data-testid="security-session-revoked"]',{timeout:15000});
    console.log('PASS: newly configured or reactivated PIN protection revokes previously unprotected tabs.');
  } finally { await context.close(); }
}

async function unlockedSessionRevocation(browser) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage();
    await boot(a,'security');
    await a.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      return Boolean((await db.getCommittedStoreRecord('momentum-security-storage'))?.revisionId);
    }, {timeout:30000,polling:200});
    assert.equal((await a.evaluate(() => window.useSecurityStore.getState().setPin('2468'))).success,true);
    await a.reload({waitUntil:'domcontentloaded',timeout:60000});
    await boot(a,'security',false);
    const b = await context.newPage();
    await boot(b,'security');
    await a.bringToFront();
    await a.waitForSelector('[data-testid="app-lock-screen"]',{timeout:45000});
    await a.waitForFunction(() => {
      const screen=document.querySelector('[data-testid="app-lock-screen"]');
      return screen && [...screen.querySelectorAll('button')].some(button=>!button.disabled);
    },{timeout:15000});
    for (const digit of '2468') {
      await a.keyboard.press(digit);
      await new Promise(resolve=>setTimeout(resolve,75));
    }
    await a.waitForFunction(() => !window.useSecurityStore.getState().isLocked &&
      !document.querySelector('[data-testid="app-lock-screen"]'),{timeout:15000});
    // Ordinary preference changes must not invalidate a valid session.
    const changed = await b.evaluate(async () => {
      const db = await import('/src/storage/db.js');
      const key='momentum-security-storage';
      const before=await db.getCommittedStoreRecord(key);
      await db.compareAndSwapDomainStore(key,{...before.value,state:{...before.value.state,lockTiming:'5min'}},before);
      return true;
    });
    assert.equal(changed,true);
    await new Promise(resolve=>setTimeout(resolve,1500));
    assert.equal(await a.evaluate(()=>window.useSecurityStore.getState().isLocked),false);
    assert.equal((await b.evaluate(async()=>{
      const svc=await import('/src/utils/credentialService.js');
      return svc.changeCredential('2468','1357');
    })).success,true);
    await a.waitForSelector('[data-testid="security-session-revoked"]',{timeout:15000});
    assert.equal(await a.evaluate(()=>window.useSecurityStore.getState().isLocked),true);
    await a.reload({waitUntil:'domcontentloaded',timeout:60000});
    await boot(a,'security',false);
    await a.waitForSelector('[data-testid="app-lock-screen"]',{timeout:45000});
    await a.waitForFunction(()=>[...document.querySelectorAll('[data-testid="app-lock-screen"] button')].some(b=>!b.disabled),{timeout:15000});
    for (const digit of '1357') {
      await a.keyboard.press(digit);
      await new Promise(resolve=>setTimeout(resolve,75));
    }
    await a.waitForFunction(()=>!window.useSecurityStore.getState().isLocked &&
      !document.querySelector('[data-testid="app-lock-screen"]'),{timeout:15000});
    console.log('PASS: an unlocked session survives unrelated preferences but is revoked after PIN rotation in another tab.');
  } finally { await context.close(); }
}

async function biometricAssertionIntegrity(browser) {
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    await page.bringToFront();
    // WebAuthn RP IDs are domain names, not IP literals. The CI server
    // listens on IPv4 loopback; localhost resolves to the same server.
    const biometricUrl = new globalThis.URL(URL);
    if (biometricUrl.hostname === '127.0.0.1') biometricUrl.hostname = 'localhost';
    await page.goto(biometricUrl.href, {waitUntil:'domcontentloaded',timeout:60000});
    await boot(page,'security',false);
    await page.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      return Boolean((await db.getCommittedStoreRecord('momentum-security-storage'))?.revisionId);
    }, {timeout:30000,polling:200});
    const session = await page.createCDPSession();
    await session.send('WebAuthn.enable');
    await session.send('WebAuthn.addVirtualAuthenticator', {options:{
      protocol:'ctap2', transport:'internal', hasResidentKey:true,
      hasUserVerification:true, isUserVerified:true, automaticPresenceSimulation:true
    }});
    const results = await page.evaluate(async () => {
      const svc = await import('/src/utils/biometricAuth.js');
      const key = svc.BIOMETRIC_CREDENTIAL_STORAGE_KEY;
      localStorage.setItem(key,'bGVnYWN5');
      const legacy = await svc.authenticateBiometrics();
      const noPin = await svc.registerBiometrics();
      const creds = await import('/src/utils/credentialService.js');
      const db = await import('/src/storage/db.js');
      const setup = await creds.createCredential('2468');
      if (!setup.success) return {setupError:setup.error};
      const originalCreate = navigator.credentials.create.bind(navigator.credentials);
      let registrationPrompts = 0;
      navigator.credentials.create = (...args) => { registrationPrompts++; return originalCreate(...args); };
      const missing = await svc.registerBiometrics();
      const wrong = await svc.registerBiometrics({currentPin:'0000'});
      const deniedBeforePrompt = !missing.success && !wrong.success && registrationPrompts === 0;
      const registered = await svc.registerBiometrics({currentPin:'2468'});
      navigator.credentials.create = originalCreate;
      if (!registered.success) return {registrationError:registered.error};
      const enrollment = JSON.parse(localStorage.getItem(key));
      const good = await svc.authenticateBiometrics();
      const metaKey = 'momentum-security-storage';
      const setEnabled = async enabled => {
        const before = await db.getCommittedStoreRecord(metaKey);
        await db.compareAndSwapDomainStore(metaKey,{...before.value,state:{...before.value.state,biometricsEnabled:enabled}},before);
      };
      let grants = 0;
      const grant = () => { grants++; return true; };
      const disabledReceipt = await svc.completeBiometricUnlock(good,grant);
      await setEnabled(true);
      const fresh = await svc.authenticateBiometrics();
      const first = await svc.completeBiometricUnlock(fresh,grant);
      const replay = await svc.completeBiometricUnlock(fresh,grant);
      const forged = await svc.completeBiometricUnlock({...fresh},grant);
      const beforeDisable = await svc.authenticateBiometrics();
      await setEnabled(false);
      const afterDisable = await svc.completeBiometricUnlock(beforeDisable,grant);
      await setEnabled(true);
      const receiptChecks = !disabledReceipt.success && first.success && !replay.success && !forged.success && !afterDisable.success;
      const original = navigator.credentials.get.bind(navigator.credentials);
      const tamper = async kind => {
        navigator.credentials.get = async options => {
          const assertion = await original(options);
          const response = assertion.response;
          const copy = {type:assertion.type,id:assertion.id,rawId:assertion.rawId,response:{
            clientDataJSON:response.clientDataJSON,authenticatorData:response.authenticatorData,
            signature:response.signature
          }};
          if (kind === 'signature') {
            const sig = new Uint8Array(response.signature.slice(0));sig[sig.length-1]^=1;
            copy.response.signature=sig.buffer;
          } else if (kind === 'credential') {
            const id = new Uint8Array(assertion.rawId.slice(0));id[0]^=1;copy.rawId=id.buffer;
          } else if (kind === 'challenge') {
            const client = JSON.parse(new TextDecoder().decode(response.clientDataJSON));
            client.challenge='invalid';copy.response.clientDataJSON=new TextEncoder().encode(JSON.stringify(client)).buffer;
          } else if (kind === 'uv') {
            const data=new Uint8Array(response.authenticatorData.slice(0));data[32]&=~4;
            copy.response.authenticatorData=data.buffer;
          } else if (kind === 'revoked') svc.clearBiometricCredential();
          return copy;
        };
        try {return !(await svc.authenticateBiometrics()).success;}
        finally {navigator.credentials.get=original;}
      };
      const signature = await tamper('signature');
      const credential = await tamper('credential');
      const challenge = await tamper('challenge');
      const uv = await tamper('uv');
      const revoked = await tamper('revoked');
      // Restore the synthetic record only to test invalidation independently
      // of localStorage cleanup. No real user credentials are used.
      localStorage.setItem(key,JSON.stringify(enrollment));
      const beforeRotation = await svc.authenticateBiometrics();
      const rotation = await creds.changeCredential('2468','1357');
      const staleReceipt = await svc.completeBiometricUnlock(beforeRotation,grant);
      const rotationReceiptRejected = !staleReceipt.success && grants === 1;
      const oldRejected = !(await svc.authenticateBiometrics()).success;
      const disabled = (await db.getStoreItem(metaKey)).state.biometricsEnabled === false;
      const renewed = await svc.registerBiometrics({currentPin:'1357'});
      const renewedValid = (await svc.authenticateBiometrics()).success;
      const removed = await creds.removeCredential('1357');
      const removedRejected = !(await svc.authenticateBiometrics()).success;
      const recreated = await creds.createCredential('9753');
      const recreatedRejected = !(await svc.authenticateBiometrics()).success;
      return {legacyRejected:!legacy.success,noPinRejected:!noPin.success,deniedBeforePrompt,registered:registered.success,version:enrollment.version,
        good:good.success,receiptChecks,rotationReceiptRejected,signature,credential,challenge,uv,revoked,rotation:rotation.success,oldRejected,disabled,
        renewed:renewed.success,renewedValid,removed:removed.success,removedRejected,recreated:recreated.success,recreatedRejected};
    });
    assert.deepEqual(results,{legacyRejected:true,noPinRejected:true,deniedBeforePrompt:true,registered:true,version:3,good:true,
      receiptChecks:true,rotationReceiptRejected:true,signature:true,credential:true,challenge:true,uv:true,revoked:true,rotation:true,oldRejected:true,disabled:true,
      renewed:true,renewedValid:true,removed:true,removedRejected:true,recreated:true,recreatedRejected:true});
    console.log('PASS: virtual WebAuthn enrollment and signed assertions reject tampering and revocation.');
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
    await credentialAttemptLimits(browser);
    await durableAttemptReservation(browser);
    await sharedAttemptLimits(browser);
    await freshUnlockReceipts(browser);
    await lockScreenSingleFlight(browser);
    await unlockedSessionRevocation(browser);
    await externalLockActivation(browser);
    await biometricAssertionIntegrity(browser);
  } finally { await browser.close(); }
}
main().catch(err => {
  console.error('FAIL: Phase 2.16 profile/security/credential regression:', err);
  process.exitCode = 1;
});
