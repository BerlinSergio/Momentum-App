const fs = require('fs');
const content = fs.readFileSync('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx', 'utf8');
const start = content.indexOf('grid-cols-7');
if (start > -1) {
  console.log(content.substring(start + 500, start + 1500));
}
