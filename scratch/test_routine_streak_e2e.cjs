const puppeteer = require('puppeteer');
const path = require('path');
const assert = require('assert');

(async () => {
  console.log('=== Running E2E Puppeteer Test for Routine Streak Navigation & Sync ===');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 1100, deviceScaleFactor: 2 });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // Reset routine store and disable lock
  await page.evaluate(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false },
      version: 0
    }));
    localStorage.removeItem('momentum-routine-storage');
  });

  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Check streak banner text on Home
  const initialStreakText = await page.evaluate(() => {
    const banner = document.querySelector('[aria-label="View Daily Routine"]');
    return banner ? banner.querySelector('h3').textContent : null;
  });
  console.log('1. Initial Home streak banner text:', initialStreakText);
  assert.strictEqual(initialStreakText, '14 Day Routine Streak');

  // 2. Click the streak banner
  console.log('2. Clicking Streak banner on Home...');
  await page.evaluate(() => {
    const banner = document.querySelector('[aria-label="View Daily Routine"]');
    banner.click();
  });

  await new Promise(r => setTimeout(r, 1000));

  // 3. Verify on Routine Screen
  const onRoutineScreen = await page.evaluate(() => {
    const title = Array.from(document.querySelectorAll('h1')).find(h => h.textContent.includes('Daily Routine'));
    const streakBadge = document.querySelector('.bg-amber-500\\/15');
    return {
      hasTitle: !!title,
      badgeText: streakBadge ? streakBadge.textContent.trim() : null
    };
  });
  console.log('3. Routine screen loaded:', onRoutineScreen);
  assert.ok(onRoutineScreen.hasTitle, 'Should navigate to Daily Routine screen');
  assert.ok(onRoutineScreen.badgeText.includes('14-Day Routine Streak'));

  // 4. Toggle the two uncompleted routines to 100% complete
  console.log('4. Completing remaining routines on Daily Routine screen...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button[aria-label="Toggle routine completion"]'));
    // Uncompleted buttons have border-slate-600 or text-transparent
    buttons.forEach(btn => {
      if (!btn.className.includes('bg-primary text-white')) {
        btn.click();
      }
    });
  });

  await new Promise(r => setTimeout(r, 1000));

  // Verify routine streak incremented to 15 on Daily Routine screen
  const routineScreenAfter = await page.evaluate(() => {
    const streakBadge = document.querySelector('.bg-amber-500\\/15');
    const doneText = document.querySelector('h2.font-black');
    return {
      badgeText: streakBadge ? streakBadge.textContent.trim() : null,
      doneText: doneText ? doneText.textContent.trim() : null
    };
  });
  console.log(' - Updated on Routine screen:', routineScreenAfter);
  assert.ok(routineScreenAfter.badgeText.includes('15-Day Routine Streak'));
  assert.ok(routineScreenAfter.doneText.includes('6 of 6 Done'));

  // 5. Navigate back to Home
  console.log('5. Navigating back to Home screen...');
  await page.evaluate(() => {
    // Click Home in bottom nav
    const bottomNav = document.querySelectorAll('nav button, [role="navigation"] button');
    let homeBtn = null;
    bottomNav.forEach(btn => {
      if (btn.textContent.includes('Home')) homeBtn = btn;
    });
    if (homeBtn) {
      homeBtn.click();
    } else {
      const select = document.querySelector('select');
      if (select) {
        select.value = 'home_dashboard_dark_mode';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });

  await new Promise(r => setTimeout(r, 1000));

  // 6. Check Home streak banner text now
  const finalHomeStreakText = await page.evaluate(() => {
    const banner = document.querySelector('[aria-label="View Daily Routine"]');
    return banner ? banner.querySelector('h3').textContent : null;
  });
  console.log('6. Final Home streak banner text:', finalHomeStreakText);
  assert.strictEqual(finalHomeStreakText, '15 Day Routine Streak');

  // Save screenshot of the updated Home Streak card
  const artifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';
  const bannerHandle = await page.evaluateHandle(() => {
    return document.querySelector('[aria-label="View Daily Routine"]');
  });
  await bannerHandle.screenshot({ path: path.join(artifactDir, 'routine_streak_15_days_verified.png') });
  console.log('Saved screenshot routine_streak_15_days_verified.png');

  await browser.close();
  console.log('=== E2E TEST PASSED 100% ===');
})();

