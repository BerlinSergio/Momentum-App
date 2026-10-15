const fs = require('fs');
const path = 'c:\\momentum\\src\\AfghanSolarHijriShamsiCalendarDarkMode.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. REBUILD CALENDAR GRID WITH TILES (MATCHING LIGHT MODE)
// Replace active tiles
content = content.replace(
  /min-h-\[58px\] p-1 rounded-xl bg-slate-800\/40 hover:bg-slate-800\/70 border border-slate-700\/30 flex flex-col items-center justify-between transition-all cursor-pointer/g,
  'min-h-[58px] p-1.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex flex-col items-center justify-between transition-all cursor-pointer'
);

// Replace inactive tiles
content = content.replace(
  /min-h-\[58px\] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-30 border-transparent bg-transparent/g,
  'min-h-[58px] p-1.5 flex flex-col items-center justify-between rounded-xl transition-all opacity-25 bg-transparent border-transparent'
);

// Replace TODAY tile
content = content.replace(
  /<div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl p-1\.5 shadow-md shadow-indigo-500\/40 font-bold flex flex-col items-center justify-center min-h-\[58px\] z-10 cursor-pointer">/g,
  '<div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl p-1.5 shadow-md shadow-indigo-500/40 font-bold flex flex-col items-center justify-center min-h-[58px] z-10 cursor-pointer">'
); // Wait, instruction says "text-white rounded-2xl shadow-md font-bold", which is roughly what we have, let's just make sure.

// 2. DAYLIGHT LENGTH & SOLAR MILESTONE (FLATTEN TO MATCH LIGHT MODE)
content = content.replace(
  /<div className="grid grid-cols-2 gap-3 mt-4">([\s\S]*?)<\/div>\s*<\/section>/,
  `<div className="flex items-center justify-between mt-4 border-t border-slate-800/60 pt-4">
{/* Left metric: Daylight */}
<div className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-[20px] text-amber-400/80" style={{fontVariationSettings: "'FILL' 1"}}>wb_sunny</span>
<div className="flex flex-col">
<span className="text-[10px] text-slate-400">Daylight Length</span>
<span className="text-sm text-slate-100 font-semibold">10h 52m (Kabul)</span>
</div>
</div>
{/* Right metric: Solar Milestone */}
<div className="flex items-center gap-2.5 text-right">
<div className="flex flex-col">
<span className="text-[10px] text-slate-400">Solar Milestone</span>
<span className="text-sm text-slate-100 font-semibold">Mid-Autumn Harvest</span>
</div>
<span className="material-symbols-outlined text-[20px] text-emerald-400/80">agriculture</span>
</div>
</div>
</section>`
);


// 3. AFGHAN SOLAR HIGHLIGHTS CONTAINER
content = content.replace(
  /<section className="bg-slate-900\/85 border border-slate-800\/80 rounded-3xl p-5 mb-4 shadow-lg shadow-black\/20 flex flex-col space-y-space-sm">/g,
  '<section className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg flex flex-col">'
);
content = content.replace(
  /<div className="space-y-4 pt-2">/g,
  '<div className="flex flex-col mt-4 space-y-4">'
);
// Make sure highlight badges are exact
content = content.replace(
  /w-12 h-12 rounded-2xl bg-indigo-500\/15 border border-indigo-500\/30 text-indigo-400 flex flex-col items-center justify-center font-bold text-xs shrink-0/g,
  'w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold flex flex-col items-center justify-center shrink-0'
);

// 4. DAILY SCHEDULE CONTAINER
content = content.replace(
  /<section className="bg-slate-900\/85 border border-slate-800\/80 rounded-3xl p-5 mb-4 shadow-lg shadow-black\/20 flex flex-col space-y-space-sm">/g,
  '<section className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg flex flex-col">'
);
content = content.replace(
  /<div className="space-y-3 pt-2">/g,
  '<div className="flex flex-col mt-4 space-y-3">'
);


// 5. ACTION BUTTON SYNCHRONIZATION
content = content.replace(
  /<button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-2xl py-3\.5 shadow-lg shadow-indigo-600\/30 flex items-center justify-center gap-2">/g,
  '<button className="w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-950/50 transition-all">'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Update 2 applied.');

