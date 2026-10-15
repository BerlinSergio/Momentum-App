const fs = require('fs');

function convertToJSX(html, isDark) {
  let jsx = html.replace(/class="/g, 'className="');
  jsx = jsx.replace(/style="font-variation-settings: 'FILL' 1;"/g, "style={{fontVariationSettings: \"'FILL' 1\"}}");
  
  if (isDark) {
    jsx = jsx.replace(
      /className="flex flex-col rounded-xl bg-surface-container-low\/70 backdrop-blur-xl p-space-md shadow-xl"/g,
      'className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-4 shadow-md flex flex-col"'
    );
    jsx = jsx.replace(
      /className="grid grid-cols-7 gap-1 text-center mb-space-sm pb-space-xs"/g,
      'className="grid grid-cols-7 gap-1 text-center mb-2 pb-1"'
    );
  } else {
    jsx = jsx.replace(
      /className="w-full rounded-2xl bg-surface-container-lowest\/80 backdrop-blur-xl p-space-md shadow-sm flex flex-col space-y-2"/g,
      'className="bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 rounded-3xl p-5 mb-4 flex flex-col"'
    );
    jsx = jsx.replace(
      /className="grid grid-cols-7 gap-1 text-center pb-1"/g,
      'className="grid grid-cols-7 gap-1 text-center mb-2 pb-1"'
    );
  }

  // Day Headers Text
  jsx = jsx.replace(/className="font-label-sm text-label-sm font-semibold text-on-surface"/g, 'className="text-xs font-normal text-slate-400 uppercase"');
  jsx = jsx.replace(/className="font-label-sm text-\[10px\] text-on-surface-variant"/g, 'className="text-xs font-normal ' + (isDark ? 'text-slate-300' : 'text-slate-600') + '"');
  
  jsx = jsx.replace(/className="font-label-sm text-label-sm text-on-surface-variant uppercase"/g, 'className="text-xs font-normal text-slate-400 uppercase"');
  jsx = jsx.replace(/className="font-body-sm text-body-sm text-on-surface"/g, 'className="text-xs font-normal ' + (isDark ? 'text-slate-300' : 'text-slate-600') + '"');
  jsx = jsx.replace(/className="font-body-sm text-body-sm font-semibold"/g, 'className="text-xs font-bold ' + (isDark ? 'text-indigo-400' : 'text-indigo-600') + '"');
  jsx = jsx.replace(/className="font-label-sm text-label-sm font-bold"/g, 'className="text-xs font-bold ' + (isDark ? 'text-indigo-400' : 'text-indigo-600') + '"');
  jsx = jsx.replace(/className="font-label-sm text-\[10px\] font-bold"/g, 'className="text-xs font-bold ' + (isDark ? 'text-indigo-400' : 'text-indigo-600') + '"');


  // We can just forcefully rewrite the cell classes by matching the outer structure.
  // The cells contain text. 
  
  // Empty cells
  const emptyRegex1 = /<div className="h-14 rounded-lg bg-surface-container-lowest\/30 opacity-30 flex flex-col items-center justify-center p-0\.5">[\s\S]*?<\/div>/g;
  const emptyRegex2 = /<div className="min-h-\[58px\] p-1 rounded-xl bg-surface-container-low\/30 opacity-40 flex flex-col justify-between">[\s\S]*?<\/div>/g;
  const emptyReplace = `<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 ${isDark ? 'bg-slate-800/30' : 'bg-slate-50 border border-slate-100'}">
        <span className="text-xs font-bold font-mono">1</span>
        <span className="text-[10px] leading-tight opacity-90">1 Oct</span>
        <span className="text-[9px] opacity-60"></span>
      </div>`;
  jsx = jsx.replace(emptyRegex1, emptyReplace);
  jsx = jsx.replace(emptyRegex2, emptyReplace);

  // Today Cell
  const todayRegex = /<div className="min-h-\[58px\] p-1 rounded-xl bg-surface-container-low\/80 hover:bg-surface-container-low transition-colors flex flex-col justify-between relative group cursor-pointer">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
  const todayReplace = `<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30 cursor-pointer">
      <span className="text-xs font-bold font-mono">۲</span>
      <span className="text-[10px] leading-tight opacity-90">24 Oct</span>
      <span className="text-[9px] opacity-60 text-white/70">14 R2</span>
    </div>`;
  jsx = jsx.replace(todayRegex, todayReplace);
  
  const todayRegexLight = /<div className="min-h-\[58px\] p-1 rounded-xl bg-primary hover:bg-primary-container transition-colors flex flex-col justify-between relative group cursor-pointer shadow-md shadow-primary\/20">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
  jsx = jsx.replace(todayRegexLight, todayReplace);

  // Active regular cells
  // This matches both Dark and Light active cells (which may have 2, 3 or 4 spans inside)
  const activeRegex = /<div className="h-14 rounded-lg bg-surface-container\/60 hover:bg-surface-container-high transition-colors flex flex-col items-center justify-center relative p-0\.5">[\s\S]*?<\/div>/g;
  const activeRegexLight = /<div className="min-h-\[58px\] p-1 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex flex-col justify-between relative group cursor-pointer border border-surface-container-low">[\s\S]*?<\/div>/g;
  const activeRegexLight2 = /<div className="min-h-\[58px\] p-1 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors flex flex-col justify-between relative group cursor-pointer">[\s\S]*?<\/div>/g;

  const activeReplace = `<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} cursor-pointer">
        <span className="text-xs font-bold font-mono ${isDark ? 'text-slate-200' : 'text-slate-700'}">X</span>
        <span className="text-[10px] leading-tight opacity-90 ${isDark ? 'text-slate-400' : 'text-slate-500'}">X</span>
        <span className="text-[9px] opacity-60 ${isDark ? 'text-slate-500' : 'text-slate-400'}">X</span>
      </div>`;
  
  // Since we don't need accurate calendar numbers for this structural update (just layout and typography consistency),
  // wait, the user's task was specifically to unify the typography of the grid cells.
  // Actually, I can extract the numbers using a function replacement. Let's do that for the generic cells.
  
  function replaceGenericCell(match) {
     const nums = match.match(/>([^<]+)<\/span>/g);
     if (!nums) return activeReplace;
     const cleanNums = nums.map(n => n.replace(/[><]/g, '').replace('span', '').replace(/\//g, '').trim()).filter(n => n !== '');
     let top = cleanNums[0] || '1';
     let mid = cleanNums[1] || '10 Oct';
     let bot = cleanNums[2] || '';
     return `<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} cursor-pointer">
        <span className="text-xs font-bold font-mono ${isDark ? 'text-slate-200' : 'text-slate-700'}">${top}</span>
        <span className="text-[10px] leading-tight opacity-90 ${isDark ? 'text-slate-400' : 'text-slate-500'}">${mid}</span>
        <span className="text-[9px] opacity-60 ${isDark ? 'text-slate-500' : 'text-slate-400'}">${bot}</span>
      </div>`;
  }
  
  jsx = jsx.replace(activeRegex, replaceGenericCell);
  jsx = jsx.replace(activeRegexLight, replaceGenericCell);
  jsx = jsx.replace(activeRegexLight2, replaceGenericCell);
  
  jsx = jsx.replace(/<!--(.*?)-->/g, "{/* $1 */}");
  return jsx;
}

function processFile(targetFile, isDark) {
  const origHtml = fs.readFileSync(`c:/momentum/design_reference/afghan_solar_hijri_shamsi_calendar_${isDark ? 'dark' : 'light'}_mode/code.html`, 'utf8');
  
  let startIndex, endIndex;
  if (isDark) {
     startIndex = origHtml.indexOf('<!-- Afghan Solar Calendar Grid Card -->');
     endIndex = origHtml.indexOf('<!-- Afghan Solar Highlights Section -->');
  } else {
     startIndex = origHtml.indexOf('<!-- Solar Calendar Grid (30 Days) -->');
     endIndex = origHtml.indexOf('<!-- Selected Date Details: 2 Aqrab 1405 SH -->');
  }
  
  if (startIndex === -1 || endIndex === -1) {
     console.error('Could not find boundaries in HTML for ' + (isDark ? 'dark' : 'light'));
     return;
  }
  
  const gridHtml = origHtml.substring(startIndex, endIndex);
  
  let jsxGrid = convertToJSX(gridHtml, isDark);
  
  let targetCode = fs.readFileSync(targetFile, 'utf8');
  const injectTarget = isDark ? '{/*  Afghan Solar Highlights Section  */}' : '{/*  Selected Date Details Section  */}';
  
  // Wait, does Light Mode have `{/*  Selected Date Details Section  */}`? Let's check targetCode if it exists.
  let injectIdx = targetCode.indexOf('{/*  Afghan Solar Highlights Section  */}');
  let realInjectTarget = '{/*  Afghan Solar Highlights Section  */}';
  
  if (injectIdx === -1) {
    // try to find the section title for light mode
    realInjectTarget = '{/*  Selected Date Details';
    injectIdx = targetCode.indexOf(realInjectTarget);
  }
  
  if (injectIdx === -1) {
    // If not found, look for <section className="flex flex-col space-y-space-sm"> which contains the highlights
    realInjectTarget = '<section className="flex flex-col space-y-space-sm">';
  }
  
  // Clean up if already injected
  if (targetCode.indexOf('Calendar Grid Card') !== -1 || targetCode.indexOf('Solar Calendar Grid') !== -1) {
     console.error('Already injected in ' + targetFile);
     return;
  }
  
  targetCode = targetCode.replace(realInjectTarget, jsxGrid + '\n\n' + realInjectTarget);
  fs.writeFileSync(targetFile, targetCode);
  console.log('Successfully injected into ' + targetFile);
}

processFile('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx', true);
processFile('src/AfghanSolarHijriShamsiCalendarLightMode.jsx', false);

