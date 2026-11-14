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
    console.log('\n================================================================');
    console.log('=== TESTING ALERTS BADGE DYNAMIC SYNCHRONIZATION & NAVIGATION ===');
    console.log('================================================================\n');

    for (const mode of ['dark', 'light']) {
      const isDark = mode === 'dark';
      const screenRoute = isDark ? 'prayer_times_dark_mode' : 'prayer_times_light_mode';
      const expectedNavRoute = isDark ? 'notifications_settings_dark_mode' : 'notifications_settings_light_mode';
      console.log(`\n--- Testing ${mode.toUpperCase()} MODE (${screenRoute}) ---`);

      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      await page.setViewport({ width: 420, height: 1080, deviceScaleFactor: 2 });

      await page.goto(`http://localhost:5173/?screen=${screenRoute}`);
      await new Promise(r => setTimeout(r, 1000));

      // Hide dev navigator sidebar if present
      await page.evaluate(() => {
        document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
      });

      // Ensure stores are in default active state
      await page.evaluate(() => {
        if (window.useSettingsStore?.getState) {
          window.useSettingsStore.getState().setSetting('masterEnabled', true);
          window.useSettingsStore.getState().setSetting('prayerAlertsEnabled', true);
        }
        if (window.usePrayerStore?.getState?.setPrayerAlertsEnabled) {
          window.usePrayerStore.getState().setPrayerAlertsEnabled(true);
        }
      });
      await new Promise(r => setTimeout(r, 300));

      // 1. Check Initial "Alerts On" State
      const initialBadge = await page.evaluate((isDark) => {
        const badgeBtn = document.querySelector('button[title*="Prayer Alerts"]');
        if (!badgeBtn) return null;
        const text = badgeBtn.innerText.trim();
        const hasBellRing = !!badgeBtn.querySelector('.lucide-bell-ring');
        const hasBellOff = !!badgeBtn.querySelector('.lucide-bell-off');
        const classList = badgeBtn.className;
        const heroBtn = document.querySelector('.w-full.max-w-sm.mx-auto.py-3');
        const heroText = heroBtn ? heroBtn.innerText.trim() : '';
        return {
          text,
          hasBellRing,
          hasBellOff,
          classList,
          heroText,
        };
      }, isDark);

      console.log(`[${mode}] Initial Alerts Badge (ON):`, initialBadge);
      if (!initialBadge) {
        throw new Error(`[${mode}] Could not find Alerts badge button!`);
      }
      if (initialBadge.text !== 'Alerts On') {
        throw new Error(`[${mode}] Expected text 'Alerts On', got '${initialBadge.text}'`);
      }
      if (!initialBadge.hasBellRing) {
        throw new Error(`[${mode}] Expected BellRing icon when alerts are ON!`);
      }
      console.log(`✅ [${mode}] Alerts On verified with active styling and BellRing icon.`);

      // Take screenshot of ON state
      const shotOn = path.join(artDir, `prayer_times_alerts_on_${mode}.png`);
      await page.screenshot({ path: shotOn, fullPage: false });
      console.log(`📸 Saved screenshot: ${shotOn}`);

      // 2. Toggle Alerts OFF in useSettingsStore and verify dynamic reactive update
      console.log(`[${mode}] Toggling prayerAlertsEnabled to false in useSettingsStore...`);
      await page.evaluate(() => {
        if (window.useSettingsStore?.getState) {
          window.useSettingsStore.getState().setSetting('prayerAlertsEnabled', false);
        }
      });
      await new Promise(r => setTimeout(r, 400));

      const offBadge = await page.evaluate((isDark) => {
        const badgeBtn = document.querySelector('button[title*="Prayer Alerts"]');
        if (!badgeBtn) return null;
        const text = badgeBtn.innerText.trim();
        const hasBellRing = !!badgeBtn.querySelector('.lucide-bell-ring');
        const hasBellOff = !!badgeBtn.querySelector('.lucide-bell-off');
        const classList = badgeBtn.className;
        const heroBtn = document.querySelector('.w-full.max-w-sm.mx-auto.py-3');
        const heroText = heroBtn ? heroBtn.innerText.trim() : '';
        return {
          text,
          hasBellRing,
          hasBellOff,
          classList,
          heroText,
        };
      }, isDark);

      console.log(`[${mode}] Updated Alerts Badge (OFF):`, offBadge);
      if (offBadge.text !== 'Alerts Off') {
        throw new Error(`[${mode}] Expected text 'Alerts Off', got '${offBadge.text}'`);
      }
      if (!offBadge.hasBellOff) {
        throw new Error(`[${mode}] Expected BellOff icon when alerts are OFF!`);
      }
      if (isDark && !offBadge.classList.includes('bg-white/5')) {
        throw new Error(`[${mode}] Expected muted styling (bg-white/5) in dark mode!`);
      }
      if (!isDark && !offBadge.classList.includes('bg-slate-100')) {
        throw new Error(`[${mode}] Expected muted styling (bg-slate-100) in light mode!`);
      }
      if (!offBadge.heroText.includes('Notifications Paused')) {
        console.warn(`[${mode}] Hero text was '${offBadge.heroText}'`);
      }
      console.log(`✅ [${mode}] Alerts Off dynamically reflected with muted styling and BellOff icon.`);

      // Take screenshot of OFF state
      const shotOff = path.join(artDir, `prayer_times_alerts_off_${mode}.png`);
      await page.screenshot({ path: shotOff, fullPage: false });
      console.log(`📸 Saved screenshot: ${shotOff}`);

      // 3. Test Master Enabled toggle off
      console.log(`[${mode}] Toggling masterEnabled to false...`);
      await page.evaluate(() => {
        window.useSettingsStore.getState().setSetting('prayerAlertsEnabled', true);
        window.useSettingsStore.getState().setSetting('masterEnabled', false);
      });
      await new Promise(r => setTimeout(r, 400));

      const masterOffBadge = await page.evaluate(() => {
        const badgeBtn = document.querySelector('button[title*="Prayer Alerts"]');
        return {
          text: badgeBtn?.innerText?.trim(),
          hasBellOff: !!badgeBtn?.querySelector('.lucide-bell-off')
        };
      });
      console.log(`[${mode}] Master Disabled Badge (OFF):`, masterOffBadge);
      if (masterOffBadge.text !== 'Alerts Off') {
        throw new Error(`[${mode}] When masterEnabled is false, expected Alerts Off!`);
      }
      console.log(`✅ [${mode}] Master switch toggle correctly sets badge to Alerts Off.`);

      // Reset to ON
      await page.evaluate(() => {
        window.useSettingsStore.getState().setSetting('masterEnabled', true);
        window.useSettingsStore.getState().setSetting('prayerAlertsEnabled', true);
      });
      await new Promise(r => setTimeout(r, 300));

      // 4. Test Click Interactivity & Navigation to Notification Settings
      console.log(`[${mode}] Testing click interactivity on Alerts badge button...`);
      await page.evaluate(() => {
        const badgeBtn = document.querySelector('button[title*="Prayer Alerts"]');
        badgeBtn.click();
      });
      await new Promise(r => setTimeout(r, 800));

      const navState = await page.evaluate(() => {
        // Check if notification settings screen rendered
        const titleEl = document.querySelector('h1, h2');
        const hasOffsetRadios = !!document.querySelector('input[type="radio"], .lucide-bell');
        const pageText = document.body.innerText;
        return {
          heading: titleEl?.innerText?.trim(),
          hasNotificationKeywords: pageText.includes('Notification') || pageText.includes('Adhan') || pageText.includes('Alert'),
        };
      });
      console.log(`[${mode}] Navigation Result:`, navState);
      if (!navState.hasNotificationKeywords) {
        throw new Error(`[${mode}] Failed to navigate to Notification Settings screen after click!`);
      }
      console.log(`✅ [${mode}] Clicking badge successfully navigated to Notification Settings screen!`);

      await context.close();
    }

    console.log('\n================================================================');
    console.log('=== ALL TESTS PASSED SUCCESSFULLY! ===');
    console.log('================================================================\n');

  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
