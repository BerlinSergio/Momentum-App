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

  await page.select('select', 'more_dark_mode');
  await new Promise(r => setTimeout(r, 600));

  const darkAudit = await page.evaluate(() => {
    const sectionHeader = Array.from(document.querySelectorAll('span')).find(s => s.innerText.trim() === 'ECOSYSTEM ESSENTIALS');
    const listContainer = sectionHeader ? sectionHeader.closest('.flex').nextElementSibling : null;
    if (!listContainer) return { error: 'List container not found' };
    
    const items = Array.from(listContainer.children).map((card, idx) => {
      const leftSection = card.children[0];
      const icon = leftSection ? leftSection.children[0] : null;
      const textContainer = leftSection ? leftSection.children[1] : null;
      const title = textContainer ? textContainer.children[0] : null;
      const subtitle = textContainer ? textContainer.children[1] : null;
      const trailing = card.children[1];

      return {
        idx,
        cardClass: card.className,
        cardRect: { width: card.getBoundingClientRect().width, height: card.getBoundingClientRect().height },
        leftClass: leftSection ? leftSection.className : null,
        textClass: textContainer ? textContainer.className : null,
        title: title ? { text: title.innerText, class: title.className, computedFontSize: window.getComputedStyle(title).fontSize } : null,
        subtitle: subtitle ? { text: subtitle.innerText, class: subtitle.className, computedFontSize: window.getComputedStyle(subtitle).fontSize } : null,
        trailingClass: trailing ? trailing.className : null
      };
    });
    return { items };
  });

  console.log('Dark mode audit:\n', JSON.stringify(darkAudit, null, 2));

  await page.screenshot({ path: path.join(artDir, 'more_screen_dark.png') });

  await page.select('select', 'more_light_mode');
  await new Promise(r => setTimeout(r, 600));

  const lightAudit = await page.evaluate(() => {
    const sectionHeader = Array.from(document.querySelectorAll('span')).find(s => s.innerText.trim() === 'ECOSYSTEM ESSENTIALS');
    const listContainer = sectionHeader ? sectionHeader.closest('.flex').nextElementSibling : null;
    if (!listContainer) return { error: 'List container not found' };
    
    const items = Array.from(listContainer.children).map((card, idx) => {
      const leftSection = card.children[0];
      const textContainer = leftSection ? leftSection.children[1] : null;
      const title = textContainer ? textContainer.children[0] : null;
      const subtitle = textContainer ? textContainer.children[1] : null;
      return {
        idx,
        title: title ? { text: title.innerText, class: title.className, computedFontSize: window.getComputedStyle(title).fontSize } : null,
        subtitle: subtitle ? { text: subtitle.innerText, class: subtitle.className, computedFontSize: window.getComputedStyle(subtitle).fontSize } : null,
      };
    });
    return { items };
  });

  console.log('Light mode audit:\n', JSON.stringify(lightAudit, null, 2));

  await page.screenshot({ path: path.join(artDir, 'more_screen_light.png') });

  await browser.close();
  console.log('Audit and screenshots finished successfully.');
})();

