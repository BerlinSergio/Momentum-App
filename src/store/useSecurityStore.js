import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const getFormattedTimestamp = (date = new Date()) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `Today at ${formattedHours}:${formattedMinutes} ${ampm}`;
};

export const LOCK_TIMING_OPTIONS = [
  {
    id: 'immediate',
    title: 'Immediately upon exiting',
    description: 'Maximum protection recommended',
    icon: 'bolt',
  },
  {
    id: '1min',
    title: 'After 1 minute in background',
    description: 'Balanced for multi-tasking',
    icon: 'timer',
  },
  {
    id: '5min',
    title: 'After 5 minutes in background',
    description: 'Convenient during continuous sessions',
    icon: 'schedule',
  },
  {
    id: 'onLock',
    title: 'When device locks',
    description: 'Matches OS display power-off',
    icon: 'phonelink_lock',
  },
];

const INITIAL_STATE = {
  isAppLockActive: false,
  biometricsEnabled: false,
  lockTiming: 'immediate', // 'immediate' | '1min' | '5min' | 'onLock'
  hideInMultitasking: true,
  lockFinance: true,
  lockReflections: true,
  allowQuickDhikr: true,
  passcodeType: 'pin', // 'pin' | 'alphanumeric'
  pin: '',
  hasPin: false,
  isLocked: false,
  alphanumeric: '',
  lastModified: 'Today at 07:42 AM',
  _hasHydrated: false,
};

const getInitialSecurityState = () => {
  if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem('momentum-security-storage');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.state) {
          const effectivePin = parsed.state.pin !== undefined && parsed.state.pin !== null ? String(parsed.state.pin) : '';
          const hasPin = parsed.state.hasPin !== undefined ? !!parsed.state.hasPin : !!(effectivePin && String(effectivePin).trim().length === 4);
          const isAppLockActive = !!parsed.state.isAppLockActive;
          const isLocked = isAppLockActive && hasPin;
          return {
            ...INITIAL_STATE,
            ...parsed.state,
            pin: effectivePin,
            hasPin,
            isLocked,
            _hasHydrated: false,
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse momentum-security-storage:', e);
    }
  }
  return INITIAL_STATE;
};

const syncSecurityStorage = (patch) => {
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem('momentum-security-storage');
      const parsed = raw ? JSON.parse(raw) : { state: {}, version: 0 };
      parsed.state = {
        ...(parsed.state || {}),
        ...patch,
      };
      localStorage.setItem('momentum-security-storage', JSON.stringify(parsed));
    }
  } catch (e) {
    console.warn('[Momentum Security] Direct localStorage sync error:', e);
  }
};

