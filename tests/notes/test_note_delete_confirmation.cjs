/**
 * Momentum browser regression: Long Note deletion, cancellation, and navigation.
 * Uses a fresh temporary headless Chromium profile, NOT the user's browser data.
 * Run against a local Vite dev server (npm.cmd run dev), no real notes are used.
 *
 * node tests/notes/test_note_delete_confirmation.cjs
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const url = process.env.MOMENTUM_URL || 'http://localhost:5173/';
const screenshots = path.resolve(process.cwd(), 'scratch/note_delete_qa');
const chromePaths = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);
const executablePath = chromePaths.find((p) => fs.existsSync(p));
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  fs.mkdirSync(screenshots, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  let step = 'start';
  const page = await browser.newPage();
  const failures = [];
  page.on('pageerror', (error) => failures.push(String(error)));
  try {
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(
      () => Boolean(window.useNotesStore && window.useNavigationStore && window.useConfirmStore && window.setIsAppLoading),
      { timeout: 30000 }
    );
    await page.evaluate(() => {
      const profile = window.useProfileStore?.getState();
      profile?.completeSetup?.();
      profile?.updateProfile?.({ fullName: 'QA Notes Tester', setupCompleted: true });
      window.useSecurityStore?.getState().setLocked?.(false);
      window.useLocaleStore?.getState().setLocale('ps-AF');
      window.setIsAppLoading(false);
    });
    await delay(650);

    // Verify the shared confirmation sheet resolves its promise on a real
    // mobile button tap, independently of the Notes screen.
    for (const [action, expected] of [['cancel', false], ['confirm', true]]) {
      step = 'modal-promise-' + action;
      await page.evaluate(() => {
        window.__qaConfirmationResult = undefined;
        window.momentumConfirm({
          title: 'QA confirmation',
          description: 'Confirmation button should work',
          confirmText: 'Confirm',
          cancelText: 'Cancel',
          variant: 'destructive',
        }).then((value) => { window.__qaConfirmationResult = value; });
      });
      const selector = '[data-testid="momentum-dialog-' + action + '-btn"]';
      await page.waitForSelector(selector, { visible: true, timeout: 6000 });
      await page.click(selector);
      await page.waitForFunction(() => typeof window.__qaConfirmationResult === 'boolean');
      const value = await page.evaluate(() => window.__qaConfirmationResult);
      assert.equal(value, expected, 'Global confirmation must resolve ' + action);
    }
    console.log('PASS: shared confirmation sheet buttons resolve promises');

    async function openDeleteMenu() {
      await page.waitForSelector('[aria-label="Note options"]', { visible: true, timeout: 12000 });
      await page.click('[aria-label="Note options"]');
      const deleteSelector = '[aria-label="Note options"] + div.absolute > button:last-of-type';
      await page.waitForSelector(deleteSelector, { visible: true, timeout: 6000 });
      await page.click(deleteSelector);
      await page.waitForSelector('[data-testid="momentum-dialog-confirm-btn"]', { visible: true, timeout: 6000 });
    }

    for (const theme of ['light', 'dark']) {
      const id = 'qa-note-delete-' + theme + '-' + Date.now();
      step = theme + ':seed';
      await page.evaluate(({ id, theme }) => {
        const notes = window.useNotesStore.getState();
        notes.addNote({
          id,
          title: 'QA DELETE - temporary note',
          type: 'long',
          body: '<p>Only used for this isolated test.</p>',
        });
        notes.setActiveNoteId(id);
        window.useThemeStore.getState().setTheme(theme);
        const nav = window.useNavigationStore.getState();
        nav.setActiveTab('notes_main');
        nav.setActiveTab('long_note_editor', { isNew: false, noteId: id });
      }, { id, theme });
      await delay(650);

      step = theme + ':cancel-open';
      await openDeleteMenu();
      let modalTheme = await page.evaluate(() => ({
        dark: document.documentElement.classList.contains('dark'),
        modalBg: getComputedStyle(document.querySelector('[role="alertdialog"]')).backgroundColor,
      }));
      assert.equal(modalTheme.dark, theme === 'dark');
      step = theme + ':cancel-click';
      await page.click('[data-testid="momentum-dialog-cancel-btn"]');
      await page.waitForFunction(() => !window.useConfirmStore.getState().isOpen);
      const existsAfterCancel = await page.evaluate((noteId) =>
        window.useNotesStore.getState().notes.some((note) => note.id === noteId), id);
      assert.ok(existsAfterCancel, 'Cancel must keep the saved note');

      step = theme + ':confirm-open';
      await openDeleteMenu();
      const desc = await page.$eval('[role="alertdialog"]',
        (el) => el.textContent || '');
      assert.ok(desc.length > 15, 'Deletion message must be visible');

      step = theme + ':confirm-click';
      await page.click('[data-testid="momentum-dialog-confirm-btn"]');
      await page.waitForFunction((noteId) =>
        !window.useNotesStore.getState().notes.some((note) => note.id === noteId) &&
        !window.useConfirmStore.getState().isOpen,
        { timeout: 7000 }, id);

      const result = await page.evaluate(() => ({
        activeTab: window.useNavigationStore.getState().activeTab,
        activeNoteId: window.useNotesStore.getState().activeNoteId,
      }));
      assert.equal(result.activeNoteId, null, 'Delete should clear the active note reference');
      assert.ok(result.activeTab.includes('notes_main'), 'Delete should return to Notes');
      console.log('PASS: ' + theme + ' mode / Pashto mobile: cancel preserves, delete removes, returns to Notes');
    }
    assert.deepEqual(failures, [], 'No runtime page errors');
    console.log('All note-deletion confirmation tests passed.');
  } catch (error) {
    console.error('FAIL at step:', step, String(error));
    if (failures.length) console.error('Browser errors:', failures.slice(0, 10));
    try { await page.screenshot({ path: path.join(screenshots, 'failure-' + step.replace(/[^a-z-]/g, '_') + '.png') }); }
    catch { /* screenshot is optional */ }
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}
main().catch((error) => {
  console.error('Test setup failed:', error);
  process.exitCode = 1;
});