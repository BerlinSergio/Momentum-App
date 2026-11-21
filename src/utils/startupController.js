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
import { useLocationStore } from '../store/useLocationStore';
import { useNavigationStore } from '../store/useNavigationStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { useTimeStore } from '../store/useTimeStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { runStorageMigration } from '../storage/index.js';
import { migrateLegacyPin } from './credentialService.js';

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
 * Coordinate hydration of all persistent stores with a safety timeout
 */
export async function hydrateAllStores(timeoutMs = 2500) {
  // 1. Run safe, non-destructive migration from legacy localStorage to IndexedDB
  try {
    await runStorageMigration();
  } catch (migErr) {
    console.warn('[StartupController] Storage migration warning:', migErr);
  }

  // 1b. Run safe migration from legacy plaintext PIN to PBKDF2 verifier
  try {
    await migrateLegacyPin();
  } catch (credErr) {
    console.warn('[StartupController] Credential migration warning:', credErr);
  }

  // 2. Hydrate all persistent stores in parallel
  const hydrationPromise = Promise.all([
    useProfileStore.persist?.rehydrate?.(),
    useSecurityStore.persist?.rehydrate?.(),
    useFinanceStore.persist?.rehydrate?.(),
    useThemeStore.persist?.rehydrate?.(),
    useRoutineStore.persist?.rehydrate?.(),
    useTaskStore.persist?.rehydrate?.(),
    useNotesStore.persist?.rehydrate?.(),
    useCalendarStore.persist?.rehydrate?.(),
    useTasbeehStore.persist?.rehydrate?.(),
    usePrayerStore.persist?.rehydrate?.(),
    useLocationStore.persist?.rehydrate?.(),
    useNavigationStore.persist?.rehydrate?.(),
    useSettingsStore.persist?.rehydrate?.(),
    useTimeStore.persist?.rehydrate?.(),
    useNotificationStore.persist?.rehydrate?.(),
  ]);

  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, timeoutMs));

  try {
    await Promise.race([hydrationPromise, timeoutPromise]);
  } catch (err) {
    console.warn('[StartupController] Hydration race error:', err);
  } finally {
    useProfileStore.getState().setHasHydrated?.(true);
    useSecurityStore.getState().setHasHydrated?.(true);
    useFinanceStore.getState().setHasHydrated?.(true);
    useRoutineStore.getState().setHasHydrated?.(true);
    useTaskStore.getState().setHasHydrated?.(true);
    useNotesStore.getState().setHasHydrated?.(true);
    useCalendarStore.getState().setHasHydrated?.(true);
    useTasbeehStore.getState().setHasHydrated?.(true);
    usePrayerStore.getState().setHasHydrated?.(true);
    useLocationStore.getState().setHasHydrated?.(true);
    useNavigationStore.getState().setHasHydrated?.(true);
    useTimeStore.getState().setHasHydrated?.(true);
    useTimeStore.getState().refreshTime?.();
  }
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
  const hasPin = Boolean(security.hasPin || (security.pin && String(security.pin).trim().length === 4));
  const hasNavHistory = useNavigationStore.getState().historyStack?.length > 0;

  let isLegacy = hasNotes || hasTasks || hasRoutines || hasFinance || hasCalendar || hasDhikr || hasCustomName || hasPin || hasNavHistory;

  // 2. Check localStorage directly as fallback
  if (!isLegacy && typeof localStorage !== 'undefined') {
    try {
      const checkKey = (key) => {
        const raw = localStorage.getItem(key);
        if (!raw) return false;
        try {
          const parsed = JSON.parse(raw);
          const state = parsed?.state;
          if (!state) return false;
          if (Array.isArray(state.notes) && state.notes.length > 0) return true;
          if (Array.isArray(state.tasks) && state.tasks.length > 0) return true;
          if (Array.isArray(state.routines) && state.routines.length > 0) return true;
          if (Array.isArray(state.transactions) && state.transactions.length > 0) return true;
          if (Array.isArray(state.incomes) && state.incomes.length > 0) return true;
          if (Array.isArray(state.accounts) && state.accounts.length > 0) return true;
          if (Array.isArray(state.events) && state.events.length > 0) return true;
          if (Array.isArray(state.historyLogs) && state.historyLogs.length > 0) return true;
          if (state.fullName && state.fullName.trim() !== '' && state.fullName.trim() !== 'User') return true;
          if (state.hasPin || (state.pin && String(state.pin).trim().length === 4)) return true;
          if (Array.isArray(state.historyStack) && state.historyStack.length > 0) return true;
        } catch (_parseErr) {
          void _parseErr;
        }
        return false;
      };

      isLegacy = checkKey('momentum-notes-storage') ||
                 checkKey('momentum-task-storage') ||
                 checkKey('momentum-tasks-storage') ||
                 checkKey('momentum-routine-storage') ||
                 checkKey('momentum-finance-storage') ||
                 checkKey('momentum-calendar-storage') ||
                 checkKey('momentum-tasbeeh-storage') ||
                 checkKey('momentum-profile-storage') ||
                 checkKey('momentum-security-storage') ||
                 checkKey('momentum-navigation-storage');
    } catch (_storageErr) {
      void _storageErr;
    }
  }

  if (isLegacy) {
    // Non-destructively migrate legacy user
    useProfileStore.getState().updateProfile({
      setupCompleted: true,
      onboardingStep: 'completed',
      isLegacyMigrated: true,
    });
    return true;
  }

  return false;
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

  // 2. Check for legacy user migration
  if (detectLegacyUser()) {
    let screen = isDark ? 'home_dashboard_dark_mode' : 'home_dashboard_light_mode';
    if (requestedScreen && !isOnboardingRoute(requestedScreen)) {
      screen = requestedScreen;
    }
    return {
      status: 'ready',
      targetScreen: screen,
    };
  }

  // 3. User was interrupted on the optional security step
  if (profile.onboardingStep === 'security_setup') {
    return {
      status: 'security_setup_optional',
      targetScreen: isDark ? 'pin_setup_change_dark_mode' : 'pin_setup_change_light_mode',
    };
  }

  // 4. Truly brand-new installation or personal setup in-progress
  return {
    status: 'onboarding_required',
    targetScreen: isDark ? 'personal_setup_dark_mode' : 'personal_setup_light_mode',
  };
}
