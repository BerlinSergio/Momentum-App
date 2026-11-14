const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scratch/screen_back_buttons.json', 'utf8'));

const summary = [];
Object.entries(data).forEach(([screen, items]) => {
  if (items.length === 0) {
    summary.push({ screen, status: 'NO_BACK_FOUND' });
  } else {
    items.forEach(item => {
      // Find the onClick or action
      summary.push({
        screen,
        line: item.line,
        snippet: item.snippet
      });
    });
  }
});

console.log('Total back button matches across 74 screens:', summary.length);
// Let's print out the first 25
summary.slice(0, 30).forEach(s => {
  console.log(`\n--- ${s.screen} (Line ${s.line}) ---`);
  console.log(s.snippet);
});

