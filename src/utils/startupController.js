import { useProfileStore } from '../store/useProfileStore';
import { useSecurityStore } from '../store/useSecurityStore';
import { useFinanceStore } from '../store/useFinanceStore';
import { useNotesStore } from '../store/useNotesStore';
import { useTaskStore } from '../store/useTaskStore';
import { useRoutineStore } from '../store/useRoutineStore';
import { useCalendarStore } from '../store/useCalendarStore';
import { useTasbeehStore } from '../store/useTasbeehStore';
import { usePrayerStore } from '../store/usePrayerStore';
import { useThemeStore } from '../store/useThemeStore';
import { sanitizeAndHydrateWallpaperStorage } from './wallpaperStorage.js';
import { useLocationStore } from '../store/useLocationStore';
import { useNavigationStore } from '../store/useNavigationStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useTimeStore } from '../store/useTimeStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { runStorageMigration } from '../storage/index.js';
import { migrateLegacyPin } from './credentialService.js';
import { openAppDB, getCommittedStoreRecord } from '../storage/db.js';
import { coordinateHydration } from './hydrationCoordinator.js';
import { recoverInterruptedRestore } from './crossDatabaseRestore.js';

/**
 * Momentum Central Startup & Onboarding Controller
 * Coordinates store rehydration, distinguishes fresh vs returning vs legacy installations,
 * and determines the authoritative startup destination with zero UI flicker.
 */

export const ONBOARDING_ROUTES = new Set([
  'personal_setup_dark_mode',
  'personal_setup_light_mode',
  'pin_setup_change_dark_mode',
  'pin_setup_change_light_mode',
  'splash_screen_dark_mode',
  'splash_screen_light_mode',
]);

/**
 * Returns true if the screen is part of the onboarding sequence
 */
export function isOnboardingRoute(screen) {
  if (!screen) return false;
  return ONBOARDING_ROUTES.has(screen) || screen.includes('personal_setup') || screen.includes('splash_screen');
}

/**
 * Hydrate authoritative IndexedDB state without marking stores ready early.
 * Timed-out, blocked, or failed storage leaves startup in a safe error state.
 */
export async function hydrateAllStores(timeoutMs = 12000) {
  const stores = [
    ['profile', useProfileStore], ['security', useSecurityStore],
    ['finance', useFinanceStore], ['theme', useThemeStore],
    ['routine', useRoutineStore], ['task', useTaskStore],
    ['notes', useNotesStore], ['calendar', useCalendarStore],
    ['tasbeeh', useTasbeehStore], ['prayer', usePrayerStore],
    ['location', useLocationStore], ['navigation', useNavigationStore],
    ['settings', useSettingsStore], ['time', useTimeStore],
    ['notification', useNotificationStore],
  ].map(([name, store]) => ({ name, store }));

  const result = await coordinateHydration({
    stores,
    timeoutMs,
    prepare: async () => {
      // Fail closed: volatile memory is not a replacement for IndexedDB.
      if (!(await openAppDB())) {
        throw new Error('[Momentum Startup] IndexedDB is unavailable; your data is not safely loaded');
      }

      // A crash between wallpaper and main-DB commits leaves a durable
      // recovery journal. Reconcile that journal BEFORE hydrating user stores.
      await recoverInterruptedRestore();

      // Migration is the single authoritative legacy import path.
      const migration = await runStorageMigration({
        migrateCredential: () => migrateLegacyPin({ allowLegacyImport: true }),
      });
      if (!migration?.success) {
        throw new Error('[Momentum Startup] Legacy data migration was not confirmed successful');
      }

      // The durable schema marker is a one-time trust boundary: never
      // re-import a plaintext PIN from a stale localStorage mirror on a
      // subsequent startup. Keep existing verifiers and sanitize old mirrors.
      const credentialMigration = await migrateLegacyPin({
        allowLegacyImport: false,
      });
      if (credentialMigration?.error) {
        throw new Error('[Momentum Startup] Legacy credential migration was not safely committed');
      }
    },
  });

  await sanitizeAndHydrateWallpaperStorage(useThemeStore);

  // Complete legacy onboarding only after the profile write is durable,
  // before the splash is permitted to expose the selected route.
  if (detectLegacyUser()) {
    await useProfileStore.getState().updateProfile({
      setupCompleted: true,
      onboardingStep: 'completed',
      isLegacyMigrated: true,
    });
    const row = await getCommittedStoreRecord('momentum-profile-storage');
    const value = typeof row?.value === 'string' ? JSON.parse(row.value) : row?.value;
    if (value?.state?.setupCompleted !== true || value?.state?.onboardingStep !== 'completed') {
      throw new Error('[Momentum Startup] Legacy onboarding completion was not durably committed');
    }
  }

  // After every store (including TimeStore) is durably hydrated, refresh
  // today's date and recompute Routine's local derived streak/completion
  // display. The guarded Routine projection ignores these derived fields:
  // startup/day rollover must not clobber another tab's completion records.
  useTimeStore.getState().refreshTime?.();
  useRoutineStore.getState().performDayRollover?.(
    useTimeStore.getState().currentDateKey
  );
  return result;
}

