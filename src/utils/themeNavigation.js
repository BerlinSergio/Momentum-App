/**
 * Theme-independent navigation identity for Momentum.
 *
 * Legacy route names such as "home_dashboard_dark_mode" are still accepted at
 * the UI boundary. History and URLs use "home_dashboard" instead, while the
 * renderer picks a Dark/Light component from the one global appearance setting.
 * Neither migration nor switching a theme deletes user data.
 */
import { ALL_SCREENS } from '../data/screenRegistry.js';

const registeredScreenIds = new Set(ALL_SCREENS.map((screen) => screen.id));
const variantPattern = /^(.*)_(dark|light)_mode(_\d+)?$/;

export function logicalScreenId(screen) {
  if (typeof screen !== 'string') return screen;
  const match = screen.match(variantPattern);
  return match ? `${match[1]}${match[3] || ''}` : screen;
}

export function resolveThemeMode(setting) {
  if (setting === 'dark' || setting === 'light') return setting;
  if (setting === 'system' && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export function themedScreenId(screen, setting) {
  if (typeof screen !== 'string' || !screen) return screen;
  const mode = resolveThemeMode(setting);

  // Income management still navigates to the historical "add_income" route,
  // while the screen registry uses "add_edit_income". Resolve both legacy
  // themed links and their normalized logical ID to the real edit form.
  if (logicalScreenId(screen) === 'add_income') {
    return `add_edit_income_${mode}_mode`;
  }

  const legacy = screen.match(variantPattern);
  if (legacy) return `${legacy[1]}_${mode}_mode${legacy[3] || ''}`;

  const direct = `${screen}_${mode}_mode`;
  if (registeredScreenIds.has(direct)) return direct;

  // Old Task aliases (_1 / _2) are supported in App.jsx but not in the registry.
  const numbered = screen.match(/^(.*)(_\d+)$/);
  if (numbered && registeredScreenIds.has(`${numbered[1]}_${mode}_mode`)) {
    return `${numbered[1]}_${mode}_mode${numbered[2]}`;
  }
  return screen;
}

export function logicalHistoryStack(stack) {
  if (!Array.isArray(stack)) return [];
  return stack.map((entry) => {
    if (typeof entry === 'string') return logicalScreenId(entry);
    if (!entry || typeof entry !== 'object') return entry;
    return { ...entry, screen: logicalScreenId(entry.screen) };
  });
}
