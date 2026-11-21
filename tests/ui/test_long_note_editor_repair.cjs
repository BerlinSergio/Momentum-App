const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753';

async function run() {
  console.log('--- Starting Momentum Long Note Editor Repair Verification ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.on('pageerror', err => console.log('Page error:', err.message));

  const results = {
    checks: [],
    passed: 0,
    failed: 0
  };

  function recordCheck(name, pass, details = '') {
    if (pass) {
      console.log(`[PASS] ${name} ${details}`);
      results.passed++;
    } else {
      console.error(`[FAIL] ${name} ${details}`);
      results.failed++;
    }
    results.checks.push({ name, pass, details });
  }

  try {
    // 1. Navigate to Long Note Editor in Light Mode
    console.log('1. Loading Long Note Editor in Desktop Light Mode (1440x900)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

    await page.evaluate(() => {
      if (window.setIsAppLoading) window.setIsAppLoading(false);
      if (window.useProfileStore) window.useProfileStore.getState().completeSetup();
      if (window.useSecurityStore) window.useSecurityStore.getState().setLocked(false);
      if (window.useThemeStore) window.useThemeStore.getState().setTheme('light');
      if (window.useLocaleStore) window.useLocaleStore.getState().setLocale?.('en');
      if (window.useNavigationStore) window.useNavigationStore.getState().setActiveTab('long_note_editor_light_mode');
    });
    await new Promise(r => setTimeout(r, 1200));

    // Check container alignment and geometry
    const dimensions = await page.evaluate(() => {
      const header = document.querySelector('header');
      const card = document.querySelector('.note-sheet-card');
      const hRect = header ? header.getBoundingClientRect() : null;
      const cRect = card ? card.getBoundingClientRect() : null;
      const cardStyle = card ? window.getComputedStyle(card) : null;
      return {
        headerWidth: hRect ? Math.round(hRect.width) : 0,
        cardWidth: cRect ? Math.round(cRect.width) : 0,
        headerLeft: hRect ? Math.round(hRect.left) : 0,
        cardLeft: cRect ? Math.round(cRect.left) : 0,
        cardBackdropBlur: cardStyle ? cardStyle.backdropFilter : '',
        cardBg: cardStyle ? cardStyle.backgroundColor : ''
      };
    });

    console.log('Geometry measurements:', dimensions);
    const widthMatch = Math.abs(dimensions.headerWidth - dimensions.cardWidth) <= 4;
    const leftMatch = Math.abs(dimensions.headerLeft - dimensions.cardLeft) <= 4;
    recordCheck('Header and Card Width Parity', widthMatch, `Header: ${dimensions.headerWidth}px, Card: ${dimensions.cardWidth}px`);
    recordCheck('Header and Card Horizontal Alignment', leftMatch, `Header Left: ${dimensions.headerLeft}px, Card Left: ${dimensions.cardLeft}px`);
    recordCheck('Card Frosted Glass Active', dimensions.cardBackdropBlur.includes('blur'), `Backdrop-filter: ${dimensions.cardBackdropBlur}`);

    // Capture screenshot: long_note_editor_desktop_light.png
    const lightDesktopPath = path.join(ARTIFACTS_DIR, 'long_note_editor_desktop_light.png');
    await page.screenshot({ path: lightDesktopPath });
    console.log(`Saved screenshot: ${lightDesktopPath}`);

    // 2. Test Multi-line Title Auto-expansion & Wrapping
    console.log('2. Testing Multi-line Auto-expanding Title...');
    const longTitleText = 'Deep Reflective Inquiry on Architectural Synthesis, Sustainable Consistency & Intentional Living Across Modern Environments';
    await page.evaluate((text) => {
      const textarea = document.querySelector('.note-sheet-card textarea');
      if (textarea) {
        textarea.value = text;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, longTitleText);
    await new Promise(r => setTimeout(r, 500));

    const titleMetrics = await page.evaluate(() => {
      const textarea = document.querySelector('.note-sheet-card textarea');
      return {
        scrollHeight: textarea ? textarea.scrollHeight : 0,
        clientHeight: textarea ? textarea.clientHeight : 0,
        value: textarea ? textarea.value : ''
      };
    });
    recordCheck('Title Textarea Auto-Expands Vertically', titleMetrics.clientHeight > 30, `Height: ${titleMetrics.clientHeight}px`);

    // Populate content and capture populated screenshot
    await page.evaluate(() => {
      const editor = document.querySelector('[contenteditable="true"]');
      if (editor) {
        editor.innerHTML = '<p>Cultivating consistency requires structuring the mind around foundational habits rather than fleeting motivational bursts. When every reflection is captured in a distraction-free, beautifully balanced workspace, clarity naturally follows.</p>';
        editor.dispatchEvent(new Event('input', { bubbles: true }));
      }
      const quoteInput = document.querySelector('input[placeholder*="Quote or reflection"]');
      if (quoteInput) {
        quoteInput.value = 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.';
        quoteInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await new Promise(r => setTimeout(r, 600));

    const populatedPath = path.join(ARTIFACTS_DIR, 'long_note_editor_content_populated.png');
    await page.screenshot({ path: populatedPath });
    console.log(`Saved screenshot: ${populatedPath}`);

    // 3. Test Sidebar Collapse and Canvas Adaptability
    console.log('3. Testing Sidebar Collapsed State...');
    await page.evaluate(() => {
      if (window.useSidebarStore) {
        window.useSidebarStore.getState().toggleCollapse?.();
      } else {
        const collapseBtn = document.querySelector('button[aria-label="Collapse sidebar"], button[title="Collapse sidebar"]');
        if (collapseBtn) collapseBtn.click();
      }
    });
    await new Promise(r => setTimeout(r, 800));

    const collapsedDimensions = await page.evaluate(() => {
      const header = document.querySelector('header');
      const card = document.querySelector('.note-sheet-card');
      const hRect = header ? header.getBoundingClientRect() : null;
      const cRect = card ? card.getBoundingClientRect() : null;
      return {
        headerWidth: hRect ? Math.round(hRect.width) : 0,
        cardWidth: cRect ? Math.round(cRect.width) : 0,
      };
    });
    const collapsedWidthMatch = Math.abs(collapsedDimensions.headerWidth - collapsedDimensions.cardWidth) <= 4;
    recordCheck('Width Parity Preserved with Collapsed Sidebar', collapsedWidthMatch, `Header: ${collapsedDimensions.headerWidth}px, Card: ${collapsedDimensions.cardWidth}px`);

    const sidebarCollapsedPath = path.join(ARTIFACTS_DIR, 'long_note_editor_sidebar_collapsed.png');
    await page.screenshot({ path: sidebarCollapsedPath });
    console.log(`Saved screenshot: ${sidebarCollapsedPath}`);

    // Restore sidebar
    await page.evaluate(() => {
      if (window.useSidebarStore && window.useSidebarStore.getState().isCollapsed) {
        window.useSidebarStore.getState().toggleCollapse?.();
      }
    });
    await new Promise(r => setTimeout(r, 400));

    // 4. Test Dark Mode
    console.log('4. Testing Desktop Dark Mode...');
    await page.evaluate(() => {
      if (window.useThemeStore) window.useThemeStore.getState().setTheme('dark');
      if (window.useNavigationStore) window.useNavigationStore.getState().setActiveTab('long_note_editor_dark_mode');
    });
    await new Promise(r => setTimeout(r, 1000));

    const darkDimensions = await page.evaluate(() => {
      const header = document.querySelector('header');
      const card = document.querySelector('.note-sheet-card');
      const hRect = header ? header.getBoundingClientRect() : null;
      const cRect = card ? card.getBoundingClientRect() : null;
      const cardStyle = card ? window.getComputedStyle(card) : null;
      return {
        headerWidth: hRect ? Math.round(hRect.width) : 0,
        cardWidth: cRect ? Math.round(cRect.width) : 0,
        cardBackdropBlur: cardStyle ? cardStyle.backdropFilter : '',
        cardBg: cardStyle ? cardStyle.backgroundColor : ''
      };
    });
    const darkWidthMatch = Math.abs(darkDimensions.headerWidth - darkDimensions.cardWidth) <= 4;
    recordCheck('Dark Mode Header and Card Width Parity', darkWidthMatch, `Header: ${darkDimensions.headerWidth}px, Card: ${darkDimensions.cardWidth}px`);
    recordCheck('Dark Mode Frosted Glass Active', darkDimensions.cardBackdropBlur.includes('blur'), `Backdrop-filter: ${darkDimensions.cardBackdropBlur}`);

    const darkDesktopPath = path.join(ARTIFACTS_DIR, 'long_note_editor_desktop_dark.png');
    await page.screenshot({ path: darkDesktopPath });
    console.log(`Saved screenshot: ${darkDesktopPath}`);

    // 5. Test Mobile Viewport (Light & Dark)
    console.log('5. Testing Mobile Viewports (375x667)...');
    await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
    await new Promise(r => setTimeout(r, 600));

    const darkMobilePath = path.join(ARTIFACTS_DIR, 'long_note_editor_mobile_dark.png');
    await page.screenshot({ path: darkMobilePath });
    console.log(`Saved screenshot: ${darkMobilePath}`);

    // Switch to light mode on mobile
    await page.evaluate(() => {
      if (window.useThemeStore) window.useThemeStore.getState().setTheme('light');
      if (window.useNavigationStore) window.useNavigationStore.getState().setActiveTab('long_note_editor_light_mode');
    });
    await new Promise(r => setTimeout(r, 600));

    const lightMobilePath = path.join(ARTIFACTS_DIR, 'long_note_editor_mobile_light.png');
    await page.screenshot({ path: lightMobilePath });
    console.log(`Saved screenshot: ${lightMobilePath}`);

    // 6. Test RTL Support: Pashto & Dari
    console.log('6. Testing RTL Localization (Pashto & Dari)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluate(() => {
      if (window.useLocaleStore) window.useLocaleStore.getState().setLocale?.('ps');
      if (window.useThemeStore) window.useThemeStore.getState().setTheme('light');
      if (window.useNavigationStore) window.useNavigationStore.getState().setActiveTab('long_note_editor_light_mode');
    });
    await new Promise(r => setTimeout(r, 800));

    // Populate with Pashto text
    const pashtoTitle = 'د معمارۍ او ډیزاین ژور فکر او د ورځني ژوند دوامداره تمرکز';
    await page.evaluate((text) => {
      const textarea = document.querySelector('.note-sheet-card textarea');
      if (textarea) {
        textarea.value = text;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, pashtoTitle);
    await new Promise(r => setTimeout(r, 500));

    const pashtoPath = path.join(ARTIFACTS_DIR, 'long_note_editor_pashto_rtl.png');
    await page.screenshot({ path: pashtoPath });
    console.log(`Saved screenshot: ${pashtoPath}`);

    // Switch to Dari
    await page.evaluate(() => {
      if (window.useLocaleStore) window.useLocaleStore.getState().setLocale?.('fa');
    });
    await new Promise(r => setTimeout(r, 800));

    const dariTitle = 'تامل و اندیشه عمیق در معماری و تداوم تمرکز در کارهای روزمره';
    await page.evaluate((text) => {
      const textarea = document.querySelector('.note-sheet-card textarea');
      if (textarea) {
        textarea.value = text;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, dariTitle);
    await new Promise(r => setTimeout(r, 500));

    const dariPath = path.join(ARTIFACTS_DIR, 'long_note_editor_dari_rtl.png');
    await page.screenshot({ path: dariPath });
    console.log(`Saved screenshot: ${dariPath}`);

    // 7. Verify Safe Discard / Delete with Adaptive Confirmation Dialog
    console.log('7. Verifying Safe Discard via Adaptive Confirmation Dialog...');
    await page.evaluate(() => {
      if (window.useLocaleStore) window.useLocaleStore.getState().setLocale?.('en');
      if (window.useThemeStore) window.useThemeStore.getState().setTheme('light');
      if (window.useNavigationStore) window.useNavigationStore.getState().setActiveTab('long_note_editor_light_mode');
    });
    await new Promise(r => setTimeout(r, 800));

    // Type something real to make it dirty in React state
    const titleArea = await page.$('.note-sheet-card textarea');
    if (titleArea) {
      await titleArea.click();
      await page.keyboard.type('Unsaved thought to be discarded');
    }
    await new Promise(r => setTimeout(r, 400));

    // Click back button to trigger discard confirmation
    await page.evaluate(() => {
      const backBtn = document.querySelector('header button[aria-label="Back to Notes"]');
      if (backBtn) backBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const dialogActive = await page.evaluate(() => {
      const dialog = document.querySelector('[role="alertdialog"]');
      return {
        exists: !!dialog,
        title: dialog ? dialog.querySelector('h3, h2')?.textContent : ''
      };
    });
    recordCheck('Discard Dialog Triggers Adaptive Confirmation', dialogActive.exists, `Dialog title: ${dialogActive.title}`);

  } catch (err) {
    console.error('Test execution error:', err);
    recordCheck('Test Execution Succeeded', false, err.message);
  } finally {
    await browser.close();
  }

  console.log(`\n--- Verification Complete: ${results.passed} passed, ${results.failed} failed ---`);
  if (results.failed > 0) {
    process.exit(1);
  }
}

run();
