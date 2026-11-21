import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  getDeviceTimezone,
  normalizeIanaTimezone,
  getNow,
  getLocalDateParts,
} from '../utils/timeService';
import { createIndexedDbStorage } from '../storage/index.js';

const timeStorage = createIndexedDbStorage({ legacyLocalStorageKey: 'momentum-time-storage' });
const getSafeStorage = () => timeStorage;

function computeInitialTimeState(persisted = {}) {
  const mode = persisted.timezoneMode || 'auto';
  const manual = persisted.manualTimezone ? normalizeIanaTimezone(persisted.manualTimezone) : normalizeIanaTimezone(getDeviceTimezone());
  const effective = mode === 'manual' ? manual : normalizeIanaTimezone(getDeviceTimezone());
  const parts = getLocalDateParts(getNow(), effective);

  return {
    timezoneMode: mode,
    manualTimezone: manual,
    effectiveTimezone: effective,
    currentDateKey: parts.dateKey,
    currentMonthKey: parts.monthKey,
    currentYear: parts.year,
    currentMonth: parts.month,
    currentDay: parts.day,
    currentHour: parts.hours,
    currentMinute: parts.minutes,
    currentWeekday: parts.weekday,
    timeFormat: persisted.timeFormat || '12h',
    dayEpoch: 0,
    minuteEpoch: 0,
    lastRefreshTime: Date.now(),
  };
}

export const useTimeStore = create(
  persist(
    (set, get) => ({
      ...computeInitialTimeState(),
      _hasHydrated: true,
      setHasHydrated: (val) => set({ _hasHydrated: val }),

      /**
       * Recompute current local time & date keys.
       * Invoked on minute timer, midnight rollover, app resume, visibility change, or timezone change.
       */
      refreshTime: () => {
        const state = get();
        const now = getNow();
        const effective = state.timezoneMode === 'manual'
          ? state.manualTimezone
          : normalizeIanaTimezone(getDeviceTimezone());
        const parts = getLocalDateParts(now, effective);

        const dateChanged = parts.dateKey !== state.currentDateKey;
        const monthChanged = parts.monthKey !== state.currentMonthKey;
        const tzChanged = effective !== state.effectiveTimezone;

        set({
          effectiveTimezone: effective,
          currentDateKey: parts.dateKey,
          currentMonthKey: parts.monthKey,
          currentYear: parts.year,
          currentMonth: parts.month,
          currentDay: parts.day,
          currentHour: parts.hours,
          currentMinute: parts.minutes,
          currentWeekday: parts.weekday,
          dayEpoch: (dateChanged || tzChanged) ? state.dayEpoch + 1 : state.dayEpoch,
          minuteEpoch: state.minuteEpoch + 1,
          lastRefreshTime: now.getTime(),
        });

        // Notify custom listeners if any
        if (typeof window !== 'undefined' && (dateChanged || tzChanged)) {
          window.dispatchEvent(new CustomEvent('momentum-day-change', {
            detail: {
              dateKey: parts.dateKey,
              currentDateKey: parts.dateKey,
              monthKey: parts.monthKey,
              currentMonthKey: parts.monthKey,
              effectiveTimezone: effective,
              dateChanged,
              monthChanged,
              tzChanged,
            },
          }));
        }
      },

      /**
       * Switch between Automatic (device-following) and Manual timezone modes.
       */
      setTimezoneMode: (mode) => {
        const nextMode = mode === 'manual' ? 'manual' : 'auto';
        const state = get();
        const nextEffective = nextMode === 'manual'
          ? state.manualTimezone
          : normalizeIanaTimezone(getDeviceTimezone());
        const parts = getLocalDateParts(getNow(), nextEffective);

        set({
          timezoneMode: nextMode,
          effectiveTimezone: nextEffective,
          currentDateKey: parts.dateKey,
          currentMonthKey: parts.monthKey,
          currentYear: parts.year,
          currentMonth: parts.month,
          currentDay: parts.day,
          currentHour: parts.hours,
          currentMinute: parts.minutes,
          currentWeekday: parts.weekday,
          dayEpoch: state.dayEpoch + 1,
        });

        get().refreshTime();
      },

      /**
       * Set user's manual timezone. Automatically sets timezoneMode to 'manual'.
       */
      setManualTimezone: (rawTz) => {
        const iana = normalizeIanaTimezone(rawTz);
        const parts = getLocalDateParts(getNow(), iana);
        const state = get();

        set({
          timezoneMode: 'manual',
          manualTimezone: iana,
          effectiveTimezone: iana,
          currentDateKey: parts.dateKey,
          currentMonthKey: parts.monthKey,
          currentYear: parts.year,
          currentMonth: parts.month,
          currentDay: parts.day,
          currentHour: parts.hours,
          currentMinute: parts.minutes,
          currentWeekday: parts.weekday,
          dayEpoch: state.dayEpoch + 1,
        });

        get().refreshTime();
      },

      /**
       * Toggle 12-hour vs 24-hour display format preference.
       */
      setTimeFormat: (format) => {
        set({ timeFormat: format === '24h' ? '24h' : '12h' });
      },

      /**
       * Synchronize profile/settings timezone string with time store.
       */
      syncFromProfile: (profileTz) => {
        if (!profileTz) return;
        const iana = normalizeIanaTimezone(profileTz);
        const state = get();
        // If state is currently manual, update manualTimezone
        if (state.timezoneMode === 'manual' && state.manualTimezone !== iana) {
          get().setManualTimezone(iana);
        }
      },
    }),
    {
      name: 'momentum-time-storage',
      storage: createJSONStorage(getSafeStorage),
      partialize: (state) => ({
        timezoneMode: state.timezoneMode,
        manualTimezone: state.manualTimezone,
        timeFormat: state.timeFormat,
      }),
    }
  )
);

// Global live timer and lifecycle orchestrator
let timerId = null;

export function initializeTimeService() {
  if (typeof window === 'undefined') return;

  // Clear existing timer if any
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }

  const scheduleNextTick = () => {
    const now = getNow();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 50;
    const delay = Math.max(500, Math.min(msToNextMinute, 60000));

    timerId = setTimeout(() => {
      useTimeStore.getState().refreshTime();
      scheduleNextTick();
    }, delay);
  };

  scheduleNextTick();

  // Listen for browser visibility and focus
  const handleVisibility = () => {
    if (!document.hidden) {
      useTimeStore.getState().refreshTime();
    }
  };

  const handleFocus = () => {
    useTimeStore.getState().refreshTime();
  };

  document.addEventListener('visibilitychange', handleVisibility);
  window.addEventListener('focus', handleFocus);

  // Return cleanup function
  return () => {
    if (timerId) clearTimeout(timerId);
    document.removeEventListener('visibilitychange', handleVisibility);
    window.removeEventListener('focus', handleFocus);
  };
}

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  initializeTimeService();
}
