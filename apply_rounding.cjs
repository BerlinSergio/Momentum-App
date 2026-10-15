const fs = require('fs');
let content = fs.readFileSync('src/AddEditExpenseDarkMode.jsx', 'utf8');

// 1. Change rounded-DEFAULT to rounded-2xl for category pills
content = content.replace(/rounded-DEFAULT/g, 'rounded-2xl');

// 2. Change main card containers from rounded-lg to rounded-2xl
content = content.replace(/rounded-lg/g, 'rounded-2xl');

// 3. Quick-amount button chips: update styling
// Currently: `px-3 py-1.5 rounded-full bg-[#1e293b]/70 hover:bg-[#1e293b] border border-white/10 text-slate-200`
// Target: `rounded-full py-1.5 px-4 bg-slate-800/80 text-white`
content = content.replace(
    /px-3 py-1\.5 rounded-full bg-\[#1e293b\]\/70 hover:bg-\[#1e293b\] border border-white\/10 text-slate-200/g,
    'rounded-full py-1.5 px-4 bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-white'
);

// For the Round Up button which is slightly different:
// Currently: `px-3 py-1.5 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-indigo-300`
// The prompt says "all quick-amount button chips... bg-slate-800/80 text-white" - wait, Round Up usually has a different color but the prompt says "Make all quick-amount button chips ("+ $10", "+ $25", "+ $50", "? Round Up") highly rounded (rounded-full py-1.5 px-4 bg-slate-800/80 text-white)." 
content = content.replace(
    /px-3 py-1\.5 rounded-full bg-indigo-500\/20 hover:bg-indigo-500\/30 border border-indigo-400\/30 text-indigo-300/g,
    'rounded-full py-1.5 px-4 bg-slate-800/80 hover:bg-slate-700 border border-indigo-400/30 text-white'
);

// 4. Remove Merchant / Payee Row
const merchantRegex = /\{\/\*  Merchant \/ Payee Row  \*\/\}\s*<div className="flex flex-col space-y-1">\s*<label className="font-label-sm text-label-sm text-slate-400 uppercase tracking-wider">Merchant \/ Payee<\/label>\s*<div className="flex items-center gap-2\.5 p-3 rounded-DEFAULT bg-\[#0b0f19\]\/70 border border-white\/5 focus-within:border-indigo-400\/40 focus-within:bg-\[#0b0f19\] transition-colors">\s*<div className="w-8 h-8 rounded-full bg-sky-500\/20 border border-sky-400\/20 flex items-center justify-center text-sky-300 shrink-0">\s*<span className="material-symbols-outlined text-\[18px\]">storefront<\/span>\s*<\/div>\s*<input className="w-full font-body-md text-body-md font-semibold text-white bg-transparent focus:outline-none" placeholder="Who did you pay\?" type="text" value="Organic Groceries Market"\/>\s*<\/div>\s*<\/div>/g;

// Wait, since rounded-DEFAULT was already replaced with rounded-2xl, we need to match rounded-2xl
const merchantRegexUpdated = /\{\/\*  Merchant \/ Payee Row  \*\/\}\s*<div className="flex flex-col space-y-1">\s*<label className="font-label-sm text-label-sm text-slate-400 uppercase tracking-wider">Merchant \/ Payee<\/label>\s*<div className="flex items-center gap-2\.5 p-3 rounded-2xl bg-\[#0b0f19\]\/70 border border-white\/5 focus-within:border-indigo-400\/40 focus-within:bg-\[#0b0f19\] transition-colors">\s*<div className="w-8 h-8 rounded-full bg-sky-500\/20 border border-sky-400\/20 flex items-center justify-center text-sky-300 shrink-0">\s*<span className="material-symbols-outlined text-\[18px\]">storefront<\/span>\s*<\/div>\s*<input className="w-full font-body-md text-body-md font-semibold text-white bg-transparent focus:outline-none" placeholder="Who did you pay\?" type="text" value="Organic Groceries Market"\/>\s*<\/div>\s*<\/div>/g;

content = content.replace(merchantRegexUpdated, '');

// 5. Remove Payment Account Row
const paymentRegexUpdated = /\{\/\*  Payment Account Row  \*\/\}\s*<div className="flex flex-col space-y-1">\s*<label className="font-label-sm text-label-sm text-slate-400 uppercase tracking-wider">Payment Account<\/label>\s*<div className="flex items-center justify-between p-3 rounded-2xl bg-\[#0b0f19\]\/70 border border-white\/5 hover:border-white\/10 hover:bg-\[#0b0f19\] transition-colors cursor-pointer">\s*<div className="flex items-center gap-2\.5">\s*<div className="w-8 h-8 rounded-full bg-teal-500\/20 border border-teal-400\/20 flex items-center justify-center text-teal-300">\s*<span className="material-symbols-outlined text-\[18px\]">credit_card<\/span>\s*<\/div>\s*<div>\s*<p className="font-body-md text-body-md font-semibold text-white">Default Checking<\/p>\s*<p className="font-body-sm text-body-sm text-slate-400">•••• 4821<\/p>\s*<\/div>\s*<\/div>\s*<span className="material-symbols-outlined text-slate-400 text-\[18px\]">expand_more<\/span>\s*<\/div>\s*<\/div>/g;

content = content.replace(paymentRegexUpdated, '');

fs.writeFileSync('src/AddEditExpenseDarkMode.jsx', content);
console.log("Rounding and pruning applied.");
