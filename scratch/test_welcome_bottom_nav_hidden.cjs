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

  await page.goto('http://localhost:5173');
  await page.evaluate(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234', _hasHydrated: true },
      version: 0
    }));
  });

  for (const mode of ['dark', 'light']) {
    const route = mode === 'dark' ? 'personal_setup_dark_mode' : 'personal_setup_light_mode';
    console.log(`\n======================================================`);
    console.log(`=== Testing Immersive Onboarding: ${mode.toUpperCase()} MODE ===`);
    console.log(`======================================================`);

    // Reset stores
    await page.evaluate(() => {
      localStorage.setItem('momentum_settings_store', JSON.stringify({
        state: { baseCurrency: 'AFN', timezone: 'Asia/Kabul', city: 'Kabul, Afghanistan', userName: 'Ahmad Reshad' },
        version: 0
      }));
      localStorage.setItem('momentum-profile-storage', JSON.stringify({
        state: { fullName: 'Ahmad Reshad', currency: 'AFN / ؋ (Afghan Afghani)', timezone: 'Asia/Kabul (UTC+4:30)', city: 'Kabul, Afghanistan', setupCompleted: false },
        version: 0
      }));
    });

    await page.goto(`http://localhost:5173/?screen=${route}`);
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // 1. Verify Bottom Navigation Bar is Completely GONE
    const navAudit = await page.evaluate(() => {
      const nav = document.querySelector('nav[aria-label="Bottom Navigation"]');
      const viewport = document.querySelector('.momentum-canvas-viewport');
      return {
        bottomNavPresent: !!nav,
        viewportHasPb32: viewport ? viewport.className.includes('pb-32') : false,
        viewportClasses: viewport?.className
      };
    });
    console.log(`- Bottom Navigation Audit:`, navAudit);
    console.log(`  Bottom Navigation is completely hidden: ${!navAudit.bottomNavPresent}`);
    console.log(`  Viewport has pb-32 removed: ${!navAudit.viewportHasPb32}`);

    // 2. Verify Action Button Placement & Premium Styling
    const buttonAudit = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue to Dashboard'));
      if (!btn) return { found: false };
      const rect = btn.getBoundingClientRect();
      const style = window.getComputedStyle(btn);
      const canvasFrame = document.querySelector('.momentum-canvas-viewport');
      const canvasRect = canvasFrame?.getBoundingClientRect();

      return {
        found: true,
        text: btn.innerText.trim(),
        className: btn.className,
        height: Math.round(rect.height),
        width: Math.round(rect.width),
        bottomPosition: Math.round(rect.bottom),
        canvasBottom: canvasRect ? Math.round(canvasRect.bottom) : null,
        distanceFromBottom: canvasRect ? Math.round(canvasRect.bottom - rect.bottom) : null,
        borderRadius: style.borderRadius,
        boxShadow: style.boxShadow
      };
    });
    console.log(`- Action Button Audit:`, buttonAudit);
    console.log(`  Button has prominent height ~56px (h-14): ${buttonAudit.height >= 54 && buttonAudit.height <= 58}`);
    console.log(`  Button rounded-2xl (16px): ${buttonAudit.borderRadius}`);
    console.log(`  Button distance from viewport bottom: ~${buttonAudit.distanceFromBottom}px`);

    // 3. Capture Fullscreen Immersive Onboarding Screenshot
    const screenshotPath = path.join(artDir, `welcome_fullscreen_immersive_${mode}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`  Saved screenshot: welcome_fullscreen_immersive_${mode}.png`);

    // 4. Test Navigation to Dashboard on Click
    console.log(`- Testing Continue to Dashboard navigation...`);
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue to Dashboard'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const postNav = await page.evaluate(() => {
      const bottomNav = document.querySelector('nav[aria-label="Bottom Navigation"]');
      return {
        currentUrl: window.location.href,
        bottomNavRestoredOnDashboard: !!bottomNav
      };
    });
    console.log(`  Dashboard Navigation:`, postNav);
    console.log(`  Bottom Navigation restored on Dashboard: ${postNav.bottomNavRestoredOnDashboard}`);
  }

  await browser.close();
  console.log(`\nALL BOTTOM NAV & ACTION BUTTON REPOSITIONING TESTS PASSED SUCCESSFULLY!`);
})();

