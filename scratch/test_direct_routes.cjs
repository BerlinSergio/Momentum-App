const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });

  await page.goto('http://localhost:5173?screen=more_dark_mode', { waitUntil: 'networkidle2' });

  // Let's inspect activeTab
  const initial = await page.evaluate(() => {
    return {
      selectValue: document.querySelector('select')?.value,
      url: window.location.href,
      h1: document.querySelector('h1')?.innerText
    };
  });
  console.log('Initial state:', initial);

  // Click on "Income & Cashflow"
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Income & Cashflow'));
    el?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const afterIncome = await page.evaluate(() => {
    return {
      selectValue: document.querySelector('select')?.value,
      url: window.location.href,
      h1: document.querySelector('h1')?.innerText,
      h2: document.querySelector('h2')?.innerText
    };
  });
  console.log('After Income & Cashflow click:', afterIncome);

  // Go back using browser back or setting screen
  await page.goto('http://localhost:5173?screen=more_dark_mode', { waitUntil: 'networkidle2' });

  // Click on "Prayer Times & Qibla"
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Prayer Times & Qibla'));
    el?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const afterPrayer = await page.evaluate(() => {
    return {
      selectValue: document.querySelector('select')?.value,
      url: window.location.href,
      h1: document.querySelector('h1')?.innerText
    };
  });
  console.log('After Prayer Times click:', afterPrayer);

  // Go back
  await page.goto('http://localhost:5173?screen=more_dark_mode', { waitUntil: 'networkidle2' });

  // Click on "Digital Tasbeeh & Dhikr"
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Digital Tasbeeh & Dhikr'));
    el?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const afterTasbeeh = await page.evaluate(() => {
    return {
      selectValue: document.querySelector('select')?.value,
      url: window.location.href,
      h1: document.querySelector('h1')?.innerText
    };
  });
  console.log('After Tasbeeh click:', afterTasbeeh);

  // Go back
  await page.goto('http://localhost:5173?screen=more_dark_mode', { waitUntil: 'networkidle2' });

  // Click on "Calendars & Hijri Dates"
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Calendars & Hijri Dates'));
    el?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const afterCal = await page.evaluate(() => {
    return {
      selectValue: document.querySelector('select')?.value,
      url: window.location.href,
      h1: document.querySelector('h1')?.innerText
    };
  });
  console.log('After Calendars click:', afterCal);

  // Go back
  await page.goto('http://localhost:5173?screen=more_dark_mode', { waitUntil: 'networkidle2' });

  // Click on "Settings & Preferences"
  await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Settings & Preferences'));
    el?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const afterSettings = await page.evaluate(() => {
    return {
      selectValue: document.querySelector('select')?.value,
      url: window.location.href,
      h1: document.querySelector('h1')?.innerText
    };
  });
  console.log('After Settings click:', afterSettings);

  // Go back
  await page.goto('http://localhost:5173?screen=more_dark_mode', { waitUntil: 'networkidle2' });

  // Click on Profile Card
  await page.evaluate(() => {
    const el = document.querySelector('.block.mx-5.mb-6.p-5');
    el?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const afterProfile = await page.evaluate(() => {
    return {
      selectValue: document.querySelector('select')?.value,
      url: window.location.href,
      h1: document.querySelector('h1')?.innerText
    };
  });
  console.log('After Profile Card click:', afterProfile);

  await browser.close();
})();

