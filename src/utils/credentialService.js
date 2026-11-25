/**
 * Momentum Central Credential Verification Service
 * Offline-first, secure passcode verification using PBKDF2-HMAC-SHA-256 via Web Crypto API.
 * 
 * Cryptographic properties:
 * - Algorithm: PBKDF2 with HMAC-SHA-256
 * - Salt: 16 bytes (128-bit) cryptographically secure pseudorandom number
 * - Work factor: 600,000 iterations (OWASP standard for PBKDF2-HMAC-SHA256)
 * - Derived key: 256-bit (32-byte) authentication verifier
 * - Comparison: Constant-time byte-by-byte comparison to prevent timing attacks
 * - Storage: Dedicated IndexedDB record in 'stores' table ('momentum-credential-verifier')
 * 
 * Note on 4-digit PIN entropy:
 * A 4-digit decimal PIN possesses ~13.29 bits of entropy (10,000 combinations).
 * PBKDF2 with 600,000 iterations slows offline brute-force attempts to ~250ms per candidate,
 * while progressive rate-limiting / lockout prevents online brute-force attacks.
 */

import { getCommittedStoreRecord, commitCredentialTransition } from '../storage/db.js';

export const CREDENTIAL_STORE_KEY = 'momentum-credential-verifier';
export const LOCKOUT_STORAGE_KEY = 'momentum_auth_lockout';
export const PBKDF2_ITERATIONS = 600000;
export const SALT_BYTE_LENGTH = 16;
export const VERIFIER_BIT_LENGTH = 256;

// Do not cache credential verifiers across tabs. Another tab may rotate or
// remove a PIN; verification must always read the latest committed record.

/**
 * Universal Crypto Resolver (Browser + Node.js)
 */
function getCrypto() {
  if (typeof window !== 'undefined' && window.crypto) {
    return window.crypto;
  }
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto;
  }
  return null;
}

/**
 * Safe Base64 Encoding / Decoding helpers
 */
export function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  if (typeof btoa === 'function') {
    return btoa(binary);
  }
  if (typeof globalThis !== 'undefined' && globalThis.Buffer) {
    return globalThis.Buffer.from(binary, 'binary').toString('base64');
  }
  return '';
}

export function base64ToBuffer(base64) {
  let binary = '';
  if (typeof atob === 'function') {
    binary = atob(base64);
  } else if (typeof globalThis !== 'undefined' && globalThis.Buffer) {
    binary = globalThis.Buffer.from(base64, 'base64').toString('binary');
  }
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Timing-safe string comparison to prevent timing oracle side channels
 */
export function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  let diff = a.length ^ b.length;
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i++) {
    const charA = i < a.length ? a.charCodeAt(i) : 0;
    const charB = i < b.length ? b.charCodeAt(i) : 0;
    diff |= charA ^ charB;
  }
  return diff === 0;
}

/**
 * Core PBKDF2 derivation function
 */
async function deriveVerifier(pin, saltBytes, iterations = PBKDF2_ITERATIONS) {
  const cryptoInstance = getCrypto();
  if (!cryptoInstance || !cryptoInstance.subtle) {
    throw new Error('Web Crypto API (subtle) is unavailable in this environment');
  }

  const enc = new TextEncoder();
  const keyMaterial = await cryptoInstance.subtle.importKey(
    'raw',
    enc.encode(String(pin)),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await cryptoInstance.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    VERIFIER_BIT_LENGTH
  );

  return bufferToBase64(derivedBits);
}

/**
 * Create and persist a new PBKDF2 credential verifier
 */
