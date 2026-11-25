import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { isToday } from '../utils/timeService';
import { createIndexedDbStorage } from '../storage/index.js';

const tasbeehStorage = createIndexedDbStorage({
  legacyLocalStorageKey: 'momentum-tasbeeh-storage',
  optimisticDomains: ['momentum-tasbeeh-storage'],
});
const getSafeStorage = () => tasbeehStorage;

const playFeedbackAudio = () => {
  try {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Ignore autoplay restriction or audio context errors
  }
};

const triggerFeedbackHaptic = (isTarget = false) => {
  try {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(isTarget ? [40, 50, 40] : 15);
    }
  } catch {
    // Ignore vibration error
  }
};

export const DEFAULT_TASBEEH_PRESETS = [
  { id: 'p1', arabic: 'سُبْحَانَ ٱللَّٰهِ', transliteration: 'Subhanallah', meaning: 'Glory be to Allah', target: 33 },
  { id: 'p2', arabic: 'ٱلْحَمْدُ لِلَّٰهِ', transliteration: 'Alhamdulillah', meaning: 'All praise is for Allah', target: 33 },
  { id: 'p3', arabic: 'ٱللَّٰهُ أَكْبَرُ', transliteration: 'Allahu Akbar', meaning: 'Allah is the Greatest', target: 33 },
  { id: 'p4', arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', transliteration: 'La ilaha illallah', meaning: 'There is no god but Allah', target: 100 },
  { id: 'p5', arabic: 'أَسْتَغْفِرُ ٱللَّٰهَ', transliteration: 'Astaghfirullah', meaning: 'I seek forgiveness from Allah', target: 100 },
  { id: 'p6', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', transliteration: 'SubhanAllah wa bi-Hamdih', meaning: 'Glory be to Allah and Praise Him', target: 33 },
];

export const DEFAULT_TASBEEH_LOGS = [];

export const computeTodayTotal = (historyLogs = [], currentCount = 0, timeZone) => {
  const todayLogsSum = (historyLogs || []).reduce((sum, log) => {
    if (!log || !log.date) return sum;
    try {
      if (isToday(log.date, timeZone)) {
        return sum + (Number(log.count) || 0);
      }
    } catch {
      const now = new Date();
      const d = new Date(log.date);
      if (
        !isNaN(d.getTime()) &&
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      ) {
        return sum + (Number(log.count) || 0);
      }
    }
    return sum;
  }, 0);

  return todayLogsSum + (Number(currentCount) || 0);
};

export const useTasbeehStore = create(
  persist(
    (set, get) => ({
      // State Schema
      currentCount: 0,
      roundComplete: false,
      lapCount: 0,
      dailyTotal: 0,
      dailyGoal: 1000,
      hapticsEnabled: true,
      soundEnabled: true,
      keepAwakeEnabled: true,
      keepAwake: true,
      fullScreenTapEnabled: false,
      fullScreenTap: false,
      volumeKeysEnabled: true,
      volumeKeys: true,
      autoLoopEnabled: true,
      autoLoop: true,
      _hasHydrated: false,

      setHasHydrated: (val) => set({ _hasHydrated: val }),
      activePreset: {
        id: 'p1',
        arabic: 'سُبْحَانَ ٱللَّٰهِ',
        transliteration: 'Subhanallah',
        meaning: 'Glory be to Allah',
        target: 33,
      },
      presets: DEFAULT_TASBEEH_PRESETS,
      historyLogs: [],

      getTotalAdhkar: () => {
        const { historyLogs, currentCount } = get();
        const logsSum = (historyLogs || []).reduce((acc, log) => acc + (Number(log?.count) || 0), 0);
        return logsSum + Number(currentCount || 0);
      },

      // Store Actions (Mutators)
      saveSession: (overrideCount) => {
        const { currentCount, activePreset } = get();
        const target = Number(activePreset?.target) || 33;
        const countToSave = typeof overrideCount === 'number' ? overrideCount : currentCount;

        if (countToSave <= 0) return null;

        const entry = {
          id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          date: new Date().toISOString(),
          phrase: activePreset?.transliteration || 'Dhikr',
          arabic: activePreset?.arabic || '',
          count: countToSave,
          target: target,
          sessionType: 'Daily Dhikr',
          duration: '2m 15s',
        };

        set(
          produce((state) => {
            state.historyLogs.unshift(entry);
          })
        );

        return entry;
      },

      increment: () => {
        if (get().roundComplete) return;
        const { soundEnabled, hapticsEnabled, activePreset, currentCount } = get();
        const target = Number(activePreset?.target) || 33;
        const willHitTarget = currentCount + 1 >= target;

        if (soundEnabled) {
          playFeedbackAudio();
        }
        if (hapticsEnabled) {
          triggerFeedbackHaptic(willHitTarget);
        }

        return set(
          produce((state) => {
            state.currentCount += 1;
            state.dailyTotal += 1;
            if (state.currentCount >= target) {
              state.lapCount += 1;
              state.historyLogs.unshift({
                id: `lap-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                date: new Date().toISOString(),
                phrase: state.activePreset?.transliteration || 'Dhikr',
                arabic: state.activePreset?.arabic || '',
                count: target,
                target: target,
                sessionType: 'Round Completed',
                duration: '1m 30s',
              });
              // Log the completed round exactly once. Auto-loop advances
              // through the saved preset order and wraps after the last.
              state.currentCount = 0;
              if (state.autoLoopEnabled ?? state.autoLoop ?? true) {
                const presets = Array.isArray(state.presets) ? state.presets : [];
                const index = presets.findIndex(preset => preset.id === state.activePreset?.id);
                if (presets.length) state.activePreset = {...presets[(index + 1) % presets.length]};
              } else {
                state.roundComplete = true;
              }
            }
          })
        );
      },

      decrement: () =>
        set(
          produce((state) => {
            if (state.currentCount > 0) {
              state.currentCount -= 1;
              if (state.dailyTotal > 0) {
                state.dailyTotal -= 1;
              }
            }
          })
        ),

      reset: () =>
        set(
          produce((state) => {
            state.currentCount = 0;
            state.roundComplete = false;
            state.lapCount = 0;
          })
        ),

      toggleHaptics: () =>
        set(
          produce((state) => {
            state.hapticsEnabled = !state.hapticsEnabled;
          })
        ),

      toggleSound: () =>
        set(
          produce((state) => {
            state.soundEnabled = !state.soundEnabled;
          })
        ),

      toggleKeepAwake: () =>
        set(
          produce((state) => {
            const next = !(state.keepAwakeEnabled ?? state.keepAwake ?? true);
            state.keepAwakeEnabled = next;
            state.keepAwake = next;
          })
        ),

      toggleFullScreenTap: () =>
        set(
          produce((state) => {
            const next = !(state.fullScreenTapEnabled ?? state.fullScreenTap ?? false);
            state.fullScreenTapEnabled = next;
            state.fullScreenTap = next;
          })
        ),

      toggleVolumeKeys: () =>
        set(
          produce((state) => {
            const next = !(state.volumeKeysEnabled ?? state.volumeKeys ?? true);
            state.volumeKeysEnabled = next;
            state.volumeKeys = next;
          })
        ),

      toggleAutoLoop: () =>
        set(
          produce((state) => {
            const next = !(state.autoLoopEnabled ?? state.autoLoop ?? true);
            state.autoLoopEnabled = next;
            state.autoLoop = next;
            if (next && state.roundComplete) {
              state.roundComplete = false;
              const presets = Array.isArray(state.presets) ? state.presets : [];
              const index = presets.findIndex(preset => preset.id === state.activePreset?.id);
              if (presets.length) state.activePreset = {...presets[(index + 1) % presets.length]};
            }
          })
        ),

      setTarget: (targetNumber) =>
        set(
          produce((state) => {
            const num = Number(targetNumber) || 33;
            if (state.activePreset) {
              state.activePreset.target = num;
            }
          })
        ),

      setActivePreset: (preset) =>
        set(
          produce((state) => {
            state.activePreset = { ...preset };
            state.currentCount = 0;
            state.roundComplete = false;
            state.lapCount = 0;
          })
        ),

      updateActivePreset: (preset) =>
        set(
          produce((state) => {
            state.activePreset = {
              ...state.activePreset,
              ...preset,
              target: Number(preset.target) || state.activePreset?.target || 33,
            };
            state.currentCount = 0;
            state.roundComplete = false;
            state.lapCount = 0;
          })
        ),

      setDailyGoal: (goalNumber) =>
        set(
          produce((state) => {
            state.dailyGoal = Number(goalNumber) || 1000;
          })
        ),

      addHistoryLog: (log) =>
        set(
          produce((state) => {
            const entry = {
              id: uuidv4(),
              phrase: log?.phrase || state.activePreset?.transliteration || 'Dhikr',
              arabic: log?.arabic || state.activePreset?.arabic || '',
              count: log?.count || state.currentCount,
              target: log?.target || state.activePreset?.target || 33,
              date: log?.date || new Date().toISOString(),
              sessionType: log?.sessionType || 'Custom Session',
              duration: log?.duration || '2m 15s',
            };
            state.historyLogs.unshift(entry);
          })
        ),

      clearHistory: () =>
        set(
          produce((state) => {
            state.historyLogs = [];
            state.dailyTotal = 0;
            state.currentCount = 0;
            state.roundComplete = false;
            state.lapCount = 0;
          })
        ),
    }),
    {
      name: 'momentum-tasbeeh-storage',
      storage: createJSONStorage(() => getSafeStorage()),
      skipHydration: true,
      // Central startup coordinator confirms durable hydration; do not
      // queue a second whole-domain save from this callback.
    }
  )
);

// Legacy localStorage mirrors are never authoritative. runStorageMigration
// handles any one-time legacy import before coordinated IndexedDB hydration.
