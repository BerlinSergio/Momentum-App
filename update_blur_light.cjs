const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'BackgroundPreviewBlurControlLightMode.jsx');
let content = fs.readFileSync(lightPath, 'utf8');

// 1. HEADER BAR
content = content.replace(
  /<h1 className="text-headline-md font-headline-md text-on-surface tracking-tight truncate max-w-\[200px\]">Background Preview &amp; Blur Control<\/h1>/,
  '<h1 className="text-headline-md font-headline-md text-on-surface tracking-tight truncate max-w-[200px]">Background Blur Control</h1>'
);

// 2. CONTAINER CARDS
const targetContainerClasses = "bg-white/95 border border-slate-200/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200/60 space-y-4";
content = content.replace(
  /<div className="relative w-full rounded-lg overflow-hidden shadow-xl bg-surface-container-low mb-6">/,
  `<div className="relative w-full overflow-hidden ${targetContainerClasses}">`
);

content = content.replace(
  /<div className="w-full rounded-lg bg-surface-container-lowest shadow-\[0_12px_36px_rgba\(42,73,223,0\.08\)\] p-space-lg flex flex-col gap-space-lg">/,
  `<div className="w-full flex flex-col ${targetContainerClasses}">`
);

// 3. "18 px" BADGE FIX
const oldBadgeBlock = `<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Background Blur Intensity</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Adjust ambient refraction behind floating elements</p>
</div>
<div className="text-right">
<span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md" id="active-blur-chip">
          18 px
        </span>
</div>
</div>`;

const newBadgeBlock = `<div className="flex items-center justify-between mb-2">
<h2 className="text-base font-bold text-slate-800">Background Blur Intensity</h2>
<span className="px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold tracking-tight shadow-sm">18 px</span>
</div>`;

content = content.replace(oldBadgeBlock, newBadgeBlock);

// 4. RE-ARCHITECT 5 PRESET TILES
const newTiles = `<div className="grid grid-cols-5 gap-2 pt-1">
<button className="rounded-2xl p-2.5 text-center transition-all border font-medium text-xs bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100 flex flex-col items-center justify-center gap-0.5" data-val="0" type="button">
<span>Crisp</span>
<span className="text-[10px] opacity-70">0px</span>
</button>
<button className="rounded-2xl p-2.5 text-center transition-all border font-medium text-xs bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100 flex flex-col items-center justify-center gap-0.5" data-val="8" type="button">
<span>Subtle</span>
<span className="text-[10px] opacity-70">8px</span>
</button>
<button className="rounded-2xl p-2.5 text-center transition-all border font-medium text-xs bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30 flex flex-col items-center justify-center gap-0.5" data-val="18" type="button">
<span>Soft</span>
<span className="text-[10px] opacity-80">18px</span>
</button>
<button className="rounded-2xl p-2.5 text-center transition-all border font-medium text-xs bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100 flex flex-col items-center justify-center gap-0.5" data-val="28" type="button">
<span>Deep</span>
<span className="text-[10px] opacity-70">28px</span>
</button>
<button className="rounded-2xl p-2.5 text-center transition-all border font-medium text-xs bg-slate-50 border-slate-200/70 text-slate-700 hover:bg-slate-100 flex flex-col items-center justify-center gap-0.5" data-val="40" type="button">
<span>Dreamy</span>
<span className="text-[10px] opacity-70">40px</span>
</button>
</div>`;

content = content.replace(/<div className="grid grid-cols-5 gap-1 pt-1">[\s\S]*?<\/div>/, newTiles);

// 5. BOTTOM ACTION BUTTONS RESTRUCTURE
const oldActionButtons = `<div className="flex items-center gap-3 pt-2">
<button className="flex-1 py-3 px-4 rounded-full bg-surface-container text-on-surface font-headline-sm text-headline-sm hover:bg-surface-container-high active:scale-\[0.98\] transition-all flex items-center justify-center gap-1.5 shadow-sm"  type="button">
<span className="material-symbols-outlined text-\[18px\]">restart_alt<\/span>
        Reset Blur
      <\/button>
<button className="flex-\[1.4\] py-3 px-5 rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary font-headline-sm text-headline-sm shadow-md hover:shadow-lg active:scale-\[0.98\] transition-all flex items-center justify-center gap-1.5"  type="button">
<span>Apply to All<\/span>
<span className="material-symbols-outlined text-\[18px\]">arrow_forward<\/span>
<\/button>
<\/div>`;

const newActionButtons = `<div className="flex items-center gap-3 pt-3">
<button className="flex-1 py-3.5 px-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm">
<span className="material-symbols-outlined w-4 h-4 flex items-center justify-center text-[16px] text-slate-500">restart_alt</span>
<span>Reset Blur</span>
</button>
<button className="flex-[2] py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all">
<span>Apply to All</span>
<span className="material-symbols-outlined w-4 h-4 flex items-center justify-center text-[16px]">arrow_forward</span>
</button>
</div>`;

content = content.replace(oldActionButtons, newActionButtons);

fs.writeFileSync(lightPath, content, 'utf8');
console.log('Light Mode Updated');

