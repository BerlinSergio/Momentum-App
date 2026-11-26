/**
 * Momentum Native Backup & Export Bridge
 * Extends Phase 07 backupService with native Capacitor Filesystem and Share APIs.
 * Supports native file sharing, document picking, and browser Blob fallbacks.
 */

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { isNativePlatform } from './nativeLifecycle';
import { exportBackupToFile } from './backupService';
import { assertBackupFileSize } from './backupLimits.js';

/**
 * Export backup envelope natively or via browser download
 * 
 * On Native (Android / iOS):
 * 1. Writes encrypted .momentum-backup JSON archive to local cache
 * 2. Gets the canonical content:// or file:// URI
 * 3. Triggers native platform Share Sheet (save to device, Drive, Files app, or transfer)
 *
 * On Web:
 * Seamlessly triggers programmatic Blob URL download.
 *
 * @param {Object|string} envelope - Backup envelope
 * @param {string} [customFilename] - Optional custom filename
 * @returns {Promise<{ success: boolean, method: string, fileName: string, uri?: string }>}
 */
export async function exportBackupNatively(envelope, customFilename = null) {
  const jsonString = typeof envelope === 'string' ? envelope : JSON.stringify(envelope, null, 2);
  const sizeBytes = new Blob([jsonString]).size;
  assertBackupFileSize(sizeBytes);
  const dateStr = new Date().toISOString().slice(0, 10);
  const timeStr = new Date().toISOString().slice(11, 16).replace(':', '');
  const fileName = customFilename || `momentum_backup_${dateStr}_${timeStr}.momentum-backup`;

  if (isNativePlatform()) {
    try {
      // 1. Write file to Cache directory
      const writeResult = await Filesystem.writeFile({
        path: fileName,
        data: jsonString,
        directory: Directory.Cache,
        encoding: Encoding.UTF8,
      });

      // 2. Resolve native content URI
      const fileUri = await Filesystem.getUri({
        path: fileName,
        directory: Directory.Cache,
      });

      // 3. Trigger native platform Share dialog
      if (await Share.canShare()) {
        await Share.share({
          title: 'Momentum Encrypted Backup',
          text: 'Encrypted Momentum archive (.momentum-backup)',
          url: fileUri.uri,
          dialogTitle: 'Save or Share Momentum Backup',
        });

        return {
          success: true,
          method: 'native_share',
          fileName,
          sizeBytes,
          uri: fileUri.uri,
        };
      }

      return {
        success: true,
        method: 'native_filesystem',
        fileName,
        sizeBytes,
        uri: writeResult.uri,
      };
    } catch (err) {
      console.warn('[NativeBackup] Native export failed, falling back to browser download:', err.message);
      // Fallback to web blob export
    }
  }

  // Web Browser fallback
  const webResult = await exportBackupToFile(envelope, fileName);
  return {
    success: true,
    method: 'web_download',
    fileName: webResult.fileName,
    sizeBytes: webResult.sizeBytes,
  };
}

/**
 * Read backup archive content from a native file path or URI
 *
 * @param {string} pathOrUri
 * @returns {Promise<string>}
 */
export async function readBackupFileNatively(pathOrUri) {
  if (isNativePlatform()) {
    try {
      const result = await Filesystem.readFile({
        path: pathOrUri,
        encoding: Encoding.UTF8,
      });
      const content = typeof result.data === 'string' ? result.data : JSON.stringify(result.data);
      // Native plugin may have already allocated the string, but refuse
      // an unbounded v1 JSON envelope before validation/decryption.
      assertBackupFileSize(new Blob([content]).size);
      return content;
    } catch (err) {
      console.error('[NativeBackup] Native readFile failed:', err);
      throw new Error(`Unable to read backup file from device: ${err.message}`, { cause: err });
    }
  }

  throw new Error('Native file reader called in non-native environment');
}
