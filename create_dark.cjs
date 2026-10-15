const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'AppearanceLightMode.jsx');
const darkPath = path.join(__dirname, 'src', 'AppearanceDarkMode.jsx');

let content = fs.readFileSync(lightPath, 'utf8');

// Update Component Name
content = content.replace(/AppearanceLightMode/g, 'AppearanceDarkMode');

// 1. Container cards
const lightContainer = 'bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/70 rounded-3xl p-5 mb-5 space-y-4';
const darkContainer = 'bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 space-y-4 shadow-lg shadow-black/30';
content = content.replace(new RegExp(lightContainer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), darkContainer);

// Update general backgrounds
content = content.replace(/bg-surface\/80/g, 'bg-slate-900/80');
content = content.replace(/bg-surface(?!\-)/g, 'bg-slate-900');

// 3. Theme cards MUST BE DONE BEFORE general surface-container replacements
// Active theme card:
content = content.replace(/bg-surface-container-lowest shadow-md/g, 'bg-slate-800/80 border border-indigo-500/50 shadow-md shadow-indigo-950/40');
// Inactive theme cards:
content = content.replace(/bg-surface-container-low\/60 hover:bg-surface-container-low active:scale-\[0.99\]/g, 'bg-slate-900/40 border border-slate-800/60');

// 2. Secondary input/preview surfaces (remaining ones)
content = content.replace(/bg-surface-container-lowest\/80/g, 'bg-slate-800/50 border border-slate-700/50');
content = content.replace(/bg-surface-container-low\/70/g, 'bg-slate-800/50 border border-slate-700/50');
content = content.replace(/bg-surface-container-lowest\/90/g, 'bg-slate-800/50 border border-slate-700/50');
content = content.replace(/bg-surface-container-low(?![\/\-])/g, 'bg-slate-800/50 border border-slate-700/50');

// Replace rounded-DEFAULT with rounded-2xl
content = content.replace(/rounded-DEFAULT/g, 'rounded-2xl');

// Typography replacements
// Headings & Labels: `text-white font-semibold text-base`
content = content.replace(/text-headline-md font-headline-md text-on-surface/g, 'text-white font-semibold text-base');
content = content.replace(/font-headline-sm text-headline-sm text-on-surface/g, 'text-white font-semibold text-base');
content = content.replace(/font-label-md text-label-md text-on-surface/g, 'text-white font-semibold text-base');
content = content.replace(/font-body-lg text-body-lg text-on-surface font-semibold/g, 'text-white font-semibold text-base');

// Descriptions & Body: `text-slate-400 text-xs leading-relaxed`
content = content.replace(/font-body-sm text-body-sm text-on-surface-variant/g, 'text-slate-400 text-xs leading-relaxed');

// Tags & Badges
// "Atmosphere" (id="Atmosphere" label basically, it's just the span next to "Display Theme")
// `<span className="font-label-sm text-label-sm text-on-surface-variant">Atmosphere</span>`
content = content.replace(/<span className="font-label-sm text-label-sm text-on-surface-variant">Atmosphere<\/span>/g, '<span className="text-indigo-400 text-xs font-medium">Atmosphere</span>');

// "Selected" badge
// `<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary/10 text-primary">Selected</span>`
content = content.replace(/<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary\/10 text-primary">Selected<\/span>/g, '<span className="px-2 py-0.5 rounded-full bg-primary/10 text-indigo-400 text-xs font-medium">Selected</span>');

// "Luminous Indigo" and "Default Ambient"
content = content.replace(/<span className="font-label-md text-label-md text-primary" id="current-accent-label">Luminous Indigo<\/span>/g, '<span className="text-indigo-400 text-xs font-medium" id="current-accent-label">Luminous Indigo</span>');
content = content.replace(/<span className="font-label-sm text-label-sm text-on-surface-variant">Default Ambient<\/span>/g, '<span className="text-indigo-400 text-xs font-medium">Default Ambient</span>');


// 4. Bottom action button
// It currently is: `w-full py-4 rounded-2xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]`
// Target: `w-full py-4 rounded-2xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-950/50 flex items-center justify-center gap-2`
content = content.replace(
  /hover:bg-indigo-700 shadow-lg shadow-indigo-600\/30/g,
  'hover:bg-indigo-500 shadow-lg shadow-indigo-950/50'
);

// We need to fix remaining text-on-surface text colors inside headers/buttons.
// There is `<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Visual Language</span>`
content = content.replace(/font-label-md text-label-md text-on-surface-variant uppercase tracking-wider/g, 'text-slate-400 text-xs font-medium uppercase tracking-wider');

// Replace any remaining text-on-surface with text-white and text-on-surface-variant with text-slate-400
content = content.replace(/text-on-surface-variant/g, 'text-slate-400');
content = content.replace(/text-on-surface(?!\-)/g, 'text-white');

fs.writeFileSync(darkPath, content, 'utf8');
console.log('Dark mode created');

