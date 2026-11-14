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

  // 1. City Selection Light Mode (The exact screen from user's bug report!)
  await page.goto('http://localhost:5173/?screen=city_selection_light_mode', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'nav_audit_01_city_selection_light_top.png') });
  console.log('Saved nav_audit_01_city_selection_light_top.png');

  // Scroll down to check bottom nav interaction
  await page.evaluate(() => {
    const vp = document.querySelector('.momentum-canvas-viewport');
    if (vp) vp.scrollTo({ top: 450, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'nav_audit_02_city_selection_light_bottom.png') });
  console.log('Saved nav_audit_02_city_selection_light_bottom.png');

  // 2. City Selection Dark Mode
  await page.goto('http://localhost:5173/?screen=city_selection_dark_mode', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'nav_audit_03_city_selection_dark_top.png') });
  console.log('Saved nav_audit_03_city_selection_dark_top.png');

  await page.evaluate(() => {
    const vp = document.querySelector('.momentum-canvas-viewport');
    if (vp) vp.scrollTo({ top: 450, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'nav_audit_04_city_selection_dark_bottom.png') });
  console.log('Saved nav_audit_04_city_selection_dark_bottom.png');

  // 3. Timezone Selection Light Mode
  await page.goto('http://localhost:5173/?screen=timezone_selection_light_mode', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'nav_audit_05_timezone_selection_light_top.png') });
  console.log('Saved nav_audit_05_timezone_selection_light_top.png');

  await page.evaluate(() => {
    const vp = document.querySelector('.momentum-canvas-viewport');
    if (vp) vp.scrollTo({ top: 450, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'nav_audit_06_timezone_selection_light_bottom.png') });
  console.log('Saved nav_audit_06_timezone_selection_light_bottom.png');

  // 4. Timezone Selection Dark Mode
  await page.goto('http://localhost:5173/?screen=timezone_selection_dark_mode', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'nav_audit_07_timezone_selection_dark_top.png') });
  console.log('Saved nav_audit_07_timezone_selection_dark_top.png');

  await page.evaluate(() => {
    const vp = document.querySelector('.momentum-canvas-viewport');
    if (vp) vp.scrollTo({ top: 450, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'nav_audit_08_timezone_selection_dark_bottom.png') });
  console.log('Saved nav_audit_08_timezone_selection_dark_bottom.png');

  await browser.close();
  console.log('All audit screenshots completed successfully!');
}

run().catch(err => {
  console.error('Error running test:', err);
  process.exit(1);
});
