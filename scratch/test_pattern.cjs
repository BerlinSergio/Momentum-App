const fs = require('fs');
const path = require('path');
const target = `<div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>`;

const matchedFiles = [];
fs.readdirSync('src').filter(f => f.endsWith('.jsx')).forEach(f => {
  const content = fs.readFileSync(path.join('src', f), 'utf8').replace(/\r\n/g, '\n');
  if (content.includes(target)) {
    matchedFiles.push(f);
  }
});
console.log('Exact match in ' + matchedFiles.length + ' files:');
matchedFiles.forEach(f => console.log(' - ' + f));

