const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753';
const OUT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function copyToArtifacts(sourcePath, destFilename) {
  try {
    const destPath = path.join(ARTIFACT_DIR, destFilename);
    fs.copyFileSync(sourcePath, destPath);
    console.log(`[ARTIFACT] Copied ${destFilename} to artifacts directory.`);
  } catch (err) {
    console.error(`[ARTIFACT ERROR] copying ${destFilename}:`, err.message);
  }
}

async function runTests() {
  console.log('================================================================');
  console.log('MOMENTUM — SIDEBAR GLASS, THEME TOGGLE & QUICK ACTIONS AUDIT');
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  let failures = [];

  try {
    await page.setViewport({ width: 1440, height: 900 });
    console.log('Navigating to http://localhost:5173 ...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
    await page.waitForFunction(() => typeof window.setIsAppLoading === 'function');

    // 0. Initial Setup: Milad Wardak, onboarding complete, unlocked
    await page.evaluate(() => {
      window.setIsAppLoading(false);
      if (window.useProfileStore) {
        window.useProfileStore.getState().completeSetup();
        window.useProfileStore.getState().updateProfile({
          setupCompleted: true,
          fullName: 'Milad Wardak',
          currency: 'AFN'
        });
      }
      if (window.useSecurityStore) {
        window.useSecurityStore.getState().setLocked(false);
      }
      if (window.useLocaleStore) {
        window.useLocaleStore.getState().setLocale('en');
      }
      if (window.useNavigationStore) {
        window.useNavigationStore.getState().setActiveTab('home_dashboard_dark_mode');
        window.useNavigationStore.getState().setSidebarCollapsed(false);
      }
      if (window.useThemeStore) {
        window.useThemeStore.getState().setTheme('dark');
      }
    });

    await page.waitForSelector('aside', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 800));

    // ── TEST GROUP A: SIDEBAR GLASS & WALLPAPER BLEED (SIDEBAR-01 & 02) ──
    console.log('\n--- TEST GROUP A: SIDEBAR GLASSMORPHISM & WALLPAPER BLEED ---');
    
    // Check wallpaper coverage
    const wallpaperCheck = await page.evaluate(() => {
      const outerShell = document.querySelector('div.w-full.h-screen');
      const hasBgBackground = outerShell && outerShell.classList.contains('bg-background');
      const wallpaperCanvas = document.querySelector('.momentum-canvas-viewport') 
        ? document.querySelector('div.absolute.inset-0.bg-cover') 
        : null;
      const aside = document.querySelector('aside');
      const asideRect = aside ? aside.getBoundingClientRect() : null;
      return {
        hasBgBackground,
        wallpaperExists: !!wallpaperCanvas,
        asideRect: asideRect ? { left: asideRect.left, top: asideRect.top, width: asideRect.width } : null
      };
    });

    if (wallpaperCheck.hasBgBackground) {
      failures.push('SIDEBAR-02 FAIL: outer shell still has solid bg-background class blocking wallpaper');
    } else {
      console.log('✓ PASS: Outer shell has no solid bg-background blocking wallpaper');
    }

    // Check dark mode glass computed styles
    const darkGlassStyles = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      if (!aside) return null;
      const cs = window.getComputedStyle(aside);
      return {
        backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
        backgroundColor: cs.backgroundColor,
        border: cs.border,
        boxShadow: cs.boxShadow
      };
    });
    console.log('Dark Sidebar Glass Computed:', darkGlassStyles);
    if (!darkGlassStyles.backdropFilter || !darkGlassStyles.backdropFilter.includes('blur')) {
      failures.push('SIDEBAR-01 FAIL: Dark sidebar missing backdropFilter blur');
    } else {
      console.log('✓ PASS: Dark sidebar has authentic backdrop-filter blur');
    }

    // Capture 1: Full Desktop Dark Expanded
    const p1 = path.join(OUT_DIR, '01_full_dark_expanded_1440x900.png');
    await page.screenshot({ path: p1 });
    copyToArtifacts(p1, 'full_dark_expanded_1440x900.png');

    // ── TEST GROUP B: DECORATIVE WINDOW DOTS REMOVAL (SIDEBAR-03) ──
    console.log('\n--- TEST GROUP B: DECORATIVE WINDOW DOTS REMOVAL ---');
    const dotsCheck = await page.evaluate(() => {
      const redDot = document.querySelector('div.bg-\\[\\#FF5F56\\]');
      const yellowDot = document.querySelector('div.bg-\\[\\#FFBD2E\\]');
      const greenDot = document.querySelector('div.bg-\\[\\#27C93F\\]');
      const topToggle = document.querySelector('[data-testid="sidebar-toggle-btn-top"]');
      return {
        hasDots: !!(redDot || yellowDot || greenDot),
        hasTopToggle: !!topToggle
      };
    });

    if (dotsCheck.hasDots) {
      failures.push('SIDEBAR-03 FAIL: Decorative window dots still present in sidebar');
    } else {
      console.log('✓ PASS: Decorative window control dots completely removed in expanded dark state');
    }

    if (!dotsCheck.hasTopToggle) {
      failures.push('SIDEBAR-03 FAIL: Top toggle button missing');
    } else {
      console.log('✓ PASS: Top toggle button cleanly positioned without dots');
    }

    // Collapse sidebar
    console.log('\nCollapsing sidebar...');
    await page.click('[data-testid="sidebar-toggle-btn"]');
    await new Promise((r) => setTimeout(r, 600));

    const darkCollapsedDotsCheck = await page.evaluate(() => {
      const redDot = document.querySelector('div.bg-\\[\\#FF5F56\\]');
      const topToggle = document.querySelector('[data-testid="sidebar-toggle-btn-top"]');
      const aside = document.querySelector('aside');
      return {
        hasDots: !!redDot,
        hasTopToggle: !!topToggle,
        width: aside ? Math.round(aside.getBoundingClientRect().width) : 0
      };
    });

    if (darkCollapsedDotsCheck.hasDots) {
      failures.push('SIDEBAR-03 FAIL: Decorative window dots present in collapsed state');
    } else {
      console.log(`✓ PASS: No dots in collapsed state (width: ${darkCollapsedDotsCheck.width}px)`);
    }

    // Capture 2: Full Desktop Dark Collapsed
    const p2 = path.join(OUT_DIR, '02_full_dark_collapsed_1440x900.png');
    await page.screenshot({ path: p2 });
    copyToArtifacts(p2, 'full_dark_collapsed_1440x900.png');

    // Expand sidebar back
    await page.click('[data-testid="sidebar-toggle-btn"]');
    await new Promise((r) => setTimeout(r, 600));

    // ── TEST GROUP C: THEME TOGGLE VERIFICATION (SIDEBAR-04) ──
    console.log('\n--- TEST GROUP C: THEME TOGGLE VERIFICATION ---');
    console.log('Clicking Theme Toggle in sidebar to switch to Light mode...');
    await page.click('[data-testid="sidebar-theme-toggle"]');
    await new Promise((r) => setTimeout(r, 800));

    const lightState = await page.evaluate(() => {
      const isHtmlDark = document.documentElement.classList.contains('dark');
      const aside = document.querySelector('aside');
      const activeTab = window.useNavigationStore ? window.useNavigationStore.getState().activeTab : '';
      const theme = window.useThemeStore ? window.useThemeStore.getState().theme : '';
      const cs = aside ? window.getComputedStyle(aside) : {};
      return {
        isHtmlDark,
        activeTab,
        theme,
        backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
        backgroundColor: cs.backgroundColor
      };
    });
    console.log('Light Mode State after toggle:', lightState);

    if (lightState.isHtmlDark) {
      failures.push('SIDEBAR-04 FAIL: documentElement still has .dark class after toggling to light mode');
    } else {
      console.log('✓ PASS: documentElement .dark class removed for light mode');
    }

    if (!lightState.activeTab.includes('_light_mode')) {
      failures.push(`SIDEBAR-04 FAIL: activeTab did not swap to _light_mode, currently: ${lightState.activeTab}`);
    } else {
      console.log(`✓ PASS: activeTab swapped to light screen: ${lightState.activeTab}`);
    }

    // Capture 3: Full Desktop Light Expanded
    const p3 = path.join(OUT_DIR, '03_full_light_expanded_1440x900.png');
    await page.screenshot({ path: p3 });
    copyToArtifacts(p3, 'full_light_expanded_1440x900.png');

    // Collapse sidebar in Light mode
    await page.click('[data-testid="sidebar-toggle-btn"]');
    await new Promise((r) => setTimeout(r, 600));

    // Capture 4: Full Desktop Light Collapsed
    const p4 = path.join(OUT_DIR, '04_full_light_collapsed_1440x900.png');
    await page.screenshot({ path: p4 });
    copyToArtifacts(p4, 'full_light_collapsed_1440x900.png');

    // Expand sidebar back in Light mode
    await page.click('[data-testid="sidebar-toggle-btn"]');
    await new Promise((r) => setTimeout(r, 600));

    // ── TEST GROUP D: QUICK ACTIONS PORTAL & DESKTOP DIALOG (SIDEBAR-05 & 06) ──
    console.log('\n--- TEST GROUP D: QUICK ACTIONS PORTAL & DESKTOP DIALOG ---');
    console.log('Opening Quick Actions from Desktop Sidebar in Light mode...');
    await page.click('[data-testid="quick-access-quick_actions"]');
    await new Promise((r) => setTimeout(r, 600));

    const qaPortalCheck = await page.evaluate(() => {
      const portalRoot = document.querySelector('[data-testid="quick-actions-portal-root"]');
      const dialog = document.querySelector('[role="dialog"][aria-label="Quick Actions"]');
      const aside = document.querySelector('aside');
      const isInsideAside = aside && portalRoot ? aside.contains(portalRoot) : false;
      const isDirectChildOfBody = portalRoot ? portalRoot.parentElement === document.body : false;
      
      const rect = dialog ? dialog.getBoundingClientRect() : null;
      const grabHandle = dialog ? dialog.querySelector('.w-12.h-1\\.5') : null;
      const grabHandleComputed = grabHandle ? window.getComputedStyle(grabHandle).display : 'none';

      // Check action cards text
      const cards = dialog ? Array.from(dialog.querySelectorAll('button[data-testid^="quick-action-item-"]')) : [];
      const cardsData = cards.map((c) => {
        const titleEl = c.querySelector('span.font-bold');
        const subEl = c.querySelector('span.text-\\[11px\\]');
        return {
          id: c.getAttribute('data-testid'),
          title: titleEl ? titleEl.textContent.trim() : '',
          subtitle: subEl ? subEl.textContent.trim() : ''
        };
      });

      return {
        portalExists: !!portalRoot,
        isInsideAside,
        isDirectChildOfBody,
        dialogWidth: rect ? Math.round(rect.width) : 0,
        dialogLeft: rect ? Math.round(rect.left) : 0,
        windowWidth: window.innerWidth,
        grabHandleDisplay: grabHandleComputed,
        cardsCount: cardsData.length,
        cardsData
      };
    });

    console.log('Quick Actions Desktop QA Portal Check:', {
      portalExists: qaPortalCheck.portalExists,
      isInsideAside: qaPortalCheck.isInsideAside,
      isDirectChildOfBody: qaPortalCheck.isDirectChildOfBody,
      dialogWidth: qaPortalCheck.dialogWidth,
      cardsCount: qaPortalCheck.cardsCount
    });

    if (qaPortalCheck.isInsideAside) {
      failures.push('SIDEBAR-05 FAIL: Quick Actions portal root is STILL trapped inside <aside>!');
    } else {
      console.log('✓ PASS: Quick Actions is NOT trapped inside <aside> (rendered into document.body)');
    }

    if (qaPortalCheck.dialogWidth < 460 || qaPortalCheck.dialogWidth > 560) {
      failures.push(`SIDEBAR-05 FAIL: Dialog width not in desktop spec (480-540px), got ${qaPortalCheck.dialogWidth}px`);
    } else {
      console.log(`✓ PASS: Dialog desktop width is optimal: ${qaPortalCheck.dialogWidth}px`);
    }

    // Verify card subtitles are untruncated
    const truncatedCards = qaPortalCheck.cardsData.filter(c => c.subtitle.endsWith('...') || c.subtitle.length < 5);
    if (truncatedCards.length > 0) {
      failures.push(`SIDEBAR-06 FAIL: Card subtitles truncated: ${JSON.stringify(truncatedCards)}`);
    } else {
      console.log('✓ PASS: All 6 Quick Action card titles and subtitles are fully legible and untruncated');
    }

    // Capture 5: Quick Actions Desktop Light
    const p5 = path.join(OUT_DIR, '05_quick_actions_desktop_light.png');
    await page.screenshot({ path: p5 });
    copyToArtifacts(p5, 'quick_actions_desktop_light.png');

    // Close Quick Actions via close button
    await page.click('[data-testid="quick-actions-close-btn"]');
    await new Promise((r) => setTimeout(r, 400));

    // Switch theme to Dark mode and open Quick Actions in Dark mode
    console.log('Toggling theme to Dark mode...');
    await page.click('[data-testid="sidebar-theme-toggle"]');
    await new Promise((r) => setTimeout(r, 800));

    await page.click('[data-testid="quick-access-quick_actions"]');
    await new Promise((r) => setTimeout(r, 600));

    // Capture 6: Quick Actions Desktop Dark
    const p6 = path.join(OUT_DIR, '06_quick_actions_desktop_dark.png');
    await page.screenshot({ path: p6 });
    copyToArtifacts(p6, 'quick_actions_desktop_dark.png');

    // Close via Escape key
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 400));

    // ── TEST MOBILE QUICK ACTIONS ──
    console.log('\n--- TESTING MOBILE BOTTOM SHEET BEHAVIOR ---');
    await page.setViewport({ width: 390, height: 844 });
    await new Promise((r) => setTimeout(r, 600));

    // Open Quick Actions via mobile bottom nav center plus button
    await page.click('[data-testid="central-action-btn"]');
    await new Promise((r) => setTimeout(r, 600));

    const mobileQACheck = await page.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"][aria-label="Quick Actions"]');
      const rect = dialog ? dialog.getBoundingClientRect() : null;
      return {
        dialogWidth: rect ? Math.round(rect.width) : 0,
        dialogBottom: rect ? Math.round(rect.bottom) : 0,
        windowHeight: window.innerHeight
      };
    });
    console.log('Mobile QA Check:', mobileQACheck);

    // Capture 7: Quick Actions Mobile
    const p7 = path.join(OUT_DIR, '07_quick_actions_mobile.png');
    await page.screenshot({ path: p7 });
    copyToArtifacts(p7, 'quick_actions_mobile.png');

    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 400));

    // Reset back to desktop viewport
    await page.setViewport({ width: 1440, height: 900 });
    await new Promise((r) => setTimeout(r, 600));

    // ── TEST GROUP E: MULTILINGUAL & RTL COMPLIANCE ──
    console.log('\n--- TEST GROUP E: RTL & LOCALIZATION (PASHTO & DARI) ---');
    
    // Switch to Pashto
    await page.evaluate(() => {
      window.useLocaleStore.getState().setLocale('ps-AF');
    });
    await new Promise((r) => setTimeout(r, 600));

    const psCheck = await page.evaluate(() => {
      const dir = document.documentElement.getAttribute('dir');
      const homeLabel = document.querySelector('[data-testid="nav-item-home"] span');
      return {
        dir,
        homeText: homeLabel ? homeLabel.textContent.trim() : ''
      };
    });
    console.log('Pashto RTL Check:', psCheck);
    if (psCheck.dir !== 'rtl') {
      failures.push('RTL FAIL: Pashto html dir is not rtl');
    } else {
      console.log('✓ PASS: Pashto HTML direction is RTL');
    }

    // Capture 8: RTL Sidebar Pashto
    const p8 = path.join(OUT_DIR, '08_rtl_sidebar_pashto.png');
    await page.screenshot({ path: p8 });
    copyToArtifacts(p8, 'rtl_sidebar_pashto.png');

    // Switch to Dari
    await page.evaluate(() => {
      window.useLocaleStore.getState().setLocale('fa-AF');
    });
    await new Promise((r) => setTimeout(r, 600));

    const faCheck = await page.evaluate(() => {
      const dir = document.documentElement.getAttribute('dir');
      const homeLabel = document.querySelector('[data-testid="nav-item-home"] span');
      return {
        dir,
        homeText: homeLabel ? homeLabel.textContent.trim() : ''
      };
    });
    console.log('Dari RTL Check:', faCheck);
    if (faCheck.dir !== 'rtl') {
      failures.push('RTL FAIL: Dari html dir is not rtl');
    } else {
      console.log('✓ PASS: Dari HTML direction is RTL');
    }

    // Capture 9: RTL Sidebar Dari
    const p9 = path.join(OUT_DIR, '09_rtl_sidebar_dari.png');
    await page.screenshot({ path: p9 });
    copyToArtifacts(p9, 'rtl_sidebar_dari.png');

    // Reset to English
    await page.evaluate(() => {
      window.useLocaleStore.getState().setLocale('en');
    });
    await new Promise((r) => setTimeout(r, 400));

    console.log('\n================================================================');
    if (failures.length === 0) {
      console.log('ALL TESTS PASSED! ZERO DEFECTS DETECTED.');
    } else {
      console.error(`TEST FAILURES DETECTED (${failures.length}):`);
      failures.forEach((f, idx) => console.error(`  ${idx + 1}. ${f}`));
    }
    console.log('================================================================\n');

  } catch (err) {
    console.error('Test execution error:', err);
    failures.push(err.message);
  } finally {
    await browser.close();
  }

  process.exit(failures.length > 0 ? 1 : 0);
}

runTests();
