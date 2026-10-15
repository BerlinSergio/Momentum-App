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

  const code = `import React, { useState } from 'react';

const ${componentName} = () => {
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

convert('c:/momentum/design_reference/notifications_settings_dark_mode/code.html', 'c:/momentum/src/NotificationsSettings.jsx', 'NotificationsSettings');
convert('c:/momentum/design_reference/splash_screen_dark_mode/code.html', 'c:/momentum/src/SplashScreen.jsx', 'SplashScreen');
convert('c:/momentum/design_reference/timezone_selection_dark_mode/code.html', 'c:/momentum/src/TimezoneSelection.jsx', 'TimezoneSelection');

