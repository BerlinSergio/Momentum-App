const fs = require('fs');
const assert = require('assert');

console.log('--- Testing Security Screens UI Simplification & Cleanup ---');

// 1. AppLockLightMode.jsx & AppLockDarkMode.jsx checks
['src/AppLockLightMode.jsx', 'src/AppLockDarkMode.jsx'].forEach((file) => {
  const code = fs.readFileSync(file, 'utf8');
  assert(!code.includes('Selective Guardrails'), `${file} must NOT contain 'Selective Guardrails'`);
  assert(!code.includes('Zero-Knowledge Architecture'), `${file} must NOT contain 'Zero-Knowledge Architecture'`);
  assert(!code.includes('Finance & Halal Expenses'), `${file} must NOT contain Finance toggle`);
  assert(!code.includes('Reflections & Intimate Notes'), `${file} must NOT contain Reflections toggle`);
  assert(!code.includes('Allow Quick Dhikr Counter'), `${file} must NOT contain Dhikr toggle`);
  assert(!code.includes('lockFinance: security.lockFinance'), `${file} must NOT contain unused draft guardrail state`);
  console.log(`✓ ${file} successfully stripped of guardrails and zero-knowledge sections`);
});

// Line parity for AppLock
const appLockDarkLines = fs.readFileSync('src/AppLockDarkMode.jsx', 'utf8').split('\n').length;
const appLockLightLines = fs.readFileSync('src/AppLockLightMode.jsx', 'utf8').split('\n').length;
assert.strictEqual(appLockDarkLines, appLockLightLines, 'AppLock pair must match line count');
console.log(`✓ AppLock pair matches at ${appLockDarkLines} lines`);

// 2. BiometricSettingsLightMode.jsx & BiometricSettingsDarkMode.jsx checks
['src/BiometricSettingsLightMode.jsx', 'src/BiometricSettingsDarkMode.jsx'].forEach((file) => {
  const code = fs.readFileSync(file, 'utf8');
  assert(!code.includes('Zero-Knowledge Architecture'), `${file} must NOT contain 'Zero-Knowledge Architecture'`);
  assert(!code.includes('Confirm Financial & Zakat Transfers'), `${file} must NOT contain 'Confirm Financial & Zakat Transfers'`);
  assert(!code.includes('Quick Dhikr Counter without Biometrics'), `${file} must NOT contain 'Quick Dhikr Counter without Biometrics'`);
  assert(code.includes('Unlock App on Launch'), `${file} must KEEP 'Unlock App on Launch'`);
  assert(code.includes('Access Sacred Journal'), `${file} must KEEP 'Access Sacred Journal'`);
  assert(code.includes('2 Checkpoints'), `${file} must reflect '2 Checkpoints'`);
  assert(!code.includes('setLockFinance'), `${file} must not have unused setLockFinance`);
  assert(!code.includes('setAllowQuickDhikr'), `${file} must not have unused setAllowQuickDhikr`);
  console.log(`✓ ${file} successfully stripped of removed gates and zero-knowledge card`);
});

// Line parity for BiometricSettings
const bioDarkLines = fs.readFileSync('src/BiometricSettingsDarkMode.jsx', 'utf8').split('\n').length;
const bioLightLines = fs.readFileSync('src/BiometricSettingsLightMode.jsx', 'utf8').split('\n').length;
assert.strictEqual(bioDarkLines, bioLightLines, 'BiometricSettings pair must match line count');
console.log(`✓ BiometricSettings pair matches at ${bioDarkLines} lines`);

// 3. Standalone files check
const appLockCode = fs.readFileSync('src/AppLock.jsx', 'utf8');
assert(!appLockCode.includes('Selective Guardrails'), 'AppLock.jsx must NOT contain Selective Guardrails');
assert(!appLockCode.includes('Zero-Knowledge Architecture'), 'AppLock.jsx must NOT contain Zero-Knowledge Architecture');
console.log('✓ AppLock.jsx standalone stripped');

const bioCode = fs.readFileSync('src/BiometricSettings.jsx', 'utf8');
assert(!bioCode.includes('Zero-Knowledge Architecture'), 'BiometricSettings.jsx must NOT contain Zero-Knowledge Architecture');
assert(!bioCode.includes('Confirm Financial & Zakat Transactions'), 'BiometricSettings.jsx must NOT contain Confirm Financial');
assert(!bioCode.includes('Quick Dhikr Counter without Unlock'), 'BiometricSettings.jsx must NOT contain Quick Dhikr');
assert(bioCode.includes('Unlock App on Launch'), 'BiometricSettings.jsx must KEEP Unlock App on Launch');
assert(bioCode.includes('Access Sacred Journal & Deep Notes'), 'BiometricSettings.jsx must KEEP Access Sacred Journal');
console.log('✓ BiometricSettings.jsx standalone stripped');

console.log('\nALL SECURITY UI SIMPLIFICATION TESTS PASSED SUCCESSFULLY!');
