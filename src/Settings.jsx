import React from 'react';
import SettingsProfileLightMode from './SettingsProfileLightMode';
import SettingsProfileDarkMode from './SettingsProfileDarkMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';

export default function Settings({ setActiveTab, isDarkMode, goBack }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <SettingsProfileDarkMode setActiveTab={navTab} goBack={goBack} />
  ) : (
    <SettingsProfileLightMode setActiveTab={navTab} goBack={goBack} />
  );
}
