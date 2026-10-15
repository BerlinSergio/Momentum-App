const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'BackgroundWallpaperLibraryLightMode.jsx');
const darkPath = path.join(__dirname, 'src', 'BackgroundWallpaperLibraryDarkMode.jsx');

let content = fs.readFileSync(lightPath, 'utf8');

// Change component name
content = content.replace(
  /export default function BackgroundWallpaperLibraryLightMode/g,
  'export default function BackgroundWallpaperLibraryDarkMode'
);

// Map the specific Containers & Hero Card
content = content.replace(
  /bg-white\/95 border border-slate-200\/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200\/60/g,
  'bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30'
);

// Map the Master Collection Grid Cards
content = content.replace(
  /bg-white border border-slate-200\/80 rounded-3xl p-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative/g,
  'bg-slate-900/75 border border-slate-800/80 rounded-3xl p-3 shadow-md shadow-black/20 hover:border-slate-700 transition-all flex flex-col justify-between group relative'
);

// Map the Badge Overlays (Top-Left)
content = content.replace(
  /bg-black\/40 backdrop-blur-md border border-white\/20 text-white text-\[11px\] flex items-center gap-1 shadow-sm/g,
  'bg-slate-950/60 backdrop-blur-md border border-white/10 text-slate-200 text-[11px] flex items-center gap-1 shadow-sm'
);

// Map the Badge Overlays (Top-Right)
content = content.replace(
  /bg-black\/40 backdrop-blur-md border border-white\/20 text-white hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm/g,
  'bg-slate-950/60 backdrop-blur-md border border-white/10 text-slate-200 hover:text-rose-400 flex items-center justify-center transition-colors shadow-sm'
);

// Map Card Typography
content = content.replace(/text-slate-500 uppercase/g, 'text-slate-400 uppercase');
content = content.replace(/text-slate-900 block/g, 'text-slate-100 block');
content = content.replace(/text-indigo-600 mt-1/g, 'text-indigo-400 mt-1');

// Map "Load All 30 Backgrounds" Section
content = content.replace(
  /<span className="text-xs text-slate-500 font-medium flex items-center gap-1\.5">/g,
  '<span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">'
);

content = content.replace(
  /border border-slate-200\/90 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all/g,
  'border border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-md transition-all'
);

// Map Bottom Floating Action Dock
content = content.replace(
  /backdrop-blur-xl bg-white\/80 border-t border-slate-200\/60 p-4 rounded-t-3xl flex flex-col gap-3 shadow-\[0_-10px_40px_-15px_rgba\(0,0,0,0\.1\)\]/g,
  'bg-slate-900/85 backdrop-blur-xl border-t border-slate-800 p-4 rounded-t-3xl flex flex-col gap-3 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]'
);

// Map bottom dock buttons
content = content.replace(
  /w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md active:scale-\[0\.98\] transition-transform/g,
  'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white rounded-2xl py-3.5 px-6 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40'
);

content = content.replace(
  /w-full h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 active:bg-slate-200 transition-colors/g,
  'bg-slate-800 border border-slate-700 text-slate-200 rounded-2xl py-3 px-6 text-sm font-medium flex items-center justify-center gap-2'
);

// Extra Header token mappings for Dark Mode to ensure it looks like a proper dark mode
content = content.replace(/bg-surface\/80/g, 'bg-slate-900/80');
content = content.replace(/bg-surface"/g, 'bg-slate-900"'); // main bg

fs.writeFileSync(darkPath, content, 'utf8');
console.log('Dark Mode 1:1 structural clone and mapping complete.');

