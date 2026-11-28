import {useSettingsStore} from '../store/useSettingsStore.js';
import {resolveReminderType,defaultReminderType} from '../utils/reminderRules.js';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  useRoutineStore,
  deriveWeekdaysFromFrequency,
  deriveFrequencyLabel,
  getStreakStatistics,
  WEEKDAY_TOKENS,
} from '../store/useRoutineStore';
import { useNavigationStore } from '../store/useNavigationStore';
import { playRoutineSound, stopRoutineSound } from '../utils/routineAudio';
import { toast } from '../components/ui/toast/index.js';
import { confirm } from '../components/ui/confirmation/index.js';

/**
 * Calculates reminder time string offset from a target time string.
 * Example: '08:30 PM' with offset 15 -> '08:15 PM'
 */
export function calculateDerivedReminderTime(timeStr, offsetMinutes = 0) {
  if (!timeStr) return '';
  if (offsetMinutes === 0) return timeStr;

  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return timeStr;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const modifier = (match[3] || 'AM').toUpperCase();

  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  let totalMinutes = hours * 60 + minutes - offsetMinutes;
  // Handle crossing midnight into preceding day
  if (totalMinutes < 0) totalMinutes += 24 * 60;
  totalMinutes = totalMinutes % (24 * 60);

  const remHours24 = Math.floor(totalMinutes / 60);
  const remMins = totalMinutes % 60;

  const remMod = remHours24 >= 12 ? 'PM' : 'AM';
  const remHours12 = remHours24 % 12 || 12;

  return `${String(remHours12).padStart(2, '0')}:${String(remMins).padStart(2, '0')} ${remMod}`;
}

