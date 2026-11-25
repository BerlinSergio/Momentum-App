# Phase 2.15 — Routine and Prayer time-derived state versus user records

## Risk addressed

Both stores previously ran eager localStorage mirror hydration (non-authoritative after migration), marked themselves hydrated before coordinated IndexedDB recovery/migration, and persisted uncoordinated whole-domain snapshots across tabs. Routine day rollover also performed a whole-store mutation during hydration, and Prayer timer cursor progression could appear as an unrelated durable edit.

This phase adds `momentum-routine-storage` and `momentum-prayer-storage` to the explicit CAS allowlist. Each adapter captures the last **committed** IndexedDB record and rejects stale writes inside an atomic IDB readwrite transaction. Conflicts retain a blocking, visible domain-specific warning; the only recovery is a deliberate reload after copying unsaved work.

## Non-user time-derived state

**Routine:** `routines[].completed` and `routines[].streak` are derived for a given day from `routines[].completedDates` and the active date; `streakCount`, `currentStreak`, `lastActiveDateKey` are projections/display state. They are excluded from the *CAS write decision* only. The user-owned `routines` records (minus these daily projections) and `baseStreak` are included. Explicit completion in `completedDates`, routine create/edit/delete and persistent fields still bump the revision.

To prevent a premature update, the Routine store uses `skipHydration: true` and `performDayRollover()` refuses to run while `_hasHydrated` is false. The startup controller calls rollover **after every store has successfully hydrated**, and after the TimeStore refreshes the active date. The focus, visibility and day-change listeners are retained, but no longer import any localStorage mirror.

**Prayer:** `prayers` (current display schedule/status cursor) and `punctualPercentage` are derived from time or `prayerLogs` and excluded from the *CAS write decision*. Explicit user `prayerLogs`, calculation method/madhab, offsets and alert preferences remain covered, as do unknown future durable settings. Advancing a countdown alone must not create an artificial worship record or bump a revision. Prayer store uses centrally coordinated hydration and no early localStorage import.

**Compatibility note:** The existing serialized v1 state format is unchanged; derived fields can still be contained in the full encrypted snapshot written on a future real user edit. On reload, Routine performs a day rollover and Prayer recalculates punctuality from explicit logs.

## Regression coverage

`tests/storage/test_routine_prayer_conflicts_chromium.cjs` covers:
- two real Chromium tabs hydrated from the same durable baseline; A's explicit Routine/Prayer user edit wins, stale B's edit is rejected with the domain-specific blocking banner and A's data intact;
- malicious/stale localStorage mirror injection does not revive phantom routines or worship logs after browser reload; the reloaded tab can persist new edits;
- Routine future-date rollover and Prayer timer cursor advance leave the durable record and revision unchanged, with no synthesized worship events;
- **25 paired simultaneous IndexedDB CAS operations per domain**, 50 total, each checked for exactly one committed winner and one rejected loser.

This suite uses only synthetic data in disposable isolated Chromium contexts. Prior Tasks, Notes, Finance, Calendar, Tasbeeh, backup/restore, quota, startup and Notes deletion regressions remain in CI.

## Remaining risks

- **Profile, Security, Navigation, Location, Settings, Time, Theme, Locale, Notification** stores remain outside this newly reviewed CAS protection; some have eager mirror reads, direct duplicate writers, or contain sensitive data. Avoid assuming all stores are protected.
- A stale tab's optimistic in-memory user edits are not saved after a conflict; the persistent banner warns to copy work before reloading.
- Automatic notification scheduling side effects are not part of the task-domain CAS transaction; app-specific notification rescheduling should be audited separately.
- Concurrent edits within one Routine/Prayer domain intentionally conflict even when different items are edited. No automatic merge/rebase is implemented.
- Physical low-memory/zero-disk/power-loss tests and native Android/iOS validation remain outstanding.

Keep the stacked GitHub PR as DRAFT and unmerged; never change protected backup, main or the user's local computer.
