# MOMENTUM — NOTIFICATION SOURCE INTEGRATION MATRIX
**Source Module Scheduling, Cancellation & Routing Matrix**
**Date:** November 20, 2026  
**Status:** FULLY INTEGRATED & VERIFIED

---

## 1. Source Module Specification

| Source Module | Trigger Condition | Offset Calculation | Deduplication Key | Cancellation Trigger | Tap Target Screen | App Lock Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Tasks & To-Dos** | Due date (`dueDate`) + Start time (`startTime`) | Configured reminder string (`15 minutes before`, `30m`, `1h`, `1 day`) | `task-${task.id}-${task.dueDate}` | Task marked `done`, deleted, or cleared | `tasks_reminders_light_mode` / `task_details` | Queued in `__pendingNotificationRoute`, executed only after PIN unlock |
| **Daily Mindful Routines** | Target routine time (`targetTime` / `time`) | Configured `reminderOffset` (minutes before) | `routine-${routine.id}-${todayKey}` | Routine completed for today, or routine deleted | `daily_routine_light_mode` / `routine_details` | Queued in `__pendingNotificationRoute`, executed only after PIN unlock |
| **Prayer Times & Adhan** | Solar angle astronomical calculation via `calculatePrayerTimes` | Configured `adhanOffset` (minutes before adhan) | `prayer-${prayerName}-${todayKey}` | Not applicable (Prayer notification firing **NEVER** marks prayer as complete) | `prayer_times_light_mode` / `prayer_times_dark_mode` | Queued in `__pendingNotificationRoute`, executed only after PIN unlock |
| **Calendar Events** | Event date (`date`) + Event time (`time`) | 10 minutes prior to event start | `calendar-${evt.id}-${todayKey}` | Event completed or deleted | `calendars_main_light_mode` / `calendars_main_dark_mode` | Queued in `__pendingNotificationRoute`, executed only after PIN unlock |
| **System & Test Verification** | "Send Test Notification" button click | Immediate (0s) | `test-${Date.now()}` | None (Historical log entry) | `notifications_settings_light_mode` / `notifications` | Direct navigation or queue if locked |

---

## 2. Prayer Reminder Zero-Mutation Invariant Guarantee

The calculation and firing of Prayer Time notifications strictly adheres to the non-destructive observation principle:
- Firing a prayer time reminder alert logs an entry into the In-App Notification Center and dispatches an OS toast.
- **Under no circumstances does notification firing mutate `isPrayerCompleted` or mark the canonical prayer as completed.**
- Completed status is exclusively driven by deliberate user action within the Prayer Times screen.

---

## 3. Real-Time Badge Synchronization Across UI

| Surface Component | Notification Bell Location | Unread Badge UI Behavior | Click Action Destination |
| :--- | :--- | :--- | :--- |
| **Desktop Sidebar (Expanded)** | Top action row (next to panel collapse) + Quick Access row | Circular red badge displaying numeric count (`1`..`9+`) | `notifications_settings_light_mode` / `dark_mode` |
| **Desktop Sidebar (Collapsed)** | Top action icon + Quick Access icon | Red indicator dot on Bell icon | `notifications_settings_light_mode` / `dark_mode` |
| **Desktop Sidebar (Horizontal Dock)** | Utility control group (next to theme toggle) | Red indicator dot with unread counter | `notifications_settings_light_mode` / `dark_mode` |
| **Home Dashboard Header** | Mobile/tablet header bar (top right) | Red badge dot anchored to Bell icon | `notifications_settings_light_mode` / `dark_mode` |
| **Calendars Header** | Header action bar (top right) | Red badge dot anchored to Bell icon | `notifications_settings_light_mode` / `dark_mode` |
| **Daily Routine Header** | Header action bar (top right) | Red badge dot anchored to Bell icon | `notifications_settings_light_mode` / `dark_mode` |
| **Finance & Wealth Header** | Header action bar (top right) | Red badge dot anchored to Bell icon | `notifications_settings_light_mode` / `dark_mode` |
| **Income Management Header** | Header action bar (top right) | Red badge dot anchored to Bell icon | `notifications_settings_light_mode` / `dark_mode` |
| **More Screen Header** | Header action bar (top right) | Red badge dot anchored to Bell icon | `notifications_settings_light_mode` / `dark_mode` |
| **Prayer Times Header** | Header action bar (top right) | Red badge dot anchored to Bell icon | `notifications_settings_light_mode` / `dark_mode` |
