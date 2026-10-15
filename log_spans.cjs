const fs = require('fs');
const content = fs.readFileSync('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx', 'utf8');
const matches = content.match(/<span className="font-label[^>]+>[^<]+<\/span>/g);
if (matches) {
  console.log(matches.slice(0, 10).join('\n'));
} else {
  console.log('No matches found for inner spans.');
}
