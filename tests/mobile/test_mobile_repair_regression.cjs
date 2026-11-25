const assert = require('node:assert/strict');
const puppeteer = require('puppeteer');
const url = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const q = id => '[data-testid="' + id + '"]';

(async () => {
  const browser = await puppeteer.launch({headless:true,args:['--no-sandbox','--disable-setuid-sandbox']});
  try {
    const page = await browser.newPage();
    await page.setViewport({width:390,height:844,deviceScaleFactor:1,isMobile:true,hasTouch:true});
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(() => ['Profile','Security','Prayer','Tasbeeh','Notes'].every(
      name => window['use'+name+'Store']?.persist?.hasHydrated() &&
        window['use'+name+'Store']?.getState()._hasHydrated),{timeout:45000});
    await page.evaluate(async () => {
      await window.useProfileStore.getState().completeSetup();
      await window.useProfileStore.getState().updateProfile({fullName:'Mobile QA',setupCompleted:true});
      window.useSecurityStore.getState().setLocked(false);
      window.setIsAppLoading(false);
      window.useNavigationStore.getState().setActiveTab('add_edit_task_dark_mode');
    });
    await page.waitForSelector(q('task-due-date-tile'),{visible:true});
    for (const [tile,modal,cancel] of [
      ['task-due-date-tile','momentum-date-picker-modal','date-picker-cancel-btn'],
      ['task-start-time-tile','momentum-time-picker-modal','time-picker-cancel-btn']
    ]) {
      await page.click(q(tile));
      await page.waitForSelector(q(modal),{visible:true});
      await page.waitForFunction(sel => {
        const el = document.querySelector(sel);
        if (!el) return false;
        const r=el.getBoundingClientRect();
        return r.top>=-1 && r.bottom<=innerHeight+1 && r.left>=-1 && r.right<=innerWidth+1 &&
          el.closest('.momentum-picker-overlay')?.parentElement===document.body;
      },{timeout:8000},q(modal));
      if (modal.includes('time')) {
        for (const [id,value] of [['time-hours-input','8'],['time-minutes-input','42']]) {
          await page.click(q(id),{clickCount:3});
          await page.keyboard.type(value);
        }
        await page.click(q('time-picker-confirm-btn'));
        await page.waitForFunction(sel=>document.querySelector(sel)?.textContent.includes(':42'),{},q(tile));
      } else await page.click(q(cancel));
      await page.waitForSelector(q(modal),{hidden:true});
    }
    const saved = await page.evaluate(async () => {
      const {getIslamicDateParts,getHijriDateParts,HIJRI_MONTHS}=await import('/src/utils/afghanCalendar.js');
      const d=new Date('2026-11-26T09:00:00Z');
      const lunar=getIslamicDateParts(d,'Asia/Kabul');
      const parts=getHijriDateParts(d,'Asia/Kabul');
      const prayer=window.usePrayerStore;
      const quote={surah:'QA reference',ayah:'QA saved inspiration'};
      await prayer.getState().toggleSavedInspiration(quote);
      const ts=window.useTasbeehStore;
      const first=ts.getState().presets[0],second=ts.getState().presets[1];
      await ts.getState().setActivePreset({...first,target:2});
      if (!ts.getState().autoLoopEnabled) await ts.getState().toggleAutoLoop();
      const before=ts.getState().historyLogs.length;
      await ts.getState().increment();
      await ts.getState().increment();
      return {month:lunar.hm,expected:HIJRI_MONTHS[parts.hm-1].nameEn,
        next:ts.getState().activePreset.id,expectedNext:second.id,count:ts.getState().currentCount,
        logs:ts.getState().historyLogs.length-before,saved:prayer.getState().savedInspirations.some(x=>x.id===quote.surah)};
    });
    assert.equal(saved.month,saved.expected);
    assert.equal(saved.next,saved.expectedNext);
    assert.equal(saved.count,0);assert.equal(saved.logs,1);assert.equal(saved.saved,true);
    await page.reload({waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>window.usePrayerStore?.persist?.hasHydrated()&&window.usePrayerStore.getState()._hasHydrated&&window.useTasbeehStore?.persist?.hasHydrated()&&window.useTasbeehStore.getState()._hasHydrated,{timeout:45000});
    assert.equal(await page.evaluate(()=>window.usePrayerStore.getState().savedInspirations.some(x=>x.id==='QA reference')),true);
    assert.equal(await page.evaluate(()=>window.useTasbeehStore.getState().activePreset.id),saved.next);
    console.log('PASS: mobile picker viewport/keyboard, canonical Hijri month, bookmark and next-preset persistence');
  } finally {await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});
