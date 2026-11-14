const fs = require('fs');

function updateSettings(filePath, isDark) {
  let content = fs.readFileSync(filePath, 'utf8');
  const targetEdit = isDark ? 'edit_profile_dark_mode' : 'edit_profile_light_mode';
  const nameColor = isDark ? 'text-white' : 'text-slate-900';
  const subtextColor = isDark ? 'text-slate-400' : 'text-slate-500';

  // 1. Add import
  content = content.replace(
    "import React from 'react';\nimport {",
    "import React from 'react';\nimport { useProfileStore } from './store/useProfileStore';\nimport {"
  );

  // 2. Add profile hook
  const funcDecl = isDark ? 'export default function SettingsProfileDarkMode({ setActiveTab, goBack }) {' : 'export default function SettingsProfileLightMode({ setActiveTab, goBack }) {';
  content = content.replace(
    funcDecl + '\n  return (',
    funcDecl + '\n  const profile = useProfileStore();\n  return ('
  );

  // 3. Update avatar and camera button
  // Dark:
  // <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-slate-800 shadow-sm bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xl">
  //   <img src="/avatar.jpg" alt="Aisha" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
  //   <span className="hidden">A</span>
  // </div>
  // <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-xs ring-2 ring-slate-900 hover:bg-primary transition-colors">
  content = content.replace(
    /<img src="\/avatar\.jpg" alt="Aisha" className="w-full h-full object-cover" onError={\(e\) => { e\.target\.style\.display='none'; e\.target\.nextSibling\.style\.display='flex' }} \/>\s*<span className="hidden">A<\/span>/,
    `{profile.avatar ? <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <span>{profile.fullName ? profile.fullName.charAt(0).toUpperCase() : 'A'}</span>}`
  );

  content = content.replace(
    /button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-xs ring-2 (ring-slate-900|ring-white) hover:bg-primary transition-colors"/,
    `button onClick={() => (setActiveTab ? setActiveTab('${targetEdit}') : null)} className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-xs ring-2 $1 hover:bg-primary transition-colors cursor-pointer"`
  );

  // 4. Update Full Name and City in hero card
  content = content.replace(
    `<h2 className="text-lg font-bold ${nameColor}">Aisha Rahmani</h2>`,
    `<h2 className="text-lg font-bold ${nameColor}">{profile.fullName || 'Aisha Rahmani'}</h2>`
  );

  content = content.replace(
    `Living intentionally • Kabul, Afghanistan`,
    `Living intentionally • {profile.city || 'Kabul, Afghanistan'}`
  );

  // 5. Update Account & Personal Credentials button to navigate
  content = content.replace(
    /<button className="w-full py-2.5 px-4 rounded-2xl (bg-slate-800\/60 hover:bg-slate-800 border border-slate-700|bg-primary\/10 hover:bg-primary\/10 border border-primary\/20) text-primary text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs mt-2">/,
    `<button onClick={() => (setActiveTab ? setActiveTab('${targetEdit}') : null)} className="w-full py-2.5 px-4 rounded-2xl $1 text-primary text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs mt-2 cursor-pointer">`
  );

  // 6. Update Legal Name button
  content = content.replace(
    /<button className="w-full p-3 rounded-2xl (hover:bg-slate-800\/60 border border-transparent hover:border-slate-700|hover:bg-slate-50\/80 border border-transparent hover:border-slate-100) flex items-center justify-between transition-colors group">/,
    `<button onClick={() => (setActiveTab ? setActiveTab('${targetEdit}') : null)} className="w-full p-3 rounded-2xl $1 flex items-center justify-between transition-colors group cursor-pointer">`
  );

  content = content.replace(
    `<p className="text-[11px] font-normal ${subtextColor}">Aisha Rahmani</p>`,
    `<p className="text-[11px] font-normal ${subtextColor}">{profile.fullName || 'Aisha Rahmani'}</p>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

updateSettings('src/SettingsProfileDarkMode.jsx', true);
updateSettings('src/SettingsProfileLightMode.jsx', false);

console.log('Updated SettingsProfileDarkMode and SettingsProfileLightMode');

