const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'CitySelectionLightMode.jsx');
let content = fs.readFileSync(lightPath, 'utf8');

// 1. HEADER TITLE
content = content.replace(
  /<div className="absolute inset-x-16 flex items-center justify-center pointer-events-none">\s*<h1 className="font-headline-sm text-headline-sm text-on-surface truncate text-center font-semibold">Account &amp; Cloud Sync<\/h1>\s*<\/div>/,
  `<div className="absolute inset-x-16 flex items-center justify-center pointer-events-none">
  <div className="flex items-center gap-2">
    <span className="material-symbols-outlined text-[20px] text-indigo-600 flex-shrink-0">location_on</span>
    <h1 className="text-base font-bold text-slate-900 tracking-tight">Select City &amp; Location</h1>
  </div>
</div>`
);

// 2. CONTAINER CARDS
content = content.replace(
  /<section className="relative w-full rounded-2xl bg-surface-container-lowest\/80 backdrop-blur-xl p-5 shadow-\[0_12px_32px_-6px_rgba\(42,73,223,0\.12\)\] overflow-hidden transition-all duration-300">/,
  `<section className="relative w-full bg-white/95 border border-slate-200/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200/60 overflow-hidden transition-all duration-300">`
);

content = content.replace(
  /<input className="w-full h-12 pl-11 pr-10 rounded-2xl bg-surface-container-lowest\/80 backdrop-blur-xl font-body-lg text-body-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-0 shadow-sm"/g,
  `<input className="w-full py-3.5 pl-11 pr-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 placeholder:text-slate-400"`
);

content = content.replace(
  /<button className="w-full flex items-center justify-between p-3\.5 rounded-2xl bg-surface-container-lowest\/70 backdrop-blur-xl shadow-sm text-left hover:bg-surface-container-low active:scale-\[0\.99\] transition-all" id="gpsLocateBtn">/,
  `<button className="w-full flex items-center justify-between p-4 mb-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md text-left transition-all" id="gpsLocateBtn">`
);

// Remove wrapping section space-y-2.5 so it doesn't nest awkwardly, or just replace properly.
content = content.replace(/<section className="flex flex-col space-y-2\.5">/, `<section className="flex flex-col">`);

content = content.replace(
  /<section className="flex flex-col space-y-2" id="cityList">/,
  `<section className="bg-white/95 border border-slate-200/80 rounded-3xl p-4 mb-5 shadow-md shadow-slate-200/60 space-y-2.5" id="cityList">`
);

content = content.replace(
  /<section className="w-full rounded-2xl bg-surface-container-lowest\/70 backdrop-blur-xl p-4 shadow-sm">/,
  `<section className="bg-white/95 border border-slate-200/80 rounded-3xl p-4 mb-5 shadow-md shadow-slate-200/60 space-y-2.5">`
);

content = content.replace(
  /className="city-item w-full p-3\.5 rounded-2xl bg-surface-container-lowest\/90 backdrop-blur-xl shadow-\[0_6px_20px_-4px_rgba\(42,73,223,0\.15\)\] flex items-center justify-between cursor-pointer transition-transform active:scale-\[0\.99\]"/g,
  `className="city-item w-full rounded-2xl p-3.5 border border-indigo-200 bg-indigo-50/50 shadow-sm flex items-center justify-between cursor-pointer transition-transform"`
);
content = content.replace(
  /className="city-item w-full p-3\.5 rounded-2xl bg-surface-container-lowest\/70 backdrop-blur-xl shadow-sm flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-all active:scale-\[0\.99\]"/g,
  `className="city-item w-full rounded-2xl p-3.5 border border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 transition-all flex items-center justify-between cursor-pointer"`
);

// CATEGORY FILTER CHIPS
content = content.replace(
  /<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0\.5 -mx-margin px-margin">/,
  `<div className="flex items-center gap-2 overflow-x-auto py-2 mb-3 scrollbar-none -mx-margin px-margin">`
);

// BOTTOM ACTION BUTTON SPACING
content = content.replace(
  /<div className="fixed bottom-4 inset-x-margin z-40 max-w-\[calc\(100vw-2rem\)\] mx-auto">/,
  `<div className="fixed bottom-0 inset-x-0 z-40 px-margin pt-3 pb-6 bg-gradient-to-t from-white via-white/80 to-transparent">`
);

content = content.replace(
  /<button className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-\[0_12px_28px_-4px_rgba\(42,73,223,0\.45\)\] hover:opacity-95 active:scale-\[0\.98\] transition-all"/g,
  `<button className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"`
);

fs.writeFileSync(lightPath, content, 'utf8');
console.log('Light Mode Updated.');
