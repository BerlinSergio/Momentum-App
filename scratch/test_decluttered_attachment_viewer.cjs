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

    // Check 1: MEDIA VIEWER bar is removed
    const mediaViewerText = await page.evaluate(() => {
      const allText = document.body.innerText;
      return allText.includes('MEDIA VIEWER');
    });
    console.log(`- Contains 'MEDIA VIEWER' bar text: ${mediaViewerText} (Expected: false)`);

    // Check 2: Floating Cloud Synced badge above the grid is removed
    const headerBadges = await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll('h2'));
      const assetPropHeader = headers.find(h => h.innerText.includes('Asset Properties'));
      if (!assetPropHeader) return null;
      const parent = assetPropHeader.parentElement;
      return parent ? parent.innerText : null;
    });
    console.log(`- Asset Properties header container text: "${headerBadges}" (Expected only 'Asset Properties')`);

    // Check 3: Storage State inside grid is present
    const storageStateItem = await page.evaluate(() => {
      const allSpans = Array.from(document.querySelectorAll('span'));
      const storageSpan = allSpans.find(s => s.innerText.trim() === 'Storage State');
      if (!storageSpan) return null;
      return storageSpan.closest('.rounded-2xl')?.innerText.replace(/\n/g, ' ');
    });
    console.log(`- Storage State grid item content: "${storageStateItem}"`);

    // Take screenshot of decluttered screen
    const screenShotPath = path.join(artDir, `attachment_viewer_decluttered_${mode}.png`);
    await page.screenshot({ path: screenShotPath });
    console.log(`- Captured screenshot: ${screenShotPath}`);
  }

  // Also verify fullscreen modal still works smoothly
  console.log('\n=== Testing Fullscreen Modal Interaction ===');
  await page.evaluate(() => {
    const fsBtn = document.querySelector('button[title*="full"], button:has(svg.lucide-maximize)');
    if (fsBtn) fsBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const isPortalOpen = await page.evaluate(() => {
    const portal = document.body.querySelector('.fixed.inset-0.z-\\[100\\]');
    return portal && portal.parentElement === document.body;
  });
  console.log(`- Fullscreen portal open and direct child of document.body: ${isPortalOpen} (Expected: true)`);
  const fsShotPath = path.join(artDir, 'attachment_viewer_decluttered_fullscreen.png');
  await page.screenshot({ path: fsShotPath });
  console.log(`- Captured fullscreen screenshot: ${fsShotPath}`);

  await browser.close();
  console.log('\nALL VERIFICATIONS COMPLETE!');
})();
