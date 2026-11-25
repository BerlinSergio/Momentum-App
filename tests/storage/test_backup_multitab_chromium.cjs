/**
 * Isolated real-Chromium multi-tab backup locking and bad-journal regression.
 * Uses synthetic keys and fresh browser contexts; no real profile/user data.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');

const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const LOCK = 'momentum-cross-db-restore-v1';

/**
 * Cold startup may temporarily report a safe storage error when another
 * context holds an IndexedDB connection. Exercise the visible retry path
 * rather than waiting only for hydration and hiding the actual app state.
 */
async function waitForHydratedOrSafeRetry(page, label) {
  for (let attempt = 0; attempt < 2; attempt++) {
    await page.waitForFunction(() => {
      const hydrated = window.useProfileStore?.persist?.hasHydrated?.() === true;
      const safeError = document.querySelector('[role="alert"]')
        ?.textContent?.includes('Cannot safely load saved data') === true;
      return hydrated || safeError;
    }, { timeout: 45000 });

    const state = await page.evaluate(() => ({
      hydrated: window.useProfileStore?.persist?.hasHydrated?.() === true,
      safeError: document.querySelector('[role="alert"]')
        ?.textContent?.includes('Cannot safely load saved data') === true,
      retry: Array.from(document.querySelectorAll('button')).some(
        button => button.textContent.includes('Retry loading')
      ),
    }));
    if (state.hydrated) return;
    assert.equal(state.safeError, true, label + ' must fail closed');
    assert.equal(state.retry, true, label + ' must expose retry');
    if (attempt === 1) throw new Error(label + ' failed to hydrate after one safe retry');
    console.log('INFO: ' + label + ' startup safely asked for retry; verifying retry recovery.');
    await page.evaluate(() => Array.from(document.querySelectorAll('button'))
      .find(button => button.textContent.includes('Retry loading'))?.click());
  }
}

async function testConcurrentBackup(browser) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage();
    const b = await context.newPage();
    // Start tabs one at a time to isolate the cross-tab restore-lock test
    // from a separate cold-start migration race (tested independently).
    await a.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitForHydratedOrSafeRetry(a, 'first tab');
    await b.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitForHydratedOrSafeRetry(b, 'second tab');
    // Profile hydration alone is not a barrier for independently persisted
    // task/notes stores; do not race the app's own cold-start persistence.
    // Simultaneous cold start is validated in a separate regression.
    await Promise.all([a, b].map(tab => tab.waitForFunction(
      () => window.useTaskStore?.persist?.hasHydrated?.() === true &&
            window.useNotesStore?.persist?.hasHydrated?.() === true,
      { timeout: 30000 }
    )));
    const baseline = await a.evaluate(async () => {
      const main = await import('/src/storage/db.js');
      return main.commitRestoreBatch({
        stores: [{ name: 'momentum-task-storage', value: { state: { tasks: [{ id: 'old' }] } } }],
        attachments: [{ id: 'qa-snapshot-attachment', blob: new Blob(['old-attachment']) }],
      });
    });
    assert.equal(baseline, true);

    // A holds the same origin-wide Web Lock used by restore and wallpaper UI.
    // B must wait for A to release it before taking any backup snapshot.
    await a.evaluate(name => {
      navigator.locks.request(name, { mode: 'exclusive' }, async () => {
        window.__qaLockHeld = true;
        await new Promise(resolve => { window.__qaReleaseLock = resolve; });
      }).catch(error => { window.__qaLockError = String(error); });
    }, LOCK);
    await a.waitForFunction(() => window.__qaLockHeld === true, { timeout: 10000 });

    await b.evaluate(async () => {
      const { createBackupPackage } = await import('/src/utils/backupService.js');
      window.__qaBackupDone = false;
      window.__qaBackupError = null;
      window.__qaBackupStarted = true;
      window.__qaBackup = createBackupPackage('qa-multitab-only-passphrase')
        .then(result => {
          window.__qaBackupEnvelope = result.envelope;
          window.__qaBackupDone = true;
        })
        .catch(error => { window.__qaBackupError = String(error); });
    });
    await b.waitForFunction(async name => {
      return (await navigator.locks.query()).pending.some(lock => lock.name === name);
    }, { timeout: 10000 }, LOCK);
    assert.equal(await b.evaluate(() => window.__qaBackupDone), false);

    // A commits a new version while B is blocked from reading either DB.
    const committed = await a.evaluate(async () => {
      const main = await import('/src/storage/db.js');
      return main.commitRestoreBatch({
        stores: [{ name: 'momentum-task-storage', value: { state: { tasks: [{ id: 'new' }] } } }],
        attachments: [{ id: 'qa-snapshot-attachment', blob: new Blob(['new-attachment']) }],
      });
    });
    assert.equal(committed, true);
    await a.evaluate(() => window.__qaReleaseLock());
    await b.waitForFunction(
      () => window.__qaBackupDone === true || Boolean(window.__qaBackupError),
      { timeout: 60000 }
    );
    const content = await b.evaluate(async () => {
      if (window.__qaBackupError) throw new Error(window.__qaBackupError);
      const { decryptBackupPayload } = await import('/src/utils/backupCrypto.js');
      const payload = await decryptBackupPayload(window.__qaBackupEnvelope, 'qa-multitab-only-passphrase');
      const { base64ToBuffer } = await import('/src/utils/backupCrypto.js');
      const attachment = payload.attachments.find(att => att.id === 'qa-snapshot-attachment');
      return {
        task: payload.domains['momentum-task-storage']?.state?.tasks?.[0]?.id,
        attachment: new TextDecoder().decode(base64ToBuffer(attachment.base64Bytes)),
      };
    });
    assert.equal(content.task, 'new');
    assert.equal(content.attachment, 'new-attachment');
    console.log('PASS: A held the cross-tab lock; B waited until release and captured the committed new attachment.');
  } finally {
    await context.close();
  }
}

async function testBadJournalFailClosed(browser) {
  const context = await browser.createBrowserContext();
  try {
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await waitForHydratedOrSafeRetry(page, 'journal setup tab');
    const persisted = await page.evaluate(async () => {
      const main = await import('/src/storage/db.js');
      const db = await main.openAppDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction('migration_meta', 'readwrite');
        tx.objectStore('migration_meta').put({
          key: main.RESTORE_JOURNAL_KEY,
          token: 'qa-malformed-journal',
          status: 'pending',
          wallpaperBefore: [{ id: 'qa-id', previous: { id: 'wrong-id', dataUrl: 'data:image/png;base64,YQ==' } }],
        });
        tx.oncomplete = () => resolve(true);
        tx.onabort = () => reject(tx.error || Error('journal setup failed'));
      });
    });
    assert.equal(persisted, true);
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(
      () => document.querySelector('[role="alert"]')?.textContent?.includes('Cannot safely load saved data'),
      { timeout: 30000 }
    );
    const state = await page.evaluate(async () => {
      const main = await import('/src/storage/db.js');
      return {
        errorVisible: Boolean(document.querySelector('[role="alert"]')),
        retained: (await main.getPendingRestoreJournal())?.token === 'qa-malformed-journal',
        hydrated: window.useProfileStore.persist.hasHydrated(),
      };
    });
    assert.equal(state.errorVisible, true);
    assert.equal(state.retained, true);
    console.log('PASS: Malformed restore recovery journal prevents startup and is retained for safe intervention.');
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    await testConcurrentBackup(browser);
    await testBadJournalFailClosed(browser);
  } finally {
    await browser.close();
  }
}
main().catch(error => {
  console.error('FAIL: Multi-tab backup/journal Chromium test:', error);
  process.exitCode = 1;
});
