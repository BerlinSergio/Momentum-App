/**
 * Visual geometry and interaction smoke test for the mobile active-tab lens.
 * Requires: npm install && npm run dev (in a separate PowerShell window).
 * Uses an isolated headless Chromium profile, not the user's browser data.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const chromePaths = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);
const executablePath = chromePaths.find((file) => fs.existsSync(file));
const url = process.env.MOMENTUM_URL || 'http://localhost:5173/';
const images = path.resolve(process.cwd(), 'scratch/liquid_glass_qa');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  fs.mkdirSync(images, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => Boolean(
      window.useNavigationStore && window.useThemeStore &&
      window.useProfileStore && window.setIsAppLoading
    ), { timeout: 30000 });

    await page.evaluate(() => {
      window.useProfileStore.getState().completeSetup?.();
      window.useSecurityStore?.getState().setLocked?.(false);
      window.useNavigationStore.getState().setSidebarPosition('left');
      window.useLocaleStore.getState().setLocale('en');
      window.setIsAppLoading(false);
    });
    await sleep(500);

    for (const theme of ['light', 'dark']) {
      await page.evaluate((theme) => {
        window.useThemeStore.getState().setTheme(theme);
        window.useNavigationStore.getState().setActiveTab('finance_expense_tracker');
      }, theme);
      await sleep(600);

      const geometry = await page.evaluate(() => {
        const nav = document.querySelector('[data-testid="mobile-bottom-nav"]');
        const selected = nav?.querySelector('[aria-current="page"]');
        const lens = nav?.querySelector('[data-testid="active-bottom-tab-liquid-glass"]');
        const plus = nav?.querySelector('[data-testid="central-action-btn"]');
        if (!nav || !selected || !lens || !plus) return { error: 'MISSING_NAV_OR_LENS' };
        const sr = selected.getBoundingClientRect();
        const lr = lens.getBoundingClientRect();
        const nr = nav.getBoundingClientRect();
        const plusRect = plus.getBoundingClientRect();
        const centers = ['home', 'finance', 'tasks', 'more'].map((key) => {
          const icon = nav.querySelector('[data-testid="mobile-tab-' + key + '"] svg');
          if (!icon) return null;
          const r = icon.getBoundingClientRect();
          return (r.top + r.bottom) / 2;
        });
        return {
          activeTabId: selected.dataset.testid,
          activeCount: nav.querySelectorAll('[aria-current="page"]').length,
          lensCount: nav.querySelectorAll('[data-testid="active-bottom-tab-liquid-glass"]').length,
          lensFitsTab: lr.width > 30 && lr.height > 30 &&
            lr.left >= sr.left - 1 && lr.right <= sr.right + 1 &&
            lr.top >= sr.top - 1 && lr.bottom <= sr.bottom + 1,
          withinDock: sr.left >= nr.left - 2 && sr.right <= nr.right + 2,
          iconCenters: centers,
          plusPresent: plusRect.width >= 50 && plusRect.height >= 50,
        };
      });
      assert.equal(geometry.error, undefined, JSON.stringify(geometry));
      assert.equal(geometry.activeTabId, 'mobile-tab-finance', 'Finance must be highlighted');
      assert.equal(geometry.activeCount, 1, 'One selected tab');
      assert.equal(geometry.lensCount, 1, 'One lens, not four GPU filters');
      assert.ok(geometry.lensFitsTab && geometry.withinDock, 'Lens must fit selected tab');
      assert.ok(geometry.plusPresent, 'Central + must remain intact');
      assert.ok(geometry.iconCenters.every((n) => typeof n === 'number'));
      assert.ok(Math.max(...geometry.iconCenters) - Math.min(...geometry.iconCenters) < 4);
      await page.screenshot({ path: path.join(images, theme + '-finance-active.png') });

      await page.click('[data-testid="mobile-tab-tasks"]');
      await page.waitForFunction(() => Boolean(
        document.querySelector('[data-testid="mobile-tab-tasks"][aria-current="page"]')
      ), { timeout: 7000 });
      const count = await page.$$eval('[data-testid="active-bottom-tab-liquid-glass"]', (elements) => elements.length);
      assert.equal(count, 1, 'Selection must move instead of creating duplicate lenses');
      console.log('PASS ' + theme + ': finance liquid-glass active state, aligned icons, central plus, tab switching');
    }
    console.log('Liquid-glass mobile bottom navigation smoke test passed.');
  } finally {
    await browser.close();
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
