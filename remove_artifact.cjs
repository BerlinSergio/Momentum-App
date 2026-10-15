const fs = require('fs');
let content = fs.readFileSync('src/AboutMomentumLightMode.jsx', 'utf8');

const artifactRegex = /<div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface-container-low flex items-center justify-center shadow-md">\s*<span className="material-symbols-outlined text-\[14px\] text-secondary" style={{fontVariationSettings: '"FILL" 1'}}>arrow_back_ios_new<\/span>\s*<\/div>/g;

content = content.replace(artifactRegex, '');
fs.writeFileSync('src/AboutMomentumLightMode.jsx', content);
console.log("Artifact removed.");
