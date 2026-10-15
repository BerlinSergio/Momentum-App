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
  
  if (!content.includes('<button') && !content.includes('</button>')) return;

  // Replace tags
  let modified = content;
  
  // Use regex to find all <button ...> tags
  const buttonRegex = /<button([\s\S]*?)>/g;
  modified = modified.replace(buttonRegex, (match, p1) => {
    // Determine variant based on heuristics
    let variant = 'subtle'; // default to subtle or none
    
    const textContext = match.toLowerCase();
    if (textContext.includes('save') || textContext.includes('submit') || textContext.includes('add') || textContext.includes('confirm') || textContext.includes('log ') || textContext.includes('primary')) {
      variant = 'primary';
    } else if (textContext.includes('w-11 h-11') || textContext.includes('w-10 h-10') || textContext.includes('w-8 h-8') || textContext.includes('w-9 h-9') || textContext.includes('aria-label="back"') || textContext.includes('aria-label="close"') || textContext.includes('aria-label="settings"') || textContext.includes('icon')) {
      variant = 'icon';
    } else if (textContext.includes('chip') || textContext.includes('pill') || textContext.includes('filter') || textContext.includes('px-2 py-1') || textContext.includes('px-3 py-1')) {
      variant = 'pill';
    } else if (textContext.includes('w-full')) {
      variant = 'none'; // Keep full width styling intact mostly
    }
    
    // Add variant prop if not present
    let props = p1;
    if (!props.includes('variant=')) {
        props += ` variant="${variant}"`;
    }
    
    // To prevent original bg colors from hiding the glass effect completely, we could inject !bg-transparent or similar, but the user requested "Keep layout structures 100% intact".
    // LiquidButton renders the glass as a z-0 absolute child and children as z-10. So if the button itself has a background, it will cover the glass.
    // Let's strip bg- classes or let them be? 
    // We will just let them be, or replace `bg-` with `!bg-transparent` selectively if we want the glass to show.
    // For now, let's just do the tag swap and variant.
    
    return `<LiquidButton${props}>`;
  });

  modified = modified.replace(/<\/button>/g, '</LiquidButton>');

  if (modified !== content) {
    // Calculate import path
    const srcDir = path.join(__dirname, 'src');
    const relativePath = path.relative(path.dirname(filePath), path.join(srcDir, 'components', 'ui', 'LiquidButton'));
    let importPath = relativePath.replace(/\\/g, '/');
    if (!importPath.startsWith('.')) {
      importPath = './' + importPath;
    }
    
    if (!modified.includes('LiquidButton')) {
        // Just in case
    } else if (!modified.includes('import LiquidButton')) {
      const importStmt = `import LiquidButton from '${importPath}';\n`;
      // Insert after React import
      if (modified.includes('import React')) {
        modified = modified.replace(/(import React.*?;\n)/, `$1${importStmt}`);
      } else {
        modified = importStmt + modified;
      }
    }
    fs.writeFileSync(filePath, modified, 'utf-8');
    console.log(`Updated ${filePath}`);
  }
}

processDir(path.join(__dirname, 'src'));
console.log('Done.');

