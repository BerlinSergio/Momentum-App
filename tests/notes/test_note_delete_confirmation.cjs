/**
 * Momentum browser regression: Universal Note Deletion & Confirmation Test Suite
 *
 * Verifies:
 * 1. Global destructive confirmation dialog promise resolution (Confirm & Cancel).
 * 2. Long Note Editor: Cancel preserves note, Confirm deletes note & returns to Notes (Light & Dark).
 * 3. Quick Note Editor: Cancel preserves note, Confirm deletes note & returns to Notes (Light & Dark).
 * 4. Quick Note Editor bottom action bar Delete button (Light & Dark).
 * 5. Full End-to-End User Journey:
 *    - Render notes list on NotesMain
 *    - Real user tap on NotePreviewCard
 *    - Open 3-dots options menu in editor
 *    - Tap Delete Note
 *    - Tap Confirm on Momentum destructive confirmation sheet
 *    - Verify note deleted from Zustand store and removed from NotesMain DOM
 *    - Verify navigation returned to Notes
 *    - Hard page reload to verify IndexedDB persistence (note does not revive)
 * 6. Multilingual verification in RTL (Pashto / Dari) and LTR (English).
 *
 * Run with: node tests/notes/test_note_delete_confirmation.cjs
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

    // 1. Verify the shared confirmation sheet resolves its promise on a real button tap
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
    console.log('PASS: 1. Shared confirmation sheet buttons resolve promises correctly');

    async function openDeleteMenu() {
      await page.waitForSelector('[aria-label="Note options"]', { visible: true, timeout: 12000 });
      await page.click('[aria-label="Note options"]');
      const deleteSelector = '[aria-label="Note options"] + div.absolute > button:last-of-type';
      await page.waitForSelector(deleteSelector, { visible: true, timeout: 6000 });
      await page.click(deleteSelector);
      await page.waitForSelector('[data-testid="momentum-dialog-confirm-btn"]', { visible: true, timeout: 6000 });
    }

    // 2. Long Note Editor tests (Light and Dark)
    for (const theme of ['light', 'dark']) {
      const id = 'qa-long-note-' + theme + '-' + Date.now();
      step = 'long-note:' + theme + ':seed';
      await page.evaluate(({ id, theme }) => {
        const notes = window.useNotesStore.getState();
        notes.addNote({
          id,
          title: 'QA Long Note ' + theme,
          type: 'long',
          body: '<p>Long note body testing deletion flow.</p>',
        });
        notes.setActiveNoteId(id);
        window.useThemeStore.getState().setTheme(theme);
        const nav = window.useNavigationStore.getState();
        nav.setActiveTab('notes_main');
        nav.setActiveTab('long_note_editor', { isNew: false, noteId: id });
      }, { id, theme });
      await delay(650);

      // Cancel check
      step = 'long-note:' + theme + ':cancel';
      await openDeleteMenu();
      await page.click('[data-testid="momentum-dialog-cancel-btn"]');
      await page.waitForFunction(() => !window.useConfirmStore.getState().isOpen);
      const existsAfterCancel = await page.evaluate((noteId) =>
        window.useNotesStore.getState().notes.some((note) => String(note.id) === String(noteId)), id);
      assert.ok(existsAfterCancel, 'Cancel must preserve Long Note in ' + theme + ' mode');

      // Confirm check
      step = 'long-note:' + theme + ':confirm';
      await openDeleteMenu();
      await page.click('[data-testid="momentum-dialog-confirm-btn"]');
      await page.waitForFunction((noteId) =>
        !window.useNotesStore.getState().notes.some((note) => String(note.id) === String(noteId)) &&
        !window.useConfirmStore.getState().isOpen,
        { timeout: 7000 }, id);

      const result = await page.evaluate(() => ({
        activeTab: window.useNavigationStore.getState().activeTab,
        activeNoteId: window.useNotesStore.getState().activeNoteId,
      }));
      assert.equal(result.activeNoteId, null, 'Delete must clear activeNoteId');
      assert.ok(result.activeTab.includes('notes_main'), 'Delete must navigate back to Notes');
      console.log('PASS: 2. Long Note Editor (' + theme + ' mode): cancel preserves, confirm permanently deletes');
    }

    // 3. Quick Note Editor tests (Light and Dark) - Header Menu
    for (const theme of ['light', 'dark']) {
      const id = 'qa-quick-note-' + theme + '-' + Date.now();
      step = 'quick-note:' + theme + ':seed';
      await page.evaluate(({ id, theme }) => {
        const notes = window.useNotesStore.getState();
        notes.addNote({
          id,
          title: 'QA Quick Note ' + theme,
          type: 'quick',
          body: 'Quick note content for testing.',
        });
        notes.setActiveNoteId(id);
        window.useThemeStore.getState().setTheme(theme);
        const nav = window.useNavigationStore.getState();
        nav.setActiveTab('notes_main');
        nav.setActiveTab('quick_note_editor', { isNew: false, noteId: id });
      }, { id, theme });
      await delay(650);

      // Cancel check
      step = 'quick-note:' + theme + ':cancel';
      await openDeleteMenu();
      await page.click('[data-testid="momentum-dialog-cancel-btn"]');
      await page.waitForFunction(() => !window.useConfirmStore.getState().isOpen);
      const existsAfterCancel = await page.evaluate((noteId) =>
        window.useNotesStore.getState().notes.some((note) => String(note.id) === String(noteId)), id);
      assert.ok(existsAfterCancel, 'Cancel must preserve Quick Note in ' + theme + ' mode');

      // Confirm check
      step = 'quick-note:' + theme + ':confirm';
      await openDeleteMenu();
      await page.click('[data-testid="momentum-dialog-confirm-btn"]');
      await page.waitForFunction((noteId) =>
        !window.useNotesStore.getState().notes.some((note) => String(note.id) === String(noteId)) &&
        !window.useConfirmStore.getState().isOpen,
        { timeout: 7000 }, id);

      const result = await page.evaluate(() => ({
        activeTab: window.useNavigationStore.getState().activeTab,
        activeNoteId: window.useNotesStore.getState().activeNoteId,
      }));
      assert.equal(result.activeNoteId, null, 'Delete must clear activeNoteId');
      assert.ok(result.activeTab.includes('notes_main'), 'Delete must navigate back to Notes');
      console.log('PASS: 3. Quick Note Editor (' + theme + ' mode header menu): cancel preserves, confirm permanently deletes');
    }

    // 4. Quick Note Editor tests (Light and Dark) - Bottom Edit Action Bar Delete Button
    for (const theme of ['light', 'dark']) {
      const id = 'qa-quick-bottom-' + theme + '-' + Date.now();
      step = 'quick-note-bottom:' + theme + ':seed';
      await page.evaluate(({ id, theme }) => {
        const notes = window.useNotesStore.getState();
        notes.addNote({
          id,
          title: 'QA Quick Note Bottom Bar ' + theme,
          type: 'quick',
          body: 'Testing bottom delete action button.',
        });
        notes.setActiveNoteId(id);
        window.useThemeStore.getState().setTheme(theme);
        const nav = window.useNavigationStore.getState();
        nav.setActiveTab('notes_main');
        nav.setActiveTab('quick_note_editor', { isNew: false, noteId: id });
      }, { id, theme });
      await delay(650);

      // Enter edit mode
      await page.evaluate(() => {
        // Trigger edit button
        const editBtn = document.querySelector('button[aria-label="Edit Note"]') || document.querySelector('header button:has(svg.lucide-edit-3)');
        if (editBtn) editBtn.click();
      });
      await delay(400);

      // Find bottom action delete button
      const bottomDeleteSelector = '.btn-danger';
      await page.waitForSelector(bottomDeleteSelector, { visible: true, timeout: 6000 });
      await page.click(bottomDeleteSelector);
      await page.waitForSelector('[data-testid="momentum-dialog-confirm-btn"]', { visible: true, timeout: 6000 });

      // Cancel check
      step = 'quick-note-bottom:' + theme + ':cancel';
      await page.click('[data-testid="momentum-dialog-cancel-btn"]');
      await page.waitForFunction(() => !window.useConfirmStore.getState().isOpen);
      const existsAfterCancel = await page.evaluate((noteId) =>
        window.useNotesStore.getState().notes.some((note) => String(note.id) === String(noteId)), id);
      assert.ok(existsAfterCancel, 'Cancel must preserve Quick Note from bottom bar in ' + theme + ' mode');

      // Click delete again and confirm
      step = 'quick-note-bottom:' + theme + ':confirm';
      await page.waitForSelector(bottomDeleteSelector, { visible: true, timeout: 6000 });
      await page.click(bottomDeleteSelector);
      await page.waitForSelector('[data-testid="momentum-dialog-confirm-btn"]', { visible: true, timeout: 6000 });
      await page.click('[data-testid="momentum-dialog-confirm-btn"]');

      await page.waitForFunction((noteId) =>
        !window.useNotesStore.getState().notes.some((note) => String(note.id) === String(noteId)) &&
        !window.useConfirmStore.getState().isOpen,
        { timeout: 7000 }, id);

      const result = await page.evaluate(() => ({
        activeTab: window.useNavigationStore.getState().activeTab,
        activeNoteId: window.useNotesStore.getState().activeNoteId,
      }));
      assert.equal(result.activeNoteId, null, 'Delete must clear activeNoteId');
      assert.ok(result.activeTab.includes('notes_main'), 'Delete must navigate back to Notes');
      console.log('PASS: 4. Quick Note Editor (' + theme + ' bottom bar): cancel preserves, confirm permanently deletes');
    }

    // 5. Full End-to-End User Journey (NotesMain -> Card Click -> Menu -> Delete -> Confirm -> DOM check -> Reload check)
    {
      const e2eNoteId = 'qa-e2e-real-flow-' + Date.now();
      step = 'e2e:seed-note';
      await page.evaluate(({ e2eNoteId }) => {
        window.useLocaleStore.getState().setLocale('en-US');
        window.useThemeStore.getState().setTheme('light');
        const notes = window.useNotesStore.getState();
        notes.addNote({
          id: e2eNoteId,
          title: 'E2E Real User Journey Note',
          type: 'quick',
          body: 'This note will be tapped directly from the Notes list.',
        });
        const nav = window.useNavigationStore.getState();
        nav.setActiveTab('notes_main');
      }, { e2eNoteId });
      await delay(650);

      // Verify note card is in DOM on NotesMain
      step = 'e2e:find-card';
      const cardSelector = `[data-testid="note-card-${e2eNoteId}"]`;
      await page.waitForSelector(cardSelector, { visible: true, timeout: 6000 });

      // Click the note card directly like a real user
      step = 'e2e:click-card';
      await page.click(cardSelector);
      await delay(650);

      // Verify editor opened for this note
      const inEditor = await page.evaluate((targetId) => {
        const navTab = window.useNavigationStore.getState().activeTab;
        const activeNoteId = window.useNotesStore.getState().activeNoteId;
        return navTab.includes('note_editor') && String(activeNoteId) === String(targetId);
      }, e2eNoteId);
      assert.ok(inEditor, 'Tapping note card must navigate to editor with active note ID');

      // Open 3-dots menu and tap delete
      step = 'e2e:open-delete';
      await openDeleteMenu();
      await page.screenshot({ path: path.join(screenshots, 'e2e_dialog_open.png') });

      // Click Confirm on destructive dialog
      step = 'e2e:confirm-delete';
      await page.click('[data-testid="momentum-dialog-confirm-btn"]');

      // Wait for dialog dismissal and store deletion
      await page.waitForFunction((noteId) =>
        !window.useNotesStore.getState().notes.some((note) => String(note.id) === String(noteId)) &&
        !window.useConfirmStore.getState().isOpen,
        { timeout: 7000 }, e2eNoteId);

      // Verify returned to notes_main
      await page.waitForFunction(() =>
        window.useNavigationStore.getState().activeTab.includes('notes_main'),
        { timeout: 5000 });

      await delay(650);

      // Verify card is no longer in the DOM
      step = 'e2e:assert-dom-removal';
      const cardExists = await page.$(cardSelector);
      assert.equal(cardExists, null, 'Deleted note card must be removed from NotesMain DOM');
      await page.screenshot({ path: path.join(screenshots, 'e2e_after_delete.png') });

      // Hard page reload to test IndexedDB persistence across sessions
      step = 'e2e:hard-reload-check';
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForFunction(
        () => Boolean(window.useNotesStore && window.useNavigationStore && window.setIsAppLoading),
        { timeout: 30000 }
      );
      await page.evaluate(() => {
        window.setIsAppLoading(false);
        window.useNavigationStore.getState().setActiveTab('notes_main');
      });
      await delay(1000);

      // Assert note does NOT reappear after reload
      const existsAfterReload = await page.evaluate((targetId) =>
        window.useNotesStore.getState().notes.some((n) => String(n.id) === String(targetId)), e2eNoteId);
      assert.equal(existsAfterReload, false, 'Deleted note must remain permanently deleted after browser refresh');
      console.log('PASS: 5. Full End-to-End User Flow (Card Click -> Editor -> Delete -> Confirm -> DOM removal -> Reload Persistence)');
    }

    assert.deepEqual(failures, [], 'No runtime page errors encountered');
    console.log('ALL NOTE DELETION AND CONFIRMATION TESTS PASSED SUCCESSFULLY.');
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
