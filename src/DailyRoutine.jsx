import React from 'react';
import DailyRoutineLightMode from './DailyRoutineLightMode';
import DailyRoutineDarkMode from './DailyRoutineDarkMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';

export { useRoutineStore } from './store/useRoutineStore';

export default function DailyRoutine({ setActiveTab, isDarkMode, goBack, hideHeader = false }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <DailyRoutineDarkMode setActiveTab={navTab} goBack={goBack} hideHeader={hideHeader} />
  ) : (
    <DailyRoutineLightMode setActiveTab={navTab} goBack={goBack} hideHeader={hideHeader} />
  );
}
