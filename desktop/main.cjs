'use strict';
const {app,BrowserWindow,protocol,net,session,ipcMain,Tray,Menu,Notification,nativeImage,powerMonitor}=require('electron');
const path=require('node:path');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');
const {AlarmQueue}=require('./alarm.cjs');
const origin='momentum://app';
const root=path.join(__dirname,'dist');
const smoke=process.argv.includes('--momentum-smoke-test');
app.setName('Momentum');
app.setAppUserModelId('com.momentum.app');
app.setPath('userData',smoke?path.join(app.getPath('temp'),'Momentum-Smoke-'+process.pid):path.join(app.getPath('appData'),'Momentum'));
if(smoke||process.argv.includes('--disable-gpu'))app.disableHardwareAcceleration();
app.commandLine.appendSwitch('autoplay-policy','no-user-gesture-required');
protocol.registerSchemesAsPrivileged([{scheme:'momentum',privileges:{standard:true,secure:true,supportFetchAPI:true,corsEnabled:true}}]);
let win,alarmWin,tray,quitting=false,language='en',timer;
const icon=path.join(__dirname,'icon.ico');
const allowed=(url,alarm=false)=>{try{const u=new URL(url);return u.protocol==='momentum:'&&u.hostname==='app'&&(alarm?u.pathname==='/desktop-alarm.html':u.pathname!=='/desktop-alarm.html');}catch{return false;}};
function show(){if(!win||win.isDestroyed())return;if(win.isMinimized())win.restore();win.show();win.focus();}
function guard(w,alarm=false){
 w.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 w.webContents.on('will-navigate',(e,url)=>{if(!allowed(url,alarm))e.preventDefault();});
 w.webContents.on('will-attach-webview',e=>e.preventDefault());
}
function prefs(){return {preload:path.join(__dirname,'preload.cjs'),nodeIntegration:false,contextIsolation:true,sandbox:true,webSecurity:true,backgroundThrottling:false};}
function alarmUI(active){
 if(!active){if(alarmWin&&!alarmWin.isDestroyed())alarmWin.destroy();alarmWin=null;return;}
 if(alarmWin&&!alarmWin.isDestroyed())return;
 alarmWin=new BrowserWindow({width:420,height:250,resizable:false,minimizable:false,maximizable:false,alwaysOnTop:true,skipTaskbar:false,autoHideMenuBar:true,icon,webPreferences:prefs()});
 guard(alarmWin,true);
 alarmWin.on('close',e=>{if(!quitting){e.preventDefault();queue.action('stop');}});
 alarmWin.loadURL(origin+'/desktop-alarm.html?lang='+encodeURIComponent(language));
}
const queue=new AlarmQueue({emit:alarmUI});
function fromMain(e){return !!win&&!win.isDestroyed()&&e.sender===win.webContents&&e.senderFrame===win.webContents.mainFrame&&allowed(e.senderFrame.url);}
function fromAlarm(e){return !!alarmWin&&!alarmWin.isDestroyed()&&e.sender===alarmWin.webContents&&e.senderFrame===alarmWin.webContents.mainFrame&&allowed(e.senderFrame.url,true);}
function clean(v,n){return typeof v==='string'?v.slice(0,n):'';}
const notifications=new Set();
ipcMain.handle('momentum:notify',(e,p)=>{
 if(!fromMain(e)||!p||!Notification.isSupported())return false;
 const title=clean(p.title,140),body=clean(p.body,240);
 if(!title)return false;
 const n=new Notification({title,body,silent:p.quiet===true,icon:nativeImage.createFromPath(icon)});
 notifications.add(n);const cleanup=()=>notifications.delete(n);
 n.on('close',cleanup);n.on('failed',cleanup);
 n.on('click',()=>{show();if(win&&!win.isDestroyed())win.webContents.send('momentum:notification-click',clean(p.id,250));cleanup();});
 n.show();return true;
});
ipcMain.handle('momentum:ring',(e,p)=>{
 if(!fromMain(e)||!p)return false;
 language=['en','fa-AF','ps-AF'].includes(p.language)?p.language:'en';
 return queue.add(p.id)||queue.entries.has(p.id);
});
ipcMain.handle('momentum:reconcile',(e,keys)=>{
 if(!fromMain(e)||!Array.isArray(keys)||keys.length>5000||keys.some(k=>typeof k!=='string'||k.length>250))return false;
 queue.reconcile(keys);return true;
});
ipcMain.handle('momentum:alarm-action',(e,action)=>fromAlarm(e)&&queue.action(action));
if(!app.requestSingleInstanceLock()){app.quit();}else{
 app.on('second-instance',show);
 app.on('before-quit',()=>{quitting=true;clearInterval(timer);queue.clear();tray?.destroy();});
 app.whenReady().then(async()=>{
  protocol.handle('momentum',req=>{
    try{
      const u=new URL(req.url);
      if(u.hostname!=='app'||req.method!=='GET')return new Response('Not found',{status:404});
      if(u.pathname==='/desktop-alarm.html')return net.fetch(pathToFileURL(path.join(__dirname,'alarm.html')).href);
      const name=decodeURIComponent(u.pathname);
      if(name.includes('\\')||name.includes('\0'))return new Response('Not found',{status:404});
      const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
      const relative=path.relative(root,file);
      if(relative.startsWith('..')||path.isAbsolute(relative)||!fs.existsSync(file)||!fs.statSync(file).isFile())return new Response('Not found',{status:404});
      return net.fetch(pathToFileURL(file).href);
    }catch{return new Response('Not found',{status:404});}
  });
  session.defaultSession.setPermissionRequestHandler((_wc,_permission,cb)=>cb(false));
  session.defaultSession.setPermissionCheckHandler(()=>false);
  win=new BrowserWindow({width:1150,height:760,minWidth:740,minHeight:540,show:!smoke,autoHideMenuBar:true,icon,backgroundColor:'#151326',webPreferences:prefs()});
  guard(win);
  let active=true;
  const state=value=>{if(active===value||win.isDestroyed())return;active=value;win.webContents.send('momentum:app-state',value);};
  win.on('blur',()=>state(false));win.on('focus',()=>state(true));win.on('hide',()=>state(false));win.on('minimize',()=>state(false));
  powerMonitor.on('lock-screen',()=>state(false));powerMonitor.on('unlock-screen',()=>{if(win.isFocused())state(true);});
  win.on('close',e=>{if(!quitting&&!smoke){e.preventDefault();win.hide();}});
  win.webContents.on('render-process-gone',()=>{if(smoke)app.exit(1);});
  if(!smoke){
    tray=new Tray(icon);tray.setToolTip('Momentum — Open / Exit');
    tray.setContextMenu(Menu.buildFromTemplate([{label:'Open Momentum',click:show},{label:'Exit Momentum',click:()=>app.quit()}]));
    tray.on('double-click',show);
  }
  timer=setInterval(()=>queue.tick(),1000);
  powerMonitor.on('resume',()=>queue.tick());
  await win.loadURL(origin+'/');
  if(smoke){
    const deadline=Date.now()+90000;
    let result;
    while(Date.now()<deadline){
      result=await win.webContents.executeJavaScript("({ready:!!document.querySelector('[data-app-startup-ready=true]'),secure:isSecureContext,db:typeof indexedDB!=='undefined',crypto:!!crypto.subtle,bridge:window.momentumDesktop?.platform==='windows'})");
      if(Object.values(result).every(Boolean))break;
      await new Promise(r=>setTimeout(r,1000));
    }
    if(!result||!Object.values(result).every(Boolean))throw Error('Desktop startup/storage smoke failed');
    fs.writeFileSync(process.env.MOMENTUM_SMOKE_REPORT||path.join(app.getPath('temp'),'momentum-smoke.json'),JSON.stringify(result,null,2));
    app.quit();
  }
 }).catch(err=>{console.error(err);app.exit(1);});
}
