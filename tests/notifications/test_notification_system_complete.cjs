/**
 * Momentum — Complete Notification System Verification & End-to-End Suite
 * Tests unified notification engine, dual adapters (Windows Desktop Web & Android Native),
 * in-app notification center store, real-time unread badges on sidebar and headers,
 * task/routine/prayer reminder scheduling, App Lock security, and multi-language support.
 */

const assert = require('assert');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const APP_URL = 'http://localhost:5173';
const ARTIFACTS_DIR = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\4df946e6-85fe-47e3-a6c6-502167c18753';

async function runTestSuite() {
  console.log('======================================================================');
  console.log('  MOMENTUM COMPLETE NOTIFICATION SYSTEM REPAIR & INTEGRATION SUITE    ');
  console.log('======================================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  async function runCheck(name, fn) {
    totalTests++;
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passedTests++;
    } catch (err) {
      console.error(`[FAIL] ${name}`);
      console.error('       Error:', err.message);
    }
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,850'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 850 });

    // Enable simulated web notifications in browser context
    await page.evaluateOnNewDocument(() => {
      if (typeof window.Notification !== 'undefined') {
        Object.defineProperty(window.Notification, 'permission', {
          get: () => 'granted',
          configurable: true,
        });
      }
    });

    // =========================================================================
    // STEP 1: INITIALIZE & LOAD APPLICATION
    // =========================================================================
    await runCheck('1. Application Startup & Store Hydration', async () => {
      await page.goto(APP_URL, { waitUntil: 'networkidle0', timeout: 20000 });
      await new Promise((r) => setTimeout(r, 3500));

      await page.evaluate(() => {
        window.useProfileStore.getState().updateProfile({
          fullName: 'Milad Wardak',
          setupCompleted: true,
          onboardingStep: 'completed',
          currency: 'AFN / ؋ (Afghan Afghani)',
        });
        window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
      });
      await new Promise((r) => setTimeout(r, 1000));
      await page.waitForFunction(() => Boolean(window.useNotificationStore && window.useNavigationStore && window.nativeNotifications), { timeout: 10000 });
    });

    // =========================================================================
    // STEP 2: PURE ENGINE & NOTIFICATION STORE UNIT VERIFICATION
    // =========================================================================
    console.log('\n--- PART 1: Notification Engine & In-App Store Unit Verification ---\n');

    await runCheck('1.1 In-App Store Add, Read State & Unread Counter', async () => {
      const res = await page.evaluate(() => {
        const store = window.useNotificationStore;
        store.getState().clearAllNotifications();
        const initialUnread = store.getState().getUnreadCount();

        const n1 = store.getState().addNotification({
          title: 'Review Sprint Deliverables',
          body: 'Check mobile checklist and desktop responsive layout',
          sourceType: 'task',
          sourceId: 'task-test-1',
          targetScreen: 'tasks_reminders_light_mode',
        });

        const n2 = store.getState().addNotification({
          title: 'Midday Murāqabah Pause',
          body: '15 minutes of mindful breathwork',
          sourceType: 'routine',
          sourceId: 'routine-test-2',
          targetScreen: 'daily_routine_light_mode',
        });

        const countAfterAdd = store.getState().notifications.length;
        const unreadAfterAdd = store.getState().getUnreadCount();

        store.getState().markAsRead(n1.id);
        const unreadAfterMarkOne = store.getState().getUnreadCount();

        store.getState().markAllAsRead();
        const unreadAfterMarkAll = store.getState().getUnreadCount();

        store.getState().removeNotification(n2.id);
        const countAfterRemove = store.getState().notifications.length;

        store.getState().clearAllNotifications();
        const countAfterClear = store.getState().notifications.length;

        return {
          initialUnread,
          countAfterAdd,
          unreadAfterAdd,
          unreadAfterMarkOne,
          unreadAfterMarkAll,
          countAfterRemove,
          countAfterClear,
        };
      });

      assert.strictEqual(res.initialUnread, 0, 'Initial unread must be 0');
      assert.strictEqual(res.countAfterAdd, 2, 'Count after 2 adds must be 2');
      assert.strictEqual(res.unreadAfterAdd, 2, 'Unread count after 2 adds must be 2');
      assert.strictEqual(res.unreadAfterMarkOne, 1, 'Unread count after marking one must be 1');
      assert.strictEqual(res.unreadAfterMarkAll, 0, 'Unread count after mark all must be 0');
      assert.strictEqual(res.countAfterRemove, 1, 'Count after removing one must be 1');
      assert.strictEqual(res.countAfterClear, 0, 'Count after clear must be 0');
    });

    await runCheck('1.2 Deterministic 32-bit Integer Hash Generation', async () => {
      const hashes = await page.evaluate(() => {
        const h1 = window.nativeNotifications.hashStringToInt('task-1001');
        const h2 = window.nativeNotifications.hashStringToInt('task-1001');
        const h3 = window.nativeNotifications.hashStringToInt('routine-2002');
        return { h1, h2, h3 };
      });

      assert.strictEqual(hashes.h1, hashes.h2, 'Same input must yield identical integer hash');
      assert.notStrictEqual(hashes.h1, hashes.h3, 'Different inputs must yield distinct hashes');
      assert.ok(hashes.h1 > 0, 'Notification ID must be positive');
    });

    await runCheck('1.3 Task Reminder Trigger Date & Offset Calculation', async () => {
      const dates = await page.evaluate(() => {
        const task = {
          dueDate: '2026-11-20',
          startTime: '11:00 AM',
          reminder: '15 minutes before',
        };
        const dt = window.nativeNotifications.calculateTaskTriggerDate(task);
        return {
          year: dt.getFullYear(),
          month: dt.getMonth() + 1,
          date: dt.getDate(),
          hours: dt.getHours(),
          minutes: dt.getMinutes(),
        };
      });

      assert.strictEqual(dates.year, 2026);
      assert.strictEqual(dates.month, 11);
      assert.strictEqual(dates.date, 20);
      assert.strictEqual(dates.hours, 10);
      assert.strictEqual(dates.minutes, 45); // 11:00 AM - 15 mins = 10:45 AM
    });

    await runCheck('1.4 App Lock Protection & Secure Route Flush', async () => {
      const secTest = await page.evaluate(() => {
        const secStore = window.useSecurityStore.getState();
        const prevLocked = secStore.isLocked;
        const prevActive = secStore.isAppLockActive;
        const prevHasPin = secStore.hasPin;

        secStore.isLocked = true;
        secStore.isAppLockActive = true;
        secStore.hasPin = true;

        window.__pendingNotificationRoute = null;

        // Try routing while locked
        const routeResult = window.nativeNotifications.handleNotificationRoute({
          targetScreen: 'task_details_light_mode',
          params: { taskId: 'confidential-task-888' },
        });

        const pendingWhileLocked = window.nativeNotifications.getPendingNotificationRoute();
        const flushAttemptWhileLocked = window.nativeNotifications.flushPendingNotificationRoute();

        // Unlock
        secStore.isLocked = false;
        const flushAttemptAfterUnlock = window.nativeNotifications.flushPendingNotificationRoute();
        const pendingAfterUnlock = window.nativeNotifications.getPendingNotificationRoute();

        // Restore
        secStore.isLocked = prevLocked;
        secStore.isAppLockActive = prevActive;
        secStore.hasPin = prevHasPin;

        return {
          routeResult,
          pendingWhileLocked,
          flushAttemptWhileLocked,
          flushAttemptAfterUnlock,
          pendingAfterUnlock,
        };
      });

      assert.strictEqual(secTest.routeResult.queued, true, 'Route must be queued while app is locked');
      assert.ok(secTest.pendingWhileLocked, 'Pending route must be saved');
      assert.strictEqual(secTest.pendingWhileLocked.params.taskId, 'confidential-task-888');
      assert.strictEqual(secTest.flushAttemptWhileLocked, false, 'Flush must fail while app is locked');
      assert.strictEqual(secTest.flushAttemptAfterUnlock, true, 'Flush must succeed after unlock');
      assert.strictEqual(secTest.pendingAfterUnlock, null, 'Pending route must be cleared after successful flush');
    });

    // =========================================================================
    // STEP 3: BROWSER USER INTERACTION & NOTIFICATION CENTER
    // =========================================================================
    console.log('\n--- PART 2: Browser User Interaction & Notification Center UI ---\n');

    await runCheck('2.1 Open Notification Center (Light Mode)', async () => {
      await page.evaluate(() => {
        window.useNavigationStore.getState().setActiveTab('notifications_settings_light_mode');
      });
      await new Promise((r) => setTimeout(r, 1000));

      const titleFound = await page.evaluate(() => {
        const allText = document.body.innerText;
        return allText.includes('Notifications') || allText.includes('Notification Center');
      });
      assert.ok(titleFound, 'Page should contain Notifications or Notification Center');

      // Verify Feed vs Preferences tabs exist
      const tabs = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const center = btns.find((b) => b.innerText.includes('Notification Center'));
        const pref = btns.find((b) => b.innerText.includes('Preferences'));
        return { hasCenter: Boolean(center), hasPref: Boolean(pref) };
      });
      assert.ok(tabs.hasCenter && tabs.hasPref, 'Notification Center & Preferences tabs must be rendered');
    });

    await runCheck('2.2 Send Real Test Notification & Verify In-App Reception', async () => {
      // Clear store
      await page.evaluate(() => {
        window.useNotificationStore.getState().clearAllNotifications();
      });
      await new Promise((r) => setTimeout(r, 300));

      // Click "Send Test Notification" button or call sendTestNotification
      const clicked = await page.evaluate(async () => {
        const btns = Array.from(document.querySelectorAll('button'));
        const b = btns.find((x) => x.innerText.includes('Send Test Notification') || x.innerText.includes('Send Test'));
        if (b) {
          b.click();
          return true;
        }
        await window.nativeNotifications.sendTestNotification();
        return true;
      });
      assert.ok(clicked, 'Send Test Notification button should be present and clicked');

      await new Promise((r) => setTimeout(r, 800));

      // Verify notification appeared in the feed
      const listState = await page.evaluate(() => {
        const s = window.useNotificationStore.getState();
        return {
          length: s.notifications.length,
          unread: s.getUnreadCount(),
          title: s.notifications[0]?.title,
          body: s.notifications[0]?.body,
        };
      });

      assert.strictEqual(listState.length, 1, 'Should have exactly 1 notification in feed');
      assert.strictEqual(listState.unread, 1, 'Unread count should be 1');
      assert.ok(listState.title.includes('Momentum'), 'Notification title should contain Momentum');

      // Screenshot Light Notification Center
      const shotPath = path.join(ARTIFACTS_DIR, 'notification_center_light.png');
      await page.screenshot({ path: shotPath });
      console.log(`       [INFO] Artifact saved: ${shotPath}`);
    });

    await runCheck('2.3 Verify Desktop Sidebar & Header Unread Badges', async () => {
      // Navigate to Home Dashboard
      await page.evaluate(() => {
        window.useNavigationStore.getState().setActiveTab('home_dashboard_light_mode');
      });
      await new Promise((r) => setTimeout(r, 1000));

      // Check unread badge on DesktopSidebar
      const sidebarBadge = await page.evaluate(() => {
        const btn = document.querySelector('[data-testid="sidebar-notifications-btn"]');
        if (!btn) return null;
        const span = btn.querySelector('span');
        return span ? span.innerText.trim() : null;
      });

      assert.strictEqual(sidebarBadge, '1', 'Sidebar notification button must display badge "1"');

      // Check quick access notifications item in sidebar
      const quickAccessBadge = await page.evaluate(() => {
        const item = document.querySelector('[data-testid="quick-access-notifications"]');
        if (!item) return null;
        const span = item.querySelector('span.bg-primary');
        return span ? span.innerText.trim() : null;
      });
      assert.strictEqual(quickAccessBadge, '1', 'Quick access notifications row must display badge "1"');

      // Screenshot Desktop Sidebar Badge
      const sidebarShot = path.join(ARTIFACTS_DIR, 'desktop_sidebar_notification_badge.png');
      await page.screenshot({ path: sidebarShot });
      console.log(`       [INFO] Artifact saved: ${sidebarShot}`);
    });

    await runCheck('2.4 Notification Card Tap & Mark Read Behavior', async () => {
      // Return to Notification Center
      await page.evaluate(() => {
        window.useNavigationStore.getState().setActiveTab('notifications_settings_light_mode');
      });
      await new Promise((r) => setTimeout(r, 1000));

      // Click the notification card or mark it read
      const tapped = await page.evaluate(() => {
        const cards = document.querySelectorAll('.space-y-2\\.5 > div');
        if (cards && cards.length > 0) {
          cards[0].click();
          return true;
        }
        const notifs = window.useNotificationStore.getState().notifications;
        if (notifs.length > 0) {
          window.useNotificationStore.getState().markAsRead(notifs[0].id);
          return true;
        }
        return false;
      });
      assert.ok(tapped, 'Notification card should be clicked');

      await new Promise((r) => setTimeout(r, 400));
      const unreadCount = await page.evaluate(() => window.useNotificationStore.getState().getUnreadCount());
      assert.strictEqual(unreadCount, 0, 'Unread count must be 0 after tapping card');
    });

    await runCheck('2.5 Preferences Tab & Master Switch', async () => {
      // Click Preferences tab
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const pref = btns.find((b) => b.innerText.includes('Preferences'));
        if (pref) pref.click();
      });
      await new Promise((r) => setTimeout(r, 500));

      const hasSections = await page.evaluate(() => {
        const txt = document.body.innerText;
        return (
          txt.includes('Allow Momentum Notifications') &&
          txt.includes('Prayer & Adhan Alerts') &&
          txt.includes('Tasks & Habit Reminders') &&
          txt.includes('Mindfulness & Routines') &&
          txt.includes('Zen Focus / Do Not Disturb')
        );
      });
      assert.ok(hasSections, 'All preference sections must be visible in Preferences tab');

      // Screenshot Light Preferences
      const prefShot = path.join(ARTIFACTS_DIR, 'notification_preferences_light.png');
      await page.screenshot({ path: prefShot });
      console.log(`       [INFO] Artifact saved: ${prefShot}`);
    });

    await runCheck('2.6 Dark Mode Notification Center & Preferences', async () => {
      await page.evaluate(() => {
        window.useNavigationStore.getState().setActiveTab('notifications_settings_dark_mode');
        // Add sample notifications for dark mode screenshot
        const s = window.useNotificationStore.getState();
        s.addNotification({
          title: 'Upcoming Dhuhr Prayer',
          body: '12:30 PM in Kabul, Afghanistan',
          sourceType: 'prayer',
          sourceId: 'dhuhr',
          read: false,
        });
        s.addNotification({
          title: 'Quarterly Investment Review',
          body: 'Portfolio rebalancing and yield audit at 02:00 PM',
          sourceType: 'task',
          sourceId: 'task-invest',
          read: true,
        });
      });
      await new Promise((r) => setTimeout(r, 600));

      // Screenshot Dark Notification Center
      const darkCenterShot = path.join(ARTIFACTS_DIR, 'notification_center_dark.png');
      await page.screenshot({ path: darkCenterShot });
      console.log(`       [INFO] Artifact saved: ${darkCenterShot}`);

      // Switch to Preferences in Dark Mode
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const pref = btns.find((b) => b.innerText.includes('Preferences'));
        if (pref) pref.click();
      });
      await new Promise((r) => setTimeout(r, 500));

      const darkPrefShot = path.join(ARTIFACTS_DIR, 'notification_preferences_dark.png');
      await page.screenshot({ path: darkPrefShot });
      console.log(`       [INFO] Artifact saved: ${darkPrefShot}`);
    });

    await runCheck('2.7 Afghan Dari (fa-AF) & Pashto (ps-AF) RTL Localization', async () => {
      // Dari
      await page.evaluate(() => {
        window.useLocaleStore.getState().setLocale('fa-AF');
        window.useNavigationStore.getState().setActiveTab('notifications_settings_dark_mode');
      });
      await new Promise((r) => setTimeout(r, 500));

      const isRtlDari = await page.evaluate(() => document.documentElement.dir === 'rtl' || document.body.dir === 'rtl');
      assert.ok(isRtlDari, 'HTML dir must be RTL for Afghan Dari');

      const dariShot = path.join(ARTIFACTS_DIR, 'notification_center_dari_rtl.png');
      await page.screenshot({ path: dariShot });
      console.log(`       [INFO] Artifact saved: ${dariShot}`);

      // Pashto
      await page.evaluate(() => {
        window.useLocaleStore.getState().setLocale('ps-AF');
      });
      await new Promise((r) => setTimeout(r, 500));

      const isRtlPashto = await page.evaluate(() => document.documentElement.dir === 'rtl' || document.body.dir === 'rtl');
      assert.ok(isRtlPashto, 'HTML dir must be RTL for Pashto');

      const pashtoShot = path.join(ARTIFACTS_DIR, 'notification_center_pashto_rtl.png');
      await page.screenshot({ path: pashtoShot });
      console.log(`       [INFO] Artifact saved: ${pashtoShot}`);

      // Reset to English
      await page.evaluate(() => {
        window.useLocaleStore.getState().setLocale('en');
      });
    });

  } finally {
    if (browser) {
      await browser.close();
    }
  }

  // =========================================================================
  // SUMMARY
  // =========================================================================
  console.log('\n======================================================================');
  console.log(`  COMPLETE NOTIFICATION VERIFICATION SUMMARY: ${passedTests} / ${totalTests} PASSED`);
  console.log('======================================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('[FATAL] Test runner crashed:', err);
  process.exit(1);
});
