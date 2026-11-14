const assert = require('assert');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
global.localStorage = localStorageMock;

const { useNotesStore } = require('../src/store/useNotesStore.js');

console.log('Testing Note Editor & useNotesStore Synchronization...');

// 1. Initial State verification
const state = useNotesStore.getState();
const note3 = state.notes.find(n => n.id === 'note-3');
assert(note3, 'Note 3 must exist');
console.log('Note 3 title:', note3.title);
console.log('Note 3 isPinned:', note3.isPinned);
console.log('Note 3 tags:', note3.tags);
console.log('Note 3 milestones count:', note3.milestones.length);
console.log('Note 3 attachments count:', note3.attachments.length);

assert.strictEqual(note3.isPinned, true, 'Note 3 must be pinned initially');
assert(note3.tags.includes('Spiritual Growth'), 'Must have Spiritual Growth tag');
assert(note3.milestones.length >= 3, 'Must have at least 3 milestones');
assert(note3.attachments.length >= 3, 'Must have at least 3 attachments');

// 2. Test togglePin
useNotesStore.getState().togglePin('note-3');
const unpinned = useNotesStore.getState().notes.find(n => n.id === 'note-3');
assert.strictEqual(unpinned.isPinned, false, 'Note 3 should now be unpinned');
useNotesStore.getState().togglePin('note-3');
const rePinned = useNotesStore.getState().notes.find(n => n.id === 'note-3');
assert.strictEqual(rePinned.isPinned, true, 'Note 3 should now be re-pinned');
console.log('✓ togglePin verified');

// 3. Test toggleMilestone
const m1 = rePinned.milestones[0];
const initialCompletion = m1.completed;
useNotesStore.getState().toggleMilestone('note-3', m1.id);
const toggledM1 = useNotesStore.getState().notes.find(n => n.id === 'note-3').milestones[0];
assert.strictEqual(toggledM1.completed, !initialCompletion, 'Milestone completion must toggle');
console.log('✓ toggleMilestone verified');

// 4. Test addMilestone
useNotesStore.getState().addMilestone('note-3', 'Automated QA Milestone verification');
const withNewM = useNotesStore.getState().notes.find(n => n.id === 'note-3');
assert(withNewM.milestones.some(m => m.text === 'Automated QA Milestone verification'), 'New milestone must be present');
console.log('✓ addMilestone verified');

// 5. Test addAttachment
useNotesStore.getState().addAttachment('note-3', {
  name: 'Test_Journal_Scan.png',
  size: '3.1 MB',
  subtitle: 'Scanned handwritten notes',
  type: 'image',
  url: 'https://example.com/scan.png'
});
const withNewAtt = useNotesStore.getState().notes.find(n => n.id === 'note-3');
assert(withNewAtt.attachments.some(a => a.name === 'Test_Journal_Scan.png'), 'New attachment must exist');
console.log('✓ addAttachment verified');

// 6. Test deleteAttachment
const addedAtt = withNewAtt.attachments.find(a => a.name === 'Test_Journal_Scan.png');
useNotesStore.getState().deleteAttachment('note-3', addedAtt.id);
const afterDelAtt = useNotesStore.getState().notes.find(n => n.id === 'note-3');
assert(!afterDelAtt.attachments.some(a => a.name === 'Test_Journal_Scan.png'), 'Attachment must be deleted');
console.log('✓ deleteAttachment verified');

// 7. Test addTag & removeTag
useNotesStore.getState().addTag('note-3', 'Deep Work');
const withTag = useNotesStore.getState().notes.find(n => n.id === 'note-3');
assert(withTag.tags.includes('Deep Work'), 'New tag must exist');
useNotesStore.getState().removeTag('note-3', 'Deep Work');
const withoutTag = useNotesStore.getState().notes.find(n => n.id === 'note-3');
assert(!withoutTag.tags.includes('Deep Work'), 'Tag must be removed');
console.log('✓ addTag and removeTag verified');

// 8. Test updateNote
useNotesStore.getState().updateNote('note-3', {
  title: 'Updated Strategic Reflections Title',
  savedAt: 'Today at 08:30 PM'
});
const updated = useNotesStore.getState().notes.find(n => n.id === 'note-3');
assert.strictEqual(updated.title, 'Updated Strategic Reflections Title');
assert.strictEqual(updated.savedAt, 'Today at 08:30 PM');
console.log('✓ updateNote verified');

console.log('ALL NOTE EDITOR SYNCHRONIZATION TESTS PASSED! ✅');

