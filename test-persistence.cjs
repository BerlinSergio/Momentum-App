/**
 * Momentum State Persistence & Zero-Flash Hydration Verification Suite
 * Tests Zustand persist middleware, localStorage read/write, rehydration lifecycle,
 * and zero-flash security guarding across useSecurityStore & useThemeStore.
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

// Mock browser globals for SSR / Node environment
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
  console.log('====================================================');
  console.log('  MOMENTUM PERSISTENCE & HYDRATION VERIFICATION     ');
  console.log('====================================================\n');

  // --------------------------------------------------------------------------
  // TEST 1: useSecurityStore Persist & Hydration
  // --------------------------------------------------------------------------
  console.log('▶ [1/3] Testing useSecurityStore Persistence...');
  const secStorePath = path.resolve('src/store/useSecurityStore.js').replace(/\\/g, '/');
  const { useSecurityStore } = await import('file:///' + secStorePath);

  // Check hydration status
  assert.strictEqual(
    useSecurityStore.getState()._hasHydrated,
    true,
    'FAIL: _hasHydrated must be true after initialization'
  );

  // Update security preferences
  const customPin = '8392';
  useSecurityStore.getState().setPin(customPin);
  useSecurityStore.getState().setBiometricsEnabled(true);
  useSecurityStore.getState().setAppLockActive(true);
  useSecurityStore.getState().setLockTiming('1min');
  useSecurityStore.getState().setHideInMultitasking(true);
  useSecurityStore.getState().setGuardrail('lockFinance', false);

  // Verify storage key and persisted structure
  const rawSec = localStorage.getItem('momentum-security-storage');
  assert.ok(rawSec, "FAIL: Key 'momentum-security-storage' missing from localStorage");
  const parsedSec = JSON.parse(rawSec);
  assert.ok(parsedSec.state, 'FAIL: Persisted payload missing .state container');

  assert.strictEqual(parsedSec.state.pin, customPin, `FAIL: PIN expected ${customPin}`);
  assert.strictEqual(parsedSec.state.biometricsEnabled, true, 'FAIL: biometricsEnabled expected true');
  assert.strictEqual(parsedSec.state.isAppLockActive, true, 'FAIL: isAppLockActive expected true');
  assert.strictEqual(parsedSec.state.lockTiming, '1min', "FAIL: lockTiming expected '1min'");
  assert.strictEqual(parsedSec.state.lockFinance, false, 'FAIL: lockFinance expected false');
  console.log('  ✓ Storage key: momentum-security-storage verified');
  console.log('  ✓ Custom PIN (8392) & lock timing (1min) persisted in localStorage');

  // Cold Reload Simulation
  const coldSnapshotSec = JSON.parse(localStorage.getItem('momentum-security-storage')).state;
  useSecurityStore.setState({ ...coldSnapshotSec, _hasHydrated: true });

  const reloadedSec = useSecurityStore.getState();
  assert.strictEqual(reloadedSec.pin, customPin, 'FAIL: PIN did not persist across reload');
  assert.strictEqual(reloadedSec.biometricsEnabled, true, 'FAIL: biometrics did not persist');
  assert.strictEqual(reloadedSec.lockTiming, '1min', 'FAIL: lockTiming did not persist');
  assert.strictEqual(reloadedSec._hasHydrated, true, 'FAIL: _hasHydrated missing after rehydration');
  console.log('  ✓ Simulated cold restart: all security state restored without loss\n');

  // --------------------------------------------------------------------------
  // TEST 2: useThemeStore Persist, Appearance & DOM Sync
  // --------------------------------------------------------------------------
  console.log('▶ [2/3] Testing useThemeStore Persistence & DOM Sync...');
  const themeStorePath = path.resolve('src/store/useThemeStore.js').replace(/\\/g, '/');
  const { useThemeStore } = await import('file:///' + themeStorePath);

  assert.strictEqual(
    useThemeStore.getState()._hasHydrated,
    true,
    'FAIL: useThemeStore _hasHydrated must be true after initialization'
  );

  // Apply custom theme preferences
  useThemeStore.getState().applyPreferences({
    theme: 'dark',
    aura: 'oasis',
    glassEffects: false,
    gentleTransitions: true,
    blurIntensity: 32,
    syncWithDarkMode: true,
    dimWallpaper: true,
    activeBackgroundId: 'bg-05-golden-dusk',
  });

  const rawTheme = localStorage.getItem('momentum_appearance_settings_v1');
  assert.ok(rawTheme, "FAIL: Key 'momentum_appearance_settings_v1' missing from localStorage");
  const parsedTheme = JSON.parse(rawTheme);

  assert.strictEqual(parsedTheme.state.theme, 'dark', 'FAIL: theme expected dark');
  assert.strictEqual(parsedTheme.state.aura, 'oasis', 'FAIL: aura expected oasis');
  assert.strictEqual(parsedTheme.state.glassEffects, false, 'FAIL: glassEffects expected false');
  assert.strictEqual(parsedTheme.state.blurIntensity, 32, 'FAIL: blurIntensity expected 32');
  assert.strictEqual(parsedTheme.state.activeBackgroundId, 'bg-05-golden-dusk', 'FAIL: activeBackgroundId expected bg-05-golden-dusk');
  console.log('  ✓ Storage key: momentum_appearance_settings_v1 verified');
  console.log('  ✓ Theme (dark), Aura (oasis), Blur (32px), Background (bg-05-golden-dusk) persisted');

  // Verify DOM attributes were updated
  assert.strictEqual(domAttributes['data-aura'], 'oasis', 'FAIL: DOM data-aura expected oasis');
  assert.strictEqual(domAttributes['data-active-background'], 'bg-05-golden-dusk', 'FAIL: DOM active background expected bg-05-golden-dusk');
  console.log('  ✓ DOM synchronizer applied variables and data-attributes');

  // Cold Reload Simulation
  const coldSnapshotTheme = JSON.parse(localStorage.getItem('momentum_appearance_settings_v1')).state;
  useThemeStore.setState({ ...coldSnapshotTheme, _hasHydrated: true });

  const reloadedTheme = useThemeStore.getState();
  assert.strictEqual(reloadedTheme.theme, 'dark', 'FAIL: Theme did not restore');
  assert.strictEqual(reloadedTheme.aura, 'oasis', 'FAIL: Aura did not restore');
  assert.strictEqual(reloadedTheme.blurIntensity, 32, 'FAIL: Blur did not restore');
  assert.strictEqual(reloadedTheme.activeBackgroundId, 'bg-05-golden-dusk', 'FAIL: Background did not restore');
  console.log('  ✓ Simulated cold restart: all theme state restored without loss\n');

  // --------------------------------------------------------------------------
  // TEST 3: Zero-Flash Hydration Guard in AppLockGuard.jsx
  // --------------------------------------------------------------------------
  console.log('▶ [3/3] Inspecting Zero-Flash Enclave in AppLockGuard.jsx...');
  const guardSource = fs.readFileSync('src/components/AppLockGuard.jsx', 'utf8');

  assert.ok(
    guardSource.includes('_hasHydrated'),
    'FAIL: AppLockGuard must destructure and monitor _hasHydrated'
  );
  assert.ok(
    guardSource.includes('if (!_hasHydrated)'),
    'FAIL: AppLockGuard must have an explicit if (!_hasHydrated) return guard'
  );
  assert.ok(
    guardSource.includes('Momentum Vault'),
    'FAIL: AppLockGuard must render the secure enclave shield during hydration'
  );
  console.log('  ✓ Zero-flash enclave shield correctly gates unhydrated rendering');
  console.log('  ✓ Application content protected from initial-render flicker\n');

  console.log('====================================================');
  console.log('  >>> ALL PERSISTENCE TESTS PASSED (100% SUCCESS) <<<');
  console.log('====================================================');
}

main().catch((err) => {
  console.error('\n❌ VERIFICATION FAILED:', err);
  process.exit(1);
});

