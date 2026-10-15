const fs = require('fs');

let content = fs.readFileSync('src/DailyRoutineLightMode.jsx', 'utf8');

// Component Name
content = content.replace(/DailyRoutineLightMode/g, 'DailyRoutineDarkMode');

// --- Global Header & Text ---
// Header title Momentum
content = content.replace(/text-lg font-bold text-slate-900 tracking-tight/g, 'text-lg font-bold text-white tracking-tight');
// Header bg
content = content.replace(/bg-surface-container-lowest\/70 backdrop-blur-2xl shadow-\[0_4px_24px_-4px_rgba\(80,110,180,0\.08\)\]/g, 'bg-slate-900/85 backdrop-blur-2xl border-b border-slate-800/80 shadow-lg shadow-black/20');
// Header bell/profile hover
content = content.replace(/hover:bg-slate-100/g, 'hover:bg-slate-800/80');

// Page Title
content = content.replace(/text-xl font-extrabold text-slate-900/g, 'text-xl font-extrabold text-white');
content = content.replace(/bg-indigo-50 border border-indigo-200\/70 text-indigo-700/g, 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40');
content = content.replace(/text-xs font-medium text-slate-500 mt-1/g, 'text-xs font-medium text-slate-400 mt-1');
content = content.replace(/bg-slate-200 border-2 border-white/g, 'bg-slate-800 border-2 border-slate-700');

// --- Hero Progress Card ---
content = content.replace(/bg-white\/95 border border-slate-200\/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200\/60/g, 'bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30');
// Streak Badge
content = content.replace(/bg-amber-50 border border-amber-200\/80 text-amber-700/g, 'bg-amber-500/15 border border-amber-500/30 text-amber-300');
// Count Title
content = content.replace(/text-2xl font-black text-slate-900/g, 'text-2xl font-black text-white');
// Subtext
content = content.replace(/text-xs text-slate-500 font-medium/g, 'text-xs text-slate-400 font-medium');
// Upcoming text
content = content.replace(/text-emerald-600/g, 'text-emerald-400');
// Progress Ring Track
content = content.replace(/className="text-slate-100" strokeWidth="3\.5"/g, 'className="text-slate-800" strokeWidth="3.5"');
// Progress Ring Fill
content = content.replace(/className="text-indigo-600" strokeDasharray="67, 100"/g, 'className="text-indigo-500" strokeDasharray="67, 100"');
// Progress Ring Text
content = content.replace(/text-sm font-black text-slate-900/g, 'text-sm font-black text-white');
// Add Routine Button
content = content.replace(/bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600\/25/g, 'bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-2xl shadow-lg shadow-indigo-950/50');

// --- Filter Chips ---
content = content.replace(/bg-white border border-slate-200\/80 text-slate-600 hover:bg-slate-50/g, 'bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:bg-slate-800');

// --- Routine Cards ---
content = content.replace(/bg-white border border-slate-200\/80 rounded-2xl p-4 mb-3 shadow-sm hover:shadow-md/g, 'bg-slate-900/75 border border-slate-800/80 rounded-2xl p-4 mb-3 hover:border-slate-700 shadow-md shadow-black/20');
// Check icon container (active state)
content = content.replace(/bg-indigo-100 flex items-center justify-center text-indigo-600/g, 'bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400');
// Check icon container (inactive state)
content = content.replace(/bg-slate-100 flex items-center justify-center flex-shrink-0/g, 'bg-slate-800/60 border border-slate-700 flex items-center justify-center flex-shrink-0');
// Titles
content = content.replace(/text-sm font-bold text-slate-900/g, 'text-sm font-bold text-white');
// Time tags
content = content.replace(/text-xs font-semibold text-indigo-600 flex-shrink-0/g, 'text-xs font-semibold text-indigo-400 flex-shrink-0');
// Badges (Every Day, Mon-Fri)
content = content.replace(/bg-slate-100 text-slate-600 text-\[11px\] font-medium whitespace-nowrap/g, 'bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-medium whitespace-nowrap');
// Helper text
content = content.replace(/text-slate-500 text-xs/g, 'text-slate-300 text-xs');
// Action buttons hover
content = content.replace(/hover:text-indigo-600 hover:bg-indigo-50/g, 'hover:text-slate-200 hover:bg-slate-800/80');
content = content.replace(/hover:text-rose-600 hover:bg-rose-50/g, 'hover:text-slate-200 hover:bg-slate-800/80');

// --- Reflection Banner ---
content = content.replace(/bg-indigo-50\/70 border border-indigo-150 shadow-sm flex items-start/g, 'bg-slate-900/90 border border-slate-800 rounded-3xl p-4 my-5 shadow-md shadow-black/20 text-slate-200 flex items-start');
content = content.replace(/bg-white border border-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm/g, 'bg-slate-800 border border-slate-700 text-indigo-400 flex items-center justify-center flex-shrink-0');
content = content.replace(/text-xs font-semibold text-slate-800 italic leading-relaxed/g, 'text-xs font-semibold text-slate-200 italic leading-relaxed');
content = content.replace(/text-\[10px\] font-bold text-indigo-600 uppercase tracking-wider/g, 'text-[10px] font-bold text-indigo-400 uppercase tracking-wider');
content = content.replace(/text-indigo-600/g, 'text-indigo-400'); // the sparkles icon color in reflection banner if not already caught

// --- Bottom Navigation Dock ---
content = content.replace(/bg-white\/95 backdrop-blur-xl border-t border-slate-200\/80/g, 'bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 text-slate-400');
content = content.replace(/border-4 border-white/g, 'border-4 border-slate-900');

fs.writeFileSync('src/DailyRoutineDarkMode.jsx', content, 'utf8');
console.log('Dark Mode Cloned');
