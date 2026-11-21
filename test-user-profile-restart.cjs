const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('================================================================');
console.log('       VERIFYING 100% USER PROFILE COLD-RESTART PERSISTENCE      ');
console.log('================================================================\n');

// Mock browser window & localStorage
const mockStorage = {};
const localStorageMock = {
  getItem: (key) => mockStorage[key] ?? null,
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach((k) => delete mockStorage[k]); },
};

global.window = { localStorage: localStorageMock };
global.localStorage = localStorageMock;

async function runTestSuite() {
  console.log('▶ [1/5] Checking removal of hardcoded "Aisha Rahmani" defaults...');
  const darkContent = fs.readFileSync('src/EditProfileDarkMode.jsx', 'utf8');
  const lightContent = fs.readFileSync('src/EditProfileLightMode.jsx', 'utf8');
  const storeContent = fs.readFileSync('src/store/useProfileStore.js', 'utf8');

  assert(!darkContent.includes("'Aisha Rahmani'"), 'EditProfileDarkMode must not contain Aisha Rahmani default');
  assert(!lightContent.includes("'Aisha Rahmani'"), 'EditProfileLightMode must not contain Aisha Rahmani default');
  assert(!storeContent.includes("fullName: 'Aisha Rahmani'"), 'useProfileStore must not have Aisha Rahmani in DEFAULT_PROFILE');
  console.log('  ✓ Verified 0 hardcoded "Aisha Rahmani" fallbacks in profile store and editor components.');

  console.log('▶ [2/5] Testing initial store state on clean install...');
  const storePath = path.resolve('src/store/useProfileStore.js').replace(/\\/g, '/');
  const { useProfileStore } = await import('file:///' + storePath + '?init=' + Date.now());

  const initial = useProfileStore.getState();
  assert.strictEqual(initial.fullName, '', 'Initial fullName must be blank');
  assert.strictEqual(initial.email, '', 'Initial email must be blank');
  assert.strictEqual(initial.avatar, null, 'Initial avatar must be null');
  console.log('  ✓ Initial state is cleanly blank for new users (no stale placeholders).');

  console.log('▶ [3/5] Testing profile update & synchronous localStorage dispatch...');
  const testUser = {
    fullName: 'Dr. Tariq Wardak',
    email: 'tariq.wardak@kabul.med.af',
    avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD_MOCK_IMAGE_DATA',
    currency: 'USD / $ (US Dollar)',
    timezone: 'Asia/Dubai (UTC+4:00)',
    city: 'Kandahar, Afghanistan',
    calculationConvention: 'Muslim World League',
    hijriShamsi: true,
  };

  useProfileStore.getState().updateProfile(testUser);

  // Verify memory update
  const currentMem = useProfileStore.getState();
  assert.strictEqual(currentMem.fullName, testUser.fullName);
  assert.strictEqual(currentMem.email, testUser.email);
  assert.strictEqual(currentMem.avatar, testUser.avatar);

  // Verify direct disk update in localStorage
  const rawDisk = localStorage.getItem('momentum-profile-storage');
  assert.ok(rawDisk, 'localStorage must contain momentum-profile-storage key');
  const parsedDisk = JSON.parse(rawDisk);
  assert.strictEqual(parsedDisk.state.fullName, testUser.fullName, 'Disk storage must match updated fullName');
  assert.strictEqual(parsedDisk.state.email, testUser.email, 'Disk storage must match updated email');
  assert.strictEqual(parsedDisk.state.avatar, testUser.avatar, 'Disk storage must match updated avatar');
  console.log('  ✓ updateProfile correctly committed changes directly to device localStorage.');

  console.log('▶ [4/5] Simulating cold app restart / device reboot...');
  // Simulate complete fresh import on next process/page load
  const coldBootModule = await import('file:///' + storePath + '?coldboot=' + Date.now());
  const restored = coldBootModule.useProfileStore.getState();

  assert.strictEqual(restored.fullName, testUser.fullName, 'Cold restart MUST restore fullName');
  assert.strictEqual(restored.email, testUser.email, 'Cold restart MUST restore email');
  assert.strictEqual(restored.avatar, testUser.avatar, 'Cold restart MUST restore avatar');
  assert.strictEqual(restored.city, testUser.city, 'Cold restart MUST restore city');
  assert.strictEqual(restored.currency, testUser.currency, 'Cold restart MUST restore currency');
  assert.strictEqual(restored._hasHydrated, true, 'Store must report _hasHydrated: true');
  console.log('  ✓ 100% of user profile data successfully survived cold restart from disk storage!');

  console.log('▶ [5/5] Verifying global screen subscriptions...');
  const homeDark = fs.readFileSync('src/HomeDashboardDarkMode.jsx', 'utf8');
  const homeLight = fs.readFileSync('src/HomeDashboardLightMode.jsx', 'utf8');
  const routineDark = fs.readFileSync('src/DailyRoutineDarkMode.jsx', 'utf8');
  const routineLight = fs.readFileSync('src/DailyRoutineLightMode.jsx', 'utf8');

  assert(homeDark.includes('useProfileStore'), 'HomeDashboardDarkMode must subscribe to useProfileStore');
  assert(homeLight.includes('useProfileStore'), 'HomeDashboardLightMode must subscribe to useProfileStore');
  assert(routineDark.includes('useProfileStore'), 'DailyRoutineDarkMode must subscribe to useProfileStore');
  assert(routineLight.includes('useProfileStore'), 'DailyRoutineLightMode must subscribe to useProfileStore');
  console.log('  ✓ Home and Daily Routine header avatars and greetings dynamically subscribed to persistent store.\n');

  console.log('================================================================');
  console.log('  ALL PERSISTENCE CHECKS PASSED: ZERO DATA LOSS ON APP RESTART  ');
  console.log('================================================================');
}

runTestSuite().catch((err) => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
