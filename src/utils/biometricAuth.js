/**
 * Biometric Authentication Utility for Momentum
 * Standard WebAuthn API implementation with dual registration and authentication ceremonies.
 * 
 * Architecture:
 * - Registration (Enrollment): navigator.credentials.create() generates a platform credential,
 *   whose Credential ID is securely retained in local client storage.
 * - Authentication (Verification): navigator.credentials.get() issues an assertion challenge
 *   targeted specifically to the enrolled Credential ID with userVerification: 'required'.
 * - Unsupported / Native limitations: Truthfully reported if hardware/browser does not support WebAuthn.
 */

export const BIOMETRIC_CREDENTIAL_STORAGE_KEY = 'momentum_biometric_credential';

/**
 * Convert Buffer to Base64
 */
function bufferToBase64(buffer) {
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

/**
 * Convert Base64 to Uint8Array
 */
function base64ToBuffer(base64) {
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
 * Returns true if WebAuthn is supported in the current environment
 */
export async function isBiometricSupported() {
  if (typeof window === 'undefined') return false;
  return !!(window.PublicKeyCredential && navigator.credentials);
}

/**
 * Returns true if the device has a platform authenticator (Touch ID, Face ID, Windows Hello, Android Biometrics)
 */
export async function isPlatformAuthenticatorAvailable() {
  if (typeof window === 'undefined' || !window.PublicKeyCredential) return false;
  try {
    if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    }
  } catch (err) {
    console.warn('[BiometricAuth] Failed to check platform authenticator:', err);
  }
  return false;
}

// Legacy ID-only enrollment is insufficient to verify signatures. Keep it
// untouched until the user unlocks with PIN and explicitly re-enrolls.
function readEnrollment() {
  try {
    const record = JSON.parse(localStorage.getItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY));
    if (record?.version !== 2 || ![-7, -257].includes(record.alg) ||
        typeof record.id !== 'string' || !record.id ||
        typeof record.publicKey !== 'string' || !record.publicKey ||
        record.origin !== window.location.origin ||
        record.rpId !== window.location.hostname) return null;
    return record;
  } catch { return null; }
}

export function isBiometricEnrolled() { return Boolean(readEnrollment()); }
export function getEnrolledBiometricCredentialId() { return readEnrollment()?.id || null; }

const bytesEqual = (a, b) => a.length === b.length && a.every((v,i) => v === b[i]);
const base64url = bytes => bufferToBase64(bytes).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');

async function checkCeremony(response, challenge, type, rpId, authData) {
  const client = JSON.parse(new TextDecoder().decode(response.clientDataJSON));
  if (client.type !== type || client.challenge !== base64url(challenge) ||
      client.origin !== window.location.origin || client.crossOrigin === true) throw new Error('WebAuthn request mismatch');
  const data = new Uint8Array(authData);
  const rpHash = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rpId)));
  // User presence and user verification must both be present.
  if (data.length < 37 || !bytesEqual(data.slice(0,32),rpHash) || (data[32] & 5) !== 5) {
    throw new Error('WebAuthn authenticator data mismatch');
  }
}

// WebAuthn ES256 signatures are ASN.1 DER; Web Crypto expects r || s.
function es256Signature(signature) {
  const a = new Uint8Array(signature);
  if (a.length < 8 || a[0] !== 0x30 || a[1] !== a.length - 2) throw new Error('Invalid ES256 signature');
  let i = 2;
  const readInteger = () => {
    if (a[i++] !== 2) throw new Error('Invalid ES256 integer');
    const len = a[i++];
    if (!len || len > 33 || i + len > a.length || (a[i] & 128) ||
        (len > 1 && a[i] === 0 && !(a[i+1] & 128))) throw new Error('Invalid ES256 integer');
    let value = a.slice(i,i+len);
    i += len;
    if (value.length > 32 && value[0] === 0) value = value.slice(1);
    if (value.length > 32) throw new Error('Invalid ES256 integer size');
    const out = new Uint8Array(32);
    out.set(value, 32-value.length);
    return out;
  };
  const out = new Uint8Array(64);
  out.set(readInteger()); out.set(readInteger(),32);
  if (i !== a.length) throw new Error('Invalid ES256 trailing data');
  return out;
}

async function importVerificationKey(record) {
  return crypto.subtle.importKey('spki', base64ToBuffer(record.publicKey),
    record.alg === -7 ? { name:'ECDSA', namedCurve:'P-256' } :
      { name:'RSASSA-PKCS1-v1_5', hash:'SHA-256' }, false, ['verify']);
}

/**
 * Remove enrolled biometric credential
 */
export function clearBiometricCredential() {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.removeItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY);
  } catch (err) {
    console.warn('[BiometricAuth] Failed to remove biometric credential:', err);
  }
}

/**
 * Register (Enroll) a new biometric credential using navigator.credentials.create()
 */
