const fs = require('fs');
const path = require('path');

const darkPath = path.join(__dirname, 'src', 'CalendarsMainDarkMode.jsx');
let content = fs.readFileSync(darkPath, 'utf8');

// 1. FIX TOP HEADER & REMOVE DUPLICATE ICON:
content = content.replace(
  /<div className="w-9 h-9 rounded-DEFAULT bg-primary\/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-\[20px\]">calendar_today<\/span><\/div><h1 className="text-base font-bold text-white flex items-center gap-2">[\s\S]*?<span>Calendars & Time<\/span>\s*<\/h1>/,
  `<div className="flex items-center gap-2">
  <span className="material-symbols-outlined text-[20px] text-indigo-400 flex-shrink-0">calendar_today</span>
  <h1 className="text-base font-bold text-white tracking-tight">Calendars & Time</h1>
</div>`
);

content = content.replace(
  /<p className="font-body-sm text-body-sm text-[^"]+ mt-0\.5">Harmonize civil, spiritual, and solar rhythms seamlessly<\/p>/,
  '<p className="text-slate-400 text-xs mt-1">Harmonize civil, spiritual, and solar rhythms seamlessly</p>'
);

// 2. FIX ACTIVE CONFLUENCE HERO CARD TEXT & BADGE CONTRAST:
// The container might be bg-white/95 or bg-slate-900/85. Let's force it:
content = content.replace(
  /className="bg-white\/95 border border-slate-200\/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200\/60 relative overflow-hidden"/g,
  'className="bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30"'
);
content = content.replace(
  /className="bg-slate-900\/85 border border-slate-800\/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black\/30 relative overflow-hidden"/g,
  'className="bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30"'
);

// Upper category tags: CIVIL, LUNAR, SOLAR
content = content.replace(
  /<span className="text-\[10px\] font-bold text-slate-500 uppercase tracking-wider block">(.*?)<\/span>/g,
  '<span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">$1</span>'
);

// Main date text
content = content.replace(
  /<span className="text-sm font-bold text-slate-900">(.*?)<\/span>/g,
  '<span className="text-sm font-bold text-white">$1</span>'
);

// Badges
content = content.replace(
  /<span className="px-2\.5 py-1 rounded-full text-xs font-semibold bg-blue-500\/15 text-blue-400 border border-blue-500\/30">Primary<\/span>/,
  '<span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-semibold px-2.5 py-1 rounded-full">Primary</span>'
);
content = content.replace(
  /<span className="px-2\.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200\/60">Primary<\/span>/,
  '<span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-semibold px-2.5 py-1 rounded-full">Primary</span>'
);

content = content.replace(
  /<span className="px-2\.5 py-1 rounded-full text-xs font-semibold bg-purple-500\/15 text-purple-400 border border-purple-500\/30 whitespace-nowrap">\s*Gibbous 96%\s*<\/span>/,
  '<span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">Gibbous 96%</span>'
);
content = content.replace(
  /<span className="px-2\.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-200\/60 whitespace-nowrap">\s*Gibbous 96%\s*<\/span>/,
  '<span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">Gibbous 96%</span>'
);

content = content.replace(
  /<span className="px-2\.5 py-1 rounded-full text-xs font-semibold bg-emerald-500\/15 text-emerald-400 border border-emerald-500\/30">Mid-Autumn<\/span>/,
  '<span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold px-2.5 py-1 rounded-full">Mid-Autumn</span>'
);
content = content.replace(
  /<span className="px-2\.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200\/60">Mid-Autumn<\/span>/,
  '<span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold px-2.5 py-1 rounded-full">Mid-Autumn</span>'
);

// Fix the rows that weren't matched in step 1 if any exist
content = content.replace(/border-b border-slate-100/g, 'border-b border-slate-800');
content = content.replace(/bg-blue-50 text-blue-600/g, 'bg-blue-500/20 text-blue-400');
content = content.replace(/bg-purple-50 text-purple-600/g, 'bg-purple-500/20 text-purple-400');
content = content.replace(/bg-emerald-50 text-emerald-600/g, 'bg-emerald-500/20 text-emerald-400');

// 3. FIX DEDICATED SYSTEMS CARDS:
content = content.replace(
  /className="min-w-\[260px\] rounded-2xl p-4 bg-white border border-slate-200\/80 shadow-sm hover:shadow-md snap-start flex flex-col relative overflow-hidden transition-all"/g,
  'className="min-w-[260px] bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700 transition-all shadow-md shadow-black/20 snap-start flex flex-col relative overflow-hidden"'
);

// Card titles and subtitles inside Dedicated Systems (and others)
content = content.replace(/text-slate-900/g, 'text-white');
content = content.replace(/text-slate-500/g, 'text-slate-400');

