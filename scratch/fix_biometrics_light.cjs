const fs = require('fs');
let c = fs.readFileSync('src/BiometricSettingsLightMode.jsx', 'utf8');
const lines = c.split(/\r?\n/);
const filtered = [];
let seenImport = false;
let seenConst = false;

for (const line of lines) {
  if (line.includes("import { useSecurityStore } from './store/useSecurityStore';")) {
    if (seenImport) continue;
    seenImport = true;
  }
  if (line.includes("const { isAppLockActive, lockFinance, lockReflections")) {
    if (seenConst) continue;
    seenConst = true;
  }
  filtered.push(line);
}

fs.writeFileSync('src/BiometricSettingsLightMode.jsx', filtered.join('\r\n'), 'utf8');
console.log('Fixed BiometricSettingsLightMode duplicates, new line count:', filtered.length);

