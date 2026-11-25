import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createIndexedDbStorage } from '../storage/index.js';
import {
  createCredential, changeCredential, removeCredential,
} from '../utils/credentialService.js';

const sanitizeSecurityPayload = (payload) => {
  if (!payload) return payload;
  try {
    let parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;
    if (parsed?.state) {
      const hasPin = Boolean(
        parsed.state.hasPin ||
        (parsed.state.pin && String(parsed.state.pin).trim().length === 4)
      );
      parsed = {
        ...parsed,
        state: {
          ...parsed.state,
          pin: '',
          alphanumeric: '',
          hasPin,
        },
      };
    }
    return typeof payload === 'string' ? JSON.stringify(parsed) : parsed;
  } catch {
    return payload;
  }
};

const rawSecurityStorage = createIndexedDbStorage({
  legacyLocalStorageKey: 'momentum-security-storage',
  mirrorToLocalStorage: false,
  optimisticDomains: ['momentum-security-storage'],
});

const securityStorage = {
  getItem: async (name) => {
    // Migration runs before rehydration; sanitize any malformed/legacy
    // ordinary security state again before it is exposed to Zustand.
    const value = await rawSecurityStorage.getItem(name);
    return value == null ? value : sanitizeSecurityPayload(value);
  },
  setItem: async (name, value) => {
    const sanitized = sanitizeSecurityPayload(value);
    return rawSecurityStorage.setItem(name, sanitized);
  },
  removeItem: async (name) => {
    return rawSecurityStorage.removeItem(name);
  },
};
const getSafeStorage = () => securityStorage;

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
  pin: '', // Never stored in plaintext
  hasPin: false,
  isLocked: false,
  alphanumeric: '',
  lastModified: 'Today at 07:42 AM',
  _hasHydrated: false,
};

// Credentials are stored only as an independently verified PBKDF2 record.
// This store holds metadata/preferences and never eagerly trusts a mirror.
const getInitialSecurityState = () => ({ ...INITIAL_STATE });

// Refresh the committed metadata and CAS baseline after an atomic transition.
async function finishCredentialTransition(result) {
  if (!result.success) return result;
  try {
    await useSecurityStore.persist.rehydrate();
    useSecurityStore.getState().setHasHydrated(true);
    return result;
  } catch {
    return {success:false, committed:true, error:'PIN committed; reload to refresh security settings.'};
  }
}
async function setFirstPinSafely(newPin) {
  return finishCredentialTransition(await createCredential(newPin));
}
async function changePinSafely(currentPin, newPin) {
  return finishCredentialTransition(await changeCredential(currentPin, newPin));
}
async function removePinSafely(currentPin) {
  return finishCredentialTransition(await removeCredential(currentPin));
}

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

      setHasPin: () => ({success:false, error:'Use an authenticated PIN operation.'}),

      setAppLockActive: (isActive) =>
        set((state) => {
          const next = typeof isActive === 'function' ? isActive(state.isAppLockActive) : !!isActive;
          
          return {
            isAppLockActive: next,
            isLocked: next && state.hasPin ? state.isLocked : false,
          };
        }),

      setBiometricsEnabled: (enabled) =>
        set((state) => {
          const next = typeof enabled === 'function' ? enabled(state.biometricsEnabled) : !!enabled;
          
          return { biometricsEnabled: next };
        }),

      setLockTiming: (timing) => {
        
        return set({ lockTiming: timing });
      },

      setHideInMultitasking: (hide) =>
        set((state) => {
          const next = typeof hide === 'function' ? hide(state.hideInMultitasking) : !!hide;
          
          return { hideInMultitasking: next };
        }),

      setGuardrail: (key, value) =>
        set((state) => {
          const next = typeof value === 'function' ? value(state[key]) : !!value;
          
          return { [key]: next };
        }),

      setLockFinance: (lock) =>
        set((state) => {
          const next = typeof lock === 'function' ? lock(state.lockFinance) : !!lock;
          
          return { lockFinance: next };
        }),

      setLockReflections: (lock) =>
        set((state) => {
          const next = typeof lock === 'function' ? lock(state.lockReflections) : !!lock;
          
          return { lockReflections: next };
        }),

      setAllowQuickDhikr: (allow) =>
        set((state) => {
          const next = typeof allow === 'function' ? allow(state.allowQuickDhikr) : !!allow;
          
          return { allowQuickDhikr: next };
        }),

      // Legacy PIN API is asynchronous and fail-closed: verifier first,
      // metadata only after successful cryptographic storage.
      // Callers MUST await the returned result.
      setPin: (newPin) => setFirstPinSafely(newPin),
      changePin: (currentPin, newPin) => changePinSafely(currentPin, newPin),
      updatePin: (currentPin, newPin) => changePinSafely(currentPin, newPin),
      removePin: (currentPin) => removePinSafely(currentPin),

      setAlphanumeric: () =>
        set({
          alphanumeric: '',
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
          
          return next;
        }),

      resetToDefaults: () =>
        set((state) => ({
          ...INITIAL_STATE,
          hasPin: state.hasPin,
          isAppLockActive: state.isAppLockActive,
          isLocked: state.isLocked,
          _hasHydrated: true,
          lastModified: getFormattedTimestamp(),
        })),
    }),
    }),
    {
      name: 'momentum-security-storage',
      storage: createJSONStorage(() => getSafeStorage()),
      skipHydration: true,
      merge: (persistedState, currentState) => {
        const hasPin = persistedState?.hasPin !== undefined
          ? !!persistedState.hasPin
          : (currentState.hasPin || (persistedState?.pin && String(persistedState.pin).trim().length === 4));
        const isAppLockActive = persistedState?.isAppLockActive !== undefined
          ? !!persistedState.isAppLockActive
          : currentState.isAppLockActive;
        // A returning tab with an enabled PIN lock starts LOCKED, regardless
        // of a stale local unlocked flag or previous in-memory session.
        const isLocked = Boolean(isAppLockActive && hasPin);
        return {
          ...currentState,
          ...(persistedState || {}),
          pin: '',
          alphanumeric: '',
          hasPin,
          isAppLockActive,
          isLocked,
          _hasHydrated: false,
        };
      },
      // The central StartupController owns the post-migration readiness flag.
      // Never trigger a second whole-state write during rehydration.
    }
  )
);

export default useSecurityStore;
