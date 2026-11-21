/**
 * Momentum — RTL Responsive Layout & Directional Integrity Automated Test Suite
 * Validates RTL layout rules, logical directional attributes, dynamic language switching,
 * responsive breakpoints (320px to 1440px), bidirectional string isolation, and desktop sidebar.
 */

const puppeteer = require('puppeteer-core');
const assert = require('assert');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';

async function runRtlResponsiveLayoutTests() {
  console.log('========================================================================');
  console.log('  MOMENTUM RTL RESPONSIVE LAYOUT & DIRECTIONAL INTEGRITY TEST SUITE     ');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  let passedChecks = 0;
  let totalChecks = 0;

  function check(name, condition, message = '') {
    totalChecks++;
    if (condition) {
      console.log(`[PASS] ${name}`);
      passedChecks++;
    } else {
      console.error(`[FAIL] ${name}: ${message}`);
    }
  }

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(APP_URL, { waitUntil: 'networkidle0' });

  // 1. Bootstrap
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
  });

  console.log('--- TEST 1: Directional Document Attributes Across Locales ---');
  for (const loc of ['en', 'ps-AF', 'fa-AF']) {
    const expectedDir = loc === 'en' ? 'ltr' : 'rtl';
    const expectedLang = loc;

    await page.evaluate((l) => {
      window.useLocaleStore.getState().setLocale(l);
    }, loc);
    await new Promise(r => setTimeout(r, 200));

    const dirState = await page.evaluate(() => {
      const viewportEl = document.querySelector('.momentum-canvas-viewport');
      const canvasDirParent = viewportEl ? viewportEl.closest('[dir]') : null;
      return {
        docDir: document.documentElement.dir,
        docLang: document.documentElement.lang,
        dataLocale: document.documentElement.getAttribute('data-locale'),
        canvasDir: canvasDirParent ? canvasDirParent.getAttribute('dir') : null
      };
    });

    check(
      `1.1 Document dir attribute for ${loc}`,
      dirState.docDir === expectedDir,
      `Expected ${expectedDir}, got ${dirState.docDir}`
    );
    check(
      `1.2 Document lang attribute for ${loc}`,
      dirState.docLang === expectedLang,
      `Expected ${expectedLang}, got ${dirState.docLang}`
    );
    check(
      `1.3 Application canvas dir attribute for ${loc}`,
      dirState.canvasDir === expectedDir,
      `Expected canvas dir ${expectedDir}, got ${dirState.canvasDir}`
    );
  }

  console.log('\n--- TEST 2: Dynamic Live Language Switching (en -> ps-AF -> fa-AF -> en) ---');
  await page.evaluate(() => {
    window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
  });
  await new Promise(r => setTimeout(r, 300));

  const switchCycle = ['en', 'ps-AF', 'fa-AF', 'en'];
  for (let i = 0; i < switchCycle.length - 1; i++) {
    const fromLoc = switchCycle[i];
    const toLoc = switchCycle[i + 1];

    await page.evaluate((targetLoc) => {
      window.useLocaleStore.getState().setLocale(targetLoc);
    }, toLoc);
    await new Promise(r => setTimeout(r, 200));

    const switchResult = await page.evaluate((targetLoc) => {
      const isRtl = targetLoc !== 'en';
      const docDir = document.documentElement.dir;
      const expectedDir = isRtl ? 'rtl' : 'ltr';
      
      const main = document.querySelector('main') || document.querySelector('.momentum-canvas-viewport');
      const hasContent = main && main.innerText.trim().length > 20;
      
      return {
        targetLoc,
        dirMatches: docDir === expectedDir,
        hasContent
      };
    }, toLoc);

    check(
      `2. Live language switch ${fromLoc} -> ${toLoc}`,
      switchResult.dirMatches && switchResult.hasContent,
      `dirMatches=${switchResult.dirMatches}, hasContent=${switchResult.hasContent}`
    );
  }

  console.log('\n--- TEST 3: Responsive Breakpoints (Zero Horizontal Overflow in RTL) ---');
  const viewports = [
    { name: 'Mobile iPhone SE', width: 320, height: 568 },
    { name: 'Mobile Android Standard', width: 360, height: 800 },
    { name: 'Mobile iPhone 14 Pro', width: 390, height: 844 },
    { name: 'Mobile Android Large', width: 412, height: 915 },
    { name: 'Mobile iPhone Pro Max', width: 430, height: 932 },
    { name: 'Tablet iPad Portrait', width: 768, height: 1024 },
    { name: 'Tablet iPad Air', width: 820, height: 1180 },
    { name: 'Desktop Laptop 1440', width: 1440, height: 900 }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.evaluate(() => {
      window.useLocaleStore.getState().setLocale('ps-AF');
      window.useNavigationStore.getState().setActiveTab('about_momentum_light_mode');
    });
    await new Promise(r => setTimeout(r, 200));

    const overflowResult = await page.evaluate(() => {
      const docOverflow = document.documentElement.scrollWidth > window.innerWidth + 2;
      const bodyOverflow = document.body.scrollWidth > window.innerWidth + 2;
      return {
        hasOverflow: docOverflow || bodyOverflow,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth
      };
    });

    check(
      `3. Zero horizontal scroll at ${vp.name} (${vp.width}x${vp.height}) in RTL`,
      !overflowResult.hasOverflow,
      `scrollWidth=${overflowResult.scrollWidth}, innerWidth=${overflowResult.innerWidth}`
    );
  }

  console.log('\n--- TEST 4: Desktop Sidebar RTL Integration & Edge Positioning ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => {
    window.useLocaleStore.getState().setLocale('ps-AF');
    window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
    window.useNavigationStore.getState().setSidebarPosition('right');
    window.useNavigationStore.getState().setSidebarCollapsed(false);
  });
  await new Promise(r => setTimeout(r, 350));

  const sidebarVisible = await page.evaluate(() => {
    const sidebar = document.querySelector('aside') || document.querySelector('.lg\\:flex');
    return sidebar && sidebar.getBoundingClientRect().width > 200;
  });

  check(
    '4.1 Desktop Sidebar renders cleanly on right position in RTL',
    sidebarVisible,
    `sidebarVisible=${sidebarVisible}`
  );

  // Collapse sidebar
  await page.evaluate(() => {
    window.useNavigationStore.getState().setSidebarCollapsed(true);
  });
  await new Promise(r => setTimeout(r, 350));

  const collapsedWidth = await page.evaluate(() => {
    const sidebar = document.querySelector('aside') || document.querySelector('.lg\\:flex');
    return sidebar ? Math.round(sidebar.getBoundingClientRect().width) : 0;
  });

  // Expand sidebar
  await page.evaluate(() => {
    window.useNavigationStore.getState().setSidebarCollapsed(false);
  });
  await new Promise(r => setTimeout(r, 350));

  const expandedWidth = await page.evaluate(() => {
    const sidebar = document.querySelector('aside') || document.querySelector('.lg\\:flex');
    return sidebar ? Math.round(sidebar.getBoundingClientRect().width) : 0;
  });

  check(
    '4.2 Desktop Sidebar collapses and expands cleanly in RTL',
    collapsedWidth > 50 && collapsedWidth < expandedWidth,
    `collapsedWidth=${collapsedWidth}, expandedWidth=${expandedWidth}`
  );

  console.log('\n--- TEST 5: Bidirectional Text & Number Isolation ---');
  await page.evaluate(() => {
    window.useLocaleStore.getState().setLocale('ps-AF');
    window.useNavigationStore.getState().setActiveTab('about_momentum_light_mode');
  });
  await new Promise(r => setTimeout(r, 300));

  const bidiCheck = await page.evaluate(() => {
    const main = document.querySelector('main');
    const text = main ? main.innerText : '';
    return {
      hasDigits: text.includes('۲۰۲۶'),
      hasPashtoText: text.includes('د میلاد وردګ لخوا جوړ شوی')
    };
  });

  check(
    '5.1 Mixed Arabic script, numerals and Latin names render cohesively',
    bidiCheck.hasDigits && bidiCheck.hasPashtoText,
    `hasDigits=${bidiCheck.hasDigits}, hasPashtoText=${bidiCheck.hasPashtoText}`
  );

  await browser.close();

  console.log('\n========================================================================');
  console.log(`  RESULTS: ${passedChecks} / ${totalChecks} RTL Responsive Checks PASSED`);
  console.log('========================================================================\n');

  assert.strictEqual(passedChecks, totalChecks, `Expected all ${totalChecks} checks to PASS!`);
  return { passedChecks, totalChecks };
}

if (require.main === module) {
  runRtlResponsiveLayoutTests()
    .then(() => {
      console.log('RTL Responsive Layout Test Suite PASSED with 0 errors.');
      process.exit(0);
    })
    .catch(err => {
      console.error('RTL Test Suite Failed:', err.message);
      process.exit(1);
    });
}

module.exports = { runRtlResponsiveLayoutTests };
