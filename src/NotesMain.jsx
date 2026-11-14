import React from 'react';
import NotesMainLightMode from './NotesMainLightMode';
import NotesMainDarkMode from './NotesMainDarkMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';

export default function NotesMain({ setActiveTab, isDarkMode, goBack }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <NotesMainDarkMode setActiveTab={navTab} goBack={goBack} />
  ) : (
    <NotesMainLightMode setActiveTab={navTab} goBack={goBack} />
  );
}
