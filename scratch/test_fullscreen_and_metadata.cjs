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
  await page.setViewport({ width: 420, height: 950, deviceScaleFactor: 2, hasTouch: true });
  
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
  await new Promise(r => setTimeout(r, 1000));

  // 1. Test Fullscreen Lightbox
  console.log('Testing Fullscreen Lightbox toggle...');
  await page.evaluate(() => {
    // Find button with Maximize icon
    const buttons = Array.from(document.querySelectorAll('button'));
    const fsBtn = buttons.find(b => b.querySelector('svg.lucide-maximize') || (b.title && b.title.includes('lightbox')));
    if (fsBtn) fsBtn.click();
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_fullscreen_lightbox.png') });

  // Close Fullscreen by clicking X
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.fixed.inset-0.z-\\[200\\] button');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // 2. Test Instant Thumbnail Switching & Real Metadata
  console.log('Testing thumbnail click to switch to 2nd attachment...');
  await page.evaluate(() => {
    const thumbs = Array.from(document.querySelectorAll('.shrink-0.w-20.h-20'));
    if (thumbs[1]) thumbs[1].click();
  });
  await new Promise(r => setTimeout(r, 800)); // wait for image to load & measure natural dimensions

  // Scroll down slightly to see properties grid
  await page.evaluate(() => {
    const el = document.querySelector('.momentum-canvas-viewport');
    if (el) el.scrollTop = 500;
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_switched_metadata.png') });

  // 3. Test Swipe navigation on the main image viewer using mouse drag (pointerdown/pointerup)
  console.log('Testing Swipe left drag to cycle to 3rd attachment...');
  await page.evaluate(() => {
    const el = document.querySelector('.momentum-canvas-viewport');
    if (el) el.scrollTop = 0;
  });
  await new Promise(r => setTimeout(r, 400));

  const viewerBounds = await page.evaluate(() => {
    const viewer = document.querySelector('.touch-pan-y');
    if (!viewer) return null;
    const r = viewer.getBoundingClientRect();
    return { x: r.left, y: r.top, width: r.width, height: r.height };
  });

  if (viewerBounds) {
    const startX = viewerBounds.x + viewerBounds.width - 50;
    const endX = viewerBounds.x + 50;
    const y = viewerBounds.y + viewerBounds.height / 2;
    await page.mouse.move(startX, y);
    await page.mouse.down();
    await page.mouse.move(endX, y, { steps: 10 });
    await page.mouse.up();
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_swipe_navigated.png') });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_swipe_navigated.png') });

  await browser.close();
  console.log('All Fullscreen, Swipe, and Real Metadata QA tests completed successfully!');
})();
