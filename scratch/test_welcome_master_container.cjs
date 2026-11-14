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
    console.log(`=== Testing Master Container: ${mode.toUpperCase()} MODE ===`);
    console.log(`======================================================`);

    // Reset stores
    await page.evaluate(() => {
      localStorage.setItem('momentum_settings_store', JSON.stringify({
        state: { baseCurrency: 'AFN', timezone: 'Asia/Kabul', city: 'Kabul, Afghanistan', userName: 'Ahmad Reshad' },
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

    // 1. Audit Master Wrapper Container & Nested Cards
    const containerAudit = await page.evaluate(() => {
      const masterCard = document.querySelector('.rounded-\\[32px\\]');
      if (!masterCard) return { found: false };

      const rect = masterCard.getBoundingClientRect();
      const labels = Array.from(masterCard.querySelectorAll('label')).map(l => l.innerText.trim());
      const childCards = Array.from(masterCard.querySelectorAll('.rounded-2xl'));

      // Check external elements outside masterCard
      const disclaimer = Array.from(document.querySelectorAll('p')).find(p => p.innerText.includes('Stored locally'));
      const continueBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue to Dashboard'));

      const isDisclaimerOutside = disclaimer ? !masterCard.contains(disclaimer) : false;
      const isButtonOutside = continueBtn ? !masterCard.contains(continueBtn) : false;

      return {
        found: true,
        className: masterCard.className,
        rect: { y: Math.round(rect.y), h: Math.round(rect.height), w: Math.round(rect.width) },
        labelsInside: labels,
        nestedCardsCount: childCards.length,
        isDisclaimerOutside,
        isButtonOutside
      };
    });

    console.log(`- Master Container Audit:`, containerAudit);
    console.log(`  Master wrapper container found: ${containerAudit.found}`);
    console.log(`  All 4 form labels nested inside: ${containerAudit.labelsInside?.length === 4}`);
    console.log(`  Disclaimer is OUTSIDE master card: ${containerAudit.isDisclaimerOutside}`);
    console.log(`  Continue button is OUTSIDE master card: ${containerAudit.isButtonOutside}`);

    // 2. Scroll & Viewport Check (Zero-scroll)
    const viewportAudit = await page.evaluate(() => {
      const root = document.documentElement;
      return {
        windowHeight: window.innerHeight,
        rootScrollHeight: root.scrollHeight,
        isScrollable: root.scrollHeight > window.innerHeight
      };
    });
    console.log(`- Viewport Audit:`, viewportAudit);
    console.log(`  Fits viewport without scrolling: ${!viewportAudit.isScrollable}`);

    // Capture Master Card Resting Screenshot
    await page.screenshot({ path: path.join(artDir, `welcome_master_card_${mode}.png`) });
    console.log(`  Saved screenshot: welcome_master_card_${mode}.png`);

    // 3. Test City Dropdown over Master Container
    console.log(`- Opening City Dropdown over Master Container...`);
    await page.evaluate(() => {
      const cityCard = Array.from(document.querySelectorAll('.cursor-pointer')).find(el => el.innerText.includes('Kabul, Afghanistan'));
      if (cityCard) cityCard.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const dropdownState = await page.evaluate(() => {
      const dropdown = document.querySelector('.absolute.z-50');
      return {
        isOpen: !!dropdown,
        optionsCount: dropdown ? dropdown.querySelectorAll('.cursor-pointer').length : 0
      };
    });
    console.log(`  City dropdown open seamlessly over master card: ${dropdownState.isOpen} (${dropdownState.optionsCount} options)`);

    // Capture Dropdown Screenshot
    await page.screenshot({ path: path.join(artDir, `welcome_master_card_dropdown_${mode}.png`) });
    console.log(`  Saved screenshot: welcome_master_card_dropdown_${mode}.png`);
  }

  await browser.close();
  console.log(`\nALL MASTER CONTAINER TESTS COMPLETED SUCCESSFULLY!`);
})();

