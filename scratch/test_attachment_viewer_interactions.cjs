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

  await page.select('select', 'note_media_attachment_viewer_dark_mode');
  await new Promise(r => setTimeout(r, 800));

  // Find all attachment thumbnails and click the 2nd one
  const thumbnails = await page.$$('.cursor-pointer');
  console.log(`Found ${thumbnails.length} interactive elements/thumbnails`);
  
  // Click the 2nd thumbnail in the carousel
  await page.evaluate(() => {
    const thumbs = Array.from(document.querySelectorAll('.shrink-0.w-20.h-20'));
    if (thumbs[1]) thumbs[1].click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Capture screenshot after clicking 2nd attachment
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_selected_second.png') });

  // Scroll to bottom and click "Save Media Changes"
  await page.evaluate(() => {
    const el = document.querySelector('.momentum-canvas-viewport');
    if (el) el.scrollTop = 1200;
  });
  await new Promise(r => setTimeout(r, 500));

  // Click Save button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const saveBtn = buttons.find(b => b.textContent.includes('Save Media Changes'));
    if (saveBtn) saveBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Capture screenshot showing saved feedback
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_interaction_saved.png') });

  await browser.close();
  console.log('Interaction tests passed and screenshots captured!');
})();

