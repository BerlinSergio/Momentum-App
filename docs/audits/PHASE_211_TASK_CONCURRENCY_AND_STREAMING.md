# Momentum Phase 2.11 — Task concurrency and backup v2 feasibility

Status: **Review-only / draft** (2026-11-25). This document does not authorize any merge or claim production readiness.

## Confirmed task persistence root cause

The prior `useTaskStore` independently called `taskStorage.setItem` inside its Immer mutators and then triggered Zustand `persist` a second time through the enclosing `set` call. The first path read a potentially stale localStorage mirror and merged it with an in-flight draft, while the second path serially wrote the Zustand result. The two writes could also interleave with a restore or another browser tab. At startup, the store bootstrapped from localStorage before authoritative IndexedDB hydration. None of these paths guaranteed a single causal transaction.

The Phase 2.11 patch removes the nested writes and the eager localStorage bootstrap. The central startup controller now handles task hydration. The sole persisted data field is `tasks`; editor selection and hydration flags are volatile. The task IndexedDB adapter opts into a compare-and-swap precondition: it reads the committed record during hydration and checks the original value inside the same readwrite transaction as the next task save. If another tab has committed a different value, the save is refused with `STORAGE_WRITE_CONFLICT`, a persistent on-screen warning appears, and subsequent writes in the stale tab are refused until reload. A byte-for-byte identical record is a safe no-op.

**Scope:** This is a lost-update **prevention** strategy, not automatic conflict merging. A rejected tab still holds its attempted edit in memory; users must copy any unsaved text before reloading. Browser sessions that predate this patch, manual direct-IndexedDB writes or unguarded store writers may still write outside this contract. Other application domains (notes, finance, etc.) have not been converted to this mechanism. Avoid claiming that every domain supports automatic multi-tab collaboration.

## Encrypted backup v1: why raising the size cap is unsafe

The current format constructs a full JSON string, Base64 representations of binary attachments, an entire UTF-8 plaintext buffer, an AES-GCM encrypted ciphertext buffer and an outer Base64 envelope. Decryption reverses these allocations. These copies coexist temporarily and can multiply memory requirements beyond source file size. A 4 MiB synthetic roundtrip in Phase 2.10 increased observed Node RSS from 59 MiB before encryption to 103 MiB after decryption (snapshots, not peak RAM). The current 32 MiB plaintext / 48 MiB file refusal is a conservative safety constraint, not streaming support.

## Proposed backup format v2 — requires separate implementation and review

1. **Keep v1 reading** for backward compatibility within its defined safety bounds. Require explicit version negotiation for v2; never try to parse an unknown archive as v1.
2. **Frame metadata and content separately** rather than serializing an entire media collection into one JSON document. Bound individual frame length and total count, and stream attachments without Base64 expansion where the platform supports streams. Validate record IDs, paths, content types and bounded metadata sizes.
3. **Authenticated encryption per chunk.** Use fresh, *provably unique* AES-GCM nonce per chunk, with a random per-archive nonce prefix plus strictly monotonic counter and explicit overflow guard. Include backup identifier, version, chunk number, total expected byte count and domain/attachment identity as authenticated additional data. Do not reuse any nonce with the same encryption key.
4. **Authenticated final index/manifest.** Include chunk ordering, total count, sizes and digests in the final authenticated metadata, with an authenticated end marker. Reject omitted, truncated, reordered, duplicated or substituted chunks before claiming a complete backup. Do not treat a valid early chunk as a recoverable full backup.
5. **Atomic restore is still essential.** Verify a staged archive completely before finalizing user-visible main-DB records. A durable staging store/journal may be required for files larger than memory; wallpaper storage is a separate IndexedDB and still needs the cross-DB recovery journal. Apply the Phase 2.8 optimistic conflict checks at final commit. Never delete current data merely to make room for staging.
6. **Platform-specific persistence.** Web Streams/File System Access, Capacitor Filesystem and native share sheets have different constraints. Use an explicitly supported destination and confirm durable file creation and cleanup. Never expose decrypted temporary media in backup folders or logs.
7. **Threat / pressure cases.** Wrong passphrase, huge declared lengths, corrupt framing, authentication failure at every chunk, disk full during staging, browser suspend/reload between chunks, duplicate IDs, malicious filenames, large wallpapers, 2-tab writers, and native app process termination.
8. **Benchmarks and rollout.** Measure **peak** JS heap, resident set, wall time, storage writes and device pressure on low-memory Android/iOS and desktop. Run v1/v2 golden compatibility fixtures. Initially ship v2 behind a flag with explicit rollback and telemetry that never collects user contents.

This patch intentionally implements **task conflict safety only**. It does not invent a streaming backup API or bypass v1's memory limits. Independent peer/security review, migration/rollback testing and real device tests remain mandatory.
