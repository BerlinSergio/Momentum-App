const fs = require('fs');

let targetCode = fs.readFileSync('src/AfghanSolarHijriShamsiCalendarLightMode.jsx', 'utf8');

// The original file size is known, but I can just find the mismatched div.
let divStarts = (targetCode.match(/<div(\s|>)/g) || []).length;
let divEnds = (targetCode.match(/<\/div>/g) || []).length;
console.log('Total <div:', divStarts, 'Total </div:', divEnds);

// Let's trace it
let count = 0;
for (let i = 0; i < targetCode.length; i++) {
  if (targetCode.substr(i, 4) === '<div') {
     // ensure it's <div or <div className=... 
     if (targetCode[i+4] === ' ' || targetCode[i+4] === '>') count++;
  }
  if (targetCode.substr(i, 6) === '</div') {
     if (targetCode[i+6] === '>') count--;
  }
}
console.log('Final count:', count);
