import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { MomentumDevice } from '../utils/nativeFileExport.js';
import { useTasbeehStore } from '../store/useTasbeehStore.js';
import { useNavigationStore } from '../store/useNavigationStore.js';
import useSecurityStore, { useSecuritySessionGate } from '../store/useSecurityStore.js';

let nativeQueue = Promise.resolve();
let owner = 0;
function configureCapture(enabled) {
  nativeQueue = nativeQueue.catch(()=>{}).then(() => MomentumDevice.setVolumeCapture({enabled}));
  return nativeQueue;
}
function allowed() {
  const security = useSecurityStore.getState();
  const tasbeeh = useTasbeehStore.getState();
  return security._hasHydrated && tasbeeh._hasHydrated &&
    !useSecuritySessionGate.getState().restartRequired &&
    !(security.hasPin && security.isAppLockActive && security.isLocked) &&
    /^tasbeeh_main(?:_|$)/.test(useNavigationStore.getState().activeTab || '') &&
    (tasbeeh.volumeKeysEnabled ?? tasbeeh.volumeKeys ?? false) &&
    !tasbeeh.roundComplete && document.visibilityState === 'visible' &&
    !document.querySelector('[aria-modal="true"]');
}
function count() {
  if (!allowed()) return;
  Promise.resolve(useTasbeehStore.getState().increment()).catch(error => console.error('[Tasbeeh] Count not saved',error));
}

export function useTasbeehVolumeKeys(enabled) {
  useEffect(() => {
    if (!enabled) return;
    if (Capacitor.getPlatform() !== 'android') {
      const onKey = event => {
        if (event.repeat || event.target?.closest?.('input,textarea,select,[contenteditable="true"]')) return;
        if (['AudioVolumeUp','AudioVolumeDown','ArrowUp','ArrowDown'].includes(event.key) && allowed()) {
          event.preventDefault(); count();
        }
      };
      window.addEventListener('keydown',onKey);
      return () => window.removeEventListener('keydown',onKey);
    }
    const id = ++owner;
    let active = true, foreground = true, listening = false, lastCapture = null;
    const sync = () => {
      if (id !== owner) return;
      const capture = Boolean(active && foreground && listening && allowed());
      if (capture === lastCapture) return;
      lastCapture = capture;
      configureCapture(capture).catch(error=>{lastCapture=null;console.warn('[Tasbeeh] Volume capture unavailable',error);});
    };
    const listener = MomentumDevice.addListener('volumePress', () => {if (active && id===owner) count();});
    listener.then(() => {listening=true;sync();}).catch(error=>console.warn('[Tasbeeh] Native volume listener unavailable',error));
    const lifecycle = App.addListener('appStateChange', state => {foreground=state.isActive;lastCapture=null;sync();});
    lifecycle.catch(error=>console.warn('[Tasbeeh] App state listener unavailable',error));
    const unsub = [useNavigationStore,useSecurityStore,useSecuritySessionGate,useTasbeehStore].map(store=>store.subscribe(sync));
    document.addEventListener('visibilitychange',sync);
    // Do not consume system volume while any in-app dialog is open.
    const observer = new MutationObserver(sync);
    observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['aria-modal']});
    sync();
    return () => {
      active=false; observer.disconnect(); unsub.forEach(fn=>fn());
      document.removeEventListener('visibilitychange',sync);
      if (id===owner) {++owner;configureCapture(false).catch(()=>{});}
      listener.then(handle=>handle.remove()).catch(()=>{});
      lifecycle.then(handle=>handle.remove()).catch(()=>{});
    };
  }, [enabled]);
}
