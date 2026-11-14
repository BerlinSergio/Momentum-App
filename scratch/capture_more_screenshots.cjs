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

  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234' },
      version: 0
    }));
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // 1. Dark Mode Top & Bottom
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
    devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
  });
  await new Promise(r => setTimeout(r, 600));

  const darkTop = path.join(artifactDir, 'more_screen_dark.png');
  await page.screenshot({ path: darkTop });
  console.log('Saved Dark Top to', darkTop);

  // Scroll to bottom
  await page.evaluate(() => {
    const sc = document.querySelector('.momentum-canvas-viewport');
    if (sc) sc.scrollTop = sc.scrollHeight;
  });
  await new Promise(r => setTimeout(r, 400));

  const darkBottom = path.join(artifactDir, 'more_screen_scrolled_dark.png');
  await page.screenshot({ path: darkBottom });
  console.log('Saved Dark Bottom to', darkBottom);

  // 2. Light Mode Top & Bottom
  await page.evaluate(() => {
    const sc = document.querySelector('.momentum-canvas-viewport');
    if (sc) sc.scrollTop = 0;
    const s = document.querySelector('select');
    if (s) { s.value = 'more_light_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
    devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
  });
  await new Promise(r => setTimeout(r, 600));

  const lightTop = path.join(artifactDir, 'more_screen_light.png');
  await page.screenshot({ path: lightTop });
  console.log('Saved Light Top to', lightTop);

  // Scroll to bottom
  await page.evaluate(() => {
    const sc = document.querySelector('.momentum-canvas-viewport');
    if (sc) sc.scrollTop = sc.scrollHeight;
  });
  await new Promise(r => setTimeout(r, 400));

  const lightBottom = path.join(artifactDir, 'more_screen_scrolled_light.png');
  await page.screenshot({ path: lightBottom });
  console.log('Saved Light Bottom to', lightBottom);

  await browser.close();
  console.log('Capture complete!');
})();
