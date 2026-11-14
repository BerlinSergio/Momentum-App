const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scratch/back_buttons_report.json', 'utf8'));

// Filter only files that are in App.jsx (i.e. active screens)
const screens = [
  'AboutMomentumDarkMode.jsx',
  'AboutMomentumLightMode.jsx',
  'AddEditExpenseDarkMode.jsx',
  'AddEditExpenseLightMode.jsx',
  'AddEditIncomeDarkMode.jsx',
  'AddEditIncomeLightMode.jsx',
  'AddEditRoutineDarkMode.jsx',
  'AddEditRoutineLightMode.jsx',
  'AddEditTaskDarkMode.jsx',
  'AddEditTaskLightMode.jsx',
  'AfghanSolarHijriShamsiCalendarDarkMode.jsx',
  'AfghanSolarHijriShamsiCalendarLightMode.jsx',
  'AppearanceDarkMode.jsx',
  'AppearanceLightMode.jsx',
  'AppLockDarkMode.jsx',
  'AppLockLightMode.jsx',
  'BackgroundPreviewBlurControlDarkMode.jsx',
  'BackgroundPreviewBlurControlLightMode.jsx',
  'BackgroundWallpaperLibraryDarkMode.jsx',
  'BackgroundWallpaperLibraryLightMode.jsx',
  'BiometricSettingsDarkMode.jsx',
  'BiometricSettingsLightMode.jsx',
  'CalendarsMainDarkMode.jsx',
  'CalendarsMainLightMode.jsx',
  'CitySelectionDarkMode.jsx',
  'CitySelectionLightMode.jsx',
  'CurrencySelectionDarkMode.jsx',
  'CurrencySelectionLightMode.jsx',
  'DailyRoutineDarkMode.jsx',
  'DailyRoutineLightMode.jsx',
  'EditProfileDarkMode.jsx',
  'EditProfileLightMode.jsx',
  'FinanceExpenseTrackerDarkMode.jsx',
  'FinanceExpenseTrackerLightMode.jsx',
  'GregorianCalendarDarkMode.jsx',
  'GregorianCalendarLightMode.jsx',
  'HomeDashboardDarkMode.jsx',
  'HomeDashboardLightMode.jsx',
  'IslamicHijriCalendarDarkMode.jsx',
  'IslamicHijriCalendarLightMode.jsx',
  'LongNoteEditorDarkMode.jsx',
  'LongNoteEditorLightMode.jsx',
  'MoreDarkMode.jsx',
  'MoreLightMode.jsx',
  'NewEditTasbeehDarkMode.jsx',
  'NewEditTasbeehLightMode.jsx',
  'NotesMainDarkMode.jsx',
  'NotesMainLightMode.jsx',
  'NoteMediaAttachmentViewerDarkMode.jsx',
  'NoteMediaAttachmentViewerLightMode.jsx',
  'NotificationsSettingsDarkMode.jsx',
  'NotificationsSettingsLightMode.jsx',
  'PersonalSetupDarkMode.jsx',
  'PersonalSetupLightMode.jsx',
  'PinSetupChangeDarkMode.jsx',
  'PinSetupChangeLightMode.jsx',
  'PrayerNotificationSettingsDarkMode.jsx',
  'PrayerNotificationSettingsLightMode.jsx',
  'PrayerTimesDarkMode.jsx',
  'PrayerTimesLightMode.jsx',
  'QuickNoteEditorDarkMode.jsx',
  'QuickNoteEditorLightMode.jsx',
  'SettingsProfileDarkMode.jsx',
  'SettingsProfileLightMode.jsx',
  'TasbeehHistoryDarkMode.jsx',
  'TasbeehHistoryLightMode.jsx',
  'TasbeehMainDarkMode.jsx',
  'TasbeehMainLightMode.jsx',
  'TasbeehSettingsDarkMode.jsx',
  'TasbeehSettingsLightMode.jsx',
  'TasksRemindersDarkMode.jsx',
  'TasksRemindersLightMode.jsx',
  'TimezoneSelectionDarkMode.jsx',
  'TimezoneSelectionLightMode.jsx',
];

const results = {};
screens.forEach(screen => {
  const filePath = 'src/' + screen;
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const backLines = [];
  lines.forEach((l, i) => {
    if (l.includes('ArrowLeft') || l.includes('arrow_back') || l.includes('Go back') || (l.includes('back') && l.includes('onClick'))) {
      const start = Math.max(0, i - 3);
      const end = Math.min(lines.length - 1, i + 3);
      backLines.push({
        line: i + 1,
        snippet: lines.slice(start, end + 1).map((ln, idx) => `${start + idx + 1}: ${ln}`).join('\n')
      });
    }
  });
  results[screen] = backLines;
});

fs.writeFileSync('scratch/screen_back_buttons.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Processed', Object.keys(results).length, 'screens.');