export async function registerBiometrics({
  title = 'Momentum Security',
  userId = 'momentum_user',
  userName = 'Momentum User',
} = {}) {
  if (typeof window === 'undefined' || !navigator.credentials) {
    return { success: false, hardwareUnavailable: true, error: 'WebAuthn API unavailable in this environment' };
  }

  const isAvailable = await isPlatformAuthenticatorAvailable();
  if (!isAvailable) {
    return {
      success: false,
      hardwareUnavailable: true,
      error: 'Platform authenticator (biometric sensor) not available or not configured on this device.',
    };
  }

  try {
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    const userBytes = new Uint8Array(16);
    window.crypto.getRandomValues(userBytes);

    const credential = await navigator.credentials.create({
      publicKey: {
        challenge,
        rp: {
          name: title,
          id: window.location.hostname || 'localhost',
        },
        user: {
          id: userBytes,
          name: userId,
          displayName: userName,
        },
        pubKeyCredParams: [
          { type: 'public-key', alg: -7 },   // ES256
          { type: 'public-key', alg: -257 },  // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
          requireResidentKey: false,
        },
        timeout: 45000,
      },
    });

    if (credential?.type === 'public-key' && credential.rawId && credential.response) {
      const response = credential.response;
      const publicKey = response.getPublicKey?.();
      const alg = response.getPublicKeyAlgorithm?.();
      const authData = response.getAuthenticatorData?.();
      if (!publicKey || !authData || ![-7,-257].includes(alg)) {
        return {success:false,error:'This device cannot store a verifiable biometric enrollment. Use PIN.'};
      }
      const rpId = window.location.hostname;
      await checkCeremony(response, challenge, 'webauthn.create', rpId, authData);
      const credIdBase64 = bufferToBase64(credential.rawId);
      const record = {version:2,id:credIdBase64,publicKey:bufferToBase64(publicKey),
        alg,rpId,origin:window.location.origin};
      await importVerificationKey(record);
      localStorage.setItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY, JSON.stringify(record));

      return {
        success: true,
        credentialId: credIdBase64,
        method: 'webauthn_registered',
      };
    }

    return { success: false, error: 'Biometric registration produced no credential' };
  } catch (err) {
    console.warn('[BiometricAuth] Registration exception:', err.name, err.message);

    if (err.name === 'NotAllowedError') {
      return {
        success: false,
        cancelled: true,
        error: 'Biometric enrollment was cancelled or timed out.',
      };
    }
    if (err.name === 'AbortError') {
      return {
        success: false,
        cancelled: true,
        error: 'Biometric enrollment request was aborted.',
      };
    }
    return {
      success: false,
      hardwareUnavailable: true,
      error: err.message || 'Platform biometric registration failed.',
    };
  }
}

/**
 * Authenticate (Verify) an existing enrolled credential using navigator.credentials.get()
 */
export async function authenticateBiometrics() {
  if (typeof window === 'undefined' || !navigator.credentials) {
    return { success: false, hardwareUnavailable: true, error: 'WebAuthn API unavailable' };
  }

  const enrollment = readEnrollment();
  if (!enrollment) {
    return {
      success: false,
      notEnrolled: true,
      error: 'Biometric verification requires a new enrollment. Unlock with PIN and re-enable biometrics in settings.',
    };
  }

  try {
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    const id = base64ToBuffer(enrollment.id);
    if (!id.length || bufferToBase64(id) !== enrollment.id) throw new Error('Invalid enrolled credential ID');
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge, rpId: enrollment.rpId,
        allowCredentials: [{type:'public-key',id}],
        userVerification:'required', timeout:45000,
      },
    });
    if (assertion?.type === 'public-key' && assertion.rawId && assertion.response) {
      if (!bytesEqual(new Uint8Array(assertion.rawId),id)) throw new Error('Unexpected credential');
      const response = assertion.response;
      await checkCeremony(response, challenge, 'webauthn.get', enrollment.rpId, response.authenticatorData);
      const authData = new Uint8Array(response.authenticatorData);
      const hash = new Uint8Array(await crypto.subtle.digest('SHA-256',response.clientDataJSON));
      const signed = new Uint8Array(authData.length + hash.length);
      signed.set(authData); signed.set(hash,authData.length);
      const key = await importVerificationKey(enrollment);
      const signature = enrollment.alg === -7 ? es256Signature(response.signature) : response.signature;
      const valid = await crypto.subtle.verify(enrollment.alg === -7 ?
        {name:'ECDSA',hash:'SHA-256'} : {name:'RSASSA-PKCS1-v1_5'},key,signature,signed);
      if (!valid || JSON.stringify(readEnrollment()) !== JSON.stringify(enrollment)) {
        return {success:false,error:'Biometric assertion invalid or enrollment changed. Use PIN.'};
      }
      return {success:true,method:'webauthn_assertion',id:assertion.id};
    }

    return { success: false, error: 'No assertion returned' };
  } catch (err) {
    console.warn('[BiometricAuth] Authentication status:', err.name, err.message);

    if (err.name === 'NotAllowedError') {
      return {
        success: false,
        cancelled: true,
        error: 'Biometric verification was cancelled or timed out.',
      };
    }
    if (err.name === 'AbortError') {
      return {
        success: false,
        cancelled: true,
        error: 'Authentication request was aborted.',
      };
    }
    return {
      success: false,
      hardwareUnavailable: true,
      error: err.message || 'Biometric authentication prompt failed.',
    };
  }
}
