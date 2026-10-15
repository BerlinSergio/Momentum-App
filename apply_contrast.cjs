const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src', 'AfghanSolarHijriShamsiCalendarDarkMode.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

// MAXIMIZE CALENDAR GRID CONTRAST (DARK MODE)
// bg-slate-800/40 border border-slate-700/40 -> bg-slate-800/80 border border-slate-700
content = content.replace(
  /bg-slate-800\/40 border border-slate-700\/40 rounded-xl hover:bg-slate-700\/60/g,
  'bg-slate-800/80 border border-slate-700 rounded-xl hover:bg-slate-700'
);

// Replace gap-2 in the action button with gap-3
content = content.replace(
  /<button className="w-full py-4 px-6 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-950\/50 transition-all">/g,
  '<button className="w-full py-4 px-6 rounded-2xl font-semibold text-white flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-950/50 transition-all">'
);

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Final tweaks applied!');

