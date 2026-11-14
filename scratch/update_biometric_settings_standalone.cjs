const fs = require('fs');

let content = fs.readFileSync('src/BiometricSettings.jsx', 'utf8');

// Normalize to LF for replacements
content = content.replace(/\r\n/g, '\n');

// Add import
if (!content.includes("import { useSecurityStore } from './store/useSecurityStore';")) {
  content = `import { useSecurityStore } from './store/useSecurityStore';\n` + content;
}

// Replace useState with useSecurityStore
const oldStateBlock = `  const [masterToggle, setMasterToggle] = useState(true);
  const [gate1, setGate1] = useState(true);
  const [gate2, setGate2] = useState(true);
  const [gate3, setGate3] = useState(true);
  const [gate4, setGate4] = useState(false);`;

const newStateBlock = `  const {
    isAppLockActive,
    lockFinance,
    lockReflections,
    allowQuickDhikr,
    biometricsEnabled,
    pin,
    setAppLockActive,
    setLockFinance,
    setLockReflections,
    setAllowQuickDhikr,
    setBiometricsEnabled,
    updatePreferences,
  } = useSecurityStore();`;

content = content.replace(oldStateBlock, newStateBlock);

// Status pill text & icon
content = content.replace(
  `children: "HARDWARE ENCLAVE BOUND"`,
  `children: biometricsEnabled ? "HARDWARE ENCLAVE BOUND" : "HARDWARE ENCLAVE PAUSED"`
);
content = content.replace(
  `children: "Biometric Sanctuary Active"`,
  `children: biometricsEnabled ? "Biometric Sanctuary Active" : "Biometric Sanctuary Paused"`
);
content = content.replace(
  `children: "Unlock Momentum instantly using Face ID or Touch ID sensor on this device."`,
  `children: biometricsEnabled ? "Unlock Momentum instantly using Face ID or Touch ID sensor on this device." : "Biometric unlock is currently disabled. Momentum will require your PIN."`
);

// Master toggle
content = content.replace(`"aria-checked": masterToggle,`, `"aria-checked": biometricsEnabled,`);
content = content.replace(
  `\${masterToggle ? 'bg-gradient-to-r from-primary-container to-inverse-primary shadow-[0_0_14px_rgba(128,131,255,0.45)]' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
  `\${biometricsEnabled ? 'bg-gradient-to-r from-primary-container to-inverse-primary shadow-[0_0_14px_rgba(128,131,255,0.45)]' : 'bg-slate-300'}`
);
content = content.replace(`onClick: () => setMasterToggle(!masterToggle),`, `onClick: () => setBiometricsEnabled(!biometricsEnabled),`);
content = content.replace(
  `\${masterToggle ? 'translate-x-6 bg-on-background' : 'translate-x-1 bg-outline'}`,
  `\${biometricsEnabled ? 'translate-x-6 bg-on-background' : 'translate-x-1 bg-outline'}`
);
content = content.replace(
  `children: "Secure hardware keypair authenticated and active"`,
  `children: biometricsEnabled ? "Secure hardware keypair authenticated and active" : "Biometric authentication currently switched off"`
);

// Fallback mechanism PIN
content = content.replace(`children: "Configured (••••)"`, `children: pin ? "Configured (••••)" : "Not Set"`);
content = content.replace(
  `type: "button",\n              variant: "none",\n              children: [/*#__PURE__*/_jsxDEV("div", {\n                className: "flex items-center gap-space-xs",\n                children: [/*#__PURE__*/_jsxDEV("span", {\n                  className: "material-symbols-outlined text-secondary text-[18px]",\n                  children: "edit_note"`,
  `type: "button",\n              variant: "none",\n              onClick: () => setActiveTab && setActiveTab('pin_setup_change_dark_mode'),\n              children: [/*#__PURE__*/_jsxDEV("div", {\n                className: "flex items-center gap-space-xs",\n                children: [/*#__PURE__*/_jsxDEV("span", {\n                  className: "material-symbols-outlined text-secondary text-[18px]",\n                  children: "edit_note"`
);

// Gate 1
content = content.replace(`"aria-checked": gate1,`, `"aria-checked": isAppLockActive,`);
content = content.replace(
  `\${gate1 ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
  `\${isAppLockActive ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-slate-300'}`
);
content = content.replace(`onClick: () => setGate1(!gate1),`, `onClick: () => setAppLockActive(!isAppLockActive),`);
content = content.replace(
  `\${gate1 ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}`,
  `\${isAppLockActive ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}`
);

// Gate 2
content = content.replace(`"aria-checked": gate2,`, `"aria-checked": lockFinance,`);
content = content.replace(
  `\${gate2 ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
  `\${lockFinance ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-slate-300'}`
);
content = content.replace(`onClick: () => setGate2(!gate2),`, `onClick: () => setLockFinance(!lockFinance),`);
content = content.replace(
  `\${gate2 ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}` ,
  `\${lockFinance ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}`
);

// Gate 3
content = content.replace(`"aria-checked": gate3,`, `"aria-checked": lockReflections,`);
content = content.replace(
  `\${gate3 ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
  `\${lockReflections ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-slate-300'}`
);
content = content.replace(`onClick: () => setGate3(!gate3),`, `onClick: () => setLockReflections(!lockReflections),`);
content = content.replace(
  `\${gate3 ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}` ,
  `\${lockReflections ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}`
);

// Gate 4
content = content.replace(`"aria-checked": gate4,`, `"aria-checked": allowQuickDhikr,`);
content = content.replace(
  `\${gate4 ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
  `\${allowQuickDhikr ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-slate-300'}`
);
content = content.replace(`onClick: () => setGate4(!gate4),`, `onClick: () => setAllowQuickDhikr(!allowQuickDhikr),`);
content = content.replace(
  `\${gate4 ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}` ,
  `\${allowQuickDhikr ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}`
);

// Save Preferences button
content = content.replace(
  `type: "button",\n              variant: "primary",\n              children: /*#__PURE__*/_jsxDEV("div", {`,
  `type: "button",\n              variant: "primary",\n              onClick: () => { updatePreferences({ biometricsEnabled, isAppLockActive, lockFinance, lockReflections, allowQuickDhikr }); alert('Biometric preferences saved.'); },\n              children: /*#__PURE__*/_jsxDEV("div", {`
);

// Convert back to CRLF to preserve original file format
content = content.replace(/\n/g, '\r\n');

fs.writeFileSync('src/BiometricSettings.jsx', content, 'utf8');
console.log('Updated src/BiometricSettings.jsx successfully');
