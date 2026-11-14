const puppeteer = require('puppeteer');
const path = require('path');

const artDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

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

  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
  });

  for (const mode of ['dark', 'light']) {
    const route = mode === 'dark' ? 'note_media_attachment_viewer_dark_mode' : 'note_media_attachment_viewer_light_mode';
    console.log(`\n=== Testing ${mode.toUpperCase()} MODE (${route}) ===`);
    await page.select('select', route);
    await new Promise(r => setTimeout(r, 800));

    // Check 1: Storage State card is removed
    const hasStorageState = await page.evaluate(() => {
      const allText = document.body.innerText;
      return allText.includes('Storage State');
    });
    console.log(`- Contains 'Storage State': ${hasStorageState} (Expected: false)`);

    // Check 2: Download File card is present inside the grid
    const downloadCardInfo = await page.evaluate(() => {
      const allSpans = Array.from(document.querySelectorAll('span'));
      const downloadSpan = allSpans.find(s => s.innerText.trim() === 'Download File');
      if (!downloadSpan) return null;
      const card = downloadSpan.closest('.rounded-2xl');
      const hasIcon = !!card.querySelector('svg.lucide-download');
      return {
        text: card.innerText.replace(/\n/g, ' '),
        hasIcon
      };
    });
    console.log(`- Download Card Info:`, downloadCardInfo);

    // Check 3: Click Download File card and verify toast / download triggered
    console.log('- Clicking Download File card...');
    await page.evaluate(() => {
      const allSpans = Array.from(document.querySelectorAll('span'));
      const downloadSpan = allSpans.find(s => s.innerText.trim() === 'Download File');
      if (downloadSpan) {
        const card = downloadSpan.closest('.rounded-2xl');
        if (card) card.click();
      }
    });
    await new Promise(r => setTimeout(r, 300));

    const toastText = await page.evaluate(() => {
      const toastEl = document.querySelector('.fixed.top-20');
      return toastEl ? toastEl.innerText : null;
    });
    console.log(`- Toast triggered on download click: "${toastText}" (Expected: includes 'Downloading')`);

    // Capture screenshot with active download toast and card
    const screenShotPath = path.join(artDir, `attachment_viewer_download_card_${mode}.png`);
    await page.screenshot({ path: screenShotPath });
    console.log(`- Captured screenshot: ${screenShotPath}`);
  }

  await browser.close();
  console.log('\nDOWNLOAD ACTION CARD VERIFICATION COMPLETE!');
})();

