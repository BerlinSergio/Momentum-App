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

  // Helper to set screen, hide dev overlays, and set scroll
  const setupView = async (screenName, scrollPos = 0) => {
    await page.evaluate(({ name, scroll }) => {
      const select = document.querySelector('select');
      if (select) {
        select.value = name;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      // Remove all fixed floating dev overlays
      const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
      devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));

      const scrollContainer = document.querySelector('.momentum-canvas-viewport');
      if (scrollContainer) scrollContainer.scrollTop = scroll;
    }, { name: screenName, scroll: scrollPos });
    await new Promise(r => setTimeout(r, 800));
  };

  // 1. Dark Mode Top
  await setupView('long_note_editor_dark_mode', 0);
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_dark_top.png') });

  // 2. Dark Mode Scrolled
  await setupView('long_note_editor_dark_mode', 450);
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_dark_scrolled.png') });

  // 3. Light Mode Top
  await setupView('long_note_editor_light_mode', 0);
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_light_top.png') });

  // 4. Light Mode Scrolled
  await setupView('long_note_editor_light_mode', 450);
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_light_scrolled.png') });

  await browser.close();
  console.log('Successfully captured clean Note Editor screenshots without dev overlay!');
})();
