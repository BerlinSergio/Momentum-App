const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

  for (const mode of ['dark', 'light']) {
    const route = mode === 'dark' ? 'prayer_times_dark_mode' : 'prayer_times_light_mode';
    await page.goto(`http://localhost:5173/?screen=${route}`);
    await new Promise(r => setTimeout(r, 800));

    await page.evaluate(() => {
      document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
      const canvas = document.querySelector('.momentum-canvas-viewport');
      if (canvas) canvas.scrollTop = 550;
    });

    await new Promise(r => setTimeout(r, 300));
    const filename = `C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753\\prayer_times_bottom_widgets_${mode}.png`;
    await page.screenshot({ path: filename });
    console.log(`Saved screenshot: ${filename}`);
  }

  await browser.close();
})();

