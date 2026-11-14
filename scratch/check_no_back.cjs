const fs = require('fs');
const audit = JSON.parse(fs.readFileSync('scratch/full_76_screens_back_audit.json', 'utf8'));

console.log('Screens WITHOUT back button:');
audit.filter(a => !a.hasBackButton).forEach(a => console.log(' - ' + a.name));

