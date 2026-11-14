const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const artifactDir = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

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

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // 1. Light Mode Verification
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'long_note_editor_light_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
    devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
  });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to bottom
  await page.evaluate(() => {
    const sc = document.querySelector('.momentum-canvas-viewport');
    if (sc) sc.scrollTop = sc.scrollHeight;
  });
  await new Promise(r => setTimeout(r, 400));

  const lightInspection = await page.evaluate(() => {
    const card = document.querySelector('.note-sheet-card');
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save Note'));
    const cancelBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Cancel Draft'));
    const sc = document.querySelector('.momentum-canvas-viewport');

    const cardRect = card ? card.getBoundingClientRect() : null;
    const saveRect = saveBtn ? saveBtn.getBoundingClientRect() : null;
    const cancelRect = cancelBtn ? cancelBtn.getBoundingClientRect() : null;

    const isSaveInside = card && saveBtn && card.contains(saveBtn);
    const isCancelInside = card && cancelBtn && card.contains(cancelBtn);

    return {
      isSaveInside,
      isCancelInside,
      cardClasses: card ? card.className : '',
      cardBottom: cardRect ? cardRect.bottom : null,
      saveBottom: saveRect ? saveRect.bottom : null,
      cancelBottom: cancelRect ? cancelRect.bottom : null,
      cardPaddingBottomEnclosed: cardRect && cancelRect ? (cardRect.bottom >= cancelRect.bottom) : false
    };
  });

  console.log('Light Mode Inspection:', JSON.stringify(lightInspection, null, 2));

  const lightShotPath = path.join(artifactDir, 'note_editor_light_scrolled.png');
  await page.screenshot({ path: lightShotPath });
  console.log('Saved Light screenshot to', lightShotPath);

  // 2. Dark Mode Verification
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'long_note_editor_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
    const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
    devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
  });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to bottom
  await page.evaluate(() => {
    const sc = document.querySelector('.momentum-canvas-viewport');
    if (sc) sc.scrollTop = sc.scrollHeight;
  });
  await new Promise(r => setTimeout(r, 400));

  const darkInspection = await page.evaluate(() => {
    const card = document.querySelector('.note-sheet-card');
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save Note'));
    const cancelBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Cancel Draft'));

    const cardRect = card ? card.getBoundingClientRect() : null;
    const saveRect = saveBtn ? saveBtn.getBoundingClientRect() : null;
    const cancelRect = cancelBtn ? cancelBtn.getBoundingClientRect() : null;

    const isSaveInside = card && saveBtn && card.contains(saveBtn);
    const isCancelInside = card && cancelBtn && card.contains(cancelBtn);

    return {
      isSaveInside,
      isCancelInside,
      cardClasses: card ? card.className : '',
      cardBottom: cardRect ? cardRect.bottom : null,
      saveBottom: saveRect ? saveRect.bottom : null,
      cancelBottom: cancelRect ? cancelRect.bottom : null,
      cardPaddingBottomEnclosed: cardRect && cancelRect ? (cardRect.bottom >= cancelRect.bottom) : false
    };
  });

  console.log('Dark Mode Inspection:', JSON.stringify(darkInspection, null, 2));

  const darkShotPath = path.join(artifactDir, 'note_editor_dark_scrolled.png');
  await page.screenshot({ path: darkShotPath });
  console.log('Saved Dark screenshot to', darkShotPath);

  // 3. Test "Save Note" interactivity
  const saveTest = await page.evaluate(async () => {
    const titleInput = document.querySelector('input[placeholder="Note title..."]');
    if (titleInput) {
      titleInput.value = 'Updated Habit synthesis test';
      titleInput.dispatchEvent(new Event('input', { bubbles: true }));
      titleInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save Note'));
    if (saveBtn) {
      saveBtn.click();
    }

    await new Promise(r => setTimeout(r, 200));

    // Check notes storage in localStorage
    const raw = localStorage.getItem('momentum-notes-storage');
    const parsed = raw ? JSON.parse(raw) : null;
    const note4 = parsed?.state?.notes?.find(n => n.id === 'note-4');

    return {
      noteSavedTitle: note4 ? note4.title : null,
      savedAt: note4 ? note4.savedAt : null
    };
  });

  console.log('Save Note Test Result:', JSON.stringify(saveTest, null, 2));

  await browser.close();
  console.log('Verification Complete!');
})();

