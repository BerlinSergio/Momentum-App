const fs = require('fs');

function fixAvatarAgain(file) {
  let code = fs.readFileSync(file, 'utf8');

  code = code.replace("import { User } from 'lucide-react';\n", "");
  code = code.replace("import { User } from 'lucide-react';", "");

  const userRegex = /<User className="w-5 h-5 text-indigo-400" \/>/g;
  const newAvatar = `<span className="material-symbols-outlined text-[20px] text-indigo-400">person</span>`;
  
  code = code.replace(userRegex, newAvatar);

  fs.writeFileSync(file, code);
  console.log('Fixed avatar (again) in', file);
}

fixAvatarAgain('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx');
fixAvatarAgain('src/AfghanSolarHijriShamsiCalendarLightMode.jsx');

