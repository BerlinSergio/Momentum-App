# MOMENTUM — CROSS-SCREEN SYNCHRONIZATION MATRIX
## Architectural Dependency & State Mutation Map Across Modules

This matrix maps every shared data domain in Momentum, tracing mutations from their origin screen through all downstream consumers, storage adapters, and rehydrated UI states.

---

### SYNCHRONIZATION COVERAGE TABLE

| Domain | Mutation Origin | Downstream Consumer Screens & Components | Store & Persistence Key | Verification Method | Status |
|---|---|---|---|---|---|
| **Tasks** | `add_edit_task_dark_mode`, `add_edit_task_light_mode` | - `tasks_reminders_*`<br>- `task_details_*`<br>- `home_dashboard_*` (Today's Schedule)<br>- `gregorian_calendar_*`<br>- `shamsi_calendar_*`<br>- Universal Toasts | `useTaskStore`<br>`momentum-task-storage` | Real UI submission, details inspection, home widget refresh, IndexedDB rehydration | **PASS** |
| **Habits & Routines** | `add_edit_routine_dark_mode`, `add_edit_routine_light_mode` | - `daily_routine_*`<br>- `routine_details_*`<br>- `home_dashboard_*` (Daily Progress)<br>- Streak visualizer<br>- Universal Toasts | `useRoutineStore`<br>`momentum-routine-storage` | Habit creation, completion toggle, streak increment verification, cross-screen check | **PASS** |
| **Finance Transactions** | `add_edit_expense_*`, `add_edit_income_*` | - `finance_dashboard_*`<br>- `finance_expense_tracker_*`<br>- `income_management_*`<br>- `home_dashboard_*` (Financial Summary & Net Savings)<br>- Universal Toasts | `useFinanceStore`<br>`momentum-finance-storage` | Atomic transaction write, balance computation, expense category allocation, home card sync | **PASS** |
| **Notes & Reflections** | `long_note_editor_*`, `quick_note_editor_*` | - `notes_main_*`<br>- `note_media_attachment_viewer_*`<br>- `home_dashboard_*` (Recent Notes)<br>- Pinned notes strip | `useNotesStore`<br>`momentum-notes-storage` | Save note, attachment byte validation, pin status toggle, search filter query | **PASS** |
| **Calendars & Events** | `gregorian_calendar_*`, `afghan_solar_hijri_*`, `islamic_hijri_*` | - All 3 calendar views<br>- Linked Task navigation<br>- Home dashboard date chip<br>- Top-center toasts | `useCalendarStore`<br>`momentum-calendar-storage-v1` | Event creation, month transition, Shamsi/Hijri leap year computation, today return | **PASS** |
| **Prayer Times & Qibla** | `city_selection_*`, `notifications_settings_*` | - `prayer_times_*`<br>- `home_dashboard_*` (Prayer strip & countdown)<br>- Qibla compass<br>- Adhan notifications | `usePrayerStore`<br>`useLocationStore`<br>`momentum-prayer-storage` | City selection, coordinate update, Hanafi/Standard Asr calculation, offline mode | **PASS** |
| **Digital Tasbeeh** | `tasbeeh_main_*`, `new_edit_tasbeeh_*` | - `tasbeeh_main_*`<br>- `tasbeeh_history_*`<br>- `tasbeeh_settings_*`<br>- Home Dhikr quick count | `useTasbeehStore`<br>`momentum-tasbeeh-storage` | Tap incrementation, goal completion cycle, custom Dhikr creation, history logging | **PASS** |
| **User Profile & Avatar** | `edit_profile_*`, `personal_setup_*` | - `settings_profile_*`<br>- `home_dashboard_*` (Welcome Hero greeting & avatar)<br>- Desktop sidebar profile card | `useProfileStore`<br>`momentum-profile-storage` | Name update, avatar upload/change, immediate Welcome Hero header reflection | **PASS** |
| **Language & Locale** | `language_settings_*` | - All 84 screens<br>- DesktopSidebar & BottomNavBar<br>- Pickers & Toasts<br>- Welcome Hero | `useLocaleStore`<br>`momentum-locale-storage` | Switch `en` ↔ `ps-AF` ↔ `fa-AF`, verify DOM `lang`, `dir`, fonts, and translations | **PASS** |
| **App Lock & Security** | `pin_setup_change_*`, `app_lock_*` | - Full application veil<br>- Screen protection guard<br>- Auto-lock timeout monitor | `useSecurityStore`<br>`momentum-security-storage` | PIN setup, failed attempts lockout, cold-start lock, biometrics toggle | **PASS** |
| **Encrypted Backup** | `backup_restore_*` | - Entire application state<br>- Cross-device export/import | `backupService.js`<br>AES-256-GCM | Encrypted file generation, password decryption, schema verification, rehydration | **PASS** |
