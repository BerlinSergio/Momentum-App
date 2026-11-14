const fs = require('fs');
const assert = require('assert');

console.log('=== TEST SUITE: UNIFIED TASKS & DAILY ROUTINE ===\n');

// 1. Verify TasksWrapper exists
assert(fs.existsSync('src/TasksWrapper.jsx'), 'TasksWrapper.jsx must exist');
const tasksWrapperContent = fs.readFileSync('src/TasksWrapper.jsx', 'utf8');
assert(tasksWrapperContent.includes('TasksRemindersDarkMode'), 'TasksWrapper must import TasksRemindersDarkMode');
assert(tasksWrapperContent.includes('TasksRemindersLightMode'), 'TasksWrapper must import TasksRemindersLightMode');
assert(tasksWrapperContent.includes('initialSubTab'), 'TasksWrapper must support initialSubTab');
console.log('✓ 1. TasksWrapper.jsx exists and cleanly wraps dark/light screens');

// 2. Verify TasksRemindersDarkMode has the top segmented switcher
const darkContent = fs.readFileSync('src/TasksRemindersDarkMode.jsx', 'utf8');
assert(darkContent.includes('activeSubTab'), 'TasksRemindersDarkMode must manage activeSubTab');
assert(darkContent.includes('setActiveSubTab(\'tasks\')'), 'TasksRemindersDarkMode must have Tasks button');
assert(darkContent.includes('setActiveSubTab(\'routine\')'), 'TasksRemindersDarkMode must have Routine button');
assert(darkContent.includes('DailyRoutineDarkMode'), 'TasksRemindersDarkMode must conditionally render DailyRoutineDarkMode');
assert(darkContent.includes('hideHeader={true}'), 'TasksRemindersDarkMode must hide nested header');
console.log('✓ 2. TasksRemindersDarkMode includes segmented switcher & conditional rendering');

// 3. Verify TasksRemindersLightMode has the top segmented switcher
const lightContent = fs.readFileSync('src/TasksRemindersLightMode.jsx', 'utf8');
assert(lightContent.includes('activeSubTab'), 'TasksRemindersLightMode must manage activeSubTab');
assert(lightContent.includes('setActiveSubTab(\'tasks\')'), 'TasksRemindersLightMode must have Tasks button');
assert(lightContent.includes('setActiveSubTab(\'routine\')'), 'TasksRemindersLightMode must have Routine button');
assert(lightContent.includes('DailyRoutineLightMode'), 'TasksRemindersLightMode must conditionally render DailyRoutineLightMode');
assert(lightContent.includes('hideHeader={true}'), 'TasksRemindersLightMode must hide nested header');
console.log('✓ 3. TasksRemindersLightMode includes segmented switcher & conditional rendering');

// 4. Verify exact line parity
const darkLines = darkContent.split('\n').length;
const lightLines = lightContent.split('\n').length;
assert.strictEqual(darkLines, lightLines, 'Dark and Light Tasks screens must have identical line counts');
console.log(`✓ 4. Exact line parity preserved: ${darkLines} vs ${lightLines} lines`);

// 5. Verify App.jsx routes daily_routine to initialSubTab="routine"
const appContent = fs.readFileSync('src/App.jsx', 'utf8');
assert(appContent.includes('initialSubTab="routine"'), 'App.jsx must route daily_routine with initialSubTab="routine"');
console.log('✓ 5. App.jsx route integration confirmed');

// 6. Verify DailyRoutine supports hideHeader
const drContent = fs.readFileSync('src/DailyRoutine.jsx', 'utf8');
assert(drContent.includes('hideHeader'), 'DailyRoutine.jsx must support hideHeader');
console.log('✓ 6. DailyRoutine hideHeader propagation confirmed');

console.log('\n=== ALL UNIFIED TASKS TESTS PASSED! ===');

