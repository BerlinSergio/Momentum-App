const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scratch/back_buttons_report.json', 'utf8'));

const filesMap = {};
report.forEach(item => {
  if (!filesMap[item.file]) filesMap[item.file] = [];
  filesMap[item.file].push(item);
});

console.log('Unique files with back button references:', Object.keys(filesMap).length);
Object.keys(filesMap).sort().forEach(file => {
  console.log(`\n=== ${file} (${filesMap[file].length} matches) ===`);
  filesMap[file].forEach(m => console.log(`  Line ${m.line}: ${m.text}`));
});

