const fs = require('fs');
const assert = require('assert');
const path = require('path');

console.log('=== VERIFYING UI CLEANUP ON CALENDARS & TIME SCREEN ===');

const lightPath = path.resolve('src/CalendarsMainLightMode.jsx');
const darkPath = path.resolve('src/CalendarsMainDarkMode.jsx');

const lightCode = fs.readFileSync(lightPath, 'utf8');
const darkCode = fs.readFileSync(darkPath, 'utf8');

// 1. Confirm deletion of static card and quote
for (const [mode, code] of [['Light', lightCode], ['Dark', darkCode]]) {
  assert(!code.includes('Tri-Equilibrium Synchronized'), `${mode} mode must NOT contain "Tri-Equilibrium Synchronized"`);
  assert(!code.includes('He who orders his hours in rhythm'), `${mode} mode must NOT contain quote text`);
  assert(!code.includes('auto_awesome'), `${mode} mode must NOT contain static quote icon`);

  // 2. Confirm scroll container intact
  assert(code.includes('flex-1 overflow-y-auto w-full px-margin pb-32'), `${mode} mode <main> must maintain flex-1, overflow-y-auto, and pb-32`);
  assert(code.includes('flex-1 overflow-y-auto pb-32 space-y-3'), `${mode} mode agenda section must maintain flex-1, overflow-y-auto, and pb-32`);

  // 3. Confirm store integration intact
  assert(code.includes("import { useTaskStore } from './store/useTaskStore';"), `${mode} mode must retain useTaskStore import`);
  assert(code.includes('const { tasks, toggleTaskStatus } = useTaskStore();'), `${mode} mode must retain task store binding`);
}
console.log('✓ Successfully confirmed removal of static card and preservation of layout & store integration');

console.log('=== ALL CLEANUP VERIFICATION CHECKS PASSED! ===');

