const fs = require('fs');
const path = 'c:\\momentum\\src\\AfghanSolarHijriShamsiCalendarDarkMode.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. SECTION CONTAINER ARCHITECTURE
// The goal is to wrap Month Navigation & Calendar Grid into one Card.
// Current Month Navigation is:
// <section className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-4 flex flex-col relative overflow-hidden">
// ends with </section> around line 44, followed by:
// {/*  Afghan Solar Calendar Grid Card  */}
// <section className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 mb-4 shadow-md flex flex-col">

const newContainerStyle = 'bg-slate-900/85 border border-slate-800/80 rounded-3xl p-5 mb-4 shadow-lg shadow-black/20 flex flex-col';

// Replace the first two sections (Month Navigation + Calendar Grid) into ONE section
content = content.replace(
  /<section className="bg-slate-900\/80 border border-slate-800\/80 rounded-3xl p-5 mb-4 flex flex-col relative overflow-hidden">([\s\S]*?)<\/section>\s*\{\/\*\s*Afghan Solar Calendar Grid Card\s*\*\/\}\s*<section className="bg-slate-900\/80 border border-slate-800\/80 rounded-3xl p-5 mb-4 shadow-md flex flex-col">([\s\S]*?)<\/section>/g,
  `<section className="${newContainerStyle} relative overflow-hidden">\n$1\n{/* Afghan Solar Calendar Grid Card */}\n<div className="mt-4 flex flex-col">\n$2\n</div>\n</section>`
);

// Update other section containers to the new style
content = content.replace(
  /<section className="bg-slate-900\/80 border border-slate-800\/80 rounded-3xl p-5 mb-4 shadow-md flex flex-col">/g,
  `<section className="${newContainerStyle}">`
);
content = content.replace(
  /<section className="flex flex-col space-y-space-sm">/g,
  `<section className="${newContainerStyle} space-y-space-sm">`
);

// 2. CALENDAR GRID LAYOUT & TYPOGRAPHY SYNCHRONIZATION
// Day cells: Equal dimensions, rounded-xl
content = content.replace(
  /min-h-\[58px\] p-1 flex flex-col items-center justify-between rounded-xl transition-all hover:bg-slate-800 cursor-pointer/g,
  'min-h-[56px] flex flex-col items-center justify-between p-1 rounded-xl hover:bg-slate-800/50 transition-all cursor-pointer'
);
content = content.replace(
  /min-h-\[58px\] p-1 flex flex-col items-center justify-between rounded-xl transition-all opacity-40 bg-slate-800\/30/g,
  'min-h-[56px] flex flex-col items-center justify-between p-1 rounded-xl transition-all opacity-40 bg-slate-800/30'
);

// Column headers
content = content.replace(
  /<div className="grid grid-cols-7 gap-1 text-center mb-2 pb-1">([\s\S]*?)<\/div>/,
  (match, p1) => {
    return `<div className="grid grid-cols-7 gap-1 text-center mb-2 pb-1">
<div className="flex flex-col items-center">
<span className="text-xs font-normal text-slate-400 uppercase">Sh</span>
<span className="text-xs font-normal text-slate-300">شنبه</span>
</div>
<div className="flex flex-col items-center">
<span className="text-xs font-normal text-slate-400 uppercase">Yak</span>
<span className="text-xs font-normal text-slate-300">یکشنبه</span>
</div>
<div className="flex flex-col items-center">
<span className="text-xs font-normal text-slate-400 uppercase">Do</span>
<span className="text-xs font-normal text-slate-300">دوشنبه</span>
</div>
<div className="flex flex-col items-center">
<span className="text-xs font-normal text-slate-400 uppercase">Seh</span>
<span className="text-xs font-normal text-slate-300">سه‌شنبه</span>
</div>
<div className="flex flex-col items-center">
<span className="text-xs font-normal text-slate-400 uppercase">Ch</span>
<span className="text-xs font-normal text-slate-300">چهارشنبه</span>
</div>
<div className="flex flex-col items-center">
<span className="text-xs font-normal text-slate-400 uppercase">Panj</span>
<span className="text-xs font-normal text-slate-300">پنجشنبه</span>
</div>
<div className="flex flex-col items-center text-tertiary">
<span className="text-xs font-normal text-slate-400 uppercase opacity-80">Jom</span>
<span className="text-xs font-bold text-indigo-400">جمعه</span>
</div>
</div>`;
  }
);


