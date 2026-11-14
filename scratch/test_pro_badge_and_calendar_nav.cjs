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

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('momentum-security-storage', JSON.stringify({
        state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234' },
        version: 0
      }));
    });

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

    // ----------------------------------------
    // TEST 1: More Dark Mode
    // ----------------------------------------
    console.log('\n--- TESTING MORE DARK MODE ---');
    await page.evaluate(() => {
      const s = document.querySelector('select');
      if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
      const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
      devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
    });
    await new Promise(r => setTimeout(r, 600));

    // Verify PRO badge is NOT present in the profile card
    const profileTextDark = await page.evaluate(() => {
      const card = document.querySelector('.min-h-screen > .block.mx-5.mb-6');
      return card ? card.innerText : '';
    });
    console.log('Profile card text (Dark):', profileTextDark.split('\n').join(' | '));

    const proBadgesDark = await page.evaluate(() => {
      const card = document.querySelector('.min-h-screen > .block.mx-5.mb-6');
      if (!card) return [];
      const spans = Array.from(card.querySelectorAll('span'));
      return spans.map(s => s.innerText.trim()).filter(t => t.toUpperCase() === 'PRO');
    });

    if (proBadgesDark.length > 0) {
      console.error('FAIL: PRO badge is still present in dark mode profile card!');
      process.exit(1);
    } else {
      console.log('PASS: PRO badge successfully removed from Dark Mode profile card.');
    }

    // Capture screenshot of Dark Mode
    const darkPath = path.join(artifactDir, 'more_screen_dark.png');
    await page.screenshot({ path: darkPath });
    console.log('Saved dark mode screenshot:', darkPath);

    // Click Calendars & Hijri Dates in Dark Mode
    console.log('Clicking "Calendars & Hijri Dates" module...');
    const clickedDark = await page.evaluate(() => {
      const modules = Array.from(document.querySelectorAll('.min-h-screen div[class*="cursor-pointer"]'));
      const calendarMod = modules.find(m => m.innerText.includes('Calendars & Hijri Dates'));
      if (calendarMod) {
        calendarMod.click();
        return true;
      }
      return false;
    });

    if (!clickedDark) {
      console.error('FAIL: Calendars & Hijri Dates module not found in Dark Mode!');
      process.exit(1);
    }

    await new Promise(r => setTimeout(r, 600));

    // Check active screen / content
    const currentViewDark = await page.evaluate(() => {
      const select = document.querySelector('select');
      const bodyText = document.body.innerText;
      return {
        selectValue: select ? select.value : '',
        bodySnippet: bodyText.substring(0, 300)
      };
    });
    console.log('Navigated to view:', currentViewDark.selectValue);
    console.log('Body snippet:', currentViewDark.bodySnippet.replace(/\n+/g, ' '));

    if (currentViewDark.selectValue.includes('calendars_main') || currentViewDark.bodySnippet.includes('Calendars') || currentViewDark.bodySnippet.includes('Gregorian')) {
      console.log('PASS: Successfully navigated to Calendars Main view in Dark Mode!');
    } else {
      console.error('FAIL: Did not navigate to Calendars Main view in Dark Mode. Current:', currentViewDark.selectValue);
      process.exit(1);
    }

    // ----------------------------------------
    // TEST 2: More Light Mode
    // ----------------------------------------
    console.log('\n--- TESTING MORE LIGHT MODE ---');
    await page.evaluate(() => {
      const s = document.querySelector('select');
      if (s) { s.value = 'more_light_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
      const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
      devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
    });
    await new Promise(r => setTimeout(r, 600));

    // Verify PRO badge is NOT present in the profile card
    const profileTextLight = await page.evaluate(() => {
      const card = document.querySelector('.min-h-screen > .block.mx-5.mb-6');
      return card ? card.innerText : '';
    });
    console.log('Profile card text (Light):', profileTextLight.split('\n').join(' | '));

    const proBadgesLight = await page.evaluate(() => {
      const card = document.querySelector('.min-h-screen > .block.mx-5.mb-6');
      if (!card) return [];
      const spans = Array.from(card.querySelectorAll('span'));
      return spans.map(s => s.innerText.trim()).filter(t => t.toUpperCase() === 'PRO');
    });

    if (proBadgesLight.length > 0) {
      console.error('FAIL: PRO badge is still present in light mode profile card!');
      process.exit(1);
    } else {
      console.log('PASS: PRO badge successfully removed from Light Mode profile card.');
    }

    // Capture screenshot of Light Mode
    const lightPath = path.join(artifactDir, 'more_screen_light.png');
    await page.screenshot({ path: lightPath });
    console.log('Saved light mode screenshot:', lightPath);

    // Click Calendars & Hijri Dates in Light Mode
    console.log('Clicking "Calendars & Hijri Dates" module in Light Mode...');
    const clickedLight = await page.evaluate(() => {
      const modules = Array.from(document.querySelectorAll('.min-h-screen div[class*="cursor-pointer"]'));
      const calendarMod = modules.find(m => m.innerText.includes('Calendars & Hijri Dates'));
      if (calendarMod) {
        calendarMod.click();
        return true;
      }
      return false;
    });

    if (!clickedLight) {
      console.error('FAIL: Calendars & Hijri Dates module not found in Light Mode!');
      process.exit(1);
    }

    await new Promise(r => setTimeout(r, 600));

    const currentViewLight = await page.evaluate(() => {
      const select = document.querySelector('select');
      const bodyText = document.body.innerText;
      return {
        selectValue: select ? select.value : '',
        bodySnippet: bodyText.substring(0, 300)
      };
    });
    console.log('Navigated to view:', currentViewLight.selectValue);
    console.log('Body snippet:', currentViewLight.bodySnippet.replace(/\n+/g, ' '));

    if (currentViewLight.selectValue.includes('calendars_main') || currentViewLight.bodySnippet.includes('Calendars') || currentViewLight.bodySnippet.includes('Gregorian')) {
      console.log('PASS: Successfully navigated to Calendars Main view in Light Mode!');
    } else {
      console.error('FAIL: Did not navigate to Calendars Main view in Light Mode. Current:', currentViewLight.selectValue);
      process.exit(1);
    }

    console.log('\nALL TESTS PASSED SUCCESSFULLY!');
  } finally {
    await browser.close();
  }
})();

