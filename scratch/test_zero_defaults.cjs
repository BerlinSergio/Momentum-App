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

  // Simulate a completely FRESH user by wiping all storage
  await page.evaluateOnNewDocument(() => {
    localStorage.clear();
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234' },
      version: 0
    }));
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  const switchTo = async (screen) => {
    await page.evaluate((target) => {
      const s = document.querySelector('select');
      if (s) { s.value = target; s.dispatchEvent(new Event('change', { bubbles: true })); }
      const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
      devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
    }, screen);
    await new Promise(r => setTimeout(r, 600));
  };

  const getStats = async () => {
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

  // 1. Check Dark Mode Zero Default
  console.log('\n--- Test 1: Fresh User Profile in Dark Mode ---');
  await switchTo('more_dark_mode');
  const darkStats = await getStats();
  console.log('Dark Mode Fresh User Stats:', darkStats);

  if (darkStats.adhkar !== '0') {
    console.error(`FAIL: Adhkar did not default to 0! Got: "${darkStats.adhkar}"`);
    process.exit(1);
  }
  if (darkStats.punctual !== '0%') {
    console.error(`FAIL: Punctual did not default to 0%! Got: "${darkStats.punctual}"`);
    process.exit(1);
  }
  if (darkStats.reflection !== '0 d') {
    console.error(`FAIL: Reflection did not default to 0 d! Got: "${darkStats.reflection}"`);
    process.exit(1);
  }
  console.log('PASS: Dark Mode strictly renders 0, 0%, 0 d for a fresh user!');

  const darkZeroShot = path.join(artifactDir, 'more_screen_dark_zero.png');
  await page.screenshot({ path: darkZeroShot });
  console.log('Saved screenshot:', darkZeroShot);

  // 2. Check Light Mode Zero Default
  console.log('\n--- Test 2: Fresh User Profile in Light Mode ---');
  await switchTo('more_light_mode');
  const lightStats = await getStats();
  console.log('Light Mode Fresh User Stats:', lightStats);

  if (lightStats.adhkar !== '0' || lightStats.punctual !== '0%' || lightStats.reflection !== '0 d') {
    console.error(`FAIL: Light Mode stats did not strictly default to zero! Got:`, lightStats);
    process.exit(1);
  }
  console.log('PASS: Light Mode strictly renders 0, 0%, 0 d for a fresh user!');

  const lightZeroShot = path.join(artifactDir, 'more_screen_light_zero.png');
  await page.screenshot({ path: lightZeroShot });
  console.log('Saved screenshot:', lightZeroShot);

  // 3. Increment Test: Tasbeeh count
  console.log('\n--- Test 3: Updating Tasbeeh from Zero ---');
  await switchTo('tasbeeh_main_dark_mode');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const tapBtn = buttons.find(b => b.innerText && b.innerText.includes('TAP TO COUNT'));
    if (tapBtn) tapBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  await switchTo('more_dark_mode');
  const statsAfterTasbeeh = await getStats();
  console.log('Stats after 1 Tasbeeh tap:', statsAfterTasbeeh);
  if (statsAfterTasbeeh.adhkar !== '1') {
    console.error(`FAIL: Expected Adhkar to be 1, got "${statsAfterTasbeeh.adhkar}"`);
    process.exit(1);
  }
  console.log('PASS: Adhkar incremented from 0 to 1!');

  // 4. Increment Test: Log Prayer in Prayer Times
  console.log('\n--- Test 4: Logging Prayer from Zero ---');
  await switchTo('prayer_times_dark_mode');
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.block.mx-5.mb-5 > div[class*="cursor-pointer"]'));
    if (cards.length > 0) cards[0].click(); // Complete Fajr
  });
  await new Promise(r => setTimeout(r, 300));

  await switchTo('more_dark_mode');
  const statsAfterPrayer = await getStats();
  console.log('Stats after 1 prayer logged:', statsAfterPrayer);
  if (statsAfterPrayer.punctual !== '100%') {
    console.error(`FAIL: Expected Punctual to be 100%, got "${statsAfterPrayer.punctual}"`);
    process.exit(1);
  }
  console.log('PASS: Punctual updated from 0% to 100%!');

  // 5. Increment Test: Save Note from Zero
  console.log('\n--- Test 5: Saving Note from Zero ---');
  await switchTo('quick_note_editor_dark_mode');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const saveBtn = buttons.find(b => b.innerText && (b.innerText.includes('Save Quick Note') || b.innerText.includes('Save Note')));
    if (saveBtn) saveBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  await switchTo('more_dark_mode');
  const statsAfterNote = await getStats();
  console.log('Stats after 1 note saved:', statsAfterNote);
  if (statsAfterNote.reflection !== '1 d') {
    console.error(`FAIL: Expected Reflection to be 1 d, got "${statsAfterNote.reflection}"`);
    process.exit(1);
  }
  console.log('PASS: Reflection streak updated from 0 d to 1 d!');

  // Overwrite updated full screenshots for artifact review
  const darkFull = path.join(artifactDir, 'more_screen_dark.png');
  await page.screenshot({ path: darkFull });
  await switchTo('more_light_mode');
  const lightFull = path.join(artifactDir, 'more_screen_light.png');
  await page.screenshot({ path: lightFull });

  await browser.close();
  console.log('\nALL ZERO-DEFAULT AND DYNAMIC REACTION TESTS PASSED 100%!');
})();

