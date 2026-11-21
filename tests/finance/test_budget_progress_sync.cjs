/**
 * tests/finance/test_budget_progress_sync.cjs
 * Comprehensive verification of Finance Dashboard Monthly Budget Cap:
 * spending limits, accurate percentage, visual fill, absence of fake converted $0.00 labels,
 * reactivity to transaction CRUD, and over-budget states.
 */

const assert = require('assert');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';
const ARTIFACTS_DIR = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTestSuite() {
  console.log('======================================================================');
  console.log('  TEST SUITE 2: MONTHLY BUDGET PROGRESS & SYNCHRONIZATION             ');
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
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
    defaultViewport: { width: 1280, height: 800 },
  });

  try {
    const page = await browser.newPage();
    await page.goto(APP_URL, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 3500));
    await page.waitForFunction(() => window.useFinanceStore && window.useNavigationStore);

    // 1. Setup profile and seed Scenario B: AFN 15,000 Budget Cap, AFN 1,550 Expenses
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
      store.addTransaction({
        title: 'Office Rental',
        amount: 1500,
        type: 'expense',
        currency: 'AFN',
        date: '2026-11-05',
      });
      store.addTransaction({
        title: 'Coffee Supply',
        amount: 50,
        type: 'expense',
        currency: 'AFN',
        date: '2026-11-12',
      });
      window.useNavigationStore.getState().setActiveTab('finance_expense_tracker_light_mode');
    });
    await new Promise((r) => setTimeout(r, 600));

    // Ensure we are on Dashboard sub-tab
    await page.evaluate(() => {
      const allButtons = Array.from(document.querySelectorAll('button'));
      const dashBtn = allButtons.find((b) => b.textContent.trim() === 'Dashboard');
      if (dashBtn) dashBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Inspect the Budget Cap Section
    const budgetCardData = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      // Find budget progress bar element
      const allBars = Array.from(document.querySelectorAll('.rounded-full.h-2\\.5'));
      const budgetBarContainer = allBars[0];
      const fillBar = budgetBarContainer ? budgetBarContainer.querySelector('div') : null;

      return {
        bodyText,
        has1550Spent: bodyText.includes('1,550.00 افـ spent'),
        has15000Limit: bodyText.includes('15,000.00 افـ limit'),
        has10PercentUsed: bodyText.includes('10% used'),
        hasFakeUSDSpent: bodyText.includes('$0.00 spent') || bodyText.includes('($0.00 spent)'),
        hasFakeUSDLimit: bodyText.includes('$0.00 limit') || bodyText.includes('($0.00 limit)'),
        fillWidth: fillBar ? fillBar.style.width : '',
      };
    });

    check('2.1 Budget Cap Numerical Integrity (1,550 spent / 15,000 limit = 10% used)', () => {
      assert.ok(budgetCardData.has1550Spent, 'Must display 1,550.00 افـ spent');
      assert.ok(budgetCardData.has15000Limit, 'Must display 15,000.00 افـ limit');
      assert.ok(budgetCardData.has10PercentUsed, 'Must display 10% used');
    });

    check('2.2 Fake USD Labels Completely Removed (No $0.00 spent, No $0.00 limit)', () => {
      assert.strictEqual(budgetCardData.hasFakeUSDSpent, false, '$0.00 spent must NOT appear when no USD budget exists');
      assert.strictEqual(budgetCardData.hasFakeUSDLimit, false, '$0.00 limit must NOT appear when no USD budget exists');
    });

    check('2.3 Budget Bar Visual Width Accuracy (~10.3%)', () => {
      const widthVal = parseFloat(budgetCardData.fillWidth);
      assert.ok(widthVal >= 10 && widthVal <= 11, `Fill width should be ~10.3%, got ${budgetCardData.fillWidth}`);
    });

    // Capture screenshot of Budget section in Light Mode
    const budgetLightShot = path.join(ARTIFACTS_DIR, 'budget_cap_clean_light.png');
    await page.screenshot({ path: budgetLightShot });
    console.log(`Saved screenshot: ${budgetLightShot}`);

    // Test 2.4: Reactive Update on Expense Add (Add 13,500 AFN -> Total Spent = 15,050 -> 100% used, Over Budget)
    await page.evaluate(() => {
      const store = window.useFinanceStore.getState();
      store.addTransaction({
        title: 'Emergency Equipment',
        amount: 13500,
        type: 'expense',
        currency: 'AFN',
        date: '2026-11-18',
      });
    });
    await new Promise((r) => setTimeout(r, 600));

    const overBudgetData = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      const allBars = Array.from(document.querySelectorAll('.rounded-full.h-2\\.5'));
      const budgetBarContainer = allBars[0];
      const fillBar = budgetBarContainer ? budgetBarContainer.querySelector('div') : null;

      return {
        bodyText,
        has15050Spent: bodyText.includes('15,050.00 افـ spent'),
        has100PercentUsed: bodyText.includes('100% used'),
        fillWidth: fillBar ? fillBar.style.width : '',
      };
    });

    check('2.4 Over-Budget Calculation & Bar Capping (15,050 spent / 15,000 limit -> 100% fill)', () => {
      assert.ok(overBudgetData.has15050Spent, 'Must display 15,050.00 افـ spent');
      assert.ok(overBudgetData.has100PercentUsed, 'Must display 100% used');
      assert.strictEqual(overBudgetData.fillWidth, '100%', 'Visual fill bar must cap cleanly at 100%');
    });

    // Test 2.5: Budget Cap Modal Editing (Change AFN limit to 20,000)
    await page.evaluate(() => {
      const store = window.useFinanceStore.getState();
      store.updateBudgetCap({ AFN: 20000, USD: 0 });
    });
    await new Promise((r) => setTimeout(r, 600));

    const updatedCapData = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      return {
        has20000Limit: bodyText.includes('20,000.00 افـ limit'),
        has75PercentUsed: bodyText.includes('75% used'), // 15,050 / 20,000 = 75.25% -> 75%
      };
    });

    check('2.5 Reactive Budget Cap Update (20,000 limit -> 75% used)', () => {
      assert.ok(updatedCapData.has20000Limit, 'Must display 20,000.00 افـ limit');
      assert.ok(updatedCapData.has75PercentUsed, 'Must display 75% used');
    });

    // Test 2.6: Genuine USD Budget Multi-Currency Support (Set USD limit to $500, spent $50)
    await page.evaluate(() => {
      const store = window.useFinanceStore.getState();
      store.updateBudgetCap({ AFN: 20000, USD: 500 });
      store.addTransaction({
        title: 'Server Hosting',
        amount: 50,
        type: 'expense',
        currency: 'USD',
        date: '2026-11-20',
      });
    });
    await new Promise((r) => setTimeout(r, 600));

    const multiCurrencyBudgetData = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      return {
        hasAFNLimit: bodyText.includes('20,000.00 افـ limit'),
        hasUSDLimit: bodyText.includes('$500.00 limit'),
        hasUSDSpent: bodyText.includes('$50.00 spent'),
      };
    });

    check('2.6 Genuine Multi-Currency Budgets Display Accurately When Configured ($50 spent / $500 limit)', () => {
      assert.ok(multiCurrencyBudgetData.hasAFNLimit, 'AFN limit must remain present');
      assert.ok(multiCurrencyBudgetData.hasUSDLimit, 'Genuine USD limit must appear when configured');
      assert.ok(multiCurrencyBudgetData.hasUSDSpent, 'Genuine USD spent must appear when recorded');
    });

    const multiBudgetShot = path.join(ARTIFACTS_DIR, 'budget_cap_multicurrency_light.png');
    await page.screenshot({ path: multiBudgetShot });
    console.log(`Saved screenshot: ${multiBudgetShot}`);

  } finally {
    await browser.close();
  }

  console.log('\n======================================================================');
  console.log(`  SUITE 2 RESULTS: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log('======================================================================');
  if (passed !== total) process.exit(1);
}

runTestSuite().catch((err) => {
  console.error('Fatal error in Suite 2:', err);
  process.exit(1);
});
