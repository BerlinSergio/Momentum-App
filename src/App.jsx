import { useNavigationStore } from './store/useNavigationStore';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WallpaperProvider, useWallpaper } from './context/WallpaperContext';
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
import BackgroundWallpaperLibraryDarkMode from './BackgroundWallpaperLibraryDarkMode';
import BackgroundWallpaperLibraryLightMode from './BackgroundWallpaperLibraryLightMode';
import BiometricSettingsDarkMode from './BiometricSettingsDarkMode';
import BiometricSettingsLightMode from './BiometricSettingsLightMode';
import CalendarsMainDarkMode from './CalendarsMainDarkMode';
import CalendarsMainLightMode from './CalendarsMainLightMode';
import CitySelectionDarkMode from './CitySelectionDarkMode';
import CitySelectionLightMode from './CitySelectionLightMode';
import DailyRoutineDarkMode from './DailyRoutineDarkMode';
import DailyRoutineLightMode from './DailyRoutineLightMode';
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
import TimezoneSelectionDarkMode from './TimezoneSelectionDarkMode';
import TimezoneSelectionLightMode from './TimezoneSelectionLightMode';
import BottomNavBar from './components/BottomNavBar';


import { ThemeProvider, useTheme } from './context/ThemeContext';

import { useThemeStore } from './store/useThemeStore';
import { useNotesStore } from './store/useNotesStore';
import { useFinanceStore } from './store/useFinanceStore';
import useSecurityStore from './store/useSecurityStore';
import { useRoutineStore } from './store/useRoutineStore';
import { BACKGROUND_LIBRARY, getBackgroundById, getWallpaperPair, NONE_WALLPAPER } from './data/defaultWallpapers';

