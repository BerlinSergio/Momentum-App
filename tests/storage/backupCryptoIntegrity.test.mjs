/**
 * Phase 2.3 independent authenticated-backup crypto fault injection.
 * Uses synthetic payloads and an ephemeral test passphrase only.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { encryptBackupPayload, decryptBackupPayload } from '../../src/utils/backupCrypto.js';

const passphrase = 'qa-synthetic-backup-passphrase-only';
const synthetic = {
  manifest: { version: 1, recordCounts: { notes: 1, transactions: 1 } },
  domains: {
    'momentum-notes-storage': { state: { notes: [{ id: 'qa-note', title: 'Test' }] }, version: 0 },
    'momentum-finance-storage': { state: { transactions: [{ id: 'qa-tx', amount: 12 }] }, version: 0 },
  },
  attachments: [],
};

test('encrypted backup decrypts exactly, wrong passphrase and tampering fail authentication', async () => {
  const envelope = await encryptBackupPayload(JSON.stringify(synthetic), passphrase);
  const restored = await decryptBackupPayload(envelope, passphrase);
  assert.deepEqual(restored, synthetic);

  await assert.rejects(
    decryptBackupPayload(envelope, 'wrong-synthetic-passphrase'),
    error => error?.code === 'INVALID_PASSPHRASE'
  );

  const corruptPayload = structuredClone(envelope);
  const first = corruptPayload.encryptedPayload[0];
  corruptPayload.encryptedPayload = (first === 'A' ? 'B' : 'A') + corruptPayload.encryptedPayload.slice(1);
  await assert.rejects(
    decryptBackupPayload(corruptPayload, passphrase),
    error => error?.code === 'CORRUPTED_PAYLOAD'
  );

  const corruptKey = structuredClone(envelope);
  const head = corruptKey.wrappedKey[0];
  corruptKey.wrappedKey = (head === 'A' ? 'B' : 'A') + corruptKey.wrappedKey.slice(1);
  await assert.rejects(
    decryptBackupPayload(corruptKey, passphrase),
    error => error?.code === 'INVALID_PASSPHRASE'
  );

  await assert.rejects(decryptBackupPayload('{invalid json', passphrase), /Not valid JSON/);
});
