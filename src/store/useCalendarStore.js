import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { getShamsiDate, findFirstDayOfShamsiMonth, getHijriDateParts, hijriToGregorian } from '../utils/afghanCalendar.js';

const getSafeStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch (e) {
    console.warn('LocalStorage unavailable for calendars, falling back to memory store:', e);
  }
  const memoryStore = new Map();
  return {
    getItem: (key) => memoryStore.get(key) || null,
    setItem: (key, value) => { memoryStore.set(key, String(value)); },
    removeItem: (key) => { memoryStore.delete(key); },
  };
};

const initialEvents = [
  {
    id: 'evt-seed-1',
    title: 'Kabul Central Market Logistics Check',
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 4,
    gregorianYear: 2026,
    gregorianMonth: 10,
    gregorianDay: 25,
    date: '2026-10-25',
    time: '11:30 AM',
    category: 'Logistics',
    note: 'Wholesale dried fruits, saffron restock & currency settlement.',
    completed: false,
  },
  {
    id: 'evt-seed-2',
    title: 'Garden & Orchard Winterization Prep',
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 4,
    gregorianYear: 2026,
    gregorianMonth: 10,
    gregorianDay: 25,
    date: '2026-10-25',
    time: '04:30 PM',
    category: 'Personal',
    note: 'Irrigation line blowout, root mulch and pomegranate insulation.',
    completed: false,
  },
  {
    id: 'evt-seed-3',
    title: 'Herat Artisan Carpet Inspection',
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 7,
    gregorianYear: 2026,
    gregorianMonth: 10,
    gregorianDay: 28,
    date: '2026-10-28',
    time: '02:00 PM',
    category: 'Work',
    note: 'Review wool dye quality and shipment manifests.',
    completed: false,
  },
  {
    id: 'evt-seed-4',
    title: 'Balkh Literature Circle Gathering',
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 20,
    gregorianYear: 2026,
    gregorianMonth: 11,
    gregorianDay: 10,
    date: '2026-11-10',
    time: '05:00 PM',
    category: 'Personal',
    note: 'Recitations of Rumi and Iqbal poetry at the academy hall.',
    completed: false,
  },
  // Gregorian Seed Events for October 24, 2026 (matching mock)
  {
    id: 'evt-greg-1',
    title: 'Quarterly Investment Review',
    gregorianYear: 2026,
    gregorianMonth: 10,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 2,
    date: '2026-10-24',
    time: '09:30 AM – 10:30 AM',
    category: 'Finance',
    note: 'Portfolio rebalancing and yield audit.',
    completed: true,
  },
  {
    id: 'evt-greg-2',
    title: 'Sprint Planning & Task Sync',
    gregorianYear: 2026,
    gregorianMonth: 10,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 2,
    date: '2026-10-24',
    time: '02:00 PM – 03:00 PM',
    category: 'Work',
    note: 'Weekly sprint planning and sprint backlog estimation.',
    completed: false,
  },
  {
    id: 'evt-greg-3',
    title: 'Family Dinner Prep & Catch-up',
    gregorianYear: 2026,
    gregorianMonth: 10,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 2,
    date: '2026-10-24',
    time: '05:00 PM – 06:15 PM',
    category: 'Personal',
    note: 'Family meal preparation and catch-up.',
    completed: false,
  },
  // November 2026 events (matching mock calendar dots: 5, 12, 19, 24, plus Nov 2)
  {
    id: 'evt-greg-4',
    title: 'Sprint Planning & Task Sync',
    gregorianYear: 2026,
    gregorianMonth: 11,
    gregorianDay: 2,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 11,
    date: '2026-11-02',
    time: '02:00 PM – 03:00 PM',
    category: 'Work',
    note: 'Weekly sprint planning and sprint backlog estimation.',
    completed: false,
  },
  {
    id: 'evt-greg-5',
    title: 'Quarterly Investment Review',
    gregorianYear: 2026,
    gregorianMonth: 11,
    gregorianDay: 2,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 11,
    date: '2026-11-02',
    time: '09:30 AM – 10:30 AM',
    category: 'Finance',
    note: 'Portfolio rebalancing and yield audit.',
    completed: true,
  },
  {
    id: 'evt-greg-6',
    title: 'Budget Review & Expense Audit',
    gregorianYear: 2026,
    gregorianMonth: 11,
    gregorianDay: 5,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 14,
    date: '2026-11-05',
    time: '10:00 AM – 11:30 AM',
    category: 'Finance',
    note: 'Monthly expenditure analysis.',
    completed: false,
  },
  {
    id: 'evt-greg-7',
    title: 'Product Architecture Review',
    gregorianYear: 2026,
    gregorianMonth: 11,
    gregorianDay: 12,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 21,
    date: '2026-11-12',
    time: '02:30 PM – 03:45 PM',
    category: 'Work',
    note: 'System architectural review.',
    completed: false,
  },
  {
    id: 'evt-greg-8',
    title: 'Client Milestone Presentation',
    gregorianYear: 2026,
    gregorianMonth: 11,
    gregorianDay: 19,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 28,
    date: '2026-11-19',
    time: '11:00 AM – 12:15 PM',
    category: 'Work',
    note: 'Demo presentation and milestone delivery.',
    completed: false,
  },
  {
    id: 'evt-greg-9',
    title: 'Quarterly Investment Review',
    gregorianYear: 2026,
    gregorianMonth: 11,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 9,
    shamsiDay: 3,
    date: '2026-11-24',
    time: '09:30 AM – 10:30 AM',
    category: 'Finance',
    note: 'Portfolio rebalancing and yield audit.',
    completed: true,
  },
  {
    id: 'evt-greg-10',
    title: 'Sprint Planning & Task Sync',
    gregorianYear: 2026,
    gregorianMonth: 11,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 9,
    shamsiDay: 3,
    date: '2026-11-24',
    time: '02:00 PM – 03:00 PM',
    category: 'Work',
    note: 'Weekly sprint planning and sprint backlog estimation.',
    completed: false,
  },
  {
    id: 'evt-greg-11',
    title: 'Family Dinner Prep & Catch-up',
    gregorianYear: 2026,
    gregorianMonth: 11,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 9,
    shamsiDay: 3,
    date: '2026-11-24',
    time: '05:00 PM – 06:15 PM',
    category: 'Personal',
    note: 'Family meal preparation and catch-up.',
    completed: false,
  },
  // Hijri Islamic Calendar Seed Events
  {
    id: 'evt-hijri-1',
    title: 'Ayyam al-Beed (White Days Fasting)',
    hijriYear: 1448,
    hijriMonth: 4,
    hijriDay: 13,
    gregorianYear: 2026,
    gregorianMonth: 9,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 7,
    shamsiDay: 2,
    date: '2026-09-24',
    time: 'Dawn (05:12 AM) – Sunset (06:42 PM)',
    category: 'Fasting',
    note: 'First of Ayyam al-Beed (White Days) • Qiyam & Sunnah Fasting',
    completed: true,
  },
  {
    id: 'evt-hijri-2',
    title: 'Surah Al-Kahf & Tafsir Study',
    hijriYear: 1448,
    hijriMonth: 4,
    hijriDay: 13,
    gregorianYear: 2026,
    gregorianMonth: 9,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 7,
    shamsiDay: 2,
    date: '2026-09-24',
    time: '04:45 PM – 05:45 PM',
    category: 'Spiritual',
    note: 'Weekly recitation of Surah Al-Kahf and contemplation.',
    completed: false,
  },
  {
    id: 'evt-hijri-3',
    title: 'Family & Community Iftar Sharing',
    hijriYear: 1448,
    hijriMonth: 4,
    hijriDay: 13,
    gregorianYear: 2026,
    gregorianMonth: 9,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 7,
    shamsiDay: 2,
    date: '2026-09-24',
    time: '06:15 PM – 07:15 PM',
    category: 'Spiritual',
    note: 'Iftar gathering with family and community members.',
    completed: false,
  },
  {
    id: 'evt-hijri-4',
    title: 'Ayyam al-Beed (Day 2 Fasting)',
    hijriYear: 1448,
    hijriMonth: 4,
    hijriDay: 14,
    gregorianYear: 2026,
    gregorianMonth: 9,
    gregorianDay: 25,
    shamsiYear: 1405,
    shamsiMonth: 7,
    shamsiDay: 3,
    date: '2026-09-25',
    time: 'Dawn (05:13 AM) – Sunset (06:40 PM)',
    category: 'Fasting',
    note: 'Second day of the White Days fasting.',
    completed: false,
  },
  {
    id: 'evt-hijri-5',
    title: "Friday Jumu'ah Prayer & Reflection",
    hijriYear: 1448,
    hijriMonth: 4,
    hijriDay: 26,
    gregorianYear: 2026,
    gregorianMonth: 10,
    gregorianDay: 7,
    shamsiYear: 1405,
    shamsiMonth: 7,
    shamsiDay: 15,
    date: '2026-10-07',
    time: '12:30 PM – 01:30 PM',
    category: 'Spiritual',
    note: 'Congregational prayer and khutbah.',
    completed: false,
  },
  {
    id: 'evt-hijri-6',
    title: 'Ayyam al-Beed (White Days Fasting)',
    hijriYear: 1448,
    hijriMonth: 5,
    hijriDay: 13,
    gregorianYear: 2026,
    gregorianMonth: 10,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 2,
    date: '2026-10-24',
    time: 'Dawn (05:12 AM) – Sunset (06:42 PM)',
    category: 'Fasting',
    note: 'First of Ayyam al-Beed (White Days) • Qiyam & Sunnah Fasting',
    completed: true,
  },
  {
    id: 'evt-hijri-7',
    title: 'Surah Al-Kahf & Tafsir Study',
    hijriYear: 1448,
    hijriMonth: 5,
    hijriDay: 13,
    gregorianYear: 2026,
    gregorianMonth: 10,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 2,
    date: '2026-10-24',
    time: '04:45 PM – 05:45 PM',
    category: 'Spiritual',
    note: 'Weekly recitation of Surah Al-Kahf and contemplation.',
    completed: false,
  },
  {
    id: 'evt-hijri-8',
    title: 'Family & Community Iftar Sharing',
    hijriYear: 1448,
    hijriMonth: 5,
    hijriDay: 13,
    gregorianYear: 2026,
    gregorianMonth: 10,
    gregorianDay: 24,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 2,
    date: '2026-10-24',
    time: '06:15 PM – 07:15 PM',
    category: 'Spiritual',
    note: 'Iftar gathering with family and community members.',
    completed: false,
  },
  {
    id: 'evt-hijri-9',
    title: 'Tahajjud & Pre-Dawn Dhikr',
    hijriYear: 1448,
    hijriMonth: 5,
    hijriDay: 22,
    gregorianYear: 2026,
    gregorianMonth: 11,
    gregorianDay: 2,
    shamsiYear: 1405,
    shamsiMonth: 8,
    shamsiDay: 11,
    date: '2026-11-02',
    time: '04:15 AM – 04:55 AM',
    category: 'Spiritual',
    note: 'Qiyam al-Layl prayer and remembrance.',
    completed: true,
  },
];

