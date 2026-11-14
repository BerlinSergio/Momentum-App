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
  
  // Disable AppLock and configure initial state
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234' },
      version: 0
    }));
    localStorage.setItem('momentum-profile-storage', JSON.stringify({
      state: {
        fullName: 'Milad Wardak',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bio: 'Mindful productivity seeker'
      },
      version: 0
    }));
  });

  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]').forEach(el => el.style.setProperty('display', 'none', 'important'));
  });

  // Dark Mode Top
  await page.select('select', 'note_media_attachment_viewer_dark_mode');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_dark_top.png') });

  // Dark Mode Bottom (scrolled down to view properties and action buttons with navbar)
  await page.evaluate(() => {
    const el = document.querySelector('.momentum-canvas-viewport');
    if (el) el.scrollTop = 1200;
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_dark_bottom.png') });

  // Light Mode Top
  await page.evaluate(() => {
    const el = document.querySelector('.momentum-canvas-viewport');
    if (el) el.scrollTop = 0;
  });
  await page.select('select', 'note_media_attachment_viewer_light_mode');
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_light_top.png') });

  // Light Mode Bottom
  await page.evaluate(() => {
    const el = document.querySelector('.momentum-canvas-viewport');
    if (el) el.scrollTop = 1200;
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_light_bottom.png') });

  await browser.close();
  console.log('Attachment viewer screenshots saved successfully!');
})();
