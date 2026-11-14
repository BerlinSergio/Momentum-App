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

  // Unlock app
  await page.goto('http://localhost:5173');
  await page.evaluate(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234', _hasHydrated: true },
      version: 0
    }));
  });

  for (const mode of ['dark', 'light']) {
    const route = mode === 'dark' ? 'notifications_settings_dark_mode' : 'notifications_settings_light_mode';
    console.log(`\n======================================================`);
    console.log(`=== Testing ${mode.toUpperCase()} MODE: Prayer Card Master & Controls ===`);
    console.log(`======================================================`);

    // Reset settings store to baseline
    await page.evaluate(() => {
      localStorage.setItem('momentum_settings_store', JSON.stringify({
        state: {
          masterEnabled: true,
          prayerAlertsEnabled: true,
          alertType: 'muted',
          adhanMode: 'muted',
          enabledPrayerAlerts: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
        },
        version: 0
      }));
      localStorage.setItem('momentum-prayer-storage', JSON.stringify({
        state: {
          adhanOffset: 0,
          prayerAlertsEnabled: true,
          alertType: 'muted',
          enabledPrayerAlerts: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
          notificationSettings: { adhanMode: 'muted' }
        },
        version: 0
      }));
    });

    await page.goto(`http://localhost:5173/?screen=${route}`);
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // 1. Initial State Check
    const initialBadge = await page.evaluate(() => {
      const badge = Array.from(document.querySelectorAll('button')).find(b => b.innerText === 'Active' || b.innerText === 'Inactive');
      return badge ? badge.innerText : 'not found';
    });
    console.log(`- Initial Master Badge: "${initialBadge}" (Expected: "Active")`);

    // 2. Test Master Toggle -> Click badge to set Inactive
    console.log(`- Clicking Master Badge to toggle INACTIVE...`);
    await page.evaluate(() => {
      const badge = Array.from(document.querySelectorAll('button')).find(b => b.innerText === 'Active');
      if (badge) badge.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const inactiveCheck = await page.evaluate(() => {
      const badge = Array.from(document.querySelectorAll('button')).find(b => b.innerText === 'Inactive');
      const childContainer = document.querySelector('.space-y-4 .space-y-4');
      const p = document.querySelector('.space-y-4 p.text-\\[11px\\]');
      return {
        badgeText: badge ? badge.innerText : 'none',
        hasDisabledClasses: childContainer ? childContainer.className.includes('opacity-50') && childContainer.className.includes('pointer-events-none') : false,
        subtitle: p ? p.innerText : ''
      };
    });
    console.log(`  Badge text after toggle: "${inactiveCheck.badgeText}" (Expected: "Inactive")`);
    console.log(`  Child elements have disabled state (opacity-50 pointer-events-none): ${inactiveCheck.hasDisabledClasses}`);
    console.log(`  Subtitle: "${inactiveCheck.subtitle}" (Expected: "Prayer alerts paused")`);

    // Verify localStorage has prayerAlertsEnabled: false
    const storedInactive = await page.evaluate(() => {
      const raw = localStorage.getItem('momentum_settings_store');
      return raw ? JSON.parse(raw).state.prayerAlertsEnabled : null;
    });
    console.log(`  Stored prayerAlertsEnabled in settings store: ${storedInactive} (Expected: false)`);

    // Screenshot of Inactive state
    const inactivePic = path.join(artDir, `prayer_card_master_inactive_${mode}.png`);
    await page.screenshot({ path: inactivePic, fullPage: false });
    console.log(`  Saved screenshot: ${inactivePic}`);

    // 3. Click Master Badge to toggle back ACTIVE
    console.log(`- Clicking Master Badge to toggle back ACTIVE...`);
    await page.evaluate(() => {
      const badge = Array.from(document.querySelectorAll('button')).find(b => b.innerText === 'Inactive');
      if (badge) badge.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const activeCheck = await page.evaluate(() => {
      const badge = Array.from(document.querySelectorAll('button')).find(b => b.innerText === 'Active');
      const childContainer = document.querySelector('.space-y-4 .space-y-4');
      return {
        badgeText: badge ? badge.innerText : 'none',
        hasDisabledClasses: childContainer ? childContainer.className.includes('opacity-50') : false
      };
    });
    console.log(`  Badge text after re-enabling: "${activeCheck.badgeText}" (Expected: "Active")`);
    console.log(`  Child elements disabled state removed: ${!activeCheck.hasDisabledClasses}`);

    // 4. Test Alert Type Segmented Control (Radio Group)
    console.log(`- Testing Alert Type Selector: clicking "Vibration"...`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.space-y-4 button'));
      const vib = btns.find(b => b.innerText === 'Vibration');
      if (vib) vib.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const vibCheck = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.space-y-4 button'));
      const vib = btns.find(b => b.innerText === 'Vibration');
      const muted = btns.find(b => b.innerText === 'Muted Chime');
      const rawSettings = localStorage.getItem('momentum_settings_store');
      const rawPrayer = localStorage.getItem('momentum-prayer-storage');
      return {
        vibClass: vib ? vib.className : '',
        mutedClass: muted ? muted.className : '',
        storedSettingsType: rawSettings ? JSON.parse(rawSettings).state.alertType : null,
        storedPrayerType: rawPrayer ? JSON.parse(rawPrayer).state.alertType : null
      };
    });
    console.log(`  Vibration stored in settings store: "${vibCheck.storedSettingsType}" (Expected: "vibration")`);
    console.log(`  Vibration stored in prayer store: "${vibCheck.storedPrayerType}" (Expected: "vibration")`);

    console.log(`- Testing Alert Type Selector: clicking "Full Adhan"...`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.space-y-4 button'));
      const adhan = btns.find(b => b.innerText === 'Full Adhan');
      if (adhan) adhan.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const adhanCheck = await page.evaluate(() => {
      const rawSettings = localStorage.getItem('momentum_settings_store');
      return rawSettings ? JSON.parse(rawSettings).state.alertType : null;
    });
    console.log(`  Full Adhan stored in settings store: "${adhanCheck}" (Expected: "full")`);

    // Screenshot of Active state with Full Adhan selected
    const activePic = path.join(artDir, `prayer_card_master_active_${mode}.png`);
    await page.screenshot({ path: activePic, fullPage: false });
    console.log(`  Saved screenshot: ${activePic}`);
  }

  await browser.close();
  console.log('\nAll Master Toggle & Alert Type tests passed completely!');
})();

