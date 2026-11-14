const fs = require('fs');

console.log('--- 1. Checking 28 Tracked Screen Pairs Line Parity ---');
const trackedPairs = [
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
  ['EditProfileDarkMode', 'EditProfileLightMode'],
  ['GregorianCalendarDarkMode', 'GregorianCalendarLightMode'],
  ['IslamicHijriCalendarDarkMode', 'IslamicHijriCalendarLightMode'],
  ['LongNoteEditorDarkMode', 'LongNoteEditorLightMode'],
  ['NewEditTasbeehDarkMode', 'NewEditTasbeehLightMode'],
  ['NoteMediaAttachmentViewerDarkMode', 'NoteMediaAttachmentViewerLightMode'],
  ['NotificationsSettingsDarkMode', 'NotificationsSettingsLightMode'],
  ['PinSetupChangeDarkMode', 'PinSetupChangeLightMode'],
  ['PrayerNotificationSettingsDarkMode', 'PrayerNotificationSettingsLightMode'],
  ['QuickNoteEditorDarkMode', 'QuickNoteEditorLightMode'],
  ['SettingsProfileDarkMode', 'SettingsProfileLightMode'],
  ['TasbeehHistoryDarkMode', 'TasbeehHistoryLightMode'],
  ['TasbeehSettingsDarkMode', 'TasbeehSettingsLightMode'],
  ['TimezoneSelectionDarkMode', 'TimezoneSelectionLightMode']
];

let trackedErrors = 0;
trackedPairs.forEach(([dark, light]) => {
  const dLines = fs.readFileSync(`src/${dark}.jsx`, 'utf8').split('\n').length;
  const lLines = fs.readFileSync(`src/${light}.jsx`, 'utf8').split('\n').length;
  if (dLines !== lLines) {
    console.error(`MISMATCH: ${dark} (${dLines}) vs ${light} (${lLines})`);
    trackedErrors++;
  } else {
    console.log(`PASS: ${dark} (${dLines}) == ${light} (${lLines})`);
  }
});

console.log('\n--- 2. Checking 9 Extra Screen Pairs Line Parity ---');
const extraPairs = [
  ['HomeDashboardDarkMode', 'HomeDashboardLightMode'],
  ['FinanceExpenseTrackerDarkMode', 'FinanceExpenseTrackerLightMode'],
  ['TasksRemindersDarkMode', 'TasksRemindersLightMode'],
  ['NotesMainDarkMode', 'NotesMainLightMode'],
  ['PrayerTimesDarkMode', 'PrayerTimesLightMode'],
  ['TasbeehMainDarkMode', 'TasbeehMainLightMode'],
  ['DhikrHistoryDarkMode', 'DhikrHistoryLightMode'],
  ['MoreDarkMode', 'MoreLightMode'],
  ['IncomeManagementDarkMode', 'IncomeManagementLightMode']
];

let extraErrors = 0;
extraPairs.forEach(([dark, light]) => {
  const dLines = fs.readFileSync(`src/${dark}.jsx`, 'utf8').split('\n').length;
  const lLines = fs.readFileSync(`src/${light}.jsx`, 'utf8').split('\n').length;
  if (dLines !== lLines) {
    console.error(`MISMATCH: ${dark} (${dLines}) vs ${light} (${lLines})`);
    extraErrors++;
  } else {
    console.log(`PASS: ${dark} (${dLines}) == ${light} (${lLines})`);
  }
});

console.log('\n--- 3. Checking Header Avatar Occurrences ---');
const allCheckedFiles = [...trackedPairs.flat(), ...extraPairs.flat()];
let missingUserAvatar = 0;
let hasStaticAOrU = 0;

allCheckedFiles.forEach(f => {
  if (f.startsWith('AddEditExpense')) return; // No avatar in AddEditExpense
  const content = fs.readFileSync(`src/${f}.jsx`, 'utf8');
  if (!content.includes('UserAvatar')) {
    console.error(`MISSING UserAvatar in ${f}`);
    missingUserAvatar++;
  }
});

console.log(`Files checked for UserAvatar: ${allCheckedFiles.length - 2}, Missing: ${missingUserAvatar}`);

if (trackedErrors === 0 && extraErrors === 0 && missingUserAvatar === 0) {
  console.log('\nALL PARITY AND AVATAR AUDIT CHECKS PASSED PERFECTLY!');
} else {
  console.error('\nSOME CHECKS FAILED!');
  process.exit(1);
}

