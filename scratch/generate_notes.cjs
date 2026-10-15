const fs = require('fs');
const path = require('path');

function convertHtmlToJsx(htmlPath, jsxPath, componentName) {
  let html = fs.readFileSync(htmlPath, 'utf8');

  // Extract everything inside body
  let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if(!bodyMatch) {
    console.log('No body found in', htmlPath);
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
  body = body.replace(/onClick="[^"]*"/g, 'onClick={() => {}}');
  body = body.replace(/for="([^"]*)"/gi, 'htmlFor="$1"');

  // Convert HTML comments to JSX comments
  body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  // Quick Note Editor specifics
  body = body.replace(/id="pinToggleBtn"/g, 'onClick={() => setIsPinned(!isPinned)} id="pinToggleBtn" className={`text-on-surface hover:bg-surface-container transition-colors w-11 h-11 flex items-center justify-center rounded-full ${isPinned ? "text-primary" : ""}`}');
  body = body.replace(/id="pinIcon"([^>]*)>/g, (match, p1) => `id="pinIcon"${p1.replace(/style=\{\{[^\}]*\}\}/, "")} style={{ fontVariationSettings: isPinned ? "'FILL' 1" : "'FILL' 0" }}>`);
  
  // Note Content Area specifics
  body = body.replace(/<textarea(.*?)id="noteContentArea"(.*?)>([\s\S]*?)<\/textarea>/g, 
    '<textarea$1id="noteContentArea"$2 value={noteContent} onChange={(e) => setNoteContent(e.target.value)}>$3</textarea>');
  body = body.replace(/<span id="charCountDisplay">.*?<\/span>/, 
    '<span id="charCountDisplay">{noteContent ? noteContent.trim().split(/\\s+/).length : 0} words • {noteContent.length} chars</span>');

  const componentCode = `import React, { useState } from 'react';

const ${componentName} = () => {
  const [isPinned, setIsPinned] = useState(false);
  const [noteContent, setNoteContent] = useState('');

  return (
    <div className="bg-[#0b0f19] font-body-md text-slate-100 antialiased flex flex-col min-h-screen relative selection:bg-indigo-600/40 selection:text-indigo-200">
      ${body}
    </div>
  );
};

export default ${componentName};
`;

  fs.writeFileSync(jsxPath, componentCode);
  console.log(`${componentName}.jsx created!`);
}

convertHtmlToJsx('c:/momentum/design_reference/quick_note_editor_dark_mode/code.html', 'c:/momentum/src/QuickNoteEditor.jsx', 'QuickNoteEditor');
convertHtmlToJsx('c:/momentum/design_reference/long_note_editor_dark_mode/code.html', 'c:/momentum/src/LongNoteEditor.jsx', 'LongNoteEditor');
convertHtmlToJsx('c:/momentum/design_reference/note_media_attachment_viewer_dark_mode/code.html', 'c:/momentum/src/NoteMediaViewer.jsx', 'NoteMediaViewer');

