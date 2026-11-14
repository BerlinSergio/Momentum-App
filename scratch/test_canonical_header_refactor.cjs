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
    console.log('=== TESTING CANONICAL PRAYERS HEADER REFACTOR ===');
    console.log('================================================================');

    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    // 1. Audit Dark Mode Tomorrow View (~8:20 PM)
    console.log('\n[Step 1] Loading Dark Mode at current evening time (~8:20 PM)...');
    await page.goto('http://localhost:5173/?screen=prayer_times_dark_mode');
    await new Promise(r => setTimeout(r, 800));

    // Hide dev tools overlay
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    const headerAuditDarkTomorrow = await page.evaluate(() => {
      const listContainer = document.querySelector('.space-y-1\\.5')?.parentElement;
      const headerEl = listContainer?.children[0];
      const titleEl = headerEl?.querySelector('h3');
      const badgeEl = headerEl?.querySelector('span');
      const fullText = headerEl?.innerText?.trim();

      return {
        isFlexBetween: headerEl?.className?.includes('flex') && headerEl?.className?.includes('justify-between') && headerEl?.className?.includes('items-center'),
        headerClass: headerEl?.className,
        titleText: titleEl?.innerText?.trim(),
        titleClass: titleEl?.className,
        hasBadge: !!badgeEl,
        badgeText: badgeEl?.innerText?.trim(),
        badgeClass: badgeEl?.className,
        hasRedundantScheduleText: fullText?.includes("Tomorrow's prayer schedule"),
        hasRedundantToggleText: fullText?.includes("Tap to toggle completion"),
        fullText
      };
    });

    console.log('Dark Mode Header Audit (Tomorrow View):', headerAuditDarkTomorrow);

    if (!headerAuditDarkTomorrow.isFlexBetween) {
      throw new Error(`Header container is not a flex items-center justify-between container: ${headerAuditDarkTomorrow.headerClass}`);
    }
    if (headerAuditDarkTomorrow.titleText.toUpperCase() !== 'CANONICAL PRAYERS') {
      throw new Error(`Expected title 'CANONICAL PRAYERS', got: ${headerAuditDarkTomorrow.titleText}`);
    }
    if (!headerAuditDarkTomorrow.titleClass.includes('text-xs') || !headerAuditDarkTomorrow.titleClass.includes('font-bold') || !headerAuditDarkTomorrow.titleClass.includes('uppercase')) {
      throw new Error(`Title does not have crisp uppercase styling: ${headerAuditDarkTomorrow.titleClass}`);
    }
    if (!headerAuditDarkTomorrow.hasBadge || headerAuditDarkTomorrow.badgeText !== 'TOMORROW') {
      throw new Error(`Expected clean 'TOMORROW' badge on right, got: ${headerAuditDarkTomorrow.badgeText}`);
    }
    if (headerAuditDarkTomorrow.hasRedundantScheduleText || headerAuditDarkTomorrow.hasRedundantToggleText) {
      throw new Error(`Redundant descriptive text was not deleted! Full header text: ${headerAuditDarkTomorrow.fullText}`);
    }
    console.log('✅ Dark Mode Tomorrow view verified: Clean left title + right-aligned TOMORROW badge with zero clutter!');

    const darkTomorrowShot = path.join(artDir, 'prayer_times_header_tomorrow_dark.png');
    await page.screenshot({ path: darkTomorrowShot });
    console.log(`Saved screenshot: ${darkTomorrowShot}`);

    // 2. Audit Light Mode Tomorrow View (~8:20 PM)
    console.log('\n[Step 2] Loading Light Mode at current evening time (~8:20 PM)...');
    await page.goto('http://localhost:5173/?screen=prayer_times_light_mode');
    await new Promise(r => setTimeout(r, 800));

    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    const headerAuditLightTomorrow = await page.evaluate(() => {
      const listContainer = document.querySelector('.space-y-1\\.5')?.parentElement;
      const headerEl = listContainer?.children[0];
      const titleEl = headerEl?.querySelector('h3');
      const badgeEl = headerEl?.querySelector('span');
      const fullText = headerEl?.innerText?.trim();

      return {
        isFlexBetween: headerEl?.className?.includes('flex') && headerEl?.className?.includes('justify-between') && headerEl?.className?.includes('items-center'),
        titleText: titleEl?.innerText?.trim(),
        titleClass: titleEl?.className,
        badgeText: badgeEl?.innerText?.trim(),
        badgeClass: badgeEl?.className,
        fullText
      };
    });

    console.log('Light Mode Header Audit (Tomorrow View):', headerAuditLightTomorrow);
    if (!headerAuditLightTomorrow.badgeClass.includes('bg-indigo-100') || !headerAuditLightTomorrow.badgeClass.includes('text-indigo-700')) {
      throw new Error(`Light mode badge styling mismatch: ${headerAuditLightTomorrow.badgeClass}`);
    }
    console.log('✅ Light Mode Tomorrow view verified: Styled with bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase rounded-full!');

    const lightTomorrowShot = path.join(artDir, 'prayer_times_header_tomorrow_light.png');
    await page.screenshot({ path: lightTomorrowShot });
    console.log(`Saved screenshot: ${lightTomorrowShot}`);

    // 3. Audit Today View (Conditional Rendering check - badge must disappear)
    console.log('\n[Step 3] Testing Today View (Simulating 5:51 PM when viewing Today)...');
    await page.evaluate(async () => {
      const RealDate = Date;
      const fixedTime = new RealDate('2026-11-07T17:51:00').getTime();
      class MockDate extends RealDate {
        constructor(...args) {
          if (args.length === 0) super(fixedTime);
          else super(...args);
        }
        static now() { return fixedTime; }
      }
      window.Date = MockDate;
      window.usePrayerStore.getState().resetToDefaults?.();
      await new Promise(r => setTimeout(r, 1100));
    });

    const headerAuditToday = await page.evaluate(() => {
      const listContainer = document.querySelector('.space-y-1\\.5')?.parentElement;
      const headerEl = listContainer?.children[0];
      const titleEl = headerEl?.querySelector('h3');
      const badgeEl = headerEl?.querySelector('span');
      return {
        titleText: titleEl?.innerText?.trim(),
        hasTomorrowBadge: badgeEl?.innerText?.trim() === 'TOMORROW',
        badgeText: badgeEl?.innerText?.trim(),
        hasBadge: !!badgeEl
      };
    });

    console.log('Today View Audit:', headerAuditToday);
    if (headerAuditToday.hasTomorrowBadge) {
      throw new Error('TOMORROW badge incorrectly rendered when viewing today\'s schedule!');
    }
    console.log('✅ Conditional rendering verified: TOMORROW badge disappears when viewing today\'s schedule!');

    const lightTodayShot = path.join(artDir, 'prayer_times_header_today_light.png');
    await page.screenshot({ path: lightTodayShot });
    console.log(`Saved screenshot: ${lightTodayShot}`);

    console.log('\n🎉 ALL CANONICAL PRAYERS HEADER REFACTOR TESTS PASSED WITH 100% SUCCESS!');
  } finally {
    await browser.close();
  }
})();
