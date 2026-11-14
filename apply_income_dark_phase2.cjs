const fs = require('fs');
let content = fs.readFileSync('src/AddEditIncomeDarkMode.jsx', 'utf8');

// Container centering:
content = content.replace(
    /<main className="flex-1 w-full pt-16 pb-safe px-margin"><div className="flex flex-col w-full pb-12 space-y-space-lg select-none">/,
    '<main className="flex-1 w-full pt-16 pb-safe px-margin"><div className="flex flex-col w-full max-w-md mx-auto px-4 space-y-5 pb-16 select-none">'
);

// Payer/Company Field styling & gap-3.5:
content = content.replace(
    /<div className="flex items-center gap-space-sm bg-\[#182233\]\/80 border border-white\/5 px-space-md py-2\.5 rounded-DEFAULT focus-within:border-indigo-500\/50 transition-colors">/g,
    '<div className="flex items-center gap-3.5 bg-[#182233]/80 border border-white/5 px-space-md py-2.5 rounded-2xl focus-within:border-indigo-500/50 transition-colors">'
);

// Deposit Schedule Field styling & gap-3.5:
content = content.replace(
    /<div className="flex items-center justify-between bg-\[#182233\]\/80 border border-white\/5 px-space-md py-2\.5 rounded-DEFAULT cursor-pointer hover:bg-\[#202b40\] transition-colors" id="schedule-trigger">\s*<div className="flex items-center gap-space-sm min-w-0">/g,
    '<div className="flex items-center justify-between bg-[#182233]/80 border border-white/5 px-space-md py-2.5 rounded-2xl cursor-pointer hover:bg-[#202b40] transition-colors" id="schedule-trigger">\n<div className="flex items-center gap-3.5 min-w-0">'
);

// Add missing Notes & Memo field inside Income Details Form Card:
// The form card ends with:
/*
  <span className="material-symbols-outlined text-slate-400 text-[20px]">tune</span>
  </div>
  </div>
  </div>
*/
const formEndRegex = /<span className="material-symbols-outlined text-slate-400 text-\[20px\]">tune<\/span>\s*<\/div>\s*<\/div>\s*<\/div>/;
const formEndReplacement = `<span className="material-symbols-outlined text-slate-400 text-[20px]">tune</span>
</div>
</div>
{/*  Notes & Memo Field  */}
<div className="space-y-1">
  <div className="flex items-center justify-between">
    <label className="font-label-md text-label-md text-slate-400 block" htmlFor="memo-input">Notes &amp; Memo</label>
    <span className="font-label-sm text-label-sm text-slate-500">72 / 140</span>
  </div>
  <div className="bg-[#182233]/80 border border-slate-800/90 px-space-md py-3 rounded-2xl focus-within:border-indigo-500/50 transition-colors">
    <textarea aria-label="Notes and Memo" className="w-full bg-transparent font-body-md text-body-md text-white placeholder-slate-500 focus:outline-none resize-none" id="memo-input" rows="2">Monthly senior design lead compensation &amp; quarterly milestone recognition</textarea>
  </div>
</div>
</div>`;
content = content.replace(formEndRegex, formEndReplacement);

// Change `rounded-lg` to `rounded-2xl` on Income Details Form Card:
content = content.replace(
    /<div className="rounded-lg bg-\[#121a2a\]\/75 backdrop-blur-xl border border-white\/10 shadow-\[0_12px_36px_rgba\(0,0,0,0\.35\)\] p-space-lg space-y-space-md">/g,
    '<div className="rounded-2xl bg-[#121a2a]/75 backdrop-blur-xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.35)] p-space-lg space-y-space-md">'
);

// Change bottom buttons from `rounded-DEFAULT` to `rounded-2xl`:
content = content.replace(
    /className="w-full py-4 px-6 rounded-DEFAULT bg-gradient-to-r/g,
    'className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r'
);
content = content.replace(
    /className="w-full py-3 px-6 rounded-DEFAULT bg-\[#1a2333\]\/80/g,
    'className="w-full py-3 px-6 rounded-2xl bg-[#1a2333]/80'
);

// Change Realtime Projection Micro-Card from `rounded-lg` to `rounded-2xl`:
content = content.replace(
    /className="p-space-md rounded-lg bg-\[#121a2a\]\/75 backdrop-blur-md border border-white\/10 flex items-center justify-between shadow-md">/g,
    'className="p-space-md rounded-2xl bg-[#121a2a]/75 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-md">'
);

// Change Hero Amount Card from `rounded-lg` to `rounded-2xl`:
content = content.replace(
    /className="relative overflow-hidden rounded-lg bg-\[#121a2a\]\/75 backdrop-blur-2xl border border-white\/10 shadow-\[0_16px_40px_-8px_rgba\(0,0,0,0\.5\)\] p-space-lg">/g,
    'className="relative overflow-hidden rounded-2xl bg-[#121a2a]/75 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5)] p-space-lg">'
);

fs.writeFileSync('src/AddEditIncomeDarkMode.jsx', content);
console.log("Phase 2 applied.");
