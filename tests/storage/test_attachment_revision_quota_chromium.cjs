/**
 * Phase 2.9: real Chromium revision collision, quota rollback and WAL tests.
 * All keys/media are synthetic, confined to a fresh disposable browser context.
 * QuotaExceededError is deterministically injected into IDB object-store puts;
 * this is not a substitute for OS-level disk-full/device interruption tests.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');

const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const revision = await page.evaluate(async () => {
      const main = await import('/src/storage/db.js');
      const id = 'qa29-revision';
      const data = { id, mimeType: 'text/plain', sizeBytes: 4 };
      const clock = Date.now;
      try {
        Date.now = () => 123456789;
        if (!(await main.setAttachmentRecord({
          ...data, blob: new Blob(['AAAA']), revisionId: 'forged-revision',
        }))) throw Error('First attachment save failed');
        const first = await main.getAttachmentRecord(id);
        if (!(await main.setAttachmentRecord({
          ...data, blob: new Blob(['BBBB']), revisionId: first.revisionId,
        }))) throw Error('Second attachment save failed');
        const newer = await main.getAttachmentRecord(id);
        let conflict = null;
        try {
          await main.commitRestoreBatch({
            attachments: [{ ...data, blob: new Blob(['CCCC']) }],
            expectedAttachmentRecords: { [id]: first },
          });
        } catch (error) {
          conflict = error.code;
        }
        const after = await main.getAttachmentRecord(id);
        return {
          firstRevision: first.revisionId,
          newerRevision: newer.revisionId,
          firstTimestamp: first.updatedAt,
          newerTimestamp: newer.updatedAt,
          conflict,
          retainedBlob: await after.blob.text(),
        };
      } finally {
        Date.now = clock;
      }
    });
    assert.match(revision.firstRevision, /^[0-9a-f]{40}$/);
    assert.match(revision.newerRevision, /^[0-9a-f]{40}$/);
    assert.notEqual(revision.firstRevision, revision.newerRevision);
    assert.equal(revision.firstTimestamp, revision.newerTimestamp);
    assert.equal(revision.conflict, 'RESTORE_CONFLICT');
    assert.equal(revision.retainedBlob, 'BBBB');
    console.log('PASS: Same-size, same-timestamp attachment updates get unique revisions; stale CAS fails.');

    const rollback = await page.evaluate(async () => {
      const main = await import('/src/storage/db.js');
      const key = 'qa29-quota-domain';
      const id = 'qa29-quota-attachment';
      const initial = await main.commitRestoreBatch({
        stores: [{ name: key, value: { state: { records: ['original'] } } }],
        attachments: [{ id, blob: new Blob(['original']) }],
      });
      if (!initial) throw Error('Quota test baseline failed');
      const firstRevision = (await main.getAttachmentRecord(id)).revisionId;
      const originalPut = IDBObjectStore.prototype.put;
      IDBObjectStore.prototype.put = function (value, ...rest) {
        if (this.name === 'attachments' && value?.id === id) {
          throw new DOMException('QA simulated disk full', 'QuotaExceededError');
        }
        return originalPut.call(this, value, ...rest);
      };
      let success;
      try {
        success = await main.commitRestoreBatch({
          stores: [{ name: key, value: { state: { records: ['should-rollback'] } } }],
          attachments: [{ id, blob: new Blob(['replace']) }],
        });
      } finally {
        IDBObjectStore.prototype.put = originalPut;
      }
      const record = await main.getStoreItem(key);
      const attachment = await main.getAttachmentRecord(id);
      return {
        success,
        domain: record?.state?.records?.[0],
        binary: await attachment?.blob?.text(),
        revisionRetained: attachment?.revisionId === firstRevision,
      };
    });
    assert.deepEqual(rollback, {
      success: false, domain: 'original', binary: 'original',
      revisionRetained: true,
    });
    console.log('PASS: Synthetic QuotaExceededError after queued domain put aborts entire actual IDB transaction.');

    const journal = await page.evaluate(async () => {
      const main = await import('/src/storage/db.js');
      const coordination = await import('/src/utils/crossDatabaseRestore.js');
      const wallpaper = await import('/src/utils/wallpaperStorage.js');
      const id = 'qa29-wallpaper';
      const key = 'qa29-journal-domain';
      if (!(await wallpaper.commitWallpaperRestoreBatch([{
        id, dataUrl: 'data:image/png;base64,b3JpZ2luYWw=',
      }]))) throw Error('Wallpaper journal baseline failed');
      const initial = await main.commitRestoreBatch({
        stores: [{ name: key, value: { state: { records: ['original'] } } }],
      });
      if (!initial) throw Error('Main journal baseline failed');

      const originalPut = IDBObjectStore.prototype.put;
      IDBObjectStore.prototype.put = function (value, ...rest) {
        if (this.name === 'migration_meta' && value?.key === main.RESTORE_JOURNAL_KEY) {
          throw new DOMException('QA journal storage full', 'QuotaExceededError');
        }
        return originalPut.call(this, value, ...rest);
      };
      let errorCode = null;
      try {
        await coordination.commitCoordinatedCrossDbRestore({
          stores: [{ name: key, value: { state: { records: ['overwrite'] } } }],
          attachments: [],
          wallpapers: [{ id, dataUrl: 'data:image/png;base64,bmV3' }],
        });
      } catch (error) {
        errorCode = error.code || error.name;
      } finally {
        IDBObjectStore.prototype.put = originalPut;
      }
      return {
        errorCode,
        domain: (await main.getStoreItem(key))?.state?.records?.[0],
        wallpaper: (await wallpaper.getWallpaperFromIndexedDB(id))?.dataUrl,
        noJournal: (await main.getPendingRestoreJournal()) === null,
      };
    });
    assert.deepEqual(journal, {
      errorCode: 'RESTORE_RECOVERY_REQUIRED',
      domain: 'original',
      wallpaper: 'data:image/png;base64,b3JpZ2luYWw=',
      noJournal: true,
    });
    console.log('PASS: Recovery journal quota failure rejects cross-DB restore before modifying either DB.');

    const crossQuota = await page.evaluate(async () => {
      const main = await import('/src/storage/db.js');
      const coordination = await import('/src/utils/crossDatabaseRestore.js');
      const wallpaper = await import('/src/utils/wallpaperStorage.js');
      const key = 'qa29-journal-domain';
      const id = 'qa29-wallpaper';
      const attId = 'qa29-cross-quota-attachment';
      if (!(await main.setAttachmentRecord({ id: attId, blob: new Blob(['before']) }))) {
        throw Error('Attachment baseline failed');
      }
      const firstRev = (await main.getAttachmentRecord(attId)).revisionId;
      const originalPut = IDBObjectStore.prototype.put;
      IDBObjectStore.prototype.put = function (value, ...rest) {
        if (this.name === 'attachments' && value?.id === attId) {
          throw new DOMException('QA restore storage full', 'QuotaExceededError');
        }
        return originalPut.call(this, value, ...rest);
      };
      let outcome = null;
      try {
        await coordination.commitCoordinatedCrossDbRestore({
          stores: [{ name: key, value: { state: { records: ['blocked'] } } }],
          attachments: [{ id: attId, blob: new Blob(['after']) }],
          wallpapers: [{ id, dataUrl: 'data:image/png;base64,Y2hhbmdlZA==' }],
        });
        outcome = 'unexpected-success';
      } catch (error) {
        outcome = error.code || 'aborted';
      } finally {
        IDBObjectStore.prototype.put = originalPut;
      }
      const att = await main.getAttachmentRecord(attId);
      return {
        outcome,
        domain: (await main.getStoreItem(key))?.state?.records?.[0],
        wallpaper: (await wallpaper.getWallpaperFromIndexedDB(id))?.dataUrl,
        binary: await att?.blob?.text(),
        sameRevision: att?.revisionId === firstRev,
        noJournal: (await main.getPendingRestoreJournal()) === null,
      };
    });
    assert.deepEqual(crossQuota, {
      outcome: 'aborted', domain: 'original',
      wallpaper: 'data:image/png;base64,b3JpZ2luYWw=',
      binary: 'before', sameRevision: true, noJournal: true,
    });
    console.log('PASS: Quota failure after wallpaper commit rolls wallpaper back and retains original main records.');

    await context.close();
  } finally {
    await browser.close();
  }
}
main().catch(error => {
  console.error('FAIL: Attachment revision/quota Chromium regression:', error);
  process.exitCode = 1;
});
