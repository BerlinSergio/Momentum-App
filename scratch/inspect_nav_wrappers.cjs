const fs = require('fs');

const files = [
  'HomeDashboardDarkMode.jsx',
  'HomeDashboardLightMode.jsx',
  'DailyRoutineDarkMode.jsx',
  'DailyRoutineLightMode.jsx',
  'FinanceExpenseTrackerDarkMode.jsx',
  'FinanceExpenseTrackerLightMode.jsx',
  'TasksRemindersDarkMode.jsx',
  'TasksRemindersLightMode.jsx',
  'NotesMainDarkMode.jsx',
  'NotesMainLightMode.jsx',
  'CalendarsMainDarkMode.jsx',
  'CalendarsMainLightMode.jsx',
  'MoreDarkMode.jsx',
  'MoreLightMode.jsx'
];

files.forEach(f => {
  const c = fs.readFileSync('src/' + f, 'utf8');
  const returnIdx = c.indexOf('return (');
  const rootSnippet = c.slice(returnIdx, returnIdx + 120);
  const navPos = c.lastIndexOf('<BottomNav');
  const navSnippet = c.slice(navPos - 40, navPos + 100);
  console.log('FILE:', f);
  console.log('  Root snippet:', rootSnippet.replace(/\r?\n/g, ' '));
  console.log('  Nav snippet: ', navSnippet.replace(/\r?\n/g, ' '));
  console.log('---');
});

