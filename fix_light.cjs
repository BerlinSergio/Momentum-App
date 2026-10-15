const fs = require('fs');

let light = fs.readFileSync('src/DailyRoutineLightMode.jsx', 'utf8');

// The remaining broken HTML was:
// <div className="flex-1 min-w-0">
// <p className="font-body-md text-body-md text-on-surface font-medium italic leading-snug">"Consistent small deeds lead to profound inner peace."</p>
// <span className="font-label-sm text-label-sm text-slate-500 mt-0.5 block">Daily Mindfulness Reflection</span>
// </div>
// </div>
// </div>

const badStr = `<div className="flex-1 min-w-0">
<p className="font-body-md text-body-md text-on-surface font-medium italic leading-snug">"Consistent small deeds lead to profound inner peace."</p>
<span className="font-label-sm text-label-sm text-slate-500 mt-0.5 block">Daily Mindfulness Reflection</span>
</div>
</div>
</div>`;

const badStr2 = `<div className="flex-1 min-w-0">
<p className="font-body-md text-body-md text-on-surface font-medium italic leading-snug">"Consistent small deeds lead to profound inner peace."</p>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5 block">Daily Mindfulness Reflection</span>
</div>
</div>
</div>`;

light = light.replace(badStr, '');
light = light.replace(badStr2, '');

fs.writeFileSync('src/DailyRoutineLightMode.jsx', light);
console.log('Fixed Light');