export function useRoutineForm({ setActiveTab, goBack, defaultFallbackRoute = 'daily_routine_dark_mode' }) {
  const {
    routines,
    editingRoutineId,
    setEditingRoutineId,
    addRoutine,
    updateRoutine,
    deleteRoutine,
  } = useRoutineStore();

  const existingRoutine = useMemo(() => {
    return editingRoutineId ? routines.find((r) => r.id === editingRoutineId) : null;
  }, [editingRoutineId, routines]);

  const isEditing = Boolean(existingRoutine);

  // Form Field State initialized from existingRoutine
  const [prevRoutineId, setPrevRoutineId] = useState(editingRoutineId);
  const [title, setTitle] = useState(existingRoutine ? (existingRoutine.title || '') : '');
  const [category, setCategory] = useState(existingRoutine ? (existingRoutine.category || 'Spiritual') : 'Spiritual');
  const [time, setTime] = useState(existingRoutine ? (existingRoutine.time || '08:30 PM') : '08:30 PM');
  const [duration, setDuration] = useState(existingRoutine ? (Number(existingRoutine.durationMinutes || existingRoutine.duration) || 25) : 25);
  const [frequency, setFrequency] = useState(existingRoutine ? (existingRoutine.frequency || 'Every Day') : 'Every Day');
  const [weekdays, setWeekdays] = useState(
    existingRoutine
      ? deriveWeekdaysFromFrequency(existingRoutine.frequency, existingRoutine.weekdays)
      : [0, 1, 2, 3, 4, 5, 6]
  );
  const [reminderEnabled, setReminderEnabled] = useState(
    existingRoutine
      ? (existingRoutine.reminderEnabled !== undefined
          ? Boolean(existingRoutine.reminderEnabled)
          : (existingRoutine.reminder && existingRoutine.reminder !== 'None' && existingRoutine.reminder !== 'Disabled'))
      : true
  );
  const [reminderOffset, setReminderOffset] = useState(
    existingRoutine && existingRoutine.reminderOffset !== undefined ? Number(existingRoutine.reminderOffset) : 0
  );
  const initialType = routine => routine ? resolveReminderType(useSettingsStore.getState(),'routine',routine.reminderType,{routineId:routine.id},routine.reminderSound!=='Silent') : defaultReminderType(useSettingsStore.getState(),'routine');
  const [reminderType,setReminderType]=useState(()=>initialType(existingRoutine));
  const handleReminderTypeChange=value=>{setReminderType(value);setIsDirty(true);};
  const [reminderSound, setReminderSound] = useState(
    existingRoutine?.reminderSound || 'Serenity Bell'
  );
  const [notes, setNotes] = useState(existingRoutine?.notes || '');

  // UI Control & Modal State
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isCustomDurationOpen, setIsCustomDurationOpen] = useState(false);
  const [customDurationInput, setCustomDurationInput] = useState('30');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDiscardConfirmOpen, setIsDiscardConfirmOpen] = useState(false);
  const [isSoundPickerOpen, setIsSoundPickerOpen] = useState(false);
  const [isNotifyTimingPickerOpen, setIsNotifyTimingPickerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mutationPending = useRef(false);
  const [isDirty, setIsDirty] = useState(false);

  // Time picker working state
  const initialTimeMatch = (existingRoutine?.time || '08:30 PM').match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  const [pickerHour, setPickerHour] = useState(initialTimeMatch ? parseInt(initialTimeMatch[1], 10) : 8);
  const [pickerMinute, setPickerMinute] = useState(initialTimeMatch ? parseInt(initialTimeMatch[2], 10) : 30);
  const [pickerPeriod, setPickerPeriod] = useState((initialTimeMatch && initialTimeMatch[3]) ? initialTimeMatch[3].toUpperCase() : 'PM');

  // Adjust state during render if editingRoutineId changes (official React pattern)
  if (prevRoutineId !== editingRoutineId && !isSubmitting) {
    setPrevRoutineId(editingRoutineId);
    if (existingRoutine) {
      setTitle(existingRoutine.title || '');
      setCategory(existingRoutine.category || 'Spiritual');
      const timeVal = existingRoutine.time || '08:30 PM';
      setTime(timeVal);

      const m = timeVal.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
      if (m) {
        setPickerHour(parseInt(m[1], 10));
        setPickerMinute(parseInt(m[2], 10));
        setPickerPeriod((m[3] || 'AM').toUpperCase());
      }

      setDuration(Number(existingRoutine.durationMinutes || existingRoutine.duration) || 25);
      const derivedWk = deriveWeekdaysFromFrequency(existingRoutine.frequency, existingRoutine.weekdays);
      setWeekdays(derivedWk);
      setFrequency(existingRoutine.frequency || deriveFrequencyLabel(derivedWk));

      const hasReminder = existingRoutine.reminderEnabled !== undefined
        ? Boolean(existingRoutine.reminderEnabled)
        : (existingRoutine.reminder && existingRoutine.reminder !== 'None' && existingRoutine.reminder !== 'Disabled');
      setReminderEnabled(hasReminder);
      setReminderOffset(existingRoutine.reminderOffset !== undefined ? Number(existingRoutine.reminderOffset) : 0);
      setReminderSound(existingRoutine.reminderSound || 'Serenity Bell');
      setReminderType(initialType(existingRoutine));
      setNotes(existingRoutine.notes || '');
      setIsDirty(false);
      setErrorMessage('');
    } else {
      setTitle('');
      setCategory('Spiritual');
      setTime('08:30 PM');
      setPickerHour(8);
      setPickerMinute(30);
      setPickerPeriod('PM');
      setDuration(25);
      setFrequency('Every Day');
      setWeekdays([0, 1, 2, 3, 4, 5, 6]);
      setReminderEnabled(true);
      setReminderOffset(0);
      setReminderSound('Serenity Bell');
      setReminderType(initialType(null));
      setNotes('');
      setIsDirty(false);
      setErrorMessage('');
    }
  }

  // Clean up sounds on unmount
  useEffect(() => {
    return () => {
      stopRoutineSound();
    };
  }, []);

  // Time components for display
  const timeParts = useMemo(() => {
    const parts = time.split(' ');
    return {
      num: parts[0] || '08:30',
      mod: parts[1] || 'PM',
    };
  }, [time]);

  // Derived reminder time
  const derivedReminderTime = useMemo(() => {
    return calculateDerivedReminderTime(time, reminderOffset);
  }, [time, reminderOffset]);

  // Subtitle honest description
  const scheduleSubtitle = useMemo(() => {
    if (frequency === 'Every Day') {
      return `Scheduled daily at ${time}`;
    }
    if (frequency === 'Mon–Fri') {
      return `Scheduled Mon–Fri at ${time}`;
    }
    const dayNames = weekdays.map((w) => WEEKDAY_TOKENS[w]).join(', ');
    return `${weekdays.length} days (${dayNames}) at ${time}`;
  }, [frequency, weekdays, time]);

  // Streak statistics for Streak Protected Card
  const streakStats = useMemo(() => {
    if (!existingRoutine) {
      return {
        isNew: true,
        percentage: 0,
        streakBadge: 'New',
        headline: 'Streak Protected',
        description: 'No completion history yet — complete on day 1 to begin',
      };
    }
    const stats = getStreakStatistics(existingRoutine, 16);
    const currStreak = typeof existingRoutine.streak === 'number' ? existingRoutine.streak : 0;
    return {
      isNew: false,
      percentage: stats.percentage,
      streakBadge: currStreak > 0 ? `${currStreak}d` : '0d',
      headline: 'Streak Protected',
      description: stats.text,
    };
  }, [existingRoutine]);

  // Handlers for form controls
  const handleTitleChange = (val) => {
    setTitle(val);
    setIsDirty(true);
    if (errorMessage) setErrorMessage('');
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setIsDirty(true);
  };

  const handleDurationSelect = (mins) => {
    setDuration(mins);
    setIsDirty(true);
  };

  const handleOpenCustomDuration = () => {
    setCustomDurationInput(String(duration));
    setIsCustomDurationOpen(true);
  };

  const handleApplyCustomDuration = () => {
    const parsed = parseInt(customDurationInput, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 360) {
      setDuration(parsed);
      setIsDirty(true);
      setIsCustomDurationOpen(false);
    } else {
      setErrorMessage('Please enter a duration between 1 and 360 minutes');
    }
  };

  const handleFrequencyPreset = (preset) => {
    setFrequency(preset);
    setIsDirty(true);
    if (preset === 'Every Day') {
      setWeekdays([0, 1, 2, 3, 4, 5, 6]);
    } else if (preset === 'Mon–Fri') {
      setWeekdays([1, 2, 3, 4, 5]);
    }
  };

  const handleToggleWeekday = (dayIndex) => {
    setIsDirty(true);
    setWeekdays((prev) => {
      let next;
      if (prev.includes(dayIndex)) {
        if (prev.length <= 1) {
          // At least one active day is required
          return prev;
        }
        next = prev.filter((d) => d !== dayIndex);
      } else {
        next = [...prev, dayIndex].sort((a, b) => a - b);
      }
      setFrequency(deriveFrequencyLabel(next));
      return next;
    });
  };

  const handleReminderToggle = () => {
    const next = !reminderEnabled;
    setReminderEnabled(next);
    setIsDirty(true);
  };

  const handleReminderOffsetSelect = (offset) => {
    setReminderOffset(offset);
    setIsDirty(true);
    setIsNotifyTimingPickerOpen(false);
  };

  const handleSoundSelect = (soundName) => {
    setReminderSound(soundName);
    setIsDirty(true);
    setIsSoundPickerOpen(false);
    playRoutineSound(soundName);
  };

  const handleNotesChange = (val) => {
    setNotes(val);
    setIsDirty(true);
  };

  const handleApplySuggestion = (sug) => {
    setTitle(sug.title);
    setCategory(sug.category);
    setTime(sug.time);
    setDuration(sug.duration);
    setFrequency(sug.frequency);
    setWeekdays(sug.weekdays || [0, 1, 2, 3, 4, 5, 6]);
    setReminderEnabled(sug.reminderEnabled);
    setReminderOffset(sug.reminderOffset);
    setReminderSound(sug.reminderSound || 'Serenity Bell');
    setNotes(sug.notes || '');
    setIsDirty(true);
    setIsSuggestOpen(false);
    setErrorMessage('');
  };

  // Time picker modal handlers
  const handleOpenTimePicker = () => {
    const m = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (m) {
      setPickerHour(parseInt(m[1], 10));
      setPickerMinute(parseInt(m[2], 10));
      setPickerPeriod((m[3] || 'AM').toUpperCase());
    }
    setIsTimePickerOpen(true);
  };

  const handleConfirmTimePicker = () => {
    const formatted = `${String(pickerHour).padStart(2, '0')}:${String(pickerMinute).padStart(2, '0')} ${pickerPeriod}`;
    setTime(formatted);
    setIsDirty(true);
    setIsTimePickerOpen(false);
  };

  // Navigation exit helper
  const navigateBack = useCallback(() => {
    setEditingRoutineId(null);
    if (goBack) {
      goBack(defaultFallbackRoute);
    } else if (setActiveTab) {
      setActiveTab(defaultFallbackRoute);
    } else {
      useNavigationStore.getState().navigateTo(defaultFallbackRoute);
    }
  }, [goBack, setActiveTab, setEditingRoutineId, defaultFallbackRoute]);

  // Save / Update logic
  const handleSave = async () => {
    if (mutationPending.current) return;

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrorMessage('Routine name is required');
      toast.error('Routine name is required');
      return;
    }

    if (weekdays.length === 0) {
      setErrorMessage('Please select at least one active day for this routine');
      toast.error('Please select at least one active day');
      return;
    }

    mutationPending.current = true;
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const routinePayload = {
        title: trimmedTitle,
        category,
        time,
        duration: Number(duration) || 25,
        durationMinutes: Number(duration) || 25,
        frequency,
        weekdays,
        targetDays: weekdays.map((w) => WEEKDAY_TOKENS[w]),
        reminderEnabled,
        reminderType,
        reminderOffset,
        reminderSound,
        reminder: reminderEnabled
          ? (reminderOffset === 0 ? 'At start' : `${reminderOffset}m before`)
          : 'None',
        notes: notes.trim(),
      };

      if (isEditing) {
        if (await updateRoutine(existingRoutine.id, routinePayload) !== true) throw new Error('Routine update not confirmed');
        toast.success('Routine updated');
      } else {
        if (await addRoutine(routinePayload) !== true) throw new Error('Routine creation not confirmed');
        toast.success('Routine created successfully');
      }

      setIsDirty(false);
      navigateBack();
    } catch (err) {
      // Keep form contents available even if the optimistic action cleared its editor ID.
      setPrevRoutineId(useRoutineStore.getState().editingRoutineId);
      setErrorMessage('Routine was not safely saved. Reload before trying again.');
      toast.error('Routine was not safely saved');
    } finally {
      mutationPending.current = false;
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    if (mutationPending.current) return;
    if (isDirty) {
      const confirmed = await confirm({
        variant: 'warning',
        titleKey: 'confirm.discardRoutineTitle',
        messageKey: 'confirm.discardRoutineDescription',
        confirmLabelKey: 'confirm.discard',
        cancelLabelKey: 'confirm.keepEditing',
      });
      if (!confirmed) return;
    }
    setIsDirty(false);
    navigateBack();
  };

  const confirmDiscard = () => {
    if (mutationPending.current) return;
    setIsDiscardConfirmOpen(false);
    setIsDirty(false);
    navigateBack();
  };

  const deleteConfirmedRoutine = async (askConfirmation) => {
    if (!existingRoutine || mutationPending.current) return;
    mutationPending.current = true;
    setIsSubmitting(true);
    const id = existingRoutine.id;
    try {
      if (askConfirmation) {
        const confirmed = await confirm({
          variant: 'destructive',
          titleKey: 'confirm.deleteRoutineTitle',
          messageKey: 'confirm.deleteRoutineDescription',
          confirmLabelKey: 'confirm.delete',
          cancelLabelKey: 'confirm.cancel',
        });
        if (!confirmed) return;
      }
      if (await deleteRoutine(id) !== true) throw new Error('Routine deletion not confirmed');
      toast.success('Routine deleted');
      setIsDeleteConfirmOpen(false);
      navigateBack();
    } catch {
      setPrevRoutineId(useRoutineStore.getState().editingRoutineId);
      setErrorMessage('Routine was not safely deleted. Reload before trying again.');
      toast.error('Routine was not safely deleted');
    } finally {
      mutationPending.current = false;
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => deleteConfirmedRoutine(true);
  const confirmDelete = () => deleteConfirmedRoutine(false);

  return {
    isEditing,
    existingRoutine,
    title,
    category,
    time,
    timeParts,
    duration,
    frequency,
    weekdays,
    reminderEnabled,
    reminderType,
    handleReminderTypeChange,
    reminderOffset,
    reminderSound,
    notes,
    derivedReminderTime,
    scheduleSubtitle,
    streakStats,
    errorMessage,
    isSubmitting,
    isDirty,

    // Modals
    isSuggestOpen,
    setIsSuggestOpen,
    isTimePickerOpen,
    setIsTimePickerOpen,
    isCustomDurationOpen,
    setIsCustomDurationOpen,
    customDurationInput,
    setCustomDurationInput,
    isDeleteConfirmOpen,
    setIsDeleteConfirmOpen,
    isDiscardConfirmOpen,
    setIsDiscardConfirmOpen,
    isSoundPickerOpen,
    setIsSoundPickerOpen,
    isNotifyTimingPickerOpen,
    setIsNotifyTimingPickerOpen,

    // Time Picker States
    pickerHour,
    setPickerHour,
    pickerMinute,
    setPickerMinute,
    pickerPeriod,
    setPickerPeriod,

    // Actions
    handleTitleChange,
    handleCategorySelect,
    handleDurationSelect,
    handleOpenCustomDuration,
    handleApplyCustomDuration,
    handleFrequencyPreset,
    handleToggleWeekday,
    handleReminderToggle,
    handleReminderOffsetSelect,
    handleSoundSelect,
    handleNotesChange,
    handleApplySuggestion,
    handleOpenTimePicker,
    handleConfirmTimePicker,
    handleSave,
    handleCancel,
    confirmDiscard,
    handleDelete,
    confirmDelete,
  };
}
