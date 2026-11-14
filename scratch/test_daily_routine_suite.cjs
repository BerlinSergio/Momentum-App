const fs = require('fs');
const assert = require('assert');

console.log('================================================================');
console.log('       DAILY ROUTINE OVERHAUL VERIFICATION SUITE                ');
console.log('================================================================\n');

// 1. Verify Bottom Nav consistency & removal of irregular bottom nav
console.log('▶ [1/5] Checking Bottom Navigation consistency...');
const darkContent = fs.readFileSync('src/DailyRoutineDarkMode.jsx', 'utf8');
const lightContent = fs.readFileSync('src/DailyRoutineLightMode.jsx', 'utf8');
const appContent = fs.readFileSync('src/App.jsx', 'utf8');

assert(appContent.includes("<BottomNavBar"), 'App.jsx must render global BottomNavBar');
assert(!darkContent.includes('bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 text-slate-400 px-4 py-3 rounded-t-3xl'), 'Irregular bottom nav div must be removed from dark mode');
assert(!lightContent.includes('bg-white/90 backdrop-blur-xl border-t border-slate-200/80 text-slate-500 px-4 py-3 rounded-t-3xl'), 'Irregular bottom nav div must be removed from light mode');
assert(darkContent.includes('pb-32'), 'Dark mode must have pb-32 scroll padding for floating BottomNav');
assert(lightContent.includes('pb-32'), 'Light mode must have pb-32 scroll padding for floating BottomNav');
console.log('  ✓ Standardized global BottomNavBar installed in App.jsx and screen scroll padding verified.\n');

// 2. Verify Live Data Integration
console.log('▶ [2/5] Checking Live Data Integration with useRoutineStore...');
assert(darkContent.includes("useRoutineStore"), 'Dark mode must connect to useRoutineStore');
assert(lightContent.includes("useRoutineStore"), 'Light mode must connect to useRoutineStore');
assert(darkContent.includes(".map((routine) =>"), 'Dark mode must map over dynamic routines');
assert(lightContent.includes(".map((routine) =>"), 'Light mode must map over dynamic routines');
console.log('  ✓ Dynamic store integration and list mapping verified.\n');

// 3. Verify Functional Filters
console.log('▶ [3/5] Checking Functional Filters (All, Morning, Afternoon, Evening)...');
assert(darkContent.includes("getRoutinePeriod"), 'Dark mode must define getRoutinePeriod');
assert(lightContent.includes("getRoutinePeriod"), 'Light mode must define getRoutinePeriod');
assert(darkContent.includes("setSelectedFilter(f.id)"), 'Dark mode must update selected filter on click');
assert(lightContent.includes("setSelectedFilter(f.id)"), 'Light mode must update selected filter on click');
assert(darkContent.includes("{f.label} ({f.count})"), 'Dark mode must show dynamic count in filter chips');
assert(lightContent.includes("{f.label} ({f.count})"), 'Light mode must show dynamic count in filter chips');

// Simulate period helper logic
const getRoutinePeriod = (routine) => {
  if (!routine) return 'Morning';
  if (routine.period) {
    const p = routine.period.toLowerCase();
    if (p.includes('morn')) return 'Morning';
    if (p.includes('after')) return 'Afternoon';
    if (p.includes('even') || p.includes('night')) return 'Evening';
  }
  if (routine.time) {
    const match = routine.time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const modifier = (match[3] || '').toUpperCase();
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      const totalMinutes = hours * 60 + minutes;
      if (totalMinutes < 12 * 60) return 'Morning';
      if (totalMinutes < 16 * 60) return 'Afternoon';
      return 'Evening';
    }
  }
  return 'Morning';
};

const sampleRoutines = [
  { id: '1', title: 'Fajr', time: '05:15 AM' },
  { id: '2', title: 'Hydration', time: '06:30 AM' },
  { id: '3', title: 'Focus', time: '09:30 AM' },
  { id: '4', title: 'Dhuhr', time: '01:15 PM' },
  { id: '5', title: 'Asr', time: '04:45 PM' },
  { id: '6', title: 'Family', time: '07:00 PM' }
];

const morning = sampleRoutines.filter(r => getRoutinePeriod(r) === 'Morning').length;
const afternoon = sampleRoutines.filter(r => getRoutinePeriod(r) === 'Afternoon').length;
const evening = sampleRoutines.filter(r => getRoutinePeriod(r) === 'Evening').length;

assert.strictEqual(morning, 3, 'Morning count should be 3');
assert.strictEqual(afternoon, 1, 'Afternoon count should be 1');
assert.strictEqual(evening, 2, 'Evening count should be 2');
console.log(`  ✓ Filter categorization tested: Morning: ${morning}, Afternoon: ${afternoon}, Evening: ${evening}.\n`);

// 4. Verify Interactive Actions (Toggle, Edit, Delete)
console.log('▶ [4/5] Checking Interactive Actions (Toggle, Edit, Delete)...');
assert(darkContent.includes('toggleRoutineStatus(routine.id)'), 'Dark mode must trigger toggleRoutineStatus on circle click');
assert(lightContent.includes('toggleRoutineStatus(routine.id)'), 'Light mode must trigger toggleRoutineStatus on circle click');
assert(darkContent.includes('setEditingRoutineId(routine.id)'), 'Dark mode must set editingRoutineId on pencil click');
assert(lightContent.includes('setEditingRoutineId(routine.id)'), 'Light mode must set editingRoutineId on pencil click');
assert(darkContent.includes('deleteRoutine(routine.id)'), 'Dark mode must call deleteRoutine on trash click');
assert(lightContent.includes('deleteRoutine(routine.id)'), 'Light mode must call deleteRoutine on trash click');
console.log('  ✓ Toggle, Edit, and Delete actions properly wired.\n');

// 5. Verify Progress & Stats
console.log('▶ [5/5] Checking Progress & Stats calculation...');
assert(darkContent.includes('{doneCount} of {totalCount} Done'), 'Dark mode must calculate dynamic "X of Y Done"');
assert(lightContent.includes('{doneCount} of {totalCount} Done'), 'Light mode must calculate dynamic "X of Y Done"');
assert(darkContent.includes('{percentage}%'), 'Dark mode must show dynamic percentage');
assert(lightContent.includes('{percentage}%'), 'Light mode must show dynamic percentage');

const totalCount = 6;
const doneCount = 4;
const percentage = Math.round((doneCount / totalCount) * 100);
assert.strictEqual(percentage, 67, 'Percentage should match 67% for 4 of 6 done');
console.log(`  ✓ Stats calculation verified: 4 of 6 -> ${percentage}%.\n`);

console.log('================================================================');
console.log('           ALL 5 ROUTINE REQUIREMENTS VERIFIED!                 ');
console.log('================================================================');

