/**
 * Phase 2.10: explicit conservative limits for the current in-memory backup
 * format. The format builds JSON, Base64, plaintext and ciphertext copies,
 * so accepting unbounded media can exhaust browser/mobile memory.
 *
 * These are compatibility/safety bounds, NOT disk quotas, file splitting,
 * streaming support or guarantees about RAM use on a particular device.
 */
export const MAX_BACKUP_PLAINTEXT_BYTES = 32 * 1024 * 1024;
export const MAX_BACKUP_FILE_BYTES = 48 * 1024 * 1024;

function oversized(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

export function assertBackupFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) throw new TypeError('Invalid backup file size');
  if (bytes > MAX_BACKUP_FILE_BYTES) {
    throw oversized('BACKUP_FILE_TOO_LARGE',
      'Backup file is too large for safe in-memory restore (48 MiB limit). No data was changed.');
  }
}

export function assertBackupPayloadSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) throw new TypeError('Invalid backup payload size');
  if (bytes > MAX_BACKUP_PLAINTEXT_BYTES) {
    throw oversized('BACKUP_TOO_LARGE',
      'Backup exceeds the safe in-memory payload limit (32 MiB). No incomplete backup was produced.');
  }
}

/**
 * Reject large snapshots BEFORE converting any large Blobs into Base64 or
 * computing their full-file hashes. Overestimates slightly to account for
 * JSON property names, domain metadata and per-item structures.
 */
export function preflightBackupSnapshot({ domains, attachments, wallpapers }) {
  const domainJson = JSON.stringify(domains || {});
  if (domainJson.length > MAX_BACKUP_PLAINTEXT_BYTES) {
    assertBackupPayloadSize(domainJson.length);
  }

  let estimate = new TextEncoder().encode(domainJson).byteLength + 128 * 1024;
  assertBackupPayloadSize(estimate);

  for (const attachment of attachments || []) {
    // Do not silently remove invalid attachments: actual strict bundle
    // validation will reject them rather than exporting an incomplete archive.
    const blob = attachment?.blob;
    if (typeof Blob !== 'undefined' && blob instanceof Blob) {
      estimate += 4 * Math.ceil(blob.size / 3);
    } else if (typeof blob === 'string' && blob.startsWith('data:')) {
      estimate += blob.length;
    }
    estimate += 1024;
    assertBackupPayloadSize(estimate);
  }

  for (const wallpaper of wallpapers || []) {
    estimate += (wallpaper?.dataUrl?.length || 0) +
      JSON.stringify(wallpaper?.meta || {}).length + 1024;
    assertBackupPayloadSize(estimate);
  }
  return estimate;
}
