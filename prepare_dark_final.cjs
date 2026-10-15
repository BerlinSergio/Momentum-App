const fs = require('fs');
const darkPath = 'c:\\momentum\\src\\AfghanSolarHijriShamsiCalendarDarkMode.jsx';
let content = fs.readFileSync(darkPath, 'utf8');

// 1. REBUILD CALENDAR GRID WITH TILES (MATCHING LIGHT MODE)
// Active cells
const activeRegex = /<div className="min-h-\[58px\] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-[^\"]* cursor-pointer">/g;
content = content.replace(activeRegex, '<div className="min-h-[58px] p-1.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex flex-col items-center justify-between transition-all cursor-pointer">');

// Inactive cells (already opacity-25 bg-transparent border-transparent, but let's be sure)
const inactiveRegex = /<div className="min-h-\[58px\] p-1(?:.5)? flex flex-col items-center justify-between rounded-xl transition-all opacity-[^\"]* bg-[^\"]* border-[^\"]*">/g;
content = content.replace(inactiveRegex, '<div className="min-h-[58px] p-1.5 flex flex-col items-center justify-between rounded-xl transition-all opacity-25 bg-transparent border-transparent">');
// Wait, the current inactive cells might have different classes. Let's do a broader regex.
content = content.replace(
  /<div className="min-h-\[58px\] p-1(?:\.5)? flex flex-col items-center justify-between rounded-xl transition-all opacity-[^"]*">/g,
  '<div className="min-h-[58px] p-1.5 flex flex-col items-center justify-between rounded-xl transition-all opacity-25 bg-transparent border-transparent">'
);

// TODAY cell
const todayRegex = /<div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-[^"]* shadow-md shadow-indigo-500\/40 font-bold flex flex-col items-center justify-center[^"]*">/g;
content = content.replace(todayRegex, '<div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-md font-bold flex flex-col items-center justify-center min-h-[58px] z-10 cursor-pointer">');

// 2. DAYLIGHT LENGTH & SOLAR MILESTONE
content = content.replace(
  /<div className="grid grid-cols-2 gap-2">\s*<div className="p-space-md rounded-xl bg-slate-800\/40 flex items-center gap-space-sm">([\s\S]*?)<\/div>\s*<div className="p-space-md rounded-xl bg-slate-800\/40 flex items-center gap-space-sm">([\s\S]*?)<\/div>\s*<\/div>/,
  `<div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/60">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[20px] text-amber-400" style={{fontVariationSettings: "'FILL' 1"}}>wb_sunny</span>
<div className="flex flex-col">
<span className="text-[10px] text-slate-400">Daylight Length</span>
<span className="text-sm font-semibold text-slate-100">10h 52m (Kabul)</span>
</div>
</div>
<div className="flex items-center gap-2 text-right">
<div className="flex flex-col">
<span className="text-[10px] text-slate-400">Solar Milestone</span>
<span className="text-sm font-semibold text-slate-100">Mid-Autumn Harvest</span>
</div>
<span className="material-symbols-outlined text-[20px] text-emerald-400">agriculture</span>
</div>
</div>`
);

// 3. AFGHAN SOLAR HIGHLIGHTS CONTAINER
// The highlights section is currently:
// <div className="space-y-2 pt-1">
// <div className="flex items-center justify-between">
// <span className="text-base font-bold tracking-tight text-white">Afghan Solar Highlights</span>...
content = content.replace(
  /<div className="space-y-2 pt-1">/,
  '<div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg flex flex-col space-y-4">'
);
// Remove individual border boxes around events
content = content.replace(
  /<div className="p-space-md rounded-xl bg-slate-800\/40 hover:bg-slate-800\/60 flex items-start gap-space-md transition-colors">/g,
  '<div className="flex items-start gap-3 transition-colors">'
);
// Left date capsule
content = content.replace(
  /<div className="rounded-2xl w-12 h-12 bg-indigo-500\/15 border border-indigo-500\/30 text-indigo-400 flex flex-col items-center justify-center shrink-0">/g,
  '<div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold flex flex-col items-center justify-center shrink-0">'
);
// (Card 3 had a different bg)
content = content.replace(
  /<div className="rounded-2xl w-12 h-12 bg-slate-800\/40 text-slate-500 flex flex-col items-center justify-center shrink-0">/g,
  '<div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold flex flex-col items-center justify-center shrink-0">'
);
content = content.replace(/text-slate-500 flex flex-col items-center justify-center shrink-0">([\s\S]*?)<span className="font-headline-sm text-\[13px\] font-bold text-slate-100 leading-none">/g, 'text-indigo-400 font-bold flex flex-col items-center justify-center shrink-0">$1<span className="font-headline-sm text-[13px] font-bold text-indigo-400 leading-none">');

// Remove line clamps and truncates
content = content.replace(/truncate/g, '');
content = content.replace(/line-clamp-1/g, '');

// 4. DAILY SCHEDULE CONTAINER
content = content.replace(
  /<div className="space-y-2 pt-2">/,
  '<div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg flex flex-col space-y-3">'
);
// Remove heavy pill containers
content = content.replace(
  /<div className="p-space-md rounded-xl bg-slate-800\/40 flex items-center justify-between">/g,
  '<div className="flex items-center justify-between py-1">'
);


// 5. ACTION BUTTON SYNCHRONIZATION
// <button className="w-full py-4 px-6 rounded-2xl font-semibold text-white flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-950/50 transition-all">
content = content.replace(
  /<button className="w-full py-4[^"]*?">([\s\S]*?)<\/button>/,
  `<button className="w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-950/50 transition-all">
<span className="material-symbols-outlined text-[20px] w-5 h-5 flex-shrink-0 flex items-center justify-center text-white">add_circle</span>
<span className="text-center leading-snug">Add Solar Event / National Reminder</span>
</button>`
);

// Fix trailing `</div></div></div></main>` mismatch if any
// The highlights section replaced `<div className="space-y-2 pt-1">`
// The schedule section replaced `<div className="space-y-2 pt-2">`
// Wait, the Selected Date Details card was originally wrapping ALL of them!
// Because in Light Mode (which we cloned), Selected Date Details wrapped the Header, Pill Grid, Highlights, Schedule, and Button!
// Ah! In Light Mode, it's one huge card:
// <div className="w-full rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl p-space-lg shadow-sm space-y-4">
// If we change Highlights and Schedule into their own unified cards, we need to close the Selected Date Details card before them!

// Let's modify the file manually because regex might break the nesting.

fs.writeFileSync('c:\\momentum\\update_dark_final.cjs', content, 'utf8');
console.log('Regex prepared.');

