# MOMENTUM — FOUR-POSITION FLOATING SIDEBAR & CINEMATIC MOTION REPORT

**Date:** November 20, 2026  
**Application:** Momentum — Intentional Living  
**Environment:** Desktop & Native Responsive Shell (React 18, Vite, Tailwind CSS, Framer Motion, Zustand)  
**Deliverable Status:** VERIFIED & READY FOR INSPECTION  
**Primary Architect:** Desktop UI & Motion System Architect  

---

## 1. Executive Summary & Objective

The Momentum desktop navigation system has been upgraded from a fixed vertical sidebar into a **Four-Position Dynamic Floating System**. The user can position the navigation on any of the four viewport edges:
1. **Left** (Default vertical floating sidebar)
2. **Right** (Vertical floating sidebar pinned to right viewport edge)
3. **Top** (Horizontal floating dock pinned to top viewport edge)
4. **Bottom** (Horizontal floating dock pinned to bottom viewport edge)

Crucially, position switching is available **directly inside the navigation itself** via an in-sidebar Position Popover menu. No detour to a separate settings page is required.

Both **Expanded** and **Collapsed** states are fully supported across all four positions (yielding **8 distinct layout configurations**), with coordinated **Framer Motion spring physics** powering layout reflows, dock adaptations, and collapse/expand transitions.

All authentic visual requirements established in prior revisions remain strictly preserved:
- Genuine glassmorphism (`backdrop-filter: blur(24px) saturate(180%)`)
- Elimination of unwanted white surrounds/gutters
- Elimination of macOS-style fake window control dots (red/yellow/green)
- Centrally portaled desktop Quick Actions modal
- Functional theme toggle with instant dark/light mode switching
- Zero regressions on mobile viewports (<1024px)

---

## 2. Architectural Design & Layout Mechanics

### 2.1 Four-Position Placement Architecture

