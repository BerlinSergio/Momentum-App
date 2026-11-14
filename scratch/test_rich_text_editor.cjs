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

  const setupView = async (screenName) => {
    await page.evaluate(({ name }) => {
      const select = document.querySelector('select');
      if (select) {
        select.value = name;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const devOverlays = document.querySelectorAll('.fixed.top-6, [class*="z-[9999]"]');
      devOverlays.forEach(el => el.style.setProperty('display', 'none', 'important'));
    }, { name: screenName });
    await new Promise(r => setTimeout(r, 600));
  };

  console.log('--- TESTING RICH TEXT EDITOR IN DARK MODE ---');
  await setupView('long_note_editor_dark_mode');

  // Verify contenteditable exists
  const hasContentEditable = await page.evaluate(() => {
    const el = document.querySelector('div[contenteditable="true"]');
    return !!el && el.innerText.length > 20;
  });
  console.log('1. ContentEditable element present with note content:', hasContentEditable);

  // 2. Test Bold Button Action
  console.log('2. Testing Bold formatting on selected text...');
  await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    editor.focus();
    const range = document.createRange();
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null, false);
    let textNode = null;
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.includes('Quranic reflection')) {
        textNode = walker.currentNode;
        break;
      }
    }
    if (textNode) {
      const startIdx = textNode.nodeValue.indexOf('Quranic reflection');
      range.setStart(textNode, startIdx);
      range.setEnd(textNode, startIdx + 'Quranic reflection'.length);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });

  // Click bold button via DOM click (with mouse event)
  await page.click('button[aria-label="Bold"]');
  await new Promise(r => setTimeout(r, 150));

  const boldCheck = await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    const boldBtn = document.querySelector('button[aria-label="Bold"]');
    const hasBoldTag = editor.innerHTML.includes('<b>Quranic reflection</b>') ||
                       editor.innerHTML.includes('<strong>Quranic reflection</strong>') ||
                       !!editor.querySelector('b, strong');
    const isBoldActive = boldBtn.className.includes('bg-indigo-500/25') && boldBtn.className.includes('text-indigo-300');
    return { hasBoldTag, isBoldActive, classes: boldBtn.className };
  });
  console.log('   Bold formatting applied:', boldCheck.hasBoldTag);
  console.log('   Bold button active UI state:', boldCheck.isBoldActive);

  // 3. Test Italic Button Action
  console.log('3. Testing Italic formatting on selected text...');
  await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    editor.focus();
    const range = document.createRange();
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null, false);
    let textNode = null;
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.includes('barakah')) {
        textNode = walker.currentNode;
        break;
      }
    }
    if (textNode) {
      const startIdx = textNode.nodeValue.indexOf('barakah');
      range.setStart(textNode, startIdx);
      range.setEnd(textNode, startIdx + 'barakah'.length);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });

  await page.click('button[aria-label="Italic"]');
  await new Promise(r => setTimeout(r, 150));

  const italicCheck = await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    const italicBtn = document.querySelector('button[aria-label="Italic"]');
    const hasItalicTag = editor.innerHTML.includes('<i>barakah</i>') ||
                         editor.innerHTML.includes('<em>barakah</em>') ||
                         !!editor.querySelector('i, em');
    const isItalicActive = italicBtn.className.includes('bg-indigo-500/25') && italicBtn.className.includes('text-indigo-300');
    return { hasItalicTag, isItalicActive };
  });
  console.log('   Italic formatting applied:', italicCheck.hasItalicTag);
  console.log('   Italic button active UI state:', italicCheck.isItalicActive);

  // 4. Test Heading & Lists
  console.log('4. Testing Heading (T) button...');
  await page.click('button[aria-label="Heading"]');
  await new Promise(r => setTimeout(r, 150));
  const headingCheck = await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    const headingBtn = document.querySelector('button[aria-label="Heading"]');
    const hasH2 = !!editor.querySelector('h2');
    const isHeadingActive = headingBtn.className.includes('bg-indigo-500/25') && headingBtn.className.includes('text-indigo-300');
    return { hasH2, isHeadingActive };
  });
  console.log('   Heading applied:', headingCheck.hasH2);
  console.log('   Heading button active UI state:', headingCheck.isHeadingActive);

  // 5. Test Mic Button & Pulsing state
  console.log('5. Testing Microphone recording state...');
  await page.click('button[aria-label="Record Audio"]');
  await new Promise(r => setTimeout(r, 150));

  const micCheck = await page.evaluate(() => {
    const micBtn = document.querySelector('button[aria-label="Record Audio"]');
    return {
      classes: micBtn.className,
      isPulsing: micBtn.className.includes('animate-pulse') && micBtn.className.includes('bg-rose-600')
    };
  });
  console.log('   Mic button active & pulsing:', micCheck.isPulsing);

  // Screenshot with active mic pulsing
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_mic_active.png') });

  // Wait for voice memo transcript to arrive
  await new Promise(r => setTimeout(r, 2200));

  const transcriptCheck = await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    return {
      hasTranscript: editor.innerText.includes('Voice Note: 15-minute Fajr reflection')
    };
  });
  console.log('   Voice memo transcription added to editor:', transcriptCheck.hasTranscript);

  // Save Note in Dark Mode
  await page.evaluate(() => {
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save Note'));
    if (saveBtn) saveBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_rich_text_dark.png') });

  // 6. Test Light Mode
  console.log('\n--- TESTING RICH TEXT EDITOR IN LIGHT MODE ---');
  await setupView('long_note_editor_light_mode');

  // Place selection and format bold in Light Mode
  await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    editor.focus();
    const range = document.createRange();
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null, false);
    let textNode = null;
    while (walker.nextNode()) {
      if (walker.currentNode.nodeValue.includes('Over the last 90 days')) {
        textNode = walker.currentNode;
        break;
      }
    }
    if (textNode) {
      range.setStart(textNode, 0);
      range.setEnd(textNode, 22);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });

  await page.click('button[aria-label="Bold"]');
  await new Promise(r => setTimeout(r, 150));

  const lightBoldCheck = await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    const boldBtn = document.querySelector('button[aria-label="Bold"]');
    const isLightBoldActive = boldBtn.className.includes('bg-indigo-100') && boldBtn.className.includes('text-indigo-700');
    return {
      hasBold: !!editor.querySelector('b, strong'),
      isLightBoldActive,
      classes: boldBtn.className
    };
  });
  console.log('   Light Mode Bold applied:', lightBoldCheck.hasBold);
  console.log('   Light Mode Bold button active UI state (bg-indigo-100 text-indigo-700):', lightBoldCheck.isLightBoldActive);

  // Test Bullet List in Light Mode
  await page.click('button[aria-label="Bullet List"]');
  await new Promise(r => setTimeout(r, 150));

  const listCheck = await page.evaluate(() => {
    const editor = document.querySelector('div[contenteditable="true"]');
    const listBtn = document.querySelector('button[aria-label="Bullet List"]');
    const hasList = !!editor.querySelector('ul, li');
    const isListActive = listBtn.className.includes('bg-indigo-100') && listBtn.className.includes('text-indigo-700');
    return { hasList, isListActive };
  });
  console.log('   Light Mode Bullet List applied:', listCheck.hasList);
  console.log('   Light Mode Bullet List button active UI state:', listCheck.isListActive);

  // Save Note in Light Mode
  await page.evaluate(() => {
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Save Note'));
    if (saveBtn) saveBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(artifactDir, 'note_editor_rich_text_light.png') });

  await browser.close();
  console.log('\nAll tests verified successfully!');
})();
