const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock localStorage simulation
const storageBackend = {};
const localStorageMock = {
  getItem: (k) => storageBackend[k] ?? null,
  setItem: (k, v) => { storageBackend[k] = String(v); },
  removeItem: (k) => { delete storageBackend[k]; },
  clear: () => { Object.keys(storageBackend).forEach((k) => delete storageBackend[k]); },
};

global.window = {
  localStorage: localStorageMock,
  matchMedia: () => ({ matches: false }),
};
global.localStorage = localStorageMock;
global.document = {
  documentElement: {
    classList: { add: () => {}, remove: () => {} },
    style: { setProperty: () => {} },
    setAttribute: () => {},
  },
};

async function testUnifiedWallpaper() {
  console.log('================================================================');
  console.log('   MOMENTUM UNIFIED DYNAMIC WALLPAPER SYNCHRONIZATION TEST     ');
  console.log('================================================================\n');

  const themeStorePath = path.resolve('src/store/useThemeStore.js').replace(/\\/g, '/');
  const { useThemeStore } = await import('file:///' + themeStorePath);

  // 1. Audit store properties for split states
  console.log('▶ [1/4] Auditing useThemeStore for single global activeBackgroundId...');
  const state = useThemeStore.getState();
  assert.ok('activeBackgroundId' in state, 'useThemeStore must have activeBackgroundId');
  assert.strictEqual(state.activeLightBackground, undefined, 'Split activeLightBackground state must NOT exist');
  assert.strictEqual(state.activeDarkBackground, undefined, 'Split activeDarkBackground state must NOT exist');
  assert.strictEqual(state.lightBackgroundId, undefined, 'Split lightBackgroundId state must NOT exist');
  assert.strictEqual(state.darkBackgroundId, undefined, 'Split darkBackgroundId state must NOT exist');
  console.log('  ✓ Verified: Single global activeBackgroundId is used');
  console.log('  ✓ Verified: Zero split states in useThemeStore\n');

  // 2. Test selecting a wallpaper and unified dispatch
  console.log('▶ [2/4] Testing wallpaper selection and unified state update...');
  const targetWallpaperId = 'bg-08-mountain-zenith';
  useThemeStore.getState().setActiveBackgroundId(targetWallpaperId);
  assert.strictEqual(useThemeStore.getState().activeBackgroundId, targetWallpaperId);
  console.log(`  ✓ activeBackgroundId set to "${targetWallpaperId}" globally\n`);

  // 3. Test dynamic resolution between lightImage and darkImage
  console.log('▶ [3/4] Testing macOS-style dynamic light/dark variant shift...');
  const lightResult = useThemeStore.getState().getActiveWallpaper(false);
  const darkResult = useThemeStore.getState().getActiveWallpaper(true);

  assert.strictEqual(lightResult.activeWallpaper.id, targetWallpaperId, 'Wallpaper ID must be unchanged in Light Mode');
  assert.strictEqual(darkResult.activeWallpaper.id, targetWallpaperId, 'Wallpaper ID must be unchanged in Dark Mode');
  assert.strictEqual(lightResult.currentBgImage, lightResult.activeWallpaper.lightImage, 'Light mode must resolve lightImage');
  assert.strictEqual(darkResult.currentBgImage, darkResult.activeWallpaper.darkImage, 'Dark mode must resolve darkImage');
  assert.notStrictEqual(lightResult.currentBgImage, darkResult.currentBgImage, 'Light and dark images must be different visual variants');
  console.log(`  ✓ Light Mode asset: ${lightResult.currentBgImage.slice(0, 60)}...`);
  console.log(`  ✓ Dark Mode asset:  ${darkResult.currentBgImage.slice(0, 60)}...`);
  console.log('  ✓ Verified: Single wallpaper choice shifts variants when theme changes\n');

  // 4. Verify root layout binding to CSS background-image
  console.log('▶ [4/4] Auditing App.jsx and GlobalBackground.jsx for CSS background-image binding...');
  const appSrc = fs.readFileSync('src/App.jsx', 'utf8');
  const globalBgSrc = fs.readFileSync('src/components/GlobalBackground.jsx', 'utf8');

  assert.ok(appSrc.includes('backgroundImage: `url("${currentBgImage}")`'), 'App.jsx must bind CSS backgroundImage to currentBgImage');
  assert.ok(appSrc.includes('const currentBgImage = isDarkMode ? activeWallpaper.darkImage : activeWallpaper.lightImage;'), 'App.jsx must implement dynamic variant selection logic');
  assert.ok(globalBgSrc.includes('backgroundImage: `url("${currentBgImage}")`'), 'GlobalBackground must bind CSS backgroundImage to currentBgImage');

  console.log('  ✓ PhoneWallpaperCanvas in App.jsx binds backgroundImage: url("${currentBgImage}")');
  console.log('  ✓ GlobalBackground.jsx binds backgroundImage: url("${currentBgImage}")\n');

  console.log('================================================================');
  console.log('   ALL UNIFIED WALLPAPER SYNCHRONIZATION TESTS PASSED! (100%)    ');
  console.log('================================================================');
}

testUnifiedWallpaper().catch((err) => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});