function PhoneWallpaperCanvas({ isDarkMode, activeTab }) {
  const activeBackgroundId = useThemeStore((s) => s.activeBackgroundId);
  const customWallpaper = useThemeStore((s) => s.customWallpaper);
  const storeWallpapers = useThemeStore((s) => s.wallpapers);
  const downloadedWallpapers = useThemeStore((s) => s.downloadedWallpapers);
  const blurIntensity = useThemeStore((s) => s.blurIntensity) ?? 18;
  const dimWallpaper = useThemeStore((s) => s.dimWallpaper) ?? true;
  const { currentWallpaper } = useWallpaper();

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
  const { activeTab, setActiveTab, goBack, syncFromPopState, routeParams } = useNavigationStore();
  const storeActiveNoteId = useNotesStore((s) => s.activeNoteId);
  const route = useMemo(() => ({ name: activeTab, params: routeParams || {} }), [activeTab, routeParams]);
  const isNewNote = Boolean(routeParams?.isNew || (!routeParams?.noteId && !storeActiveNoteId));
  const isLocked = useSecurityStore((s) => s.isLocked);
  const isAppLockActive = useSecurityStore((s) => s.isAppLockActive);
  const hasPin = useSecurityStore((s) => s.hasPin);
  const isVaultLocked = isLocked && isAppLockActive && hasPin;

  // App-level Initialization Splash Screen State (runs every time the app launches/reloads)
  const [isAppLoading, setIsAppLoading] = useState(true);

  const hideBottomNav = isAppLoading || isVaultLocked || 
    activeTab.includes('splash_screen') || 
    activeTab.includes('personal_setup') || 
    activeTab.includes('pin_setup') || 
    activeTab.includes('quick_note_editor');
  
  const [isWallpaperSelectorOpen, setIsWallpaperSelectorOpen] = useState(false);
  const { syncThemeToScreen, theme } = useTheme();

  const isDarkMode = activeTab.includes('_dark_mode') || (theme === 'dark' && !activeTab.includes('_light_mode'));

  // Auto-sync theme based on active screen name
  useEffect(() => {
    syncThemeToScreen(activeTab);
  }, [activeTab]);

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

  const handleNavChange = (e) => {
    const newScreen = e.target.value;
    setActiveTab(newScreen);
  };

  const renderScreen = () => {
 switch (activeTab) {
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
 case 'finance_dashboard_dark_mode':
 case 'finance_expense_tracker_dark_mode': return <FinanceExpenseTrackerDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'finance_dashboard_light_mode':
 case 'finance_expense_tracker_light_mode': return <FinanceExpenseTrackerLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'gregorian_calendar_dark_mode': return <GregorianCalendarDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'gregorian_calendar_light_mode': return <GregorianCalendarLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'home_dashboard_dark_mode': return <HomeDashboardDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'home_dashboard_light_mode': return <HomeDashboardLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'income_management_dark_mode': return <FinanceExpenseTrackerDarkMode setActiveTab={setActiveTab} goBack={goBack} initialTab="income" />;
 case 'income_management_light_mode': return <FinanceExpenseTrackerLightMode setActiveTab={setActiveTab} goBack={goBack} initialTab="income" />;
 case 'islamic_hijri_calendar_dark_mode': return <IslamicHijriCalendarDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'islamic_hijri_calendar_light_mode': return <IslamicHijriCalendarLightMode setActiveTab={setActiveTab} goBack={goBack} />;
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
 case 'notifications_settings_dark_mode': return <NotificationsSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'notifications_settings_light_mode': return <NotificationsSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;
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
  case 'tasks_reminders_dark_mode_2': return <TasksRemindersDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
  case 'tasks_reminders_light_mode':
  case 'tasks_reminders_light_mode_1':
  case 'tasks_reminders_light_mode_2': return <TasksRemindersLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'timezone_selection_dark_mode': return <TimezoneSelectionDarkMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'timezone_selection_light_mode': return <TimezoneSelectionLightMode setActiveTab={setActiveTab} goBack={goBack} />;

 case 'home': return isDarkMode ? <HomeDashboardDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <HomeDashboardLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'finance': return isDarkMode ? <FinanceExpenseTrackerDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <FinanceExpenseTrackerLightMode setActiveTab={setActiveTab} goBack={goBack} />;
 case 'tasks': return isDarkMode ? <TasksRemindersDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <TasksRemindersLightMode setActiveTab={setActiveTab} goBack={goBack} />;
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
 case 'notifications': return isDarkMode ? <NotificationsSettingsDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <NotificationsSettingsLightMode setActiveTab={setActiveTab} goBack={goBack} />;

 default: return <div className="p-8 text-white">Screen not found: {activeTab}</div>;
 }
 };


 return (
 <>
 <div className="min-h-screen w-full flex items-center justify-center p-6 relative font-sans antialiased text-on-surface">
 <GlobalBackground isDarkMode={isDarkMode} />
 
 {/* Dev Tools Sidebar (Fixed Top-Left) */}
  {!isAppLoading && (
  <div className="fixed top-6 left-6 w-72 z-[9999] bg-white/90 /90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-outline-variant/50 /10 flex flex-col gap-3 font-sans">
 <div className="flex justify-between items-center px-1">
 <label className="text-xs uppercase tracking-wider text-on-surface-variant dark:text-on-surface-variant font-bold">Dev Navigator</label>
 <button 
 onClick={() => setIsWallpaperSelectorOpen(true)}
 className="text-xs uppercase tracking-wider text-primary dark:text-blue-400 font-bold hover:text-primary transition-colors"
 >
 BG Engine
 </button>
 </div>
 <select 
 value={activeTab} 
 onChange={handleNavChange}
 className="bg-surface-container-low dark:bg-surface-container text-on-surface text-sm rounded-xl border border-outline-variant /10 p-3 outline-none focus:ring-2 focus:ring-primary w-full"
 >
 <option value="about_momentum_dark_mode">About Momentum Dark Mode</option>
 <option value="about_momentum_light_mode">About Momentum Light Mode</option>
 <option value="add_edit_expense_dark_mode">Add Edit Expense Dark Mode</option>
 <option value="add_edit_expense_light_mode">Add Edit Expense Light Mode</option>
 <option value="add_edit_income_dark_mode">Add Edit Income Dark Mode</option>
 <option value="add_edit_income_light_mode">Add Edit Income Light Mode</option>
 <option value="add_edit_routine_dark_mode">Add Edit Routine Dark Mode</option>
 <option value="add_edit_routine_light_mode">Add Edit Routine Light Mode</option>
 <option value="add_edit_task_dark_mode">Add Edit Task Dark Mode</option>
 <option value="add_edit_task_light_mode">Add Edit Task Light Mode</option>
 <option value="afghan_solar_hijri_shamsi_calendar_dark_mode">Afghan Solar Hijri Shamsi Calendar Dark Mode</option>
 <option value="afghan_solar_hijri_shamsi_calendar_light_mode">Afghan Solar Hijri Shamsi Calendar Light Mode</option>
 <option value="appearance_dark_mode">Appearance Dark Mode</option>
 <option value="appearance_light_mode">Appearance Light Mode</option>
 <option value="app_lock_dark_mode">App Lock Dark Mode</option>
 <option value="app_lock_light_mode">App Lock Light Mode</option>
 <option value="background_preview_blur_control_dark_mode">Background Preview Blur Control Dark Mode</option>
 <option value="background_preview_blur_control_light_mode">Background Preview Blur Control Light Mode</option>
 <option value="background_wallpaper_library_dark_mode">Background Wallpaper Library Dark Mode</option>
 <option value="background_wallpaper_library_light_mode">Background Wallpaper Library Light Mode</option>
 <option value="biometric_settings_dark_mode">Biometric Settings Dark Mode</option>
 <option value="biometric_settings_light_mode">Biometric Settings Light Mode</option>
 <option value="calendars_main_dark_mode">Calendars Main Dark Mode</option>
 <option value="calendars_main_light_mode">Calendars Main Light Mode</option>
 <option value="city_selection_dark_mode">City Selection Dark Mode</option>
 <option value="city_selection_light_mode">City Selection Light Mode</option>
 <option value="daily_routine_dark_mode">Daily Routine Dark Mode</option>
 <option value="daily_routine_light_mode">Daily Routine Light Mode</option>
 <option value="edit_profile_dark_mode">Edit Profile Dark Mode</option>
 <option value="edit_profile_light_mode">Edit Profile Light Mode</option>
 <option value="finance_dashboard_dark_mode">Finance Dashboard Dark Mode</option>
 <option value="finance_dashboard_light_mode">Finance Dashboard Light Mode</option>
 <option value="finance_expense_tracker_dark_mode">Finance Expense Tracker Dark Mode</option>
 <option value="finance_expense_tracker_light_mode">Finance Expense Tracker Light Mode</option>
 <option value="gregorian_calendar_dark_mode">Gregorian Calendar Dark Mode</option>
 <option value="gregorian_calendar_light_mode">Gregorian Calendar Light Mode</option>
 <option value="home_dashboard_dark_mode">Home Dashboard Dark Mode</option>
 <option value="home_dashboard_light_mode">Home Dashboard Light Mode</option>
 <option value="income_management_dark_mode">Income Management Dark Mode</option>
 <option value="income_management_light_mode">Income Management Light Mode</option>
 <option value="islamic_hijri_calendar_dark_mode">Islamic Hijri Calendar Dark Mode</option>
 <option value="islamic_hijri_calendar_light_mode">Islamic Hijri Calendar Light Mode</option>
 <option value="long_note_editor_dark_mode">Long Note Editor Dark Mode</option>
 <option value="long_note_editor_light_mode">Long Note Editor Light Mode</option>
 <option value="more_dark_mode">More Dark Mode</option>
 <option value="more_light_mode">More Light Mode</option>
 <option value="new_edit_tasbeeh_dark_mode">New Edit Tasbeeh Dark Mode</option>
 <option value="new_edit_tasbeeh_light_mode">New Edit Tasbeeh Light Mode</option>
 <option value="notes_main_dark_mode">Notes Main Dark Mode</option>
 <option value="notes_main_light_mode">Notes Main Light Mode</option>
 <option value="note_media_attachment_viewer_dark_mode">Note Media Attachment Viewer Dark Mode</option>
 <option value="note_media_attachment_viewer_light_mode">Note Media Attachment Viewer Light Mode</option>
 <option value="notifications_settings_dark_mode">Notifications Settings Dark Mode</option>
 <option value="notifications_settings_light_mode">Notifications Settings Light Mode</option>
 <option value="personal_setup_dark_mode">Personal Setup Dark Mode</option>
 <option value="personal_setup_light_mode">Personal Setup Light Mode</option>
 <option value="pin_setup_change_dark_mode">Pin Setup Change Dark Mode</option>
 <option value="pin_setup_change_light_mode">Pin Setup Change Light Mode</option>
 <option value="prayer_times_dark_mode">Prayer Times Dark Mode</option>
 <option value="prayer_times_light_mode">Prayer Times Light Mode</option>
 <option value="quick_note_editor_dark_mode">Quick Note Editor Dark Mode</option>
 <option value="quick_note_editor_light_mode">Quick Note Editor Light Mode</option>
 <option value="settings_profile_dark_mode">Settings Profile Dark Mode</option>
 <option value="settings_profile_light_mode">Settings Profile Light Mode</option>
 <option value="splash_screen_dark_mode">Splash Screen Dark Mode</option>
 <option value="splash_screen_light_mode">Splash Screen Light Mode</option>
 <option value="tasbeeh_history_dark_mode">Tasbeeh History Dark Mode</option>
 <option value="tasbeeh_history_light_mode">Tasbeeh History Light Mode</option>
 <option value="tasbeeh_main_dark_mode">Tasbeeh Main Dark Mode</option>
 <option value="tasbeeh_main_light_mode">Tasbeeh Main Light Mode</option>
 <option value="tasbeeh_settings_dark_mode">Tasbeeh Settings Dark Mode</option>
 <option value="tasbeeh_settings_light_mode">Tasbeeh Settings Light Mode</option>
 <option value="tasks_reminders_dark_mode">Tasks Reminders Dark Mode</option>
  <option value="tasks_reminders_light_mode">Tasks Reminders Light Mode</option>
 <option value="timezone_selection_dark_mode">Timezone Selection Dark Mode</option>
 <option value="timezone_selection_light_mode">Timezone Selection Light Mode</option>

 </select>
 </div>
  )}
 
 {/* Mobile Canvas Frame */}
 <div className="w-full max-w-[412px] h-[892px] mx-auto relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-[40px] border-[8px] border-outline-variant/40 bg-transparent flex flex-col transform-gpu font-sans">
 {!isAppLoading && <PhoneWallpaperCanvas isDarkMode={isDarkMode} activeTab={activeTab} />}
  <div className={`flex-1 ${isAppLoading || activeTab.includes('splash_screen') ? 'overflow-hidden overscroll-none' : 'overflow-y-auto'} relative no-scrollbar w-full h-full z-10 momentum-canvas-viewport font-sans ${isAppLoading || activeTab.includes('splash_screen') ? '' : 'wallpaper-active'} ${hideBottomNav ? 'pb-0' : 'pb-32'}`}>
    <AnimatePresence mode="wait">
      {isAppLoading ? (
        <SplashScreen 
          key="initial-app-splash"
          onComplete={() => setIsAppLoading(false)} 
        />
      ) : (
        <motion.div
          key="main-app-screen-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <AppLockGuard>
            {renderScreen()}
          </AppLockGuard>
        </motion.div>
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
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    async function hydrateStores() {
      if (typeof localStorage !== 'undefined') {
        console.log('Hydrating from storage:', localStorage.getItem('momentum-finance-storage'));
        console.log('[Momentum Mount Audit] momentum-security-storage:', localStorage.getItem('momentum-security-storage'));
      }
      try {
        await Promise.all([
          useFinanceStore.persist.rehydrate(),
          useSecurityStore.persist.rehydrate(),
          useThemeStore.persist.rehydrate?.(),
          useRoutineStore.persist.rehydrate?.(),
        ]);
      } catch (err) {
        console.warn('[Momentum Hydration] Manual rehydrate error:', err);
      } finally {
        useFinanceStore.getState().setHasHydrated(true);
        useSecurityStore.getState().setHasHydrated(true);
        useRoutineStore.getState().setHasHydrated(true);
        setHasHydrated(true);
      }
    }
    hydrateStores();
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
