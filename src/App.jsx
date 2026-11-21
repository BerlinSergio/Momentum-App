import { useTranslation } from 'react-i18next';
import { useNavigationStore } from './store/useNavigationStore';
import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WallpaperProvider } from './context/WallpaperContext';
import GlobalBackground from './components/GlobalBackground';
import WallpaperSelector from './components/WallpaperSelector';
import SplashScreen from './SplashScreen';
import AboutMomentumDarkMode from './AboutMomentumDarkMode';
import AboutMomentumLightMode from './AboutMomentumLightMode';
import AddEditExpenseDarkMode from './AddEditExpenseDarkMode';
import AddEditExpenseLightMode from './AddEditExpenseLightMode';
import AddEditIncomeDarkMode from './AddEditIncomeDarkMode';
import AddEditIncomeLightMode from './AddEditIncomeLightMode';
import AddEditRoutineDarkMode from './AddEditRoutineDarkMode';
import AddEditRoutineLightMode from './AddEditRoutineLightMode';
import AddEditTaskDarkMode from './AddEditTaskDarkMode';
import AddEditTaskLightMode from './AddEditTaskLightMode';
import AfghanSolarHijriShamsiCalendarDarkMode from './AfghanSolarHijriShamsiCalendarDarkMode';
import AfghanSolarHijriShamsiCalendarLightMode from './AfghanSolarHijriShamsiCalendarLightMode';
import AppearanceDarkMode from './AppearanceDarkMode';
import AppearanceLightMode from './AppearanceLightMode';
import AppLockDarkMode from './AppLockDarkMode';
import AppLockLightMode from './AppLockLightMode';
import AppLockGuard from './components/AppLockGuard';
import BackgroundPreviewBlurControlDarkMode from './BackgroundPreviewBlurControlDarkMode';
import BackgroundPreviewBlurControlLightMode from './BackgroundPreviewBlurControlLightMode';
import BackupRestoreDarkMode from './BackupRestoreDarkMode';
import BackupRestoreLightMode from './BackupRestoreLightMode';
import BackgroundWallpaperLibraryDarkMode from './BackgroundWallpaperLibraryDarkMode';
import BackgroundWallpaperLibraryLightMode from './BackgroundWallpaperLibraryLightMode';
import BiometricSettingsDarkMode from './BiometricSettingsDarkMode';
import BiometricSettingsLightMode from './BiometricSettingsLightMode';
import CalendarsMainDarkMode from './CalendarsMainDarkMode';
import CalendarsMainLightMode from './CalendarsMainLightMode';
import CitySelectionDarkMode from './CitySelectionDarkMode';
import CitySelectionLightMode from './CitySelectionLightMode';
import EditProfileDarkMode from './EditProfileDarkMode';
import EditProfileLightMode from './EditProfileLightMode';
import FinanceExpenseTrackerDarkMode from './FinanceExpenseTrackerDarkMode';
import FinanceExpenseTrackerLightMode from './FinanceExpenseTrackerLightMode';
import GregorianCalendarDarkMode from './GregorianCalendarDarkMode';
import GregorianCalendarLightMode from './GregorianCalendarLightMode';
import HomeDashboardDarkMode from './HomeDashboardDarkMode';
import HomeDashboardLightMode from './HomeDashboardLightMode';
import IslamicHijriCalendarDarkMode from './IslamicHijriCalendarDarkMode';
import IslamicHijriCalendarLightMode from './IslamicHijriCalendarLightMode';
import LanguageSettingsDarkMode from './LanguageSettingsDarkMode';
import LanguageSettingsLightMode from './LanguageSettingsLightMode';
import LongNoteEditorDarkMode from './LongNoteEditorDarkMode';
import LongNoteEditorLightMode from './LongNoteEditorLightMode';
import MoreDarkMode from './MoreDarkMode';
import MoreLightMode from './MoreLightMode';
import NewEditTasbeehDarkMode from './NewEditTasbeehDarkMode';
import NewEditTasbeehLightMode from './NewEditTasbeehLightMode';
import NotesMainDarkMode from './NotesMainDarkMode';
import NotesMainLightMode from './NotesMainLightMode';
import NoteMediaAttachmentViewerDarkMode from './NoteMediaAttachmentViewerDarkMode';
import NoteMediaAttachmentViewerLightMode from './NoteMediaAttachmentViewerLightMode';
import NotificationsSettingsDarkMode from './NotificationsSettingsDarkMode';
import NotificationsSettingsLightMode from './NotificationsSettingsLightMode';
import PersonalSetupDarkMode from './PersonalSetupDarkMode';
import PersonalSetupLightMode from './PersonalSetupLightMode';
import PinSetupChangeDarkMode from './PinSetupChangeDarkMode';
import PinSetupChangeLightMode from './PinSetupChangeLightMode';
import PrayerTimesDarkMode from './PrayerTimesDarkMode';
import PrayerTimesLightMode from './PrayerTimesLightMode';
import QuickNoteEditorDarkMode from './QuickNoteEditorDarkMode';
import QuickNoteEditorLightMode from './QuickNoteEditorLightMode';
import SettingsProfileDarkMode from './SettingsProfileDarkMode';
import SettingsProfileLightMode from './SettingsProfileLightMode';
import SplashScreenDarkMode from './SplashScreenDarkMode';
import SplashScreenLightMode from './SplashScreenLightMode';
import TasbeehHistoryDarkMode from './TasbeehHistoryDarkMode';
import TasbeehHistoryLightMode from './TasbeehHistoryLightMode';
import TasbeehMainDarkMode from './TasbeehMainDarkMode';
import TasbeehMainLightMode from './TasbeehMainLightMode';
import TasbeehSettingsDarkMode from './TasbeehSettingsDarkMode';
import TasbeehSettingsLightMode from './TasbeehSettingsLightMode';
import TasksRemindersDarkMode from './TasksRemindersDarkMode';
import TasksRemindersLightMode from './TasksRemindersLightMode';
import TaskDetailsDarkMode from './TaskDetailsDarkMode';
import TaskDetailsLightMode from './TaskDetailsLightMode';
import RoutineDetailsDarkMode from './RoutineDetailsDarkMode';
import RoutineDetailsLightMode from './RoutineDetailsLightMode';
import TimezoneSelectionDarkMode from './TimezoneSelectionDarkMode';
import TimezoneSelectionLightMode from './TimezoneSelectionLightMode';
import BottomNavBar from './components/BottomNavBar';
import DesktopSidebar from './components/DesktopSidebar';
import DevScreenNavigatorModal from './components/dev/DevScreenNavigatorModal';
import { PageTransition } from './motion/index.js';
import { ToastViewport, toast, useToastStore } from './components/ui/toast/index.js';
import { ConfirmationViewport } from './components/ui/confirmation/index.js';


