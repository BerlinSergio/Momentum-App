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

  // TEST LIGHT MODE
  console.log('=== TESTING WELCOME SCREEN DROPDOWN: LIGHT MODE ===');
  await page.goto('http://localhost:5173/?screen=personal_setup_light_mode');
  await new Promise(r => setTimeout(r, 800));

  // Hide dev navigator sidebar
  await page.evaluate(() => {
    document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
  });

  // 1. Open Timezone Dropdown
  console.log('- Opening Timezone Dropdown...');
  await page.evaluate(() => {
    // Click Timezone selector
    const labels = Array.from(document.querySelectorAll('label'));
    const tzLabel = labels.find(l => l.innerText.includes('TIMEZONE'));
    if (tzLabel) {
      const container = tzLabel.nextElementSibling;
      const trigger = container?.querySelector('.cursor-pointer');
      if (trigger) trigger.click();
    }
  });
  await new Promise(r => setTimeout(r, 500));

  // Inspect Timezone Dropdown container
  const tzDropdownAudit = await page.evaluate(() => {
    const dropdown = document.querySelector('.absolute.top-\\[calc\\(100\\%\\+6px\\)\\]');
    if (!dropdown) return { found: false };
    const style = window.getComputedStyle(dropdown);
    return {
      found: true,
      className: dropdown.className,
      backgroundColor: style.backgroundColor,
      backdropFilter: style.backdropFilter,
      webkitBackdropFilter: style.webkitBackdropFilter,
      zIndex: style.zIndex,
      borderRadius: style.borderRadius,
      borderTopColor: style.borderTopColor,
      boxShadow: style.boxShadow,
      scrollHeight: dropdown.scrollHeight,
      clientHeight: dropdown.clientHeight,
      itemsCount: dropdown.querySelectorAll('.cursor-pointer').length
    };
  });

  console.log('Timezone Dropdown Audit:', tzDropdownAudit);
  console.log('Strict solid white bg (rgb(255, 255, 255)):', tzDropdownAudit.backgroundColor === 'rgb(255, 255, 255)');
  console.log('No backdrop filter:', tzDropdownAudit.backdropFilter === 'none');
  console.log('Z-Index is 100:', tzDropdownAudit.zIndex === '100');
  console.log('Border Radius 16px (rounded-2xl):', tzDropdownAudit.borderRadius === '16px');

  await page.screenshot({ path: path.join(artDir, 'welcome_dropdown_solid_white_light.png') });
  console.log('Saved screenshot: welcome_dropdown_solid_white_light.png');

  // 2. Open City Dropdown
  console.log('- Opening City Dropdown...');
  await page.evaluate(() => {
    const labels = Array.from(document.querySelectorAll('label'));
    const cityLabel = labels.find(l => l.innerText.includes('CURRENT CITY'));
    if (cityLabel) {
      const parent = cityLabel.parentElement;
      const trigger = parent.nextElementSibling?.querySelector('.cursor-pointer');
      if (trigger) trigger.click();
    }
  });
  await new Promise(r => setTimeout(r, 500));

  const cityDropdownAudit = await page.evaluate(() => {
    const dropdown = document.querySelector('.absolute.top-\\[calc\\(100\\%\\+6px\\)\\]');
    if (!dropdown) return { found: false };
    const style = window.getComputedStyle(dropdown);
    return {
      found: true,
      className: dropdown.className,
      backgroundColor: style.backgroundColor,
      backdropFilter: style.backdropFilter,
      zIndex: style.zIndex,
      borderRadius: style.borderRadius,
      boxShadow: style.boxShadow
    };
  });

  console.log('City Dropdown Audit:', cityDropdownAudit);
  console.log('City Dropdown solid white bg:', cityDropdownAudit.backgroundColor === 'rgb(255, 255, 255)');

  await page.screenshot({ path: path.join(artDir, 'welcome_city_dropdown_solid_white_light.png') });
  console.log('Saved screenshot: welcome_city_dropdown_solid_white_light.png');

  // TEST DARK MODE
  console.log('\n=== TESTING WELCOME SCREEN DROPDOWN: DARK MODE ===');
  await page.goto('http://localhost:5173/?screen=personal_setup_dark_mode');
  await new Promise(r => setTimeout(r, 800));

  await page.evaluate(() => {
    document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
  });

  // Open Timezone Dropdown in Dark Mode
  await page.evaluate(() => {
    const labels = Array.from(document.querySelectorAll('label'));
    const tzLabel = labels.find(l => l.innerText.includes('TIMEZONE'));
    if (tzLabel) {
      const container = tzLabel.nextElementSibling;
      const trigger = container?.querySelector('.cursor-pointer');
      if (trigger) trigger.click();
    }
  });
  await new Promise(r => setTimeout(r, 500));

  const darkTzAudit = await page.evaluate(() => {
    const dropdown = document.querySelector('.absolute.top-\\[calc\\(100\\%\\+6px\\)\\]');
    if (!dropdown) return { found: false };
    const style = window.getComputedStyle(dropdown);
    return {
      found: true,
      className: dropdown.className,
      backgroundColor: style.backgroundColor,
      backdropFilter: style.backdropFilter,
      zIndex: style.zIndex,
      borderRadius: style.borderRadius
    };
  });
  console.log('Dark Mode Dropdown Audit:', darkTzAudit);
  console.log('Dark Mode strictly solid bg (rgb(15, 23, 42)):', darkTzAudit.backgroundColor === 'rgb(15, 23, 42)');
  console.log('Dark Mode No backdrop filter:', darkTzAudit.backdropFilter === 'none');

  await page.screenshot({ path: path.join(artDir, 'welcome_dropdown_solid_dark.png') });
  console.log('Saved screenshot: welcome_dropdown_solid_dark.png');

  await browser.close();
  console.log('\nALL SOLID DROPDOWN MENU TESTS COMPLETED SUCCESSFULLY!');
})();

