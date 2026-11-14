const fs = require('fs');
const assert = require('assert');

console.log('================================================================');
console.log('       GLOBAL FLOATING BOTTOM NAV ARCHITECTURE AUDIT            ');
console.log('================================================================\n');

// 1. Verify global component styling
console.log('▶ [1/4] Checking global BottomNavBar.jsx styling...');
const navSrc = fs.readFileSync('src/components/BottomNavBar.jsx', 'utf8');

assert(navSrc.includes('bottom-4'), 'BottomNav must be floating with bottom-4');
assert(navSrc.includes('w-[92%]'), 'BottomNav must be floating pill with w-[92%]');
assert(navSrc.includes('rounded-[2rem]'), 'BottomNav must be rounded-[2rem] pill');
assert(navSrc.includes('backdrop-blur-3xl'), 'BottomNav must have backdrop-blur-3xl glassmorphism');
assert(navSrc.includes('shadow-lg border'), 'BottomNav must have shadow-lg and border');
assert(navSrc.includes('Plus'), 'BottomNav must have elevated center (+) button');
console.log('  ✓ Verified floating pill dock (bottom-4, w-[92%], rounded-[2rem], backdrop-blur-3xl, elevated +).\n');

// 2. Verify root wrapper layout in App.jsx
console.log('▶ [2/4] Checking root layout wrapper in App.jsx...');
const appSrc = fs.readFileSync('src/App.jsx', 'utf8');
assert(appSrc.includes("import BottomNavBar from './components/BottomNavBar';"), 'App.jsx must import global BottomNavBar');
assert(appSrc.includes('<BottomNavBar'), 'App.jsx must render global BottomNavBar');
assert(appSrc.includes('pb-32'), 'App.jsx must enforce pb-32 scroll padding for floating nav');
console.log('  ✓ Verified global mounting and pb-32 scroll padding in App.jsx.\n');

// 3. Verify delegator screens (Home.jsx, DailyRoutine.jsx, FinanceDashboard.jsx)
console.log('▶ [3/4] Checking delegator screens (Home.jsx, DailyRoutine.jsx, FinanceDashboard.jsx)...');
['Home.jsx', 'DailyRoutine.jsx', 'FinanceDashboard.jsx'].forEach(file => {
  assert(fs.existsSync('src/' + file), `${file} must exist`);
  const content = fs.readFileSync('src/' + file, 'utf8');
  assert(content.includes('BottomNav'), `${file} must reference BottomNav`);
  console.log(`  ✓ ${file} verified.`);
});
console.log('');

// 4. Verify no duplicate BottomNavBar in individual screen files
console.log('▶ [4/4] Verifying sweep of duplicate BottomNav in screen files...');
const mainScreens = [
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

mainScreens.forEach(f => {
  const content = fs.readFileSync('src/' + f, 'utf8');
  assert(!content.includes('<BottomNavBar'), `${f} must not render duplicate <BottomNavBar`);
  console.log(`  ✓ ${f}: duplicate BottomNavBar cleanly removed.`);
});

console.log('\n================================================================');
console.log('     ALL GLOBAL FLOATING BOTTOM NAV AUDITS PASSED 100%!         ');
console.log('================================================================');