// "TODAY" cell:
const todayCellRegex = /<div className="h-14 rounded-lg bg-gradient-to-br from-primary via-primary-container to-secondary-container text-on-primary flex flex-col items-center justify-center relative p-0\.5 shadow-lg shadow-primary\/30 transform scale-\[1\.03\] z-10">([\s\S]*?)<\/div>/;
content = content.replace(todayCellRegex, `<div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full p-1.5 shadow-md shadow-indigo-500/40 font-bold flex flex-col items-center justify-center min-h-[56px] z-10 cursor-pointer">
<div className="flex items-center gap-0.5">
<span className="text-xs font-bold text-white">۲</span>
<span className="text-[7px] font-bold tracking-tighter uppercase px-0.5 py-0.5 bg-white/20 rounded">TODAY</span>
</div>
<span className="text-[10px] leading-tight text-white/90">24 Oct</span>
<span className="text-[9px] text-white/70">13 R2</span>
</div>`);

// Day numbers hierarchy:
content = content.replace(/<span className="text-xs font-bold font-mono text-slate-200">/g, '<span className="text-xs font-bold text-slate-100">');
content = content.replace(/<span className="text-\[10px\] leading-tight opacity-90 text-slate-400">/g, '<span className="text-[10px] text-slate-300">');
content = content.replace(/<span className="text-\[9px\] opacity-60 text-slate-500">/g, '<span className="text-[9px] text-slate-500">');

content = content.replace(/<span className="text-xs font-bold font-mono">/g, '<span className="text-xs font-bold text-slate-100">');
content = content.replace(/<span className="text-\[10px\] leading-tight opacity-90">/g, '<span className="text-[10px] text-slate-300">');
content = content.replace(/<span className="text-\[9px\] opacity-60">/g, '<span className="text-[9px] text-slate-500">');

// 3. ADOPT LIGHT-MODE ICON BADGES & HIGHLIGHT CARDS
// "Daylight Length" and "Solar Milestone" blocks
content = content.replace(
  /<div className="grid grid-cols-2 gap-space-sm mt-space-md">([\s\S]*?)<\/div>\s*<\/section>/,
  `<div className="grid grid-cols-2 gap-3 mt-4">
{/* Widget 1: Daylight */}
<div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-300 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>wb_sunny</span>
</div>
<div className="flex flex-col min-w-0">
<span className="text-[10px] text-slate-400 truncate">Daylight Length</span>
<span className="text-sm text-slate-100 font-semibold truncate">10h 52m (Kabul)</span>
</div>
</div>
{/* Widget 2: Solar Milestone */}
<div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">agriculture</span>
</div>
<div className="flex flex-col min-w-0">
<span className="text-[10px] text-slate-400 truncate">Solar Milestone</span>
<span className="text-sm text-slate-100 font-semibold truncate">Mid-Autumn Harvest</span>
</div>
</div>
</div>
</section>`
);

