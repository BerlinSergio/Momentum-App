const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753';
const OUT_DIR = path.join(__dirname, 'screenshots', 'four_position_suite');
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

async function runFourPositionTests() {
  console.log('================================================================');
  console.log('MOMENTUM — FOUR-POSITION FLOATING SIDEBAR AUTOMATED TEST SUITE');
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

    // Setup active state: Milad Wardak, onboarding completed, dark mode, left position
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
      if (window.useSecurityStore) window.useSecurityStore.getState().setLocked(false);
      if (window.useLocaleStore) window.useLocaleStore.getState().setLocale('en');
      if (window.useNavigationStore) {
        window.useNavigationStore.getState().setActiveTab('home_dashboard_dark_mode');
        window.useNavigationStore.getState().setSidebarPosition('left');
        window.useNavigationStore.getState().setSidebarCollapsed(false);
      }
      if (window.useThemeStore) window.useThemeStore.getState().setTheme('dark');
    });

    await page.waitForSelector('aside', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 600));

    // ── CONFIG 1: LEFT EXPANDED ──
    console.log('\n[CONFIG 1/8] Left Expanded State...');
    const c1 = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      const rect = aside ? aside.getBoundingClientRect() : null;
      return {
        width: rect ? Math.round(rect.width) : 0,
        height: rect ? Math.round(rect.height) : 0,
        left: rect ? Math.round(rect.left) : 0
      };
    });
    console.log('Left Expanded Geometry:', c1);
    if (c1.width < 250 || c1.width > 275) {
      failures.push(`Config 1 FAIL: Left Expanded width expected ~260px, got ${c1.width}px`);
    } else {
      console.log('✓ PASS: Left Expanded width is optimal (~260px)');
    }
    const pLeftExp = path.join(OUT_DIR, '01_left_expanded_dark.png');
    await page.screenshot({ path: pLeftExp });
    copyToArtifacts(pLeftExp, 'left_expanded_dark.png');

    // ── CONFIG 2: LEFT COLLAPSED ──
    console.log('\n[CONFIG 2/8] Collapsing to Left Collapsed...');
    await page.click('[data-testid="sidebar-toggle-btn"]');
    await new Promise((r) => setTimeout(r, 600));
    const c2 = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      const rect = aside ? aside.getBoundingClientRect() : null;
      return {
        width: rect ? Math.round(rect.width) : 0,
        height: rect ? Math.round(rect.height) : 0
      };
    });
    console.log('Left Collapsed Geometry:', c2);
    if (c2.width < 70 || c2.width > 95) {
      failures.push(`Config 2 FAIL: Left Collapsed width expected ~80px, got ${c2.width}px`);
    } else {
      console.log('✓ PASS: Left Collapsed width is optimal (~80px)');
    }
    const pLeftCol = path.join(OUT_DIR, '02_left_collapsed_dark.png');
    await page.screenshot({ path: pLeftCol });
    copyToArtifacts(pLeftCol, 'left_collapsed_dark.png');

    // ── TEST IN-SIDEBAR POSITION SELECTOR POPOVER ──
    console.log('\nTesting In-Sidebar Position Selector Popover...');
    await page.click('[data-testid="sidebar-position-btn"]');
    await page.waitForSelector('[data-testid="sidebar-position-menu"]', { visible: true });
    console.log('✓ PASS: In-Sidebar Position Selector Popover opened cleanly');

    // ── CONFIG 3: RIGHT COLLAPSED ──
    console.log('\n[CONFIG 3/8] Switching Position to Right (Collapsed)...');
    await page.click('[data-testid="sidebar-position-option-right"]');
    await new Promise((r) => setTimeout(r, 800));

    const c3 = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      const rect = aside ? aside.getBoundingClientRect() : null;
      const windowWidth = window.innerWidth;
      const pos = window.useNavigationStore.getState().sidebarPosition;
      return {
        pos,
        width: rect ? Math.round(rect.width) : 0,
        rightOffset: rect ? Math.round(windowWidth - rect.right) : 0
      };
    });
    console.log('Right Collapsed Geometry:', c3);
    if (c3.pos !== 'right') {
      failures.push(`Config 3 FAIL: Sidebar position store did not update to right, got ${c3.pos}`);
    } else if (c3.rightOffset > 40) {
      failures.push(`Config 3 FAIL: Sidebar not aligned to physical right (rightOffset: ${c3.rightOffset}px)`);
    } else {
      console.log('✓ PASS: Sidebar repositioned to physical Right edge');
    }
    const pRightCol = path.join(OUT_DIR, '03_right_collapsed_dark.png');
    await page.screenshot({ path: pRightCol });
    copyToArtifacts(pRightCol, 'right_collapsed_dark.png');

    // ── CONFIG 4: RIGHT EXPANDED ──
    console.log('\n[CONFIG 4/8] Expanding to Right Expanded...');
    await page.click('[data-testid="sidebar-toggle-btn"]');
    await new Promise((r) => setTimeout(r, 600));

    const c4 = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      const rect = aside ? aside.getBoundingClientRect() : null;
      return {
        width: rect ? Math.round(rect.width) : 0
      };
    });
    console.log('Right Expanded Geometry:', c4);
    if (c4.width < 250 || c4.width > 275) {
      failures.push(`Config 4 FAIL: Right Expanded width expected ~260px, got ${c4.width}px`);
    } else {
      console.log('✓ PASS: Right Expanded width is optimal (~260px)');
    }
    const pRightExp = path.join(OUT_DIR, '04_right_expanded_dark.png');
    await page.screenshot({ path: pRightExp });
    copyToArtifacts(pRightExp, 'right_expanded_dark.png');

    // ── CONFIG 5: TOP EXPANDED ──
    console.log('\n[CONFIG 5/8] Switching Position to Top (Expanded)...');
    await page.click('[data-testid="sidebar-position-btn"]');
    await page.waitForSelector('[data-testid="sidebar-position-menu"]', { visible: true });
    await page.click('[data-testid="sidebar-position-option-top"]');
    await new Promise((r) => setTimeout(r, 800));

    const c5 = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      const rect = aside ? aside.getBoundingClientRect() : null;
      const pos = window.useNavigationStore.getState().sidebarPosition;
      return {
        pos,
        height: rect ? Math.round(rect.height) : 0,
        width: rect ? Math.round(rect.width) : 0,
        top: rect ? Math.round(rect.top) : 0
      };
    });
    console.log('Top Expanded Geometry:', c5);
    if (c5.pos !== 'top') {
      failures.push(`Config 5 FAIL: Position not set to top, got ${c5.pos}`);
    } else if (c5.height < 60 || c5.height > 85) {
      failures.push(`Config 5 FAIL: Top Expanded dock height expected ~72px, got ${c5.height}px`);
    } else {
      console.log('✓ PASS: Top Expanded Horizontal Dock height is optimal (~72px)');
    }
    const pTopExp = path.join(OUT_DIR, '05_top_expanded_dark.png');
    await page.screenshot({ path: pTopExp });
    copyToArtifacts(pTopExp, 'top_expanded_dark.png');

    // ── CONFIG 6: TOP COLLAPSED ──
    console.log('\n[CONFIG 6/8] Collapsing Top Dock...');
    await page.click('[data-testid="sidebar-toggle-btn"]');
    await new Promise((r) => setTimeout(r, 600));

    const c6 = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      const rect = aside ? aside.getBoundingClientRect() : null;
      return {
        height: rect ? Math.round(rect.height) : 0,
        width: rect ? Math.round(rect.width) : 0
      };
    });
    console.log('Top Collapsed Geometry:', c6);
    if (c6.height < 45 || c6.height > 62) {
      failures.push(`Config 6 FAIL: Top Collapsed dock height expected ~54px, got ${c6.height}px`);
    } else {
      console.log('✓ PASS: Top Collapsed Horizontal Dock height is compact (~54px)');
    }
    const pTopCol = path.join(OUT_DIR, '06_top_collapsed_dark.png');
    await page.screenshot({ path: pTopCol });
    copyToArtifacts(pTopCol, 'top_collapsed_dark.png');

    // ── CONFIG 7: BOTTOM COLLAPSED ──
    console.log('\n[CONFIG 7/8] Switching Position to Bottom (Collapsed)...');
    await page.click('[data-testid="sidebar-position-btn"]');
    await page.waitForSelector('[data-testid="sidebar-position-menu"]', { visible: true });
    await page.click('[data-testid="sidebar-position-option-bottom"]');
    await new Promise((r) => setTimeout(r, 800));

    const c7 = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      const rect = aside ? aside.getBoundingClientRect() : null;
      const windowHeight = window.innerHeight;
      const pos = window.useNavigationStore.getState().sidebarPosition;
      return {
        pos,
        height: rect ? Math.round(rect.height) : 0,
        bottomOffset: rect ? Math.round(windowHeight - rect.bottom) : 0
      };
    });
    console.log('Bottom Collapsed Geometry:', c7);
    if (c7.pos !== 'bottom') {
      failures.push(`Config 7 FAIL: Position not set to bottom, got ${c7.pos}`);
    } else if (c7.bottomOffset > 30) {
      failures.push(`Config 7 FAIL: Bottom dock not aligned to physical bottom (bottomOffset: ${c7.bottomOffset}px)`);
    } else {
      console.log('✓ PASS: Bottom Horizontal Dock positioned along physical bottom');
    }
    const pBotCol = path.join(OUT_DIR, '07_bottom_collapsed_dark.png');
    await page.screenshot({ path: pBotCol });
    copyToArtifacts(pBotCol, 'bottom_collapsed_dark.png');

    // ── CONFIG 8: BOTTOM EXPANDED ──
    console.log('\n[CONFIG 8/8] Expanding Bottom Dock...');
    await page.click('[data-testid="sidebar-toggle-btn"]');
    await new Promise((r) => setTimeout(r, 600));

    const c8 = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      const rect = aside ? aside.getBoundingClientRect() : null;
      return {
        height: rect ? Math.round(rect.height) : 0
      };
    });
    console.log('Bottom Expanded Geometry:', c8);
    if (c8.height < 60 || c8.height > 85) {
      failures.push(`Config 8 FAIL: Bottom Expanded dock height expected ~72px, got ${c8.height}px`);
    } else {
      console.log('✓ PASS: Bottom Expanded Horizontal Dock height is optimal (~72px)');
    }
    const pBotExp = path.join(OUT_DIR, '08_bottom_expanded_dark.png');
    await page.screenshot({ path: pBotExp });
    copyToArtifacts(pBotExp, 'bottom_expanded_dark.png');

    // ── TEST LIGHT THEME ON DOCK ──
    console.log('\nTesting Theme Toggle on Horizontal Dock (Dark -> Light)...');
    await page.click('[data-testid="sidebar-theme-toggle"]');
    await new Promise((r) => setTimeout(r, 800));

    const lightDockState = await page.evaluate(() => {
      const isDark = document.documentElement.classList.contains('dark');
      const aside = document.querySelector('aside');
      const cs = aside ? window.getComputedStyle(aside) : {};
      return {
        isDark,
        backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
        backgroundColor: cs.backgroundColor
      };
    });
    console.log('Light Dock State:', lightDockState);
    if (lightDockState.isDark) {
      failures.push('Theme Toggle FAIL on dock: documentElement still has .dark class');
    } else {
      console.log('✓ PASS: Theme toggled to Light mode cleanly on horizontal dock');
    }
    const pBotExpLight = path.join(OUT_DIR, '09_bottom_expanded_light.png');
    await page.screenshot({ path: pBotExpLight });
    copyToArtifacts(pBotExpLight, 'bottom_expanded_light.png');

    // ── TEST QUICK ACTIONS FROM HORIZONTAL DOCK ──
    console.log('\nTesting Quick Actions Trigger from Horizontal Dock...');
    await page.click('[data-testid="quick-access-quick_actions"]');
    await page.waitForSelector('[data-testid="quick-actions-portal-root"]', { visible: true });
    await new Promise((r) => setTimeout(r, 500));
    console.log('✓ PASS: Quick Actions Modal opened cleanly from Horizontal Dock');
    const pQAHori = path.join(OUT_DIR, '10_quick_actions_from_dock.png');
    await page.screenshot({ path: pQAHori });
    copyToArtifacts(pQAHori, 'quick_actions_from_dock.png');

    await page.click('[data-testid="quick-actions-close-btn"]');
    await page.waitForSelector('[data-testid="quick-actions-portal-root"]', { hidden: true });
    await new Promise((r) => setTimeout(r, 400));

    // ── TEST PERSISTENCE ACROSS BROWSER RELOAD ──
    console.log('\nTesting Persistence across Browser Reload (Position: bottom, Collapsed: false)...');
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForSelector('aside', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 600));

    const reloadedState = await page.evaluate(() => {
      const pos = window.useNavigationStore ? window.useNavigationStore.getState().sidebarPosition : '';
      const collapsed = window.useNavigationStore ? window.useNavigationStore.getState().isSidebarCollapsed : null;
      return { pos, collapsed };
    });
    console.log('Reloaded Store State:', reloadedState);
    if (reloadedState.pos !== 'bottom') {
      failures.push(`Persistence FAIL: expected position bottom, got ${reloadedState.pos}`);
    } else {
      console.log('✓ PASS: Sidebar position (bottom) persisted across browser reload');
    }

    // Reset back to Left Position
    await page.click('[data-testid="sidebar-position-btn"]');
    await page.waitForSelector('[data-testid="sidebar-position-menu"]', { visible: true });
    await page.click('[data-testid="sidebar-position-option-left"]');
    await new Promise((r) => setTimeout(r, 800));

    // ── TEST MOBILE VIEWPORT REGRESSION (< 1024px) ──
    console.log('\nTesting Mobile Viewport (390x844) Navigation Integrity...');
    await page.setViewport({ width: 390, height: 844 });
    await new Promise((r) => setTimeout(r, 600));

    const mobileCheck = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      const asideDisplay = aside ? window.getComputedStyle(aside).display : 'none';
      const bottomNav = document.querySelector('nav');
      return {
        asideDisplay,
        hasBottomNav: !!bottomNav
      };
    });
    console.log('Mobile Check:', mobileCheck);
    if (mobileCheck.asideDisplay !== 'none') {
      failures.push('Mobile FAIL: Desktop sidebar/dock is visible on mobile viewport');
    } else if (!mobileCheck.hasBottomNav) {
      failures.push('Mobile FAIL: Mobile bottom nav is missing');
    } else {
      console.log('✓ PASS: Desktop sidebar hidden on mobile; mobile BottomNav intact');
    }
    const pMobile = path.join(OUT_DIR, '11_mobile_regression_390x844.png');
    await page.screenshot({ path: pMobile });
    copyToArtifacts(pMobile, 'mobile_regression_390x844.png');

    console.log('\n================================================================');
    if (failures.length === 0) {
      console.log('ALL FOUR-POSITION CONFIGURATIONS & ANIMATIONS VERIFIED (100% PASS)');
    } else {
      console.error(`FAILURES DETECTED (${failures.length}):`);
      failures.forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
    }
    console.log('================================================================\n');

  } catch (err) {
    console.error('Test execution exception:', err);
    failures.push(err.message);
  } finally {
    await browser.close();
  }

  process.exit(failures.length > 0 ? 1 : 0);
}

runFourPositionTests();
