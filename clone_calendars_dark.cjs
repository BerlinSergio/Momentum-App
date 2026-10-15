const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'CalendarsMainLightMode.jsx');
const darkPath = path.join(__dirname, 'src', 'CalendarsMainDarkMode.jsx');

let content = fs.readFileSync(lightPath, 'utf8');

// Change component name
content = content.replace(
  /export default function CalendarsMainLightMode/g,
  'export default function CalendarsMainDarkMode'
);

// 1. Containers
const darkContainer = 'bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30';
content = content.replace(
  /bg-white\/95 border border-slate-200\/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200\/60/g,
  darkContainer
);

// 2. Dedicated Systems Cards
content = content.replace(
  /bg-white border border-slate-200\/80 shadow-sm hover:shadow-md/g,
  'bg-slate-900/75 border border-slate-800/80 shadow-sm hover:border-slate-700'
);

// 3. Active Confluence Card token mappings
// Rows borders
content = content.replace(/border-slate-100/g, 'border-slate-800');

// Icons in rows
content = content.replace(/bg-blue-50 text-blue-600/g, 'bg-blue-500/20 text-blue-400');
content = content.replace(/bg-purple-50 text-purple-600/g, 'bg-purple-500/20 text-purple-400');
content = content.replace(/bg-emerald-50 text-emerald-600/g, 'bg-emerald-500/20 text-emerald-400');

// Badges
content = content.replace(
  /bg-blue-500\/20 text-blue-400 border border-blue-200\/60/g, // because it got replaced partially above
  'bg-blue-500/15 text-blue-400 border border-blue-500/30'
);
content = content.replace(
  /bg-purple-500\/20 text-purple-400 border border-purple-200\/60/g,
  'bg-purple-500/15 text-purple-400 border border-purple-500/30'
);
content = content.replace(
  /bg-emerald-500\/20 text-emerald-400 border border-emerald-200\/60/g,
  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
);

// 4. Text Contrast
content = content.replace(/text-slate-900/g, 'text-white');
content = content.replace(/text-slate-500/g, 'text-slate-400');

// 5. Buttons & Controls
content = content.replace(
  /bg-indigo-50 border border-indigo-200\/70 hover:bg-indigo-100/g,
  'bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 text-indigo-300'
);
content = content.replace(/text-indigo-600/g, 'text-indigo-400'); // the + New Item icon & text
content = content.replace(
  /bg-slate-100 border border-slate-200\/60 text-slate-400 shadow-sm/g, // text-slate-400 because 500->400
  'bg-slate-800 border border-slate-700/60 text-slate-400 shadow-sm'
);
content = content.replace(
  /bg-white text-indigo-400 font-semibold text-xs shadow-sm/g, // text-indigo-400 because 600->400
  'bg-slate-700 text-indigo-300 font-semibold text-xs shadow-sm'
);
content = content.replace(/hover:text-slate-700/g, 'hover:text-slate-200');

// Footer Quote Card
content = content.replace(
  /bg-indigo-50\/60 border border-indigo-100/g,
  'bg-indigo-500/10 border border-indigo-500/20'
);

// Generic global mappings to preserve dark mode look inside the rest of the layout
content = content.replace(/text-on-surface/g, 'text-white');
content = content.replace(/text-on-surface-variant/g, 'text-slate-300');
content = content.replace(/bg-surface-container-lowest\/80/g, 'bg-slate-900/80');

fs.writeFileSync(darkPath, content, 'utf8');
console.log('Dark Mode Clone Updated.');

