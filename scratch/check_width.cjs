const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2 });
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({ state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234' }, version: 0 }));
  });
  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 600));
  await page.select('select', 'more_dark_mode');
  await new Promise(r => setTimeout(r, 500));
  const widths = await page.evaluate(() => {
    const card = document.querySelector('.space-y-3 > div');
    const left = card ? card.children[0] : null;
    const textContainer = left ? left.children[1] : null;
    const subtitle = textContainer ? textContainer.children[1] : null;
    return {
      cardWidth: card ? card.getBoundingClientRect().width : null,
      leftWidth: left ? left.getBoundingClientRect().width : null,
      textContainerWidth: textContainer ? textContainer.getBoundingClientRect().width : null,
      subtitleScrollWidth: subtitle ? subtitle.scrollWidth : null,
      subtitleClientWidth: subtitle ? subtitle.clientWidth : null,
      subtitleText: subtitle ? subtitle.innerText : null
    };
  });
  console.log(widths);
  await browser.close();
})();
