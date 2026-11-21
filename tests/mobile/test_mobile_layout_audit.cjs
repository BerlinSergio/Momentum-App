/**
 * Momentum mobile screen geometry audit.
 * Run in a SECOND PowerShell window while "npm.cmd run dev" serves localhost:5173.
 * Uses a temporary headless Chrome profile (never touches your Chrome user data).
 *
 * Tests every logical route in screenRegistry at phone sizes, for both themes,
 * in English, Pashto and Dari. Captures screenshots of any detected issue.
 * No automatic pass claim: this test reports measurements that need review.
 *
 * Example:
 *   node tests/mobile/test_mobile_layout_audit.cjs
 * Fast first pass:
 *   $env:MOBILE_QA_QUICK="1"; node tests/mobile/test_mobile_layout_audit.cjs
 */
const puppeteer = require('puppeteer');
const fs = require('node:fs');
const path = require('node:path');

const APP_URL = process.env.MOMENTUM_URL || 'http://localhost:5173';
const QUICK = process.env.MOBILE_QA_QUICK === '1';
const WIDTHS = QUICK ? [390] : [320, 360, 390, 412];
const LOCALES = QUICK ? ['ps-AF'] : ['en', 'ps-AF', 'fa-AF'];
const MODES = ['light', 'dark'];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const OUTPUT = path.resolve(process.cwd(), 'scratch/mobile_layout_audit.json');
const SHOTS = path.resolve(process.cwd(), 'scratch/mobile_layout_audit_screenshots');
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.mkdirSync(SHOTS, { recursive: true });

function safeFile(text) {
  return text.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 110);
}

