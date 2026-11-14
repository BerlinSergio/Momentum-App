const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jsx'));

console.log(`Auditing ${files.length} JSX files in src/...`);

const findings = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(srcDir, f), 'utf8');
  const lines = content.split('\n');
  
  // Check 1: BottomNav or BottomNavBar import or tag
  if (f !== 'App.jsx' && !f.includes('BottomNav')) {
    if (content.includes('BottomNavBar') || content.includes('BottomNav')) {
      findings.push({ file: f, type: 'Direct BottomNav reference' });
    }
  }

  // Check 2: Hardcoded navigation dock
  // Look for text matching "Floating Bottom Navigation" or "Floating Navigation Dock"
  if (content.includes('Floating Bottom Navigation') || content.includes('Floating Navigation Dock')) {
    findings.push({ file: f, type: 'Floating Bottom Navigation Comment/Dock' });
  }

  // Check 3: Look for multiple nav buttons (Home AND Finance AND Tasks)
  if (f !== 'App.jsx' && !f.includes('BottomNav') && !f.includes('AppLock')) {
    const hasHome = /setActiveTab\([^)]*home[^)]*\)/i.test(content) || /<span[^>]*>Home<\/span>/i.test(content);
    const hasFinance = /setActiveTab\([^)]*finance[^)]*\)/i.test(content) || /<span[^>]*>Finance<\/span>/i.test(content);
    const hasTasks = /setActiveTab\([^)]*task[^)]*\)/i.test(content) || /<span[^>]*>Tasks<\/span>/i.test(content);
    const hasMore = /setActiveTab\([^)]*more[^)]*\)/i.test(content) || /<span[^>]*>More<\/span>/i.test(content);

    if (hasHome && hasFinance && hasTasks) {
      findings.push({
        file: f,
        type: 'Suspected Navigation Dock (contains Home, Finance, Tasks)',
        hasHome, hasFinance, hasTasks, hasMore
      });
    }
  }
});

console.log('--- FINDINGS ---');
console.log(JSON.stringify(findings, null, 2));

