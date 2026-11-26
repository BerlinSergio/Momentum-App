# Phase 2.14 — remaining Zustand store concurrency audit

## Scope completed

Added guarded, revision-based, same-IDB-transaction compare-and-swap to **Calendar** (`momentum-calendar-storage-v1`) and **Tasbeeh** (`momentum-tasbeeh-storage`). Removed both stores' eager, nonauthoritative localStorage mirror startup hydration and redundant `onRehydrateStorage -> setHasHydrated` write; central `startupController.hydrateAllStores` exclusively enables readiness after crash recovery and legacy migration.

The existing Tasks, Notes and Finance CAS adapters remain unchanged. Unknown store names remain rejected by the CAS allowlist. UI now gives Calendar/Tasbeeh-specific, persistent warnings after a stale update; the unsuccessful edit remains in the in-memory state until a user-initiated reload.

Two fresh tabs starting from a **missing** record can submit the same initial Zustand-default snapshot. If the second CAS sees a conflict, the adapter reads the committed record and treats it as an idempotent no-op **only when their entire durable projections are identical**. Differing data always fails closed; there is no merging or blind retry.

## Testing

`tests/storage/test_calendar_tasbeeh_conflicts_chromium.cjs` checks both stores in real Chromium:
- Two hydrated tabs; tab A writes, tab B's stale edit is rejected with its domain-specific persistent banner.
- An injected stale localStorage mirror does not resurrect phantom Calendar events or Tasbeeh history/counters on reload.
- New edits after a fresh reload are durable.
- **25 simultaneous two-tab IndexedDB CAS races per domain** with identical baseline snapshots and one accepted write per pair, 50 pairs total.

All browser contexts use synthetic test records and are closed when complete.

## Other stores audited — not yet guarded

| Store | Risk / next required action |
| --- | --- |
| `useRoutineStore` | Day rollover invokes `performDayRollover()` during hydration and on focus/date-change. A cross-tab CAS cannot be added blindly without defining a safe, idempotent rollover and conflict response for automatic daily updates. |
| `usePrayerStore` | Scheduling cursor and prayer-statistics updates may occur on time triggers; distinguish user worship logs from derived schedule advances before guarding whole-domain snapshots. |
| `useProfileStore` | Eager localStorage mirror reads and duplicate direct persistence paths still exist; onboarding/legacy account migration must be regression-tested before removal. |
| `useLocationStore`, `useNavigationStore` | Eager mirror hydration and UI/route-specific transient settings require review. |
| `useSecurityStore` | Sensitive credentials and lock state need separate privacy/security audit; do not add broad generic event propagation of secrets. |
| `useThemeStore`, `useLocaleStore`, `useSettingsStore`, `useNotificationStore`, `useTimeStore` | Independent state writes remain unguarded; split durable preferences from transient UI state and avoid blocking expected cross-tab settings changes unnecessarily. |

Do not claim all Momentum stores are now conflict-safe. No native Android/iOS, physical storage exhaustion or sudden power-loss testing has been completed. Keep the stacked PR as **DRAFT, unmerged**. `main`, protected backup and user's local machine remain unchanged.
