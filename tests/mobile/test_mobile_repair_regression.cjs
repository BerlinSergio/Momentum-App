const assert = require('node:assert/strict');
const puppeteer = require('puppeteer');
const url = process.env.MOMENTUM_URL || 'http://127.0.0.1:5173/';
const q = id => '[data-testid="' + id + '"]';

// The startup controller can still select a route after individual stores
// hydrate. Wait for the actual foreground splash/route completion before
// navigating, including after every reload.
async function waitStartup(page) {
  await page.bringToFront();
  await page.waitForFunction(() =>
    document.querySelector('[data-app-startup-ready="true"]') !== null &&
    ['Profile','Security','Task','Prayer','Tasbeeh','Notes'].every(name =>
      window['use'+name+'Store']?.persist?.hasHydrated?.() &&
      window['use'+name+'Store']?.getState()._hasHydrated),
    {timeout:45000,polling:200});
}

(async () => {
  const browser = await puppeteer.launch({headless:true,args:['--no-sandbox','--disable-setuid-sandbox']});
  const page = await browser.newPage();
  try {
    await page.setViewport({width:390,height:844,deviceScaleFactor:1,isMobile:true,hasTouch:true});
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await waitStartup(page);
    page.on('pageerror',error=>console.error('Mobile page error:',String(error)));
    await page.evaluate(async () => {
      await window.useProfileStore.getState().completeSetup();
      await window.useProfileStore.getState().updateProfile({fullName:'Mobile QA',setupCompleted:true});
      window.useSecurityStore.getState().setLocked(false);
    });
    await page.waitForFunction(()=>window.useProfileStore?.getState().setupCompleted===true && document.querySelector('[data-app-startup-ready="true"]'),{timeout:15000,polling:200});
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
    // Exercise real UI saves in both themes against committed IndexedDB.
    for (const theme of ['dark', 'light']) {
      const title = 'QA durable task ' + theme;
      await page.evaluate(async theme => {
        await window.useThemeStore.getState().setTheme(theme);
        await window.useTaskStore.getState().setEditingTaskId(null);
        window.useNavigationStore.getState().setActiveTab('add_edit_task_' + theme + '_mode');
      }, theme);
      await page.waitForSelector(q('task-title-input'), {visible:true,timeout:15000});
      await page.click(q('task-title-input'), {clickCount:3});
      await page.keyboard.type(title);
      await page.click(q('save-task-btn'));
      await page.waitForFunction(async title => {
        const {getStoreItem}=await import('/src/storage/db.js');
        const row=await getStoreItem('momentum-task-storage');
        return row?.state?.tasks?.filter(task=>task.title===title).length===1;
      }, {timeout:15000,polling:200}, title);
      await page.waitForSelector(q('save-task-btn'), {hidden:true,timeout:15000});
    }
    console.log('PASS: both task editor themes save to committed IndexedDB before leaving the editor');
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
    await waitStartup(page);
    assert.equal(await page.evaluate(()=>window.usePrayerStore.getState().savedInspirations.some(x=>x.id==='QA reference')),true);
    assert.equal(await page.evaluate(()=>window.useTasbeehStore.getState().activePreset.id),saved.next);
    await page.waitForFunction(()=>window.useTaskStore?.persist?.hasHydrated()&&window.useTaskStore.getState()._hasHydrated,{timeout:45000});
    assert.deepEqual(await page.evaluate(()=>['dark','light'].map(theme=>window.useTaskStore.getState().tasks.filter(task=>task.title==='QA durable task '+theme).length)),[1,1]);
    console.log('PASS: task editor saves survive reload without duplicates');
    console.log('PASS: mobile picker viewport/keyboard, canonical Hijri month, bookmark and next-preset persistence');
    // An existing checklist toggles in read mode and survives reload.
    await page.evaluate(async()=>{
      const notes=window.useNotesStore.getState();
      await notes.addNote({id:'qa-mobile-checklist',type:'quick',title:'QA Checklist',category:'Checklist',body:'- [ ] First task\n- [x] Second task'});
      notes.setActiveNoteId('qa-mobile-checklist');
      window.useNavigationStore.getState().setActiveTab('quick_note_editor',{noteId:'qa-mobile-checklist',isNew:false});
    });
    await page.waitForFunction(()=>window.useNavigationStore.getState().routeParams?.noteId==='qa-mobile-checklist' && window.useNotesStore.getState().notes.some(n=>n.id==='qa-mobile-checklist'),{timeout:15000,polling:200});
    await page.waitForSelector(q('quick-note-check-item'),{visible:true,timeout:15000});
    await page.click(q('quick-note-check-item'));
    await page.waitForFunction(()=>window.useNotesStore.getState().notes.find(n=>n.id==='qa-mobile-checklist')?.body.startsWith('- [x] First task'));
    await page.reload({waitUntil:'domcontentloaded'});
    await waitStartup(page);
    assert.equal(await page.evaluate(()=>window.useNotesStore.getState().notes.find(n=>n.id==='qa-mobile-checklist')?.body),'- [x] First task\n- [x] Second task');
    console.log('PASS: real checklist checkbox persists on reload');
    // Exercise both editors through the UI with synthetic browser speech events.
    // No microphone, speech service or private data is used by this test.
    for(const theme of ['dark','light']){
      const id='qa-long-dictation-'+theme;
      await page.evaluate(async({theme,id})=>{
        await window.useThemeStore.getState().setTheme(theme);
        const notes=window.useNotesStore.getState();
        await notes.addNote({id,type:'long',title:'QA dictation '+theme,body:'<p>Original body</p>'});
        notes.setActiveNoteId(id);
        window.useNavigationStore.getState().setActiveTab('long_note_editor',{noteId:id,isNew:false});
      },{theme,id});
      await page.waitForFunction(title=>[...document.querySelectorAll('h1,h2,textarea')].some(el=>(el.value||el.textContent||'').trim()===title),{timeout:15000},'QA dictation '+theme);
      await page.waitForSelector(q('long-note-edit'),{visible:true,timeout:10000});
      await page.click(q('long-note-edit'));
      await page.waitForSelector(q('long-note-body-editor'),{visible:true,timeout:15000});
      const original=await page.$eval(q('long-note-body-editor'),el=>el.textContent);
      assert.equal(original,'Original body','Entering edit mode must preserve saved rich text');
      await page.evaluate(()=>{
        Object.defineProperty(window,'SpeechRecognition',{value:undefined,configurable:true});
        Object.defineProperty(window,'webkitSpeechRecognition',{value:undefined,configurable:true});
      });
      await page.click('[aria-label="Voice dictation"]');
      await new Promise(resolve=>setTimeout(resolve,1900));
      assert.equal(await page.$eval(q('long-note-body-editor'),el=>el.textContent),original);
      assert.equal(await page.$eval('[aria-label="Voice dictation"]',el=>el.getAttribute('aria-pressed')),'false');
      await page.evaluate(()=>{
        window.SpeechRecognition=undefined;
        Object.defineProperty(window,'SpeechRecognition',{configurable:true,value:class {
          start(){window.__qaSpeech=this;this.onstart?.();}
          stop(){this.onend?.();}
          abort(){this.onend?.();}
        }});
      });
      await page.click('[aria-label="Voice dictation"]');
      await page.evaluate(()=>{
        const rec=window.__qaSpeech;
        const result=text=>Object.assign([{transcript:text}],{isFinal:true});
        rec.onresult({results:[result('QA first')]});
        rec.onresult({results:[result('QA first'),result('QA second')]});
        rec.onend();
      });
      const body=await page.$eval(q('long-note-body-editor'),el=>el.textContent);
      assert.equal((body.match(/QA first/g)||[]).length,1);
      assert.equal((body.match(/QA second/g)||[]).length,1);
      await page.click(q(theme==='dark'?'long-note-save-bottom':'long-note-save'));
      await page.waitForFunction(async(id)=>{
        const {getCommittedStoreRecord}=await import('/src/storage/db.js');
        const row=await getCommittedStoreRecord('momentum-notes-storage');
        return row?.value?.state?.notes?.some(n=>n.id===id && n.body.includes('Original body')&&n.body.includes('QA first')&&n.body.includes('QA second'));
      },{timeout:15000},id);
      await page.waitForSelector(q('long-note-body-editor'),{hidden:true,timeout:15000});
    }
    console.log('PASS: both long note themes reject unavailable speech without fake text, append final segments once and save durably');
    const reminders=await page.evaluate(async()=>{
      const {buildNativeReminderPlan,hashStringToInt,calculateRoutineTriggerDate}=await import('/src/utils/nativeNotifications.js');
      const {useSettingsStore}=await import('/src/store/useSettingsStore.js');
      const settings=useSettingsStore.getState();
      await settings.updateSettings({masterEnabled:true,prayerAlertsEnabled:false,dueTaskAlerts:false,morningIntention:false,dailyRadianceQuote:false,middayPause:false,dailyHabitCheckin:true,eveningWinddown:false,zenFocusDND:true});
      const now=new Date(2026,10,26,12);
      const first=buildNativeReminderPlan(now).filter(n=>n.extra.type==='nudge');
      const times=first.map(n=>[n.schedule.at.getHours(),n.schedule.at.getMinutes()]);
      await useSettingsStore.getState().updateSettings({dailyHabitCheckin:false});
      const disabled=buildNativeReminderPlan(now).filter(n=>n.extra.type==='nudge').length;
      await useSettingsStore.getState().updateSettings({masterEnabled:false});
      return {times,disabled,master:buildNativeReminderPlan(now).length,invalidRoutine:calculateRoutineTriggerDate({targetTime:'99:15'})===null,idsValid:first.every(n=>Number.isInteger(n.id)&&n.id>0&&n.id<=2147483647)};
    });
    assert.deepEqual(reminders.times,Array.from({length:7},()=>[20,30]));
    assert.deepEqual({...reminders,times:undefined},{times:undefined,disabled:0,master:0,invalidRoutine:true,idsValid:true});
    console.log('PASS: native reminder plan follows daily habit toggle, time, and master disable');
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
    console.error('Mobile regression context:',await page.evaluate(()=>({tab:window.useNavigationStore?.getState().activeTab,profileReady:window.useProfileStore?.getState().setupCompleted,startup:document.querySelector('[data-app-startup-status]')?.getAttribute('data-app-startup-status'),qaRoute:window.useNavigationStore?.getState().routeParams?.noteId?.startsWith?.('qa-')||false,hasChecklist:window.useNotesStore?.getState().notes.some(n=>n.id==='qa-mobile-checklist'),screen:document.body.innerText.slice(0,250)})).catch(()=>null));
    throw error;
  } finally {await browser.close();}
})().catch(err=>{console.error(err);process.exitCode=1;});
