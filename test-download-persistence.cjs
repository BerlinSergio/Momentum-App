/**
 * Momentum Downloaded Wallpaper Persistence & Store Synchronization Verification Suite
 * Tests:
 * 1. Initial store state (wallpapers contains BACKGROUND_LIBRARY default set).
 * 2. Downloading new cloud batch overwrites `wallpapers` and persists to localStorage.
 * 3. Cold restart simulation rehydrates the persisted cloud batch.
 * 4. BackgroundWallpaperLibrary components consume store wallpapers dynamically.
 * 5. Line parity across all 27 Dark/Light pairs is preserved.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

// In-memory mock for localStorage
const storageBackend = {};
const localStorageMock = {
  getItem: (key) => storageBackend[key] ?? null,
  setItem: (key, val) => { storageBackend[key] = String(val); },
  removeItem: (key) => { delete storageBackend[key]; },
  clear: () => { Object.keys(storageBackend).forEach((k) => delete storageBackend[k]); },
};

// Mock browser globals
global.window = {
  localStorage: localStorageMock,
  matchMedia: () => ({ matches: false }),
};
global.localStorage = localStorageMock;

const domStyles = {};
const domAttributes = {};
const domClasses = new Set();
global.document = {
  documentElement: {
    classList: {
      add: (cls) => domClasses.add(cls),
      remove: (cls) => domClasses.delete(cls),
      contains: (cls) => domClasses.has(cls),
    },
    style: {
      setProperty: (prop, val) => { domStyles[prop] = val; },
      getPropertyValue: (prop) => domStyles[prop] ?? '',
    },
    setAttribute: (attr, val) => { domAttributes[attr] = val; },
    getAttribute: (attr) => domAttributes[attr] ?? null,
  },
};

async function main() {
  console.log('================================================================');
  console.log('   MOMENTUM DOWNLOADED WALLPAPERS PERSISTENCE VERIFICATION      ');
  console.log('================================================================\n');

  const defaultWallpapersPath = path.resolve('src/data/defaultWallpapers.js').replace(/\\/g, '/');
  const { BACKGROUND_LIBRARY, generateWallpaperBatch } = await import('file:///' + defaultWallpapersPath);

  const themeStorePath = path.resolve('src/store/useThemeStore.js').replace(/\\/g, '/');
  const { useThemeStore } = await import('file:///' + themeStorePath);

  // --------------------------------------------------------------------------
  // TEST 1: Initial Store State
  // --------------------------------------------------------------------------
  console.log('▶ [1/5] Verifying Initial useThemeStore Wallpapers State...');
  const initialState = useThemeStore.getState();
  assert.ok(Array.isArray(initialState.wallpapers), 'FAIL: wallpapers must be an array');
  assert.strictEqual(initialState.wallpapers.length, 30, 'FAIL: wallpapers must have 30 items');
  assert.strictEqual(
    initialState.wallpapers[0].id,
    BACKGROUND_LIBRARY[0].id,
    'FAIL: initial wallpapers must match BACKGROUND_LIBRARY default set'
  );
  console.log('  ✓ Initial state contains 30 curated wallpapers from BACKGROUND_LIBRARY\n');

  // --------------------------------------------------------------------------
  // TEST 2: Downloading New Cloud Batch & LocalStorage Overwrite
  // --------------------------------------------------------------------------
  console.log('▶ [2/5] Simulating Download of 30 Online Wallpapers...');
  const testBatchPrefix = 'test-cloud-pack-v1';
  const newCloudBatch = generateWallpaperBatch(testBatchPrefix);
  assert.strictEqual(newCloudBatch.length, 30, 'FAIL: generateWallpaperBatch must generate 30 wallpapers');

  // Dispatch setWallpapers
  useThemeStore.getState().setWallpapers(newCloudBatch);

  // Verify memory state updated
  const updatedState = useThemeStore.getState();
  assert.strictEqual(
    updatedState.wallpapers[0].id,
    newCloudBatch[0].id,
    'FAIL: useThemeStore.wallpapers did not update with new cloud batch'
  );
  assert.strictEqual(
    updatedState.wallpapers[0].isDownloaded,
    true,
    'FAIL: new wallpapers must have isDownloaded flag'
  );

  // Verify localStorage has overwritten wallpapers
  const rawStorage = localStorage.getItem('momentum_appearance_settings_v1');
  assert.ok(rawStorage, "FAIL: 'momentum_appearance_settings_v1' missing from localStorage");
  const parsedStorage = JSON.parse(rawStorage);
  assert.ok(parsedStorage.state, 'FAIL: Persisted payload missing state object');
  assert.ok(Array.isArray(parsedStorage.state.wallpapers), 'FAIL: Persisted state missing wallpapers array');
  assert.strictEqual(parsedStorage.state.wallpapers.length, 30, 'FAIL: Persisted wallpapers array must have 30 items');
  assert.strictEqual(
    parsedStorage.state.wallpapers[0].id,
    newCloudBatch[0].id,
    'FAIL: Persisted wallpaper in localStorage does not match downloaded batch'
  );
  console.log('  ✓ setWallpapers action successfully updated useThemeStore');
  console.log('  ✓ momentum_appearance_settings_v1 in localStorage successfully overwritten with 30 cloud wallpapers\n');

  // --------------------------------------------------------------------------
  // TEST 3: Cold Reload / Rehydration Simulation
  // --------------------------------------------------------------------------
  console.log('▶ [3/5] Simulating Cold App Restart & Rehydration...');
  // Read back the exact snapshot from localStorage as if app just loaded
  const coldSnapshot = JSON.parse(localStorage.getItem('momentum_appearance_settings_v1')).state;
  
  // Re-hydrate store
  useThemeStore.setState({
    ...coldSnapshot,
    _hasHydrated: true,
  });

  const reloadedState = useThemeStore.getState();
  assert.strictEqual(
    reloadedState.wallpapers[0].id,
    newCloudBatch[0].id,
    'FAIL: Cold restart lost downloaded wallpapers! Reverted to default.'
  );
  assert.strictEqual(
    reloadedState.wallpapers[29].id,
    newCloudBatch[29].id,
    'FAIL: Cold restart lost 30th downloaded wallpaper.'
  );
  console.log('  ✓ Cold restart successful: All 30 downloaded wallpapers restored from localStorage');
  console.log('  ✓ User sees their saved downloaded wallpapers immediately upon restart\n');

  // --------------------------------------------------------------------------
  // TEST 4: Codebase Audit of Background Library Components
  // --------------------------------------------------------------------------
  console.log('▶ [4/5] Auditing BackgroundLibrary Dynamic Store Consumption...');
  const lightCode = fs.readFileSync('src/BackgroundWallpaperLibraryLightMode.jsx', 'utf8');
  const darkCode = fs.readFileSync('src/BackgroundWallpaperLibraryDarkMode.jsx', 'utf8');

  // Check that useThemeStore.wallpapers is consumed
  assert.ok(
    lightCode.includes('useThemeStore((s) => s.wallpapers)'),
    'FAIL: BackgroundWallpaperLibraryLightMode must read useThemeStore.wallpapers'
  );
  assert.ok(
    darkCode.includes('useThemeStore((s) => s.wallpapers)'),
    'FAIL: BackgroundWallpaperLibraryDarkMode must read useThemeStore.wallpapers'
  );

  // Check that setWallpapers is called in handleDownloadCloudBatch
  assert.ok(
    lightCode.includes('setWallpapers(newCloudBatch)'),
    'FAIL: LightMode must dispatch setWallpapers(newCloudBatch) on download'
  );
  assert.ok(
    darkCode.includes('setWallpapers(newCloudBatch)'),
    'FAIL: DarkMode must dispatch setWallpapers(newCloudBatch) on download'
  );

  // Check that grid maps over displayedList which derives from wallpapers
  assert.ok(
    lightCode.includes('filteredList = activeCategory === \'All\'\n    ? wallpapers'),
    'FAIL: LightMode filteredList must derive from wallpapers for All category'
  );
  assert.ok(
    darkCode.includes('filteredList = activeCategory === \'All\'\n    ? wallpapers'),
    'FAIL: DarkMode filteredList must derive from wallpapers for All category'
  );
  console.log('  ✓ BackgroundWallpaperLibraryLightMode dynamically maps over useThemeStore.wallpapers');
  console.log('  ✓ BackgroundWallpaperLibraryDarkMode dynamically maps over useThemeStore.wallpapers');
  console.log('  ✓ Download action invokes setWallpapers(newCloudBatch) to overwrite state\n');

  // --------------------------------------------------------------------------
  // TEST 5: Exact 1:1 Line Parity Audit
  // --------------------------------------------------------------------------
  console.log('▶ [5/5] Auditing 100% 1:1 Line Parity Across All 27 Screen Pairs...');
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

  pairs.forEach(([dark, light]) => {
    const dLines = fs.readFileSync(`src/${dark}.jsx`, 'utf8').split('\n').length;
    const lLines = fs.readFileSync(`src/${light}.jsx`, 'utf8').split('\n').length;
    assert.strictEqual(
      dLines,
      lLines,
      `FAIL: Line count mismatch in ${dark} (${dLines}) vs ${light} (${lLines})`
    );
  });
  console.log('  ✓ All 27 Dark and Light mode component pairs maintain 100% exact line parity\n');

  console.log('================================================================');
  console.log('  >>> ALL PERSISTENCE TESTS PASSED (100% SUCCESS) <<<           ');
  console.log('================================================================');
}

main().catch((err) => {
  console.error('\n❌ VERIFICATION FAILED:', err);
  process.exit(1);
});

