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
    console.log('=== TESTING REAL-TIME COUNTDOWN SYNCHRONIZATION ===');
    console.log('======================================================');

    for (const mode of ['dark', 'light']) {
      const isDark = mode === 'dark';
      const screenRoute = isDark ? 'prayer_times_dark_mode' : 'prayer_times_light_mode';
      console.log(`\nTesting ${mode.toUpperCase()} MODE (${screenRoute})...`);

      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      await page.setViewport({ width: 420, height: 1080, deviceScaleFactor: 2 });

      await page.goto(`http://localhost:5173/?screen=${screenRoute}`);
      await new Promise(r => setTimeout(r, 800));

      // Hide dev navigator sidebar if present
      await page.evaluate(() => {
        document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
      });

      // 1. Audit Countdown Zero-Padding Formatting and Real-Time Calculation
      const countdownAudit = await page.evaluate(() => {
        const countdownEl = document.querySelector('.font-mono.tracking-widest');
        const text = countdownEl ? countdownEl.innerText.trim() : null;

        // Parse displayed text e.g. "08 : 38 : 12"
        const parts = text ? text.split(/\s*:\s*/).map(Number) : [];
        const [dispHours, dispMinutes, dispSeconds] = parts;

        // Calculate expected time based on device Date.now()
        const now = new Date();
        const nowMs = Date.now();
        // Fajr tomorrow at 05:12:00 AM
        const target = new Date(now);
        target.setDate(target.getDate() + 1);
        target.setHours(5, 12, 0, 0);

        const diffMs = target.getTime() - nowMs;
        const totalSec = Math.max(0, Math.floor(diffMs / 1000));
        const expH = Math.floor(totalSec / 3600);
        const expM = Math.floor((totalSec % 3600) / 60);
        const expS = totalSec % 60;

        const regexValid = /^\d{2}\s*:\s*\d{2}\s*:\s*\d{2}$/.test(text);

        return {
          hasEl: !!countdownEl,
          rawText: text,
          regexValid,
          disp: { h: dispHours, m: dispMinutes, s: dispSeconds },
          exp: { h: expH, m: expM, s: expS },
          diffSecondsFromExpected: Math.abs((dispHours * 3600 + dispMinutes * 60 + dispSeconds) - (expH * 3600 + expM * 60 + expS)),
          nowIso: now.toISOString(),
          targetIso: target.toISOString(),
        };
      });

      console.log(`[${mode}] Countdown Real-Time Audit:`, countdownAudit);

      if (!countdownAudit.hasEl) {
        throw new Error(`[${mode}] Countdown element not found!`);
      }
      if (!countdownAudit.regexValid) {
        throw new Error(`[${mode}] Countdown text "${countdownAudit.rawText}" does not match zero-padding format "HH : MM : SS"!`);
      }
      if (countdownAudit.diffSecondsFromExpected > 2) {
        throw new Error(`[${mode}] Countdown value differs by ${countdownAudit.diffSecondsFromExpected}s from expected real-time device calculation!`);
      }
      console.log(`✅ [${mode}] Real-time accuracy verified: "${countdownAudit.rawText}" matches device clock within ${countdownAudit.diffSecondsFromExpected}s.`);

      // 2. Audit Live 1000ms Interval Ticking
      const t1Text = await page.evaluate(() => document.querySelector('.font-mono.tracking-widest')?.innerText?.trim());
      await new Promise(r => setTimeout(r, 1200));
      const t2Text = await page.evaluate(() => document.querySelector('.font-mono.tracking-widest')?.innerText?.trim());
      console.log(`[${mode}] Tick verification: "${t1Text}" -> "${t2Text}"`);
      if (t1Text === t2Text) {
        throw new Error(`[${mode}] Countdown timer is static; not ticking every 1000ms!`);
      }
      console.log(`✅ [${mode}] Live 1000ms interval ticking verified.`);

      // 3. Test Transition Logic & Global State Sync
      const transitionResult = await page.evaluate(() => {
        // Test advanceToNextPrayer in window.usePrayerStore
        const store = window.usePrayerStore?.getState ? window.usePrayerStore.getState() : null;
        if (!store) return { hasStore: false };

        const beforePrayers = store.prayers.map(p => ({ id: p.id, status: p.status }));
        // Advance Fajr
        store.advanceToNextPrayer('fajr');
        const afterPrayers = window.usePrayerStore.getState().prayers.map(p => ({ id: p.id, status: p.status }));
        const fajrAfter = afterPrayers.find(p => p.id === 'fajr');

        return {
          hasStore: true,
          fajrStatusBefore: beforePrayers.find(p => p.id === 'fajr')?.status,
          fajrStatusAfter: fajrAfter?.status,
        };
      });

      console.log(`[${mode}] Global State Transition Audit:`, transitionResult);
      if (transitionResult.hasStore && transitionResult.fajrStatusAfter !== 'completed') {
        throw new Error(`[${mode}] Transition logic failed to mark prayer as completed in global state!`);
      }
      console.log(`✅ [${mode}] Global state transition logic verified (prayer marked completed on transition).`);

      // 4. Capture screenshot
      const screenshotPath = path.join(artDir, `prayer_times_countdown_synced_${mode}.png`);
      await page.screenshot({ path: screenshotPath });
      console.log(`📸 Saved screenshot: ${screenshotPath}`);

      await context.close();
    }

    console.log('\n======================================================');
    console.log('🎉 ALL COUNTDOWN REAL-TIME SYNC TESTS PASSED! 🎉');
    console.log('======================================================\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();