// "Afghan Solar Highlights" items:
const item1Regex = /<div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low\/70 hover:bg-surface-container\/70 backdrop-blur-xl transition-all shadow-md">([\s\S]*?)<div className="w-12 h-12 rounded-xl bg-secondary\/15 text-secondary flex flex-col items-center justify-center shrink-0 font-label-sm">([\s\S]*?)<span className="font-headline-sm text-headline-sm font-bold leading-none">۳<\/span>([\s\S]*?)<span className="text-\[9px\] uppercase tracking-wider font-semibold">Aqrab<\/span>([\s\S]*?)<\/div>([\s\S]*?)<div className="flex-1 min-w-0">([\s\S]*?)<div className="flex items-center justify-between gap-2">([\s\S]*?)<h4 className="font-body-md text-body-md text-on-surface font-semibold truncate">UN Day in Afghanistan<\/h4>([\s\S]*?)<span className="px-2 py-0.5 rounded-full bg-secondary-container\/20 text-secondary font-label-sm text-label-sm shrink-0">Tomorrow<\/span>([\s\S]*?)<\/div>([\s\S]*?)<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">([\s\S]*?)Youth development roundtables &amp; regional programs([\s\S]*?)<\/p>([\s\S]*?)<\/div>([\s\S]*?)<\/div>/;

content = content.replace(item1Regex, `<div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
<div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex flex-col items-center justify-center font-bold text-xs shrink-0">
<span className="leading-none text-[13px]">۳</span>
<span className="text-[9px] uppercase mt-0.5">Aqrab</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-2">
<h4 className="text-sm font-semibold text-slate-100 truncate">UN Day in Afghanistan</h4>
<span className="px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold">Tomorrow</span>
</div>
<p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
Youth development roundtables &amp; regional programs
</p>
</div>
</div>`);

const item2Regex = /<div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low\/70 hover:bg-surface-container\/70 backdrop-blur-xl transition-all shadow-md">([\s\S]*?)<div className="w-12 h-12 rounded-xl bg-error\/15 text-error flex flex-col items-center justify-center shrink-0 font-label-sm">([\s\S]*?)<span className="font-headline-sm text-headline-sm font-bold leading-none">۷<\/span>([\s\S]*?)<span className="text-\[9px\] uppercase tracking-wider font-semibold">Aqrab<\/span>([\s\S]*?)<\/div>([\s\S]*?)<div className="flex-1 min-w-0">([\s\S]*?)<h4 className="font-body-md text-body-md text-on-surface font-semibold truncate">Pomegranate Harvest Festival<\/h4>([\s\S]*?)<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">([\s\S]*?)Cultural agro-expo • جشن انار قندهار و تاشقرغان([\s\S]*?)<\/p>([\s\S]*?)<\/div>([\s\S]*?)<\/div>/;

content = content.replace(item2Regex, `<div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
<div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex flex-col items-center justify-center font-bold text-xs shrink-0">
<span className="leading-none text-[13px]">۷</span>
<span className="text-[9px] uppercase mt-0.5">Aqrab</span>
</div>
<div className="flex-1 min-w-0">
<h4 className="text-sm font-semibold text-slate-100 truncate">Pomegranate Harvest Festival</h4>
<p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
Cultural agro-expo • جشن انار قندهار و تاشقرغان
</p>
</div>
</div>`);

const item3Regex = /<div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low\/70 hover:bg-surface-container\/70 backdrop-blur-xl transition-all shadow-md">([\s\S]*?)<div className="w-12 h-12 rounded-xl bg-primary\/15 text-primary flex flex-col items-center justify-center shrink-0 font-label-sm">([\s\S]*?)<span className="font-headline-sm text-headline-sm font-bold leading-none">۲۰<\/span>([\s\S]*?)<span className="text-\[9px\] uppercase tracking-wider font-semibold">Aqrab<\/span>([\s\S]*?)<\/div>([\s\S]*?)<div className="flex-1 min-w-0">([\s\S]*?)<h4 className="font-body-md text-body-md text-on-surface font-semibold truncate">Eastern Literature &amp; Iqbal Day<\/h4>([\s\S]*?)<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-0.5">([\s\S]*?)Poetic recitations across Kabul, Balkh, and Herat([\s\S]*?)<\/p>([\s\S]*?)<\/div>([\s\S]*?)<\/div>/;

