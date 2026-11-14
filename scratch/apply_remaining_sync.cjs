const fs = require('fs');
const path = require('path');

function addImportIfNotPresent(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const eol = content.includes('\r\n') ? '\r\n' : '\n';
  if (!content.includes('UserAvatar')) {
    const lines = content.split(eol);
    const idx = lines.findIndex(l => l.startsWith('import '));
    lines.splice(idx + 1, 0, "import UserAvatar from './components/UserAvatar';");
    content = lines.join(eol);
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

// 1. Appearance
['AppearanceDarkMode.jsx', 'AppearanceLightMode.jsx'].forEach(f => {
  const p = path.join('src', f);
  addImportIfNotPresent(p);
  let content = fs.readFileSync(p, 'utf8');
  const target = `<div\n            className="w-9 h-9 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-sm transition-colors duration-300"\n            style={{ backgroundColor: activeAuraPreset.hex }}\n          >\n            A\n          </div>`;
  const replacement = `<UserAvatar \n            setActiveTab={setActiveTab} \n          />`;
  content = content.replace(/\r\n/g, '\n').replace(target, replacement);
  fs.writeFileSync(p, content, 'utf8');
});

// 2. More
['MoreDarkMode.jsx', 'MoreLightMode.jsx'].forEach(f => {
  const p = path.join('src', f);
  addImportIfNotPresent(p);
  let content = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  const headerTarget = `<div className="w-9 h-9 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shadow-sm">\n            U\n          </div>`;
  const headerReplacement = `<UserAvatar \n            setActiveTab={setActiveTab} \n          />`;
  content = content.replace(headerTarget, headerReplacement);

  const cardTarget = `<div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center font-bold text-xl shadow-md shadow-primary/30">\n              A\n            </div>`;
  const cardReplacement = `<UserAvatar \n              size="w-14 h-14" \n              textSize="text-xl" \n              setActiveTab={setActiveTab} \n            />`;
  content = content.replace(cardTarget, cardReplacement);
  fs.writeFileSync(p, content, 'utf8');
});

// 3. SettingsProfile
['SettingsProfileDarkMode.jsx', 'SettingsProfileLightMode.jsx'].forEach(f => {
  const p = path.join('src', f);
  addImportIfNotPresent(p);
  let content = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  const target = `<div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold text-xs flex items-center justify-center shadow-sm overflow-hidden">\n            {profile.avatar ? <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" /> : (profile.fullName && profile.fullName.trim() ? profile.fullName.trim().charAt(0).toUpperCase() : 'A')}\n          </div>`;
  const replacement = `<UserAvatar \n            setActiveTab={setActiveTab} \n          />`;
  content = content.replace(target, replacement);
  fs.writeFileSync(p, content, 'utf8');
});

// 4. EditProfile
['EditProfileDarkMode.jsx', 'EditProfileLightMode.jsx'].forEach(f => {
  const p = path.join('src', f);
  addImportIfNotPresent(p);
  let content = fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
  const target = `<div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold text-xs flex items-center justify-center shadow-sm overflow-hidden">\n            {avatar ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" /> : (fullName && fullName.trim() ? fullName.trim().charAt(0).toUpperCase() : <User className="w-4 h-4 text-white/90" />)}\n          </div>`;
  const replacement = `<UserAvatar \n            setActiveTab={setActiveTab} \n          />`;
  content = content.replace(target, replacement);
  fs.writeFileSync(p, content, 'utf8');
});

const checkPairs = [
  ['AppearanceDarkMode', 'AppearanceLightMode'],
  ['MoreDarkMode', 'MoreLightMode'],
  ['SettingsProfileDarkMode', 'SettingsProfileLightMode'],
  ['EditProfileDarkMode', 'EditProfileLightMode'],
];

checkPairs.forEach(([d, l]) => {
  const dLines = fs.readFileSync(`src/${d}.jsx`, 'utf8').split('\n').length;
  const lLines = fs.readFileSync(`src/${l}.jsx`, 'utf8').split('\n').length;
  console.log(`${d} vs ${l}: ${dLines} vs ${lLines} -> ${dLines === lLines ? 'MATCH' : 'MISMATCH'}`);
});

