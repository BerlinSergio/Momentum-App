import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { createIndexedDbStorage } from '../storage/index.js';

const notesStorage = createIndexedDbStorage({
  legacyLocalStorageKey: 'momentum-notes-storage',
  optimisticDomains: ['momentum-notes-storage'],
});

const getSafeStorage = () => notesStorage;

export const INITIAL_NOTES = [
  {
    id: 'note-1',
    type: 'quick',
    category: 'Spiritual',
    tint: 'emerald',
    isPinned: true,
    isArchived: false,
    title: 'Ayah to ponder tonight',
    body: '"And your Lord will give you, and you will be satisfied." (Surah Ad-Duha: 5)',
    date: '10:30 AM',
    savedAt: 'Today at 10:30 AM',
    readTime: '2 min read',
    footer: '🌱 Evening Dhikr',
    tags: ['Spiritual', 'Quran', 'Reflection'],
    milestones: [],
    attachments: []
  },
  {
    id: 'note-2',
    type: 'quick',
    category: 'Daily',
    tint: 'amber',
    isPinned: false,
    isArchived: false,
    title: 'Friday Gathering',
    body: 'Fresh Medjool dates, Cardamom & cinnamon, Almond milk',
    date: '9:15 AM',
    savedAt: 'Today at 09:15 AM',
    readTime: '2 min read',
    progress: '3/4 Done',
    tags: ['Daily', 'Errands'],
    milestones: [
      { id: 'm-1', text: 'Fresh Medjool dates', completed: true },
      { id: 'm-2', text: 'Cardamom & cinnamon', completed: true },
      { id: 'm-3', text: 'Almond milk', completed: false }
    ],
    attachments: []
  },
  {
    id: 'note-3',
    type: 'quick',
    category: 'Work',
    tint: 'sky',
    isPinned: true,
    isArchived: false,
    title: 'Audio Sync',
    body: 'Add offline prayer audio sync for travel mode. Check background sync...',
    date: 'Yesterday',
    savedAt: 'Yesterday at 04:30 PM',
    readTime: '3 min read',
    hasAudio: true,
    tags: ['Spiritual Growth', 'Work', 'Audio'],
    milestones: [
      { id: 'm-1', text: 'Review offline audio sync worker', completed: true },
      { id: 'm-2', text: 'Implement background sync cache', completed: true },
      { id: 'm-3', text: 'Test travel mode offline fallback', completed: false }
    ],
    attachments: [
      { id: 'att-1', name: 'audio_sync_spec.pdf', size: '1.2 MB', subtitle: 'Technical architecture doc', type: 'document', url: '' },
      { id: 'att-2', name: 'voice_memo_travel.mp3', size: '3.4 MB', subtitle: 'Field voice note recording', type: 'audio', url: '' },
      { id: 'att-3', name: 'cache_flow_diagram.png', size: '2.1 MB', subtitle: 'Offline storage flow', type: 'image', url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=400&q=80' }
    ]
  },
  {
    id: 'note-quick-4',
    type: 'quick',
    category: 'Spiritual',
    tint: 'violet',
    isPinned: false,
    isArchived: false,
    title: 'Morning Athkar Reflection',
    body: 'Recite Ayat al-Kursi and the 3 Quls after each fard prayer with presence and mindful humility.',
    date: 'Yesterday',
    savedAt: 'Yesterday at 06:15 AM',
    readTime: '2 min read',
    footer: '☀️ Morning Routine',
    tags: ['Spiritual', 'Dhikr'],
    milestones: [],
    attachments: []
  },
  {
    id: 'note-quick-5',
    type: 'quick',
    category: 'Daily',
    tint: 'emerald',
    isPinned: false,
    isArchived: false,
    title: 'Weekly Halal Grocery Run',
    body: 'Organic olive oil, raw honey, ajwa dates from Madinah, zaatar blend, and fresh mint.',
    date: 'Oct 23',
    savedAt: 'Oct 23 at 11:20 AM',
    readTime: '1 min read',
    footer: '🛒 Essentials',
    tags: ['Daily', 'Shopping'],
    milestones: [],
    attachments: []
  },
  {
    id: 'note-quick-6',
    type: 'quick',
    category: 'Work',
    tint: 'sky',
    isPinned: false,
    isArchived: false,
    title: 'Design System Typography Audit',
    body: 'Standardize body font scale across all prayer cards, hijri calendar views, and widgets.',
    date: 'Oct 22',
    savedAt: 'Oct 22 at 02:45 PM',
    readTime: '3 min read',
    footer: '🎨 UI Polish',
    tags: ['Work', 'Design'],
    milestones: [],
    attachments: []
  },
  {
    id: 'note-quick-7',
    type: 'quick',
    category: 'Spiritual',
    tint: 'amber',
    isPinned: false,
    isArchived: false,
    title: 'Friday Kahf Reminder',
    body: 'Recite Surah Al-Kahf before Jummah prayer. Listen to Sheikh Mishary Rashid recitation.',
    date: 'Oct 20',
    savedAt: 'Oct 20 at 09:00 AM',
    readTime: '2 min read',
    footer: '📖 Quran Time',
    tags: ['Spiritual', 'Friday'],
    milestones: [],
    attachments: []
  },
  {
    id: 'note-quick-8',
    type: 'quick',
    category: 'Personal',
    isPinned: false,
    isArchived: false,
    title: 'Family Call Schedule',
    body: 'Sunday video call with parents after Maghrib prayer in Kabul. Check on winter preparations.',
    date: 'Oct 19',
    savedAt: 'Oct 19 at 07:15 PM',
    readTime: '1 min read',
    footer: '📞 Family',
    tags: ['Personal', 'Family'],
    milestones: [],
    attachments: []
  },
  {
    id: 'note-4',
    type: 'long',
    category: 'Personal Growth',
    tint: 'emerald',
    isPinned: true,
    isArchived: false,
    title: 'Q4 Strategic Reflection & Habit Synthesis',
    body: "Looking back at the past quarter's personal momentum, spiritual consistency, and health target...",
    quote: '"The deeds most loved by Allah are those done regularly, even if small."',
    quoteAttribution: 'Daily anchor principle that sustained the 14-day streak',
    section2Title: '2. Focus Windows & Routine Guardrails',
    section2Body: 'Consistently capping deep work sessions at 90 minutes protected energy reserves. Pairing routine tasks with hydration alerts reduced afternoon fatigue significantly.',
    date: 'Oct 22, 2026',
    savedAt: 'Today at 08:15 PM',
    readTime: '6 min read',
    hasAudio: true,
    tags: ['Personal Growth', 'Habits', 'Wellness', 'Spiritual Growth'],
    milestones: [
      { id: 'm-1', text: 'Review morning habit checklist daily', completed: true },
      { id: 'm-2', text: 'Hydration goal: 2L water before Asr', completed: true },
      { id: 'm-3', text: 'Evening digital sunset at 9:30 PM', completed: false }
    ],
    attachments: [
      { 
        id: 'att-1', 
        name: 'journal.jpg', 
        size: 1887436,
        file: { size: 1887436, type: 'image/jpeg' }, 
        subtitle: 'Captured immediately after morning Fajr prayer while meditating on the courtyard terrace.', 
        caption: 'Captured immediately after morning Fajr prayer while meditating on the courtyard terrace.', 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
        resolution: '1200 × 1800',
        colorSpace: 'Display P3 Wide'
      },
      { 
        id: 'att-2', 
        name: 'MindMap_Q4.png', 
        size: 2516582,
        file: { size: 2516582, type: 'image/png' }, 
        subtitle: 'Mind map architecture detailing the 14-day spiritual and focus consistency streak.', 
        caption: 'Mind map architecture detailing the 14-day spiritual and focus consistency streak.', 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200',
        resolution: '1200 × 800',
        colorSpace: 'Display P3 Wide'
      },
      { 
        id: 'att-3', 
        name: 'Sanctuary_View.jpg', 
        size: 3250585,
        file: { size: 3250585, type: 'image/jpeg' }, 
        subtitle: 'Courtyard sanctuary peaceful reflection at Asr time under soft ambient golden light.', 
        caption: 'Courtyard sanctuary peaceful reflection at Asr time under soft ambient golden light.', 
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200',
        resolution: '1200 × 801',
        colorSpace: 'Display P3 Wide'
      }
    ]
  },
  {
    id: 'note-5',
    type: 'long',
    category: 'Spiritual Study',
    tint: 'violet',
    isPinned: false,
    isArchived: false,
    title: 'Tafseer Notes: Surah Al-Mulk Deep Dive',
    body: 'Contemplating the sovereignty of creation and mindfulness before sleep. Verses 1-5 linguistic breakdown and classical commentary...',
    date: 'Oct 21, 2026',
    savedAt: 'Oct 21 at 10:15 PM',
    readTime: '12 min read',
    tags: ['Spiritual Study', 'Quran', 'Tafseer'],
    milestones: [],
    attachments: [
      { id: 'att-2', name: 'calligraphy.jpg', size: '2.0 MB', subtitle: 'Surah Al-Mulk calligraphy', type: 'image', url: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&q=80&w=300' },
      { id: 'att-3', name: 'window.jpg', size: '1.5 MB', subtitle: 'Night sanctuary window', type: 'image', url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=300' }
    ]
  },
  {
    id: 'note-6',
    type: 'long',
    category: 'Finance',
    tint: 'amber',
    isPinned: false,
    isArchived: false,
    title: 'Quarterly Investment & Family Budget Review',
    body: 'Reviewing emergency fund allocations, savings rate improvements, and zakat distribution schedule for upcoming month with halāl equity indices comparison.',
    date: 'Oct 18, 2026',
    savedAt: 'Oct 18 at 03:00 PM',
    readTime: '4 min read',
    tags: ['Target Savings: 32%', 'Zakat Prepared', 'Finance'],
    milestones: [],
    attachments: []
  },
  {
    id: 'note-long-4',
    type: 'long',
    category: 'Mindfulness',
    isPinned: false,
    isArchived: false,
    title: 'Evening Digital Sunset & Sleep Architecture',
    body: 'Eliminating blue light after 9 PM, dimming ambient lighting, and journaling reflections to ensure quality rest before Tahajjud.',
    date: 'Oct 15, 2026',
    savedAt: 'Oct 15 at 09:30 PM',
    readTime: '5 min read',
    tags: ['Mindfulness', 'Health', 'Sleep'],
    milestones: [],
    attachments: []
  },
  {
    id: 'note-long-5',
    type: 'long',
    category: 'Spiritual Study',
    isPinned: false,
    isArchived: false,
    title: 'Names of Allah: Al-Wadud & Ar-Rahman',
    body: 'Deep contemplation on divine affection and mercy in daily trials. How perceiving Allah as Al-Wadud changes personal du’a posture.',
    date: 'Oct 12, 2026',
    savedAt: 'Oct 12 at 08:00 AM',
    readTime: '8 min read',
    tags: ['Spiritual Study', 'Theology', 'NamesOfAllah'],
    milestones: [],
    attachments: []
  },
  {
    id: 'note-long-6',
    type: 'long',
    category: 'Personal Growth',
    isPinned: false,
    isArchived: false,
    title: 'Annual Barakah Audit & Time Accounting',
    body: 'Evaluating where time was invested over the past solar hijri year. Identifying low-leverage distractions and realigning with core purpose.',
    date: 'Oct 10, 2026',
    savedAt: 'Oct 10 at 05:00 PM',
    readTime: '7 min read',
    tags: ['Personal Growth', 'Productivity', 'Barakah'],
    milestones: [],
    attachments: []
  }
];

export function getNoteDateKey(note) {
  if (!note) return null;
  if (note.dateKey && /^\d{4}-\d{2}-\d{2}$/.test(note.dateKey)) {
    return note.dateKey;
  }
  if (note.createdAt) {
    try {
      const d = new Date(note.createdAt);
      if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
    } catch {
      // ignore
    }
  }
  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);
  const checkStr = (str) => {
    if (!str || typeof str !== 'string') return null;
    if (str.startsWith('Today')) return todayKey;
    if (str.startsWith('Yesterday')) {
      const y = new Date(now);
      y.setDate(y.getDate() - 1);
      return y.toISOString().slice(0, 10);
    }
    try {
      const parsed = Date.parse(str);
      if (!isNaN(parsed)) {
        return new Date(parsed).toISOString().slice(0, 10);
      }
    } catch {
      // ignore
    }
    return null;
  };
  return checkStr(note.savedAt) || checkStr(note.date) || todayKey;
}

export function calculateReflectionStreak(notes = []) {
  if (!Array.isArray(notes) || notes.length === 0) return 0;

  const dateKeys = new Set();
  for (const n of notes) {
    const key = getNoteDateKey(n);
    if (key) dateKeys.add(key);
  }

  if (dateKeys.size === 0) {
    return notes.length > 0 ? 1 : 0;
  }

  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);

  let streak = 0;
  const checkDate = new Date(now);

  // If no note today, check if active streak extends from yesterday
  if (!dateKeys.has(todayKey)) {
    checkDate.setDate(checkDate.getDate() - 1);
    const yesterdayKey = checkDate.toISOString().slice(0, 10);
    if (!dateKeys.has(yesterdayKey)) {
      return 0;
    }
  }

  while (true) {
    const key = checkDate.toISOString().slice(0, 10);
    if (dateKeys.has(key)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export const useNotesStore = create(
  persist(
    (set, get) => ({
      notes: [],
      activeNoteId: null,
      activeAttachmentId: null,
      reflectionStreak: 0,
      _hasHydrated: false,

      setActiveNoteId: (id) => set({ activeNoteId: id }),
      clearActiveNote: () => set({ activeNoteId: null }),
      startNewNote: () => set({ activeNoteId: null }),
      setActiveAttachmentId: (id) => set({ activeAttachmentId: id }),

      setHasHydrated: (val) => set({ _hasHydrated: val }),

      getReflectionStreak: () => {
        const state = get();
        return calculateReflectionStreak(state.notes);
      },

      addNote: (noteData) =>
        set(
          produce((state) => {
            const now = new Date();
            const todayKey = now.toISOString().slice(0, 10);
            const newNote = {
              id: noteData.id || `note-${uuidv4().slice(0, 8)}`,
              type: noteData.type || 'quick',
              title: noteData.title || 'Untitled Note',
              body: noteData.body || noteData.content || '',
              quote: noteData.quote || '',
              quoteAttribution: noteData.quoteAttribution || '',
              section2Title: noteData.section2Title || '',
              section2Body: noteData.section2Body || '',
              category: noteData.category || 'General',
              isPinned: Boolean(noteData.isPinned ?? noteData.pinned),
              pinned: Boolean(noteData.isPinned ?? noteData.pinned),
              isArchived: Boolean(noteData.isArchived) || false,
              tint: noteData.tint || 'slate',
              reminder: noteData.reminder || null,
              dateKey: noteData.dateKey || todayKey,
              createdAt: noteData.createdAt || now.toISOString(),
              updatedAt: noteData.updatedAt || now.toISOString(),
              date: noteData.date || 'Today • ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              savedAt: noteData.savedAt || 'Today at ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              readTime: noteData.readTime || '2 min read',
              tags: Array.isArray(noteData.tags) && noteData.tags.length > 0
                ? noteData.tags
                : (noteData.category ? [noteData.category] : ['General']),
              milestones: Array.isArray(noteData.milestones) ? noteData.milestones : [],
              attachments: Array.isArray(noteData.attachments) ? noteData.attachments : [],
            };
            state.notes.unshift(newNote);
            state.reflectionStreak = calculateReflectionStreak(state.notes);
          })
        ),

      updateNote: (noteId, updates) =>
        set(
          produce((state) => {
            const index = state.notes.findIndex((n) => String(n.id) === String(noteId));
            if (index !== -1) {
              state.notes[index] = {
                ...state.notes[index],
                ...updates,
                updatedAt: new Date().toISOString(),
                savedAt: updates.savedAt || 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              };
              state.reflectionStreak = calculateReflectionStreak(state.notes);
            }
          })
        ),

      deleteNote: (noteId) => {
        // A delete must act only on an existing saved note. Do not claim
        // success when the editor holds an unsaved/stale note ID.
        if (!noteId || String(noteId) === 'new') return false;
        const stringId = String(noteId);
        const exists = get().notes.some((note) => String(note.id) === stringId);
        if (!exists) return false;
        set(
          produce((state) => {
            state.notes = state.notes.filter((note) => String(note.id) !== stringId);
            if (String(state.activeNoteId) === stringId) {
              state.activeNoteId = null;
              state.activeAttachmentId = null;
            }
            state.reflectionStreak = calculateReflectionStreak(state.notes);
          })
        );
        return !get().notes.some((note) => String(note.id) === stringId);
      },

      togglePin: (noteId) =>
        set(
          produce((state) => {
            const note = state.notes.find((n) => String(n.id) === String(noteId));
            if (note) {
              note.isPinned = !note.isPinned;
            }
          })
        ),

      archiveNote: (noteId) =>
        set(
          produce((state) => {
            const note = state.notes.find((n) => String(n.id) === String(noteId));
            if (note) {
              note.isArchived = true;
            }
          })
        ),

      unarchiveNote: (noteId) =>
        set(
          produce((state) => {
            const note = state.notes.find((n) => String(n.id) === String(noteId));
            if (note) {
              note.isArchived = false;
            }
          })
        ),

      toggleArchive: (noteId) =>
        set(
          produce((state) => {
            const note = state.notes.find((n) => String(n.id) === String(noteId));
            if (note) {
              note.isArchived = !note.isArchived;
            }
          })
        ),

      toggleMilestone: (noteId, milestoneId) =>
        set(
          produce((state) => {
            const note = state.notes.find((n) => String(n.id) === String(noteId));
            if (note && Array.isArray(note.milestones)) {
              const ms = note.milestones.find((m) => String(m.id) === String(milestoneId));
              if (ms) {
                ms.completed = !ms.completed;
              }
            }
          })
        ),

      addMilestone: (noteId, text) =>
        set(
          produce((state) => {
            const note = state.notes.find((n) => String(n.id) === String(noteId));
            if (note) {
              if (!Array.isArray(note.milestones)) note.milestones = [];
              note.milestones.push({
                id: `m-${uuidv4().slice(0, 6)}`,
                text,
                completed: false,
              });
            }
          })
        ),

      deleteMilestone: (noteId, milestoneId) =>
        set(
          produce((state) => {
            const note = state.notes.find((n) => String(n.id) === String(noteId));
            if (note && Array.isArray(note.milestones)) {
              note.milestones = note.milestones.filter((m) => String(m.id) !== String(milestoneId));
            }
          })
        ),

      addAttachment: (noteId, attachment) =>
        set(
          produce((state) => {
            const note = state.notes.find((n) => String(n.id) === String(noteId));
            if (note) {
              if (!Array.isArray(note.attachments)) note.attachments = [];
              note.attachments.push({
                id: attachment.id || `att-${uuidv4().slice(0, 6)}`,
                name: attachment.name || 'Untitled File',
                size: attachment.size || '1.0 MB',
                subtitle: attachment.subtitle || 'User uploaded file',
                type: attachment.type || 'image',
                url: attachment.url || '',
              });
            }
          })
        ),

      deleteAttachment: (noteId, attachmentId) => {
        // Do not delete durable binary bytes before the note metadata passes
        // its cross-tab CAS check. The guarded main-IDB transaction removes
        // unreferenced attachment records atomically with note metadata.
        set(
          produce((state) => {
            const note = state.notes.find((n) => String(n.id) === String(noteId));
            if (note && Array.isArray(note.attachments)) {
              note.attachments = note.attachments.filter((a) => String(a.id) !== String(attachmentId));
            }
          })
        );
      },

      addTag: (noteId, tag) =>
        set(
          produce((state) => {
            const note = state.notes.find((n) => String(n.id) === String(noteId));
            if (note) {
              if (!Array.isArray(note.tags)) note.tags = [];
              if (!note.tags.includes(tag)) {
                note.tags.push(tag);
              }
            }
          })
        ),

      removeTag: (noteId, tag) =>
        set(
          produce((state) => {
            const note = state.notes.find((n) => String(n.id) === String(noteId));
            if (note && Array.isArray(note.tags)) {
              note.tags = note.tags.filter((t) => t !== tag);
            }
          })
        ),

      resetToDefaults: () =>
        set({
          notes: [],
          activeNoteId: null,
          activeAttachmentId: null,
          reflectionStreak: 0,
          _hasHydrated: true,
        }),
    }),
    {
      name: 'momentum-notes-storage',
      storage: createJSONStorage(() => getSafeStorage()),
      skipHydration: true,
      onRehydrateStorage: () => (state, error) => {
        if (!error && state) {
          if (Array.isArray(state.notes)) {
            state.notes = state.notes.map((n) => ({
              ...n,
              milestones: n.milestones || [],
              attachments: n.attachments || [],
              tags: n.tags || [],
              savedAt: n.savedAt || n.date || 'Today',
              isArchived: Boolean(n.isArchived),
            }));
          } else {
            state.notes = [];
          }
          if (typeof state.reflectionStreak !== 'number') {
            state.reflectionStreak = 0;
          }
          // StartupController owns the hydrated flag after committed reads;
          // do not trigger an extra Notes write from this callback.
        }
      },
    }
  )
);

// StartupController coordinates crash recovery, legacy migration, and
// authoritative Notes hydration before unlocking application screens.

export default useNotesStore;
