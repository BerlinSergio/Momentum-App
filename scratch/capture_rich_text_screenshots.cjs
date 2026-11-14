const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
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

  const artifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

  const setupView = async (screenName, scrollPos = 0) => {
    await page.evaluate(({ name, scroll }) => {
      const select = document.querySelector('select');
      if (select) {
        select.value = name;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
      devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));

      const scrollContainer = document.querySelector('.momentum-canvas-viewport');
      if (scrollContainer) scrollContainer.scrollTop = scroll;
    }, { name: screenName, scroll: scrollPos });
    await new Promise(r => setTimeout(r, 600));
  };

  // 1. Dark Mode with formatted rich text
  await setupView('long_note_editor_dark_mode', 0);

  // Apply rich text formatting: Bold on "Quranic reflection", Italic on "barakah"
  await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    editor.focus();
    const range = document.createRange();
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
    let target = null;
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.includes('Quranic reflection')) {
        target = walker.currentNode;
        break;
      }
    }
    if (target) {
      const idx = target.nodeValue.indexOf('Quranic reflection');
      range.setStart(target, idx);
      range.setEnd(target, idx + 'Quranic reflection'.length);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });
  await page.click('button[aria-label="Bold"]');
  await new Promise(r => setTimeout(r, 200));

  await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    editor.focus();
    const range = document.createRange();
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
    let target = null;
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.includes('barakah')) {
        target = walker.currentNode;
        break;
      }
    }
    if (target) {
      const idx = target.nodeValue.indexOf('barakah');
      range.setStart(target, idx);
      range.setEnd(target, idx + 'barakah'.length);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });
  await page.click('button[aria-label="Italic"]');
  await new Promise(r => setTimeout(r, 200));

  await page.screenshot({ path: path.join(artifactDir, 'note_editor_rich_text_dark.png') });
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_dark_top.png') });

  // 2. Dark mode mic active
  await page.click('button[aria-label="Record Audio"]');
  await new Promise(r => setTimeout(r, 150));
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_mic_active.png') });

  // Wait for transcription to complete
  await new Promise(r => setTimeout(r, 2200));

  // 3. Dark Mode Scrolled to bottom
  await setupView('long_note_editor_dark_mode', 450);
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_dark_scrolled.png') });

  // 4. Light Mode with formatted rich text
  await setupView('long_note_editor_light_mode', 0);
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

  await page.screenshot({ path: path.join(artifactDir, 'note_editor_rich_text_light.png') });
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_light_top.png') });

  // 5. Light Mode Scrolled to bottom
  await setupView('long_note_editor_light_mode', 450);
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_light_scrolled.png') });

  await browser.close();
  console.log('All rich text screenshots captured successfully!');
})();

