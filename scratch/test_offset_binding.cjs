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
    console.log('=== TESTING DYNAMIC NOTIFICATION OFFSET BINDING ===');
    console.log('======================================================');

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

    const getBtnText = async () => {
      return await page.evaluate(() => {
        const btn = document.querySelector('button.bg-gradient-to-r');
        return btn?.innerText?.trim()?.replace(/\s+/g, ' ');
      });
    };

    let text1 = await getBtnText();
    console.log(`Initial button text: "${text1}"`);
    if (!text1.includes('Notifications Active (15m before)')) {
      throw new Error(`Expected default button text to be 'Notifications Active (15m before)', got: ${text1}`);
    }
    console.log('✅ Default 15m notification offset confirmed.');

    // Capture initial screenshot (15m before)
    const shot15m = path.join(artDir, 'prayer_times_offset_15m_dark.png');
    await page.screenshot({ path: shot15m });
    console.log(`Saved screenshot for default 15m: ${shot15m}`);

    // [Step 2] Change offset to 5m in store
    console.log('\n[Step 2] Setting offset to 5m via global store...');
    await page.evaluate(() => {
      window.useSettingsStore.getState().setSetting('prayerNotificationOffset', 5);
    });
    await new Promise(r => setTimeout(r, 300));

    let text5m = await getBtnText();
    console.log(`Updated button text for 5m: "${text5m}"`);
    if (!text5m.includes('(5m before)')) {
      throw new Error(`Expected button text to be 'Notifications Active (5m before)', got: ${text5m}`);
    }
    console.log('✅ Dynamic offset reactive update verified for 5m before!');

    const shot5m = path.join(artDir, 'prayer_times_offset_5m_dark.png');
    await page.screenshot({ path: shot5m });
    console.log(`Saved screenshot for 5m: ${shot5m}`);

    // [Step 3] Change offset to 10m
    console.log('\n[Step 3] Setting offset to 10m...');
    await page.evaluate(() => {
      window.useSettingsStore.getState().setSetting('prayerNotificationOffset', 10);
    });
    await new Promise(r => setTimeout(r, 300));

    let text10m = await getBtnText();
    console.log(`Updated button text for 10m: "${text10m}"`);
    if (!text10m.includes('(10m before)')) {
      throw new Error(`Expected button text to be 'Notifications Active (10m before)', got: ${text10m}`);
    }
    console.log('✅ Dynamic offset reactive update verified for 10m before!');

    const shot10m = path.join(artDir, 'prayer_times_offset_10m_dark.png');
    await page.screenshot({ path: shot10m });
    console.log(`Saved screenshot for 10m: ${shot10m}`);

    // [Step 4] Change offset to 30m
    console.log('\n[Step 4] Setting offset to 30m...');
    await page.evaluate(() => {
      window.useSettingsStore.getState().setSetting('prayerNotificationOffset', 30);
    });
    await new Promise(r => setTimeout(r, 300));

    let text30m = await getBtnText();
    console.log(`Updated button text for 30m: "${text30m}"`);
    if (!text30m.includes('(30m before)')) {
      throw new Error(`Expected button text to be 'Notifications Active (30m before)', got: ${text30m}`);
    }
    console.log('✅ Dynamic offset reactive update verified for 30m before!');

    const shot30m = path.join(artDir, 'prayer_times_offset_30m_dark.png');
    await page.screenshot({ path: shot30m });
    console.log(`Saved screenshot for 30m: ${shot30m}`);

    // [Step 5] Change offset to 0 (Exact time)
    console.log('\n[Step 5] Setting offset to 0 (Exact time)...');
    await page.evaluate(() => {
      window.useSettingsStore.getState().setSetting('prayerNotificationOffset', 0);
    });
    await new Promise(r => setTimeout(r, 300));

    let text0m = await getBtnText();
    console.log(`Updated button text for 0m: "${text0m}"`);
    if (text0m.includes('(0m before)')) {
      throw new Error(`Zero offset should fall back gracefully, got: ${text0m}`);
    }
    if (!text0m.includes('Notifications Active')) {
      throw new Error(`Zero offset should render 'Notifications Active', got: ${text0m}`);
    }
    console.log('✅ Graceful zero fallback verified: Renders "Notifications Active" cleanly without (0m before).');

    const shot0m = path.join(artDir, 'prayer_times_offset_0m_dark.png');
    await page.screenshot({ path: shot0m });
    console.log(`Saved screenshot for 0m: ${shot0m}`);

    // [Step 6] Test Light Mode
    console.log('\n[Step 6] Testing Light Mode with 10m offset...');
    await page.goto('http://localhost:5173/?screen=prayer_times_light_mode');
    await new Promise(r => setTimeout(r, 800));

    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
      window.useSettingsStore.getState().setSetting('prayerNotificationOffset', 10);
    });
    await new Promise(r => setTimeout(r, 300));

    let textLight10m = await getBtnText();
    console.log(`Light Mode button text for 10m: "${textLight10m}"`);
    if (!textLight10m.includes('(10m before)')) {
      throw new Error(`Expected '(10m before)' in light mode, got: ${textLight10m}`);
    }
    console.log('✅ Light mode matches dynamic timing updates perfectly!');

    const shotLight = path.join(artDir, 'prayer_times_offset_10m_light.png');
    await page.screenshot({ path: shotLight });
    console.log(`Saved screenshot for light mode: ${shotLight}`);

    // [Step 7] Test Settings Screen Navigation & Real-time Update
    console.log('\n[Step 7] Testing round-trip from Settings screen...');
    // Navigate to Notifications Settings Dark Mode
    await page.goto('http://localhost:5173/?screen=notifications_settings_dark_mode');
    await new Promise(r => setTimeout(r, 800));

    // Click 5m option in Notification Settings
    console.log('Selecting 5m before in Notification Settings UI...');
    await page.evaluate(() => {
      const options = Array.from(document.querySelectorAll('p')).filter(p => p.innerText.includes('5m before'));
      if (options.length > 0) {
        options[0].closest('.cursor-pointer')?.click();
      }
    });
    await new Promise(r => setTimeout(r, 300));

    // Navigate back to Prayer Times Dark Mode
    await page.goto('http://localhost:5173/?screen=prayer_times_dark_mode');
    await new Promise(r => setTimeout(r, 800));

    let textRoundTrip = await getBtnText();
    console.log(`Round-trip button text in Prayer Times: "${textRoundTrip}"`);
    if (!textRoundTrip.includes('(5m before)')) {
      throw new Error(`Expected '(5m before)' after selecting in Settings, got: ${textRoundTrip}`);
    }
    console.log('✅ Round-trip user flow verified: Settings change immediately updates Prayer Times hero button!');

    console.log('\n🎉 ALL DYNAMIC NOTIFICATION OFFSET BINDING TESTS PASSED WITH 100% SUCCESS!');
  } finally {
    await browser.close();
  }
})();
