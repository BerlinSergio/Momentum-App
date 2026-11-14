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

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // Navigate to more_dark_mode
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 600));

  // Find all cards
  const cards = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.flex.items-center.justify-between.p-4')).map(d => ({
      text: d.innerText.split('\n')[0],
      className: d.className
    }));
  });
  console.log('Cards found:', cards);

  // Click prayer card directly
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.flex.items-center.justify-between.p-4'));
    const prayer = cards.find(c => c.innerText.includes('Prayer Times'));
    console.log('Found prayer card:', !!prayer);
    if (prayer) {
      prayer.click();
    }
  });

  await new Promise(r => setTimeout(r, 500));

  const afterClick = await page.evaluate(() => {
    const s = document.querySelector('select');
    return {
      selectValue: s ? s.value : 'no-select',
      h1: document.querySelector('h1')?.innerText,
      h2: document.querySelector('h2')?.innerText,
      url: window.location.href
    };
  });
  console.log('After prayer card click:', afterClick);

  await browser.close();
})();