// 4. CRITICAL FIX: ELIMINATE WHITE BACKGROUND ON WEEKLY STRIP
content = content.replace(
  /className="rounded-3xl bg-white\/95 border border-slate-200\/80 shadow-md shadow-slate-200\/60 p-5 mb-5 space-y-3"/g,
  'className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30 space-y-3"'
);
content = content.replace(
  /className="rounded-3xl bg-slate-900\/85 border border-slate-800\/80 shadow-lg shadow-black\/30 p-5 mb-5 space-y-3"/g,
  'className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30 space-y-3"'
);

// Nav arrows
content = content.replace(
  /w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface/g,
  'w-7 h-7 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center hover:text-white transition-colors'
);
// View toggles
content = content.replace(
  /<div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200\/60 text-slate-400 shadow-sm">/g,
  '<div className="inline-flex p-1 rounded-xl bg-slate-800/90 border border-slate-700 shadow-sm">'
);
content = content.replace(
  /<div className="inline-flex p-1 rounded-xl bg-slate-800 border border-slate-700\/60 text-slate-400 shadow-sm">/g,
  '<div className="inline-flex p-1 rounded-xl bg-slate-800/90 border border-slate-700 shadow-sm">'
);
content = content.replace(
  /<button className="px-3 py-1 rounded-lg bg-slate-700 text-indigo-300 font-semibold text-xs shadow-sm">Week<\/button>/g,
  '<button className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-semibold text-xs shadow-sm">Week</button>'
);
content = content.replace(
  /<button className="px-3 py-1 rounded-lg bg-white text-indigo-400 font-semibold text-xs shadow-sm">Week<\/button>/g,
  '<button className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-semibold text-xs shadow-sm">Week</button>'
);
content = content.replace(
  /<button className="px-3 py-1 rounded-lg text-slate-400 font-medium text-xs hover:text-slate-200 transition-colors">Month<\/button>/g,
  '<button className="px-3 py-1 rounded-lg text-slate-400 font-medium text-xs hover:text-white transition-colors">Month</button>'
);
content = content.replace(
  /<button className="px-3 py-1 rounded-lg text-slate-400 font-medium text-xs hover:text-slate-200 transition-colors">Agenda<\/button>/g,
  '<button className="px-3 py-1 rounded-lg text-slate-400 font-medium text-xs hover:text-white transition-colors">Agenda</button>'
);

// Active Selected Day (SAT 24)
content = content.replace(
  /className="flex flex-col items-center p-2 rounded-2xl bg-primary text-on-primary shadow-md"/g,
  'className="flex flex-col items-center p-2 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-950/60"'
);
content = content.replace(
  /className="flex flex-col items-center p-2 rounded-2xl transition-colors text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"/g,
  'className="flex flex-col items-center p-2 rounded-2xl transition-colors text-slate-400 hover:text-slate-200"'
);
content = content.replace(
  /<span className="font-headline-sm text-[16px] text-white">/g,
  '<span className="font-headline-sm text-[16px] font-semibold text-slate-200">'
);
content = content.replace(
  /<span className="font-headline-sm text-\[16px\] text-on-surface">/g,
  '<span className="font-headline-sm text-[16px] font-semibold text-slate-200">'
);

// 5. HARMONIZED FLOW & FLOATING DOCK:
content = content.replace(
  /className="rounded-3xl bg-white\/95 border border-slate-200\/80 shadow-md shadow-slate-200\/60 p-5 mb-5"/g,
  'className="bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30"'
);
content = content.replace(
  /className="rounded-3xl bg-slate-900\/85 border border-slate-800\/80 shadow-lg shadow-black\/30 p-5 mb-5"/g,
  'className="bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30"'
);

// Harmonized Flow items
content = content.replace(
  /className="flex items-start gap-3 p-3 rounded-2xl bg-surface-container-lowest\/80 backdrop-blur-md shadow-xs"/g,
  'className="flex items-start gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4"'
);
content = content.replace(
  /className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900\/80 backdrop-blur-md shadow-xs"/g,
  'className="flex items-start gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4"'
);

content = content.replace(/text-on-surface/g, 'text-white');
content = content.replace(/text-on-surface-variant/g, 'text-slate-400');

// Bottom Floating Dock
content = content.replace(
  /className="pointer-events-auto mx-auto max-w-md mb-space-md h-16 rounded-lg bg-surface-container-lowest\/85 backdrop-blur-2xl shadow-\[0_16px_40px_rgba\(30,45,90,0\.12\)\] flex items-center justify-around px-space-xs"/g,
  'className="pointer-events-auto mx-auto max-w-md mb-4 h-16 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 p-3 rounded-t-3xl flex items-center justify-around text-slate-400"'
);
content = content.replace(
  /text-primary font-label-md/g,
  'text-indigo-400 font-label-md'
);

// Write changes
fs.writeFileSync(darkPath, content, 'utf8');
console.log('Fixed Dark Mode bugs and contrast');

