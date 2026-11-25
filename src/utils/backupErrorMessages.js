/**
 * User-facing backup and restore errors for both current Momentum themes.
 * Show actionable messages without implying a failed restore committed.
 * The recovery-required case must not promise that journal rollback succeeded.
 */
export function getBackupErrorMessage(error, fallback = 'Backup or restore could not be completed.') {
  switch (error?.code) {
    case 'BACKUP_TOO_LARGE':
      return 'This backup contains too much data for safe in-memory encryption (32 MiB payload limit). No incomplete backup was created. Save large attachments elsewhere before reducing stored media and trying again.';
    case 'BACKUP_FILE_TOO_LARGE':
      return 'This backup file exceeds the 48 MiB safe import limit. It was not opened or restored. Use a smaller compatible backup; do not delete your current data.';
    case 'RESTORE_CONFLICT':
      return 'Another Momentum tab changed saved data while this restore was preparing. The restore was cancelled to protect newer edits. Close other Momentum tabs and retry.';
    case 'RESTORE_RECOVERY_REQUIRED':
      return 'The interrupted restore could not be safely recovered. Do not clear this app\'s site data. Restart Momentum to retry recovery; seek help if the warning continues.';
    case 'RESTORE_WRITE_ABORTED':
      return 'Restore could not be durably saved. Device storage may be full or temporarily unavailable. Your earlier records were kept. Free space without clearing Momentum site data and retry.';
    case 'BACKUP_LOCKS_UNAVAILABLE':
    case 'RESTORE_LOCKS_UNAVAILABLE':
      return 'This browser does not support the storage locking needed for this operation. Open Momentum in an updated compatible browser and try again.';
    case 'INVALID_PASSPHRASE':
      return 'Incorrect backup passphrase. Please check and try again.';
    case 'CORRUPTED_PAYLOAD':
    case 'ATTACHMENT_CHECKSUM_MISMATCH':
      return 'Backup integrity verification failed. The file may be damaged or modified. No restore records were written.';
    default:
      if (error?.name === 'QuotaExceededError' || error?.code === 'QUOTA_EXCEEDED') {
        return 'Device storage is full or unavailable. Free space without clearing Momentum app data, then retry. A successful save was not recorded.';
      }
      return typeof error?.message === 'string' && error.message ? error.message : fallback;
  }
}
