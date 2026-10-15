const fs = require('fs');

['NotificationsSettings', 'QuickNoteEditor', 'NoteMediaAttachmentViewer', 'SettingsProfile', 'DhikrHistory'].forEach(name => {
  let light = fs.readFileSync(name + '_light_strip.txt', 'utf8').split('\n');
  let dark = fs.readFileSync(name + '_dark_strip.txt', 'utf8').split('\n');
  let diffs = [];
  for(let i=0; i<Math.max(light.length, dark.length); i++) {
    if(light[i] !== dark[i]) {
      diffs.push('Line ' + (i+1) + ':\nL: ' + light[i] + '\nD: ' + dark[i]);
    }
  }
  if (diffs.length > 0) {
    console.log('==== ' + name + ' ====');
    console.log(diffs.join('\n\n'));
  }
});
