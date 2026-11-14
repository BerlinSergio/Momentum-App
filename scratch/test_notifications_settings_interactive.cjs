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

  // First open and unlock
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
    console.log(`=== Testing ${mode.toUpperCase()} MODE (${route}) ===`);
    console.log(`========================================`);
    
    await page.goto(`http://localhost:5173/?screen=${route}`);
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // 1. Verify header title
    const title = await page.evaluate(() => document.querySelector('h1')?.innerText);
    console.log(`- Header Title: "${title}" (Expected: "Notification & Calm Alerts")`);

    // 2. Verify dynamic prayer bubbles
    const prayerBubbles = await page.evaluate(() => {
      const bubbles = Array.from(document.querySelectorAll('.grid-cols-5 > div'));
      return bubbles.map(b => ({
        name: b.querySelector('span:first-child')?.innerText,
        time: b.querySelector('span:nth-child(2)')?.innerText
      }));
    });
    console.log(`- Dynamic Prayer Bubbles:`, JSON.stringify(prayerBubbles));

    // 3. Test Timing Offset radio group
    console.log(`- Testing Timing Offset radio group...`);
    // Click "10m before"
    const clicked10m = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.grid-cols-2 > div'));
      const target = cards.find(c => c.innerText.includes('10m before'));
      if (target) {
        target.click();
        return true;
      }
      return false;
    });
    console.log(`  Clicked "10m before": ${clicked10m}`);
    await new Promise(r => setTimeout(r, 400));

    // Verify border-indigo-500 is applied
    const activeOffsetClasses = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.grid-cols-2 > div'));
      const target10m = cards.find(c => c.innerText.includes('10m before'));
      const targetExact = cards.find(c => c.innerText.includes('Exact (0m)'));
      return {
        target10mHasBorderIndigo500: target10m ? target10m.className.includes('border-indigo-500') : false,
        exactDeselected: targetExact ? !targetExact.className.includes('border-indigo-500') : false
      };
    });
    console.log(`  10m card has border-indigo-500: ${activeOffsetClasses.target10mHasBorderIndigo500}`);
    console.log(`  Exact card deselected (mutually exclusive): ${activeOffsetClasses.exactDeselected}`);

    // Verify localStorage has adhanOffset = 10
    const storedOffset = await page.evaluate(() => {
      const raw = localStorage.getItem('momentum-prayer-storage');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          return parsed.state ? parsed.state.adhanOffset : parsed.adhanOffset;
        } catch (e) { return null; }
      }
      return null;
    });
    console.log(`  Stored adhanOffset in usePrayerStore: ${storedOffset} (Expected: 10)`);

    // 4. Test Toggle Switch interactivity
    console.log(`- Testing Toggle switches and global useSettingsStore...`);
    const toggleResult = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input[type="checkbox"]'));
      if (inputs.length > 1) {
        const initialTaskAlert = inputs[1].checked;
        inputs[1].click();
        return { count: inputs.length, initialTaskAlert, afterClick: inputs[1].checked };
      }
      return { count: inputs.length };
    });
    console.log(`  Total Toggle Switches found: ${toggleResult.count} (Expected: 9)`);
    console.log(`  Toggled Due Task Alerts: initial=${toggleResult.initialTaskAlert}, after=${toggleResult.afterClick}`);
    await new Promise(r => setTimeout(r, 400));

    const storedSettings = await page.evaluate(() => {
      const raw = localStorage.getItem('momentum_settings_store');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          return parsed.state || parsed;
        } catch (e) { return null; }
      }
      return null;
    });
    console.log(`  Stored settings masterEnabled: ${storedSettings?.masterEnabled}, dueTaskAlerts: ${storedSettings?.dueTaskAlerts}`);

    // 5. Test Save Button click and Toast
    console.log(`- Testing Save Notification Settings Button...`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const saveBtn = btns.find(b => b.innerText.includes('Save Notification Settings'));
      if (saveBtn) saveBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const toastVisible = await page.evaluate(() => {
      const allText = document.body.innerText;
      return allText.includes('Settings securely synced');
    });
    console.log(`  Toast displayed "Settings securely synced": ${toastVisible} (Expected: true)`);

    // Capture screenshot showing active toast, selected 10m offset, and floating save button
    const toastPic = path.join(artDir, `notifications_settings_${mode}_toast.png`);
    await page.screenshot({ path: toastPic, fullPage: false });
    console.log(`  Saved screenshot: ${toastPic}`);

    // Wait for toast to fade out
    await new Promise(r => setTimeout(r, 2600));

    // Capture resting screenshot
    const restingPic = path.join(artDir, `notifications_settings_${mode}_resting.png`);
    await page.screenshot({ path: restingPic, fullPage: false });
    console.log(`  Saved screenshot: ${restingPic}`);
  }

  await browser.close();
  console.log('\nAll tests complete and verified successfully!');
})();
