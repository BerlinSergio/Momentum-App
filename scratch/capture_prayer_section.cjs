const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 1100, deviceScaleFactor: 2 });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // Disable lock and set to home_dashboard_dark_mode
  await page.evaluate(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false },
      version: 0
    }));
  });

  await page.reload({ waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  const artifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

  // Focused Dark Card
  const darkCard = await page.evaluateHandle(() => {
    const titles = Array.from(document.querySelectorAll('h2'));
    return titles.find(t => t.textContent.includes('Routine & Prayer')).closest('.rounded-3xl');
  });
  await darkCard.screenshot({ path: path.join(artifactDir, 'routine_prayer_card_dark_updated.png') });
  console.log('Saved dark card screenshot');

  // Switch to Light Mode via select or dev navigator or window event
  await page.evaluate(() => {
    const select = document.querySelector('select');
    if (select) {
      select.value = 'home_dashboard_light_mode';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await new Promise(r => setTimeout(r, 1000));

  const lightCard = await page.evaluateHandle(() => {
    const titles = Array.from(document.querySelectorAll('h2'));
    return titles.find(t => t.textContent.includes('Routine & Prayer')).closest('.rounded-3xl');
  });
  await lightCard.screenshot({ path: path.join(artifactDir, 'routine_prayer_card_light_updated.png') });
  console.log('Saved light card screenshot');

  await browser.close();
})();
