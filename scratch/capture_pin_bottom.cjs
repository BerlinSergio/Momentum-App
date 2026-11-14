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
    const route = mode === 'dark' ? 'pin_setup_change_dark_mode' : 'pin_setup_change_light_mode';
    await page.goto(`http://localhost:5173/?screen=${route}`);
    await new Promise(r => setTimeout(r, 600));
    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
      const vp = document.querySelector('.momentum-canvas-viewport');
      if (vp) vp.scrollTop = vp.scrollHeight;
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(artDir, `pin_setup_bottom_actions_${mode}.png`) });
    console.log(`Saved: pin_setup_bottom_actions_${mode}.png`);
  }

  await browser.close();
})();

