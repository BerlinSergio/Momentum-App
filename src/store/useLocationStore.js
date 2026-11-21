import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { normalizeIanaTimezone } from '../utils/timeService.js';
import { isValidCoordinate } from '../utils/prayerTimes.js';
import { useProfileStore } from './useProfileStore.js';
import { useSettingsStore } from './useSettingsStore.js';
import { createIndexedDbStorage } from '../storage/index.js';

const locationStorage = createIndexedDbStorage({ legacyLocalStorageKey: 'momentum-location-storage' });

export const CITIES_DATA = [
  // --- Afghanistan ---
  {
    id: 'kabul',
    name: 'Kabul',
    country: 'Afghanistan',
    region: 'afghanistan',
    coords: '34.5553° N, 69.2075° E',
    latitude: 34.5553,
    longitude: 69.2075,
    elevation: '1,791m MSL',
    elevationMeters: 1791,
    timezone: 'Asia/Kabul',
    badge: 'Capital',
    icon: 'location_on',
  },
  {
    id: 'herat',
    name: 'Herat',
    country: 'Afghanistan',
    region: 'afghanistan',
    coords: '34.3529° N, 62.2040° E',
    latitude: 34.3529,
    longitude: 62.2040,
    elevation: '920m MSL',
    elevationMeters: 920,
    timezone: 'Asia/Kabul',
    icon: 'near_me',
  },
  {
    id: 'mazar-i-sharif',
    name: 'Mazar-i-Sharif',
    country: 'Afghanistan',
    region: 'afghanistan',
    coords: '36.7061° N, 67.1108° E',
    latitude: 36.7061,
    longitude: 67.1108,
    elevation: '380m MSL',
    elevationMeters: 380,
    timezone: 'Asia/Kabul',
    icon: 'near_me',
  },
  {
    id: 'kandahar',
    name: 'Kandahar',
    country: 'Afghanistan',
    region: 'afghanistan',
    coords: '31.6289° N, 65.7372° E',
    latitude: 31.6289,
    longitude: 65.7372,
    elevation: '1,010m MSL',
    elevationMeters: 1010,
    timezone: 'Asia/Kabul',
    icon: 'near_me',
  },
  {
    id: 'jalalabad',
    name: 'Jalalabad',
    country: 'Afghanistan',
    region: 'afghanistan',
    coords: '34.4265° N, 70.4515° E',
    latitude: 34.4265,
    longitude: 70.4515,
    elevation: '575m MSL',
    elevationMeters: 575,
    timezone: 'Asia/Kabul',
    icon: 'near_me',
  },

  // --- Islamic Sanctuaries & Middle East ---
  {
    id: 'makkah',
    name: 'Makkah',
    country: 'Saudi Arabia',
    region: 'islamic',
    coords: '21.3891° N, 39.8579° E',
    latitude: 21.3891,
    longitude: 39.8579,
    elevation: '277m MSL',
    elevationMeters: 277,
    timezone: 'Asia/Riyadh',
    badge: 'Holy Sanctuary',
    icon: 'mosque',
  },
  {
    id: 'madinah',
    name: 'Madinah',
    country: 'Saudi Arabia',
    region: 'islamic',
    coords: '24.5247° N, 39.5692° E',
    latitude: 24.5247,
    longitude: 39.5692,
    elevation: '608m MSL',
    elevationMeters: 608,
    timezone: 'Asia/Riyadh',
    badge: "The Prophet's City",
    icon: 'mosque',
  },
  {
    id: 'jerusalem',
    name: 'Jerusalem (Al-Quds)',
    country: 'Palestine',
    region: 'islamic',
    coords: '31.7683° N, 35.2137° E',
    latitude: 31.7683,
    longitude: 35.2137,
    elevation: '754m MSL',
    elevationMeters: 754,
    timezone: 'Asia/Jerusalem',
    badge: 'Al-Aqsa',
    icon: 'mosque',
  },
  {
    id: 'cairo',
    name: 'Cairo',
    country: 'Egypt',
    region: 'regional',
    coords: '30.0444° N, 31.2357° E',
    latitude: 30.0444,
    longitude: 31.2357,
    elevation: '23m MSL',
    elevationMeters: 23,
    timezone: 'Africa/Cairo',
    icon: 'apartment',
  },
  {
    id: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    region: 'regional',
    coords: '41.0082° N, 28.9784° E',
    latitude: 41.0082,
    longitude: 28.9784,
    elevation: '40m MSL',
    elevationMeters: 40,
    timezone: 'Europe/Istanbul',
    icon: 'apartment',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'regional',
    coords: '25.2048° N, 55.2708° E',
    latitude: 25.2048,
    longitude: 55.2708,
    elevation: '11m MSL',
    elevationMeters: 11,
    timezone: 'Asia/Dubai',
    icon: 'apartment',
  },

  // --- Central & South Asia ---
  {
    id: 'karachi',
    name: 'Karachi',
    country: 'Pakistan',
    region: 'regional',
    coords: '24.8607° N, 67.0011° E',
    latitude: 24.8607,
    longitude: 67.0011,
    elevation: '8m MSL',
    elevationMeters: 8,
    timezone: 'Asia/Karachi',
    icon: 'apartment',
  },
  {
    id: 'tashkent',
    name: 'Tashkent',
    country: 'Uzbekistan',
    region: 'regional',
    coords: '41.2995° N, 69.2401° E',
    latitude: 41.2995,
    longitude: 69.2401,
    elevation: '424m MSL',
    elevationMeters: 424,
    timezone: 'Asia/Tashkent',
    icon: 'apartment',
  },
  {
    id: 'kathmandu',
    name: 'Kathmandu',
    country: 'Nepal',
    region: 'regional',
    coords: '27.7172° N, 85.3240° E',
    latitude: 27.7172,
    longitude: 85.3240,
    elevation: '1,400m MSL',
    elevationMeters: 1400,
    timezone: 'Asia/Kathmandu',
    icon: 'landscape',
  },
  {
    id: 'jakarta',
    name: 'Jakarta',
    country: 'Indonesia',
    region: 'regional',
    coords: '6.2088° S, 106.8456° E',
    latitude: -6.2088,
    longitude: 106.8456,
    elevation: '8m MSL',
    elevationMeters: 8,
    timezone: 'Asia/Jakarta',
    icon: 'apartment',
  },

  // --- Europe ---
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    region: 'global',
    coords: '51.5074° N, 0.1278° W',
    latitude: 51.5074,
    longitude: -0.1278,
    elevation: '25m MSL',
    elevationMeters: 25,
    timezone: 'Europe/London',
    icon: 'public',
  },
  {
    id: 'vilnius',
    name: 'Vilnius',
    country: 'Lithuania',
    region: 'global',
    coords: '54.6872° N, 25.2797° E',
    latitude: 54.6872,
    longitude: 25.2797,
    elevation: '112m MSL',
    elevationMeters: 112,
    timezone: 'Europe/Vilnius',
    icon: 'public',
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'global',
    coords: '48.8566° N, 2.3522° E',
    latitude: 48.8566,
    longitude: 2.3522,
    elevation: '35m MSL',
    elevationMeters: 35,
    timezone: 'Europe/Paris',
    icon: 'public',
  },

  // --- North America & Australasia ---
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    region: 'global',
    coords: '40.7128° N, 74.0060° W',
    latitude: 40.7128,
    longitude: -74.0060,
    elevation: '10m MSL',
    elevationMeters: 10,
    timezone: 'America/New_York',
    icon: 'public',
  },
  {
    id: 'toronto',
    name: 'Toronto',
    country: 'Canada',
    region: 'global',
    coords: '43.6532° N, 79.3832° W',
    latitude: 43.6532,
    longitude: -79.3832,
    elevation: '76m MSL',
    elevationMeters: 76,
    timezone: 'America/Toronto',
    icon: 'public',
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    region: 'global',
    coords: '33.8688° S, 151.2093° E',
    latitude: -33.8688,
    longitude: 151.2093,
    elevation: '3m MSL',
    elevationMeters: 3,
    timezone: 'Australia/Sydney',
    icon: 'public',
  },
  {
    id: 'auckland',
    name: 'Auckland',
    country: 'New Zealand',
    region: 'global',
    coords: '36.8485° S, 174.7633° E',
    latitude: -36.8485,
    longitude: 174.7633,
    elevation: '1m MSL',
    elevationMeters: 1,
    timezone: 'Pacific/Auckland',
    icon: 'public',
  },
];

