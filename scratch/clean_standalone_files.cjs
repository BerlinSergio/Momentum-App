const fs = require('fs');

// Helper to normalize CRLF
function normalize(str) {
  return str.replace(/\r\n/g, '\n');
}

// ---------------------------------------------------------------------
// 1. AppLock.jsx
// ---------------------------------------------------------------------
let appLock = fs.readFileSync('src/AppLock.jsx', 'utf8');
const appLockCRLF = appLock.includes('\r\n');
appLock = normalize(appLock);

// Remove quickDhikrToggle state
appLock = appLock.replace(`  const [quickDhikrToggle, setQuickDhikrToggle] = useState(true);\n`, '');

// Remove Selective Guardrails & Zero-Knowledge Architecture
const guardrailsMarker = `/*#__PURE__*/_jsxDEV("section", {\n          className: "space-y-space-sm",\n          children: [/*#__PURE__*/_jsxDEV("div", {\n            children: [/*#__PURE__*/_jsxDEV("h3", {\n              className: "font-headline-sm text-headline-sm text-on-surface ",\n              children: "Selective Guardrails"`;
const saveSectionMarker = `/*#__PURE__*/_jsxDEV("div", {\n          className: "pt-space-xs space-y-space-sm text-center",`;

const glStart = appLock.indexOf(guardrailsMarker);
const saveStart = appLock.indexOf(saveSectionMarker);

if (glStart !== -1 && saveStart !== -1) {
  appLock = appLock.substring(0, glStart) + appLock.substring(saveStart);
  console.log('AppLock.jsx guardrails & zero knowledge removed successfully');
} else {
  console.error('Could not find markers in AppLock.jsx');
}

if (appLockCRLF) {
  appLock = appLock.replace(/\n/g, '\r\n');
}
fs.writeFileSync('src/AppLock.jsx', appLock, 'utf8');

// ---------------------------------------------------------------------
// 2. BiometricSettings.jsx
// ---------------------------------------------------------------------
let bio = fs.readFileSync('src/BiometricSettings.jsx', 'utf8');
const bioCRLF = bio.includes('\r\n');
bio = normalize(bio);

// Clean up unused state vars in useSecurityStore
bio = bio.replace(
  `  const {\n    isAppLockActive,\n    lockFinance,\n    lockReflections,\n    allowQuickDhikr,\n    biometricsEnabled,\n    pin,\n    setAppLockActive,\n    setLockFinance,\n    setLockReflections,\n    setAllowQuickDhikr,\n    setBiometricsEnabled,\n    updatePreferences,\n  } = useSecurityStore();`,
  `  const {\n    isAppLockActive,\n    lockReflections,\n    biometricsEnabled,\n    pin,\n    setAppLockActive,\n    setLockReflections,\n    setBiometricsEnabled,\n    updatePreferences,\n  } = useSecurityStore();`
);

// Remove Zero-Knowledge Architecture card
const bioEduMarker = `/*#__PURE__*/_jsxDEV("div", {\n            className: "flex flex-col space-y-space-sm",\n            children: [/*#__PURE__*/_jsxDEV("div", {\n              className: "flex items-center gap-space-xs px-space-xs",\n              children: [/*#__PURE__*/_jsxDEV("span", {\n                className: "material-symbols-outlined text-primary text-[20px]",\n                children: "shield_lock"`;
const fallbackMarker = `/*#__PURE__*/_jsxDEV("div", {\n            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-lg space-y-space-md",\n            children: [/*#__PURE__*/_jsxDEV("div", {\n              className: "flex items-center justify-between",\n              children: [/*#__PURE__*/_jsxDEV("div", {\n                className: "flex items-center gap-space-xs",\n                children: [/*#__PURE__*/_jsxDEV("span", {\n                  className: "material-symbols-outlined text-tertiary text-[22px]",\n                  children: "pin"`;

const bioEduStart = bio.indexOf(bioEduMarker);
const fallbackStart = bio.indexOf(fallbackMarker);

if (bioEduStart !== -1 && fallbackStart !== -1) {
  bio = bio.substring(0, bioEduStart) + bio.substring(fallbackStart);
  console.log('BiometricSettings.jsx Zero-Knowledge card removed successfully');
} else {
  console.error('Could not find Zero-Knowledge card markers in BiometricSettings.jsx');
}

// Update Checkpoint count
bio = bio.replace('4 Checkpoints', '2 Checkpoints');

// Remove Gate 2 (Finance)
const gate2Marker = `/*#__PURE__*/_jsxDEV("div", {\n                className: "p-space-md flex items-center justify-between gap-space-sm",\n                children: [/*#__PURE__*/_jsxDEV("div", {\n                  className: "flex items-center gap-space-md min-w-0",\n                  children: [/*#__PURE__*/_jsxDEV("div", {\n                    className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0 text-secondary",\n                    children: /*#__PURE__*/_jsxDEV("span", {\n                      className: "material-symbols-outlined text-[20px]",\n                      children: "account_balance_wallet"`;
const gate3Marker = `/*#__PURE__*/_jsxDEV("div", {\n                className: "p-space-md flex items-center justify-between gap-space-sm",\n                children: [/*#__PURE__*/_jsxDEV("div", {\n                  className: "flex items-center gap-space-md min-w-0",\n                  children: [/*#__PURE__*/_jsxDEV("div", {\n                    className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0 text-tertiary",\n                    children: /*#__PURE__*/_jsxDEV("span", {\n                      className: "material-symbols-outlined text-[20px]",\n                      children: "auto_stories"`;

const gate2Start = bio.indexOf(gate2Marker);
const gate3Start = bio.indexOf(gate3Marker);
if (gate2Start !== -1 && gate3Start !== -1) {
  bio = bio.substring(0, gate2Start) + bio.substring(gate3Start);
  console.log('Gate 2 removed successfully');
} else {
  console.error('Could not find Gate 2 in BiometricSettings.jsx');
}

// Remove Gate 4 (Dhikr)
const gate4Marker = `/*#__PURE__*/_jsxDEV("div", {\n                className: "p-space-md flex items-center justify-between gap-space-sm",\n                children: [/*#__PURE__*/_jsxDEV("div", {\n                  className: "flex items-center gap-space-md min-w-0",\n                  children: [/*#__PURE__*/_jsxDEV("div", {\n                    className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0 text-on-surface dark:text-on-surface-variant",\n                    children: /*#__PURE__*/_jsxDEV("span", {\n                      className: "material-symbols-outlined text-[20px]",\n                      children: "toll"`;
const endOfGatesMarker = `/*#__PURE__*/_jsxDEV("div", {\n            className: "pt-space-xs",\n            children: /*#__PURE__*/_jsxDEV(LiquidButton, {\n              className: "w-full relative group overflow-hidden`;

const gate4Start = bio.indexOf(gate4Marker);
const endGatesStart = bio.indexOf(endOfGatesMarker);
if (gate4Start !== -1 && endGatesStart !== -1) {
  bio = bio.substring(0, gate4Start) + bio.substring(endGatesStart);
  console.log('Gate 4 removed successfully');
} else {
  console.error('Could not find Gate 4 in BiometricSettings.jsx');
}

// Update save preferences call
bio = bio.replace(
  `updatePreferences({ biometricsEnabled, isAppLockActive, lockFinance, lockReflections, allowQuickDhikr })`,
  `updatePreferences({ biometricsEnabled, isAppLockActive, lockReflections })`
);

if (bioCRLF) {
  bio = bio.replace(/\n/g, '\r\n');
}
fs.writeFileSync('src/BiometricSettings.jsx', bio, 'utf8');
console.log('Cleaned src/BiometricSettings.jsx');