import { ThemeProvider, useTheme } from './context/ThemeContext';
import { themedScreenId } from './utils/themeNavigation.js';

import { useThemeStore } from './store/useThemeStore';
import { useNotesStore } from './store/useNotesStore';
import useSecurityStore from './store/useSecurityStore';
import { useProfileStore } from './store/useProfileStore';
import { useLocaleStore } from './store/useLocaleStore';
import { useSettingsStore } from './store/useSettingsStore';
import { useNotificationStore } from './store/useNotificationStore';
import { useFinanceStore } from './store/useFinanceStore';
import { useTaskStore } from './store/useTaskStore';
import { useTasbeehStore } from './store/useTasbeehStore';
import { usePrayerStore } from './store/usePrayerStore';
import { useRoutineStore } from './store/useRoutineStore';
import { useCalendarStore } from './store/useCalendarStore';
import { useLocationStore, CITIES_DATA } from './store/useLocationStore';
import { useTimeStore } from './store/useTimeStore';
import * as timeService from './utils/timeService';
import * as prayerTimes from './utils/prayerTimes';
import * as backupService from './utils/backupService';
import * as backupCrypto from './utils/backupCrypto';
import * as credentialService from './utils/credentialService';
import * as storage from './storage/index.js';
import * as nativeLifecycle from './utils/nativeLifecycle';
import * as nativeLocation from './utils/nativeLocation';
import * as nativeNotifications from './utils/nativeNotifications';
import * as nativeBackup from './utils/nativeBackup';
import { initializeNativeLifecycle } from './utils/nativeLifecycle';
import { scheduleAllActiveNotifications } from './utils/nativeNotifications';
import { hydrateAllStores, getStartupDecision, isOnboardingRoute } from './utils/startupController';
import { BACKGROUND_LIBRARY, getWallpaperPair } from './data/defaultWallpapers';
import { isRtl } from './i18n/localeUtils.js';

