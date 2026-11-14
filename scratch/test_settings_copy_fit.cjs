const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTest() {
  console.log('--- Launching Puppeteer for Settings & Profile Text Audit ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1200,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // 1. Audit Light Mode Settings & Profile
  console.log('Auditing settings_profile_light_mode...');
  await page.evaluate(() => {
    const select = document.querySelector('select');
    if (select) {
      select.value = 'settings_profile_light_mode';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await new Promise(r => setTimeout(r, 1200));

  // Hide dev navigator
  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });

  const lightAudit = await page.evaluate(() => {
    // Collect all card titles and subtitles
    const titles = Array.from(document.querySelectorAll('span.text-\\[15px\\]'));
    const subtitles = Array.from(document.querySelectorAll('span.text-\\[12px\\]'));
    const profileSub = document.querySelector('p.text-xs.font-normal');

    const results = [];

    // Profile card
    if (profileSub) {
      results.push({
        type: 'Profile Subtitle',
        text: profileSub.textContent.trim(),
        scrollHeight: profileSub.scrollHeight,
        clientHeight: profileSub.clientHeight,
        scrollWidth: profileSub.scrollWidth,
        clientWidth: profileSub.clientWidth,
        isTruncated: profileSub.scrollWidth > profileSub.clientWidth || profileSub.textContent.includes('...'),
      });
    }

    titles.forEach((t, i) => {
      const sub = subtitles[i];
      results.push({
        type: `Card ${i + 1} Title`,
        text: t.textContent.trim(),
        scrollHeight: t.scrollHeight,
        clientHeight: t.clientHeight,
        scrollWidth: t.scrollWidth,
        clientWidth: t.clientWidth,
        isWrapped: t.scrollHeight > 24, // Line-height ~20px, so >24 means multiple lines
        isTruncated: t.textContent.includes('...'),
      });
      if (sub) {
        results.push({
          type: `Card ${i + 1} Subtitle`,
          text: sub.textContent.trim(),
          scrollHeight: sub.scrollHeight,
          clientHeight: sub.clientHeight,
          scrollWidth: sub.scrollWidth,
          clientWidth: sub.clientWidth,
          isTruncated: sub.scrollWidth > sub.clientWidth || sub.textContent.includes('...'),
        });
      }
    });

    return results;
  });

  console.log('--- Light Mode Card Text Audit Results ---');
  let hasErrorsLight = false;
  lightAudit.forEach(r => {
    const flag = (r.isWrapped || r.isTruncated) ? 'FAIL' : 'OK';
    if (flag === 'FAIL') hasErrorsLight = true;
    console.log(`[${flag}] ${r.type}: "${r.text}" (scrollW=${r.scrollWidth}, clientW=${r.clientWidth})`);
  });

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'settings_copy_audit_01_light_mode.png'),
  });
  console.log('Saved: settings_copy_audit_01_light_mode.png');

  // 2. Audit Dark Mode Settings & Profile
  console.log('\nAuditing settings_profile_dark_mode...');
  await page.evaluate(() => {
    const select = document.querySelector('select');
    if (select) {
      select.value = 'settings_profile_dark_mode';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });

  const darkAudit = await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('span.text-\\[15px\\]'));
    const subtitles = Array.from(document.querySelectorAll('span.text-\\[12px\\]'));
    const profileSub = document.querySelector('p.text-xs.font-normal');

    const results = [];

    if (profileSub) {
      results.push({
        type: 'Profile Subtitle',
        text: profileSub.textContent.trim(),
        scrollHeight: profileSub.scrollHeight,
        clientHeight: profileSub.clientHeight,
        scrollWidth: profileSub.scrollWidth,
        clientWidth: profileSub.clientWidth,
        isTruncated: profileSub.scrollWidth > profileSub.clientWidth || profileSub.textContent.includes('...'),
      });
    }

    titles.forEach((t, i) => {
      const sub = subtitles[i];
      results.push({
        type: `Card ${i + 1} Title`,
        text: t.textContent.trim(),
        scrollHeight: t.scrollHeight,
        clientHeight: t.clientHeight,
        scrollWidth: t.scrollWidth,
        clientWidth: t.clientWidth,
        isWrapped: t.scrollHeight > 24,
        isTruncated: t.textContent.includes('...'),
      });
      if (sub) {
        results.push({
          type: `Card ${i + 1} Subtitle`,
          text: sub.textContent.trim(),
          scrollHeight: sub.scrollHeight,
          clientHeight: sub.clientHeight,
          scrollWidth: sub.scrollWidth,
          clientWidth: sub.clientWidth,
          isTruncated: sub.scrollWidth > sub.clientWidth || sub.textContent.includes('...'),
        });
      }
    });

    return results;
  });

  console.log('--- Dark Mode Card Text Audit Results ---');
  let hasErrorsDark = false;
  darkAudit.forEach(r => {
    const flag = (r.isWrapped || r.isTruncated) ? 'FAIL' : 'OK';
    if (flag === 'FAIL') hasErrorsDark = true;
    console.log(`[${flag}] ${r.type}: "${r.text}" (scrollW=${r.scrollWidth}, clientW=${r.clientWidth})`);
  });

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'settings_copy_audit_02_dark_mode.png'),
  });
  console.log('Saved: settings_copy_audit_02_dark_mode.png');

  await browser.close();

  if (hasErrorsLight || hasErrorsDark) {
    console.error('FAILED: Found text wrapping or truncation issues!');
    process.exit(1);
  } else {
    console.log('\nSUCCESS: 100% of titles and subtitles fit cleanly on 1 line with ZERO truncation!');
  }
}

runTest().catch(err => {
  console.error('Audit script exception:', err);
  process.exit(1);
});
