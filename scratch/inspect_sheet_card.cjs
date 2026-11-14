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
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'long_note_editor_light_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 600));

  const info = await page.evaluate(() => {
    const card = document.querySelector('.note-sheet-card');
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save Note'));
    const btnContainer = saveBtn?.parentElement;
    
    const cardRect = card?.getBoundingClientRect();
    const btnRect = saveBtn?.getBoundingClientRect();
    const containerRect = btnContainer?.getBoundingClientRect();
    
    // Check background color and parentage
    const isInside = card?.contains(saveBtn);
    const cardBg = card ? window.getComputedStyle(card).backgroundColor : null;
    const parentOfContainer = btnContainer?.parentElement?.className;

    // Check viewport scroll height
    const scrollContainer = document.querySelector('.momentum-canvas-viewport');
    
    return {
      cardRect,
      btnRect,
      containerRect,
      isInside,
      cardBg,
      parentOfContainer,
      scrollTop: scrollContainer?.scrollTop,
      scrollHeight: scrollContainer?.scrollHeight,
      clientHeight: scrollContainer?.clientHeight
    };
  });

  console.log(info);
  await browser.close();
})();

