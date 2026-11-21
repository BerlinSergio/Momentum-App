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

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Helper to setup state
  async function setupApp(options = {}) {
    const {
      theme = 'dark',
      locale = 'en',
      sidebarPosition = 'left',
      sidebarCollapsed = false,
      hasTasks = false,
      tab = null
    } = options;

    await page.evaluate((opts) => {
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
      if (window.useLocaleStore) window.useLocaleStore.getState().setLocale(opts.locale);
      if (window.useThemeStore) window.useThemeStore.getState().setTheme(opts.theme);
      if (window.useNavigationStore) {
        const targetTab = opts.tab || (opts.theme === 'dark' ? 'home_dashboard_dark_mode' : 'home_dashboard_light_mode');
        window.useNavigationStore.getState().setActiveTab(targetTab);
        window.useNavigationStore.getState().setSidebarPosition(opts.sidebarPosition);
        window.useNavigationStore.getState().setSidebarCollapsed(opts.sidebarCollapsed);
      }
      if (window.useTaskStore) {
        if (opts.hasTasks) {
          const todayIso = new Date().toISOString().split('T')[0];
          window.useTaskStore.setState({
            tasks: [
              { id: 'task-1', title: 'Review quarterly financial report', priority: 'high', status: 'pending', dueDate: todayIso },
              { id: 'task-2', title: 'Prepare team sync agenda & milestones', priority: 'medium', status: 'pending', dueDate: todayIso },
              { id: 'task-3', title: 'Complete daily evening reflection', priority: 'low', status: 'completed', dueDate: todayIso }
            ]
          });
        } else {
          window.useTaskStore.setState({ tasks: [] });
        }
      }
    }, { theme, locale, sidebarPosition, sidebarCollapsed, hasTasks, tab });

    await new Promise(r => setTimeout(r, 600));
  }

  console.log('=== TEST 1: Dark Mode Desktop (Empty Tasks) ===');
  await setupApp({ theme: 'dark', locale: 'en', hasTasks: false });
  const p1 = path.join(OUT_DIR, 'desktop_dark_empty_tasks.png');
  await page.screenshot({ path: p1 });
  copyToArtifacts(p1, 'desktop_dark_empty_tasks.png');

  // Measure card geometry
  const geomEmpty = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('main .rounded-3xl')).map(el => {
      const r = el.getBoundingClientRect();
      const text = el.innerText.split('\n')[0];
      return { text, top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height), left: Math.round(r.left), width: Math.round(r.width) };
    });
    return cards;
  });
  console.log('Geometry Empty:', JSON.stringify(geomEmpty, null, 2));

  // Assertions for Empty Tasks
  const finEmpty = geomEmpty.find(c => c.text.includes('Financial Health'));
  const quickEmpty = geomEmpty.find(c => c.text.includes('Quick Actions'));
  const tasksEmpty = geomEmpty.find(c => c.text.includes("Today's Tasks"));
  const routineEmpty = geomEmpty.find(c => c.text.includes('Routine & Prayer'));
  const streakEmpty = geomEmpty.find(c => c.text.includes('🔥'));

  if (Math.abs(finEmpty.top - quickEmpty.top) <= 2 && Math.abs(finEmpty.bottom - quickEmpty.bottom) <= 2) {
    console.log('✓ Row 1 Alignment PASS: Financial Health and Quick Actions tops and bottoms match!');
  } else {
    console.error('✗ Row 1 Alignment FAIL:', finEmpty, quickEmpty);
  }

  if (Math.abs(tasksEmpty.top - routineEmpty.top) <= 2 && Math.abs(tasksEmpty.bottom - streakEmpty.bottom) <= 2) {
    console.log('✓ Row 2 & 3 Alignment PASS: Today\'s Tasks height perfectly matches Routine & Prayer + Streak!');
  } else {
    console.error('✗ Row 2 & 3 Alignment FAIL:', tasksEmpty, routineEmpty, streakEmpty);
  }

  console.log('\n=== TEST 2: Dark Mode Desktop (With 3 Tasks) ===');
  await setupApp({ theme: 'dark', locale: 'en', hasTasks: true });
  const p2 = path.join(OUT_DIR, 'desktop_dark_with_tasks.png');
  await page.screenshot({ path: p2 });
  copyToArtifacts(p2, 'desktop_dark_with_tasks.png');

  const geomTasks = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('main .rounded-3xl')).map(el => {
      const r = el.getBoundingClientRect();
      const text = el.innerText.split('\n')[0];
      return { text, top: Math.round(r.top), bottom: Math.round(r.bottom), height: Math.round(r.height), left: Math.round(r.left), width: Math.round(r.width) };
    });
    return cards;
  });
  const tasksPop = geomTasks.find(c => c.text.includes("Today's Tasks"));
  const streakPop = geomTasks.find(c => c.text.includes('🔥'));
  if (Math.abs(tasksPop.bottom - streakPop.bottom) <= 2) {
    console.log('✓ Populated Tasks Alignment PASS: Height remains balanced with populated tasks!');
  } else {
    console.error('✗ Populated Tasks Alignment FAIL:', tasksPop, streakPop);
  }

  console.log('\n=== TEST 3: Light Mode Desktop (With Tasks) ===');
  await setupApp({ theme: 'light', locale: 'en', hasTasks: true });
  const p3 = path.join(OUT_DIR, 'desktop_light_with_tasks.png');
  await page.screenshot({ path: p3 });
  copyToArtifacts(p3, 'desktop_light_with_tasks.png');

  console.log('\n=== TEST 4: Multilingual RTL (Pashto ps-AF) ===');
  await setupApp({ theme: 'dark', locale: 'ps-AF', hasTasks: true });
  const p4 = path.join(OUT_DIR, 'desktop_pashto_rtl.png');
  await page.screenshot({ path: p4 });
  copyToArtifacts(p4, 'desktop_pashto_rtl.png');

  console.log('\n=== TEST 5: Multilingual RTL (Afghan Dari fa-AF) ===');
  await setupApp({ theme: 'dark', locale: 'fa-AF', hasTasks: true });
  const p5 = path.join(OUT_DIR, 'desktop_dari_rtl.png');
  await page.screenshot({ path: p5 });
  copyToArtifacts(p5, 'desktop_dari_rtl.png');

  console.log('\n=== TEST 6: Four Sidebar Positions Compatibility ===');
  // Left Collapsed
  await setupApp({ theme: 'dark', locale: 'en', sidebarPosition: 'left', sidebarCollapsed: true, hasTasks: true });
  const p6a = path.join(OUT_DIR, 'dashboard_sidebar_left_collapsed.png');
  await page.screenshot({ path: p6a });
  copyToArtifacts(p6a, 'dashboard_sidebar_left_collapsed.png');

  // Right Expanded
  await setupApp({ theme: 'dark', locale: 'en', sidebarPosition: 'right', sidebarCollapsed: false, hasTasks: true });
  const p6b = path.join(OUT_DIR, 'dashboard_sidebar_right_expanded.png');
  await page.screenshot({ path: p6b });
  copyToArtifacts(p6b, 'dashboard_sidebar_right_expanded.png');

  // Top Dock
  await setupApp({ theme: 'dark', locale: 'en', sidebarPosition: 'top', sidebarCollapsed: false, hasTasks: true });
  const p6c = path.join(OUT_DIR, 'dashboard_dock_top.png');
  await page.screenshot({ path: p6c });
  copyToArtifacts(p6c, 'dashboard_dock_top.png');

  // Bottom Dock
  await setupApp({ theme: 'dark', locale: 'en', sidebarPosition: 'bottom', sidebarCollapsed: false, hasTasks: true });
  const p6d = path.join(OUT_DIR, 'dashboard_dock_bottom.png');
  await page.screenshot({ path: p6d });
  copyToArtifacts(p6d, 'dashboard_dock_bottom.png');

  // Reset to Left Expanded
  await setupApp({ theme: 'dark', locale: 'en', sidebarPosition: 'left', sidebarCollapsed: false, hasTasks: true });

  console.log('\n=== TEST 7: Desktop Breakpoints Responsiveness ===');
  const desktopBreakpoints = [
    { w: 1024, h: 768, name: 'dashboard_1024x768.png' },
    { w: 1280, h: 800, name: 'dashboard_1280x800.png' },
    { w: 1366, h: 768, name: 'dashboard_1366x768.png' },
    { w: 1600, h: 900, name: 'dashboard_1600x900.png' },
    { w: 1920, h: 1080, name: 'dashboard_1920x1080.png' }
  ];

  for (const bp of desktopBreakpoints) {
    await page.setViewport({ width: bp.w, height: bp.h });
    await new Promise(r => setTimeout(r, 400));
    const pBp = path.join(OUT_DIR, bp.name);
    await page.screenshot({ path: pBp });
    copyToArtifacts(pBp, bp.name);
    console.log(`✓ Captured breakpoint ${bp.w}x${bp.h}`);
  }

  console.log('\n=== TEST 8: Mobile & Tablet Viewport Regressions (<1024px) ===');
  const mobileBreakpoints = [
    { w: 360, h: 800, name: 'mobile_360x800.png' },
    { w: 390, h: 844, name: 'mobile_390x844.png' },
    { w: 412, h: 915, name: 'mobile_412x915.png' },
    { w: 768, h: 1024, name: 'tablet_768x1024.png' }
  ];

  for (const mb of mobileBreakpoints) {
    await page.setViewport({ width: mb.w, height: mb.h });
    await new Promise(r => setTimeout(r, 400));

    // Verify mobile checks
    const mobileChecks = await page.evaluate(() => {
      const bottomNav = document.querySelector('nav') !== null;
      const desktopSidebar = window.getComputedStyle(document.querySelector('aside') || document.body).display;
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      const hasHorizontalScroll = scrollWidth > clientWidth;
      return { bottomNav, desktopSidebar, hasHorizontalScroll };
    });

    console.log(`Mobile ${mb.w}x${mb.h} checks:`, mobileChecks);
    if (!mobileChecks.hasHorizontalScroll) {
      console.log(`✓ No horizontal overflow at ${mb.w}x${mb.h}`);
    } else {
      console.error(`✗ Horizontal overflow detected at ${mb.w}x${mb.h}`);
    }

    const pMb = path.join(OUT_DIR, mb.name);
    await page.screenshot({ path: pMb });
    copyToArtifacts(pMb, mb.name);
  }

  await browser.close();
  console.log('\n===========================================');
  console.log('ALL DASHBOARD REFINEMENT TESTS COMPLETED!');
  console.log('===========================================');
})();
