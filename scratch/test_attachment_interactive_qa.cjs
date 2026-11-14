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

  // 1. Test Enhance button click
  console.log('Testing Enhance button...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const enhanceBtn = buttons.find(b => b.textContent.includes('Enhance'));
    if (enhanceBtn) enhanceBtn.click();
  });
  await new Promise(r => setTimeout(r, 800)); // wait for enhance to apply
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_enhanced_toast.png') });
  await new Promise(r => setTimeout(r, 2000)); // wait for toast to finish

  // 2. Test Grid tile click (Resolution copy toast)
  console.log('Testing Grid property copy click...');
  await page.evaluate(() => {
    const el = document.querySelector('.momentum-canvas-viewport');
    if (el) el.scrollTop = 500;
  });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const copyTile = document.querySelector('[title*="copy"]');
    if (copyTile) copyTile.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_grid_copied_toast.png') });
  await new Promise(r => setTimeout(r, 2000)); // wait for toast to finish

  // 3. Test Save button loading state
  console.log('Testing Save button loading...');
  await page.evaluate(() => {
    const el = document.querySelector('.momentum-canvas-viewport');
    if (el) el.scrollTop = 1200;
  });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const saveBtn = buttons.find(b => b.textContent.includes('Save Media Changes'));
    if (saveBtn) saveBtn.click();
  });
  await new Promise(r => setTimeout(r, 200)); // capture while saving
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_saving_state.png') });

  await new Promise(r => setTimeout(r, 600)); // wait for saved state
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_saved_state.png') });

  // 4. Test Remove Attachment confirmation modal dialog
  console.log('Testing Remove Attachment confirmation modal...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const deleteBtn = buttons.find(b => b.textContent.includes('Remove Attachment'));
    if (deleteBtn) deleteBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_delete_modal_dark.png') });

  // 5. Test Light Mode confirmation modal
  console.log('Testing Light Mode confirmation modal...');
  await page.select('select', 'note_media_attachment_viewer_light_mode');
  await new Promise(r => setTimeout(r, 800));
  await page.evaluate(() => {
    const el = document.querySelector('.momentum-canvas-viewport');
    if (el) el.scrollTop = 1200;
  });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const deleteBtn = buttons.find(b => b.textContent.includes('Remove Attachment'));
    if (deleteBtn) deleteBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(artDir, 'attachment_viewer_delete_modal_light.png') });

  await browser.close();
  console.log('All interactive QA tests completed successfully!');
})();
