const fs = require('fs');
const path = require('path');

const lightPath = path.join(__dirname, 'src', 'DailyRoutineLightMode.jsx');
let content = fs.readFileSync(lightPath, 'utf8');

// 1. Header Logo
// Currently: <div className="flex items-center gap-space-sm"><div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-\[0_4px_12px_rgba\(42,73,223,0\.25\)\]"><span className="material-symbols-outlined text-on-primary text-\[20px\]">stream<\/span><\/div><span className="font-headline-md text-headline-md tracking-tight text-on-surface">Momentum<\/span><\/div>
content = content.replace(
  /<div className="flex items-center gap-space-sm">[\s\S]*?<span className="font-headline-md text-headline-md tracking-tight text-on-surface">Momentum<\/span><\/div>/,
  `<div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/20">
      <span className="material-symbols-outlined text-white text-[18px]">stream</span>
    </div>
    <span className="text-lg font-bold text-slate-900 tracking-tight">Momentum</span>
  </div>`
);

// 2. Subtitle
// Currently: <p className="font-body-md text-body-md text-on-surface-variant mt-0\.5">Cultivate mindful consistency and barakah every day<\/p>
content = content.replace(
  /<p className="font-body-md text-body-md text-on-surface-variant mt-0\.5">Cultivate mindful consistency and barakah every day<\/p>/,
  `<p className="text-xs text-slate-500 font-medium mt-1">Build daily consistency and focus</p>`
);

