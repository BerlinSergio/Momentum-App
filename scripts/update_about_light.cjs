const fs = require('fs');
let content = fs.readFileSync('src/AboutMomentumLightMode.jsx', 'utf8');

// 1. HERO SECTION
// Wrap hero block in lex flex-col items-center justify-center text-center
content = content.replace(
  /<div className="relative w-full rounded-lg bg-surface-container-lowest\/80 backdrop-blur-2xl shadow-\[0_12px_36px_-6px_rgba\(80,110,180,0\.12\)\] p-space-lg flex flex-col items-center text-center overflow-hidden">/g,
  '<div className="relative w-full rounded-2xl bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 p-5 flex flex-col items-center justify-center text-center overflow-hidden">'
);
// Center the icon circle with mt-4 mb-3
content = content.replace(
  /<div className="relative mb-space-md mt-space-xs">/g,
  '<div className="relative mt-4 mb-3">'
);
// Center title "Momentum" (	ext-slate-900 font-bold)
content = content.replace(
  /<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Momentum<\/h2>/g,
  '<h2 className="text-slate-900 font-bold tracking-tight text-3xl">Momentum</h2>'
);
// Replace Tagline
content = content.replace(
  /<p className="font-body-md text-body-md text-on-surface-variant max-w-\[290px\] mt-space-xs leading-relaxed">[\s\S]*?<\/p>/g,
  '<p className="text-center mx-auto max-w-xs text-sm leading-relaxed text-slate-600">\n      Where sacred time meets mindful living.\n    </p>'
);
// Replace Version Badge
content = content.replace(
  /<div className="mt-space-md inline-flex items-center gap-space-xs bg-surface-container px-space-md py-1 rounded-full shadow-sm">/g,
  '<div className="mx-auto inline-flex items-center justify-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-surface-container shadow-sm">'
);
content = content.replace(
  /Version 2\.4\.0 \(Build 2026\.10\).*Production Release/g,
  'VERSION 1.0 (BUILD 2026)'
);

// 2 & 3. VISION & CRAFT CARD
// Find the card container
content = content.replace(
  /<div className="relative w-full rounded-lg bg-surface-container-lowest\/80 backdrop-blur-2xl shadow-\[0_10px_30px_-5px_rgba\(80,110,180,0\.1\)\] p-space-lg overflow-hidden">/g,
  '<div className="relative w-full rounded-2xl bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 p-5 overflow-hidden">'
);
// Replace description
content = content.replace(
  /Conceived and engineered with deep intentionality, merging timeless Islamic heritage with cutting-edge mindful technology\./g,
  'Bridging timeless Islamic tradition with modern, mindful design.'
);
// Replace badge
content = content.replace(
  /Lead Designer &amp; Architect/g,
  'DESIGNER &bull; MILAD WARDAK'
);
content = content.replace(
  /<span className="font-label-sm text-label-sm text-on-surface-variant">• 2026<\/span>/g,
  '<span className="font-label-sm text-label-sm text-on-surface-variant">2026</span>'
);
// Actually it's easier to just replace the whole badge line
content = content.replace(
  /<div className="mt-space-md flex items-center gap-space-xs">[\s\S]*?<\/div>/,
  '<div className="mt-space-md flex items-center gap-space-xs"><span className="font-label-sm text-label-sm text-primary bg-primary-fixed/60 px-space-sm py-0.5 rounded-full font-medium">DESIGNER &bull; MILAD WARDAK 2026</span></div>'
);

// 4. CORE PHILOSOPHY CARDS
content = content.replace(
  /Seamless confluence of Gregorian civil schedules, Hijri lunar worship, and Afghan Solar seasonal rhythms\./g,
  'Unified flow of Gregorian, Hijri, and Afghan Solar calendars.'
);
content = content.replace(
  /Dynamic light and dark canvases calibrated to soothe your senses and respect your circadian flow\./g,
  'Adaptive themes crafted for visual calm and eye comfort.'
);
// Replace the wrapper space-y-2 to space-y-3
content = content.replace(
  /<div className="w-full flex flex-col space-y-2">/g,
  '<div className="w-full flex flex-col space-y-3">'
);
// Apply the shadow-sm border border-slate-200/70 bg-white rounded-2xl to the cards
content = content.replace(
  /<div className="w-full rounded-lg bg-surface-container-lowest\/80 backdrop-blur-2xl shadow-\[0_4px_20px_-2px_rgba\(80,110,180,0\.08\)\] p-space-md flex gap-space-md items-start">/g,
  '<div className="w-full p-4 flex gap-space-md items-start shadow-sm border border-slate-200/70 bg-white rounded-2xl">'
);

// 5. PRUNE UNWANTED ITEMS
// We will replace the Sanctuary & Trust section contents
const sanctuaryRegex = /<h3 className="font-label-md text-label-md uppercase tracking-wider text-outline">Sanctuary &amp; Trust<\/h3>[\s\S]*?<\/div>\s*<\/div>/;
const newSanctuary = '<h3 className="font-label-md text-label-md uppercase tracking-wider text-outline">Sanctuary &amp; Trust</h3>\n</div>\n<div className="w-full rounded-2xl bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 overflow-hidden">\n{/*  Link 1  */}\n<button className="w-full px-space-lg py-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors active:scale-[0.99]" type="button">\n<div className="flex items-center gap-space-md">\n<div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary">\n<span className="material-symbols-outlined text-[18px]">verified_user</span>\n</div>\n<span className="font-body-lg text-body-lg text-on-surface">Privacy Sanctuary (Zero Data Tracking)</span>\n</div>\n<span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>\n</button>\n</div>\n</div>';
content = content.replace(sanctuaryRegex, newSanctuary);

// Wait, the prompt says "Ensure all main cards (Vision & Craft, Core Philosophy cards, Sanctuary card) have a polished, elevated look with consistent shadows: Add: bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 rounded-2xl"
// But for Core philosophy cards it says: "ensure each card has the soft shadow (shadow-sm border border-slate-200/70 bg-white)"
// I applied the shadow-md one to Vision & Craft and Sanctuary, and the shadow-sm one to Core Philosophy cards.
// What about the Open Source & Craft section? The prompt didn't mention it to be pruned or restyled, but let's apply the shadow-md to it too if it's a main card, or maybe it should be removed? The prompt doesn't say to remove "Open Source & Craft" section, it says "Remove Open Source Attributions" which is a link inside Sanctuary & Trust!
// So I should style the Open Source & Craft card too.
content = content.replace(
  /<div className="w-full rounded-lg bg-surface-container-lowest\/80 backdrop-blur-2xl shadow-\[0_4px_20px_-2px_rgba\(80,110,180,0\.08\)\] p-space-lg flex flex-col space-y-space-md">/g,
  '<div className="w-full rounded-2xl bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 p-5 flex flex-col space-y-space-md">'
);

// 6. OVERALL LAYOUT & CONTAINER
content = content.replace(
  /<div className="flex flex-col w-full pb-28 space-y-4">/g,
  '<div className="w-full max-w-md mx-auto px-4 py-4 space-y-6 pb-20">'
);
// Also remove px-margin from main tag
content = content.replace(
  /<main className="flex flex-col relative w-full pt-16 pb-safe px-margin z-10 flex-1">/g,
  '<main className="flex flex-col relative w-full pt-16 pb-safe z-10 flex-1">'
);

fs.writeFileSync('src/AboutMomentumLightMode.jsx', content, 'utf8');
console.log('Updated successfully');
