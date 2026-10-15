const fs = require('fs');
let content = fs.readFileSync('src/AddEditIncomeLightMode.jsx', 'utf8');

const formEndRegex = /<span className="material-symbols-outlined text-on-surface-variant text-\[20px\]">tune<\/span>\s*<\/div>\s*<\/div>\s*<\/div>/;
const formEndReplacement = `<span className="material-symbols-outlined text-on-surface-variant text-[20px]">tune</span>
</div>
</div>
{/*  Notes & Memo Field  */}
<div className="space-y-1">
  <div className="flex items-center justify-between">
    <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="memo-input">Notes &amp; Memo</label>
    <span className="font-label-sm text-label-sm text-on-surface-variant/70">72 / 140</span>
  </div>
  <div className="bg-surface-container-low/70 px-space-md py-3 rounded-2xl">
    <textarea aria-label="Notes and Memo" className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder-on-surface-variant/50 focus:outline-none resize-none" id="memo-input" rows="2">Monthly senior design lead compensation &amp; quarterly milestone recognition</textarea>
  </div>
</div>
</div>`;
content = content.replace(formEndRegex, formEndReplacement);

fs.writeFileSync('src/AddEditIncomeLightMode.jsx', content);
console.log("Notes added.");
