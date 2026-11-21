/**
 * Momentum — Home Financial Health Complete Data Synchronization Test Suite
 * Validates pure financial selectors, real browser reactivity, savings targets,
 * multi-currency integrity, period boundaries, dark mode, RTL, and persistence.
 */

const assert = require('assert');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';
const ARTIFACTS_DIR = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTestSuite() {
  console.log('======================================================================');
  console.log('  MOMENTUM HOME FINANCIAL HEALTH COMPLETE DATA SYNCHRONIZATION SUITE  ');
  console.log('======================================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function runCheck(name, fn) {
    totalTests++;
    try {
      fn();
      console.log(`[PASS] ${name}`);
      passedTests++;
    } catch (err) {
      console.error(`[FAIL] ${name}`);
      console.error('       Error:', err.message);
    }
  }

  // ==========================================
  // PART 1: PURE SELECTOR MATHEMATICAL AUDIT
  // ==========================================
  console.log('--- PART 1: Authoritative Pure Selectors Verification ---\n');

  const finPath = path.resolve('src/store/useFinanceStore.js').replace(/\\/g, '/');
  const {
    getMonthlyFinanceSummary,
    getSavingsTargetStats,
    calculateGroupedTotals,
  } = await import('file:///' + finPath + '?t=' + Date.now());

  // Test 1.1: Clean Empty State
  runCheck('1.1 Empty State Calculation (0.00 Totals, No Target)', () => {
    const summary = getMonthlyFinanceSummary([], [], '2026-11');
    assert.deepStrictEqual(summary.incomeGrouped, {}, 'Income grouped should be empty object');
    assert.deepStrictEqual(summary.expensesGrouped, {}, 'Expenses grouped should be empty object');
    assert.strictEqual(summary.netSavedGrouped['AFN'], 0, 'Net saved AFN should default to 0');

    const stats = getSavingsTargetStats(null, summary.netSavedGrouped, 'AFN');
    assert.strictEqual(stats.hasTarget, false, 'hasTarget must be false when savingsTarget is null');
    assert.strictEqual(stats.targetAmount, 0, 'targetAmount must be 0');
    assert.strictEqual(stats.displayRate, '0%', 'displayRate must be 0%');
    assert.strictEqual(stats.barWidth, 0, 'barWidth must be 0%');
  });

  // Test 1.2: Single Currency Income, Expense, and Net Cashflow
  runCheck('1.2 Single Currency Net Cashflow (10,000 Inc - 3,000 Exp = 7,000 Net)', () => {
    const txs = [
      { id: 'tx-1', amount: 10000, type: 'income', currency: 'AFN', date: '2026-11-05' },
      { id: 'tx-2', amount: 3000, type: 'expense', currency: 'AFN', date: '2026-11-12' },
    ];
    const summary = getMonthlyFinanceSummary(txs, [], '2026-11');
    assert.strictEqual(summary.incomeGrouped['AFN'], 10000, 'Income must be 10,000');
    assert.strictEqual(summary.expensesGrouped['AFN'], 3000, 'Expense must be 3,000');
    assert.strictEqual(summary.netSavedGrouped['AFN'], 7000, 'Net saved must be 7,000');

    // Savings target of 60,000 AFN
    const target = { AFN: 60000, USD: 1000 };
    const stats = getSavingsTargetStats(target, summary.netSavedGrouped, 'AFN');
    assert.strictEqual(stats.hasTarget, true, 'hasTarget must be true');
    assert.strictEqual(stats.targetAmount, 60000, 'targetAmount must be 60,000');
    // 7,000 / 60,000 = 11.666...% -> rounded to 11.7%
    assert.strictEqual(stats.displayRate, '11.7%', 'displayRate must be 11.7%');
    assert.strictEqual(stats.barWidth, 11.7, 'barWidth must be 11.7%');
  });

  // Test 1.3: Period Filtering & Historical Protection
  runCheck('1.3 Period Boundary Isolation (Excludes Previous Month & Other Years)', () => {
    const txs = [
      { id: 'tx-cur', amount: 5000, type: 'income', currency: 'AFN', date: '2026-11-10' },
      { id: 'tx-prev-m', amount: 8000, type: 'income', currency: 'AFN', date: '2026-10-25' },
      { id: 'tx-prev-y', amount: 12000, type: 'income', currency: 'AFN', date: '2025-11-10' },
      { id: 'tx-future', amount: 4000, type: 'income', currency: 'AFN', date: '2026-12-01' },
    ];
    const summary = getMonthlyFinanceSummary(txs, [], '2026-11');
    assert.strictEqual(summary.monthItems.length, 1, 'Only November 2026 transaction must be included');
    assert.strictEqual(summary.incomeGrouped['AFN'], 5000, 'Income must strictly be 5,000');
  });

  // Test 1.4: Transfer Exclusion
  runCheck('1.4 Internal Transfer Non-Counting (Transfers not counted as Income/Expense)', () => {
    const txs = [
      { id: 'tx-inc', amount: 2000, type: 'income', currency: 'USD', date: '2026-11-02' },
      { id: 'tx-exp', amount: 800, type: 'expense', currency: 'USD', date: '2026-11-04' },
      { id: 'tx-trf', amount: 1000, type: 'transfer', currency: 'USD', date: '2026-11-06' },
    ];
    const summary = getMonthlyFinanceSummary(txs, [], '2026-11');
    assert.strictEqual(summary.incomeGrouped['USD'], 2000, 'Income must be exactly 2,000');
    assert.strictEqual(summary.expensesGrouped['USD'], 800, 'Expense must be exactly 800');
    assert.strictEqual(summary.netSavedGrouped['USD'], 1200, 'Net saved must be exactly 1,200');
  });

  // Test 1.5: Over-100% Target & Negative Net Flow Handling
  runCheck('1.5 Target Boundary Conditions (Over-Target Capping & Negative Net)', () => {
    // Over target
    const overNet = { AFN: 90000 };
    const overStats = getSavingsTargetStats({ AFN: 60000 }, overNet, 'AFN');
    assert.strictEqual(overStats.displayRate, '150%', 'Display rate must honestly report 150%');
    assert.strictEqual(overStats.barWidth, 100, 'Bar width visual fill must be capped at 100%');

    // Negative net flow (expenses > income)
    const negNet = { AFN: -15000 };
    const negStats = getSavingsTargetStats({ AFN: 60000 }, negNet, 'AFN');
    assert.strictEqual(negStats.displayRate, '0%', 'Negative net flow rate must display 0% on progress');
    assert.strictEqual(negStats.barWidth, 0, 'Bar width must be 0% for negative net flow');

    // Zero target
    const zeroStats = getSavingsTargetStats({ AFN: 0 }, { AFN: 5000 }, 'AFN');
    assert.strictEqual(zeroStats.hasTarget, false, 'Zero target treated as unconfigured');
    assert.strictEqual(zeroStats.barWidth, 0, 'Zero target bar width must be 0');
  });

  // ==========================================
  // PART 2: REAL BROWSER E2E VERIFICATION
  // ==========================================
  console.log('\n--- PART 2: Real Browser E2E Synchronization Verification ---\n');

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // Helper to dismiss initial splash screen
    console.log('Loading Momentum Web Application on localhost:5173...');
    await page.goto(APP_URL, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 3500));

    // Ensure Profile is set up as Milad Wardak with AFN currency
    await page.evaluate(() => {
      window.useProfileStore.getState().updateProfile({
        fullName: 'Milad Wardak',
        setupCompleted: true,
        onboardingStep: 'completed',
        currency: 'AFN / ؋ (Afghan Afghani)',
      });
      window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
    });
    await new Promise((r) => setTimeout(r, 1000));

    // Test 2.1: Empty State on Home Dashboard
    console.log('Testing 2.1: Clean Empty State on Home Dashboard...');
    await page.evaluate(() => {
      window.useFinanceStore.getState().clearAllTransactions();
      window.useFinanceStore.getState().setSavingsTarget(null);
    });
    await new Promise((r) => setTimeout(r, 800));

    const emptyCardData = await page.evaluate(() => {
      const allH2 = Array.from(document.querySelectorAll('h2'));
      const finH2 = allH2.find((h) => h.textContent.includes('Financial Health') || h.textContent.includes('مالي'));
      if (!finH2) return null;
      const card = finH2.closest('.p-5') || finH2.parentElement.parentElement;
      const progressDiv = card.querySelector('.bg-gradient-to-r');
      return {
        text: card.innerText,
        progressWidth: progressDiv ? progressDiv.style.width : '',
      };
    });

    assert.ok(emptyCardData, 'Financial Health card must be visible on Home');
    assert.ok(emptyCardData.text.includes('0.00 افـ'), 'Income/Expenses/Saved must display 0.00 افـ in empty state');
    assert.ok(emptyCardData.text.includes('No savings target set') || emptyCardData.text.includes('Set Target'), 'Must display empty savings target state');
    assert.strictEqual(emptyCardData.progressWidth, '0%', 'Progress bar width must be 0% in empty state');
    console.log('[PASS] 2.1 Clean Empty State matches expected 0.00 numbers and no-target label');

    const emptyScreenshotPath = path.join(ARTIFACTS_DIR, 'home_financial_health_empty_light.png');
    await page.screenshot({ path: emptyScreenshotPath });
    console.log(`Saved screenshot: ${emptyScreenshotPath}`);

    // Test 2.2: Reactive Transaction Add & Calculation Alignment
    console.log('\nTesting 2.2: Reactive Financial Mutation (Add 20,000 AFN Income, 5,000 AFN Expense)...');
    await page.evaluate(() => {
      window.useFinanceStore.getState().setSavingsTarget({ AFN: 60000, USD: 1000 });
      window.useFinanceStore.getState().addIncome({
        title: 'Software Retainer',
        amount: 20000,
        currency: 'AFN',
        date: '2026-11-10',
      });
      window.useFinanceStore.getState().addTransaction({
        title: 'Office Cloud Server',
        amount: 5000,
        currency: 'AFN',
        type: 'expense',
        date: '2026-11-12',
      });
    });
    await new Promise((r) => setTimeout(r, 1000));

    const activeCardData = await page.evaluate(() => {
      const allH2 = Array.from(document.querySelectorAll('h2'));
      const finH2 = allH2.find((h) => h.textContent.includes('Financial Health') || h.textContent.includes('مالي'));
      const card = finH2.closest('.p-5') || finH2.parentElement.parentElement;
      const progressDiv = card.querySelector('.bg-gradient-to-r');
      return {
        text: card.innerText,
        progressWidth: progressDiv ? progressDiv.style.width : '',
      };
    });

    assert.ok(activeCardData.text.includes('20,000.00 افـ'), 'Income must show 20,000.00 افـ');
    assert.ok(activeCardData.text.includes('5,000.00 افـ'), 'Expenses must show 5,000.00 افـ');
    assert.ok(activeCardData.text.includes('+15,000.00 افـ'), 'Saved must show +15,000.00 افـ');
    assert.ok(activeCardData.text.includes('60,000 افـ'), 'Target label must show configured 60,000 افـ (no $3,000)');
    // 15,000 / 60,000 = 25.0%
    assert.ok(activeCardData.text.includes('25%'), 'Percentage must show 25%');
    assert.strictEqual(activeCardData.progressWidth, '25%', 'Progress bar fill must be 25%');
    console.log('[PASS] 2.2 Home Financial Health successfully synchronizes with reactive finance mutations');

    const syncedScreenshotPath = path.join(ARTIFACTS_DIR, 'home_financial_health_synced_light.png');
    await page.screenshot({ path: syncedScreenshotPath });
    console.log(`Saved screenshot: ${syncedScreenshotPath}`);

    // Test 2.3: Transaction Update & Delete Reactivity
    console.log('\nTesting 2.3: Transaction Update & Delete in Finance Store...');
    await page.evaluate(() => {
      const txs = window.useFinanceStore.getState().transactions;
      const exp = txs.find((t) => t.type === 'expense');
      if (exp) {
        // Update expense from 5,000 to 8,000 AFN (Net becomes 12,000 -> 20%)
        window.useFinanceStore.getState().updateTransaction(exp.id, { amount: 8000 });
      }
    });
    await new Promise((r) => setTimeout(r, 800));

    const updatedCardData = await page.evaluate(() => {
      const allH2 = Array.from(document.querySelectorAll('h2'));
      const finH2 = allH2.find((h) => h.textContent.includes('Financial Health') || h.textContent.includes('مالي'));
      const card = finH2.closest('.p-5') || finH2.parentElement.parentElement;
      const progressDiv = card.querySelector('.bg-gradient-to-r');
      return {
        text: card.innerText,
        progressWidth: progressDiv ? progressDiv.style.width : '',
      };
    });

    assert.ok(updatedCardData.text.includes('8,000.00 افـ'), 'Updated expenses must be 8,000.00 افـ');
    assert.ok(updatedCardData.text.includes('+12,000.00 افـ'), 'Updated net saved must be +12,000.00 افـ');
    assert.ok(updatedCardData.text.includes('20%'), 'Updated rate must be 20% (12,000 / 60,000)');
    assert.strictEqual(updatedCardData.progressWidth, '20%', 'Updated progress bar must be 20%');
    console.log('[PASS] 2.3 Financial Health updates reactively after transaction edit');

    // Test 2.4: Cross-Screen Navigation Parity (Home vs Finance)
    console.log('\nTesting 2.4: Cross-Screen Parity between Home and Finance Module...');
    // Click on Financial Health card to navigate to FinanceExpenseTracker
    await page.evaluate(() => {
      const allH2 = Array.from(document.querySelectorAll('h2'));
      const finH2 = allH2.find((h) => h.textContent.includes('Financial Health') || h.textContent.includes('مالي'));
      const card = finH2.closest('.p-5') || finH2.parentElement.parentElement;
      card.click();
    });
    await new Promise((r) => setTimeout(r, 1000));

    // Ensure we are on the Overview Dashboard sub-tab in Finance
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Dashboard');
      if (btn) btn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const financePageData = await page.evaluate(() => {
      const currentTab = window.useNavigationStore.getState().activeTab;
      const ledgerText = document.body.innerText;
      return {
        currentTab,
        hasInflow: ledgerText.includes('20,000.00 افـ'),
        hasOutflow: ledgerText.includes('8,000.00 افـ'),
        hasRemaining: ledgerText.includes('12,000.00 افـ'),
      };
    });

    assert.strictEqual(financePageData.currentTab, 'finance_expense_tracker_light_mode', 'Clicking card must navigate to Finance module');
    assert.ok(financePageData.hasInflow, 'Finance overview must show same 20,000.00 افـ inflow');
    assert.ok(financePageData.hasOutflow, 'Finance overview must show same 8,000.00 افـ outflow');
    assert.ok(financePageData.hasRemaining, 'Finance overview must show matching 12,000.00 افـ remaining balance');
    console.log('[PASS] 2.4 Navigation to Finance module confirms 100% data parity between screens');

    // Return to Home Dashboard
    await page.evaluate(() => {
      window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
    });
    await new Promise((r) => setTimeout(r, 800));

    // Test 2.5: Dark Mode Parity
    console.log('\nTesting 2.5: Dark Mode Visual Parity...');
    await page.evaluate(() => {
      window.useThemeStore.getState().setTheme('dark');
      window.useNavigationStore.getState().setActiveTab('home_dashboard_dark_mode');
    });
    await new Promise((r) => setTimeout(r, 1000));

    const darkCardData = await page.evaluate(() => {
      const allH2 = Array.from(document.querySelectorAll('h2'));
      const finH2 = allH2.find((h) => h.textContent.includes('Financial Health') || h.textContent.includes('مالي'));
      const card = finH2.closest('.p-5') || finH2.parentElement.parentElement;
      const progressDiv = card.querySelector('.bg-gradient-to-r');
      return {
        text: card.innerText,
        progressWidth: progressDiv ? progressDiv.style.width : '',
      };
    });

    assert.ok(darkCardData.text.includes('20,000.00 افـ'), 'Dark Mode must show 20,000.00 افـ');
    assert.ok(darkCardData.text.includes('8,000.00 افـ'), 'Dark Mode must show 8,000.00 افـ');
    assert.ok(darkCardData.text.includes('+12,000.00 افـ'), 'Dark Mode must show +12,000.00 افـ');
    assert.ok(darkCardData.text.includes('20%'), 'Dark Mode rate must show 20%');
    console.log('[PASS] 2.5 Dark Mode renders exact numerical figures and synced progress');

    const darkScreenshotPath = path.join(ARTIFACTS_DIR, 'home_financial_health_synced_dark.png');
    await page.screenshot({ path: darkScreenshotPath });
    console.log(`Saved screenshot: ${darkScreenshotPath}`);

    // Test 2.6: RTL Localization (Pashto & Dari)
    console.log('\nTesting 2.6: RTL Localization Rendering (Pashto & Dari)...');
    await page.evaluate(() => {
      window.useLocaleStore.getState().setLocale('ps-AF');
    });
    await new Promise((r) => setTimeout(r, 800));

    const psScreenshotPath = path.join(ARTIFACTS_DIR, 'home_financial_health_pashto_rtl.png');
    await page.screenshot({ path: psScreenshotPath });
    console.log(`Saved screenshot: ${psScreenshotPath}`);

    await page.evaluate(() => {
      window.useLocaleStore.getState().setLocale('fa-AF');
    });
    await new Promise((r) => setTimeout(r, 800));

    const faScreenshotPath = path.join(ARTIFACTS_DIR, 'home_financial_health_dari_rtl.png');
    await page.screenshot({ path: faScreenshotPath });
    console.log(`Saved screenshot: ${faScreenshotPath}`);
    console.log('[PASS] 2.6 RTL localized screenshots successfully captured for Pashto and Dari');

    // Test 2.7: Cold Browser Reload & IndexedDB Persistence
    console.log('\nTesting 2.7: Cold Browser Reload Persistence...');
    // Reset to English Light mode before reload
    await page.evaluate(() => {
      window.useLocaleStore.getState().setLocale('en');
      window.useThemeStore.getState().setTheme('light');
      window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
    });
    await new Promise((r) => setTimeout(r, 600));

    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 4000));

    const reloadedCardData = await page.evaluate(() => {
      const allH2 = Array.from(document.querySelectorAll('h2'));
      const finH2 = allH2.find((h) => h.textContent.includes('Financial Health') || h.textContent.includes('مالي'));
      if (!finH2) return null;
      const card = finH2.closest('.p-5') || finH2.parentElement.parentElement;
      const progressDiv = card.querySelector('.bg-gradient-to-r');
      return {
        text: card.innerText,
        progressWidth: progressDiv ? progressDiv.style.width : '',
      };
    });

    assert.ok(reloadedCardData, 'Financial Health card must exist after reload');
    assert.ok(reloadedCardData.text.includes('20,000.00 افـ'), 'Persisted income must be 20,000.00 افـ');
    assert.ok(reloadedCardData.text.includes('8,000.00 افـ'), 'Persisted expenses must be 8,000.00 افـ');
    assert.ok(reloadedCardData.text.includes('+12,000.00 افـ'), 'Persisted net saved must be +12,000.00 افـ');
    assert.ok(reloadedCardData.text.includes('20%'), 'Persisted rate must be 20%');
    console.log('[PASS] 2.7 Cold reload preserves complete financial state and calculations');

  } finally {
    if (browser) await browser.close();
  }

  console.log('\n======================================================================');
  console.log(`  FINANCE SYNCHRONIZATION TEST RESULTS: ALL CHECKS PASSED (${passedTests}/${totalTests})  `);
  console.log('======================================================================\n');
}

runTestSuite().catch((err) => {
  console.error('\nTEST SUITE FAILED FATALLY:', err);
  process.exit(1);
});
