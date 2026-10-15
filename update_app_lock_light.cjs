const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'AppLockLightMode.jsx');
let content = fs.readFileSync(lightPath, 'utf8');

const containerClasses = "rounded-3xl shadow-md shadow-slate-200/60 border border-slate-200/80 bg-white/95 p-5 mb-4";

// 1. Container replacement
// 1a. Momentum Shield banner
content = content.replace(
  /<section className="relative overflow-hidden rounded-lg bg-surface-container-lowest\/80 backdrop-blur-xl shadow-sm p-space-lg flex flex-col space-y-space-md">/,
  `<section className="relative overflow-hidden flex flex-col space-y-space-md ${containerClasses}">`
);

// 1b. Authentication Methods Cards (Biometric & PIN)
content = content.replace(
  /<div className="rounded-lg bg-surface-container-lowest\/80 backdrop-blur-xl p-space-lg shadow-sm space-y-space-sm">/,
  `<div className="space-y-space-sm ${containerClasses}">`
);
content = content.replace(
  /<div className="rounded-lg bg-surface-container-lowest\/80 backdrop-blur-xl p-space-lg shadow-sm space-y-space-md">/g,
  `<div className="space-y-space-md ${containerClasses}">`
);

// 1c. Lock Timing & Trigger
// Already covered by the global replace for `space-y-space-md` above.

// 1d. Selective Guardrails
content = content.replace(
  /<div className="rounded-lg bg-surface-container-lowest\/80 backdrop-blur-xl p-space-lg shadow-sm space-y-3">/,
  `<div className="space-y-3 ${containerClasses}">`
);

// 1e. Zero-Knowledge Architecture
content = content.replace(
  /<div className="rounded-lg bg-surface-container-high\/60 backdrop-blur-md p-space-md flex items-start space-x-3 shadow-none">/,
  `<div className="flex items-start space-x-3 ${containerClasses}">`
);


// 2. Selective Guardrails Row Fix
// For "Finance & Halal Expenses" and "Reflections & Intimate Notes"
// Original row outer div: `<div className="flex items-center justify-between p-2.5 rounded bg-surface-container-low">`
// Change outer div to: `<div className="flex items-center justify-between py-2 rounded bg-surface-container-low">`
content = content.replace(
  /<div className="flex items-center justify-between p-2\.5 rounded bg-surface-container-low">/g,
  `<div className="flex items-center justify-between py-2">` // Assuming bg-surface-container-low should be removed or kept? The prompt says "Ensure both rows share identical flex alignment: flex items-center justify-between py-2". Let's use exactly that.
);

// We need to specifically replace the badge.
// The badge is:
// <span className="px-2 py-1 rounded-full text-label-sm font-label-sm bg-surface-container-highest text-on-surface-variant font-medium">\s*Always Locked\s*<\/span>
const targetBadge = `<span className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 whitespace-nowrap">Always Locked</span>`;
content = content.replace(
  /<span className="px-2 py-1 rounded-full text-label-sm font-label-sm bg-surface-container-highest text-on-surface-variant font-medium">\s*Always Locked\s*<\/span>/g,
  targetBadge
);

// The prompt also says to make sure the Action Button is rounded-2xl.
// Currently action button: <button className="w-full h-13 py-3.5 px-6 rounded-full...
content = content.replace(
  /<button className="w-full h-13 py-3\.5 px-6 rounded-full /,
  `<button className="w-full h-13 py-3.5 px-6 rounded-2xl `
);

fs.writeFileSync(lightPath, content, 'utf8');
console.log('Light Mode Updated');

