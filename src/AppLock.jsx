import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";
export default function AppLock({
  setActiveTab
}) {
  const [masterToggle, setMasterToggle] = useState(true);
  const [biometricsToggle, setBiometricsToggle] = useState(true);
  const [hideMultitaskingToggle, setHideMultitaskingToggle] = useState(true);
  const [lockTiming, setLockTiming] = useState('immediate');
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1800);
  };
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface font-body-md text-body-md flex flex-col min-h-screen",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "icon",
            "aria-label": "Go back",
            className: "w-11 h-11 -ml-2 rounded-full flex items-center justify-center text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none transition-colors",
            onClick: () => setActiveTab('dashboard'),
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "arrow_back_ios_new"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight truncate max-w-[220px]",
            children: "App Lock — Dark Mode"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Actions",
            className: "w-11 h-11 rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "more_vert"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative w-full pt-16 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full px-gutter-mobile pb-12 space-y-space-lg",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-xl",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-primary/5 pointer-events-none flex items-center justify-center",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[110px] text-surface-tint/10 select-none",
              children: "lock"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between gap-space-sm mb-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"
                }, void 0, false), "Vault Active"]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                children: "Momentum Shield v1.0"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "primary",
              "aria-checked": masterToggle,
              className: `relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${masterToggle ? 'bg-primary-container' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
              role: "switch",
              type: "button",
              onClick: () => setMasterToggle(!masterToggle),
              children: /*#__PURE__*/_jsxDEV("span", {
                className: `pointer-events-none inline-flex h-6 w-6 transform items-center justify-center rounded-full ${masterToggle ? 'bg-on-primary translate-x-5' : 'bg-on-surface-variant translate-x-0'} shadow transition duration-200 ease-in-out`,
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: `material-symbols-outlined text-[13px] ${masterToggle ? 'text-primary' : 'text-surface'}`,
                  children: "lock"
                }, void 0, false)
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-start gap-space-md mb-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary shadow-inner",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[26px]",
                style: {
                  fontVariationSettings: "'FILL' 1"
                },
                children: "shield_lock"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "min-w-0",
              children: [/*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "App Lock is Active"
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-1",
                children: "Your spiritual journals, reflective notes, personal finances, and intentional schedules are encrypted with biometric security."
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-2 gap-space-sm pt-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-2.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px] text-secondary",
                children: "verified_user"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0",
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase",
                  children: "Encrypted State"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-md text-label-md text-on-surface truncate",
                  children: "AES-256 GCM"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-2.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px] text-primary",
                children: "key"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0",
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase",
                  children: "Secure Enclave"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-md text-label-md text-on-surface truncate",
                  children: "Hardware Bound"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("h3", {
              className: "font-headline-sm text-headline-sm text-on-surface ",
              children: "Authentication Methods"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant",
              children: "2 Methods Configured"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-md shadow-md space-y-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[22px]",
                    children: "fingerprint"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("h4", {
                    className: "font-label-lg text-label-lg text-on-surface truncate",
                    children: "Biometrics (Face / Fingerprint)"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: "Instant entry upon opening Momentum"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                "aria-checked": biometricsToggle,
                className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${biometricsToggle ? 'bg-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                role: "switch",
                type: "button",
                onClick: () => setBiometricsToggle(!biometricsToggle),
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: `pointer-events-none inline-block h-5 w-5 transform rounded-full ${biometricsToggle ? 'bg-on-primary translate-x-5' : 'bg-on-surface-variant translate-x-0'} shadow transition duration-200`
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-2.5 flex items-start gap-2",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px] text-on-surface dark:text-on-surface-variant mt-0.5 shrink-0",
                children: "info"
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant leading-relaxed",
                children: "Requires your backup PIN whenever biometrics fail, after device reboot, or after 72 hours of inactivity."
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-md shadow-md space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 text-secondary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[22px]",
                    children: "pin"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("h4", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "PIN Protection"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-label-md text-label-md text-secondary flex items-center gap-1.5 mt-0.5",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "w-1.5 h-1.5 rounded-full bg-secondary"
                    }, void 0, false), "Active (••••)"]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary/15 text-secondary",
                children: "Primary Backup"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors text-left group",
                type: "button",
                variant: "none",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px] text-on-surface dark:text-on-surface-variant group-hover:text-primary transition-colors",
                    children: "edit_square"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Change 4-Digit PIN"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px] text-on-surface dark:text-on-surface-variant",
                  children: "chevron_right"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors text-left group",
                type: "button",
                variant: "none",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px] text-on-surface dark:text-on-surface-variant group-hover:text-primary transition-colors",
                    children: "password"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface ",
                    children: "Switch to Alphanumeric Passcode"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px] text-on-surface dark:text-on-surface-variant",
                  children: "chevron_right"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            children: [/*#__PURE__*/_jsxDEV("h3", {
              className: "font-headline-sm text-headline-sm text-on-surface ",
              children: "Lock Timing & Trigger"
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5",
              children: "Specify how swiftly Momentum re-secures your data"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-sm space-y-1 shadow-md",
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: `flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${lockTiming === 'immediate' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0' : 'hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
              onClick: () => setLockTiming('immediate'),
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "Immediately upon exiting"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-secondary",
                  children: "Maximum protection recommended"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: `w-5 h-5 rounded-full shrink-0 flex items-center justify-center ${lockTiming === 'immediate' ? 'bg-primary shadow-sm' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                children: lockTiming === 'immediate' && /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px] text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("label", {
              className: `flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${lockTiming === '1min' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0' : 'hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
              onClick: () => setLockTiming('1min'),
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "After 1 minute in background"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Balanced for multi-tasking"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: `w-5 h-5 rounded-full shrink-0 flex items-center justify-center ${lockTiming === '1min' ? 'bg-primary shadow-sm' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                children: lockTiming === '1min' && /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px] text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("label", {
              className: `flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${lockTiming === '5min' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0' : 'hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
              onClick: () => setLockTiming('5min'),
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "After 5 minutes in background"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Convenient during continuous sessions"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: `w-5 h-5 rounded-full shrink-0 flex items-center justify-center ${lockTiming === '5min' ? 'bg-primary shadow-sm' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                children: lockTiming === '5min' && /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px] text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("label", {
              className: `flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${lockTiming === 'deviceLock' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0' : 'hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
              onClick: () => setLockTiming('deviceLock'),
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "font-label-lg text-label-lg text-on-surface ",
                  children: "When device locks"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Matches OS display power-off"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: `w-5 h-5 rounded-full shrink-0 flex items-center justify-center ${lockTiming === 'deviceLock' ? 'bg-primary shadow-sm' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
                children: lockTiming === 'deviceLock' && /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px] text-on-primary",
                  children: "check"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-md shadow-md flex items-center justify-between gap-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "min-w-0",
              children: [/*#__PURE__*/_jsxDEV("h4", {
                className: "font-label-lg text-label-lg text-on-surface ",
                children: "Hide App Screen in Multitasking"
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                children: "Blurs app preview snapshot in recent apps carousel"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "primary",
              "aria-checked": hideMultitaskingToggle,
              className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${hideMultitaskingToggle ? 'bg-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
              role: "switch",
              type: "button",
              onClick: () => setHideMultitaskingToggle(!hideMultitaskingToggle),
              children: /*#__PURE__*/_jsxDEV("span", {
                className: `pointer-events-none inline-block h-5 w-5 transform rounded-full ${hideMultitaskingToggle ? 'bg-on-primary translate-x-5' : 'bg-on-surface-variant translate-x-0'} shadow transition duration-200`
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "pt-space-xs space-y-space-sm text-center",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-full h-12 rounded-xl bg-gradient-to-r from-primary-container to-tertiary-container text-on-primary font-label-lg text-label-lg shadow-[0_0_24px_rgba(128,131,255,0.3)] hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2",
            type: "button",
            onClick: handleSave,
            variant: "primary",
            children: isSaved ? /*#__PURE__*/_jsxDEV(_Fragment, {
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px] text-on-primary",
                children: "check_circle"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Preferences Saved"
              }, void 0, false)]
            }, void 0, true) : /*#__PURE__*/_jsxDEV(_Fragment, {
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "Save Security Preferences"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "arrow_forward"
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
            className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant/80",
            children: "Last modified: Today at 07:42 AM"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
}