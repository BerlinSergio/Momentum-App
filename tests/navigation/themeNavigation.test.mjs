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
