const fs = require('fs');

function fixAvatar(file) {
  let code = fs.readFileSync(file, 'utf8');

  // 1. Add import
  if (!code.includes("import { User }")) {
      code = code.replace("import React from 'react';", "import React from 'react';\nimport { User } from 'lucide-react';");
  }

  // 2. Replace the img tag
  const imgRegex = /<img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="[^"]+"\/>/;
  
  const newAvatar = `<div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
    <User className="w-5 h-5 text-indigo-400" />
  </div>`;
  
  code = code.replace(imgRegex, newAvatar);
  
  // also check if there's any other broken img tags just in case
  const imgRegex2 = /<img[^>]*alt="Profile"[^>]*>/;
  code = code.replace(imgRegex2, newAvatar);

  fs.writeFileSync(file, code);
  console.log('Fixed avatar in', file);
}

fixAvatar('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx');
fixAvatar('src/AfghanSolarHijriShamsiCalendarLightMode.jsx');

