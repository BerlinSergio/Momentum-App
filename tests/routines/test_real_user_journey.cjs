/**
 * tests/routines/test_real_user_journey.cjs
 * End-to-end multi-day user journey test (Steps 1 through 21 from specification):
 * 1. Create a Routine named "Morning Exercise"
 * 2. Set recurrence to Every Day
 * 3. Set a time and reminder
 * 4. Save
 * 5. Verify it appears today
 * 6. Mark it Done
 * 7. Verify Home progress & streak
 * 8. Reload / rehydrate
 * 9. Verify today's Done persists
 * 10. Advance test date to tomorrow
 * 11. Verify the same Routine appears Pending
 * 12. Verify yesterday is still Done in history
 * 13. Mark tomorrow Done
 * 14. Verify the streak increments
 * 15. Advance another day without completion (missed day)
 * 16. Verify missed-day behavior
 * 17. Edit the Routine schedule (e.g. change to Mon-Fri)
 * 18. Verify recurrence updates
 * 19. Disable the Routine (active = false)
 * 20. Verify it no longer appears as due
 * 21. Re-enable it and confirm correct eligible-day behavior
 */

const assert = require('assert');
const path = require('path');

async function runRealUserJourney() {
  console.log('======================================================================');
  console.log('  TEST SUITE 4: 21-STEP REAL MULTI-DAY USER RECURRENCE JOURNEY        ');
  console.log('======================================================================\n');

  let passed = 0;
  let total = 0;

  function check(name, fn) {
    total++;
    try {
      fn();
      console.log(`[PASS] Step ${total}: ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] Step ${total}: ${name}`);
      console.error('       Error:', err.message);
    }
  }

  const storePath = path.resolve('src/store/useRoutineStore.js').replace(/\\/g, '/');
  const {
    useRoutineStore,
    normalizeRoutine,
    isRoutineScheduledForDate,
    isRoutineCompletedForDate,
    getDailyRoutineProgress,
    calculateGlobalStreak,
    calculateRoutineCurrentStreak,
  } = await import('file:///' + storePath + '?t=' + Date.now());

  // Reset store to disposable test sandbox
  useRoutineStore.setState({
    routines: [],
    baseStreak: 0,
    streakCount: 0,
    currentStreak: 0,
    lastActiveDateKey: '2026-11-20',
  });

  let createdRoutineId = null;

  // Step 1 - 4: Create Routine "Morning Exercise", Every Day, 07:00 AM, with reminder
  check('1-4. Create and save routine "Morning Exercise" (Every Day, 07:00 AM)', () => {
    useRoutineStore.getState().addRoutine({
      title: 'Morning Exercise',
      category: 'Health & Fitness',
      frequency: 'Every Day',
      weekdays: [0, 1, 2, 3, 4, 5, 6],
      time: '07:00 AM',
      duration: 30,
      reminderEnabled: true,
      reminderOffset: 15,
      reminderSound: 'Nature Breeze',
      notes: 'Morning full body stretch and light jog.',
    });

    const routines = useRoutineStore.getState().routines;
    assert.strictEqual(routines.length, 1);
    assert.strictEqual(routines[0].title, 'Morning Exercise');
    assert.strictEqual(routines[0].frequency, 'Every Day');
    assert.strictEqual(routines[0].reminder, '15m before');
    createdRoutineId = routines[0].id;
  });

  const DAY_1 = '2026-11-20'; // Friday
  const DAY_2 = '2026-11-21'; // Saturday
  const DAY_3 = '2026-11-22'; // Sunday
  const DAY_4 = '2026-11-23'; // Monday

  // Step 5: Verify it appears today (Day 1) as Pending
  check('5. Verify routine appears on Day 1 (2026-11-20) as Pending', () => {
    const routine = useRoutineStore.getState().routines.find((r) => r.id === createdRoutineId);
    assert.strictEqual(isRoutineScheduledForDate(routine, DAY_1), true);
    assert.strictEqual(isRoutineCompletedForDate(routine, DAY_1), false);
    const progress = useRoutineStore.getState().getTodayProgress(DAY_1);
    assert.strictEqual(progress.total, 1);
    assert.strictEqual(progress.done, 0);
  });

  // Step 6: Mark it Done on Day 1
  check('6. Mark routine Done for Day 1', () => {
    useRoutineStore.getState().toggleRoutineCompletion(createdRoutineId, DAY_1);
    const routine = useRoutineStore.getState().routines.find((r) => r.id === createdRoutineId);
    assert.strictEqual(isRoutineCompletedForDate(routine, DAY_1), true);
  });

  // Step 7: Verify Home progress and streak after Day 1 completion
  check('7. Verify progress is 100% (1/1) and streak is 1', () => {
    const progress = useRoutineStore.getState().getTodayProgress(DAY_1);
    assert.strictEqual(progress.total, 1);
    assert.strictEqual(progress.done, 1);
    assert.strictEqual(progress.percentage, 100);
    const streak = useRoutineStore.getState().getCurrentStreak(DAY_1);
    assert.strictEqual(streak, 1);
  });

  // Step 8 & 9: Simulate reload / persistence rehydration
  check('8-9. Reload / rehydrate store: Day 1 Done status persists', () => {
    const serialized = JSON.stringify(useRoutineStore.getState());
    const parsed = JSON.parse(serialized);
    const rehydratedRoutines = parsed.routines.map(normalizeRoutine);
    useRoutineStore.setState({ ...parsed, routines: rehydratedRoutines });

    const routine = useRoutineStore.getState().routines.find((r) => r.id === createdRoutineId);
    assert.strictEqual(isRoutineCompletedForDate(routine, DAY_1), true, 'Day 1 Done persists after reload');
  });

  // Step 10 & 11: Advance test clock to Day 2 (tomorrow)
  check('10-11. Advance to Day 2: Same routine appears automatically as Pending', () => {
    useRoutineStore.getState().performDayRollover(DAY_2);

    const routine = useRoutineStore.getState().routines.find((r) => r.id === createdRoutineId);
    assert.strictEqual(isRoutineScheduledForDate(routine, DAY_2), true, 'Routine is scheduled on Day 2');
    assert.strictEqual(isRoutineCompletedForDate(routine, DAY_2), false, 'Routine status is PENDING on Day 2');
    const progress = useRoutineStore.getState().getTodayProgress(DAY_2);
    assert.strictEqual(progress.total, 1);
    assert.strictEqual(progress.done, 0);
    assert.strictEqual(progress.percentage, 0);
  });

  // Step 12: Verify Day 1 is still Done in history
  check('12. Verify Day 1 completion is intact in history', () => {
    const routine = useRoutineStore.getState().routines.find((r) => r.id === createdRoutineId);
    assert.strictEqual(isRoutineCompletedForDate(routine, DAY_1), true, 'Day 1 history remains Done');
  });

  // Step 13: Mark Day 2 Done
  check('13. Mark Day 2 Done', () => {
    useRoutineStore.getState().toggleRoutineCompletion(createdRoutineId, DAY_2);
    const routine = useRoutineStore.getState().routines.find((r) => r.id === createdRoutineId);
    assert.strictEqual(isRoutineCompletedForDate(routine, DAY_2), true);
  });

  // Step 14: Verify streak increments to 2
  check('14. Verify consecutive streak increments to 2', () => {
    const streak = useRoutineStore.getState().getCurrentStreak(DAY_2);
    assert.strictEqual(streak, 2, 'Streak must be 2 after Day 1 and Day 2 completions');
  });

  // Step 15 & 16: Advance to Day 3 without completion (missed day) -> Advance to Day 4
  check('15-16. Advance through Day 3 without completion: streak properly breaks on missed day', () => {
    // Day 3 rollover: user does NOT complete it
    useRoutineStore.getState().performDayRollover(DAY_3);
    const routine = useRoutineStore.getState().routines.find((r) => r.id === createdRoutineId);
    assert.strictEqual(isRoutineCompletedForDate(routine, DAY_3), false, 'Day 3 was not completed');

    // Advance to Day 4: Day 3 missed day breaks the streak chain
    useRoutineStore.getState().performDayRollover(DAY_4);
    const streakDay4Morning = useRoutineStore.getState().getCurrentStreak(DAY_4);
    assert.strictEqual(streakDay4Morning, 0, 'Streak must reset to 0 after missed scheduled day');

    // Previous days' history remains preserved
    assert.strictEqual(isRoutineCompletedForDate(routine, DAY_1), true, 'Day 1 history preserved');
    assert.strictEqual(isRoutineCompletedForDate(routine, DAY_2), true, 'Day 2 history preserved');
    assert.strictEqual(isRoutineCompletedForDate(routine, DAY_3), false, 'Day 3 history preserved as incomplete');
  });

  // Step 17 & 18: Edit Routine schedule to Mon–Fri
  check('17-18. Edit routine recurrence to Mon–Fri: Saturday/Sunday excluded, weekdays included', () => {
    useRoutineStore.getState().updateRoutine(createdRoutineId, {
      frequency: 'Mon–Fri',
      weekdays: [1, 2, 3, 4, 5],
    });

    const updated = useRoutineStore.getState().routines.find((r) => r.id === createdRoutineId);
    assert.strictEqual(updated.frequency, 'Mon–Fri');
    // Saturday 2026-11-21 is NOT scheduled
    assert.strictEqual(isRoutineScheduledForDate(updated, '2026-11-21'), false);
    // Sunday 2026-11-22 is NOT scheduled
    assert.strictEqual(isRoutineScheduledForDate(updated, '2026-11-22'), false);
    // Monday 2026-11-23 IS scheduled
    assert.strictEqual(isRoutineScheduledForDate(updated, '2026-11-23'), true);
  });

  // Step 19 & 20: Deactivate routine (active: false)
  check('19-20. Deactivate routine: it no longer appears as due', () => {
    useRoutineStore.getState().updateRoutine(createdRoutineId, { active: false });
    const inactive = useRoutineStore.getState().routines.find((r) => r.id === createdRoutineId);
    assert.strictEqual(inactive.active, false);
    assert.strictEqual(isRoutineScheduledForDate(inactive, '2026-11-23'), false, 'Inactive routine must not be due');
  });

  // Step 21: Re-enable routine and verify eligible day behavior
  check('21. Re-enable routine: correctly reappears as due on scheduled weekdays', () => {
    useRoutineStore.getState().updateRoutine(createdRoutineId, { active: true });
    const active = useRoutineStore.getState().routines.find((r) => r.id === createdRoutineId);
    assert.strictEqual(active.active, true);
    assert.strictEqual(isRoutineScheduledForDate(active, '2026-11-23'), true, 'Monday due');
    assert.strictEqual(isRoutineScheduledForDate(active, '2026-11-28'), false, 'Saturday not due');
  });

  console.log('\n======================================================================');
  console.log(`  REAL USER JOURNEY: ${passed} / ${total} STEPS PASSED`);
  console.log('======================================================================\n');

  if (passed !== total) {
    process.exit(1);
  }
}

runRealUserJourney().catch((err) => {
  console.error('[FATAL]', err);
  process.exit(1);
});
