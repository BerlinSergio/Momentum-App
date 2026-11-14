const fs = require('fs');
let content = fs.readFileSync('src/AddEditIncomeDarkMode.jsx', 'utf8');

// 1. Top status pill:
// Currently:
/*
<div className="flex items-center gap-1.5 bg-[#121a2a] border border-white/10 rounded-full px-3 py-1.5 shadow-sm">
<div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
<span className="font-label-sm text-label-sm text-slate-300 font-semibold tracking-wide uppercase">New Income</span>
<span className="font-label-sm text-label-sm text-emerald-400 font-bold ml-1">#IN-9281</span>
</div>
*/
// Wait, I saw earlier it was:
/*
<div className="flex items-center gap-space-xs">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-label-md text-label-md backdrop-blur-md">
<span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
<span id="mode-text">New Entry</span>
</span>
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">verified</span>
<span>Auto-categorized</span>
</span>
</div>
*/

// Let's replace the whole top badges block
const topBadgeRegex = /<div className="flex items-center gap-space-xs">\s*<span className="inline-flex items-center gap-1\.5 px-3 py-1 rounded-full bg-indigo-500\/15 border border-indigo-500\/30 text-indigo-300 font-label-md text-label-md backdrop-blur-md">\s*<span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"><\/span>\s*<span id="mode-text">New Entry<\/span>\s*<\/span>\s*<span className="inline-flex items-center gap-1 px-2\.5 py-1 rounded-full bg-emerald-500\/15 border border-emerald-500\/20 text-emerald-400 font-label-sm text-label-sm">\s*<span className="material-symbols-outlined text-\[14px\]">verified<\/span>\s*<span>Auto-categorized<\/span>\s*<\/span>\s*<\/div>/g;
content = content.replace(topBadgeRegex, `<div className="flex items-center gap-2">\n<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-label-md text-label-md backdrop-blur-md">\n<span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>\n<span id="mode-text">&bull; NEW ENTRY #1</span>\n</span>\n<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-label-sm text-label-sm">\n<span className="material-symbols-outlined text-[16px]">check</span>\n<span>&bull; AUTO-CATEGORIZED</span>\n</span>\n</div>`);

// 2. Corner rounding for main CTA chips: +$500, +$1,000, +$2,500, +$5,000
// target: rounded-full py-1.5 px-4 bg-slate-800
// replace all present-pill
content = content.replace(/className="preset-pill[^"]*"/g, `className="preset-pill flex-1 py-1.5 px-4 rounded-full bg-slate-800 text-slate-200 font-label-md text-label-md text-center transition-all duration-150 active:scale-95 shadow-sm border border-white/10"`);

// Note: +$5,000 might have had a gradient, let's keep them all identical as requested: "Turn "+$500", "+$1,000", "+$2,500", "+$5,000" into highly rounded capsule pills (rounded-full py-1.5 px-4 bg-slate-800)."

// 3. Grid replacement
const gridRegex = /<div className="grid grid-cols-5 gap-2 pt-1" id="sources-container">[\s\S]*?<\/div>\s*<\/div>\s*\{\/\*  Income Details Form Card  \*\/\}/;
const newGrid = `<div className="grid grid-cols-2 gap-3.5 pt-1" id="sources-container">
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl border border-indigo-500 bg-indigo-600/90 text-white transition-all text-sm font-medium active:scale-95 shadow-md shadow-indigo-500/20" data-source="Salary" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>work</span>
    <span>Salary</span>
  </div>
  <span className="material-symbols-outlined text-[16px]">check_circle</span>
</button>
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 transition-all text-sm font-medium active:scale-95" data-source="Freelance" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
    <span>Freelance</span>
  </div>
</button>
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 transition-all text-sm font-medium active:scale-95" data-source="Business" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]">storefront</span>
    <span>Business</span>
  </div>
</button>
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 transition-all text-sm font-medium active:scale-95" data-source="Bonus" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]">featured_seasonal_and_gifts</span>
    <span>Bonus</span>
  </div>
</button>
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 text-slate-300 transition-all text-sm font-medium active:scale-95" data-source="Other" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
    <span>Other</span>
  </div>
</button>
</div>
</div>
{/*  Income Details Form Card  */}`;
content = content.replace(gridRegex, newGrid);

// 4. Pruning
const destAccRegex = /\{\/\*  Deposit Account Selector  \*\/\}\s*<div className="space-y-1">\s*<label className="font-label-md text-label-md text-slate-400 block" htmlFor="account-selector">Destination Account<\/label>\s*<div className="flex items-center justify-between bg-\[#182233\]\/80 border border-white\/5 px-space-md py-2\.5 rounded-DEFAULT cursor-pointer hover:bg-\[#202b40\] transition-colors" id="account-selector">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
// Wait, I should carefully match the block for Destination Account
content = content.replace(/\{\/\*  Deposit Account Selector  \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '</div>'); // wait, I'll use specific string replace for pruning later to be safer, or regex that is exact.

fs.writeFileSync('src/AddEditIncomeDarkMode.jsx', content);
console.log("Phase 1 applied.");
