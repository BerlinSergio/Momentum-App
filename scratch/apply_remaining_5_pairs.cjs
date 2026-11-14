const fs = require('fs');

// 1. AddEditTask
function updateAddEditTask() {
  ['Dark', 'Light'].forEach(mode => {
    const isDark = mode === 'Dark';
    const file = `src/AddEditTask${mode}Mode.jsx`;
    let content = fs.readFileSync(file, 'utf8');

    // Export
    content = content.replace(
      `export default function AddEditTask${mode}Mode({ setActiveTab }) {`,
      `export default function AddEditTask${mode}Mode({ setActiveTab, goBack }) {`
    );

    // handleCancel
    const oldCancel = `  const handleCancel = () => {\r\n    setEditingTaskId(null);\r\n    if (setActiveTab) {\r\n      setActiveTab('tasks_reminders_${isDark ? 'dark' : 'light'}_mode');\r\n    }\r\n  };`;
    const newCancel = `  const handleCancel = () => {\r\n    setEditingTaskId(null);\r\n    if (goBack) {\r\n      goBack('tasks_reminders_${isDark ? 'dark' : 'light'}_mode');\r\n    } else if (setActiveTab) {\r\n      setActiveTab('tasks_reminders_${isDark ? 'dark' : 'light'}_mode');\r\n    }\r\n  };`;

    if (!content.includes(oldCancel)) {
      // Try with \n
      const oldCancelN = `  const handleCancel = () => {\n    setEditingTaskId(null);\n    if (setActiveTab) {\n      setActiveTab('tasks_reminders_${isDark ? 'dark' : 'light'}_mode');\n    }\n  };`;
      const newCancelN = `  const handleCancel = () => {\n    setEditingTaskId(null);\n    if (goBack) {\n      goBack('tasks_reminders_${isDark ? 'dark' : 'light'}_mode');\n    } else if (setActiveTab) {\n      setActiveTab('tasks_reminders_${isDark ? 'dark' : 'light'}_mode');\n    }\n  };`;
      if (!content.includes(oldCancelN)) throw new Error(`handleCancel not found in ${file}`);
      content = content.replace(oldCancelN, newCancelN);
    } else {
      content = content.replace(oldCancel, newCancel);
    }

    fs.writeFileSync(file, content, 'utf8');
  });
}

// 2. AddEditExpense
function updateAddEditExpense() {
  ['Dark', 'Light'].forEach(mode => {
    const isDark = mode === 'Dark';
    const file = `src/AddEditExpense${mode}Mode.jsx`;
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(
      `export default function AddEditExpense${mode}Mode({ setActiveTab }) {`,
      `export default function AddEditExpense${mode}Mode({ setActiveTab, goBack }) {`
    );

    const oldNav = `  const handleNavigate = (targetScreen) => {\r\n    if (typeof setActiveTab === 'function') {\r\n      setActiveTab(targetScreen);\r\n    }\r\n  };`;
    const newNav = `  const handleNavigate = (targetScreen) => {\r\n    if (typeof goBack === 'function' && targetScreen.includes('tracker')) {\r\n      goBack(targetScreen);\r\n    } else if (typeof setActiveTab === 'function') {\r\n      setActiveTab(targetScreen);\r\n    }\r\n  };`;

    if (!content.includes(oldNav)) {
      const oldNavN = `  const handleNavigate = (targetScreen) => {\n    if (typeof setActiveTab === 'function') {\n      setActiveTab(targetScreen);\n    }\n  };`;
      const newNavN = `  const handleNavigate = (targetScreen) => {\n    if (typeof goBack === 'function' && targetScreen.includes('tracker')) {\n      goBack(targetScreen);\n    } else if (typeof setActiveTab === 'function') {\n      setActiveTab(targetScreen);\n    }\n  };`;
      if (!content.includes(oldNavN)) throw new Error(`handleNavigate not found in ${file}`);
      content = content.replace(oldNavN, newNavN);
    } else {
      content = content.replace(oldNav, newNav);
    }

    fs.writeFileSync(file, content, 'utf8');
  });
}

// 3. AddEditIncome
function updateAddEditIncome() {
  ['Dark', 'Light'].forEach(mode => {
    const isDark = mode === 'Dark';
    const file = `src/AddEditIncome${mode}Mode.jsx`;
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(
      `export default function AddEditIncome${mode}Mode({ setActiveTab }) {`,
      `export default function AddEditIncome${mode}Mode({ setActiveTab, goBack }) {`
    );

    const targetMode = isDark ? 'dark' : 'light';
    const oldLine = `if (setActiveTab) setActiveTab('income_management_${targetMode}_mode');`;
    const newLine = `if (goBack) goBack('finance_expense_tracker_${targetMode}_mode'); else if (setActiveTab) setActiveTab('income_management_${targetMode}_mode');`;

    if (!content.includes(oldLine)) throw new Error(`oldLine not found in ${file}`);
    content = content.replace(oldLine, newLine);

    fs.writeFileSync(file, content, 'utf8');
  });
}

