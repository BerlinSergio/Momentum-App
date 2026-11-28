# Momentum — Final Master Backup
Snapshot date: 2026-11-28. Application version: 1.0.2.

## Exact source references
| Platform | Branch | Commit |
| --- | --- | --- |
| Android | main | 3d1e1efb5384fc26d7459b96b6ceed695d3511a5 |
| Windows | feat/windows-desktop-v1.0.2 | a9e80ff4e57f7e0d25790c85ea7926ae23a3bed3 |
| iOS simulator/device | feat/ios-v1.0.2 | e7b7ba18d0ba0e40acc67d67e06c42bda92525eb |
| iOS unsigned IPA | feat/ios-ipa-v1.0.2 | 7f74b167cfa4c470de3281f35fc2ab1f68073f1d |
| PWA | feat/pwa-v1.0.2 | b27167facc8a5843cbc0817187268fc651f8824d |
| Deployed static website | gh-pages | e3abda05c5019100c9f382ce730d91b2ef2c3d5a |

Platform branches are intentionally distinct. Do not assume main contains Windows, iOS AlarmKit or PWA changes. The full Git bundle preserves refs and reachable history; the source archives provide independent snapshots. Verify the bundle with git bundle verify after initializing an empty Git repository, then clone with git clone --mirror momentum-full.bundle Momentum-App.git. Inspect refs with git show-ref in the clone. Extract a platform snapshot or check out its exact commit for development. Existing prior backup branches and official tags remain untouched.

## Released and candidate packages
Android: official v1.0.2 production-signed APK, plus v1.0.0 rollback archive (not necessarily installable over newer app without uninstall). Windows: official v1.0.2-windows Portable and Setup, both unsigned Authenticode. Owner confirmed practical Android and Windows acceptance tests passed. iOS: unsigned IPA; native device signing and real device acceptance are incomplete. AlarmKit on iOS 26+ has Stop but no implemented Snooze. Older versions fall back to notifications. iOS simulator startup passed, not a real alarm delivery test. PWA: published at https://berlinsergio.github.io/Momentum-App/ ; Chromium offline reload passed; iPhone Safari acceptance not confirmed. PWA cannot guarantee reminders after closing. Windows alarms require a running app and awake computer. Windows Portable and Setup share per-user storage, not a portable data folder.

## Build and recovery
Use the archived workflow files as authoritative commands. React/Vite and Capacitor: Node 22, npm ci, npm run build. Android: JDK 21, SDK platform/build-tools 36; npx cap sync android, Gradle wrapper. Signed workflow is .github/workflows/momentum-android-signed-release.yml on main. Its draft-release option is legacy and must remain false until intentionally updated. Check versionCode increments and versionName, package com.momentum.app, production certificate and APK checksum. The current signer SHA-256 is d4d294ba28e1133bdc5d961e492397d5a10b1561a7f0e5797e02447f3a0ecb46. Restore signing credentials privately to environment momentum-production: MOMENTUM_KEYSTORE_BASE64, MOMENTUM_KEYSTORE_PASSWORD, MOMENTUM_KEY_ALIAS, MOMENTUM_KEY_PASSWORD; variable MOMENTUM_CERT_SHA256. Never commit secrets. Recover the original key, not a newly generated replacement, for updates.

Windows: use Windows 2022 x64 workflow on Windows branch, generate icon from public/logo.png, build dist and Electron packages. The desktop package lock from the tested build is preserved in the release assets; restore it to desktop/package-lock.json and use npm ci for future reproducibility. No Windows signing certificate has been configured. iOS: macOS/Xcode 26 workflow on iOS branches, npm ci, npm run build, npx cap sync ios, build device and simulator. Personal signing is required for unsigned IPA. PWA: build with --base=/Momentum-App/, generate icons, run scripts/prepare-pwa.mjs and offline test; the first-publish workflow intentionally refuses to overwrite an existing gh-pages branch. Future Pages updates need a separately reviewed deployment change. Do not publish a new version until automated tests and owner device acceptance are complete.

## Database and personal data
Source includes src/storage/db.js, migration.js, attachmentStorage.js, zustandIndexedDbStorage.js, backupService.js and backupCrypto.js, storage tests and phase audit documents. IndexedDB momentum_app_db v1 contains domain data, attachments and migration metadata; other application stores and credentials may use separate databases. The source, not this summary, defines the exact schema. Application-level encrypted .momentum-backup exports should be created separately on each device, verified by a controlled restore, and kept privately. This project archive does not contain live personal records, user passwords or personal backup files. Device data is not automatically synchronized across platforms. Never erase data to fix a build or replace a working signed app before verifying a backup.

## Maintenance and secrets
Preserve the Android signing key and passwords separately in encrypted offline copies. Do not upload them to a public repository, release or Actions artifact. GitHub secrets cannot be recovered from this archive. Keep two independent copies of this archive, one offline. The Git bundle includes existing public repository history only; it cannot preserve GitHub secrets, branch protection, issues, PR discussions or account settings. Use the included refs and release metadata for recovery. Treat future dependency versions, platform requirements and signing policies as subject to change. The current platforms remain separate branches; integration into main is a future reviewed task, not part of this backup.
