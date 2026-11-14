const fs = require('fs');

const dark = fs.readFileSync('src/IslamicHijriCalendarDarkMode.jsx', 'utf-8');
const light = fs.readFileSync('src/IslamicHijriCalendarLightMode.jsx', 'utf-8');

function countChars(str) {
  return {
    parens: (str.match(/\(/g) || []).length - (str.match(/\)/g) || []).length,
    braces: (str.match(/\{/g) || []).length - (str.match(/\}/g) || []).length,
    brackets: (str.match(/\[/g) || []).length - (str.match(/\]/g) || []).length,
  };
}

console.log('Dark balance:', countChars(dark));
console.log('Light balance:', countChars(light));

