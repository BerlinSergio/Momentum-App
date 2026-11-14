import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

const getSafeStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch (e) {
    console.warn('LocalStorage unavailable for routines, falling back to memory store:', e);
  }
  const memoryStore = new Map();
  return {
    getItem: (key) => memoryStore.get(key) || null,
    setItem: (key, value) => { memoryStore.set(key, String(value)); },
    removeItem: (key) => { memoryStore.delete(key); },
  };
};

export const INITIAL_ROUTINES = [
  {
    id: 'rt-1',
    title: 'Morning Fajr & Tahajjud',
    time: '05:15 AM',
    category: 'Spiritual',
    frequency: 'Every Day',
    reminder: 'Adhan enabled',
    completed: true,
    streak: 14,
    notes: 'Early morning contemplation and prayer.',
  },
  {
    id: 'rt-2',
    title: 'Hydration & Mindfulness',
    time: '06:30 AM',
    category: 'Health & Fitness',
    frequency: 'Mon–Fri',
    reminder: '15 mins',
    completed: true,
    streak: 14,
    notes: '500ml water and 10 min mindful breathing.',
  },
  {
    id: 'rt-3',
    title: 'Deep Focus Session',
    time: '09:30 AM',
    category: 'Work & Study',
    frequency: 'Mon–Fri',
    reminder: '10m before (DND)',
    completed: true,
    streak: 12,
    notes: '90-minute uninterrupted creative sprint.',
  },
  {
    id: 'rt-4',
    title: 'Dhuhr & Reading',
    time: '01:15 PM',
    category: 'Spiritual',
    frequency: 'Every Day',
    reminder: 'Adhan chime',
    completed: true,
    streak: 14,
    notes: 'Midday prayer and 10 pages of beneficial reading.',
  },
  {
    id: 'rt-5',
    title: 'Evening Walk & Asr',
    time: '04:45 PM',
    category: 'Health & Fitness',
    frequency: 'Every Day',
    reminder: '30 mins',
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
    reminder: 'None',
    completed: false,
    streak: 6,
    notes: 'Reflect upon Surah Al-Mulk and write gratitude notes before sleep.',
  },
];

export const useRoutineStore = create(
  persist(
    (set, get) => ({
      routines: INITIAL_ROUTINES,
      baseStreak: 14,
      streakCount: 14,
      currentStreak: 14,
      editingRoutineId: null,
      _hasHydrated: false,

      setHasHydrated: (val) => set({ _hasHydrated: val }),
      setEditingRoutineId: (id) => set({ editingRoutineId: id }),
      setStreakCount: (count) => set({ streakCount: count, currentStreak: count }),

      getCurrentStreak: () => {
        const state = get();
        const base = typeof state.baseStreak === 'number' ? state.baseStreak : 14;
        const total = state.routines?.length || 0;
        const completedCount = state.routines?.filter((r) => r.completed).length || 0;
        return total > 0 && completedCount === total ? base + 1 : base;
      },

      toggleRoutineCompletion: (routineId) =>
        set(
          produce((state) => {
            const item = state.routines.find((r) => r.id === routineId);
            if (item) {
              item.completed = !item.completed;
              if (item.completed) {
                item.streak = (item.streak || 0) + 1;
              } else if (item.streak && item.streak > 0) {
                item.streak = Math.max(0, item.streak - 1);
              }
              const base = typeof state.baseStreak === 'number' ? state.baseStreak : 14;
              state.baseStreak = base;
              const total = state.routines.length;
              const completedCount = state.routines.filter((r) => r.completed).length;
              const allDone = total > 0 && completedCount === total;
              if (allDone) {
                state.streakCount = base + 1;
                state.currentStreak = base + 1;
              } else {
                state.streakCount = base;
                state.currentStreak = base;
              }
            }
          })
        ),

      toggleRoutineStatus: (routineId) => {
        get().toggleRoutineCompletion(routineId);
      },

      addRoutine: (routineData) =>
        set(
          produce((state) => {
            const newRoutine = {
              id: routineData.id || `rt-${uuidv4().slice(0, 8)}`,
              title: routineData.title || 'New Routine',
              time: routineData.time || '08:00 AM',
              category: routineData.category || 'Spiritual',
              frequency: routineData.frequency || 'Every Day',
              reminder: routineData.reminder || 'Enabled',
              completed: false,
              streak: 0,
              notes: routineData.notes || '',
            };
            state.routines.push(newRoutine);
            state.editingRoutineId = null;
          })
        ),

      updateRoutine: (routineId, updates) =>
        set(
          produce((state) => {
            const index = state.routines.findIndex((r) => r.id === routineId);
            if (index !== -1) {
              state.routines[index] = { ...state.routines[index], ...updates };
            }
            state.editingRoutineId = null;
          })
        ),

      deleteRoutine: (routineId) =>
        set(
          produce((state) => {
            state.routines = state.routines.filter((r) => r.id !== routineId);
            if (state.editingRoutineId === routineId) {
              state.editingRoutineId = null;
            }
          })
        ),

      resetToDefaults: () =>
        set({
          routines: INITIAL_ROUTINES,
          baseStreak: 14,
          streakCount: 14,
          currentStreak: 14,
          editingRoutineId: null,
          _hasHydrated: true,
        }),
    }),
    {
      name: 'momentum-routine-storage',
      storage: createJSONStorage(() => getSafeStorage()),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          if (!Array.isArray(state.routines)) {
            state.routines = INITIAL_ROUTINES;
          }
          if (typeof state.baseStreak !== 'number') {
            state.baseStreak = 14;
          }
          const total = state.routines.length;
          const completedCount = state.routines.filter((r) => r.completed).length;
          const allDone = total > 0 && completedCount === total;
          state.streakCount = allDone ? state.baseStreak + 1 : state.baseStreak;
          state.currentStreak = state.streakCount;
          state.setHasHydrated(true);
        }
      },
    }
  )
);

// Eagerly rehydrate synchronously if in browser to prevent initial render flicker
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('momentum-routine-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state) {
        const routines = Array.isArray(parsed.state.routines)
          ? parsed.state.routines
          : INITIAL_ROUTINES;
        const baseStreak = typeof parsed.state.baseStreak === 'number' ? parsed.state.baseStreak : 14;
        const total = routines.length;
        const completedCount = routines.filter((r) => r.completed).length;
        const allDone = total > 0 && completedCount === total;
        const streakCount = typeof parsed.state.streakCount === 'number'
          ? (allDone ? Math.max(parsed.state.streakCount, baseStreak + 1) : parsed.state.streakCount)
          : (allDone ? baseStreak + 1 : baseStreak);

        useRoutineStore.setState({
          ...parsed.state,
          routines,
          baseStreak,
          streakCount,
          currentStreak: streakCount,
          _hasHydrated: true,
        });
      } else {
        useRoutineStore.setState({ _hasHydrated: true });
      }
    } else {
      useRoutineStore.setState({ _hasHydrated: true });
    }
  } catch {
    useRoutineStore.setState({ _hasHydrated: true });
  }
}

export default useRoutineStore;

