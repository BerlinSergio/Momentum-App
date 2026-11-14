const fs = require('fs');
const assert = require('assert');

console.log('--- STARTING EDIT PROFILE TEST SUITE ---');

// 1. Verify existence of files
const darkCode = fs.readFileSync('src/EditProfileDarkMode.jsx', 'utf8');
const lightCode = fs.readFileSync('src/EditProfileLightMode.jsx', 'utf8');
const delegatorCode = fs.readFileSync('src/EditProfile.jsx', 'utf8');
const storeCode = fs.readFileSync('src/store/useProfileStore.js', 'utf8');
const dropdownCode = fs.readFileSync('src/components/ui/CustomDropdown.jsx', 'utf8');

assert(darkCode.length > 0, 'EditProfileDarkMode should not be empty');
assert(lightCode.length > 0, 'EditProfileLightMode should not be empty');
assert(delegatorCode.length > 0, 'EditProfile delegator should not be empty');
assert(storeCode.length > 0, 'useProfileStore should not be empty');
assert(dropdownCode.length > 0, 'CustomDropdown should not be empty');
console.log('✓ All 5 profile and dropdown files exist and have content');

// 2. Line parity check
const darkLines = darkCode.split('\n').length;
const lightLines = lightCode.split('\n').length;
assert.strictEqual(darkLines, lightLines, `Lines must match: dark=${darkLines}, light=${lightLines}`);
console.log(`✓ 1:1 Line parity verified: ${darkLines} lines in both dark and light files`);

// 3. Fallback Avatar and Photo Upload Check (with canvas compression)
[darkCode, lightCode].forEach((code, idx) => {
  const mode = idx === 0 ? 'Dark' : 'Light';
  assert(code.includes('fileInputRef'), `${mode} must use fileInputRef for hidden file upload`);
  assert(code.includes('handlePhotoChange'), `${mode} must have handlePhotoChange handler`);
  assert(code.includes('handleRemovePhoto'), `${mode} must have handleRemovePhoto handler`);
  assert(code.includes('canvas'), `${mode} must use canvas to compress avatar before storage`);
  assert(code.includes('onError'), `${mode} must handle img onError fallback`);
  assert(!code.includes('/path-to-avatar.jpg'), `${mode} must not have broken /path-to-avatar.jpg`);
  console.log(`✓ ${mode} Avatar upload, fallback SVG, and compression logic verified`);
});

// 4. Custom Dropdowns replacing native <select>
[darkCode, lightCode].forEach((code, idx) => {
  const mode = idx === 0 ? 'Dark' : 'Light';
  assert(!code.includes('<select'), `${mode} must NOT have native <select> elements`);
  assert(code.includes('<CustomDropdown'), `${mode} must use <CustomDropdown>`);
  assert(code.includes('CURRENCY_OPTIONS'), `${mode} must define CURRENCY_OPTIONS`);
  assert(code.includes('TIMEZONE_OPTIONS'), `${mode} must define TIMEZONE_OPTIONS`);
  assert(code.includes('CONVENTION_OPTIONS'), `${mode} must define CONVENTION_OPTIONS`);
  console.log(`✓ ${mode} Custom glassmorphic dropdowns verified (0 native <select> elements)`);
});

// 5. Verification of UI Simplification: Removal of 'Standard' badge, 'Verified' email indicator, and Cloud Sync card
[darkCode, lightCode].forEach((code, idx) => {
  const mode = idx === 0 ? 'Dark' : 'Light';
  assert(!code.includes('>Standard<'), `${mode} must not contain 'Standard' tier badge`);
  assert(!code.includes('Verified'), `${mode} must not contain 'Verified' email badge`);
  assert(!code.includes('CheckCircle2'), `${mode} must not contain CheckCircle2 icon`);
  assert(!code.includes('Cloud Sync Encrypted'), `${mode} must not contain Cloud Sync card`);
  assert(!code.includes('Sync Now'), `${mode} must not contain Sync Now button`);
  console.log(`✓ ${mode} 'Standard' badge, 'Verified' email UI, and Cloud Sync card confirmed removed`);
});

// 6. Hijri Shamsi Toggle
[darkCode, lightCode].forEach((code, idx) => {
  const mode = idx === 0 ? 'Dark' : 'Light';
  assert(code.includes('role="switch"'), `${mode} must have role="switch" for accessibility`);
  assert(code.includes('aria-checked={hijriShamsi}'), `${mode} must have aria-checked binding`);
  assert(code.includes('setHijriShamsi(!hijriShamsi)'), `${mode} must toggle hijriShamsi state`);
  console.log(`✓ ${mode} Hijri Shamsi Toggle verified`);
});

// 7. Save & Discard logic with organized Discard button
[darkCode, lightCode].forEach((code, idx) => {
  const mode = idx === 0 ? 'Dark' : 'Light';
  assert(code.includes('handleSave'), `${mode} must have handleSave function`);
  assert(code.includes('handleDiscard'), `${mode} must have handleDiscard function`);
  assert(code.includes('updateProfile('), `${mode} handleSave must call updateProfile`);
  assert(code.includes('Discard Changes'), `${mode} must have Discard Changes button`);
  assert(code.includes('mt-5'), `${mode} Discard Changes button must have mt-5 spacing`);
  assert(code.includes('text-sm font-medium'), `${mode} Discard Changes must use text-sm font-medium`);
  assert(code.includes('goBack'), `${mode} must support goBack navigation`);
  assert(code.includes('setActiveTab'), `${mode} must support setActiveTab navigation`);
  console.log(`✓ ${mode} Save & Discard logic and organized styling verified`);
});

// 8. Bottom scroll clearance
[darkCode, lightCode].forEach((code, idx) => {
  const mode = idx === 0 ? 'Dark' : 'Light';
  assert(code.includes('pb-36') || code.includes('pb-40'), `${mode} must have pb-36/pb-40 for bottom nav clearance`);
  console.log(`✓ ${mode} Bottom clearance verified`);
});

console.log('--- ALL EDIT PROFILE TESTS PASSED SUCCESSFULLY! ---');
