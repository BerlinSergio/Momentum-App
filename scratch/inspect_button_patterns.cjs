const fs = require('fs');

const screens = fs.readdirSync('src').filter(f => f.endsWith('.jsx'));

const patterns = {};
screens.forEach(file => {
  const content = fs.readFileSync('src/' + file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('ArrowLeft') || l.includes('arrow_back') || l.includes('Go back') || (l.includes('back') && l.includes('onClick'))) {
      // Find button tag around this line
      for (let j = Math.max(0, i - 4); j <= Math.min(lines.length - 1, i + 4); j++) {
        if (lines[j].includes('<button') || lines[j].includes('<LiquidButton')) {
          const btnSnippet = lines.slice(j, Math.min(lines.length, j + 5)).join('\n');
          if (!patterns[btnSnippet]) patterns[btnSnippet] = [];
          patterns[btnSnippet].push(`${file}:${j + 1}`);
          break;
        }
      }
    }
  });
});

console.log('Unique button snippets count:', Object.keys(patterns).length);
Object.entries(patterns).slice(0, 20).forEach(([snippet, files]) => {
  console.log(`\nUsed in ${files.length} places (e.g. ${files.slice(0, 3).join(', ')}):`);
  console.log(snippet);
});

