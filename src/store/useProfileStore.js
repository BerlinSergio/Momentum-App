import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createIndexedDbStorage } from '../storage/index.js';

const profileStorage = createIndexedDbStorage({
  legacyLocalStorageKey: 'momentum-profile-storage',
  optimisticDomains: ['momentum-profile-storage'],
});
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

// Never restore profile/onboarding from an unverified localStorage mirror.
// StartupController performs crash recovery and legacy migration before
// the guarded IndexedDB adapter reads the committed profile record.
const getInitialProfileState = () => ({
  ...DEFAULT_PROFILE,
  _hasHydrated: false,
});

export const useProfileStore = create(
  persist(
    (set, get) => ({
      ...getInitialProfileState(),

      updateProfile: (updates) => {
        // Persist once through Zustand, not a second concurrent write
        // composed from stale localStorage.
        return set(updates);
      },

      setAvatar: (avatar) => {
        get().updateProfile({ avatar });
      },

      removeAvatar: () => {
        get().updateProfile({ avatar: null });
      },

      resetProfile: () => {
        // Keep the readiness bit unchanged. A profile reset is a guarded
        // user-state mutation, not permission to bypass startup hydration.
        set((state) => ({ ...DEFAULT_PROFILE, _hasHydrated: state._hasHydrated }));
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
      skipHydration: true, // Coordinated migration/recovery precedes this read.
      // StartupController marks this store ready once the IDB read commits.
    }
  )
);

// The localStorage mirror is a post-commit cache, never an import source
// except during the audited one-time runStorageMigration().

export default useProfileStore;
