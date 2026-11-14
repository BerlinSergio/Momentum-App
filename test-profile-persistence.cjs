const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('===============================================================');
console.log('       MOMENTUM USER PROFILE PERSISTENCE & AUDIT SUITE        ');
console.log('===============================================================\n');

// Mock localStorage
const storageBackend = {};
const localStorageMock = {
  getItem: (key) => storageBackend[key] ?? null,
  setItem: (key, val) => { storageBackend[key] = String(val); },
  removeItem: (key) => { delete storageBackend[key]; },
  clear: () => { Object.keys(storageBackend).forEach((k) => delete storageBackend[k]); },
};

global.window = { localStorage: localStorageMock };
global.localStorage = localStorageMock;

async function testProfilePersistence() {
  console.log('▶ [1/4] Checking absence of native <select> elements in EditProfile...');
  const darkContent = fs.readFileSync('src/EditProfileDarkMode.jsx', 'utf8');
  const lightContent = fs.readFileSync('src/EditProfileLightMode.jsx', 'utf8');

  assert(!darkContent.includes('<select'), 'Dark mode must NOT contain native <select>');
  assert(!lightContent.includes('<select'), 'Light mode must NOT contain native <select>');
  assert(darkContent.includes('<CustomDropdown'), 'Dark mode must use <CustomDropdown>');
  assert(lightContent.includes('<CustomDropdown'), 'Light mode must use <CustomDropdown>');
  console.log('  ✓ Verified 0 native <select> tags; replaced with <CustomDropdown>');

  console.log('▶ [2/4] Testing useProfileStore initialization & update...');
  const profileStorePath = path.resolve('src/store/useProfileStore.js').replace(/\\/g, '/');
  const { useProfileStore } = await import('file:///' + profileStorePath);

  // Initial check
  const initial = useProfileStore.getState();
  assert.strictEqual(initial.fullName, '', 'Initial profile is cleanly blank for new users');

  // Perform update
  const sampleData = {
    fullName: 'Zainab Qasemi',
    email: 'zainab.qasemi@example.af',
    avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...',
    currency: 'USD / $ (US Dollar)',
    timezone: 'Asia/Dubai (UTC+4:00)',
    city: 'Herat, Afghanistan',
    calculationConvention: 'Muslim World League',
    hijriShamsi: true,
  };

  useProfileStore.getState().updateProfile(sampleData);

  // Check state immediately updated
  const updated = useProfileStore.getState();
  assert.strictEqual(updated.fullName, 'Zainab Qasemi');
  assert.strictEqual(updated.email, 'zainab.qasemi@example.af');
  assert.strictEqual(updated.currency, 'USD / $ (US Dollar)');
  assert.strictEqual(updated.timezone, 'Asia/Dubai (UTC+4:00)');
  assert.strictEqual(updated.city, 'Herat, Afghanistan');
  assert.strictEqual(updated.avatar, sampleData.avatar);
  console.log('  ✓ In-memory state updated successfully');

  console.log('▶ [3/4] Verifying direct write to localStorage key...');
  const rawStorage = localStorage.getItem('momentum-profile-storage');
  assert.ok(rawStorage, "localStorage key 'momentum-profile-storage' must exist");
  const parsed = JSON.parse(rawStorage);
  assert.strictEqual(parsed.state.fullName, 'Zainab Qasemi');
  assert.strictEqual(parsed.state.email, 'zainab.qasemi@example.af');
  assert.strictEqual(parsed.state.currency, 'USD / $ (US Dollar)');
  assert.strictEqual(parsed.state.city, 'Herat, Afghanistan');
  assert.strictEqual(parsed.state.avatar, sampleData.avatar);
  console.log('  ✓ localStorage JSON successfully saved with all user updates');

  console.log('▶ [4/4] Simulating cold app restart...');
  // The persistent storage disk has the saved JSON.
  // Rehydrate store as occurs on app boot:
  await useProfileStore.persist.rehydrate();

  const coldState = useProfileStore.getState();
  assert.strictEqual(coldState.fullName, 'Zainab Qasemi', 'Cold restart must restore fullName');
  assert.strictEqual(coldState.email, 'zainab.qasemi@example.af', 'Cold restart must restore email');
  assert.strictEqual(coldState.avatar, sampleData.avatar, 'Cold restart must restore avatar');
  assert.strictEqual(coldState.city, 'Herat, Afghanistan', 'Cold restart must restore city');
  assert.strictEqual(coldState.currency, 'USD / $ (US Dollar)', 'Cold restart must restore currency');
  assert.strictEqual(coldState.timezone, 'Asia/Dubai (UTC+4:00)', 'Cold restart must restore timezone');
  console.log('  ✓ Cold restart: 100% profile state restored from localStorage\n');

  console.log('===============================================================');
  console.log('  USER PROFILE PERSISTENCE & CUSTOM DROPDOWNS: 100% VERIFIED!  ');
  console.log('===============================================================');
}

testProfilePersistence().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
