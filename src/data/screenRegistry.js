/**
 * Momentum Screen Registry — Authoritative Single Source of Truth
 * Defines all available screens, module classifications, theme variants,
 * and metadata for navigation and the Developer Screen Navigator.
 */

export const SCREEN_MODULES = [
  { id: 'all', label: 'All Screens' },
  { id: 'home', label: 'Home & Core' },
  { id: 'tasks', label: 'Tasks & Habits' },
  { id: 'finance', label: 'Finance' },
  { id: 'notes', label: 'Notes & Media' },
  { id: 'prayer', label: 'Prayer & Dhikr' },
  { id: 'calendars', label: 'Calendars & Time' },
  { id: 'settings', label: 'Settings & Security' },
  { id: 'onboarding', label: 'Onboarding' },
];

export const ALL_SCREENS = [
  // ── HOME & CORE ────────────────────────────────────────────────────────────
  {
    id: 'home_dashboard_dark_mode',
    name: 'Home Dashboard (Dark)',
    module: 'home',
    theme: 'dark',
    description: 'Main dashboard with dynamic greeting, prayer strip, tasks, and routines',
    isDefault: true,
  },
  {
    id: 'home_dashboard_light_mode',
    name: 'Home Dashboard (Light)',
    module: 'home',
    theme: 'light',
    description: 'Light mode main dashboard with full metrics and daily radiance',
  },
  {
    id: 'splash_screen_dark_mode',
    name: 'Splash Screen (Dark)',
    module: 'home',
    theme: 'dark',
    description: 'Initial startup splash screen with animated typography',
  },
  {
    id: 'splash_screen_light_mode',
    name: 'Splash Screen (Light)',
    module: 'home',
    theme: 'light',
    description: 'Light mode startup splash screen',
  },

  // ── TASKS & HABITS ─────────────────────────────────────────────────────────
  {
    id: 'tasks_reminders_dark_mode',
    name: 'Tasks & Reminders (Dark)',
    module: 'tasks',
    theme: 'dark',
    description: 'Todo list, agenda filter, and reminder management',
  },
  {
    id: 'tasks_reminders_light_mode',
    name: 'Tasks & Reminders (Light)',
    module: 'tasks',
    theme: 'light',
    description: 'Light mode task list with category filtering',
  },
  {
    id: 'task_details_dark_mode',
    name: 'Task Details (Dark)',
    module: 'tasks',
    theme: 'dark',
    description: 'Detailed view of a single task with completion and subtasks',
  },
  {
    id: 'task_details_light_mode',
    name: 'Task Details (Light)',
    module: 'tasks',
    theme: 'light',
    description: 'Light mode task details view',
  },
  {
    id: 'add_edit_task_dark_mode',
    name: 'Add / Edit Task (Dark)',
    module: 'tasks',
    theme: 'dark',
    description: 'Create or edit a task with deadlines, category, and priority',
  },
  {
    id: 'add_edit_task_light_mode',
    name: 'Add / Edit Task (Light)',
    module: 'tasks',
    theme: 'light',
    description: 'Light mode task creation and editor form',
  },
  {
    id: 'daily_routine_dark_mode',
    name: 'Daily Routine (Dark)',
    module: 'tasks',
    theme: 'dark',
    description: 'Habit list, completion tracker, and streak visualizer',
  },
  {
    id: 'daily_routine_light_mode',
    name: 'Daily Routine (Light)',
    module: 'tasks',
    theme: 'light',
    description: 'Light mode habit tracking and daily routines',
  },
  {
    id: 'routine_details_dark_mode',
    name: 'Routine Details (Dark)',
    module: 'tasks',
    theme: 'dark',
    description: 'Individual habit details, streak history, and settings',
  },
  {
    id: 'routine_details_light_mode',
    name: 'Routine Details (Light)',
    module: 'tasks',
    theme: 'light',
    description: 'Light mode routine details and streak history',
  },
  {
    id: 'add_edit_routine_dark_mode',
    name: 'Add / Edit Routine (Dark)',
    module: 'tasks',
    theme: 'dark',
    description: 'Configure routine recurrence, duration, sound, and notes',
  },
  {
    id: 'add_edit_routine_light_mode',
    name: 'Add / Edit Routine (Light)',
    module: 'tasks',
    theme: 'light',
    description: 'Light mode routine creator and editor form',
  },

  // ── FINANCE ────────────────────────────────────────────────────────────────
  {
    id: 'finance_dashboard_dark_mode',
    name: 'Finance Dashboard (Dark)',
    module: 'finance',
    theme: 'dark',
    description: 'Overview of income, expenses, net balance, and monthly budget',
  },
  {
    id: 'finance_dashboard_light_mode',
    name: 'Finance Dashboard (Light)',
    module: 'finance',
    theme: 'light',
    description: 'Light mode financial overview and balance chart',
  },
  {
    id: 'finance_expense_tracker_dark_mode',
    name: 'Expense Tracker (Dark)',
    module: 'finance',
    theme: 'dark',
    description: 'Itemized expense list with category filter and search',
  },
  {
    id: 'finance_expense_tracker_light_mode',
    name: 'Expense Tracker (Light)',
    module: 'finance',
    theme: 'light',
    description: 'Light mode itemized expense transaction history',
  },
  {
    id: 'income_management_dark_mode',
    name: 'Income Management (Dark)',
    module: 'finance',
    theme: 'dark',
    description: 'Income stream management, recurring salaries, and deposits',
  },
  {
    id: 'income_management_light_mode',
    name: 'Income Management (Light)',
    module: 'finance',
    theme: 'light',
    description: 'Light mode income management and tracking',
  },
  {
    id: 'add_edit_expense_dark_mode',
    name: 'Add / Edit Expense (Dark)',
    module: 'finance',
    theme: 'dark',
    description: 'Log a new expense with category, account, and date',
  },
  {
    id: 'add_edit_expense_light_mode',
    name: 'Add / Edit Expense (Light)',
    module: 'finance',
    theme: 'light',
    description: 'Light mode expense logging form',
  },
  {
    id: 'add_edit_income_dark_mode',
    name: 'Add / Edit Income (Dark)',
    module: 'finance',
    theme: 'dark',
    description: 'Record an income entry with source and account',
  },
  {
    id: 'add_edit_income_light_mode',
    name: 'Add / Edit Income (Light)',
    module: 'finance',
    theme: 'light',
    description: 'Light mode income logging form',
  },

  // ── NOTES & MEDIA ──────────────────────────────────────────────────────────
  {
    id: 'notes_main_dark_mode',
    name: 'Notes & Reflections (Dark)',
    module: 'notes',
    theme: 'dark',
    description: 'Journal entries, pinned reflections, and quick notes',
  },
  {
    id: 'notes_main_light_mode',
    name: 'Notes & Reflections (Light)',
    module: 'notes',
    theme: 'light',
    description: 'Light mode notes and reflections list',
  },
  {
    id: 'quick_note_editor_dark_mode',
    name: 'Quick Note Editor (Dark)',
    module: 'notes',
    theme: 'dark',
    description: 'Rapid thought capture with attachments and tag support',
  },
  {
    id: 'quick_note_editor_light_mode',
    name: 'Quick Note Editor (Light)',
    module: 'notes',
    theme: 'light',
    description: 'Light mode quick thought capture editor',
  },
  {
    id: 'long_note_editor_dark_mode',
    name: 'Long Note Editor (Dark)',
    module: 'notes',
    theme: 'dark',
    description: 'Rich journal writing experience with formatting and media',
  },
  {
    id: 'long_note_editor_light_mode',
    name: 'Long Note Editor (Light)',
    module: 'notes',
    theme: 'light',
    description: 'Light mode rich document and reflection editor',
  },
  {
    id: 'note_media_attachment_viewer_dark_mode',
    name: 'Attachment Viewer (Dark)',
    module: 'notes',
    theme: 'dark',
    description: 'Full-screen viewer for photos, audio, and documents',
  },
  {
    id: 'note_media_attachment_viewer_light_mode',
    name: 'Attachment Viewer (Light)',
    module: 'notes',
    theme: 'light',
    description: 'Light mode full-screen attachment viewer',
  },

  // ── PRAYER & DHIKR ─────────────────────────────────────────────────────────
  {
    id: 'prayer_times_dark_mode',
    name: 'Prayer Times (Dark)',
    module: 'prayer',
    theme: 'dark',
    description: 'Daily Salah timings, next prayer countdown, and Qibla compass',
  },
  {
    id: 'prayer_times_light_mode',
    name: 'Prayer Times (Light)',
    module: 'prayer',
    theme: 'light',
    description: 'Light mode prayer timings and adhan schedule',
  },
  {
    id: 'notifications_settings_dark_mode',
    name: 'Notifications & Adhan (Dark)',
    module: 'prayer',
    theme: 'dark',
    description: 'Configure prayer notifications, adhan tones, and reminders',
  },
  {
    id: 'notifications_settings_light_mode',
    name: 'Notifications & Adhan (Light)',
    module: 'prayer',
    theme: 'light',
    description: 'Light mode adhan and reminder notifications',
  },
  {
    id: 'tasbeeh_main_dark_mode',
    name: 'Digital Tasbeeh (Dark)',
    module: 'prayer',
    theme: 'dark',
    description: 'Interactive dhikr counter with tactile haptics and goal tracker',
  },
  {
    id: 'tasbeeh_main_light_mode',
    name: 'Digital Tasbeeh (Light)',
    module: 'prayer',
    theme: 'light',
    description: 'Light mode digital tasbeeh counter',
  },
  {
    id: 'tasbeeh_history_dark_mode',
    name: 'Tasbeeh History (Dark)',
    module: 'prayer',
    theme: 'dark',
    description: 'Historical log of daily adhkar and completed sessions',
  },
  {
    id: 'tasbeeh_history_light_mode',
    name: 'Tasbeeh History (Light)',
    module: 'prayer',
    theme: 'light',
    description: 'Light mode adhkar history logs',
  },
  {
    id: 'tasbeeh_settings_dark_mode',
    name: 'Tasbeeh Settings (Dark)',
    module: 'prayer',
    theme: 'dark',
    description: 'Customize dhikr presets, bead count, and vibration',
  },
  {
    id: 'tasbeeh_settings_light_mode',
    name: 'Tasbeeh Settings (Light)',
    module: 'prayer',
    theme: 'light',
    description: 'Light mode tasbeeh preferences',
  },
  {
    id: 'new_edit_tasbeeh_dark_mode',
    name: 'Add / Edit Tasbeeh (Dark)',
    module: 'prayer',
    theme: 'dark',
    description: 'Create a custom dhikr with Arabic text, target, and translation',
  },
  {
    id: 'new_edit_tasbeeh_light_mode',
    name: 'Add / Edit Tasbeeh (Light)',
    module: 'prayer',
    theme: 'light',
    description: 'Light mode custom dhikr editor',
  },

  // ── CALENDARS & TIME ───────────────────────────────────────────────────────
  {
    id: 'calendars_main_dark_mode',
    name: 'Calendars Hub (Dark)',
    module: 'calendars',
    theme: 'dark',
    description: 'Unified view across Gregorian, Hijri, and Solar Shamsi calendars',
  },
  {
    id: 'calendars_main_light_mode',
    name: 'Calendars Hub (Light)',
    module: 'calendars',
    theme: 'light',
    description: 'Light mode multi-calendar overview',
  },
  {
    id: 'gregorian_calendar_dark_mode',
    name: 'Gregorian Calendar (Dark)',
    module: 'calendars',
    theme: 'dark',
    description: 'Standard solar monthly calendar view with scheduled tasks',
  },
  {
    id: 'gregorian_calendar_light_mode',
    name: 'Gregorian Calendar (Light)',
    module: 'calendars',
    theme: 'light',
    description: 'Light mode Gregorian monthly calendar',
  },
  {
    id: 'islamic_hijri_calendar_dark_mode',
    name: 'Islamic Hijri Calendar (Dark)',
    module: 'calendars',
    theme: 'dark',
    description: 'Lunar Islamic Hijri calendar with sacred months and holy nights',
  },
  {
    id: 'islamic_hijri_calendar_light_mode',
    name: 'Islamic Hijri Calendar (Light)',
    module: 'calendars',
    theme: 'light',
    description: 'Light mode Islamic lunar calendar',
  },
  {
    id: 'afghan_solar_hijri_shamsi_calendar_dark_mode',
    name: 'Afghan Shamsi Calendar (Dark)',
    module: 'calendars',
    theme: 'dark',
    description: 'Afghan Solar Hijri (Shamsi) calendar with seasonal markers',
  },
  {
    id: 'afghan_solar_hijri_shamsi_calendar_light_mode',
    name: 'Afghan Shamsi Calendar (Light)',
    module: 'calendars',
    theme: 'light',
    description: 'Light mode Afghan Solar Hijri calendar',
  },
  {
    id: 'city_selection_dark_mode',
    name: 'City & Coordinates (Dark)',
    module: 'calendars',
    theme: 'dark',
    description: 'Select geographical location for accurate prayer times & timezones',
  },
  {
    id: 'city_selection_light_mode',
    name: 'City & Coordinates (Light)',
    module: 'calendars',
    theme: 'light',
    description: 'Light mode city and GPS location selector',
  },
  {
    id: 'timezone_selection_dark_mode',
    name: 'Timezone Selection (Dark)',
    module: 'calendars',
    theme: 'dark',
    description: 'Configure standard and astronomical timezone offsets',
  },
  {
    id: 'timezone_selection_light_mode',
    name: 'Timezone Selection (Light)',
    module: 'calendars',
    theme: 'light',
    description: 'Light mode timezone selector',
  },

  // ── SETTINGS & SECURITY ───────────────────────────────────────────────────
  {
    id: 'more_dark_mode',
    name: 'More Screen (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'User profile stats, shortcuts hub, and daily radiance card',
  },
  {
    id: 'more_light_mode',
    name: 'More Screen (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode user profile hub and quick modules',
  },
  {
    id: 'settings_profile_dark_mode',
    name: 'Settings & Profile (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'System preferences, user profile, security, and developer options',
  },
  {
    id: 'settings_profile_light_mode',
    name: 'Settings & Profile (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode system settings and preferences',
  },
  {
    id: 'edit_profile_dark_mode',
    name: 'Edit Profile (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'Update user name, email, avatar image, and credentials',
  },
  {
    id: 'edit_profile_light_mode',
    name: 'Edit Profile (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode profile editor form',
  },
  {
    id: 'appearance_dark_mode',
    name: 'Appearance & Themes (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'Theme toggle, background wallpapers, and blur customization',
  },
  {
    id: 'appearance_light_mode',
    name: 'Appearance & Themes (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode appearance preferences',
  },
  {
    id: 'background_preview_blur_control_dark_mode',
    name: 'Blur & Dimming Control (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'Fine-tune background wallpaper blur and dark mode dimming intensity',
  },
  {
    id: 'background_preview_blur_control_light_mode',
    name: 'Blur & Dimming Control (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode wallpaper blur intensity slider',
  },
  {
    id: 'background_wallpaper_library_dark_mode',
    name: 'Wallpaper Library (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'Curated and custom high-resolution background wallpapers',
  },
  {
    id: 'background_wallpaper_library_light_mode',
    name: 'Wallpaper Library (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode wallpaper gallery',
  },
  {
    id: 'app_lock_dark_mode',
    name: 'App Lock & Security (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'Configure PIN protection, auto-lock timeout, and privacy veil',
  },
  {
    id: 'app_lock_light_mode',
    name: 'App Lock & Security (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode app lock and vault security settings',
  },
  {
    id: 'biometric_settings_dark_mode',
    name: 'Biometric Settings (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'Fingerprint and platform biometric authenticator integration',
  },
  {
    id: 'biometric_settings_light_mode',
    name: 'Biometric Settings (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode biometric authentication preferences',
  },
  {
    id: 'pin_setup_change_dark_mode',
    name: 'PIN Setup & Change (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'Setup, change, or remove 4-digit PBKDF2 security PIN',
  },
  {
    id: 'pin_setup_change_light_mode',
    name: 'PIN Setup & Change (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode PIN configuration and verification keypad',
  },
  {
    id: 'backup_restore_dark_mode',
    name: 'Backup & Restore (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'AES-256-GCM encrypted backup export and cross-device data recovery',
  },
  {
    id: 'backup_restore_light_mode',
    name: 'Backup & Restore (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode encrypted data backup and restore manager',
  },
  {
    id: 'language_settings_dark_mode',
    name: 'Language & Localization (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'Select application language (English, Pashto, Afghan Dari) and numerals',
  },
  {
    id: 'language_settings_light_mode',
    name: 'Language & Localization (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode language selection and numeral configuration',
  },
  {
    id: 'about_momentum_dark_mode',
    name: 'About Momentum (Dark)',
    module: 'settings',
    theme: 'dark',
    description: 'Application version, architecture summary, and philosophy',
  },
  {
    id: 'about_momentum_light_mode',
    name: 'About Momentum (Light)',
    module: 'settings',
    theme: 'light',
    description: 'Light mode about screen and legal credits',
  },

  // ── ONBOARDING ─────────────────────────────────────────────────────────────
  {
    id: 'personal_setup_dark_mode',
    name: 'Personal Setup Onboarding (Dark)',
    module: 'onboarding',
    theme: 'dark',
    description: 'First launch profile setup: Name, City, and baseline preferences',
  },
  {
    id: 'personal_setup_light_mode',
    name: 'Personal Setup Onboarding (Light)',
    module: 'onboarding',
    theme: 'light',
    description: 'Light mode first launch onboarding flow',
  },
];

/**
 * Filter screens by search term, module, and theme
 */
export function searchScreens({ query = '', module = 'all', theme = 'all' } = {}) {
  const q = query.trim().toLowerCase();
  return ALL_SCREENS.filter((screen) => {
    if (module !== 'all' && screen.module !== module) return false;
    if (theme !== 'all' && screen.theme !== theme && screen.theme !== 'shared') return false;
    if (!q) return true;
    return (
      screen.name.toLowerCase().includes(q) ||
      screen.id.toLowerCase().includes(q) ||
      (screen.description && screen.description.toLowerCase().includes(q))
    );
  });
}

/**
 * Group a screen list by module category
 */
export function groupScreensByModule(screens) {
  const groups = {};
  SCREEN_MODULES.filter((m) => m.id !== 'all').forEach((m) => {
    groups[m.id] = {
      label: m.label,
      screens: [],
    };
  });

  screens.forEach((screen) => {
    if (groups[screen.module]) {
      groups[screen.module].screens.push(screen);
    }
  });

  return groups;
}
