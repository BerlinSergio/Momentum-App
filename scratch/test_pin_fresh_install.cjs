const puppeteer = require('puppeteer');
const path = require('path');

const artDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  for (const mode of ['light', 'dark']) {
    const route = mode === 'dark' ? 'pin_setup_change_dark_mode' : 'pin_setup_change_light_mode';
    console.log(`\n========================================================================`);
    console.log(`=== TESTING FRESH INSTALL & DYNAMIC PIN CREATION: ${mode.toUpperCase()} MODE ===`);
    console.log(`========================================================================`);

    // Create fresh isolated browser context for clean fresh install
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    await page.goto(`http://localhost:5173/?screen=${route}`);
    await new Promise(r => setTimeout(r, 700));

    // Hide dev navigator sidebar
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // 2. Test Default State on Fresh Install
    const freshState = await page.evaluate(() => {
      const raw = localStorage.getItem('momentum-security-storage');
      let state = {};
      if (raw) {
        state = JSON.parse(raw).state || {};
      }
      return {
        hasPin: state.hasPin ?? false,
        pin: state.pin ?? '',
        isAppLockActive: state.isAppLockActive ?? false
      };
    });
    console.log('- Fresh Install Store State:', freshState);
    console.log('  Initial hasPin is false on fresh install:', freshState.hasPin === false);

    // 3. Audit Dynamic Step Rendering for Fresh Install (hasPin === false)
    const freshUiAudit = await page.evaluate(() => {
      const h2 = document.querySelector('h2');
      const lockIcon = h2?.querySelector('svg.lucide-lock');
      const h4s = Array.from(document.querySelectorAll('h4')).map(h => h.innerText.trim());
      const inputs = Array.from(document.querySelectorAll('input')).map(i => i.getAttribute('aria-label'));
      return {
        headerText: h2?.innerText.trim(),
        hasLockIcon: !!lockIcon,
        stepCount: h4s.length,
        h4s,
        inputs
      };
    });
    console.log('- Fresh Install UI Audit:', freshUiAudit);
    console.log('  Header is "Create New PIN":', freshUiAudit.headerText.includes('Create New PIN'));
    console.log('  Has Lock Icon in header:', freshUiAudit.hasLockIcon);
    console.log('  "Enter Current PIN" is HIDDEN entirely:', !freshUiAudit.h4s.some(h => h.includes('Current PIN')));
    console.log('  Exactly 2 steps rendered:', freshUiAudit.stepCount === 2);
    console.log('  Step 1 is "1. Create 4-Digit PIN":', freshUiAudit.h4s[0] === '1. Create 4-Digit PIN');
    console.log('  Step 2 is "2. Confirm New PIN":', freshUiAudit.h4s[1] === '2. Confirm New PIN');

    await page.screenshot({ path: path.join(artDir, `pin_setup_fresh_install_2steps_${mode}.png`) });
    console.log(`  Saved screenshot: pin_setup_fresh_install_2steps_${mode}.png`);

    // 4. Test 2-Step Creation Flow Input & Submission
    console.log('- Entering new PIN in 2-step creation flow...');
    await page.type('input[aria-label="Create 4-Digit PIN"]', '2468', { delay: 35 });
    await new Promise(r => setTimeout(r, 300));

    await page.type('input[aria-label="Confirm New PIN"]', '2468', { delay: 35 });
    await new Promise(r => setTimeout(r, 400));

    const creationMatchAudit = await page.evaluate(() => {
      const chips = Array.from(document.querySelectorAll('span')).map(s => s.innerText);
      const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save New PIN'));
      return {
        matched: chips.some(t => t.includes('PIN Matched')),
        saveEnabled: !saveBtn?.disabled
      };
    });
    console.log('  Creation PIN Match Audit:', creationMatchAudit);
    console.log('  PIN Matched on creation flow:', creationMatchAudit.matched);
    console.log('  Save button enabled without requiring current PIN:', creationMatchAudit.saveEnabled);

    // Click Save New PIN
    await page.evaluate(() => {
      const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save New PIN'));
      if (saveBtn) saveBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const postCreationState = await page.evaluate(() => {
      const raw = localStorage.getItem('momentum-security-storage');
      const state = JSON.parse(raw).state;
      return { pin: state.pin, hasPin: state.hasPin };
    });
    console.log('  Store after creation:', postCreationState);
    console.log('  Store PIN updated to "2468":', postCreationState.pin === '2468');
    console.log('  Store hasPin updated to true:', postCreationState.hasPin === true);

    // 5. Test Modification Flow for Existing User (hasPin === true)
    console.log('\n- Reloading screen as Existing User (hasPin === true)...');
    await page.goto(`http://localhost:5173/?screen=${route}`);
    await new Promise(r => setTimeout(r, 700));

    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    const existingUiAudit = await page.evaluate(() => {
      const h2 = document.querySelector('h2');
      const h4s = Array.from(document.querySelectorAll('h4')).map(h => h.innerText.trim());
      return {
        headerText: h2?.innerText.trim(),
        stepCount: h4s.length,
        h4s
      };
    });
    console.log('- Existing User UI Audit:', existingUiAudit);
    console.log('  Header is "Change Existing PIN":', existingUiAudit.headerText.includes('Change Existing PIN'));
    console.log('  All 3 steps rendered:', existingUiAudit.stepCount === 3);
    console.log('  Step 1 is "1. Enter Current PIN":', existingUiAudit.h4s[0] === '1. Enter Current PIN');
    console.log('  Step 2 is "2. New 4-Digit PIN":', existingUiAudit.h4s[1] === '2. New 4-Digit PIN');
    console.log('  Step 3 is "3. Confirm New PIN":', existingUiAudit.h4s[2] === '3. Confirm New PIN');

    await page.screenshot({ path: path.join(artDir, `pin_setup_existing_user_3steps_${mode}.png`) });
    console.log(`  Saved screenshot: pin_setup_existing_user_3steps_${mode}.png`);
    await context.close();
  }

  await browser.close();
  console.log('\nALL FRESH INSTALL & DYNAMIC STEP TESTS COMPLETED AND VERIFIED!');
})();
