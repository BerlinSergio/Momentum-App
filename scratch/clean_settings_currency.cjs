const fs = require('fs');

function removeBaseCurrencyButton(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  
  // Find index of Base Currency
  const baseCurrencyIdx = lines.findIndex((l) => l.includes('Base Currency'));
  if (baseCurrencyIdx === -1) {
    console.error(`Base Currency not found in ${filePath}`);
    process.exit(1);
  }

  // Find start of button (<button ...) above baseCurrencyIdx
  let startIdx = baseCurrencyIdx;
  while (startIdx > 0 && !lines[startIdx].includes('<button')) {
    startIdx--;
  }

  // Find end of button (</button>) below baseCurrencyIdx
  let endIdx = baseCurrencyIdx;
  while (endIdx < lines.length && !lines[endIdx].includes('</button>')) {
    endIdx++;
  }

  // If there's an empty line after </button>, include it
  if (endIdx + 1 < lines.length && lines[endIdx + 1].trim() === '') {
    endIdx++;
  }

  console.log(`Removing lines ${startIdx} to ${endIdx} in ${filePath}`);
  lines.splice(startIdx, endIdx - startIdx + 1);

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

removeBaseCurrencyButton('src/SettingsProfileDarkMode.jsx');
removeBaseCurrencyButton('src/SettingsProfileLightMode.jsx');

const dLines = fs.readFileSync('src/SettingsProfileDarkMode.jsx', 'utf8').split(/\r?\n/).length;
const lLines = fs.readFileSync('src/SettingsProfileLightMode.jsx', 'utf8').split(/\r?\n/).length;

console.log(`SettingsProfile: Dark (${dLines}) vs Light (${lLines})`);
if (dLines === lLines) {
  console.log('✓ EXACT 1:1 LINE COUNT MATCH');
} else {
  console.error('MISMATCH');
  process.exit(1);
}
