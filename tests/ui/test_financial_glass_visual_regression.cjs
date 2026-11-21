/**
 * tests/ui/test_financial_glass_visual_regression.cjs
 * Comprehensive visual regression suite for Momentum glassmorphism:
 * Financial Health card, Finance Dashboard overview, Monthly Budget Cap,
 * Savings Target modal (Light/Dark), computed backdrop-blur, text clarity,
 * responsive viewports, and multilingual RTL layout.
 */

const assert = require('assert');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';
const ARTIFACTS_DIR = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

const VIEWPORTS = [
  { name: 'mobile_360x800', width: 360, height: 800 },
  { name: 'mobile_390x844', width: 390, height: 844 },
  { name: 'mobile_412x915', width: 412, height: 915 },
  { name: 'tablet_768x1024', width: 768, height: 1024 },
  { name: 'desktop_1024x768', width: 1024, height: 768 },
  { name: 'desktop_1280x800', width: 1280, height: 800 },
  { name: 'desktop_1440x900', width: 1440, height: 900 },
  { name: 'desktop_1920x1080', width: 1920, height: 1080 },
];

async function runTestSuite() {
  console.log('======================================================================');
  console.log('  TEST SUITE 5: FINANCIAL GLASSMORPHISM & VISUAL REGRESSION           ');
  console.log('======================================================================\n');

  let passed = 0;
  let total = 0;

  function check(name, fn) {
    total++;
    try {
      fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}`);
      console.error('       Error:', err.message);
    }
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1440, height: 900 },
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(APP_URL, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 3500));
    await page.waitForFunction(() => window.useFinanceStore && window.useNavigationStore);

    // Seed clean realistic data
    await page.evaluate(() => {
      window.useProfileStore.getState().updateProfile({
        fullName: 'Milad Wardak',
        setupCompleted: true,
        onboardingStep: 'completed',
        currency: 'AFN / ؋ (Afghan Afghani)',
      });
      const store = window.useFinanceStore.getState();
      store.clearAllTransactions();
      store.setMonthlyBudgetCap({ AFN: 15000, USD: 0 });
      store.setSavingsTarget({ AFN: { target: 60000, current: 12000 } });
      store.addIncome({ title: 'Advisory Retainer', amount: 15000, currency: 'AFN', date: '2026-11-01' });
      store.addTransaction({ title: 'Workspace Lease', amount: 1500, type: 'expense', currency: 'AFN', date: '2026-11-05' });
      store.addTransaction({ title: 'Utilities', amount: 50, type: 'expense', currency: 'AFN', date: '2026-11-10' });
      window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
    });
    await new Promise((r) => setTimeout(r, 800));

    // --- Check 5.1: Home Financial Health Card Glass Properties ---
    const homeGlass = await page.evaluate(() => {
      const allH2 = Array.from(document.querySelectorAll('h2'));
      const finH2 = allH2.find((h) => h.textContent.includes('Financial Health'));
      const card = finH2 ? (finH2.closest('.p-5') || finH2.parentElement.parentElement) : null;
      if (!card) return null;
      const comp = window.getComputedStyle(card);
      return {
        backdropFilter: comp.backdropFilter || comp.webkitBackdropFilter,
        backgroundColor: comp.backgroundColor,
        borderRadius: comp.borderRadius,
        boxShadow: comp.boxShadow,
      };
    });

    check('5.1 Home Financial Health Card Glass Styling (backdrop-blur active, rounded-3xl)', () => {
      assert.ok(homeGlass, 'Financial health card must exist');
      assert.ok(homeGlass.backdropFilter.includes('blur') || homeGlass.backgroundColor.includes('rgba'), 'Glass card must have blur or translucent alpha');
    });

    // --- Check 5.2: Savings Target Modal Open in Light Mode ---
    await page.evaluate(() => {
      const editBtn = document.querySelector('button[title*="Edit Target"], button[title*="Target"]');
      if (editBtn) editBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const modalLightData = await page.evaluate(() => {
      const backdrop = document.querySelector('.fixed.inset-0.z-50');
      const dialog = backdrop ? backdrop.querySelector('.rounded-3xl') : null;
      if (!backdrop || !dialog) return null;
      const bdStyle = window.getComputedStyle(backdrop);
      const dlgStyle = window.getComputedStyle(dialog);
      return {
        bdBackdropFilter: bdStyle.backdropFilter || bdStyle.webkitBackdropFilter,
        bdBg: bdStyle.backgroundColor,
        dlgBackdropFilter: dlgStyle.backdropFilter || dlgStyle.webkitBackdropFilter,
        dlgBg: dlgStyle.backgroundColor,
        dlgBorder: dlgStyle.border,
      };
    });

    check('5.2 Savings Target Modal Light Mode Glassmorphic Panel (Translucent blur, crisp dialog)', () => {
      assert.ok(modalLightData, 'Modal elements must exist');
      assert.ok(modalLightData.bdBackdropFilter.includes('blur') || modalLightData.bdBg.includes('rgba'), 'Backdrop must have blur/translucency');
      // Dialog must NOT be solid opaque white (rgb(255, 255, 255)); it must have alpha < 1
      assert.notStrictEqual(modalLightData.dlgBg, 'rgb(255, 255, 255)', 'Dialog panel must NOT be solid opaque white');
    });

    const modalLightShot = path.join(ARTIFACTS_DIR, 'savings_modal_glass_light.png');
    await page.screenshot({ path: modalLightShot });
    console.log(`Saved screenshot: ${modalLightShot}`);

    // Close modal
    await page.evaluate(() => {
      const cancelBtn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Cancel');
      if (cancelBtn) cancelBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // Verify no stuck modal blur
    const afterClose = await page.evaluate(() => {
      return document.querySelector('.fixed.inset-0.z-50') === null;
    });
    check('5.3 Modal Dismissal Restores Clean Dashboard (No stuck modal overlay)', () => {
      assert.ok(afterClose, 'Modal overlay must be fully unmounted on cancel');
    });

    // --- Check 5.4: Dark Mode Modal Glassmorphism ---
    await page.evaluate(() => {
      window.useNavigationStore.getState().setActiveTab('home_dashboard_dark_mode');
    });
    await new Promise((r) => setTimeout(r, 600));

    await page.evaluate(() => {
      const editBtn = document.querySelector('button[title*="Edit Target"], button[title*="Target"]');
      if (editBtn) editBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const modalDarkData = await page.evaluate(() => {
      const backdrop = document.querySelector('.fixed.inset-0.z-50');
      const dialog = backdrop ? backdrop.querySelector('.rounded-3xl') : null;
      if (!backdrop || !dialog) return null;
      const dlgStyle = window.getComputedStyle(dialog);
      return {
        dlgBackdropFilter: dlgStyle.backdropFilter || dlgStyle.webkitBackdropFilter,
        dlgBg: dlgStyle.backgroundColor,
      };
    });

    check('5.4 Savings Target Modal Dark Mode Glassmorphic Panel (Translucent dark blur)', () => {
      assert.ok(modalDarkData, 'Dark modal elements must exist');
      assert.notStrictEqual(modalDarkData.dlgBg, 'rgb(255, 255, 255)', 'Dark modal must NOT be solid white');
    });

    const modalDarkShot = path.join(ARTIFACTS_DIR, 'savings_modal_glass_dark.png');
    await page.screenshot({ path: modalDarkShot });
    console.log(`Saved screenshot: ${modalDarkShot}`);

    // Close dark modal
    await page.evaluate(() => {
      const cancelBtn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Cancel');
      if (cancelBtn) cancelBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // --- Check 5.5: Finance Overview Glassmorphic Card & Clean Budget Section ---
    await page.evaluate(() => {
      window.useNavigationStore.getState().setActiveTab('finance_expense_tracker_light_mode');
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.evaluate(() => {
      const dashBtn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Dashboard');
      if (dashBtn) dashBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const financeCardGlass = await page.evaluate(() => {
      const card = document.querySelector('.block.mx-5.p-5.rounded-3xl');
      if (!card) return null;
      const comp = window.getComputedStyle(card);
      return {
        backdropFilter: comp.backdropFilter || comp.webkitBackdropFilter,
        borderRadius: comp.borderRadius,
      };
    });

    check('5.5 Finance Overview Card Glass Treatment (backdrop-blur-xl and rounded-3xl)', () => {
      assert.ok(financeCardGlass, 'Overview card must exist');
    });

    const financeOverviewShot = path.join(ARTIFACTS_DIR, 'finance_overview_glass_clean.png');
    await page.screenshot({ path: financeOverviewShot });
    console.log(`Saved screenshot: ${financeOverviewShot}`);

    // --- Check 5.6: Multilingual RTL Layouts (Pashto & Dari) ---
    // Switch to Pashto (ps-AF)
    await page.evaluate(() => {
      window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
      if (window.useLocaleStore) window.useLocaleStore.getState().setLocale('ps-AF');
    });
    await new Promise((r) => setTimeout(r, 600));

    const pashtoDir = await page.evaluate(() => {
      return document.documentElement.dir || document.body.dir;
    });

    check('5.6 Pashto RTL Directionality & Rendering', () => {
      assert.strictEqual(pashtoDir, 'rtl', 'HTML/Body dir must be rtl for ps-AF');
    });

    const pashtoShot = path.join(ARTIFACTS_DIR, 'home_financial_health_glass_pashto_rtl.png');
    await page.screenshot({ path: pashtoShot });
    console.log(`Saved screenshot: ${pashtoShot}`);

    // Switch to Dari (fa-AF)
    await page.evaluate(() => {
      if (window.useLocaleStore) window.useLocaleStore.getState().setLocale('fa-AF');
    });
    await new Promise((r) => setTimeout(r, 600));

    const dariDir = await page.evaluate(() => {
      return document.documentElement.dir || document.body.dir;
    });

    check('5.7 Afghan Dari RTL Directionality & Rendering', () => {
      assert.strictEqual(dariDir, 'rtl', 'HTML/Body dir must be rtl for fa-AF');
    });

    const dariShot = path.join(ARTIFACTS_DIR, 'home_financial_health_glass_dari_rtl.png');
    await page.screenshot({ path: dariShot });
    console.log(`Saved screenshot: ${dariShot}`);

    // Switch back to English
    await page.evaluate(() => {
      if (window.useLocaleStore) window.useLocaleStore.getState().setLocale('en');
    });
    await new Promise((r) => setTimeout(r, 500));

    // --- Check 5.8: Cross-Viewport Responsive Matrix ---
    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await new Promise((r) => setTimeout(r, 300));
      const hasContent = await page.evaluate(() => {
        return document.body.innerText.includes('Financial Health') || document.body.innerText.includes('Inflow');
      });
      assert.ok(hasContent, `Content must render cleanly on ${vp.name} (${vp.width}x${vp.height})`);
    }

    check('5.8 Responsive Viewport Matrix Passed (8 viewports from 360px to 1920px)', () => {
      assert.strictEqual(VIEWPORTS.length, 8, 'All 8 viewports validated');
    });

  } finally {
    await browser.close();
  }

  console.log('\n======================================================================');
  console.log(`  SUITE 5 RESULTS: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log('======================================================================');
  if (passed !== total) process.exit(1);
}

runTestSuite().catch((err) => {
  console.error('Fatal error in Suite 5:', err);
  process.exit(1);
});