// 3. Hero Progress Card
// Currently: <div className="relative overflow-hidden rounded-lg bg-white\/75 backdrop-blur-2xl p-space-lg shadow-\[0_10px_30px_-5px_rgba\(80,110,180,0\.12\)\]">
// Let's replace the whole card block down to "+ Add Routine"
content = content.replace(
  /<div className="relative overflow-hidden rounded-lg bg-white\/75 backdrop-blur-2xl p-space-lg shadow-\[0_10px_30px_-5px_rgba\(80,110,180,0\.12\)\]">[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/,
  `<div className="bg-white/95 border border-slate-200/80 rounded-3xl p-5 mb-5 shadow-md shadow-slate-200/60 flex items-center justify-between">
    <div className="flex flex-col flex-1">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200/80 text-amber-700 shadow-sm mb-2 w-fit">
        <span className="material-symbols-outlined text-[14px] text-amber-500">local_fire_department</span>
        14-Day Routine Streak
      </span>
      <h2 className="text-2xl font-black text-slate-900 tracking-tight">4 of 6 Done</h2>
      <p className="text-xs text-slate-500 mt-0.5 mb-3">Keep steady. Small steps build profound growth.</p>
      <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
        <span className="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>
        2 upcoming today
      </div>
      <button className="w-fit py-2.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 mt-4 transition-all">
        <span className="material-symbols-outlined text-[16px]">add</span>
        Add Routine
      </button>
    </div>
    
    <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <path className="text-slate-100" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        <path className="text-indigo-600" strokeDasharray="67, 100" strokeWidth="3.5" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-black text-slate-900 leading-none mt-0.5">67%</span>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Today</span>
      </div>
    </div>
  </div>`
);


// 4. Standardize Routine Cards List
// We will replace each routine-card div block
function replaceCard(content, titleSearch, newTitle, iconName, timeStr, freqStr, descStr, checked) {
  const toggleBtn = checked 
    ? `<button aria-label="Toggle routine" className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm flex-shrink-0 mt-0.5 transition-transform" type="button"><span className="material-symbols-outlined text-[16px] font-bold">check</span></button>`
    : `<button aria-label="Toggle routine" className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform" type="button"></button>`;

  const cardHtml = `<div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-3 shadow-sm hover:shadow-md transition-all flex items-start justify-between gap-3">
    <div className="flex items-start gap-3 flex-1 min-w-0">
      ${toggleBtn}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-900 truncate">${newTitle}</h3>
          <span className="text-xs font-semibold text-indigo-600 flex-shrink-0">${timeStr}</span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">${freqStr}</span>
          <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
            <span className="material-symbols-outlined text-[12px]">${iconName}</span>
            <span>${descStr}</span>
          </span>
        </div>
      </div>
    </div>
    <div className="flex items-center gap-1 flex-shrink-0">
      <button className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
      <button className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
    </div>
  </div>`;
  
  // Find the block using the titleSearch
  const regex = new RegExp(`<div className="routine-card group relative overflow-hidden[^>]+>[\\s\\S]*?${titleSearch}[\\s\\S]*?<\/div>\\s*<\/div>\\s*<\/div>`);
  return content.replace(regex, cardHtml);
}

content = replaceCard(content, "Morning Fajr &amp; Tahajjud", "Morning Fajr & Tahajjud", "notifications_active", "05:15 AM", "Every Day", "Adhan notification enabled", true);
content = replaceCard(content, "Hydration &amp; Mindful Stretch", "Hydration & Mindfulness", "timer", "06:30 AM", "Mon–Fri", "15 mins", true);
// Card 3 has a "Now" badge. Let's make sure we include it or just replace it cleanly.
// Wait, the search for "Deep Focus Work Block" needs to be exact.
content = replaceCard(content, "Deep Focus Work Block", "Deep Focus Session", "do_not_disturb_on", "09:30 AM", "Mon–Fri", "10m before with DND mode", false);
content = replaceCard(content, "Midday Dhuhr &amp; Reflection", "Midday Dhuhr & Reflection", "mosque", "01:05 PM", "Every Day", "Congregation prayer", false);
content = replaceCard(content, "Evening Reading &amp; Quran", "Evening Reading & Journaling", "menu_book", "08:30 PM", "Sun, Tue, Thu", "25 mins focus", false);
content = replaceCard(content, "Night Adhkar &amp; Sleep Prep", "Night Adhkar & Sleep Prep", "bedtime", "10:00 PM", "Every Day", "Wind down mode", false);


// 5. Standardize Reflection Banner
content = content.replace(
  /<div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-surface-container-high\/90 via-surface-container-low\/90 to-surface-container\/90 backdrop-blur-xl p-space-md shadow-sm">[\s\S]*?<\/div>/,
  `<div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-4 my-5 shadow-sm flex items-start gap-3.5">
    <div className="w-9 h-9 rounded-2xl bg-white text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm border border-indigo-100/60 mt-0.5">
      <span className="material-symbols-outlined text-[16px]">sparkles</span>
    </div>
    <div>
      <p className="text-xs font-semibold text-slate-800 italic leading-relaxed">
        "Consistent small deeds lead to profound inner peace."
      </p>
      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mt-1">
        Daily Mindfulness Reflection
      </span>
    </div>
  </div>`
);

// We need to fix the Header Subtitle if the previous replacement didn't work because of missing text-on-surface-variant.
// The code had: <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Daily Routine</h1>
content = content.replace(
  /<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Daily Routine<\/h1>/,
  `<h1 className="text-2xl font-bold text-slate-900 tracking-tight">Daily Routine</h1>`
);
content = content.replace(
  /<span className="inline-flex items-center px-2 py-0\.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm">Active<\/span>/,
  `<span className="inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">Active</span>`
);
content = content.replace(
  /<p className="font-body-md text-body-md text-on-surface-variant mt-0\.5">Cultivate mindful consistency and barakah every day<\/p>/,
  `<p className="text-xs text-slate-500 font-medium mt-1">Build daily consistency and focus</p>`
);

// Fix filter pills spacing
content = content.replace(
  /<div className="flex items-center gap-space-xs overflow-x-auto pb-1 no-scrollbar">/,
  `<div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none mb-4">`
);

fs.writeFileSync(lightPath, content, 'utf8');
console.log('Light Mode Updated.');

