import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const getSafeStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const testKey = '__momentum_settings_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    }
  } catch (e) {
    console.warn('LocalStorage unavailable for settings store, falling back to memory store:', e);
  }
  const memoryStore = new Map();
  return {
    getItem: (key) => memoryStore.get(key) || null,
    setItem: (key, value) => { memoryStore.set(key, String(value)); },
    removeItem: (key) => { memoryStore.delete(key); },
  };
};

export const INITIAL_NOTIFICATION_SETTINGS = {
  masterEnabled: true,
  dueTaskAlerts: true,
  dailyHabitCheckin: true,
  overdueMilestonePushes: false,
  morningIntention: true,
  middayPause: true,
  eveningWinddown: true,
  dailyRadianceQuote: true,
  zenFocusDND: true,
  adhanMode: 'muted', // 'muted' | 'full' | 'vibration'
  alertType: 'muted',
  prayerAlertsEnabled: true,
  enabledPrayerAlerts: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
  prayerNotificationOffset: 15,
  adhanOffset: 15,
  baseCurrency: 'AFN',
  timezone: 'Asia/Kabul',
  city: 'Kabul, Afghanistan',
  userName: '',
};

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      ...INITIAL_NOTIFICATION_SETTINGS,

      // Actions
      setSetting: (key, value) => {
        if (key === 'prayerNotificationOffset' || key === 'adhanOffset') {
          if (get().prayerNotificationOffset === value && get().adhanOffset === value) return;
          set({ prayerNotificationOffset: value, adhanOffset: value });
          if (typeof window !== 'undefined' && window.usePrayerStore?.getState) {
            try {
              if (window.usePrayerStore.getState().adhanOffset !== value) {
                window.usePrayerStore.getState().setAdhanOffset(value);
              }
            } catch {}
          }
        } else {
          set({ [key]: value });
        }
      },
      setPrayerNotificationOffset: (offset) => {
        if (get().prayerNotificationOffset === offset && get().adhanOffset === offset) return;
        set({ prayerNotificationOffset: offset, adhanOffset: offset });
        if (typeof window !== 'undefined' && window.usePrayerStore?.getState) {
          try {
            if (window.usePrayerStore.getState().adhanOffset !== offset) {
              window.usePrayerStore.getState().setAdhanOffset(offset);
            }
          } catch {}
        }
      },
      setAdhanOffset: (offset) => {
        if (get().prayerNotificationOffset === offset && get().adhanOffset === offset) return;
        set({ prayerNotificationOffset: offset, adhanOffset: offset });
        if (typeof window !== 'undefined' && window.usePrayerStore?.getState) {
          try {
            if (window.usePrayerStore.getState().adhanOffset !== offset) {
              window.usePrayerStore.getState().setAdhanOffset(offset);
            }
          } catch {}
        }
      },
      toggleSetting: (key) => set((state) => ({ [key]: !state[key] })),
      setAdhanMode: (mode) => set({ adhanMode: mode, alertType: mode }),
      setAlertType: (type) => set({ alertType: type, adhanMode: type }),
      setPrayerAlertsEnabled: (enabled) => set({ prayerAlertsEnabled: enabled }),
      togglePrayerAlertsEnabled: () => set((state) => ({ prayerAlertsEnabled: !state.prayerAlertsEnabled })),
      setEnabledPrayerAlerts: (alerts) => set({ enabledPrayerAlerts: alerts }),
      togglePrayerAlert: (prayerName) =>
        set((state) => {
          const current = state.enabledPrayerAlerts || ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
          const exists = current.some((p) => p.toLowerCase() === prayerName.toLowerCase());
          const updated = exists
            ? current.filter((p) => p.toLowerCase() !== prayerName.toLowerCase())
            : [...current, prayerName];
          return { enabledPrayerAlerts: updated };
        }),
      setBaseCurrency: (code) => set({ baseCurrency: code }),
      setTimezone: (tz) => set({ timezone: tz }),
      setCity: (city) => set({ city }),
      setUserName: (userName) => set({ userName }),
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
      resetSettings: () => set(INITIAL_NOTIFICATION_SETTINGS),
    }),
    {
      name: 'momentum_settings_store',
      storage: {
        getItem: (name) => {
          const item = getSafeStorage().getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          getSafeStorage().setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          getSafeStorage().removeItem(name);
        },
      },
    }
  )
);
