import test from 'node:test';
import assert from 'node:assert/strict';
import {
  logicalScreenId, themedScreenId, logicalHistoryStack, resolveThemeMode,
} from '../../src/utils/themeNavigation.js';

test('dark and light are the same logical screen', () => {
  assert.equal(logicalScreenId('home_dashboard_dark_mode'), 'home_dashboard');
  assert.equal(logicalScreenId('home_dashboard_light_mode'), 'home_dashboard');
  assert.equal(logicalScreenId('tasks_reminders_dark_mode_1'), 'tasks_reminders_1');
});

test('render theme is resolved from global setting regardless of legacy route', () => {
  assert.equal(themedScreenId('home_dashboard_dark_mode', 'light'), 'home_dashboard_light_mode');
  assert.equal(themedScreenId('home_dashboard_light_mode', 'dark'), 'home_dashboard_dark_mode');
  assert.equal(themedScreenId('task_details', 'light'), 'task_details_light_mode');
  assert.equal(themedScreenId('tasks_reminders_1', 'light'), 'tasks_reminders_light_mode_1');
  assert.equal(themedScreenId('settings_profile_dark_mode', 'light'), 'settings_profile_light_mode');
  assert.equal(themedScreenId('home', 'dark'), 'home'); // Legacy alias remains compatible.
});

test('income edit routes resolve to the registered form in both themes', () => {
  // Income management calls setActiveTab('add_income_*_mode'), which gets
  // normalized to 'add_income' before rendering.
  assert.equal(logicalScreenId('add_income_light_mode'), 'add_income');
  assert.equal(logicalScreenId('add_income_dark_mode'), 'add_income');
  assert.equal(themedScreenId('add_income', 'light'), 'add_edit_income_light_mode');
  assert.equal(themedScreenId('add_income', 'dark'), 'add_edit_income_dark_mode');
  assert.equal(themedScreenId('add_income_dark_mode', 'light'), 'add_edit_income_light_mode');
  assert.equal(themedScreenId('add_income_light_mode', 'dark'), 'add_edit_income_dark_mode');
  assert.equal(themedScreenId('add_edit_income', 'light'), 'add_edit_income_light_mode');
  assert.equal(themedScreenId('add_edit_income', 'dark'), 'add_edit_income_dark_mode');
});

test('legacy history is normalized without losing route params or sub-tabs', () => {
  const old = [{ screen: 'task_details_dark_mode', params: { taskId: 'a1' }, tasksSubTab: 'tasks' }];
  const next = logicalHistoryStack(old);
  assert.deepEqual(next, [{ screen: 'task_details', params: { taskId: 'a1' }, tasksSubTab: 'tasks' }]);
  assert.equal(old[0].screen, 'task_details_dark_mode');
});

test('system appearance uses OS preference when available', () => {
  assert.equal(resolveThemeMode('dark'), 'dark');
  assert.equal(resolveThemeMode('light'), 'light');
  assert.equal(resolveThemeMode('system'), 'light'); // node has no window
});
