const fs = require('fs');

const colorRegex = /^(bg|text|border|shadow|ring|from|to|via|fill|stroke|hover:bg|hover:text|hover:border|hover:from|hover:to|peer-checked:bg|peer-checked:after:border|peer-focus:ring|focus:border|focus:ring|active:bg|placeholder:text)-/;

const strip = (str) => {
  return str.replace(/className="([^"]*)"/g, (match, p1) => {
    let classes = p1.split(' ');
    let filtered = classes.filter(c => !c.match(colorRegex) && c !== 'text-white' && c !== 'bg-white' && c !== 'bg-transparent' && c !== 'border-white' && c !== 'fill-white' && c !== 'text-transparent' && c !== 'bg-black');
    return 'className="' + filtered.join(' ') + '"';
  });
};

['NotificationsSettings', 'QuickNoteEditor', 'NoteMediaAttachmentViewer', 'SettingsProfile', 'DhikrHistory'].forEach(name => {
  let light = fs.readFileSync('src/' + name + 'LightMode.jsx', 'utf8');
  let dark = fs.readFileSync('src/' + name + 'DarkMode.jsx', 'utf8');
  
  // also normalize newlines
  light = light.replace(/\r\n/g, '\n');
  dark = dark.replace(/\r\n/g, '\n');

  // We should also replace double quotes with backticks just to run our replace, then put them back
  light = light.replace(/className=\"/g, 'className="').replace(/\"/g, '"');
  dark = dark.replace(/className=\"/g, 'className="').replace(/\"/g, '"');
  
  let strippedLight = strip(light);
  let strippedDark = strip(dark);
  
  if(strippedLight !== strippedDark) {
    console.log(name + ' differs');
    fs.writeFileSync(name + '_light_strip.txt', strippedLight);
    fs.writeFileSync(name + '_dark_strip.txt', strippedDark);
  } else {
    console.log(name + ' perfect');
  }
});