The desktop application shell layout in [`src/App.jsx`](file:///C:/Momentum/src/App.jsx) controls the flow direction of the navigation and dashboard canvas based on the active `sidebarPosition`:

```jsx
const shellLayoutClass = useMemo(() => {
  if (sidebarPosition === 'right') return 'flex-row-reverse';
  if (sidebarPosition === 'top') return 'flex-col';
  if (sidebarPosition === 'bottom') return 'flex-col-reverse';
  return 'flex-row'; // 'left'
}, [sidebarPosition]);
```

#### Deterministic Physical Positioning Across RTL and LTR
In multi-lingual applications supporting English (LTR), Pashto (RTL), and Afghan Dari (RTL), standard CSS flex layouts can invert `row` order when `dir="rtl"` is applied at the root container. To guarantee that:
- **Left** is *always physically on the left* of the screen
- **Right** is *always physically on the right* of the screen
- **Top** and **Bottom** maintain physical vertical orientation

The outer desktop shell container explicitly sets `dir="ltr"` for physical container distribution, while the inner content canvas and sidebar containers set `dir={isCurrentRtl ? 'rtl' : 'ltr'}`. This ensures text direction, icon alignment, and typography accurately respect RTL languages (Pashto/Dari) while physical hardware dock placement remains deterministic and stable.

---

### 2.2 Navigation Modes: Vertical vs. Horizontal Dock

[`src/components/DesktopSidebar.jsx`](file:///C:/Momentum/src/components/DesktopSidebar.jsx) dynamically renders one of two specialized layouts depending on the active orientation:

#### A. Vertical Sidebar (`left` and `right`)
- **Expanded Width:** `260px` (`w-[260px]`)
- **Collapsed Width:** `80px` (`w-[80px]`)
- **Structure:**
  - Header with circular user avatar, name, and subtitle
  - Favourites navigation item list (Home, Tasks, Finance, Notes, Prayer, Tasbeeh, Calendars, More)
  - Quick Actions launcher
  - Bottom utility section with Appearance Toggle, In-Sidebar Position Selector, and Expand/Collapse Toggle Button.

#### B. Horizontal Dock (`top` and `bottom`)
- **Expanded Height:** `72px` (`h-[72px]`)
- **Collapsed Height:** `54px` (`h-[54px]`)
- **Structure:** Single horizontal glass bar with flex layout:
  - **Start:** Compact user avatar and greeting
  - **Center:** Horizontal scrollable/wrapped navigation pills with active indicator
  - **End:** Action cluster containing Quick Actions trigger, Position Selector, Theme Toggle, and Collapse/Expand button.

---

### 2.3 Spring Motion Physics & Cinematic Transitions

All sizing, position shifts, and content reflows are driven by Framer Motion's physics-based spring solver:

```javascript
const springTransition = {
  type: 'spring',
  damping: 26,
  stiffness: 280,
  mass: 0.8
};
```

- **Resizing Transitions:** Width and height changes animate smoothly without jumpiness or layout flickering.
- **Label Transitions:** Text labels and subtext fade out with `opacity: 0, width: 0` during collapse and re-enter with subtle staggering.
- **Floating Margin Stability:** Fixed margin gaps (`m-4`) keep the dock floating gracefully above the canvas wallpaper.
- **Reduced Motion Support:** Respects `prefers-reduced-motion: reduce` by replacing spring curves with subtle opacity crossfades.

---

### 2.4 State Model & Persistent Storage

The navigation state is managed in [`src/store/useNavigationStore.js`](file:///C:/Momentum/src/store/useNavigationStore.js):

- `sidebarPosition`: `'left' | 'right' | 'top' | 'bottom'` (persisted to `localStorage` under `'momentum_desktop_sidebar_position'`)
- `sidebarCollapsed`: `boolean` (persisted to `localStorage` under `'momentum_desktop_sidebar_collapsed'`)
- `setSidebarPosition(position)`: Updates active position and synchronizes to local storage immediately.
- `toggleSidebar()` / `setSidebarCollapsed(bool)`: Controls expand/collapse state.

---

## 3. Localization Parity

New localization keys were added to [`src/locales/en.json`](file:///C:/Momentum/src/locales/en.json), [`src/locales/ps-AF.json`](file:///C:/Momentum/src/locales/ps-AF.json), and [`src/locales/fa-AF.json`](file:///C:/Momentum/src/locales/fa-AF.json):

| Key | English (`en`) | Pashto (`ps-AF`) | Afghan Dari (`fa-AF`) |
| :--- | :--- | :--- | :--- |
| `sidebar.position` | Position | موقعیت | موقعیت |
| `sidebar.posLeft` | Left | چپ | چپ |
| `sidebar.posRight` | Right | ښی | راست |
| `sidebar.posTop` | Top | پورته | بالا |
| `sidebar.posBottom` | Bottom | ښکته | پایین |
| `sidebar.currentPosition` | Current Position | اوسنی موقعیت | موقعیت فعلی |
| `sidebar.positionSelector` | Change Position | موقعیت بدلول | تغییر موقعیت |

---

## 4. Eight-Configuration Verification Matrix

All 8 position/collapse configurations were systematically verified in both Dark and Light modes using automated Puppeteer test scripts ([`tests/sidebar/test_four_position_sidebar.cjs`](file:///C:/Momentum/tests/sidebar/test_four_position_sidebar.cjs) and [`tests/sidebar/capture_light_variants.cjs`](file:///C:/Momentum/tests/sidebar/capture_light_variants.cjs)).

| Configuration | Orientation | State | Target Size | Verified Visual Artifact | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Config 1** | Left | Expanded | `260px` | [left_expanded_dark.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/left_expanded_dark.png)<br>[left_expanded_light.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/left_expanded_light.png) | **PASS** |
| **Config 2** | Left | Collapsed | `80px` | [left_collapsed_dark.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/left_collapsed_dark.png)<br>[left_collapsed_light.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/left_collapsed_light.png) | **PASS** |
| **Config 3** | Right | Collapsed | `80px` | [right_collapsed_dark.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/right_collapsed_dark.png)<br>[right_collapsed_light.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/right_collapsed_light.png) | **PASS** |
| **Config 4** | Right | Expanded | `260px` | [right_expanded_dark.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/right_expanded_dark.png)<br>[right_expanded_light.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/right_expanded_light.png) | **PASS** |
| **Config 5** | Top | Expanded | `72px` | [top_expanded_dark.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/top_expanded_dark.png)<br>[top_expanded_light.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/top_expanded_light.png) | **PASS** |
| **Config 6** | Top | Collapsed | `54px` | [top_collapsed_dark.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/top_collapsed_dark.png)<br>[top_collapsed_light.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/top_collapsed_light.png) | **PASS** |
| **Config 7** | Bottom | Collapsed | `54px` | [bottom_collapsed_dark.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/bottom_collapsed_dark.png)<br>[bottom_collapsed_light.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/bottom_collapsed_light.png) | **PASS** |
| **Config 8** | Bottom | Expanded | `72px` | [bottom_expanded_dark.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/bottom_expanded_dark.png)<br>[bottom_expanded_light.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/bottom_expanded_light.png) | **PASS** |

### Additional Interactive & Multilingual Validations:
- **Pashto (`ps-AF`) on Right:** [right_expanded_pashto.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/right_expanded_pashto.png) — Verified RTL typography, badge alignment, and in-dock translations.
- **Afghan Dari (`fa-AF`) on Top:** [top_expanded_dari.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/top_expanded_dari.png) — Verified horizontal dock layout with Dari labels.
- **Portaled Quick Actions Modal:** [quick_actions_from_dock.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/quick_actions_from_dock.png) — Verified center modal trigger from horizontal dock.
- **Mobile Viewport (390x844):** [mobile_regression_390x844.png](file:///C:/Users/USER/.gemini/antigravity/brain/4df946e6-85fe-47e3-a6c6-502167c18753/mobile_regression_390x844.png) — Verified desktop dock is hidden and mobile `BottomNav` is 100% operational.

---

## 5. Build & Compilation Verification

1. **Vite Production Build:**
   ```powershell
   npm.cmd run build
   ```
   **Output:** `✓ built in 2.78s` (Exit code: 0).

2. **Android Gradle Debug Build:**
   ```powershell
   cmd.exe /c "C:\momentum\android\gradlew.bat -p C:\momentum\android assembleDebug"
   ```
   **Output:** `BUILD SUCCESSFUL` (Exit code: 0).

---

## 6. Conclusion & Next Steps

The Four-Position Floating Navigation System is fully realized, adhering strictly to the user's reference designs, motion standards, and glassmorphism requirements. The implementation is stable, fully tested across all 8 configurations, and ready for user inspection.

*Strict No-Stitch policy followed. Master QA Audit and Production Release hold maintained.*
