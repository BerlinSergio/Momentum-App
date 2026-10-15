const fs = require('fs');

const lines = fs.readFileSync('src/AfghanSolarHijriShamsiCalendarLightMode.jsx', 'utf8').split('\n');
let divCount = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // A simple regex might not handle all cases perfectly, but let's try
  const starts = (line.match(/<div(\s|>)/g) || []).length;
  const ends = (line.match(/<\/div>/g) || []).length;
  divCount += starts - ends;
  
  if (divCount < 0) {
     console.log('Negative div balance at line', i + 1, ':', line);
     break;
  }
}
console.log('Final div balance:', divCount);

