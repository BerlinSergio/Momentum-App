const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'BackgroundPreviewBlurControlDarkMode.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Live Canvas Simulator Dark Theme Fix
// Replace the wallpaper surface
content = content.replace(
  /<div className="absolute inset-0 bg-cover bg-center transition-all duration-300 ease-out transform scale-105"[\s\S]*?id="wallpaper-surface"[\s\S]*?<\/div>/,
  '<div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800/80 transition-all duration-300 ease-out transform scale-105" id="wallpaper-surface" style={{filter: \'blur(18px)\'}}></div>'
);

// Greeting badge
content = content.replace(
  /className="self-start px-3\.5 py-1\.5 rounded-full bg-surface-container-lowest\/75 backdrop-blur-xl shadow-sm flex items-center gap-2"/,
  'className="self-start px-3.5 py-1.5 rounded-full bg-slate-800/70 border border-slate-700/60 text-slate-200 flex items-center gap-2"'
);

// Task card
content = content.replace(
  /className="p-3\.5 rounded-DEFAULT bg-surface-container-lowest\/70 backdrop-blur-2xl shadow-\[0_10px_25px_-5px_rgba\(80,110,180,0\.12\)\] flex items-center justify-between"/,
  'className="p-3.5 rounded-DEFAULT bg-slate-800/80 border border-slate-700/80 text-white flex items-center justify-between"'
);

// Prayer card
content = content.replace(
  /className="p-4 rounded-DEFAULT bg-surface-container-lowest\/75 backdrop-blur-2xl shadow-\[0_10px_25px_-5px_rgba\(80,110,180,0\.12\)\] relative overflow-hidden"/,
  'className="p-4 rounded-DEFAULT bg-slate-800/80 border border-slate-700/80 text-white relative overflow-hidden"'
);

// Bottom floating dock
content = content.replace(
  /className="mx-auto w-11\/12 py-2 px-4 rounded-full bg-surface-container-lowest\/80 backdrop-blur-xl shadow-lg flex items-center justify-between mt-1"/,
  'className="mx-auto w-11/12 py-2 px-4 rounded-full bg-slate-900/90 border border-slate-700/70 text-slate-300 backdrop-blur-md flex items-center justify-between mt-1"'
);

// Live Rendering pill
content = content.replace(
  /className="font-label-sm text-label-sm font-semibold px-3 py-1 rounded-full bg-surface-container-lowest\/85 backdrop-blur-md shadow-sm text-white flex items-center gap-1\.5"/,
  'className="font-label-sm text-label-sm font-semibold px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 flex items-center gap-1.5"'
);

// 2. Standardize & Unify Bottom Action Buttons
const newButtons = `{/*  Dual Action Buttons  */}
<div className="flex items-center gap-3 pt-3 w-full">
{/* Secondary: Reset Blur */}
<button className="flex-1 py-3.5 px-4 rounded-2xl border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-black/20">
<span className="material-symbols-outlined text-[16px] text-slate-400 flex-shrink-0 w-4 h-4 flex items-center justify-center">restart_alt</span>
<span className="whitespace-nowrap">Reset Blur</span>
</button>

{/* Primary: Apply to All */}
<button className="flex-1 py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-950/50">
<span className="whitespace-nowrap">Apply to All</span>
<span className="material-symbols-outlined text-[16px] flex-shrink-0 w-4 h-4 flex items-center justify-center">arrow_forward</span>
</button>
</div>`;

content = content.replace(
  /{\/\*  Dual Action Buttons  \*\/}[\s\S]*?(?={\/\*  Toast Confirmation Feedback  \*\/})/m,
  newButtons + '\n'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done replacing content');

