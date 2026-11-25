/**
 * Phase 2.10: real Chromium UI contract for oversized backup import.
 * Synthetic File.size only, no 48 MiB in-memory file or private user data.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');

const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const TOO_LARGE = 48 * 1024 * 1024 + 1;

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    // A development global can exist while startup migration and guarded
    // Profile/Security hydration are still running. This UI test must not
    // write profile state until the authoritative startup pass completes.
    await page.waitForFunction(() =>
      window.useProfileStore?.persist?.hasHydrated?.() === true &&
      window.useProfileStore?.getState?.()._hasHydrated === true &&
      window.useSecurityStore?.getState?.()._hasHydrated === true &&
      window.useNavigationStore?.getState?.()._hasHydrated === true &&
      window.useThemeStore?.getState?.()._hasHydrated === true,
      { timeout: 45000, polling: 200 });
    await page.evaluate(() => window.useProfileStore.getState().completeSetup());
    await page.waitForFunction(async () => {
      const db = await import('/src/storage/db.js');
      const profile = await db.getStoreItem('momentum-profile-storage');
      return profile?.state?.setupCompleted === true;
    }, { timeout: 25000, polling: 200 });

    for (const theme of ['dark', 'light']) {
      await page.evaluate(theme => {
        // Navigation is theme-independent; global appearance chooses renderer.
        window.useThemeStore.getState().setTheme(theme);
        window.useNavigationStore.getState().setActiveTab('backup_restore');
      }, theme);

      await page.waitForFunction(theme => {
        return window.useNavigationStore?.getState?.().activeTab === 'backup_restore' &&
          document.documentElement.classList.contains('dark') === (theme === 'dark') &&
          [...document.querySelectorAll('button')].some(el => el.textContent?.includes('Restore Data'));
      }, { timeout: 25000, polling: 200 }, theme);
      await page.evaluate(() => {
        const button = [...document.querySelectorAll('button')].find(el => el.textContent?.includes('Restore Data'));
        button.click();
      });
      await page.waitForSelector('input[type="file"]', { timeout: 25000 });
      const result = await page.evaluate(tooLarge => {
        const input = document.querySelector('input[type="file"]');
        if (!input) throw new Error('Restore file input absent');

        const originalRead = FileReader.prototype.readAsText;
        window.__qaReaderCalls = 0;
        FileReader.prototype.readAsText = function (...args) {
          window.__qaReaderCalls += 1;
          return originalRead.apply(this, args);
        };
        try {
          const dt = new DataTransfer();
          const file = new File(['synthetic-small-content'], 'oversized.momentum-backup',
            { type: 'application/json' });
          dt.items.add(file);
          input.files = dt.files;
          Object.defineProperty(input.files[0], 'size', {
            configurable: true, value: tooLarge,
          });
          input.dispatchEvent(new Event('change', { bubbles: true }));
        } finally {
          FileReader.prototype.readAsText = originalRead;
        }
        return { reads: window.__qaReaderCalls };
      }, TOO_LARGE);

      await page.waitForFunction(() =>
        [...document.querySelectorAll('[role="alert"]')]
          .some(el => el.textContent?.includes('48 MiB')), { timeout: 25000, polling: 200 });
      const message = await page.evaluate(() =>
        [...document.querySelectorAll('[role="alert"]')]
          .find(el => el.textContent?.includes('48 MiB'))?.textContent);
      assert.equal(result.reads, 0, 'No FileReader should run on oversized archive');
      assert.match(message, /not opened or restored/i);
      console.log('PASS: ' + theme + ' backup UI blocks oversized selected archive before FileReader and shows clear warning.');
    }
    await context.close();
  } finally {
    await browser.close();
  }
}
main().catch(error => {
  console.error('FAIL: Oversized backup UI Chromium regression:', error);
  process.exitCode = 1;
});
