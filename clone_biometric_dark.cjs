const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'BiometricSettingsLightMode.jsx');
const darkPath = path.join(__dirname, 'src', 'BiometricSettingsDarkMode.jsx');

let content = fs.readFileSync(lightPath, 'utf8');

// Change component name
content = content.replace(
  /export default function BiometricSettingsLightMode/g,
  'export default function BiometricSettingsDarkMode'
);

// Container Cards
const newDarkContainerClass = 'bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30 space-y-4';
content = content.replace(
  /bg-white\/95 border border-slate-200\/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200\/60 space-y-4/g,
  newDarkContainerClass
);

// Hero Dual-Icon Glowing Circle
const darkHeroGlowHtml = `<div className="w-16 h-16 rounded-full bg-slate-800/95 border border-indigo-500/30 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-950/50 mx-auto mb-3">
<span className="material-symbols-outlined text-[20px] text-indigo-600">face</span>
<span className="material-symbols-outlined text-[20px] text-teal-600">fingerprint</span>
</div>`;
content = content.replace(
  /<div className="w-16 h-16 rounded-full bg-white\/95 border border-indigo-100 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500\/25 ring-4 ring-indigo-50\/70 mx-auto mb-3">\s*<span className="material-symbols-outlined text-\[20px\] text-indigo-600">face<\/span>\s*<span className="material-symbols-outlined text-\[20px\] text-teal-600">fingerprint<\/span>\s*<\/div>/,
  darkHeroGlowHtml
);

// Zero-Knowledge Icon Tiles
content = content.replace(
  /bg-indigo-50\/80 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 shadow-sm/g,
  'bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-400 shadow-sm'
);

// Text Contrast (Zero-Knowledge)
content = content.replace(/text-sm font-bold text-slate-800/g, 'text-sm font-bold text-white');
content = content.replace(/text-xs text-slate-500 leading-relaxed/g, 'text-xs text-slate-400 leading-relaxed');

// Bottom Action Button
content = content.replace(
  /w-full h-14 rounded-lg bg-gradient-to-r from-primary via-secondary to-tertiary/g,
  'w-full h-14 rounded-2xl bg-gradient-to-r from-primary via-secondary to-tertiary'
);

// Some generic dark mode layout fixes to ensure it isn't completely light mode
// The headers, toggles, text colors - since we cloned from Light Mode,
// we should map the global layout background from light to dark
content = content.replace(/bg-surface-container-lowest\/70/g, 'bg-slate-900/70');
content = content.replace(/text-on-surface/g, 'text-white');
content = content.replace(/text-on-surface-variant/g, 'text-slate-300');
content = content.replace(/bg-surface"/g, 'bg-slate-950"');

fs.writeFileSync(darkPath, content, 'utf8');
console.log('Dark Mode Clone Updated');

// Optional: Fix the Light Mode button to also use rounded-2xl so they match perfectly
let lightContent = fs.readFileSync(lightPath, 'utf8');
lightContent = lightContent.replace(
  /w-full h-14 rounded-lg bg-gradient-to-r from-primary via-secondary to-tertiary/g,
  'w-full h-14 rounded-2xl bg-gradient-to-r from-primary via-secondary to-tertiary'
);
fs.writeFileSync(lightPath, lightContent, 'utf8');


