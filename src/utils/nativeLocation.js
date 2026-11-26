/**
 * Momentum Native Geolocation Bridge
 * Interfaces with @capacitor/geolocation on native devices and falls back
 * gracefully to navigator.geolocation on web browsers.
 * Integrates directly with Phase 04 useLocationStore and Prayer Times engine.
 */

import { Geolocation } from '@capacitor/geolocation';
import { registerPlugin } from '@capacitor/core';
const MomentumDevice = registerPlugin('MomentumDevice');
import { useLocationStore } from '../store/useLocationStore';
import { isValidCoordinate } from './prayerTimes';
import { isNativePlatform } from './nativeLifecycle';

export { isValidCoordinate };

/**
 * Check location permission status
 */
export async function checkLocationPermission() {
  if (isNativePlatform()) {
    try {
      const status = await Geolocation.checkPermissions();
      return status.location === 'granted' || status.coarseLocation === 'granted' ? 'granted' : status.location;
    } catch (err) {
      console.warn('[NativeLocation] Check permission failed:', err.message);
      return 'denied';
    }
  }

  // Web Browser fallback
  if (typeof navigator !== 'undefined' && navigator.permissions) {
    try {
      const res = await navigator.permissions.query({ name: 'geolocation' });
      return res.state; // 'granted' | 'denied' | 'prompt'
    } catch {
      return 'prompt';
    }
  }

  return 'prompt';
}

/**
 * Request location permission from the user
 */
export async function requestLocationPermission() {
  if (isNativePlatform()) {
    try {
      const status = await Geolocation.requestPermissions({ permissions: ['location'] });
      return status.location === 'granted' || status.coarseLocation === 'granted' ? 'granted' : status.location;
    } catch (err) {
      console.warn('[NativeLocation] Request permission failed:', err.message);
      return 'denied';
    }
  }

  return 'prompt';
}

/**
 * Detect current GPS coordinates and apply to Momentum's authoritative location store.
 * 
 * Strict safety rules:
 * - Does not silently fall back to default if GPS fails (preserves previous configured location).
 * - Enforces coordinate validity (-90..90, -180..180).
 * - Single-shot retrieval; does NOT continuously track in background.
 *
 * @param {Object} options
 * @param {boolean} [options.highAccuracy=true]
 * @param {number} [options.timeout=10000]
 * @returns {Promise<{ success: boolean, coords?: Object, error?: string, code?: string }>}
 */
export async function detectAndApplyNativeLocation(options = {}) {
  const highAccuracy = options.highAccuracy !== false;
  const timeoutMs = Math.max(10000, Number(options.timeout) || 20000);

  try {
    let position = null;

    if (isNativePlatform()) {
      // 1. Check or request native permission
      let perm = await checkLocationPermission();
      if (perm === 'prompt' || perm === 'prompt-with-rationale') {
        perm = await requestLocationPermission();
      }

      if (perm !== 'granted') {
        return {
          success: false,
          code: 'PERMISSION_DENIED',
          error: 'Location permission was denied. You can select a city manually from the list.',
        };
      }

      // Try the Capacitor provider first, then use the Android framework
      // directly when Play Services/provider setup is unavailable.
      const permissions = await Geolocation.checkPermissions();
      const precise = permissions.location === 'granted';
      try {
        position = await Geolocation.getCurrentPosition({
          enableHighAccuracy:highAccuracy && precise, timeout:timeoutMs, maximumAge:0,
        });
      } catch (error) {
        const latest = await Geolocation.checkPermissions();
        if (latest.location !== 'granted' && latest.coarseLocation !== 'granted') throw error;
        position = await MomentumDevice.getDeviceLocation();
      }
    } else {
      // Web Browser standard Geolocation
      if (typeof navigator === 'undefined' || !navigator.geolocation) {
        return {
          success: false,
          code: 'UNSUPPORTED',
          error: 'Geolocation is not supported in this environment.',
        };
      }

      position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: highAccuracy,
          timeout: timeoutMs,
          maximumAge: 30000,
        });
      });
    }

    if (!position || !position.coords) {
      return {
        success: false,
        code: 'NO_POSITION',
        error: 'Unable to acquire satellite GPS fix.',
      };
    }

    const { latitude, longitude, altitude, accuracy } = position.coords;

    // 3. Strict coordinate mathematical validation
    if (!isValidCoordinate(latitude, longitude)) {
      return {
        success: false,
        code: 'INVALID_COORDINATES',
        error: `Received invalid coordinates: (${latitude}, ${longitude})`,
      };
    }

    // 4. Resolve local device IANA timezone
    const resolvedTz = typeof Intl !== 'undefined'
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : 'UTC';

    // 5. Commit genuine GPS location to location store
    const applied = await useLocationStore.getState().setGpsLocation({
      latitude,
      longitude,
      altitude: Number.isFinite(altitude) ? altitude : null,
      accuracy: Number.isFinite(accuracy) ? accuracy : null,
      city: 'Current Location',
      country: 'GPS Detected',
      timezone: resolvedTz,
    });

    if (!applied) {
      return {
        success: false,
        code: 'STORE_REJECTED',
        error: 'Location store rejected the coordinate payload.',
      };
    }

    return {
      success: true,
      coords: {
        latitude,
        longitude,
        altitude,
        accuracy,
        timezone: resolvedTz,
      },
    };
  } catch (err) {
    console.error('[NativeLocation] Detection error:', err);
    let code = 'DETECTION_FAILED';
    let message = err.message || 'GPS detection failed';

    if (err.code === 1 || /denied|permission/i.test(err.message || '') || err.code === 'OS-PLUG-GLOC-0003') {
      code = 'PERMISSION_DENIED';
      message = 'Location permission was denied by device settings.';
    } else if (err.code === 2 || /unavailable|disabled|location services/i.test(err.message || '')) {
      code = 'POSITION_UNAVAILABLE';
      message = 'GPS location is currently unavailable. Ensure device location is turned on.';
    } else if (err.code === 3 || /timeout|timed out/i.test(err.message || '')) {
      code = 'TIMEOUT';
      message = 'GPS signal acquisition timed out. Please try again or choose a city manually.';
    }

    return {
      success: false,
      code,
      error: message,
    };
  }
}
