const fs = require('fs');
let content = fs.readFileSync('src/AddEditIncomeLightMode.jsx', 'utf8');

// 1. Elevated Card Framing & Shadow Architecture
// Amount Card:
content = content.replace(
    /className="relative overflow-hidden rounded-lg bg-surface-container-lowest\/85 backdrop-blur-2xl shadow-\[0_12px_36px_-6px_rgba\(42,73,223,0\.08\)\] p-space-lg"/g,
    'className="relative overflow-hidden bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 rounded-3xl p-5"'
);
// Source Selector Card (if it has background)
// Wait, is Source Selector in a card? Yes: <div className="w-full bg-surface-container-lowest/80 backdrop-blur-xl rounded-lg p-5 shadow-sm space-y-3"> or similar? Let's check what it has. I will just replace `bg-surface-container-lowest` occurrences manually if needed.
content = content.replace(
    /className="rounded-lg bg-surface-container-lowest\/80 backdrop-blur-xl shadow-\[0_8px_30px_rgba\(80,110,180,0\.06\)\] p-space-lg space-y-space-md"/g,
    'className="bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 rounded-3xl p-5 space-y-space-md"'
);

// Realtime Projection Micro-Card
// <div className="p-space-md rounded-lg bg-surface-container-lowest/70 backdrop-blur-md shadow-sm flex items-center justify-between">
content = content.replace(
    /className="p-space-md rounded-lg bg-surface-container-lowest\/70 backdrop-blur-md shadow-sm flex items-center justify-between"/g,
    'className="p-5 rounded-3xl bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 flex items-center justify-between"'
);

// Preset Chips
content = content.replace(/className="preset-pill[^"]*"/g, `className="preset-pill flex-1 rounded-full px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs text-center shadow-sm border border-slate-200/70 transition-all duration-150 active:scale-95"`);

// Source Selector Card Background (if any)
// Let me verify if there's any other bg-surface-container-lowest/80. I will just use regex for it if there's any.
// In Light Mode, Source Selector doesn't have a background card in the snippet I saw earlier? Wait, in Dark Mode it didn't have one initially but my script replaced it? No, in Dark Mode it was in a card... I need to check.

// 3. Grid Replacement
const gridRegex = /<div className="grid grid-cols-5 gap-2 pt-1" id="sources-container">[\s\S]*?<\/div>\s*<\/div>\s*\{\/\*  Income Details Form Card  \*\/\}/;
const newGrid = `<div className="grid grid-cols-2 gap-3.5 pt-1" id="sources-container">
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl border border-indigo-300 bg-indigo-50 text-indigo-700 shadow-sm transition-all text-sm font-medium active:scale-95" data-source="Salary" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>work</span>
    <span>Salary</span>
  </div>
  <span className="material-symbols-outlined text-[16px]">check_circle</span>
</button>
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-700 shadow-sm transition-all text-sm font-medium active:scale-95" data-source="Freelance" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]">laptop_mac</span>
    <span>Freelance</span>
  </div>
</button>
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-700 shadow-sm transition-all text-sm font-medium active:scale-95" data-source="Business" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]">storefront</span>
    <span>Business</span>
  </div>
</button>
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-700 shadow-sm transition-all text-sm font-medium active:scale-95" data-source="Bonus" type="button">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-[20px]">featured_seasonal_and_gifts</span>
    <span>Bonus</span>
  </div>
</button>
<button className="source-card p-3 pl-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-700 shadow-sm transition-all text-sm font-medium active:scale-95" data-source="Other" type="button">
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
const destAccRegex = /\{\/\*  Deposit Account Selector  \*\/\}\s*<div className="space-y-1">\s*<label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="account-selector">Destination Account<\/label>[\s\S]*?<span className="material-symbols-outlined text-on-surface-variant\/50 text-\[20px\]">unfold_more<\/span>\s*<\/div>\s*<\/div>/;
content = content.replace(destAccRegex, '');

const barakahRegex = /\{\/\*  Tax & Barakah Auto-calculation Toggle  \*\/\}\s*<div className="pt-2">\s*<div className="flex items-center justify-between p-space-md rounded-DEFAULT bg-tertiary-container\/10 border border-tertiary-container\/20">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
content = content.replace(barakahRegex, '');

// Also manually replace "Destination Account" just in case the regex failed:
content = content.replace(/\{\/\*  Deposit Account Selector  \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '</div>');

fs.writeFileSync('src/AddEditIncomeLightMode.jsx', content);
console.log("Phase 1 applied.");
