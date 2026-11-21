# Comprehensive Architectural Audit: Sticky Glassmorphic Headers

**Project:** Momentum (`c:\momentum`)  
**Date:** October 20, 2026  
**Status:** Audit & Architecture Analysis Only (Zero application code modified)  

---

## 1. Executive Summary & Scope

This audit investigates the existing architecture of the Momentum React application across all routed screens and both **Light Mode** and **Dark Mode**. The objective is to identify the structural reasons for past inconsistencies when attempting to make headers sticky and glassmorphic, and to define a rock-solid, zero-regression architectural plan before any code is modified.

### Key Inventory Metrics:
- **Total Routed Screen Entities:** **40 distinct screens** (39 unique feature screens, with `TasksReminders` providing 2 distinct layout variants).
- **Total Light Mode Screen Implementations:** **40 files** (`*LightMode.jsx`).
- **Total Dark Mode Screen Implementations:** **40 files** (`*DarkMode.jsx`).
- **Total Active Screen Files in Router (`App.jsx`):** **80 files**.
- **Existing Shared Header Abstraction:** **None**. Every screen currently renders its top heading locally within its own JSX component.
- **Legacy / Unrouted Files:** **44 files** exist in `src/` (e.g., `AboutMomentum.jsx`, `Home.jsx`, `More.jsx`), representing older monolithic prototypes. These are not imported by `App.jsx` and must remain untouched.

---

## 2. Project Architecture

### 2.1 Technology Stack
- **Framework:** React 19.2.8 with Vite 8.3.3
- **CSS Engine:** Tailwind CSS 3.4.17 with PostCSS & Autoprefixer
- **Iconography:** `lucide-react` (v1.55.0)
- **Native Interop:** Capacitor v8.5.3 (Android / iOS)
- **Viewport Frame:** Fixed mobile canvas mockup (`w-full max-w-[412px] h-[892px] rounded-[40px]`)

### 2.2 Routing & Navigation Model
- The application uses state-driven routing managed inside `src/App.jsx` via the `activeTab` state variable and browser URL query parameters (`?screen=<routeKey>`).
- History synchronization is supported via `window.history.pushState` and `window.addEventListener('popstate')`.
- Screens communicate back-navigation primarily by calling `setActiveTab('home_dashboard_light_mode')` or `setActiveTab('home_dashboard_dark_mode')`.

### 2.3 Theme Architecture
- Theme state is managed by `src/context/ThemeContext.jsx`.
- When a screen is selected, `syncThemeToScreen(activeTab)` dynamically applies or removes the `.dark` class on `document.documentElement`.
- Semantic CSS custom properties are defined in `src/index.css` under `:root` (Light) and `.dark` (Dark).
- In addition to CSS variables, screens use explicit Tailwind utility classes:
  - **Light Mode:** `bg-slate-50`, `text-indigo-950`, `text-slate-800`, `text-slate-600`, `bg-white/70`, `backdrop-blur-md`, `border-white/80`.
  - **Dark Mode:** `bg-slate-950` or `bg-[#0B0F19]`, `text-white`, `text-slate-400`, `text-slate-300`, `bg-black/30`, `backdrop-blur-md`, `border-white/10`.

### 2.4 Wallpaper & Background Layering Architecture
- Background wallpapers are managed by `src/context/WallpaperContext.jsx` and rendered via `PhoneWallpaperCanvas` inside `src/App.jsx` at `z-0` (behind all screens).
- To allow the wallpaper and its calibrated blur (`blur(${blurLevel}px)`) to be visible through screens, `src/index.css` enforces translucency rules:
  ```css
  .momentum-canvas-viewport.wallpaper-active {
    background-color: transparent !important;
    background-image: none !important;
  }
  .momentum-canvas-viewport.wallpaper-active > * {
    background-color: transparent !important;
    background-image: none !important;
  }
  .momentum-canvas-viewport.wallpaper-active .min-h-screen {
    background-color: transparent !important;
    background-image: none !important;
  }
  ```
- Because `.min-h-screen` is forced to transparent by `index.css`, cards with `bg-white/70 backdrop-blur-md` or `bg-black/30 backdrop-blur-md` float as frosted glass elements directly above the ambient wallpaper.

