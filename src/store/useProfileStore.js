import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createIndexedDbStorage } from '../storage/index.js';

const profileStorage = createIndexedDbStorage({ legacyLocalStorageKey: 'momentum-profile-storage' });
const getSafeProfileStorage = () => profileStorage;

export const DEFAULT_PROFILE = {
  fullName: '',
  email: '',
  avatar: null,
  currency: 'AFN / ؋ (Afghan Afghani)',
  timezone: 'Asia/Kabul (UTC+4:30)',
  city: 'Kabul, Afghanistan',
  calculationConvention: 'Univ. of Islamic Sciences, Karachi',
  hijriShamsi: true,
  lastSynced: null,
  setupCompleted: false,
  onboardingStep: 'not_started', // 'not_started' | 'personal_setup' | 'security_setup' | 'completed'
  isLegacyMigrated: false,
};

const getInitialProfileState = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const raw = window.localStorage.getItem('momentum-profile-storage');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.state) {
          return {
            ...DEFAULT_PROFILE,
            ...parsed.state,
            _hasHydrated: true,
          };
        }
      }
    } catch (e) {
      console.warn('Failed to parse momentum-profile-storage:', e);
    }
  } else if (typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem('momentum-profile-storage');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.state) {
          return {
            ...DEFAULT_PROFILE,
            ...parsed.state,
            _hasHydrated: true,
          };
        }
      }
    } catch (_err) {
      void _err;
    }
  }
  return {
    ...DEFAULT_PROFILE,
    _hasHydrated: true,
  };
};

const syncProfileToLocalStorage = (patch) => {
  try {
    const storageObj = typeof window !== 'undefined' && window.localStorage ? window.localStorage : (typeof localStorage !== 'undefined' ? localStorage : null);
    if (storageObj) {
      const raw = storageObj.getItem('momentum-profile-storage');
      const parsed = raw ? JSON.parse(raw) : { state: {}, version: 0 };
      parsed.state = {
        ...(parsed.state || {}),
        ...patch,
      };
      const serialized = JSON.stringify(parsed);
      storageObj.setItem('momentum-profile-storage', serialized);
      profileStorage.setItem('momentum-profile-storage', serialized).catch((err) => {
        console.warn('[Momentum Profile] IndexedDB sync error:', err);
      });
    }
  } catch (e) {
    console.warn('[Momentum Profile] Direct localStorage sync error:', e);
  }
};

export const useProfileStore = create(
  persist(
    (set, get) => ({
      ...getInitialProfileState(),

      updateProfile: (updates) => {
        set((state) => {
          const next = { ...state, ...updates };
          syncProfileToLocalStorage(next);
          return next;
        });
      },

      setAvatar: (avatar) => {
        get().updateProfile({ avatar });
      },

      removeAvatar: () => {
        get().updateProfile({ avatar: null });
      },

      resetProfile: () => {
        set(() => {
          const empty = { ...DEFAULT_PROFILE, _hasHydrated: true };
          syncProfileToLocalStorage(empty);
          return empty;
        });
      },

      completeSetup: () => {
        get().updateProfile({
          setupCompleted: true,
          onboardingStep: 'completed',
        });
      },

      setOnboardingStep: (step) => {
        get().updateProfile({ onboardingStep: step });
      },

      setHasHydrated: (val) => set({ _hasHydrated: val }),
    }),
    {
      name: 'momentum-profile-storage',
      storage: createJSONStorage(getSafeProfileStorage),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);

// Eager synchronous rehydration
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    const raw = window.localStorage.getItem('momentum-profile-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state) {
        useProfileStore.setState({
          ...parsed.state,
          _hasHydrated: true,
        });
      }
    }
  } catch (e) {
    console.warn('Failed to rehydrate profile store:', e);
  }
} else if (typeof localStorage !== 'undefined') {
  try {
    const raw = localStorage.getItem('momentum-profile-storage');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state) {
        useProfileStore.setState({
          ...parsed.state,
          _hasHydrated: true,
        });
      }
    }
  } catch (_err) {
    void _err;
  }
}

export default useProfileStore;
