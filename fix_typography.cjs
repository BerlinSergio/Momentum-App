const fs = require('fs');
const path = require('path');

const darkPath = path.join(__dirname, 'src', 'AppearanceDarkMode.jsx');
let content = fs.readFileSync(darkPath, 'utf8');

// Fix text-base-variant typo
content = content.replace(/text-white font-semibold text-base-variant uppercase tracking-wider/g, 'text-slate-400 text-xs font-medium uppercase tracking-wider');

fs.writeFileSync(darkPath, content, 'utf8');
console.log('Fixed typography mapping issue');

