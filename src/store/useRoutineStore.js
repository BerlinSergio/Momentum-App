import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { createIndexedDbStorage } from '../storage/index.js';
import { getLocalDateKey, addCalendarDays } from '../utils/timeService.js';

const routineStorage = createIndexedDbStorage({
  legacyLocalStorageKey: 'momentum-routine-storage',
  optimisticDomains: ['momentum-routine-storage'],
});
const getSafeStorage = () => routineStorage;

export const WEEKDAY_TOKENS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Returns the active date key from Time Service or falls back to device local date.
 */
export function getActiveDateKey() {
  if (typeof window !== 'undefined') {
    try {
      const timeState = window.useTimeStore?.getState?.();
      if (timeState?.currentDateKey) return timeState.currentDateKey;
    } catch {
      // ignore
    }
  }
  return getLocalDateKey();
}

/**
 * Normalizes frequency string and weekday array to ensure consistent representation.
 * Sunday = 0, Monday = 1, ..., Saturday = 6.
 */
export function deriveWeekdaysFromFrequency(frequency, explicitWeekdays) {
  if (Array.isArray(explicitWeekdays) && explicitWeekdays.length > 0) {
    const nums = explicitWeekdays
      .map((d) => (typeof d === 'string' ? WEEKDAY_TOKENS.indexOf(d) : Number(d)))
      .filter((n) => n >= 0 && n <= 6);
    if (nums.length > 0) return Array.from(new Set(nums)).sort((a, b) => a - b);
  }

  const f = (frequency || '').toLowerCase().trim();
  if (f.includes('mon') && f.includes('fri')) {
    return [1, 2, 3, 4, 5];
  }
  if (f.includes('weekend')) {
    return [0, 6];
  }
  return [0, 1, 2, 3, 4, 5, 6];
}

export function deriveFrequencyLabel(weekdays = [0, 1, 2, 3, 4, 5, 6]) {
  const set = new Set(weekdays);
  if (set.size === 7) return 'Every Day';
  if (set.size === 5 && [1, 2, 3, 4, 5].every((d) => set.has(d))) return 'Mon–Fri';
  if (set.size === 2 && set.has(0) && set.has(6)) return 'Weekends';
  return 'Custom Days';
}

/**
 * Checks if a routine is scheduled to occur on a specific civil date (YYYY-MM-DD).
 */
