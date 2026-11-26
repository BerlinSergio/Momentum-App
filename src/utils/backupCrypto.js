/**
 * Momentum Backup Cryptographic Service
 *
 * Implements authenticated envelope encryption using AES-256-GCM and PBKDF2-HMAC-SHA-256.
 * Adheres strictly to OWASP cryptographic guidelines and NIST SP 800-38D / SP 800-132.
 *
 * Architecture:
 * - KDF: PBKDF2-HMAC-SHA-256 with 600,000 iterations and 128-bit random salt
 * - KEK (Key Encryption Key): 256-bit key derived from user backup passphrase
 * - DEK (Data Encryption Key): 256-bit cryptographically random AES-GCM key
 * - Payload Encryption: AES-256-GCM with 96-bit unique IV and 128-bit authentication tag
 * - Key Wrapping: DEK encrypted with KEK using AES-256-GCM with unique 96-bit IV
 */

import {
  MAX_BACKUP_PLAINTEXT_BYTES,
  MAX_BACKUP_FILE_BYTES,
  assertBackupFileSize,
  assertBackupPayloadSize,
} from './backupLimits.js';

export const BACKUP_FORMAT_IDENTIFIER = 'momentum-backup';
export const CURRENT_BACKUP_VERSION = 1;
export const PBKDF2_BACKUP_ITERATIONS = 600000;
export const SALT_BYTE_LENGTH = 16; // 128 bits
export const IV_BYTE_LENGTH = 12; // 96 bits for AES-GCM
export const KEY_BIT_LENGTH = 256; // 256 bits

/**
 * Access the Web Crypto instance across browser and Node.js testing environments
 */
function getCrypto() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) {
    return globalThis.crypto;
  }
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    return window.crypto;
  }
  return null;
}

/**
 * Encode an ArrayBuffer or Uint8Array to a Base64 string
 */
export function bufferToBase64(buffer) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  if (typeof globalThis !== 'undefined' && globalThis.Buffer) {
    return globalThis.Buffer.from(bytes).toString('base64');
  }
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Decode a Base64 string into a Uint8Array
 */
