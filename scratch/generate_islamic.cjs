const fs = require('fs');
const path = require('path');

function convert(htmlPath, jsxPath, componentName) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if(!bodyMatch) return;
  let body = bodyMatch[1];
  
  body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  body = body.replace(/class=/g, 'className=');
  body = body.replace(/<(input|img|hr|br)([^>]*?)>/gi, (match, tag, p1) => {
    if (p1.endsWith('/')) return match;
    return `<${tag}${p1} />`;
  });
  body = body.replace(/style="([^"]*)"/g, (match, p1) => {
    let styleObj = {};
    p1.split(';').forEach(s => {
      let parts = s.split(':');
      if(parts.length >= 2) {
        let key = parts[0].trim();
        let val = parts.slice(1).join(':').trim();
        let camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[camelKey] = val.replace(/'/g, '"');
      }
    });
    return 'style={{ ' + Object.entries(styleObj).map(([k,v]) => `${k}: '${v}'`).join(', ') + ' }}';
  });
  body = body.replace(/viewbox=/gi, 'viewBox=');
  body = body.replace(/stroke-width=/gi, 'strokeWidth=');
  body = body.replace(/stroke-linecap=/gi, 'strokeLinecap=');
  body = body.replace(/stroke-linejoin=/gi, 'strokeLinejoin=');
  body = body.replace(/stroke-dashoffset=/gi, 'strokeDashoffset=');
  body = body.replace(/stroke-dasharray=/gi, 'strokeDasharray=');
  body = body.replace(/onclick=/gi, 'onClick=');
  body = body.replace(/for="([^"]*)"/gi, 'htmlFor="$1"');
  body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  let stateInit = '';
  let hooks = '';

  if (componentName === 'TasbeehMain') {
    stateInit = `  const [count, setCount] = useState(27);
  const [target, setTarget] = useState(33);
  const [daily, setDaily] = useState(428);
  const [chimeActive, setChimeActive] = useState(true);
  const circumference = 578;
  const progress = Math.min(count / target, 1);
  const offset = circumference - progress * circumference;`;
    
    // Replace text content
    body = body.replace(/>27</, '>{count}<');
    body = body.replace(/>\s*33\s*</, '>{target}<');
    body = body.replace(/id="dailyCount">428</, 'id="dailyCount">{daily}<');
    body = body.replace(/id="counterRing"([^>]*)style=\{\{[^\}]*\}\}/, 'id="counterRing"$1 style={{ strokeDashoffset: offset }}');
    body = body.replace(/id="countTriggerBtn"/, 'id="countTriggerBtn" onClick={() => { setCount(c => c+1); setDaily(d => d+1); }}');
    body = body.replace(/id="resetCounterBtn"/, 'id="resetCounterBtn" onClick={() => setCount(0)}');
    body = body.replace(/id="quickResetBtn"/, 'id="quickResetBtn" onClick={() => setCount(0)}');
    body = body.replace(/id="undoCounterBtn"/, 'id="undoCounterBtn" onClick={() => { if(count>0){ setCount(c=>c-1); setDaily(d=>Math.max(0, d-1)); } }}');
    
    // Target Chips
    body = body.replace(/data-target="33"/g, 'onClick={() => setTarget(33)} data-target="33"');
    body = body.replace(/data-target="99"/g, 'onClick={() => setTarget(99)} data-target="99"');
    body = body.replace(/data-target="100"/g, 'onClick={() => setTarget(100)} data-target="100"');
    body = body.replace(/data-target="1000"/g, 'onClick={() => setTarget(1000)} data-target="1000"');
    body = body.replace(/active-preset.*?bg-primary.*?text-on-primary.*?font-bold.*?shadow-\[.*?\]/, ''); // remove hardcoded active styles
    
    body = body.replace(/className="target-chip([^"]*)"/g, (match, p1) => {
      return `className={\`target-chip\${target === parseInt('${p1}'.match(/data-target="(\\d+)"/)?.[1] || 0) ? ' py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(192,193,255,0.4)] text-center transition-all' : ' py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md text-center hover:bg-surface-container-highest transition-colors'}\`}`;
    });

    body = body.replace(/id="chimeBtn"/, 'id="chimeBtn" onClick={() => setChimeActive(!chimeActive)}');
  }

  const code = `import React, { useState } from 'react';

const ${componentName} = () => {
${stateInit}
  return (
    <div className="bg-[#0b0f19] font-body-md text-slate-100 antialiased flex flex-col min-h-screen relative">
      ${body}
    </div>
  );
};

export default ${componentName};
`;
  fs.writeFileSync(jsxPath, code);
  console.log(`${componentName}.jsx created!`);
}

convert('c:/momentum/design_reference/tasbeeh_main_dark_mode/code.html', 'c:/momentum/src/TasbeehMain.jsx', 'TasbeehMain');
convert('c:/momentum/design_reference/tasbeeh_history_dark_mode/code.html', 'c:/momentum/src/TasbeehHistory.jsx', 'TasbeehHistory');
convert('c:/momentum/design_reference/new_edit_tasbeeh_dark_mode/code.html', 'c:/momentum/src/NewEditTasbeeh.jsx', 'NewEditTasbeeh');
convert('c:/momentum/design_reference/tasbeeh_settings_dark_mode/code.html', 'c:/momentum/src/TasbeehSettings.jsx', 'TasbeehSettings');
convert('c:/momentum/design_reference/prayer_times_light_mode/code.html', 'c:/momentum/src/PrayerTimes.jsx', 'PrayerTimes');
convert('c:/momentum/design_reference/prayer_notification_settings_light_mode/code.html', 'c:/momentum/src/PrayerNotificationSettings.jsx', 'PrayerNotificationSettings');

