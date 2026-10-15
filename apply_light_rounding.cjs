const fs = require('fs');
let content = fs.readFileSync('src/AddEditExpenseLightMode.jsx', 'utf8');

// 1. Elevated Card Framing & Shadow Architecture
content = content.replace(
    /bg-surface-container-lowest\/80 backdrop-blur-xl rounded-lg p-5 shadow-sm/g,
    'bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 rounded-3xl p-5'
);

// 2. Quick-amount chips
content = content.replace(
    /px-3 py-1\.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all active:scale-95 shadow-sm/g,
    'rounded-full px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs shadow-sm border border-slate-200/60 transition-all active:scale-95'
);
content = content.replace(
    /px-3 py-1\.5 rounded-full bg-primary-fixed hover:bg-surface-container-high text-on-primary-fixed-variant font-label-md text-label-md transition-all active:scale-95 flex items-center gap-1/g,
    'rounded-full px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs shadow-sm border border-slate-200/60 transition-all active:scale-95 flex items-center gap-1'
);

// 3. Category Grid Elements
// Inactive
content = content.replace(
    /p-2\.5 rounded-DEFAULT bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all/g,
    'p-3 rounded-2xl border border-slate-200/70 shadow-sm transition-all bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm'
);
// Active (Food)
content = content.replace(
    /p-2\.5 rounded-DEFAULT bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all/g,
    'p-3 rounded-2xl bg-indigo-600 text-white font-medium text-sm shadow-[0_4px_14px_rgba(79,70,229,0.35)] border border-indigo-400/30 transition-all'
);

// 4. Revise Status Badge
content = content.replace(
    /<div className="flex items-center gap-space-xs bg-surface-container-high px-3 py-1 rounded-full shadow-sm">\s*<span className="w-2 h-2 rounded-full bg-primary animate-pulse"><\/span>\s*<span className="font-label-sm text-label-sm text-on-surface-variant font-medium tracking-wide">EDITING TRANSACTION<\/span>\s*<span className="font-label-sm text-label-sm text-primary font-bold ml-0\.5">#TX-8924<\/span>\s*<\/div>/g,
    `<div className="flex items-center gap-1.5 rounded-full px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 shadow-sm">\n<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>\n<span>&bull; EDITING TRANSACTION #1</span>\n</div>`
);

// 5. Delete Merchant/Payee & Payment Account Row
const merchantRegex = /\{\/\*  Merchant \/ Payee Row  \*\/\}\s*<div className="flex flex-col space-y-1">\s*<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Merchant \/ Payee<\/label>\s*<div className="flex items-center gap-2\.5 p-3 rounded-DEFAULT bg-surface-container-low focus-within:bg-surface-container transition-colors">\s*<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">\s*<span className="material-symbols-outlined text-\[18px\]">storefront<\/span>\s*<\/div>\s*<input className="w-full font-body-md text-body-md font-semibold text-on-surface bg-transparent focus:outline-none" placeholder="Who did you pay\?" type="text" value="Organic Groceries Market"\/>\s*<\/div>\s*<\/div>/g;
content = content.replace(merchantRegex, '');

const paymentRegex = /\{\/\*  Payment Account Row  \*\/\}\s*<div className="flex flex-col space-y-1">\s*<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Payment Account<\/label>\s*<div className="flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">\s*<div className="flex items-center gap-2\.5">\s*<div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary">\s*<span className="material-symbols-outlined text-\[18px\]">credit_card<\/span>\s*<\/div>\s*<div>\s*<p className="font-body-md text-body-md font-semibold text-on-surface">Default Checking<\/p>\s*<p className="font-body-sm text-body-sm text-on-surface-variant">•••• 4821<\/p>\s*<\/div>\s*<\/div>\s*<span className="material-symbols-outlined text-outline text-\[18px\]">expand_more<\/span>\s*<\/div>\s*<\/div>/g;
content = content.replace(paymentRegex, '');

// 6. Bottom action buttons (Add shadow-sm to Cancel and Delete)
content = content.replace(
    /className="w-full py-3 px-4 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-body-lg text-body-lg text-center transition-colors"/g,
    'className="w-full py-3 px-4 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-body-lg text-body-lg text-center transition-colors shadow-sm"'
);
content = content.replace(
    /className="w-full py-3 px-4 rounded-full bg-error-container text-on-error-container font-body-lg text-body-lg text-center hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1\.5"/g,
    'className="w-full py-3 px-4 rounded-full bg-error-container text-on-error-container font-body-lg text-body-lg text-center hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-sm"'
);

fs.writeFileSync('src/AddEditExpenseLightMode.jsx', content);
console.log("Light Mode changes applied.");
