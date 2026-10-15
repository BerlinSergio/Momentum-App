const fs = require('fs');

function cleanFile(file, startMarker, endMarker) {
   let code = fs.readFileSync(file, 'utf8');
   const idx1 = code.indexOf(startMarker);
   const idx2 = code.indexOf(endMarker);
   
   if (idx1 !== -1 && idx2 !== -1 && idx1 < idx2) {
      code = code.substring(0, idx1) + code.substring(idx2);
      fs.writeFileSync(file, code);
      console.log('Cleaned', file);
   } else {
      console.log('Markers not found in', file);
   }
}

cleanFile('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx', '{/*  Solar Calendar Grid (30 Days)  */}', '{/*  Afghan Solar Highlights Section  */}');
cleanFile('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx', '<div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-4 shadow-md flex flex-col">', '{/*  Afghan Solar Highlights Section  */}');

cleanFile('src/AfghanSolarHijriShamsiCalendarLightMode.jsx', '<div className="bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 rounded-3xl p-5 mb-4 flex flex-col">', '{/*  Selected Date Details');

