const fs = require('fs');

let bio = fs.readFileSync('src/BiometricSettings.jsx', 'utf8');
const isCRLF = bio.includes('\r\n');
bio = bio.replace(/\r\n/g, '\n');

// 1. Add import
if (!bio.includes("import { useSecurityStore } from './store/useSecurityStore';")) {
  bio = `import { useSecurityStore } from './store/useSecurityStore';\n` + bio;
}

// 2. Destructure useSecurityStore
const oldState = `  const [masterToggle, setMasterToggle] = useState(true);
  const [gate1, setGate1] = useState(true);
  const [gate2, setGate2] = useState(true);
  const [gate3, setGate3] = useState(true);
  const [gate4, setGate4] = useState(false);`;

const newState = `  const {
    isAppLockActive,
    lockReflections,
    biometricsEnabled,
    pin,
    setAppLockActive,
    setLockReflections,
    setBiometricsEnabled,
    updatePreferences,
  } = useSecurityStore();`;

bio = bio.replace(oldState, newState);

// 3. Status Pill & Hero
bio = bio.replace(
  `children: "HARDWARE ENCLAVE BOUND"`,
  `children: biometricsEnabled ? "HARDWARE ENCLAVE BOUND" : "HARDWARE ENCLAVE PAUSED"`
);
bio = bio.replace(
  `children: "Biometric Sanctuary Active"`,
  `children: biometricsEnabled ? "Biometric Sanctuary Active" : "Biometric Sanctuary Paused"`
);
bio = bio.replace(
  `children: "Unlock Momentum instantly using Face ID or Touch ID sensor on this device."`,
  `children: biometricsEnabled ? "Unlock Momentum instantly using Face ID or Touch ID sensor on this device." : "Biometric unlock is currently disabled. Momentum will require your PIN."`
);

