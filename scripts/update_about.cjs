const fs = require('fs');
let content = fs.readFileSync('src/AboutMomentumDarkMode.jsx', 'utf8');

// 1. HERO SECTION
content = content.replace(
  /<section className="flex flex-col items-center text-center px-gutter-mobile pt-6 pb-8 relative">/g,
  '<section className="flex flex-col items-center justify-center text-center pt-6 relative">'
);
content = content.replace(
  /<div className="relative group cursor-pointer my-2">/g,
  '<div className="relative group cursor-pointer mt-4 mb-3">'
);
content = content.replace(
  /<p className="font-body-md text-body-md text-on-surface-variant max-w-xs mt-2 px-1 leading-relaxed">[\s\S]*?<\/p>/g,
  '<p className="text-center mx-auto max-w-xs text-sm leading-relaxed text-slate-300 mt-2 px-1">\n      Where sacred time meets mindful living.\n    </p>'
);
content = content.replace(
  /<div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-surface-container-low shadow-sm">/g,
  '<div className="mx-auto inline-flex items-center justify-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-surface-container-low shadow-sm">'
);
content = content.replace(
  /Version 2\.4\.0 \(Build 2026\.10\).*Production Release/g,
  'VERSION 1.0 (BUILD 2026)'
);

// 2. VISION & CRAFT CARD
content = content.replace(
  /<div className="relative overflow-hidden rounded-xl bg-surface-container-low p-5 shadow-lg backdrop-blur-xl">/g,
  '<div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-5 shadow-lg backdrop-blur-xl">'
);
content = content.replace(
  /Conceived and engineered with deep intentionality, merging timeless Islamic heritage with cutting-edge mindful technology\./g,
  'Bridging timeless Islamic tradition with modern, mindful design.'
);
content = content.replace(
  /Lead Designer &amp; Architect \u00e2\u20ac\u00a2 2026/g,
  'DESIGNER &bull; MILAD WARDAK 2026'
);
content = content.replace(
  /Lead Designer &amp; Architect • 2026/g,
  'DESIGNER &bull; MILAD WARDAK 2026'
);

// 3. CORE PHILOSOPHY CARDS
content = content.replace(
  /Seamless confluence of Gregorian civil schedules, Hijri lunar worship, and Afghan Solar seasonal rhythms\./g,
  'Unified flow of Gregorian, Hijri, and Afghan Solar calendars.'
);
content = content.replace(
  /Dynamic light and dark canvases calibrated to soothe your senses and respect your circadian flow\./g,
  'Adaptive themes crafted for visual calm and eye comfort.'
);
content = content.replace(
  /<div className="flex flex-col gap-3">/g,
  '<div className="flex flex-col space-y-3">'
);

// 4. PRUNE LIST ITEMS UNDER SANCTUARY & TRUST
const sanctuaryRegex = /<h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Sanctuary &amp; Trust<\/h3>[\s\S]*?(?=<\/section>)/;
const newSanctuary = '<h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Sanctuary &amp; Trust</h3>\n</div>\n<div className="rounded-xl bg-surface-container-low overflow-hidden shadow-sm flex flex-col">\n{/*  Item 1  */}\n<button className="w-full flex items-center justify-between p-3.5 px-4 text-left hover:bg-surface-container-high/60 active:bg-surface-container-high transition-colors group" type="button">\n<div className="flex items-center gap-3 min-w-0">\n<div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">\n<span className="material-symbols-outlined text-[18px]">shield</span>\n</div>\n<span className="font-body-md text-body-md text-on-surface truncate">Privacy Sanctuary (Zero Data Tracking)</span>\n</div>\n<span className="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">chevron_right</span>\n</button>\n</div>\n';
content = content.replace(sanctuaryRegex, newSanctuary);

// 5. OVERALL VERTICAL RHYTHM & CONTAINER BALANCE
content = content.replace(
  /<div className="flex flex-col w-full pb-12 select-none overflow-hidden relative">/g,
  '<div className="w-full max-w-md mx-auto px-4 py-4 space-y-6 pb-20 select-none overflow-hidden relative">'
);
content = content.replace(/className="([^"]*) mb-6"/g, 'className="\"');
content = content.replace(/className="([^"]*) mb-8"/g, 'className="\"');
content = content.replace(/className="px-gutter-mobile"/g, 'className=""');

fs.writeFileSync('src/AboutMomentumDarkMode.jsx', content, 'utf8');
console.log('Updated successfully');
