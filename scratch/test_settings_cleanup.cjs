const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTest() {
  console.log('--- Launching Puppeteer for Settings & Profile Clean Audit ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1200,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // 1. Audit Light Mode
  console.log('Auditing settings_profile_light_mode...');
  await page.evaluate(() => {
    const select = document.querySelector('select');
    if (select) {
      select.value = 'settings_profile_light_mode';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });

  const lightAudit = await page.evaluate(() => {
    const bodyText = document.body.innerText;
    const hasDataBackup = bodyText.includes('Data & Backup') || bodyText.includes('DATA & BACKUP');
    const hasCloudSync = bodyText.includes('Cloud Synchronization');
    const hasExportArchive = bodyText.includes('Export Encrypted Archive');
    const hasClearDb = bodyText.includes('Clear Local Database');

    const titles = Array.from(document.querySelectorAll('span.text-\\[15px\\]'));
    const subtitles = Array.from(document.querySelectorAll('span.text-\\[12px\\]'));
    const profileSub = document.querySelector('p.text-xs.font-normal');

    const cards = titles.map((t, i) => {
      const sub = subtitles[i];
      return {
        title: t.textContent.trim(),
        titleWrapped: t.scrollHeight > 24,
        titleTruncated: t.textContent.includes('...'),
        subtitle: sub ? sub.textContent.trim() : null,
        subtitleTruncated: sub ? (sub.scrollWidth > sub.clientWidth || sub.textContent.includes('...')) : false,
      };
    });

    return {
      hasDataBackup,
      hasCloudSync,
      hasExportArchive,
      hasClearDb,
      cardCount: titles.length,
      profileSub: profileSub ? profileSub.textContent.trim() : null,
      profileSubTruncated: profileSub ? (profileSub.scrollWidth > profileSub.clientWidth || profileSub.textContent.includes('...')) : false,
      cards,
    };
  });

  console.log('--- Light Mode Results ---');
  console.log('Data & Backup section present:', lightAudit.hasDataBackup);
  console.log('Card count:', lightAudit.cardCount);
  console.log('Profile Subtitle:', lightAudit.profileSub, 'Truncated:', lightAudit.profileSubTruncated);
  lightAudit.cards.forEach((c, idx) => {
    console.log(`Card ${idx + 1}: "${c.title}" -> "${c.subtitle}" (TitleWrap=${c.titleWrapped}, SubTrunc=${c.subtitleTruncated})`);
  });

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'settings_cleaned_01_light_mode.png'),
  });
  console.log('Saved: settings_cleaned_01_light_mode.png');

  // 2. Audit Dark Mode
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
    const bodyText = document.body.innerText;
    const hasDataBackup = bodyText.includes('Data & Backup') || bodyText.includes('DATA & BACKUP');
    const hasCloudSync = bodyText.includes('Cloud Synchronization');
    const hasExportArchive = bodyText.includes('Export Encrypted Archive');
    const hasClearDb = bodyText.includes('Clear Local Database');

    const titles = Array.from(document.querySelectorAll('span.text-\\[15px\\]'));
    const subtitles = Array.from(document.querySelectorAll('span.text-\\[12px\\]'));
    const profileSub = document.querySelector('p.text-xs.font-normal');

    const cards = titles.map((t, i) => {
      const sub = subtitles[i];
      return {
        title: t.textContent.trim(),
        titleWrapped: t.scrollHeight > 24,
        titleTruncated: t.textContent.includes('...'),
        subtitle: sub ? sub.textContent.trim() : null,
        subtitleTruncated: sub ? (sub.scrollWidth > sub.clientWidth || sub.textContent.includes('...')) : false,
      };
    });

    return {
      hasDataBackup,
      hasCloudSync,
      hasExportArchive,
      hasClearDb,
      cardCount: titles.length,
      profileSub: profileSub ? profileSub.textContent.trim() : null,
      profileSubTruncated: profileSub ? (profileSub.scrollWidth > profileSub.clientWidth || profileSub.textContent.includes('...')) : false,
      cards,
    };
  });

  console.log('--- Dark Mode Results ---');
  console.log('Data & Backup section present:', darkAudit.hasDataBackup);
  console.log('Card count:', darkAudit.cardCount);
  console.log('Profile Subtitle:', darkAudit.profileSub, 'Truncated:', darkAudit.profileSubTruncated);
  darkAudit.cards.forEach((c, idx) => {
    console.log(`Card ${idx + 1}: "${c.title}" -> "${c.subtitle}" (TitleWrap=${c.titleWrapped}, SubTrunc=${c.subtitleTruncated})`);
  });

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'settings_cleaned_02_dark_mode.png'),
  });
  console.log('Saved: settings_cleaned_02_dark_mode.png');

  await browser.close();

  const failed = lightAudit.hasDataBackup || darkAudit.hasDataBackup || lightAudit.cardCount !== 5 || darkAudit.cardCount !== 5 ||
    lightAudit.cards.some(c => c.titleWrapped || c.titleTruncated || c.subtitleTruncated) ||
    darkAudit.cards.some(c => c.titleWrapped || c.titleTruncated || c.subtitleTruncated);

  if (failed) {
    console.error('FAILED: Verification checks did not pass!');
    process.exit(1);
  } else {
    console.log('\nSUCCESS: DATA & BACKUP completely removed, exactly 5 cards remain with zero wrapping and zero truncation!');
  }
}

runTest().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
