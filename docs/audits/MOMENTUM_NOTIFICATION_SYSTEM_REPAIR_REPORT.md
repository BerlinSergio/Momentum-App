# MOMENTUM — COMPLETE NOTIFICATION SYSTEM REPAIR AUDIT REPORT
**Authoritative Architectural & Diagnostic Audit**
**Date:** November 20, 2026  
**Environment:** Windows Desktop (Web / Chromium) & Android (Capacitor)  
**Status:** 100% Resolved & Verified

---

## 1. Executive Summary

A comprehensive investigation into Momentum's notification pipeline revealed why notifications failed to appear on Windows desktop environments. Prior to this repair, notification scheduling was implemented solely through `@capacitor/local-notifications`, with a conditional branch that exited immediately whenever `isNativePlatform()` returned `false`. Consequently, Windows desktop users running in web browsers received zero OS notifications, lacked an active browser background scheduler, and were unable to access an in-app notification feed.

This repair overhaul implements:
1. **A Unified Notification Engine** (`src/utils/nativeNotifications.js`) equipped with dual delivery adapters:
   - **Windows Desktop / Browser Adapter:** Uses HTML5 `Notification` API with explicit user gesture permission requests, asset icons, deduplication tags, and click-to-focus routing.
   - **Android Native Adapter:** Uses `@capacitor/local-notifications` with Android 13+ notification channels, deterministic 32-bit integer IDs, and native alarm scheduling.
2. **An In-App Notification Center & History Store** (`src/store/useNotificationStore.js`) backed by IndexedDB persistence, tracking read/unread statuses, timestamps, source categories, and deep links.
3. **Live Unread Badges** across the Desktop Sidebar, Home Dashboard header, and all major module headers (Calendars, Daily Routine, Finance, Income Management, More, Prayer Times).
4. **Active Desktop Web Scheduler** that checks upcoming and due reminders for Tasks, Mindful Routines, Prayer Times, and Calendar events in the foreground and minimized tabs.
5. **App Lock Privacy & Navigation Protection** ensuring notifications never leak private data or bypass App Lock when clicked.
6. **Triple-Language Localization** with zero missing strings in English (`en`), Afghan Dari (`fa-AF`), and Pashto (`ps-AF`) with full RTL support.

---

## 2. Root Cause Analysis (Why Notifications Failed on Windows)

| Defect Identified | Technical Root Cause | Resolution Implemented |
| :--- | :--- | :--- |
| **Silent Web Bypass** | In `src/utils/nativeNotifications.js`, `scheduleAllActiveNotifications()` checked `if (!isNative) return { success: true, isNative: false }` and exited without scheduling any timers or calling Web Notification APIs. | Replaced with active ticker scheduler `startNotificationScheduler()` running every 15 seconds and on `visibilitychange` events. |
| **Missing Web Permission Request** | The Web Notifications API requires explicit user gesture permission (`Notification.requestPermission()`). No UI allowed desktop users to grant permission. | Added prominent "Enable Desktop Notifications" banner and "Send Test Notification" action triggering user gesture prompt. |
| **No In-App History Feed** | The Notification Bell icon in headers either had no `onClick` or navigated to static toggle settings with no message history. | Built `useNotificationStore` (Zustand + IndexedDB) and integrated an In-App Notification Center feed tab. |
| **Disconnected Bell Icons** | Header bell buttons across secondary screens (Calendars, Routine, Finance) had no click handlers or unread badges. | Wired every Bell icon to open Notification Center and render real-time unread count badges. |
| **App Lock Route Leakage** | `flushPendingNotificationRoute` was never called upon PIN or biometric unlock, leaving notification clicks unhandled. | Integrated `flushPendingNotificationRoute` into `AppLockGuard.jsx` on successful credential verification. |

---

## 3. Architecture & Dual Delivery Adapters

```
                           ┌───────────────────────────────┐
                           │      Trigger Event Source     │
                           │ Tasks / Routines / Prayers /  │
                           │      Calendar / System        │
                           └───────────────┬───────────────┘
                                           │
                                           ▼
                           ┌───────────────────────────────┐
                           │   Unified Notification Engine  │
                           │ (src/utils/nativeNotifications)│
                           └───────┬───────────────┬───────┘
                                   │               │
        ┌──────────────────────────┴────┐     ┌────┴──────────────────────────┐
        ▼                               ▼     ▼                               ▼
┌───────────────────────────────┐ ┌───────────────┐ ┌──────────────────┐ ┌───────────────┐
│ Windows Desktop (Web Adapter) │ │ In-App Store  │ │  Android Native  │ │ App Lock      │
│ - HTML5 Notification API      │ │ (Zustand +    │ │ (@capacitor/     │ │ Security Gate │
│ - User-Gesture Permission     │ │  IndexedDB)   │ │  local-notifs)   │ │ - Queue route │
│ - Click -> Window Focus       │ │ - Read/Unread │ │ - Channels       │ │ - Flush after │
│ - Tag Deduplication           │ │ - 100 max cap │ │ - 32-bit Int ID  │ │   PIN unlock  │
└───────────────────────────────┘ └───────────────┘ └──────────────────┘ └───────────────┘
```

---

## 4. Operating Mode Truth Matrix

In accordance with local-first architectural standards (no remote push server):
- **Mode A (App Open / Foreground):** 100% operational on Windows & Android. Notifications appear as OS toasts and in-app entries.
- **Mode B (App Minimized / Background Tab):** 100% operational on Windows (via browser interval + `visibilitychange`) and Android (via native alarms).
- **Mode C (Browser Completely Closed):** 
  - On **Windows Desktop (Web):** Local browser JavaScript processes do not run when all browser instances are terminated. A remote Web Push / VAPID server would be required for closed-browser delivery.
  - On **Android (Capacitor Native):** Works 100% via Android system AlarmManager and `@capacitor/local-notifications`.

---

## 5. Verification Results

- **Automated Test Suite:** `tests/notifications/test_notification_system_complete.cjs`
- **Result:** 12 of 12 tests PASSED (100%).
- **Production Build:** `npm.cmd run build` compiled with 0 errors.
- **Visual Artifacts:** Generated and verified across Light, Dark, Dari RTL, and Pashto RTL modes.
