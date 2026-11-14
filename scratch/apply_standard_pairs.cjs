const fs = require('fs');

const standardPairs = [
  { dark: 'AboutMomentumDarkMode', light: 'AboutMomentumLightMode', fallback: 'more', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'AddEditRoutineDarkMode', light: 'AddEditRoutineLightMode', fallback: 'daily_routine', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'AfghanSolarHijriShamsiCalendarDarkMode', light: 'AfghanSolarHijriShamsiCalendarLightMode', fallback: 'calendars_main', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'AppearanceDarkMode', light: 'AppearanceLightMode', fallback: 'more', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'AppLockDarkMode', light: 'AppLockLightMode', fallback: 'more', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'BackgroundPreviewBlurControlDarkMode', light: 'BackgroundPreviewBlurControlLightMode', fallback: 'background_wallpaper_library', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'BackgroundWallpaperLibraryDarkMode', light: 'BackgroundWallpaperLibraryLightMode', fallback: 'appearance', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'BiometricSettingsDarkMode', light: 'BiometricSettingsLightMode', fallback: 'app_lock', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'CitySelectionDarkMode', light: 'CitySelectionLightMode', fallback: 'prayer_times', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'CurrencySelectionDarkMode', light: 'CurrencySelectionLightMode', fallback: 'finance_expense_tracker', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'EditProfileDarkMode', light: 'EditProfileLightMode', fallback: 'settings_profile', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'GregorianCalendarDarkMode', light: 'GregorianCalendarLightMode', fallback: 'calendars_main', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'IslamicHijriCalendarDarkMode', light: 'IslamicHijriCalendarLightMode', fallback: 'calendars_main', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'LongNoteEditorDarkMode', light: 'LongNoteEditorLightMode', fallback: 'notes_main', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'NoteMediaAttachmentViewerDarkMode', light: 'NoteMediaAttachmentViewerLightMode', fallback: 'notes_main', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'NotificationsSettingsDarkMode', light: 'NotificationsSettingsLightMode', fallback: 'more', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'PinSetupChangeDarkMode', light: 'PinSetupChangeLightMode', fallback: 'app_lock', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'PrayerNotificationSettingsDarkMode', light: 'PrayerNotificationSettingsLightMode', fallback: 'prayer_times', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'QuickNoteEditorDarkMode', light: 'QuickNoteEditorLightMode', fallback: 'notes_main', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' },
  { dark: 'TasbeehHistoryDarkMode', light: 'TasbeehHistoryLightMode', fallback: 'tasbeeh_main', oldDark: 'tasbeeh_main_dark_mode', oldLight: 'tasbeeh_main_light_mode' },
  { dark: 'TasbeehSettingsDarkMode', light: 'TasbeehSettingsLightMode', fallback: 'tasbeeh_main', oldDark: 'tasbeeh_main_dark_mode', oldLight: 'tasbeeh_main_light_mode' },
  { dark: 'TimezoneSelectionDarkMode', light: 'TimezoneSelectionLightMode', fallback: 'prayer_times', oldDark: 'home_dashboard_dark_mode', oldLight: 'home_dashboard_light_mode' }
];

function transformStandardFile(fileName, isDark, fallbackPrefix, oldTarget) {
  let content = fs.readFileSync(`src/${fileName}.jsx`, 'utf8');

  // 1. Export signature
  const targetSig = `export default function ${fileName}({ setActiveTab }) {`;
  const newSig = `export default function ${fileName}({ setActiveTab, goBack }) {`;
  if (!content.includes(targetSig)) {
    throw new Error(`Export signature not found in ${fileName}`);
  }
  content = content.replace(targetSig, newSig);

  // 2. Replace onClick
  const targetFallback = isDark ? `${fallbackPrefix}_dark_mode` : `${fallbackPrefix}_light_mode`;
  const oldOnClick = `onClick={() => setActiveTab && setActiveTab('${oldTarget}')}`;
  const newOnClick = `onClick={() => (goBack ? goBack('${targetFallback}') : (setActiveTab ? setActiveTab('${targetFallback}') : window.history.back()))}`;

  if (!content.includes(oldOnClick)) {
    throw new Error(`oldOnClick "${oldOnClick}" not found in ${fileName}`);
  }
  content = content.replace(oldOnClick, newOnClick);

  fs.writeFileSync(`src/${fileName}.jsx`, content, 'utf8');
}

// Execute standard pairs
console.log('Processing standard pairs...');
standardPairs.forEach(pair => {
  transformStandardFile(pair.dark, true, pair.fallback, pair.oldDark);
  transformStandardFile(pair.light, false, pair.fallback, pair.oldLight);
  const dLen = fs.readFileSync(`src/${pair.dark}.jsx`, 'utf8').split(/\r?\n/).length;
  const lLen = fs.readFileSync(`src/${pair.light}.jsx`, 'utf8').split(/\r?\n/).length;
  console.log(`✓ ${pair.dark} (${dLen}) & ${pair.light} (${lLen}): ${dLen === lLen ? 'PARITY OK' : 'MISMATCH!'}`);
});

