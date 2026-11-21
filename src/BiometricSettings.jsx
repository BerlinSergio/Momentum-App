import { useTranslation } from 'react-i18next';
import { useSecurityStore } from './store/useSecurityStore';
import LiquidButton from './components/ui/LiquidButton';
import { toast } from './components/ui/toast/index.js';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export default function BiometricSettings({
  setActiveTab
}) {
  const { t } = useTranslation();
  const {
    isAppLockActive,
    lockReflections,
    biometricsEnabled,
    hasPin,
    setAppLockActive,
    setLockReflections,
    setBiometricsEnabled,
    updatePreferences,
  } = useSecurityStore();
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none font-body-md text-on-surface antialiased flex flex-col min-h-screen selection:bg-primary-container selection:text-on-primary-container",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 inset-x-0 z-50 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between relative",
        children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
          variant: "icon",
          "aria-label": "Go back",
          className: "min-w-[44px] min-h-[44px] w-11 h-11 -ml-space-xs rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none active:scale-95 transition-all",
          onClick: () => setActiveTab('applock'),
          type: "button",
          children: /*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "arrow_back_ios_new"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute inset-x-16 flex items-center justify-center pointer-events-none",
          children: /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight truncate select-none",
            children: "Security & Biometrics"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "More options",
            className: "min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none active:scale-95 transition-all",
            type: "button",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "more_vert"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex flex-col flex-1 relative w-full pt-16 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full",
        children: /*#__PURE__*/_jsxDEV("div", {
          className: "px-gutter-mobile flex flex-col space-y-space-lg pb-space-xl",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col items-center text-center pt-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "relative flex items-center justify-center mb-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "absolute -inset-2 rounded-full bg-gradient-to-tr from-secondary/20 via-primary-container/25 to-tertiary/20 blur-xl opacity-80 pointer-events-none"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "relative w-20 h-20 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl flex items-center justify-center shadow-xl",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center -space-x-1.5 text-secondary",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[32px] drop-shadow-[0_0_12px_rgba(76,215,246,0.6)]",
                    children: "face"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[30px] text-primary drop-shadow-[0_0_12px_rgba(192,193,255,0.6)]",
                    children: "fingerprint"
                  }, void 0, false)]
                }, void 0, true)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-space-xs shadow-[0_0_16px_rgba(76,215,246,0.15)]",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[13px]",
                style: {
                  fontVariationSettings: "'FILL' 1"
                },
                children: "verified_user"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm tracking-widest uppercase",
                children: biometricsEnabled ? "BIOMETRIC PROTECTION ACTIVE" : "BIOMETRIC PROTECTION PAUSED"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("h2", {
              className: "font-headline-md text-headline-md text-on-surface tracking-tight mt-space-xs",
              children: biometricsEnabled ? "Biometric Protection Active" : "Biometric Protection Paused"
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-md text-body-md text-on-surface dark:text-on-surface-variant max-w-xs mt-space-xs",
              children: biometricsEnabled ? "Unlock Momentum instantly using Face ID or Touch ID sensor on this device." : "Biometric unlock is currently disabled. Momentum will require your PIN."
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "w-full rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-lg space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-start justify-between gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0 pr-space-xs",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-on-surface ",
                  children: "Enable Biometric Authentication"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                  children: "Platform Biometric Authentication (WebAuthn)"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                "aria-checked": biometricsEnabled,
                className: `relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none ${biometricsEnabled ? 'bg-gradient-to-r from-primary-container to-inverse-primary shadow-[0_0_14px_rgba(128,131,255,0.45)]' : 'bg-slate-300'}`,
                role: "switch",
                type: "button",
                onClick: () => setBiometricsEnabled(!biometricsEnabled),
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: `pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-md transition-transform mt-1 ml-0.5 ${biometricsEnabled ? 'translate-x-6 bg-on-background' : 'translate-x-1 bg-outline'}`
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs pt-space-xs",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-secondary text-[14px]",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-secondary tracking-normal",
                children: biometricsEnabled ? "Biometric authentication configured and active" : "Biometric authentication currently switched off"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-lg space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-tertiary text-[22px]",
                  children: "pin"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-on-surface ",
                  children: "Fallback Mechanism"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "px-2.5 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                children: hasPin ? "Configured (••••)" : "Not Set"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant leading-relaxed",
              children: "Whenever lighting conditions are dim, sensors fail, or the device restarts, your configured PIN will automatically serve as the fallback unlock method."
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none active:scale-[0.98] transition-all px-space-md py-space-sm flex items-center justify-between text-on-surface shadow-sm",
              type: "button",
              variant: "none",
              onClick: () => setActiveTab && setActiveTab('pin_setup_change_dark_mode'),
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-secondary text-[18px]",
                  children: "edit_note"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "Verify or Change Backup PIN"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-on-surface dark:text-on-surface-variant text-[18px]",
                children: "chevron_right"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between px-space-xs",
              children: [/*#__PURE__*/_jsxDEV("h3", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "Selective Biometric Gates"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm",
                children: "2 Checkpoints"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-lg divide-y divide-surface-variant/30 overflow-hidden",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "p-space-md flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-md min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0 text-primary",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "power_settings_new"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-lg text-body-lg text-on-surface truncate",
                      children: "Unlock App on Launch"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                      children: "Requires Face/Touch ID every session"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  variant: "primary",
                  "aria-checked": isAppLockActive,
                  className: `gate-toggle relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none ${isAppLockActive ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-slate-300'}`,
                  role: "switch",
                  type: "button",
                  onClick: () => setAppLockActive(!isAppLockActive),
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: `pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-md transition-transform mt-1 ${isAppLockActive ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}`
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "p-space-md flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-md min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0 text-tertiary",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "auto_stories"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-lg text-body-lg text-on-surface truncate",
                      children: "Access Sacred Journal & Deep Notes"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                      children: "Shield personal inner reflections"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  variant: "primary",
                  "aria-checked": lockReflections,
                  className: `gate-toggle relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none ${lockReflections ? 'bg-gradient-to-r from-primary-container to-inverse-primary' : 'bg-slate-300'}`,
                  role: "switch",
                  type: "button",
                  onClick: () => setLockReflections(!lockReflections),
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: `pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-md transition-transform mt-1 ${lockReflections ? 'translate-x-6 bg-on-background ml-0.5' : 'translate-x-1 bg-outline'}`
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "pt-space-xs",
            children: /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-secondary-container via-primary-container to-tertiary-container p-px shadow-[0_0_24px_rgba(76,215,246,0.25)] active:scale-[0.99] transition-all",
              id: "save-preferences-btn",
              type: "button",
              variant: "primary",
              onClick: () => { updatePreferences({ biometricsEnabled, isAppLockActive, lockReflections }); toast.success(t('toasts.appLockSaved', 'App Lock preferences saved')); },
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "w-full h-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-sm rounded-[11px] py-3.5 px-space-md flex items-center justify-center gap-2 group-hover:bg-transparent transition-all",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-lg text-label-lg text-on-primary font-semibold tracking-wide",
                  children: "Save Biometric Preferences"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-on-primary text-[18px] transition-transform group-hover:translate-x-1",
                  children: "arrow_forward"
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
}