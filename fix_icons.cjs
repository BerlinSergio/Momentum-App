const fs = require('fs');
let content = fs.readFileSync('src/AboutMomentumLightMode.jsx', 'utf8');

content = content.replace(
    /<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0 mt-0.5 text-primary">\s*<span className="material-symbols-outlined text-\[20px\]" style={{fontVariationSettings: '"FILL" 1'}}>calendar_today<\/span>\s*<\/div>/,
    `<div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-sm">\n    <span className="material-symbols-outlined text-[20px]">calendar_month</span>\n  </div>`
);

content = content.replace(
    /<div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0 mt-0.5 text-tertiary">\s*<span className="material-symbols-outlined text-\[20px\]" style={{fontVariationSettings: '"FILL" 1'}}>shield_with_heart<\/span>\s*<\/div>/,
    `<div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">\n    <span className="material-symbols-outlined text-[20px]">enhanced_encryption</span>\n  </div>`
);

content = content.replace(
    /<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0 mt-0.5 text-secondary">\s*<span className="material-symbols-outlined text-\[20px\]" style={{fontVariationSettings: '"FILL" 1'}}>routine<\/span>\s*<\/div>/,
    `<div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0 shadow-sm">\n    <span className="material-symbols-outlined text-[20px]">wb_twilight</span>\n  </div>`
);

fs.writeFileSync('src/AboutMomentumLightMode.jsx', content);
console.log("Done");
