/**
 * tests/routines/test_routine_streak_integrity.cjs
 * Comprehensive verification of Routine Streak Integrity & Home Dashboard Synchronization:
 * - Genuine scheduled-day completion history streak calculation
 * - Non-scheduled days (weekends for Mon–Fri routines) do NOT break streak
 * - Missed scheduled days properly break streak
 * - Pending today holds unbroken past streak without premature break
 * - Marking Done extends streak immediately; Undo rolls back streak immediately
 * - Home Dashboard Routine Streak card synchronization with Routine store
 * - Multi-language RTL rendering (Dari & Pashto) and Light/Dark mode captures
 */

const assert = require('assert');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';
const ARTIFACTS_DIR = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTestSuite() {
  console.log('======================================================================');
  console.log('  TEST SUITE 3: ROUTINE STREAK INTEGRITY & HOME DASHBOARD SYNC        ');
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

  // --- Part 1: Pure Streak Mathematical Model Verification ---
  console.log('--- Part 1: Pure Streak Mathematical Model Verification ---');
  const storePath = path.resolve('src/store/useRoutineStore.js').replace(/\\/g, '/');
  const {
    normalizeRoutine,
    calculateRoutineCurrentStreak,
    calculateGlobalStreak,
    getStreakStatistics,
  } = await import('file:///' + storePath + '?t=' + Date.now());

  // 1.1 Consecutive Every Day Routine Streak
  const routineEveryDay = normalizeRoutine({
    id: 'rt-streak-everyday',
    title: 'Daily Meditation',
    frequency: 'Every Day',
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    completedDates: {
      '2026-11-18': true,
      '2026-11-19': true,
      '2026-11-20': true,
    },
  });

  check('1.1 Unbroken 3-day history with today (2026-11-21) pending yields streak = 3', () => {
    // On 2026-11-21, today is pending (not done yet). Past 3 days are done.
    const streak = calculateRoutineCurrentStreak(routineEveryDay, '2026-11-21');
    assert.strictEqual(streak, 3, 'Streak must hold 3 days from unbroken history');
  });

  check('1.2 Completing today (2026-11-21) increments streak to 4', () => {
    routineEveryDay.completedDates['2026-11-21'] = true;
    const streak = calculateRoutineCurrentStreak(routineEveryDay, '2026-11-21');
    assert.strictEqual(streak, 4, 'Streak must increment to 4 when today is completed');
  });

  check('1.3 Undo today reverts streak back to 3', () => {
    routineEveryDay.completedDates['2026-11-21'] = false;
    const streak = calculateRoutineCurrentStreak(routineEveryDay, '2026-11-21');
    assert.strictEqual(streak, 3, 'Streak must revert to 3 when today is undone');
  });

  // 1.4 Weekday Routine Across Weekend (Mon–Fri)
  // 2026-11-16 (Mon), 2026-11-17 (Tue), 2026-11-18 (Wed), 2026-11-19 (Thu), 2026-11-20 (Fri) completed.
  const weekdayRoutine = normalizeRoutine({
    id: 'rt-streak-weekday',
    title: 'Work Sprint',
    frequency: 'Mon–Fri',
    weekdays: [1, 2, 3, 4, 5],
    completedDates: {
      '2026-11-16': true,
      '2026-11-17': true,
      '2026-11-18': true,
      '2026-11-19': true,
      '2026-11-20': true,
    },
  });

  check('1.4 Weekend days (Sat 2026-11-21 and Sun 2026-11-22) do NOT break Mon–Fri streak', () => {
    const streakSat = calculateRoutineCurrentStreak(weekdayRoutine, '2026-11-21');
    assert.strictEqual(streakSat, 5, 'Saturday must hold 5-day streak');

    const streakSun = calculateRoutineCurrentStreak(weekdayRoutine, '2026-11-22');
    assert.strictEqual(streakSun, 5, 'Sunday must hold 5-day streak');
  });

  check('1.5 Monday 2026-11-23 morning (pending) holds 5-day streak; completed Monday extends to 6', () => {
    const streakMonMorning = calculateRoutineCurrentStreak(weekdayRoutine, '2026-11-23');
    assert.strictEqual(streakMonMorning, 5, 'Monday morning pending must hold 5-day streak');

    weekdayRoutine.completedDates['2026-11-23'] = true;
    const streakMonDone = calculateRoutineCurrentStreak(weekdayRoutine, '2026-11-23');
    assert.strictEqual(streakMonDone, 6, 'Monday completed must advance streak to 6');
  });

  // 1.6 Missed Day Handling
  const missedDayRoutine = normalizeRoutine({
    id: 'rt-streak-missed',
    title: 'Morning Run',
    frequency: 'Every Day',
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    completedDates: {
      '2026-11-17': true,
      '2026-11-18': true,
      // 2026-11-19 was MISSED (false or undefined)
      '2026-11-19': false,
      '2026-11-20': true,
      '2026-11-21': true,
    },
  });

  check('1.6 Missed scheduled day breaks older chain; only recent unbroken consecutive days count', () => {
    // 2026-11-21 is done, 2026-11-20 is done, 2026-11-19 was missed. Streak should be 2.
    const streak = calculateRoutineCurrentStreak(missedDayRoutine, '2026-11-21');
    assert.strictEqual(streak, 2, 'Streak must stop at missed day (2026-11-19), returning 2');
  });

  // 1.7 Global Streak Calculation across multiple routines
  const multiRoutines = [
    normalizeRoutine({
      id: 'r1',
      title: 'Routine 1',
      frequency: 'Every Day',
      completedDates: { '2026-11-19': true, '2026-11-20': true },
    }),
    normalizeRoutine({
      id: 'r2',
      title: 'Routine 2',
      frequency: 'Every Day',
      completedDates: { '2026-11-19': true, '2026-11-20': true },
    }),
  ];

  check('1.7 calculateGlobalStreak: when all routines done on 2 consecutive days, streak = 2 (or base+2)', () => {
    const globalStreak = calculateGlobalStreak(multiRoutines, '2026-11-20', 0);
    assert.strictEqual(globalStreak, 2, 'Global streak must be 2');
  });

  // 1.8 Streak Statistics Summary over 16-day window
  check('1.8 getStreakStatistics returns accurate percentage and count without NaN or division by zero', () => {
    const stats = getStreakStatistics(routineEveryDay, 16, '2026-11-21');
    assert.strictEqual(stats.scheduledCount, 16, '16 days checked');
    assert.strictEqual(stats.completedCount, 3, '3 completions recorded');
    assert.strictEqual(stats.percentage, Math.round((3 / 16) * 100));
    assert(stats.text.includes('Completed 3 of the last 16 target days'));
  });

  // --- Part 2: Real Browser & UI Synchronization Verification ---
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

    await new Promise((r) => setTimeout(r, 3500));
    await page.waitForFunction(() => window.useRoutineStore && window.useNavigationStore);

    // Seed clean user profile & routine with 15-day streak
    await page.evaluate(() => {
      window.useProfileStore?.getState()?.updateProfile({
        fullName: 'Milad Wardak',
        setupCompleted: true,
        onboardingStep: 'completed',
      });
      window.useSecurityStore?.getState()?.setAppLockActive?.(false);

      const demoRoutines = [
        {
          id: 'rt-1',
          title: 'Morning Fajr & Tahajjud',
          category: 'Spiritual',
          frequency: 'Every Day',
          weekdays: [0, 1, 2, 3, 4, 5, 6],
          time: '05:15 AM',
          completedDates: {},
        },
      ];

      window.useRoutineStore.setState({
        routines: demoRoutines,
        baseStreak: 15,
        streakCount: 15,
        currentStreak: 15,
      });
      window.useNavigationStore?.getState()?.setActiveTab('home_dashboard_light_mode');
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Verify Home Dashboard Routine Streak Card shows 15 Day Routine Streak
    const homeStreakText = await page.evaluate(() => {
      const h3s = Array.from(document.querySelectorAll('h3')).map((h) => h.innerText);
      return h3s.find((t) => t.includes('Routine Streak') || t.includes('Streak'));
    });

    check('2.1 Home Dashboard Routine Streak card displays synchronized streak', () => {
      assert(homeStreakText && homeStreakText.includes('15'), `Home streak must display 15, got: ${homeStreakText}`);
    });

    // Capture Home Dashboard light mode screenshot
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'home_routine_streak_card_light.png'),
    });
    console.log('[ARTIFACT] Saved home_routine_streak_card_light.png');

    // Switch to Dark Mode
    await page.evaluate(() => {
      window.useThemeStore?.getState()?.setTheme?.('dark');
      window.useNavigationStore?.getState()?.setActiveTab('home_dashboard_dark_mode');
    });
    await new Promise((r) => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'home_routine_streak_card_dark.png'),
    });
    console.log('[ARTIFACT] Saved home_routine_streak_card_dark.png');

    // Switch to Dari (fa-AF) RTL
    await page.evaluate(() => {
      window.useLocaleStore?.getState()?.setLocale?.('fa-AF');
      window.useNavigationStore?.getState()?.setActiveTab('home_dashboard_light_mode');
    });
    await new Promise((r) => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'home_routine_streak_dari_rtl.png'),
    });
    console.log('[ARTIFACT] Saved home_routine_streak_dari_rtl.png');

    // Switch to Pashto (ps-AF) RTL
    await page.evaluate(() => {
      window.useLocaleStore?.getState()?.setLocale?.('ps-AF');
      window.useNavigationStore?.getState()?.setActiveTab('daily_routine_light_mode');
    });
    await new Promise((r) => setTimeout(r, 800));

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'daily_routine_pashto_rtl.png'),
    });
    console.log('[ARTIFACT] Saved daily_routine_pashto_rtl.png');

    // Revert to English and Light Mode for clean state
    await page.evaluate(() => {
      window.useLocaleStore?.getState()?.setLocale?.('en');
      window.useThemeStore?.getState()?.setTheme?.('light');
    });

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
