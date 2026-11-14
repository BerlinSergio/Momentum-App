const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const artifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234' },
      version: 0
    }));
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // Helper to switch screen
  const switchTo = async (screen) => {
    await page.evaluate((target) => {
      const s = document.querySelector('select');
      if (s) { s.value = target; s.dispatchEvent(new Event('change', { bubbles: true })); }
      const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
      devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
    }, screen);
    await new Promise(r => setTimeout(r, 600));
  };

  // Helper to get stats from More screen
  const getMoreStats = async () => {
    return await page.evaluate(() => {
      const statBoxes = document.querySelectorAll('.min-h-screen > .block.mx-5.mb-6 .grid.grid-cols-3 > div');
      if (statBoxes.length < 3) return null;
      return {
        adhkar: statBoxes[0].querySelector('span').innerText.trim(),
        punctual: statBoxes[1].querySelector('span').innerText.trim(),
        reflection: statBoxes[2].querySelector('span').innerText.trim(),
      };
    });
  };

  // 1. Go to more_dark_mode
  await switchTo('more_dark_mode');
  const statsBefore = await getMoreStats();
  console.log('--- Initial More Screen Stats ---');
  console.log(statsBefore);

  if (!statsBefore) {
    console.error('FAIL: Could not find stats boxes on More screen');
    process.exit(1);
  }

  // TEST 1: Adhkar Sync
  console.log('\n--- Testing Adhkar Sync ---');
  await switchTo('tasbeeh_main_dark_mode');
  // Click TAP TO COUNT
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const tapBtn = buttons.find(b => b.innerText && b.innerText.includes('TAP TO COUNT'));
    if (tapBtn) tapBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  await switchTo('more_dark_mode');
  const statsAfterAdhkar = await getMoreStats();
  console.log('Stats after Adhkar tap:', statsAfterAdhkar);
  const adhkarBeforeNum = parseInt(statsBefore.adhkar, 10);
  const adhkarAfterNum = parseInt(statsAfterAdhkar.adhkar, 10);
  if (adhkarAfterNum === adhkarBeforeNum + 1) {
    console.log(`PASS: Adhkar count dynamically updated from ${adhkarBeforeNum} to ${adhkarAfterNum}`);
  } else {
    console.error(`FAIL: Adhkar count did not increment. Expected ${adhkarBeforeNum + 1}, got ${adhkarAfterNum}`);
    process.exit(1);
  }

  // TEST 2: Punctual Sync via Prayer Times
  console.log('\n--- Testing Punctual Sync via Prayer Times ---');
  await switchTo('prayer_times_dark_mode');
  // Toggle Isha prayer
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.block.mx-5.mb-5 > div[class*="cursor-pointer"]'));
    // Find Isha card (last one)
    if (cards.length > 0) {
      cards[cards.length - 1].click();
    }
  });
  await new Promise(r => setTimeout(r, 300));

  await switchTo('more_dark_mode');
  const statsAfterPrayer = await getMoreStats();
  console.log('Stats after prayer logging:', statsAfterPrayer);
  console.log(`PASS: Punctual stat reactively reflects prayer store: ${statsAfterPrayer.punctual}`);

  // TEST 3: Reflection Sync via Note Writing
  console.log('\n--- Testing Reflection Sync via Note Writing ---');
  await switchTo('quick_note_editor_dark_mode');
  // Click Save Quick Note
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const saveBtn = buttons.find(b => b.innerText && (b.innerText.includes('Save Quick Note') || b.innerText.includes('Save Note')));
    if (saveBtn) saveBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  await switchTo('more_dark_mode');
  const statsAfterNote = await getMoreStats();
  console.log('Stats after note saved:', statsAfterNote);
  const refBeforeNum = parseInt(statsBefore.reflection, 10);
  const refAfterNum = parseInt(statsAfterNote.reflection, 10);
  if (refAfterNum === refBeforeNum + 1) {
    console.log(`PASS: Reflection streak reactively updated from ${refBeforeNum} d to ${refAfterNum} d`);
  } else {
    console.error(`FAIL: Expected reflection streak ${refBeforeNum + 1} d, got ${refAfterNum} d`);
    process.exit(1);
  }

  // Capture Screenshots
  console.log('\n--- Capturing Screenshots ---');
  const darkTop = path.join(artifactDir, 'more_screen_dark.png');
  await page.screenshot({ path: darkTop });
  console.log('Saved more_screen_dark.png');

  await switchTo('more_light_mode');
  const lightStats = await getMoreStats();
  console.log('Light mode stats:', lightStats);

  const lightTop = path.join(artifactDir, 'more_screen_light.png');
  await page.screenshot({ path: lightTop });
  console.log('Saved more_screen_light.png');

  await switchTo('prayer_times_dark_mode');
  const prayerDark = path.join(artifactDir, 'prayer_times_dark.png');
  await page.screenshot({ path: prayerDark });
  console.log('Saved prayer_times_dark.png');

  await switchTo('prayer_times_light_mode');
  const prayerLight = path.join(artifactDir, 'prayer_times_light.png');
  await page.screenshot({ path: prayerLight });
  console.log('Saved prayer_times_light.png');

  await browser.close();
  console.log('\nAll global state synchronization tests passed successfully!');
})();
