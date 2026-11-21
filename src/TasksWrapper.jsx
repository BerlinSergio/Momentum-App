import React from 'react';
import TasksRemindersLightMode from './TasksRemindersLightMode';
import TasksRemindersDarkMode from './TasksRemindersDarkMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';

export { useTaskStore } from './store/useTaskStore';
export { useRoutineStore } from './store/useRoutineStore';

export default function TasksWrapper({ setActiveTab, isDarkMode, initialSubTab = 'tasks', goBack }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <TasksRemindersDarkMode setActiveTab={navTab} goBack={goBack} initialSubTab={initialSubTab} />
  ) : (
    <TasksRemindersLightMode setActiveTab={navTab} goBack={goBack} initialSubTab={initialSubTab} />
  );
}

