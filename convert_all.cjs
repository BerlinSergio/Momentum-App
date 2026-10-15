const fs = require('fs');
const path = require('path');
const HTMLtoJSX = require('htmltojsx');

const converter = new HTMLtoJSX({
  createClass: false,
});

const refDir = path.join(__dirname, 'design_reference');
const srcDir = path.join(__dirname, 'src');
const appJsxPath = path.join(srcDir, 'App.jsx');

const folders = fs.readdirSync(refDir).filter(f => fs.statSync(path.join(refDir, f)).isDirectory());

// Helper to convert snake_case to PascalCase
function toPascalCase(str) {
  return str.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

let generatedScreens = [];

for (const folder of folders) {
  const componentName = toPascalCase(folder);
  const targetFile = path.join(srcDir, `${componentName}.jsx`);
  const codeHtmlPath = path.join(refDir, folder, 'code.html');
  
  if (fs.existsSync(targetFile)) {
    console.log(`Skipping existing: ${componentName}`);
    generatedScreens.push({ folder, componentName, exists: true });
    continue;
  }
  
  if (fs.existsSync(codeHtmlPath)) {
    const html = fs.readFileSync(codeHtmlPath, 'utf-8');
    
    // Quick regex to extract only the body content if it exists
    let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let innerHtml = bodyMatch ? bodyMatch[1] : html;
    
    // htmltojsx struggles with some inline style strings or svg camelcases sometimes, 
    // but we will let it do its best
    try {
      let jsx = converter.convert(innerHtml);
      
      // Wrap it in a functional component
      const componentCode = `import React, { useState } from 'react';

export default function ${componentName}({ setActiveTab }) {
  return (
    <>
      ${jsx.trim()}
    </>
  );
}
`;
      fs.writeFileSync(targetFile, componentCode, 'utf-8');
      console.log(`Converted: ${componentName}`);
      generatedScreens.push({ folder, componentName, exists: false });
    } catch (err) {
      console.error(`Failed to convert ${folder}:`, err.message);
    }
  }
}

// Now generate the import and registry for App.jsx
let appJsx = fs.readFileSync(appJsxPath, 'utf-8');

// We need to build a new App.jsx that dynamically maps all screens or we can just rewrite the switch statement and imports
// Let's create a new structure for App.jsx
let imports = "import React, { useState, useEffect } from 'react';\n";
let switchCases = "";
let navItems = "";

generatedScreens.forEach(s => {
  imports += `import ${s.componentName} from './${s.componentName}';\n`;
  switchCases += `      case '${s.folder}': return <${s.componentName} setActiveTab={setActiveTab} />;\n`;
  
  // Clean up nav item name for the dropdown
  let displayName = s.folder.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  navItems += `              <option value="${s.folder}">${displayName}</option>\n`;
});

const newAppJsx = `${imports}

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('screen') || 'splash_screen_dark_mode'; // Default to one of the screens
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const screen = params.get('screen');
      if (screen) setActiveTab(screen);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavChange = (e) => {
    const newScreen = e.target.value;
    setActiveTab(newScreen);
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('screen', newScreen);
    window.history.pushState({}, '', newUrl);
  };

  const renderScreen = () => {
    switch (activeTab) {
${switchCases}
      default: return <div className="p-8 text-white">Screen not found: {activeTab}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {renderScreen()}
      
      {/* Floating Navigator */}
      <div className="fixed bottom-24 right-4 z-[9999] bg-surface-container-high/80 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-white/10">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-1">Screen Navigator ({generatedScreens.length})</label>
          <select 
            value={activeTab} 
            onChange={handleNavChange}
            className="bg-black/50 text-white text-sm rounded-lg border border-white/10 p-2 outline-none focus:ring-2 focus:ring-primary"
          >
${navItems}
          </select>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(appJsxPath, newAppJsx, 'utf-8');
console.log('Updated App.jsx with all screens.');

