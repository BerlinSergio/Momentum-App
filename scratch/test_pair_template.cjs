const fs = require('fs');

function buildHijriCalendarPair() {
  const darkLines = [];
  const lightLines = [];

  function addPair(darkLine, lightLine) {
    darkLines.push(darkLine);
    lightLines.push(lightLine);
  }

  // 1. Imports
  addPair("import React, { useState, useMemo } from 'react';", "import React, { useState, useMemo } from 'react';");
  addPair("import UserAvatar from './components/UserAvatar';", "import UserAvatar from './components/UserAvatar';");
  addPair("import {", "import {");
  addPair("  ArrowLeft, Moon, ChevronLeft, ChevronDown, ChevronRight,", "  ArrowLeft, Moon, ChevronLeft, ChevronDown, ChevronRight,");
  addPair("  ArrowLeftRight, Sun, CheckCircle2, BookOpen, Clock,", "  ArrowLeftRight, Sun, CheckCircle2, BookOpen, Clock,");
  addPair("  Heart, Plus, Trash2, X, Calendar, CheckSquare", "  Heart, Plus, Trash2, X, Calendar, CheckSquare");
  addPair("} from 'lucide-react';", "} from 'lucide-react';");
  addPair("import { useCalendarStore } from './store/useCalendarStore.js';", "import { useCalendarStore } from './store/useCalendarStore.js';");
  addPair("import { useTaskStore } from './store/useTaskStore.js';", "import { useTaskStore } from './store/useTaskStore.js';");
  addPair("import { useRoutineStore } from './store/useRoutineStore.js';", "import { useRoutineStore } from './store/useRoutineStore.js';");
  addPair("import { getHijriDateParts, hijriToGregorian, getHijriMonthGrid, HIJRI_MONTHS, getShamsiDate } from './utils/afghanCalendar.js';", "import { getHijriDateParts, hijriToGregorian, getHijriMonthGrid, HIJRI_MONTHS, getShamsiDate } from './utils/afghanCalendar.js';");
  addPair("", "");

  // 2. Constants
  addPair("const HIJRI_WEEKDAYS = ['Ahad', 'Ith', 'Thul', 'Arba', 'Kham', 'Jum', 'Sabt'];", "const HIJRI_WEEKDAYS = ['Ahad', 'Ith', 'Thul', 'Arba', 'Kham', 'Jum', 'Sabt'];");
  addPair("", "");

  // 3. Component Declaration
  addPair("export default function IslamicHijriCalendarDarkMode({ setActiveTab, goBack }) {", "export default function IslamicHijriCalendarLightMode({ setActiveTab, goBack }) {");
  addPair("  const todayHijri = useMemo(() => getHijriDateParts(new Date()), []);", "  const todayHijri = useMemo(() => getHijriDateParts(new Date()), []);");
  addPair("  const [viewHijriYear, setViewHijriYear] = useState(() => todayHijri.hy || 1448);", "  const [viewHijriYear, setViewHijriYear] = useState(() => todayHijri.hy || 1448);");
  addPair("  const [viewHijriMonth, setViewHijriMonth] = useState(() => todayHijri.hm || 4);", "  const [viewHijriMonth, setViewHijriMonth] = useState(() => todayHijri.hm || 4);");
  addPair("  const [selectedHijriDay, setSelectedHijriDay] = useState(() => todayHijri.hd || 13);", "  const [selectedHijriDay, setSelectedHijriDay] = useState(() => todayHijri.hd || 13);");
  addPair("  const [activeCategory, setActiveCategory] = useState('All');", "  const [activeCategory, setActiveCategory] = useState('All');");
  addPair("  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);", "  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);");
  addPair("", "");
  addPair("  // Add Event Modal State", "  // Add Event Modal State");
  addPair("  const [isAddModalOpen, setIsAddModalOpen] = useState(false);", "  const [isAddModalOpen, setIsAddModalOpen] = useState(false);");
  addPair("  const [formTitle, setFormTitle] = useState('');", "  const [formTitle] = useState('');");
  addPair("  const [formCategory, setFormCategory] = useState('Spiritual');", "  const [formCategory] = useState('Spiritual');");
  addPair("  const [formHijriDay, setFormHijriDay] = useState(() => todayHijri.hd || 13);", "  const [formHijriDay] = useState(() => todayHijri.hd || 13);");
  addPair("  const [formTime, setFormTime] = useState('04:45 PM – 05:45 PM');", "  const [formTime] = useState('04:45 PM – 05:45 PM');");
  addPair("  const [formNote, setFormNote] = useState('');", "  const [formNote] = useState('');");
  addPair("", "");
  addPair("  // Global Persistent Stores (Zustand)", "  // Global Persistent Stores (Zustand)");
  addPair("  const { events: calendarEvents, addEvent: addCalendarEvent, toggleEvent: toggleCalendarEvent, deleteEvent: deleteCalendarEvent } = useCalendarStore();", "  const { events: calendarEvents, addEvent: addCalendarEvent, toggleEvent: toggleCalendarEvent, deleteEvent: deleteCalendarEvent } = useCalendarStore();");
  addPair("  const { tasks, toggleTaskStatus } = useTaskStore();", "  const { tasks, toggleTaskStatus } = useTaskStore();");
  addPair("  const { routines, toggleRoutineCompletion } = useRoutineStore();", "  const { routines, toggleRoutineCompletion } = useRoutineStore();");
  addPair("", "");

  // 4. Navigation Handlers
  addPair("  const handlePrevMonth = () => {", "  const handlePrevMonth = () => {");
  addPair("    if (viewHijriMonth === 1) {", "    if (viewHijriMonth === 1) {");
  addPair("      setViewHijriMonth(12);", "      setViewHijriMonth(12);");
  addPair("      setViewHijriYear((y) => y - 1);", "      setViewHijriYear((y) => y - 1);");
  addPair("    } else {", "    } else {");
  addPair("      setViewHijriMonth((m) => m - 1);", "      setViewHijriMonth((m) => m - 1);");
  addPair("    }", "    }");
  addPair("    setSelectedHijriDay(1);", "    setSelectedHijriDay(1);");
  addPair("  };", "  };");
  addPair("", "");
  addPair("  const handleNextMonth = () => {", "  const handleNextMonth = () => {");
  addPair("    if (viewHijriMonth === 12) {", "    if (viewHijriMonth === 12) {");
  addPair("      setViewHijriMonth(1);", "      setViewHijriMonth(1);");
  addPair("      setViewHijriYear((y) => y + 1);", "      setViewHijriYear((y) => y + 1);");
  addPair("    } else {", "    } else {");
  addPair("      setViewHijriMonth((m) => m + 1);", "      setViewHijriMonth((m) => m + 1);");
  addPair("    }", "    }");
  addPair("    setSelectedHijriDay(1);", "    setSelectedHijriDay(1);");
  addPair("  };", "  };");
  addPair("", "");

  // 5. Memos & Computations
  addPair("  const currentMonthObj = useMemo(() => {", "  const currentMonthObj = useMemo(() => {");
  addPair("    return HIJRI_MONTHS[viewHijriMonth - 1] || HIJRI_MONTHS[3];", "    return HIJRI_MONTHS[viewHijriMonth - 1] || HIJRI_MONTHS[3];");
  addPair("  }, [viewHijriMonth]);", "  }, [viewHijriMonth]);");
  addPair("", "");
  addPair("  const monthGrid = useMemo(() => {", "  const monthGrid = useMemo(() => {");
  addPair("    return getHijriMonthGrid(viewHijriYear, viewHijriMonth);", "    return getHijriMonthGrid(viewHijriYear, viewHijriMonth);");
  addPair("  }, [viewHijriYear, viewHijriMonth]);", "  }, [viewHijriYear, viewHijriMonth]);");
  addPair("", "");
  addPair("  const selectedGregorianDate = useMemo(() => {", "  const selectedGregorianDate = useMemo(() => {");
  addPair("    const clampedDay = Math.min(selectedHijriDay, monthGrid.totalDays);", "    const clampedDay = Math.min(selectedHijriDay, monthGrid.totalDays);");
  addPair("    return hijriToGregorian(viewHijriYear, viewHijriMonth, clampedDay);", "    return hijriToGregorian(viewHijriYear, viewHijriMonth, clampedDay);");
  addPair("  }, [viewHijriYear, viewHijriMonth, selectedHijriDay, monthGrid.totalDays]);", "  }, [viewHijriYear, viewHijriMonth, selectedHijriDay, monthGrid.totalDays]);");
  addPair("", "");
  addPair("  const selectedShamsiDate = useMemo(() => {", "  const selectedShamsiDate = useMemo(() => {");
  addPair("    return getShamsiDate(selectedGregorianDate);", "    return getShamsiDate(selectedGregorianDate);");
  addPair("  }, [selectedGregorianDate]);", "  }, [selectedGregorianDate]);");
  addPair("", "");
  addPair("  const crossCalendarSubtitle = useMemo(() => {", "  const crossCalendarSubtitle = useMemo(() => {");
  addPair("    const gMonth = selectedGregorianDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });", "    const gMonth = selectedGregorianDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });");
  addPair("    const sMonth = selectedShamsiDate?.monthInfo?.nameEn || 'Aqrab';", "    const sMonth = selectedShamsiDate?.monthInfo?.nameEn || 'Aqrab';");
  addPair("    const sYear = selectedShamsiDate?.jy || 1405;", "    const sYear = selectedShamsiDate?.jy || 1405;");
  addPair("    return `${gMonth} CE • ${sMonth} ${sYear} SH`;", "    return `${gMonth} CE • ${sMonth} ${sYear} SH`;");
  addPair("  }, [selectedGregorianDate, selectedShamsiDate]);", "  }, [selectedGregorianDate, selectedShamsiDate]);");
  addPair("", "");
  addPair("  const dayHeaderStr = useMemo(() => {", "  const dayHeaderStr = useMemo(() => {");
  addPair("    const weekday = selectedGregorianDate.toLocaleDateString('en-US', { weekday: 'long' });", "    const weekday = selectedGregorianDate.toLocaleDateString('en-US', { weekday: 'long' });");
  addPair("    return `${weekday}, ${selectedHijriDay} ${currentMonthObj.nameEn} ${viewHijriYear} AH`;", "    return `${weekday}, ${selectedHijriDay} ${currentMonthObj.nameEn} ${viewHijriYear} AH`;");
  addPair("  }, [selectedGregorianDate, selectedHijriDay, currentMonthObj, viewHijriYear]);", "  }, [selectedGregorianDate, selectedHijriDay, currentMonthObj, viewHijriYear]);");
  addPair("", "");
  addPair("  const dayEquivalenceBadge = useMemo(() => {", "  const dayEquivalenceBadge = useMemo(() => {");
  addPair("    const gStr = selectedGregorianDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });", "    const gStr = selectedGregorianDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });");
  addPair("    const sDay = selectedShamsiDate?.jd || 2;", "    const sDay = selectedShamsiDate?.jd || 2;");
  addPair("    const sMonth = selectedShamsiDate?.monthInfo?.nameEn || 'Aqrab';", "    const sMonth = selectedShamsiDate?.monthInfo?.nameEn || 'Aqrab';");
  addPair("    return `${gStr} • ${sDay} ${sMonth}`;", "    return `${gStr} • ${sDay} ${sMonth}`;");
  addPair("  }, [selectedGregorianDate, selectedShamsiDate]);", "  }, [selectedGregorianDate, selectedShamsiDate]);");
  addPair("", "");
  addPair("  const daySignificanceNote = useMemo(() => {", "  const daySignificanceNote = useMemo(() => {");
  addPair("    if (selectedHijriDay === 13 || selectedHijriDay === 14 || selectedHijriDay === 15) {", "    if (selectedHijriDay === 13 || selectedHijriDay === 14 || selectedHijriDay === 15) {");
  addPair("      return \"Ayyam al-Beed (White Days) • Qiyam & Sunnah Fasting\";", "      return \"Ayyam al-Beed (White Days) • Qiyam & Sunnah Fasting\";");
  addPair("    }", "    }");
  addPair("    const weekdayIdx = selectedGregorianDate.getDay();", "    const weekdayIdx = selectedGregorianDate.getDay();");
  addPair("    if (weekdayIdx === 5) return \"Blessed Friday (Jumu'ah) • Surah Al-Kahf & Salawat\";", "    if (weekdayIdx === 5) return \"Blessed Friday (Jumu'ah) • Surah Al-Kahf & Salawat\";");
  addPair("    if (weekdayIdx === 1 || weekdayIdx === 4) return \"Sunnah Fasting Day (Monday/Thursday) • Good Deeds\";", "    if (weekdayIdx === 1 || weekdayIdx === 4) return \"Sunnah Fasting Day (Monday/Thursday) • Good Deeds\";");
  addPair("    return \"Daily spiritual mindfulness, beneficial study & righteous action\";", "    return \"Daily spiritual mindfulness, beneficial study & righteous action\";");
  addPair("  }, [selectedHijriDay, selectedGregorianDate]);", "  }, [selectedHijriDay, selectedGregorianDate]);");
  addPair("", "");

  // 6. Global Unified Events
  addPair("  const allUnifiedEvents = useMemo(() => {", "  const allUnifiedEvents = useMemo(() => {");
  addPair("    const list = [];", "    const list = [];");
  addPair("    const seen = new Set();", "    const seen = new Set();");
  addPair("    (calendarEvents || []).forEach((evt) => {", "    (calendarEvents || []).forEach((evt) => {");
  addPair("      let hy = Number(evt.hijriYear);", "      let hy = Number(evt.hijriYear);");
  addPair("      let hm = Number(evt.hijriMonth);", "      let hm = Number(evt.hijriDay ? evt.hijriMonth : 0);",);
  addPair("      let hd = Number(evt.hijriDay);", "      let hd = Number(evt.hijriDay);");
  addPair("      if (!hy || !hm || !hd) {", "      if (!hy || !hm || !hd) {");
  addPair("        if (evt.date) {", "        if (evt.date) {");
  addPair("          try {", "          try {");
  addPair("            const gDate = new Date(evt.date + 'T12:00:00Z');", "            const gDate = new Date(evt.date + 'T12:00:00Z');");
  addPair("            const h = getHijriDateParts(gDate);", "            const h = getHijriDateParts(gDate);");
  addPair("            hy = h.hy; hm = h.hm; hd = h.hd;", "            hy = h.hy; hm = h.hm; hd = h.hd;");
  addPair("          } catch {}", "          } catch {}");
  addPair("        }", "        }");
  addPair("      }", "      }");
  addPair("      if (hy && hm && hd) {", "      if (hy && hm && hd) {");
  addPair("        const key = `cal-${evt.id}`;", "        const key = `cal-${evt.id}`;");
  addPair("        if (!seen.has(key)) {", "        if (!seen.has(key)) {");
  addPair("          seen.add(key);", "          seen.add(key);");
  addPair("          list.push({", "          list.push({");
  addPair("            id: evt.id,", "            id: evt.id,");
  addPair("            source: 'calendar',", "            source: 'calendar',");
  addPair("            title: evt.title,", "            title: evt.title,");
  addPair("            category: evt.category || 'Spiritual',", "            category: evt.category || 'Spiritual',");
  addPair("            hijriYear: hy,", "            hijriYear: hy,");
  addPair("            hijriMonth: hm,", "            hijriMonth: hm,");
  addPair("            hijriDay: hd,", "            hijriDay: hd,");
  addPair("            time: evt.time || '10:00 AM',", "            time: evt.time || '10:00 AM',");
  addPair("            note: evt.note || '',", "            note: evt.note || '',");
  addPair("            completed: !!evt.completed,", "            completed: !!evt.completed,");
  addPair("          });", "          });");
  addPair("        }", "        }");
  addPair("      }", "      }");
  addPair("    });", "    });");
  addPair("    (routines || []).forEach((rt) => {", "    (routines || []).forEach((rt) => {");
  addPair("      if (rt.category === 'Spiritual' || rt.category === 'Personal') {", "      if (rt.category === 'Spiritual' || rt.category === 'Personal') {");
  addPair("        const key = `rt-${rt.id}-${selectedHijriDay}`;", "        const key = `rt-${rt.id}-${selectedHijriDay}`;");
  addPair("        if (!seen.has(key)) {", "        if (!seen.has(key)) {");
  addPair("          seen.add(key);", "          seen.add(key);");
  addPair("          list.push({", "          list.push({");
  addPair("            id: rt.id,", "            id: rt.id,");
  addPair("            source: 'routine',", "            source: 'routine',");
  addPair("            title: rt.title,", "            title: rt.title,");
  addPair("            category: 'Spiritual',", "            category: 'Spiritual',");
  addPair("            hijriYear: viewHijriYear,", "            hijriYear: viewHijriYear,");
  addPair("            hijriMonth: viewHijriMonth,", "            hijriMonth: viewHijriMonth,");
  addPair("            hijriDay: selectedHijriDay,", "            hijriDay: selectedHijriDay,");
  addPair("            time: rt.time || '05:15 AM',", "            time: rt.time || '05:15 AM',");
  addPair("            note: rt.notes || '',", "            note: rt.notes || '',");
  addPair("            completed: !!rt.completed,", "            completed: !!rt.completed,");
  addPair("          });", "          });");
  addPair("        }", "        }");
  addPair("      }", "      }");
  addPair("    });", "    });");
  addPair("    return list;", "    return list rescue list;");
  addPair("  }, [calendarEvents, routines, viewHijriYear, viewHijriMonth, selectedHijriDay]);", "  }, [calendarEvents, routines, viewHijriYear, viewHijriMonth, selectedHijriDay]);");
  addPair("", "");

  console.log("Writing builder script template test...");
}

buildHijriCalendarPair();

