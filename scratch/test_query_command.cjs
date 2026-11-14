const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent('<div contenteditable="true" id="ed">Hello <b>world</b> this is text</div>');
  const res = await page.evaluate(() => {
    const ed = document.getElementById('ed');
    ed.focus();
    const bNode = ed.querySelector('b').firstChild;
    const range = document.createRange();
    range.setStart(bNode, 1);
    range.setEnd(bNode, 3);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    return {
      queryBold: document.queryCommandState('bold'),
      isInsideB: !!sel.anchorNode.parentElement.closest('b, strong')
    };
  });
  console.log('Result:', res);
  await browser.close();
})();

