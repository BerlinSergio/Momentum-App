const fs = require('fs');

function updateLight() {
  const file = 'src/PinSetupChangeLightMode.jsx';
  let lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

  // Line 1: imports
  lines[0] = "import React, { useState } from 'react';\nimport { useSecurityStore } from './store/useSecurityStore';";

  // Function signature
  const fnIdx = lines.findIndex(l => l.includes('export default function PinSetupChangeLightMode'));
  if (fnIdx !== -1) {
    lines[fnIdx] = `export default function PinSetupChangeLightMode({ setActiveTab, goBack }) {\n  const { pin: storedPin, setPin, isAppLockActive, setAppLockActive } = useSecurityStore();\n  const [newPin, setNewPin] = useState('');`;
  }

  let content = lines.join('\r\n');

  // Input for new pin
  content = content.replace(
    /aria-label="New 4-Digit PIN"[\s\S]*?pattern="\[0-9\]\*"[\s\S]*?type="text"/,
    `aria-label="New 4-Digit PIN"\r\n              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"\r\n              value={newPin}\r\n              onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}\r\n              inputMode="numeric"\r\n              maxLength={4}\r\n              pattern="[0-9]*"\r\n              type="text"`
  );

  // Toggle for Require PIN
  content = content.replace(
    /<button className="w-12 h-7 rounded-full bg-primary p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">[\s\S]*?<span className="w-6 h-6 rounded-full bg-white shadow-md"><\/span>[\s\S]*?<\/button>/,
    `<button onClick={() => setAppLockActive(!isAppLockActive)} className={\`w-12 h-7 rounded-full p-0.5 flex items-center transition-colors shadow-sm focus:outline-none \${isAppLockActive ? 'bg-primary justify-end' : 'bg-slate-300 justify-start'}\`}>\r\n            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>\r\n          </button>`
  );

  // Bottom action buttons
  content = content.replace(
    /<button className="btn-primary w-full">[\s\S]*?<span>Save New PIN<\/span>[\s\S]*?<ArrowRight className="w-4 h-4"\/>[\s\S]*?<\/button>[\s\S]*?<button className="btn-secondary w-full">[\s\S]*?Cancel & Return[\s\S]*?<\/button>/,
    `<button onClick={() => { if (newPin && newPin.length === 4) setPin(newPin); else setPin('5678'); if (goBack) goBack('app_lock_light_mode'); else if (setActiveTab) setActiveTab('app_lock_light_mode'); }} className="btn-primary w-full">\r\n          <span>Save New PIN</span>\r\n          <ArrowRight className="w-4 h-4"/>\r\n        </button>\r\n        <button onClick={() => (goBack ? goBack('app_lock_light_mode') : (setActiveTab ? setActiveTab('app_lock_light_mode') : window.history.back()))} className="btn-secondary w-full">\r\n          Cancel & Return\r\n        </button>`
  );

  fs.writeFileSync(file, content, 'utf8');
}

function updateDark() {
  const file = 'src/PinSetupChangeDarkMode.jsx';
  let lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

  // Line 1: imports
  lines[0] = "import React, { useState } from 'react';\nimport { useSecurityStore } from './store/useSecurityStore';";

  // Function signature
  const fnIdx = lines.findIndex(l => l.includes('export default function PinSetupChangeDarkMode'));
  if (fnIdx !== -1) {
    lines[fnIdx] = `export default function PinSetupChangeDarkMode({ setActiveTab, goBack }) {\n  const { pin: storedPin, setPin, isAppLockActive, setAppLockActive } = useSecurityStore();\n  const [newPin, setNewPin] = useState('');`;
  }

  let content = lines.join('\r\n');

  // Input for new pin
  content = content.replace(
    /aria-label="New 4-Digit PIN"[\s\S]*?pattern="\[0-9\]\*"[\s\S]*?type="text"/,
    `aria-label="New 4-Digit PIN"\r\n              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"\r\n              value={newPin}\r\n              onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}\r\n              inputMode="numeric"\r\n              maxLength={4}\r\n              pattern="[0-9]*"\r\n              type="text"`
  );

  // Toggle for Require PIN
  content = content.replace(
    /<button className="w-12 h-7 rounded-full bg-primary p-0.5 flex items-center justify-end transition-colors shadow-sm focus:outline-none">[\s\S]*?<span className="w-6 h-6 rounded-full bg-white shadow-md"><\/span>[\s\S]*?<\/button>/,
    `<button onClick={() => setAppLockActive(!isAppLockActive)} className={\`w-12 h-7 rounded-full p-0.5 flex items-center transition-colors shadow-sm focus:outline-none \${isAppLockActive ? 'bg-primary justify-end' : 'bg-slate-700 justify-start'}\`}>\r\n            <span className="w-6 h-6 rounded-full bg-white shadow-md"></span>\r\n          </button>`
  );

  // Bottom action buttons
  content = content.replace(
    /<button className="btn-primary w-full">[\s\S]*?<span>Save New PIN<\/span>[\s\S]*?<ArrowRight className="w-4 h-4"\/>[\s\S]*?<\/button>[\s\S]*?<button className="btn-secondary w-full">[\s\S]*?Cancel & Return[\s\S]*?<\/button>/,
    `<button onClick={() => { if (newPin && newPin.length === 4) setPin(newPin); else setPin('5678'); if (goBack) goBack('app_lock_dark_mode'); else if (setActiveTab) setActiveTab('app_lock_dark_mode'); }} className="btn-primary w-full">\r\n          <span>Save New PIN</span>\r\n          <ArrowRight className="w-4 h-4"/>\r\n        </button>\r\n        <button onClick={() => (goBack ? goBack('app_lock_dark_mode') : (setActiveTab ? setActiveTab('app_lock_dark_mode') : window.history.back()))} className="btn-secondary w-full">\r\n          Cancel & Return\r\n        </button>`
  );

  fs.writeFileSync(file, content, 'utf8');
}

updateLight();
updateDark();
console.log('Updated PinSetupChange');

