const fs = require('fs');
const assert = require('assert');
const path = require('path');

console.log('--- STARTING CALENDARS & TIME AUDIT TESTS ---');

// 1. Check CalendarsMainLightMode.jsx and CalendarsMainDarkMode.jsx existence
const lightPath = path.resolve('src/CalendarsMainLightMode.jsx');
const darkPath = path.resolve('src/CalendarsMainDarkMode.jsx');
assert(fs.existsSync(lightPath), 'CalendarsMainLightMode.jsx must exist');
assert(fs.existsSync(darkPath), 'CalendarsMainDarkMode.jsx must exist');

const lightContent = fs.readFileSync(lightPath, 'utf8');
const darkContent = fs.readFileSync(darkPath, 'utf8');

// 2. Line count parity
const lightLines = lightContent.split(/\r?\n/).length;
const darkLines = darkContent.split(/\r?\n/).length;
console.log(`Checking line count parity: Light (${lightLines}) vs Dark (${darkLines})`);
assert.strictEqual(lightLines, darkLines, `Line count mismatch: ${lightLines} vs ${darkLines}`);
console.log('✓ Strict 1:1 line count parity verified');

// 3. Live Tri-Calendar Engine verification
for (const [name, content] of [['Light', lightContent], ['Dark', darkContent]]) {
  // Live Date initialization
  assert(content.includes('useState(() => new Date())'), `${name} mode must initialize useState with new Date()`);
  // 1-second interval timer
  assert(content.includes('setInterval(') && content.includes('1000)'), `${name} mode must have 1-second ticking timer`);
  assert(content.includes('clearInterval(timer)'), `${name} mode must clean up timer`);
  // Authentic utilities
  assert(content.includes('getShamsiDate'), `${name} mode must use getShamsiDate`);
  assert(content.includes('getIslamicDateParts'), `${name} mode must use getIslamicDateParts`);
  // Dynamic Gregorian formatting
  assert(content.includes("toLocaleDateString('en-US'"), `${name} mode must format Gregorian dynamically`);
  // 7-day strip calculation
  assert(content.includes('weekDays = useMemo('), `${name} mode must calculate 7-day week strip`);
  assert(content.includes('isToday'), `${name} mode must flag today dynamically`);

  // Time-aware Agenda Flow
  assert(content.includes('getEventStatus = (index) =>'), `${name} mode must have getEventStatus helper`);
  assert(content.includes("'active'"), `${name} mode must support active event state`);
  assert(content.includes("'upcoming'"), `${name} mode must support upcoming event state`);
  assert(content.includes('Now Active'), `${name} mode must display Now Active badge`);
  assert(content.includes('Up Next'), `${name} mode must display Up Next badge`);
  assert(content.includes('animate-pulse'), `${name} mode must have pulsing animation for active event`);

  // Bottom Nav & Padding
  assert(fs.readFileSync('src/App.jsx', 'utf8').includes('<BottomNavBar'), `App.jsx must render global BottomNavBar`);
  assert(content.includes('pb-32'), `${name} mode main container must have pb-32 for safe scrolling`);
  assert(content.includes('bg-transparent'), `${name} mode must use bg-transparent for unified wallpaper view`);
  assert(!content.match(/<main[^>]*\bbg-surface\b/), `${name} mode main container must not use opaque bg-surface`);

  // No undeclared isDark
  assert(!content.includes('${isDark ?'), `${name} mode must not have unresolved isDark ternaries`);
}
console.log('✓ Live Tri-Calendar Engine & Time-aware Agenda logic verified in both files');
console.log('✓ BottomNavBar and scroll padding verified in both files');

// 4. Check CalendarsMain.jsx and CalendarsAndTime.jsx wrappers
const mainPath = path.resolve('src/CalendarsMain.jsx');
const timePath = path.resolve('src/CalendarsAndTime.jsx');
assert(fs.existsSync(mainPath), 'CalendarsMain.jsx must exist');
assert(fs.existsSync(timePath), 'CalendarsAndTime.jsx must exist');

const mainContent = fs.readFileSync(mainPath, 'utf8');
const timeContent = fs.readFileSync(timePath, 'utf8');
assert(mainContent.includes('CalendarsMainDarkMode') && mainContent.includes('CalendarsMainLightMode'), 'CalendarsMain.jsx must delegate to dark/light pair');
assert(timeContent.includes('CalendarsMainDarkMode') && timeContent.includes('CalendarsMainLightMode'), 'CalendarsAndTime.jsx must delegate to dark/light pair');
console.log('✓ CalendarsMain.jsx and CalendarsAndTime.jsx correctly route to Light & Dark modes');

// 5. Check App.jsx routing aliases
const appContent = fs.readFileSync('src/App.jsx', 'utf8');
assert(appContent.includes("case 'calendars_and_time':"), 'App.jsx must include calendars_and_time route');
assert(appContent.includes("case 'calendars':"), 'App.jsx must include calendars route');
console.log('✓ App.jsx routes for calendars_and_time and calendars verified');

// 6. Test afghanCalendar utilities directly with a real date
const { getShamsiDate, getIslamicDateParts } = require('../src/utils/afghanCalendar.js');
const testDate = new Date();
const shamsi = getShamsiDate(testDate);
const islamic = getIslamicDateParts(testDate);
console.log(`Live calculation check:
  Gregorian: ${testDate.toDateString()}
  Afghan Solar Shamsi: ${shamsi.jd} ${shamsi.jm} ${shamsi.jy} SH (${shamsi.zodiac})
  Islamic Hijri: ${islamic.hd} ${islamic.hm} ${islamic.hy} AH`);
assert(shamsi && shamsi.jd && shamsi.jm && shamsi.jy, 'Shamsi date must have day, month, and year');
assert(islamic && islamic.hd && islamic.hm && islamic.hy, 'Islamic date must have day, month, and year');
console.log('✓ Live afghanCalendar conversion verified');

// 7. Check all 28 screen pairs line parity
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
  ['CurrencySelectionDarkMode', 'CurrencySelectionLightMode'],
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
  ['TimezoneSelectionDarkMode', 'TimezoneSelectionLightMode'],
];

let allMatched = true;
for (const [d, l] of pairs) {
  const dLines = fs.readFileSync(path.resolve(`src/${d}.jsx`), 'utf8').split(/\r?\n/).length;
  const lLines = fs.readFileSync(path.resolve(`src/${l}.jsx`), 'utf8').split(/\r?\n/).length;
  if (dLines !== lLines) {
    console.error(`Mismatch: ${d} (${dLines}) vs ${l} (${lLines})`);
    allMatched = false;
  }
}
assert(allMatched, 'All 28 Light/Dark pairs must have exact 1:1 line count parity');
console.log('✓ All 28 Light/Dark screen pairs match 100% in line count parity');

console.log('--- ALL CALENDARS & TIME AUDIT TESTS PASSED! ---');
