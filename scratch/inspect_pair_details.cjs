const fs = require('fs');

const pairs = [
  { dark: 'AboutMomentumDarkMode', light: 'AboutMomentumLightMode', fallback: 'more' },
  { dark: 'AddEditExpenseDarkMode', light: 'AddEditExpenseLightMode', fallback: 'finance_expense_tracker' },
  { dark: 'AddEditIncomeDarkMode', light: 'AddEditIncomeLightMode', fallback: 'finance_expense_tracker' },
  { dark: 'AddEditRoutineDarkMode', light: 'AddEditRoutineLightMode', fallback: 'daily_routine' },
  { dark: 'AddEditTaskDarkMode', light: 'AddEditTaskLightMode', fallback: 'tasks_reminders' },
  { dark: 'AfghanSolarHijriShamsiCalendarDarkMode', light: 'AfghanSolarHijriShamsiCalendarLightMode', fallback: 'calendars_main' },
  { dark: 'AppearanceDarkMode', light: 'AppearanceLightMode', fallback: 'more' },
  { dark: 'AppLockDarkMode', light: 'AppLockLightMode', fallback: 'more' },
  { dark: 'BackgroundPreviewBlurControlDarkMode', light: 'BackgroundPreviewBlurControlLightMode', fallback: 'background_wallpaper_library' },
  { dark: 'BackgroundWallpaperLibraryDarkMode', light: 'BackgroundWallpaperLibraryLightMode', fallback: 'appearance' },
  { dark: 'BiometricSettingsDarkMode', light: 'BiometricSettingsLightMode', fallback: 'app_lock' },
  { dark: 'CitySelectionDarkMode', light: 'CitySelectionLightMode', fallback: 'prayer_times' },
  { dark: 'CurrencySelectionDarkMode', light: 'CurrencySelectionLightMode', fallback: 'finance_expense_tracker' },
  { dark: 'EditProfileDarkMode', light: 'EditProfileLightMode', fallback: 'settings_profile' },
  { dark: 'GregorianCalendarDarkMode', light: 'GregorianCalendarLightMode', fallback: 'calendars_main' },
  { dark: 'IslamicHijriCalendarDarkMode', light: 'IslamicHijriCalendarLightMode', fallback: 'calendars_main' },
  { dark: 'LongNoteEditorDarkMode', light: 'LongNoteEditorLightMode', fallback: 'notes_main' },
  { dark: 'NewEditTasbeehDarkMode', light: 'NewEditTasbeehLightMode', fallback: 'tasbeeh_main' },
  { dark: 'NoteMediaAttachmentViewerDarkMode', light: 'NoteMediaAttachmentViewerLightMode', fallback: 'notes_main' },
  { dark: 'NotificationsSettingsDarkMode', light: 'NotificationsSettingsLightMode', fallback: 'more' },
  { dark: 'PinSetupChangeDarkMode', light: 'PinSetupChangeLightMode', fallback: 'app_lock' },
  { dark: 'PrayerNotificationSettingsDarkMode', light: 'PrayerNotificationSettingsLightMode', fallback: 'prayer_times' },
  { dark: 'QuickNoteEditorDarkMode', light: 'QuickNoteEditorLightMode', fallback: 'notes_main' },
  { dark: 'SettingsProfileDarkMode', light: 'SettingsProfileLightMode', fallback: 'more' },
  { dark: 'TasbeehHistoryDarkMode', light: 'TasbeehHistoryLightMode', fallback: 'tasbeeh_main' },
  { dark: 'TasbeehSettingsDarkMode', light: 'TasbeehSettingsLightMode', fallback: 'tasbeeh_main' },
  { dark: 'TimezoneSelectionDarkMode', light: 'TimezoneSelectionLightMode', fallback: 'prayer_times' }
];

const results = [];

pairs.forEach(({ dark, light, fallback }) => {
  const dContent = fs.readFileSync(`src/${dark}.jsx`, 'utf8');
  const dLines = dContent.split(/\r?\n/);

  // find export line
  let exportLineIdx = dLines.findIndex(l => l.includes('export default function'));
  
  // find arrowleft or back button
  let backBtnLineIdx = dLines.findIndex(l => l.includes('<ArrowLeft') || (l.includes('arrow_back') && l.includes('<')));
  let btnTagIdx = -1;
  if (backBtnLineIdx !== -1) {
    for (let j = backBtnLineIdx; j >= Math.max(0, backBtnLineIdx - 5); j--) {
      if (dLines[j].includes('<button') || dLines[j].includes('<LiquidButton')) {
        btnTagIdx = j;
        break;
      }
    }
  }

  results.push({
    dark,
    light,
    fallback,
    exportLine: dLines[exportLineIdx],
    btnTag: btnTagIdx !== -1 ? dLines.slice(btnTagIdx, backBtnLineIdx + 2).join(' ') : 'NOT_FOUND'
  });
});

fs.writeFileSync('scratch/pair_details.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Saved pair details for all 27 pairs.');
results.forEach((r, i) => console.log(`${i+1}. ${r.dark}: export -> "${r.exportLine.trim()}", btn -> "${r.btnTag.trim()}"`));