export const useSecurityStore = create(
  persist(
    (set) => ({
      ...getInitialSecurityState(),

      setHasHydrated: (hasHydrated) =>
        set({ _hasHydrated: !!hasHydrated }),

      setLocked: (locked) =>
        set((state) => {
          const next = typeof locked === 'function' ? locked(state.isLocked) : !!locked;
          return { isLocked: next };
        }),

      setAppLockActive: (isActive) =>
        set((state) => {
          const next = typeof isActive === 'function' ? isActive(state.isAppLockActive) : !!isActive;
          syncSecurityStorage({ isAppLockActive: next });
          return {
            isAppLockActive: next,
            isLocked: next && state.hasPin ? state.isLocked : false,
          };
        }),

      setBiometricsEnabled: (enabled) =>
        set((state) => {
          const next = typeof enabled === 'function' ? enabled(state.biometricsEnabled) : !!enabled;
          syncSecurityStorage({ biometricsEnabled: next });
          return { biometricsEnabled: next };
        }),

      setLockTiming: (timing) => {
        syncSecurityStorage({ lockTiming: timing });
        return set({ lockTiming: timing });
      },

      setHideInMultitasking: (hide) =>
        set((state) => {
          const next = typeof hide === 'function' ? hide(state.hideInMultitasking) : !!hide;
          syncSecurityStorage({ hideInMultitasking: next });
          return { hideInMultitasking: next };
        }),

      setGuardrail: (key, value) =>
        set((state) => {
          const next = typeof value === 'function' ? value(state[key]) : !!value;
          syncSecurityStorage({ [key]: next });
          return { [key]: next };
        }),

      setLockFinance: (lock) =>
        set((state) => {
          const next = typeof lock === 'function' ? lock(state.lockFinance) : !!lock;
          syncSecurityStorage({ lockFinance: next });
          return { lockFinance: next };
        }),

      setLockReflections: (lock) =>
        set((state) => {
          const next = typeof lock === 'function' ? lock(state.lockReflections) : !!lock;
          syncSecurityStorage({ lockReflections: next });
          return { lockReflections: next };
        }),

      setAllowQuickDhikr: (allow) =>
        set((state) => {
          const next = typeof allow === 'function' ? allow(state.allowQuickDhikr) : !!allow;
          syncSecurityStorage({ allowQuickDhikr: next });
          return { allowQuickDhikr: next };
        }),

      // PIN mutators explicitly using set({ pin: newPin }) + immediate storage backup
      setPin: (newPin) => {
        const pinStr = String(newPin);
        const hasPin = pinStr.trim().length === 4;
        set({
          pin: pinStr,
          hasPin,
          passcodeType: 'pin',
          lastModified: getFormattedTimestamp(),
        });
        try {
          if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem('momentum-security-storage');
            const parsed = raw ? JSON.parse(raw) : { state: {}, version: 0 };
            parsed.state = {
              ...(parsed.state || {}),
              pin: pinStr,
              hasPin,
              passcodeType: 'pin',
              lastModified: getFormattedTimestamp(),
            };
            localStorage.setItem('momentum-security-storage', JSON.stringify(parsed));
          }
        } catch (e) {
          console.warn('[Momentum Security] Direct localStorage sync error:', e);
        }
      },

      changePin: (newPin) => {
        const pinStr = String(newPin);
        const hasPin = pinStr.trim().length === 4;
        set({
          pin: pinStr,
          hasPin,
          passcodeType: 'pin',
          lastModified: getFormattedTimestamp(),
        });
        try {
          if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem('momentum-security-storage');
            const parsed = raw ? JSON.parse(raw) : { state: {}, version: 0 };
            parsed.state = {
              ...(parsed.state || {}),
              pin: pinStr,
              hasPin,
              passcodeType: 'pin',
              lastModified: getFormattedTimestamp(),
            };
            localStorage.setItem('momentum-security-storage', JSON.stringify(parsed));
          }
        } catch (e) {
          console.warn('[Momentum Security] Direct localStorage sync error:', e);
        }
      },

      updatePin: (newPin) => {
        const pinStr = String(newPin);
        const hasPin = pinStr.trim().length === 4;
        set({
          pin: pinStr,
          hasPin,
          passcodeType: 'pin',
          lastModified: getFormattedTimestamp(),
        });
        try {
          if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem('momentum-security-storage');
            const parsed = raw ? JSON.parse(raw) : { state: {}, version: 0 };
            parsed.state = {
              ...(parsed.state || {}),
              pin: pinStr,
              hasPin,
              passcodeType: 'pin',
              lastModified: getFormattedTimestamp(),
            };
            localStorage.setItem('momentum-security-storage', JSON.stringify(parsed));
          }
        } catch (e) {
          console.warn('[Momentum Security] Direct localStorage sync error:', e);
        }
      },

      setAlphanumeric: (newPasscode) =>
        set({
          alphanumeric: String(newPasscode),
          passcodeType: 'alphanumeric',
          lastModified: getFormattedTimestamp(),
        }),

      updatePreferences: (draft) =>
        set((state) => {
          const patch = typeof draft === 'function' ? draft(state) : draft;
          const next = {
            ...patch,
            lastModified: getFormattedTimestamp(),
          };
          syncSecurityStorage(next);
          return next;
        }),

      resetToDefaults: () =>
        set({
          ...INITIAL_STATE,
          _hasHydrated: true,
          lastModified: getFormattedTimestamp(),
        }),
    }),
    {
      name: 'momentum-security-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      merge: (persistedState, currentState) => {
        const effectivePin = persistedState?.pin !== undefined && persistedState?.pin !== null ? String(persistedState.pin) : currentState.pin;
        const hasPin = persistedState?.hasPin !== undefined ? !!persistedState.hasPin : !!(effectivePin && String(effectivePin).trim().length === 4);
        const isAppLockActive = persistedState?.isAppLockActive !== undefined ? !!persistedState.isAppLockActive : currentState.isAppLockActive;
        const isLocked = isAppLockActive && hasPin ? (currentState.isLocked ?? true) : false;
        return {
          ...currentState,
          ...(persistedState || {}),
          pin: effectivePin,
          hasPin,
          isAppLockActive,
          isLocked,
          _hasHydrated: true,
        };
      },
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);

export default useSecurityStore;
