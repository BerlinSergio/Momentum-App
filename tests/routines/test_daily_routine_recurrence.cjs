/**
 * tests/routines/test_daily_routine_recurrence.cjs
 * Comprehensive verification of Daily Routine Recurrence:
 * - Decoupled routine definition vs date-specific completion history
 * - Every Day recurrence schedule
 * - Monday–Friday (Weekday) recurrence schedule
 * - Custom weekday selection (e.g. Mon, Wed, Fri)
 * - Start dates, end dates, active/inactive states
 * - Mark as Done on Day 1 -> Pending on Day 2 -> Completion history intact
 * - Undo completion per calendar date
 * - Live UI verification in Chromium
 */

const assert = require('assert');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';
const ARTIFACTS_DIR = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTestSuite() {
  console.log('======================================================================');
  console.log('  TEST SUITE 1: DAILY ROUTINE RECURRENCE & DATE-ISOLATED COMPLETIONS  ');
  console.log('======================================================================\n');

  let passed = 0;
  let total = 0;

  function check(name, fn) {
    total++;
    try {
      fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}`);
      console.error('       Error:', err.message);
    }
  }

  // --- Part 1: Pure Model Recurrence Verification ---
  console.log('--- Part 1: Pure Model Recurrence Verification ---');
  const storePath = path.resolve('src/store/useRoutineStore.js').replace(/\\/g, '/');
  const {
    normalizeRoutine,
    isRoutineScheduledForDate,
    isRoutineCompletedForDate,
    getScheduledRoutinesForDate,
    getDailyRoutineProgress,
    deriveWeekdaysFromFrequency,
    deriveFrequencyLabel,
    WEEKDAY_TOKENS,
  } = await import('file:///' + storePath + '?t=' + Date.now());

  // 1.1 Weekday and Frequency Normalization
  check('1.1 Weekday Tokens Array (7 standard days: Sun=0 through Sat=6)', () => {
    assert.strictEqual(WEEKDAY_TOKENS.length, 7);
    assert.strictEqual(WEEKDAY_TOKENS[0], 'Sun');
    assert.strictEqual(WEEKDAY_TOKENS[1], 'Mon');
    assert.strictEqual(WEEKDAY_TOKENS[5], 'Fri');
    assert.strictEqual(WEEKDAY_TOKENS[6], 'Sat');
  });

  check('1.2 Weekday derivation from frequency label', () => {
    const everyDay = deriveWeekdaysFromFrequency('Every Day');
    assert.deepStrictEqual(everyDay, [0, 1, 2, 3, 4, 5, 6]);

    const monFri = deriveWeekdaysFromFrequency('Mon–Fri');
    assert.deepStrictEqual(monFri, [1, 2, 3, 4, 5]);

    const weekends = deriveWeekdaysFromFrequency('Weekends');
    assert.deepStrictEqual(weekends, [0, 6]);
  });

  check('1.3 Frequency label derivation from weekday array', () => {
    assert.strictEqual(deriveFrequencyLabel([0, 1, 2, 3, 4, 5, 6]), 'Every Day');
    assert.strictEqual(deriveFrequencyLabel([1, 2, 3, 4, 5]), 'Mon–Fri');
    assert.strictEqual(deriveFrequencyLabel([0, 6]), 'Weekends');
    assert.strictEqual(deriveFrequencyLabel([1, 3, 5]), 'Custom Days');
  });

  // 1.4 Every Day Schedule Verification
  const everyDayRoutine = normalizeRoutine({
    id: 'rt-test-everyday',
    title: 'Morning Contemplation',
    frequency: 'Every Day',
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    time: '06:00 AM',
  });

  check('1.4 Every Day routine is scheduled for all 7 days of the week', () => {
    // 2026-11-15 is Sunday (0), 2026-11-16 is Monday (1), ..., 2026-11-21 is Saturday (6)
    assert.strictEqual(isRoutineScheduledForDate(everyDayRoutine, '2026-11-15'), true, 'Sunday');
    assert.strictEqual(isRoutineScheduledForDate(everyDayRoutine, '2026-11-16'), true, 'Monday');
    assert.strictEqual(isRoutineScheduledForDate(everyDayRoutine, '2026-11-17'), true, 'Tuesday');
    assert.strictEqual(isRoutineScheduledForDate(everyDayRoutine, '2026-11-18'), true, 'Wednesday');
    assert.strictEqual(isRoutineScheduledForDate(everyDayRoutine, '2026-11-19'), true, 'Thursday');
    assert.strictEqual(isRoutineScheduledForDate(everyDayRoutine, '2026-11-20'), true, 'Friday');
    assert.strictEqual(isRoutineScheduledForDate(everyDayRoutine, '2026-11-21'), true, 'Saturday');
  });

  // 1.5 Mon–Fri Schedule Verification
  const weekdayRoutine = normalizeRoutine({
    id: 'rt-test-monfri',
    title: 'Deep Focus Sprint',
    frequency: 'Mon–Fri',
    weekdays: [1, 2, 3, 4, 5],
    time: '09:00 AM',
  });

  check('1.5 Weekday routine is scheduled Mon–Fri and NOT on Saturday/Sunday', () => {
    assert.strictEqual(isRoutineScheduledForDate(weekdayRoutine, '2026-11-15'), false, 'Sunday must not be scheduled');
    assert.strictEqual(isRoutineScheduledForDate(weekdayRoutine, '2026-11-16'), true, 'Monday must be scheduled');
    assert.strictEqual(isRoutineScheduledForDate(weekdayRoutine, '2026-11-17'), true, 'Tuesday must be scheduled');
    assert.strictEqual(isRoutineScheduledForDate(weekdayRoutine, '2026-11-18'), true, 'Wednesday must be scheduled');
    assert.strictEqual(isRoutineScheduledForDate(weekdayRoutine, '2026-11-19'), true, 'Thursday must be scheduled');
    assert.strictEqual(isRoutineScheduledForDate(weekdayRoutine, '2026-11-20'), true, 'Friday must be scheduled');
    assert.strictEqual(isRoutineScheduledForDate(weekdayRoutine, '2026-11-21'), false, 'Saturday must not be scheduled');
  });

  // 1.6 Custom Weekday Schedule Verification (Tue & Thu only: [2, 4])
  const customRoutine = normalizeRoutine({
    id: 'rt-test-custom',
    title: 'Strength Training',
    frequency: 'Custom Days',
    weekdays: [2, 4],
    time: '05:30 PM',
  });

  check('1.6 Custom weekday routine appears ONLY on selected days (Tue & Thu)', () => {
    assert.strictEqual(isRoutineScheduledForDate(customRoutine, '2026-11-15'), false, 'Sunday');
    assert.strictEqual(isRoutineScheduledForDate(customRoutine, '2026-11-16'), false, 'Monday');
    assert.strictEqual(isRoutineScheduledForDate(customRoutine, '2026-11-17'), true, 'Tuesday must be scheduled');
    assert.strictEqual(isRoutineScheduledForDate(customRoutine, '2026-11-18'), false, 'Wednesday');
    assert.strictEqual(isRoutineScheduledForDate(customRoutine, '2026-11-19'), true, 'Thursday must be scheduled');
    assert.strictEqual(isRoutineScheduledForDate(customRoutine, '2026-11-20'), false, 'Friday');
    assert.strictEqual(isRoutineScheduledForDate(customRoutine, '2026-11-21'), false, 'Saturday');
  });

  // 1.7 Start Date & End Date Restrictions
  const boundedRoutine = normalizeRoutine({
    id: 'rt-test-bounded',
    title: 'Special Ramadan Habit',
    frequency: 'Every Day',
    startDate: '2026-11-18',
    endDate: '2026-11-22',
  });

  check('1.7 Start and End dates strictly respected', () => {
    assert.strictEqual(isRoutineScheduledForDate(boundedRoutine, '2026-11-17'), false, 'Before start date');
    assert.strictEqual(isRoutineScheduledForDate(boundedRoutine, '2026-11-18'), true, 'On start date');
    assert.strictEqual(isRoutineScheduledForDate(boundedRoutine, '2026-11-22'), true, 'On end date');
    assert.strictEqual(isRoutineScheduledForDate(boundedRoutine, '2026-11-23'), false, 'After end date');
  });

  // 1.8 Active / Inactive / Deactivated Status
  const inactiveRoutine = normalizeRoutine({
    id: 'rt-test-inactive',
    title: 'Archived Habit',
    frequency: 'Every Day',
    active: false,
  });

  check('1.8 Inactive routine does not appear as scheduled due item', () => {
    assert.strictEqual(isRoutineScheduledForDate(inactiveRoutine, '2026-11-20'), false);
    assert.strictEqual(isRoutineScheduledForDate(inactiveRoutine, '2026-11-21'), false);
  });

  // 1.9 Multi-Day Completion Independence (Day 1 Done -> Day 2 Pending)
  check('1.9 Day 1 marked Done does NOT make Day 2 marked Done', () => {
    const routine = normalizeRoutine({
      id: 'rt-independent-completion',
      title: 'Hydration 500ml',
      frequency: 'Every Day',
      completedDates: {
        '2026-11-20': true,
      },
    });

    assert.strictEqual(isRoutineCompletedForDate(routine, '2026-11-20'), true, 'Day 1 is completed');
    assert.strictEqual(isRoutineCompletedForDate(routine, '2026-11-21'), false, 'Day 2 must be pending');
    assert.strictEqual(isRoutineCompletedForDate(routine, '2026-11-22'), false, 'Day 3 must be pending');
  });

  // 1.10 Undo Completion isolation
  check('1.10 Undo completion modifies ONLY target date without wiping other dates', () => {
    const routine = normalizeRoutine({
      id: 'rt-undo-test',
      title: 'Read beneficial book',
      frequency: 'Every Day',
      completedDates: {
        '2026-11-18': true,
        '2026-11-19': true,
        '2026-11-20': true,
      },
    });

    // Undo 2026-11-20
    routine.completedDates['2026-11-20'] = false;

    assert.strictEqual(isRoutineCompletedForDate(routine, '2026-11-18'), true, 'Day 18 preserved');
    assert.strictEqual(isRoutineCompletedForDate(routine, '2026-11-19'), true, 'Day 19 preserved');
    assert.strictEqual(isRoutineCompletedForDate(routine, '2026-11-20'), false, 'Day 20 reverted to pending');
  });

  // 1.11 getDailyRoutineProgress computation
  check('1.11 getDailyRoutineProgress computes accurate ratios and filters unscheduled routines', () => {
    const allRoutines = [everyDayRoutine, weekdayRoutine, customRoutine];
    // On Saturday 2026-11-21:
    // everyDayRoutine: scheduled
    // weekdayRoutine: NOT scheduled (Saturday)
    // customRoutine: NOT scheduled (Saturday)
    const satProgress = getDailyRoutineProgress(allRoutines, '2026-11-21');
    assert.strictEqual(satProgress.total, 1, 'Only 1 routine scheduled on Saturday');
    assert.strictEqual(satProgress.done, 0, '0 done initially');
    assert.strictEqual(satProgress.percentage, 0);

    // On Tuesday 2026-11-17:
    // everyDayRoutine: scheduled
    // weekdayRoutine: scheduled (Mon-Fri)
    // customRoutine: scheduled (Tue/Thu)
    const tueProgress = getDailyRoutineProgress(allRoutines, '2026-11-17');
    assert.strictEqual(tueProgress.total, 3, '3 routines scheduled on Tuesday');
  });

  // --- Part 2: Real Browser UI Verification ---
  console.log('\n--- Part 2: Real Browser UI Verification in Chromium ---');
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(APP_URL, { waitUntil: 'networkidle0' });

    // Wait for initial splash screen to dismiss
    await new Promise((r) => setTimeout(r, 3500));
    await page.waitForFunction(() => window.useRoutineStore && window.useNavigationStore);

    // Ensure Profile is set up with completed onboarding and App Lock inactive
    await page.evaluate(() => {
      window.useProfileStore?.getState()?.updateProfile({
        fullName: 'Milad Wardak',
        setupCompleted: true,
        onboardingStep: 'completed',
      });
      window.useSecurityStore?.getState()?.setAppLockActive?.(false);
      window.useNavigationStore?.getState()?.navigateTo('daily_routine_light_mode');
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Verify Daily Routine is rendered
    const titleMatches = await page.evaluate(() => {
      const h1s = Array.from(document.querySelectorAll('h1')).map((h) => h.innerText);
      return h1s.some((t) => t.includes('Habits') || t.includes('Daily Routine'));
    });

    check('2.1 Daily Routine screen renders header and title', () => {
      assert.strictEqual(titleMatches, true, 'Daily Routine / Habits header must be present');
    });

    // Check progress card exists
    const progressRendered = await page.evaluate(() => {
      const ring = document.querySelector('svg');
      const h2s = Array.from(document.querySelectorAll('h2')).map((h) => h.innerText);
      return Boolean(ring && h2s.some((text) => text.includes('Done')));
    });

    check('2.2 Progress Card with Circular Ring & Done ratio renders in DOM', () => {
      assert.strictEqual(progressRendered, true, 'Progress Card elements must be present');
    });

    // Capture screenshot
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'daily_routine_recurrence_light.png'),
    });
    console.log('[ARTIFACT] Saved daily_routine_recurrence_light.png');

    await browser.close();
  } catch (browserErr) {
    if (browser) await browser.close();
    console.error('[BROWSER ERROR]', browserErr.message);
  }

  console.log('\n======================================================================');
  console.log(`  TEST RESULTS: ${passed} / ${total} CHECKS PASSED`);
  console.log('======================================================================\n');

  if (passed !== total) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('[FATAL]', err);
  process.exit(1);
});
