const fs = require('fs');

function updateLight() {
  const file = 'src/AddEditRoutineLightMode.jsx';
  let lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

  lines[0] = "import React from 'react';\nimport { useRoutineStore } from './store/useRoutineStore';";

  let content = lines.join('\r\n');

  content = content.replace(
    /<button className="btn-primary w-full" type="button">[\s\S]*?<span>Save Routine Changes<\/span>[\s\S]*?<span className="material-symbols-outlined text-\[20px\]">arrow_forward<\/span>[\s\S]*?<\/button>/,
    `<button onClick={() => { const nameEl = document.getElementById('routine-name'); const title = nameEl ? nameEl.value : 'Daily Routine'; useRoutineStore.getState().addRoutine({ title, category: 'Spiritual', time: '08:00 PM' }); if (goBack) goBack('daily_routine_light_mode'); else if (setActiveTab) setActiveTab('daily_routine_light_mode'); }} className="btn-primary w-full" type="button">\r\n      <span>Save Routine Changes</span>\r\n      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>\r\n    </button>`
  );

  content = content.replace(
    /<button className="btn-secondary w-full" type="button">[\s\S]*?Cancel[\s\S]*?<\/button>/,
    `<button onClick={() => (goBack ? goBack('daily_routine_light_mode') : (setActiveTab ? setActiveTab('daily_routine_light_mode') : window.history.back()))} className="btn-secondary w-full" type="button">\r\n        Cancel\r\n      </button>`
  );

  fs.writeFileSync(file, content, 'utf8');
}

function updateDark() {
  const file = 'src/AddEditRoutineDarkMode.jsx';
  let lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

  lines[0] = "import React from 'react';\nimport { useRoutineStore } from './store/useRoutineStore';";

  let content = lines.join('\r\n');

  content = content.replace(
    /<button className="btn-primary w-full" type="button">[\s\S]*?<span>Save Routine Changes<\/span>[\s\S]*?<span className="material-symbols-outlined text-\[20px\]">arrow_forward<\/span>[\s\S]*?<\/button>/,
    `<button onClick={() => { const nameEl = document.getElementById('routine-name'); const title = nameEl ? nameEl.value : 'Daily Routine'; useRoutineStore.getState().addRoutine({ title, category: 'Spiritual', time: '08:00 PM' }); if (goBack) goBack('daily_routine_dark_mode'); else if (setActiveTab) setActiveTab('daily_routine_dark_mode'); }} className="btn-primary w-full" type="button">\r\n      <span>Save Routine Changes</span>\r\n      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>\r\n    </button>`
  );

  content = content.replace(
    /<button className="btn-secondary w-full" type="button">[\s\S]*?Cancel[\s\S]*?<\/button>/,
    `<button onClick={() => (goBack ? goBack('daily_routine_dark_mode') : (setActiveTab ? setActiveTab('daily_routine_dark_mode') : window.history.back()))} className="btn-secondary w-full" type="button">\r\n        Cancel\r\n      </button>`
  );

  fs.writeFileSync(file, content, 'utf8');
}

updateLight();
updateDark();
console.log('Updated AddEditRoutine');

