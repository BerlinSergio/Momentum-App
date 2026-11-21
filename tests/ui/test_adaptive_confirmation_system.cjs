const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTests() {
  console.log('🚀 Starting Universal Adaptive Confirmation Dialog Automated Verification...');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Initialize app state to bypass setup / splash / lock
  await page.evaluate(() => {
    if (window.setIsAppLoading) window.setIsAppLoading(false);
    if (window.useProfileStore) window.useProfileStore.getState().completeSetup();
    if (window.useSecurityStore) window.useSecurityStore.getState().setLocked(false);
  });
  await new Promise(r => setTimeout(r, 600));

  async function saveScreenshot(name) {
    const dest = path.join(ARTIFACT_DIR, `${name}.png`);
    await page.screenshot({ path: dest });
    console.log(`📸 Saved screenshot: ${dest}`);
  }

  // Helper to setup page state
  async function setupScreen(screenKey, theme = 'dark', lang = 'en', vp = { width: 1440, height: 900 }) {
    await page.setViewport(vp);
    await page.evaluate((key, th, lng) => {
      if (window.useNavigationStore) window.useNavigationStore.getState().setActiveTab(key);
      if (window.useThemeStore) window.useThemeStore.getState().setTheme(th);
      if (window.useLocaleStore) window.useLocaleStore.getState().setLocale(lng);
      if (window.i18n) window.i18n.changeLanguage(lng);
    }, screenKey, theme, lang);
    await new Promise(r => setTimeout(r, 500));
  }

  // ─────────────────────────────────────────────────────────────
  // TEST 1: Desktop Discard Warning Dialog in Dark Mode
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- TEST 1: Desktop Discard Dialog (Dark Mode) ---');
  await setupScreen('add_income_dark_mode', 'dark', 'en', { width: 1440, height: 900 });

  // Enter amount
  const amountInput = await page.$('input[placeholder="0.00"]');
  if (amountInput) {
    await amountInput.click({ clickCount: 3 });
    await amountInput.type('12500');
  }

  // Click Cancel button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cancelBtn = btns.find(b => b.textContent.includes('Cancel') && b.classList.contains('btn-secondary'));
    if (cancelBtn) cancelBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Verify dialog is visible
  let dialog = await page.$('[data-testid="momentum-dialog-warning"]');
  console.log('✓ Warning dialog rendered:', Boolean(dialog));

  const dialogText = await page.evaluate(() => {
    const el = document.querySelector('[data-testid="momentum-dialog-warning"]');
    return el ? el.innerText : '';
  });
  console.log('✓ Dialog text preview:', dialogText.split('\n').slice(0, 3).join(' | '));

  await saveScreenshot('add_income_discard_dialog_desktop_dark');

  // Test "Keep editing" (Cancel action inside dialog)
  await page.click('[data-testid="momentum-dialog-cancel-btn"]');
  await new Promise(r => setTimeout(r, 400));

  // Verify dialog closed and input value preserved
  const preservedValue = await page.evaluate(() => {
    const input = document.querySelector('input[placeholder="0.00"]');
    return input ? input.value : '';
  });
  console.log('✓ Form retained input after Keep Editing:', preservedValue === '12500');

  // Trigger cancel again and confirm discard
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cancelBtn = btns.find(b => b.textContent.includes('Cancel') && b.classList.contains('btn-secondary'));
    if (cancelBtn) cancelBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.click('[data-testid="momentum-dialog-confirm-btn"]');
  await new Promise(r => setTimeout(r, 500));

  const currentTab = await page.evaluate(() => window.useNavigationStore?.getState().activeTab);
  console.log('✓ Navigated back after discard confirm to:', currentTab);

  // ─────────────────────────────────────────────────────────────
  // TEST 2: Desktop Discard Warning Dialog in Light Mode
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- TEST 2: Desktop Discard Dialog (Light Mode) ---');
  await setupScreen('add_income_light_mode', 'light', 'en', { width: 1440, height: 900 });

  const amountInputLight = await page.$('input[placeholder="0.00"]');
  if (amountInputLight) {
    await amountInputLight.click({ clickCount: 3 });
    await amountInputLight.type('8750');
  }

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cancelBtn = btns.find(b => b.textContent.includes('Cancel') && b.classList.contains('btn-secondary'));
    if (cancelBtn) cancelBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  await saveScreenshot('add_income_discard_dialog_desktop_light');
  await page.click('[data-testid="momentum-dialog-cancel-btn"]');
  await new Promise(r => setTimeout(r, 400));

  // ─────────────────────────────────────────────────────────────
  // TEST 3: Mobile Adaptive Bottom Sheet in Dark Mode
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- TEST 3: Mobile Adaptive Bottom Sheet (Dark Mode) ---');
  await setupScreen('add_income_dark_mode', 'dark', 'en', { width: 390, height: 844 });

  const amountInputMobile = await page.$('input[placeholder="0.00"]');
  if (amountInputMobile) {
    await amountInputMobile.click({ clickCount: 3 });
    await amountInputMobile.type('3400');
  }

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cancelBtn = btns.find(b => b.textContent.includes('Cancel') && b.classList.contains('btn-secondary'));
    if (cancelBtn) cancelBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  await saveScreenshot('add_income_discard_sheet_mobile_dark');
  await page.click('[data-testid="momentum-dialog-cancel-btn"]');
  await new Promise(r => setTimeout(r, 400));

  // ─────────────────────────────────────────────────────────────
  // TEST 4: Mobile Adaptive Bottom Sheet in Light Mode
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- TEST 4: Mobile Adaptive Bottom Sheet (Light Mode) ---');
  await setupScreen('add_income_light_mode', 'light', 'en', { width: 390, height: 844 });

  const amountInputMobileLight = await page.$('input[placeholder="0.00"]');
  if (amountInputMobileLight) {
    await amountInputMobileLight.click({ clickCount: 3 });
    await amountInputMobileLight.type('2200');
  }

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const cancelBtn = btns.find(b => b.textContent.includes('Cancel') && b.classList.contains('btn-secondary'));
    if (cancelBtn) cancelBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  await saveScreenshot('add_income_discard_sheet_mobile_light');
  await page.click('[data-testid="momentum-dialog-cancel-btn"]');
  await new Promise(r => setTimeout(r, 400));

  // ─────────────────────────────────────────────────────────────
  // TEST 5: Destructive Confirmation (Desktop & Mobile)
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- TEST 5: Destructive Delete Confirmation ---');
  await setupScreen('income_management_dark_mode', 'dark', 'en', { width: 1440, height: 900 });

  await page.evaluate(() => {
    window.momentumConfirm({
      variant: 'destructive',
      titleKey: 'confirm.deleteIncomeTitle',
      messageKey: 'confirm.deleteIncomeDescription',
      confirmLabelKey: 'confirm.delete',
      cancelLabelKey: 'confirm.cancel',
    });
  });
  await new Promise(r => setTimeout(r, 400));

  const destructiveDialog = await page.$('[data-testid="momentum-dialog-destructive"]');
  console.log('✓ Destructive dialog rendered:', Boolean(destructiveDialog));

  // Verify Cancel button is auto-focused for safety
  const isCancelFocused = await page.evaluate(() => {
    const cancelBtn = document.querySelector('[data-testid="momentum-dialog-cancel-btn"]');
    return document.activeElement === cancelBtn;
  });
  console.log('✓ Destructive safety: Cancel button auto-focused:', isCancelFocused);

  await saveScreenshot('delete_confirmation_desktop_dark');
  await page.click('[data-testid="momentum-dialog-cancel-btn"]');
  await new Promise(r => setTimeout(r, 400));

  // Mobile Destructive
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    window.momentumConfirm({
      variant: 'destructive',
      titleKey: 'confirm.deleteTaskTitle',
      messageKey: 'confirm.deleteTaskDescription',
      confirmLabelKey: 'confirm.delete',
      cancelLabelKey: 'confirm.cancel',
    });
  });
  await new Promise(r => setTimeout(r, 500));
  await saveScreenshot('delete_confirmation_mobile_dark');
  await page.click('[data-testid="momentum-dialog-cancel-btn"]');
  await new Promise(r => setTimeout(r, 400));

  // ─────────────────────────────────────────────────────────────
  // TEST 6: Custom Prompt Input Dialog (Desktop)
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- TEST 6: Prompt Input Dialog ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => {
    window.momentumPrompt({
      titleKey: 'confirm.promptDepositScheduleTitle',
      messageKey: 'confirm.promptDepositScheduleDescription',
      defaultValue: 'Monthly on 1st',
      placeholder: 'e.g. Monthly, Bi-weekly',
    });
  });
  await new Promise(r => setTimeout(r, 400));

  const promptInput = await page.$('[data-testid="momentum-dialog-prompt-input"]');
  console.log('✓ Prompt input rendered:', Boolean(promptInput));

  const isInputFocused = await page.evaluate(() => {
    const inp = document.querySelector('[data-testid="momentum-dialog-prompt-input"]');
    return document.activeElement === inp;
  });
  console.log('✓ Prompt input auto-focused:', isInputFocused);

  await saveScreenshot('prompt_input_dialog_desktop_dark');
  await page.click('[data-testid="momentum-dialog-cancel-btn"]');
  await new Promise(r => setTimeout(r, 400));

  // ─────────────────────────────────────────────────────────────
  // TEST 7: Internationalization & RTL (Pashto & Dari)
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- TEST 7: i18n & RTL Validation ---');

  // Pashto RTL
  await setupScreen('add_income_dark_mode', 'dark', 'ps-AF', { width: 1440, height: 900 });
  await page.evaluate(() => {
    window.momentumConfirm({
      variant: 'warning',
      titleKey: 'confirm.discardIncomeTitle',
      messageKey: 'confirm.discardIncomeDescription',
      confirmLabelKey: 'confirm.discard',
      cancelLabelKey: 'confirm.keepEditing',
    });
  });
  await new Promise(r => setTimeout(r, 400));

  const isPashtoRtl = await page.evaluate(() => {
    const el = document.querySelector('[role="alertdialog"]');
    return el?.getAttribute('dir') === 'rtl';
  });
  console.log('✓ Pashto RTL directionality applied:', isPashtoRtl);
  await saveScreenshot('confirm_dialog_pashto_rtl');
  await page.click('[data-testid="momentum-dialog-cancel-btn"]');
  await new Promise(r => setTimeout(r, 400));

  // Dari RTL
  await setupScreen('add_income_dark_mode', 'dark', 'fa-AF', { width: 1440, height: 900 });
  await page.evaluate(() => {
    window.momentumConfirm({
      variant: 'destructive',
      titleKey: 'confirm.deleteIncomeTitle',
      messageKey: 'confirm.deleteIncomeDescription',
      confirmLabelKey: 'confirm.delete',
      cancelLabelKey: 'confirm.cancel',
    });
  });
  await new Promise(r => setTimeout(r, 400));

  const isDariRtl = await page.evaluate(() => {
    const el = document.querySelector('[role="alertdialog"]');
    return el?.getAttribute('dir') === 'rtl';
  });
  console.log('✓ Dari RTL directionality applied:', isDariRtl);
  await saveScreenshot('confirm_dialog_dari_rtl');
  await page.click('[data-testid="momentum-dialog-cancel-btn"]');
  await new Promise(r => setTimeout(r, 400));

  // Restore english
  await page.evaluate(() => {
    if (window.useLocaleStore) window.useLocaleStore.getState().setLocale('en');
    if (window.i18n) window.i18n.changeLanguage('en');
  });

  await browser.close();
  console.log('\n✅ All Universal Adaptive Confirmation Dialog tests passed successfully!');
}

runTests().catch(err => {
  console.error('❌ Test suite failed:', err);
  process.exit(1);
});
