const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950 });
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

  await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    editor.focus();
    const range = document.createRange();
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
    let target = null;
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.includes('cognitive clarity')) {
        target = walker.currentNode;
        break;
      }
    }
    if (target) {
      const idx = target.nodeValue.indexOf('cognitive clarity');
      range.setStart(target, idx);
      range.setEnd(target, idx + 17);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });

  await page.click('button[aria-label="Bold"]');
  await new Promise(r => setTimeout(r, 200));

  const res = await page.evaluate(() => {
    const boldBtn = document.querySelector('button[aria-label="Bold"]');
    const editor = document.querySelector('div[contenteditable="true"]');
    return {
      classes: boldBtn.className,
      isActive: boldBtn.className.includes('bg-indigo-100') && boldBtn.className.includes('text-indigo-700'),
      hasBoldTag: !!editor.querySelector('b, strong')
    };
  });
  console.log('Light Mode Fresh Bold Active Result:', res);
  await browser.close();
})();
