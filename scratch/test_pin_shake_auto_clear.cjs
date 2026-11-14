const puppeteer = require('puppeteer');
const path = require('path');

const artDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  try {
    console.log('\n======================================================');
    console.log('=== TESTING PIN SHAKE & AUTO-CLEAR UX LOGIC ===');
    console.log('======================================================');

    // ----------------------------------------------------
    // TEST 1: Current PIN Shake & Auto-Clear (Light Mode)
    // ----------------------------------------------------
    console.log('\n[Test 1] Current PIN Shake & Auto-Clear in Light Mode...');
    const context1 = await browser.createBrowserContext();
    const page1 = await context1.newPage();
    await page1.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    // Set stored PIN to 2580
    await page1.goto('http://localhost:5173/?screen=pin_setup_change_light_mode');
    await page1.evaluate(() => {
      localStorage.setItem('momentum-security-storage', JSON.stringify({
        state: {
          isAppLockActive: false,
          hasPin: true,
          pin: '2580',
          isLocked: false,
          _hasHydrated: true
        },
        version: 0
      }));
    });

    await page1.goto('http://localhost:5173/?screen=pin_setup_change_light_mode');
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await page1.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // Focus current PIN input and enter wrong PIN '9999'
    const input1 = await page1.$('input[aria-label="Enter Current PIN"]');
    if (!input1) throw new Error('Enter Current PIN input not found!');
    await input1.type('9999', { delay: 50 });

    // Immediately check error and shake state (within 100ms)
    await new Promise(r => setTimeout(r, 120));

    const shakeAudit1 = await page1.evaluate(() => {
      const shakeEl = document.querySelector('.animate-shake');
      const redDots = document.querySelectorAll('.bg-rose-500');
      const activeElAria = document.activeElement?.getAttribute('aria-label');
      return {
        hasShake: !!shakeEl,
        redDotCount: redDots.length,
        activeElAria
      };
    });

    console.log('Shake state audit (immediate error):', shakeAudit1);
    if (!shakeAudit1.hasShake) {
      throw new Error('Expected .animate-shake class not found on error!');
    }
    if (shakeAudit1.redDotCount === 0) {
      throw new Error('Expected red dots (.bg-rose-500) on error!');
    }
    console.log('✅ Shake animation & red dots triggered on incorrect PIN!');

    const screenshotShakeLight = path.join(artDir, 'pin_error_shake_current_pin_light.png');
    await page1.screenshot({ path: screenshotShakeLight });
    console.log(`Saved screenshot: ${screenshotShakeLight}`);

    // Wait for the 450ms auto-clear timeout to complete
    await new Promise(r => setTimeout(r, 500));

    const clearedAudit1 = await page1.evaluate(() => {
      const input = document.querySelector('input[aria-label="Enter Current PIN"]');
      const shakeEl = document.querySelector('.animate-shake');
      const redDots = document.querySelectorAll('.bg-rose-500');
      const activeElAria = document.activeElement?.getAttribute('aria-label');
      return {
        inputValue: input?.value,
        hasShake: !!shakeEl,
        redDotCount: redDots.length,
        isFocused: activeElAria === 'Enter Current PIN'
      };
    });

    console.log('Auto-cleared state audit (after 450ms):', clearedAudit1);
    if (clearedAudit1.inputValue !== '') {
      throw new Error(`Expected input value to auto-clear to "", but got "${clearedAudit1.inputValue}"`);
    }
    if (clearedAudit1.hasShake) {
      throw new Error('Shake class should be removed after timeout!');
    }
    if (clearedAudit1.redDotCount > 0) {
      throw new Error('Red dots should be cleared back to default empty state!');
    }
    if (!clearedAudit1.isFocused) {
      throw new Error('Input field should retain focus for immediate re-typing!');
    }
    console.log('✅ Auto-clear verified: PIN reset to empty string, shake removed, focus preserved!');

    const screenshotClearedLight = path.join(artDir, 'pin_auto_cleared_current_pin_light.png');
    await page1.screenshot({ path: screenshotClearedLight });
    console.log(`Saved screenshot: ${screenshotClearedLight}`);

    // ----------------------------------------------------
    // TEST 2: Confirmation PIN Mismatch Shake & Auto-Clear (Dark Mode)
    // ----------------------------------------------------
    console.log('\n[Test 2] Confirm PIN Mismatch Shake & Auto-Clear in Dark Mode...');
    const context2 = await browser.createBrowserContext();
    const page2 = await context2.newPage();
    await page2.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    // Set stored PIN to 2580
    await page2.goto('http://localhost:5173/?screen=pin_setup_change_dark_mode');
    await page2.evaluate(() => {
      localStorage.setItem('momentum-security-storage', JSON.stringify({
        state: {
          isAppLockActive: false,
          hasPin: true,
          pin: '2580',
          isLocked: false,
          _hasHydrated: true
        },
        version: 0
      }));
    });

    await page2.goto('http://localhost:5173/?screen=pin_setup_change_dark_mode');
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await page2.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // 1. Enter correct current PIN (2580)
    const curInput = await page2.$('input[aria-label="Enter Current PIN"]');
    await curInput.type('2580', { delay: 40 });
    await new Promise(r => setTimeout(r, 200));

    // 2. Enter new PIN (7412)
    const newInput = await page2.$('input[aria-label="New 4-Digit PIN"]');
    await newInput.type('7412', { delay: 40 });
    await new Promise(r => setTimeout(r, 200));

    // 3. Enter mismatched confirmation PIN (9999)
    const confInput = await page2.$('input[aria-label="Confirm New PIN"]');
    await confInput.type('9999', { delay: 40 });
    await new Promise(r => setTimeout(r, 120));

    const shakeAudit2 = await page2.evaluate(() => {
      const shakeEl = document.querySelector('.animate-shake');
      const redDots = document.querySelectorAll('.bg-rose-500');
      const mismatchChip = document.body.innerText.includes('PIN Mismatch');
      return {
        hasShake: !!shakeEl,
        redDotCount: redDots.length,
        mismatchChip
      };
    });

    console.log('Confirmation mismatch audit (immediate error):', shakeAudit2);
    if (!shakeAudit2.hasShake) {
      throw new Error('Expected .animate-shake class on confirmation mismatch!');
    }
    if (shakeAudit2.redDotCount === 0) {
      throw new Error('Expected red dots on confirmation mismatch!');
    }
    console.log('✅ Confirmation mismatch shake & red dots verified!');

    const screenshotShakeDark = path.join(artDir, 'pin_error_shake_confirm_pin_dark.png');
    await page2.screenshot({ path: screenshotShakeDark });
    console.log(`Saved screenshot: ${screenshotShakeDark}`);

    // Wait for the 450ms auto-clear timeout to complete
    await new Promise(r => setTimeout(r, 500));

    const clearedAudit2 = await page2.evaluate(() => {
      const input = document.querySelector('input[aria-label="Confirm New PIN"]');
      const shakeEl = document.querySelector('.animate-shake');
      const redDots = document.querySelectorAll('.bg-rose-500');
      const activeElAria = document.activeElement?.getAttribute('aria-label');
      return {
        inputValue: input?.value,
        hasShake: !!shakeEl,
        redDotCount: redDots.length,
        isFocused: activeElAria === 'Confirm New PIN'
      };
    });

    console.log('Confirmation auto-cleared audit (after 450ms):', clearedAudit2);
    if (clearedAudit2.inputValue !== '') {
      throw new Error(`Expected confirmation input to auto-clear to "", but got "${clearedAudit2.inputValue}"`);
    }
    if (clearedAudit2.hasShake) {
      throw new Error('Shake class should be removed after timeout!');
    }
    if (!clearedAudit2.isFocused) {
      throw new Error('Confirm input should retain focus for immediate re-typing!');
    }
    console.log('✅ Confirmation auto-clear verified: PIN reset to empty string, ready for re-entry!');

    const screenshotClearedDark = path.join(artDir, 'pin_auto_cleared_confirm_pin_dark.png');
    await page2.screenshot({ path: screenshotClearedDark });
    console.log(`Saved screenshot: ${screenshotClearedDark}`);

    console.log('\n🎉 ALL PIN SHAKE & AUTO-CLEAR TESTS PASSED WITH 100% SUCCESS!');
  } finally {
    await browser.close();
  }
})();
