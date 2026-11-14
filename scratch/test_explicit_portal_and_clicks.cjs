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
  await new Promise(r => setTimeout(r, 1000));

  // 1. Verify initial hero image src
  const initialHeroSrc = await page.evaluate(() => {
    return document.querySelector('.mx-5.mb-5.rounded-3xl img')?.src;
  });
  console.log('Initial hero src:', initialHeroSrc);

  // 2. Click thumbnail 1 (2nd item in 0-indexed array)
  console.log('Clicking thumbnail index 1 (MindMap_Q4.png)...');
  await page.evaluate(() => {
    const thumbs = Array.from(document.querySelectorAll('.shrink-0.w-20.h-20'));
    if (thumbs[1]) thumbs[1].click();
  });
  await new Promise(r => setTimeout(r, 500));

  const switchedHeroSrc = await page.evaluate(() => {
    return document.querySelector('.mx-5.mb-5.rounded-3xl img')?.src;
  });
  console.log('Switched hero src after clicking thumb 1:', switchedHeroSrc);

  if (switchedHeroSrc.includes('1517842645767')) {
    console.log('PASS: Hero image src successfully updated to attachment[1].url!');
  } else {
    console.error('FAIL: Hero image src did not update to attachment[1].url');
  }

  // Click thumbnail index 2 (Sanctuary_View.jpg)
  console.log('Clicking thumbnail index 2 (Sanctuary_View.jpg)...');
  await page.evaluate(() => {
    const thumbs = Array.from(document.querySelectorAll('.shrink-0.w-20.h-20'));
    if (thumbs[2]) thumbs[2].click();
  });
  await new Promise(r => setTimeout(r, 500));

  const thumb2HeroSrc = await page.evaluate(() => {
    return document.querySelector('.mx-5.mb-5.rounded-3xl img')?.src;
  });
  console.log('Switched hero src after clicking thumb 2:', thumb2HeroSrc);
  if (thumb2HeroSrc.includes('1519681393784')) {
    console.log('PASS: Hero image src successfully updated to attachment[2].url!');
  }

  // 3. Test True Fullscreen Portal (createPortal to document.body)
  console.log('Testing Fullscreen createPortal overlay...');
  await page.evaluate(() => {
    const fsBtn = document.querySelector('button[title*="full"], button:has(svg.lucide-maximize)');
    if (fsBtn) fsBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const isPortalInBody = await page.evaluate(() => {
    const portal = document.body.querySelector('.fixed.inset-0.z-\\[100\\]');
    return portal && portal.parentElement === document.body;
  });
  console.log('Is Fullscreen Lightbox a direct child of document.body (Portal)?', isPortalInBody);

  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_true_portal_fullscreen.png') });

  // Close portal
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.fixed.inset-0.z-\\[100\\] button:has(svg.lucide-x)');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Final screenshot verifying closed state
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_closed_state.png') });

  await browser.close();
  console.log('Explicit React state, Portal, and Gallery click tests finished!');
})();

