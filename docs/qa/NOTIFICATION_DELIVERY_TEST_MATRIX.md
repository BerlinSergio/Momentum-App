# MOMENTUM — NOTIFICATION DELIVERY TEST MATRIX
**Quality Assurance Test Specification & Verification Matrix**
**Date:** November 20, 2026  
**Status:** ALL TESTS VERIFIED & PASSING (12/12)

---

## 1. Platform Delivery Matrix

| Delivery Adapter | Target Platform | API / Protocol | Operating Modes Supported | Deduplication Mechanism | Click Action Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Desktop Web Adapter** | Windows 10/11 (Chrome, Edge, Firefox) | HTML5 `new Notification()` | Mode A (Foreground), Mode B (Backgrounded Tab) | `tag` property with unique source ID + 48h localStorage cache | `window.focus()` + App Lock-guarded routing |
| **Mobile Native Adapter** | Android 13+ (Capacitor) | `@capacitor/local-notifications` | Mode A, Mode B, Mode C (Closed App via AlarmManager) | Deterministic 32-bit positive integer hash (`hashStringToInt`) | Android Notification Action Listener + App Lock guard |
| **In-App Notification Center** | Universal (All Platforms) | Zustand (`useNotificationStore`) + IndexedDB | All Modes (Synchronized on hydration & events) | Unique ID check, max 100 history items cap | In-app screen navigation, marked as read |

---

## 2. Operating Mode & Lifecycle Matrix

| Mode | Windows Desktop Browser | Android Native (Capacitor) | Expected Delivery Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Mode A: App Active in Foreground** | Supported via Web Notification API | Supported via Capacitor Local Notifications | Native OS banner + audio chime + in-app notification center entry + unread badge increment | **VERIFIED PASS** |
| **Mode B: App Minimized / Background Tab** | Supported via active timer ticker (15s) + `visibilitychange` | Supported via Android system alarms | Native Windows toast notification in notification center + focus on click | **VERIFIED PASS** |
| **Mode C: Process Completely Terminated** | Architecturally requires cloud push server (VAPID/FCM) | Supported via Android AlarmManager scheduling | Windows: Delivered when browser opens. Android: Fires on schedule via OS. | **DOCUMENTED** |

---

## 3. Automated Test Suite Results

Test File: `tests/notifications/test_notification_system_complete.cjs`

| Test ID | Test Assertion Name | Verification Scope | Status |
| :--- | :--- | :--- | :--- |
| **1.0** | Application Startup & Store Hydration | Stores hydrated and initialized without race conditions | **PASS** |
| **1.1** | In-App Store Add, Read State & Unread Counter | Add, mark single read, mark all read, remove, clear all | **PASS** |
| **1.2** | Deterministic 32-bit Integer Hash Generation | Android ID integer determinism, non-zero positive validation | **PASS** |
| **1.3** | Task Reminder Trigger Date & Offset Calculation | Parsing due dates, start times, 15m/30m/1h offsets | **PASS** |
| **1.4** | App Lock Protection & Secure Route Flush | Pending route queueing while locked, flush only on unlock | **PASS** |
| **2.1** | Open Notification Center (Light Mode) | Header, segmented tab controls, filter pills, empty state | **PASS** |
| **2.2** | Send Real Test Notification & Verify In-App Reception | User gesture permission prompt, OS notification, feed sync | **PASS** |
| **2.3** | Verify Desktop Sidebar & Header Unread Badges | DesktopSidebar badge '1', Quick Access row badge '1' | **PASS** |
| **2.4** | Notification Card Tap & Mark Read Behavior | Card click marks read, unread count decrements to 0 | **PASS** |
| **2.5** | Preferences Tab & Master Switch | Master toggle, prayer alerts, routines, habit reminders | **PASS** |
| **2.6** | Dark Mode Notification Center & Preferences | Dark glassmorphism, high contrast text, icon badges | **PASS** |
| **2.7** | Afghan Dari & Pashto RTL Localization | RTL direction, full localization in `fa-AF` and `ps-AF` | **PASS** |
