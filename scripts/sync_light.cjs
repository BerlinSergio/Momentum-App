const fs = require('fs');
let light = fs.readFileSync('src/AboutMomentumLightMode.jsx', 'utf8');
const dark = fs.readFileSync('src/AboutMomentumDarkMode.jsx', 'utf8');

// 1. TOP HEADER BAR
// Find header in dark mode
const darkHeaderRegex = /<header.*?<\/header>/s;
const darkHeaderMatch = dark.match(darkHeaderRegex);
if (darkHeaderMatch) {
  const lightHeaderOuterRegex = /(<header className="fixed top-0 inset-x-0 z-50 pt-safe bg-surface-container-lowest\/70 backdrop-blur-2xl shadow-\[0_4px_24px_-4px_rgba\(80,110,180,0\.08\)\]">)(.*?)<\/header>/s;
  
  const darkInner = darkHeaderMatch[0].replace(/<header.*?>/, '').replace(/<\/header>$/, '');
  light = light.replace(lightHeaderOuterRegex, '$1' + darkInner + '</header>');
}

// 2. PURGE HERO LOGO ARTIFACTS
const darkLogoRegex = /{\/\*  Radiant Infinity Emblem  \*\/}\s*<div className="relative group cursor-pointer mt-4 mb-3">[\s\S]*?(?={\/\*  Wordmark)/;
const darkLogoMatch = dark.match(darkLogoRegex);

const lightLogoRegex = /{\/\*  Momentum Infinity Emblem  \*\/}\s*<div className="relative mt-4 mb-3">[\s\S]*?(?={\/\*  App Name)/;
if (darkLogoMatch) {
  light = light.replace(lightLogoRegex, darkLogoMatch[0]);
}

// 3. VISION & CRAFT CARD
const visionIconContainerRegex = /<div className="w-12 h-12 rounded-full bg-gradient-to-tr from-secondary to-primary-container p-0\.5 flex-shrink-0 shadow-md">\s*<div className="w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center">[\s\S]*?<\/div>\s*<\/div>/;
light = light.replace(visionIconContainerRegex, '<div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-sm"><span className="material-symbols-outlined text-[24px]" style={{fontVariationSettings: \'"FILL" 1\'}}>explore</span></div>');

const badgeRegex = /<span className="font-label-sm text-label-sm text-primary bg-primary-fixed\/60 px-space-sm py-0\.5 rounded-full font-medium">DESIGNER &bull; MILAD WARDAK 2026<\/span>/;
light = light.replace(badgeRegex, '<span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-slate-800 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full font-medium"><span className="material-symbols-outlined text-[13px] text-indigo-600">verified</span>DESIGNER &bull; MILAD WARDAK 2026</span>');

const visionFlexRegex = /<div className="flex items-start gap-space-md relative z-10">/;
light = light.replace(visionFlexRegex, '<div className="flex items-center gap-4 relative z-10">');

// 4. CORE PHILOSOPHY CARDS
light = light.replace(
  /<div className="w-full p-4 flex gap-space-md items-start shadow-sm border border-slate-200\/70 bg-white rounded-2xl">\s*<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0 mt-0\.5 text-primary">\s*<span className="material-symbols-outlined text-\[20px\\]".*?>calendar_today<\/span>\s*<\/div>/,
  '<div className="w-full p-4 flex items-center gap-4 shadow-sm border border-slate-200/70 bg-white rounded-2xl">\n<div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center flex-shrink-0">\n<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: \'"FILL" 1\'}}>calendar_month</span>\n</div>'
);

light = light.replace(
  /<div className="w-full p-4 flex gap-space-md items-start shadow-sm border border-slate-200\/70 bg-white rounded-2xl">\s*<div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0 mt-0\.5 text-tertiary">\s*<span className="material-symbols-outlined text-\[20px\\]".*?>shield_with_heart<\/span>\s*<\/div>/,
  '<div className="w-full p-4 flex items-center gap-4 shadow-sm border border-slate-200/70 bg-white rounded-2xl">\n<div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center flex-shrink-0">\n<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: \'"FILL" 1\'}}>enhanced_encryption</span>\n</div>'
);

light = light.replace(
  /<div className="w-full p-4 flex gap-space-md items-start shadow-sm border border-slate-200\/70 bg-white rounded-2xl">\s*<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0 mt-0\.5 text-secondary">\s*<span className="material-symbols-outlined text-\[20px\\]".*?>routine<\/span>\s*<\/div>/,
  '<div className="w-full p-4 flex items-center gap-4 shadow-sm border border-slate-200/70 bg-white rounded-2xl">\n<div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0">\n<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: \'"FILL" 1\'}}>wb_twilight</span>\n</div>'
);

fs.writeFileSync('src/AboutMomentumLightMode.jsx', light, 'utf8');
console.log("Updated light mode icons");
