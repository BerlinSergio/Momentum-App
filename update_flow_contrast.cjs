const fs = require('fs');
const path = require('path');

const darkPath = path.join(__dirname, 'src', 'CalendarsMainDarkMode.jsx');
let content = fs.readFileSync(darkPath, 'utf8');

// 1. HARMONIZED FLOW SECTION HEADER & SUBTITLE
content = content.replace(
  /<h3 className="font-headline-sm text-headline-sm text-white">Harmonized Flow<\/h3>/,
  '<h2 className="text-base font-bold text-white tracking-tight">Harmonized Flow</h2>'
);

content = content.replace(
  /<p className="font-body-sm text-body-sm text-white-variant">Saturday [^<]+<\/p>/,
  '<p className="text-xs text-slate-400 mt-0.5">Saturday • 5 intertwined milestones</p>'
);

content = content.replace(
  /<button className="px-3 py-1\.5 rounded-full text-xs font-semibold text-indigo-[^"]+ bg-indigo-[^"]+ border border-indigo-[^"]+ hover:bg-indigo-[^"]+ text-indigo-[^"]+ flex items-center gap-1 transition-[^"]+">/g,
  '<button className="px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-300 bg-indigo-500/20 border border-indigo-500/40 hover:bg-indigo-500/30 flex items-center gap-1 transition-all">'
);

// 2. HARMONIZED FLOW EVENT CARDS (FIX INVISIBLE TEXT)
content = content.replace(
  /className="flex items-start gap-3 bg-slate-900\/60 border border-slate-800\/80 rounded-2xl p-4"/g,
  'className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 mb-3 shadow-md shadow-black/20 flex items-start gap-3.5"'
);

content = content.replace(
  /className="font-label-sm text-label-sm font-bold text-white"/g,
  'className="text-sm font-bold text-white tracking-tight"'
);

content = content.replace(
  /className="font-label-sm text-\[10px\] text-white-variant uppercase"/g,
  'className="text-[10px] font-semibold text-slate-400 uppercase"'
);

// We want to replace `className="font-headline-sm text-headline-sm text-white truncate"`
// with `className="text-sm font-bold text-white flex items-center gap-1.5"`.
// Wait, the original code had:
// `<span className="font-headline-sm text-headline-sm text-white truncate">Fajr & Morning Reflection</span>`
// and right next to it:
// `<span className="material-symbols-outlined text-secondary text-[16px]">bedtime</span>`
// Both were inside `<div className="flex items-center gap-1.5">`!
// If I apply `flex items-center gap-1.5` to the `span`, it will be redundant or mess up layout. Let me just use `text-sm font-bold text-white truncate` or apply the class requested exactly.
content = content.replace(
  /className="font-headline-sm text-headline-sm text-white truncate"/g,
  'className="text-sm font-bold text-white flex items-center gap-1.5"'
);

content = content.replace(
  /className="font-body-sm text-body-sm text-white-variant mt-0\.5"/g,
  'className="text-xs text-slate-300 leading-relaxed mt-1 font-normal"'
);

// Category / Milestone Tag
content = content.replace(
  /className="inline-flex items-center gap-1 mt-1\.5 px-2 py-0\.5 rounded-md bg-[^"]+ text-[^"]+ font-label-sm text-\[10px\]"/g,
  'className="text-[11px] font-medium text-indigo-300/90 mt-2 flex items-center gap-1"'
);

// 3. WEEKLY STRIP LEGEND
const newLegend = `<div className="flex items-center justify-center gap-4 pt-3 text-xs text-slate-400 font-medium">
<span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400"></span>Civil Date</span>
<span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-400"></span>Hijri Qamari</span>
<span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400"></span>Solar Shamsi</span>
</div>`;
content = content.replace(
  /<div className="flex items-center justify-center gap-4 pt-1 font-label-sm text-\[10px\] text-white-variant">[\s\S]*?<\/div>/,
  newLegend
);

// 4. FOOTER QUOTE CARD
content = content.replace(
  /<div className="rounded-2xl bg-indigo-500\/10 border border-indigo-500\/20 p-4 flex items-center gap-3">/,
  '<div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 my-4 shadow-md shadow-black/20 flex items-center gap-3">'
);

content = content.replace(
  /<p className="font-label-sm text-label-sm text-white font-semibold">Tri-Equilibrium Synchronized<\/p>/,
  '<p className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">Tri-Equilibrium Synchronized</p>'
);

content = content.replace(
  /<p className="font-body-sm text-body-sm text-white-variant truncate">([^<]+)<\/p>/,
  '<p className="text-xs text-slate-300 italic mt-1 leading-relaxed">$1</p>'
);

fs.writeFileSync(darkPath, content, 'utf8');
console.log('Harmonized Flow and Legend Updated');

