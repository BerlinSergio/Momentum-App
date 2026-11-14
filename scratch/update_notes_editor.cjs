const fs = require('fs');

function updateLight() {
  const file = 'src/QuickNoteEditorLightMode.jsx';
  let lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines[0] = "import React from 'react';\nimport { useNotesStore } from './store/useNotesStore';";
  let content = lines.join('\r\n');

  content = content.replace(
    /<button className="btn-primary w-full h-12 rounded-2xl flex items-center justify-center gap-2">[\s\S]*?<span>Save Quick Note<\/span>[\s\S]*?<ArrowRight className="w-4 h-4"\/>[\s\S]*?<\/button>/,
    `<button onClick={() => { useNotesStore.getState().addNote({ title: 'Market Errands & Dinner Prep', body: 'Pick up fresh figs, organic honey, and cardamom pods.', category: 'Spiritual' }); if (goBack) goBack('notes_main_light_mode'); else if (setActiveTab) setActiveTab('notes_main_light_mode'); }} className="btn-primary w-full h-12 rounded-2xl flex items-center justify-center gap-2">\r\n          <span>Save Quick Note</span>\r\n          <ArrowRight className="w-4 h-4"/>\r\n        </button>`
  );

  content = content.replace(
    /<button className="btn-secondary flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap">[\s\S]*?<X className="w-4 h-4 text-slate-400"\/>[\s\S]*?<span>Cancel Changes<\/span>[\s\S]*?<\/button>/,
    `<button onClick={() => (goBack ? goBack('notes_main_light_mode') : (setActiveTab ? setActiveTab('notes_main_light_mode') : window.history.back()))} className="btn-secondary flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap">\r\n            <X className="w-4 h-4 text-slate-400"/>\r\n            <span>Cancel Changes</span>\r\n          </button>`
  );

  fs.writeFileSync(file, content, 'utf8');
}

function updateDark() {
  const file = 'src/QuickNoteEditorDarkMode.jsx';
  let lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines[0] = "import React from 'react';\nimport { useNotesStore } from './store/useNotesStore';";
  let content = lines.join('\r\n');

  content = content.replace(
    /<button className="btn-primary w-full h-12 rounded-2xl flex items-center justify-center gap-2">[\s\S]*?<span>Save Quick Note<\/span>[\s\S]*?<ArrowRight className="w-4 h-4"\/>[\s\S]*?<\/button>/,
    `<button onClick={() => { useNotesStore.getState().addNote({ title: 'Market Errands & Dinner Prep', body: 'Pick up fresh figs, organic honey, and cardamom pods.', category: 'Spiritual' }); if (goBack) goBack('notes_main_dark_mode'); else if (setActiveTab) setActiveTab('notes_main_dark_mode'); }} className="btn-primary w-full h-12 rounded-2xl flex items-center justify-center gap-2">\r\n          <span>Save Quick Note</span>\r\n          <ArrowRight className="w-4 h-4"/>\r\n        </button>`
  );

  content = content.replace(
    /<button className="btn-secondary flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap">[\s\S]*?<X className="w-4 h-4 text-slate-400"\/>[\s\S]*?<span>Cancel Changes<\/span>[\s\S]*?<\/button>/,
    `<button onClick={() => (goBack ? goBack('notes_main_dark_mode') : (setActiveTab ? setActiveTab('notes_main_dark_mode') : window.history.back()))} className="btn-secondary flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 whitespace-nowrap">\r\n            <X className="w-4 h-4 text-slate-400"/>\r\n            <span>Cancel Changes</span>\r\n          </button>`
  );

  fs.writeFileSync(file, content, 'utf8');
}

updateLight();
updateDark();
console.log('Updated QuickNoteEditor');

