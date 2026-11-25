/**
 * Phase 2.6: real Chromium crash-recovery checks with isolated IndexedDBs.
 * Every browser context is ephemeral; no actual user's browser profile/data.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');

const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const KEY = 'qa-cross-db-store';
const WALL = 'qa-cross-db-wallpaper';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Establish synthetic baseline, then simulate the browser closing after
    // committing the wallpaper DB but before the main-DB final transaction.
    const prepared = await page.evaluate(async ({ key, wallpaperId }) => {
      const main = await import('/src/storage/db.js');
      const wallpapers = await import('/src/utils/wallpaperStorage.js');
      const ready = await main.openAppDB();
      if (!ready || !navigator.locks?.request) throw new Error('Test requires IDB and Web Locks');
      const savedMain = await main.commitRestoreBatch({
        stores: [{ name: key, value: { state: { tasks: [{ id: 'old' }] } } }],
      });
      const savedWallpaper = await wallpapers.commitWallpaperRestoreBatch([{
        id: wallpaperId, dataUrl: 'data:image/png;base64,b2xk', meta: { qa: true },
      }]);
      const before = await wallpapers.getAllCustomWallpapersForBackup();
      const original = before.find(item => item.id === wallpaperId);
      const journal = await main.beginRestoreJournal({
        token: 'qa-synthetic-interrupted-restore',
        wallpaperBefore: [{ id: wallpaperId, previous: original || null }],
      });
      const changed = await wallpapers.commitWallpaperRestoreBatch([{
        id: wallpaperId, dataUrl: 'data:image/png;base64,bmV3', meta: { qa: true },
      }]);
      return { savedMain, savedWallpaper, journal, changed };
    }, { key: KEY, wallpaperId: WALL });
    assert.deepEqual(prepared, { savedMain: true, savedWallpaper: true, journal: true, changed: true });

    // Reload the app: startup MUST perform journal recovery before hydration.
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(
      () => window.useProfileStore?.persist.hasHydrated(),
      { timeout: 30000 }
    );

    const recovered = await page.evaluate(async ({ key, wallpaperId }) => {
      const main = await import('/src/storage/db.js');
      const wallpaper = await import('/src/utils/wallpaperStorage.js');
      const item = await main.getStoreItem(key);
      const media = await wallpaper.getWallpaperFromIndexedDB(wallpaperId);
      const journal = await main.getPendingRestoreJournal();
      return {
        value: item?.state?.tasks?.[0]?.id,
        image: media?.dataUrl,
        journal: journal === null,
      };
    }, { key: KEY, wallpaperId: WALL });
    assert.deepEqual(recovered, { value: 'old', image: 'data:image/png;base64,b2xk', journal: true });
    console.log('PASS: Interrupted two-DB restore rolls wallpaper back on next startup without changing main DB.');

    // Successful two-DB restore: main data and journal deletion commit as one
    // transaction. Reload should retain both the new main state and wallpaper.
    const succeeded = await page.evaluate(async ({ key, wallpaperId }) => {
      const coordinator = await import('/src/utils/crossDatabaseRestore.js');
      return coordinator.commitCoordinatedCrossDbRestore({
        stores: [{ name: key, value: { state: { tasks: [{ id: 'updated' }] } } }],
        attachments: [],
        wallpapers: [{ id: wallpaperId, dataUrl: 'data:image/png;base64,dXBkYXRlZA==', meta: {} }],
      });
    }, { key: KEY, wallpaperId: WALL });
    assert.equal(succeeded, true);

    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(
      () => window.useProfileStore?.persist.hasHydrated(),
      { timeout: 30000 }
    );
    const committed = await page.evaluate(async ({ key, wallpaperId }) => {
      const main = await import('/src/storage/db.js');
      const wallpaper = await import('/src/utils/wallpaperStorage.js');
      return {
        value: (await main.getStoreItem(key))?.state?.tasks?.[0]?.id,
        image: (await wallpaper.getWallpaperFromIndexedDB(wallpaperId))?.dataUrl,
        journalAbsent: (await main.getPendingRestoreJournal()) === null,
      };
    }, { key: KEY, wallpaperId: WALL });
    assert.deepEqual(committed, {
      value: 'updated', image: 'data:image/png;base64,dXBkYXRlZA==', journalAbsent: true,
    });
    console.log('PASS: Successful journaled two-DB restore survives reload with no pending journal.');

    // After wallpaper commit, inject an uncloneable main-db value. Main tx must
    // abort, while the wallpaper journal repairs the earlier separate-db write.
    const aborted = await page.evaluate(async ({ key, wallpaperId }) => {
      const coordinator = await import('/src/utils/crossDatabaseRestore.js');
      const main = await import('/src/storage/db.js');
      const wallpaper = await import('/src/utils/wallpaperStorage.js');
      let rejected = false;
      try {
        await coordinator.commitCoordinatedCrossDbRestore({
          stores: [{ name: key, value: { state: { illegalFunction: () => 'cannot clone' } } }],
          attachments: [],
          wallpapers: [{ id: wallpaperId, dataUrl: 'data:image/png;base64,ZmFpbGVk', meta: {} }],
        });
      } catch {
        rejected = true;
      }
      return {
        rejected,
        main: (await main.getStoreItem(key))?.state?.tasks?.[0]?.id,
        wallpaper: (await wallpaper.getWallpaperFromIndexedDB(wallpaperId))?.dataUrl,
        journalAbsent: (await main.getPendingRestoreJournal()) === null,
      };
    }, { key: KEY, wallpaperId: WALL });
    assert.deepEqual(aborted, {
      rejected: true, main: 'updated',
      wallpaper: 'data:image/png;base64,dXBkYXRlZA==', journalAbsent: true,
    });
    console.log('PASS: Failed main-DB commit automatically rolls wallpaper back and retains previous domain data.');

    await page.close();
    await context.close();
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error('FAIL: Isolated cross-DB restore recovery:', error);
  process.exitCode = 1;
});
