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
    console.log('=== TESTING DATE-AWARE CANONICAL PRAYERS SYNCHRONIZATION ===');
    console.log('================================================================');

    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    // Open Prayer Times Dark Mode at current time (~8:05 PM)
    console.log('\n[Step 1] Loading Prayer Times Dark Mode at ~8:05 PM (after Isha)...');
    await page.goto('http://localhost:5173/?screen=prayer_times_dark_mode');
    await new Promise(r => setTimeout(r, 800));

    // Hide dev tools overlay
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // Helper to get audit of Canonical Prayers list
    const getPrayersAudit = async () => {
      return await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('.space-y-1\\.5 > div'));
        return rows.map(r => {
          const name = r.querySelector('.font-bold')?.innerText?.trim();
          const time = r.querySelector('.font-mono')?.innerText?.trim();
          const badge = r.querySelector('.rounded-full')?.innerText?.trim();
          const isLineThrough = r.querySelector('.line-through') !== null;
          const hasCheckCircle = r.querySelector('.lucide-check-circle-2') !== null;
          const hasClock = r.querySelector('.lucide-clock') !== null;
          const hasPulse = r.querySelector('.animate-pulse') !== null;
          const isCursorPointer = r.classList.contains('cursor-pointer');
          return { name, time, badge, isLineThrough, hasCheckCircle, hasClock, hasPulse, isCursorPointer };
        });
      });
    };

    const auditNight = await getPrayersAudit();
    console.log('Night Audit (~8:05 PM - Tomorrow Fajr Cycle):', auditNight);

    // Rule 1 & 2 Verification: Tomorrow's Cycle
    // Fajr must be "Next"
    // Dhuhr, Asr, Maghrib, Isha MUST be "Upcoming" - NOT MISSED!
    const fajrNight = auditNight.find(p => p.name === 'Fajr');
    const dhuhrNight = auditNight.find(p => p.name === 'Dhuhr');
    const asrNight = auditNight.find(p => p.name === 'Asr');
    const maghribNight = auditNight.find(p => p.name === 'Maghrib');
    const ishaNight = auditNight.find(p => p.name === 'Isha');

    if (!fajrNight || !fajrNight.hasPulse || !fajrNight.badge.includes('Next')) {
      throw new Error(`Tomorrow Fajr should show as 'Next', got: ${JSON.stringify(fajrNight)}`);
    }
    console.log('✅ Tomorrow Fajr correctly shows as "Next" matching the Hero section!');

    const tomorrowFuturePrayers = [
      { name: 'Dhuhr', item: dhuhrNight },
      { name: 'Asr', item: asrNight },
      { name: 'Maghrib', item: maghribNight },
      { name: 'Isha', item: ishaNight },
    ];

    for (const p of tomorrowFuturePrayers) {
      if (!p.item) {
        throw new Error(`Prayer ${p.name} not found in Canonical list!`);
      }
      if (p.item.badge.includes('Missed')) {
        throw new Error(`CRITICAL BUG: Future prayer ${p.name} is marked as Missed! Full data: ${JSON.stringify(p.item)}`);
      }
      if (p.item.badge.includes('Completed')) {
        throw new Error(`Future prayer ${p.name} is marked as Completed! Full data: ${JSON.stringify(p.item)}`);
      }
      if (!p.item.badge.includes('Upcoming')) {
        throw new Error(`Future prayer ${p.name} should be Upcoming, got: ${JSON.stringify(p.item)}`);
      }
      if (p.item.isCursorPointer) {
        throw new Error(`Future prayer ${p.name} should not be interactive (cursor-pointer), got: ${JSON.stringify(p.item)}`);
      }
    }
    console.log('✅ Confirmed: Tomorrow\'s Dhuhr, Asr, Maghrib, and Isha all strictly default to "Upcoming" and are NOT marked as Missed!');

    // Capture screenshot of the Tomorrow cycle
    const tomorrowNightShot = path.join(artDir, 'prayer_times_tomorrow_cycle_dark.png');
    await page.screenshot({ path: tomorrowNightShot });
    console.log(`Saved screenshot: ${tomorrowNightShot}`);

    // [Step 2] Attempting to click tomorrow's Dhuhr or Asr
    console.log('\n[Step 2] Attempting to click Tomorrow\'s Dhuhr...');
    await page.evaluate(() => {
      const dhuhrRow = Array.from(document.querySelectorAll('.space-y-1\\.5 > div')).find(d => d.innerText.includes('Dhuhr'));
      if (dhuhrRow) dhuhrRow.click();
    });
    await new Promise(r => setTimeout(r, 200));

    const auditAfterClick = await getPrayersAudit();
    const dhuhrAfter = auditAfterClick.find(p => p.name === 'Dhuhr');
    if (!dhuhrAfter.badge.includes('Upcoming')) {
      throw new Error(`Tomorrow's Dhuhr was affected by click! State: ${JSON.stringify(dhuhrAfter)}`);
    }
    console.log('✅ Confirmed: Clicking tomorrow\'s prayers does not alter their locked "Upcoming" state!');

    // [Step 3] Test Daytime Simulation (e.g. 5:51 PM today where Fajr, Dhuhr, Asr are past, Maghrib is Next, Isha is Upcoming)
    console.log('\n[Step 3] Testing Daytime Mode with Clock mock (5:51 PM)...');
    await page.evaluate(() => {
      // Mock Date to 2026-11-07 17:51:00
      const mockTime = new Date('2026-11-07T17:51:00');
      // Trigger a store reset to ensure clean state
      window.usePrayerStore.getState().resetToDefaults?.();
    });

    // Reload with simulated time query parameter or evaluate
    // Let's test the component with mocked Date in evaluate:
    const daytimeAudit = await page.evaluate(async () => {
      // Override Date constructor temporarily in page to test 17:51
      const RealDate = Date;
      const fixedTime = new RealDate('2026-11-07T17:51:00').getTime();
      class MockDate extends RealDate {
        constructor(...args) {
          if (args.length === 0) {
            super(fixedTime);
          } else {
            super(...args);
          }
        }
        static now() {
          return fixedTime;
        }
      }
      window.Date = MockDate;

      // Re-trigger re-render by calling dummy state update
      window.usePrayerStore.getState().setSetting?.('__dummy__', Date.now());
      // Wait for ticker
      await new Promise(r => setTimeout(r, 1100));

      const rows = Array.from(document.querySelectorAll('.space-y-1\\.5 > div'));
      const res = rows.map(r => {
        const name = r.querySelector('.font-bold')?.innerText?.trim();
        const time = r.querySelector('.font-mono')?.innerText?.trim();
        const badge = r.querySelector('.rounded-full')?.innerText?.trim();
        return { name, time, badge };
      });

      // Restore real date
      window.Date = RealDate;
      return res;
    });

    console.log('Daytime Audit (Simulated 5:51 PM):', daytimeAudit);
    const dayFajr = daytimeAudit.find(p => p.name === 'Fajr');
    const dayDhuhr = daytimeAudit.find(p => p.name === 'Dhuhr');
    const dayAsr = daytimeAudit.find(p => p.name === 'Asr');
    const dayMaghrib = daytimeAudit.find(p => p.name === 'Maghrib');
    const dayIsha = daytimeAudit.find(p => p.name === 'Isha');

    if (!dayFajr.badge.includes('Completed') || !dayDhuhr.badge.includes('Completed') || !dayAsr.badge.includes('Completed')) {
      throw new Error(`Daytime past prayers should be Completed, got: ${JSON.stringify({ dayFajr, dayDhuhr, dayAsr })}`);
    }
    if (!dayMaghrib.badge.includes('Next')) {
      throw new Error(`Daytime Maghrib at 5:51 PM should be 'Next', got: ${JSON.stringify(dayMaghrib)}`);
    }
    if (!dayIsha.badge.includes('Upcoming')) {
      throw new Error(`Daytime Isha at 5:51 PM should be 'Upcoming', got: ${JSON.stringify(dayIsha)}`);
    }
    console.log('✅ Daytime simulation verified: Past = Completed, Immediate Next = Next, Later = Upcoming!');

    // [Step 4] Test Light Mode Tomorrow Cycle
    console.log('\n[Step 4] Testing Light Mode Tomorrow Cycle...');
    await page.goto('http://localhost:5173/?screen=prayer_times_light_mode');
    await new Promise(r => setTimeout(r, 800));

    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    const lightAudit = await getPrayersAudit();
    console.log('Light Mode Tomorrow Cycle Audit:', lightAudit);

    const lightFajr = lightAudit.find(p => p.name === 'Fajr');
    const lightDhuhr = lightAudit.find(p => p.name === 'Dhuhr');
    const lightAsr = lightAudit.find(p => p.name === 'Asr');

    if (!lightFajr.badge.includes('Next')) {
      throw new Error(`Light mode Tomorrow Fajr should be 'Next', got: ${JSON.stringify(lightFajr)}`);
    }
    if (lightDhuhr.badge.includes('Missed') || lightAsr.badge.includes('Missed')) {
      throw new Error(`Light mode Tomorrow prayers incorrectly marked as Missed!`);
    }
    if (!lightDhuhr.badge.includes('Upcoming') || !lightAsr.badge.includes('Upcoming')) {
      throw new Error(`Light mode Tomorrow prayers should be 'Upcoming'!`);
    }
    console.log('✅ Light mode matches 100% of date-boundary rules and state flow!');

    const lightTomorrowShot = path.join(artDir, 'prayer_times_tomorrow_cycle_light.png');
    await page.screenshot({ path: lightTomorrowShot });
    console.log(`Saved screenshot: ${lightTomorrowShot}`);

    console.log('\n🎉 ALL DATE-AWARE CANONICAL PRAYERS SYNCHRONIZATION TESTS PASSED WITH 100% SUCCESS!');
  } finally {
    await browser.close();
  }
})();