### 2.5 Scroll Organization & The Viewport Split
The application has **two distinct scrolling mechanisms**:
1. **Global Viewport Scrolling (34 Screen Entities / 68 Files):**
   - In `App.jsx`, line 346:
     ```jsx
     <div className="flex-1 overflow-y-auto relative no-scrollbar w-full h-full z-10 momentum-canvas-viewport wallpaper-active">
       {renderScreen()}
     </div>
     ```
   - For these 34 screens, the screen component itself has no `overflow-y-auto`. The entire screen content expands vertically, and `.momentum-canvas-viewport` scrolls.
   - Any element with `sticky top-0` inside these screens sticks relative to `.momentum-canvas-viewport`.
2. **Internal Container Scrolling (6 Screen Entities / 12 Files):**
   - Six screen pairs define their own internal scroll container:
     - `tasbeeh_history` (`div className="flex-1 overflow-y-auto pb-40"`)
     - `tasbeeh_main` (`div className="flex-1 overflow-y-auto pb-28"`)
     - `tasbeeh_settings` (`div className="flex-1 overflow-y-auto"`)
     - `tasks_reminders_1` (`div className="flex-1 overflow-y-auto pb-36"`)
     - `tasks_reminders_2` (`div className="flex-1 overflow-y-auto pb-32"`)
     - `timezone_selection` (`div className="flex-1 overflow-y-auto"`)
   - In these six screens, the top header is located **inside** the internal scroll container.
   - Any element with `sticky top-0` inside these screens sticks relative to the **internal `overflow-y-auto` container**, NOT the outer viewport.
3. **Non-Scrolling Screen (1 Screen Entity / 2 Files):**
   - `splash_screen` (`SplashScreenLightMode.jsx` and `SplashScreenDarkMode.jsx`) has no vertical scroll and `App.jsx` disables scrolling with `overflow-hidden overscroll-none`.

---

## 3. Complete Screen Inventory

Below is the verified inventory of all 40 routed screen entities (80 files):

