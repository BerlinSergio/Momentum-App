import React, { useState, useEffect } from 'react';
import { WallpaperProvider, useWallpaper } from './context/WallpaperContext';
import GlobalBackground from './components/GlobalBackground';
import WallpaperSelector from './components/WallpaperSelector';
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
import CurrencySelectionDarkMode from './CurrencySelectionDarkMode';
import CurrencySelectionLightMode from './CurrencySelectionLightMode';
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
import IncomeManagementDarkMode from './IncomeManagementDarkMode';
import IncomeManagementLightMode from './IncomeManagementLightMode';
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
import PrayerNotificationSettingsDarkMode from './PrayerNotificationSettingsDarkMode';
import PrayerNotificationSettingsLightMode from './PrayerNotificationSettingsLightMode';
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
import TasksRemindersDarkMode1 from './TasksRemindersDarkMode1';
import TasksRemindersDarkMode2 from './TasksRemindersDarkMode2';
import TasksRemindersLightMode1 from './TasksRemindersLightMode1';
import TasksRemindersLightMode2 from './TasksRemindersLightMode2';
import TimezoneSelectionDarkMode from './TimezoneSelectionDarkMode';
import TimezoneSelectionLightMode from './TimezoneSelectionLightMode';


import { ThemeProvider, useTheme } from './context/ThemeContext';

