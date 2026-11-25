# Real Android device feedback — 22 repair acceptance gates

2026-11-26. User-installed debug APK from run 45688549803. User provided nine screenshots and 22 reported problems. Screenshots are private evidence; do not upload profile photos or financial data to the repository. Device model/Android/WebView versions not yet recorded. Current app design is authoritative. Preserve existing data, Main and backup; use the draft repair branch. No claim of physical verification from desktop Chromium.

| ID | Reported issue | Acceptance test (not yet verified) |
|---|---|---|
| M01 | Status bar / full-screen overlap | Header and controls respect system bars/cutouts; correct icon contrast in both themes and landscape |
| M02 | Date/time sheet below viewport, repeated clicks | Sheets open immediately above nav, remain bounded; direct numeric keyboard time entry plus steppers |
| M03 | Saved verses/quotes inaccessible | Durable saved collection with revisit, remove and reload |
| M04 | Overly bright dark-mode cards | Consistent contrast and theme-specific surfaces with/without wallpaper |
| M05 | Lunar month shown as Gregorian name | Actual Hijri month names and date in all supported locales; verify date convention |
| M06 | Biometrics unavailable error on phone | Native device capability and enrollment, authenticated challenge/key, cancellation and PIN fallback; no simulated success |
| M07 | Alphanumeric passcode unsupported | Real secure credential creation/change/unlock/lockout/migration with no plaintext or PIN downgrade |
| M08 | Wallpaper falsely reports download | Actual durable file/blob and visible application, accurate result and offline/error handling |
| M09 | Save/download controls do nothing | Expense, income and other forms persist data; clear success or actionable failure, reload regression |
| M10 | Media downloads fail | Native filesystem/share/export produces real file, handles permissions/error |
| M11 | Profile save/cancel misplaced | Accessible aligned action footer, no overlap, persisted profile |
| M12 | GPS/sensors fail | Actual permission, location acquisition, denied/offline fallback and supported capability reporting |
| M13 | Transitions stutter | Physical device frame timing, native lightweight glass/animation option, reduced motion respected |
| M14 | Mobile notifications not delivered | Native permissions/channels, scheduling, delivery, tap, background and process-death tests |
| M15 | Excess bottom whitespace | Remove redundant scroll padding while maintaining clearance above dock/keyboard |
| M16 | Volume-button Tasbeeh option fails | Native key events while active Tasbeeh; normal volume behavior outside and when disabled |
| M17 | Tasbeeh auto-next fails | Target crossing selects next exactly once, persists and handles final item |
| M18 | Notes preview shows markup | Safe plain-text excerpt for rich HTML; readable media/empty states |
| M19 | New Note button scrolls | Stable floating button independent of content scroll, safe bottom offset |
| M20 | Checklist is literal brackets | Real toggleable checkbox with durable state, safe HTML serialization |
| M21 | Popups move with page | Viewport-anchored modal layer, scroll isolation and accessible dismissal |
| M22 | About page inconsistent | Responsive polished existing design, accurate app/version information and accessible hierarchy |

## Release gates

All 22 must be tracked individually through implementation, automated regression and actual handset confirmation. Prior web CI and APK packaging success do not establish native functionality. Security work must preserve atomic PIN/metadata transaction and durable attempt limits. A new APK is required after fixes. Do not close an item merely because a commit exists. Dependency audit remains an independent gate.
