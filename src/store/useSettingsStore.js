import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createIndexedDbStorage } from '../storage/index.js';

const settingsStorage = createIndexedDbStorage({ legacyLocalStorageKey: 'momentum_settings_store' });
const getSafeStorage = () => settingsStorage;

export const INITIAL_NOTIFICATION_SETTINGS = {
  masterEnabled: true,
  alarmOnlyOccurrences: {},
  ringingAlarmSources: {}, // Legacy preference fallback, retained for migration.
  reminderTypes: {}, // Stable calendar, prayer and check-in preferences.
  defaultReminderType: 'notification',
  reminderSourceDefaults: {},
  dueTaskAlerts: true,
  routineAlertsEnabled: true,
  calendarAlertsEnabled: true,
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

      // An alarm is created by the system Clock. Suppress only the exact
      // occurrence the user explicitly confirms; a changed time gets a new alert.
      setAlarmOnlyOccurrence: (key,at,enabled) => {
        if(typeof key!=='string'||!key||!Number.isFinite(at)||at<=Date.now())return Promise.resolve(false);
        return set(state=>{const next=Object.fromEntries(Object.entries(state.alarmOnlyOccurrences||{}).filter(([,time])=>Number.isFinite(time)&&time>Date.now()));if(enabled)next[key]=at;else delete next[key];return {alarmOnlyOccurrences:next};});
      },
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
            } catch (err) {
              void err;
            }
          }
        } else {
          return set({ [key]: value });
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
          } catch (err) {
            void err;
          }
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
          } catch (err) {
            void err;
          }
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
      storage: createJSONStorage(() => getSafeStorage()),
    }
  )
);
