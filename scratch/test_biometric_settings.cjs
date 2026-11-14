const fs = require('fs');
const assert = require('assert');

console.log('--- Testing Biometric Settings & useSecurityStore Integration ---');

// Test 1: useSecurityStore source analysis
const secStoreCode = fs.readFileSync('src/store/useSecurityStore.js', 'utf8');
assert(secStoreCode.includes('setLockFinance:'), 'useSecurityStore must have setLockFinance');
assert(secStoreCode.includes('setLockReflections:'), 'useSecurityStore must have setLockReflections');
assert(secStoreCode.includes('setAllowQuickDhikr:'), 'useSecurityStore must have setAllowQuickDhikr');
assert(secStoreCode.includes('setBiometricsEnabled:'), 'useSecurityStore must have setBiometricsEnabled');
assert(secStoreCode.includes('syncSecurityStorage'), 'useSecurityStore must synchronously backup to storage');
console.log('✓ useSecurityStore setters and synchronous storage sync verified');

// Test 2: BiometricSettingsLightMode.jsx checks
const lightCode = fs.readFileSync('src/BiometricSettingsLightMode.jsx', 'utf8');
assert(lightCode.includes('useSecurityStore'), 'Light mode must import useSecurityStore');
assert(lightCode.includes('setLockFinance(!lockFinance)'), 'Light mode must bind setLockFinance');
assert(lightCode.includes('setLockReflections(!lockReflections)'), 'Light mode must bind setLockReflections');
assert(lightCode.includes('setAllowQuickDhikr(!allowQuickDhikr)'), 'Light mode must bind setAllowQuickDhikr');
assert(lightCode.includes('setAppLockActive(!isAppLockActive)'), 'Light mode must bind setAppLockActive');
assert(lightCode.includes('setBiometricsEnabled(!biometricsEnabled)'), 'Light mode must bind setBiometricsEnabled');
assert(lightCode.includes("pin_setup_change_light_mode"), 'Light mode must navigate to pin_setup_change_light_mode');
assert(lightCode.includes("biometricsEnabled ? 'Biometric Sanctuary Active' : 'Biometric Sanctuary Paused'"), 'Light mode hero title must dynamically reflect biometricsEnabled');
assert(lightCode.includes("biometricsEnabled ? 'Hardware Enclave Bound' : 'Hardware Enclave Paused'"), 'Light mode status pill must dynamically reflect biometricsEnabled');
console.log('✓ BiometricSettingsLightMode.jsx bindings & dynamic indicators verified');

// Test 3: BiometricSettingsDarkMode.jsx checks
const darkCode = fs.readFileSync('src/BiometricSettingsDarkMode.jsx', 'utf8');
assert(darkCode.includes('useSecurityStore'), 'Dark mode must import useSecurityStore');
assert(darkCode.includes('setLockFinance(!lockFinance)'), 'Dark mode must bind setLockFinance');
assert(darkCode.includes('setLockReflections(!lockReflections)'), 'Dark mode must bind setLockReflections');
assert(darkCode.includes('setAllowQuickDhikr(!allowQuickDhikr)'), 'Dark mode must bind setAllowQuickDhikr');
assert(darkCode.includes('setAppLockActive(!isAppLockActive)'), 'Dark mode must bind setAppLockActive');
assert(darkCode.includes('setBiometricsEnabled(!biometricsEnabled)'), 'Dark mode must bind setBiometricsEnabled');
assert(darkCode.includes("pin_setup_change_dark_mode"), 'Dark mode must navigate to pin_setup_change_dark_mode');
assert(darkCode.includes("biometricsEnabled ? 'Biometric Sanctuary Active' : 'Biometric Sanctuary Paused'"), 'Dark mode hero title must dynamically reflect biometricsEnabled');
assert(darkCode.includes("biometricsEnabled ? 'Hardware Enclave Bound' : 'Hardware Enclave Paused'"), 'Dark mode status pill must dynamically reflect biometricsEnabled');
console.log('✓ BiometricSettingsDarkMode.jsx bindings & dynamic indicators verified');

// Test 4: Line count parity
const lightLines = lightCode.split('\n').length;
const darkLines = darkCode.split('\n').length;
assert.strictEqual(lightLines, darkLines, `Line count parity mismatch: Light (${lightLines}) vs Dark (${darkLines})`);
console.log(`✓ Line count parity strictly preserved at ${lightLines} lines`);

// Test 5: BiometricSettings.jsx standalone checks
const standaloneCode = fs.readFileSync('src/BiometricSettings.jsx', 'utf8');
assert(standaloneCode.includes('useSecurityStore'), 'Standalone must import useSecurityStore');
assert(standaloneCode.includes('setLockFinance(!lockFinance)'), 'Standalone must bind setLockFinance');
assert(standaloneCode.includes('setLockReflections(!lockReflections)'), 'Standalone must bind setLockReflections');
assert(standaloneCode.includes('setAllowQuickDhikr(!allowQuickDhikr)'), 'Standalone must bind setAllowQuickDhikr');
assert(standaloneCode.includes('setAppLockActive(!isAppLockActive)'), 'Standalone must bind setAppLockActive');
assert(standaloneCode.includes('setBiometricsEnabled(!biometricsEnabled)'), 'Standalone must bind setBiometricsEnabled');
assert(standaloneCode.includes('pin_setup_change_dark_mode'), 'Standalone must have PIN setup route');
console.log('✓ BiometricSettings.jsx standalone bindings verified');

console.log('\nALL 5 BIOMETRIC SETTINGS VERIFICATION TESTS PASSED SUCCESSFULLY!');

