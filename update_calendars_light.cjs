const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'CalendarsMainLightMode.jsx');
let content = fs.readFileSync(lightPath, 'utf8');

// 1. Header Bar & Title
content = content.replace(
  /<h1 className="font-headline-sm text-headline-sm text-on-surface truncate text-center font-semibold">Focus Preferences<\/h1>/,
  `<h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
  <span className="material-symbols-outlined text-[20px] text-indigo-600">calendar_today</span>
  <span>Calendars & Time</span>
</h1>`
);
// In case the original is "Momentum Home" or something else:
content = content.replace(
  /<h1 className="[^"]*">[^<]*Momentum Home[^<]*<\/h1>/,
  `<h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
  <span className="material-symbols-outlined text-[20px] text-indigo-600">calendar_today</span>
  <span>Calendars & Time</span>
</h1>`
);

// 2. Active Confluence Card (The 3 Date Rows)
const newDateRows = `{/* Row 1: Gregorian */}
<div className="flex items-center justify-between py-2 border-b border-slate-100">
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
    </div>
    <div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">CIVIL • GREGORIAN</span>
      <span className="text-sm font-bold text-slate-900">Saturday, Oct 24, 2026</span>
    </div>
  </div>
  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200/60">Primary</span>
</div>

{/* Row 2: Hijri Qamari - RE-ALIGNED GIBBOUS BADGE */}
<div className="flex items-center justify-between py-2 border-b border-slate-100">
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
      <span className="material-symbols-outlined text-[16px]">bedtime</span>
    </div>
    <div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">LUNAR • HIJRI QAMARI</span>
      <span className="text-sm font-bold text-slate-900">13 Rabi' al-Thani, 1448 AH</span>
    </div>
  </div>
  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-600 border border-purple-200/60 whitespace-nowrap">
    Gibbous 96%
  </span>
</div>

{/* Row 3: Hijri Shamsi */}
<div className="flex items-center justify-between py-2">
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
      <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
    </div>
    <div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">SOLAR • HIJRI SHAMSI</span>
      <span className="text-sm font-bold text-slate-900">2 Aqrab, 1405 SH (عقرب)</span>
    </div>
  </div>
  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60">Mid-Autumn</span>
</div>`;

// We need to replace the inner content of the Active Confluence Hero Card
// In the current file, it looks like a list of divs. Let's use a regex to match the inner divs.
// It currently contains `<div className="flex items-center justify-between py-1.5 border-b border-outline-variant/30">` etc.
content = content.replace(
  /{\/\*  Core Data Rows  \*\/}\s*<div className="space-y-1 mt-space-sm pt-space-xs relative z-10">[\s\S]*?<\/div>\s*<\/div>/,
  `{/*  Core Data Rows  */}
<div className="space-y-1 mt-space-sm pt-space-xs relative z-10">
  ${newDateRows}
</div>
</div>`
);

// 3. Elevated Container Cards & Soft Shadows
// Active Confluence Hero Card
content = content.replace(
  /className="rounded-2xl bg-surface-container-lowest shadow-sm p-4 backdrop-blur-xl relative overflow-hidden"/,
  'className="bg-white/95 border border-slate-200/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200/60 relative overflow-hidden"'
);

// Dedicated Systems
content = content.replace(
  /className="min-w-\[260px\] rounded-2xl bg-surface-container-lowest p-space-md shadow-sm snap-start flex flex-col relative overflow-hidden transition-all hover:shadow-md"/g,
  'className="min-w-[260px] rounded-2xl p-4 bg-white border border-slate-200/80 shadow-sm hover:shadow-md snap-start flex flex-col relative overflow-hidden transition-all"'
);

// Weekly Tri-Calendar Strip Card
content = content.replace(
  /className="rounded-2xl bg-surface-container-lowest\/80 backdrop-blur-md p-space-md shadow-sm space-y-3"/,
  'className="rounded-3xl bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 p-5 mb-5 space-y-3"'
);

// Harmonized Daily Flow
content = content.replace(
  /className="rounded-2xl bg-surface-container-lowest\/80 backdrop-blur-xl p-space-md shadow-sm"/,
  'className="rounded-3xl bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 p-5 mb-5"'
);

// Footer Quote Card
content = content.replace(
  /className="rounded-2xl p-3\.5 bg-gradient-to-r from-primary-fixed\/30 via-secondary-fixed\/20 to-tertiary-fixed\/30 backdrop-blur-md flex items-center gap-3"/,
  'className="rounded-2xl bg-indigo-50/60 border border-indigo-100 p-4 flex items-center gap-3"'
);

// 4. Polish Buttons & Controls
// + New Item
content = content.replace(
  /<button className="inline-flex items-center gap-1 px-3 py-1\.5 rounded-full bg-surface-container-highest\/60 hover:bg-surface-container-highest text-primary font-label-sm text-label-sm font-semibold transition-colors">\s*<span className="material-symbols-outlined text-\[16px\]">add<\/span>\s*<span>New Item<\/span>\s*<\/button>/,
  `<button className="px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200/70 hover:bg-indigo-100 flex items-center gap-1 transition-colors">
<span className="material-symbols-outlined text-[16px]">add</span>
<span>New Item</span>
</button>`
);

// View Segmented Toggle
const newToggle = `<div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200/60 text-slate-500 shadow-sm">
<button className="px-3 py-1 rounded-lg bg-white text-indigo-600 font-semibold text-xs shadow-sm">Week</button>
<button className="px-3 py-1 rounded-lg text-slate-500 font-medium text-xs hover:text-slate-700 transition-colors">Month</button>
<button className="px-3 py-1 rounded-lg text-slate-500 font-medium text-xs hover:text-slate-700 transition-colors">Agenda</button>
</div>`;

content = content.replace(
  /<div className="inline-flex p-0\.5 rounded-full bg-surface-container text-on-surface-variant">[\s\S]*?<\/div>/,
  newToggle
);


fs.writeFileSync(lightPath, content, 'utf8');
console.log('Light Mode Updated.');

