/**
 * Momentum Storage Subsystem
 * Unified exports for database, persistence adapters, attachments, and migration.
 */

export {
  openAppDB,
  isIndexedDbSupported,
  getStoreItem,
  setStoreItem,
  removeStoreItem,
  getAttachmentRecord,
  setAttachmentRecord,
  removeAttachmentRecord,
  getAttachmentsByNoteId,
  getMigrationMeta,
  setMigrationMeta,
  getAllStoreItems,
  getAllAttachmentRecords,
  removeStoreItems,
  STORES,
} from './db.js';

export {
  createIndexedDbStorage,
} from './zustandIndexedDbStorage.js';

export {
  saveAttachmentFile,
  resolveAttachmentUrl,
  deleteAttachmentFile,
  revokeAllAttachmentUrls,
  migrateLegacyNoteAttachments,
  formatByteSize,
  dataUrlToBlob,
  MAX_ATTACHMENT_SIZE_BYTES,
  SUPPORTED_MIME_TYPES,
} from './attachmentStorage.js';

export {
  runStorageMigration,
  CURRENT_SCHEMA_VERSION,
  MIGRATION_KEY,
  LEGACY_STORAGE_KEYS,
} from './migration.js';
