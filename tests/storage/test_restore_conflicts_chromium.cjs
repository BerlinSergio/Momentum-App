/**
 * Phase 2.8: real Chromium multi-tab optimistic restore conflicts.
 * Synthetic records only, fresh incognito contexts, no user data.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');

const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const STORE = 'qa-restore-conflict-domain';
const WALL = 'qa-restore-conflict-wallpaper';

async function testSimultaneousColdStart(browser) {
  const context = await browser.createBrowserContext();
  try {
    // Two *fresh* tabs open at the same instant against a fresh origin.
    const pages = await Promise.all([context.newPage(), context.newPage()]);
    await Promise.all(pages.map(page =>
      page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
    ));
    // Keep the simultaneous navigation above; wait for the coordinator's
    // terminal state, not an individual store that may still be rehydrating.
    // Bring each page forward only after both navigations have begun, so
    // background animation throttling cannot obscure the visible retry UI.
    for (const page of pages) {
      await page.bringToFront();
      await page.waitForFunction(() => {
        const status = document.querySelector('[data-app-startup-status]')?.getAttribute('data-app-startup-status');
        if (status === 'ready') return document.querySelector('[data-app-startup-ready="true"]') !== null;
        if (status !== 'failed') return false;
        return [...document.querySelectorAll('[role="alert"]')].some(node =>
          node.textContent.includes('Cannot safely load saved data') &&
          [...node.querySelectorAll('button')].some(button => button.textContent.includes('Retry loading')));
      }, { timeout: 35000, polling: 200 });
      const result = await page.evaluate(() => ({
        status: document.querySelector('[data-app-startup-status]')?.getAttribute('data-app-startup-status'),
        complete: !!document.querySelector('[data-app-startup-ready="true"]'),
        hydrated: window.useProfileStore?.persist?.hasHydrated?.() === true &&
          window.useProfileStore?.getState()?._hasHydrated === true &&
          window.useSecurityStore?.persist?.hasHydrated?.() === true &&
          window.useSecurityStore?.getState()?._hasHydrated === true,
        safeError: [...document.querySelectorAll('[role="alert"]')].some(node =>
          node.textContent.includes('Cannot safely load saved data') &&
          [...node.querySelectorAll('button')].some(button => button.textContent.includes('Retry loading'))),
      }));
      assert.ok((result.status === 'ready' && result.complete && result.hydrated) ||
        (result.status === 'failed' && !result.complete && result.safeError),
        'Cold-start must reach coordinated readiness or fail closed: ' + JSON.stringify(result));
    }
    console.log('PASS: Concurrent cold-start tabs each hydrate or show safe retry; no silent partial startup.');
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    await testSimultaneousColdStart(browser);
    const context = await browser.createBrowserContext();
    const a = await context.newPage();
    const b = await context.newPage();
    // These tests measure concurrent edits AFTER safe hydration, not first-run
    // onboarding (which has a separate cold-start test).
    await a.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await a.waitForFunction(() => window.useProfileStore?.persist.hasHydrated(), { timeout: 30000, polling: 200 });
    await b.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await b.waitForFunction(() => window.useProfileStore?.persist.hasHydrated(), { timeout: 30000, polling: 200 });

    const old = await a.evaluate(async key => {
      const db = await import('/src/storage/db.js');
      const value = { state: { tasks: [{ id: 'initial' }] }, version: 0 };
      const saved = await db.commitRestoreBatch({ stores: [{ name: key, value }] });
      if (!saved) throw new Error('Synthetic setup did not commit');
      return db.getStoreItem(key);
    }, STORE);

    // A has read the pre-restore state, B commits a newer edit.
    const edited = await b.evaluate(async key => {
      const db = await import('/src/storage/db.js');
      return db.commitRestoreBatch({
        stores: [{ name: key, value: { state: { tasks: [{ id: 'newer-tab-B' }] }, version: 0 } }],
      });
    }, STORE);
    assert.equal(edited, true);

    const guarded = await a.evaluate(async ({ key, expected }) => {
      const db = await import('/src/storage/db.js');
      let errorCode = null;
      try {
        await db.commitRestoreBatch({
          stores: [{ name: key, value: { state: { tasks: [{ id: 'stale-restore' }] }, version: 0 } }],
          expectedStoreValues: { [key]: expected },
        });
      } catch (error) {
        errorCode = error.code;
      }
      return {
        errorCode,
        saved: (await db.getStoreItem(key))?.state?.tasks?.[0]?.id,
      };
    }, { key: STORE, expected: old });
    assert.deepEqual(guarded, { errorCode: 'RESTORE_CONFLICT', saved: 'newer-tab-B' });
    console.log('PASS: Cross-tab optimistic CAS rejects stale domain restore without erasing newer task state.');

    // Two-DB restore writes wallpaper first, then discovers an intervening
    // domain update; the journal must roll the wallpaper back automatically.
    const cross = await a.evaluate(async ({ key, wallpaperId }) => {
      const db = await import('/src/storage/db.js');
      const wp = await import('/src/utils/wallpaperStorage.js');
      if (!(await wp.commitWallpaperRestoreBatch([{
        id: wallpaperId, dataUrl: 'data:image/png;base64,b3JpZ2luYWw=',
      }]))) throw new Error('Wallpaper setup failed');
      const expected = await db.getStoreItem(key);
      return { expected };
    }, { key: STORE, wallpaperId: WALL });

    const changedAgain = await b.evaluate(async key => {
      const db = await import('/src/storage/db.js');
      return db.commitRestoreBatch({
        stores: [{ name: key, value: { state: { tasks: [{ id: 'newer-tab-B-again' }] }, version: 0 } }],
      });
    }, STORE);
    assert.equal(changedAgain, true);

    const after = await a.evaluate(async ({ key, wallpaperId, expected }) => {
      const coordination = await import('/src/utils/crossDatabaseRestore.js');
      const db = await import('/src/storage/db.js');
      const wp = await import('/src/utils/wallpaperStorage.js');
      let errorCode = null;
      try {
        await coordination.commitCoordinatedCrossDbRestore({
          stores: [{ name: key, value: { state: { tasks: [{ id: 'do-not-overwrite' }] } } }],
          attachments: [],
          wallpapers: [{ id: wallpaperId, dataUrl: 'data:image/png;base64,c3RhbGU=' }],
          expectedStoreValues: { [key]: expected },
          expectedAttachmentRecords: {},
        });
      } catch (error) {
        errorCode = error.code;
      }
      return {
        errorCode,
        domain: (await db.getStoreItem(key))?.state?.tasks?.[0]?.id,
        wallpaper: (await wp.getWallpaperFromIndexedDB(wallpaperId))?.dataUrl,
        noJournal: (await db.getPendingRestoreJournal()) === null,
      };
    }, { key: STORE, wallpaperId: WALL, expected: cross.expected });

    assert.deepEqual(after, {
      errorCode: 'RESTORE_CONFLICT',
      domain: 'newer-tab-B-again',
      wallpaper: 'data:image/png;base64,b3JpZ2luYWw=',
      noJournal: true,
    });
    console.log('PASS: Stale two-DB restore aborts main transaction and restores prior wallpaper preimage.');

    await context.close();
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error('FAIL: Isolated restore conflict Chromium:', error);
  process.exitCode = 1;
});
