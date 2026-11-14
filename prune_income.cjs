const fs = require('fs');
let content = fs.readFileSync('src/AddEditIncomeDarkMode.jsx', 'utf8');

const accountRegex = /\{\/\*  Deposit Account Selector  \*\/\}\s*<div className="space-y-1">\s*<label className="font-label-md text-label-md text-slate-400 block" htmlFor="account-selector">Destination Account<\/label>[\s\S]*?<span className="material-symbols-outlined text-slate-400 text-\[20px\]">unfold_more<\/span>\s*<\/div>\s*<\/div>/;
content = content.replace(accountRegex, '');

const barakahRegex = /\{\/\*  Tax & Barakah Auto-calculation Toggle  \*\/\}\s*<div className="pt-2">\s*<div className="flex items-center justify-between p-space-md rounded-DEFAULT bg-emerald-500\/10 border border-emerald-500\/20">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
content = content.replace(barakahRegex, '');

fs.writeFileSync('src/AddEditIncomeDarkMode.jsx', content);
console.log("Pruning applied.");