function PhoneWallpaperCanvas({ isDarkMode, activeTab }) {
  const { currentWallpaper, blurLevel } = useWallpaper();

  if (activeTab.includes('splash_screen') || !currentWallpaper) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <img
        src={currentWallpaper.url}
        alt={currentWallpaper.title || "Active Wallpaper"}
        onError={(e) => {
          if (currentWallpaper.fallback && e.target.src !== currentWallpaper.fallback) {
            e.target.src = currentWallpaper.fallback;
          }
        }}
        className="w-full h-full object-cover transition-all duration-300 scale-105"
        style={{ filter: `blur(${blurLevel}px)` }}
      />
      {/* Dark Mode Wallpaper Dimming Overlay: strictly for Dark Mode screens, directly on top of wallpaper, behind UI */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 pointer-events-none ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

function AppContent() {
 const [activeTab, setActiveTab] = useState(() => {
 const params = new URLSearchParams(window.location.search);
 return params.get('screen') || 'home_dashboard_dark_mode';
 });
 
 const [isWallpaperSelectorOpen, setIsWallpaperSelectorOpen] = useState(false);
 const { syncThemeToScreen } = useTheme();

 // Auto-sync theme based on active screen name
 useEffect(() => {
 syncThemeToScreen(activeTab);
 }, [activeTab]);

 useEffect(() => {
 const handlePopState = () => {
 const params = new URLSearchParams(window.location.search);
 const screen = params.get('screen');
 if (screen) setActiveTab(screen);
 };
 window.addEventListener('popstate', handlePopState);
 return () => window.removeEventListener('popstate', handlePopState);
 }, []);

 const handleNavChange = (e) => {
 const newScreen = e.target.value;
 setActiveTab(newScreen);
 const newUrl = new URL(window.location);
 newUrl.searchParams.set('screen', newScreen);
 window.history.pushState({}, '', newUrl);
 };

 const renderScreen = () => {
 switch (activeTab) {
 case 'about_momentum_dark_mode': return <AboutMomentumDarkMode setActiveTab={setActiveTab} />;
 case 'about_momentum_light_mode': return <AboutMomentumLightMode setActiveTab={setActiveTab} />;
 case 'add_edit_expense_dark_mode': return <AddEditExpenseDarkMode setActiveTab={setActiveTab} />;
 case 'add_edit_expense_light_mode': return <AddEditExpenseLightMode setActiveTab={setActiveTab} />;
 case 'add_edit_income_dark_mode': return <AddEditIncomeDarkMode setActiveTab={setActiveTab} />;
 case 'add_edit_income_light_mode': return <AddEditIncomeLightMode setActiveTab={setActiveTab} />;
 case 'add_edit_routine_dark_mode': return <AddEditRoutineDarkMode setActiveTab={setActiveTab} />;
 case 'add_edit_routine_light_mode': return <AddEditRoutineLightMode setActiveTab={setActiveTab} />;
 case 'add_edit_task_dark_mode': return <AddEditTaskDarkMode setActiveTab={setActiveTab} />;
 case 'add_edit_task_light_mode': return <AddEditTaskLightMode setActiveTab={setActiveTab} />;
 case 'afghan_solar_hijri_shamsi_calendar_dark_mode': return <AfghanSolarHijriShamsiCalendarDarkMode setActiveTab={setActiveTab} />;
 case 'afghan_solar_hijri_shamsi_calendar_light_mode': return <AfghanSolarHijriShamsiCalendarLightMode setActiveTab={setActiveTab} />;
 case 'appearance_dark_mode': return <AppearanceDarkMode setActiveTab={setActiveTab} />;
 case 'appearance_light_mode': return <AppearanceLightMode setActiveTab={setActiveTab} />;
 case 'app_lock_dark_mode': return <AppLockDarkMode setActiveTab={setActiveTab} />;
 case 'app_lock_light_mode': return <AppLockLightMode setActiveTab={setActiveTab} />;
 case 'background_preview_blur_control_dark_mode': return <BackgroundPreviewBlurControlDarkMode setActiveTab={setActiveTab} />;
 case 'background_preview_blur_control_light_mode': return <BackgroundPreviewBlurControlLightMode setActiveTab={setActiveTab} />;
 case 'background_wallpaper_library_dark_mode': return <BackgroundWallpaperLibraryDarkMode setActiveTab={setActiveTab} />;
 case 'background_wallpaper_library_light_mode': return <BackgroundWallpaperLibraryLightMode setActiveTab={setActiveTab} />;
 case 'biometric_settings_dark_mode': return <BiometricSettingsDarkMode setActiveTab={setActiveTab} />;
 case 'biometric_settings_light_mode': return <BiometricSettingsLightMode setActiveTab={setActiveTab} />;
 case 'calendars_main_dark_mode': return <CalendarsMainDarkMode setActiveTab={setActiveTab} />;
 case 'calendars_main_light_mode': return <CalendarsMainLightMode setActiveTab={setActiveTab} />;
 case 'city_selection_dark_mode': return <CitySelectionDarkMode setActiveTab={setActiveTab} />;
 case 'city_selection_light_mode': return <CitySelectionLightMode setActiveTab={setActiveTab} />;
 case 'currency_selection_dark_mode': return <CurrencySelectionDarkMode setActiveTab={setActiveTab} />;
 case 'currency_selection_light_mode': return <CurrencySelectionLightMode setActiveTab={setActiveTab} />;
 case 'daily_routine_dark_mode': return <DailyRoutineDarkMode setActiveTab={setActiveTab} />;
 case 'daily_routine_light_mode': return <DailyRoutineLightMode setActiveTab={setActiveTab} />;
 case 'edit_profile_dark_mode': return <EditProfileDarkMode setActiveTab={setActiveTab} />;
 case 'edit_profile_light_mode': return <EditProfileLightMode setActiveTab={setActiveTab} />;
 case 'finance_expense_tracker_dark_mode': return <FinanceExpenseTrackerDarkMode setActiveTab={setActiveTab} />;
 case 'finance_expense_tracker_light_mode': return <FinanceExpenseTrackerLightMode setActiveTab={setActiveTab} />;
 case 'gregorian_calendar_dark_mode': return <GregorianCalendarDarkMode setActiveTab={setActiveTab} />;
 case 'gregorian_calendar_light_mode': return <GregorianCalendarLightMode setActiveTab={setActiveTab} />;
 case 'home_dashboard_dark_mode': return <HomeDashboardDarkMode setActiveTab={setActiveTab} />;
 case 'home_dashboard_light_mode': return <HomeDashboardLightMode setActiveTab={setActiveTab} />;
 case 'income_management_dark_mode': return <IncomeManagementDarkMode setActiveTab={setActiveTab} />;
 case 'income_management_light_mode': return <IncomeManagementLightMode setActiveTab={setActiveTab} />;
 case 'islamic_hijri_calendar_dark_mode': return <IslamicHijriCalendarDarkMode setActiveTab={setActiveTab} />;
 case 'islamic_hijri_calendar_light_mode': return <IslamicHijriCalendarLightMode setActiveTab={setActiveTab} />;
 case 'long_note_editor_dark_mode': return <LongNoteEditorDarkMode setActiveTab={setActiveTab} />;
 case 'long_note_editor_light_mode': return <LongNoteEditorLightMode setActiveTab={setActiveTab} />;
 case 'more_dark_mode': return <MoreDarkMode setActiveTab={setActiveTab} />;
 case 'more_light_mode': return <MoreLightMode setActiveTab={setActiveTab} />;
 case 'new_edit_tasbeeh_dark_mode': return <NewEditTasbeehDarkMode setActiveTab={setActiveTab} />;
 case 'new_edit_tasbeeh_light_mode': return <NewEditTasbeehLightMode setActiveTab={setActiveTab} />;
 case 'notes_main_dark_mode': return <NotesMainDarkMode setActiveTab={setActiveTab} />;
 case 'notes_main_light_mode': return <NotesMainLightMode setActiveTab={setActiveTab} />;
 case 'note_media_attachment_viewer_dark_mode': return <NoteMediaAttachmentViewerDarkMode setActiveTab={setActiveTab} />;
 case 'note_media_attachment_viewer_light_mode': return <NoteMediaAttachmentViewerLightMode setActiveTab={setActiveTab} />;
 case 'notifications_settings_dark_mode': return <NotificationsSettingsDarkMode setActiveTab={setActiveTab} />;
 case 'notifications_settings_light_mode': return <NotificationsSettingsLightMode setActiveTab={setActiveTab} />;
 case 'personal_setup_dark_mode': return <PersonalSetupDarkMode setActiveTab={setActiveTab} />;
 case 'personal_setup_light_mode': return <PersonalSetupLightMode setActiveTab={setActiveTab} />;
 case 'pin_setup_change_dark_mode': return <PinSetupChangeDarkMode setActiveTab={setActiveTab} />;
 case 'pin_setup_change_light_mode': return <PinSetupChangeLightMode setActiveTab={setActiveTab} />;
 case 'prayer_notification_settings_dark_mode': return <PrayerNotificationSettingsDarkMode setActiveTab={setActiveTab} />;
 case 'prayer_notification_settings_light_mode': return <PrayerNotificationSettingsLightMode setActiveTab={setActiveTab} />;
 case 'prayer_times_dark_mode': return <PrayerTimesDarkMode setActiveTab={setActiveTab} />;
 case 'prayer_times_light_mode': return <PrayerTimesLightMode setActiveTab={setActiveTab} />;
 case 'quick_note_editor_dark_mode': return <QuickNoteEditorDarkMode setActiveTab={setActiveTab} />;
 case 'quick_note_editor_light_mode': return <QuickNoteEditorLightMode setActiveTab={setActiveTab} />;
 case 'settings_profile_dark_mode': return <SettingsProfileDarkMode setActiveTab={setActiveTab} />;
 case 'settings_profile_light_mode': return <SettingsProfileLightMode setActiveTab={setActiveTab} />;
 case 'splash_screen_dark_mode': return <SplashScreenDarkMode setActiveTab={setActiveTab} />;
 case 'splash_screen_light_mode': return <SplashScreenLightMode setActiveTab={setActiveTab} />;
 case 'tasbeeh_history_dark_mode': return <TasbeehHistoryDarkMode setActiveTab={setActiveTab} />;
 case 'tasbeeh_history_light_mode': return <TasbeehHistoryLightMode setActiveTab={setActiveTab} />;
 case 'tasbeeh_main_dark_mode': return <TasbeehMainDarkMode setActiveTab={setActiveTab} />;
 case 'tasbeeh_main_light_mode': return <TasbeehMainLightMode setActiveTab={setActiveTab} />;
 case 'tasbeeh_settings_dark_mode': return <TasbeehSettingsDarkMode setActiveTab={setActiveTab} />;
 case 'tasbeeh_settings_light_mode': return <TasbeehSettingsLightMode setActiveTab={setActiveTab} />;
 case 'tasks_reminders_dark_mode_1': return <TasksRemindersDarkMode1 setActiveTab={setActiveTab} />;
 case 'tasks_reminders_dark_mode_2': return <TasksRemindersDarkMode2 setActiveTab={setActiveTab} />;
 case 'tasks_reminders_light_mode_1': return <TasksRemindersLightMode1 setActiveTab={setActiveTab} />;
 case 'tasks_reminders_light_mode_2': return <TasksRemindersLightMode2 setActiveTab={setActiveTab} />;
 case 'timezone_selection_dark_mode': return <TimezoneSelectionDarkMode setActiveTab={setActiveTab} />;
 case 'timezone_selection_light_mode': return <TimezoneSelectionLightMode setActiveTab={setActiveTab} />;

 default: return <div className="p-8 text-white">Screen not found: {activeTab}</div>;
 }
 };

 const isDarkMode = activeTab.includes('_dark_mode');

 return (
 <>
 <div className="min-h-screen w-full flex items-center justify-center p-6 relative">
 <GlobalBackground isDarkMode={isDarkMode} />
 
 {/* Dev Tools Sidebar (Fixed Top-Left) */}
 <div className="fixed top-6 left-6 w-72 z-[9999] bg-white/90 /90 backdrop-blur-xl p-4 rounded-3xl shadow-2xl border border-outline-variant/50 /10 flex flex-col gap-3">
 <div className="flex justify-between items-center px-1">
 <label className="text-xs uppercase tracking-wider text-on-surface-variant dark:text-on-surface-variant font-bold">Dev Navigator</label>
 <button 
 onClick={() => setIsWallpaperSelectorOpen(true)}
 className="text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold hover:text-blue-500 transition-colors"
 >
 BG Engine
 </button>
 </div>
 <select 
 value={activeTab} 
 onChange={handleNavChange}
 className="bg-surface-container-low dark:bg-surface-container text-on-surface text-sm rounded-xl border border-outline-variant /10 p-3 outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
 <option value="currency_selection_dark_mode">Currency Selection Dark Mode</option>
 <option value="currency_selection_light_mode">Currency Selection Light Mode</option>
 <option value="daily_routine_dark_mode">Daily Routine Dark Mode</option>
 <option value="daily_routine_light_mode">Daily Routine Light Mode</option>
 <option value="edit_profile_dark_mode">Edit Profile Dark Mode</option>
 <option value="edit_profile_light_mode">Edit Profile Light Mode</option>
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
 <option value="prayer_notification_settings_dark_mode">Prayer Notification Settings Dark Mode</option>
 <option value="prayer_notification_settings_light_mode">Prayer Notification Settings Light Mode</option>
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
 <option value="tasks_reminders_dark_mode_1">Tasks Reminders Dark Mode 1</option>
 <option value="tasks_reminders_dark_mode_2">Tasks Reminders Dark Mode 2</option>
 <option value="tasks_reminders_light_mode_1">Tasks Reminders Light Mode 1</option>
 <option value="tasks_reminders_light_mode_2">Tasks Reminders Light Mode 2</option>
 <option value="timezone_selection_dark_mode">Timezone Selection Dark Mode</option>
 <option value="timezone_selection_light_mode">Timezone Selection Light Mode</option>

 </select>
 </div>
 
 {/* Mobile Canvas Frame */}
 <div className="w-full max-w-[412px] h-[892px] mx-auto relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-[40px] border-[8px] border-outline-variant/40 bg-transparent flex flex-col transform-gpu">
 <PhoneWallpaperCanvas isDarkMode={isDarkMode} activeTab={activeTab} />
 <div className={`flex-1 ${activeTab.includes('splash_screen') ? 'overflow-hidden overscroll-none' : 'overflow-y-auto'} relative no-scrollbar w-full h-full z-10 momentum-canvas-viewport ${activeTab.includes('splash_screen') ? '' : 'wallpaper-active'}`}>
 {renderScreen()}
 </div>
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
 return (
 <ThemeProvider>
 <WallpaperProvider>
 <AppContent />
 </WallpaperProvider>
 </ThemeProvider>
 );
}
