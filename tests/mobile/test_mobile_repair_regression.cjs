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
    const pageErrors=[];
    page.on('pageerror',error=>pageErrors.push(String(error)));
    await page.evaluate(async () => {
      await window.useProfileStore.getState().completeSetup();
      await window.useProfileStore.getState().updateProfile({fullName:'Mobile QA',setupCompleted:true});
      window.useSecurityStore.getState().setLocked(false);
      window.setIsAppLoading(false);
    });
    // Startup decision and onboarding redirects must settle before routing.
    await page.waitForFunction(()=>window.useProfileStore?.getState().setupCompleted===true,{timeout:15000});
    await new Promise(resolve=>setTimeout(resolve,650));
    await page.evaluate(()=>window.useNavigationStore.getState().setActiveTab('add_edit_task_dark_mode'));
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
    // An existing checklist toggles in read mode and survives reload.
    await page.evaluate(async()=>{
      const notes=window.useNotesStore.getState();
      await notes.addNote({id:'qa-mobile-checklist',type:'quick',title:'QA Checklist',body:'- [ ] First task\n- [x] Second task'});
      notes.setActiveNoteId('qa-mobile-checklist');
      window.useNavigationStore.getState().setActiveTab('quick_note_editor',{noteId:'qa-mobile-checklist',isNew:false});
    });
    await page.waitForSelector(q('quick-note-check-item'),{visible:true,timeout:15000});
    await page.click(q('quick-note-check-item'));
    await page.waitForFunction(()=>window.useNotesStore.getState().notes.find(n=>n.id==='qa-mobile-checklist')?.body.startsWith('- [x] First task'));
    await page.reload({waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>window.useNotesStore?.getState()._hasHydrated,{timeout:45000});
    assert.equal(await page.evaluate(()=>window.useNotesStore.getState().notes.find(n=>n.id==='qa-mobile-checklist')?.body),'- [x] First task\n- [x] Second task');
    console.log('PASS: real checklist checkbox persists on reload');
    const credential = await page.evaluate(async()=>{
      const {getCommittedStoreRecord}=await import('/src/storage/db.js');
      const service=await import('/src/utils/credentialService.js');
      const store=window.useSecurityStore.getState();
      const first=await store.setPin('6829');
      if(!first.success)throw Error(first.error);
      const bad=await window.useSecurityStore.getState().changeToPasscode('1111','QAnewPass42');
      const next=await window.useSecurityStore.getState().changeToPasscode('6829','QAnewPass42');
      const verifier=await getCommittedStoreRecord('momentum-credential-verifier');
      const security=await getCommittedStoreRecord('momentum-security-storage');
      const old=await service.authenticatePin('6829');
      return {bad:bad.success,next:next.success,old:old.success,kind:verifier.value.credentialKind,
        version:verifier.value.version,meta:security.value.state.passcodeType,
        plaintext:JSON.stringify([verifier,security]).includes('QAnewPass42')};
    });
    assert.deepEqual(credential,{bad:false,next:true,old:false,kind:'alphanumeric',version:2,meta:'alphanumeric',plaintext:false});
    await page.reload({waitUntil:'domcontentloaded'});
    await page.waitForSelector('#unlock-passcode',{visible:true,timeout:45000});
    await page.type('#unlock-passcode','QAnewPass42');
    await page.$eval('#unlock-passcode',el=>el.form.requestSubmit());
    await page.waitForFunction(()=>window.useSecurityStore?.getState().isLocked===false,{timeout:15000});
    const back=await page.evaluate(async()=>{
      const result=await window.useSecurityStore.getState().changePin('QAnewPass42','3968');
      return {success:result.success,type:window.useSecurityStore.getState().passcodeType};
    });
    assert.deepEqual(back,{success:true,type:'pin'});
    console.log('PASS: passcode transition requires current credential, no plaintext, reload unlock and switch back to PIN');
  } catch(error) {
    console.error('Mobile regression context:',await page.evaluate(()=>({tab:window.useNavigationStore?.getState().activeTab,profileReady:window.useProfileStore?.getState().setupCompleted,screen:document.body.innerText.slice(0,250)})).catch(()=>null));
    throw error;
  } finally {await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});
