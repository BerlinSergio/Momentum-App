const fs = require('fs');

function fixMonthNavAndCells(filename, isDark) {
  let content = fs.readFileSync(filename, 'utf8');

  // Month Navigation
  const textClass = isDark ? 'text-white' : 'text-slate-900';
  const subTextClass = isDark ? 'text-slate-400' : 'text-slate-500';
  const btnClass = isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200';
  
  // Replace the entire month navigation div if it matches
  // The dark mode has:
  // `<div className="flex items-center justify-between mt-space-sm">`
  // Light mode has:
  // `<div className="relative z-10 mt-space-md flex items-center justify-between">`
  
  // Actually, I'll just rewrite the main container strings using node string manipulation.
  
  // For Calendar day cells:
  // Light: `<div className="min-h-[58px] p-1 rounded-xl bg-surface-container-low/30 opacity-40 flex flex-col justify-between">`
  content = content.replace(
    /className="min-h-\[58px\] p-1 rounded-xl bg-surface-container-low\/30 opacity-40 flex flex-col justify-between"/g,
    'className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 ' + (isDark ? 'bg-slate-800/30' : 'bg-slate-50 border border-slate-100') + '"'
  );
  
  content = content.replace(
    /className="h-14 rounded-lg bg-surface-container-lowest\/30 opacity-30 flex flex-col items-center justify-center p-0\.5"/g,
    'className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 ' + (isDark ? 'bg-slate-800/30' : 'bg-slate-50 border border-slate-100') + '"'
  );

  content = content.replace(
    /className="h-14 rounded-lg bg-surface-container\/60 hover:bg-surface-container-high transition-colors flex flex-col items-center justify-center relative p-0\.5"/g,
    'className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:' + (isDark ? 'bg-slate-800' : 'bg-slate-100') + ' cursor-pointer"'
  );

  content = content.replace(
    /className="min-h-\[58px\] p-1 rounded-xl bg-surface-container-low\/80 hover:bg-surface-container-low transition-colors flex flex-col justify-between relative group cursor-pointer"/g,
    'className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:' + (isDark ? 'bg-slate-800' : 'bg-slate-100') + ' cursor-pointer"'
  );

  // Month Nav Replace
  const lightNavRegex = /<div className="relative z-10 mt-space-md flex items-center justify-between">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  const darkNavRegex = /<div className="flex items-center justify-between mt-space-sm">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  
  const navHTML = `<div className="flex items-center justify-between mt-4">
  <button aria-label="Previous Month" className="w-9 h-9 flex items-center justify-center rounded-full ${btnClass} transition-colors">
    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
  </button>
  <div className="flex flex-col items-center text-center px-2">
    <div className="flex items-center gap-2">
      <h2 className="text-xl font-bold tracking-tight ${textClass}">Aqrab 1405 SH</h2>
      <span className="text-sm font-medium tracking-wide ${subTextClass}">???? ????</span>
    </div>
    <p className="text-xs font-normal mt-0.5 ${subTextClass}">
      Scorpio (???) • Oct 23 – Nov 21, 2026 • 30 Days
    </p>
  </div>
  <button aria-label="Next Month" className="w-9 h-9 flex items-center justify-center rounded-full ${btnClass} transition-colors">
    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
  </button>
</div>`;

  if (isDark) {
    content = content.replace(darkNavRegex, navHTML);
  } else {
    content = content.replace(lightNavRegex, navHTML);
  }

  // Ensure JOM accent has right styles
  if(isDark) {
    content = content.replace(/className="flex flex-col items-center text-tertiary"/g, 'className="flex flex-col items-center text-indigo-400"');
  }

  fs.writeFileSync(filename, content);
}

try {
  fixMonthNavAndCells('src/AfghanSolarHijriShamsiCalendarLightMode.jsx', false);
  fixMonthNavAndCells('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx', true);
  console.log('Update Calendar Month Nav complete!');
} catch(e) {
  console.error(e);
}
