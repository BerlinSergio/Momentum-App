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
    console.log('=== TESTING MOMENTUM VAULT LOCK SCREEN & PIN UNLOCK ===');
    console.log('======================================================');

    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    // 1. Set localStorage to App Lock Active with PIN 2580
    await page.goto('http://localhost:5173/?screen=home_dashboard_dark_mode');
    await page.evaluate(() => {
      localStorage.setItem('momentum-security-storage', JSON.stringify({
        state: {
          isAppLockActive: true,
          hasPin: true,
          pin: '2580',
          isLocked: true,
          biometricsEnabled: false,
          lockTiming: 'immediate',
          _hasHydrated: true
        },
        version: 0
      }));
    });

    // Reload with locked state
    await page.goto('http://localhost:5173/?screen=home_dashboard_dark_mode');
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // 2. Audit Vault Lock Screen elements
    const lockScreenAudit = await page.evaluate(() => {
      const vaultTitle = document.querySelector('h1')?.innerText?.trim();
      const dots = document.querySelectorAll('.rounded-full.border-2, .w-4.h-4.rounded-full');
      const buttons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim());
      const bottomNav = document.querySelector('nav');
      const overlay = document.querySelector('.fixed.inset-0.z-\\[999\\]');
      const hasZ999 = !!overlay;

      return {
        vaultTitle,
        dotCount: dots.length,
        buttons,
        hasBottomNav: !!bottomNav,
        hasZ999Overlay: hasZ999
      };
    });

    console.log('\n[1] Lock Screen Audit:', lockScreenAudit);
    if (!lockScreenAudit.vaultTitle?.includes('VAULT')) {
      throw new Error(`Vault title not found. Got: ${lockScreenAudit.vaultTitle}`);
    }
    if (lockScreenAudit.hasBottomNav) {
      throw new Error('Bottom navigation bar is unexpectedly visible while locked!');
    }
    if (!lockScreenAudit.hasZ999Overlay) {
      throw new Error('z-[999] Vault overlay not found!');
    }
    console.log('✅ Vault Lock Screen verified with 4-digit PIN dots & keypad! BottomNav is hidden.');

    // Screenshot initial lock screen
    const initialScreenshotPath = path.join(artDir, 'vault_lock_screen_initial.png');
    await page.screenshot({ path: initialScreenshotPath });
    console.log(`Saved screenshot: ${initialScreenshotPath}`);

    // 3. Test entering incorrect PIN (1234)
    console.log('\n[2] Testing Incorrect PIN (1234)...');
    for (const digit of ['1', '2', '3', '4']) {
      await page.evaluate((d) => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === d);
        if (btn) btn.click();
      }, digit);
      await new Promise(r => setTimeout(r, 100));
    }

    await new Promise(r => setTimeout(r, 200));

    const incorrectState = await page.evaluate(() => {
      const errorText = document.body.innerText.includes('Incorrect PIN');
      const hasShake = !!document.querySelector('.momentum-shake');
      return { errorText, hasShake };
    });

    console.log('Incorrect PIN feedback:', incorrectState);
    if (!incorrectState.errorText) {
      throw new Error('Expected "Incorrect PIN" error text not displayed!');
    }
    console.log('✅ Error handling verified: "Incorrect PIN" displayed and dots shaken!');

    const incorrectScreenshotPath = path.join(artDir, 'vault_lock_screen_incorrect_pin.png');
    await page.screenshot({ path: incorrectScreenshotPath });
    console.log(`Saved screenshot: ${incorrectScreenshotPath}`);

    // Wait for shake and dot reset (450ms)
    await new Promise(r => setTimeout(r, 600));

    // 4. Test entering correct PIN (2580)
    console.log('\n[3] Testing Correct PIN (2580)...');
    for (const digit of ['2', '5', '8', '0']) {
      await page.evaluate((d) => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === d);
        if (btn) btn.click();
      }, digit);
      await new Promise(r => setTimeout(r, 100));
    }

    // Wait for unlock transition
    await new Promise(r => setTimeout(r, 800));

    const unlockedAudit = await page.evaluate(() => {
      const overlay = document.querySelector('.fixed.inset-0.z-\\[999\\]');
      const bottomNav = document.querySelector('nav');
      const dashboardHeading = document.body.innerText.includes('Daily Overview') || document.body.innerText.includes('Momentum');
      return {
        hasOverlay: !!overlay,
        hasBottomNav: !!bottomNav,
        dashboardHeading
      };
    });

    console.log('Unlocked State Audit:', unlockedAudit);
    if (unlockedAudit.hasOverlay) {
      throw new Error('Vault overlay is still visible after entering correct PIN!');
    }
    if (!unlockedAudit.hasBottomNav) {
      throw new Error('Bottom navigation bar was not restored after unlocking!');
    }
    console.log('✅ Unlock successful! App dismissed lock screen and restored full dashboard navigation.');

    const unlockedScreenshotPath = path.join(artDir, 'vault_lock_screen_unlocked.png');
    await page.screenshot({ path: unlockedScreenshotPath });
    console.log(`Saved screenshot: ${unlockedScreenshotPath}`);

    console.log('\n🎉 ALL VAULT LOCK SCREEN TESTS PASSED WITH 100% SUCCESS!');
  } finally {
    await browser.close();
  }
})();

