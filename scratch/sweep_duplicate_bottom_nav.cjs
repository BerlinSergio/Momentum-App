const fs = require('fs');

console.log('--- SWEEPING DUPLICATE BOTTOM NAV IMPORTS ACROSS INDIVIDUAL SCREENS ---');

// 1. HomeDashboard
['HomeDashboardDarkMode.jsx', 'HomeDashboardLightMode.jsx'].forEach(f => {
  let c = fs.readFileSync('src/' + f, 'utf8');
  c = c.replace("import BottomNavBar from './components/BottomNavBar';\n", "");
  c = c.replace(/\n\s*<BottomNavBar activeTab="home" isDarkMode=\{[^}]+\} setActiveTab=\{setActiveTab\} \/>/, "");
  fs.writeFileSync('src/' + f, c, 'utf8');
  console.log('✓ Cleaned ' + f);
});

// 2. FinanceExpenseTracker
['FinanceExpenseTrackerDarkMode.jsx', 'FinanceExpenseTrackerLightMode.jsx'].forEach(f => {
  let c = fs.readFileSync('src/' + f, 'utf8');
  c = c.replace("import BottomNavBar from './components/BottomNavBar';\n", "");
  c = c.replace(/\n\s*\{\/\* Global Bottom Navigation \*\/\}\n\s*<BottomNavBar activeTab="finance" isDarkMode=\{[^}]+\} setActiveTab=\{setActiveTab\} onPlusClick=\{handlePlusAction\} \/>/, "");
  fs.writeFileSync('src/' + f, c, 'utf8');
  console.log('✓ Cleaned ' + f);
});

// 3. TasksReminders
['TasksRemindersDarkMode.jsx', 'TasksRemindersLightMode.jsx'].forEach(f => {
  let c = fs.readFileSync('src/' + f, 'utf8');
  c = c.replace("import BottomNavBar from './components/BottomNavBar';\n", "");
  c = c.replace(/\n\s*<BottomNavBar\s+activeTab="tasks"\s+isDarkMode=\{[^}]+\}\s+setActiveTab=\{setActiveTab\}\s+onPlusClick=\{\(\) => \{[^}]+\}\}\s*\/>/, "");
  fs.writeFileSync('src/' + f, c, 'utf8');
  console.log('✓ Cleaned ' + f);
});

// 4. NotesMain
['NotesMainDarkMode.jsx', 'NotesMainLightMode.jsx'].forEach(f => {
  let c = fs.readFileSync('src/' + f, 'utf8');
  c = c.replace(/import BottomNavBar from '\.\/components\/BottomNavBar';\r?\n/, "");
  c = c.replace(/\r?\n\s*<BottomNavBar activeTab="more" isDarkMode=\{[^}]+\} setActiveTab=\{setActiveTab\} \/>/, "");
  fs.writeFileSync('src/' + f, c, 'utf8');
  console.log('✓ Cleaned ' + f);
});

// 5. CalendarsMain
['CalendarsMainDarkMode.jsx', 'CalendarsMainLightMode.jsx'].forEach(f => {
  let c = fs.readFileSync('src/' + f, 'utf8');
  c = c.replace("import BottomNavBar from './components/BottomNavBar';\n", "");
  c = c.replace(/\n\s*\{\/\* Standardized Bottom Navigation Bar with Functional onPlusClick \*\/\}\n\s*<BottomNavBar\s+activeTab="more"\s+isDarkMode=\{[^}]+\}\s+setActiveTab=\{setActiveTab\}\s+onPlusClick=\{handleOpenAddTask\}\s*\/>/, "");
  fs.writeFileSync('src/' + f, c, 'utf8');
  console.log('✓ Cleaned ' + f);
});

// 6. More
['MoreDarkMode.jsx', 'MoreLightMode.jsx'].forEach(f => {
  let c = fs.readFileSync('src/' + f, 'utf8');
  c = c.replace(/import BottomNavBar from '\.\/components\/BottomNavBar';\r?\n/, "");
  c = c.replace(/\r?\n\s*<BottomNavBar activeTab="more" isDarkMode=\{[^}]+\} setActiveTab=\{setActiveTab\} \/>/, "");
  c = c.replace('pb-28 font-sans', 'pb-32 font-sans');
  fs.writeFileSync('src/' + f, c, 'utf8');
  console.log('✓ Cleaned ' + f);
});

console.log('Sweep completed successfully.');

