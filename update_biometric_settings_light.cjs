const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'BiometricSettingsLightMode.jsx');
let content = fs.readFileSync(lightPath, 'utf8');

// 1. Header Title Correction
content = content.replace(/Focus Preferences/g, 'Biometric Settings');

// 2. Hero Dual-Icon Circle
const heroGlowHtml = `<div className="w-16 h-16 rounded-full bg-white/95 border border-indigo-100 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 ring-4 ring-indigo-50/70 mx-auto mb-3">
<span className="material-symbols-outlined text-[20px] text-indigo-600">face</span>
<span className="material-symbols-outlined text-[20px] text-teal-600">fingerprint</span>
</div>`;
content = content.replace(
  /<div className="relative flex items-center justify-center w-20 h-20 mb-space-md rounded-full bg-surface-container-high\/60 shadow-inner">[\s\S]*?<\/div>\s*<\/div>/,
  heroGlowHtml
);

// 3. Zero-Knowledge Architecture row 1
content = content.replace(
  /<div className="p-space-md rounded bg-surface-container-lowest\/90 shadow-sm flex items-start space-x-3">\s*<div className="p-2 rounded-full bg-primary-fixed\/50 text-primary mt-0\.5 flex-shrink-0">\s*<span className="material-symbols-outlined text-\[18px\]">lock_reset<\/span>\s*<\/div>\s*<div className="flex flex-col min-w-0">\s*<span className="font-body-lg text-body-lg text-on-surface font-semibold">Zero-Knowledge Biometrics<\/span>\s*<span className="font-body-md text-body-md text-on-surface-variant mt-0\.5 leading-snug">\s*Momentum never reads, stores, or transmits your biometric data\. Verification is handled strictly inside your hardware Secure Element\.\s*<\/span>\s*<\/div>\s*<\/div>/,
  `<div className="flex items-start gap-3.5 py-2">
<div className="w-9 h-9 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm mt-0.5">
<span className="material-symbols-outlined text-[16px]">lock_reset</span>
</div>
<div className="flex-1">
<h4 className="text-sm font-bold text-slate-800">Zero-Knowledge Biometrics</h4>
<p className="text-xs text-slate-500 leading-relaxed mt-0.5">Momentum never reads, stores, or transmits your biometric data. Verification is handled strictly inside your hardware Secure Element.</p>
</div>
</div>`
);

// 3. Zero-Knowledge Architecture row 2
content = content.replace(
  /<div className="p-space-md rounded bg-surface-container-lowest\/90 shadow-sm flex items-start space-x-3">\s*<div className="p-2 rounded-full bg-secondary-fixed\/60 text-secondary mt-0\.5 flex-shrink-0">\s*<span className="material-symbols-outlined text-\[18px\]">spa<\/span>\s*<\/div>\s*<div className="flex flex-col min-w-0">\s*<span className="font-body-lg text-body-lg text-on-surface font-semibold">Seamless Harmony<\/span>\s*<span className="font-body-md text-body-md text-on-surface-variant mt-0\.5 leading-snug">\s*Bypass manual entry while keeping your spiritual reflections and private finances impenetrable\.\s*<\/span>\s*<\/div>\s*<\/div>/,
  `<div className="flex items-start gap-3.5 py-2">
<div className="w-9 h-9 rounded-xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm mt-0.5">
<span className="material-symbols-outlined text-[16px]">spa</span>
</div>
<div className="flex-1">
<h4 className="text-sm font-bold text-slate-800">Seamless Harmony</h4>
<p className="text-xs text-slate-500 leading-relaxed mt-0.5">Bypass manual entry while keeping your spiritual reflections and private finances impenetrable.</p>
</div>
</div>`
);

// 4. Container Cards
const newContainerClass = 'bg-white/95 border border-slate-200/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200/60 space-y-4';

content = content.replace(
  /className="relative overflow-hidden rounded-lg bg-surface-container-lowest\/80 backdrop-blur-2xl p-space-lg shadow-sm"/,
  `className="relative overflow-hidden ${newContainerClass}"`
);
content = content.replace(
  /className="rounded-lg bg-surface-container-lowest\/85 backdrop-blur-2xl p-space-lg shadow-sm"/,
  `className="${newContainerClass}"`
);
content = content.replace(
  /className="rounded-lg bg-surface-container-low\/70 backdrop-blur-xl p-space-lg shadow-sm space-y-space-md"/,
  `className="${newContainerClass}"`
);
// Replace remaining two cards (Fallback and Selective Gates)
content = content.replace(
  /className="rounded-lg bg-surface-container-lowest\/80 backdrop-blur-xl p-space-lg shadow-sm space-y-space-md"/g,
  `className="${newContainerClass}"`
);

// 5. Truncated labels fix in Selective Gates
// We just remove the truncate class from titles and subtitles in that section.
content = content.replace(/className="font-body-lg text-body-lg text-on-surface font-medium truncate"/g, 'className="font-body-lg text-body-lg text-on-surface font-medium"');
content = content.replace(/className="font-body-sm text-body-sm text-on-surface-variant truncate"/g, 'className="font-body-sm text-body-sm text-on-surface-variant"');

fs.writeFileSync(lightPath, content, 'utf8');
console.log('Light Mode Updated');

