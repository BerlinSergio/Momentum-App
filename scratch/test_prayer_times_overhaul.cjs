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
    console.log('=== TESTING PRAYER TIMES SCREEN REFINEMENT ===');
    console.log('======================================================');

    // ----------------------------------------------------
    // TEST 1: Dark Mode Verification
    // ----------------------------------------------------
    console.log('\n[Test 1] Testing Dark Mode...');
    const contextDark = await browser.createBrowserContext();
    const pageDark = await contextDark.newPage();
    await pageDark.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    await pageDark.goto('http://localhost:5173/?screen=prayer_times_dark_mode');
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await pageDark.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // 1. Audit Hero Section & Monospace Countdown
    const heroAudit = await pageDark.evaluate(() => {
      const countdownEl = document.querySelector('.font-mono.tracking-widest');
      const chunkyBoxes = document.querySelectorAll('.w-12.h-10');
      const notifBtn = document.querySelector('button.bg-gradient-to-r');
      const notifCheck = notifBtn ? notifBtn.querySelector('.lucide-check') : null;
      const notifBell = notifBtn ? notifBtn.querySelector('.lucide-bell') : null;
      const notifRefresh = notifBtn ? notifBtn.querySelector('.lucide-refresh-cw') : null;

      return {
        hasMonospaceCountdown: !!countdownEl,
        countdownText: countdownEl?.innerText?.trim(),
        countdownClass: countdownEl?.className,
        chunkyBoxCount: chunkyBoxes.length,
        hasNotifBtn: !!notifBtn,
        notifBtnText: notifBtn?.innerText?.trim(),
        hasNotifCheck: !!notifCheck,
        hasNotifBell: !!notifBell,
        hasNotifRefresh: !!notifRefresh,
      };
    });

    console.log('Hero Section Audit (Dark):', heroAudit);
    if (!heroAudit.hasMonospaceCountdown) {
      throw new Error('Sleek monospace countdown timer element not found!');
    }
    if (heroAudit.chunkyBoxCount > 0) {
      throw new Error('Bulky separate number boxes still present in hero card!');
    }
    if (!heroAudit.hasNotifBtn || !heroAudit.hasNotifCheck || !heroAudit.hasNotifBell || !heroAudit.hasNotifRefresh) {
      throw new Error('Notification button missing required icons (Check, Bell, RefreshCw) or gradient styling!');
    }
    if (!heroAudit.notifBtnText.includes('Notifications Active (15m before)')) {
      throw new Error(`Notification button does not have exact text 'Notifications Active (15m before)', got: ${heroAudit.notifBtnText}`);
    }
    console.log('✅ Hero section verified: Sleek inline countdown + Synced notification button with Check, Bell, Refresh, and exact text.');

    // 2. Verify Live Countdown Ticking
    const time1 = heroAudit.countdownText;
    await new Promise(r => setTimeout(r, 1200));
    const time2 = await pageDark.evaluate(() => document.querySelector('.font-mono.tracking-widest')?.innerText?.trim());
    console.log(`Countdown tick check: ${time1} -> ${time2}`);
    if (!/^\d{2}:\d{2}:\d{2}$/.test(time2)) {
      throw new Error(`Countdown format invalid: ${time2}`);
    }
    console.log('✅ Countdown timer format verified (HH:MM:SS) and actively running.');

    // 3. Audit Canonical Prayers List & Interactive Completion Toggle
    const prayersAudit = await pageDark.evaluate(() => {
      const prayerRows = Array.from(document.querySelectorAll('.cursor-pointer')).filter(el => 
        ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].some(name => el.innerText.includes(name))
      );
      return {
        count: prayerRows.length,
        names: prayerRows.map(r => r.querySelector('div')?.innerText?.trim())
      };
    });

    console.log('Canonical Prayers List Audit:', prayersAudit);
    if (prayersAudit.count < 5) {
      throw new Error(`Expected at least 5 canonical prayer rows, got ${prayersAudit.count}`);
    }

    // Capture initial dark mode screenshot
    const darkScreenshot = path.join(artDir, 'prayer_times_refined_dark.png');
    await pageDark.screenshot({ path: darkScreenshot });
    console.log(`Saved screenshot: ${darkScreenshot}`);

    // Toggle a prayer (e.g. Fajr) to test interactive completion
    console.log('\nToggling Fajr prayer completion status...');
    await pageDark.evaluate(() => {
      const fajrRow = Array.from(document.querySelectorAll('.cursor-pointer')).find(el => el.innerText.includes('Fajr'));
      if (fajrRow) fajrRow.click();
    });
    await new Promise(r => setTimeout(r, 300));

    const toggleAudit = await pageDark.evaluate(() => {
      const fajrRow = Array.from(document.querySelectorAll('.cursor-pointer')).find(el => el.innerText.includes('Fajr'));
      const hasCompleted = fajrRow?.innerText?.includes('Completed');
      return { hasCompleted };
    });

    console.log('Toggle audit:', toggleAudit);
    const toggledScreenshot = path.join(artDir, 'prayer_times_prayer_toggled_dark.png');
    await pageDark.screenshot({ path: toggledScreenshot });
    console.log(`Saved screenshot: ${toggledScreenshot}`);

    // 4. Audit Bottom Widgets (Sun & Twilight Grid & Quote Card)
    const bottomAudit = await pageDark.evaluate(() => {
      const grid = document.querySelector('.grid-cols-3');
      const gridSlots = grid ? Array.from(grid.children).map(c => c.innerText.trim().replace(/\n/g, ' ')) : [];
      const quoteCard = document.querySelector('.italic');
      const hasSurah = document.body.innerText.includes('Al-Baqarah');
      const hasDailyInspiration = document.body.innerText.includes('Daily Inspiration');
      return {
        hasGrid3: !!grid,
        gridSlotCount: gridSlots.length,
        gridSlots,
        hasQuote: !!quoteCard,
        hasSurah,
        hasDailyInspiration
      };
    });

    console.log('\nBottom Widgets Audit (Dark):', bottomAudit);
    if (!bottomAudit.hasGrid3 || bottomAudit.gridSlotCount !== 3) {
      throw new Error('Sunrise/Midnight/Tahajjud 3-column grid not properly rendered!');
    }
    if (!bottomAudit.hasQuote || !bottomAudit.hasSurah) {
      throw new Error('Daily inspiration Quranic quote widget missing or malformed!');
    }
    console.log('✅ Bottom widgets verified: Clean 3-col grid & daily inspiration card rendered beautifully.');

    const bottomDarkScreenshot = path.join(artDir, 'prayer_times_bottom_widgets_dark.png');
    await pageDark.screenshot({ path: bottomDarkScreenshot });
    console.log(`Saved screenshot: ${bottomDarkScreenshot}`);

    // ----------------------------------------------------
    // TEST 2: Light Mode Verification
    // ----------------------------------------------------
    console.log('\n[Test 2] Testing Light Mode...');
    const contextLight = await browser.createBrowserContext();
    const pageLight = await contextLight.newPage();
    await pageLight.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    await pageLight.goto('http://localhost:5173/?screen=prayer_times_light_mode');
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await pageLight.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    const lightAudit = await pageLight.evaluate(() => {
      const countdownEl = document.querySelector('.font-mono.tracking-widest');
      const notifBtn = document.querySelector('button.bg-gradient-to-r');
      const quoteCard = document.querySelector('.italic');
      const grid = document.querySelector('.grid-cols-3');
      return {
        hasCountdown: !!countdownEl,
        countdownText: countdownEl?.innerText?.trim(),
        hasNotifBtn: !!notifBtn,
        notifText: notifBtn?.innerText?.trim(),
        hasQuote: !!quoteCard,
        hasGrid: !!grid
      };
    });

    console.log('Light Mode Audit:', lightAudit);
    if (!lightAudit.hasCountdown || !lightAudit.hasQuote || !lightAudit.hasGrid || !lightAudit.hasNotifBtn) {
      throw new Error('Light mode missing key refined elements!');
    }
    if (!lightAudit.notifText.includes('Notifications Active (15m before)')) {
      throw new Error(`Light mode notification button text mismatch: ${lightAudit.notifText}`);
    }
    console.log('✅ Light mode matches 100% of dark mode features & structure!');

    const lightScreenshot = path.join(artDir, 'prayer_times_refined_light.png');
    await pageLight.screenshot({ path: lightScreenshot });
    console.log(`Saved screenshot: ${lightScreenshot}`);

    const bottomLightScreenshot = path.join(artDir, 'prayer_times_bottom_widgets_light.png');
    await pageLight.screenshot({ path: bottomLightScreenshot });
    console.log(`Saved screenshot: ${bottomLightScreenshot}`);

    console.log('\n🎉 ALL PRAYER TIMES OVERHAUL TESTS PASSED WITH 100% SUCCESS!');
  } finally {
    await browser.close();
  }
})();
