const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753';
const OUT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const { ALL_SCREENS } = await import('../../src/data/screenRegistry.js');
  console.log(`Discovered ${ALL_SCREENS.length} production screens from screenRegistry.js`);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const pageErrors = [];
  page.on('pageerror', err => {
    pageErrors.push(err.message);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Filter out non-fatal or network aborts
      if (!text.includes('Failed to load resource') && !text.includes('favicon')) {
        pageErrors.push(text);
      }
    }
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Initial app bootstrap
  await page.evaluate(() => {
    window.setIsAppLoading(false);
    if (window.useProfileStore) {
      window.useProfileStore.getState().completeSetup();
      window.useProfileStore.getState().updateProfile({
        setupCompleted: true,
        fullName: 'Milad Wardak',
        currency: 'AFN'
      });
    }
    if (window.useSecurityStore) window.useSecurityStore.getState().setLocked(false);
    if (window.useLocaleStore) window.useLocaleStore.getState().setLocale('en');
    if (window.useNavigationStore) {
      window.useNavigationStore.getState().setSidebarPosition('left');
      window.useNavigationStore.getState().setSidebarCollapsed(false);
    }
  });

  const results = [];
  let failCount = 0;

  for (let i = 0; i < ALL_SCREENS.length; i++) {
    const screen = ALL_SCREENS[i];
    pageErrors.length = 0;

    await page.evaluate((scr) => {
      const isDark = scr.theme === 'dark' || scr.id.includes('dark');
      if (window.useThemeStore) window.useThemeStore.getState().setTheme(isDark ? 'dark' : 'light');
      if (window.useNavigationStore) window.useNavigationStore.getState().setActiveTab(scr.id);
    }, screen);

    await new Promise(r => setTimeout(r, 350));

    const check = await page.evaluate((scrId) => {
      const bodyText = document.body.innerText || '';
      const hasCrash = bodyText.includes('Something went wrong') ||
                       bodyText.includes('ReferenceError') ||
                       bodyText.includes('TypeError:') ||
                       bodyText.includes('is not defined');
      const isBlank = bodyText.trim().length < 15;
      const notFound = bodyText.includes('Screen not found: ' + scrId);
      
      const mainEl = document.querySelector('main') || document.querySelector('form') || document.querySelector('.flex-1');
      const rect = mainEl ? mainEl.getBoundingClientRect() : null;
      const contentWidth = rect ? Math.round(rect.width) : 0;

      return { hasCrash, isBlank, notFound, contentWidth, textSample: bodyText.slice(0, 60).replace(/\n/g, ' ') };
    }, screen.id);

    const hasError = check.hasCrash || check.isBlank || check.notFound || pageErrors.length > 0;
    const status = hasError ? 'FAIL' : 'PASS';
    if (hasError) failCount++;

    const item = {
      index: i + 1,
      id: screen.id,
      name: screen.name,
      module: screen.module,
      theme: screen.theme,
      status,
      errors: [...pageErrors],
      hasCrash: check.hasCrash,
      isBlank: check.isBlank,
      notFound: check.notFound,
      contentWidth: check.contentWidth
    };
    results.push(item);

    const mark = status === 'PASS' ? '✓' : '✗';
    console.log(`${mark} [${i + 1}/${ALL_SCREENS.length}] ${screen.id.padEnd(42)} ${status} (w: ${check.contentWidth}px) ${hasError ? JSON.stringify(pageErrors) : ''}`);

    if (hasError) {
      const sPath = path.join(OUT_DIR, `FAIL_${screen.id}.png`);
      await page.screenshot({ path: sPath });
      try {
        fs.copyFileSync(sPath, path.join(ARTIFACT_DIR, `FAIL_${screen.id}.png`));
      } catch {}
    }
  }

  await browser.close();

  const reportPath = path.join(__dirname, 'screen_health_results.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log('\n===========================================');
  console.log(`SCREEN HEALTH AUDIT SUMMARY:`);
  console.log(`Total Screens Tested: ${ALL_SCREENS.length}`);
  console.log(`Passed: ${ALL_SCREENS.length - failCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`===========================================`);
})();
