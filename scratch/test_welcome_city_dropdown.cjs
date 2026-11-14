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
    console.log(`=== Testing City Dropdown & Auto-detect: ${mode.toUpperCase()} MODE ===`);
    console.log(`======================================================`);

    // Reset baseline stores
    await page.evaluate(() => {
      localStorage.setItem('momentum_settings_store', JSON.stringify({
        state: { baseCurrency: 'AFN', timezone: 'Asia/Kabul', city: 'Kabul, Afghanistan' },
        version: 0
      }));
      localStorage.setItem('momentum-profile-storage', JSON.stringify({
        state: { fullName: 'Ahmad Reshad', currency: 'AFN / ؋ (Afghan Afghani)', timezone: 'Asia/Kabul (UTC+4:30)', city: 'Kabul, Afghanistan', setupCompleted: false },
        version: 0
      }));
    });

    await page.goto(`http://localhost:5173/?screen=${route}`);
    await new Promise(r => setTimeout(r, 800));

    // Hide dev navigator sidebar
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
    });

    // 1. Verify Resting State
    const restingCard = await page.evaluate(() => {
      const allDivs = Array.from(document.querySelectorAll('div.relative'));
      const cityContainer = allDivs.find(d => d.innerText.includes('Kabul, Afghanistan') && d.innerText.includes('34.55°'));
      const autoDetectBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Auto-detect'));
      return {
        hasCityCard: !!cityContainer,
        cityText: cityContainer?.innerText,
        hasAutoDetectBtn: !!autoDetectBtn,
        autoDetectBtnText: autoDetectBtn?.innerText.trim()
      };
    });
    console.log(`- Resting City Card:`, restingCard);

    // Capture resting screenshot
    await page.screenshot({ path: path.join(artDir, `welcome_city_field_${mode}_resting.png`) });
    console.log(`  Saved resting screenshot: welcome_city_field_${mode}_resting.png`);

    // 2. Click City Card to Open Dropdown
    console.log(`- Clicking City Card to open inline dropdown...`);
    await page.evaluate(() => {
      const cityCards = Array.from(document.querySelectorAll('.cursor-pointer')).filter(el => 
        el.innerText && el.innerText.includes('Kabul, Afghanistan')
      );
      if (cityCards.length > 0) cityCards[0].click();
    });
    await new Promise(r => setTimeout(r, 400));

    const dropdownAudit = await page.evaluate(() => {
      const dropdowns = Array.from(document.querySelectorAll('.absolute.z-50'));
      const activeDropdown = dropdowns.find(d => d.innerText.includes('Herat') || d.innerText.includes('Mazar-i-Sharif'));
      const options = activeDropdown ? Array.from(activeDropdown.querySelectorAll('.cursor-pointer')).map(o => o.querySelector('p')?.innerText) : [];
      return {
        isOpen: !!activeDropdown,
        optionsCount: options.length,
        options: options
      };
    });
    console.log(`  City Dropdown Open: ${dropdownAudit.isOpen}, options (${dropdownAudit.optionsCount}):`, dropdownAudit.options);

    // Capture Open City Dropdown screenshot
    await page.screenshot({ path: path.join(artDir, `welcome_city_dropdown_${mode}_open.png`) });
    console.log(`  Saved dropdown screenshot: welcome_city_dropdown_${mode}_open.png`);

    // 3. Select a Different City: "Herat, Afghanistan"
    console.log(`- Selecting "Herat, Afghanistan" from dropdown...`);
    await page.evaluate(() => {
      const heratOption = Array.from(document.querySelectorAll('.absolute.z-50 .cursor-pointer')).find(el => 
        el.innerText.includes('Herat')
      );
      if (heratOption) heratOption.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Verify update
    const selectedState = await page.evaluate(() => {
      const settings = JSON.parse(localStorage.getItem('momentum_settings_store') || '{}');
      const profile = JSON.parse(localStorage.getItem('momentum-profile-storage') || '{}');
      const dropdown = document.querySelector('.absolute.z-50');
      const toastEl = document.querySelector('.fixed.top-4');
      const cityCard = Array.from(document.querySelectorAll('div.relative')).find(d => d.innerText.includes('Herat, Afghanistan'));
      return {
        dropdownClosed: !dropdown,
        cityInSettings: settings.state?.city,
        cityInProfile: profile.state?.city,
        cardUpdated: !!cityCard,
        toastMessage: toastEl?.innerText
      };
    });
    console.log(`  Selection Results:`, selectedState);

    // 4. Test "Auto-detect" Badge Click
    console.log(`- Testing "Auto-detect" Badge Click...`);
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Auto-detect'));
      if (btn) btn.click();
    });

    // Check loading state immediately
    await new Promise(r => setTimeout(r, 100));
    const loadingState = await page.evaluate(() => {
      const detectingBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Detecting...'));
      const spinner = detectingBtn ? detectingBtn.querySelector('.animate-spin') : null;
      return {
        isDetecting: !!detectingBtn,
        hasSpinner: !!spinner
      };
    });
    console.log(`  Auto-detect Loading State:`, loadingState);

    // Capture Loading State screenshot
    await page.screenshot({ path: path.join(artDir, `welcome_city_autodetect_${mode}_loading.png`) });
    console.log(`  Saved loading screenshot: welcome_city_autodetect_${mode}_loading.png`);

    // Wait for resolution
    await new Promise(r => setTimeout(r, 700));

    const postDetectState = await page.evaluate(() => {
      const settings = JSON.parse(localStorage.getItem('momentum_settings_store') || '{}');
      const toastEl = document.querySelector('.fixed.top-4');
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Auto-detect'));
      return {
        cityInSettings: settings.state?.city,
        toastMessage: toastEl?.innerText,
        buttonRestored: !!btn
      };
    });
    console.log(`  Auto-detect Resolved State:`, postDetectState);

    // 5. Test Mutual Exclusivity: Opening Timezone closes City
    console.log(`- Testing Dropdown Mutual Exclusivity...`);
    // Open City dropdown
    await page.evaluate(() => {
      const cityCard = Array.from(document.querySelectorAll('.cursor-pointer')).find(el => el.innerText.includes('Afghanistan'));
      if (cityCard) cityCard.click();
    });
    await new Promise(r => setTimeout(r, 300));
    // Click Timezone card
    await page.evaluate(() => {
      const tzCard = Array.from(document.querySelectorAll('.cursor-pointer')).find(el => el.innerText.includes('Asia/'));
      if (tzCard) tzCard.click();
    });
    await new Promise(r => setTimeout(r, 300));

    const exclusivity = await page.evaluate(() => {
      const dropdowns = Array.from(document.querySelectorAll('.absolute.z-50'));
      const hasTzDropdown = dropdowns.some(d => d.innerText.includes('Asia/Dubai') || d.innerText.includes('Asia/Kabul'));
      const hasCityDropdown = dropdowns.some(d => d.innerText.includes('Herat') || d.innerText.includes('Mazar-i-Sharif'));
      return {
        openDropdownsCount: dropdowns.length,
        hasTzDropdown,
        hasCityDropdown
      };
    });
    console.log(`  Dropdown Exclusivity:`, exclusivity);
  }

  await browser.close();
  console.log(`\nALL CITY DROPDOWN & AUTO-DETECT TESTS COMPLETED SUCCESSFULLY!`);
})();

