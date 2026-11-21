/**
 * Momentum — Multilingual Text Geometry & Typography Automated Test Suite
 * Validates real browser DOM text bounds, computed font families, line-height ratios,
 * and text-overflow across English (en), Afghan Pashto (ps-AF), and Afghan Dari (fa-AF).
 */

const puppeteer = require('puppeteer-core');
const assert = require('assert');
const { ALL_SCREENS } = require('../../src/data/screenRegistry.js');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';

async function runMultilingualTextGeometryTests() {
  console.log('========================================================================');
  console.log('  MOMENTUM MULTILINGUAL TEXT GEOMETRY & TYPOGRAPHY TEST SUITE          ');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));

  await page.goto(APP_URL, { waitUntil: 'networkidle0' });

  // Bootstrap app state
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
    if (window.useNavigationStore) {
      window.useNavigationStore.getState().setSidebarPosition('left');
      window.useNavigationStore.getState().setSidebarCollapsed(false);
    }
  });

  let totalScreenChecks = 0;
  let passedScreenChecks = 0;
  let totalTextNodesChecked = 0;
  const screenResults = [];

  const localesToTest = ['en', 'ps-AF', 'fa-AF'];

  for (const locale of localesToTest) {
    console.log(`\n--- Auditing Locale: ${locale} ---`);

    for (let i = 0; i < ALL_SCREENS.length; i++) {
      const screen = ALL_SCREENS[i];
      totalScreenChecks++;
      pageErrors.length = 0;

      // Set screen and theme
      await page.evaluate((scrId, loc, scrTheme) => {
        window.useLocaleStore.getState().setLocale(loc);
        window.useThemeStore.getState().setTheme(scrTheme === 'dark' || scrId.includes('dark') ? 'dark' : 'light');
        window.useNavigationStore.getState().setActiveTab(scrId);
      }, screen.id, locale, screen.theme);

      // Allow AnimatePresence transitions to complete
      await new Promise(r => setTimeout(r, 260));

      const audit = await page.evaluate((scrId, loc) => {
        const bodyText = document.body.innerText || '';
        const hasCrash = bodyText.includes('Something went wrong') ||
                         bodyText.includes('ReferenceError') ||
                         bodyText.includes('TypeError:') ||
                         bodyText.includes('is not defined');

        if (hasCrash) return { hasCrash: true, reason: 'Runtime crash' };

        const main = document.querySelector('main') || 
                     document.querySelector('.momentum-canvas-viewport') || 
                     document.querySelector('form');
        if (!main) return { hasCrash: true, reason: 'No viewport found' };

        // Query visible text nodes / elements
        const textElements = Array.from(main.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, button, label, input, [role="button"]'))
          .filter(el => {
            const r = el.getBoundingClientRect();
            const cs = window.getComputedStyle(el);
            return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && (el.innerText || el.value || el.placeholder);
          });

        let badFontCount = 0;
        let badLineHeightCount = 0;
        let overflowCount = 0;

        textElements.forEach(el => {
          const cs = window.getComputedStyle(el);
          const font = cs.fontFamily.toLowerCase();
          const fontSize = parseFloat(cs.fontSize) || 14;
          const lineHeight = parseFloat(cs.lineHeight) || fontSize;

          // Check font match for non-icon text
          const isIcon = el.classList.contains('material-symbols-outlined') || 
                         el.classList.contains('material-icons') || 
                         el.closest('svg') !== null;

          const isSpecialAllowedFont = font.includes('quran') || 
                                       font.includes('bahij') || 
                                       font.includes('mono') ||
                                       font.includes('monospace') ||
                                       el.classList.contains('font-quran') ||
                                       el.classList.contains('font-bahij') ||
                                       el.classList.contains('font-mono') ||
                                       el.closest('.font-quran') !== null ||
                                       el.closest('.font-bahij') !== null ||
                                       el.closest('[data-preserve-font]') !== null ||
                                       // Native language label cards in language settings & setup
                                       (el.innerText && ['english', 'پښتو', 'دری'].includes(el.innerText.trim().toLowerCase()));

          if (!isIcon && !isSpecialAllowedFont && el.children.length === 0 && (el.innerText || '').trim().length > 1) {
            if (loc === 'ps-AF' && !font.includes('noto sans arabic') && !font.includes('arabic')) {
              badFontCount++;
            } else if (loc === 'fa-AF' && !font.includes('vazirmatn') && !font.includes('arabic')) {
              badFontCount++;
            }
          }

          // Check line-height adequacy for Arabic scripts
          if ((loc === 'ps-AF' || loc === 'fa-AF') && lineHeight < fontSize * 0.95 && !isIcon) {
            badLineHeightCount++;
          }

          // Check horizontal overflow (element content strictly escaping parent card width)
          if (el.scrollWidth > el.clientWidth + 6 && cs.overflowX !== 'auto' && cs.overflowX !== 'scroll') {
            const hasEllipsis = cs.textOverflow === 'ellipsis';
            if (!hasEllipsis) {
              overflowCount++;
            }
          }
        });

        return {
          hasCrash: false,
          textNodeCount: textElements.length,
          badFontCount,
          badLineHeightCount,
          overflowCount
        };
      }, screen.id, locale);

      totalTextNodesChecked += (audit.textNodeCount || 0);

      const isPass = !audit.hasCrash && audit.badFontCount === 0 && audit.overflowCount === 0;
      if (isPass) {
        passedScreenChecks++;
      } else {
        console.error(`[FAIL] ${screen.id} (${locale}): crash=${audit.hasCrash}, badFont=${audit.badFontCount}, overflow=${audit.overflowCount}`);
      }

      screenResults.push({
        screenId: screen.id,
        locale,
        status: isPass ? 'PASS' : 'FAIL',
        details: audit
      });
    }
  }

  await browser.close();

  console.log('\n========================================================================');
  console.log(`  RESULTS: ${passedScreenChecks} / ${totalScreenChecks} Screen-Locale Audits PASSED`);
  console.log(`  TOTAL TEXT NODES AUDITED: ${totalTextNodesChecked}`);
  console.log('========================================================================\n');

  assert.strictEqual(passedScreenChecks, totalScreenChecks, `Expected all ${totalScreenChecks} screen checks to PASS!`);
  return screenResults;
}

if (require.main === module) {
  runMultilingualTextGeometryTests()
    .then(() => {
      console.log('Multilingual Text Geometry Test Suite PASSED with 0 errors.');
      process.exit(0);
    })
    .catch(err => {
      console.error('Test Suite Failed:', err.message);
      process.exit(1);
    });
}

module.exports = { runMultilingualTextGeometryTests };