// Expose stores globally strictly for local development and authorized automated QA testing
if (typeof window !== 'undefined' && Boolean(import.meta.env.DEV)) {
  useLocationStore.CITIES_DATA = CITIES_DATA;
  window.useProfileStore = useProfileStore;
  window.useLocaleStore = useLocaleStore;
  window.useNavigationStore = useNavigationStore;
  window.useSecurityStore = useSecurityStore;
  window.useSettingsStore = useSettingsStore;
  window.useNotificationStore = useNotificationStore;
  window.useFinanceStore = useFinanceStore;
  window.useTaskStore = useTaskStore;
  window.useTasbeehStore = useTasbeehStore;
  window.useNotesStore = useNotesStore;
  window.useThemeStore = useThemeStore;
  window.useTimeStore = useTimeStore;
  window.usePrayerStore = usePrayerStore;
  window.useRoutineStore = useRoutineStore;
  window.useCalendarStore = useCalendarStore;
  window.useLocationStore = useLocationStore;
  window.useToastStore = useToastStore;
  window.toast = toast;
  window.CITIES_DATA = CITIES_DATA;
  window.timeService = timeService;
  window.prayerTimes = prayerTimes;
  window.backupService = backupService;
  window.backupCrypto = backupCrypto;
  window.credentialService = credentialService;
  window.storage = storage;
  window.attachmentStorage = storage;
  window.nativeLifecycle = nativeLifecycle;
  window.nativeLocation = nativeLocation;
  window.nativeNotifications = nativeNotifications;
  window.nativeBackup = nativeBackup;
}

