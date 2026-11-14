const fs = require('fs');

function updateAddEditRoutine(filePath, isDark) {
  let content = fs.readFileSync(filePath, 'utf8');
  const targetTab = isDark ? 'daily_routine_dark_mode' : 'daily_routine_light_mode';

  // Replace function signature and add state hooks
  const oldSig = `export default function ${isDark ? 'AddEditRoutineDarkMode' : 'AddEditRoutineLightMode'}({ setActiveTab, goBack }) {
  return (`;

  const newSig = `export default function ${isDark ? 'AddEditRoutineDarkMode' : 'AddEditRoutineLightMode'}({ setActiveTab, goBack }) {
  const { routines, editingRoutineId, setEditingRoutineId, addRoutine, updateRoutine, deleteRoutine } = useRoutineStore();
  const existingRoutine = editingRoutineId ? routines.find((r) => r.id === editingRoutineId) : null;
  const isEditing = Boolean(existingRoutine);

  const handleSave = () => {
    const nameEl = document.getElementById('routine-name');
    const title = (nameEl && nameEl.value.trim()) || (existingRoutine ? existingRoutine.title : 'Daily Routine');
    if (isEditing) {
      updateRoutine(existingRoutine.id, { title });
    } else {
      addRoutine({ title, category: 'Spiritual', time: '08:30 PM' });
    }
    setEditingRoutineId(null);
    if (goBack) goBack('${targetTab}');
    else if (setActiveTab) setActiveTab('${targetTab}');
  };

  const handleDelete = () => {
    if (existingRoutine) {
      deleteRoutine(existingRoutine.id);
    }
    setEditingRoutineId(null);
    if (goBack) goBack('${targetTab}');
    else if (setActiveTab) setActiveTab('${targetTab}');
  };

  const handleCancel = () => {
    setEditingRoutineId(null);
    if (goBack) goBack('${targetTab}');
    else if (setActiveTab) setActiveTab('${targetTab}');
  };

  return (`;

  content = content.replace(oldSig, newSig);

  // Update back button
  content = content.replace(
    `onClick={() => (goBack ? goBack('${targetTab}') : (setActiveTab ? setActiveTab('${targetTab}') : window.history.back()))}`,
    `onClick={handleCancel}`
  );

  // Update routine badge
  content = content.replace(
    `ROUTINE #RT-402`,
    `{existingRoutine ? \`ROUTINE #\${existingRoutine.id.toUpperCase()}\` : 'NEW ROUTINE'}`
  );

  // Update top delete button
  content = content.replace(
    `<button aria-label="Delete Routine" className="h-9 px-3 rounded-full flex items-center justify-center gap-1.5 bg-rose-500/90 hover:bg-rose-600 text-white font-medium text-xs shadow-sm shadow-rose-500/20 border border-rose-400/30 transition-all active:scale-95 whitespace-nowrap shrink-0" type="button">`,
    `<button onClick={handleDelete} aria-label="Delete Routine" className="h-9 px-3 rounded-full flex items-center justify-center gap-1.5 bg-rose-500/90 hover:bg-rose-600 text-white font-medium text-xs shadow-sm shadow-rose-500/20 border border-rose-400/30 transition-all active:scale-95 whitespace-nowrap shrink-0" type="button">`
  );

  // Update input defaultValue
  content = content.replace(
    `defaultValue="Evening Reading &amp; Quran Reflection"`,
    `key={existingRoutine ? existingRoutine.id : 'new'} defaultValue={existingRoutine ? existingRoutine.title : 'Evening Reading & Quran Reflection'}`
  );

  // Update save button
  const oldSavePattern = /<button onClick=\{\(\) => \{ const nameEl = document\.getElementById\('routine-name'\);[^}]+setActiveTab\('[^']+'\); \}\} className="btn-primary w-full" type="button">/g;
  content = content.replace(oldSavePattern, `<button onClick={handleSave} className="btn-primary w-full" type="button">`);

  // Update cancel button
  content = content.replace(
    `<button onClick={() => (goBack ? goBack('${targetTab}') : (setActiveTab ? setActiveTab('${targetTab}') : window.history.back()))} className="btn-secondary w-full" type="button">`,
    `<button onClick={handleCancel} className="btn-secondary w-full" type="button">`
  );

  // Update bottom delete button
  content = content.replace(
    `<button className="btn-danger w-full" type="button">`,
    `<button onClick={handleDelete} className="btn-danger w-full" type="button">`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

updateAddEditRoutine('src/AddEditRoutineDarkMode.jsx', true);
updateAddEditRoutine('src/AddEditRoutineLightMode.jsx', false);
console.log('AddEditRoutine pairs updated successfully.');

