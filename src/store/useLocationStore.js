import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const CITIES_DATA = [
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
    badge: 'Current',
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
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    region: 'global',
    coords: '51.5072° N, 0.1276° W',
    latitude: 51.5072,
    longitude: -0.1276,
    elevation: '25m MSL',
    elevationMeters: 25,
    timezone: 'Europe/London',
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
];

const INITIAL_LOCATION = CITIES_DATA[0];

export const useLocationStore = create(
  persist(
    (set) => ({
      selectedCity: INITIAL_LOCATION,
      lastUpdated: new Date().toISOString(),
      _hasHydrated: false,

      setSelectedCity: (city) => {
        set({
          selectedCity: city,
          lastUpdated: new Date().toISOString(),
        });
      },

      setCustomCoordinates: ({ latitude, longitude, elevation, name, country }) => {
        const lat = parseFloat(latitude) || 0;
        const lng = parseFloat(longitude) || 0;
        const elev = parseInt(elevation, 10) || 0;
        const latFormatted = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}`;
        const lngFormatted = `${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? 'E' : 'W'}`;
        const customLoc = {
          id: `custom-${Date.now()}`,
          name: name || 'Custom Location',
          country: country || 'User Defined',
          region: 'custom',
          coords: `${latFormatted}, ${lngFormatted}`,
          latitude: lat,
          longitude: lng,
          elevation: `${elev}m MSL`,
          elevationMeters: elev,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kabul',
          isCustom: true,
        };
        set({
          selectedCity: customLoc,
          lastUpdated: new Date().toISOString(),
        });
      },

      setHasHydrated: (val) => set({ _hasHydrated: val }),
    }),
    {
      name: 'momentum-location-storage',
      storage: createJSONStorage(() => localStorage),
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
          lastUpdated: parsed.state.lastUpdated || new Date().toISOString(),
          _hasHydrated: true,
        });
      }
    }
  } catch (e) {
    console.warn('Failed to rehydrate location store:', e);
  }
}

