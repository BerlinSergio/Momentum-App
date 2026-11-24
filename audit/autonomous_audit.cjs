'use strict';
/**
 * Independent, read-only source audit + isolated synthetic browser QA.
 * This file is intended for an ephemeral GitHub Actions runner. It MUST NOT
 * be used in a browser profile containing real user data.
 */
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const puppeteer = require('puppeteer');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'audit-results');
const SHOTS = path.join(OUT, 'screenshots');
const URL = process.env.MOMENTUM_AUDIT_URL || 'http://127.0.0.1:5173';
const now = () => new Date().toISOString();
fs.mkdirSync(SHOTS, { recursive: true });
const report = {
  sourceCommit: process.env.GITHUB_SHA || 'unknown',
  startedAt: now(),
  scope: 'STATIC source inspection + isolated browser smoke + synthetic CRUD/persistence',
  environment: 'GitHub Actions ephemeral Chromium profile; synthetic records only',
  source: {}, browser: { status: 'NOT_TESTED', cases: [], failures: [] },
  persistence: { status: 'NOT_TESTED', checks: [] },
  limitations: [
    'UI smoke does not prove that every button performs the correct action.',
    'Native Android/iOS permissions and hardware integrations are not verified in Chromium.',
    'Visual problems that require human judgment are not proven absent by geometry tests.',
    'Synthetic data is tested; real personal data is never accessed.'
  ]
};
function saveReport() {
  report.finishedAt = now();
  fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify(report, null, 2));
  const b = report.browser, p = report.persistence;
  const md = [
    '# Momentum automated independent audit',
    'Source commit: ' + report.sourceCommit,
    'Generated: ' + report.finishedAt,
    '',
    '## Static inventory',
    '- Source files inspected: ' + report.source.scannedFiles,
    '- Registered theme variants: ' + report.source.registryVariants,
    '- Missing App switch registrations: ' + report.source.registryMissingCases.length,
    '- Approximate JSX controls: ' + report.source.controls.length,
    '- Literal navigation calls: ' + report.source.navigation.length,
    '- Navigation references requiring review: ' + report.source.reviewNavigation.length,
    '',
    '## Browser',
    '- Status: ' + b.status,
    '- Checked route/theme/locale/viewport combinations: ' + b.cases.length,
    '- Failed cases: ' + b.failures.length,
    '- Screenshots saved: ' + (b.screenshotCount || 0),
    '',
    '## Database persistence',
    '- Status: ' + p.status,
    ...p.checks.map(x => '- ' + (x.pass ? 'PASS' : 'FAIL') + ': ' + x.name + ' (' + x.note + ')'),
    '',
    '## Limitations',
    ...report.limitations.map(x => '- ' + x),
    '',
    'Full inventories, issue details and per-screen measurements are in audit.json.'
  ];
  fs.writeFileSync(path.join(OUT, 'summary.md'), md.join('\n'));
}
function filesUnder(dir) {
  const found = [];
  for (const x of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', 'coverage', '.git'].includes(x.name)) continue;
    const full = path.join(dir, x.name);
    if (x.isDirectory()) found.push(...filesUnder(full));
    else if (x.isFile() && /\.(js|jsx|ts|tsx)$/.test(x.name)) found.push(full);
  }
  return found;
}
function lineNumber(s, i) { return s.slice(0, i).split('\n').length; }
async function staticAudit() {
  const module = await import(pathToFileURL(path.join(ROOT, 'src/data/screenRegistry.js')).href);
  const screens = module.ALL_SCREENS;
  const app = fs.readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');
  const appCases = new Set([...app.matchAll(/\bcase\s+['"]([^'"]+)['"]\s*:/g)].map(m => m[1]));
  const registryIds = new Set(screens.map(s => s.id));
  const missing = screens.map(s => s.id).filter(id => !appCases.has(id));
  const controls = [], navigation = [];
  const allFiles = filesUnder(path.join(ROOT, 'src'));
  function resolve(target) {
    if (appCases.has(target) || registryIds.has(target)) return true;
    let logical = target.replace(/_(dark|light)_mode(_\d+)?$/, (_, a, b) => b || '');
    if (logical === 'add_income') logical = 'add_edit_income';
    const variants = [logical, logical + '_dark_mode', logical + '_light_mode'];
    const numbered = logical.match(/^(.*)(_\d+)$/);
    if (numbered) {
      variants.push(numbered[1] + '_dark_mode' + numbered[2]);
      variants.push(numbered[1] + '_light_mode' + numbered[2]);
    }
    return variants.some(s => appCases.has(s) || registryIds.has(s));
  }
  for (const file of allFiles) {
    const source = fs.readFileSync(file, 'utf8');
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    for (const m of source.matchAll(/<(button|input|textarea|select)\b/g)) {
      const tag = source.slice(m.index, m.index + 650).split('>')[0];
      const label = tag.match(/(?:aria-label|data-testid|placeholder)=["']([^"']+)/);
      controls.push({ file: rel, line: lineNumber(source, m.index), type: m[1],
        hint: label ? label[1].slice(0, 100) : '', status: 'NOT_FUNCTIONALLY_TESTED' });
    }
    for (const m of source.matchAll(/\b(?:setActiveTab|navigateTo|goToScreen|openScreen)\s*\(\s*['"]([^'"]+)['"]/g)) {
      navigation.push({ file: rel, line: lineNumber(source, m.index),
        target: m[1], resolution: resolve(m[1]) ? 'STATIC_RESOLVED' : 'REVIEW' });
    }
  }
  report.source = { scannedFiles: allFiles.length, registryVariants: screens.length,
    logicalScreens: new Set(screens.map(s => s.id.replace(/_(dark|light)_mode$/, ''))).size,
    appSwitchCases: appCases.size, registryMissingCases: missing, controls, navigation,
    reviewNavigation: navigation.filter(n => n.resolution === 'REVIEW'),
    note: 'Regex extraction includes conditionally rendered code and does not evaluate dynamic target expressions.' };
  return screens;
}
function recordPersist(name, pass, note) {
  report.persistence.checks.push({ name, pass: Boolean(pass), note: String(note || '') });
}
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function persistenceAudit(page) {
  report.persistence.status = 'RUNNING';
  const id = 'qa-' + Date.now().toString(36);
  const marker = 'Momentum Synthetic Audit ' + id;
  try {
    const initial = await page.evaluate(({ id, marker }) => {
      const finance = window.useFinanceStore.getState();
      const tasks = window.useTaskStore.getState();
      const notes = window.useNotesStore.getState();
      finance.addIncome({ id, title: marker, amount: 1234, category: 'Salary', currency: 'AFN' });
      tasks.addTask({ id, title: marker, status: 'todo' });
      notes.addNote({ id, title: marker, body: 'Disposable synthetic QA record' });
      const hasIncome = window.useFinanceStore.getState().incomes.some(x => x.id === id);
      const hasTask = window.useTaskStore.getState().tasks.some(x => x.id === id);
      const hasNote = window.useNotesStore.getState().notes.some(x => x.id === id);
      return { hasIncome, hasTask, hasNote };
    }, { id, marker });
    recordPersist('Create Income, Task and Note in Zustand', initial.hasIncome && initial.hasTask && initial.hasNote, JSON.stringify(initial));
    await pause(1400);
    const idb = await page.evaluate(async () => {
      return new Promise(resolve => {
        const req = indexedDB.open('momentum_app_db');
        req.onerror = () => resolve({ open: false });
        req.onsuccess = () => {
          const db = req.result;
          if (!db.objectStoreNames.contains('stores')) { resolve({ open: true, hasStore: false }); db.close(); return; }
          const transaction = db.transaction('stores', 'readonly');
          const s = transaction.objectStore('stores');
          const keys = ['momentum-finance-storage', 'momentum-task-storage', 'momentum-notes-storage'];
          const result = { open: true, hasStore: true, data: {} };
          keys.forEach(key => {
            const get = s.get(key);
            get.onsuccess = () => { result.data[key] = Boolean(get.result); };
            get.onerror = () => { result.data[key] = false; };
          });
          transaction.oncomplete = () => { db.close(); resolve(result); };
          transaction.onerror = () => { db.close(); resolve({ open: true, error: true }); };
        };
      });
    });
    const idbOK = idb.open && idb.hasStore && ['momentum-finance-storage', 'momentum-task-storage', 'momentum-notes-storage'].every(k => idb.data?.[k]);
    recordPersist('IndexedDB records exist', idbOK, JSON.stringify(idb));
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => Boolean(window.useFinanceStore && window.useProfileStore), { timeout: 25000 });
    await pause(2600);
    const reloaded = await page.evaluate(id => ({
      income: window.useFinanceStore.getState().incomes.some(x => x.id === id),
      task: window.useTaskStore.getState().tasks.some(x => x.id === id),
      note: window.useNotesStore.getState().notes.some(x => x.id === id)
    }), id);
    recordPersist('Records survive browser reload', reloaded.income && reloaded.task && reloaded.note, JSON.stringify(reloaded));
    const edited = await page.evaluate(id => {
      window.useFinanceStore.getState().updateIncome(id, { amount: 5678 });
      window.useTaskStore.getState().updateTask(id, { title: 'Edited Synthetic QA' });
      window.useNotesStore.getState().updateNote(id, { body: 'Edited Synthetic QA' });
      const f = window.useFinanceStore.getState().incomes.filter(x => x.id === id);
      const t = window.useTaskStore.getState().tasks.filter(x => x.id === id);
      const n = window.useNotesStore.getState().notes.filter(x => x.id === id);
      return { finance: f.length === 1 && Number(f[0].amount) === 5678,
        task: t.length === 1 && t[0].title === 'Edited Synthetic QA',
        note: n.length === 1 && n[0].body === 'Edited Synthetic QA',
        duplicates: f.length > 1 || t.length > 1 || n.length > 1 };
    }, id);
    recordPersist('Update all three records without duplication', edited.finance && edited.task && edited.note && !edited.duplicates, JSON.stringify(edited));
    await pause(1000);
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => Boolean(window.useFinanceStore && window.useNotesStore), { timeout: 25000 });
    await pause(2400);
    const editedReload = await page.evaluate(id => ({
      finance: window.useFinanceStore.getState().incomes.some(x => x.id === id && Number(x.amount) === 5678),
      task: window.useTaskStore.getState().tasks.some(x => x.id === id && x.title === 'Edited Synthetic QA'),
      note: window.useNotesStore.getState().notes.some(x => x.id === id && x.body === 'Edited Synthetic QA')
    }), id);
    recordPersist('Updated values survive browser reload', Object.values(editedReload).every(Boolean), JSON.stringify(editedReload));
    const deleted = await page.evaluate(id => {
      window.useFinanceStore.getState().deleteIncome(id);
      window.useTaskStore.getState().deleteTask(id);
      window.useNotesStore.getState().deleteNote(id);
      return {
        finance: !window.useFinanceStore.getState().incomes.some(x => x.id === id),
        task: !window.useTaskStore.getState().tasks.some(x => x.id === id),
        note: !window.useNotesStore.getState().notes.some(x => x.id === id)
      };
    }, id);
    recordPersist('Delete all three synthetic records', Object.values(deleted).every(Boolean), JSON.stringify(deleted));
    await pause(1000);
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => Boolean(window.useFinanceStore && window.useNotesStore), { timeout: 25000 });
    await pause(2600);
    const deletedReload = await page.evaluate(id => ({
      finance: !window.useFinanceStore.getState().incomes.some(x => x.id === id),
      task: !window.useTaskStore.getState().tasks.some(x => x.id === id),
      note: !window.useNotesStore.getState().notes.some(x => x.id === id)
    }), id);
    recordPersist('Deletes persist after browser reload', Object.values(deletedReload).every(Boolean), JSON.stringify(deletedReload));
    report.persistence.status = report.persistence.checks.every(x => x.pass) ? 'PASS' : 'FAIL';
  } catch (e) {
    recordPersist('Persistence suite execution', false, e.message);
    report.persistence.status = 'FAIL';
  }
}
async function browserAudit(screens) {
  report.browser.status = 'RUNNING';
  let browser, screenshotCount = 0;
  try {
    browser = await puppeteer.launch({ headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(String(error.message).slice(0, 240)));
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => Boolean(window.useNavigationStore && window.useProfileStore && window.setIsAppLoading), { timeout: 30000 });
    await page.evaluate(() => {
      window.useProfileStore.getState().completeSetup();
      window.useSecurityStore.getState().setLocked(false);
      window.useNavigationStore.getState().setSidebarPosition('left');
      window.setIsAppLoading(false);
      window.useLocaleStore.getState().setLocale('en');
    });
    await pause(500);
    // Read-only route/render/geometry checks. No buttons are clicked here.
    for (const width of [390, 1440]) {
      await page.setViewport({ width, height: width < 500 ? 844 : 900, deviceScaleFactor: 1 });
      for (const locale of ['en', 'ps-AF', 'fa-AF']) {
        for (const screen of screens) {
          pageErrors.length = 0;
          await page.evaluate(({ id, theme, locale }) => {
            window.useThemeStore.getState().setTheme(theme);
            window.useLocaleStore.getState().setLocale(locale);
            window.setIsAppLoading(false);
            window.useNavigationStore.getState().setActiveTab(id);
          }, { id: screen.id, theme: screen.theme, locale });
          await pause(460);
          const result = await page.evaluate(({ id, width, locale }) => {
            const text = (document.body.innerText || '').trim();
            const labels = [];
            const small = [];
            const nodes = [...document.querySelectorAll('button, input, select, textarea, [role="button"]')];
            for (const node of nodes) {
              const r = node.getBoundingClientRect();
              if (!r.width || !r.height) continue;
              const name = (node.getAttribute('aria-label') || node.getAttribute('title') ||
                node.textContent || node.getAttribute('placeholder') || '').trim().slice(0, 90);
              if (!name) labels.push(node.tagName + (node.className ? '.' + String(node.className).slice(0, 45) : ''));
              if (r.width < 26 || r.height < 26) small.push({ tag: node.tagName, w: Math.round(r.width), h: Math.round(r.height) });
            }
            const logical = id.replace(/_(dark|light)_mode$/, '');
            const expected = locale === 'en' ? 'ltr' : 'rtl';
            return {
              id, logical, locale, width,
              activeTab: window.useNavigationStore?.getState().activeTab,
              hasNotFound: /Screen not found:/i.test(text),
              hasReactError: /Something went wrong|ReferenceError|TypeError:/.test(text),
              contentLength: text.length,
              bodyOverflowPx: Math.max(0, Math.round(document.documentElement.scrollWidth - innerWidth)),
              dir: document.documentElement.dir,
              expectedDir: expected,
              controls: nodes.length, anonymousControls: labels.slice(0, 30),
              smallTargets: small.slice(0, 30)
            };
          }, { id: screen.id, width, locale });
          const problems = [];
          if (result.hasNotFound) problems.push('SCREEN_NOT_FOUND');
          if (result.hasReactError) problems.push('REACT_ERROR_UI');
          if (result.contentLength < 12 && !screen.id.startsWith('splash_screen')) problems.push('POSSIBLY_BLANK');
          if (result.bodyOverflowPx > 5) problems.push('HORIZONTAL_OVERFLOW');
          if (result.dir !== result.expectedDir) problems.push('LANGUAGE_DIRECTION');
          if (pageErrors.length) problems.push('PAGE_ERROR');
          const rec = { ...result, problems, pageErrors: pageErrors.slice(0, 5),
            status: problems.length ? 'FAIL' : 'PASS' };
          report.browser.cases.push(rec);
          if (problems.length) {
            report.browser.failures.push({ id: rec.id, locale, width, problems, pageErrors: rec.pageErrors });
            if (screenshotCount < 35) {
              try {
                const filename = [screen.id, locale.replace('-', '_'), width].join('_') + '.png';
                await page.screenshot({ path: path.join(SHOTS, filename), fullPage: false });
                screenshotCount++;
              } catch (e) { /* Screenshot failure does not erase the issue. */ }
            }
          }
          if (report.browser.cases.length % 60 === 0) {
            console.log('Browser checks:', report.browser.cases.length, 'failures:', report.browser.failures.length);
            saveReport();
          }
        }
      }
    }
    report.browser.screenshotCount = screenshotCount;
    report.browser.status = report.browser.failures.length ? 'FAIL' : 'PASS';
    await persistenceAudit(page);
  } catch (e) {
    report.browser.status = 'BLOCKED';
    report.browser.failures.push({ type: 'AUDIT_HARNESS_ERROR', message: String(e.message) });
  } finally { if (browser) await browser.close(); }
}
async function main() {
  try {
    const screens = await staticAudit();
    saveReport();
    await browserAudit(screens);
  } catch (e) {
    report.fatal = String(e.stack || e);
  } finally {
    saveReport();
    console.log(JSON.stringify({
      source: { scannedFiles: report.source.scannedFiles, controls: report.source.controls?.length,
        registryVariants: report.source.registryVariants, unresolvedRoutes: report.source.reviewNavigation?.length },
      browser: { status: report.browser.status, checks: report.browser.cases.length, failures: report.browser.failures.length },
      persistence: { status: report.persistence.status, checks: report.persistence.checks }
    }, null, 2));
    if (report.fatal || report.browser.status !== 'PASS' || report.persistence.status !== 'PASS') process.exitCode = 1;
  }
}
main();