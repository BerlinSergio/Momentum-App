import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { useSettingsStore } from './useSettingsStore.js';
import { useProfileStore } from './useProfileStore.js';
import {
  CALCULATION_METHODS,
  normalizeCalculationMethod,
} from '../utils/prayerTimes.js';
import { createIndexedDbStorage } from '../storage/index.js';

const prayerStorage = createIndexedDbStorage({
  legacyLocalStorageKey: 'momentum-prayer-storage',
  optimisticDomains: ['momentum-prayer-storage'],
});
const getSafeStorage = () => prayerStorage;

export const INITIAL_CANONICAL_PRAYERS = [
  { id: 'fajr', name: 'Fajr', time: '05:00 AM', subtitle: "Dawn prayer • 2 Rak'ahs", status: 'upcoming', isOnTime: false },
  { id: 'dhuhr', name: 'Dhuhr', time: '11:39 AM', subtitle: "Midday prayer • 4 Rak'ahs", status: 'upcoming', isOnTime: false },
  { id: 'asr', name: 'Asr', time: '03:10 PM', subtitle: "Late afternoon prayer • 4 Rak'ahs", status: 'upcoming', isOnTime: false },
  { id: 'maghrib', name: 'Maghrib', time: '04:48 PM', subtitle: "Sunset prayer • 3 Rak'ahs", status: 'upcoming', isOnTime: false },
  { id: 'isha', name: 'Isha', time: '06:15 PM', subtitle: "Night prayer • 4 Rak'ahs", status: 'upcoming', isOnTime: false },
];

export const INITIAL_PRAYER_LOGS = [];

/**
 * Calculates genuine punctuality rate from actual user activity records.
 * Only explicit user logs count towards punctuality.
 */
export const calculateRate = (prayerLogs = []) => {
  if (!Array.isArray(prayerLogs) || prayerLogs.length === 0) return 0;
  const completedLogs = prayerLogs.filter((l) => l.status === 'completed');
  if (completedLogs.length === 0) return 0;
  const onTimeLogs = completedLogs.filter((l) => l.isOnTime === true).length;
  const rate = Math.round((onTimeLogs / completedLogs.length) * 100);
  return Math.min(100, Math.max(0, rate));
};

