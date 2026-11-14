/**
 * Biometric Authentication Utility for Momentum
 * Integrates WebAuthn API (navigator.credentials) with fallback for hardware-bound biometrics
 */

export async function isBiometricSupported() {
  if (typeof window === 'undefined') return false;
  return !!(window.PublicKeyCredential && navigator.credentials);
}

export async function isPlatformAuthenticatorAvailable() {
  if (typeof window === 'undefined' || !window.PublicKeyCredential) return false;
  try {
    if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    }
  } catch (err) {
    console.warn('Failed to check platform authenticator:', err);
  }
  return false;
}

/**
 * Triggers hardware biometric prompt (Windows Hello, Touch ID, Face ID, Android Biometrics)
 * via WebAuthn API.
 */
export async function authenticateBiometrics({
  title = 'Momentum Vault Security',
} = {}) {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Window context unavailable' };
  }

  // Check if WebAuthn is supported
  const hasWebAuthn = !!(window.PublicKeyCredential && navigator.credentials);

  if (hasWebAuthn) {
    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      const userId = new Uint8Array(16);
      window.crypto.getRandomValues(userId);

      // Trigger native platform authenticator (TouchID / FaceID / Windows Hello)
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: {
            name: title,
            id: window.location.hostname || 'localhost',
          },
          user: {
            id: userId,
            name: 'momentum_vault_user',
            displayName: 'Momentum User',
          },
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 },  // ES256
            { type: 'public-key', alg: -257 }, // RS256
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
            requireResidentKey: false,
          },
          timeout: 45000,
        },
      });

      if (credential) {
        return { success: true, method: 'webauthn_hardware', id: credential.id };
      }
    } catch (err) {
      console.warn('Hardware biometric authentication status:', err.name, err.message);

      // User explicitly cancelled or biometric verification was rejected by OS
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
      // If hardware is not configured or unsupported in this specific browser profile
      return {
        success: false,
        hardwareUnavailable: true,
        error: err.message || 'Hardware biometric prompt failed.',
      };
    }
  }

  return {
    success: false,
    hardwareUnavailable: true,
    error: 'WebAuthn hardware API not available in this environment.',
  };
}

