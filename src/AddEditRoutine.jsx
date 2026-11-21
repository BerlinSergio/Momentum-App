import React from 'react';
import AddEditRoutineLightMode from './AddEditRoutineLightMode';
import AddEditRoutineDarkMode from './AddEditRoutineDarkMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';

export default function AddEditRoutine({ setActiveTab, isDarkMode, goBack }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <AddEditRoutineDarkMode setActiveTab={navTab} goBack={goBack} />
  ) : (
    <AddEditRoutineLightMode setActiveTab={navTab} goBack={goBack} />
  );
}
