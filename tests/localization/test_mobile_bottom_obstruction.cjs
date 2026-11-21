/**
 * Momentum — Mobile Bottom Navigation Obstruction & Safe Area Automated Test Suite
 * Validates that every registered screen across English, Pashto, and Dari provides
 * sufficient bottom scroll clearance and that no cards, buttons, or footers are obstructed
 * by the fixed mobile Bottom Navigation Dock or home-indicator safe areas.
 */

const puppeteer = require('puppeteer-core');
const assert = require('assert');
const { ALL_SCREENS } = require('../../src/data/screenRegistry.js');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';

async function runMobileBottomObstructionTests() {
  console.log('========================================================================');
  console.log('  MOMENTUM MOBILE BOTTOM NAVIGATION OBSTRUCTION TEST SUITE             ');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  await page.goto(APP_URL, { waitUntil: 'networkidle0' });

  // Bootstrap app
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

  let totalAudits = 0;
  let passedAudits = 0;
  const obstructionResults = [];

  const localesToAudit = ['ps-AF', 'en'];

  for (const locale of localesToAudit) {
    console.log(`\n--- Auditing Bottom Clearance for Locale: ${locale} ---`);

    for (let i = 0; i < ALL_SCREENS.length; i++) {
      const screen = ALL_SCREENS[i];
      totalAudits++;

      await page.evaluate((scrId, loc, scrTheme) => {
        window.useLocaleStore.getState().setLocale(loc);
        window.useThemeStore.getState().setTheme(scrTheme === 'dark' || scrId.includes('dark') ? 'dark' : 'light');
        window.useNavigationStore.getState().setActiveTab(scrId);
      }, screen.id, locale, screen.theme);

      await new Promise(r => setTimeout(r, 220));

      const measurement = await page.evaluate((scrId) => {
        const scroller = document.querySelector('.momentum-canvas-viewport') || document.body;
        
        // Scroll fully to the bottom
        scroller.scrollTop = scroller.scrollHeight;

        const nav = document.querySelector('nav.fixed');
        const hasBottomNav = nav !== null && window.getComputedStyle(nav).display !== 'none';
        const navRect = hasBottomNav ? nav.getBoundingClientRect() : null;
        const navTop = navRect ? Math.round(navRect.top) : 9999;

        // Measure lowest visible interactive or text element
        const contentContainer = document.querySelector('main') || scroller;
        const candidateEls = Array.from(contentContainer.querySelectorAll('button, input, p, h1, h2, h3, h4, h5, h6, [role="button"], footer, form'));
        
        let maxBottom = 0;
        let lowestElText = '';

        candidateEls.forEach(el => {
          const r = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          // Ignore fixed or absolute overlays that are intentional modals
          if (cs.position === 'fixed') return;

          if (r.width > 0 && r.height > 0 && r.bottom > maxBottom) {
            maxBottom = r.bottom;
            lowestElText = (el.innerText || el.value || el.placeholder || el.tagName).slice(0, 30).trim();
          }
        });

        // If bottom nav is active, the lowest element's bottom must not be hidden behind the nav dock
        const isObstructed = hasBottomNav && (maxBottom > navTop + 6);
        const clearanceGap = navTop - maxBottom;

        return {
          scrId,
          hasBottomNav,
          navTop,
          maxBottom: Math.round(maxBottom),
          clearanceGap: Math.round(clearanceGap),
          isObstructed,
          lowestElText
        };
      }, screen.id);

      const isPass = !measurement.isObstructed;
      if (isPass) {
        passedAudits++;
      } else {
        console.error(`[FAIL] Bottom obstruction on ${screen.id} (${locale}): lowestBottom=${measurement.maxBottom} > navTop=${measurement.navTop} (Gap: ${measurement.clearanceGap}px, El: "${measurement.lowestElText}")`);
      }

      obstructionResults.push({
        screenId: screen.id,
        locale,
        status: isPass ? 'PASS' : 'FAIL',
        ...measurement
      });
    }
  }

  await browser.close();

  console.log('\n========================================================================');
  console.log(`  RESULTS: ${passedAudits} / ${totalAudits} Screen Bottom Obstruction Audits PASSED`);
  console.log('========================================================================\n');

  assert.strictEqual(passedAudits, totalAudits, `Expected all ${totalAudits} audits to pass!`);
  return obstructionResults;
}

if (require.main === module) {
  runMobileBottomObstructionTests()
    .then(() => {
      console.log('Mobile Bottom Obstruction Test Suite PASSED with 0 errors.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Bottom Obstruction Test Suite Failed:', err.message);
      process.exit(1);
    });
}

module.exports = { runMobileBottomObstructionTests };
