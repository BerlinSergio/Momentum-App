# MOMENTUM — AUTHORITATIVE PRODUCTION SCREEN INVENTORY
## Master Application Screen Registry, Architecture Mapping & Store Dependencies

**Audited Screen Count:** 84 registered production screens  
**Supported Modules:** 8 modules (Home & Core, Tasks & Habits, Finance, Notes & Media, Prayer & Dhikr, Calendars & Time, Settings & Security, Onboarding)  
**Themes:** Dark Mode and Light Mode 1:1 Parity Pairs  
**Languages:** English (Simple), Pashto (ps-AF), Afghan Dari (fa-AF)  
**Generated Date:** 2026-11-19T04:56:19.804Z

---

### SCREEN REGISTRY DIRECTORY

| # | Screen ID | Module | Theme | Component File | Key Stores | Total Controls | Description |
|---|-----------|--------|-------|----------------|------------|----------------|-------------|
| 1 | `home_dashboard_dark_mode` | home | dark | [HomeDashboardDarkMode.jsx](file:///C:/momentum/src/HomeDashboardDarkMode.jsx) | useFinanceStore, useLocationStore, useNavigationStore, usePrayerStore, useProfileStore, useRoutineStore, useTaskStore | 9 | Main dashboard with dynamic greeting, prayer strip, tasks, and routines |
| 2 | `home_dashboard_light_mode` | home | light | [HomeDashboardLightMode.jsx](file:///C:/momentum/src/HomeDashboardLightMode.jsx) | useFinanceStore, useLocationStore, useNavigationStore, usePrayerStore, useProfileStore, useRoutineStore, useTaskStore | 9 | Light mode main dashboard with full metrics and daily radiance |
| 3 | `splash_screen_dark_mode` | home | dark | [SplashScreenDarkMode.jsx](file:///C:/momentum/src/SplashScreenDarkMode.jsx) | None (Stateless/Local) | 0 | Initial startup splash screen with animated typography |
| 4 | `splash_screen_light_mode` | home | light | [SplashScreenLightMode.jsx](file:///C:/momentum/src/SplashScreenLightMode.jsx) | None (Stateless/Local) | 0 | Light mode startup splash screen |
| 5 | `tasks_reminders_dark_mode` | tasks | dark | [TasksRemindersDarkMode.jsx](file:///C:/momentum/src/TasksRemindersDarkMode.jsx) | useNavigationStore, useTaskStore | 18 | Todo list, agenda filter, and reminder management |
| 6 | `tasks_reminders_light_mode` | tasks | light | [TasksRemindersLightMode.jsx](file:///C:/momentum/src/TasksRemindersLightMode.jsx) | useNavigationStore, useTaskStore | 18 | Light mode task list with category filtering |
| 7 | `task_details_dark_mode` | tasks | dark | [TaskDetailsDarkMode.jsx](file:///C:/momentum/src/TaskDetailsDarkMode.jsx) | useNavigationStore, useTaskStore | 11 | Detailed view of a single task with completion and subtasks |
| 8 | `task_details_light_mode` | tasks | light | [TaskDetailsLightMode.jsx](file:///C:/momentum/src/TaskDetailsLightMode.jsx) | useNavigationStore, useTaskStore | 11 | Light mode task details view |
| 9 | `add_edit_task_dark_mode` | tasks | dark | [AddEditTaskDarkMode.jsx](file:///C:/momentum/src/AddEditTaskDarkMode.jsx) | useTaskStore | 28 | Create or edit a task with deadlines, category, and priority |
| 10 | `add_edit_task_light_mode` | tasks | light | [AddEditTaskLightMode.jsx](file:///C:/momentum/src/AddEditTaskLightMode.jsx) | useTaskStore | 28 | Light mode task creation and editor form |
| 11 | `daily_routine_dark_mode` | tasks | dark | [TasksRemindersDarkMode.jsx](file:///C:/momentum/src/TasksRemindersDarkMode.jsx) | useNavigationStore, useTaskStore | 18 | Habit list, completion tracker, and streak visualizer |
| 12 | `daily_routine_light_mode` | tasks | light | [TasksRemindersLightMode.jsx](file:///C:/momentum/src/TasksRemindersLightMode.jsx) | useNavigationStore, useTaskStore | 18 | Light mode habit tracking and daily routines |
| 13 | `routine_details_dark_mode` | tasks | dark | [RoutineDetailsDarkMode.jsx](file:///C:/momentum/src/RoutineDetailsDarkMode.jsx) | useNavigationStore, useRoutineStore | 10 | Individual habit details, streak history, and settings |
| 14 | `routine_details_light_mode` | tasks | light | [RoutineDetailsLightMode.jsx](file:///C:/momentum/src/RoutineDetailsLightMode.jsx) | useNavigationStore, useRoutineStore | 10 | Light mode routine details and streak history |
| 15 | `add_edit_routine_dark_mode` | tasks | dark | [AddEditRoutineDarkMode.jsx](file:///C:/momentum/src/AddEditRoutineDarkMode.jsx) | useRoutineStore | 33 | Configure routine recurrence, duration, sound, and notes |
| 16 | `add_edit_routine_light_mode` | tasks | light | [AddEditRoutineLightMode.jsx](file:///C:/momentum/src/AddEditRoutineLightMode.jsx) | useRoutineStore | 33 | Light mode routine creator and editor form |
| 17 | `finance_dashboard_dark_mode` | finance | dark | [FinanceExpenseTrackerDarkMode.jsx](file:///C:/momentum/src/FinanceExpenseTrackerDarkMode.jsx) | useFinanceStore, useNavigationStore | 39 | Overview of income, expenses, net balance, and monthly budget |
| 18 | `finance_dashboard_light_mode` | finance | light | [FinanceExpenseTrackerLightMode.jsx](file:///C:/momentum/src/FinanceExpenseTrackerLightMode.jsx) | useFinanceStore, useNavigationStore | 39 | Light mode financial overview and balance chart |
| 19 | `finance_expense_tracker_dark_mode` | finance | dark | [FinanceExpenseTrackerDarkMode.jsx](file:///C:/momentum/src/FinanceExpenseTrackerDarkMode.jsx) | useFinanceStore, useNavigationStore | 39 | Itemized expense list with category filter and search |
| 20 | `finance_expense_tracker_light_mode` | finance | light | [FinanceExpenseTrackerLightMode.jsx](file:///C:/momentum/src/FinanceExpenseTrackerLightMode.jsx) | useFinanceStore, useNavigationStore | 39 | Light mode itemized expense transaction history |
| 21 | `income_management_dark_mode` | finance | dark | [FinanceExpenseTrackerDarkMode.jsx](file:///C:/momentum/src/FinanceExpenseTrackerDarkMode.jsx) | useFinanceStore, useNavigationStore | 39 | Income stream management, recurring salaries, and deposits |
| 22 | `income_management_light_mode` | finance | light | [FinanceExpenseTrackerLightMode.jsx](file:///C:/momentum/src/FinanceExpenseTrackerLightMode.jsx) | useFinanceStore, useNavigationStore | 39 | Light mode income management and tracking |
| 23 | `add_edit_expense_dark_mode` | finance | dark | [AddEditExpenseDarkMode.jsx](file:///C:/momentum/src/AddEditExpenseDarkMode.jsx) | useFinanceStore | 19 | Log a new expense with category, account, and date |
| 24 | `add_edit_expense_light_mode` | finance | light | [AddEditExpenseLightMode.jsx](file:///C:/momentum/src/AddEditExpenseLightMode.jsx) | useFinanceStore | 19 | Light mode expense logging form |
| 25 | `add_edit_income_dark_mode` | finance | dark | [AddEditIncomeDarkMode.jsx](file:///C:/momentum/src/AddEditIncomeDarkMode.jsx) | useFinanceStore | 16 | Record an income entry with source and account |
| 26 | `add_edit_income_light_mode` | finance | light | [AddEditIncomeLightMode.jsx](file:///C:/momentum/src/AddEditIncomeLightMode.jsx) | useFinanceStore | 16 | Light mode income logging form |
| 27 | `notes_main_dark_mode` | notes | dark | [NotesMainDarkMode.jsx](file:///C:/momentum/src/NotesMainDarkMode.jsx) | useNotesStore | 13 | Journal entries, pinned reflections, and quick notes |
| 28 | `notes_main_light_mode` | notes | light | [NotesMainLightMode.jsx](file:///C:/momentum/src/NotesMainLightMode.jsx) | useNotesStore | 13 | Light mode notes and reflections list |
| 29 | `quick_note_editor_dark_mode` | notes | dark | [QuickNoteEditorDarkMode.jsx](file:///C:/momentum/src/QuickNoteEditorDarkMode.jsx) | useNavigationStore, useNotesStore | 37 | Rapid thought capture with attachments and tag support |
| 30 | `quick_note_editor_light_mode` | notes | light | [QuickNoteEditorLightMode.jsx](file:///C:/momentum/src/QuickNoteEditorLightMode.jsx) | useNavigationStore, useNotesStore | 37 | Light mode quick thought capture editor |
| 31 | `long_note_editor_dark_mode` | notes | dark | [LongNoteEditorDarkMode.jsx](file:///C:/momentum/src/LongNoteEditorDarkMode.jsx) | useNavigationStore, useNotesStore | 41 | Rich journal writing experience with formatting and media |
| 32 | `long_note_editor_light_mode` | notes | light | [LongNoteEditorLightMode.jsx](file:///C:/momentum/src/LongNoteEditorLightMode.jsx) | useNavigationStore, useNotesStore | 41 | Light mode rich document and reflection editor |
| 33 | `note_media_attachment_viewer_dark_mode` | notes | dark | [NoteMediaAttachmentViewerDarkMode.jsx](file:///C:/momentum/src/NoteMediaAttachmentViewerDarkMode.jsx) | useNotesStore | 26 | Full-screen viewer for photos, audio, and documents |
| 34 | `note_media_attachment_viewer_light_mode` | notes | light | [NoteMediaAttachmentViewerLightMode.jsx](file:///C:/momentum/src/NoteMediaAttachmentViewerLightMode.jsx) | useNotesStore | 26 | Light mode full-screen attachment viewer |
| 35 | `prayer_times_dark_mode` | prayer | dark | [PrayerTimesDarkMode.jsx](file:///C:/momentum/src/PrayerTimesDarkMode.jsx) | useLocationStore, usePrayerStore, useSettingsStore | 11 | Daily Salah timings, next prayer countdown, and Qibla compass |
| 36 | `prayer_times_light_mode` | prayer | light | [PrayerTimesLightMode.jsx](file:///C:/momentum/src/PrayerTimesLightMode.jsx) | useLocationStore, usePrayerStore, useSettingsStore | 11 | Light mode prayer timings and adhan schedule |
| 37 | `notifications_settings_dark_mode` | prayer | dark | [NotificationsSettingsDarkMode.jsx](file:///C:/momentum/src/NotificationsSettingsDarkMode.jsx) | usePrayerStore, useSettingsStore | 8 | Configure prayer notifications, adhan tones, and reminders |
| 38 | `notifications_settings_light_mode` | prayer | light | [NotificationsSettingsLightMode.jsx](file:///C:/momentum/src/NotificationsSettingsLightMode.jsx) | usePrayerStore, useSettingsStore | 8 | Light mode adhan and reminder notifications |
| 39 | `tasbeeh_main_dark_mode` | prayer | dark | [TasbeehMainDarkMode.jsx](file:///C:/momentum/src/TasbeehMainDarkMode.jsx) | useTasbeehStore | 17 | Interactive dhikr counter with tactile haptics and goal tracker |
| 40 | `tasbeeh_main_light_mode` | prayer | light | [TasbeehMainLightMode.jsx](file:///C:/momentum/src/TasbeehMainLightMode.jsx) | useTasbeehStore | 17 | Light mode digital tasbeeh counter |
| 41 | `tasbeeh_history_dark_mode` | prayer | dark | [TasbeehHistoryDarkMode.jsx](file:///C:/momentum/src/TasbeehHistoryDarkMode.jsx) | useTasbeehStore | 7 | Historical log of daily adhkar and completed sessions |
| 42 | `tasbeeh_history_light_mode` | prayer | light | [TasbeehHistoryLightMode.jsx](file:///C:/momentum/src/TasbeehHistoryLightMode.jsx) | useTasbeehStore | 7 | Light mode adhkar history logs |
| 43 | `tasbeeh_settings_dark_mode` | prayer | dark | [TasbeehSettingsDarkMode.jsx](file:///C:/momentum/src/TasbeehSettingsDarkMode.jsx) | useTasbeehStore | 10 | Customize dhikr presets, bead count, and vibration |
| 44 | `tasbeeh_settings_light_mode` | prayer | light | [TasbeehSettingsLightMode.jsx](file:///C:/momentum/src/TasbeehSettingsLightMode.jsx) | useTasbeehStore | 10 | Light mode tasbeeh preferences |
| 45 | `new_edit_tasbeeh_dark_mode` | prayer | dark | [NewEditTasbeehDarkMode.jsx](file:///C:/momentum/src/NewEditTasbeehDarkMode.jsx) | useTasbeehStore | 16 | Create a custom dhikr with Arabic text, target, and translation |
| 46 | `new_edit_tasbeeh_light_mode` | prayer | light | [NewEditTasbeehLightMode.jsx](file:///C:/momentum/src/NewEditTasbeehLightMode.jsx) | useTasbeehStore | 16 | Light mode custom dhikr editor |
| 47 | `calendars_main_dark_mode` | calendars | dark | [CalendarsMainDarkMode.jsx](file:///C:/momentum/src/CalendarsMainDarkMode.jsx) | useLocationStore, useTaskStore | 9 | Unified view across Gregorian, Hijri, and Solar Shamsi calendars |
| 48 | `calendars_main_light_mode` | calendars | light | [CalendarsMainLightMode.jsx](file:///C:/momentum/src/CalendarsMainLightMode.jsx) | useLocationStore, useTaskStore | 9 | Light mode multi-calendar overview |
| 49 | `gregorian_calendar_dark_mode` | calendars | dark | [GregorianCalendarDarkMode.jsx](file:///C:/momentum/src/GregorianCalendarDarkMode.jsx) | useCalendarStore, useFinanceStore, useRoutineStore, useTaskStore | 26 | Standard solar monthly calendar view with scheduled tasks |
| 50 | `gregorian_calendar_light_mode` | calendars | light | [GregorianCalendarLightMode.jsx](file:///C:/momentum/src/GregorianCalendarLightMode.jsx) | useCalendarStore, useFinanceStore, useRoutineStore, useTaskStore | 26 | Light mode Gregorian monthly calendar |
| 51 | `islamic_hijri_calendar_dark_mode` | calendars | dark | [IslamicHijriCalendarDarkMode.jsx](file:///C:/momentum/src/IslamicHijriCalendarDarkMode.jsx) | useCalendarStore, useRoutineStore | 23 | Lunar Islamic Hijri calendar with sacred months and holy nights |
| 52 | `islamic_hijri_calendar_light_mode` | calendars | light | [IslamicHijriCalendarLightMode.jsx](file:///C:/momentum/src/IslamicHijriCalendarLightMode.jsx) | useCalendarStore, useRoutineStore | 23 | Light mode Islamic lunar calendar |
| 53 | `afghan_solar_hijri_shamsi_calendar_dark_mode` | calendars | dark | [AfghanSolarHijriShamsiCalendarDarkMode.jsx](file:///C:/momentum/src/AfghanSolarHijriShamsiCalendarDarkMode.jsx) | useCalendarStore | 14 | Afghan Solar Hijri (Shamsi) calendar with seasonal markers |
| 54 | `afghan_solar_hijri_shamsi_calendar_light_mode` | calendars | light | [AfghanSolarHijriShamsiCalendarLightMode.jsx](file:///C:/momentum/src/AfghanSolarHijriShamsiCalendarLightMode.jsx) | useCalendarStore | 14 | Light mode Afghan Solar Hijri calendar |
| 55 | `city_selection_dark_mode` | calendars | dark | [CitySelectionDarkMode.jsx](file:///C:/momentum/src/CitySelectionDarkMode.jsx) | useLocationStore | 17 | Select geographical location for accurate prayer times & timezones |
| 56 | `city_selection_light_mode` | calendars | light | [CitySelectionLightMode.jsx](file:///C:/momentum/src/CitySelectionLightMode.jsx) | useLocationStore | 17 | Light mode city and GPS location selector |
| 57 | `timezone_selection_dark_mode` | calendars | dark | [TimezoneSelectionDarkMode.jsx](file:///C:/momentum/src/TimezoneSelectionDarkMode.jsx) | useProfileStore, useTimeStore | 12 | Configure standard and astronomical timezone offsets |
| 58 | `timezone_selection_light_mode` | calendars | light | [TimezoneSelectionLightMode.jsx](file:///C:/momentum/src/TimezoneSelectionLightMode.jsx) | useProfileStore, useTimeStore | 12 | Light mode timezone selector |
| 59 | `more_dark_mode` | settings | dark | [MoreDarkMode.jsx](file:///C:/momentum/src/MoreDarkMode.jsx) | useLocationStore, useNavigationStore, useNotesStore, usePrayerStore, useProfileStore, useTasbeehStore | 13 | User profile stats, shortcuts hub, and daily radiance card |
| 60 | `more_light_mode` | settings | light | [MoreLightMode.jsx](file:///C:/momentum/src/MoreLightMode.jsx) | useLocationStore, useNavigationStore, useNotesStore, usePrayerStore, useProfileStore, useTasbeehStore | 13 | Light mode user profile hub and quick modules |
| 61 | `settings_profile_dark_mode` | settings | dark | [SettingsProfileDarkMode.jsx](file:///C:/momentum/src/SettingsProfileDarkMode.jsx) | useLocaleStore, useNavigationStore, useProfileStore, useSecurityStore, useThemeStore | 11 | System preferences, user profile, security, and developer options |
| 62 | `settings_profile_light_mode` | settings | light | [SettingsProfileLightMode.jsx](file:///C:/momentum/src/SettingsProfileLightMode.jsx) | useLocaleStore, useNavigationStore, useProfileStore, useSecurityStore, useThemeStore | 11 | Light mode system settings and preferences |
| 63 | `edit_profile_dark_mode` | settings | dark | [EditProfileDarkMode.jsx](file:///C:/momentum/src/EditProfileDarkMode.jsx) | usePrayerStore, useProfileStore | 13 | Update user name, email, avatar image, and credentials |
| 64 | `edit_profile_light_mode` | settings | light | [EditProfileLightMode.jsx](file:///C:/momentum/src/EditProfileLightMode.jsx) | usePrayerStore, useProfileStore | 13 | Light mode profile editor form |
| 65 | `appearance_dark_mode` | settings | dark | [AppearanceDarkMode.jsx](file:///C:/momentum/src/AppearanceDarkMode.jsx) | useThemeStore | 11 | Theme toggle, background wallpapers, and blur customization |
| 66 | `appearance_light_mode` | settings | light | [AppearanceLightMode.jsx](file:///C:/momentum/src/AppearanceLightMode.jsx) | useThemeStore | 11 | Light mode appearance preferences |
| 67 | `background_preview_blur_control_dark_mode` | settings | dark | [BackgroundPreviewBlurControlDarkMode.jsx](file:///C:/momentum/src/BackgroundPreviewBlurControlDarkMode.jsx) | useThemeStore | 7 | Fine-tune background wallpaper blur and dark mode dimming intensity |
| 68 | `background_preview_blur_control_light_mode` | settings | light | [BackgroundPreviewBlurControlLightMode.jsx](file:///C:/momentum/src/BackgroundPreviewBlurControlLightMode.jsx) | useThemeStore | 7 | Light mode wallpaper blur intensity slider |
| 69 | `background_wallpaper_library_dark_mode` | settings | dark | [BackgroundWallpaperLibraryDarkMode.jsx](file:///C:/momentum/src/BackgroundWallpaperLibraryDarkMode.jsx) | useThemeStore | 18 | Curated and custom high-resolution background wallpapers |
| 70 | `background_wallpaper_library_light_mode` | settings | light | [BackgroundWallpaperLibraryLightMode.jsx](file:///C:/momentum/src/BackgroundWallpaperLibraryLightMode.jsx) | useThemeStore | 18 | Light mode wallpaper gallery |
| 71 | `app_lock_dark_mode` | settings | dark | [AppLockDarkMode.jsx](file:///C:/momentum/src/AppLockDarkMode.jsx) | useSecurityStore | 18 | Configure PIN protection, auto-lock timeout, and privacy veil |
| 72 | `app_lock_light_mode` | settings | light | [AppLockLightMode.jsx](file:///C:/momentum/src/AppLockLightMode.jsx) | useSecurityStore | 18 | Light mode app lock and vault security settings |
| 73 | `biometric_settings_dark_mode` | settings | dark | [BiometricSettingsDarkMode.jsx](file:///C:/momentum/src/BiometricSettingsDarkMode.jsx) | useSecurityStore | 6 | Fingerprint and platform biometric authenticator integration |
| 74 | `biometric_settings_light_mode` | settings | light | [BiometricSettingsLightMode.jsx](file:///C:/momentum/src/BiometricSettingsLightMode.jsx) | useSecurityStore | 6 | Light mode biometric authentication preferences |
| 75 | `pin_setup_change_dark_mode` | settings | dark | [PinSetupChangeDarkMode.jsx](file:///C:/momentum/src/PinSetupChangeDarkMode.jsx) | useProfileStore, useSecurityStore | 11 | Setup, change, or remove 4-digit PBKDF2 security PIN |
| 76 | `pin_setup_change_light_mode` | settings | light | [PinSetupChangeLightMode.jsx](file:///C:/momentum/src/PinSetupChangeLightMode.jsx) | useProfileStore, useSecurityStore | 11 | Light mode PIN configuration and verification keypad |
| 77 | `backup_restore_dark_mode` | settings | dark | [BackupRestoreDarkMode.jsx](file:///C:/momentum/src/BackupRestoreDarkMode.jsx) | None (Stateless/Local) | 19 | AES-256-GCM encrypted backup export and cross-device data recovery |
| 78 | `backup_restore_light_mode` | settings | light | [BackupRestoreLightMode.jsx](file:///C:/momentum/src/BackupRestoreLightMode.jsx) | None (Stateless/Local) | 19 | Light mode encrypted data backup and restore manager |
| 79 | `language_settings_dark_mode` | settings | dark | [LanguageSettingsDarkMode.jsx](file:///C:/momentum/src/LanguageSettingsDarkMode.jsx) | useLocaleStore | 4 | Select application language (English, Pashto, Afghan Dari) and numerals |
| 80 | `language_settings_light_mode` | settings | light | [LanguageSettingsLightMode.jsx](file:///C:/momentum/src/LanguageSettingsLightMode.jsx) | useLocaleStore | 4 | Light mode language selection and numeral configuration |
| 81 | `about_momentum_dark_mode` | settings | dark | [AboutMomentumDarkMode.jsx](file:///C:/momentum/src/AboutMomentumDarkMode.jsx) | None (Stateless/Local) | 2 | Application version, architecture summary, and philosophy |
| 82 | `about_momentum_light_mode` | settings | light | [AboutMomentumLightMode.jsx](file:///C:/momentum/src/AboutMomentumLightMode.jsx) | None (Stateless/Local) | 2 | Light mode about screen and legal credits |
| 83 | `personal_setup_dark_mode` | onboarding | dark | [PersonalSetupDarkMode.jsx](file:///C:/momentum/src/PersonalSetupDarkMode.jsx) | useLocaleStore, useLocationStore, useProfileStore, useSettingsStore | 9 | First launch profile setup: Name, City, and baseline preferences |
| 84 | `personal_setup_light_mode` | onboarding | light | [PersonalSetupLightMode.jsx](file:///C:/momentum/src/PersonalSetupLightMode.jsx) | useLocaleStore, useLocationStore, useProfileStore, useSettingsStore | 9 | Light mode first launch onboarding flow |

---

### DETAILED MODULE BREAKDOWN

#### Module: Home & Core (4 Screens)

##### `home_dashboard_dark_mode` — Home Dashboard (Dark)
- **Component File:** `src/HomeDashboardDarkMode.jsx` (`HomeDashboardDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Main dashboard with dynamic greeting, prayer strip, tasks, and routines
- **Interactive Controls:** 9 (Buttons: 8, Inputs/Textareas: 0, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore, useLocationStore, useNavigationStore, usePrayerStore, useProfileStore, useRoutineStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `home_dashboard_light_mode` — Home Dashboard (Light)
- **Component File:** `src/HomeDashboardLightMode.jsx` (`HomeDashboardLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode main dashboard with full metrics and daily radiance
- **Interactive Controls:** 9 (Buttons: 8, Inputs/Textareas: 0, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore, useLocationStore, useNavigationStore, usePrayerStore, useProfileStore, useRoutineStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `splash_screen_dark_mode` — Splash Screen (Dark)
- **Component File:** `src/SplashScreenDarkMode.jsx` (`SplashScreenDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Initial startup splash screen with animated typography
- **Interactive Controls:** 0 (Buttons: 0, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** None (Stateless/Local)
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `splash_screen_light_mode` — Splash Screen (Light)
- **Component File:** `src/SplashScreenLightMode.jsx` (`SplashScreenLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode startup splash screen
- **Interactive Controls:** 0 (Buttons: 0, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** None (Stateless/Local)
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

#### Module: Tasks & Habits (12 Screens)

##### `tasks_reminders_dark_mode` — Tasks & Reminders (Dark)
- **Component File:** `src/TasksRemindersDarkMode.jsx` (`TasksRemindersDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Todo list, agenda filter, and reminder management
- **Interactive Controls:** 18 (Buttons: 14, Inputs/Textareas: 0, Clickable Cards: 4)
- **Store Dependencies:** useNavigationStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `tasks_reminders_light_mode` — Tasks & Reminders (Light)
- **Component File:** `src/TasksRemindersLightMode.jsx` (`TasksRemindersLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode task list with category filtering
- **Interactive Controls:** 18 (Buttons: 14, Inputs/Textareas: 0, Clickable Cards: 4)
- **Store Dependencies:** useNavigationStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `task_details_dark_mode` — Task Details (Dark)
- **Component File:** `src/TaskDetailsDarkMode.jsx` (`TaskDetailsDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Detailed view of a single task with completion and subtasks
- **Interactive Controls:** 11 (Buttons: 10, Inputs/Textareas: 0, Clickable Cards: 1)
- **Store Dependencies:** useNavigationStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `task_details_light_mode` — Task Details (Light)
- **Component File:** `src/TaskDetailsLightMode.jsx` (`TaskDetailsLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode task details view
- **Interactive Controls:** 11 (Buttons: 10, Inputs/Textareas: 0, Clickable Cards: 1)
- **Store Dependencies:** useNavigationStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `add_edit_task_dark_mode` — Add / Edit Task (Dark)
- **Component File:** `src/AddEditTaskDarkMode.jsx` (`AddEditTaskDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Create or edit a task with deadlines, category, and priority
- **Interactive Controls:** 28 (Buttons: 19, Inputs/Textareas: 4, Clickable Cards: 5)
- **Store Dependencies:** useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `add_edit_task_light_mode` — Add / Edit Task (Light)
- **Component File:** `src/AddEditTaskLightMode.jsx` (`AddEditTaskLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode task creation and editor form
- **Interactive Controls:** 28 (Buttons: 19, Inputs/Textareas: 4, Clickable Cards: 5)
- **Store Dependencies:** useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `daily_routine_dark_mode` — Daily Routine (Dark)
- **Component File:** `src/TasksRemindersDarkMode.jsx` (`TasksRemindersDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Habit list, completion tracker, and streak visualizer
- **Interactive Controls:** 18 (Buttons: 14, Inputs/Textareas: 0, Clickable Cards: 4)
- **Store Dependencies:** useNavigationStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `daily_routine_light_mode` — Daily Routine (Light)
- **Component File:** `src/TasksRemindersLightMode.jsx` (`TasksRemindersLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode habit tracking and daily routines
- **Interactive Controls:** 18 (Buttons: 14, Inputs/Textareas: 0, Clickable Cards: 4)
- **Store Dependencies:** useNavigationStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `routine_details_dark_mode` — Routine Details (Dark)
- **Component File:** `src/RoutineDetailsDarkMode.jsx` (`RoutineDetailsDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Individual habit details, streak history, and settings
- **Interactive Controls:** 10 (Buttons: 10, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** useNavigationStore, useRoutineStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `routine_details_light_mode` — Routine Details (Light)
- **Component File:** `src/RoutineDetailsLightMode.jsx` (`RoutineDetailsLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode routine details and streak history
- **Interactive Controls:** 10 (Buttons: 10, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** useNavigationStore, useRoutineStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `add_edit_routine_dark_mode` — Add / Edit Routine (Dark)
- **Component File:** `src/AddEditRoutineDarkMode.jsx` (`AddEditRoutineDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Configure routine recurrence, duration, sound, and notes
- **Interactive Controls:** 33 (Buttons: 27, Inputs/Textareas: 3, Clickable Cards: 3)
- **Store Dependencies:** useRoutineStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `add_edit_routine_light_mode` — Add / Edit Routine (Light)
- **Component File:** `src/AddEditRoutineLightMode.jsx` (`AddEditRoutineLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode routine creator and editor form
- **Interactive Controls:** 33 (Buttons: 27, Inputs/Textareas: 3, Clickable Cards: 3)
- **Store Dependencies:** useRoutineStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

#### Module: Finance (10 Screens)

##### `finance_dashboard_dark_mode` — Finance Dashboard (Dark)
- **Component File:** `src/FinanceExpenseTrackerDarkMode.jsx` (`FinanceExpenseTrackerDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Overview of income, expenses, net balance, and monthly budget
- **Interactive Controls:** 39 (Buttons: 34, Inputs/Textareas: 4, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore, useNavigationStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `finance_dashboard_light_mode` — Finance Dashboard (Light)
- **Component File:** `src/FinanceExpenseTrackerLightMode.jsx` (`FinanceExpenseTrackerLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode financial overview and balance chart
- **Interactive Controls:** 39 (Buttons: 34, Inputs/Textareas: 4, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore, useNavigationStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `finance_expense_tracker_dark_mode` — Expense Tracker (Dark)
- **Component File:** `src/FinanceExpenseTrackerDarkMode.jsx` (`FinanceExpenseTrackerDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Itemized expense list with category filter and search
- **Interactive Controls:** 39 (Buttons: 34, Inputs/Textareas: 4, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore, useNavigationStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `finance_expense_tracker_light_mode` — Expense Tracker (Light)
- **Component File:** `src/FinanceExpenseTrackerLightMode.jsx` (`FinanceExpenseTrackerLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode itemized expense transaction history
- **Interactive Controls:** 39 (Buttons: 34, Inputs/Textareas: 4, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore, useNavigationStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `income_management_dark_mode` — Income Management (Dark)
- **Component File:** `src/FinanceExpenseTrackerDarkMode.jsx` (`FinanceExpenseTrackerDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Income stream management, recurring salaries, and deposits
- **Interactive Controls:** 39 (Buttons: 34, Inputs/Textareas: 4, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore, useNavigationStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `income_management_light_mode` — Income Management (Light)
- **Component File:** `src/FinanceExpenseTrackerLightMode.jsx` (`FinanceExpenseTrackerLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode income management and tracking
- **Interactive Controls:** 39 (Buttons: 34, Inputs/Textareas: 4, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore, useNavigationStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `add_edit_expense_dark_mode` — Add / Edit Expense (Dark)
- **Component File:** `src/AddEditExpenseDarkMode.jsx` (`AddEditExpenseDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Log a new expense with category, account, and date
- **Interactive Controls:** 19 (Buttons: 15, Inputs/Textareas: 3, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `add_edit_expense_light_mode` — Add / Edit Expense (Light)
- **Component File:** `src/AddEditExpenseLightMode.jsx` (`AddEditExpenseLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode expense logging form
- **Interactive Controls:** 19 (Buttons: 15, Inputs/Textareas: 3, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `add_edit_income_dark_mode` — Add / Edit Income (Dark)
- **Component File:** `src/AddEditIncomeDarkMode.jsx` (`AddEditIncomeDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Record an income entry with source and account
- **Interactive Controls:** 16 (Buttons: 12, Inputs/Textareas: 3, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `add_edit_income_light_mode` — Add / Edit Income (Light)
- **Component File:** `src/AddEditIncomeLightMode.jsx` (`AddEditIncomeLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode income logging form
- **Interactive Controls:** 16 (Buttons: 12, Inputs/Textareas: 3, Clickable Cards: 1)
- **Store Dependencies:** useFinanceStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

#### Module: Notes & Media (8 Screens)

##### `notes_main_dark_mode` — Notes & Reflections (Dark)
- **Component File:** `src/NotesMainDarkMode.jsx` (`NotesMainDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Journal entries, pinned reflections, and quick notes
- **Interactive Controls:** 13 (Buttons: 11, Inputs/Textareas: 1, Clickable Cards: 1)
- **Store Dependencies:** useNotesStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `notes_main_light_mode` — Notes & Reflections (Light)
- **Component File:** `src/NotesMainLightMode.jsx` (`NotesMainLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode notes and reflections list
- **Interactive Controls:** 13 (Buttons: 11, Inputs/Textareas: 1, Clickable Cards: 1)
- **Store Dependencies:** useNotesStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `quick_note_editor_dark_mode` — Quick Note Editor (Dark)
- **Component File:** `src/QuickNoteEditorDarkMode.jsx` (`QuickNoteEditorDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Rapid thought capture with attachments and tag support
- **Interactive Controls:** 37 (Buttons: 31, Inputs/Textareas: 3, Clickable Cards: 3)
- **Store Dependencies:** useNavigationStore, useNotesStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `quick_note_editor_light_mode` — Quick Note Editor (Light)
- **Component File:** `src/QuickNoteEditorLightMode.jsx` (`QuickNoteEditorLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode quick thought capture editor
- **Interactive Controls:** 37 (Buttons: 31, Inputs/Textareas: 3, Clickable Cards: 3)
- **Store Dependencies:** useNavigationStore, useNotesStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `long_note_editor_dark_mode` — Long Note Editor (Dark)
- **Component File:** `src/LongNoteEditorDarkMode.jsx` (`LongNoteEditorDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Rich journal writing experience with formatting and media
- **Interactive Controls:** 41 (Buttons: 29, Inputs/Textareas: 10, Clickable Cards: 2)
- **Store Dependencies:** useNavigationStore, useNotesStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `long_note_editor_light_mode` — Long Note Editor (Light)
- **Component File:** `src/LongNoteEditorLightMode.jsx` (`LongNoteEditorLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode rich document and reflection editor
- **Interactive Controls:** 41 (Buttons: 29, Inputs/Textareas: 10, Clickable Cards: 2)
- **Store Dependencies:** useNavigationStore, useNotesStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `note_media_attachment_viewer_dark_mode` — Attachment Viewer (Dark)
- **Component File:** `src/NoteMediaAttachmentViewerDarkMode.jsx` (`NoteMediaAttachmentViewerDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Full-screen viewer for photos, audio, and documents
- **Interactive Controls:** 26 (Buttons: 18, Inputs/Textareas: 1, Clickable Cards: 7)
- **Store Dependencies:** useNotesStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `note_media_attachment_viewer_light_mode` — Attachment Viewer (Light)
- **Component File:** `src/NoteMediaAttachmentViewerLightMode.jsx` (`NoteMediaAttachmentViewerLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode full-screen attachment viewer
- **Interactive Controls:** 26 (Buttons: 18, Inputs/Textareas: 1, Clickable Cards: 7)
- **Store Dependencies:** useNotesStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

#### Module: Prayer & Dhikr (12 Screens)

##### `prayer_times_dark_mode` — Prayer Times (Dark)
- **Component File:** `src/PrayerTimesDarkMode.jsx` (`PrayerTimesDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Daily Salah timings, next prayer countdown, and Qibla compass
- **Interactive Controls:** 11 (Buttons: 9, Inputs/Textareas: 0, Clickable Cards: 2)
- **Store Dependencies:** useLocationStore, usePrayerStore, useSettingsStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `prayer_times_light_mode` — Prayer Times (Light)
- **Component File:** `src/PrayerTimesLightMode.jsx` (`PrayerTimesLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode prayer timings and adhan schedule
- **Interactive Controls:** 11 (Buttons: 9, Inputs/Textareas: 0, Clickable Cards: 2)
- **Store Dependencies:** useLocationStore, usePrayerStore, useSettingsStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `notifications_settings_dark_mode` — Notifications & Adhan (Dark)
- **Component File:** `src/NotificationsSettingsDarkMode.jsx` (`NotificationsSettingsDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Configure prayer notifications, adhan tones, and reminders
- **Interactive Controls:** 8 (Buttons: 6, Inputs/Textareas: 1, Clickable Cards: 1)
- **Store Dependencies:** usePrayerStore, useSettingsStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `notifications_settings_light_mode` — Notifications & Adhan (Light)
- **Component File:** `src/NotificationsSettingsLightMode.jsx` (`NotificationsSettingsLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode adhan and reminder notifications
- **Interactive Controls:** 8 (Buttons: 6, Inputs/Textareas: 1, Clickable Cards: 1)
- **Store Dependencies:** usePrayerStore, useSettingsStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `tasbeeh_main_dark_mode` — Digital Tasbeeh (Dark)
- **Component File:** `src/TasbeehMainDarkMode.jsx` (`TasbeehMainDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Interactive dhikr counter with tactile haptics and goal tracker
- **Interactive Controls:** 17 (Buttons: 15, Inputs/Textareas: 0, Clickable Cards: 2)
- **Store Dependencies:** useTasbeehStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `tasbeeh_main_light_mode` — Digital Tasbeeh (Light)
- **Component File:** `src/TasbeehMainLightMode.jsx` (`TasbeehMainLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode digital tasbeeh counter
- **Interactive Controls:** 17 (Buttons: 15, Inputs/Textareas: 0, Clickable Cards: 2)
- **Store Dependencies:** useTasbeehStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `tasbeeh_history_dark_mode` — Tasbeeh History (Dark)
- **Component File:** `src/TasbeehHistoryDarkMode.jsx` (`TasbeehHistoryDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Historical log of daily adhkar and completed sessions
- **Interactive Controls:** 7 (Buttons: 7, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** useTasbeehStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `tasbeeh_history_light_mode` — Tasbeeh History (Light)
- **Component File:** `src/TasbeehHistoryLightMode.jsx` (`TasbeehHistoryLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode adhkar history logs
- **Interactive Controls:** 7 (Buttons: 7, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** useTasbeehStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `tasbeeh_settings_dark_mode` — Tasbeeh Settings (Dark)
- **Component File:** `src/TasbeehSettingsDarkMode.jsx` (`TasbeehSettingsDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Customize dhikr presets, bead count, and vibration
- **Interactive Controls:** 10 (Buttons: 6, Inputs/Textareas: 4, Clickable Cards: 0)
- **Store Dependencies:** useTasbeehStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `tasbeeh_settings_light_mode` — Tasbeeh Settings (Light)
- **Component File:** `src/TasbeehSettingsLightMode.jsx` (`TasbeehSettingsLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode tasbeeh preferences
- **Interactive Controls:** 10 (Buttons: 6, Inputs/Textareas: 4, Clickable Cards: 0)
- **Store Dependencies:** useTasbeehStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `new_edit_tasbeeh_dark_mode` — Add / Edit Tasbeeh (Dark)
- **Component File:** `src/NewEditTasbeehDarkMode.jsx` (`NewEditTasbeehDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Create a custom dhikr with Arabic text, target, and translation
- **Interactive Controls:** 16 (Buttons: 12, Inputs/Textareas: 4, Clickable Cards: 0)
- **Store Dependencies:** useTasbeehStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `new_edit_tasbeeh_light_mode` — Add / Edit Tasbeeh (Light)
- **Component File:** `src/NewEditTasbeehLightMode.jsx` (`NewEditTasbeehLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode custom dhikr editor
- **Interactive Controls:** 16 (Buttons: 12, Inputs/Textareas: 4, Clickable Cards: 0)
- **Store Dependencies:** useTasbeehStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

#### Module: Calendars & Time (12 Screens)

##### `calendars_main_dark_mode` — Calendars Hub (Dark)
- **Component File:** `src/CalendarsMainDarkMode.jsx` (`CalendarsMainDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Unified view across Gregorian, Hijri, and Solar Shamsi calendars
- **Interactive Controls:** 9 (Buttons: 6, Inputs/Textareas: 0, Clickable Cards: 3)
- **Store Dependencies:** useLocationStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `calendars_main_light_mode` — Calendars Hub (Light)
- **Component File:** `src/CalendarsMainLightMode.jsx` (`CalendarsMainLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode multi-calendar overview
- **Interactive Controls:** 9 (Buttons: 6, Inputs/Textareas: 0, Clickable Cards: 3)
- **Store Dependencies:** useLocationStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `gregorian_calendar_dark_mode` — Gregorian Calendar (Dark)
- **Component File:** `src/GregorianCalendarDarkMode.jsx` (`GregorianCalendarDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Standard solar monthly calendar view with scheduled tasks
- **Interactive Controls:** 26 (Buttons: 24, Inputs/Textareas: 2, Clickable Cards: 0)
- **Store Dependencies:** useCalendarStore, useFinanceStore, useRoutineStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `gregorian_calendar_light_mode` — Gregorian Calendar (Light)
- **Component File:** `src/GregorianCalendarLightMode.jsx` (`GregorianCalendarLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode Gregorian monthly calendar
- **Interactive Controls:** 26 (Buttons: 24, Inputs/Textareas: 2, Clickable Cards: 0)
- **Store Dependencies:** useCalendarStore, useFinanceStore, useRoutineStore, useTaskStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `islamic_hijri_calendar_dark_mode` — Islamic Hijri Calendar (Dark)
- **Component File:** `src/IslamicHijriCalendarDarkMode.jsx` (`IslamicHijriCalendarDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Lunar Islamic Hijri calendar with sacred months and holy nights
- **Interactive Controls:** 23 (Buttons: 19, Inputs/Textareas: 3, Clickable Cards: 1)
- **Store Dependencies:** useCalendarStore, useRoutineStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `islamic_hijri_calendar_light_mode` — Islamic Hijri Calendar (Light)
- **Component File:** `src/IslamicHijriCalendarLightMode.jsx` (`IslamicHijriCalendarLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode Islamic lunar calendar
- **Interactive Controls:** 23 (Buttons: 19, Inputs/Textareas: 3, Clickable Cards: 1)
- **Store Dependencies:** useCalendarStore, useRoutineStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `afghan_solar_hijri_shamsi_calendar_dark_mode` — Afghan Shamsi Calendar (Dark)
- **Component File:** `src/AfghanSolarHijriShamsiCalendarDarkMode.jsx` (`AfghanSolarHijriShamsiCalendarDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Afghan Solar Hijri (Shamsi) calendar with seasonal markers
- **Interactive Controls:** 14 (Buttons: 10, Inputs/Textareas: 3, Clickable Cards: 1)
- **Store Dependencies:** useCalendarStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `afghan_solar_hijri_shamsi_calendar_light_mode` — Afghan Shamsi Calendar (Light)
- **Component File:** `src/AfghanSolarHijriShamsiCalendarLightMode.jsx` (`AfghanSolarHijriShamsiCalendarLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode Afghan Solar Hijri calendar
- **Interactive Controls:** 14 (Buttons: 10, Inputs/Textareas: 3, Clickable Cards: 1)
- **Store Dependencies:** useCalendarStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `city_selection_dark_mode` — City & Coordinates (Dark)
- **Component File:** `src/CitySelectionDarkMode.jsx` (`CitySelectionDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Select geographical location for accurate prayer times & timezones
- **Interactive Controls:** 17 (Buttons: 11, Inputs/Textareas: 4, Clickable Cards: 2)
- **Store Dependencies:** useLocationStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `city_selection_light_mode` — City & Coordinates (Light)
- **Component File:** `src/CitySelectionLightMode.jsx` (`CitySelectionLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode city and GPS location selector
- **Interactive Controls:** 17 (Buttons: 11, Inputs/Textareas: 4, Clickable Cards: 2)
- **Store Dependencies:** useLocationStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `timezone_selection_dark_mode` — Timezone Selection (Dark)
- **Component File:** `src/TimezoneSelectionDarkMode.jsx` (`TimezoneSelectionDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Configure standard and astronomical timezone offsets
- **Interactive Controls:** 12 (Buttons: 8, Inputs/Textareas: 2, Clickable Cards: 2)
- **Store Dependencies:** useProfileStore, useTimeStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `timezone_selection_light_mode` — Timezone Selection (Light)
- **Component File:** `src/TimezoneSelectionLightMode.jsx` (`TimezoneSelectionLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode timezone selector
- **Interactive Controls:** 12 (Buttons: 8, Inputs/Textareas: 2, Clickable Cards: 2)
- **Store Dependencies:** useProfileStore, useTimeStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

#### Module: Settings & Security (24 Screens)

##### `more_dark_mode` — More Screen (Dark)
- **Component File:** `src/MoreDarkMode.jsx` (`MoreDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** User profile stats, shortcuts hub, and daily radiance card
- **Interactive Controls:** 13 (Buttons: 4, Inputs/Textareas: 0, Clickable Cards: 9)
- **Store Dependencies:** useLocationStore, useNavigationStore, useNotesStore, usePrayerStore, useProfileStore, useTasbeehStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `more_light_mode` — More Screen (Light)
- **Component File:** `src/MoreLightMode.jsx` (`MoreLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode user profile hub and quick modules
- **Interactive Controls:** 13 (Buttons: 4, Inputs/Textareas: 0, Clickable Cards: 9)
- **Store Dependencies:** useLocationStore, useNavigationStore, useNotesStore, usePrayerStore, useProfileStore, useTasbeehStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `settings_profile_dark_mode` — Settings & Profile (Dark)
- **Component File:** `src/SettingsProfileDarkMode.jsx` (`SettingsProfileDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** System preferences, user profile, security, and developer options
- **Interactive Controls:** 11 (Buttons: 2, Inputs/Textareas: 0, Clickable Cards: 9)
- **Store Dependencies:** useLocaleStore, useNavigationStore, useProfileStore, useSecurityStore, useThemeStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `settings_profile_light_mode` — Settings & Profile (Light)
- **Component File:** `src/SettingsProfileLightMode.jsx` (`SettingsProfileLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode system settings and preferences
- **Interactive Controls:** 11 (Buttons: 2, Inputs/Textareas: 0, Clickable Cards: 9)
- **Store Dependencies:** useLocaleStore, useNavigationStore, useProfileStore, useSecurityStore, useThemeStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `edit_profile_dark_mode` — Edit Profile (Dark)
- **Component File:** `src/EditProfileDarkMode.jsx` (`EditProfileDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Update user name, email, avatar image, and credentials
- **Interactive Controls:** 13 (Buttons: 9, Inputs/Textareas: 4, Clickable Cards: 0)
- **Store Dependencies:** usePrayerStore, useProfileStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `edit_profile_light_mode` — Edit Profile (Light)
- **Component File:** `src/EditProfileLightMode.jsx` (`EditProfileLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode profile editor form
- **Interactive Controls:** 13 (Buttons: 9, Inputs/Textareas: 4, Clickable Cards: 0)
- **Store Dependencies:** usePrayerStore, useProfileStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `appearance_dark_mode` — Appearance & Themes (Dark)
- **Component File:** `src/AppearanceDarkMode.jsx` (`AppearanceDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Theme toggle, background wallpapers, and blur customization
- **Interactive Controls:** 11 (Buttons: 7, Inputs/Textareas: 0, Clickable Cards: 4)
- **Store Dependencies:** useThemeStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `appearance_light_mode` — Appearance & Themes (Light)
- **Component File:** `src/AppearanceLightMode.jsx` (`AppearanceLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode appearance preferences
- **Interactive Controls:** 11 (Buttons: 7, Inputs/Textareas: 0, Clickable Cards: 4)
- **Store Dependencies:** useThemeStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `background_preview_blur_control_dark_mode` — Blur & Dimming Control (Dark)
- **Component File:** `src/BackgroundPreviewBlurControlDarkMode.jsx` (`BackgroundPreviewBlurControlDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Fine-tune background wallpaper blur and dark mode dimming intensity
- **Interactive Controls:** 7 (Buttons: 4, Inputs/Textareas: 3, Clickable Cards: 0)
- **Store Dependencies:** useThemeStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `background_preview_blur_control_light_mode` — Blur & Dimming Control (Light)
- **Component File:** `src/BackgroundPreviewBlurControlLightMode.jsx` (`BackgroundPreviewBlurControlLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode wallpaper blur intensity slider
- **Interactive Controls:** 7 (Buttons: 4, Inputs/Textareas: 3, Clickable Cards: 0)
- **Store Dependencies:** useThemeStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `background_wallpaper_library_dark_mode` — Wallpaper Library (Dark)
- **Component File:** `src/BackgroundWallpaperLibraryDarkMode.jsx` (`BackgroundWallpaperLibraryDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Curated and custom high-resolution background wallpapers
- **Interactive Controls:** 18 (Buttons: 14, Inputs/Textareas: 1, Clickable Cards: 3)
- **Store Dependencies:** useThemeStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `background_wallpaper_library_light_mode` — Wallpaper Library (Light)
- **Component File:** `src/BackgroundWallpaperLibraryLightMode.jsx` (`BackgroundWallpaperLibraryLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode wallpaper gallery
- **Interactive Controls:** 18 (Buttons: 14, Inputs/Textareas: 1, Clickable Cards: 3)
- **Store Dependencies:** useThemeStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `app_lock_dark_mode` — App Lock & Security (Dark)
- **Component File:** `src/AppLockDarkMode.jsx` (`AppLockDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Configure PIN protection, auto-lock timeout, and privacy veil
- **Interactive Controls:** 18 (Buttons: 14, Inputs/Textareas: 4, Clickable Cards: 0)
- **Store Dependencies:** useSecurityStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `app_lock_light_mode` — App Lock & Security (Light)
- **Component File:** `src/AppLockLightMode.jsx` (`AppLockLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode app lock and vault security settings
- **Interactive Controls:** 18 (Buttons: 14, Inputs/Textareas: 4, Clickable Cards: 0)
- **Store Dependencies:** useSecurityStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `biometric_settings_dark_mode` — Biometric Settings (Dark)
- **Component File:** `src/BiometricSettingsDarkMode.jsx` (`BiometricSettingsDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Fingerprint and platform biometric authenticator integration
- **Interactive Controls:** 6 (Buttons: 6, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** useSecurityStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `biometric_settings_light_mode` — Biometric Settings (Light)
- **Component File:** `src/BiometricSettingsLightMode.jsx` (`BiometricSettingsLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode biometric authentication preferences
- **Interactive Controls:** 6 (Buttons: 6, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** useSecurityStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `pin_setup_change_dark_mode` — PIN Setup & Change (Dark)
- **Component File:** `src/PinSetupChangeDarkMode.jsx` (`PinSetupChangeDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Setup, change, or remove 4-digit PBKDF2 security PIN
- **Interactive Controls:** 11 (Buttons: 5, Inputs/Textareas: 3, Clickable Cards: 3)
- **Store Dependencies:** useProfileStore, useSecurityStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `pin_setup_change_light_mode` — PIN Setup & Change (Light)
- **Component File:** `src/PinSetupChangeLightMode.jsx` (`PinSetupChangeLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode PIN configuration and verification keypad
- **Interactive Controls:** 11 (Buttons: 5, Inputs/Textareas: 3, Clickable Cards: 3)
- **Store Dependencies:** useProfileStore, useSecurityStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `backup_restore_dark_mode` — Backup & Restore (Dark)
- **Component File:** `src/BackupRestoreDarkMode.jsx` (`BackupRestoreDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** AES-256-GCM encrypted backup export and cross-device data recovery
- **Interactive Controls:** 19 (Buttons: 13, Inputs/Textareas: 6, Clickable Cards: 0)
- **Store Dependencies:** None (Stateless/Local)
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `backup_restore_light_mode` — Backup & Restore (Light)
- **Component File:** `src/BackupRestoreLightMode.jsx` (`BackupRestoreLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode encrypted data backup and restore manager
- **Interactive Controls:** 19 (Buttons: 13, Inputs/Textareas: 6, Clickable Cards: 0)
- **Store Dependencies:** None (Stateless/Local)
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `language_settings_dark_mode` — Language & Localization (Dark)
- **Component File:** `src/LanguageSettingsDarkMode.jsx` (`LanguageSettingsDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Select application language (English, Pashto, Afghan Dari) and numerals
- **Interactive Controls:** 4 (Buttons: 4, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** useLocaleStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `language_settings_light_mode` — Language & Localization (Light)
- **Component File:** `src/LanguageSettingsLightMode.jsx` (`LanguageSettingsLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode language selection and numeral configuration
- **Interactive Controls:** 4 (Buttons: 4, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** useLocaleStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `about_momentum_dark_mode` — About Momentum (Dark)
- **Component File:** `src/AboutMomentumDarkMode.jsx` (`AboutMomentumDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** Application version, architecture summary, and philosophy
- **Interactive Controls:** 2 (Buttons: 2, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** None (Stateless/Local)
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `about_momentum_light_mode` — About Momentum (Light)
- **Component File:** `src/AboutMomentumLightMode.jsx` (`AboutMomentumLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode about screen and legal credits
- **Interactive Controls:** 2 (Buttons: 2, Inputs/Textareas: 0, Clickable Cards: 0)
- **Store Dependencies:** None (Stateless/Local)
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

#### Module: Onboarding (2 Screens)

##### `personal_setup_dark_mode` — Personal Setup Onboarding (Dark)
- **Component File:** `src/PersonalSetupDarkMode.jsx` (`PersonalSetupDarkMode`)
- **Theme Variant:** dark
- **Purpose & User Goal:** First launch profile setup: Name, City, and baseline preferences
- **Interactive Controls:** 9 (Buttons: 4, Inputs/Textareas: 1, Clickable Cards: 4)
- **Store Dependencies:** useLocaleStore, useLocationStore, useProfileStore, useSettingsStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

##### `personal_setup_light_mode` — Personal Setup Onboarding (Light)
- **Component File:** `src/PersonalSetupLightMode.jsx` (`PersonalSetupLightMode`)
- **Theme Variant:** light
- **Purpose & User Goal:** Light mode first launch onboarding flow
- **Interactive Controls:** 9 (Buttons: 4, Inputs/Textareas: 1, Clickable Cards: 4)
- **Store Dependencies:** useLocaleStore, useLocationStore, useProfileStore, useSettingsStore
- **Languages Supported:** English, Pashto, Afghan Dari (RTL)

