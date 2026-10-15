const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'DailyRoutineLightMode.jsx');
const darkPath = path.join(__dirname, 'src', 'DailyRoutineDarkMode.jsx');

let content = fs.readFileSync(lightPath, 'utf8');
content = content.replace(/DailyRoutineLightMode/g, 'DailyRoutineDarkMode');

// 1. Header & Subtitles
content = content.replace(
  /text-slate-900/g,
  `text-white`
);
content = content.replace(
  /text-slate-500/g,
  `text-slate-400`
);

// Active pill in header
content = content.replace(
  /bg-indigo-100 text-indigo-700/g,
  `bg-indigo-500/20 text-indigo-300 border border-indigo-500/40`
);

// 2. Hero Progress Card
content = content.replace(
  /bg-white\/95 border border-slate-200\/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200\/60/g,
  `bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30`
);
content = content.replace(
  /bg-amber-50 border border-amber-200\/80 text-amber-700/g,
  `bg-amber-500/15 border border-amber-500/30 text-amber-300`
);
content = content.replace(
  /text-emerald-600/g,
  `text-emerald-400`
);
// SVG Ring Background
content = content.replace(
  /className="text-slate-100"/g,
  `className="text-slate-800"`
);
// SVG Ring Progress
content = content.replace(
  /className="text-indigo-600" strokeDasharray="67, 100"/g,
  `className="text-indigo-500" strokeDasharray="67, 100"`
);
// "+ Add Routine" Button
content = content.replace(
  /bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600\/20/g,
  `bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-2xl shadow-lg shadow-indigo-950/50`
);

// 3. Routine Cards
content = content.replace(
  /bg-white border border-slate-200\/80 rounded-2xl p-4 mb-3 shadow-sm hover:shadow-md transition-all flex items-start justify-between gap-3/g,
  `bg-slate-900/75 border border-slate-800/80 rounded-2xl p-4 mb-3 shadow-md shadow-black/20 hover:border-slate-700 transition-all flex items-start justify-between gap-3`
);
content = content.replace(
  /text-indigo-600/g, // time text and toggle check
  `text-indigo-400`
);
content = content.replace(
  /bg-indigo-100/g, // toggle checked bg
  `bg-indigo-500/20 border border-indigo-500/40`
);
content = content.replace(
  /bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0\.5/g, // toggle unchecked bg
  `bg-slate-800/60 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5`
);

// Badges inside Routine Cards
content = content.replace(
  /bg-slate-100 text-slate-600/g,
  `bg-slate-800 text-slate-300 border border-slate-700`
);

// Action buttons (Pencil / Trash2)
content = content.replace(
  /text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/g,
  `text-slate-400 hover:text-slate-200 hover:bg-slate-800/80`
);
content = content.replace(
  /text-slate-400 hover:text-rose-600 hover:bg-rose-50/g,
  `text-slate-400 hover:text-slate-200 hover:bg-slate-800/80`
);

// 4. Reflection Banner
content = content.replace(
  /bg-indigo-50\/70 border border-indigo-100 rounded-3xl p-4 my-5 shadow-sm flex items-start gap-3\.5/g,
  `bg-slate-900/90 border border-slate-800 rounded-3xl p-4 my-5 shadow-md shadow-black/20 text-slate-200 flex items-start gap-3.5`
);
content = content.replace(
  /bg-white text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-indigo-100\/60/g,
  `bg-slate-800 text-indigo-400 flex items-center justify-center flex-shrink-0 border border-slate-700`
);
content = content.replace(
  /text-slate-800 italic/g,
  `text-slate-200 italic`
);
content = content.replace(
  /text-indigo-600 uppercase/g,
  `text-indigo-400 uppercase`
);

// Filter Pills
content = content.replace(
  /bg-primary text-on-primary/g,
  `bg-indigo-600 text-white`
);
content = content.replace(
  /bg-white\/70 backdrop-blur-md text-on-surface-variant/g,
  `bg-slate-800/60 border border-slate-700 text-slate-300 hover:bg-slate-700`
);
content = content.replace(
  /hover:bg-white/g,
  ``
);

// Navigation bar adjustments
content = content.replace(
  /bg-white\/80/g,
  `bg-slate-900/90 border-t border-slate-800`
);
content = content.replace(
  /text-on-surface-variant/g,
  `text-slate-400`
);
content = content.replace(
  /hover:text-on-surface/g,
  `hover:text-white`
);
content = content.replace(
  /text-primary/g, // for active tab
  `text-indigo-400`
);

// Also convert the "text-slate-400" that might have been accidentally changed back.
content = content.replace(
  /text-xs font-semibold text-slate-400/g, // time in light mode was text-indigo-600, wait. I changed text-indigo-600 to text-indigo-400 already.
  `text-xs font-semibold text-indigo-400`
);

// Make sure the description "text-slate-500" inside routine card was converted to text-slate-400 by earlier replace, but instruction says:
// Subtitle / helper descriptions: `text-slate-300 text-xs` (MUST NOT BE DARK OR INVISIBLE)
content = content.replace(
  /<span className="inline-flex items-center gap-1 text-slate-400 text-xs">/g,
  `<span className="inline-flex items-center gap-1 text-slate-300 text-xs">`
);

fs.writeFileSync(darkPath, content, 'utf8');
console.log('Dark Mode Updated.');

