const fs = require('fs');

function fixTodayCell(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Use a regex to match the Today cell
  // It starts right after <!-- Day 2 (Saturday - TODAY) -->
  const regex = /\{\/\*  Day 2 \(Saturday - TODAY\)  \*\/\}\s*<div[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
  const match = code.match(regex);
  
  if (match) {
    const todayHTML = `{/*  Day 2 (Saturday - TODAY)  */}
<div className="min-h-[58px] p-1.5 flex flex-col items-center justify-between rounded-full transition-all bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30 cursor-pointer group">
  <span className="text-xs font-bold font-mono">۲</span>
  <span className="text-[10px] leading-tight opacity-90">24 Oct</span>
  <span className="text-[9px] opacity-60">13 R2</span>
</div>`;
    code = code.replace(regex, todayHTML);
    fs.writeFileSync(file, code);
    console.log('Fixed Today cell in', file);
  } else {
    // maybe it has 2 inner divs instead of 3 closing divs
    const regex2 = /\{\/\*  Day 2 \(Saturday - TODAY\)  \*\/\}\s*<div[\s\S]*?<\/div>\s*<\/div>/;
    const match2 = code.match(regex2);
    if(match2) {
       const todayHTML = `{/*  Day 2 (Saturday - TODAY)  */}
<div className="min-h-[58px] p-1.5 flex flex-col items-center justify-between rounded-full transition-all bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30 cursor-pointer group">
  <span className="text-xs font-bold font-mono">۲</span>
  <span className="text-[10px] leading-tight opacity-90">24 Oct</span>
  <span className="text-[9px] opacity-60">13 R2</span>
</div>`;
       code = code.replace(regex2, todayHTML);
       fs.writeFileSync(file, code);
       console.log('Fixed Today cell in', file, '(fallback regex)');
    } else {
       console.log('Could not find Today cell in', file);
    }
  }
}

fixTodayCell('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx');
fixTodayCell('src/AfghanSolarHijriShamsiCalendarLightMode.jsx');

