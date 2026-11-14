const fs = require('fs');
const path = require('path');

function inspectAndClean(relPath, tag) {
  const filePath = path.join(__dirname, '..', relPath);
  let content = fs.readFileSync(filePath, 'utf8');
  const needle = `_jsxDEV("${tag}"`;
  const idx = content.indexOf(needle);
  if (idx === -1) {
    console.log(`Needle not found in ${relPath}`);
    return;
  }
  
  // Find where the comma before it is
  const commaIdx = content.lastIndexOf(',', idx);
  // The nav is the last child before `], void 0, true);` at the end of the return statement
  // Let's see the end
  const endIdx = content.lastIndexOf('], void 0, true);');
  if (commaIdx !== -1 && endIdx > commaIdx) {
    const before = content.slice(0, commaIdx);
    const after = content.slice(endIdx);
    content = before + after;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully cleaned ${relPath}!`);
  } else {
    console.log(`Indices issue in ${relPath}: commaIdx=${commaIdx}, endIdx=${endIdx}`);
  }
}

inspectAndClean('src/Finance.jsx', 'nav');
inspectAndClean('src/Dashboard.jsx', 'nav');
inspectAndClean('src/NotesMain.jsx', 'div');
inspectAndClean('src/PrayerTimes.jsx', 'nav');
inspectAndClean('src/Settings.jsx', 'nav');