export const DEFAULT_INITIAL_LOCATION = {
  ...CITIES_DATA[0],
  mode: 'manual', // 'auto' | 'manual'
  status: 'configured', // 'configured' | 'unconfigured'
  source: 'city', // 'gps' | 'city' | 'custom'
  lastUpdated: new Date().toISOString(),
};

/**
 * Synchronize location across Profile and Settings stores cleanly.
 */
function syncLocationToDependentStores(location) {
  try {
    const cityName = `${location.name}${location.country ? ', ' + location.country : ''}`;
    useProfileStore.getState().updateProfile?.({ city: cityName });
    useSettingsStore.getState().setCity?.(cityName);
  } catch (err) {
    console.warn('[LocationStore] Sync to profile/settings error:', err);
  }
}

export const useLocationStore = create(
  persist(
    (set, get) => ({
      // Authoritative Prayer Location
      selectedCity: DEFAULT_INITIAL_LOCATION,
      locationMode: 'manual', // 'auto' | 'manual'
      locationStatus: 'configured', // 'configured' | 'unconfigured'
      lastUpdated: new Date().toISOString(),
      _hasHydrated: false,

      /**
       * Select a city manually from the catalog.
       */
      setSelectedCity: (city) => {
        if (!city) return;
        const lat = Number(city.latitude);
        const lng = Number(city.longitude);
        const valid = isValidCoordinate(lat, lng);

        const normalizedCity = {
          ...city,
          latitude: valid ? lat : DEFAULT_INITIAL_LOCATION.latitude,
          longitude: valid ? lng : DEFAULT_INITIAL_LOCATION.longitude,
          timezone: normalizeIanaTimezone(city.timezone || 'Asia/Kabul'),
          mode: 'manual',
          status: 'configured',
          source: city.source || 'city',
          lastUpdated: new Date().toISOString(),
        };

        set({
          selectedCity: normalizedCity,
          locationMode: 'manual',
          locationStatus: 'configured',
          lastUpdated: normalizedCity.lastUpdated,
        });

        syncLocationToDependentStores(normalizedCity);
      },

      /**
       * Set genuine GPS-detected location coordinates.
       */
      setGpsLocation: ({
        latitude,
        longitude,
        altitude = null,
        city = 'Current Location',
        country = 'GPS Geocoded',
        timezone = null,
      }) => {
        const lat = Number(latitude);
        const lng = Number(longitude);
        if (!isValidCoordinate(lat, lng)) {
          console.warn('[LocationStore] Invalid GPS coordinates:', latitude, longitude);
          return false;
        }

        const latFormatted = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}`;
        const lngFormatted = `${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? 'E' : 'W'}`;
        const elev = altitude != null ? Math.round(altitude) : 0;
        const elevFormatted = altitude != null ? `${elev}m MSL` : 'GPS Altitude';

        // Use supplied timezone or fallback to device timezone
        const resolvedTz = normalizeIanaTimezone(
          timezone || (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC')
        );

        const gpsLoc = {
          id: `gps-${Date.now()}`,
          name: city,
          country: country,
          region: 'gps',
          coords: `${latFormatted}, ${lngFormatted}`,
          latitude: lat,
          longitude: lng,
          elevation: elevFormatted,
          elevationMeters: elev,
          timezone: resolvedTz,
          mode: 'auto',
          status: 'configured',
          source: 'gps',
          badge: 'GPS Active',
          icon: 'my_location',
          lastUpdated: new Date().toISOString(),
        };

        set({
          selectedCity: gpsLoc,
          locationMode: 'auto',
          locationStatus: 'configured',
          lastUpdated: gpsLoc.lastUpdated,
        });

        syncLocationToDependentStores(gpsLoc);
        return true;
      },

      /**
       * Set custom coordinates entered by user.
       */
      setCustomCoordinates: ({
        latitude,
        longitude,
        elevation,
        name,
        country,
        timezone,
      }) => {
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        if (!isValidCoordinate(lat, lng)) {
          return false;
        }

        const elev = parseInt(elevation, 10) || 0;
        const latFormatted = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}`;
        const lngFormatted = `${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? 'E' : 'W'}`;
        const elevFormatted = `${elev}m MSL`;

        // Check if timezone provided, else match against nearest city or fallback
        const resolvedTz = normalizeIanaTimezone(
          timezone || (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC')
        );

        const customLoc = {
          id: `custom-${Date.now()}`,
          name: name || 'Custom Coordinates',
          country: country || 'User Defined Location',
          region: 'custom',
          coords: `${latFormatted}, ${lngFormatted}`,
          latitude: lat,
          longitude: lng,
          elevation: elevFormatted,
          elevationMeters: elev,
          timezone: resolvedTz,
          mode: 'manual',
          status: 'configured',
          source: 'custom',
          isCustom: true,
          badge: 'Custom',
          icon: 'tune',
          lastUpdated: new Date().toISOString(),
        };

        set({
          selectedCity: customLoc,
          locationMode: 'manual',
          locationStatus: 'configured',
          lastUpdated: customLoc.lastUpdated,
        });

        syncLocationToDependentStores(customLoc);
        return true;
      },

      /**
       * Explicitly mark location as unconfigured (e.g. for fresh installations that skipped location setup).
       */
      setUnconfigured: () => {
        set({
          locationStatus: 'unconfigured',
          selectedCity: {
            ...get().selectedCity,
            status: 'unconfigured',
          },
        });
      },

      /**
       * Switch location mode between automatic (GPS) and manual.
       */
      setLocationMode: (mode) => {
        set((state) => ({
          locationMode: mode === 'auto' ? 'auto' : 'manual',
          selectedCity: {
            ...state.selectedCity,
            mode: mode === 'auto' ? 'auto' : 'manual',
          },
        }));
      },

      setHasHydrated: (val) => set({ _hasHydrated: val }),
    }),
    {
      name: 'momentum-location-storage',
      storage: createJSONStorage(() => locationStorage),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);

// Eager synchronous rehydration
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('momentum-location-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state?.selectedCity) {
        useLocationStore.setState({
          selectedCity: parsed.state.selectedCity,
          locationMode: parsed.state.locationMode || parsed.state.selectedCity.mode || 'manual',
          locationStatus: parsed.state.locationStatus || parsed.state.selectedCity.status || 'configured',
          lastUpdated: parsed.state.lastUpdated || new Date().toISOString(),
          _hasHydrated: true,
        });
      }
    }
  } catch (e) {
    console.warn('Failed to rehydrate location store:', e);
  }
}
