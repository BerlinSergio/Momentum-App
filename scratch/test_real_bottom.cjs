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
    const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
    devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
  });
  await new Promise(r => setTimeout(r, 600));

  // Scroll completely to bottom
  await page.evaluate(() => {
    const sc = document.querySelector('.momentum-canvas-viewport');
    sc.scrollTop = sc.scrollHeight;
  });
  await new Promise(r => setTimeout(r, 400));

  const details = await page.evaluate(() => {
    const card = document.querySelector('.note-sheet-card');
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save Note'));
    const cancelBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Cancel Draft'));
    const sc = document.querySelector('.momentum-canvas-viewport');

    const cardRect = card.getBoundingClientRect();
    const saveRect = saveBtn?.getBoundingClientRect();
    const cancelRect = cancelBtn?.getBoundingClientRect();

    return {
      cardRect: { top: cardRect.top, bottom: cardRect.bottom, height: cardRect.height },
      saveRect: saveRect ? { top: saveRect.top, bottom: saveRect.bottom } : null,
      cancelRect: cancelRect ? { top: cancelRect.top, bottom: cancelRect.bottom } : null,
      scrollTop: sc.scrollTop,
      scrollHeight: sc.scrollHeight,
      clientHeight: sc.clientHeight,
      cardClasses: card.className,
      outerClasses: card.parentElement.className
    };
  });

  console.log('Details:', JSON.stringify(details, null, 2));

  await page.screenshot({ path: 'scratch/scrolled_to_real_bottom.png' });
  await browser.close();
})();

