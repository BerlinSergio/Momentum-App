const fs = require('fs');
const assert = require('assert');

console.log('================================================================');
console.log('       ROUTINE CARDS INTERACTIVITY & EDIT AUDIT SUITE           ');
console.log('================================================================\n');

// 1. Verify absence of disabled / opacity classes
console.log('▶ [1/4] Checking absence of disabled/grayed-out classes on routine cards...');
const darkContent = fs.readFileSync('src/DailyRoutineDarkMode.jsx', 'utf8');
const lightContent = fs.readFileSync('src/DailyRoutineLightMode.jsx', 'utf8');

assert(!darkContent.includes('opacity-50'), 'Dark mode should not have opacity-50 on routine cards');
assert(!lightContent.includes('opacity-50'), 'Light mode should not have opacity-50 on routine cards');
assert(!darkContent.includes('opacity-65'), 'Dark mode should not have opacity-65 on routine cards');
assert(!lightContent.includes('opacity-65'), 'Light mode should not have opacity-65 on routine cards');
assert(!darkContent.includes('pointer-events-none z-10'), 'List container must not have pointer-events-none');
assert(!lightContent.includes('pointer-events-none z-10'), 'List container must not have pointer-events-none');
assert(!darkContent.includes('cursor-not-allowed'), 'List container must not have cursor-not-allowed');
assert(!lightContent.includes('cursor-not-allowed'), 'List container must not have cursor-not-allowed');

assert(darkContent.includes('cursor-pointer relative z-10'), 'Dark mode routine card must be relative z-10 cursor-pointer');
assert(lightContent.includes('cursor-pointer relative z-10'), 'Light mode routine card must be relative z-10 cursor-pointer');
console.log('  ✓ Verified 100% opaque, bright, and interactive container classes.\n');

// 2. Verify touch targets on toggle, edit, and delete buttons
console.log('▶ [2/4] Verifying touch targets & z-index stacking on action buttons...');
assert(darkContent.includes('relative z-20 w-8 h-8 rounded-full'), 'Check toggle must have relative z-20 w-8 h-8');
assert(lightContent.includes('relative z-20 w-8 h-8 rounded-full'), 'Check toggle must have relative z-20 w-8 h-8');
assert(darkContent.includes('relative z-20 w-9 h-9 rounded-xl'), 'Edit pencil must have relative z-20 w-9 h-9');
assert(lightContent.includes('relative z-20 w-9 h-9 rounded-xl'), 'Edit pencil must have relative z-20 w-9 h-9');
assert(darkContent.includes('e.stopPropagation()'), 'Dark mode action buttons must call e.stopPropagation()');
assert(lightContent.includes('e.stopPropagation()'), 'Light mode action buttons must call e.stopPropagation()');
console.log('  ✓ Touch targets and event isolation (e.stopPropagation()) verified.\n');

// 3. Verify Edit functionality wiring
console.log('▶ [3/4] Verifying Edit action wires routine.id and opens edit mode...');
assert(darkContent.includes('setEditingRoutineId(routine.id)'), 'Dark mode must store editingRoutineId on click');
assert(lightContent.includes('setEditingRoutineId(routine.id)'), 'Light mode must store editingRoutineId on click');
assert(darkContent.includes("navigateScreen('add_edit_routine_dark_mode')"), 'Dark mode must navigate to add_edit_routine_dark_mode');
assert(lightContent.includes("navigateScreen('add_edit_routine_light_mode')"), 'Light mode must navigate to add_edit_routine_light_mode');
console.log('  ✓ Routine ID passed to store and edit screen navigation invoked.\n');

// 4. Verify AddEditRoutine receives data & supports editing
console.log('▶ [4/4] Verifying AddEditRoutine displays existing data when editing...');
const addEditDark = fs.readFileSync('src/AddEditRoutineDarkMode.jsx', 'utf8');
const addEditLight = fs.readFileSync('src/AddEditRoutineLightMode.jsx', 'utf8');

assert(addEditLight.includes("{isEditing ? 'Edit Routine' : 'Add Routine'}"), 'Light mode must display Edit Routine when editing');
assert(addEditDark.includes("{isEditing ? 'Edit Routine' : 'Add Routine'}"), 'Dark mode must display Edit Routine when editing');
assert(addEditLight.includes('defaultValue={existingRoutine ? existingRoutine.title'), 'Light mode must populate routine title');
assert(addEditDark.includes('defaultValue={existingRoutine ? existingRoutine.title'), 'Dark mode must populate routine title');
assert(addEditLight.includes('updateRoutine(existingRoutine.id'), 'Light mode must call updateRoutine on save');
assert(addEditDark.includes('updateRoutine(existingRoutine.id'), 'Dark mode must call updateRoutine on save');
console.log('  ✓ AddEditRoutine dynamically populates existing routine data and updates on save.\n');

console.log('================================================================');
console.log('          ALL INTERACTIVITY & EDIT CHECKS PASSED!              ');
console.log('================================================================');

