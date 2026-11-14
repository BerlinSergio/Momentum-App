const fs = require('fs');
const assert = require('assert');
const path = require('path');

console.log('=== RUNNING LIVE TASK AGENDASYNC AUDIT ===');

const lightCode = fs.readFileSync(path.resolve('src/CalendarsMainLightMode.jsx'), 'utf8');
const darkCode = fs.readFileSync(path.resolve('src/CalendarsMainDarkMode.jsx'), 'utf8');

for (const [mode, code] of [['Light', lightCode], ['Dark', darkCode]]) {
  // 1. Check removal of hardcoded mock array
  assert(!code.includes('const AGENDA_EVENTS ='), `${mode} mode must NOT contain hardcoded AGENDA_EVENTS array`);
  assert(!code.includes('Civil Focus & Q4 Milestones'), `${mode} mode must NOT contain hardcoded milestone titles`);

  // 2. Check useTaskStore connection
  assert(code.includes("import { useTaskStore } from './store/useTaskStore';"), `${mode} mode must import useTaskStore`);
  assert(code.includes('const { tasks, toggleTaskStatus } = useTaskStore();'), `${mode} mode must extract tasks and toggleTaskStatus`);

  // 3. Check dynamic mapping from tasks
  assert(code.includes('todayIsoStr'), `${mode} mode must calculate todayIsoStr`);
  assert(code.includes('agendaTasks = useMemo('), `${mode} mode must compute agendaTasks`);
  assert(code.includes('t.startTime'), `${mode} mode must extract startTime`);
  assert(code.includes('t.category'), `${mode} mode must extract category`);
  assert(code.includes('t.description'), `${mode} mode must extract description`);
  assert(code.includes('t.title'), `${mode} mode must extract title`);

  // 4. Check Live Sync
  assert(code.includes('activeTask = useMemo('), `${mode} mode must compute activeTask`);
  assert(code.includes('upcomingTask = useMemo('), `${mode} mode must compute upcomingTask`);
  assert(code.includes('Now Active'), `${mode} mode must render Now Active badge`);
  assert(code.includes('Up Next'), `${mode} mode must render Up Next badge`);
  assert(code.includes('activeGreenBox') || code.includes('ring-emerald'), `${mode} mode must highlight active task`);

  // 5. Check Empty State
  assert(code.includes('agendaTasks.length === 0'), `${mode} mode must check for empty state`);
  assert(code.includes('No tasks scheduled for today'), `${mode} mode must render "No tasks scheduled for today"`);
  assert(code.includes('Add Milestone'), `${mode} mode must provide "Add Milestone" button`);

  // 6. Check functional toggle
  assert(code.includes('toggleTaskStatus && toggleTaskStatus(evt.id)'), `${mode} mode must wire toggleTaskStatus`);
}
console.log('✓ Verified store integration, dynamic mapping, live sync, empty state, and task toggle');

// 7. Test task parsing logic on actual store tasks
const { useTaskStore } = require('../src/store/useTaskStore.js');
const tasks = useTaskStore.getState().tasks;
assert(Array.isArray(tasks) && tasks.length > 0, 'Store must have tasks');

const now = new Date();
const y = now.getFullYear();
const m = String(now.getMonth() + 1).padStart(2, '0');
const d = String(now.getDate()).padStart(2, '0');
const todayStr = `${y}-${m}-${d}`;

const todayTasks = tasks.filter((t) => !t.dueDate || t.dueDate === todayStr || t.dueDate.startsWith(todayStr));
console.log(`✓ Real tasks from store for today (${todayStr}): ${todayTasks.length}`);
todayTasks.forEach((t) => {
  assert(t.title, 'Every task must have a title');
  console.log(`  - ${t.title} [${t.startTime || 'All day'}] (${t.category || 'General'})`);
});

console.log('=== ALL LIVE TASK AGENDASYNC AUDIT TESTS PASSED! ===');