export const useCalendarStore = create(
  persist(
    (set) => ({
      events: [...initialEvents],
      _hasHydrated: false,

      setHasHydrated: (val) => set({ _hasHydrated: val }),

      addEvent: (event) => {
        let created;
        set(
          produce((state) => {
            let gYear = Number(event.gregorianYear);
            let gMonth = Number(event.gregorianMonth);
            let gDay = Number(event.gregorianDay);
            let sYear = Number(event.shamsiYear);
            let sMonth = Number(event.shamsiMonth);
            let sDay = Number(event.shamsiDay);
            let hYear = Number(event.hijriYear);
            let hMonth = Number(event.hijriMonth);
            let hDay = Number(event.hijriDay);

            if (event.date) {
              const parts = String(event.date).split('-');
              if (parts.length === 3) {
                gYear = parseInt(parts[0], 10);
                gMonth = parseInt(parts[1], 10);
                gDay = parseInt(parts[2], 10);
              }
            }

            if (hYear && hMonth && hDay && (!gYear || !gMonth || !gDay)) {
              try {
                const gDate = hijriToGregorian(hYear, hMonth, hDay);
                gYear = gDate.getFullYear();
                gMonth = gDate.getMonth() + 1;
                gDay = gDate.getDate();
                const sh = getShamsiDate(gDate);
                sYear = sh.jy;
                sMonth = sh.jm;
                sDay = sh.jd;
              } catch {
                gYear = 2026; gMonth = 11; gDay = 2;
                sYear = 1405; sMonth = 8; sDay = 11;
              }
            } else if (gYear && gMonth && gDay) {
              try {
                const gDate = new Date(Date.UTC(gYear, gMonth - 1, gDay, 12, 0, 0));
                if (!sYear || !sMonth || !sDay) {
                  const sh = getShamsiDate(gDate);
                  sYear = sh.jy;
                  sMonth = sh.jm;
                  sDay = sh.jd;
                }
                if (!hYear || !hMonth || !hDay) {
                  const h = getHijriDateParts(gDate);
                  hYear = h.hy;
                  hMonth = h.hm;
                  hDay = h.hd;
                }
              } catch {
                sYear = 1405; sMonth = 8; sDay = 1;
                hYear = 1448; hMonth = 4; hDay = 13;
              }
            } else if (sYear && sMonth && sDay) {
              try {
                const first = findFirstDayOfShamsiMonth(sYear, sMonth);
                const gDate = new Date(first);
                gDate.setDate(gDate.getDate() + (sDay - 1));
                gYear = gDate.getFullYear();
                gMonth = gDate.getMonth() + 1;
                gDay = gDate.getDate();
                const h = getHijriDateParts(gDate);
                hYear = h.hy;
                hMonth = h.hm;
                hDay = h.hd;
              } catch {
                gYear = 2026; gMonth = 11; gDay = 1;
                hYear = 1448; hMonth = 4; hDay = 13;
              }
            }

            const isoDate = gYear && gMonth && gDay
              ? `${gYear}-${String(gMonth).padStart(2, '0')}-${String(gDay).padStart(2, '0')}`
              : '';

            const newEvt = {
              id: event.id || uuidv4(),
              title: event.title || 'Untitled Event',
              date: isoDate,
              gregorianYear: gYear || 2026,
              gregorianMonth: gMonth || 11,
              gregorianDay: gDay || 1,
              shamsiYear: sYear || 1405,
              shamsiMonth: sMonth || 8,
              shamsiDay: sDay || 1,
              hijriYear: hYear || 1448,
              hijriMonth: hMonth || 4,
              hijriDay: hDay || 13,
              time: event.time || '10:00 AM',
              category: event.category || 'Spiritual',
              note: event.note || '',
              completed: !!event.completed,
            };
            created = newEvt;
            state.events.unshift(newEvt);
          })
        );
        return created;
      },

      toggleEvent: (eventId) =>
        set(
          produce((state) => {
            const evt = state.events.find((e) => e.id === eventId);
            if (evt) {
              evt.completed = !evt.completed;
            }
          })
        ),

      deleteEvent: (eventId) =>
        set(
          produce((state) => {
            state.events = state.events.filter((e) => e.id !== eventId);
          })
        ),
    }),
    {
      name: 'momentum-calendar-storage-v1',
      storage: createJSONStorage(() => getSafeStorage()),
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          if (state.events && !state.events.some((e) => e.id === 'evt-hijri-1')) {
            state.events = [...initialEvents, ...state.events.filter((e) => !initialEvents.some((i) => i.id === e.id))];
          }
          state.setHasHydrated(true);
        }
      },
    }
  )
);

// Eagerly rehydrate synchronously if in browser to prevent initial render flicker
if (typeof window !== 'undefined') {
  try {
    const raw = localStorage.getItem('momentum-calendar-storage-v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.state?.events) {
        let events = parsed.state.events;
        if (!events.some((e) => e.id === 'evt-hijri-1')) {
          events = [...initialEvents, ...events.filter((e) => !initialEvents.some((i) => i.id === e.id))];
        }
        useCalendarStore.setState({
          ...parsed.state,
          events,
          _hasHydrated: true,
        });
      } else {
        useCalendarStore.setState({ _hasHydrated: true });
      }
    } else {
      useCalendarStore.setState({ _hasHydrated: true });
    }
  } catch {
    useCalendarStore.setState({ _hasHydrated: true });
  }
}
