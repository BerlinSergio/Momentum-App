const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'BiometricSettingsDarkMode.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Hero Subtitle Contrast
content = content.replace(
  /<p className="font-body-md text-body-md text-[^"]+ max-w-xs leading-relaxed">\s*Unlock Momentum instantly using Face ID or Touch ID sensor on this device\.\s*<\/p>/,
  `<p className="text-slate-300 text-xs sm:text-sm text-center leading-relaxed max-w-sm mx-auto">
  Unlock Momentum instantly using Face ID or Touch ID sensor on this device.
</p>`
);

// 2. "Configured (••••)" Badge Contrast
content = content.replace(
  /<span className="px-space-sm py-0\.5 rounded-full bg-surface-container-high[^>]*>\s*Configured \([^)]+\)\s*<\/span>/,
  `<span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 tracking-wide shadow-sm">
  Configured (••••)
</span>`
);

// 3. Fallback Mechanism Description Contrast
content = content.replace(
  /<p className="font-body-md text-body-md text-[^"]+ leading-relaxed">\s*Whenever lighting conditions are dim, sensors fail, or the device restarts, your configured PIN will automatically serve as the fallback unlock method\.\s*<\/p>/,
  `<p className="text-slate-300 text-xs leading-relaxed mt-2">
  Whenever lighting conditions are dim, sensors fail, or the device restarts, your configured PIN will automatically serve as the fallback unlock method.
</p>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done replacing content');

