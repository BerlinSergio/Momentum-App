const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('momentumDesktop',Object.freeze({
  platform:'windows',
  notify: (payload)=>ipcRenderer.invoke('momentum:notify',payload),
  ring: (payload)=>ipcRenderer.invoke('momentum:ring',payload),
  reconcile: (keys)=>ipcRenderer.invoke('momentum:reconcile',keys),
  onNotificationClick: (callback)=>{
    if(typeof callback!=='function')return;
    ipcRenderer.on('momentum:notification-click',(_event,data)=>callback(data));
  },
  onAppStateChange:(callback)=>{if(typeof callback==='function')ipcRenderer.on('momentum:app-state',(_event,active)=>callback(active===true));},
  alarmAction:(action)=>ipcRenderer.invoke('momentum:alarm-action',action),
}));
