import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { useSettingsStore } from './useSettingsStore';
import { calculatePrayerTimes, getPrayerDate } from '../utils/prayerTimes';

const getSafeStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const testKey = '__momentum_prayer_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    }
  } catch (e) {
    console.warn('LocalStorage unavailable for prayer store, falling back to memory store:', e);
  }
  const memoryStore = new Map();
  return {
    getItem: (key) => memoryStore.get(key) || null,
    setItem: (key, value) => { memoryStore.set(key, String(value)); },
    removeItem: (key) => { memoryStore.delete(key); },
  };
};

export const INITIAL_CANONICAL_PRAYERS = calculatePrayerTimes().prayers.map((p) => ({
  id: p.id,
  name: p.name,
  time: p.time,
  subtitle: p.subtitle,
  status: 'upcoming',
  isOnTime: false,
}));

export const INITIAL_PRAYER_LOGS = [];

const calculateRate = (prayers = [], logs = []) => {
  const completedToday = (prayers || []).filter((p) => p.status === 'completed');
  const onTimeToday = completedToday.filter((p) => p.isOnTime !== false).length;
  const historyCompleted = (logs || []).filter((l) => l.status === 'completed');
  const historyOnTime = historyCompleted.filter((l) => l.isOnTime !== false).length;

  const total = completedToday.length + historyCompleted.length;
  if (total === 0) return 0;
  const rate = Math.round(((onTimeToday + historyOnTime) / total) * 100);
  return Math.min(100, Math.max(0, rate));
};

export const usePrayerStore = create(
  persist(
    (set, get) => ({
      prayers: INITIAL_CANONICAL_PRAYERS,
      prayerLogs: INITIAL_PRAYER_LOGS,
      punctualPercentage: 0,
      _hasHydrated: false,

      // Notification & alert settings
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
        } catch {}
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
        } catch {}
      },

      setPrayerAlertsEnabled: (enabled) => set({ prayerAlertsEnabled: enabled }),

      togglePrayerAlertsEnabled: () => set((state) => ({ prayerAlertsEnabled: !state.prayerAlertsEnabled })),

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
        const { prayers, prayerLogs } = get();
        return calculateRate(prayers, prayerLogs);
      },

      logPrayer: (prayerId, { status = 'completed', isOnTime = true } = {}) =>
        set(
          produce((state) => {
            const prayer = state.prayers.find((p) => p.id === prayerId || p.name.toLowerCase() === String(prayerId).toLowerCase());
            if (prayer) {
              prayer.status = status;
              prayer.isOnTime = isOnTime;
            }
            state.prayerLogs.unshift({
              id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              name: prayer?.name || prayerId,
              status,
              isOnTime,
              timestamp: new Date().toISOString(),
            });
            state.punctualPercentage = calculateRate(state.prayers, state.prayerLogs);
          })
        ),

      togglePrayer: (prayerId, targetDate = new Date()) =>
        set(
          produce((state) => {
            const prayer = state.prayers.find((p) => p.id === prayerId || p.name.toLowerCase() === String(prayerId).toLowerCase());
            if (prayer) {
              const now = new Date();
              const pDate = (targetDate instanceof Date && !isNaN(targetDate.getTime()))
                ? targetDate
                : getPrayerDate(prayer.time, false, targetDate);

              const isPast = pDate.getTime() <= now.getTime();
              if (!isPast) return;

              const dateStr = pDate.toISOString().slice(0, 10);
              const dateKey = `${prayer.id}_${dateStr}`;

              const wasCompleted = prayer.status === 'completed' || prayer.status === 'upcoming' || prayer.status === undefined;
              prayer.status = wasCompleted ? 'missed' : 'completed';
              prayer.isOnTime = !wasCompleted;

              if (!wasCompleted) {
                state.prayerLogs.unshift({
                  id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                  name: prayer.name,
                  prayerId: prayer.id,
                  status: 'completed',
                  isOnTime: true,
                  date: dateStr,
                  timestamp: new Date().toISOString(),
                });
              } else {
                const idx = state.prayerLogs.findIndex((l) => (l.prayerId === prayer.id || l.name === prayer.name) && l.status === 'completed');
                if (idx !== -1) {
                  state.prayerLogs.splice(idx, 1);
                }
                state.prayerLogs.unshift({
                  id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                  name: prayer.name,
                  prayerId: prayer.id,
                  status: 'missed',
                  isOnTime: false,
                  date: dateStr,
                  timestamp: new Date().toISOString(),
                });
              }
              state.punctualPercentage = calculateRate(state.prayers, state.prayerLogs);

              try {
                useSettingsStore.getState().setSetting?.('prayerProgress', {
                  ...(useSettingsStore.getState().prayerProgress || {}),
                  [dateKey]: prayer.status,
                  [prayer.id]: prayer.status,
                  lastUpdated: new Date().toISOString(),
                });
              } catch {}
            }
          })
        ),

      advanceToNextPrayer: (prayerId) =>
        set(
          produce((state) => {
            const prayer = state.prayers.find((p) => p.id === prayerId || p.name.toLowerCase() === String(prayerId).toLowerCase());
            if (prayer) {
              prayer.status = 'completed';
              prayer.isOnTime = true;
            }
            state.prayerLogs.unshift({
              id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              name: prayer?.name || prayerId,
              prayerId: prayer?.id || prayerId,
              status: 'completed',
              isOnTime: true,
              date: new Date().toISOString().slice(0, 10),
              timestamp: new Date().toISOString(),
            });
            state.punctualPercentage = calculateRate(state.prayers, state.prayerLogs);

            try {
              const currentProgress = useSettingsStore.getState().prayerProgress || {};
              useSettingsStore.getState().setSetting?.('prayerProgress', {
                ...currentProgress,
                [prayerId]: 'completed',
                lastUpdated: new Date().toISOString(),
              });
            } catch {}
          })
        ),

      resetToDefaults: () =>
        set({
          prayers: INITIAL_CANONICAL_PRAYERS,
          prayerLogs: [],
          punctualPercentage: 0,
          _hasHydrated: true,
        }),
    }),
    {
      name: 'momentum-prayer-storage',
      storage: createJSONStorage(() => getSafeStorage()),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          state.punctualPercentage = calculateRate(state.prayers, state.prayerLogs);
          state.setHasHydrated(true);
        }
      },
    }
  )
);

// Eager synchronous rehydration
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('momentum-prayer-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state?.prayers) {
        usePrayerStore.setState({
          ...parsed.state,
          punctualPercentage: calculateRate(parsed.state.prayers, parsed.state.prayerLogs),
          _hasHydrated: true,
        });
      } else {
        usePrayerStore.setState({ punctualPercentage: 0, _hasHydrated: true });
      }
    } else {
      usePrayerStore.setState({ punctualPercentage: 0, _hasHydrated: true });
    }
  } catch {
    usePrayerStore.setState({ punctualPercentage: 0, _hasHydrated: true });
  }
}

export default usePrayerStore;