// 4. Master switch
bio = bio.replace(`"aria-checked": masterToggle,`, `"aria-checked": biometricsEnabled,`);
bio = bio.replace(
  `\${masterToggle ? 'bg-gradient-to-r from-primary-container to-inverse-primary shadow-[0_0_14px_rgba(128,131,255,0.45)]' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
  `\${biometricsEnabled ? 'bg-gradient-to-r from-primary-container to-inverse-primary shadow-[0_0_14px_rgba(128,131,255,0.45)]' : 'bg-slate-300'}`
);
bio = bio.replace(`onClick: () => setMasterToggle(!masterToggle),`, `onClick: () => setBiometricsEnabled(!biometricsEnabled),`);
bio = bio.replace(
  `\${masterToggle ? 'translate-x-6 bg-on-background' : 'translate-x-1 bg-outline'}`,
  `\${biometricsEnabled ? 'translate-x-6 bg-on-background' : 'translate-x-1 bg-outline'}`
);
bio = bio.replace(
  `children: "Secure hardware keypair authenticated and active"`,
  `children: biometricsEnabled ? "Secure hardware keypair authenticated and active" : "Biometric authentication currently switched off"`
);

// 5. Remove Zero-Knowledge Architecture Card
// Starts at `/*#__PURE__*/_jsxDEV("div", {\n            className: "flex flex-col space-y-space-sm",\n            children: [/*#__PURE__*/_jsxDEV("div", {\n              className: "flex items-center gap-space-xs px-space-xs",\n              children: [/*#__PURE__*/_jsxDEV("span", {\n                className: "material-symbols-outlined text-primary text-[20px]",\n                children: "shield_lock"`
// Ends right before `/*#__PURE__*/_jsxDEV("div", {\n            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-lg space-y-space-md",\n            children: [/*#__PURE__*/_jsxDEV("div", {\n              className: "flex items-center justify-between",`
const zkStart = bio.indexOf(`/*#__PURE__*/_jsxDEV("div", {\n            className: "flex flex-col space-y-space-sm",\n            children: [/*#__PURE__*/_jsxDEV("div", {\n              className: "flex items-center gap-space-xs px-space-xs",\n              children: [/*#__PURE__*/_jsxDEV("span", {\n                className: "material-symbols-outlined text-primary text-[20px]",\n                children: "shield_lock"`);
const fbStart = bio.indexOf(`/*#__PURE__*/_jsxDEV("div", {\n            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-lg space-y-space-md",\n            children: [/*#__PURE__*/_jsxDEV("div", {\n              className: "flex items-center justify-between",`);
if (zkStart !== -1 && fbStart !== -1) {
  bio = bio.substring(0, zkStart) + bio.substring(fbStart);
  console.log('Zero knowledge card removed');
} else {
  console.error('zkStart or fbStart not found:', zkStart, fbStart);
}

// 6. Fallback mechanism PIN
bio = bio.replace(`children: "Configured (••••)"`, `children: pin ? "Configured (••••)" : "Not Set"`);
bio = bio.replace(
  `type: "button",\n              variant: "none",\n              children: [/*#__PURE__*/_jsxDEV("div", {\n                className: "flex items-center gap-space-xs",\n                children: [/*#__PURE__*/_jsxDEV("span", {\n                  className: "material-symbols-outlined text-secondary text-[18px]",\n                  children: "edit_note"`,
  `type: "button",\n              variant: "none",\n              onClick: () => setActiveTab && setActiveTab('pin_setup_change_dark_mode'),\n              children: [/*#__PURE__*/_jsxDEV("div", {\n                className: "flex items-center gap-space-xs",\n                children: [/*#__PURE__*/_jsxDEV("span", {\n                  className: "material-symbols-outlined text-secondary text-[18px]",\n                  children: "edit_note"`
);

// 7. Checkpoint count
bio = bio.replace('4 Checkpoints', '2 Checkpoints');

// 8. Gate 1 bindings
bio = bio.replace(`"aria-checked": gate1,`, `"aria-checked": isAppLockActive,`);
bio = bio.replace(
  `\${gate1 ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
  `\${isAppLockActive ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-slate-300'}`
);
bio = bio.replace(`onClick: () => setGate1(!gate1),`, `onClick: () => setAppLockActive(!isAppLockActive),`);
bio = bio.replace(
  `\${gate1 ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}`,
  `\${isAppLockActive ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}`
);

// 9. Remove Gate 2 (Finance)
const g2Start = bio.indexOf(`, /*#__PURE__*/_jsxDEV("div", {\n                className: "p-space-md flex items-center justify-between gap-space-sm",\n                children: [/*#__PURE__*/_jsxDEV("div", {\n                  className: "flex items-center gap-space-md min-w-0",\n                  children: [/*#__PURE__*/_jsxDEV("div", {\n                    className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0 text-secondary",\n                    children: /*#__PURE__*/_jsxDEV("span", {\n                      className: "material-symbols-outlined text-[20px]",\n                      children: "account_balance_wallet"`);
const g3Start = bio.indexOf(`, /*#__PURE__*/_jsxDEV("div", {\n                className: "p-space-md flex items-center justify-between gap-space-sm",\n                children: [/*#__PURE__*/_jsxDEV("div", {\n                  className: "flex items-center gap-space-md min-w-0",\n                  children: [/*#__PURE__*/_jsxDEV("div", {\n                    className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0 text-tertiary",\n                    children: /*#__PURE__*/_jsxDEV("span", {\n                      className: "material-symbols-outlined text-[20px]",\n                      children: "auto_stories"`);
if (g2Start !== -1 && g3Start !== -1) {
  bio = bio.substring(0, g2Start) + bio.substring(g3Start);
  console.log('Gate 2 removed');
} else {
  console.error('g2Start or g3Start not found:', g2Start, g3Start);
}

// 10. Gate 3 bindings
bio = bio.replace(`"aria-checked": gate3,`, `"aria-checked": lockReflections,`);
bio = bio.replace(
  `\${gate3 ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none'}`,
  `\${lockReflections ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-slate-300'}`
);
bio = bio.replace(`onClick: () => setGate3(!gate3),`, `onClick: () => setLockReflections(!lockReflections),`);
bio = bio.replace(
  `\${gate3 ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}`,
  `\${lockReflections ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}`
);

// 11. Remove Gate 4 (Dhikr)
const g4Start = bio.indexOf(`, /*#__PURE__*/_jsxDEV("div", {\n                className: "p-space-md flex items-center justify-between gap-space-sm",\n                children: [/*#__PURE__*/_jsxDEV("div", {\n                  className: "flex items-center gap-space-md min-w-0",\n                  children: [/*#__PURE__*/_jsxDEV("div", {\n                    className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0 text-on-surface dark:text-on-surface-variant",\n                    children: /*#__PURE__*/_jsxDEV("span", {\n                      className: "material-symbols-outlined text-[20px]",\n                      children: "toll"`);
const g4End = bio.indexOf(`children: /*#__PURE__*/_jsxDEV(LiquidButton, {\n              className: "w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-secondary-container via-primary-container to-tertiary-container`);
// Notice: Gate 4 is inside `children: [...]` of divide-y container.
// Right after Gate 4 ends with `}, void 0, true)]\n            }, void 0, true)]\n          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {\n            className: "pt-space-xs",\n            `
const gateEndPattern = bio.indexOf(`}, void 0, false)]\n              }, void 0, true)]\n            }, void 0, true)]\n          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {\n            className: "pt-space-xs",`);

if (g4Start !== -1 && gateEndPattern !== -1) {
  // Gate 4 ends at gateEndPattern + 38 (the `}, void 0, true)`)
  const cutTo = gateEndPattern + 38;
  bio = bio.substring(0, g4Start) + bio.substring(cutTo);
  console.log('Gate 4 removed cleanly');
} else {
  console.error('g4Start or gateEndPattern not found:', g4Start, gateEndPattern);
}

// 12. Save Preferences Button
bio = bio.replace(
  `type: "button",\n              variant: "primary",\n              children: /*#__PURE__*/_jsxDEV("div", {`,
  `type: "button",\n              variant: "primary",\n              onClick: () => { updatePreferences({ biometricsEnabled, isAppLockActive, lockReflections }); alert('Biometric preferences saved.'); },\n              children: /*#__PURE__*/_jsxDEV("div", {`
);

if (isCRLF) {
  bio = bio.replace(/\n/g, '\r\n');
}
fs.writeFileSync('src/BiometricSettings.jsx', bio, 'utf8');
console.log('src/BiometricSettings.jsx written successfully');