export function isRoutineScheduledForDate(routine, dateKey) {
  if (!routine) return false;
  if (routine.active === false || routine.archived || routine.isDeleted) return false;

  const effectiveDate = String(dateKey || getActiveDateKey()).slice(0, 10);

  // Check start date (YYYY-MM-DD or ISO string)
  if (routine.startDate) {
    const startKey = String(routine.startDate).slice(0, 10);
    if (effectiveDate < startKey) return false;
  }
  // Check optional end date
  if (routine.endDate) {
    const endKey = String(routine.endDate).slice(0, 10);
    if (effectiveDate > endKey) return false;
  }

  // Parse weekday index (0 = Sun, 6 = Sat) from effectiveDate
  const parts = effectiveDate.split('-');
  if (parts.length !== 3) return true;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const d = parseInt(parts[2], 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return true;

  const dateObj = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const weekdayIndex = dateObj.getUTCDay();
  const weekdayToken = WEEKDAY_TOKENS[weekdayIndex];

  // 1. Authoritative check: weekdays array
  if (Array.isArray(routine.weekdays) && routine.weekdays.length > 0) {
    return routine.weekdays.some((w) => Number(w) === weekdayIndex);
  }

  // 2. Fallback check: targetDays token array
  if (Array.isArray(routine.targetDays) && routine.targetDays.length > 0) {
    return routine.targetDays.some((t) => String(t).toLowerCase() === weekdayToken.toLowerCase());
  }

  // 3. Fallback check: frequency string
  const freq = (routine.frequency || '').toLowerCase().trim();
  if (freq === 'every day' || freq === 'daily' || !freq) return true;
  if (freq === 'mon–fri' || freq === 'mon-fri' || freq === 'weekdays') {
    return weekdayIndex >= 1 && weekdayIndex <= 5;
  }
  if (freq === 'weekends') {
    return weekdayIndex === 0 || weekdayIndex === 6;
  }

  return true;
}

/**
 * Returns all routines scheduled for the specified dateKey.
 */
export function getScheduledRoutinesForDate(routines, dateKey = getActiveDateKey()) {
  return (routines || []).filter((r) => isRoutineScheduledForDate(r, dateKey));
}

/**
 * Checks if a routine is completed for a specific dateKey.
 * Evaluates date-specific completion records (routine.completedDates[dateKey]).
 */
export function isRoutineCompletedForDate(routine, dateKey) {
  if (!routine) return false;
  const targetDate = String(dateKey || getActiveDateKey()).slice(0, 10);

  if (routine.completedDates && typeof routine.completedDates === 'object') {
    if (routine.completedDates[targetDate] !== undefined) {
      return Boolean(routine.completedDates[targetDate]);
    }
  }

  // Safe fallback strictly for legacy records where completedDates was never initialized
  if (!routine.completedDates || Object.keys(routine.completedDates).length === 0) {
    const today = getActiveDateKey().slice(0, 10);
    const updatedDate = routine.updatedAt ? String(routine.updatedAt).slice(0, 10) : null;
    const createdDate = routine.createdAt ? String(routine.createdAt).slice(0, 10) : null;
    if (targetDate === today && (updatedDate === today || createdDate === today)) {
      return Boolean(routine.completed);
    }
  }

  return false;
}

/**
 * Pure selector for daily progress metrics on a specific dateKey.
 */
export function getDailyRoutineProgress(routines, dateKey = getActiveDateKey()) {
  const scheduled = getScheduledRoutinesForDate(routines, dateKey);
  const total = scheduled.length;
  const done = scheduled.filter((r) => isRoutineCompletedForDate(r, dateKey)).length;
  const upcoming = Math.max(0, total - done);
  const percentage = total > 0 ? Math.round((done / total) * 100) : 0;
  return { total, done, percentage, upcoming, scheduled };
}

/**
 * Computes genuine streak statistics for an individual routine over a window of days.
 */
export function getStreakStatistics(routine, windowDays = 16, targetDateKey = getActiveDateKey()) {
  if (!routine) return { scheduledCount: 0, completedCount: 0, percentage: 0, text: 'No completion history yet' };

  const targetDate = String(targetDateKey || getActiveDateKey()).slice(0, 10);
  let scheduledCount = 0;
  let completedCount = 0;

  for (let i = 0; i < windowDays; i++) {
    const checkDate = addCalendarDays(targetDate, -i);
    if (isRoutineScheduledForDate(routine, checkDate)) {
      scheduledCount++;
      if (isRoutineCompletedForDate(routine, checkDate)) {
        completedCount++;
      }
    }
  }

  if (scheduledCount === 0) {
    return {
      scheduledCount: 0,
      completedCount: 0,
      percentage: 0,
      text: 'No scheduled days in period',
    };
  }

  const percentage = Math.round((completedCount / scheduledCount) * 100);
  const text = completedCount > 0
    ? `Completed ${completedCount} of the last ${scheduledCount} target days`
    : 'No completions recorded yet';

  return {
    scheduledCount,
    completedCount,
    percentage,
    text,
  };
}

/**
 * Calculate consecutive scheduled days streak for a single routine leading up to targetDateKey.
 * Non-scheduled days (e.g. weekends for Mon-Fri) do not break the streak.
 */
export function calculateRoutineCurrentStreak(routine, targetDateKey = getActiveDateKey()) {
  if (!routine) return 0;
  const targetDate = String(targetDateKey || getActiveDateKey()).slice(0, 10);
  let streak = 0;

  const isTodayDone = isRoutineCompletedForDate(routine, targetDate);
  const isTodayScheduled = isRoutineScheduledForDate(routine, targetDate);

  if (isTodayScheduled && isTodayDone) {
    streak++;
  }

  // Walk backwards from targetDate - 1
  for (let i = 1; i <= 365; i++) {
    const checkDate = addCalendarDays(targetDate, -i);
    if (isRoutineScheduledForDate(routine, checkDate)) {
      if (isRoutineCompletedForDate(routine, checkDate)) {
        streak++;
      } else {
        break; // Streak broken on missed scheduled day
      }
    }
  }

  return streak;
}

/**
 * Calculate the global application routine streak across all active routines.
 * Counts unbroken chain of scheduled days where all scheduled routines were completed.
 */
export function calculateGlobalStreak(routines, targetDateKey = getActiveDateKey(), baseStreak = 0) {
  const activeRoutines = (routines || []).filter((r) => r.active !== false && !r.archived && !r.isDeleted);
  const base = typeof baseStreak === 'number' ? baseStreak : 0;
  if (activeRoutines.length === 0) return base;

  const targetDate = String(targetDateKey || getActiveDateKey()).slice(0, 10);
  let streak = 0;

  const todayScheduled = getScheduledRoutinesForDate(activeRoutines, targetDate);
  const todayAllDone = todayScheduled.length > 0 && todayScheduled.every((r) => isRoutineCompletedForDate(r, targetDate));

  if (todayAllDone) {
    streak = 1;
  }

  let unbrokenChain = true;

  for (let i = 1; i <= 365; i++) {
    const checkDate = addCalendarDays(targetDate, -i);
    const scheduled = getScheduledRoutinesForDate(activeRoutines, checkDate);
    if (scheduled.length === 0) {
      continue; // Rest / unscheduled day: do not break
    }

    const hasAnyRecord = scheduled.some((r) => r.completedDates && r.completedDates[checkDate] !== undefined);
    if (!hasAnyRecord) {
      // Reached before explicit tracking began: stop walking, unbroken chain carries baseStreak
      break;
    }

    const allDone = scheduled.every((r) => isRoutineCompletedForDate(r, checkDate));
    if (allDone) {
      streak++;
    } else {
      unbrokenChain = false;
      break;
    }
  }

  if (unbrokenChain) {
    return base + streak;
  }

  return streak;
}

/**
 * Normalizes an incoming routine draft or legacy record.
 */
export function normalizeRoutine(data = {}) {
  const durationVal = Number(data.durationMinutes || data.duration) || 25;
  const weekdaysArr = deriveWeekdaysFromFrequency(data.frequency, data.weekdays);
  const freqLabel = data.frequency || deriveFrequencyLabel(weekdaysArr);
  const targetDaysArr = Array.isArray(data.targetDays) && data.targetDays.length > 0
    ? data.targetDays
    : weekdaysArr.map((w) => WEEKDAY_TOKENS[w]);

  const hasReminder = data.reminderEnabled !== undefined
    ? Boolean(data.reminderEnabled)
    : (data.reminder && data.reminder !== 'None' && data.reminder !== 'Disabled');

  const offsetVal = data.reminderOffset !== undefined ? Number(data.reminderOffset) : 0;
  const soundVal = data.reminderSound || 'Serenity Bell';

  let reminderLabel = 'None';
  if (hasReminder) {
    if (offsetVal === 0) reminderLabel = 'At start';
    else reminderLabel = `${offsetVal}m before`;
  }

  const completedDates = data.completedDates && typeof data.completedDates === 'object' ? { ...data.completedDates } : {};

  // If legacy routine has `completed: true` but completedDates is empty, migrate it for legacy date
  if (Boolean(data.completed) && Object.keys(completedDates).length === 0) {
    const legacyDate = (data.updatedAt || data.createdAt || getActiveDateKey()).slice(0, 10);
    completedDates[legacyDate] = true;
  }

  const todayKey = getActiveDateKey().slice(0, 10);
  const isDoneToday = Boolean(completedDates[todayKey]);

  return {
    id: data.id || `rt-${uuidv4().slice(0, 8)}`,
    title: (data.title || '').trim() || 'Daily Routine',
    category: data.category || 'Spiritual',
    time: data.time || '08:30 AM',
    duration: durationVal,
    durationMinutes: durationVal,
    frequency: freqLabel,
    weekdays: weekdaysArr,
    targetDays: targetDaysArr,
    reminderEnabled: hasReminder,
    reminderOffset: offsetVal,
    reminderSound: soundVal,
    reminder: reminderLabel,
    notes: (data.notes || '').trim(),
    active: data.active !== false,
    startDate: data.startDate || null,
    endDate: data.endDate || null,
    streak: typeof data.streak === 'number' ? data.streak : 0,
    completed: isDoneToday,
    completedDates,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
}

export const DEMO_ROUTINES = [
  {
    id: 'rt-1',
    title: 'Morning Fajr & Tahajjud',
    time: '05:15 AM',
    category: 'Spiritual',
    frequency: 'Every Day',
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    reminder: 'At start',
    reminderEnabled: true,
    reminderOffset: 0,
    reminderSound: 'Adhan chime',
    completed: false,
    streak: 14,
    notes: 'Early morning contemplation and prayer.',
  },
  {
    id: 'rt-2',
    title: 'Hydration & Mindfulness',
    time: '06:30 AM',
    category: 'Health & Fitness',
    frequency: 'Mon–Fri',
    weekdays: [1, 2, 3, 4, 5],
    reminder: '15m before',
    reminderEnabled: true,
    reminderOffset: 15,
    reminderSound: 'Gentle Chime',
    completed: false,
    streak: 14,
    notes: '500ml water and 10 min mindful breathing.',
  },
  {
    id: 'rt-3',
    title: 'Deep Focus Session',
    time: '09:30 AM',
    category: 'Work & Study',
    frequency: 'Mon–Fri',
    weekdays: [1, 2, 3, 4, 5],
    reminder: '10m before',
    reminderEnabled: true,
    reminderOffset: 10,
    reminderSound: 'Focus Gong',
    completed: false,
    streak: 12,
    notes: '90-minute uninterrupted creative sprint.',
  },
  {
    id: 'rt-4',
    title: 'Dhuhr & Reading',
    time: '01:15 PM',
    category: 'Spiritual',
    frequency: 'Every Day',
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    reminder: 'At start',
    reminderEnabled: true,
    reminderOffset: 0,
    reminderSound: 'Adhan chime',
    completed: false,
    streak: 14,
    notes: 'Midday prayer and 10 pages of beneficial reading.',
  },
  {
    id: 'rt-5',
    title: 'Evening Walk & Asr',
    time: '04:45 PM',
    category: 'Health & Fitness',
    frequency: 'Every Day',
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    reminder: '30m before',
    reminderEnabled: true,
    reminderOffset: 30,
    reminderSound: 'Nature Breeze',
    completed: false,
    streak: 9,
    notes: 'Outdoor walk and post-Asr adhkar.',
  },
  {
    id: 'rt-6',
    title: 'Family Time & Evening Reflection',
    time: '07:00 PM',
    category: 'Personal',
    frequency: 'Weekends',
    weekdays: [0, 6],
    reminder: 'None',
    reminderEnabled: false,
    reminderOffset: 0,
    reminderSound: 'Serenity Bell',
    completed: false,
    streak: 6,
    notes: 'Reflect upon Surah Al-Mulk and write gratitude notes before sleep.',
  },
];

export const INITIAL_ROUTINES = DEMO_ROUTINES;

export const useRoutineStore = create(
  persist(
    (set, get) => ({
      routines: [],
      baseStreak: 0,
      streakCount: 0,
      currentStreak: 0,
      lastActiveDateKey: getActiveDateKey().slice(0, 10),
      editingRoutineId: null,
      _hasHydrated: false,

      setHasHydrated: (val) => set({ _hasHydrated: val }),
      setEditingRoutineId: (id) => set({ editingRoutineId: id }),
      setStreakCount: (count) => set({ streakCount: count, currentStreak: count }),
      calculateRoutineCurrentStreak: (r, dateKey) => calculateRoutineCurrentStreak(r, dateKey || getActiveDateKey()),

      getCurrentStreak: (targetDateKey) => {
        const state = get();
        const dateKey = targetDateKey || getActiveDateKey();
        return calculateGlobalStreak(state.routines, dateKey, state.baseStreak);
      },

      getDueRoutines: (dateKey) => {
        const targetDate = dateKey || getActiveDateKey();
        return getScheduledRoutinesForDate(get().routines, targetDate);
      },

      getTodayProgress: (dateKey) => {
        const targetDate = dateKey || getActiveDateKey();
        return getDailyRoutineProgress(get().routines, targetDate);
      },

      performDayRollover: (newDateKey) => {
        // Ignore startup clocks until the authoritative IndexedDB snapshot
        // has loaded; otherwise a time tick could seed an empty stale write.
        if (!get()._hasHydrated) return;
        const today = String(newDateKey || getActiveDateKey()).slice(0, 10);
        set(
          produce((state) => {
            state.lastActiveDateKey = today;
            for (const item of state.routines) {
              item.completed = isRoutineCompletedForDate(item, today);
              item.streak = calculateRoutineCurrentStreak(item, today);
            }
            state.streakCount = calculateGlobalStreak(state.routines, today, state.baseStreak);
            state.currentStreak = state.streakCount;
          })
        );

        if (typeof window !== 'undefined' && window.nativeNotifications?.scheduleAllActiveNotifications) {
          window.nativeNotifications.scheduleAllActiveNotifications().catch(() => {});
        }
      },

      toggleRoutineCompletion: (routineId, customDateKey) =>
        set(
          produce((state) => {
            const today = getActiveDateKey().slice(0, 10);
            const targetDate = String(customDateKey || today).slice(0, 10);
            const item = state.routines.find((r) => r.id === routineId);
            if (item) {
              if (!item.completedDates || typeof item.completedDates !== 'object') {
                item.completedDates = {};
              }
              const currentStatus = Boolean(item.completedDates[targetDate]);
              const nextStatus = !currentStatus;
              item.completedDates[targetDate] = nextStatus;

              if (targetDate === today) {
                item.completed = nextStatus;
              }
              item.streak = calculateRoutineCurrentStreak(item, today);
              item.updatedAt = new Date().toISOString();

              state.streakCount = calculateGlobalStreak(state.routines, today, state.baseStreak);
              state.currentStreak = state.streakCount;

              if (nextStatus && targetDate === today && typeof window !== 'undefined' && window.nativeNotifications?.cancelNotificationForSource) {
                window.nativeNotifications.cancelNotificationForSource('routine', routineId);
              } else if (!nextStatus && targetDate === today && typeof window !== 'undefined' && window.nativeNotifications?.scheduleAllActiveNotifications) {
                window.nativeNotifications.scheduleAllActiveNotifications().catch(() => {});
              }
            }
          })
        ),

      toggleRoutineStatus: (routineId, customDateKey) => {
        get().toggleRoutineCompletion(routineId, customDateKey);
      },

      addRoutine: (routineData) =>
        set(
          produce((state) => {
            const normalized = normalizeRoutine(routineData);
            state.routines.push(normalized);
            state.editingRoutineId = null;

            const today = getActiveDateKey().slice(0, 10);
            state.streakCount = calculateGlobalStreak(state.routines, today, state.baseStreak);
            state.currentStreak = state.streakCount;

            if (typeof window !== 'undefined' && window.nativeNotifications?.scheduleAllActiveNotifications) {
              window.nativeNotifications.scheduleAllActiveNotifications().catch(() => {});
            }
          })
        ),

      updateRoutine: (routineId, updates) =>
        set(
          produce((state) => {
            const index = state.routines.findIndex((r) => r.id === routineId);
            if (index !== -1) {
              const prev = state.routines[index];
              const merged = normalizeRoutine({
                ...prev,
                ...updates,
                id: prev.id,
                completedDates: { ...(prev.completedDates || {}), ...(updates.completedDates || {}) },
                createdAt: prev.createdAt,
                updatedAt: new Date().toISOString(),
              });
              const today = getActiveDateKey().slice(0, 10);
              merged.streak = calculateRoutineCurrentStreak(merged, today);
              state.routines[index] = merged;
            }
            state.editingRoutineId = null;

            const today = getActiveDateKey().slice(0, 10);
            state.streakCount = calculateGlobalStreak(state.routines, today, state.baseStreak);
            state.currentStreak = state.streakCount;

            if (typeof window !== 'undefined' && window.nativeNotifications?.scheduleAllActiveNotifications) {
              window.nativeNotifications.scheduleAllActiveNotifications().catch(() => {});
            }
          })
        ),

      deleteRoutine: (routineId) =>
        set(
          produce((state) => {
            state.routines = state.routines.filter((r) => r.id !== routineId);
            if (state.editingRoutineId === routineId) {
              state.editingRoutineId = null;
            }
            if (typeof window !== 'undefined' && window.nativeNotifications?.cancelNotificationForSource) {
              window.nativeNotifications.cancelNotificationForSource('routine', routineId);
            }
            const today = getActiveDateKey().slice(0, 10);
            state.streakCount = calculateGlobalStreak(state.routines, today, state.baseStreak);
            state.currentStreak = state.streakCount;

            if (typeof window !== 'undefined' && window.nativeNotifications?.scheduleAllActiveNotifications) {
              window.nativeNotifications.scheduleAllActiveNotifications().catch(() => {});
            }
          })
        ),

      resetToDefaults: () =>
        set({
          routines: [],
          baseStreak: 0,
          streakCount: 0,
          currentStreak: 0,
          lastActiveDateKey: getActiveDateKey().slice(0, 10),
          editingRoutineId: null,
          _hasHydrated: true,
        }),
    }),
    {
      name: 'momentum-routine-storage',
      storage: createJSONStorage(() => getSafeStorage()),
      skipHydration: true,
      partialize: (state) => ({
        routines: state.routines,
        baseStreak: state.baseStreak,
        streakCount: state.streakCount,
        currentStreak: state.currentStreak,
        lastActiveDateKey: state.lastActiveDateKey,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          if (!Array.isArray(state.routines)) {
            state.routines = [];
          } else {
            state.routines = state.routines.map(normalizeRoutine);
          }
          if (typeof state.baseStreak !== 'number') {
            state.baseStreak = 0;
          }
          // Roll the day only after *all* stores have hydrated, including
          // TimeStore's date. StartupController calls performDayRollover then.
          // No extra write from this rehydration callback.
        }
      },
    }
  )
);

// UI date-change listeners are allowed only after coordinated hydration.
// No localStorage mirror rehydration outside runStorageMigration.
if (typeof window !== 'undefined') {
  // Automatic Day Rollover Listeners
  window.addEventListener('momentum-day-change', (event) => {
    const newDateKey = event.detail?.currentDateKey || event.detail?.dateKey || getActiveDateKey();
    useRoutineStore.getState().performDayRollover?.(newDateKey);
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      const today = getActiveDateKey().slice(0, 10);
      const lastActive = useRoutineStore.getState().lastActiveDateKey;
      if (lastActive && lastActive !== today) {
        useRoutineStore.getState().performDayRollover?.(today);
      }
    }
  });

  window.addEventListener('focus', () => {
    const today = getActiveDateKey().slice(0, 10);
    const lastActive = useRoutineStore.getState().lastActiveDateKey;
    if (lastActive && lastActive !== today) {
      useRoutineStore.getState().performDayRollover?.(today);
    }
  });
}

export default useRoutineStore;
