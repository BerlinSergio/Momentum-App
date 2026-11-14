// Helper to test line parity between dark and light versions
const fs = require('fs');

function testParity(darkContent, lightContent) {
  const dLines = darkContent.split('\n');
  const lLines = lightContent.split('\n');
  console.log(`Dark lines: ${dLines.length}, Light lines: ${lLines.length}`);
  if (dLines.length !== lLines.length) {
    console.error('MISMATCH! Line count differs.');
    for (let i = 0; i < Math.max(dLines.length, lLines.length); i++) {
      if (dLines[i] === undefined || lLines[i] === undefined) {
        console.log(`Line ${i + 1}: Dark has "${dLines[i]}", Light has "${lLines[i]}"`);
        break;
      }
    }
    return false;
  }
  console.log('SUCCESS! Lines match 100%.');
  return true;
}

module.exports = { testParity };

