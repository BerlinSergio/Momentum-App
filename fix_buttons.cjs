const fs = require('fs');
const path = require('path');

function processDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      if (file === 'LiquidButton.jsx') continue;
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = content;
  
  // Fix '=>' arrows that were broken
  const brokenArrowRegex = /<LiquidButton([^>]*?)=\s*variant="([^"]+)">/g;
  modified = modified.replace(brokenArrowRegex, (match, p1, variant) => {
    return `<LiquidButton variant="${variant}"${p1}=>`;
  });

  // What about other characters that preceded the `>`?
  // Let's find ANY LiquidButton that doesn't have its closing `>` where it should.
  // Actually, the above regex fixes the exact problem reported: `() = variant="icon">`
  
  // Wait, let's also check if there are cases where `>` was replaced but it wasn't `=`.
  // If `p1` ended with a space, e.g. `const x = 5 > 3`, it would be `const x = 5  variant="...">`
  // We can just run the build and see if there are more errors.

  if (modified !== content) {
    fs.writeFileSync(filePath, modified, 'utf-8');
    console.log(`Fixed ${filePath}`);
  }
}

processDir(path.join(__dirname, 'src'));
console.log('Done.');

