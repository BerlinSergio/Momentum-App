const fs = require('fs');
const path = require('path');

const exact3LinePairs = [
  ['AboutMomentumDarkMode', 'AboutMomentumLightMode'],
  ['AddEditIncomeDarkMode', 'AddEditIncomeLightMode'],
  ['AddEditRoutineDarkMode', 'AddEditRoutineLightMode'],
  ['AddEditTaskDarkMode', 'AddEditTaskLightMode'],
  ['AfghanSolarHijriShamsiCalendarDarkMode', 'AfghanSolarHijriShamsiCalendarLightMode'],
  ['AppLockDarkMode', 'AppLockLightMode'],
  ['BackgroundPreviewBlurControlDarkMode', 'BackgroundPreviewBlurControlLightMode'],
  ['BackgroundWallpaperLibraryDarkMode', 'BackgroundWallpaperLibraryLightMode'],
  ['BiometricSettingsDarkMode', 'BiometricSettingsLightMode'],
  ['CalendarsMainDarkMode', 'CalendarsMainLightMode'],
  ['CitySelectionDarkMode', 'CitySelectionLightMode'],
  ['GregorianCalendarDarkMode', 'GregorianCalendarLightMode'],
  ['IncomeManagementDarkMode', 'IncomeManagementLightMode'],
  ['IslamicHijriCalendarDarkMode', 'IslamicHijriCalendarLightMode'],
  ['LongNoteEditorDarkMode', 'LongNoteEditorLightMode'],
  ['NoteMediaAttachmentViewerDarkMode', 'NoteMediaAttachmentViewerLightMode'],
  ['NotesMainDarkMode', 'NotesMainLightMode'],
  ['NotificationsSettingsDarkMode', 'NotificationsSettingsLightMode'],
  ['PinSetupChangeDarkMode', 'PinSetupChangeLightMode'],
  ['PrayerNotificationSettingsDarkMode', 'PrayerNotificationSettingsLightMode'],
  ['PrayerTimesDarkMode', 'PrayerTimesLightMode'],
  ['QuickNoteEditorDarkMode', 'QuickNoteEditorLightMode'],
  ['TimezoneSelectionDarkMode', 'TimezoneSelectionLightMode']
];

function updateFile(fileName, avatarRegex, avatarReplacement) {
  const filePath = path.join('src', fileName);
  let content = fs.readFileSync(filePath, 'utf8');
  const isCrlf = content.includes('\r\n');
  const eol = isCrlf ? '\r\n' : '\n';

  // 1. Add UserAvatar import if not present
  if (!content.includes('UserAvatar')) {
    // Insert after first import line
    const lines = content.split(eol);
    let importIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        importIdx = i;
        break;
      }
    }
    if (importIdx !== -1) {
      lines.splice(importIdx + 1, 0, "import UserAvatar from './components/UserAvatar';");
      content = lines.join(eol);
    }
  }

  // 2. Replace avatar block
  if (avatarRegex.test(content)) {
    content = content.replace(avatarRegex, avatarReplacement);
  } else {
    console.warn(`Warning: avatar regex not matched in ${fileName}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. Process 23 exact 3-line pairs
const exactRegex = /<div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold text-xs flex items-center justify-center shadow-sm">\s*A\s*<\/div>/;
const exactReplacement = `<UserAvatar \n            setActiveTab={setActiveTab} \n          />`;

exact3LinePairs.forEach(([dark, light]) => {
  updateFile(dark + '.jsx', exactRegex, exactReplacement);
  updateFile(light + '.jsx', exactRegex, exactReplacement);
  
  const dLines = fs.readFileSync(`src/${dark}.jsx`, 'utf8').split('\n').length;
  const lLines = fs.readFileSync(`src/${light}.jsx`, 'utf8').split('\n').length;
  console.log(`${dark} vs ${light}: ${dLines} vs ${lLines} -> ${dLines === lLines ? 'MATCH' : 'MISMATCH'}`);
});