export function base64ToBuffer(base64) {
  if (typeof globalThis !== 'undefined' && globalThis.Buffer) {
    const buf = globalThis.Buffer.from(base64, 'base64');
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Compute SHA-256 checksum of an ArrayBuffer, Uint8Array, or UTF-8 string, returned as a hex string
 */
export async function computeSha256(data) {
  const cryptoInstance = getCrypto();
  if (!cryptoInstance) {
    throw new Error('Web Crypto API unavailable');
  }

  let bytes;
  if (typeof data === 'string') {
    bytes = new TextEncoder().encode(data);
  } else if (data instanceof Uint8Array) {
    bytes = data;
  } else if (data instanceof ArrayBuffer) {
    bytes = new Uint8Array(data);
  } else if (typeof Blob !== 'undefined' && data instanceof Blob) {
    const ab = await data.arrayBuffer();
    bytes = new Uint8Array(ab);
  } else {
    throw new Error('Unsupported data type for SHA-256 computation');
  }

  const hashBuffer = await cryptoInstance.subtle.digest('SHA-256', bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time string equality check to prevent timing side channels
 */
export function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Generate cryptographically secure random bytes
 */
export function generateRandomBytes(length) {
  const cryptoInstance = getCrypto();
  if (!cryptoInstance) {
    throw new Error('Cryptographic provider unavailable');
  }
  const bytes = new Uint8Array(length);
  cryptoInstance.getRandomValues(bytes);
  return bytes;
}

/**
 * Derive a 256-bit Key Encryption Key (KEK) from a passphrase using PBKDF2-HMAC-SHA-256
 */
export async function deriveKekFromPassphrase(passphrase, saltBytes, iterations = PBKDF2_BACKUP_ITERATIONS) {
  const cryptoInstance = getCrypto();
  if (!cryptoInstance) {
    throw new Error('Web Crypto API unavailable');
  }

  const passphraseString = String(passphrase || '');
  if (!passphraseString) {
    throw new Error('Backup passphrase cannot be empty');
  }

  const keyMaterial = await cryptoInstance.subtle.importKey(
    'raw',
    new TextEncoder().encode(passphraseString),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return await cryptoInstance.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: KEY_BIT_LENGTH },
    false,
    ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
  );
}

/**
 * Encrypt a JSON data string into an authenticated versioned backup envelope
 *
 * @param {string} payloadJson - Plaintext JSON string containing all user records and attachments
 * @param {string} passphrase - User-chosen backup passphrase
 * @returns {Promise<Object>} Backup envelope ready for serialization
 */
export async function encryptBackupPayload(payloadJson, passphrase) {
  const cryptoInstance = getCrypto();
  if (!cryptoInstance) {
    throw new Error('Web Crypto API unavailable');
  }

  const jsonStr = typeof payloadJson === 'string' ? payloadJson : JSON.stringify(payloadJson);
  // The current v1 format encrypts one entire JSON string in memory.
  // Check size before PBKDF2/key creation or expensive byte copying.
  if (jsonStr?.length > MAX_BACKUP_PLAINTEXT_BYTES) assertBackupPayloadSize(jsonStr.length);
  if (!jsonStr || !jsonStr.trim()) {
    throw new Error('Payload to encrypt must be a non-empty string');
  }

  const passphraseStr = String(passphrase || '').trim();
  if (!passphraseStr) {
    throw new Error('A backup passphrase is required');
  }
  if (passphraseStr.length < 8) {
    throw new Error('Backup passphrase must be at least 8 characters long');
  }

  // 1. Generate unique random salt and IVs
  const saltBytes = generateRandomBytes(SALT_BYTE_LENGTH);
  const keyIvBytes = generateRandomBytes(IV_BYTE_LENGTH);
  const payloadIvBytes = generateRandomBytes(IV_BYTE_LENGTH);

  // 2. Derive Key Encryption Key (KEK) from passphrase
  const kek = await deriveKekFromPassphrase(passphraseStr, saltBytes, PBKDF2_BACKUP_ITERATIONS);

  // 3. Generate random Data Encryption Key (DEK)
  const dek = await cryptoInstance.subtle.generateKey(
    { name: 'AES-GCM', length: KEY_BIT_LENGTH },
    true,
    ['encrypt', 'decrypt']
  );

  // 4. Encrypt the data payload with DEK using AES-256-GCM
  const payloadBytes = new TextEncoder().encode(jsonStr);
  assertBackupPayloadSize(payloadBytes.byteLength);
  const encryptedPayloadBuffer = await cryptoInstance.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: payloadIvBytes,
      tagLength: 128,
    },
    dek,
    payloadBytes
  );

  // 5. Wrap (encrypt) DEK with KEK using AES-256-GCM
  const wrappedKeyBuffer = await cryptoInstance.subtle.wrapKey(
    'raw',
    dek,
    kek,
    {
      name: 'AES-GCM',
      iv: keyIvBytes,
      tagLength: 128,
    }
  );

  // 6. Compute payload integrity checksum before wrapping
  const payloadSha256 = await computeSha256(encryptedPayloadBuffer);

  const envelope = {
    format: BACKUP_FORMAT_IDENTIFIER,
    version: CURRENT_BACKUP_VERSION,
    appVersion: '1.0.0',
    createdAt: new Date().toISOString(),
    kdf: {
      algorithm: 'PBKDF2-SHA256',
      iterations: PBKDF2_BACKUP_ITERATIONS,
      salt: bufferToBase64(saltBytes),
      hash: 'SHA-256',
    },
    encryption: {
      cipher: 'AES-256-GCM',
      keyIv: bufferToBase64(keyIvBytes),
      payloadIv: bufferToBase64(payloadIvBytes),
      tagLength: 128,
    },
    wrappedKey: bufferToBase64(wrappedKeyBuffer),
    encryptedPayload: bufferToBase64(encryptedPayloadBuffer),
    payloadSha256,
  };

  return envelope;
}

/**
 * Decrypt an authenticated backup envelope using the provided passphrase
 *
 * @param {Object|string} envelopeOrString - The backup envelope object or JSON string
 * @param {string} passphrase - User backup passphrase
 * @returns {Promise<Object>} Decrypted payload object
 */
export async function decryptBackupPayload(envelopeOrString, passphrase) {
  const cryptoInstance = getCrypto();
  if (!cryptoInstance) {
    throw new Error('Web Crypto API unavailable');
  }

  let envelope = envelopeOrString;
  if (typeof envelopeOrString === 'string') {
    assertBackupFileSize(envelopeOrString.length);
    try {
      envelope = JSON.parse(envelopeOrString);
    } catch {
      throw new Error('Invalid backup file: Not valid JSON format');
    }
  }

  if (!envelope || typeof envelope !== 'object') {
    throw new Error('Invalid backup format: Envelope must be an object');
  }

  // Handle case where caller passed result object { success: true, envelope: {...} }
  if (envelope.envelope && typeof envelope.envelope === 'object') {
    envelope = envelope.envelope;
  }

  // 1. Validate envelope header
  if (envelope.format !== BACKUP_FORMAT_IDENTIFIER) {
    const err = new Error(`Unsupported backup format: Expected "${BACKUP_FORMAT_IDENTIFIER}", got "${envelope.format}"`);
    err.code = 'UNSUPPORTED_FORMAT';
    throw err;
  }

  if (typeof envelope.version !== 'number' || envelope.version > CURRENT_BACKUP_VERSION) {
    const err = new Error(`Unsupported backup version: Version ${envelope.version} is not supported by this application version`);
    err.code = 'UNSUPPORTED_VERSION';
    throw err;
  }

  if (!envelope.kdf?.salt || !envelope.kdf?.iterations) {
    throw new Error('Corrupted backup: Missing KDF parameters');
  }

  if (!envelope.encryption?.keyIv || !envelope.encryption?.payloadIv) {
    throw new Error('Corrupted backup: Missing encryption initialization vectors');
  }

  if (!envelope.wrappedKey || !envelope.encryptedPayload) {
    throw new Error('Corrupted backup: Missing encrypted key or payload data');
  }
  // Do not allocate a huge decoded ciphertext just to discover that v1's
  // single-buffer decrypt cannot safely process the archive.
  if (typeof envelope.encryptedPayload !== 'string') {
    throw new Error('Corrupted backup: Invalid encrypted payload');
  }
  assertBackupFileSize(envelope.encryptedPayload.length);
  if (envelope.encryptedPayload.length > 4 * Math.ceil((MAX_BACKUP_PLAINTEXT_BYTES + 16) / 3)) {
    assertBackupPayloadSize(Math.floor(envelope.encryptedPayload.length * 3 / 4) - 16);
  }

  // 2. Decode Base64 parameters
  const saltBytes = base64ToBuffer(envelope.kdf.salt);
  const keyIvBytes = base64ToBuffer(envelope.encryption.keyIv);
  const payloadIvBytes = base64ToBuffer(envelope.encryption.payloadIv);
  const wrappedKeyBytes = base64ToBuffer(envelope.wrappedKey);
  const encryptedPayloadBytes = base64ToBuffer(envelope.encryptedPayload);

  // 3. Verify payload checksum integrity if present
  if (envelope.payloadSha256) {
    const computedHash = await computeSha256(encryptedPayloadBytes);
    if (!constantTimeEqual(computedHash, envelope.payloadSha256)) {
      const err = new Error('Backup integrity validation failed: Ciphertext checksum mismatch (file may be corrupted or tampered)');
      err.code = 'CORRUPTED_PAYLOAD';
      throw err;
    }
  }

  // 4. Derive KEK from entered passphrase
  const passphraseStr = String(passphrase || '');
  const kek = await deriveKekFromPassphrase(passphraseStr, saltBytes, envelope.kdf.iterations);

  // 5. Unwrap (decrypt) DEK with KEK
  // If the passphrase is incorrect or wrappedKey has been tampered, AES-GCM tag check fails
  let dek;
  try {
    dek = await cryptoInstance.subtle.unwrapKey(
      'raw',
      wrappedKeyBytes,
      kek,
      {
        name: 'AES-GCM',
        iv: keyIvBytes,
        tagLength: envelope.encryption.tagLength || 128,
      },
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
  } catch (unwrapErr) {
    // Explicit failure for wrong passphrase or key tampering
    const err = new Error('Incorrect backup passphrase or corrupted key data');
    err.code = 'INVALID_PASSPHRASE';
    err.originalError = unwrapErr;
    throw err;
  }

  // 6. Decrypt payload with DEK
  let decryptedBuffer;
  try {
    decryptedBuffer = await cryptoInstance.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: payloadIvBytes,
        tagLength: envelope.encryption.tagLength || 128,
      },
      dek,
      encryptedPayloadBytes
    );
  } catch (decryptErr) {
    const err = new Error('Decryption failed: Authenticated ciphertext was modified or corrupted');
    err.code = 'CORRUPTED_PAYLOAD';
    err.originalError = decryptErr;
    throw err;
  }

  // 7. Parse plaintext JSON. Guard before turning large binary data into
  // another in-memory string and object graph.
  assertBackupPayloadSize(decryptedBuffer.byteLength);
  const plaintextString = new TextDecoder().decode(decryptedBuffer);
  try {
    return JSON.parse(plaintextString);
  } catch {
    throw new Error('Decrypted payload is not valid JSON data');
  }
}
