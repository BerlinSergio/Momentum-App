# MOMENTUM — REAL USER JOURNEY TEST MATRIX
## Exhaustive End-to-End Workflow Execution & State Transition Testing

All workflows are executed against the running application in dedicated browser contexts, verifying actual DOM interactions, form submissions, navigation transitions, and durable storage persistence.

---

### USER JOURNEYS DIRECTORY

| Journey ID | Workflow Title | Primary User Steps | Key Verifications | Result |
|---|---|---|---|---|
| **UJ-01** | **First Launch & Onboarding** | Launch clean app → Language selection grid → Name input → City selection → Currency choice → PIN setup | - Welcome banner & language switch<br>- Proper default city (Kabul)<br>- Profile persisted<br>- Onboarding marked complete | **PASS** |
| **UJ-02** | **Task Creation & Full Lifecycle** | Open Add Task → Enter title & notes → Select priority & category → Open MomentumDatePicker → Select Due Date → Save | - Global toast success<br>- Appears in Tasks list<br>- Task details display correct data<br>- Edit retains ID<br>- Complete & Undo toggle | **PASS** |
| **UJ-03** | **Daily Habit & Streak Consistency** | Open Add Routine → Enter habit name → Select Smart Suggestion → Pick target time with MomentumTimePicker → Set Every Day → Save | - Appears on Home & Routine list<br>- Today's completion toggle<br>- Streak increment to 1<br>- Persistent on reload | **PASS** |
| **UJ-04** | **Financial Transaction & Budgeting** | Open Add Expense → Enter amount → Note description → Select Category → Pick Date/Time via MomentumDateTimePicker → Save | - Account balance updates<br>- Expense tracker list reflects entry<br>- Financial Summary on Home updates<br>- Negative/empty inputs blocked | **PASS** |
| **UJ-05** | **Notes Creation & Media Attachments** | Open Long Note Editor → Add rich title & Markdown body → Attach image/document → Pin note → Save | - Note appears in Notes Main<br>- Pinned section prioritizes card<br>- Attachment preview renders<br>- Reopen editor retains full text | **PASS** |
| **UJ-06** | **3-Calendar Navigation & Event Linking** | Open Calendars → Switch Gregorian ↔ Shamsi ↔ Hijri → Select date → Create Event with picker → View linked tasks | - Correct Afghan month names (حمل... / وری...)<br>- Hijri lunar date alignment<br>- Today preset returns to civil date | **PASS** |
| **UJ-07** | **Prayer Times & Adhan Scheduling** | Open Prayer Times → Inspect Fajr/Dhuhr/Asr/Maghrib/Isha → Open Notification Settings → Adjust offset → Change calculation method | - Accurate civil prayer times<br>- Next prayer countdown updates<br>- Notification offset persisted<br>- Offline cached data works | **PASS** |
| **UJ-08** | **Digital Tasbeeh & Dhikr Counter** | Open Tasbeeh → Select SubhanAllah preset → Tap screen 33 times → Observe cycle completion feedback → Reset counter | - Taps increment with zero skips<br>- Haptic/visual pulse on 33<br>- Cycle count increases to 1<br>- Custom Dhikr creation works | **PASS** |
| **UJ-09** | **Appearance, Theme & Wallpaper Customization** | Open Settings → Appearance → Toggle Dark/Light Mode → Select Wallpaper → Adjust Blur & Dimming sliders | - Instant theme swap<br>- Wallpaper crossfades smoothly<br>- Readability maintained over all backgrounds | **PASS** |
| **UJ-10** | **Multilingual Switching (Simple English, Pashto, Dari)** | Open Language Settings → Select Afghan Pashto (پښتو) → Verify RTL layout & Noto Sans Arabic → Select Afghan Dari (دری) → Select English | - `dir="rtl"` applied instantly<br>- Back buttons mirrored<br>- No untranslated English jargon<br>- User records remain uncorrupted | **PASS** |
| **UJ-11** | **Security PIN Setup & Cold-Start Lock** | Open Security Settings → Set 4-digit PIN → Lock app → Enter incorrect PIN (verify error) → Enter correct PIN (unlock) | - App veil blocks UI when locked<br>- PBKDF2 hash validation<br>- Rate limiting on wrong attempts<br>- State persists on app restart | **PASS** |
| **UJ-12** | **Encrypted Backup Export & Recovery** | Open Backup & Restore → Create encrypted backup with password → Download file → Clear session → Restore from file | - AES-256-GCM encryption verified<br>- Full record counts match<br>- Wrong password fails honestly<br>- All modules restored intact | **PASS** |
