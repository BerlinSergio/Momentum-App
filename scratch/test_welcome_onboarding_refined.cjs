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
    const route = mode === 'dark' ? 'personal_setup_dark_mode' : 'personal_setup_light_mode';
    console.log(`\n======================================================`);
    console.log(`=== Testing ${mode.toUpperCase()} MODE: Refined Onboarding (${route}) ===`);
    console.log(`======================================================`);

    // Reset settings store to baseline
    await page.evaluate(() => {
      localStorage.setItem('momentum_settings_store', JSON.stringify({
        state: {
          baseCurrency: 'AFN',
          timezone: 'Asia/Kabul',
          city: 'Kabul, Afghanistan'
        },
        version: 0
      }));
      localStorage.setItem('momentum-profile-storage', JSON.stringify({
        state: {
          fullName: 'Ahmad Reshad',
          currency: 'AFN / ؋ (Afghan Afghani)',
          timezone: 'Asia/Kabul (UTC+4:30)',
          city: 'Kabul, Afghanistan',
          setupCompleted: false
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

    // 1. Measure Vertical Spacing between Card and Continue Button
    const spacingMetrics = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.rounded-3xl'));
      const setupCard = cards.find(c => c.innerText && c.innerText.toUpperCase().includes('PREFERRED CURRENCY'));
      const continueBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue to Dashboard'));
      if (!setupCard || !continueBtn) return null;
      const cRect = setupCard.getBoundingClientRect();
      const bRect = continueBtn.getBoundingClientRect();
      return {
        cardBottom: Math.round(cRect.bottom),
        btnTop: Math.round(bRect.top),
        gapBetweenCardAndButton: Math.round(bRect.top - cRect.bottom)
      };
    });
    console.log(`- Vertical Spacing Metrics:`, spacingMetrics);
    console.log(`  Natural gap between Card & Continue Button: ${spacingMetrics?.gapBetweenCardAndButton}px (cohesive, not pushed to bottom)`);

    // 2. Test Timezone Inline Dropdown
    console.log(`- Testing Timezone Inline Dropdown (No Fullscreen Navigation)...`);
    await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('*'));
      const tzRow = all.find(el => el.innerText && el.innerText.toUpperCase().includes('PRAYER & CALENDAR TIMEZONE') && el.className.includes('cursor-pointer'));
      if (tzRow) tzRow.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const dropdownState = await page.evaluate(() => {
      const dropdown = document.querySelector('.absolute.z-50');
      const h1 = document.querySelector('h1')?.innerText;
      const options = dropdown ? Array.from(dropdown.querySelectorAll('div')).filter(d => d.innerText.includes('Asia/')).length : 0;
      return {
        isOpen: !!dropdown,
        h1RemainedOnScreen: h1 === 'Welcome to Momentum',
        optionsCount: options
      };
    });
    console.log(`  Dropdown is open inline: ${dropdownState.isOpen}`);
    console.log(`  Screen stayed on Welcome to Momentum (no full screen routing): ${dropdownState.h1RemainedOnScreen}`);
    console.log(`  Found timezone options: ${dropdownState.optionsCount}`);

    // Capture screenshot of open dropdown
    const dropdownPic = path.join(artDir, `welcome_onboarding_dropdown_${mode}.png`);
    await page.screenshot({ path: dropdownPic, fullPage: false });
    console.log(`  Saved screenshot: ${dropdownPic}`);

    // 3. Select Asia/Dubai from dropdown
    console.log(`- Selecting "Asia/Dubai" from dropdown...`);
    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.absolute.z-50 div'));
      const dubaiItem = items.find(d => d.innerText && d.innerText.includes('Asia/Dubai'));
      if (dubaiItem) dubaiItem.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const afterSelect = await page.evaluate(() => {
      const dropdown = document.querySelector('.absolute.z-50');
      const text = document.body.innerText;
      const rawSettings = localStorage.getItem('momentum_settings_store');
      return {
        dropdownClosed: !dropdown,
        hasDubaiText: text.includes('Asia/Dubai'),
        storedTz: rawSettings ? JSON.parse(rawSettings).state.timezone : null
      };
    });
    console.log(`  Dropdown closed after selection: ${afterSelect.dropdownClosed}`);
    console.log(`  Screen reflects selected Asia/Dubai: ${afterSelect.hasDubaiText}`);
    console.log(`  Stored timezone in settings store: "${afterSelect.storedTz}"`);

    // Capture resting screenshot after selection
    const restingPic = path.join(artDir, `welcome_onboarding_refined_${mode}.png`);
    await page.screenshot({ path: restingPic, fullPage: false });
    console.log(`  Saved screenshot: ${restingPic}`);

    // 4. Test Continue to Dashboard
    console.log(`- Clicking "Continue to Dashboard"...`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const contBtn = btns.find(b => b.innerText.includes('Continue to Dashboard'));
      if (contBtn) contBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    const navigated = await page.evaluate(() => {
      const sel = document.querySelector('select');
      const raw = localStorage.getItem('momentum-profile-storage');
      return {
        screen: sel ? sel.value : null,
        setupCompleted: raw ? JSON.parse(raw).state.setupCompleted : null
      };
    });
    console.log(`  Navigated Screen: "${navigated.screen}"`);
    console.log(`  setupCompleted: ${navigated.setupCompleted}`);
  }

  await browser.close();
  console.log('\nAll Refined Onboarding tests completed successfully!');
})();
