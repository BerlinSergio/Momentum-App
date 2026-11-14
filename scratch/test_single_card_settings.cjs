const puppeteer = require('puppeteer');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753';

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=440,960']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 440, height: 960, deviceScaleFactor: 2 });

  // 1. Settings Profile Dark Mode (Top & Bottom)
  await page.goto('http://localhost:5173/?screen=settings_profile_dark_mode', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    // Hide dev navigator overlay for clean phone screenshots
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clean_01_settings_dark_top.png') });
  console.log('Saved clean_01_settings_dark_top.png');

  // Scroll inner viewport down
  await page.evaluate(() => {
    const vp = document.querySelector('.momentum-canvas-viewport');
    if (vp) vp.scrollTo({ top: 480, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clean_02_settings_dark_bottom.png') });
  console.log('Saved clean_02_settings_dark_bottom.png');

  // 2. Settings Profile Light Mode (Top & Bottom)
  await page.goto('http://localhost:5173/?screen=settings_profile_light_mode', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clean_03_settings_light_top.png') });
  console.log('Saved clean_03_settings_light_top.png');

  // Scroll inner viewport down
  await page.evaluate(() => {
    const vp = document.querySelector('.momentum-canvas-viewport');
    if (vp) vp.scrollTo({ top: 480, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clean_04_settings_light_bottom.png') });
  console.log('Saved clean_04_settings_light_bottom.png');

  // 3. More Dark Mode (Clean)
  await page.goto('http://localhost:5173/?screen=more_dark_mode', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'clean_05_more_dark.png') });
  console.log('Saved clean_05_more_dark.png');

  await browser.close();
  console.log('Clean screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error running test:', err);
  process.exit(1);
});
