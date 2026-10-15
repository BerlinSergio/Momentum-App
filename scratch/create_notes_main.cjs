const fs = require('fs');
let html = fs.readFileSync('c:/momentum/design_reference/notes_main_dark_mode/code.html', 'utf8');

// Extract everything inside body
let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if(!bodyMatch) {
  console.log('No body found');
  process.exit(1);
}
let body = bodyMatch[1];

// Remove script tags
body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

// Convert class to className
body = body.replace(/class=/g, 'className=');

// Self close input, img, hr, br
body = body.replace(/<(input|img|hr|br)([^>]*?)>/gi, (match, tag, p1) => {
  if (p1.endsWith('/')) return match;
  return `<${tag}${p1} />`;
});

// Convert style="..." to style={{...}}
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

// Convert SVG properties
body = body.replace(/viewbox=/gi, 'viewBox=');
body = body.replace(/stroke-width=/gi, 'strokeWidth=');
body = body.replace(/stroke-linecap=/gi, 'strokeLinecap=');
body = body.replace(/stroke-linejoin=/gi, 'strokeLinejoin=');
body = body.replace(/onclick=/gi, 'onClick=');

// Remove hardcoded onclick alerts
body = body.replace(/onClick="alert\([^)]*\)"/g, 'onClick={() => {}}');

// Convert HTML comments to JSX comments
body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

const componentCode = `import React, { useState } from 'react';

const NotesMain = () => {
  const [fabOpen, setFabOpen] = useState(false);

  return (
    <div className="bg-[#0b0f19] font-body-md text-slate-100 antialiased flex flex-col min-h-screen relative selection:bg-indigo-600/40 selection:text-indigo-200">
      ${body
          .replace(/id="toggleFabBtn"/, 'id="toggleFabBtn" onClick={() => setFabOpen(!fabOpen)}')
          .replace(/id="actionSubMenu" className="([^"]*)"/, 'id="actionSubMenu" className={`$1 ${fabOpen ? "flex" : "hidden"}`.replace("hidden hidden", "hidden")}')
          .replace(/id="fabIcon" className="([^"]*)"/, 'id="fabIcon" className={`$1 ${fabOpen ? "rotate-45" : ""}`}').replace(/>add</, '>{fabOpen ? "close" : "add"}<')}
    </div>
  );
};

export default NotesMain;
`;

fs.writeFileSync('c:/momentum/src/NotesMain.jsx', componentCode);
console.log('NotesMain.jsx created!');
