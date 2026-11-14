const fs = require('fs');
const path = require('path');

const tasbeehPairs = [
  ['DhikrHistoryDarkMode', 'DhikrHistoryLightMode'],
  ['NewEditTasbeehDarkMode', 'NewEditTasbeehLightMode'],
  ['TasbeehHistoryDarkMode', 'TasbeehHistoryLightMode'],
  ['TasbeehSettingsDarkMode', 'TasbeehSettingsLightMode'],
  ['TasbeehMainDarkMode', 'TasbeehMainLightMode'],
];

function updateTasbeeh(darkFile, lightFile) {
  const dPath = path.join('src', darkFile + '.jsx');
  const lPath = path.join('src', lightFile + '.jsx');
  let dContent = fs.readFileSync(dPath, 'utf8');
  let lContent = fs.readFileSync(lPath, 'utf8');

  const dEol = dContent.includes('\r\n') ? '\r\n' : '\n';
  const lEol = lContent.includes('\r\n') ? '\r\n' : '\n';

  // 1. Add UserAvatar import
  if (!dContent.includes('UserAvatar')) {
    const dLines = dContent.split(dEol);
    const idx = dLines.findIndex(l => l.startsWith('import '));
    dLines.splice(idx + 1, 0, "import UserAvatar from './components/UserAvatar';");
    dContent = dLines.join(dEol);
  }
  if (!lContent.includes('UserAvatar')) {
    const lLines = lContent.split(lEol);
    const idx = lLines.findIndex(l => l.startsWith('import '));
    lLines.splice(idx + 1, 0, "import UserAvatar from './components/UserAvatar';");
    lContent = lLines.join(lEol);
  }

  // 2. Replace button
  const dButtonRegex = /<button\s+type="button"\s+onClick=\{\(\) => setActiveTab && setActiveTab\('settings_profile_dark_mode'\)\}[^>]*>\s*A\s*<\/button>/s;
  const lButtonRegex = /<button\s+type="button"\s+onClick=\{\(\) => setActiveTab && setActiveTab\('settings_profile_light_mode'\)\}[^>]*>\s*A\s*<\/button>/s;

  const replacement = `<UserAvatar \n            setActiveTab={setActiveTab} \n          />`;

  if (!dButtonRegex.test(dContent)) {
    console.error(`Failed to match dark button in ${darkFile}`);
  } else {
    dContent = dContent.replace(dButtonRegex, replacement);
  }

  if (!lButtonRegex.test(lContent)) {
    console.error(`Failed to match light button in ${lightFile}`);
  } else {
    lContent = lContent.replace(lButtonRegex, replacement);
  }

  fs.writeFileSync(dPath, dContent, 'utf8');
  fs.writeFileSync(lPath, lContent, 'utf8');

  const dLines = fs.readFileSync(dPath, 'utf8').split('\n').length;
  const lLines = fs.readFileSync(lPath, 'utf8').split('\n').length;
  console.log(`${darkFile} vs ${lightFile}: ${dLines} vs ${lLines} -> ${dLines === lLines ? 'MATCH' : 'MISMATCH'}`);
}

tasbeehPairs.forEach(([d, l]) => updateTasbeeh(d, l));

