/**
 * Momentum Persistent Attachment Storage
 * Manages durable binary file storage (images, audio, documents) in IndexedDB.
 * Decouples heavy file bytes from serialized store JSON, generates active Blob URLs
 * on demand, and handles lifecycle cleanup.
 */

import { v4 as uuidv4 } from 'uuid';
import {
  setAttachmentRecord,
  getAttachmentRecord,
  removeAttachmentRecord,
} from './db.js';

// Active in-memory Object URL cache to prevent duplicate createObjectURL allocations
const activeBlobUrls = new Map();

// Supported MIME types and max size limit (50MB)
export const MAX_ATTACHMENT_SIZE_BYTES = 50 * 1024 * 1024;
export const SUPPORTED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/ogg',
  'audio/m4a',
  'application/pdf',
  'text/plain',
]);

/**
 * Format raw byte size into human-readable string (e.g. "1.8 MB")
 */
export function formatByteSize(bytes) {
  if (!bytes || isNaN(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i] || 'MB'}`;
}

/**
 * Convert Base64 Data URL to a binary Blob.
 */
export function dataUrlToBlob(dataUrl) {
  if (!dataUrl || typeof dataUrl !== 'string') return null;
  const parts = dataUrl.split(',');
  if (parts.length !== 2) return null;
  const mimeMatch = parts[0].match(/:(.*?);/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  const byteString = atob(parts[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([uint8Array], { type: mimeType });
}

/**
 * Convert a File or Blob into a durable attachment record and persist to IndexedDB.
 *
 * @param {File|Blob} fileOrBlob
 * @param {Object} options
 * @param {string} [options.noteId]
 * @param {string} [options.name]
 * @param {string} [options.subtitle]
 * @param {string} [options.caption]
 * @returns {Promise<Object>} Metadata descriptor to embed in Note
 */
export async function saveAttachmentFile(fileOrBlob, options = {}) {
  if (!fileOrBlob) {
    throw new Error('No file provided to saveAttachmentFile');
  }

  // Convert first, then validate the actual bytes rather than a data URL's
  // missing .size property. A failed binary transaction is not a save.
  const blob = fileOrBlob instanceof Blob ? fileOrBlob
    : (typeof fileOrBlob === 'string' && fileOrBlob.startsWith('data:') ? dataUrlToBlob(fileOrBlob) : null);
  if (!(blob instanceof Blob)) throw new Error('Invalid attachment data');
  const sizeBytes = blob.size;
  if (sizeBytes > MAX_ATTACHMENT_SIZE_BYTES) {
    throw new Error(`File size (${formatByteSize(sizeBytes)}) exceeds maximum allowed limit of 50 MB`);
  }

  const id = options.id || `att-${uuidv4().slice(0, 8)}`;
  const fileName = options.name || fileOrBlob.name || 'attachment';
  const mimeType = blob.type || options.mimeType || 'application/octet-stream';

  let type = 'document';
  if (mimeType.startsWith('image/')) type = 'image';
  else if (mimeType.startsWith('audio/')) type = 'audio';
  else if (mimeType === 'application/pdf') type = 'pdf';

  const record = {
    id,
    noteId: options.noteId || null,
    fileName,
    name: fileName,
    mimeType,
    sizeBytes,
    type,
    blob,
    createdAt: new Date().toISOString(),
  };

  const saved = await setAttachmentRecord(record);
  if (saved !== true) throw new Error('Attachment could not be safely saved to device storage');

  // Generate an active Blob URL for immediate UI rendering
  let activeUrl = '';
  if (typeof window !== 'undefined' && window.URL && blob instanceof Blob) {
    activeUrl = window.URL.createObjectURL(blob);
    activeBlobUrls.set(id, activeUrl);
  }

  return {
    id,
    name: fileName,
    fileName,
    size: formatByteSize(sizeBytes),
    sizeBytes,
    type,
    mimeType,
    storageKey: `att-${id}`,
    url: activeUrl,
    subtitle: options.subtitle || options.caption || `Uploaded ${new Date().toLocaleDateString()}`,
    caption: options.caption || options.subtitle || '',
    createdAt: record.createdAt,
    isDurable: true,
  };
}

/**
 * Get a valid rendering URL for an attachment descriptor.
 * Resolves durable Blobs from IndexedDB or passes through external URLs.
 */
export async function resolveAttachmentUrl(attachment) {
  if (!attachment) return '';

  // 1. If it's an external HTTP/HTTPS URL, return as-is
  if (typeof attachment.url === 'string' && (attachment.url.startsWith('http://') || attachment.url.startsWith('https://'))) {
    return attachment.url;
  }

  // 2. If we already have an active live Blob URL cached in memory, return it
  if (activeBlobUrls.has(attachment.id)) {
    return activeBlobUrls.get(attachment.id);
  }

  // 3. Look up stored binary Blob in IndexedDB
  const record = await getAttachmentRecord(attachment.id);
  if (record && record.blob instanceof Blob) {
    if (typeof window !== 'undefined' && window.URL) {
      const url = window.URL.createObjectURL(record.blob);
      activeBlobUrls.set(attachment.id, url);
      return url;
    }
  }

  // 4. If attachment itself has a Base64 dataUrl, return that
  if (typeof attachment.url === 'string' && attachment.url.startsWith('data:')) {
    return attachment.url;
  }

  // 5. If it had a dead blob: URL from a prior session, mark unavailable
  return '';
}

/**
 * Delete an attachment's durable binary data from IndexedDB and revoke its Blob URL.
 */
export async function deleteAttachmentFile(id) {
  if (!id) return false;

  // Revoke active object URL if present
  if (activeBlobUrls.has(id)) {
    const url = activeBlobUrls.get(id);
    if (typeof window !== 'undefined' && window.URL) {
      try {
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.warn('[AttachmentStorage] Error revoking object URL:', err);
      }
    }
    activeBlobUrls.delete(id);
  }

  return await removeAttachmentRecord(id);
}

/**
 * Cleanup all active Blob URLs to prevent memory leaks on app unmount/reload.
 */
export function revokeAllAttachmentUrls() {
  if (typeof window === 'undefined' || !window.URL) return;
  for (const [, url] of activeBlobUrls.entries()) {
    try {
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.warn('[AttachmentStorage] Error revoking object URL in cleanup:', err);
    }
  }
  activeBlobUrls.clear();
}

/**
 * Migrate legacy notes with embedded Data URLs into durable binary IndexedDB records.
 * Replaces large Data URLs with clean attachment references to keep note stores lightweight.
 *
 * @param {Array} notes
 * @returns {Promise<Array>} Cleaned notes array
 */
export async function migrateLegacyNoteAttachments(notes) {
  if (!Array.isArray(notes)) return notes;

  const migratedNotes = [];

  for (const note of notes) {
    if (!Array.isArray(note.attachments) || note.attachments.length === 0) {
      migratedNotes.push(note);
      continue;
    }

    const updatedAttachments = [];
    for (const att of note.attachments) {
      // If attachment has an embedded Base64 Data URL, extract and store as durable binary Blob
      if (typeof att.url === 'string' && att.url.startsWith('data:image/')) {
        try {
          const blob = dataUrlToBlob(att.url);
          if (blob) {
            const attId = att.id || `att-${uuidv4().slice(0, 8)}`;
            await setAttachmentRecord({
              id: attId,
              noteId: note.id,
              name: att.name || 'image.jpg',
              fileName: att.name || 'image.jpg',
              mimeType: blob.type || 'image/jpeg',
              sizeBytes: blob.size,
              type: 'image',
              blob,
              createdAt: att.createdAt || new Date().toISOString(),
            });

            const activeUrl = typeof window !== 'undefined' && window.URL ? window.URL.createObjectURL(blob) : '';
            if (activeUrl) activeBlobUrls.set(attId, activeUrl);

            updatedAttachments.push({
              ...att,
              id: attId,
              storageKey: `att-${attId}`,
              url: activeUrl,
              sizeBytes: blob.size,
              size: formatByteSize(blob.size),
              isDurable: true,
            });
            continue;
          }
        } catch (e) {
          console.warn('[AttachmentStorage] Error migrating DataURL attachment:', e);
        }
      }

      // If dead Blob URL from a prior session, mark as unavailable
      if (typeof att.url === 'string' && att.url.startsWith('blob:')) {
        // Check if bytes exist in IndexedDB
        const existingRecord = await getAttachmentRecord(att.id);
        if (existingRecord && existingRecord.blob) {
          const freshUrl = typeof window !== 'undefined' && window.URL ? window.URL.createObjectURL(existingRecord.blob) : '';
          if (freshUrl) activeBlobUrls.set(att.id, freshUrl);
          updatedAttachments.push({
            ...att,
            url: freshUrl,
            isDurable: true,
          });
          continue;
        } else {
          // Dead blob URL without stored bytes
          updatedAttachments.push({
            ...att,
            url: '',
            isUnavailable: true,
            unavailableReason: 'Dead temporary session URL; original file bytes were not persisted.',
          });
          continue;
        }
      }

      updatedAttachments.push(att);
    }

    migratedNotes.push({
      ...note,
      attachments: updatedAttachments,
    });
  }

  return migratedNotes;
}
