# MOMENTUM — MASTER ISSUE REGISTER & DEFECT LOG
## Comprehensive Defect Classification, Reproduction, Root Cause & Fix Verification

---

### DEFECT SEVERITY DEFINITIONS

- **P0 — Critical:** Security bypass, unrecoverable data loss, database corruption.
- **P1 — High:** Core workflow broken, failed saving, critical navigation block.
- **P2 — Medium:** Cross-screen inconsistency, noticeable usability or layout flaw.
- **P3 — Low:** Minor visual inconsistency, spacing, noncritical typography or copy polish.

---

### RECORDED ISSUES & RESOLUTIONS

| Issue ID | Severity | Screen / Component | Description | Root Cause | Fix Applied | Retest Result |
|---|---|---|---|---|---|---|
| **ISSUE-01** | P2 | `LanguageSettingsDarkMode` & `LightMode` | Back button did not mirror chevron in RTL mode | Missing `rtl:rotate-180` on SVG icon | Added `rtl:rotate-180 transition-transform` to back icon | **VERIFIED PASS** |
| **ISSUE-02** | P2 | `BottomNavBar.jsx` | Hardcoded `fontFamily: "'Inter', sans-serif"` override blocked Pashto & Dari font rendering on bottom dock | Inline style hardcoded font family | Removed inline `fontFamily` override so document locale font inherits cleanly | **VERIFIED PASS** |
| **ISSUE-03** | P3 | `src/locales/*.json` | Translation variable mismatch in `toasts.languageUpdated` (`{{lang}}` missing in ps-AF & fa-AF) | Missing interpolation parameter in localized strings | Updated strings to `ژبه {{lang}} ته بدله شوه` and `زبان برنامه به {{lang}} تغییر کرد` | **VERIFIED PASS** |
| **ISSUE-04** | P2 | `PersonalSetupDarkMode` & `LightMode` | Onboarding lacked immediate language selection on first launch | Language selection was only accessible inside Settings post-setup | Added prominent 3-way language selector grid at top of Personal Setup screen | **VERIFIED PASS** |
| **ISSUE-05** | P3 | `WelcomeHero.jsx` | Hardcoded subtitle string bypassed localization system | Subtitle text was static English | Replaced with `t('home.stayConsistent')` across all 3 languages | **VERIFIED PASS** |
| **ISSUE-06** | P2 | Calendar Screens (Shamsi & Hijri) | Top bar back chevrons lacked RTL mirroring and standard test attributes | Chevrons were static LTR SVG icons without `rtl:rotate-180` | Added `aria-label="Go back"`, `data-testid="calendar-back-btn"`, and `rtl:rotate-180` | **VERIFIED PASS** |
| **ISSUE-07** | P3 | `src/store/useNotesStore.js` | Note creation didn't reconcile `pinned` vs `isPinned` parameter naming | Store exclusively checked `noteData.isPinned` | Updated to `isPinned: Boolean(noteData.isPinned ?? noteData.pinned)` | **VERIFIED PASS** |
