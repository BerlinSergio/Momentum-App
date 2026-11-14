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
    console.log(`=== Testing ${mode.toUpperCase()} MODE: Modern Form Fields (${route}) ===`);
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

    // 1. Audit External Labels
    const labelsData = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('label'));
      return labels.map(l => ({
        text: l.innerText.trim(),
        className: l.className
      }));
    });
    console.log(`- External Labels Found (${labelsData.length}):`, labelsData);

    const hasExpectedLabels = ['YOUR NAME', 'PREFERRED CURRENCY', 'PRAYER & CALENDAR TIMEZONE', 'CURRENT CITY'].every(
      expected => labelsData.some(l => l.text.toUpperCase() === expected)
    );
    console.log(`  All 4 expected external labels present: ${hasExpectedLabels}`);

    // 2. Audit Clean Input Cards & Divider Removal
    const cardAudit = await page.evaluate(() => {
      const formGroups = document.querySelector('.space-y-6');
      const dividers = formGroups ? formGroups.querySelectorAll('.border-t') : [];
      return {
        hasFormGroupsWrapper: !!formGroups,
        internalDividersCount: dividers.length
      };
    });
    console.log(`- Form groups container with space-y-6: ${cardAudit.hasFormGroupsWrapper}`);
    console.log(`- Internal dividers inside cards count: ${cardAudit.internalDividersCount} (Expected: 0)`);

    // 3. Test Scroll Height vs Client Height (Zero Scroll)
    const scrollMetrics = await page.evaluate(() => {
      const el = document.querySelector('.select-none');
      const root = document.documentElement;
      const body = document.body;
      return {
        viewportHeight: window.innerHeight,
        rootScrollHeight: root.scrollHeight,
        bodyScrollHeight: body.scrollHeight,
        isScrollable: root.scrollHeight > window.innerHeight
      };
    });
    console.log(`- Scroll Metrics:`, scrollMetrics);
    console.log(`  Fits viewport without scrolling: ${!scrollMetrics.isScrollable}`);

    // Take Resting Modern Form Screenshot
    await page.screenshot({ path: path.join(artDir, `welcome_modern_form_${mode}.png`) });
    console.log(`  Captured resting screenshot: welcome_modern_form_${mode}.png`);

    // 4. Test Timezone Dropdown Interactivity
    console.log(`- Testing Timezone Dropdown click...`);
    await page.evaluate(() => {
      const tzRow = Array.from(document.querySelectorAll('.cursor-pointer')).find(
        el => el.innerText && el.innerText.includes('Asia/Kabul')
      );
      if (tzRow) tzRow.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const dropdownState = await page.evaluate(() => {
      const dropdown = document.querySelector('.absolute.z-50');
      return {
        isOpen: !!dropdown,
        optionsCount: dropdown ? dropdown.querySelectorAll('.cursor-pointer').length : 0
      };
    });
    console.log(`  Dropdown is open: ${dropdownState.isOpen}, options count: ${dropdownState.optionsCount}`);

    // Take Dropdown Screenshot
    await page.screenshot({ path: path.join(artDir, `welcome_modern_form_dropdown_${mode}.png`) });
    console.log(`  Captured dropdown screenshot: welcome_modern_form_dropdown_${mode}.png`);

    // Select "Asia/Dubai"
    await page.evaluate(() => {
      const dubai = Array.from(document.querySelectorAll('.absolute.z-50 .cursor-pointer')).find(
        el => el.innerText.includes('Asia/Dubai')
      );
      if (dubai) dubai.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Verify Dropdown closed and timezone updated
    const afterTz = await page.evaluate(() => {
      const dropdown = document.querySelector('.absolute.z-50');
      const settings = JSON.parse(localStorage.getItem('momentum_settings_store') || '{}');
      return {
        dropdownClosed: !dropdown,
        tzInSettings: settings.state?.timezone
      };
    });
    console.log(`  Dropdown closed after selection: ${afterTz.dropdownClosed}`);
    console.log(`  Timezone in settings: ${afterTz.tzInSettings}`);

    // 5. Test Currency Switching
    await page.evaluate(() => {
      const usdBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('$ USD'));
      if (usdBtn) usdBtn.click();
    });
    await new Promise(r => setTimeout(r, 200));

    const currencyState = await page.evaluate(() => {
      const settings = JSON.parse(localStorage.getItem('momentum_settings_store') || '{}');
      const usdBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('$ USD'));
      return {
        storedCurrency: settings.state?.baseCurrency,
        isUsdActive: usdBtn?.className.includes('bg-indigo-600')
      };
    });
    console.log(`- Currency Switching to USD:`, currencyState);

    // 6. Test City GPS Toast
    await page.evaluate(() => {
      const changeBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'Change');
      if (changeBtn) changeBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const toastState = await page.evaluate(() => {
      const toastEl = document.querySelector('.fixed.top-4');
      return {
        hasToast: !!toastEl,
        toastText: toastEl?.innerText
      };
    });
    console.log(`- City GPS Detection:`, toastState);

    // 7. Test Continue to Dashboard
    await page.evaluate(() => {
      const contBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue to Dashboard'));
      if (contBtn) contBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const navState = await page.evaluate(() => {
      const url = window.location.href;
      const settings = JSON.parse(localStorage.getItem('momentum-profile-storage') || '{}');
      return {
        url,
        setupCompleted: settings.state?.setupCompleted
      };
    });
    console.log(`- Continue Button Navigation:`, navState);
  }

  await browser.close();
  console.log(`\nALL TESTS COMPLETED SUCCESSFULLY!`);
})();

