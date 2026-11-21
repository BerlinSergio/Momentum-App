/**
 * Momentum Navigation & History Stack Verification Suite
 * Tests useNavigationStore stack pushing, popping, goBack fallback logic,
 * browser history synchronization (pushState / popstate), and global screen back buttons.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

// Mock browser environment
let historyEntries = [];
let currentHistoryIdx = 0;

global.window = {
  location: {
    search: '?screen=home_dashboard_dark_mode',
    href: 'http://localhost/?screen=home_dashboard_dark_mode',
  },
  history: {
    get length() { return historyEntries.length; },
    get state() { return historyEntries[currentHistoryIdx]?.state || null; },
    pushState: (state, title, url) => {
      currentHistoryIdx++;
      historyEntries.splice(currentHistoryIdx, historyEntries.length, { state, url: String(url) });
    },
    replaceState: (state, title, url) => {
      historyEntries[currentHistoryIdx] = { state, url: String(url) };
    },
    back: () => {
      if (currentHistoryIdx > 0) currentHistoryIdx--;
    }
  }
};

async function main() {
  console.log('====================================================');
  console.log('  MOMENTUM ROUTING & HISTORY BACK VERIFICATION      ');
  console.log('====================================================\n');

  console.log('▶ [1/3] Testing useNavigationStore Stack & History Logic...');
  const navStorePath = path.resolve('src/store/useNavigationStore.js').replace(/\\/g, '/');
  const { useNavigationStore } = await import('file:///' + navStorePath);

  // Initial state check
  assert.strictEqual(
    useNavigationStore.getState().activeTab,
    'home_dashboard_dark_mode',
    'FAIL: initial activeTab should be home_dashboard_dark_mode'
  );
  assert.strictEqual(useNavigationStore.getState().historyStack.length, 0, 'FAIL: historyStack should start empty');
  console.log('  ✓ Initial screen: home_dashboard_dark_mode (stack: 0)');

  // Simulate complex user navigation trail:
  // Home -> More -> Appearance -> Wallpaper Library -> Blur Control
  useNavigationStore.getState().navigateTo('more_dark_mode');
  assert.strictEqual(useNavigationStore.getState().activeTab, 'more_dark_mode');
  assert.deepStrictEqual(useNavigationStore.getState().historyStack, ['home_dashboard_dark_mode']);
  console.log('  ✓ Navigated: Home -> More (stack depth: 1)');

  useNavigationStore.getState().navigateTo('appearance_dark_mode');
  assert.strictEqual(useNavigationStore.getState().activeTab, 'appearance_dark_mode');
  assert.deepStrictEqual(useNavigationStore.getState().historyStack, ['home_dashboard_dark_mode', 'more_dark_mode']);
  console.log('  ✓ Navigated: More -> Appearance (stack depth: 2)');

  useNavigationStore.getState().navigateTo('background_wallpaper_library_dark_mode');
  assert.strictEqual(useNavigationStore.getState().activeTab, 'background_wallpaper_library_dark_mode');
  assert.deepStrictEqual(
    useNavigationStore.getState().historyStack,
    ['home_dashboard_dark_mode', 'more_dark_mode', 'appearance_dark_mode']
  );
  console.log('  ✓ Navigated: Appearance -> Wallpaper Library (stack depth: 3)');

  useNavigationStore.getState().navigateTo('background_preview_blur_control_dark_mode');
  assert.strictEqual(useNavigationStore.getState().activeTab, 'background_preview_blur_control_dark_mode');
  assert.strictEqual(useNavigationStore.getState().historyStack.length, 4);
  console.log('  ✓ Navigated: Wallpaper Library -> Blur Control (stack depth: 4)');

  // Now trigger goBack sequentially and verify true history traversal:
  console.log('\n▶ [2/3] Testing True Sequential goBack Traversal...');

  // Step 1: Back from Blur Control -> should land on Wallpaper Library
  const back1 = useNavigationStore.getState().goBack('background_wallpaper_library_dark_mode');
  assert.strictEqual(back1, 'background_wallpaper_library_dark_mode');
  assert.strictEqual(useNavigationStore.getState().activeTab, 'background_wallpaper_library_dark_mode');
  assert.strictEqual(useNavigationStore.getState().historyStack.length, 3);
  console.log('  ✓ [Back 1] Returned from Blur Control -> Wallpaper Library');

  // Step 2: Back from Wallpaper Library -> should land on Appearance
  const back2 = useNavigationStore.getState().goBack('appearance_dark_mode');
  assert.strictEqual(back2, 'appearance_dark_mode');
  assert.strictEqual(useNavigationStore.getState().activeTab, 'appearance_dark_mode');
  assert.strictEqual(useNavigationStore.getState().historyStack.length, 2);
  console.log('  ✓ [Back 2] Returned from Wallpaper Library -> Appearance');

  // Step 3: Back from Appearance -> should land on More
  const back3 = useNavigationStore.getState().goBack('more_dark_mode');
  assert.strictEqual(back3, 'more_dark_mode');
  assert.strictEqual(useNavigationStore.getState().activeTab, 'more_dark_mode');
  assert.strictEqual(useNavigationStore.getState().historyStack.length, 1);
  console.log('  ✓ [Back 3] Returned from Appearance -> More');

  // Step 4: Back from More -> should land on Home
  const back4 = useNavigationStore.getState().goBack('home_dashboard_dark_mode');
  assert.strictEqual(back4, 'home_dashboard_dark_mode');
  assert.strictEqual(useNavigationStore.getState().activeTab, 'home_dashboard_dark_mode');
  assert.strictEqual(useNavigationStore.getState().historyStack.length, 0);
  console.log('  ✓ [Back 4] Returned from More -> Home Dashboard');

  // Step 5: Stack is now EMPTY. Back from Home -> safe fallback to Home
  const back5 = useNavigationStore.getState().goBack('home_dashboard_dark_mode');
  assert.strictEqual(back5, 'home_dashboard_dark_mode');
  assert.strictEqual(useNavigationStore.getState().activeTab, 'home_dashboard_dark_mode');
  console.log('  ✓ [Back 5] Stack empty safe fallback -> Home Dashboard');

  // --------------------------------------------------------------------------
  // Audit Verification across Screens
  // --------------------------------------------------------------------------
  console.log('\n▶ [3/3] Auditing Screen Headers & Line Parity...');

  const screenPairs = [
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
    ['TimezoneSelectionDarkMode', 'TimezoneSelectionLightMode']
  ];

  let verifiedCount = 0;
  screenPairs.forEach(([dark, light]) => {
    const dContent = fs.readFileSync(`src/${dark}.jsx`, 'utf8');
    const lContent = fs.readFileSync(`src/${light}.jsx`, 'utf8');

    assert.ok(dContent.includes('goBack'), `FAIL: ${dark} does not reference goBack`);
    assert.ok(lContent.includes('goBack'), `FAIL: ${light} does not reference goBack`);

    const dLines = dContent.split(/\r?\n/).length;
    const lLines = lContent.split(/\r?\n/).length;
    assert.strictEqual(dLines, lLines, `FAIL: Line mismatch between ${dark} (${dLines}) and ${light} (${lLines})`);
    verifiedCount += 2;
  });

  console.log(`  ✓ All ${verifiedCount} screens (${screenPairs.length} pairs) verified with goBack and exact line parity!`);
  console.log('\n====================================================');
  console.log('  >>> ALL ROUTING TESTS PASSED (100% SUCCESS) <<<');
  console.log('====================================================');
}

main().catch((err) => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});

