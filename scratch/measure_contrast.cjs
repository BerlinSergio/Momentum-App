const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950 });
  await page.goto('http://localhost:5173');
  await page.evaluate(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234', _hasHydrated: true },
      version: 0
    }));
  });

  for (const mode of ['dark', 'light']) {
    await page.goto('http://localhost:5173/?screen=personal_setup_' + mode + '_mode');
    await new Promise(r => setTimeout(r, 600));

    // Hide labels & text momentarily to sample the underlying background image pixels
    const bgColors = await page.evaluate(async () => {
      const labels = Array.from(document.querySelectorAll('label')).filter(l => !l.innerText.includes('DEV NAVIGATOR'));
      const p = Array.from(document.querySelectorAll('p')).find(el => el.innerText.includes('Stored locally'));
      const rects = labels.map(l => l.getBoundingClientRect());
      const pRect = p.getBoundingClientRect();
      
      // Temporarily hide text
      labels.forEach(l => l.style.visibility = 'hidden');
      p.style.visibility = 'hidden';

      return {
        labelPositions: rects.map(r => ({ x: Math.round(r.x + 20), y: Math.round(r.y + 8) })),
        disclaimerPosition: { x: Math.round(pRect.x + 20), y: Math.round(pRect.y + 6) }
      };
    });

    const screenshotBuffer = await page.screenshot({ encoding: 'base64' });

    const samples = await page.evaluate(async ({ base64, bgColors }) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + base64;
      await new Promise(r => img.onload = r);

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const getPixel = (x, y) => {
        const d = ctx.getImageData(x, y, 1, 1).data;
        return { r: d[0], g: d[1], b: d[2], hex: '#' + [d[0], d[1], d[2]].map(c => c.toString(16).padStart(2, '0')).join('') };
      };

      return {
        labelsUnderlying: bgColors.labelPositions.map(pos => ({ pos, pixel: getPixel(pos.x, pos.y) })),
        disclaimerUnderlying: { pos: bgColors.disclaimerPosition, pixel: getPixel(bgColors.disclaimerPosition.x, bgColors.disclaimerPosition.y) }
      };
    }, { base64: screenshotBuffer, bgColors });

    console.log(`\n=== Under-Text Background Colors for ${mode.toUpperCase()} MODE ===`);
    console.log('Labels background pixels:', samples.labelsUnderlying.map(l => l.pixel.hex));
    console.log('Disclaimer background pixel:', samples.disclaimerUnderlying.pixel.hex);
  }

  await browser.close();
})();

