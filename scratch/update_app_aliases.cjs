const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');
const target = " case 'calendar': return isDarkMode ? <CalendarsMainDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <CalendarsMainLightMode setActiveTab={setActiveTab} goBack={goBack} />;";
const replacement = " case 'calendar': return isDarkMode ? <CalendarsMainDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <CalendarsMainLightMode setActiveTab={setActiveTab} goBack={goBack} />;\r\n case 'add_task':\r\n case 'add_item':\r\n case 'add_edit_task': return isDarkMode ? <AddEditTaskDarkMode setActiveTab={setActiveTab} goBack={goBack} /> : <AddEditTaskLightMode setActiveTab={setActiveTab} goBack={goBack} />;";

if (!content.includes(target)) {
  console.error('Target not found in App.jsx');
  process.exit(1);
}

content = content.replace(target, replacement);
fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('Successfully added add_task aliases to App.jsx');

