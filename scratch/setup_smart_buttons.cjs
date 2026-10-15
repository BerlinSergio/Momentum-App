const fs = require('fs');
const path = require('path');

const srcDir = 'c:/momentum/src';
const cssPath = path.join(srcDir, 'index.css');

// ۱. په index.css کې د نوي سټنډرډ سټایلونو خوندي اضافه کول
let cssContent = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';

const newStyles = `
@layer components {
  .btn-primary {
    @apply px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 border border-transparent;
  }
  .btn-secondary {
    @apply px-6 py-3.5 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full border border-slate-300 dark:border-slate-600 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 backdrop-blur-md;
  }
  .btn-danger {
    @apply px-6 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-full shadow-lg shadow-rose-500/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 border border-transparent;
  }
}
`;

if (!cssContent.includes('.btn-primary')) {
    fs.appendFileSync(cssPath, '\n' + newStyles);
    console.log('✅ Standard CSS classes added to index.css');
}

// ۲. په فایلونو کې د بټنونو هوښیار او خوندي بدلون
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jsx'));
let updatedFiles = 0;

// هغه کلمې چې سکرېپټ یې پېژني (په انګلیسي، پښتو او دري)
const primaryTexts = ['save', 'add', 'submit', 'ok', 'update', 'create', 'confirm', 'ثبت', 'سیف', 'خوندي', 'ذخیره', 'اضافه', 'نوی', 'سمه ده', 'اوکی', 'تایید'];
const secondaryTexts = ['cancel', 'close', 'back', 'go back', 'لغوه', 'کنسل', 'بندول', 'وروسته', 'شا ته', 'بېرته'];
const dangerTexts = ['delete', 'remove', 'clear', 'logout', 'حذف', 'ړنګول', 'دلیت', 'پاکول', 'وتل'];

files.forEach(file => {
    const filePath = path.join(srcDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let isModified = false;

    // یوازې هغه بټنونه لټوي چې منځ کې یې متن وي
    const newContent = content.replace(/<button([^>]*)className=(["'])(.*?)\2([^>]*)>([\s\S]*?)<\/button>/g, (match, before, quote, oldClass, after, inner) => {
        const text = inner.replace(/<[^>]*>/g, '').trim().toLowerCase();
        
        let btnType = '';
        if (primaryTexts.some(t => text.includes(t))) btnType = 'btn-primary';
        else if (secondaryTexts.some(t => text.includes(t))) btnType = 'btn-secondary';
        else if (dangerTexts.some(t => text.includes(t))) btnType = 'btn-danger';
        
        // که بټن وپېژندل شو او مخکې نه وي بدل شوی
        if (btnType && !oldClass.includes('btn-')) {
            // د ډیزاین نه خرابېدو لپاره پخوانۍ فاصلې او پراخوالی ساتي
            const hasWFull = oldClass.includes('w-full') ? 'w-full' : '';
            const margins = oldClass.split(' ').filter(c => c.match(/^m[trblxy]?-/)).join(' ');
            
            const finalClass = `${btnType} ${hasWFull} ${margins}`.trim();
            isModified = true;
            return `<button${before}className=${quote}${finalClass}${quote}${after}>${inner}</button>`;
        }
        // که کوچنی آیکون وي یا بې ربطه بټن وي، هېڅ لاس نه وروړي!
        return match;
    });

    if (isModified) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        updatedFiles++;
    }
});

console.log(`🎉 Success! Smartly updated buttons in ${updatedFiles} files without breaking the layout.`);