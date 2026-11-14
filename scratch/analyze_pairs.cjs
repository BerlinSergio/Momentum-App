const fs = require('fs');

const pairs = [
  ['AboutMomentumDarkMode', 'AboutMomentumLightMode'],
  ['AddEditExpenseDarkMode', 'AddEditExpenseLightMode'],
  ['AddEditIncomeDarkMode', 'AddEditIncomeLightMode'],
  ['AddEditRoutineDarkMode', 'AddEditRoutineLightMode'],
  ['AddEditTaskDarkMode', 'AddEditTaskLightMode'],
  ['AfghanSolarHijriShamsiCalendarDarkMode', 'AfghanSolarHijriShamsiCalendarLightMode'],
  ['AppearanceDarkMode', 'AppearanceLightMode'],
  ['AppLockDarkMode', 'AppLockLightMode'],
  ['BackgroundPreviewBlurControlDarkMode', 'BackgroundPreviewBlurControlLightMode'],
  ['BackgroundWallpaperLibraryDarkMode', 'BackgroundWallpaperLibraryLightMode'],
  ['BiometricSettingsDarkMode', 'BiometricSettingsLightMode'],
  ['CitySelectionDarkMode', 'CitySelectionLightMode'],
  ['CalendarsMainDarkMode', 'CalendarsMainLightMode'],
  ['DailyRoutineDarkMode', 'DailyRoutineLightMode'],
  ['DhikrHistoryDarkMode', 'DhikrHistoryLightMode'],
  ['EditProfileDarkMode', 'EditProfileLightMode'],
  ['FinanceExpenseTrackerDarkMode', 'FinanceExpenseTrackerLightMode'],
  ['GregorianCalendarDarkMode', 'GregorianCalendarLightMode'],
  ['HomeDashboardDarkMode', 'HomeDashboardLightMode'],
  ['IncomeManagementDarkMode', 'IncomeManagementLightMode'],
  ['IslamicHijriCalendarDarkMode', 'IslamicHijriCalendarLightMode'],
  ['LongNoteEditorDarkMode', 'LongNoteEditorLightMode'],
  ['MoreDarkMode', 'MoreLightMode'],
  ['NewEditTasbeehDarkMode', 'NewEditTasbeehLightMode'],
  ['NoteMediaAttachmentViewerDarkMode', 'NoteMediaAttachmentViewerLightMode'],
  ['NotesMainDarkMode', 'NotesMainLightMode'],
  ['NotificationsSettingsDarkMode', 'NotificationsSettingsLightMode'],
  ['PinSetupChangeDarkMode', 'PinSetupChangeLightMode'],
  ['PrayerNotificationSettingsDarkMode', 'PrayerNotificationSettingsLightMode'],
  ['PrayerTimesDarkMode', 'PrayerTimesLightMode'],
  ['QuickNoteEditorDarkMode', 'QuickNoteEditorLightMode'],
  ['SettingsProfileDarkMode', 'SettingsProfileLightMode'],
  ['TasbeehHistoryDarkMode', 'TasbeehHistoryLightMode'],
  ['TasbeehMainDarkMode', 'TasbeehMainLightMode'],
  ['TasbeehSettingsDarkMode', 'TasbeehSettingsLightMode'],
  ['TasksRemindersDarkMode', 'TasksRemindersLightMode'],
  ['TimezoneSelectionDarkMode', 'TimezoneSelectionLightMode']
];

for (const [dark, light] of pairs) {
  const dContent = fs.readFileSync(`src/${dark}.jsx`, 'utf8');
  const dLines = dContent.split(/\r?\n/);
  
  // Find lines in first 500 lines
  const results = [];
  dLines.slice(0, 500).forEach((l, idx) => {
    const trimmed = l.trim();
    if (trimmed === 'A' || trimmed === 'U' || 
        (l.includes('rounded-full') && (l.includes('UserAvatar') || l.includes('profile.avatar')))) {
      results.push({ line: idx + 1, text: trimmed });
    }
  });

  const hasUA = dContent.includes('UserAvatar');
  console.log(`${dark}: hasUserAvatar=${hasUA}, matches=${JSON.stringify(results)}`);
}