/**
 * Detect whether the current installation is a returning legacy user
 * who used Momentum before the onboarding system was connected.
 */
export function detectLegacyUser() {
  const profile = useProfileStore.getState();

  // If already marked as completed or actively in onboarding flow, no legacy migration needed
  if (
    profile.setupCompleted === true ||
    profile.onboardingStep === 'completed' ||
    profile.onboardingStep === 'personal_setup' ||
    profile.onboardingStep === 'security_setup'
  ) {
    return false;
  }

  // 1. Check in-memory stores for meaningful user records
  const hasNotes = useNotesStore.getState().notes?.length > 0;
  const hasTasks = useTaskStore.getState().tasks?.length > 0;
  const hasRoutines = useRoutineStore.getState().routines?.length > 0;
  const finance = useFinanceStore.getState();
  const hasFinance = (finance.transactions?.length > 0) ||
                     (finance.incomes?.length > 0) ||
                     (finance.accounts?.length > 0);
  const hasCalendar = useCalendarStore.getState().events?.length > 0;
  const hasDhikr = useTasbeehStore.getState().historyLogs?.length > 0;
  const hasCustomName = Boolean(profile.fullName && profile.fullName.trim().length > 0 && profile.fullName.trim() !== 'User');
  const security = useSecurityStore.getState();
  const hasPin = security.hasPin === true;
  // Navigation history is not user data: startup itself creates route entries.

  // Migration already imported legitimate legacy records before hydration.
  // Never promote a stale localStorage mirror into an onboarding decision.
  return Boolean(hasNotes || hasTasks || hasRoutines || hasFinance || hasCalendar ||
    hasDhikr || hasCustomName || hasPin);
}

/**
 * Determine the installation status and target startup screen
 *
 * @param {Object} options
 * @param {boolean} [options.isDark=true] - Theme mode
 * @param {string} [options.requestedScreen=null] - Deep-linked or URL requested screen
 * @returns {{ status: string, targetScreen: string }}
 */
export function getStartupDecision({ isDark = true, requestedScreen = null } = {}) {
  const profile = useProfileStore.getState();

  // 1. Returning user with completed onboarding
  if (profile.setupCompleted === true || profile.onboardingStep === 'completed') {
    let screen = isDark ? 'home_dashboard_dark_mode' : 'home_dashboard_light_mode';
    if (requestedScreen && !isOnboardingRoute(requestedScreen)) {
      screen = requestedScreen;
    }
    return {
      status: 'ready',
      targetScreen: screen,
    };
  }

  // 2. User was interrupted on the optional security step
  if (profile.onboardingStep === 'security_setup') {
    return {
      status: 'security_setup_optional',
      targetScreen: isDark ? 'pin_setup_change_dark_mode' : 'pin_setup_change_light_mode',
    };
  }

  // 3. Truly brand-new installation or personal setup in-progress
  return {
    status: 'onboarding_required',
    targetScreen: isDark ? 'personal_setup_dark_mode' : 'personal_setup_light_mode',
  };
}
