const puppeteer = require('puppeteer');

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

  const testRoute = async (cardLabel, expectedScreen) => {
    // Go to More screen
    await page.evaluate(() => {
      const s = document.querySelector('select');
      if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    });
    await new Promise(r => setTimeout(r, 400));

    // Click the module card
    await page.evaluate((label) => {
      const cards = Array.from(document.querySelectorAll('.flex.items-center.justify-between.p-4'));
      const card = cards.find(c => c.innerText.includes(label));
      if (card) card.click();
    }, cardLabel);

    await new Promise(r => setTimeout(r, 400));

    const res = await page.evaluate(() => {
      const s = document.querySelector('select');
      return {
        screen: s ? s.value : 'none',
        url: window.location.search
      };
    });

    console.log(`[TEST] Clicked "${cardLabel}" -> Target: ${res.screen} (expected ${expectedScreen})`);
    return res.screen === expectedScreen;
  };

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // Test 1: Income & Cashflow
  await testRoute('Income & Cashflow', 'finance_expense_tracker_dark_mode');

  // Test 2: Prayer Times & Qibla
  await testRoute('Prayer Times & Qibla', 'prayer_times_dark_mode');

  // Test 3: Digital Tasbeeh & Dhikr
  await testRoute('Digital Tasbeeh & Dhikr', 'tasbeeh_main_dark_mode');

  // Test 4: Notes & Reflections
  await testRoute('Notes & Reflections', 'notes_main_dark_mode');

  // Test 5: Calendars & Hijri Dates
  await testRoute('Calendars & Hijri Dates', 'islamic_hijri_calendar_dark_mode');

  // Test 6: Settings & Preferences
  await testRoute('Settings & Preferences', 'settings_profile_dark_mode');

  // Test 7: Profile Hero Card
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const hero = document.querySelector('.block.mx-5.mb-6.p-5');
    if (hero) hero.click();
  });
  await new Promise(r => setTimeout(r, 400));
  const heroRes = await page.evaluate(() => document.querySelector('select')?.value);
  console.log(`[TEST] Clicked Profile Hero Card -> Target: ${heroRes} (expected settings_profile_dark_mode)`);

  await browser.close();
})();

