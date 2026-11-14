const fs = require('fs');

['DhikrHistoryDarkMode.jsx', 'DhikrHistoryLightMode.jsx', 'NewEditTasbeehDarkMode.jsx', 'NewEditTasbeehLightMode.jsx', 'AppearanceDarkMode.jsx', 'AppearanceLightMode.jsx'].forEach(f => {
  const content = fs.readFileSync('src/' + f, 'utf8').replace(/\r\n/g, '\n');
  const lines = content.split('\n');
  console.log('=== ' + f + ' ===');
  lines.forEach((l, i) => {
    if (l.trim() === 'A' || (l.includes('rounded-full') && (l.includes('from-primary') || l.includes('activeAuraPreset')))) {
      console.log(lines.slice(Math.max(0, i - 4), Math.min(lines.length, i + 5)).join('\n'));
      console.log('---');
    }
  });
});

