/**
 * Phase 2.13 — Notes & Finance cross-tab CAS, 50 simultaneous write pairs,
 * and same-IDB-transaction attachment cleanup. Synthetic isolated browser data.
 */
const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');
const URL = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const DOMAIN = {
  notes: { name: 'momentum-notes-storage', field: 'notes' },
  finance: { name: 'momentum-finance-storage', field: 'transactions' },
};

async function boot(page, domain) {
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const storeName = domain === 'notes' ? 'useNotesStore' : 'useFinanceStore';
  await page.waitForFunction(name =>
    window[name]?.persist?.hasHydrated?.() === true &&
    window[name]?.getState?.()._hasHydrated === true,
    { timeout: 40000, polling: 200 }, storeName);
}

async function state(page, domain) {
  return page.evaluate(async ({ name, field }) => {
    const db = await import('/src/storage/db.js');
    const current = await db.getCommittedStoreRecord(name);
    return {
      ids: (current?.value?.state?.[field] || []).map(x => x.id),
      revision: current?.revisionId || null,
    };
  }, DOMAIN[domain]);
}

async function edit(page, domain, id) {
  return page.evaluate(({ domain, id }) => {
    if (domain === 'notes') {
      window.useNotesStore.getState().addNote({
        id, title: 'QA note ' + id, body: 'Synthetic safe test',
        attachments: [],
      });
    } else {
      window.useFinanceStore.getState().addTransaction({
        id, title: 'QA transaction ' + id, type: 'expense',
        amount: 37, currency: 'AFN', category: 'QA',
      });
    }
  }, { domain, id });
}

async function awaitRecord(page, domain, id) {
  await page.waitForFunction(async ({ name, field, id }) => {
    const db = await import('/src/storage/db.js');
    return (await db.getStoreItem(name))?.state?.[field]?.some(x => x.id === id) === true;
  }, { timeout: 30000, polling: 200 }, { ...DOMAIN[domain], id });
}

async function awaitConflict(page, domain) {
  await page.waitForSelector('[data-testid="domain-storage-conflict"]', { timeout: 30000 });
  const status = await page.evaluate(async () => {
    const adapter = await import('/src/storage/zustandIndexedDbStorage.js');
    return {
      failure: adapter.getDomainStorageFailure(),
      message: document.querySelector('[data-testid="domain-storage-conflict"]')?.textContent || '',
    };
  });
  assert.equal(status.failure?.domain, DOMAIN[domain].name);
  assert.equal(status.failure?.code, 'DOMAIN_WRITE_CONFLICT');
  assert.match(status.message, /your latest edit.*not saved/i);
  assert.match(status.message, /reload saved data/i);
}

async function uiTwoTab(browser, domain) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage(), b = await context.newPage();
    await boot(a, domain);
    await boot(b, domain);
    assert.deepEqual(await state(a, domain), await state(b, domain));
    const first = `qa213-${domain}-a`, stale = `qa213-${domain}-stale-b`;
    await edit(a, domain, first);
    await awaitRecord(a, domain, first);
    const committed = await state(a, domain);
    await edit(b, domain, stale);
    await awaitConflict(b, domain);
    assert.deepEqual(await state(a, domain), committed, domain + ' stale writer overwrote data');
    console.log('PASS: ' + domain + ' stale tab rejected with durable records unchanged and visible warning.');

    await edit(b, domain, `qa213-${domain}-second-stale`);
    await new Promise(resolve => setTimeout(resolve, 220));
    assert.deepEqual(await state(a, domain), committed, 'Conflicted tab unexpectedly retried');

    await b.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await b.waitForFunction(name =>
      window[name]?.persist?.hasHydrated?.() === true &&
      window[name]?.getState?.()._hasHydrated === true,
      { timeout: 40000, polling: 200 },
      domain === 'notes' ? 'useNotesStore' : 'useFinanceStore');
    const refreshed = await b.evaluate(({ domain, first, stale }) => {
      const store = domain === 'notes' ? window.useNotesStore : window.useFinanceStore;
      const entries = domain === 'notes' ? store.getState().notes : store.getState().transactions;
      return {
        current: entries.some(item => item.id === first),
        stale: entries.some(item => item.id === stale),
        warning: Boolean(document.querySelector('[data-testid="domain-storage-conflict"]')),
      };
    }, { domain, first, stale });
    assert.deepEqual(refreshed, { current: true, stale: false, warning: false });
    await edit(b, domain, `qa213-${domain}-post-reload`);
    await awaitRecord(b, domain, `qa213-${domain}-post-reload`);
    console.log('PASS: ' + domain + ' safe reload rehydrates committed data and permits new edits.');

    if (domain === 'notes') {
      // Verify conflict rejection cannot delete a Blob before its note
      // metadata has committed, then verify real successful unlink is atomic.
      const id = 'qa213-note-with-file', attachmentId = 'qa213-durable-attachment';
      await a.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
      await a.waitForFunction(() => window.useNotesStore?.getState?.()._hasHydrated, {
        timeout: 35000, polling: 200,
      });
      await a.evaluate(async ({ id, attachmentId }) => {
        const db = await import('/src/storage/db.js');
        if (!(await db.setAttachmentRecord({
          id: attachmentId, noteId: id, mimeType: 'text/plain', blob: new Blob(['SAFE-BYTES']),
        }))) throw Error('Attachment setup failed');
        window.useNotesStore.getState().addNote({
          id, title: 'QA attached note', body: 'safe test',
          attachments: [{ id: attachmentId, name: 'synthetic.txt', type: 'document' }],
        });
      }, { id, attachmentId });
      await awaitRecord(a, domain, id);
      // B sees the attachment, then A changes notes. B's stale removal
      // must fail CAS, retaining the durable attachment bytes.
      await b.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
      await b.waitForFunction(() => window.useNotesStore?.getState?.()._hasHydrated, {
        timeout: 35000, polling: 200,
      });
      await edit(a, domain, 'qa213-note-ahead-of-delete');
      await awaitRecord(a, domain, 'qa213-note-ahead-of-delete');
      await b.evaluate(({ id, attachmentId }) =>
        window.useNotesStore.getState().deleteAttachment(id, attachmentId), { id, attachmentId });
      await awaitConflict(b, domain);
      const binary = await a.evaluate(async attachmentId => {
        const db = await import('/src/storage/db.js');
        const att = await db.getAttachmentRecord(attachmentId);
        return att ? await att.blob.text() : null;
      }, attachmentId);
      assert.equal(binary, 'SAFE-BYTES');
      console.log('PASS: Stale Notes deletion cannot erase the attachment binary.');

      await a.evaluate(({ id, attachmentId }) =>
        window.useNotesStore.getState().deleteAttachment(id, attachmentId), { id, attachmentId });
      await a.waitForFunction(async ({ id, attachmentId }) => {
        const db = await import('/src/storage/db.js');
        const record = await db.getStoreItem('momentum-notes-storage');
        const note = record?.state?.notes?.find(n => n.id === id);
        return note && !note.attachments.some(att => att.id === attachmentId) &&
          !(await db.getAttachmentRecord(attachmentId));
      }, { timeout: 30000, polling: 200 }, { id, attachmentId });
      console.log('PASS: Successful note attachment unlink deletes metadata and Blob together.');
    }
    console.log('PASS: ' + domain + ' UI two-tab safety complete.');
  } finally {
    await context.close();
  }
}