| # | Screen Name | Light Mode Source | Dark Mode Source | Header Composition | Actual Scrolling Element | Wallpaper Owner | Existing Abstraction | Structural Details |
|---|---|---|---|---|---|---|---|---|
| 1 | **More (Pilot)** | `src/MoreLightMode.jsx` | `src/MoreDarkMode.jsx` | Logo + Title + Bell + Avatar + Subtitle | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Subtitle `<p>` immediately follows top header `<div>` |
| 2 | **About Momentum** | `src/AboutMomentumLightMode.jsx` | `src/AboutMomentumDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root `<>`; back button to home |
| 3 | **Add / Edit Expense** | `src/AddEditExpenseLightMode.jsx` | `src/AddEditExpenseDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; expense category selectors |
| 4 | **Add / Edit Income** | `src/AddEditIncomeLightMode.jsx` | `src/AddEditIncomeDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; income stream forms |
| 5 | **Add / Edit Routine** | `src/AddEditRoutineLightMode.jsx` | `src/AddEditRoutineDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; frequency toggles |
| 6 | **Add / Edit Task** | `src/AddEditTaskLightMode.jsx` | `src/AddEditTaskDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; priority & date pickers |
| 7 | **Afghan Solar Calendar** | `src/AfghanSolarHijriShamsiCalendarLightMode.jsx` | `src/AfghanSolarHijriShamsiCalendarDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; calendar grid with shamsi months |
| 8 | **Appearance** | `src/AppearanceLightMode.jsx` | `src/AppearanceDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; theme toggle options |
| 9 | **App Lock** | `src/AppLockLightMode.jsx` | `src/AppLockDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; PIN toggle options |
| 10 | **Background Blur Control** | `src/BackgroundPreviewBlurControlLightMode.jsx` | `src/BackgroundPreviewBlurControlDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; blur slider controls |
| 11 | **Background Library** | `src/BackgroundWallpaperLibraryLightMode.jsx` | `src/BackgroundWallpaperLibraryDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; wallpaper gallery grid |
| 12 | **Biometric Settings** | `src/BiometricSettingsLightMode.jsx` | `src/BiometricSettingsDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; biometrics preferences |
| 13 | **Calendars Main** | `src/CalendarsMainLightMode.jsx` | `src/CalendarsMainDarkMode.jsx` | Icon + Title + Bell + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; primary calendar hub |
| 14 | **City Selection** | `src/CitySelectionLightMode.jsx` | `src/CitySelectionDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; location search bar |
| 15 | **Currency Selection** | `src/CurrencySelectionLightMode.jsx` | `src/CurrencySelectionDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; currency list cards |
| 16 | **Daily Routine** | `src/DailyRoutineLightMode.jsx` | `src/DailyRoutineDarkMode.jsx` | Icon + Title + Bell + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; routine checklist |
| 17 | **Dhikr History** | `src/DhikrHistoryLightMode.jsx` | `src/DhikrHistoryDarkMode.jsx` | Icon + Title + Back Button + Avatar | `div.flex-1.overflow-y-auto` | `PhoneWallpaperCanvas` | None (Local JSX) | Internal scroller; date sub-bar below header |
| 18 | **Edit Profile** | `src/EditProfileLightMode.jsx` | `src/EditProfileDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; user profile inputs |
| 19 | **Finance Expense Tracker** | `src/FinanceExpenseTrackerLightMode.jsx` | `src/FinanceExpenseTrackerDarkMode.jsx` | Icon + Title + Bell + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; month selector sub-row |
| 20 | **Gregorian Calendar** | `src/GregorianCalendarLightMode.jsx` | `src/GregorianCalendarDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; gregorian month grid |
| 21 | **Home Dashboard** | `src/HomeDashboardLightMode.jsx` | `src/HomeDashboardDarkMode.jsx` | Logo + Title + Bell + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Fragment root; greeting hero sits in `<main>` |
| 22 | **Income Management** | `src/IncomeManagementLightMode.jsx` | `src/IncomeManagementDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; financial stats |
| 23 | **Islamic Hijri Calendar** | `src/IslamicHijriCalendarLightMode.jsx` | `src/IslamicHijriCalendarDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; hijri calendar grid |
| 24 | **Long Note Editor** | `src/LongNoteEditorLightMode.jsx` | `src/LongNoteEditorDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; rich note editor |
| 25 | **New / Edit Tasbeeh** | `src/NewEditTasbeehLightMode.jsx` | `src/NewEditTasbeehDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; dhikr counter inputs |
| 26 | **Notes Main** | `src/NotesMainLightMode.jsx` | `src/NotesMainDarkMode.jsx` | Icon + Title + Search + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; search action button |
| 27 | **Note Media Attachment Viewer** | `src/NoteMediaAttachmentViewerLightMode.jsx` | `src/NoteMediaAttachmentViewerDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; media viewer card |
| 28 | **Notifications Settings** | `src/NotificationsSettingsLightMode.jsx` | `src/NotificationsSettingsDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; calm alert toggles |
| 29 | **Personal Setup** | `src/PersonalSetupLightMode.jsx` | `src/PersonalSetupDarkMode.jsx` | Hero Logo & Welcome Title (No Nav Header) | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | Onboarding wizard; no top sticky nav bar |
| 30 | **PIN Setup Change** | `src/PinSetupChangeLightMode.jsx` | `src/PinSetupChangeDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; vault PIN inputs |
| 31 | **Prayer Notification Settings** | `src/PrayerNotificationSettingsLightMode.jsx` | `src/PrayerNotificationSettingsDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; adhan chime settings |
| 32 | **Prayer Times** | `src/PrayerTimesLightMode.jsx` | `src/PrayerTimesDarkMode.jsx` | Icon + Title + Bell + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; prayer timetable cards |
| 33 | **Quick Note Editor** | `src/QuickNoteEditorLightMode.jsx` | `src/QuickNoteEditorDarkMode.jsx` | Icon + Title + Back Button + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; quick memo textarea |
| 34 | **Settings Profile** | `src/SettingsProfileLightMode.jsx` | `src/SettingsProfileDarkMode.jsx` | Icon + Title + Bell + Avatar | `.momentum-canvas-viewport` | `PhoneWallpaperCanvas` | None (Local JSX) | `div.min-h-screen` root; profile hero card |
| 35 | **Splash Screen** | `src/SplashScreenLightMode.jsx` | `src/SplashScreenDarkMode.jsx` | Centered Animated Logo (No Nav Header) | Non-scrollable (`overflow-hidden`) | Self-contained | None (Local JSX) | Startup animation; non-scrollable |
| 36 | **Tasbeeh History** | `src/TasbeehHistoryLightMode.jsx` | `src/TasbeehHistoryDarkMode.jsx` | Icon + Title + Back Button + Avatar | `div.flex-1.overflow-y-auto` | `PhoneWallpaperCanvas` | None (Local JSX) | Internal scroller; date sub-bar below header |
| 37 | **Tasbeeh Main** | `src/TasbeehMainLightMode.jsx` | `src/TasbeehMainDarkMode.jsx` | Icon + Title + History + Settings + Avatar | `div.flex-1.overflow-y-auto` | `PhoneWallpaperCanvas` | None (Local JSX) | Internal scroller; dual right action icons |
| 38 | **Tasbeeh Settings** | `src/TasbeehSettingsLightMode.jsx` | `src/TasbeehSettingsDarkMode.jsx` | Icon + Title + Back Button + Avatar | `div.flex-1.overflow-y-auto` | `PhoneWallpaperCanvas` | None (Local JSX) | Internal scroller; preferences checklist |
| 39 | **Tasks & Reminders 1** | `src/TasksRemindersLightMode1.jsx` | `src/TasksRemindersDarkMode1.jsx` | Icon + Title + Bell + Avatar | `div.flex-1.overflow-y-auto` | `PhoneWallpaperCanvas` | None (Local JSX) | Internal scroller; filter tabs & task list |
| 40 | **Tasks & Reminders 2** | `src/TasksRemindersLightMode2.jsx` | `src/TasksRemindersDarkMode2.jsx` | Icon + Title + Bell + Avatar | `div.flex-1.overflow-y-auto` | `PhoneWallpaperCanvas` | None (Local JSX) | Internal scroller; variant layout 2 |
| 41 | **Timezone Selection** | `src/TimezoneSelectionLightMode.jsx` | `src/TimezoneSelectionDarkMode.jsx` | Icon + Title + Back Button + Avatar | `div.flex-1.overflow-y-auto` | `PhoneWallpaperCanvas` | None (Local JSX) | Internal scroller; timezone search & radio |

---

## 4. Root Cause Analysis: Why Past Attempts Failed or Were Inconsistent

Forensic examination of previous attempts revealed five distinct, verified structural mechanisms that caused failures:

### 4.1 Root Cause 1: Subtitle & Header Element Disconnection (Verified)
- **The Issue:** On screens like `MoreLightMode.jsx` and `MoreDarkMode.jsx`, the top row is `<div className="flex items-center justify-between px-5 pt-6 pb-2">` followed immediately by `<p className="px-5 text-xs font-normal text-slate-800 mb-5">Spiritual tools, mindful finance & preferences</p>`.
- **The Failure:** When previous implementations changed only the top `div` to `sticky top-0`, the subtitle remained in the document flow below. When scrolled, the subtitle moved up, collided with or disappeared beneath the sticky header, or left an awkward floating gap.
- **The Solution:** The top bar and subtitle must be semantically grouped inside a single `<header className="sticky top-0 z-[60] w-full px-5 pt-5 pb-3 ...">` so they remain unified as a cohesive unit during scrolling.

### 4.2 Root Cause 2: Opaque Wrapper Injection & Backdrop Blur Collapse (Verified)
- **The Issue:** In CSS, `backdrop-filter: blur(...)` samples and blurs the pixels rendered in the stacking context *immediately behind the element*. If the element sits directly inside a solid opaque container (e.g. `bg-slate-50` or `bg-[#0B0F19]`), it simply blurs the solid color, producing a muddy, completely opaque white or dark rectangle with zero visible wallpaper.
- **The Failure:** Previous attempts attempted to inject new wrapper `div` tags with solid backgrounds around the content or changed root classes without accounting for `index.css`'s `.momentum-canvas-viewport.wallpaper-active` selectors.
- **The Solution:** Header styling must strictly use semi-transparent background color values (`bg-white/[0.18]` for Light Mode, `bg-slate-950/[0.24]` for Dark Mode) with `backdrop-blur-2xl backdrop-saturate-150 border-b border-white/25` (or `border-white/10`). Never inject opaque wrapper divs.

### 4.3 Root Cause 3: The Scroll Container Dichotomy (Verified)
- **The Issue:** A CSS `position: sticky` element positions itself relative to its **nearest scrolling ancestor** (the closest ancestor with `overflow: auto`, `overflow: scroll`, or `overflow-y: auto`).
- **The Failure:**
  - In 34 screens, the nearest scrolling ancestor is `.momentum-canvas-viewport` in `App.jsx`.
  - In 6 screens (`tasbeeh_history`, `tasbeeh_main`, `tasbeeh_settings`, `tasks_reminders_1`, `tasks_reminders_2`, `timezone_selection`), the nearest scrolling ancestor is an internal `<div className="flex-1 overflow-y-auto">`.
  - When previous attempts assumed every screen scrolled at the same DOM level, headers on the internal-scroll screens either didn't stick or got clipped unexpectedly.
- **The Solution:** For the 6 internal-scroll screens, the sticky header is placed as the first child of the internal `overflow-y-auto` container, where `sticky top-0 z-[60]` functions flawlessly.

### 4.4 Root Cause 4: Root Element Hierarchy Variations (Verified)
- **The Issue:** 19 screen entities use `<>` (React Fragment) as root, while 21 screen entities use `<div className="min-h-screen ...">`.
- **The Failure:** In Fragment-root screens, the top header is a direct child of `.momentum-canvas-viewport`. In `min-h-screen` screens, it is nested inside that `div`. Previous regex scripts assumed an identical DOM tree across all screens and produced syntax errors when closing tags didn't match.
- **The Solution:** Target the existing header element directly without altering the root element or its tag type.

### 4.5 Root Cause 5: Automated Regex Replacements (Verified)
- **The Issue:** Regex-based mass find-and-replace scripts failed to account for multi-line attributes, inline styles (`style={{ textShadow: ... }}`), and minor prop variations between screens.
- **The Solution:** File edits must be strictly targeted and verified per screen batch, using precise AST/content replacement rather than blind regex scripts.

---

## 5. Design System, Font, and Theme Protection

### 5.1 Approved Fonts & Typography (MUST NOT BE CHANGED)
The existing approved design relies on specific typography:
- **`Inter`:** Imported via Google Fonts in `index.html` and `src/index.css`. Primary body and label font.
- **`Plus Jakarta Sans`:** Imported via Google Fonts in `src/index.css`. Primary heading font (`font-heading`).
- **`BahijTitr`:** Custom font loaded via `@font-face` from `/fonts/BahijTitr.ttf`.
- **`ArabQuranIslamic`:** Custom font loaded via `@font-face` from `/fonts/quran.woff2`.

> [!CAUTION]
> **Zero Font Modification Rule:**
> Do NOT touch font imports in `index.html`, `@font-face` / `@import` in `src/index.css`, or `fontFamily` in `tailwind.config.js`. Preserve all `textShadow`, font sizes, and font weights exactly as they exist.

### 5.2 Approved Color Tokens & Theme Surfaces (MUST NOT BE CHANGED)
- Theme tokens defined in `:root` and `.dark` inside `src/index.css` must remain intact.
- Card backgrounds:
  - Light: `bg-white/70 backdrop-blur-md border border-white/80 shadow-lg`
  - Dark: `bg-black/30 backdrop-blur-md border border-white/10 shadow-xl`
- All card paddings, borders, corner radiuses (`rounded-2xl`, `rounded-3xl`), and button variants (`btn-primary`, `btn-secondary`) must remain untouched.

---

## 6. Architectural Evaluation of Implementation Strategies

We evaluated the four proposed architectural approaches:

### OPTION A: Targeted Class Standard on Existing Headers (RECOMMENDED)
- **Concept:** Apply the verified sticky glassmorphic Tailwind classes directly to each screen's top header element in place, while preserving the existing JSX hierarchy.
- **Pros:**
  - 100% zero risk to routing, props, event handlers (`setActiveTab`), or button logic.
  - Zero risk of breaking screen-specific elements (e.g. Search in `NotesMain`, Settings in `TasbeehMain`, Category selectors in `AddEditExpense`).
  - Preserves exact card layouts and spacing.
  - Handles the 6 internal-scroll screens naturally without architectural surgery.
- **Cons:** Requires updating 76 files (38 screen pairs) directly.

### OPTION B: Reusable Global Header Component
- **Concept:** Create a shared `<AppHeader />` component and replace local headers across all screens.
- **Evaluation:** **REJECTED.** The screens have too many heterogeneous header configurations:
  - Logo + Bell + Avatar (Dashboard, More)
  - Icon + Title + Back Button + Avatar (Sub-screens)
  - Icon + Title + Search + Avatar (Notes)
  - Icon + Title + History + Settings + Avatar (Tasbeeh)
  - Subtitle grouping requirements (`More`)
  Forcing a single component requires a complex, brittle prop API (`leftAction`, `rightActions`, `hasSubtitle`, `hasLogo`, `onBack`, etc.) with a high risk of breaking event handlers.

### OPTION C: Shared Screen Shell Layout Abstraction
- **Concept:** Wrap screens in a shared `<ScreenShell />` layout component.
- **Evaluation:** **REJECTED.** Would fundamentally alter the DOM tree, breaking the 6 internal-scroll screens, destroying `.momentum-canvas-viewport.wallpaper-active` CSS selector rules, and causing severe layout regressions.

### OPTION D: Hybrid Approach
- **Evaluation:** Option A combined with semantic grouping for subtitle screens is the cleanest, lowest-risk hybrid.

---

## 7. Recommended Standard Specification

### 7.1 Light Mode Sticky Header Specification
```jsx
<div className="sticky top-0 z-[60] w-full flex items-center justify-between px-5 pt-6 pb-4 bg-white/[0.18] backdrop-blur-2xl backdrop-saturate-150 border-b border-white/25">
  {/* Existing Title, Icon/Logo, and Action elements preserved identically */}
</div>
```

### 7.2 Dark Mode Sticky Header Specification
```jsx
<div className="sticky top-0 z-[60] w-full flex items-center justify-between px-5 pt-6 pb-4 bg-slate-950/[0.24] backdrop-blur-2xl backdrop-saturate-150 border-b border-white/10">
  {/* Existing Title, Icon/Logo, and Action elements preserved identically */}
</div>
```

### 7.3 Special Handling for Subtitle Screens (e.g., `More` Screen)
For screens where a subtitle immediately describes the screen, group the top row and subtitle together in a semantic header:
```jsx
{/* Grouped Sticky Header */}
<header className="sticky top-0 z-[60] w-full px-5 pt-5 pb-3 bg-white/[0.18] backdrop-blur-2xl backdrop-saturate-150 border-b border-white/25">
  <div className="flex items-center justify-between mb-1">
    {/* Logo, Title, Bell, Avatar */}
  </div>
  <p className="text-xs font-normal text-slate-800" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.8)' }}>
    Spiritual tools, mindful finance & preferences
  </p>
</header>
```

---

## 8. Risk Analysis & Protected Files

### Files That MUST NOT Be Modified:
1. `src/index.css`: Defines global wallpaper transparency and fonts. Must remain untouched.
2. `src/App.jsx`: Defines canvas viewport frame and routing. Must remain untouched.
3. `src/context/ThemeContext.jsx`: Manages theme sync. Must remain untouched.
4. `src/context/WallpaperContext.jsx`: Manages wallpaper engine. Must remain untouched.
5. `src/components/GlobalBackground.jsx`: Renders background layer. Must remain untouched.
6. `index.html` & `tailwind.config.js`: Define core typography and tokens. Must remain untouched.
7. Any file not imported by `App.jsx` (the 44 legacy files).

---

## 9. Phased Implementation Plan (For Future Execution)

When approved to implement, execution will proceed strictly in phased batches with visual verification and build checks at each step:

- **Phase 1: Pilot Verification (`More` Screen)**
  - `src/MoreLightMode.jsx` & `src/MoreDarkMode.jsx`
  - Group header + subtitle; verify with Puppeteer at 0px and 220px scroll.
- **Phase 2: Standard Navigation Screens (Batches 1 - 3)**
  - 18 screen pairs with standard Back Button + Title + Icon.
- **Phase 3: Dashboard & Root Tab Screens (Batches 4 - 5)**
  - 10 screen pairs with Bell / Search / Avatar.
- **Phase 4: Internal Scroll Container Screens (Batch 6)**
  - 6 screen pairs (`tasbeeh_history`, `tasbeeh_main`, `tasbeeh_settings`, `tasks_reminders_1`, `tasks_reminders_2`, `timezone_selection`).
  - Update header inside the internal `overflow-y-auto` container.
- **Phase 5: Self-Contained Screens Verification (Batch 7)**
  - Verify that `PersonalSetup` (onboarding) and `SplashScreen` remain self-contained without nav headers.

---

## 10. Verification Plan

1. **Static Analysis & Build Verification:**
   - Execute `npm run build` after each phase to guarantee zero build errors or broken JSX syntax.
2. **Visual Translucency & Blur Verification:**
   - Run headless Chrome / Puppeteer scripts capturing both top (`scrollY = 0`) and scrolled (`scrollY = 220px`) states.
   - Inspect captured PNG artifacts to verify that background wallpaper and scrolling cards are clearly visible and smoothly blurred through the header.
3. **Parity Check:**
   - Verify that Light Mode and Dark Mode for each screen have 100% structural parity.
4. **Git Diff Audit:**
   - Confirm with `git diff` that ONLY the header element class names were updated, with zero changes to card bodies, logic, or global styles.

