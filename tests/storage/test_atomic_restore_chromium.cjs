/**
 * Real-browser IndexedDB atomic transaction smoke, synthetic data only.
 * Chromium runs in a fresh isolated context with NO user's browser profile.
 * This verifies that a synchronous DataCloneError in the attachments store
 * aborts an earlier queued domain put in the SAME IndexedDB transaction.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    const url = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const result = await page.evaluate(async () => {
      const { openAppDB, commitRestoreBatch, STORES } = await import('/src/storage/db.js');
      const db = await openAppDB();
      if (!db) throw new Error('IndexedDB unavailable in isolated browser');

      const key = 'qa-atomic-domain-only';
      const attachmentId = 'qa-atomic-attachment-only';

      function read(store, id) {
        return new Promise((resolve, reject) => {
          const tx = db.transaction(store, 'readonly');
          const request = tx.objectStore(store).get(id);
          request.onsuccess = () => resolve(request.result || null);
          request.onerror = () => reject(request.error);
        });
      }
      async function cleanup() {
        await new Promise((resolve, reject) => {
          const tx = db.transaction([STORES.DATA, STORES.ATTACHMENTS], 'readwrite');
          tx.objectStore(STORES.DATA).delete(key);
          tx.objectStore(STORES.ATTACHMENTS).delete(attachmentId);
          tx.oncomplete = resolve;
          tx.onabort = () => reject(tx.error || new Error('Synthetic cleanup aborted'));
        });
      }

      try {
        const baseline = await commitRestoreBatch({
          stores: [{ name: key, value: { state: { items: ['original'] }, version: 0 } }],
          attachments: [{ id: attachmentId, blob: new Blob(['original']) }],
        });

        const failed = await commitRestoreBatch({
          stores: [{ name: key, value: { state: { items: ['should-rollback'] }, version: 0 } }],
          // IndexedDB cannot structured-clone a function, so put() throws
          // after the domain put request has already been queued.
          attachments: [{ id: attachmentId, blob: () => 'invalid' }],
        });
        const afterAbortStore = await read(STORES.DATA, key);
        const afterAbortAttachment = await read(STORES.ATTACHMENTS, attachmentId);

        const committed = await commitRestoreBatch({
          stores: [{ name: key, value: { state: { items: ['committed'] }, version: 0 } }],
          attachments: [{ id: attachmentId, blob: new Blob(['updated']) }],
        });
        const afterSuccessStore = await read(STORES.DATA, key);
        const afterSuccessAttachment = await read(STORES.ATTACHMENTS, attachmentId);
        return {
          baseline, failed, committed,
          rollbackValue: afterAbortStore?.value?.state?.items?.[0],
          rollbackFile: await afterAbortAttachment?.blob?.text(),
          committedValue: afterSuccessStore?.value?.state?.items?.[0],
          committedFile: await afterSuccessAttachment?.blob?.text(),
        };
      } finally {
        await cleanup();
      }
    });

    assert.equal(result.baseline, true);
    assert.equal(result.failed, false);
    assert.equal(result.rollbackValue, 'original');
    assert.equal(result.rollbackFile, 'original');
    assert.equal(result.committed, true);
    assert.equal(result.committedValue, 'committed');
    assert.equal(result.committedFile, 'updated');
    console.log('PASS: Real Chromium IndexedDB rolls back both stores after attachment DataCloneError and commits them together on success.');

    // Isolate the application-level restore from the low-level transaction smoke.
    // Force only post-commit hydration to fail, not the actual restore.
    const restorePage = await context.newPage();
    await restorePage.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await restorePage.waitForFunction(() => window.useTaskStore?.getState?.()._hasHydrated === true, { timeout: 45000 });
    const recovery = await restorePage.evaluate(async () => {
      const { restoreBackup } = await import('/src/utils/backupService.js');
      const { encryptBackupPayload } = await import('/src/utils/backupCrypto.js');
      const { getCommittedStoreRecord } = await import('/src/storage/db.js');
      const passphrase = 'synthetic-qa-only-reload';
      const key = 'momentum-task-storage';
      const envelope = await encryptBackupPayload(JSON.stringify({
        manifest: { version: 1 },
        domains: { [key]: { state: { tasks: [{ id: 'qa-reload-required' }] }, version: 0 } },
        attachments: [], customWallpapers: [],
      }), passphrase);
      const stages = [];
      const store = window.useTaskStore;
      const original = store.persist.rehydrate;
      let injected = false;
      try {
        const result = await restoreBackup(envelope, passphrase, {
          mode: 'merge',
          onProgress: ({ stage }) => {
            stages.push(stage);
            if (stage === 'REHYDRATING') {
              store.persist.rehydrate = async () => {
                injected = true;
                throw new Error('Synthetic session hydration failure');
              };
            }
          },
        });
        const row = await getCommittedStoreRecord(key);
        return { success: result.success, requiresReload: result.requiresReload, injected,
          durable: row?.value?.state?.tasks?.some(t => t.id === 'qa-reload-required'),
          lastStage: stages.at(-1) };
      } finally { store.persist.rehydrate = original; }
    });
    assert.deepEqual(recovery, { success: true, requiresReload: true, injected: true,
      durable: true, lastStage: 'RELOAD_REQUIRED' });
    console.log('PASS: Committed restore with injected hydration failure requires restart, not a repeat restore.');
    await restorePage.close();

    await page.close();
    await context.close();
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error('FAIL: Isolated Chromium atomic restore:', error);
  process.exitCode = 1;
});
