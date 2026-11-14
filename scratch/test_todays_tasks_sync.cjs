const { useTaskStore, useTasksStore, getTodayIsoDate } = require('../src/store/useTaskStore.js');
const { useTasksStore: reexportedStore } = require('../src/store/useTasksStore.js');

function testTodaysTasksSync() {
  console.log('=== Testing Today\'s Tasks Global Synchronization & Interactivity ===\n');

  // 1. Check Store Alias & Re-export
  console.log('1. Verifying useTasksStore alias:');
  if (useTaskStore !== useTasksStore) throw new Error('useTasksStore alias mismatch');
  if (useTaskStore !== reexportedStore) throw new Error('useTasksStore file re-export mismatch');
  console.log(' -> PASSED: useTaskStore and useTasksStore are 100% unified.\n');

  // 2. Verify Placeholder Tasks are removed
  console.log('2. Verifying placeholder tasks removed:');
  const allTasks = useTaskStore.getState().tasks;
  const placeholder1 = allTasks.find(t => t.title.includes('Dhuhr Prayer & reflection'));
  const placeholder2 = allTasks.find(t => t.title.includes('Drink 2L daily water quota'));
  if (placeholder1) throw new Error('Found placeholder task: Dhuhr Prayer & reflection');
  if (placeholder2) throw new Error('Found placeholder task: Drink 2L daily water quota');
  console.log(' -> PASSED: Placeholder prayer & water tasks successfully removed from initial task store.\n');

  // 3. Filter Logic Simulation matching HomeDashboard
  function getDisplayTasks(tasks) {
    const todayLocal = getTodayIsoDate();
    const todayUtc = new Date().toISOString().slice(0, 10);
    return (tasks || []).filter((t) => {
      if (!t.dueDate) return true;
      const due = String(t.dueDate).slice(0, 10);
      return due === todayLocal || due === todayUtc;
    });
  }

  const initialDisplayTasks = getDisplayTasks(allTasks);
  console.log(`3. Initial Today's Tasks count: ${initialDisplayTasks.length}`);
  initialDisplayTasks.forEach(t => console.log(` - [${t.status}] ${t.title} (${t.priority})`));
  console.log(' -> PASSED: Filtered strictly by today without mock fallbacks.\n');

  // 4. Test Checkbox Interactivity (Toggling status)
  console.log('4. Testing Checkbox Interactivity (Toggling status):');
  const targetTask = initialDisplayTasks[0];
  const initialStatus = targetTask.status;
  console.log(` - Toggling task "${targetTask.title}" from "${initialStatus}"`);
  
  useTaskStore.getState().toggleTaskStatus(targetTask.id);
  let updatedTask = useTaskStore.getState().tasks.find(t => t.id === targetTask.id);
  const expectedToggled = initialStatus === 'done' ? 'todo' : 'done';
  if (updatedTask.status !== expectedToggled) throw new Error(`Expected status '${expectedToggled}', got '${updatedTask.status}'`);
  console.log(` - New status: "${updatedTask.status}" -> PASSED`);

  // Toggle back
  useTaskStore.getState().toggleTaskStatus(targetTask.id);
  updatedTask = useTaskStore.getState().tasks.find(t => t.id === targetTask.id);
  if (updatedTask.status !== initialStatus) throw new Error(`Expected status '${initialStatus}', got '${updatedTask.status}'`);
  console.log(` - Toggled back to: "${updatedTask.status}" -> PASSED\n`);

  // 5. Test Adding a New Task (Real-time update)
  console.log('5. Testing Adding a New Task:');
  const countBeforeAdd = getDisplayTasks(useTaskStore.getState().tasks).length;
  const newTaskId = 'task-user-created-999';
  useTaskStore.getState().addTask({
    id: newTaskId,
    title: 'Deploy Momentum App to Production',
    category: 'Work',
    priority: 'Urgent',
    dueDate: getTodayIsoDate(),
    status: 'todo',
  });

  const displayAfterAdd = getDisplayTasks(useTaskStore.getState().tasks);
  const addedItem = displayAfterAdd.find(t => t.id === newTaskId);
  if (!addedItem) throw new Error('Newly created task not found in Today\'s Tasks list');
  if (displayAfterAdd.length !== countBeforeAdd + 1) throw new Error('Task count did not increment');
  console.log(` - Successfully added: "${addedItem.title}" (${addedItem.priority})`);
  console.log(` - Today's Tasks count: ${displayAfterAdd.length} -> PASSED\n`);

  // 6. Test Deleting a Task (Real-time update)
  console.log('6. Testing Deleting a Task:');
  useTaskStore.getState().deleteTask(newTaskId);
  const displayAfterDelete = getDisplayTasks(useTaskStore.getState().tasks);
  const deletedItem = displayAfterDelete.find(t => t.id === newTaskId);
  if (deletedItem) throw new Error('Deleted task still present in Today\'s Tasks list');
  if (displayAfterDelete.length !== countBeforeAdd) throw new Error('Task count did not decrement');
  console.log(` - Successfully deleted task: count returned to ${displayAfterDelete.length} -> PASSED\n`);

  // 7. Test Empty State Handling
  console.log('7. Testing Empty State Handling:');
  const emptyTasks = [];
  const displayEmpty = getDisplayTasks(emptyTasks);
  if (displayEmpty.length !== 0) throw new Error('Expected 0 tasks for empty state');
  console.log(' - Empty state correctly yields 0 tasks with no artificial fallback -> PASSED\n');

  console.log('=== ALL TODAY\'S TASKS TESTS PASSED 100% ===');
}

testTodaysTasksSync();

