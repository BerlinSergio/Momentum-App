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

  jsx = jsx.replace(/className="font-label-sm text-label-sm font-semibold text-on-surface"/g, 'className="text-xs font-normal text-slate-400 uppercase"');
  jsx = jsx.replace(/className="font-label-sm text-\[10px\] text-on-surface-variant"/g, 'className="text-xs font-normal ' + (isDark ? 'text-slate-300' : 'text-slate-600') + '"');
  jsx = jsx.replace(/className="font-label-sm text-label-sm text-on-surface-variant uppercase"/g, 'className="text-xs font-normal text-slate-400 uppercase"');
  jsx = jsx.replace(/className="font-body-sm text-body-sm text-on-surface"/g, 'className="text-xs font-normal ' + (isDark ? 'text-slate-300' : 'text-slate-600') + '"');
  jsx = jsx.replace(/className="font-body-sm text-body-sm font-semibold"/g, 'className="text-xs font-bold ' + (isDark ? 'text-indigo-400' : 'text-indigo-600') + '"');
  jsx = jsx.replace(/className="font-label-sm text-label-sm font-bold"/g, 'className="text-xs font-bold ' + (isDark ? 'text-indigo-400' : 'text-indigo-600') + '"');
  jsx = jsx.replace(/className="font-label-sm text-\[10px\] font-bold"/g, 'className="text-xs font-bold ' + (isDark ? 'text-indigo-400' : 'text-indigo-600') + '"');


  const activeReplace = `<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} cursor-pointer">
        <span className="text-xs font-bold font-mono ${isDark ? 'text-slate-200' : 'text-slate-700'}">X</span>
        <span className="text-[10px] leading-tight opacity-90 ${isDark ? 'text-slate-400' : 'text-slate-500'}">X</span>
        <span className="text-[9px] opacity-60 ${isDark ? 'text-slate-500' : 'text-slate-400'}">X</span>
      </div>`;
  
  function replaceGenericCell(match) {
     const nums = match.match(/>([^<]+)<\/span>/g);
     if (!nums) return activeReplace;
     const cleanNums = nums.map(n => n.replace(/[><]/g, '').replace('span', '').replace(/\//g, '').trim()).filter(n => n !== '');
     let top = cleanNums[0] || '1';
     let mid = cleanNums[1] || '10 Oct';
     let bot = cleanNums[2] || '';
     return `<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 ${isDark ? 'bg-slate-800/30' : 'bg-slate-50 border border-slate-100'}">
        <span className="text-xs font-bold font-mono">${top}</span>
        <span className="text-[10px] leading-tight opacity-90">${mid}</span>
        <span className="text-[9px] opacity-60"></span>
      </div>`;
  }
  
  function replaceActiveCell(match) {
     const nums = match.match(/>([^<]+)<\/span>/g);
     if (!nums) return activeReplace;
     const cleanNums = nums.map(n => n.replace(/[><]/g, '').replace('span', '').replace(/\//g, '').trim()).filter(n => n !== '');
     let top = cleanNums[0] || '1';
     let mid = cleanNums[1] || '10 Oct';
     let bot = cleanNums[2] || '';
     
     // Detect today cell by finding the string "TODAY" or if it is Day 2
     if (match.includes('TODAY') || match.includes('Day 2 (Saturday - TODAY)')) {
         return `<div className="min-h-[58px] p-1.5 flex flex-col items-center justify-between rounded-full transition-all bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30 cursor-pointer font-bold">
        <span className="text-xs font-bold font-mono">۲</span>
        <span className="text-[10px] leading-tight opacity-90">24 Oct</span>
        <span className="text-[9px] opacity-60 text-white/70">13 R2</span>
      </div>`;
     }
     
     return `<div className="min-h-[58px] p-1 flex flex-col items-center justify-between rounded-xl transition-all ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'} cursor-pointer">
        <span className="text-xs font-bold font-mono ${isDark ? 'text-slate-200' : 'text-slate-700'}">${top}</span>
        <span className="text-[10px] leading-tight opacity-90 ${isDark ? 'text-slate-400' : 'text-slate-500'}">${mid}</span>
        <span className="text-[9px] opacity-60 ${isDark ? 'text-slate-500' : 'text-slate-400'}">${bot}</span>
      </div>`;
  }

  // Use simple string splitting to process each cell!
  // This avoids all regex dotAll and greedy issues.
  let lines = jsx.split('\n');
  let newLines = [];
  let inCell = false;
  let cellHtml = '';
  
  for(let i=0; i<lines.length; i++) {
     let line = lines[i];
     
     // detect start of an empty cell
     if (line.includes('bg-surface-container-lowest/30') || line.includes('bg-surface-container-low/30 opacity-40') || line.includes('bg-surface-container-low/10 opacity-30')) {
         inCell = 'empty';
         cellHtml = line + '\n';
         continue;
     }
     // detect start of active cell
     if (line.includes('bg-surface-container/60 hover:bg-surface-container-high') || line.includes('bg-surface-container-low/40 hover:bg-surface-container') || line.includes('bg-primary') || line.includes('bg-secondary-fixed/20')) {
         // wait, only if it's actually a cell! The grid cells have min-h-[58px] or h-14
         if (line.includes('min-h-[58px]') || line.includes('h-14')) {
             inCell = 'active';
             cellHtml = line + '\n';
             continue;
         }
     }
     
     if (inCell) {
         cellHtml += line + '\n';
         // Check if this line closes the outer div of the cell
         // A very simple way is to count divs in cellHtml
         let s = (cellHtml.match(/<div/g) || []).length;
         let e = (cellHtml.match(/<\/div>/g) || []).length;
         if (s === e) {
             if (inCell === 'empty') {
                 newLines.push(replaceGenericCell(cellHtml));
             } else {
                 newLines.push(replaceActiveCell(cellHtml));
             }
             inCell = false;
             cellHtml = '';
         }
     } else {
         newLines.push(line);
     }
  }
  
  jsx = newLines.join('\n');
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
  
  const gridHtml = origHtml.substring(startIndex, endIndex);
  let jsxGrid = convertToJSX(gridHtml, isDark);
  
  let targetCode = fs.readFileSync(targetFile, 'utf8');
  const injectTarget = isDark ? '{/*  Afghan Solar Highlights Section  */}' : '{/*  Selected Date Details';
  
  let injectIdx = targetCode.indexOf(injectTarget);
  targetCode = targetCode.substring(0, injectIdx) + jsxGrid + '\n\n' + targetCode.substring(injectIdx);
  fs.writeFileSync(targetFile, targetCode);
  console.log('Successfully injected into ' + targetFile);
}

processFile('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx', true);
processFile('src/AfghanSolarHijriShamsiCalendarLightMode.jsx', false);

