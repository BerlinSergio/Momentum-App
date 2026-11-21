const fs = require('fs');

function updateLightMode() {
  let content = fs.readFileSync('src/AfghanSolarHijriShamsiCalendarLightMode.jsx', 'utf8');

  // 1. Fix Header
  content = content.replace(
    /<h1 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">Quick Create Event<\/h1>/,
    '<h1 className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">Afghan Solar Calendar</h1>'
  );

  // 2. Wrap main container sections in cards
  // Currently they are wrapped in:
  // `<div className="w-full rounded-2xl bg-surface-container-lowest/80 backdrop-blur-xl p-space-md shadow-sm flex flex-col space-y-2">`
  content = content.replace(
    /className="w-full rounded-2xl bg-surface-container-lowest\/80 backdrop-blur-xl p-space-md shadow-sm flex flex-col space-y-2"/g,
    'className="bg-white/95 border border-slate-200/80 shadow-md shadow-slate-200/60 rounded-3xl p-5 mb-4 space-y-4"'
  );
  
  // Section Titles
  content = content.replace(
    /className="font-headline-sm text-headline-sm text-on-surface"/g,
    'className="text-base font-bold tracking-tight text-slate-900"'
  );
  content = content.replace(
    /className="font-headline-md text-headline-md text-on-surface"/g,
    'className="text-base font-bold tracking-tight text-slate-900"'
  );

  // Subtitles
  content = content.replace(
    /className="font-label-sm text-label-sm text-primary"/g,
    'className="text-xs font-normal text-slate-500"'
  );
  content = content.replace(
    /className="font-label-sm text-label-sm text-on-surface-variant"/g,
    'className="text-xs font-normal text-slate-500"'
  );
  
  // 3. Calendar Grid
  content = content.replace(
    /className="grid grid-cols-7 gap-1 text-center pb-1"/g,
    'className="grid grid-cols-7 gap-1.5 text-center"'
  );
  content = content.replace(
    /className="grid grid-cols-7 gap-1"/g,
    'className="grid grid-cols-7 gap-1.5 text-center"'
  );
  
  // Day Name Headers (Jom Accent)
  content = content.replace(
    /className="flex flex-col py-1 rounded-lg bg-secondary-fixed\/30 text-secondary"/,
    'className="flex flex-col items-center text-indigo-600"'
  );
  
  // 4. 1:1 Component Sync
  // Date badges in highlights
  content = content.replace(
    /className="w-10 h-10 rounded-xl bg-primary-fixed flex flex-col items-center justify-center shrink-0"/g,
    'className="rounded-2xl w-12 h-12 bg-blue-100 text-blue-600 flex flex-col items-center justify-center shrink-0"'
  );
  content = content.replace(
    /className="w-10 h-10 rounded-xl bg-secondary-fixed flex flex-col items-center justify-center shrink-0"/g,
    'className="rounded-2xl w-12 h-12 bg-indigo-100 text-indigo-600 flex flex-col items-center justify-center shrink-0"'
  );
  content = content.replace(
    /className="w-10 h-10 rounded-xl bg-surface-container-highest flex flex-col items-center justify-center shrink-0"/g,
    'className="rounded-2xl w-12 h-12 bg-slate-100 text-slate-600 flex flex-col items-center justify-center shrink-0"'
  );

  // Bottom button
  content = content.replace(
    /className="w-full py-3\.5 px-space-lg rounded-2xl bg-gradient-to-r from-primary via-secondary to-tertiary text-on-primary font-headline-sm text-headline-sm shadow-md hover:opacity-95 active:scale-\[0\.99\] transition-all flex items-center justify-center gap-2"/,
    'className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-semibold text-base shadow-md shadow-indigo-200 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"'
  );

  fs.writeFileSync('src/AfghanSolarHijriShamsiCalendarLightMode.jsx', content);
}

function updateDarkMode() {
  let content = fs.readFileSync('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx', 'utf8');

  // Wrap main container sections in cards
  content = content.replace(
    /className="flex flex-col rounded-xl bg-surface-container-low\/70 backdrop-blur-xl p-space-md shadow-xl"/g,
    'className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-4 flex flex-col"'
  );
  content = content.replace(
    /className="flex flex-col rounded-xl bg-surface-container-low\/70 backdrop-blur-xl p-space-md shadow-xl relative overflow-hidden"/g,
    'className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-4 flex flex-col relative overflow-hidden"'
  );
  content = content.replace(
    /className="relative w-full rounded-2xl bg-surface-container-low\/70 backdrop-blur-xl p-space-lg shadow-sm overflow-hidden"/g,
    'className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-4 relative overflow-hidden"'
  );

  // Section Titles
  content = content.replace(
    /className="font-headline-sm text-headline-sm text-on-surface"/g,
    'className="text-base font-bold tracking-tight text-white"'
  );
  content = content.replace(
    /className="font-headline-md text-headline-md text-on-surface"/g,
    'className="text-base font-bold tracking-tight text-white"'
  );

  // Subtitles
  content = content.replace(
    /className="font-label-sm text-label-sm text-primary"/g,
    'className="text-xs font-normal text-slate-400"'
  );
  content = content.replace(
    /className="font-label-sm text-label-sm text-on-surface-variant"/g,
    'className="text-xs font-normal text-slate-400"'
  );

  // 3. Calendar Grid
  content = content.replace(
    /className="grid grid-cols-7 gap-1 text-center mb-space-sm pb-space-xs"/g,
    'className="grid grid-cols-7 gap-1.5 text-center"'
  );
  content = content.replace(
    /className="grid grid-cols-7 gap-1 text-center"/g,
    'className="grid grid-cols-7 gap-1.5 text-center"'
  );
  
  // Day Name Headers (Jom Accent)
  content = content.replace(
    /className="flex flex-col items-center text-tertiary"/g,
    'className="flex flex-col items-center text-indigo-400"'
  );

  // Date badges in highlights
  content = content.replace(
    /className="w-10 h-10 rounded-xl bg-primary-fixed flex flex-col items-center justify-center shrink-0"/g,
    'className="rounded-2xl w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 flex flex-col items-center justify-center shrink-0"'
  );
  content = content.replace(
    /className="w-10 h-10 rounded-xl bg-secondary-fixed flex flex-col items-center justify-center shrink-0"/g,
    'className="rounded-2xl w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex flex-col items-center justify-center shrink-0"'
  );
  content = content.replace(
    /className="w-10 h-10 rounded-xl bg-surface-container-highest flex flex-col items-center justify-center shrink-0"/g,
    'className="rounded-2xl w-12 h-12 bg-slate-800/50 border border-slate-700 text-slate-300 flex flex-col items-center justify-center shrink-0"'
  );

  // Bottom button
  content = content.replace(
    /className="w-full py-3\.5 px-space-lg rounded-2xl bg-gradient-to-r from-primary via-secondary to-tertiary text-on-primary font-headline-sm text-headline-sm shadow-md hover:opacity-95 active:scale-\[0\.99\] transition-all flex items-center justify-center gap-2"/,
    'className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-semibold text-base shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 hover:bg-indigo-500 transition-colors"'
  );

  fs.writeFileSync('src/AfghanSolarHijriShamsiCalendarDarkMode.jsx', content);
}

try {
  updateLightMode();
  updateDarkMode();
  console.log('Update Calendar modes complete!');
} catch(e) {
  console.error(e);
}
