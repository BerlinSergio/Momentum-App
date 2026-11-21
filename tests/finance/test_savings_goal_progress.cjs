/**
 * tests/finance/test_savings_goal_progress.cjs
 * Comprehensive verification of Savings Goal Progress vs Monthly Net Cash Flow:
 * dedicated contributions, rate calculation, over-100% capping, safe division,
 * and reactive UI updates on the Home Dashboard.
 */

const assert = require('assert');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';
const ARTIFACTS_DIR = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTestSuite() {
  console.log('======================================================================');
  console.log('  TEST SUITE 4: SAVINGS GOAL PROGRESS & CONTRIBUTION INTEGRITY        ');
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

  // --- Part 1: Pure Selector Semantic Integrity Audit ---
  console.log('--- Part 1: Pure Selector Mathematical & Semantic Integrity ---');
  const finStorePath = path.resolve('src/store/useFinanceStore.js').replace(/\\/g, '/');
  const { getSavingsTargetStats } = await import('file:///' + finStorePath + '?t=' + Date.now());

  // Scenario E.1: Dedicated 12,000 AFN contribution to 60,000 AFN goal -> exactly 20.0%
  check('4.1 Dedicated Contribution Progress (12,000 / 60,000 = 20%)', () => {
    const goalWithContrib = {
      AFN: { target: 60000, current: 12000 },
    };
    const stats = getSavingsTargetStats(goalWithContrib, { AFN: 13450 }, 'AFN');
    assert.strictEqual(stats.targetAmount, 60000, 'Target amount must be 60,000');
    assert.strictEqual(stats.actualSaved, 12000, 'Actual saved must use explicit 12,000 contribution, not 13,450 net cashflow');
    assert.strictEqual(stats.displayRate, '20%', 'Display rate must be 20%');
    assert.strictEqual(stats.barWidth, 20, 'Bar width must be 20%');
  });

  // Scenario E.2: Over-Target Contribution (72,000 AFN / 60,000 AFN = 120%)
  check('4.2 Over-Target Progress & Bar Fill Capping (72,000 / 60,000 = 120% display, 100% visual bar)', () => {
    const overGoal = {
      AFN: { target: 60000, current: 72000 },
    };
    const stats = getSavingsTargetStats(overGoal, {}, 'AFN');
    assert.strictEqual(stats.displayRate, '120%', 'Display rate must honestly report 120%');
    assert.strictEqual(stats.barWidth, 100, 'Visual bar width must cap strictly at 100%');
  });

  // Scenario E.3: Zero Target Division-By-Zero Protection
  check('4.3 Zero Target Division-by-Zero Safety (0 Target -> 0% progress, hasTarget=false)', () => {
    const zeroGoal = { AFN: { target: 0, current: 5000 } };
    const stats = getSavingsTargetStats(zeroGoal, {}, 'AFN');
    assert.strictEqual(stats.hasTarget, false, 'hasTarget must be false for zero target');
    assert.strictEqual(stats.displayRate, '0%', 'Display rate must be 0%');
    assert.strictEqual(stats.barWidth, 0, 'Bar width must be 0%');
  });

  // --- Part 2: Real Browser E2E Scenario E Verification ---
  console.log('\n--- Part 2: Real Browser E2E Contribution Workflow Verification ---');
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

    // Setup profile and seed Scenario E: 60,000 AFN target with 12,000 AFN contribution
    await page.evaluate(() => {
      window.useProfileStore.getState().updateProfile({
        fullName: 'Milad Wardak',
        setupCompleted: true,
        onboardingStep: 'completed',
        currency: 'AFN / ؋ (Afghan Afghani)',
      });
      const store = window.useFinanceStore.getState();
      store.clearAllTransactions();
      // Set monthly transactions: Income 15,000, Expenses 1,550 -> Net Cash Flow = 13,450
      store.addIncome({ title: 'Salary', amount: 15000, currency: 'AFN', date: '2026-11-01' });
      store.addTransaction({ title: 'Expense 1', amount: 1500, type: 'expense', currency: 'AFN', date: '2026-11-05' });
      store.addTransaction({ title: 'Expense 2', amount: 50, type: 'expense', currency: 'AFN', date: '2026-11-10' });

      // Savings Goal: 60,000 AFN target with 12,000 AFN dedicated contributed savings
      store.setSavingsTarget({
        AFN: { target: 60000, current: 12000 },
      });
      window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
    });
    await new Promise((r) => setTimeout(r, 800));

    // Inspect Home Financial Health Card
    const homeCardData = await page.evaluate(() => {
      const allH2 = Array.from(document.querySelectorAll('h2'));
      const finH2 = allH2.find((h) => h.textContent.includes('Financial Health') || h.textContent.includes('مالي'));
      const card = finH2 ? (finH2.closest('.p-5') || finH2.parentElement.parentElement) : null;
      const progressDiv = card ? card.querySelector('.bg-gradient-to-r') : null;

      return {
        cardText: card ? card.innerText : '',
        progressWidth: progressDiv ? progressDiv.style.width : '',
      };
    });

    check('4.4 Home Card Displays Both Monthly Net Cashflow (+13,450 AFN) and Dedicated Goal Progress (20%)', () => {
      assert.ok(homeCardData.cardText.includes('13,450.00 افـ') || homeCardData.cardText.includes('+13,450.00 افـ'), 'Card must show Net Cash Flow 13,450 AFN');
      assert.ok(homeCardData.cardText.includes('60,000 افـ') || homeCardData.cardText.includes('60000'), 'Card must show 60,000 AFN target');
      assert.ok(homeCardData.cardText.includes('20%'), 'Progress rate must display 20% (12,000 / 60,000)');
      assert.strictEqual(homeCardData.progressWidth, '20%', 'Visual progress bar width must be exactly 20%');
    });

    // Capture screenshot of Scenario E
    const goalProgressShot = path.join(ARTIFACTS_DIR, 'savings_goal_progress_20pct_light.png');
    await page.screenshot({ path: goalProgressShot });
    console.log(`Saved screenshot: ${goalProgressShot}`);

    // Update contribution to 30,000 AFN using contributeToSavingsTarget action
    await page.evaluate(() => {
      const store = window.useFinanceStore.getState();
      store.contributeToSavingsTarget('AFN', 18000); // 12,000 + 18,000 = 30,000
    });
    await new Promise((r) => setTimeout(r, 600));

    const updatedGoalData = await page.evaluate(() => {
      const allH2 = Array.from(document.querySelectorAll('h2'));
      const finH2 = allH2.find((h) => h.textContent.includes('Financial Health') || h.textContent.includes('مالي'));
      const card = finH2 ? (finH2.closest('.p-5') || finH2.parentElement.parentElement) : null;
      const progressDiv = card ? card.querySelector('.bg-gradient-to-r') : null;

      return {
        cardText: card ? card.innerText : '',
        progressWidth: progressDiv ? progressDiv.style.width : '',
      };
    });

    check('4.5 Reactive Recalculation on Additional Contribution (30,000 / 60,000 -> 50% Progress)', () => {
      assert.ok(updatedGoalData.cardText.includes('50%'), 'Updated rate must display 50%');
      assert.strictEqual(updatedGoalData.progressWidth, '50%', 'Updated visual bar width must be 50%');
    });

    // Dark Mode Verification of Goal Progress
    await page.evaluate(() => {
      window.useNavigationStore.getState().setActiveTab('home_dashboard_dark_mode');
    });
    await new Promise((r) => setTimeout(r, 600));

    const darkGoalData = await page.evaluate(() => {
      const allH2 = Array.from(document.querySelectorAll('h2'));
      const finH2 = allH2.find((h) => h.textContent.includes('Financial Health') || h.textContent.includes('مالي'));
      const card = finH2 ? (finH2.closest('.p-5') || finH2.parentElement.parentElement) : null;
      const progressDiv = card ? card.querySelector('.bg-gradient-to-r') : null;

      return {
        cardText: card ? card.innerText : '',
        progressWidth: progressDiv ? progressDiv.style.width : '',
      };
    });

    check('4.6 Dark Mode Goal Progress Consistency (50% progress preserved in dark mode)', () => {
      assert.ok(darkGoalData.cardText.includes('50%'), 'Dark mode must show 50%');
      assert.strictEqual(darkGoalData.progressWidth, '50%', 'Dark mode visual progress width must be 50%');
    });

    const darkProgressShot = path.join(ARTIFACTS_DIR, 'savings_goal_progress_50pct_dark.png');
    await page.screenshot({ path: darkProgressShot });
    console.log(`Saved screenshot: ${darkProgressShot}`);

  } finally {
    await browser.close();
  }

  console.log('\n======================================================================');
  console.log(`  SUITE 4 RESULTS: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log('======================================================================');
  if (passed !== total) process.exit(1);
}

runTestSuite().catch((err) => {
  console.error('Fatal error in Suite 4:', err);
  process.exit(1);
});