// 4. NewEditTasbeeh
function updateNewEditTasbeeh() {
  ['Dark', 'Light'].forEach(mode => {
    const isDark = mode === 'Dark';
    const file = `src/NewEditTasbeeh${mode}Mode.jsx`;
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(
      `export default function NewEditTasbeeh${mode}Mode({ setActiveTab }) {`,
      `export default function NewEditTasbeeh${mode}Mode({ setActiveTab, goBack }) {`
    );

    const targetMode = isDark ? 'dark' : 'light';
    const oldCancel = `  const handleCancel = () => {\r\n    if (setActiveTab) setActiveTab('tasbeeh_main_${targetMode}_mode');\r\n  };`;
    const newCancel = `  const handleCancel = () => {\r\n    if (goBack) goBack('tasbeeh_main_${targetMode}_mode');\r\n    else if (setActiveTab) setActiveTab('tasbeeh_main_${targetMode}_mode');\r\n  };`;

    if (!content.includes(oldCancel)) {
      const oldCancelN = `  const handleCancel = () => {\n    if (setActiveTab) setActiveTab('tasbeeh_main_${targetMode}_mode');\n  };`;
      const newCancelN = `  const handleCancel = () => {\n    if (goBack) goBack('tasbeeh_main_${targetMode}_mode');\n    else if (setActiveTab) setActiveTab('tasbeeh_main_${targetMode}_mode');\n  };`;
      if (!content.includes(oldCancelN)) throw new Error(`handleCancel not found in ${file}`);
      content = content.replace(oldCancelN, newCancelN);
    } else {
      content = content.replace(oldCancel, newCancel);
    }

    fs.writeFileSync(file, content, 'utf8');
  });
}

// 5. SettingsProfile
function updateSettingsProfile() {
  ['Dark', 'Light'].forEach(mode => {
    const isDark = mode === 'Dark';
    const file = `src/SettingsProfile${mode}Mode.jsx`;
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(
      `export default function SettingsProfile${mode}Mode({ setActiveTab }) {`,
      `export default function SettingsProfile${mode}Mode({ setActiveTab, goBack }) {`
    );

    const targetFallback = isDark ? 'more_dark_mode' : 'more_light_mode';
    const textColor = isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100';

    const oldBtn = isDark
      ? `          <button className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors">\r\n            <Bell className="w-5 h-5"/>\r\n          </button>`
      : `          <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">\r\n            <Bell className="w-5 h-5"/>\r\n          </button>`;

    const newBtn = `          <button type="button" onClick={() => (goBack ? goBack('${targetFallback}') : (setActiveTab ? setActiveTab('${targetFallback}') : window.history.back()))} className="p-2 rounded-full ${textColor} transition-colors cursor-pointer" aria-label="Go back">\r\n            <ArrowLeft className="w-5 h-5"/>\r\n          </button>`;

    if (!content.includes(oldBtn)) {
      const oldBtnN = isDark
        ? `          <button className="p-2 rounded-full text-slate-300 hover:bg-slate-800 transition-colors">\n            <Bell className="w-5 h-5"/>\n          </button>`
        : `          <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors">\n            <Bell className="w-5 h-5"/>\n          </button>`;
      const newBtnN = `          <button type="button" onClick={() => (goBack ? goBack('${targetFallback}') : (setActiveTab ? setActiveTab('${targetFallback}') : window.history.back()))} className="p-2 rounded-full ${textColor} transition-colors cursor-pointer" aria-label="Go back">\n            <ArrowLeft className="w-5 h-5"/>\n          </button>`;
      if (!content.includes(oldBtnN)) throw new Error(`oldBtn not found in ${file}`);
      content = content.replace(oldBtnN, newBtnN);
    } else {
      content = content.replace(oldBtn, newBtn);
    }

    fs.writeFileSync(file, content, 'utf8');
  });
}

updateAddEditTask();
console.log('✓ AddEditTask updated');
updateAddEditExpense();
console.log('✓ AddEditExpense updated');
updateAddEditIncome();
console.log('✓ AddEditIncome updated');
updateNewEditTasbeeh();
console.log('✓ NewEditTasbeeh updated');
updateSettingsProfile();
console.log('✓ SettingsProfile updated');

