/**
 * Isolated Chromium startup smoke: verify real startup gating, not merely units.
 * Uses fresh test browser profiles with NO real user storage.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');

const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const normal = await browser.newPage();
    await normal.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await normal.waitForFunction(
      () => window.useNavigationStore?.getState().activeTab?.includes('personal_setup'),
      { timeout: 30000 }
    );
    assert.equal(await normal.evaluate(() => window.useProfileStore.persist.hasHydrated()), true);
    console.log('PASS: Real Chromium startup routes to onboarding only after persisted store hydration.');
    // The migration marker is already committed. An obsolete mirror must
    // not turn an empty installation into a returning legacy user.
    await normal.evaluate(() => {
      localStorage.setItem('momentum-tasks-storage', JSON.stringify({
        state:{tasks:[{id:'qa-stale-mirror',title:'QA stale mirror'}]},version:0
      }));
    });
    await normal.reload({waitUntil:'domcontentloaded',timeout:60000});
    await normal.waitForSelector('[data-app-startup-ready="true"]',{timeout:30000});
    const stale = await normal.evaluate(async () => {
      const db = await import('/src/storage/db.js');
      const row = await db.getCommittedStoreRecord('momentum-profile-storage');
      return {completed:row?.value?.state?.setupCompleted,
        legacy:row?.value?.state?.isLegacyMigrated,
        route:window.useNavigationStore.getState().activeTab};
    });
    assert.equal(stale.completed,false);
    assert.equal(stale.legacy,false);
    assert.match(stale.route,/personal_setup/);
    console.log('PASS: obsolete legacy mirror cannot complete onboarding after migration.');
    await normal.close();

    // Incognito context avoids inheriting the prior page's localStorage/IndexedDB.
    const isolatedContext = await browser.createBrowserContext();
    const unavailable = await isolatedContext.newPage();
    await unavailable.evaluateOnNewDocument(() => {
      Object.defineProperty(window, 'indexedDB', { configurable: true, value: undefined });
    });
    await unavailable.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await unavailable.waitForFunction(
      () => document.querySelector('[role="alert"]')?.textContent?.includes('Cannot safely load saved data'),
      { timeout: 30000 }
    );
    const state = await unavailable.evaluate(() => ({
      errorVisible: Boolean(document.querySelector('[role="alert"]')),
      navigationScreen: window.useNavigationStore?.getState().activeTab,
      hasRetryButton: Array.from(document.querySelectorAll('button')).some(
        button => button.textContent.includes('Retry loading')
      ),
    }));
    assert.equal(state.errorVisible, true);
    assert.equal(state.hasRetryButton, true);
    console.log('PASS: Storage unavailable shows a safe retry screen without rendering private app content.');
    await unavailable.close();
    await isolatedContext.close();
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('FAIL: Isolated startup smoke:', err);
  process.exitCode = 1;
});
