const fs = require('fs');
const path = require('path');

const lightFiles = fs.readdirSync('src').filter(f => f.includes('LightMode') && f.endsWith('.jsx'));
const darkFiles = fs.readdirSync('src').filter(f => f.includes('DarkMode') && f.endsWith('.jsx'));

console.log('Light files count:', lightFiles.length);
console.log('Dark files count:', darkFiles.length);

// Audit card patterns in light mode
const lightCards = [];
lightFiles.forEach(f => {
  const content = fs.readFileSync(path.join('src', f), 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if ((l.includes('rounded-3xl') || l.includes('rounded-2xl')) && l.includes('bg-')) {
      lightCards.push({ file: f, line: i + 1, text: l.trim() });
    }
  });
});

console.log('Total light card lines:', lightCards.length);

// Audit card patterns in dark mode
const darkCards = [];
darkFiles.forEach(f => {
  const content = fs.readFileSync(path.join('src', f), 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if ((l.includes('rounded-3xl') || l.includes('rounded-2xl')) && l.includes('bg-')) {
      darkCards.push({ file: f, line: i + 1, text: l.trim() });
    }
  });
});

console.log('Total dark card lines:', darkCards.length);

