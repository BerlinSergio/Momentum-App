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
  ['EditProfileDarkMode', 'EditProfileLightMode'],
  ['GregorianCalendarDarkMode', 'GregorianCalendarLightMode'],
  ['HomeDashboardDarkMode', 'HomeDashboardLightMode'],
  ['IslamicHijriCalendarDarkMode', 'IslamicHijriCalendarLightMode'],
  ['LongNoteEditorDarkMode', 'LongNoteEditorLightMode'],
  ['MoreDarkMode', 'MoreLightMode'],
  ['NewEditTasbeehDarkMode', 'NewEditTasbeehLightMode'],
  ['NoteMediaAttachmentViewerDarkMode', 'NoteMediaAttachmentViewerLightMode'],
  ['NotesMainDarkMode', 'NotesMainLightMode'],
  ['NotificationsSettingsDarkMode', 'NotificationsSettingsLightMode'],
  ['PersonalSetupDarkMode', 'PersonalSetupLightMode'],
  ['PinSetupChangeDarkMode', 'PinSetupChangeLightMode'],
  ['PrayerTimesDarkMode', 'PrayerTimesLightMode'],
  ['QuickNoteEditorDarkMode', 'QuickNoteEditorLightMode'],
  ['SettingsProfileDarkMode', 'SettingsProfileLightMode'],
  ['TasbeehHistoryDarkMode', 'TasbeehHistoryLightMode'],
  ['TasbeehSettingsDarkMode', 'TasbeehSettingsLightMode'],
  ['TimezoneSelectionDarkMode', 'TimezoneSelectionLightMode']
];

pairs.forEach(([dark, light]) => {
  const dLines = fs.readFileSync(`src/${dark}.jsx`, 'utf8').split('\n').length;
  const lLines = fs.readFileSync(`src/${light}.jsx`, 'utf8').split('\n').length;
  console.log(`${dark} (${dLines}) vs ${light} (${lLines}) -> ${dLines === lLines ? 'MATCH' : 'MISMATCH'}`);
});