async function stress(browser, domain, rounds = 25) {
  const context = await browser.createBrowserContext();
  try {
    const a = await context.newPage(), b = await context.newPage();
    await boot(a, domain);
    await boot(b, domain);
    const { name, field } = DOMAIN[domain];
    for (let i = 0; i < rounds; i++) {
      const idA = `qa213-${domain}-stress-${i}-a`;
      const idB = `qa213-${domain}-stress-${i}-b`;
      const before = await state(a, domain);
      // Both independent tabs snapshot the same durable revision, then send
      // competing writes in two actual IDB readwrite transactions.
      await Promise.all([a, b].map(tab => tab.evaluate(async name => {
        const db = await import('/src/storage/db.js');
        window.__qa213Baseline = await db.getCommittedStoreRecord(name);
      }, name)));
      const outcomes = await Promise.all([a.evaluate(async ({ name, field, id }) => {
        const db = await import('/src/storage/db.js');
        const baseline = window.__qa213Baseline;
        const previous = baseline?.value || { version: 0, state: {} };
        const existing = previous?.state?.[field] || [];
        const entry = field === 'notes'
          ? { id, title: id, body: 'stress', attachments: [] }
          : { id, title: id, type: 'expense', amount: 1, currency: 'AFN' };
        const next = { ...previous, state: {
          ...(previous.state || {}), [field]: [...existing, entry],
        } };
        try {
          await db.compareAndSwapDomainStore(name, next, baseline);
          return 'saved';
        } catch (e) { return e.code || 'unexpected-error'; }
      }, { name, field, id: idA }), b.evaluate(async ({ name, field, id }) => {
        const db = await import('/src/storage/db.js');
        const baseline = window.__qa213Baseline;
        const previous = baseline?.value || { version: 0, state: {} };
        const existing = previous?.state?.[field] || [];
        const entry = field === 'notes'
          ? { id, title: id, body: 'stress', attachments: [] }
          : { id, title: id, type: 'expense', amount: 1, currency: 'AFN' };
        const next = { ...previous, state: {
          ...(previous.state || {}), [field]: [...existing, entry],
        } };
        try {
          await db.compareAndSwapDomainStore(name, next, baseline);
          return 'saved';
        } catch (e) { return e.code || 'unexpected-error'; }
      }, { name, field, id: idB })]);
      assert.deepEqual(outcomes.sort(), ['DOMAIN_WRITE_CONFLICT', 'saved']);
      const after = await state(a, domain);
      assert.notEqual(after.revision, before.revision);
      assert.equal([idA,idB].filter(id=>after.ids.includes(id)).length,1,
        domain + ' double commit at stress round ' + i);
    }
    console.log('PASS: ' + domain + ' ' + rounds + ' simultaneous two-tab CAS races; no stale overwrites.');
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    await uiTwoTab(browser, 'notes');
    await uiTwoTab(browser, 'finance');
    await stress(browser, 'notes');
    await stress(browser, 'finance');
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error('FAIL: Notes/Finance cross-tab CAS Chromium:', error);
  process.exitCode = 1;
});
