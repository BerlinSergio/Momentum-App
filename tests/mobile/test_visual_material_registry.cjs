const assert=require('node:assert/strict');
const puppeteer=require('puppeteer');
const fs=require('node:fs');
const path=require('node:path');
const out=process.env.MOMENTUM_VISUAL_DIR||'/tmp/momentum-visual';
const pause=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const browser=await puppeteer.launch({headless:true,args:['--no-sandbox','--disable-setuid-sandbox']});
 try{
  fs.mkdirSync(out,{recursive:true});
  const page=await browser.newPage();
  await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true,deviceScaleFactor:1});
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await page.evaluateOnNewDocument(()=>Object.defineProperty(navigator,'geolocation',{configurable:true,value:{getCurrentPosition(resolve){resolve({coords:{latitude:34.1234,longitude:69.1234,accuracy:30},timestamp:Date.now()})}}}));
  await page.goto(process.env.MOMENTUM_URL||'http://127.0.0.1:5173/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('[data-app-startup-ready="true"]')&&window.useThemeStore?.persist?.hasHydrated()&&window.useProfileStore?.persist?.hasHydrated(),{timeout:45000,polling:200});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const go=async(id,theme,params={})=>{
    const logical=id.replace(/_(dark|light)_mode$/,'');
    await page.evaluate(async({id,theme,params})=>{
      await window.useThemeStore.getState().setTheme(theme);
      window.useNavigationStore.getState().setActiveTab(id,params);
    },{id,theme,params});
    await page.waitForFunction((logical,theme)=>document.querySelector('[data-screen-key="'+logical+'"]')&&document.documentElement.classList.contains('dark')===(theme==='dark'),{timeout:12000,polling:100},logical,theme);
    await pause(350);
    await page.evaluate(()=>{const view=document.querySelector('.momentum-canvas-viewport');if(view){view.scrollTop=0;view.scrollLeft=0;}});
  };
  for(const theme of ['light','dark']){
    await go('personal_setup_'+theme+'_mode',theme);
    await page.evaluate(()=>[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Auto-Detect'))?.click());
    await page.waitForFunction(async()=> (await import('/src/store/useLocationStore.js')).useLocationStore.getState().selectedCity.latitude===34.1234,{timeout:12000,polling:100});
    await page.screenshot({path:path.join(out,'onboarding-'+theme+'.png')});
    console.log('PASS onboarding location provider '+theme);
  }
  await page.evaluate(async()=>{
    await window.useProfileStore.getState().updateProfile({fullName:'Visual QA',setupCompleted:true});
    await window.useProfileStore.getState().completeSetup();
    window.useSecurityStore.getState().setLocked(false);
    await window.useTaskStore.getState().addTask({id:'visual-task',title:'Visual QA task'});
    const {useRoutineStore}=await import('/src/store/useRoutineStore.js');
    await useRoutineStore.getState().addRoutine({id:'visual-routine',title:'Visual QA routine',time:'08:00 AM'});
    await window.useNotesStore.getState().addNote({id:'visual-note',type:'long',title:'Visual QA note',body:'<p>Example</p>'});
    await window.useThemeStore.getState().setGentleTransitions(false);
    const canvas=document.createElement('canvas');canvas.width=100;canvas.height=100;
    const ctx=canvas.getContext('2d');ctx.fillStyle='#4779b8';ctx.fillRect(0,0,100,100);ctx.fillStyle='#f5b547';ctx.fillRect(50,0,50,100);
    await window.useThemeStore.getState().setCustomWallpaper(canvas.toDataURL('image/png'));
  });
  for(const theme of ['light','dark']){
    const setGlass=async value=>{
      await go('appearance_'+theme+'_mode',theme);
      const toggle='[data-testid="appearance-glass-toggle"]';
      await page.waitForSelector(toggle,{visible:true});
      if(((await page.$eval(toggle,e=>e.getAttribute('aria-checked')))==='true')!==value)await page.click(toggle);
      await page.waitForFunction(value=>document.documentElement.dataset.glass===String(value),{timeout:10000},value);
      await page.click('[data-testid="appearance-apply"]');await pause(300);
      await go('home_dashboard_'+theme+'_mode',theme);
      await page.waitForSelector('[data-testid="daily-reflection"]');
      return page.$eval('[data-testid="daily-reflection"]',e=>({bg:getComputedStyle(e).backgroundColor,blur:getComputedStyle(e).backdropFilter,last:e.closest('main')?.lastElementChild?.contains(e),x:e.getBoundingClientRect().left,width:e.getBoundingClientRect().width}));
    };
    const off=await setGlass(false);assert.equal(off.blur,'none');assert.match(off.bg,/^rgb\(/);
    await page.screenshot({path:path.join(out,'home-'+theme+'-solid.png')});
    const on=await setGlass(true);assert.match(on.bg,/^rgba\(/);assert.match(on.blur,/blur\(/);assert.equal(on.last,true);assert.ok(on.x>=12&&on.width<=366,JSON.stringify(on));
    await page.screenshot({path:path.join(out,'home-'+theme+'-glass.png')});
    await page.$eval('[data-testid="daily-reflection"]',e=>e.scrollIntoView({block:'center'}));await pause(150);
    await page.screenshot({path:path.join(out,'reflection-'+theme+'.png')});
    console.log('PASS glass toggle and aligned home reflection footer '+theme);
  }
  const registry=await page.evaluate(async()=> (await import('/src/data/screenRegistry.js')).ALL_SCREENS);
  const failures=[];let checked=0;
  for(const screen of registry.filter(s=>!s.id.includes('splash_screen')&&!s.id.includes('personal_setup'))){
    errors.length=0;
    const params=screen.id.includes('task_details')?{taskId:'visual-task'}:screen.id.includes('routine_details')?{routineId:'visual-routine'}:screen.id.includes('note_media')?{noteId:'visual-note'}:screen.id.includes('note_editor')?{isNew:true}:{};
    try{
      await go(screen.id,screen.theme,params);
      const state=await page.evaluate(()=>{
        const root=document.querySelector('.momentum-canvas-viewport'),el=root?.querySelector('[data-screen-key]');
        return {text:(el?.innerText||'').trim().slice(0,200),width:root?.clientWidth,scroll:root?.scrollWidth,viewport:innerWidth};
      });
      await page.screenshot({path:path.join(out,screen.id+'.png')});
      assert.ok(state.text.length>=5&&!/Something went wrong|Screen not found|ReferenceError/.test(state.text),JSON.stringify(state));
      assert.ok(state.scroll<=state.width+2,JSON.stringify(state));
      assert.equal(errors.length,0,errors.join('; '));
      checked++;console.log('PASS '+screen.id);
    }catch(e){failures.push(screen.id+': '+e.message);console.error('FAIL '+failures.at(-1));}
  }
  console.log('Registry screens checked:',checked,'failures:',failures.length,'plus 2 onboarding routes');
  assert.deepEqual(failures,[]);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
