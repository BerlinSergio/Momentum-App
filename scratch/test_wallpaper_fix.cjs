const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTest() {
  console.log('--- Launching Puppeteer for Background Library Test ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1200,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });

  // Clear previous test keys if needed
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  // TEST 1: Inspect Background Wallpaper Library (Light Mode)
  console.log('Navigating to background_wallpaper_library_light_mode...');
  await page.evaluate(() => {
    // Switch to light mode and navigate
    const themeStore = window.useThemeStore || window.__themeStore;
    const navStore = window.useNavigationStore || window.__navigationStore;
    // Set active tab
    localStorage.setItem('momentum_active_tab', 'background_wallpaper_library_light_mode');
    window.location.hash = '#background_wallpaper_library_light_mode';
  });

  // Navigate directly via UI Dev Navigator
  await page.evaluate(() => {
    const select = document.querySelector('select');
    if (select) {
      select.value = 'background_wallpaper_library_light_mode';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await new Promise(r => setTimeout(r, 1500));

  // Hide dev navigator from blocking viewport
  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });

  // Verify built-in wallpapers
  const cardsData = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.grid.grid-cols-2 > div'));
    return cards.map((card, i) => {
      const img = card.querySelector('img');
      const title = card.querySelector('h4')?.textContent?.trim();
      const imgContainer = card.querySelector('div.relative.w-full.aspect-\\[4\\/3\\]');
      const bg = imgContainer ? window.getComputedStyle(imgContainer).background : '';
      return {
        index: i,
        title,
        hasImg: !!img,
        imgSrc: img ? img.src : null,
        imgComplete: img ? img.complete : false,
        imgNaturalWidth: img ? img.naturalWidth : 0,
        containerBg: bg,
      };
    });
  });

  console.log(`Found ${cardsData.length} cards in Master Collection:`);
  cardsData.forEach(c => {
    console.log(` - ${c.title}: Img=${c.hasImg}, Complete=${c.imgComplete}, NatW=${c.imgNaturalWidth}`);
  });

  // Screenshot 1: Light Mode Background Library Top
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'wallpaper_audit_01_library_light.png'),
  });
  console.log('Saved: wallpaper_audit_01_library_light.png');

  // TEST 2: Select "No Wallpaper (Pure Minimal)"
  console.log('Selecting "No Wallpaper (Pure Minimal)"...');
  await page.evaluate(() => {
    const card = document.getElementById('pure-minimal-card');
    if (card) {
      card.click();
    }
  });

  await new Promise(r => setTimeout(r, 1000));

  const pureMinimalState = await page.evaluate(() => {
    const raw = localStorage.getItem('momentum_appearance_settings_v1');
    const parsed = raw ? JSON.parse(raw) : null;
    const heroTitle = document.querySelector('h3.text-headline-md')?.textContent?.trim();
    // Check canvas solid background
    const canvasDiv = document.querySelector('.momentum-canvas-viewport')?.parentElement?.querySelector('.absolute.inset-0.z-0');
    const canvasBg = canvasDiv ? window.getComputedStyle(canvasDiv).backgroundColor : '';
    // Check adjust blur button
    const blurBtn = document.querySelector('button[title*="disabled"]');
    return {
      activeBackgroundId: parsed?.state?.activeBackgroundId,
      heroTitle,
      canvasBg,
      hasDisabledBlurBtn: !!blurBtn,
    };
  });

  console.log('Pure Minimal State:', pureMinimalState);

  // Screenshot 2: Pure Minimal Active in Light Mode
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'wallpaper_audit_02_pure_minimal_light.png'),
  });
  console.log('Saved: wallpaper_audit_02_pure_minimal_light.png');

  // TEST 3: Switch to Dark Mode & Check Pure Minimal in Dark Mode
  console.log('Switching to Dark Mode...');
  await page.evaluate(() => {
    // Switch to dark mode via dev navigator
    const select = document.querySelector('select');
    if (select) {
      select.value = 'background_wallpaper_library_dark_mode';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await new Promise(r => setTimeout(r, 1500));

  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });

  const pureMinimalDarkState = await page.evaluate(() => {
    const raw = localStorage.getItem('momentum_appearance_settings_v1');
    const parsed = raw ? JSON.parse(raw) : null;
    const heroTitle = document.querySelector('h3.text-headline-md')?.textContent?.trim();
    const canvasDiv = document.querySelector('.momentum-canvas-viewport')?.parentElement?.querySelector('.absolute.inset-0.z-0');
    const canvasBg = canvasDiv ? window.getComputedStyle(canvasDiv).backgroundColor : '';
    return {
      activeBackgroundId: parsed?.state?.activeBackgroundId,
      heroTitle,
      canvasBg,
    };
  });
  console.log('Pure Minimal Dark State:', pureMinimalDarkState);

  // Screenshot 3: Pure Minimal Active in Dark Mode
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'wallpaper_audit_03_pure_minimal_dark.png'),
  });
  console.log('Saved: wallpaper_audit_03_pure_minimal_dark.png');

  // TEST 4: Upload / Add Custom Wallpaper and Test Persistence across Page Reload
  console.log('Testing custom wallpaper upload and reload persistence...');
  const testDataUrl = await page.evaluate(() => {
    // Generate a test high-res gradient canvas Data URL (1280x720)
    const c = document.createElement('canvas');
    c.width = 720;
    c.height = 1280;
    const ctx = c.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 720, 1280);
    grad.addColorStop(0, '#6366f1');
    grad.addColorStop(0.5, '#ec4899');
    grad.addColorStop(1, '#f59e0b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 720, 1280);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px sans-serif';
    ctx.fillText('Custom Test Wallpaper', 100, 640);
    return c.toDataURL('image/jpeg', 0.85);
  });

  // Call the upload flow directly simulating processImageForStorage + IndexedDB save
  await page.evaluate(async (dataUrl) => {
    // Import helper dynamically
    const { saveWallpaperToIndexedDB } = await import('/src/utils/wallpaperStorage.js');
    await saveWallpaperToIndexedDB('custom_active', dataUrl, {
      name: 'Test Sunset Gradient',
      updatedAt: Date.now(),
    });
    // Set custom wallpaper in store
    const { useThemeStore } = await import('/src/store/useThemeStore.js');
    useThemeStore.getState().setCustomWallpaper(dataUrl);
  }, testDataUrl);

  await new Promise(r => setTimeout(r, 1000));

  const customBeforeReload = await page.evaluate(() => {
    const raw = localStorage.getItem('momentum_appearance_settings_v1');
    const parsed = raw ? JSON.parse(raw) : null;
    const heroTitle = document.querySelector('h3.text-headline-md')?.textContent?.trim();
    return {
      activeBackgroundId: parsed?.state?.activeBackgroundId,
      customLength: parsed?.state?.customWallpaper?.length || 0,
      heroTitle,
    };
  });
  console.log('Custom wallpaper before reload:', customBeforeReload);

  // Screenshot 4: Custom Wallpaper Active before reload
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'wallpaper_audit_04_custom_before_reload.png'),
  });
  console.log('Saved: wallpaper_audit_04_custom_before_reload.png');

  // RELOAD PAGE!
  console.log('Reloading page (page.reload())...');
  await page.reload({ waitUntil: 'networkidle2' });

  await new Promise(r => setTimeout(r, 2000));

  await page.evaluate(() => {
    const devNav = document.querySelector('.fixed.top-6.left-6');
    if (devNav) devNav.style.display = 'none';
  });

  const customAfterReload = await page.evaluate(async () => {
    const { getWallpaperFromIndexedDB } = await import('/src/utils/wallpaperStorage.js');
    const dbRecord = await getWallpaperFromIndexedDB('custom_active');
    const raw = localStorage.getItem('momentum_appearance_settings_v1');
    const parsed = raw ? JSON.parse(raw) : null;
    const heroTitle = document.querySelector('h3.text-headline-md')?.textContent?.trim();
    const heroImg = document.querySelector('.relative.w-full.h-44 img');
    return {
      activeBackgroundId: parsed?.state?.activeBackgroundId,
      hasDbRecord: !!dbRecord,
      dbDataUrlLength: dbRecord?.dataUrl?.length || 0,
      heroTitle,
      heroImgSrcLength: heroImg?.src?.length || 0,
      isBlob: heroImg?.src?.startsWith('blob:'),
      isDataUrl: heroImg?.src?.startsWith('data:'),
    };
  });
  console.log('Custom wallpaper AFTER reload:', customAfterReload);

  // Screenshot 5: Custom Wallpaper Active AFTER reload
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'wallpaper_audit_05_custom_after_reload.png'),
  });
  console.log('Saved: wallpaper_audit_05_custom_after_reload.png');

  // TEST 5: Select a Built-in Wallpaper (e.g. Wallpaper 01 / Wallpaper 03) and verify
  console.log('Selecting Wallpaper 03 (Minaret Sunrise)...');
  await page.evaluate(async () => {
    const { useThemeStore } = await import('/src/store/useThemeStore.js');
    useThemeStore.getState().setActiveBackgroundId('bg-03-minaret-sunrise');
  });

  await new Promise(r => setTimeout(r, 1000));

  // Screenshot 6: Built-in Wallpaper 03 Active
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'wallpaper_audit_06_builtin_active.png'),
  });
  console.log('Saved: wallpaper_audit_06_builtin_active.png');

  await browser.close();
  console.log('--- Puppeteer Test Complete Successfully ---');
}

runTest().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