function PhoneWallpaperCanvas({ isDarkMode, activeTab }) {
  const activeBackgroundId = useThemeStore((s) => s.activeBackgroundId);
  const customWallpaper = useThemeStore((s) => s.customWallpaper);
  const storeWallpapers = useThemeStore((s) => s.wallpapers);
  const downloadedWallpapers = useThemeStore((s) => s.downloadedWallpapers);
  const blurIntensity = useThemeStore((s) => s.blurIntensity) ?? 18;
  const dimWallpaper = useThemeStore((s) => s.dimWallpaper) ?? true;

  if (activeTab.includes('splash_screen')) return null;

  // 1. Pure Minimal (Solid Background - No wallpaper image layer)
  if (activeBackgroundId === 'none') {
    return (
      <div 
        className={`absolute inset-0 z-0 pointer-events-none transition-colors duration-300 ${
          isDarkMode ? 'bg-[#090D16]' : 'bg-[#FFFFFF]'
        }`}
      />
    );
  }

  // 2. Custom or Curated Wallpaper with rich CSS gradient fallback
  const wallpapers = storeWallpapers || downloadedWallpapers || BACKGROUND_LIBRARY;
  const bgPair = getWallpaperPair(activeBackgroundId, customWallpaper, isDarkMode, wallpapers);
  const currentBgImage = bgPair.activeImage;
  const activeGradient = isDarkMode 
    ? (bgPair.bg?.darkGradient || 'linear-gradient(135deg, #090D16 0%, #1e293b 100%)') 
    : (bgPair.bg?.lightGradient || 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)');

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none bg-cover bg-center transition-all duration-300 scale-105"
      style={{
        backgroundImage: currentBgImage ? `url("${currentBgImage}"), ${activeGradient}` : activeGradient,
        backgroundColor: isDarkMode ? '#090D16' : '#FFFFFF',
        filter: `blur(${blurIntensity}px)`,
      }}
    >
      {/* Dark Mode Wallpaper Dimming Overlay: strictly for Dark Mode screens, directly on top of wallpaper, behind UI */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 pointer-events-none ${
          isDarkMode && dimWallpaper ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

function AppContent() {
  const { t } = useTranslation();
  const { activeTab, setActiveTab, goBack, syncFromPopState, routeParams, navigationDirection, sidebarPosition: rawSidebarPos } = useNavigationStore();
  const sidebarPosition = rawSidebarPos || 'left';
  const currentLocale = useLocaleStore((s) => s.currentLocale || s.locale || 'en');
  const isCurrentRtl = useLocaleStore((s) => s.isRTL ?? isRtl(currentLocale));

  const shellLayoutClass = useMemo(() => {
    switch (sidebarPosition) {
      case 'right':
        return 'flex-row-reverse';
      case 'top':
        return 'flex-col';
      case 'bottom':
        return 'flex-col-reverse';
      case 'left':
      default:
        return 'flex-row';
    }
  }, [sidebarPosition]);

  const storeActiveNoteId = useNotesStore((s) => s.activeNoteId);
  const route = useMemo(() => ({ name: activeTab, params: routeParams || {} }), [activeTab, routeParams]);
  const isNewNote = Boolean(routeParams?.isNew || (!routeParams?.noteId && !storeActiveNoteId));
  const setupCompleted = useProfileStore((s) => s.setupCompleted);
  const onboardingStep = useProfileStore((s) => s.onboardingStep);
  const isLocked = useSecurityStore((s) => s.isLocked);
  const isAppLockActive = useSecurityStore((s) => s.isAppLockActive);
  const hasPin = useSecurityStore((s) => s.hasPin);
  const isVaultLocked = isLocked && isAppLockActive && hasPin;

  // App-level Initialization Splash Screen State (runs every time the app launches/reloads)
  const [isAppLoading, setIsAppLoading] = useState(true);

  if (typeof window !== 'undefined' && Boolean(import.meta.env.DEV)) {
    window.setIsAppLoading = setIsAppLoading;
  }

  const hideBottomNav = isAppLoading || isVaultLocked || 
    activeTab.includes('splash_screen') || 
    activeTab.includes('personal_setup') || 
    activeTab.includes('pin_setup') || 
    activeTab.includes('quick_note_editor') ||
    setupCompleted !== true;
  
  const [isWallpaperSelectorOpen, setIsWallpaperSelectorOpen] = useState(false);
  const { theme } = useTheme();

  // The user-selected global appearance, never the route suffix, controls the whole app.
  const isDarkMode = theme === 'dark';

  // Onboarding route protection guard: prevent deep links, history or dev-navigator from bypassing onboarding
  useEffect(() => {
    if (!isAppLoading && setupCompleted !== true) {
      if (!isOnboardingRoute(activeTab)) {
        const isDark = activeTab.includes('_dark_mode') || theme === 'dark';
        const fallbackScreen = onboardingStep === 'security_setup'
          ? (isDark ? 'pin_setup_change_dark_mode' : 'pin_setup_change_light_mode')
          : (isDark ? 'personal_setup_dark_mode' : 'personal_setup_light_mode');
        setActiveTab(fallbackScreen);
      }
    }
  }, [isAppLoading, setupCompleted, onboardingStep, activeTab, theme, setActiveTab]);

  const handleSplashComplete = () => {
    const isDark = typeof theme === 'string' ? theme === 'dark' : true;
    const requestedScreen = typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('screen')
      : null;

    const decision = getStartupDecision({ isDark, requestedScreen });
    setActiveTab(decision.targetScreen);
    setIsAppLoading(false);
  };

  useEffect(() => {
    const handlePopState = (event) => {
      const params = new URLSearchParams(window.location.search);
      const screenFromUrl = params.get('screen');
      const screenFromState = event.state?.screen;
      const targetScreen = screenFromState || screenFromUrl || 'home_dashboard_dark_mode';
      syncFromPopState(targetScreen);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncFromPopState]);

  // Developer Screen Navigator & Layout Mode States (DEV ONLY)
  const [isDevNavigatorOpen, setIsDevNavigatorOpen] = useState(false);
  const [devLayoutMode, setDevLayoutMode] = useState(() => {
    if (typeof window !== 'undefined' && Boolean(import.meta.env.DEV)) {
      return localStorage.getItem('momentum_dev_layout_mode') || 'responsive';
    }
    return 'responsive';
  });

  const toggleDevLayoutMode = () => {
    const next = devLayoutMode === 'responsive' ? 'mobile_preview' : 'responsive';
    setDevLayoutMode(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('momentum_dev_layout_mode', next);
    }
  };

  // Keyboard shortcut listener for Ctrl+Shift+Alt+D and custom open event
  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const handleOpenEvent = () => {
      if (!isVaultLocked) {
        setIsDevNavigatorOpen(true);
      }
    };

    const handleKeyDown = (e) => {
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.altKey && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        if (!isVaultLocked) {
          setIsDevNavigatorOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener('momentum:open-dev-navigator', handleOpenEvent);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('momentum:open-dev-navigator', handleOpenEvent);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVaultLocked]);

  const renderScreen = () => {
 // Preserve all existing Dark/Light component designs, but select by global appearance.
 // Legacy deep links are translated without changing navigation identity/history.
 switch (themedScreenId(activeTab, theme)) {
 case 'about_momentum_dark_mode': return <AboutMomentumDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'about_momentum_light_mode': return <AboutMomentumLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'add_edit_expense_dark_mode': return <AddEditExpenseDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'add_edit_expense_light_mode': return <AddEditExpenseLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'add_income_dark_mode':
 case 'add_edit_income_dark_mode': return <AddEditIncomeDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'add_income_light_mode':
 case 'add_edit_income_light_mode': return <AddEditIncomeLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'add_edit_routine':
   return isDarkMode ? <AddEditRoutineDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <AddEditRoutineLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'add_edit_routine_dark_mode': return <AddEditRoutineDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'add_edit_routine_light_mode': return <AddEditRoutineLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'add_edit_task_dark_mode': return <AddEditTaskDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'add_edit_task_light_mode': return <AddEditTaskLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'afghan_solar_hijri_shamsi_calendar_dark_mode': return <AfghanSolarHijriShamsiCalendarDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'afghan_solar_hijri_shamsi_calendar_light_mode': return <AfghanSolarHijriShamsiCalendarLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'appearance_dark_mode': return <AppearanceDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'appearance_light_mode': return <AppearanceLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'app_lock_dark_mode': return <AppLockDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'app_lock_light_mode': return <AppLockLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'background_blur_control_dark_mode':
 case 'background_preview_blur_control_dark_mode': return <BackgroundPreviewBlurControlDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'background_blur_control_light_mode':
 case 'background_preview_blur_control_light_mode': return <BackgroundPreviewBlurControlLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'backup_restore':
   return isDarkMode ? <BackupRestoreDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <BackupRestoreLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'backup_restore_dark_mode': return <BackupRestoreDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'backup_restore_light_mode': return <BackupRestoreLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'background_library_dark_mode':
 case 'background_wallpaper_library_dark_mode': return <BackgroundWallpaperLibraryDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'background_library_light_mode':
 case 'background_wallpaper_library_light_mode': return <BackgroundWallpaperLibraryLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'biometric_settings_dark_mode': return <BiometricSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'biometric_settings_light_mode': return <BiometricSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'calendars_main_dark_mode': return <CalendarsMainDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'calendars_main_light_mode': return <CalendarsMainLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'city_selection_dark_mode': return <CitySelectionDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'city_selection_light_mode': return <CitySelectionLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'daily_routine':
 case 'routine':
   return isDarkMode ? <TasksRemindersDarkMode setActiveTab={setActiveTab} goBack={goBack} initialSubTab="routine" /> : <TasksRemindersLightMode setActiveTab={setActiveTab} goBack={goBack} initialSubTab="routine" />;
 case 'daily_routine_dark_mode': return <TasksRemindersDarkMode setActiveTab={setActiveTab} goBack={goBack} initialSubTab="routine" />;
 case 'daily_routine_light_mode': return <TasksRemindersLightMode setActiveTab={setActiveTab} goBack={goBack} initialSubTab="routine" />;
 case 'edit_profile':
   return isDarkMode ? <EditProfileDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <EditProfileLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'edit_profile_dark_mode': return <EditProfileDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'edit_profile_light_mode': return <EditProfileLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'finance_dashboard_dark_mode': return <FinanceExpenseTrackerDarkMode setActiveTab={setActiveTab} goBack={goBack} initialTab="dashboard" />;
 case 'finance_expense_tracker_dark_mode': return <FinanceExpenseTrackerDarkMode setActiveTab={setActiveTab} goBack={goBack} initialTab="expenses" />;
 case 'finance_dashboard_light_mode': return <FinanceExpenseTrackerLightMode setActiveTab={setActiveTab} goBack={goBack} initialTab="dashboard" />;
 case 'finance_expense_tracker_light_mode': return <FinanceExpenseTrackerLightMode setActiveTab={setActiveTab} goBack={goBack} initialTab="expenses" />;
 case 'gregorian_calendar_dark_mode': return <GregorianCalendarDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'gregorian_calendar_light_mode': return <GregorianCalendarLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'home_dashboard_dark_mode': return <HomeDashboardDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'home_dashboard_light_mode': return <HomeDashboardLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'income_management_dark_mode': return <FinanceExpenseTrackerDarkMode setActiveTab={setActiveTab} goBack={goBack} initialTab="income" />;
 case 'income_management_light_mode': return <FinanceExpenseTrackerLightMode setActiveTab={setActiveTab} goBack={goBack} initialTab="income" />;
 case 'islamic_hijri_calendar_dark_mode': return <IslamicHijriCalendarDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'islamic_hijri_calendar_light_mode': return <IslamicHijriCalendarLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'language_settings_dark_mode': return <LanguageSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'language_settings_light_mode': return <LanguageSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'language_settings':
 case 'language': return isDarkMode ? <LanguageSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <LanguageSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'note_editor_dark_mode':
 case 'long_note_editor_dark_mode': return <LongNoteEditorDarkMode setActiveTab={setActiveTab} goBack={goBack} route={route} isNew={isNewNote} />;
 case 'note_editor_light_mode':
 case 'long_note_editor_light_mode': return <LongNoteEditorLightMode setActiveTab={setActiveTab} goBack={goBack} route={route} isNew={isNewNote} />;
 case 'more_dark_mode': return <MoreDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'more_light_mode': return <MoreLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'new_edit_tasbeeh_dark_mode': return <NewEditTasbeehDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'new_edit_tasbeeh_light_mode': return <NewEditTasbeehLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'notes_main_dark_mode': return <NotesMainDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'notes_main_light_mode': return <NotesMainLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'note_media_attachment_viewer_dark_mode': return <NoteMediaAttachmentViewerDarkMode setActiveTab={setActiveTab} goBack={goBack} route={route} />;
 case 'note_media_attachment_viewer_light_mode': return <NoteMediaAttachmentViewerLightMode setActiveTab={setActiveTab} goBack={goBack} route={route} />;
 case 'notifications_settings_dark_mode':
 case 'notifications_center_dark_mode':
   return <NotificationsSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'notifications_settings_light_mode':
 case 'notifications_center_light_mode':
   return <NotificationsSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'personal_setup_dark_mode': return <PersonalSetupDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'personal_setup_light_mode': return <PersonalSetupLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'pin_setup_change_dark_mode': return <PinSetupChangeDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'pin_setup_change_light_mode': return <PinSetupChangeLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'prayer_notification_settings_dark_mode':
 case 'prayer_notification_settings':
   return isDarkMode ? <NotificationsSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <NotificationsSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'prayer_notification_settings_light_mode':
   return <NotificationsSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'prayer_times_dark_mode': return <PrayerTimesDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'prayer_times_light_mode': return <PrayerTimesLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'quick_note_editor_dark_mode': return <QuickNoteEditorDarkMode setActiveTab={setActiveTab} goBack={goBack} route={route} isNew={isNewNote} />;
 case 'quick_note_editor_light_mode': return <QuickNoteEditorLightMode setActiveTab={setActiveTab} goBack={goBack} route={route} isNew={isNewNote} />;
 case 'settings_profile_dark_mode': return <SettingsProfileDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'settings_profile_light_mode': return <SettingsProfileLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'splash_screen_dark_mode': return <SplashScreenDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'splash_screen_light_mode': return <SplashScreenLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'dhikr_history_dark_mode':
 case 'tasbeeh_history_dark_mode': return <TasbeehHistoryDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'dhikr_history_light_mode':
 case 'tasbeeh_history_light_mode': return <TasbeehHistoryLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'digital_tasbeeh_counter_dark_mode':
 case 'tasbeh_dark_mode':
 case 'tasbeeh_main_dark_mode': return <TasbeehMainDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'digital_tasbeeh_counter_light_mode':
 case 'tasbeh_light_mode':
 case 'tasbeeh_main_light_mode': return <TasbeehMainLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'tasbeeh_settings_dark_mode': return <TasbeehSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'tasbeeh_settings_light_mode': return <TasbeehSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'tasks_reminders_dark_mode':
  case 'tasks_reminders_dark_mode_1':
  case 'tasks_reminders_dark_mode_2': return <TasksRemindersDarkMode setActiveTab={setActiveTab} goBack={goBack} initialSubTab="tasks" />;
  case 'tasks_reminders_light_mode':
  case 'tasks_reminders_light_mode_1':
  case 'tasks_reminders_light_mode_2': return <TasksRemindersLightMode setActiveTab={setActiveTab} goBack={goBack} initialSubTab="tasks" />;
 case 'timezone_selection_dark_mode': return <TimezoneSelectionDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'timezone_selection_light_mode': return <TimezoneSelectionLightMode setActiveTab={setActiveTab} goBack={goBack} />;

 case 'task_details_dark_mode': return <TaskDetailsDarkMode setActiveTab={setActiveTab} goBack={goBack} route={route} />;
 case 'task_details_light_mode': return <TaskDetailsLightMode setActiveTab={setActiveTab} goBack={goBack} route={route} />;
 case 'task_details': return isDarkMode ? <TaskDetailsDarkMode setActiveTab={setActiveTab} goBack={goBack} route={route} /> : <TaskDetailsLightMode setActiveTab={setActiveTab} goBack={goBack} route={route} />;
 case 'routine_details_dark_mode': return <RoutineDetailsDarkMode setActiveTab={setActiveTab} goBack={goBack} route={route} />;
 case 'routine_details_light_mode': return <RoutineDetailsLightMode setActiveTab={setActiveTab} goBack={goBack} route={route} />;
 case 'routine_details': return isDarkMode ? <RoutineDetailsDarkMode setActiveTab={setActiveTab} goBack={goBack} route={route} /> : <RoutineDetailsLightMode setActiveTab={setActiveTab} goBack={goBack} route={route} />;

 case 'home': return isDarkMode ? <HomeDashboardDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <HomeDashboardLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'finance': return isDarkMode ? <FinanceExpenseTrackerDarkMode setActiveTab={setActiveTab} goBack={goBack} initialTab="expenses" /> : <FinanceExpenseTrackerLightMode setActiveTab={setActiveTab} goBack={goBack} initialTab="expenses" />;
 case 'tasks': return isDarkMode ? <TasksRemindersDarkMode setActiveTab={setActiveTab} goBack={goBack} initialSubTab="tasks" /> : <TasksRemindersLightMode setActiveTab={setActiveTab} goBack={goBack} initialSubTab="tasks" />;
 case 'more': return isDarkMode ? <MoreDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <MoreLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'biometric_settings': return isDarkMode ? <BiometricSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <BiometricSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'calendars_and_time':
 case 'calendars':
 case 'calendar': return isDarkMode ? <CalendarsMainDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <CalendarsMainLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'add_task':
 case 'add_item':
 case 'add_edit_task': return isDarkMode ? <AddEditTaskDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <AddEditTaskLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'prayer_times':
 case 'prayer': return isDarkMode ? <PrayerTimesDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <PrayerTimesLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'tasbeh':
 case 'tasbeh_main':
 case '/tasbeh':
 case '/tasbeeh':
 case 'digital_tasbeeh_counter':
 case 'tasbeeh':
 case 'tasbeeh_main':
 case 'dhikr': return isDarkMode ? <TasbeehMainDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <TasbeehMainLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'notes':
 case 'notes_main':
 case 'reflections': return isDarkMode ? <NotesMainDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <NotesMainLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'note_editor':
 case 'long_note_editor': return isDarkMode ? <LongNoteEditorDarkMode setActiveTab={setActiveTab} goBack={goBack} route={route} isNew={isNewNote} /> : <LongNoteEditorLightMode setActiveTab={setActiveTab} goBack={goBack} route={route} isNew={isNewNote} />;
 case 'quick_note_editor': return isDarkMode ? <QuickNoteEditorDarkMode setActiveTab={setActiveTab} goBack={goBack} route={route} isNew={isNewNote} /> : <QuickNoteEditorLightMode setActiveTab={setActiveTab} goBack={goBack} route={route} isNew={isNewNote} />;
 case 'AttachmentDetails':
 case 'attachment_details':
 case 'note_media_attachment_viewer':
 case 'note_media_viewer':
   return isDarkMode ? <NoteMediaAttachmentViewerDarkMode setActiveTab={setActiveTab} goBack={goBack} route={route} /> : <NoteMediaAttachmentViewerLightMode setActiveTab={setActiveTab} goBack={goBack} route={route} />;
 case 'settings':
 case 'settings_profile': return isDarkMode ? <SettingsProfileDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <SettingsProfileLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'islamic_hijri_calendar':
 case 'hijri_calendar': return isDarkMode ? <IslamicHijriCalendarDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <IslamicHijriCalendarLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'notifications_center':
 case 'notifications': return isDarkMode ? <NotificationsSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <NotificationsSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;

 default: return <div className="p-8 text-white">{t('app.screenNotFound', 'Screen not found')}: {activeTab}</div>;
 }
 };


  return (
    <>
      {devLayoutMode === 'mobile_preview' && Boolean(import.meta.env.DEV) ? (
        /* ── DEV-ONLY SIMULATED MOBILE PHONE PREVIEW ── */
        <div className="h-screen w-full flex flex-col items-center justify-center p-2 sm:p-6 relative font-sans antialiased text-on-surface overflow-hidden">
          <GlobalBackground isDarkMode={isDarkMode} />

          {/* Dev Mode Banner */}
          <div className="z-20 mb-2 flex items-center gap-2.5 bg-black/70 text-slate-300 text-xs px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <span className="font-medium text-slate-400">{t('app.mobileDeviceMockup', 'Mobile Device Mockup')}</span>
            <span className="text-white/20">•</span>
            <button
              type="button"
              onClick={toggleDevLayoutMode}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              {t('app.switchToDesktop', 'Switch to Responsive Desktop')}
            </button>
          </div>

          {/* Centered Realistic Mobile Phone Frame Container */}
          <div className="w-full h-full sm:h-[892px] sm:max-w-[412px] sm:rounded-[40px] sm:border-[8px] sm:border-outline-variant/40 sm:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] mx-auto relative overflow-hidden bg-transparent flex flex-col font-sans">
            {!isAppLoading && <PhoneWallpaperCanvas isDarkMode={isDarkMode} activeTab={activeTab} />}
            <div className={`flex-1 ${isAppLoading || activeTab.includes('splash_screen') ? 'overflow-hidden overscroll-none' : 'overflow-y-auto'} relative no-scrollbar w-full h-full z-10 momentum-canvas-viewport font-sans ${isAppLoading || activeTab.includes('splash_screen') ? '' : 'wallpaper-active'} ${hideBottomNav ? 'pb-0' : 'pb-32'}`}>
              <AnimatePresence mode="wait">
                {isAppLoading ? (
                  <SplashScreen 
                    key="initial-app-splash"
                    onComplete={handleSplashComplete} 
                  />
                ) : (
                  <AppLockGuard>
                    <AnimatePresence mode="wait" initial={false}>
                      <PageTransition
                        key={activeTab}
                        screenKey={activeTab}
                        direction={navigationDirection}
                        className="w-full h-full flex flex-col"
                      >
                        {renderScreen()}
                      </PageTransition>
                    </AnimatePresence>
                  </AppLockGuard>
                )}
              </AnimatePresence>
            </div>
            {!hideBottomNav && (
              <BottomNavBar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isDarkMode={isDarkMode}
              />
            )}
          </div>
        </div>
      ) : (
        /* ── RESPONSIVE APPLICATION SHELL (DEFAULT FOR DESKTOP, TABLET & MOBILE) ── */
        <div dir={isCurrentRtl ? 'rtl' : 'ltr'} className={`w-full h-screen overflow-hidden flex relative font-sans text-on-surface transition-all duration-300 ${shellLayoutClass}`}>
          {!isAppLoading && <PhoneWallpaperCanvas isDarkMode={isDarkMode} activeTab={activeTab} />}

          {/* Desktop Navigation Sidebar (Only rendered on desktop viewports: >= 1024px) */}
          {!hideBottomNav && (
            <DesktopSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDarkMode={isDarkMode}
              onOpenScreenNavigator={() => setIsDevNavigatorOpen(true)}
              devLayoutMode={devLayoutMode}
              onToggleDevLayoutMode={toggleDevLayoutMode}
              onOpenWallpaperSelector={() => setIsWallpaperSelectorOpen(true)}
            />
          )}

          {/* Main Application Canvas Viewport */}
          <div dir={isCurrentRtl ? 'rtl' : 'ltr'} className="flex-1 h-full overflow-hidden relative flex flex-col items-center min-w-0 transition-all duration-300 z-10">

            <div
              className={`flex-1 ${
                isAppLoading || activeTab.includes('splash_screen')
                  ? 'overflow-hidden overscroll-none'
                  : 'overflow-y-auto'
              } relative no-scrollbar w-full h-full z-10 momentum-canvas-viewport font-sans ${
                isAppLoading || activeTab.includes('splash_screen') ? '' : 'wallpaper-active'
              } ${hideBottomNav ? 'pb-0' : sidebarPosition === 'bottom' ? 'pb-4' : 'pb-36 lg:pb-8'}`}
            >
              <AnimatePresence mode="wait">
                {isAppLoading ? (
                  <SplashScreen 
                    key="initial-app-splash"
                    onComplete={handleSplashComplete} 
                  />
                ) : (
                  <AppLockGuard>
                    <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1536px] mx-auto flex-1 flex flex-col items-center px-0 lg:px-6 xl:px-8 py-0 lg:py-4">
                      <AnimatePresence mode="wait" initial={false}>
                        <PageTransition
                          key={activeTab}
                          screenKey={activeTab}
                          direction={navigationDirection}
                          className="w-full flex-1 flex flex-col"
                        >
                          {renderScreen()}
                        </PageTransition>
                      </AnimatePresence>
                    </div>
                  </AppLockGuard>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Bottom Navigation Bar (Visible on mobile/tablet < 1024px, hidden on desktop lg:hidden) */}
            {!hideBottomNav && (
              <div className="lg:hidden w-full">
                <BottomNavBar
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Universal Top-Center In-App Toast Viewport */}
      <ToastViewport />

      {/* Universal Momentum Confirmation & Prompt Dialog Viewport */}
      <ConfirmationViewport />

      {/* On-Demand Developer Screen Navigator Modal (Strictly isolated to dev mode) */}
      {Boolean(import.meta.env.DEV) && (
        <DevScreenNavigatorModal
          isOpen={isDevNavigatorOpen && !isVaultLocked}
          onClose={() => setIsDevNavigatorOpen(false)}
          activeTab={activeTab}
          onSelectScreen={(screenId) => {
            setActiveTab(screenId);
          }}
          devLayoutMode={devLayoutMode}
          onToggleDevLayoutMode={toggleDevLayoutMode}
          onOpenWallpaperSelector={() => setIsWallpaperSelectorOpen(true)}
        />
      )}

      {/* Wallpaper Engine Modal */}
      {isWallpaperSelectorOpen && (
        <WallpaperSelector 
          isDarkMode={isDarkMode} 
          onClose={() => setIsWallpaperSelectorOpen(false)} 
        />
      )}
    </>
  );
}

export default function App() {
  const { t } = useTranslation();
  const [, setHasHydrated] = useState(false);

  useEffect(() => {
    async function hydrateStores() {
      try {
        await hydrateAllStores();
        // Reconcile and schedule pending alerts after stores are hydrated
        scheduleAllActiveNotifications().catch(() => {});
      } catch (err) {
        console.warn('[Momentum Hydration] Error:', err);
      } finally {
        setHasHydrated(true);
      }
    }
    hydrateStores();
    initializeNativeLifecycle();
  }, []);

  // Stores rehydrate in background while initial SplashScreen animates

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <AppContent />
      </WallpaperProvider>
    </ThemeProvider>
  );
}
