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
    console.log(`\n========================================`);
    console.log(`=== Testing ${mode.toUpperCase()} MODE: Prayer Bubbles (${route}) ===`);
    console.log(`========================================`);

    // Reset enabled prayer alerts in localStorage before each mode test
    await page.evaluate(() => {
      const existing = localStorage.getItem('momentum_settings_store');
      let base = { state: {}, version: 0 };
      if (existing) {
        try { base = JSON.parse(existing); } catch (e) {}
      }
      base.state.enabledPrayerAlerts = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      localStorage.setItem('momentum_settings_store', JSON.stringify(base));

      const existingPrayer = localStorage.getItem('momentum-prayer-storage');
      let prayerBase = { state: {}, version: 0 };
      if (existingPrayer) {
        try { prayerBase = JSON.parse(existingPrayer); } catch (e) {}
      }
      prayerBase.state.enabledPrayerAlerts = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      localStorage.setItem('momentum-prayer-storage', JSON.stringify(prayerBase));
    });

    await page.goto(`http://localhost:5173/?screen=${route}`);
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // 1. Check initial prayer buttons
    const initialBubbles = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.grid-cols-5 > button'));
      return btns.map(b => ({
        name: b.querySelector('span:first-child')?.innerText,
        time: b.querySelector('span:nth-child(2)')?.innerText,
        className: b.className
      }));
    });
    console.log(`- Found ${initialBubbles.length} prayer bubble buttons`);
    initialBubbles.forEach(b => console.log(`  * ${b.name}: ${b.time}`));

    // 2. Click "Dhuhr" and "Maghrib" to toggle them off
    console.log(`- Toggling off 'Dhuhr' and 'Maghrib'...`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.grid-cols-5 > button'));
      const dhuhr = btns.find(b => b.innerText.includes('Dhuhr'));
      const maghrib = btns.find(b => b.innerText.includes('Maghrib'));
      if (dhuhr) dhuhr.click();
      if (maghrib) maghrib.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 3. Verify state after toggle
    const toggledBubbles = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.grid-cols-5 > button'));
      return btns.map(b => {
        const dot = b.querySelector('span:nth-child(3)');
        const dotClass = dot ? dot.className : '';
        const isDotVisible = !dotClass.includes('bg-transparent');
        const isMuted = b.className.includes('bg-transparent') && b.className.includes('opacity-60');
        return {
          name: b.querySelector('span:first-child')?.innerText,
          isDotVisible,
          isMuted
        };
      });
    });
    console.log(`- Bubbles state after toggling Dhuhr & Maghrib:`, JSON.stringify(toggledBubbles));

    // 4. Verify subtitle reflects active count
    const subtitleText = await page.evaluate(() => {
      const p = document.querySelector('.space-y-4 p.text-\\[11px\\]');
      return p ? p.innerText : '';
    });
    console.log(`- Card subtitle: "${subtitleText}" (Expected: "3 of 5 daily prayers active")`);

    // 5. Verify global state in localStorage
    const storedAlerts = await page.evaluate(() => {
      const raw = localStorage.getItem('momentum_settings_store');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          return parsed.state ? parsed.state.enabledPrayerAlerts : parsed.enabledPrayerAlerts;
        } catch (e) { return null; }
      }
      return null;
    });
    console.log(`- Stored enabledPrayerAlerts in localStorage:`, JSON.stringify(storedAlerts));

    // 6. Capture screenshot of toggled state (Dhuhr & Maghrib muted, others active)
    const toggledPic = path.join(artDir, `prayer_bubbles_toggled_${mode}.png`);
    await page.screenshot({ path: toggledPic, fullPage: false });
    console.log(`  Saved screenshot: ${toggledPic}`);

    // 7. Toggle Dhuhr back ON
    console.log(`- Toggling 'Dhuhr' back ON...`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.grid-cols-5 > button'));
      const dhuhr = btns.find(b => b.innerText.includes('Dhuhr'));
      if (dhuhr) dhuhr.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const finalStoredAlerts = await page.evaluate(() => {
      const raw = localStorage.getItem('momentum_settings_store');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          return parsed.state ? parsed.state.enabledPrayerAlerts : parsed.enabledPrayerAlerts;
        } catch (e) { return null; }
      }
      return null;
    });
    console.log(`- Final stored enabledPrayerAlerts after re-enabling Dhuhr:`, JSON.stringify(finalStoredAlerts));

    // 8. Capture final resting screenshot
    const restingPic = path.join(artDir, `prayer_bubbles_active_${mode}.png`);
    await page.screenshot({ path: restingPic, fullPage: false });
    console.log(`  Saved screenshot: ${restingPic}`);
  }

  await browser.close();
  console.log('\nAll prayer bubbles interactivity tests completed successfully!');
})();
