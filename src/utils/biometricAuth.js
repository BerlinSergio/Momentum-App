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

/**
 * Check if a biometric credential has been enrolled on this device
 */
export function isBiometricEnrolled() {
  if (typeof localStorage === 'undefined') return false;
  try {
    const credId = localStorage.getItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY);
    return !!(credId && credId.trim().length > 0);
  } catch {
    return false;
  }
}

/**
 * Retrieve the enrolled credential ID
 */
export function getEnrolledBiometricCredentialId() {
  if (typeof localStorage === 'undefined') return null;
  try {
    return localStorage.getItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY);
  } catch {
    return null;
  }
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

    if (credential && credential.id) {
      const credIdBase64 = credential.rawId
        ? bufferToBase64(credential.rawId)
        : credential.id;

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY, credIdBase64);
      }

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

  const credIdBase64 = getEnrolledBiometricCredentialId();
  if (!credIdBase64) {
    return {
      success: false,
      notEnrolled: true,
      error: 'Biometrics not enrolled on this device. Please enable in security settings.',
    };
  }

  try {
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    let allowList = [];
    try {
      const credBuffer = base64ToBuffer(credIdBase64);
      allowList = [{ type: 'public-key', id: credBuffer }];
    } catch {
      // Fallback without specific credential id if decoding fails
      allowList = [];
    }

    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge,
        rpId: window.location.hostname || 'localhost',
        allowCredentials: allowList.length > 0 ? allowList : undefined,
        userVerification: 'required',
        timeout: 45000,
      },
    });

    if (assertion) {
      return {
        success: true,
        method: 'webauthn_assertion',
        id: assertion.id,
      };
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
