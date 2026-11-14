const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch/screen_back_buttons.json', 'utf8'));

const detailedBackButtons = [];
Object.entries(data).forEach(([screen, items]) => {
  items.forEach(item => {
    // If the snippet contains <ArrowLeft or "arrow_back"
    if (item.snippet.includes('ArrowLeft') || item.snippet.includes('arrow_back')) {
      detailedBackButtons.push({
        screen,
        line: item.line,
        snippet: item.snippet
      });
    }
  });
});

console.log('Total screens with back button elements:', new Set(detailedBackButtons.map(d => d.screen)).size);
console.log('Total back button elements:', detailedBackButtons.length);

detailedBackButtons.forEach(b => {
  // extract onClick if present in snippet
  const onClickMatch = b.snippet.match(/onClick=\{([^}]+)\}/);
  const clickHandler = onClickMatch ? onClickMatch[1] : 'NONE_FOUND';
  console.log(`${b.screen}:${b.line} -> ${clickHandler}`);
});

