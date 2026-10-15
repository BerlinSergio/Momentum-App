const fs = require('fs');
const path = 'c:\\momentum\\src\\AfghanSolarHijriShamsiCalendarDarkMode.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. CALENDAR GRID TILES
const activeCellRegex = /min-h-\[56px\] flex flex-col items-center justify-between p-1 rounded-xl hover:bg-slate-800\/50 transition-all cursor-pointer/g;
content = content.replace(activeCellRegex, 'min-h-[58px] p-1 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/30 flex flex-col items-center justify-between transition-all cursor-pointer');

const inactiveCellRegex = /min-h-\[56px\] flex flex-col items-center justify-between p-1 rounded-xl transition-all opacity-40 bg-slate-800\/30/g;
content = content.replace(inactiveCellRegex, 'min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-30 border-transparent bg-transparent');

const todayCellRegex = /<div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full p-1\.5 shadow-md shadow-indigo-500\/40 font-bold flex flex-col items-center justify-center min-h-\[56px\] z-10 cursor-pointer">/g;
content = content.replace(todayCellRegex, '<div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl p-1.5 shadow-md shadow-indigo-500/40 font-bold flex flex-col items-center justify-center min-h-[58px] z-10 cursor-pointer">');


// 2. TOP SEASON SEGMENTED PILL
const pillRowRegex = /<div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs text-nowrap">([\s\S]*?)<\/div>/;
content = content.replace(pillRowRegex, `<div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 mb-4 text-xs font-medium">
  <span>🍂 • پاییز • Autumn</span>
  <span className="text-slate-400">Month 8 of 12</span>
  <span>💧 Aquifer Season</span>
</div>`);


// 3. DAYLIGHT LENGTH & SOLAR MILESTONE (REMOVE CONFINED BOXES)
content = content.replace(
  /<div className="grid grid-cols-2 gap-3 mt-4">([\s\S]*?)<\/div>\s*<\/section>/,
  `<div className="grid grid-cols-2 gap-3 mt-4">
{/* Widget 1: Daylight */}
<div className="bg-slate-800/40 border border-slate-700/30 rounded-2xl p-3 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-300 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>wb_sunny</span>
</div>
<div className="flex flex-col">
<span className="text-[10px] text-slate-400">Daylight Length</span>
<span className="text-sm text-slate-100 font-semibold">10h 52m (Kabul)</span>
</div>
</div>
{/* Widget 2: Solar Milestone */}
<div className="bg-slate-800/40 border border-slate-700/30 rounded-2xl p-3 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">agriculture</span>
</div>
<div className="flex flex-col">
<span className="text-[10px] text-slate-400">Solar Milestone</span>
<span className="text-sm text-slate-100 font-semibold">Mid-Autumn Harvest</span>
</div>
</div>
</div>
</section>`
);


// 4. AFGHAN SOLAR HIGHLIGHTS (OPEN LIST LAYOUT)
// Change the highlights list container to use space-y-3 or divide
const highlightsContainerRegex = /<div className="space-y-space-xs">\s*\{\/\*\s*Item 1/;
content = content.replace(highlightsContainerRegex, `<div className="space-y-4 pt-2">\n{/* Item 1`);

const highlightItemRegex = /<div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800\/40 border border-slate-700\/50 hover:bg-slate-800\/60 transition-colors">/g;
content = content.replace(highlightItemRegex, '<div className="flex items-start gap-3 transition-colors">');

const highlightBadgeRegex = /w-12 h-12 rounded-2xl bg-indigo-500\/10 border border-indigo-500\/20/g;
content = content.replace(highlightBadgeRegex, 'w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30');

// Remove line-clamp-1 from highlight descriptions
const highlightDescRegex = /<p className="text-xs text-slate-400 line-clamp-1 mt-0\.5">/g;
content = content.replace(highlightDescRegex, '<p className="text-xs text-slate-400 mt-0.5">');

// Remove truncate from titles
content = content.replace(/<h4 className="text-sm font-semibold text-slate-100 truncate">/g, '<h4 className="text-sm font-semibold text-slate-100">');


// 5. DAILY SCHEDULE (UNIFIED CLEAN LIST)
const scheduleContainerRegex = /<div className="space-y-space-xs">\s*\{\/\*\s*Schedule 1/;
content = content.replace(scheduleContainerRegex, `<div className="space-y-3 pt-2">\n{/* Schedule 1`);

const scheduleItemRegex = /<div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800\/40 border border-slate-700\/50 hover:bg-slate-800\/60 transition-colors">/g;
content = content.replace(scheduleItemRegex, '<div className="flex items-center justify-between transition-colors py-1">');

// 6. PRIMARY ACTION BUTTON COLOR ALIGNMENT
const actionBtnRegex = /<button className="rounded-2xl py-3\.5 w-full flex items-center justify-center gap-2 font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-md shadow-emerald-900\/30">/g;
content = content.replace(actionBtnRegex, '<button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-2xl py-3.5 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2">');

fs.writeFileSync(path, content, 'utf8');
console.log('Script updated.');

