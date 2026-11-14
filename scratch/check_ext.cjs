const fs = require('fs');
let withExt = 0;
let withoutExt = 0;
fs.readdirSync('src').forEach(f => {
  if (f.endsWith('.jsx') || f.endsWith('.js')) {
    const c = fs.readFileSync('src/' + f, 'utf8');
    if (c.includes("from './store/useSettingsStore'")) withoutExt++;
    if (c.includes("from './store/useSettingsStore.js'")) withExt++;
  }
});
console.log('Without .js:', withoutExt, 'With .js:', withExt);

