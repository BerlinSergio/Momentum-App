const fs = require('fs');

function updateLight() {
  const file = 'src/BiometricSettingsLightMode.jsx';
  let lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  
  // Line 1: import
  lines[0] = "import React from 'react';\nimport { useSecurityStore } from './store/useSecurityStore';";
  
  // Find export function
  const funcIdx = lines.findIndex(l => l.includes('export default function BiometricSettingsLightMode'));
  if (funcIdx !== -1) {
    lines[funcIdx] = `export default function BiometricSettingsLightMode({ setActiveTab, goBack }) {\n  const { isAppLockActive, lockFinance, lockReflections, allowQuickDhikr, biometricsEnabled, setAppLockActive, setGuardrail, setBiometricsEnabled, updatePreferences } = useSecurityStore();`;
  }

  let content = lines.join('\r\n');

  // Master toggle
  content = content.replace(
    /<button aria-checked="[^"]*" className="relative inline-flex h-8 w-14[^"]*" id="master-toggle" role="switch">[\s\S]*?<\/button>/,
    `<button onClick={() => setBiometricsEnabled(!biometricsEnabled)} aria-checked={biometricsEnabled} className={\`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none \${biometricsEnabled ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-slate-300'}\`} id="master-toggle" role="switch">\r\n<span className={\`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out mt-0.5 ml-0.5 \${biometricsEnabled ? 'translate-x-6' : 'translate-x-0'}\`} id="master-thumb"></span>\r\n</button>`
  );

  // Item 1
  content = content.replace(
    /(Unlock App on Launch[\s\S]*?<\/div>\r?\n<\/div>\r?\n)<button[\s\S]*?<\/button>/,
    `$1<button onClick={() => setAppLockActive(!isAppLockActive)} aria-checked={isAppLockActive} className={\`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 \${isAppLockActive ? 'bg-primary' : 'bg-slate-300'}\`} role="switch">\r\n<span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 mt-0.5 ml-0.5 \${isAppLockActive ? 'translate-x-5' : 'translate-x-0.5'}\`}></span>\r\n</button>`
  );

  // Item 2
  content = content.replace(
    /(Confirm Financial &amp; Zakat Transfers[\s\S]*?<\/div>\r?\n<\/div>\r?\n)<button[\s\S]*?<\/button>/,
    `$1<button onClick={() => setGuardrail('lockFinance', !lockFinance)} aria-checked={lockFinance} className={\`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 \${lockFinance ? 'bg-primary' : 'bg-slate-300'}\`} role="switch">\r\n<span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 mt-0.5 ml-0.5 \${lockFinance ? 'translate-x-5' : 'translate-x-0.5'}\`}></span>\r\n</button>`
  );

  // Item 3
  content = content.replace(
    /(Access Sacred Journal &amp; Deep Notes[\s\S]*?<\/div>\r?\n<\/div>\r?\n)<button[\s\S]*?<\/button>/,
    `$1<button onClick={() => setGuardrail('lockReflections', !lockReflections)} aria-checked={lockReflections} className={\`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 \${lockReflections ? 'bg-primary' : 'bg-slate-300'}\`} role="switch">\r\n<span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 mt-0.5 ml-0.5 \${lockReflections ? 'translate-x-5' : 'translate-x-0.5'}\`}></span>\r\n</button>`
  );

  // Item 4
  content = content.replace(
    /(Quick Dhikr Counter without Biometrics[\s\S]*?<\/div>\r?\n<\/div>\r?\n)<button[\s\S]*?<\/button>/,
    `$1<button onClick={() => setGuardrail('allowQuickDhikr', !allowQuickDhikr)} aria-checked={allowQuickDhikr} className={\`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 \${allowQuickDhikr ? 'bg-primary' : 'bg-slate-300'}\`} role="switch">\r\n<span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 mt-0.5 \${allowQuickDhikr ? 'translate-x-5' : 'translate-x-0.5'}\`}></span>\r\n</button>`
  );

  // Save button
  content = content.replace(
    /<button className="btn-primary w-full" id="save-button">/,
    `<button onClick={() => { updatePreferences({ biometricsEnabled, isAppLockActive, lockFinance, lockReflections, allowQuickDhikr }); const toast = document.getElementById('toast'); if (toast) { toast.classList.remove('opacity-0', 'translate-y-24'); setTimeout(() => toast.classList.add('opacity-0', 'translate-y-24'), 2500); } }} className="btn-primary w-full" id="save-button">`
  );

  fs.writeFileSync(file, content, 'utf8');
}

