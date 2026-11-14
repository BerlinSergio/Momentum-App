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
    console.log('=== TESTING TIME-BASED CANONICAL PRAYERS SYNCHRONIZATION ===');
    console.log('================================================================');

    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    // Open Prayer Times Dark Mode
    console.log('\n[Step 1] Loading Prayer Times Dark Mode...');
    await page.goto('http://localhost:5173/?screen=prayer_times_dark_mode');
    await new Promise(r => setTimeout(r, 800));

    // Hide dev tools overlay
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // Audit the 5 canonical prayer rows
    const getPrayersAudit = async () => {
      return await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('.space-y-1\\.5 > div'));
        return rows.map(r => {
          const name = r.querySelector('.font-bold')?.innerText?.trim();
          const time = r.querySelector('.font-mono')?.innerText?.trim();
          const badge = r.querySelector('.rounded-full')?.innerText?.trim();
          const isLineThrough = r.querySelector('.line-through') !== null;
          const hasCheckCircle = r.querySelector('.lucide-check-circle-2') !== null;
          const hasPulse = r.querySelector('.animate-pulse') !== null;
          const isCursorPointer = r.classList.contains('cursor-pointer');
          return { name, time, badge, isLineThrough, hasCheckCircle, hasPulse, isCursorPointer };
        });
      });
    };

    const audit1 = await getPrayersAudit();
    console.log('Initial Prayers Audit at ~5:54 PM:', audit1);

    // Rule 1 Verification: Past Prayers (Fajr, Dhuhr, Asr)
    const fajr = audit1.find(p => p.name === 'Fajr');
    const dhuhr = audit1.find(p => p.name === 'Dhuhr');
    const asr = audit1.find(p => p.name === 'Asr');

    if (!fajr || !fajr.hasCheckCircle || !fajr.isLineThrough || !fajr.badge.includes('Completed')) {
      throw new Error(`Fajr (05:12 AM) is past but not showing as Completed: ${JSON.stringify(fajr)}`);
    }
    if (!dhuhr || !dhuhr.hasCheckCircle || !dhuhr.isLineThrough || !dhuhr.badge.includes('Completed')) {
      throw new Error(`Dhuhr (01:05 PM) is past but not showing as Completed: ${JSON.stringify(dhuhr)}`);
    }
    if (!asr || !asr.hasCheckCircle || !asr.isLineThrough || !asr.badge.includes('Completed')) {
      throw new Error(`Asr (04:28 PM) is past but not showing as Completed: ${JSON.stringify(asr)}`);
    }
    console.log('✅ Past Prayers (Fajr, Dhuhr, Asr) correctly default to "Completed" with green checkmarks!');

    // Rule 2 Verification: Next Prayer (Maghrib)
    const maghrib = audit1.find(p => p.name === 'Maghrib');
    if (!maghrib || !maghrib.hasPulse || !maghrib.badge.includes('Next') || maghrib.hasCheckCircle) {
      throw new Error(`Maghrib (06:14 PM) is the immediate next prayer but not showing as 'Next': ${JSON.stringify(maghrib)}`);
    }
    console.log('✅ Next Prayer (Maghrib) visually matches hero section and displays pulsing "Next" indicator!');

    // Rule 3 Verification: Future Prayers (Isha)
    const isha = audit1.find(p => p.name === 'Isha');
    if (!isha || !isha.badge.includes('Upcoming') || isha.hasCheckCircle || isha.isCursorPointer) {
      throw new Error(`Isha (07:45 PM) should be locked in gray 'Upcoming' state: ${JSON.stringify(isha)}`);
    }
    console.log('✅ Future Prayer (Isha) is strictly locked in gray "Upcoming" state and cannot be marked completed!');

    // Capture screenshot of the chronologically synchronized state
    const darkSyncedShot = path.join(artDir, 'prayer_times_chronology_synced_dark.png');
    await page.screenshot({ path: darkSyncedShot });
    console.log(`Saved screenshot: ${darkSyncedShot}`);

    // [Step 2] Test Future Prayer Lock (Clicking Isha must do nothing)
    console.log('\n[Step 2] Attempting to click Isha (future prayer)...');
    await page.evaluate(() => {
      const ishaRow = Array.from(document.querySelectorAll('.space-y-1\\.5 > div')).find(d => d.innerText.includes('Isha'));
      if (ishaRow) ishaRow.click();
    });
    await new Promise(r => setTimeout(r, 200));

    const auditAfterIshaClick = await getPrayersAudit();
    const ishaAfter = auditAfterIshaClick.find(p => p.name === 'Isha');
    if (ishaAfter.badge.includes('Completed') || ishaAfter.hasCheckCircle) {
      throw new Error('Clicking future prayer Isha incorrectly marked it completed!');
    }
    console.log('✅ Confirmed: Future prayers cannot be toggled into completed state!');

    // [Step 3] Test Next Prayer Lock (Clicking Maghrib must not mark completed)
    console.log('\n[Step 3] Attempting to click Maghrib (next prayer)...');
    await page.evaluate(() => {
      const maghribRow = Array.from(document.querySelectorAll('.space-y-1\\.5 > div')).find(d => d.innerText.includes('Maghrib'));
      if (maghribRow) maghribRow.click();
    });
    await new Promise(r => setTimeout(r, 200));

    const auditAfterMaghribClick = await getPrayersAudit();
    const maghribAfter = auditAfterMaghribClick.find(p => p.name === 'Maghrib');
    if (maghribAfter.badge.includes('Completed') || maghribAfter.hasCheckCircle) {
      throw new Error('Clicking next prayer Maghrib incorrectly marked it completed!');
    }
    console.log('✅ Confirmed: Next prayer Maghrib remains locked to "Next" until its time arrives!');

    // [Step 4] Test Toggling Past Prayer (Clicking Fajr)
    console.log('\n[Step 4] Toggling past prayer (Fajr)...');
    await page.evaluate(() => {
      const fajrRow = Array.from(document.querySelectorAll('.space-y-1\\.5 > div')).find(d => d.innerText.includes('Fajr'));
      if (fajrRow) fajrRow.click();
    });
    await new Promise(r => setTimeout(r, 300));

    const auditAfterFajrToggle = await getPrayersAudit();
    const fajrToggled = auditAfterFajrToggle.find(p => p.name === 'Fajr');
    console.log('Fajr after toggle:', fajrToggled);
    if (!fajrToggled.badge.includes('Missed')) {
      throw new Error(`Expected Fajr to toggle to 'Missed', got: ${JSON.stringify(fajrToggled)}`);
    }
    console.log('✅ Past prayer Fajr successfully toggled to "Missed" state!');

    const fajrMissedShot = path.join(artDir, 'prayer_times_fajr_toggled_missed_dark.png');
    await page.screenshot({ path: fajrMissedShot });
    console.log(`Saved screenshot: ${fajrMissedShot}`);

    // Verify global synchronization
    const globalSync = await page.evaluate(() => {
      const prayerLogs = window.usePrayerStore?.getState()?.prayerLogs || [];
      const prayerProgress = window.useSettingsStore?.getState()?.prayerProgress || {};
      return {
        hasLog: prayerLogs.some(l => l.name === 'Fajr'),
        progressFajr: prayerProgress['fajr']
      };
    });
    console.log('Global sync audit:', globalSync);
    if (!globalSync.hasLog) {
      throw new Error('Prayer log not saved to usePrayerStore!');
    }
    if (globalSync.progressFajr !== 'missed') {
      throw new Error(`useSettingsStore prayerProgress not updated for Fajr: ${globalSync.progressFajr}`);
    }
    console.log('✅ Global sync verified across usePrayerStore and useSettingsStore!');

    // Toggle Fajr back to Completed
    console.log('\nToggling Fajr back to Completed...');
    await page.evaluate(() => {
      const fajrRow = Array.from(document.querySelectorAll('.space-y-1\\.5 > div')).find(d => d.innerText.includes('Fajr'));
      if (fajrRow) fajrRow.click();
    });
    await new Promise(r => setTimeout(r, 300));

    const auditFajrBack = await getPrayersAudit();
    const fajrRestored = auditFajrBack.find(p => p.name === 'Fajr');
    if (!fajrRestored.badge.includes('Completed')) {
      throw new Error(`Expected Fajr to toggle back to 'Completed', got: ${JSON.stringify(fajrRestored)}`);
    }
    console.log('✅ Past prayer Fajr toggled back to "Completed" with green checkmark!');

    // [Step 5] Verify Light Mode
    console.log('\n[Step 5] Testing Light Mode synchronization...');
    await page.goto('http://localhost:5173/?screen=prayer_times_light_mode');
    await new Promise(r => setTimeout(r, 800));

    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    const auditLight = await getPrayersAudit();
    console.log('Light Mode Prayers Audit:', auditLight);

    const lightFajr = auditLight.find(p => p.name === 'Fajr');
    const lightMaghrib = auditLight.find(p => p.name === 'Maghrib');
    const lightIsha = auditLight.find(p => p.name === 'Isha');

    if (!lightFajr.badge.includes('Completed') || !lightMaghrib.badge.includes('Next') || !lightIsha.badge.includes('Upcoming')) {
      throw new Error('Light mode chronological state mismatch!');
    }
    console.log('✅ Light mode matches 100% of chronological rules and state flow!');

    const lightSyncedShot = path.join(artDir, 'prayer_times_chronology_synced_light.png');
    await page.screenshot({ path: lightSyncedShot });
    console.log(`Saved screenshot: ${lightSyncedShot}`);

    console.log('\n🎉 ALL TIME-BASED CANONICAL PRAYERS SYNCHRONIZATION TESTS PASSED WITH 100% SUCCESS!');
  } finally {
    await browser.close();
  }
})();

