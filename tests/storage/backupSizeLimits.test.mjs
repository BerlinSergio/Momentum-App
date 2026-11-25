/**
 * Phase 2.10: bounded memory and large archive boundary regressions.
 * Isolated synthetic strings/files only; no user account or browser profile.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_BACKUP_PLAINTEXT_BYTES, MAX_BACKUP_FILE_BYTES,
  assertBackupFileSize, assertBackupPayloadSize, preflightBackupSnapshot,
} from '../../src/utils/backupLimits.js';
import { encryptBackupPayload, decryptBackupPayload } from '../../src/utils/backupCrypto.js';
import { inspectBackupFile } from '../../src/utils/backupService.js';
import { getBackupErrorMessage } from '../../src/utils/backupErrorMessages.js';

test('hard bounds allow exact limit and fail one byte over with recognizable error codes', () => {
  assert.doesNotThrow(() => assertBackupPayloadSize(MAX_BACKUP_PLAINTEXT_BYTES));
  assert.doesNotThrow(() => assertBackupFileSize(MAX_BACKUP_FILE_BYTES));
  assert.throws(() => assertBackupPayloadSize(MAX_BACKUP_PLAINTEXT_BYTES + 1),
    err => err.code === 'BACKUP_TOO_LARGE');
  assert.throws(() => assertBackupFileSize(MAX_BACKUP_FILE_BYTES + 1),
    err => err.code === 'BACKUP_FILE_TOO_LARGE');
});

test('oversized attachment is rejected by snapshot preflight before any Blob data is read', () => {
  const oversized = Object.create(Blob.prototype);
  // A size-only synthetic fixture avoids allocating tens of MiB in CI.
  Object.defineProperty(oversized, 'size', { value: 26 * 1024 * 1024 });
  oversized.arrayBuffer = () => { throw new Error('Must not read oversized Blob'); };
  assert.throws(() => preflightBackupSnapshot({
    domains: { 'momentum-task-storage': { state: { tasks: [{ id: 'safe' }] } } },
    attachments: [{ id: 'synthetic-large', blob: oversized }],
    wallpapers: [],
  }), err => err.code === 'BACKUP_TOO_LARGE');
});

test('oversized custom wallpaper cannot be silently excluded from encrypted backup', () => {
  // A repeated ASCII string is much cheaper than allocating image contents.
  const oversizedUrl = 'data:image/png;base64,' + 'x'.repeat(MAX_BACKUP_PLAINTEXT_BYTES);
  assert.throws(() => preflightBackupSnapshot({
    domains: {}, attachments: [], wallpapers: [{ id: 'qa-wall', dataUrl: oversizedUrl }],
  }), err => err.code === 'BACKUP_TOO_LARGE');
});

test('inspection and direct decrypt reject enormous archive strings before parsing JSON', async () => {
  const big = 'x'.repeat(MAX_BACKUP_FILE_BYTES + 1);
  const inspection = inspectBackupFile(big);
  assert.equal(inspection.valid, false);
  assert.match(inspection.error, /48 MiB/);
  await assert.rejects(decryptBackupPayload(big, 'synthetic-passphrase'),
    err => err.code === 'BACKUP_FILE_TOO_LARGE');
});

test('encryption rejects oversized plaintext before PBKDF2, and a valid medium payload still round-trips', async () => {
  await assert.rejects(
    encryptBackupPayload('x'.repeat(MAX_BACKUP_PLAINTEXT_BYTES + 1), 'synthetic-passphrase'),
    err => err.code === 'BACKUP_TOO_LARGE'
  );
  const testBody = 'A'.repeat(4 * 1024 * 1024);
  const plaintext = JSON.stringify({
    manifest: { version: 1 },
    domains: { 'qa-large-record': { state: { notes: [{ id: 'one', text: testBody }] } } },
    attachments: [],
  });
  const before = process.memoryUsage().rss;
  const envelope = await encryptBackupPayload(plaintext, 'synthetic-passphrase');
  const afterEncrypt = process.memoryUsage().rss;
  const decrypted = await decryptBackupPayload(envelope, 'synthetic-passphrase');
  assert.equal(decrypted.domains['qa-large-record'].state.notes[0].text, testBody);
  const afterDecrypt = process.memoryUsage().rss;
  console.log('INFO: 4 MiB encrypted/decrypted fixture, sample RSS (not peak):',
    { beforeMiB: Math.round(before / 1048576),
      afterEncryptMiB: Math.round(afterEncrypt / 1048576),
      afterDecryptMiB: Math.round(afterDecrypt / 1048576) });
});

test('user messages distinguish recovery journal, cross-tab conflicts, quota and archive size', () => {
  assert.match(getBackupErrorMessage({ code: 'RESTORE_CONFLICT' }), /another Momentum tab/i);
  assert.match(getBackupErrorMessage({ code: 'RESTORE_RECOVERY_REQUIRED' }), /do not clear/i);
  assert.match(getBackupErrorMessage({ name: 'QuotaExceededError' }), /free space/i);
  assert.match(getBackupErrorMessage({ code: 'BACKUP_TOO_LARGE' }), /32 MiB/);
  assert.match(getBackupErrorMessage({ code: 'BACKUP_FILE_TOO_LARGE' }), /48 MiB/);
});
