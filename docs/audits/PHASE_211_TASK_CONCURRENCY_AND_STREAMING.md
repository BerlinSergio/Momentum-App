# Phase 2.11 — Task persistence race and streaming-backup feasibility

## Verified code-level root cause

Before Phase 2.11, each mutation in `useTaskStore` called `syncTaskToLocalStorage({ tasks: state.tasks })` **inside an Immer producer**. That helper constructed a second persisted state by reading `window.localStorage` (an explicitly non-authoritative, possibly stale post-commit mirror), and called `taskStorage.setItem()`. Independently, Zustand `persist` also enqueued its own write after the state mutation. This produced two independent writes per task action with different payloads, and could overwrite a newer state with stale mirror-derived data. In addition, the old module read the mirror eagerly at import and set `_hasHydrated: true` before coordinated IndexedDB migration/hydration.

The fix removes the mirror-derived writer **and** eager mirror hydration; the only task mutation persistence now comes from Zustand persist using the authoritative IndexedDB storage adapter, with `skipHydration: true` so `startupController.hydrateAllStores()` owns the hydration sequence after crash-journal recovery/migration.

This does **not** solve simultaneous edits of the same task domain from two *already-hydrated* tabs: Zustand persists whole per-domain snapshots; a cross-tab lost update is still possible without per-domain optimistic CAS + rebase/retry or a shared write coordinator, followed by a user-visible conflict policy. Do not describe local FIFO queues as cross-tab serialization.

## Chromium regression

`tests/storage/test_task_single_writer_chromium.cjs` uses a fresh isolated browser context to assert:
1. One synthetic `addTask` action queues **exactly one** IndexedDB `stores` object-store put for the task domain and is durably readable.
2. A second tab reads the committed task domain. A stale injected localStorage mirror cannot resurrect an unrelated task or replace the saved task on reload.
3. Task deletion remains deleted after reload.

The existing Chromium backup lock regression remains a separate test using a stable synthetic supported domain. It does not substitute for a full app UI multi-tab concurrent task edit test.

## V1 backup memory constraints

Existing `backupService`/`backupCrypto` v1 format is not streamable end-to-end:
- `getCommittedBackupSnapshot` calls IndexedDB `getAll()` for domain+attachments; then the service Base64-encodes every Blob and retains the bundled attachment array.
- All domain data and media are represented in one `JSON.stringify(payload)` plaintext string.
- AES-GCM Web Crypto `subtle.encrypt` consumes a complete plaintext buffer. A Base64 ciphertext and JSON envelope are then constructed.
- Import uses FileReader/string input, `JSON.parse`, full Base64 decode, a complete authenticated AES-GCM decrypt, and another `JSON.parse` before writing.

**Do not simply stream fragments into the existing AES-GCM envelope.** Its authenticated integrity covers the *whole* payload, so splitting chunks without a versioned, authenticated chunk index and robust restore staging breaks the trust model.

### Recommended next design (not implemented here)

Create a **v2** archive (v1 unchanged) with a versioned authenticated manifest, strict bounds on record count/chunk count and per-file sizes, random unique AES-GCM nonces **per chunk**, and chunk-level SHA-256 plus authenticated ordering/file IDs bound as AES-GCM AAD. Bound chunk size (e.g. 1 MiB), enforce monotonic chunk identifiers, reject truncation/duplication/reordering, and authenticate the full manifest before accepting restore. Consider Argon2/PBKDF2 parameters separately for compatibility. Exporting should be staged to a temp file/stream where platform APIs allow; restore must verify all chunks/manifest before writing any user record, or use a separately journaled staging DB and atomic final swap (including wallpaper preimages).

Native Android/iOS sharing, browser File System Access support, actual memory peaks, quota and power-loss interruption need device-backed testing before raising the conservative Phase 2.10 v1 caps. Non-streaming 32 MiB plaintext / 48 MiB encrypted archive limits remain intact.

## Safety

All work occurs in a stacked draft branch from PR #21. No merge, backup ref modification or local workspace modification. Synthetic Chromium data only.
