const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'AfghanSolarHijriShamsiCalendarDarkMode.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Rebuild calendar active tiles
// We replace bg-slate-800/60 border border-slate-700/60 with bg-slate-800/40 border border-slate-700/40
content = content.replace(/bg-slate-800\/60 border border-slate-700\/60/g, 'bg-slate-800/40 border border-slate-700/40');

// 2. Wrap Highlights in its own unified card & flatten items
// Current Highlights starts at: {/*  Cultural & National Occasions Ahead  */}
// End of previous card: 
// </div>
// {/*  Cultural & National Occasions Ahead  */}
content = content.replace(
  /<\/div>\s*\{\/\*  Cultural & National Occasions Ahead  \*\/\}/,
  `</div>\n</div>\n\n{/* Cultural & National Occasions Ahead */}\n<div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/20 space-y-4">`
);

// We need to change the highlight items from:
// <div className="p-space-md rounded-xl bg-slate-800/40 hover:bg-slate-800/60 flex items-start gap-space-md transition-colors">
// To:
// <div className="flex items-start gap-3">
content = content.replace(/<div className="p-space-md rounded-xl bg-slate-800\/40 hover:bg-slate-800\/60 flex items-start gap-space-md transition-colors">/g, '<div className="flex items-start gap-3">');

// 3. Wrap Daily Schedule in its own card & open list items
content = content.replace(
  /<\/div>\s*\{\/\*  Scheduled Routines for 2 Aqrab  \*\/\}/,
  `</div>\n</div>\n\n{/* Scheduled Routines for 2 Aqrab */}\n<div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/20 space-y-4">`
);

// We need to change schedule items from:
// <div className="p-space-md rounded-xl bg-slate-800/40 flex items-center justify-between">
// To:
// <div className="flex items-center justify-between py-1">
content = content.replace(/<div className="p-space-md rounded-xl bg-slate-800\/40 flex items-center justify-between">/g, '<div className="flex items-center justify-between py-1">');

// 4. Wrap action button in its own card or just keep it unnested as requested?
// The prompt says: "Wrap Afghan Solar Highlights in its own unified card", "Wrap Daily Schedule in its own unified card". 
// Let's close the Schedule card before the button.
content = content.replace(
  /<\/div>\s*\{\/\*  Primary Momentum Gradient Action Trigger  \*\/\}/,
  `</div>\n</div>\n\n{/* Primary Momentum Gradient Action Trigger */}`
);

// We also have one extra </div> at the end because we closed the massive wrapper early.
// The end of the file looks like:
// {/*  Primary Momentum Gradient Action Trigger  */}
// <div className="pt-2">
// <button ...>...</button>
// </div>
// </div>
// </div></div></main>
// We need to remove the extra </div> that corresponded to the massive wrapper.
content = content.replace(
  /<\/div>\s*<\/div><\/div><\/main>/,
  `</div></div></main>`
);


// 5. Flatten Daylight & Solar Milestone into a single open horizontal flex layout
// Current:
// {/*  Solar & Astronomical Insight Pill Grid  */}
// <div className="grid grid-cols-2 gap-2">
// <div className="p-space-md rounded-xl bg-slate-800/40 flex items-center gap-space-sm">
// ...
// </div>
// </div>
content = content.replace(
  /\{\/\*  Solar & Astronomical Insight Pill Grid  \*\/\}\s*<div className="grid grid-cols-2 gap-2">\s*<div className="p-space-md rounded-xl bg-slate-800\/40 flex items-center gap-space-sm">\s*<span className="material-symbols-outlined text-primary text-\[20px\]">wb_twilight<\/span>\s*<div>\s*<div className="font-label-sm text-\[10px\] text-slate-400">Daylight Length<\/div>\s*<div className="font-label-md text-label-md text-slate-100">10h 52m \(Kabul\)<\/div>\s*<\/div>\s*<\/div>\s*<div className="p-space-md rounded-xl bg-slate-800\/40 flex items-center gap-space-sm">\s*<span className="material-symbols-outlined text-secondary text-\[20px\]">agriculture<\/span>\s*<div>\s*<div className="font-label-sm text-\[10px\] text-slate-400">Solar Milestone<\/div>\s*<div className="font-label-md text-label-md text-slate-100">Mid-Autumn Harvest<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/,
  `{/* Solar & Astronomical Insight Pill Grid (Flattened) */}
<div className="flex items-center gap-6 pt-2">
  <div className="flex items-center gap-2">
    <span className="material-symbols-outlined text-primary text-[20px]">wb_twilight</span>
    <span className="text-sm font-medium text-slate-300">10h 52m Daylight</span>
  </div>
  <div className="flex items-center gap-2">
    <span className="material-symbols-outlined text-secondary text-[20px]">agriculture</span>
    <span className="text-sm font-medium text-slate-300">Mid-Autumn Harvest</span>
  </div>
</div>`
);

// 6. Action button styling
// Currently: bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-950/50
// Prompt says: Sync action button styling (`w-full py-4 rounded-2xl... gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-950/50`)
content = content.replace(
  /<button className="w-full py-4 px-6 rounded-2xl font-semibold text-white flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-950\/50 transition-all">/g,
  '<button className="w-full py-4 px-6 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-950/50 transition-all">'
);

// Selected Date Wrapper styling
// We need to update its styling to: bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/20
content = content.replace(
  /<div className="w-full rounded-2xl bg-slate-900\/85 backdrop-blur-xl p-space-lg shadow-lg shadow-black\/30 space-y-4">/,
  '<div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-4 shadow-lg shadow-black/20 space-y-4">'
);

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Modifications applied successfully!');

