const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('src').filter(f => f.endsWith('.jsx'));
const backScreens = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join('src', f), 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    const lower = l.toLowerCase();
    if (
      lower.includes('arrowleft') ||
      lower.includes('arrow_back') ||
      lower.includes('go back') ||
      lower.includes('history.back') ||
      (lower.includes('back') && (lower.includes('aria-label') || lower.includes('onclick')))
    ) {
      backScreens.push({
        file: f,
        line: i + 1,
        text: l.trim(),
      });
    }
  });
});

console.log('Total matches found:', backScreens.length);
fs.writeFileSync('scratch/back_buttons_report.json', JSON.stringify(backScreens, null, 2), 'utf8');
console.log('Report written to scratch/back_buttons_report.json');