async function main() {
  const { ALL_SCREENS } = await import('../../src/data/screenRegistry.js');
  const logical = (s) => s.replace(/_(dark|light)_mode(_\d+)?$/, '$2');
  const screens = Array.from(new Set(ALL_SCREENS.map((s) => logical(s.id))));
  const chromeChoices = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ].filter(Boolean);
  const executablePath = chromeChoices.find((p) => fs.existsSync(p));
  const browser = await puppeteer.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  const failures = [];
  const records = [];
  let captured = 0;

  try {
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
    await page.goto(APP_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(
      () => Boolean(window.useNavigationStore && window.useProfileStore && window.setIsAppLoading),
      { timeout: 30000 }
    );
    await page.evaluate(() => {
      const profile = window.useProfileStore.getState();
      profile.completeSetup?.();
      profile.updateProfile?.({ fullName: 'Mobile QA Tester', setupCompleted: true });
      window.useSecurityStore?.getState().setLocked?.(false);
      window.useNavigationStore.getState().setSidebarPosition('left');
      window.setIsAppLoading(false);
    });
    await wait(500);

    async function snapshot(label, measure) {
      const issue = measure.issues.length > 0;
      const record = { label, ...measure, status: issue ? 'FAIL' : 'PASS' };
      records.push(record);
      if (issue) {
        failures.push(record);
        if (captured < 30) {
          await page.screenshot({ path: path.join(SHOTS, safeFile(label) + '.png') });
          captured++;
        }
      }
      return record;
    }

    for (const width of WIDTHS) {
      await page.setViewport({ width, height: width <= 320 ? 568 : width <= 360 ? 800 : width === 390 ? 844 : 915, isMobile: true, deviceScaleFactor: 1 });
      for (const locale of LOCALES) {
        for (const mode of MODES) {
          for (const screen of screens) {
            await page.evaluate(({ locale, mode, screen }) => {
              window.useLocaleStore.getState().setLocale(locale);
              window.useThemeStore.getState().setTheme(mode);
              // Switch the active route directly for testing without building a
              // 1000-item navigation history. User data is not modified.
              window.useNavigationStore.setState({
                activeTab: screen,
                routeParams: {},
                historyStack: [],
              });
            }, { locale, mode, screen });
            await wait(155);
            const measure = await page.evaluate(() => {
              const issues = [];
              const viewport = document.querySelector('.momentum-canvas-viewport');
              if (!viewport) return { issues: ['MISSING_APP_VIEWPORT'] };
              const vr = viewport.getBoundingClientRect();
              if (viewport.scrollWidth > viewport.clientWidth + 3) {
                issues.push('HORIZONTAL_CONTENT_OVERFLOW:' + (viewport.scrollWidth - viewport.clientWidth) + 'px');
              }
              if (document.documentElement.scrollWidth > window.innerWidth + 3) {
                issues.push('DOCUMENT_OVERFLOW:' + (document.documentElement.scrollWidth - window.innerWidth) + 'px');
              }
              const root = viewport.querySelector('[class*="flex-1"]') || viewport;
              if ((root.innerText || '').includes('Screen not found:')) {
                issues.push('UNRESOLVED_SCREEN');
              }
              Array.from(viewport.querySelectorAll('header, .note-sheet-card')).forEach((el) => {
                const css = window.getComputedStyle(el);
                const r = el.getBoundingClientRect();
                if (css.display === 'none' || css.visibility === 'hidden' || r.width < 1 || r.height < 1) return;
                if (r.bottom < vr.top || r.top > vr.bottom) return;
                if (r.left < vr.left - 3 || r.right > vr.right + 3) {
                  issues.push('HEADER_OR_CARD_CLIPPED:' + el.tagName.toLowerCase() + ':' + Math.round(r.left) + '..' + Math.round(r.right));
                }
              });
              const nav = document.querySelector('[data-testid="mobile-bottom-nav"]');
              if (nav) {
                const tabs = ['home', 'finance', 'tasks', 'more'].map((id) =>
                  nav.querySelector('[data-testid="mobile-tab-' + id + '"] svg')
                );
                if (tabs.every(Boolean)) {
                  const centers = tabs.map((icon) => {
                    const r = icon.getBoundingClientRect();
                    return Math.round((r.top + r.bottom) / 2);
                  });
                  if (Math.max(...centers) - Math.min(...centers) > 3) {
                    issues.push('BOTTOM_ICON_VERTICAL_MISALIGNMENT:' + centers.join(','));
                  }
                } else issues.push('BOTTOM_NAV_ICON_MISSING');
              }
              return {
                issues,
                appWidth: Math.round(vr.width),
                viewportWidth: window.innerWidth,
                screenWidth: viewport.scrollWidth,
              };
            });
            const label = width + '_' + locale + '_' + mode + '_' + screen;
            await snapshot(label, measure);
            if (records.length % 50 === 0) {
              console.log('Audited ' + records.length + ' mobile route/locale/theme/size combinations; failures=' + failures.length);
            }
          }
        }
      }
    }

    // Explicit RTL dropdown clipping repro from the supplied Notes screenshot.
    for (const width of WIDTHS) {
      await page.setViewport({ width, height: 844, isMobile: true, deviceScaleFactor: 1 });
      for (const locale of LOCALES) {
        for (const mode of MODES) {
          for (const screen of ['long_note_editor', 'quick_note_editor']) {
            await page.evaluate(({ locale, mode, screen }) => {
              window.useLocaleStore.getState().setLocale(locale);
              window.useThemeStore.getState().setTheme(mode);
              window.useNavigationStore.setState({
                activeTab: screen, historyStack: [], routeParams: { isNew: true },
              });
            }, { locale, mode, screen });
            await wait(230);
            const btn = await page.$('[aria-label="Note options"]');
            const label = 'POPOVER_' + width + '_' + locale + '_' + mode + '_' + screen;
            if (!btn) {
              await snapshot(label, { issues: ['OPTIONS_BUTTON_NOT_FOUND'] });
              continue;
            }
            await btn.click();
            await wait(150);
            const geometry = await page.evaluate(() => {
              const trigger = document.querySelector('[aria-label="Note options"]');
              const menu = trigger?.parentElement?.querySelector('div.absolute');
              const root = document.querySelector('.momentum-canvas-viewport');
              if (!menu || !root) return { issues: ['OPTIONS_MENU_NOT_VISIBLE'] };
              const m = menu.getBoundingClientRect();
              const v = root.getBoundingClientRect();
              const issues = [];
              if (m.left < v.left - 2 || m.right > v.right + 2) {
                issues.push('OPTIONS_MENU_HORIZONTAL_CLIP:' + Math.round(m.left) + '..' + Math.round(m.right));
              }
              if (m.width < 140) issues.push('OPTIONS_MENU_TOO_NARROW');
              return { issues, menuLeft: Math.round(m.left), menuRight: Math.round(m.right) };
            });
            await snapshot(label, geometry);
            await page.evaluate(() => document.querySelector('[aria-label="Note options"]')?.click());
          }
        }
      }
    }
  } finally {
    fs.writeFileSync(OUTPUT, JSON.stringify({
      date: new Date().toISOString(),
      screens: records.length,
      passed: records.length - failures.length,
      failed: failures.length,
      failures,
      records,
    }, null, 2));
    await browser.close();
  }
  console.log('Mobile audit complete: ' + records.length + ' checks, ' + failures.length + ' failures.');
  console.log('Report: ' + OUTPUT);
  console.log('Screenshot directory: ' + SHOTS);
  if (failures.length) {
    console.error('First failures:', failures.slice(0, 12).map((f) => f.label + ': ' + f.issues.join('; ')));
    process.exitCode = 1;
  }
}
main().catch((err) => { console.error('Mobile audit stopped:', err); process.exitCode = 1; });