function updateDark() {
  const file = 'src/BiometricSettingsDarkMode.jsx';
  let lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  
  // Line 1: import
  lines[0] = "import React from 'react';\nimport { useSecurityStore } from './store/useSecurityStore';";
  
  // Find export function
  const funcIdx = lines.findIndex(l => l.includes('export default function BiometricSettingsDarkMode'));
  if (funcIdx !== -1) {
    lines[funcIdx] = `export default function BiometricSettingsDarkMode({ setActiveTab, goBack }) {\n  const { isAppLockActive, lockFinance, lockReflections, allowQuickDhikr, biometricsEnabled, setAppLockActive, setGuardrail, setBiometricsEnabled, updatePreferences } = useSecurityStore();`;
  }

  let content = lines.join('\r\n');

  // Master toggle
  content = content.replace(
    /<button aria-checked="[^"]*" className="relative inline-flex h-8 w-14[^"]*" id="master-toggle" role="switch">[\s\S]*?<\/button>/,
    `<button onClick={() => setBiometricsEnabled(!biometricsEnabled)} aria-checked={biometricsEnabled} className={\`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none \${biometricsEnabled ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-slate-700'}\`} id="master-toggle" role="switch">\r\n<span className={\`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out mt-0.5 ml-0.5 \${biometricsEnabled ? 'translate-x-6' : 'translate-x-0'}\`} id="master-thumb"></span>\r\n</button>`
  );

  // Item 1
  content = content.replace(
    /(Unlock App on Launch[\s\S]*?<\/div>\r?\n<\/div>\r?\n)<button[\s\S]*?<\/button>/,
    `$1<button onClick={() => setAppLockActive(!isAppLockActive)} aria-checked={isAppLockActive} className={\`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 \${isAppLockActive ? 'bg-primary' : 'bg-slate-700'}\`} role="switch">\r\n<span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 mt-0.5 ml-0.5 \${isAppLockActive ? 'translate-x-5' : 'translate-x-0.5'}\`}></span>\r\n</button>`
  );

  // Item 2
  content = content.replace(
    /(Confirm Financial &amp; Zakat Transfers[\s\S]*?<\/div>\r?\n<\/div>\r?\n)<button[\s\S]*?<\/button>/,
    `$1<button onClick={() => setGuardrail('lockFinance', !lockFinance)} aria-checked={lockFinance} className={\`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 \${lockFinance ? 'bg-primary' : 'bg-slate-700'}\`} role="switch">\r\n<span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 mt-0.5 ml-0.5 \${lockFinance ? 'translate-x-5' : 'translate-x-0.5'}\`}></span>\r\n</button>`
  );

  // Item 3
  content = content.replace(
    /(Access Sacred Journal &amp; Deep Notes[\s\S]*?<\/div>\r?\n<\/div>\r?\n)<button[\s\S]*?<\/button>/,
    `$1<button onClick={() => setGuardrail('lockReflections', !lockReflections)} aria-checked={lockReflections} className={\`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 \${lockReflections ? 'bg-primary' : 'bg-slate-700'}\`} role="switch">\r\n<span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 mt-0.5 ml-0.5 \${lockReflections ? 'translate-x-5' : 'translate-x-0.5'}\`}></span>\r\n</button>`
  );

  // Item 4
  content = content.replace(
    /(Quick Dhikr Counter without Biometrics[\s\S]*?<\/div>\r?\n<\/div>\r?\n)<button[\s\S]*?<\/button>/,
    `$1<button onClick={() => setGuardrail('allowQuickDhikr', !allowQuickDhikr)} aria-checked={allowQuickDhikr} className={\`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 \${allowQuickDhikr ? 'bg-primary' : 'bg-slate-700'}\`} role="switch">\r\n<span className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 mt-0.5 \${allowQuickDhikr ? 'translate-x-5' : 'translate-x-0.5'}\`}></span>\r\n</button>`
  );

  // Save button
  content = content.replace(
    /<button className="btn-primary w-full" id="save-button">/,
    `<button onClick={() => { updatePreferences({ biometricsEnabled, isAppLockActive, lockFinance, lockReflections, allowQuickDhikr }); const toast = document.getElementById('toast'); if (toast) { toast.classList.remove('opacity-0', 'translate-y-24'); setTimeout(() => toast.classList.add('opacity-0', 'translate-y-24'), 2500); } }} className="btn-primary w-full" id="save-button">`
  );

  fs.writeFileSync(file, content, 'utf8');
}

updateLight();
updateDark();
console.log('Updated BiometricSettings');