content = content.replace(item3Regex, `<div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
<div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex flex-col items-center justify-center font-bold text-xs shrink-0">
<span className="leading-none text-[13px]">۲۰</span>
<span className="text-[9px] uppercase mt-0.5">Aqrab</span>
</div>
<div className="flex-1 min-w-0">
<h4 className="text-sm font-semibold text-slate-100 truncate">Eastern Literature &amp; Iqbal Day</h4>
<p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
Poetic recitations across Kabul, Balkh, and Herat
</p>
</div>
</div>`);


// "Daily Schedule" items:
const schedule1Regex = /<div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low\/70 hover:bg-surface-container\/70 backdrop-blur-xl transition-all shadow-md">([\s\S]*?)<div className="flex items-center gap-space-sm min-w-0 pr-2">([\s\S]*?)<span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0 shadow-sm shadow-secondary"><\/span>([\s\S]*?)<span className="font-body-md text-body-md text-on-surface font-medium truncate">Kabul Central Market Logistics Check<\/span>([\s\S]*?)<\/div>([\s\S]*?)<span className="font-label-sm text-label-sm text-secondary font-semibold shrink-0">11:30 AM<\/span>([\s\S]*?)<\/div>/;
content = content.replace(schedule1Regex, `<div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
<div className="flex items-center gap-3 min-w-0">
<span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
<span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
</span>
<span className="text-sm text-slate-200 font-medium truncate">Kabul Central Market Logistics Check</span>
</div>
<span className="text-xs text-indigo-400 font-semibold shrink-0">11:30 AM</span>
</div>`);

const schedule2Regex = /<div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low\/70 hover:bg-surface-container\/70 backdrop-blur-xl transition-all shadow-md">([\s\S]*?)<div className="flex items-center gap-space-sm min-w-0 pr-2">([\s\S]*?)<span className="w-2.5 h-2.5 rounded-full bg-tertiary-container shrink-0 shadow-sm shadow-tertiary-container"><\/span>([\s\S]*?)<span className="font-body-md text-body-md text-on-surface font-medium truncate">Garden &amp; Orchard Winterization Prep<\/span>([\s\S]*?)<\/div>([\s\S]*?)<span className="font-label-sm text-label-sm text-tertiary font-semibold shrink-0">04:30 PM<\/span>([\s\S]*?)<\/div>/;
content = content.replace(schedule2Regex, `<div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
<div className="flex items-center gap-3 min-w-0">
<span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
<span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
</span>
<span className="text-sm text-slate-200 font-medium truncate">Garden &amp; Orchard Winterization Prep</span>
</div>
<span className="text-xs text-emerald-400 font-semibold shrink-0">04:30 PM</span>
</div>`);


// 4. BOTTOM ACTION BUTTON
const buttonRegex = /<button className="w-full py-3.5 px-space-md rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 hover:from-emerald-500 hover:to-sky-600 text-white font-label-lg text-label-lg shadow-lg shadow-teal-900\/40 flex items-center justify-center gap-2 active:scale-\[0.99\] transition-all">([\s\S]*?)<span className="text-lg leading-none">⊕<\/span>([\s\S]*?)<span>Add Solar Event \/ National Reminder<\/span>([\s\S]*?)<\/button>/;
content = content.replace(buttonRegex, `<button className="rounded-2xl py-3.5 w-full flex items-center justify-center gap-2 font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-md shadow-emerald-900/30">
<span className="text-lg leading-none">⊕</span>
<span>Add Solar Event / National Reminder</span>
</button>`);

// Fix header/titles missing tailwind standard typography if they have font-headline-sm
content = content.replace(/className="font-headline-sm text-headline-sm text-on-surface font-semibold"/g, 'className="text-base font-bold tracking-tight text-slate-100"');
content = content.replace(/className="text-xl font-bold tracking-tight text-white"/g, 'className="text-xl font-bold tracking-tight text-white"'); // fine
content = content.replace(/className="font-body-sm text-body-sm text-on-surface-variant mt-1"/g, 'className="text-xs font-normal text-slate-400 mt-1"');


fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated the dark mode calendar file.');

