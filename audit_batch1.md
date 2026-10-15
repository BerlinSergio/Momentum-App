# Batch 1 QA Parity Audit

- **Screen Name**: Splash Screen
- **Status**: ?? DISCREPANCIES FOUND
- **Differing Sections & Details**:
  * **Section Name**: Minimal Aesthetic Goal Pills
    - **Light Mode**: Includes `shadow-2xs` class on the pills (`bg-white border border-slate-200/80 text-slate-700 shadow-2xs`).
    - **Dark Mode**: Missing the shadow class (`bg-slate-900 border border-slate-800 text-slate-300`).
    - **Difference**: Shadow is omitted in dark mode.
- **Container Geometry & Shadows Status**: Needs Fix
- **Text & Typography Status**: OK

- **Screen Name**: Personal Setup
- **Status**: ? 100% PERFECT PARITY
- **Container Geometry & Shadows Status**: OK
- **Text & Typography Status**: OK

- **Screen Name**: Pin Setup Change
- **Status**: ?? DISCREPANCIES FOUND
- **Differing Sections & Details**:
  * **Section Name**: Shield Guardrails Card
    - **Light Mode**: Text color is applied directly to child elements (e.g. `text-slate-900` on list items).
    - **Dark Mode**: Applies `text-white` to the parent container and removes text color classes from the children.
    - **Difference**: Structural layout difference in how typography colors are applied.
- **Container Geometry & Shadows Status**: OK
- **Text & Typography Status**: Needs Fix

- **Screen Name**: Prayer Times
- **Status**: ?? DISCREPANCIES FOUND
- **Differing Sections & Details**:
  * **Section Name**: Top Header Logo
    - **Light Mode**: No ring class applied.
    - **Dark Mode**: Includes an extra ring class (`ring-2 ring-indigo-950/60`).
    - **Difference**: Extra ring border geometry in dark mode.
  * **Section Name**: Next Prayer Hero Card Button
    - **Light Mode**: Uses a gradient background (`bg-gradient-to-r from-indigo-600 to-indigo-700`).
    - **Dark Mode**: Uses a solid background with a hover effect (`bg-indigo-600 hover:bg-indigo-500`).
    - **Difference**: Background rendering mismatch.
- **Container Geometry & Shadows Status**: Needs Fix
- **Text & Typography Status**: OK

- **Screen Name**: Prayer Notification Settings
- **Status**: ? 100% PERFECT PARITY
- **Container Geometry & Shadows Status**: OK
- **Text & Typography Status**: OK