export const usePrayerStore = create(
  persist(
    (set, get) => ({
      // Prayer calculation settings
      calculationMethod: 'Karachi', // Default standard for Afghanistan & South/Central Asia
      madhab: 'Hanafi', // Default standard
      highLatitudeRule: 'recommended',
      polarCircleResolution: 'AqrabBalad',
      prayerAdjustments: {
        fajr: 0,
        sunrise: 0,
        dhuhr: 0,
        asr: 0,
        maghrib: 0,
        isha: 0,
      },

      savedInspirations: [],
      toggleSavedInspiration: (quote) => {
        if (!quote?.surah || !quote?.ayah) return Promise.reject(new Error('Invalid inspiration'));
        return set(state => {
          const saved = Array.isArray(state.savedInspirations) ? state.savedInspirations : [];
          const id = String(quote.surah);
          return {savedInspirations: saved.some(item => item.id === id)
            ? saved.filter(item => item.id !== id)
            : [{id, ayah:String(quote.ayah), surah:id, savedAt:new Date().toISOString()}, ...saved]};
        });
      },

      // User worship activity (SEPARATED FROM ASTRONOMICAL PROGRESSION)
      prayerLogs: INITIAL_PRAYER_LOGS,
      prayers: INITIAL_CANONICAL_PRAYERS,
      punctualPercentage: 0,
      _hasHydrated: false,

      // Notification & alert preferences
      adhanOffset: 15, // 0 = Exact, 5, 10, 15, 30 minutes before
      prayerNotificationOffset: 15,
      prayerAlertsEnabled: true,
      alertType: 'muted',
      enabledPrayerAlerts: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
      notificationSettings: {
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
      },

      /**
       * Update the Islamic calculation method and sync with profile store.
       */
      setCalculationMethod: (method, {syncProfile = true} = {}) => {
        const canonical = normalizeCalculationMethod(method);
        const committed = set({ calculationMethod: canonical });
        if (!syncProfile) return committed;
        try {
          const match = CALCULATION_METHODS.find((m) => m.id === canonical);
          const label = match ? match.name : canonical;
          useProfileStore.getState().updateProfile?.({ calculationConvention: label });
        } catch (e) {
          void e;
        }
      },

      /**
       * Update the Asr jurisprudential standard (Hanafi vs Shafi/Standard).
       */
      setMadhab: (madhab) => {
        const canonical = madhab === 'Shafi' || madhab === 'Standard' ? 'Shafi' : 'Hanafi';
        set({ madhab: canonical });
      },

      /**
       * Update High Latitude Rule.
       */
      setHighLatitudeRule: (rule) => {
        set({ highLatitudeRule: rule });
      },

      /**
       * Update Polar Circle Resolution.
       */
      setPolarCircleResolution: (res) => {
        set({ polarCircleResolution: res });
      },

      /**
       * Update per-prayer minute offsets.
       */
      setPrayerAdjustments: (adjustments) => {
        set((state) => ({
          prayerAdjustments: {
            ...state.prayerAdjustments,
            ...adjustments,
          },
        }));
      },

      setAdhanOffset: (minutes) => {
        if (get().adhanOffset === minutes && get().prayerNotificationOffset === minutes) return;
        set({ adhanOffset: minutes, prayerNotificationOffset: minutes });
        try {
          if (useSettingsStore.getState().prayerNotificationOffset !== minutes) {
            useSettingsStore.getState().setSetting('prayerNotificationOffset', minutes);
          }
          if (useSettingsStore.getState().adhanOffset !== minutes) {
            useSettingsStore.getState().setSetting('adhanOffset', minutes);
          }
        } catch (e) {
          void e;
        }
      },

      setPrayerNotificationOffset: (minutes) => {
        if (get().adhanOffset === minutes && get().prayerNotificationOffset === minutes) return;
        set({ adhanOffset: minutes, prayerNotificationOffset: minutes });
        try {
          if (useSettingsStore.getState().prayerNotificationOffset !== minutes) {
            useSettingsStore.getState().setSetting('prayerNotificationOffset', minutes);
          }
          if (useSettingsStore.getState().adhanOffset !== minutes) {
            useSettingsStore.getState().setSetting('adhanOffset', minutes);
          }
        } catch (e) {
          void e;
        }
      },

      setPrayerAlertsEnabled: (enabled) => set({ prayerAlertsEnabled: enabled }),

      togglePrayerAlertsEnabled: () =>
        set((state) => ({ prayerAlertsEnabled: !state.prayerAlertsEnabled })),

      setAlertType: (type) =>
        set((state) => ({
          alertType: type,
          notificationSettings: { ...state.notificationSettings, adhanMode: type },
        })),

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

      setNotificationSetting: (key, value) =>
        set((state) => ({
          notificationSettings: { ...state.notificationSettings, [key]: value },
        })),

      setHasHydrated: (val) => set({ _hasHydrated: val }),

      getPunctualPercentage: () => {
        return calculateRate(get().prayerLogs);
      },

      /**
       * EXPLICIT USER ACTION: Toggle prayer completion status.
       * Strictly records user worship without conflating it with timer progression.
       */
      togglePrayer: (prayerId, prayerDate = new Date(), explicitDateKey = null) =>
        set(
          produce((state) => {
            const canonicalId = String(prayerId).toLowerCase();
            const now = new Date();

            // Extract date key YYYY-MM-DD
            let dateStr = explicitDateKey;
            if (!dateStr) {
              const pDate = prayerDate instanceof Date && !isNaN(prayerDate.getTime()) ? prayerDate : now;
              dateStr = pDate.toISOString().slice(0, 10);
            }

            // Find existing log for this exact prayer and date
            const existingIdx = state.prayerLogs.findIndex(
              (l) => (l.prayerId === canonicalId || l.id === canonicalId) && l.date === dateStr
            );

            const canonicalName =
              canonicalId === 'fajr'
                ? 'Fajr'
                : canonicalId === 'dhuhr'
                ? 'Dhuhr'
                : canonicalId === 'asr'
                ? 'Asr'
                : canonicalId === 'maghrib'
                ? 'Maghrib'
                : canonicalId === 'isha'
                ? 'Isha'
                : prayerId;

            if (existingIdx !== -1) {
              const currentStatus = state.prayerLogs[existingIdx].status;
              // Toggle: completed -> missed -> remove / unrecorded
              if (currentStatus === 'completed') {
                state.prayerLogs[existingIdx].status = 'missed';
                state.prayerLogs[existingIdx].isOnTime = false;
                state.prayerLogs[existingIdx].timestamp = now.toISOString();
              } else {
                state.prayerLogs.splice(existingIdx, 1);
              }
            } else {
              // Create new completed record
              state.prayerLogs.unshift({
                id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                name: canonicalName,
                prayerId: canonicalId,
                status: 'completed',
                isOnTime: true,
                date: dateStr,
                timestamp: now.toISOString(),
              });
            }

            // Update today's in-memory status
            const activeLog = state.prayerLogs.find(
              (l) => (l.prayerId === canonicalId || l.name?.toLowerCase() === canonicalId) && l.date === dateStr
            );
            const prayerObj = state.prayers.find((p) => p.id === canonicalId);
            if (prayerObj) {
              prayerObj.status = activeLog ? activeLog.status : 'upcoming';
              prayerObj.isOnTime = activeLog ? Boolean(activeLog.isOnTime) : false;
            }

            state.punctualPercentage = calculateRate(state.prayerLogs);
          })
        ),

      /**
       * Explicit user action: Log a prayer directly.
       */
      logPrayer: (prayerId, { status = 'completed', isOnTime = true, dateKey = null } = {}) =>
        set(
          produce((state) => {
            const canonicalId = String(prayerId).toLowerCase();
            const now = new Date();
            const dateStr = dateKey || now.toISOString().slice(0, 10);

            const canonicalName =
              canonicalId === 'fajr'
                ? 'Fajr'
                : canonicalId === 'dhuhr'
                ? 'Dhuhr'
                : canonicalId === 'asr'
                ? 'Asr'
                : canonicalId === 'maghrib'
                ? 'Maghrib'
                : canonicalId === 'isha'
                ? 'Isha'
                : prayerId;

            // Upsert for (prayerId, date)
            const idx = state.prayerLogs.findIndex(
              (l) => (l.prayerId === canonicalId || l.id === canonicalId) && l.date === dateStr
            );

            if (idx !== -1) {
              state.prayerLogs[idx].status = status;
              state.prayerLogs[idx].isOnTime = isOnTime;
              state.prayerLogs[idx].timestamp = now.toISOString();
            } else {
              state.prayerLogs.unshift({
                id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                name: canonicalName,
                prayerId: canonicalId,
                status,
                isOnTime,
                date: dateStr,
                timestamp: now.toISOString(),
              });
            }

            const prayerObj = state.prayers.find((p) => p.id === canonicalId);
            if (prayerObj) {
              prayerObj.status = status;
              prayerObj.isOnTime = isOnTime;
            }

            state.punctualPercentage = calculateRate(state.prayerLogs);
          })
        ),

      /**
       * ADVANCE SCHEDULE CURSOR ONLY (DOES NOT RECORD WORSHIP).
       * Crucial architectural fix for Section 4.G & 15:
       * When countdown expires, this updates the active schedule cursor without
       * falsely fabricating a user prayer completion record or modifying statistics!
       */
      advanceToNextPrayer: (prayerId) => {
        // Schedule cursor advancement only - NO prayerLog creation!
        set((state) => {
          return {
            prayers: state.prayers.map((p) =>
              p.id === prayerId ? { ...p, isNext: false } : p
            ),
          };
        });
      },

      resetToDefaults: () =>
        set({
          calculationMethod: 'Karachi',
          madhab: 'Hanafi',
          highLatitudeRule: 'recommended',
          polarCircleResolution: 'AqrabBalad',
          prayers: INITIAL_CANONICAL_PRAYERS,
          prayerLogs: [],
          punctualPercentage: 0,
          _hasHydrated: true,
        }),
    }),
    {
      name: 'momentum-prayer-storage',
      storage: createJSONStorage(() => getSafeStorage()),
      skipHydration: true,
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          // This is derived from explicit worship logs, never a new
          // completed/missed prayer. Do not enqueue a duplicate persist.
          state.punctualPercentage = calculateRate(state.prayerLogs);
        }
      },
    }
  )
);

// StartupController performs the only authoritative hydration from
// IndexedDB after migration and crash recovery. Never trust a mirror here.

export default usePrayerStore;
