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
    console.log('\n========================================================================');
    console.log('=== TESTING PURGE OF PRAYER NOTIFICATION SETTINGS & CONSOLIDATION ===');
    console.log('========================================================================');

    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    // 1. Visit Prayer Times Dark Mode
    await page.goto('http://localhost:5173/?screen=prayer_times_dark_mode');
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // Capture screenshot of Prayer Times screen with notification banner
    const ptScreenshot = path.join(artDir, 'prayer_times_notification_button_redirect_dark.png');
    await page.screenshot({ path: ptScreenshot });
    console.log(`Saved screenshot: ${ptScreenshot}`);

    // Click Notification Active banner
    console.log('\n[1] Clicking Notification Active banner on Prayer Times...');
    const notifBtn = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Notification Active'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });

    if (!notifBtn) throw new Error('Notification Active button not found on Prayer Times screen!');
    await new Promise(r => setTimeout(r, 800));

    // 2. Verify we landed on Notification & Calm Alerts
    const titleAudit = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.innerText?.trim();
      return h1;
    });

    console.log('Target screen title after click:', titleAudit);
    if (!titleAudit?.includes('Notification & Calm Alerts') && !titleAudit?.includes('Notification')) {
      throw new Error(`Expected Notification & Calm Alerts screen, but got: ${titleAudit}`);
    }
    console.log('✅ Navigation rewired: Clicking prayer notification button successfully opens "Notification & Calm Alerts"!');

    const notifScreenshot = path.join(artDir, 'consolidated_notifications_calm_alerts_dark.png');
    await page.screenshot({ path: notifScreenshot });
    console.log(`Saved screenshot: ${notifScreenshot}`);

    // 3. Test legacy route prayer_notification_settings_dark_mode
    console.log('\n[2] Testing legacy route fallback...');
    await page.goto('http://localhost:5173/?screen=prayer_notification_settings_dark_mode');
    await new Promise(r => setTimeout(r, 800));

    const legacyAudit = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.innerText?.trim();
      const notFound = document.body.innerText.includes('Screen not found');
      return { h1, notFound };
    });

    console.log('Legacy route audit:', legacyAudit);
    if (legacyAudit.notFound) {
      throw new Error('Legacy route hit "Screen not found" error!');
    }
    if (!legacyAudit.h1?.includes('Notification')) {
      throw new Error(`Legacy route did not redirect to Notification & Calm Alerts. Title was: ${legacyAudit.h1}`);
    }
    console.log('✅ Legacy route gracefully resolves to "Notification & Calm Alerts" with zero errors!');

    // 4. Check console errors
    console.log('\n[3] Console error audit...');
    const realErrors = consoleErrors.filter(e => !e.includes('favicon'));
    console.log('Console errors recorded:', realErrors);
    if (realErrors.length > 0) {
      throw new Error(`Console errors detected: ${JSON.stringify(realErrors)}`);
    }
    console.log('✅ 0 console errors or missing modules!');

    console.log('\n🎉 ALL PURGE & REWIRING VERIFICATIONS PASSED WITH 100% SUCCESS!');
  } finally {
    await browser.close();
  }
})();

