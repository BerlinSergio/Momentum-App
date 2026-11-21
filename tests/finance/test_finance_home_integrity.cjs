/**
 * tests/finance/test_finance_home_integrity.cjs
 * Comprehensive verification of Finance Dashboard and Home Financial Health data integrity,
 * identical reporting periods, CRUD reactivity, multi-currency isolation, and mathematical parity.
 */

const assert = require('assert');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';
const ARTIFACTS_DIR = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTestSuite() {
  console.log('======================================================================');
  console.log('  TEST SUITE 1: FINANCE & HOME DATA INTEGRITY & SYNCHRONIZATION       ');
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

  // --- Part 1: Pure Mathematical Model Verification ---
  console.log('--- Part 1: Pure Mathematical Model Verification ---');
  const finStorePath = path.resolve('src/store/useFinanceStore.js').replace(/\\/g, '/');
  const { getMonthlyFinanceSummary, formatSingleCurrency } = await import('file:///' + finStorePath + '?t=' + Date.now());

  // Scenario A: Controlled Single-Currency Transactions
  const scenarioATxs = [
    { id: 'scen-inc-1', amount: 15000, type: 'income', currency: 'AFN', date: '2026-11-05' },
    { id: 'scen-exp-1', amount: 1500, type: 'expense', currency: 'AFN', date: '2026-11-10' },
    { id: 'scen-exp-2', amount: 50, type: 'expense', currency: 'AFN', date: '2026-11-15' },
  ];

  check('1.1 Scenario A Pure Calculation (15,000 Inflow - 1,550 Outflow = 13,450 Net)', () => {
    const summary = getMonthlyFinanceSummary(scenarioATxs, [], '2026-11');
    assert.strictEqual(summary.incomeGrouped['AFN'], 15000, 'Income must be exactly 15,000 AFN');
    assert.strictEqual(summary.expensesGrouped['AFN'], 1550, 'Expenses must be exactly 1,550 AFN');
    assert.strictEqual(summary.netSavedGrouped['AFN'], 13450, 'Net cash flow must be exactly 13,450 AFN');
  });

  check('1.2 Currency Isolation (AFN transactions do NOT produce fabricated USD amounts)', () => {
    const summary = getMonthlyFinanceSummary(scenarioATxs, [], '2026-11');
    assert.strictEqual(summary.incomeGrouped['USD'], undefined, 'USD income must not be generated from AFN transactions');
    assert.strictEqual(summary.expensesGrouped['USD'], undefined, 'USD expenses must not be generated from AFN transactions');
    assert.strictEqual(summary.netSavedGrouped['USD'], undefined, 'USD net cash flow must not exist for AFN-only transactions');
  });

  // --- Part 2: Real Browser UI Verification ---
  console.log('\n--- Part 2: Real Browser UI Synchronization Verification ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    const page = await browser.newPage();
    await page.goto(APP_URL, { waitUntil: 'networkidle0' });
    // Wait for initial splash screen to dismiss
    await new Promise((r) => setTimeout(r, 3500));
    await page.waitForFunction(() => window.useFinanceStore && window.useNavigationStore);

    // Ensure Profile is set up with completed onboarding and AFN currency
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

    // Seed synthetic scenario data cleanly
    await page.evaluate(() => {
      const store = window.useFinanceStore.getState();
      store.clearAllTransactions();
      store.addIncome({
        title: 'Primary Salary',
        amount: 15000,
        currency: 'AFN',
        date: '2026-11-01',
      });
      store.addTransaction({
        title: 'Office Supplies',
        amount: 1500,
        type: 'expense',
        currency: 'AFN',
        date: '2026-11-05',
      });
      store.addTransaction({
        title: 'Transit Fare',
        amount: 50,
        type: 'expense',
        currency: 'AFN',
        date: '2026-11-10',
      });
      window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
    });

    await new Promise((r) => setTimeout(r, 800));

    // Check Home Dashboard figures
    const homeFigures = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        hasIncome: text.includes('15,000.00 افـ') || text.includes('15,000'),
        hasExpense: text.includes('1,550.00 افـ') || text.includes('1,550'),
        hasNet: text.includes('13,450.00 افـ') || text.includes('+13,450.00 افـ'),
        textSnippet: text.slice(0, 1000),
      };
    });

    check('2.1 Home Dashboard Displays Real Financial Data (15,000 Inflow, 1,550 Outflow, +13,450 Net)', () => {
      assert.ok(homeFigures.hasIncome, 'Home must display 15,000 Income');
      assert.ok(homeFigures.hasExpense, 'Home must display 1,550 Expenses');
      assert.ok(homeFigures.hasNet, 'Home must display +13,450 Net');
    });

    // Navigate to Finance Dashboard and check parity
    await page.evaluate(() => {
      window.useNavigationStore.getState().setActiveTab('finance_expense_tracker_light_mode');
    });
    await new Promise((r) => setTimeout(r, 600));

    // Ensure we are on the 'Dashboard' (Overview) sub-tab
    await page.evaluate(() => {
      const allButtons = Array.from(document.querySelectorAll('button'));
      const dashBtn = allButtons.find((b) => b.textContent.trim() === 'Dashboard');
      if (dashBtn) dashBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const financeFigures = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        hasBalance: text.includes('13,450.00 افـ'),
        hasInflow: text.includes('15,000.00 افـ'),
        hasOutflow: text.includes('1,550.00 افـ'),
      };
    });

    check('2.2 Finance Dashboard Overview Matches Home Figures (Remaining Balance 13,450, Inflow 15,000, Outflow 1,550)', () => {
      assert.ok(financeFigures.hasBalance, 'Finance Overview must display 13,450 Remaining Balance');
      assert.ok(financeFigures.hasInflow, 'Finance Overview must display 15,000 Inflow');
      assert.ok(financeFigures.hasOutflow, 'Finance Overview must display 1,550 Outflow');
    });

    // Capture screenshot of verified Finance Overview
    const screenshotPath = path.join(ARTIFACTS_DIR, 'finance_overview_parity_light.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`Saved screenshot: ${screenshotPath}`);

    // Test Reactive Edit: Edit Expense 1 from 1500 to 2000
    await page.evaluate(() => {
      const store = window.useFinanceStore.getState();
      const exp1 = store.transactions.find((t) => t.type === 'expense' && t.amount === 1500);
      if (exp1) store.updateTransaction(exp1.id, { amount: 2000 });
      window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
    });
    await new Promise((r) => setTimeout(r, 600));

    const updatedHome = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        hasUpdatedExpense: text.includes('2,050.00 افـ') || text.includes('2,050'),
        hasUpdatedNet: text.includes('12,950.00 افـ') || text.includes('+12,950.00 افـ'),
      };
    });

    check('2.3 Reactive Update after Transaction Edit (Expenses 2,050, Net 12,950)', () => {
      assert.ok(updatedHome.hasUpdatedExpense, 'Updated Expenses must reflect 2,050 AFN');
      assert.ok(updatedHome.hasUpdatedNet, 'Updated Net must reflect 12,950 AFN');
    });

    // Test Reactive Delete: Delete Expense 2 (50 AFN)
    await page.evaluate(() => {
      const store = window.useFinanceStore.getState();
      const exp2 = store.transactions.find((t) => t.type === 'expense' && t.amount === 50);
      if (exp2) store.deleteTransaction(exp2.id);
    });
    await new Promise((r) => setTimeout(r, 600));

    const afterDeleteHome = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        hasDeletedExpense: text.includes('2,000.00 افـ') || text.includes('2,000'),
        hasDeletedNet: text.includes('13,000.00 افـ') || text.includes('+13,000.00 افـ'),
      };
    });

    check('2.4 Reactive Update after Transaction Deletion (Expenses 2,000, Net 13,000)', () => {
      assert.ok(afterDeleteHome.hasDeletedExpense, 'Expenses after deletion must be 2,000 AFN');
      assert.ok(afterDeleteHome.hasDeletedNet, 'Net after deletion must be 13,000 AFN');
    });

  } finally {
    await browser.close();
  }

  console.log('\n======================================================================');
  console.log(`  SUITE 1 RESULTS: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log('======================================================================');
  if (passed !== total) process.exit(1);
}

runTestSuite().catch((err) => {
  console.error('Fatal error in Suite 1:', err);
  process.exit(1);
});
