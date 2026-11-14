const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/?screen=notes_main_dark_mode');
    await new Promise(r => setTimeout(r, 1000));
    const title = await page.evaluate(() => document.title || document.body.innerText.slice(0, 50));
    console.log('Success! Title or first text:', title);
    await browser.close();
  } catch (err) {
    console.error('Error:', err);
  }
})();
