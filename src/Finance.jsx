import React from 'react';
import FinanceExpenseTrackerLightMode from './FinanceExpenseTrackerLightMode';
import FinanceExpenseTrackerDarkMode from './FinanceExpenseTrackerDarkMode';
import { useThemeStore } from './store/useThemeStore';
import { useNavigationStore } from './store/useNavigationStore';
import { useFinanceStore } from './store/useFinanceStore';

export {
  useFinanceStore,
  FinanceExpenseTrackerDarkMode,
  FinanceExpenseTrackerLightMode,
};

export default function Finance({ setActiveTab, isDarkMode, goBack }) {
  const theme = useThemeStore((s) => s.theme);
  const dark = typeof isDarkMode === 'boolean' ? isDarkMode : theme === 'dark';
  const navTab = setActiveTab || useNavigationStore.getState().setActiveTab;

  return dark ? (
    <FinanceExpenseTrackerDarkMode setActiveTab={navTab} goBack={goBack} />
  ) : (
    <FinanceExpenseTrackerLightMode setActiveTab={navTab} goBack={goBack} />
  );
}
