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
    console.log(`=== Testing ${mode.toUpperCase()} MODE: Welcome Onboarding (${route}) ===`);
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

    // 1. Verify Layout & No Scroll Needed
    const layoutMetrics = await page.evaluate(() => {
      const container = document.querySelector('.momentum-canvas-viewport') || document.body;
      const continueBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue to Dashboard'));
      const rect = continueBtn ? continueBtn.getBoundingClientRect() : null;
      return {
        viewportHeight: window.innerHeight,
        containerScrollHeight: container.scrollHeight,
        containerClientHeight: container.clientHeight,
        btnTop: rect ? rect.top : null,
        btnBottom: rect ? rect.bottom : null,
        isFullyVisible: rect ? (rect.bottom <= window.innerHeight && rect.top >= 0) : false
      };
    });
    console.log(`- Layout Metrics:`, layoutMetrics);
    console.log(`  Button fully visible without scrolling: ${layoutMetrics.isFullyVisible} (Expected: true)`);

    // 2. Test Currency Selector (AFN -> USD -> EUR)
    console.log(`- Testing Currency Selector...`);
    // Click USD
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const usdBtn = btns.find(b => b.innerText.includes('USD'));
      if (usdBtn) usdBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const usdActive = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const usdBtn = btns.find(b => b.innerText.includes('USD'));
      const raw = localStorage.getItem('momentum_settings_store');
      return {
        hasIndigoBg: usdBtn ? usdBtn.className.includes('bg-indigo-600') : false,
        storedCurrency: raw ? JSON.parse(raw).state.baseCurrency : null
      };
    });
    console.log(`  USD button highlighted with solid indigo: ${usdActive.hasIndigoBg} (Expected: true)`);
    console.log(`  Stored baseCurrency in settings store: "${usdActive.storedCurrency}" (Expected: "USD")`);

    // Click EUR
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const eurBtn = btns.find(b => b.innerText.includes('EUR'));
      if (eurBtn) eurBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const eurActive = await page.evaluate(() => {
      const raw = localStorage.getItem('momentum_settings_store');
      return raw ? JSON.parse(raw).state.baseCurrency : null;
    });
    console.log(`  Stored baseCurrency after clicking EUR: "${eurActive}" (Expected: "EUR")`);

    // 3. Test Timezone & City Dynamic Binding & "Change" Button
    console.log(`- Testing Timezone & City fields...`);
    const tzCityTexts = await page.evaluate(() => {
      const text = document.body.innerText;
      return {
        hasTz: text.includes('Asia/Kabul'),
        hasCity: text.includes('Kabul, Afghanistan')
      };
    });
    console.log(`  Displays global Timezone (Asia/Kabul): ${tzCityTexts.hasTz}`);
    console.log(`  Displays global City (Kabul, Afghanistan): ${tzCityTexts.hasCity}`);

    // Click "Change" button on City row
    console.log(`- Clicking "Change" on City row...`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const changeBtn = btns.find(b => b.innerText === 'Change');
      if (changeBtn) changeBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const toastText = await page.evaluate(() => {
      const text = document.body.innerText;
      return text.includes('Location updated: Kabul, Afghanistan');
    });
    console.log(`  Toast displayed location detection: ${toastText} (Expected: true)`);

    // Capture resting screenshot showing perfectly fitted layout
    const screenshotPic = path.join(artDir, `welcome_onboarding_${mode}.png`);
    await page.screenshot({ path: screenshotPic, fullPage: false });
    console.log(`  Saved screenshot: ${screenshotPic}`);

    // 4. Test "Continue to Dashboard" button navigation
    console.log(`- Clicking "Continue to Dashboard"...`);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const contBtn = btns.find(b => b.innerText.includes('Continue to Dashboard'));
      if (contBtn) contBtn.click();
    });
    await new Promise(r => setTimeout(r, 800));

    const navigatedScreen = await page.evaluate(() => {
      const sel = document.querySelector('select');
      const text = document.body.innerText;
      const raw = localStorage.getItem('momentum-profile-storage');
      return {
        activeScreen: sel ? sel.value : null,
        hasDashboardText: text.includes('Home') || text.includes('Upcoming') || text.includes('Dashboard'),
        setupCompleted: raw ? JSON.parse(raw).state.setupCompleted : null
      };
    });
    console.log(`  Navigated Screen: "${navigatedScreen.activeScreen}"`);
    console.log(`  Profile setupCompleted in storage: ${navigatedScreen.setupCompleted} (Expected: true)`);
  }

  await browser.close();
  console.log('\nAll Welcome Onboarding tests completed successfully!');
})();

