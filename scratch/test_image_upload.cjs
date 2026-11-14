const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 950 });
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('momentum-security-storage', JSON.stringify({
      state: { isAppLockActive: false, biometricsEnabled: false, pin: '1234' },
      version: 0
    }));
  });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const s = document.querySelector('select');
    if (s) { s.value = 'long_note_editor_dark_mode'; s.dispatchEvent(new Event('change', { bubbles: true })); }
  });
  await new Promise(r => setTimeout(r, 600));

  // Test Image insertion
  const imgInserted = await page.evaluate(async () => {
    const editor = document.querySelector('div[contenteditable="true"]');
    const input = document.querySelectorAll('input[type="file"]')[0]; // editorImageInputRef
    if (!editor || !input) return { error: 'Missing elements' };

    // Simulate file selection
    const blob = new Blob(['mock-image-data'], { type: 'image/png' });
    const file = new File([blob], 'journal_sketch.png', { type: 'image/png' });
    
    // Create DataTransfer
    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));

    await new Promise(r => setTimeout(r, 300));

    return {
      hasImgInEditor: !!editor.querySelector('img'),
      imgSrcPresent: editor.innerHTML.includes('data:image/png;base64') || !!editor.querySelector('img')?.src,
      editorHtml: editor.innerHTML
    };
  });

  console.log('Image upload test result:', imgInserted);
  await browser.close();
})();

