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

  // Switch to more_dark_mode using select
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 600));

  // 1. Click Profile Hero Card
  const profileClickRes = await page.evaluate(async () => {
    const hero = Array.from(document.querySelectorAll('div')).find(d => d.innerText.includes('Level') && d.innerText.includes('Streak'));
    if (hero) hero.click();
    await new Promise(r => setTimeout(r, 300));
    return document.querySelector('select')?.value;
  });
  console.log('Profile Hero Card click routed to:', profileClickRes);

  // Switch back to more_dark_mode
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 500));

  // 2. Click Prayer Times
  const prayerClickRes = await page.evaluate(async () => {
    const prayer = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Prayer Times & Qibla'))?.closest('.flex.items-center.justify-between.p-4');
    if (prayer) prayer.click();
    await new Promise(r => setTimeout(r, 300));
    return document.querySelector('select')?.value;
  });
  console.log('Prayer Times click routed to:', prayerClickRes);

  // Switch back to more_dark_mode
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 500));

  // 3. Click Digital Tasbeeh
  const tasbeehClickRes = await page.evaluate(async () => {
    const tasbeeh = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Digital Tasbeeh & Dhikr'))?.closest('.flex.items-center.justify-between.p-4');
    if (tasbeeh) tasbeeh.click();
    await new Promise(r => setTimeout(r, 300));
    return document.querySelector('select')?.value;
  });
  console.log('Tasbeeh click routed to:', tasbeehClickRes);

  // Switch back to more_dark_mode
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 500));

  // 4. Click Notes & Reflections
  const notesClickRes = await page.evaluate(async () => {
    const notes = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Notes & Reflections'))?.closest('.flex.items-center.justify-between.p-4');
    if (notes) notes.click();
    await new Promise(r => setTimeout(r, 300));
    return document.querySelector('select')?.value;
  });
  console.log('Notes click routed to:', notesClickRes);

  // Switch back to more_dark_mode
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 500));

  // 5. Click Calendars & Hijri Dates
  const calClickRes = await page.evaluate(async () => {
    const cal = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Calendars & Hijri Dates'))?.closest('.flex.items-center.justify-between.p-4');
    if (cal) cal.click();
    await new Promise(r => setTimeout(r, 300));
    return document.querySelector('select')?.value;
  });
  console.log('Calendars click routed to:', calClickRes);

  // Switch back to more_dark_mode
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'more_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 500));

  // 6. Click Settings & Preferences
  const settingsClickRes = await page.evaluate(async () => {
    const settings = Array.from(document.querySelectorAll('span')).find(s => s.innerText.includes('Settings & Preferences'))?.closest('.flex.items-center.justify-between.p-4');
    if (settings) settings.click();
    await new Promise(r => setTimeout(r, 300));
    return document.querySelector('select')?.value;
  });
  console.log('Settings click routed to:', settingsClickRes);

  await browser.close();
})();

