const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234' },
      version: 0
    }));
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  const artifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

  // 1. Dark Mode
  await page.evaluate(() => {
    const select = document.querySelector('select');
    if (select) {
      select.value = 'islamic_hijri_calendar_dark_mode';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, 'hijri_badge_fixed_dark.png') });

  const darkCard = await page.evaluateHandle(() => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('AH'));
    return h3 ? h3.closest('.rounded-3xl') : null;
  });
  if (darkCard) {
    await darkCard.screenshot({ path: path.join(artifactDir, 'hijri_badge_card_dark_focused.png') });
    console.log('Saved dark card focused screenshot');
  }

  // 2. Light Mode
  await page.evaluate(() => {
    const select = document.querySelector('select');
    if (select) {
      select.value = 'islamic_hijri_calendar_light_mode';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, 'hijri_badge_fixed_light.png') });

  const lightCard = await page.evaluateHandle(() => {
    const h3 = Array.from(document.querySelectorAll('h3')).find(el => el.textContent.includes('AH'));
    return h3 ? h3.closest('.rounded-3xl') : null;
  });
  if (lightCard) {
    await lightCard.screenshot({ path: path.join(artifactDir, 'hijri_badge_card_light_focused.png') });
    console.log('Saved light card focused screenshot');
  }

  await browser.close();
  console.log('Completed capturing badge verification screenshots!');
})();
