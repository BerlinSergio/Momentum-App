import { useState,useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import useSecurityStore from '../store/useSecurityStore';
import { validPasscode,validCurrentSecret } from '../utils/credentialService';
import { toast } from './ui/toast/index.js';

export default function PasscodeChangeDialog({isDarkMode,onClose,toPin=false}) {
  const {t}=useTranslation();
  const hasPin=useSecurityStore(s=>s.hasPin);
  const type=useSecurityStore(s=>s.passcodeType);
  const [current,setCurrent]=useState('');
  const [secret,setSecret]=useState('');
  const [confirm,setConfirm]=useState('');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const saving=useRef(false);
  const submit=async e=>{
    e.preventDefault();
    if(saving.current)return;
    if(hasPin && !validCurrentSecret(current,type)){setError(t('security.currentSecretRequired','Enter your current credential.'));return;}
    if(toPin ? !/^\d{4}$/.test(secret) : !validPasscode(secret)){
      setError(toPin?t('security.pinMustBe4Digits','New PIN must be 4 digits.'):t('security.passcodeRequirements','Use 6–128 characters, including letters and numbers.'));return;
    }
    if(secret!==confirm){setError(t('security.passcodeMismatch','Credentials do not match.'));return;}
    saving.current=true;setBusy(true);setError('');
    try {
      const store=useSecurityStore.getState();
      if(!store._hasHydrated || (store.isAppLockActive && store.isLocked) || store.hasPin!==hasPin || store.passcodeType!==type){setError(t('security.saveFailed','Security settings changed. Reopen this dialog.'));return;}
      const result=toPin ? (hasPin?await store.changePin(current,secret):await store.setPin(secret)) :
        (hasPin?await store.changeToPasscode(current,secret):await store.createPasscode(secret));
      if(!result?.success){setError(result?.error||t('security.saveFailed','Security preferences could not be saved.'));return;}
      setCurrent('');setSecret('');setConfirm('');
      toast.success(t('security.credentialSaved','Credential saved. Unlock with your new credential.'));
      onClose();
    }catch{setError(t('security.saveFailed','Security preferences could not be saved.'));}
    finally{saving.current=false;setBusy(false);}
  };
  const inputStyle='w-full p-3 rounded-xl border '+(isDarkMode?'bg-slate-800 border-slate-600 text-white':'bg-white border-slate-300 text-slate-900');
  const input=(id,label,value,set,numeric,autoComplete)=><div className="space-y-1">
    <label htmlFor={id} className="block text-xs font-semibold">{label}</label>
    <input id={id} type="password" inputMode={numeric?'numeric':'text'} maxLength={numeric?4:128}
      autoComplete={autoComplete} value={value} disabled={busy} className={inputStyle}
      onChange={e=>set(numeric?e.target.value.replace(/\D/g,''):e.target.value)} required/>
  </div>;
  return createPortal(<div className="fixed inset-0 z-[10000] bg-black/60 flex items-center justify-center p-4">
    <form role="dialog" aria-modal="true" aria-labelledby="credential-dialog-title" onSubmit={submit}
      className={'w-full max-w-sm max-h-[90dvh] overflow-y-auto rounded-3xl border p-6 space-y-4 '+(isDarkMode?'bg-slate-900 text-white border-slate-700':'bg-white text-slate-900 border-slate-200')}>
      <h3 id="credential-dialog-title" className="font-bold">{toPin?t('security.changePin','Change 4-Digit PIN'):t('security.alphaPasscode','Alphanumeric Passcode')}</h3>
      <p className="text-xs">{toPin?t('security.pinMustBe4Digits','New PIN must be 4 digits.'):t('security.passcodeRequirements','Use 6–128 characters, including letters and numbers.')}</p>
      {hasPin&&input('current-secret',type==='alphanumeric'?t('security.currentPasscode','Current passcode'):t('security.enterCurrentPin','Current PIN'),current,setCurrent,type!=='alphanumeric','current-password')}
      {input('new-secret',t('security.newCredential','New credential'),secret,setSecret,toPin,'new-password')}
      {input('confirm-secret',t('security.confirmCredential','Confirm new credential'),confirm,setConfirm,toPin,'new-password')}
      {error&&<p role="alert" className="text-red-500 text-xs">{error}</p>}
      <button type="submit" disabled={busy} className="w-full p-3 rounded-xl bg-primary text-white font-semibold disabled:opacity-50">{busy?t('common.saving','Saving…'):t('common.save','Save')}</button>
      <button type="button" disabled={busy} onClick={onClose} className="w-full p-2 text-sm">{t('common.cancel','Cancel')}</button>
    </form>
  </div>,document.body);
}
