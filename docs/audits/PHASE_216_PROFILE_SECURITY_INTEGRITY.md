# Phase 2.16 — Profile onboarding and credential-free Security metadata audit

## Findings and changes

**Profile:** `useProfileStore` previously eagerly read a stale localStorage profile mirror, marked itself hydrated before committed IndexedDB recovery/migration, and issued a **second asynchronous IndexedDB save from inside every profile updater/reset**. This could reinsert stale onboarding/profile fields or race Zustand persist. It now starts unhydrated from defaults, waits for StartupController, uses only Zustand persist with the guarded `momentum-profile-storage` transactional CAS, and allows localStorage mirroring only after confirmed commits.

**Security preferences:** `useSecurityStore` previously read the legacy localStorage security mirror on construction and issued duplicate `syncSecurityStorage()` writes to localStorage and IndexedDB beside Zustand persist. Security metadata now has a per-tab committed baseline and transactional CAS; startup no longer trusts the mirror. The security adapter explicitly sanitizes `pin` and `alphanumeric` on every read and write, and disables postcommit localStorage mirroring. `isLocked` is transient and excluded from durable revision change detection. On new hydration an active PIN lock starts **locked**, even if another tab/snapshot was unlocked; central startup exclusively marks readiness.

**PIN mutators:** Legacy `setPin` is now async, creates a credential only if one is not already configured, and sets `hasPin` only after the credential service confirms a saved verifier. `changePin`/`updatePin` require **current and new PINs**, and `removePin` requires current-PIN verification and a successful credential delete; no metadata changes on verification failure. New production screens already call `createCredential`/`changeCredential` directly, then update `hasPin` only on success.

**PIN verifier cache:** `getCredentialRecord` no longer returns a per-tab cached verifier. Every verification fetches the current committed IndexedDB verifier, preventing an already open tab from authenticating a PIN revoked or rotated in another tab. `removeCredential` checks its durable delete result, rather than reporting success after a failed removal. The ordinary security store never contains the test PIN or a plaintext secret.

## Browser verification design

`tests/storage/test_profile_security_integrity_chromium.cjs` checks in isolated Chromium contexts:
- Profile and Security metadata stale-write rejection, persistent user-visible warnings, mirror injection, safe reload and fresh edits.
- 20 simultaneous IDB CAS races per store (40 paired races overall), each permitting exactly one commit for a shared baseline.
- Invalid synthetic PIN does not configure a credential; after successfully creating a synthetic PIN, no plaintext is in the ordinary security record.
- A newly loaded browser tab with active PIN lock starts locked.
- Unauthorized one-argument PIN change fails.
- After a synthetic PIN rotates in a second tab, the first tab rejects the old PIN and accepts the current PIN; deletion revokes authentication.
- Existing 58 Node regressions, build, Tasks/Notes/Finance/Calendar/Tasbeeh/Routine/Prayer multitab tests, encrypted backup/crash recovery and Notes UI remain in CI.

## Security boundaries / deliberately unresolved work

1. **Verifier and metadata are not a single cross-record atomic mutation.** The cryptographic verifier is written under `momentum-credential-verifier`, while `hasPin`/lock preferences live in `momentum-security-storage`. UI may optimistically show metadata before its queued CAS confirms. Coordinating verifier writes with metadata and handling partial failure/power loss requires a dedicated journaled credential transition protocol and a secure recovery UI. Do not equate a successful verifier write with a fully committed security setup.
2. `createCredential` and `changeCredential` are public internal service functions; two-tab simultaneous verifier rotations are not guarded by a compare-and-swap on the verifier key. Only stale *verification* is fixed in this phase.
3. `sessionStorage` lockout counters are per-tab and user-clearable; they are not a shared hardware-backed brute-force defense. A four-digit PIN is low entropy and local/offline threat assumptions need further review. No claim of strong resistance to a malicious same-origin script, rooted device or browser profile copying.
4. `setHasPin`, `setAppLockActive` and `resetToDefaults` remain application actions; their authorization and all UI entry points should be audited before release.
5. A stale tab's in-memory optimistic Profile/Security edit is rejected but may still be visible until reload. User should copy unsaved edits first; no unsafe automatic merge.
6. Other stores (Navigation, Location, Theme, Locale, Settings, Notification, Time) remain outside the per-domain CAS protection. Physical native Android/iOS, quota/power loss, and true hostile-context security tests have not run.

This change is a stacked **DRAFT PR** and is **unmerged**. Do not modify `main`, immutable backups, or local user devices.
