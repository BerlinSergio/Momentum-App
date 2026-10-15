const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'AppearanceLightMode.jsx');
let content = fs.readFileSync(lightPath, 'utf8');

const containerClasses = "bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/70 rounded-3xl p-5 mb-5 space-y-4";

// 1. Interactive Canvas Preview
content = content.replace(
  /<div className="relative w-full rounded-lg overflow-hidden bg-gradient-to-b from-primary-fixed\/40 via-surface-container-low to-secondary-fixed\/30 p-space-md shadow-md mb-space-lg backdrop-blur-2xl">/,
  `<div className="relative w-full overflow-hidden bg-gradient-to-b from-primary-fixed/40 via-surface-container-low to-secondary-fixed/30 backdrop-blur-2xl ${containerClasses}">`
);

// 2. Display Theme container
content = content.replace(
  /<div className="mb-space-lg">/,
  `<div className="${containerClasses}">`
);
content = content.replace(
  /<div className="flex items-center justify-between mb-space-sm">/g,
  `<div className="flex items-center justify-between">`
); // Simplify headers spacing within space-y-4 containers

// Theme options rounded-DEFAULT to rounded-2xl
content = content.replace(
  /className="group relative rounded-DEFAULT p-space-md/g,
  'className="group relative rounded-2xl p-4'
);

// 3. Chromatic Aura container
content = content.replace(
  /<div className="rounded-lg p-space-md bg-surface-container-low\/80 backdrop-blur-xl mb-space-lg shadow-sm">/,
  `<div className="${containerClasses}">`
);

// Chromatic Aura Swatches: w-12 h-12 -> w-11 h-11
content = content.replace(/w-12 h-12 rounded-full/g, 'w-11 h-11 rounded-full shadow-sm');

// 4. Glassmorphic Physics container
content = content.replace(
  /<div className="rounded-lg p-space-md bg-surface-container-low\/80 backdrop-blur-xl mb-space-lg shadow-sm">/,
  `<div className="${containerClasses}">`
);

// 5. Atmospheric Canvas container
content = content.replace(
  /<div className="mb-space-xl">/,
  `<div className="${containerClasses}">`
);

// Bottom Action Button
content = content.replace(
  /<button className="w-full h-14 rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary-container text-on-primary font-headline-sm text-headline-sm shadow-lg shadow-primary\/25 hover:shadow-xl hover:shadow-primary\/40 active:scale-\[0.98\] transition-all flex items-center justify-center gap-space-xs" id="apply-btn"\s+type="button">/,
  `<button className="w-full py-4 rounded-2xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]" id="apply-btn" type="button">`
);

// Text inside bottom button: "Apply Appearance Preferences ✔"
content = content.replace(
  /<span>Apply Appearance Preferences<\/span>\s*<span className="material-symbols-outlined text-\[20px\]">check_circle<\/span>/,
  `<span>Apply Appearance Preferences</span>\n<span className="material-symbols-outlined text-[20px]">check_circle</span>`
);

fs.writeFileSync(lightPath, content, 'utf8');
console.log('Light mode updated');

