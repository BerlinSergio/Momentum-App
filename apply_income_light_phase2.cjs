const fs = require('fs');
let content = fs.readFileSync('src/AddEditIncomeLightMode.jsx', 'utf8');

// Container centering:
content = content.replace(
    /<main className="flex-1 w-full bg-surface pt-16 pb-safe px-margin"><div className="flex flex-col w-full pb-12 space-y-space-lg select-none">/,
    '<main className="flex-1 w-full bg-surface pt-16 pb-safe px-margin"><div className="w-full max-w-md mx-auto px-4 py-4 space-y-5 pb-20 flex flex-col select-none">'
);

// Payer/Company Field styling & gap-3.5:
content = content.replace(
    /<div className="flex items-center gap-space-sm bg-surface-container-low\/70 px-space-md py-2\.5 rounded-DEFAULT">/g,
    '<div className="flex items-center gap-3.5 bg-surface-container-low/70 px-space-md py-2.5 rounded-2xl">'
);

// Deposit Schedule Field styling & gap-3.5:
content = content.replace(
    /<div className="flex items-center justify-between bg-surface-container-low\/70 px-space-md py-2\.5 rounded-DEFAULT cursor-pointer hover:bg-surface-container-low transition-colors" id="schedule-trigger">\s*<div className="flex items-center gap-space-sm min-w-0">/g,
    '<div className="flex items-center justify-between bg-surface-container-low/70 px-space-md py-2.5 rounded-2xl cursor-pointer hover:bg-surface-container-low transition-colors" id="schedule-trigger">\n<div className="flex items-center gap-3.5 min-w-0">'
);

// Top Status Bar:
const topBadgeRegex = /<div className="flex items-center justify-between px-space-xs">\s*<div className="flex items-center gap-space-xs">\s*<span className="inline-flex items-center gap-1\.5 px-3 py-1 rounded-full bg-primary\/10 text-primary font-label-md text-label-md backdrop-blur-md">\s*<span className="w-2 h-2 rounded-full bg-primary animate-pulse"><\/span>\s*<span id="mode-text">New Entry<\/span>\s*<\/span>\s*<span className="inline-flex items-center gap-1 px-2\.5 py-1 rounded-full bg-tertiary-container\/15 text-tertiary font-label-sm text-label-sm">\s*<span className="material-symbols-outlined text-\[14px\]">verified<\/span>\s*<span>Auto-categorized<\/span>\s*<\/span>\s*<\/div>/;
content = content.replace(topBadgeRegex, `<div className="flex items-center justify-between px-space-xs">\n<div className="flex items-center gap-2">\n<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">\n<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>\n<span id="mode-text">&bull; NEW ENTRY #1</span>\n</span>\n<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">\n<span className="material-symbols-outlined text-[16px]">check</span>\n<span>&bull; AUTO-CATEGORIZED</span>\n</span>\n</div>`);

// Add missing Notes & Memo field inside Income Details Form Card:
const formEndRegex = /<span className="material-symbols-outlined text-on-surface-variant\/50 text-\[20px\]">tune<\/span>\s*<\/div>\s*<\/div>\s*<\/div>/;
const formEndReplacement = `<span className="material-symbols-outlined text-on-surface-variant/50 text-[20px]">tune</span>
</div>
</div>
{/*  Notes & Memo Field  */}
<div className="space-y-1">
  <div className="flex items-center justify-between">
    <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="memo-input">Notes &amp; Memo</label>
    <span className="font-label-sm text-label-sm text-on-surface-variant/70">72 / 140</span>
  </div>
  <div className="bg-surface-container-low/70 px-space-md py-3 rounded-2xl">
    <textarea aria-label="Notes and Memo" className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder-on-surface-variant/50 focus:outline-none resize-none" id="memo-input" rows="2">Monthly senior design lead compensation &amp; quarterly milestone recognition</textarea>
  </div>
</div>
</div>`;
content = content.replace(formEndRegex, formEndReplacement);

// Fix bottom buttons from `rounded-DEFAULT` to `rounded-2xl`:
content = content.replace(
    /className="w-full py-4 px-6 rounded-DEFAULT bg-gradient-to-r/g,
    'className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r'
);
content = content.replace(
    /className="w-full py-3 px-6 rounded-DEFAULT bg-surface-container-high\/60 hover:bg-surface-container-high text-on-surface-variant font-headline-sm text-headline-sm transition-colors text-center"/g,
    'className="w-full py-3 px-6 rounded-2xl bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface-variant font-headline-sm text-headline-sm transition-colors text-center shadow-sm"'
);

// Add shadow-sm to the delete button
content = content.replace(
    /className="inline-flex items-center gap-1\.5 text-error font-label-md text-label-md px-4 py-2 rounded-full hover:bg-error-container\/20 transition-colors"/g,
    'className="inline-flex items-center gap-1.5 text-error font-label-md text-label-md px-4 py-2 rounded-full hover:bg-error-container/20 transition-colors shadow-sm"'
);

fs.writeFileSync('src/AddEditIncomeLightMode.jsx', content);
console.log("Phase 2 applied.");
