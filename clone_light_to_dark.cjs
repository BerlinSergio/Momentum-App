const fs = require('fs');

const lightPath = 'c:\\momentum\\src\\AfghanSolarHijriShamsiCalendarLightMode.jsx';
const darkPath = 'c:\\momentum\\src\\AfghanSolarHijriShamsiCalendarDarkMode.jsx';

let content = fs.readFileSync(lightPath, 'utf8');

// Function Name
content = content.replace(/AfghanSolarHijriShamsiCalendarLightMode/g, 'AfghanSolarHijriShamsiCalendarDarkMode');

// Surfaces & Containers
content = content.replace(/bg-white\/95/g, 'bg-slate-900/85');
content = content.replace(/bg-white/g, 'bg-slate-900/85');
content = content.replace(/bg-surface-container-lowest\/90/g, 'bg-slate-900/85');

content = content.replace(/bg-slate-50/g, 'bg-slate-800/40');
content = content.replace(/bg-slate-100\/70/g, 'bg-slate-800/40');
// Notice: wait for badges before replacing generic bg-slate-100
content = content.replace(/bg-surface-container-low\/70/g, 'bg-slate-800/40');
content = content.replace(/bg-surface-container-low\/50/g, 'bg-slate-800/40');
content = content.replace(/hover:bg-surface-container-low/g, 'hover:bg-slate-800/60');

content = content.replace(/bg-slate-200/g, 'bg-slate-700/60');

// Borders
content = content.replace(/border-slate-200\/80/g, 'border-slate-800/80');
content = content.replace(/border-slate-200/g, 'border-slate-800/80');
content = content.replace(/border-slate-200\/60/g, 'border-slate-700/40');
content = content.replace(/border-slate-100/g, 'border-slate-700/40');

// Shadows
content = content.replace(/shadow-md shadow-slate-200\/60/g, 'shadow-lg shadow-black/30');
content = content.replace(/shadow-sm/g, 'shadow-lg shadow-black/30');

// Typography
content = content.replace(/text-slate-900/g, 'text-white');
content = content.replace(/text-slate-800/g, 'text-slate-100');
content = content.replace(/text-slate-600/g, 'text-slate-400');
content = content.replace(/text-slate-500/g, 'text-slate-400');
content = content.replace(/text-slate-400/g, 'text-slate-500');

content = content.replace(/text-on-surface-variant/g, 'text-slate-400');
content = content.replace(/text-on-surface/g, 'text-slate-100');


// Accents & Badges (Highlights)
const highlightBadgeRegex = /bg-(?:blue|indigo|slate)-100 text-(?:blue|indigo|slate)-600/g;
content = content.replace(highlightBadgeRegex, 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-400');

// Generic bg-slate-100 replacement after badges
content = content.replace(/bg-slate-100/g, 'bg-slate-800/40');

// "TODAY" Cell
// Light mode today cell:
// h-14 rounded-lg bg-gradient-to-br from-primary via-primary-container to-secondary-container text-on-primary flex flex-col items-center justify-center relative p-0.5 shadow-lg shadow-primary/30 transform scale-[1.03] z-10
const todayRegex = /h-14 rounded-lg bg-gradient-to-br from-primary via-primary-container to-secondary-container text-on-primary flex flex-col items-center justify-center relative p-0\.5 shadow-lg shadow-primary\/30 transform scale-\[1\.03\] z-10/g;
content = content.replace(todayRegex, 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl p-1.5 shadow-md shadow-indigo-500/40 font-bold flex flex-col items-center justify-center relative z-10');

// Primary Action Button
// Light mode button:
// w-full py-4 rounded-2xl bg-indigo-600 text-white font-semibold text-base shadow-md shadow-indigo-200 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors
const btnRegex = /w-full py-4 rounded-2xl bg-indigo-600 text-white font-semibold text-base shadow-md shadow-indigo-200 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors/g;
content = content.replace(btnRegex, 'w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-950/50 transition-all');

// Fix global backgrounds for the page (header/main)
content = content.replace(/bg-surface\/80/g, 'bg-slate-900/80');
content = content.replace(/bg-surface/g, 'bg-slate-900');
content = content.replace(/bg-surface-container-high/g, 'bg-slate-800');
content = content.replace(/hover:bg-surface-container-highest/g, 'hover:bg-slate-700');

// Fix remaining specific texts
content = content.replace(/text-on-primary-fixed/g, 'text-indigo-400');
content = content.replace(/text-on-secondary-fixed/g, 'text-indigo-400');

fs.writeFileSync(darkPath, content, 'utf8');
console.log('Re-clone and token mapping complete.');

