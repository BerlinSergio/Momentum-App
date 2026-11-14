const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jsx'));

const avatarOccurrences = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Check for hardcoded 'A' in an avatar div or text
    if (
      line.includes('rounded-full bg-gradient-to-tr from-primary') ||
      line.includes('rounded-full') && (line.includes('>A<') || line.includes(">'A'<") || line.includes('>U<'))
    ) {
      avatarOccurrences.push({
        file,
        lineNum: index + 1,
        code: line.trim()
      });
    }
  });
});

console.log(`Found ${avatarOccurrences.length} potential avatar occurrences:`);
avatarOccurrences.forEach(o => {
  console.log(`${o.file}:${o.lineNum} -> ${o.code.slice(0, 80)}`);
});

