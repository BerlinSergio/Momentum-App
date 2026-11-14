import React from 'react';
import HomeDashboardLightMode from './HomeDashboardLightMode';
import HomeDashboardDarkMode from './HomeDashboardDarkMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';

export default function Dashboard({ setActiveTab, isDarkMode, goBack }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <HomeDashboardDarkMode setActiveTab={navTab} goBack={goBack} />
  ) : (
    <HomeDashboardLightMode setActiveTab={navTab} goBack={goBack} />
  );
}