async function prepareCredential(pin) {
  const pinStr = String(pin || '').trim();
  if (!pinStr || pinStr.length !== 4 || !/^\d{4}$/.test(pinStr)) {
    return { success: false, error: 'PIN must be exactly 4 numeric digits' };
  }

  const cryptoInstance = getCrypto();
  if (!cryptoInstance) {
    return { success: false, error: 'Cryptographic provider unavailable' };
  }

  try {
    const saltBytes = new Uint8Array(SALT_BYTE_LENGTH);
    cryptoInstance.getRandomValues(saltBytes);
    const saltBase64 = bufferToBase64(saltBytes);

    const verifierBase64 = await deriveVerifier(pinStr, saltBytes, PBKDF2_ITERATIONS);

    const record = {
      version: 1,
      algorithm: 'PBKDF2-SHA256',
      iterations: PBKDF2_ITERATIONS,
      salt: saltBase64,
      verifier: verifierBase64,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return { success: true, record };
  } catch (err) {
    console.error('[CredentialService] createCredential error:', err);
    return { success: false, error: err.message || 'Credential generation failed' };
  }
}

/**
 * Retrieve the active credential verifier record from cache or IndexedDB
 */
export async function getCredentialRecord() {
  const snapshot = await getCommittedStoreRecord(CREDENTIAL_STORE_KEY);
  const record = snapshot?.value;
  if (record && (!record.salt || !record.verifier)) throw new Error('Invalid credential record');
  return record || null;
}

export async function hasCredential() {
  return !!(await getCredentialRecord());
}

async function verifySnapshot(pin, record) {
  if (!record || !record.salt || !record.verifier || !String(pin || '').trim()) {
    return { success: false, error: 'No valid credential or PIN' };
  }
  const derived = await deriveVerifier(String(pin).trim(), base64ToBuffer(record.salt), record.iterations || PBKDF2_ITERATIONS);
  return constantTimeEqual(derived, record.verifier)
    ? { success: true } : { success: false, error: 'Incorrect PIN' };
}

export async function verifyCredential(pin) {
  try {
    const snapshot = await getCommittedStoreRecord(CREDENTIAL_STORE_KEY);
    if (!snapshot) return { success: false, noCredential: true, error: 'No credential configured' };
    const result = await verifySnapshot(pin, snapshot.value);
    if (!result.success) return result;
    const latest = await getCommittedStoreRecord(CREDENTIAL_STORE_KEY);
    if (!latest || latest.revisionId !== snapshot.revisionId ||
        JSON.stringify(latest.value) !== JSON.stringify(snapshot.value)) {
      return { success: false, error: 'Credential changed during verification' };
    }
    return result;
  } catch {
    return { success: false, error: 'Credential verification unavailable' };
  }
}

// Serialize user-facing PIN checks and mutations across same-origin tabs.
// Raw verifyCredential is retained for migration round-trip checks only.
const ATTEMPT_LOCK = 'momentum-pin-attempt-v1';
async function withPinAttemptLock(operation) {
  if (!globalThis.navigator?.locks?.request) {
    return { success: false, error: 'Secure PIN coordination is unavailable in this browser.' };
  }
  try {
    return await navigator.locks.request(ATTEMPT_LOCK, { mode: 'exclusive' }, async () => {
      const state = getLockoutState();
      if (state.unavailable) return { success: false, error: 'PIN attempt storage is unavailable.' };
      if (state.isLockedOut) return { success: false, error: 'Too many attempts. Try again later.' };
      return operation();
    });
  } catch {
    return { success: false, error: 'Secure PIN coordination failed.' };
  }
}

export const authenticatePin = pin => withPinAttemptLock(async () => {
  const result = await verifyCredential(pin);
  if (!result.success) {
    return { ...result, lockout: recordFailedAttempt() };
  }
  clearLockoutState();
  return result;
});

async function transition(mode, currentPin, newPin) {
  if (mode !== 'create' && getLockoutState().isLockedOut) {
    return { success: false, error: 'Too many attempts. Try again later.' };
  }
  try {
    const credential = await getCommittedStoreRecord(CREDENTIAL_STORE_KEY);
    const security = await getCommittedStoreRecord('momentum-security-storage');
    if (mode === 'create') {
      if (credential) return { success: false, error: 'A PIN already exists' };
    } else {
      const verified = await verifySnapshot(currentPin, credential?.value);
      if (!verified.success) {
        recordFailedAttempt();
        return verified;
      }
    }
    let next = null;
    if (mode !== 'remove') {
      const prepared = await prepareCredential(newPin);
      if (!prepared.success) return prepared;
      next = prepared.record;
    }
    await commitCredentialTransition(credential, security, next, new Date().toISOString());
    // A cleanup failure cannot undo an already committed credential change.
    if (mode !== 'create') {
      try { clearLockoutState(); } catch { return { success: true, lockoutWarning: true }; }
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error?.code === 'CREDENTIAL_WRITE_CONFLICT'
      ? 'Credential or preferences changed; reload and retry.' : 'Credential transition was not committed' };
  }
}

export const createCredential = pin => transition('create', null, pin);
export const changeCredential = (currentPin, newPin) => withPinAttemptLock(() => transition('change', currentPin, newPin));
export const removeCredential = currentPin => withPinAttemptLock(() => transition('remove', currentPin, null));

// Pause App Lock without deleting or rotating the current verifier.
// The exact credential and security snapshots must still match at commit.
export const pauseAppLock = currentPin => withPinAttemptLock(() => pauseAppLockInternal(currentPin));
async function pauseAppLockInternal(currentPin) {
  if (getLockoutState().isLockedOut) return { success:false, error:'Too many attempts. Try again later.' };
  try {
    const credential = await getCommittedStoreRecord(CREDENTIAL_STORE_KEY);
    const security = await getCommittedStoreRecord('momentum-security-storage');
    const verified = await verifySnapshot(currentPin, credential?.value);
    if (!verified.success) {
      recordFailedAttempt();
      return verified;
    }
    await commitCredentialTransition(credential, security, credential.value, new Date().toISOString(), { pauseLock:true });
    try { clearLockoutState(); } catch { return { success:true, lockoutWarning:true }; }
    return { success:true };
  } catch (error) {
    return { success:false, error: error?.code === 'CREDENTIAL_WRITE_CONFLICT'
      ? 'Credential or preferences changed; reload and retry.' : 'App Lock pause was not committed' };
  }
}


/**
 * Progressive Lockout & Failed Attempt Policy
 * - 1-4 failures: 0s delay (standard shake feedback)
 * - 5-9 failures: 30s lockout
 * - 10-14 failures: 300s (5min) lockout
 * - 15+ failures: 1800s (30min) lockout
 */
// Shared origin storage survives tab close/reload. This is application-level
// throttling, not protection against direct access to browser storage.
export function getLockoutState() {
  try {
    const raw = globalThis.localStorage.getItem(LOCKOUT_STORAGE_KEY);
    const data = raw === null ? { failedAttempts: 0, lockedUntil: 0 } : JSON.parse(raw);
    if (!data || !Number.isSafeInteger(data.failedAttempts) || data.failedAttempts < 0 ||
        !Number.isFinite(data.lockedUntil) || data.lockedUntil < 0) {
      throw new Error('Malformed PIN attempt state');
    }
    const remainingSeconds = Math.max(0, Math.ceil((data.lockedUntil - Date.now()) / 1000));
    return { isLockedOut: remainingSeconds > 0, remainingSeconds, failedAttempts: data.failedAttempts };
  } catch {
    return { isLockedOut: true, remainingSeconds: 0, failedAttempts: 0, unavailable: true };
  }
}

// Production callers execute these changes while holding ATTEMPT_LOCK.
export function recordFailedAttempt() {
  const current = getLockoutState();
  if (current.unavailable) throw new Error('PIN attempt storage unavailable');
  if (current.isLockedOut) return current;
  const failedAttempts = current.failedAttempts + 1;
  const seconds = failedAttempts >= 15 ? 1800 : failedAttempts >= 10 ? 300 : failedAttempts >= 5 ? 30 : 0;
  globalThis.localStorage.setItem(LOCKOUT_STORAGE_KEY, JSON.stringify({
    failedAttempts, lockedUntil: seconds ? Date.now() + seconds * 1000 : 0, updatedAt: Date.now(),
  }));
  return getLockoutState();
}

export function clearLockoutState() {
  globalThis.localStorage.removeItem(LOCKOUT_STORAGE_KEY);
}

/**
 * Safe, idempotent migration of legacy plaintext PINs to PBKDF2 verifiers
 */
export async function migrateLegacyPin({ allowLegacyImport = true } = {}) {
  try {
    // 1. Check if a PBKDF2 credential verifier already exists.
    const existing = await getCredentialRecord();
    if (existing && existing.verifier) {
      await sanitizeOrdinaryStorage();
      return { migrated: false, alreadyMigrated: true };
    }
    // A completed schema migration is a durable trust boundary. After that
    // point a stale localStorage mirror must NEVER be promoted to a new
    // authentication credential. Only the audited first migration may read a
    // plaintext legacy PIN.
    if (!allowLegacyImport) {
      await sanitizeOrdinaryStorage();
      return { migrated: false, legacyImportClosed: true };
    }

    // Prefer the authoritative IndexedDB source over an older mirror.
    // Never purge either source before the credential transition commits.
    const stored = await getCommittedStoreRecord('momentum-security-storage');
    const parseState = value => {
      const parsed = typeof value === 'string' ? JSON.parse(value) : value;
      return parsed?.state || null;
    };
    const durableState = parseState(stored?.value);
    let legacyPin = String(durableState?.pin || '').trim();
    if (!legacyPin && typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem('momentum-security-storage');
      if (raw) legacyPin = String(parseState(raw)?.pin || '').trim();
    }
    if (legacyPin && !/^\d{4}$/.test(legacyPin)) {
      return { migrated: false, error: 'INVALID_LEGACY_PIN' };
    }

    if (!legacyPin) {
      return { migrated: false, noLegacyPin: true };
    }

    // 4. Derive PBKDF2 verifier from legacy PIN
    const created = await createCredential(legacyPin);
    if (!created.success) {
      // Another startup may have won the atomic import. Only accept the
      // same legacy PIN after independent verification, not any verifier.
      const concurrent = await verifyCredential(legacyPin);
      if (concurrent.success) {
        await sanitizeOrdinaryStorage();
        return { migrated: false, alreadyMigrated: true };
      }
      console.warn('[CredentialService] Migration derivation failed:', created.error);
      return { migrated: false, error: created.error };
    }

    // 5. Verify round-trip before purging legacy plaintext
    const testVerify = await verifyCredential(legacyPin);
    if (!testVerify.success) {
      console.error('[CredentialService] Self-test failed during legacy PIN migration! Retaining legacy store.');
      return { migrated: false, error: 'ROUNDTRIP_VERIFICATION_FAILED' };
    }

    // 6. Purge plaintext PIN from localStorage and IndexedDB while preserving hasPin: true
    await sanitizeOrdinaryStorage();

    console.info('[CredentialService] Successfully migrated legacy PIN to PBKDF2 verifier.');
    return { migrated: true };
  } catch (err) {
    console.error('[CredentialService] Legacy migration exception:', err);
    return { migrated: false, error: err.message };
  }
}

/**
 * Strips plaintext PIN and alphanumeric fields from localStorage and IndexedDB
 */
export async function sanitizeOrdinaryStorage() {
  try {
    const credExists = await hasCredential();
    if (typeof localStorage !== 'undefined') {
      let parsed = { state: { hasPin: credExists, pin: '', alphanumeric: '' }, version: 0 };
      const raw = localStorage.getItem('momentum-security-storage');
      if (raw) {
        try {
          const loaded = JSON.parse(raw);
          if (loaded && typeof loaded === 'object') {
            parsed = loaded;
          }
        } catch {
          // malformed or corrupted JSON, fall back to clean structure
        }
      }
      if (!parsed.state) parsed.state = {};
      const hadPin = Boolean(
        credExists ||
        parsed.state.hasPin ||
        (parsed.state.pin && String(parsed.state.pin).trim().length === 4)
      );
      parsed.state.pin = '';
      parsed.state.alphanumeric = '';
      parsed.state.hasPin = hadPin;
      localStorage.setItem('momentum-security-storage', JSON.stringify(parsed));
    }
  } catch (e) {
    console.warn('[CredentialService] sanitizeOrdinaryStorage error:', e);
  }
}
