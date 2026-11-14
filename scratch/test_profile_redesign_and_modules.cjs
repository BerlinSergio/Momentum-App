const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const artifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

async function verifyProfileAndModules() {
  console.log('==============================================');
  console.log('TESTING PROFILE CARD REDESIGN & MODULE RENAMING');
  console.log('==============================================');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Unlock AppLock PIN 1234
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const pinFallback = btns.find(b => b.innerText.includes('Backup PIN') || b.innerText.includes('PIN'));
      if (pinFallback) pinFallback.click();
    });
    await new Promise(r => setTimeout(r, 400));

    for (const d of ['1', '2', '3', '4']) {
      await page.evaluate((digit) => {
        const btns = Array.from(document.querySelectorAll('button'));
        const b = btns.find(x => x.innerText.trim() === digit);
        if (b) b.click();
      }, d);
      await new Promise(r => setTimeout(r, 150));
    }
    await new Promise(r => setTimeout(r, 500));

    // Hide dev navigator overlays
    await page.evaluate(() => {
      const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
      devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // ----------------------------------------
    // 1. Dark Mode Verification
    // ----------------------------------------
    console.log('\n--- 1. Testing More Dark Mode ---');
    await page.select('select', 'more_dark_mode');
    await new Promise(r => setTimeout(r, 600));

    const checkDark = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const text = vp.innerText;
      const spans = Array.from(vp.querySelectorAll('span')).map(s => s.innerText.trim());

      const foundNotes = spans.includes('Notes');
      const foundOldNotes = spans.some(s => s.includes('Mindful Notes & Reflection'));
      const foundCalendars = spans.includes('Calendars');
      const foundOldCalendars = spans.some(s => s.includes('Calendars & Hijri Dates'));
      const foundSubtitle = text.includes('Momentum Member');

      // Check Profile card structure
      const heroCard = vp.querySelector('.min-h-screen > .block.mx-5.mb-6');
      const hasDividers = heroCard ? Boolean(heroCard.querySelector('.border-r')) : false;
      const svgsInStats = heroCard ? heroCard.querySelectorAll('.grid.grid-cols-3 svg').length : 0;

      return {
        foundNotes,
        foundOldNotes,
        foundCalendars,
        foundOldCalendars,
        foundSubtitle,
        hasDividers,
        svgsInStats
      };
    });

    console.log('Dark Mode Audit:', checkDark);
    if (!checkDark.foundNotes || checkDark.foundOldNotes) {
      throw new Error('FAIL: Module 3 was not renamed cleanly to "Notes" in Dark Mode!');
    }
    if (!checkDark.foundCalendars || checkDark.foundOldCalendars) {
      throw new Error('FAIL: Module 4 was not renamed cleanly to "Calendars" in Dark Mode!');
    }
    if (!checkDark.foundSubtitle) {
      throw new Error('FAIL: Profile subtitle "Momentum Member" not found in Dark Mode!');
    }
    if (!checkDark.hasDividers) {
      throw new Error('FAIL: Vertical dividers between stats not found in Dark Mode!');
    }
    if (checkDark.svgsInStats < 3) {
      throw new Error(`FAIL: Expected 3 icons in stats grid, found ${checkDark.svgsInStats}!`);
    }
    console.log('PASS: Dark Mode Profile Card and Module names verified successfully.');

    // Screenshot Dark Mode
    const darkPath = path.join(artifactDir, 'more_screen_dark.png');
    await page.screenshot({ path: darkPath });
    console.log('Saved screenshot:', darkPath);

    // ----------------------------------------
    // 2. Light Mode Verification
    // ----------------------------------------
    console.log('\n--- 2. Testing More Light Mode ---');
    await page.select('select', 'more_light_mode');
    await new Promise(r => setTimeout(r, 600));

    const checkLight = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const text = vp.innerText;
      const spans = Array.from(vp.querySelectorAll('span')).map(s => s.innerText.trim());

      const foundNotes = spans.includes('Notes');
      const foundOldNotes = spans.some(s => s.includes('Mindful Notes & Reflection'));
      const foundCalendars = spans.includes('Calendars');
      const foundOldCalendars = spans.some(s => s.includes('Calendars & Hijri Dates'));
      const foundSubtitle = text.includes('Momentum Member');

      const heroCard = vp.querySelector('.min-h-screen > .block.mx-5.mb-6');
      const hasDividers = heroCard ? Boolean(heroCard.querySelector('.border-r')) : false;
      const svgsInStats = heroCard ? heroCard.querySelectorAll('.grid.grid-cols-3 svg').length : 0;

      return {
        foundNotes,
        foundOldNotes,
        foundCalendars,
        foundOldCalendars,
        foundSubtitle,
        hasDividers,
        svgsInStats
      };
    });

    console.log('Light Mode Audit:', checkLight);
    if (!checkLight.foundNotes || checkLight.foundOldNotes) {
      throw new Error('FAIL: Module 3 was not renamed cleanly to "Notes" in Light Mode!');
    }
    if (!checkLight.foundCalendars || checkLight.foundOldCalendars) {
      throw new Error('FAIL: Module 4 was not renamed cleanly to "Calendars" in Light Mode!');
    }
    if (!checkLight.foundSubtitle) {
      throw new Error('FAIL: Profile subtitle "Momentum Member" not found in Light Mode!');
    }
    if (!checkLight.hasDividers) {
      throw new Error('FAIL: Vertical dividers between stats not found in Light Mode!');
    }
    if (checkLight.svgsInStats < 3) {
      throw new Error(`FAIL: Expected 3 icons in stats grid, found ${checkLight.svgsInStats}!`);
    }
    console.log('PASS: Light Mode Profile Card and Module names verified successfully.');

    // Screenshot Light Mode
    const lightPath = path.join(artifactDir, 'more_screen_light.png');
    await page.screenshot({ path: lightPath });
    console.log('Saved screenshot:', lightPath);

    // ----------------------------------------
    // 3. Navigation Click Tests on Renamed Modules
    // ----------------------------------------
    console.log('\n--- 3. Testing Navigation on Renamed Modules ---');

    // Test Notes Click
    await page.select('select', 'more_dark_mode');
    await new Promise(r => setTimeout(r, 500));
    const clickedNotes = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const spans = Array.from(vp.querySelectorAll('span'));
      const noteSpan = spans.find(s => s.innerText.trim() === 'Notes');
      const card = noteSpan ? noteSpan.closest('.cursor-pointer') : null;
      if (card) { card.click(); return true; }
      return false;
    });
    if (!clickedNotes) throw new Error('FAIL: Could not click Notes card!');
    await new Promise(r => setTimeout(r, 600));

    const notesView = await page.evaluate(() => document.querySelector('select').value);
    console.log('Navigated from Notes to:', notesView);
    if (!notesView.includes('notes_main')) {
      throw new Error(`FAIL: Clicking Notes did not navigate to notes screen! Got: ${notesView}`);
    }
    console.log('PASS: Notes module navigation verified.');

    // Test Calendars Click
    await page.select('select', 'more_dark_mode');
    await new Promise(r => setTimeout(r, 500));
    const clickedCalendars = await page.evaluate(() => {
      const vp = document.querySelector('.momentum-canvas-viewport') || document.body;
      const spans = Array.from(vp.querySelectorAll('span'));
      const calSpan = spans.find(s => s.innerText.trim() === 'Calendars');
      const card = calSpan ? calSpan.closest('.cursor-pointer') : null;
      if (card) { card.click(); return true; }
      return false;
    });
    if (!clickedCalendars) throw new Error('FAIL: Could not click Calendars card!');
    await new Promise(r => setTimeout(r, 600));

    const calendarsView = await page.evaluate(() => document.querySelector('select').value);
    console.log('Navigated from Calendars to:', calendarsView);
    if (!calendarsView.includes('calendars_main')) {
      throw new Error(`FAIL: Clicking Calendars did not navigate to calendars main! Got: ${calendarsView}`);
    }
    console.log('PASS: Calendars module navigation verified.');

    console.log('\n==============================================');
    console.log('ALL AUDITS AND VERIFICATIONS PASSED!');
    console.log('==============================================');
  } finally {
    await browser.close();
  }
}

verifyProfileAndModules().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});

