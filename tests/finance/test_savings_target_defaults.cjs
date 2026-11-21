/**
 * tests/finance/test_savings_target_defaults.cjs
 * Comprehensive verification of Savings Target defaults, Create vs Edit mode,
 * input validation, absence of hardcoded fallbacks, and persistence.
 */

const assert = require('assert');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';
const ARTIFACTS_DIR = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTestSuite() {
  console.log('======================================================================');
  console.log('  TEST SUITE 3: SAVINGS TARGET DEFAULTS, MODES & VALIDATION           ');
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

    // 1. Fresh Profile with NO savings target
    await page.evaluate(() => {
      window.useProfileStore.getState().updateProfile({
        fullName: 'Milad Wardak',
        setupCompleted: true,
        onboardingStep: 'completed',
        currency: 'AFN / ؋ (Afghan Afghani)',
      });
      window.useFinanceStore.getState().clearAllTransactions();
      window.useFinanceStore.getState().setSavingsTarget(null);
      window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
    });
    await new Promise((r) => setTimeout(r, 800));

    // 2. Open Modal in CREATE mode by clicking 'Set Target'
    const openCreateSuccess = await page.evaluate(() => {
      const allButtons = Array.from(document.querySelectorAll('button'));
      const setTargetBtn = allButtons.find((b) => b.textContent.includes('Set Target') || b.textContent.includes('هدف وټاکئ') || b.textContent.includes('تعیین هدف'));
      if (setTargetBtn) {
        setTargetBtn.click();
        return true;
      }
      return false;
    });

    check('3.1 Set Target button is clickable in Empty State', () => {
      assert.ok(openCreateSuccess, 'Must find and click Set Target button');
    });
    await new Promise((r) => setTimeout(r, 500));

    // 3. Assert Create Mode defaults are 0 (no hardcoded 60000 or 1000)
    const createModalInputs = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input[type="number"]'));
      const modal = document.querySelector('.fixed.inset-0.z-50');
      return {
        isModalVisible: !!modal,
        inputCount: inputs.length,
        afnTargetVal: inputs[0] ? inputs[0].value : null,
        afnTargetPlaceholder: inputs[0] ? inputs[0].placeholder : null,
        afnContribVal: inputs[1] ? inputs[1].value : null,
        usdTargetVal: inputs[2] ? inputs[2].value : null,
        usdTargetPlaceholder: inputs[2] ? inputs[2].placeholder : null,
      };
    });

    check('3.2 CREATE Mode Defaults to ZERO (No hardcoded 60,000 AFN or 1,000 USD)', () => {
      assert.ok(createModalInputs.isModalVisible, 'Modal must be open');
      assert.ok(createModalInputs.afnTargetVal === '' || createModalInputs.afnTargetVal === '0', `AFN target must be empty or 0, got "${createModalInputs.afnTargetVal}"`);
      assert.ok(createModalInputs.usdTargetVal === '' || createModalInputs.usdTargetVal === '0', `USD target must be empty or 0, got "${createModalInputs.usdTargetVal}"`);
      assert.notStrictEqual(createModalInputs.afnTargetVal, '60000', 'Must NOT initialize with 60000 AFN');
      assert.notStrictEqual(createModalInputs.usdTargetVal, '1000', 'Must NOT initialize with 1000 USD');
      assert.strictEqual(createModalInputs.afnTargetPlaceholder, '0', 'AFN placeholder must be 0');
      assert.strictEqual(createModalInputs.usdTargetPlaceholder, '0', 'USD placeholder must be 0');
    });

    // Capture screenshot of Create Mode Modal
    const createModalShot = path.join(ARTIFACTS_DIR, 'savings_modal_create_mode_zero_defaults.png');
    await page.screenshot({ path: createModalShot });
    console.log(`Saved screenshot: ${createModalShot}`);

    // 4. Test Cancel Without Saving: Store must NOT be mutated
    await page.evaluate(() => {
      const allButtons = Array.from(document.querySelectorAll('button'));
      const cancelBtn = allButtons.find((b) => b.textContent.trim() === 'Cancel' || b.textContent.trim() === 'لغوه' || b.textContent.trim() === 'انصراف');
      if (cancelBtn) cancelBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    const postCancelTarget = await page.evaluate(() => {
      return window.useFinanceStore.getState().savingsTarget;
    });

    check('3.3 Cancel Without Saving Leaves State Null / Unconfigured', () => {
      assert.strictEqual(postCancelTarget, null, 'No goal should be persisted merely by opening and cancelling');
    });

    // 5. Test Validation: Reopen modal, attempt to save 0 or negative
    await page.evaluate(() => {
      const allButtons = Array.from(document.querySelectorAll('button'));
      const setTargetBtn = allButtons.find((b) => b.textContent.includes('Set Target') || b.textContent.includes('هدف وټاکئ') || b.textContent.includes('تعیین هدف'));
      if (setTargetBtn) setTargetBtn.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // Click Save with empty/zero inputs
    await page.evaluate(() => {
      const saveBtn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Save' || b.textContent.trim() === 'ساتل' || b.textContent.trim() === 'ذخیره');
      if (saveBtn) saveBtn.click();
    });
    await new Promise((r) => setTimeout(r, 300));

    const validationShown = await page.evaluate(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50');
      const errorMsg = modal ? modal.querySelector('.text-rose-700, .text-rose-300') : null;
      return {
        isModalStillOpen: !!modal,
        hasError: !!errorMsg,
        errorText: errorMsg ? errorMsg.textContent : '',
      };
    });

    check('3.4 Validation Prevents Saving Zero or Empty Target', () => {
      assert.ok(validationShown.isModalStillOpen, 'Modal must remain open on validation failure');
      assert.ok(validationShown.hasError, 'Validation error message must be displayed');
    });

    // 6. Enter legitimate target: 60,000 AFN, save
    const inputs = await page.$$('input[type="number"]');
    if (inputs[0]) {
      await inputs[0].click({ clickCount: 3 });
      await inputs[0].type('60000');
    }
    await page.evaluate(() => {
      const saveBtn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Save' || b.textContent.trim() === 'ساتل' || b.textContent.trim() === 'ذخیره');
      if (saveBtn) saveBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const homeAfterSave = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      const storeTarget = window.useFinanceStore.getState().savingsTarget;
      return {
        hasTargetText: bodyText.includes('Savings Target') && (bodyText.includes('60,000 افـ') || bodyText.includes('60000')),
        storeTarget,
      };
    });

    check('3.5 Saving Legitimate Target Reflects on Home and in Persisted Store (60,000 AFN)', () => {
      assert.ok(homeAfterSave.hasTargetText, 'Home must display Savings Target (60,000 افـ)');
      const afnVal = typeof homeAfterSave.storeTarget?.AFN === 'object' ? homeAfterSave.storeTarget?.AFN.target : homeAfterSave.storeTarget?.AFN;
      assert.strictEqual(afnVal, 60000, 'Persisted target must be 60,000');
    });

    // 7. Open in EDIT mode: Must display the actual saved 60,000 AFN
    await page.evaluate(() => {
      const editBtn = document.querySelector('button[title*="Edit Target"], button[title*="Target"]');
      if (editBtn) editBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const editModalInputs = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input[type="number"]'));
      return {
        afnTargetVal: inputs[0] ? inputs[0].value : '',
      };
    });

    check('3.6 EDIT Mode Loads Real Saved Target (60000 AFN)', () => {
      assert.strictEqual(editModalInputs.afnTargetVal, '60000', 'EDIT mode must display the actual persisted 60000 target');
    });

    // Capture screenshot of Edit Mode Modal
    const editModalShot = path.join(ARTIFACTS_DIR, 'savings_modal_edit_mode_saved_data.png');
    await page.screenshot({ path: editModalShot });
    console.log(`Saved screenshot: ${editModalShot}`);

    // 8. Edit to 75,000 AFN and Save
    const editInputs = await page.$$('input[type="number"]');
    if (editInputs[0]) {
      await editInputs[0].click({ clickCount: 3 });
      await page.keyboard.press('Backspace');
      await editInputs[0].type('75000');
    }
    await page.evaluate(() => {
      const saveBtn = Array.from(document.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Save' || b.textContent.trim() === 'ساتل' || b.textContent.trim() === 'ذخیره');
      if (saveBtn) saveBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Reload page to verify persistence across reloads
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 3500));

    const postReloadData = await page.evaluate(() => {
      const bodyText = document.body.innerText;
      const storeTarget = window.useFinanceStore.getState().savingsTarget;
      return {
        has75000Text: bodyText.includes('75,000 افـ') || bodyText.includes('75000'),
        storeTarget,
      };
    });

    check('3.7 Edited Target Persists After Page Reload (75,000 AFN)', () => {
      assert.ok(postReloadData.has75000Text, 'Home must display 75,000 افـ after browser reload');
    });

  } finally {
    await browser.close();
  }

  console.log('\n======================================================================');
  console.log(`  SUITE 3 RESULTS: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log('======================================================================');
  if (passed !== total) process.exit(1);
}

runTestSuite().catch((err) => {
  console.error('Fatal error in Suite 3:', err);
  process.exit(1);
});
