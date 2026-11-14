const fs = require('fs');

// 1. Update HomeDashboard Dark & Light
function updateHome(filePath, isDark) {
  let content = fs.readFileSync(filePath, 'utf8');
  const targetProfile = isDark ? 'settings_profile_dark_mode' : 'settings_profile_light_mode';
  const nameColor = isDark ? 'text-white' : 'text-slate-900';
  const initialColor = isDark ? 'text-slate-400' : 'text-slate-900';

  // Import useProfileStore & User icon
  content = content.replace(
    "import { Sparkles, Bell, Wallet,",
    "import { useProfileStore } from './store/useProfileStore';\nimport { User, Sparkles, Bell, Wallet,"
  );

  // Hook subscription
  const funcDecl = isDark ? 'export default function HomeDashboardDarkMode({ setActiveTab }) {' : 'export default function HomeDashboardLightMode({ setActiveTab }) {';
  content = content.replace(
    funcDecl,
    `${funcDecl}\n  const profile = useProfileStore();`
  );

  // Header avatar
  content = content.replace(
    /<div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold text-xs flex items-center justify-center shadow-sm">\s*A\s*<\/div>/,
    `<div onClick={() => (setActiveTab ? setActiveTab('${targetProfile}') : null)} className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold text-xs flex items-center justify-center shadow-sm overflow-hidden cursor-pointer">{profile.avatar ? <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" /> : (profile.fullName && profile.fullName.trim() ? profile.fullName.trim().charAt(0).toUpperCase() : <User className="w-4 h-4 text-white/90" />)}</div>`
  );

  // Greeting
  content = content.replace(
    `Good morning, Aisha`,
    `Good morning{profile.fullName && profile.fullName.trim() ? \`, \${profile.fullName.trim().split(' ')[0]}\` : ''}`
  );

  // Hero avatar
  content = content.replace(
    /<span className="text-lg font-bold (text-slate-400|text-slate-900)"[^>]*>A<\/span>/,
    `{profile.avatar ? <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <span className="text-lg font-bold ${initialColor}">{profile.fullName && profile.fullName.trim() ? profile.fullName.trim().charAt(0).toUpperCase() : 'U'}</span>}`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

// 2. Update DailyRoutine Dark & Light
function updateDailyRoutine(filePath, isDark) {
  let content = fs.readFileSync(filePath, 'utf8');
  const targetProfile = isDark ? 'settings_profile_dark_mode' : 'settings_profile_light_mode';

  // Import
  content = content.replace(
    "import { useRoutineStore } from './store/useRoutineStore';",
    "import { useProfileStore } from './store/useProfileStore';\nimport { useRoutineStore } from './store/useRoutineStore';"
  );

  // Hook subscription
  const funcDecl = isDark ? 'export default function DailyRoutineDarkMode({ setActiveTab, goBack }) {' : 'export default function DailyRoutineLightMode({ setActiveTab, goBack }) {';
  content = content.replace(
    funcDecl,
    `${funcDecl}\n  const profile = useProfileStore();`
  );

  // Header avatar button
  content = content.replace(
    /<button \s*type="button"\s*aria-label="User Profile & Settings"\s*onClick=\{\(\) => navigateScreen\('settings_profile_(dark|light)_mode'\)\}\s*className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold text-xs flex items-center justify-center shadow-sm transition-transform active:scale-95 hover:scale-105 cursor-pointer"\s*>\s*A\s*<\/button>/,
    `<button type="button" aria-label="User Profile & Settings" onClick={() => navigateScreen('${targetProfile}')} className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold text-xs flex items-center justify-center shadow-sm transition-transform active:scale-95 hover:scale-105 cursor-pointer overflow-hidden">{profile.avatar ? <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" /> : (profile.fullName && profile.fullName.trim() ? profile.fullName.trim().charAt(0).toUpperCase() : 'U')}</button>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

// 3. Update SettingsProfile Dark & Light (remove Aisha Rahmani fallback)
function updateSettingsProfile(filePath, isDark) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\{profile\.fullName \|\| 'Aisha Rahmani'\}/g, "{profile.fullName || 'User Profile'}");
  content = content.replace(/\{profile\.fullName \|\| 'Aisha Rahmani'\}/g, "{profile.fullName || 'Not set'}");
  fs.writeFileSync(filePath, content, 'utf8');
}

updateHome('src/HomeDashboardDarkMode.jsx', true);
updateHome('src/HomeDashboardLightMode.jsx', false);

updateDailyRoutine('src/DailyRoutineDarkMode.jsx', true);
updateDailyRoutine('src/DailyRoutineLightMode.jsx', false);

updateSettingsProfile('src/SettingsProfileDarkMode.jsx', true);
updateSettingsProfile('src/SettingsProfileLightMode.jsx', false);

console.log('Successfully synchronized profile state across Home, DailyRoutine, and SettingsProfile');

