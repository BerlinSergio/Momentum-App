const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'CurrencySelectionLightMode.jsx');
const darkPath = path.join(__dirname, 'src', 'CurrencySelectionDarkMode.jsx');

let content = fs.readFileSync(lightPath, 'utf8');

content = content.replace(/CurrencySelectionLightMode/g, 'CurrencySelectionDarkMode');

// 1. Header Title
content = content.replace(
  /text-slate-900/g,
  `text-white`
);

// 2. Container Cards
// Replace ALL occurrences of `bg-white/95 border border-slate-200/80 rounded-3xl ... shadow-md shadow-slate-200/60`
content = content.replace(
  /bg-white\/95 border border-slate-200\/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200\/60/g,
  `bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-5 shadow-lg shadow-black/30`
);
content = content.replace(
  /bg-white\/95 border border-slate-200\/80 rounded-3xl p-4 mb-5 shadow-md shadow-slate-200\/60/g,
  `bg-slate-900/85 border border-slate-800/80 rounded-3xl p-4 mb-5 shadow-lg shadow-black/30`
);

// 3. Hero Card
content = content.replace(
  /bg-indigo-50 border border-indigo-200\/80 text-indigo-700/g,
  `bg-indigo-500/20 text-indigo-300 border border-indigo-500/40`
);
content = content.replace(
  /bg-slate-50\/80 border border-slate-100 text-xs text-slate-600/g,
  `bg-slate-800/60 border border-slate-700/60 text-slate-300 text-xs`
);

// Search Bar
content = content.replace(
  /bg-white border border-slate-200\/80 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500\/20 mb-4 text-white placeholder-slate-400/g,
  `bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 mb-4 rounded-2xl shadow-sm`
);

// 4. Available Currencies
content = content.replace(
  /border border-indigo-200\/80 bg-indigo-50\/40 hover:bg-slate-50\/80/g,
  `bg-indigo-950/40 border border-indigo-500/50 text-white`
);
content = content.replace(
  /border border-slate-100 bg-transparent hover:border-slate-200 hover:bg-slate-50\/80/g,
  `border border-slate-800/60 text-slate-200 hover:bg-slate-800/50 bg-transparent`
);
// Make sure AFN active row texts are white
content = content.replace(
  /text-slate-800/g,
  `text-slate-200`
);
content = content.replace(
  /text-slate-600/g,
  `text-slate-300`
);
content = content.replace(
  /text-slate-500/g,
  `text-slate-400`
);

// Radio Borders
content = content.replace(
  /border-slate-200/g,
  `border-slate-700`
);
// the unselected radio circle:
content = content.replace(
  /w-5 h-5 rounded-full border-2 border-slate-700 shrink-0/g,
  `w-5 h-5 rounded-full border-2 border-slate-700 shrink-0`
);

// the unselected icon background
content = content.replace(
  /bg-slate-100/g,
  `bg-slate-800`
);

// 5. Display Preferences Card
content = content.replace(
  /bg-slate-100\/80 p-1 rounded-2xl border border-slate-700\/60/g, // because slate-200 became slate-700 above
  `bg-slate-800/80 p-1 rounded-2xl border border-slate-700/60`
);
content = content.replace(
  /bg-white text-indigo-700 shadow-sm border border-slate-700\/60/g,
  `bg-indigo-600 text-white shadow-md border border-slate-700/60`
);
content = content.replace(
  /bg-indigo-50 border border-indigo-200\/70 text-indigo-700/g,
  `bg-indigo-500/20 text-indigo-300 border border-indigo-500/40`
);

// Filter chips
content = content.replace(
  /bg-primary text-on-primary/g,
  `bg-indigo-600 text-white`
);
content = content.replace(
  /bg-surface-container-lowest\/80 backdrop-blur-sm text-on-surface-variant/g,
  `bg-slate-800/80 text-slate-300 border border-slate-700/50`
);

// 6. Bottom Confirm Button
content = content.replace(
  /bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600\/30/g,
  `bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-950/50`
);
content = content.replace(
  /bg-gradient-to-t from-white via-white\/80 to-transparent/g,
  `bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent`
);
content = content.replace(
  /text-outline/g,
  `text-slate-500`
);

fs.writeFileSync(darkPath, content, 'utf8');
console.log('Dark Mode Cloned.');

