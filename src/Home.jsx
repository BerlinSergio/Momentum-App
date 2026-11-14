import React from 'react';
import HomeDashboardLightMode from './HomeDashboardLightMode';
import HomeDashboardDarkMode from './HomeDashboardDarkMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';
import { useFinanceStore } from './store/useFinanceStore';
import { useProfileStore } from './store/useProfileStore';
import { useTaskStore, useTasksStore, useRoutineStore } from './store/useTaskStore';
export {
  useFinanceStore,
  useProfileStore,
  useTaskStore,
  useTasksStore,
  useRoutineStore,
  HomeDashboardDarkMode,
  HomeDashboardLightMode,
};

export default function Home(props) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof props?.isDarkMode === 'boolean' ? props.isDarkMode : theme === 'dark';
  const navTab = props?.setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <HomeDashboardDarkMode {...props} setActiveTab={navTab} />
  ) : (
    <HomeDashboardLightMode {...props} setActiveTab={navTab} />
  );
}
