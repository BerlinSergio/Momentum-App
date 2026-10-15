const fs = require('fs');

const filePaths = [
  'c:\\momentum\\src\\AfghanSolarHijriShamsiCalendarDarkMode.jsx',
  'c:\\momentum\\src\\AfghanSolarHijriShamsiCalendarLightMode.jsx'
];

filePaths.forEach(path => {
  let content = fs.readFileSync(path, 'utf8');
  
  const btnRegex = /<button className="w-full py-4 [^"]*?flex items-center justify-center[^"]*?">([\s\S]*?)<\/button>/;
  content = content.replace(btnRegex, (match, inner, offset, str) => {
    let outerClass = match.match(/className="([^"]+)"/)[1];
    if (!outerClass.includes('px-6')) outerClass = outerClass.replace('py-4', 'py-4 px-6');
    outerClass = outerClass.replace('gap-2', 'gap-3');
    
    return `<button className="${outerClass}">
<span className="material-symbols-outlined w-5 h-5 flex-shrink-0 text-white text-[20px] flex items-center justify-center">add_circle</span>
<span className="text-center leading-snug text-sm sm:text-base">Add Solar Event / National Reminder</span>
</button>`;
  });
  
  fs.writeFileSync(path, content, 'utf8');
});

// Now for DARK MODE ONLY modifications
const darkPath = 'c:\\momentum\\src\\AfghanSolarHijriShamsiCalendarDarkMode.jsx';
let content = fs.readFileSync(darkPath, 'utf8');

// Day of week headers (SH, YAK, DO, SEH, CH, PANJ)
content = content.replace(
  /<span className="text-xs font-normal text-slate-500 uppercase">/g,
  '<span className="text-slate-200 font-semibold text-xs uppercase">'
);
content = content.replace(
  /<span className="text-xs font-normal text-slate-500" dir="rtl">/g,
  '<span className="text-slate-200 font-semibold text-xs" dir="rtl">'
);

// Friday header (JOM)
content = content.replace(
  /<span className="text-xs font-bold text-indigo-600">Jom<\/span>/g,
  '<span className="text-indigo-400 font-bold text-xs uppercase">Jom</span>'
);
content = content.replace(
  /<span className="text-xs font-bold text-indigo-600" dir="rtl">جمعه<\/span>/g,
  '<span className="text-indigo-400 font-bold text-xs" dir="rtl">جمعه</span>'
);

// Active Day cell backgrounds
// We know it is currently: <div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800/40 cursor-pointer">
const activeCellRegex = /<div className="min-h-\[58px\] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800\/40 cursor-pointer">/g;
content = content.replace(activeCellRegex, '<div className="min-h-[58px] p-1.5 flex flex-col items-center justify-between bg-slate-800/60 border border-slate-700/60 rounded-xl hover:bg-slate-700/60 transition-all cursor-pointer">');

// Afghan Shamsi Solar date (top number in cell)
content = content.replace(/<span className="text-xs font-bold font-mono(?: text-slate-700)?">/g, '<span className="text-white font-bold text-xs">');

// Gregorian date (middle text in cell)
content = content.replace(/<span className="text-\[10px\] leading-tight opacity-90(?: text-slate-500)?">/g, '<span className="text-slate-200 font-medium text-[11px]">');

// Lunar Hijri date (bottom text in cell)
content = content.replace(/<span className="text-\[9px\] opacity-60(?: text-[^"]*)?">/g, '<span className="text-slate-400 text-[10px]">');

// Inactive / out-of-month dates
content = content.replace(
  /<div className="min-h-\[58px\] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-slate-800\/40 border border-slate-700\/40">([\s\S]*?)<\/div>/g,
  (match, p1) => {
    let inner = p1;
    // Replace all spans inside inactive to be text-slate-600 text-[10px]
    inner = inner.replace(/<span className="[^"]*">/g, '<span className="text-slate-600 text-[10px]">');
    // Keep the opacity-25 bg-transparent border-transparent classes exactly as requested in the PREVIOUS prompt, as it was missed!
    // But this prompt says "Inactive / out-of-month dates: Keep at text-slate-600 text-[10px]."
    return `<div className="min-h-[58px] p-1.5 flex flex-col items-center justify-between rounded-xl transition-all opacity-25 bg-transparent border-transparent">\n${inner}\n</div>`;
  }
);


fs.writeFileSync(darkPath, content, 'utf8');
console.log('Update finished.');
