const assert = require('assert');

async function runTests() {
  console.log('=== Testing Routine Streak Dynamic Calculation & Synchronization ===\n');

  const { useRoutineStore, INITIAL_ROUTINES } = await import('../src/store/useRoutineStore.js');

  // Reset to default initial state
  useRoutineStore.getState().resetToDefaults();
  const state0 = useRoutineStore.getState();

  console.log('1. Checking Initial State:');
  console.log(' - routines count:', state0.routines.length);
  console.log(' - completed routines:', state0.routines.filter(r => r.completed).length);
  console.log(' - baseStreak:', state0.baseStreak);
  console.log(' - streakCount:', state0.streakCount);
  console.log(' - currentStreak:', state0.currentStreak);

  assert.strictEqual(state0.baseStreak, 14, 'baseStreak should be 14');
  assert.strictEqual(state0.streakCount, 14, 'Initial streakCount should be 14');
  assert.strictEqual(state0.currentStreak, 14, 'Initial currentStreak should be 14');
  console.log(' -> PASSED: Initial streak is 14.\n');

  console.log('2. Testing Dynamic Streak Selector on Home Dashboard:');
  function computeHomeStreak(s) {
    const total = s.routines?.length || 0;
    const completed = s.routines?.filter((r) => r.completed).length || 0;
    const base = typeof s.baseStreak === 'number' ? s.baseStreak : 14;
    if (total > 0 && completed === total) {
      return typeof s.streakCount === 'number' && s.streakCount > base ? s.streakCount : base + 1;
    }
    return typeof s.streakCount === 'number' ? s.streakCount : base;
  }

  assert.strictEqual(computeHomeStreak(state0), 14);
  console.log(' -> Home Streak with 4/6 completed: 14 Day Routine Streak -> PASSED\n');

  console.log('3. Completing remaining daily routine tasks (rt-5 and rt-6):');
  useRoutineStore.getState().toggleRoutineCompletion('rt-5');
  let stateAfter5 = useRoutineStore.getState();
  console.log(' - After checking rt-5 (5/6 done): streakCount =', stateAfter5.streakCount, ', Home streak =', computeHomeStreak(stateAfter5));
  assert.strictEqual(stateAfter5.streakCount, 14);

  useRoutineStore.getState().toggleRoutineCompletion('rt-6');
  let stateAfter6 = useRoutineStore.getState();
  console.log(' - After checking rt-6 (6/6 done - 100% complete!): streakCount =', stateAfter6.streakCount, ', currentStreak =', stateAfter6.currentStreak, ', Home streak =', computeHomeStreak(stateAfter6));
  assert.strictEqual(stateAfter6.streakCount, 15, 'streakCount must increment to 15');
  assert.strictEqual(stateAfter6.currentStreak, 15, 'currentStreak must be 15');
  assert.strictEqual(computeHomeStreak(stateAfter6), 15, 'Home streak must dynamically evaluate to 15');
  console.log(' -> PASSED: Streak incremented to 15 Day Routine Streak!\n');

  console.log('4. Testing Unchecking a Routine:');
  useRoutineStore.getState().toggleRoutineCompletion('rt-6');
  let stateAfterUncheck = useRoutineStore.getState();
  console.log(' - After unchecking rt-6 (5/6 done): streakCount =', stateAfterUncheck.streakCount, ', Home streak =', computeHomeStreak(stateAfterUncheck));
  assert.strictEqual(stateAfterUncheck.streakCount, 14, 'streakCount must return to baseStreak 14');
  assert.strictEqual(computeHomeStreak(stateAfterUncheck), 14);
  console.log(' -> PASSED: Reverted back to 14 cleanly.\n');

  console.log('5. Testing Re-completion and Persistence Simulation:');
  useRoutineStore.getState().toggleRoutineCompletion('rt-6');
  assert.strictEqual(useRoutineStore.getState().streakCount, 15);
  console.log(' - 100% completed again: streakCount is 15.');
  console.log(' -> PASSED\n');

  console.log('=== ALL ROUTINE STREAK TESTS PASSED 100% ===');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

