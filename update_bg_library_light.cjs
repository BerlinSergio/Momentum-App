const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'BackgroundWallpaperLibraryLightMode.jsx');
let content = fs.readFileSync(lightPath, 'utf8');

// 1. Hero Card
content = content.replace(
  /className="relative w-full rounded-lg overflow-hidden bg-surface-container-lowest shadow-xl backdrop-blur-2xl p-space-md"/,
  'className="relative w-full bg-white/95 border border-slate-200/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200/60"'
);

// 1b. Dynamic Pairing Banner
content = content.replace(
  /className="relative overflow-hidden rounded-2xl bg-surface-container-low p-space-md shadow-sm flex items-start gap-space-md"/,
  'className="relative overflow-hidden bg-white/95 border border-slate-200/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200/60 flex items-start gap-space-md"'
);

// 2. Master Collection Grid Cards
// Replace the outer container
content = content.replace(
  /className="group relative flex flex-col rounded-2xl bg-surface-container-lowest p-2 shadow-sm transition-all duration-200 hover:shadow-md"/g,
  'className="bg-white border border-slate-200/80 rounded-3xl p-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"'
);

// Image container
content = content.replace(
  /className="relative w-full h-36 rounded-xl overflow-hidden shadow-inner"/g,
  'className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3"'
);

// Top-Left Badge
content = content.replace(
  /<div className="absolute top-2 left-2 px-1\.5 py-0\.5 rounded-full bg-surface-container-lowest\/85 backdrop-blur-md flex items-center gap-1 text-on-surface shadow-xs">\s*<span className="material-symbols-outlined text-\[11px\] text-tertiary">wb_sunny<\/span>\s*<span className="material-symbols-outlined text-\[11px\] text-secondary">bedtime<\/span>\s*<\/div>/g,
  `<div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[13px] text-amber-300">wb_sunny</span>
<span className="material-symbols-outlined text-[13px] text-indigo-300">bedtime</span>
</div>`
);

// Top-Right Favorite button
content = content.replace(
  /<button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest\/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-error active:scale-90 transition-transform">\s*<span className="material-symbols-outlined text-\[15px\]">favorite<\/span>\s*<\/button>/g,
  `<button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm">
<span className="material-symbols-outlined text-[14px]">favorite</span>
</button>`
);

// Text Content below image
content = content.replace(
  /<div className="mt-2\.5 px-1 pb-1 flex flex-col">\s*<span className="text-label-sm font-label-sm text-outline truncate">(.*?)<\/span>\s*<h4 className="text-body-lg font-body-lg font-semibold text-on-surface truncate">(.*?)<\/h4>\s*<span className="text-label-sm font-label-sm.*?mt-0\.5">(.*?)<\/span>\s*<\/div>/g,
  `<div className="px-1 pb-1 flex flex-col">
<span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-0.5 truncate">$1</span>
<h4 className="text-sm font-bold text-slate-900 block truncate">$2</h4>
<span className="text-xs font-medium text-indigo-600 mt-1 truncate">$3</span>
</div>`
);

// 3. Load All 30 Backgrounds Button
const loadAllHtml = `
<div className="flex flex-col items-center justify-center my-6 space-y-2">
  <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
    22 additional themes available in Sanctuary Cloud
  </span>
  <button className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-slate-200/90 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all">
    <span className="material-symbols-outlined text-[16px] text-slate-500">layers</span>
    <span>Load All 30 Backgrounds</span>
  </button>
</div>`;

content = content.replace(
  /{\/\*  Load More \/ Full Library Indicator  \*\/}\s*<div className="w-full flex flex-col items-center justify-center py-space-sm gap-2">[\s\S]*?<\/button>\s*<\/div>/,
  `{/*  Load More / Full Library Indicator  */}\n${loadAllHtml}`
);

// 4. Bottom Floating Action Dock
const actionDockHtml = `
<div className="fixed bottom-0 left-0 right-0 z-40">
<div className="backdrop-blur-xl bg-white/80 border-t border-slate-200/60 p-4 rounded-t-3xl flex flex-col gap-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
{/*  Primary Action Button  */}
<button className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-transform">
<span>Customize Selected Background</span>
<span className="material-symbols-outlined text-[18px]">tune</span>
</button>
{/*  Secondary Action Button  */}
<button className="w-full h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 active:bg-slate-200 transition-colors">
<span className="material-symbols-outlined text-[18px] text-slate-500">add_photo_alternate</span>
<span>Upload Custom Wallpaper</span>
</button>
</div>
</div>`;

content = content.replace(
  /{\/\*  Floating Sticky Action Container Above Shell Safe Margin  \*\/}\s*<div className="fixed bottom-4 left-margin right-margin z-40 flex flex-col gap-2">[\s\S]*?<\/div>\s*<\/div>/,
  `{/*  Floating Sticky Action Container Above Shell Safe Margin  */}\n${actionDockHtml}`
);

fs.writeFileSync(lightPath, content, 'utf8');
console.log('Light Mode Updated Successfully.');

