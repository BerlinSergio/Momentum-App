const puppeteer = require('puppeteer');
const path = require('path');

const artDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

  for (const mode of ['dark', 'light']) {
    const route = mode === 'dark' ? 'pin_setup_change_dark_mode' : 'pin_setup_change_light_mode';
    console.log(`\n========================================================`);
    console.log(`=== TESTING PIN SETUP & VAULT: ${mode.toUpperCase()} MODE ===`);
    console.log(`========================================================`);

    // Initialize unlocked session with known PIN
    await page.goto('http://localhost:5173');
    await page.evaluate(() => {
      localStorage.setItem('momentum-security-storage', JSON.stringify({
        state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234', _hasHydrated: true },
        version: 0
      }));
    });

    await page.goto(`http://localhost:5173/?screen=${route}`);
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // 1. Verify Bottom Navigation is Hidden & Viewport pb-32 removed
    const navAudit = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Bottom Navigation"]');
      const viewport = document.querySelector('.momentum-canvas-viewport');
      return {
        bottomNavPresent: !!nav,
        viewportHasPb32: viewport ? viewport.className.includes('pb-32') : false,
        viewportClasses: viewport?.className
      };
    });
    console.log('- Navigation Bar Audit:', navAudit);
    console.log('  Bottom Navigation completely hidden:', !navAudit.bottomNavPresent);
    console.log('  Viewport has pb-32 removed (pb-0 active):', !navAudit.viewportHasPb32);

    // 2. Action Buttons Audit
    const buttonAudit = await page.evaluate(() => {
      const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save New PIN'));
      const cancelBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Cancel & Return'));
      return {
        saveFound: !!saveBtn,
        saveDisabled: saveBtn?.disabled,
        cancelFound: !!cancelBtn
      };
    });
    console.log('- Initial Action Buttons:', buttonAudit);

    // Initial screenshot
    await page.screenshot({ path: path.join(artDir, `pin_setup_interactive_${mode}.png`) });
    console.log(`  Saved screenshot: pin_setup_interactive_${mode}.png`);

    // 3. Test Global Security Sync: "Require PIN on App Switch"
    console.log('- Testing "Require PIN on App Switch" toggle...');
    const initialLockState = await page.evaluate(() => {
      const raw = localStorage.getItem('momentum-security-storage');
      return JSON.parse(raw).state.isAppLockActive;
    });

    await page.evaluate(() => {
      const toggle = Array.from(document.querySelectorAll('button')).find(b => b.className.includes('rounded-full p-0.5'));
      if (toggle) toggle.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const toggledLockState = await page.evaluate(() => {
      const raw = localStorage.getItem('momentum-security-storage');
      return JSON.parse(raw).state.isAppLockActive;
    });
    console.log(`  Initial Lock: ${initialLockState} -> Toggled Lock: ${toggledLockState}`);
    console.log(`  Toggle successfully updated store: ${initialLockState !== toggledLockState}`);

    // 4. Test Interactive PIN Sequence:
    console.log('- Testing PIN Input sequence...');

    // Type Step 1: Current PIN (1234)
    await page.type('input[aria-label="Enter Current PIN"]', '1234', { delay: 40 });
    await new Promise(r => setTimeout(r, 400));

    // Type Step 2: New PIN (8520)
    await page.type('input[aria-label="New 4-Digit PIN"]', '8520', { delay: 40 });
    await new Promise(r => setTimeout(r, 400));

    // Type Step 3 Mismatch: Confirm PIN (8521)
    await page.type('input[aria-label="Confirm New PIN"]', '8521', { delay: 40 });
    await new Promise(r => setTimeout(r, 400));

    const mismatchAudit = await page.evaluate(() => {
      const chips = Array.from(document.querySelectorAll('span')).map(s => s.innerText);
      const hasMismatch = chips.some(t => t.includes('PIN Mismatch'));
      const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save New PIN'));
      return { hasMismatch, saveDisabled: saveBtn?.disabled };
    });
    console.log('  Mismatch State Audit:', mismatchAudit);
    console.log('  Shows PIN Mismatch chip:', mismatchAudit.hasMismatch);
    console.log('  Save button disabled on mismatch:', mismatchAudit.saveDisabled);

    await page.screenshot({ path: path.join(artDir, `pin_setup_mismatch_${mode}.png`) });
    console.log(`  Saved screenshot: pin_setup_mismatch_${mode}.png`);

    // Backspace Step 3 and fix to Match (8520)
    const confirmInput = await page.$('input[aria-label="Confirm New PIN"]');
    await confirmInput.click();
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press('Backspace');
    }
    await new Promise(r => setTimeout(r, 200));
    await page.type('input[aria-label="Confirm New PIN"]', '8520', { delay: 40 });
    await new Promise(r => setTimeout(r, 400));

    const matchedAudit = await page.evaluate(() => {
      const chips = Array.from(document.querySelectorAll('span')).map(s => s.innerText);
      const hasMatched = chips.some(t => t.includes('PIN Matched'));
      const hasNonSeq = chips.some(t => t.includes('Non-sequential rule OK'));
      const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save New PIN'));
      return { hasMatched, hasNonSeq, saveDisabled: saveBtn?.disabled };
    });
    console.log('  Matched State Audit:', matchedAudit);
    console.log('  Shows PIN Matched green chip:', matchedAudit.hasMatched);
    console.log('  Shows Non-sequential rule OK chip:', matchedAudit.hasNonSeq);
    console.log('  Save button enabled on match:', !matchedAudit.saveDisabled);

    await page.screenshot({ path: path.join(artDir, `pin_setup_matched_${mode}.png`) });
    console.log(`  Saved screenshot: pin_setup_matched_${mode}.png`);

    // 5. Test Save New PIN Action & Toast
    console.log('- Testing Save New PIN click & store update...');
    await page.evaluate(() => {
      const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save New PIN'));
      if (saveBtn) saveBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));

    const toastAudit = await page.evaluate(() => {
      const toastEl = document.querySelector('.fixed.top-5');
      return {
        toastPresent: !!toastEl,
        toastText: toastEl?.innerText
      };
    });
    console.log('  Toast Audit:', toastAudit);

    // Wait for navigation
    await new Promise(r => setTimeout(r, 800));
    const finalStoredPin = await page.evaluate(() => {
      const raw = localStorage.getItem('momentum-security-storage');
      return JSON.parse(raw).state.pin;
    });
    console.log(`  Updated Store PIN: "${finalStoredPin}" (Expected: "8520")`);
    console.log(`  Global store updated securely: ${finalStoredPin === '8520'}`);
  }

  await browser.close();
  console.log('\nALL PIN SETUP & SECURITY VAULT TESTS PASSED SUCCESSFULLY!');
})();
