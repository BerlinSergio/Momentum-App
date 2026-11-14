const fs = require('fs');

const screens = [
  'AboutMomentumDarkMode', 'AboutMomentumLightMode',
  'AddEditExpenseDarkMode', 'AddEditExpenseLightMode',
  'AddEditIncomeDarkMode', 'AddEditIncomeLightMode',
  'AddEditRoutineDarkMode', 'AddEditRoutineLightMode',
  'AddEditTaskDarkMode', 'AddEditTaskLightMode',
  'AfghanSolarHijriShamsiCalendarDarkMode', 'AfghanSolarHijriShamsiCalendarLightMode',
  'AppLockDarkMode', 'AppLockLightMode',
  'AppearanceDarkMode', 'AppearanceLightMode',
  'BackgroundPreviewBlurControlDarkMode', 'BackgroundPreviewBlurControlLightMode',
  'BackgroundWallpaperLibraryDarkMode', 'BackgroundWallpaperLibraryLightMode',
  'BiometricSettingsDarkMode', 'BiometricSettingsLightMode',
  'CalendarsMainDarkMode', 'CalendarsMainLightMode',
  'CitySelectionDarkMode', 'CitySelectionLightMode',
  'CurrencySelectionDarkMode', 'CurrencySelectionLightMode',
  'DailyRoutineDarkMode', 'DailyRoutineLightMode',
  'EditProfileDarkMode', 'EditProfileLightMode',
  'FinanceExpenseTrackerDarkMode', 'FinanceExpenseTrackerLightMode',
  'GregorianCalendarDarkMode', 'GregorianCalendarLightMode',
  'HomeDashboardDarkMode', 'HomeDashboardLightMode',
  'IslamicHijriCalendarDarkMode', 'IslamicHijriCalendarLightMode',
  'LongNoteEditorDarkMode', 'LongNoteEditorLightMode',
  'MoreDarkMode', 'MoreLightMode',
  'NewEditTasbeehDarkMode', 'NewEditTasbeehLightMode',
  'NoteMediaAttachmentViewerDarkMode', 'NoteMediaAttachmentViewerLightMode',
  'NotesMainDarkMode', 'NotesMainLightMode',
  'NotificationsSettingsDarkMode', 'NotificationsSettingsLightMode',
  'PersonalSetupDarkMode', 'PersonalSetupLightMode',
  'PinSetupChangeDarkMode', 'PinSetupChangeLightMode',
  'PrayerNotificationSettingsDarkMode', 'PrayerNotificationSettingsLightMode',
  'PrayerTimesDarkMode', 'PrayerTimesLightMode',
  'QuickNoteEditorDarkMode', 'QuickNoteEditorLightMode',
  'SettingsProfileDarkMode', 'SettingsProfileLightMode',
  'SplashScreenDarkMode', 'SplashScreenLightMode',
  'TasbeehHistoryDarkMode', 'TasbeehHistoryLightMode',
  'TasbeehMainDarkMode', 'TasbeehMainLightMode',
  'TasbeehSettingsDarkMode', 'TasbeehSettingsLightMode',
  'TasksRemindersDarkMode', 'TasksRemindersLightMode',
  'TimezoneSelectionDarkMode', 'TimezoneSelectionLightMode'
];

const audit = [];

screens.forEach(name => {
  const file = `src/${name}.jsx`;
  if (!fs.existsSync(file)) {
    audit.push({ name, exists: false });
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  // Find props signature: export default function Name({ ... })
  const sigMatch = content.match(/export\s+default\s+function\s+\w+\s*\(\s*\{([^}]+)\}\s*\)/);
  const props = sigMatch ? sigMatch[1].trim() : 'UNKNOWN';

  // Find back button
  const backButtons = [];
  lines.forEach((l, idx) => {
    if (l.includes('<ArrowLeft') || l.includes('arrow_back')) {
      // Find the surrounding button
      let btnLineIdx = idx;
      for (let j = Math.max(0, idx - 5); j <= idx; j++) {
        if (lines[j].includes('<button') || lines[j].includes('<LiquidButton')) {
          btnLineIdx = j;
          break;
        }
      }
      const snippet = lines.slice(btnLineIdx, Math.min(lines.length, idx + 4)).join(' ');
      backButtons.push({
        iconLine: idx + 1,
        btnLine: btnLineIdx + 1,
        snippet: snippet.trim()
      });
    }
  });

  audit.push({
    name,
    props,
    hasBackButton: backButtons.length > 0,
    backButtons
  });
});

fs.writeFileSync('scratch/full_76_screens_back_audit.json', JSON.stringify(audit, null, 2), 'utf8');
console.log('Audited all 76 screens. Screens with back buttons:', audit.filter(a => a.hasBackButton).length);

