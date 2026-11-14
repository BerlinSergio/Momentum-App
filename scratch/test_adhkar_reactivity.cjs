const puppeteer = require('puppeteer');

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

  // 1. Go to more_dark_mode
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 600));

  const getAdhkarText = () => page.evaluate(() => {
    const statBoxes = document.querySelectorAll('.min-h-screen > .block.mx-5.mb-6 .grid.grid-cols-3 > div');
    return statBoxes[0] ? statBoxes[0].querySelector('span').innerText : '';
  });

  const before = parseInt(await getAdhkarText(), 10);
  console.log('Before increment in More screen:', before);

  // 2. Click the Adhkar stat box to route to tasbeeh
  await page.evaluate(() => {
    const statBoxes = document.querySelectorAll('.min-h-screen > .block.mx-5.mb-6 .grid.grid-cols-3 > div');
    if (statBoxes[0]) statBoxes[0].click();
  });
  await new Promise(r => setTimeout(r, 600));

  // 3. Click "TAP TO COUNT"
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const tapBtn = buttons.find(b => b.innerText && b.innerText.includes('TAP TO COUNT'));
    if (tapBtn) tapBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // 4. Return to More screen
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 600));

  const after = parseInt(await getAdhkarText(), 10);
  console.log('After increment in More screen:', after);

  if (after === before + 1) {
    console.log(`SUCCESS: Live Adhkar count incremented from ${before} to ${after}!`);
  } else {
    console.error(`FAILURE: Expected ${before + 1}, but got ${after}`);
    process.exit(1);
  }

  await browser.close();
})();
