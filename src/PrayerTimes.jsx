import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const PrayerTimes = () => {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "fixed inset-0 pointer-events-none z-0 overflow-hidden",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "absolute -top-32 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-primary-fixed/40 to-tertiary-fixed/30 blur-3xl opacity-70"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-gradient-to-bl from-secondary-fixed/40 to-primary-fixed/20 blur-3xl opacity-60"
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-margin flex items-center justify-between bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-[0_4px_12px_rgba(42,73,223,0.25)]",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[20px]",
              children: "stream"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-headline-md text-headline-md tracking-tight text-on-surface ",
            children: "Momentum"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Notifications",
            className: "w-11 h-11 rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
            type: "button",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "notifications"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_2px_8px_rgba(42,73,223,0.3)]",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative w-full px-margin pt-16 pb-[120px] bg-transparent z-10",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full gap-space-md",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-start justify-between gap-space-sm pt-space-xs",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col min-w-0",
            children: [/*#__PURE__*/_jsxDEV("h1", {
              className: "font-headline-lg text-headline-lg tracking-tight text-on-surface ",
              children: "Prayer Times"
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5",
              children: "Stay connected to your spiritual rhythm"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Notification Settings",
            className: "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-sm hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            type: "button",
            variant: "pill",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-secondary text-[16px]",
              children: "notifications_active"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface font-medium",
              children: "Alerts On"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "rounded-DEFAULT bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-3xl p-space-md shadow-[0_10px_30px_-5px_rgba(80,110,180,0.08)] flex flex-col gap-2.5",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1.5 min-w-0",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-primary text-[18px] shrink-0",
                children: "location_on"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface truncate",
                children: "Kabul, Afghanistan"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed shrink-0",
                children: "Auto"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-secondary shrink-0",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[15px]",
                children: "explore"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-semibold",
                children: "247° WSW"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between text-on-surface dark:text-on-surface-variant font-body-sm text-body-sm pt-1 border-t border-surface-variant/40",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[15px] text-tertiary",
                children: "calendar_today"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Saturday, Oct 24, 2026"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "font-label-md text-label-md text-on-surface font-medium",
              children: "13 Rabi' al-Thani 1448 AH"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "relative overflow-hidden rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-3xl p-space-lg shadow-[0_18px_36px_-6px_rgba(42,73,223,0.14)]",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -right-2 -bottom-2 w-48 h-48 opacity-[0.09] pointer-events-none text-primary",
            children: /*#__PURE__*/_jsxDEV("svg", {
              className: "w-full h-full",
              fill: "currentColor",
              viewBox: "0 0 200 200",
              children: [/*#__PURE__*/_jsxDEV("path", {
                d: "M100 20 C95 40 85 55 85 70 L85 180 L115 180 L115 70 C115 55 105 40 100 20 Z"
              }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                d: "M50 75 C45 90 40 100 40 115 L40 180 L60 180 L60 115 C60 100 55 90 50 75 Z"
              }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                d: "M150 75 C145 90 140 100 140 115 L140 180 L160 180 L160 115 C160 100 155 90 150 75 Z"
              }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                d: "M70 120 C70 95 130 95 130 120 L130 180 L70 180 Z"
              }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
                cx: "100",
                cy: "15",
                r: "4"
              }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
                cx: "50",
                cy: "70",
                r: "3"
              }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
                cx: "150",
                cy: "70",
                r: "3"
              }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                d: "M98 5 Q100 0 102 5 L102 12 L98 12 Z"
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute -top-12 -left-12 w-36 h-36 rounded-full bg-gradient-to-tr from-primary-fixed/30 to-tertiary-fixed/30 blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative z-10 flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between mb-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/80",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-2 h-2 rounded-full bg-primary animate-pulse"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm font-bold tracking-wider text-on-primary-fixed uppercase",
                  children: "Next Prayer"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] text-tertiary",
                  children: "graphic_eq"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Adhan in Kabul"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-baseline justify-between mt-1 mb-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-display-lg text-display-lg text-on-surface tracking-tight block",
                  children: "Dhuhr"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Midday Prayer • 4 Rak'ahs"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "text-right",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-metric-lg text-metric-lg text-primary tracking-tight block",
                  children: "01:05 PM"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary font-medium",
                  children: "Solar Zenith Passed"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "rounded-DEFAULT bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-sm flex items-center justify-around text-center mb-space-md shadow-[inset_0_1px_3px_rgba(255,255,255,0.7)]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col items-center",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-12 h-10 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shadow-sm",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-lg text-headline-lg text-on-surface ",
                    id: "hours-val",
                    children: "02"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-1",
                  children: "Hours"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-md text-headline-md text-primary pb-4 font-bold",
                children: ":"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col items-center",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-12 h-10 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shadow-sm",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-lg text-headline-lg text-on-surface ",
                    id: "mins-val",
                    children: "14"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-1",
                  children: "Mins"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-md text-headline-md text-primary pb-4 font-bold",
                children: ":"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col items-center",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-12 h-10 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shadow-sm",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-lg text-headline-lg text-primary",
                    id: "secs-val",
                    children: "32"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-1",
                  children: "Secs"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full py-2.5 px-space-md rounded-DEFAULT bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_-2px_rgba(42,73,223,0.35)] active:scale-[0.99] transition-transform",
              type: "button",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "alarm_on"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Notification Active (15m before)"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col gap-2",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-1",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-headline-sm text-headline-sm text-on-surface ",
              children: "Canonical Prayers"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
              children: "5 Obligatory"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "rounded-DEFAULT bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md flex items-center justify-between shadow-[0_4px_16px_rgba(30,45,90,0.04)] transition-all",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-10 h-10 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-primary shrink-0 shadow-inner",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[22px]",
                  children: "wb_twilight"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "font-headline-md text-headline-md text-on-surface truncate",
                  children: "Fajr"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "Dawn prayer"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md shrink-0",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "text-right",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-on-surface block",
                  children: "05:12 AM"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "inline-flex items-center gap-0.5 font-label-sm text-label-sm text-tertiary font-medium",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[13px]",
                    children: "check_circle"
                  }, void 0, false), " Completed"]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "rounded-DEFAULT bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-3xl p-space-md flex items-center justify-between shadow-[0_12px_28px_rgba(42,73,223,0.12)] relative overflow-hidden ring-2 ring-primary/20",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-secondary to-tertiary"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0 pl-1",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0 shadow-sm",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[22px]",
                  children: "sunny"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-md text-headline-md text-on-surface font-bold truncate",
                    children: "Dhuhr"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-primary text-[17px] animate-pulse",
                    children: "campaign"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "Midday prayer"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md shrink-0",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "text-right",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-primary font-bold block",
                  children: "01:05 PM"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "px-2 py-0.5 rounded-full bg-primary-fixed-dim text-on-primary-fixed font-label-sm text-label-sm font-semibold",
                  children: "Next • In 2h 14m"
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "rounded-DEFAULT bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md flex items-center justify-between shadow-[0_4px_16px_rgba(30,45,90,0.04)] transition-all",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-10 h-10 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-secondary shrink-0 shadow-inner",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[22px]",
                  children: "wb_sunny"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "font-headline-md text-headline-md text-on-surface truncate",
                  children: "Asr"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "Late afternoon prayer"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md shrink-0",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "text-right",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-on-surface block",
                  children: "04:28 PM"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-end gap-1 font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "notifications_none"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: "Upcoming"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "rounded-DEFAULT bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md flex items-center justify-between shadow-[0_4px_16px_rgba(30,45,90,0.04)] transition-all",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-10 h-10 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-tertiary shrink-0 shadow-inner",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[22px]",
                  children: "wb_twilight"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "font-headline-md text-headline-md text-on-surface truncate",
                  children: "Maghrib"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "Sunset prayer"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md shrink-0",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "text-right",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-on-surface block",
                  children: "05:42 PM"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-end gap-1 font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "notifications_none"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: "Upcoming"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "rounded-DEFAULT bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md flex items-center justify-between shadow-[0_4px_16px_rgba(30,45,90,0.04)] transition-all",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-10 h-10 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-secondary shrink-0 shadow-inner",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[22px]",
                  children: "nights_stay"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "font-headline-md text-headline-md text-on-surface truncate",
                  children: "Isha"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "Night prayer"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md shrink-0",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "text-right",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-on-surface block",
                  children: "07:15 PM"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-end gap-1 font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "notifications_none"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: "Upcoming"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col gap-2",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "font-headline-sm text-headline-sm text-on-surface px-1",
            children: "Sun & Twilight Reference"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-3 gap-2",
            children: [/*#__PURE__*/_jsxDEV(GlassCard, {
              className: "rounded-DEFAULT bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-sm flex flex-col items-center text-center shadow-[0_4px_16px_rgba(30,45,90,0.04)]",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-primary text-[20px] mb-1",
                children: "wb_sunny"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant leading-tight",
                children: "Sunrise / Shuruq"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface font-semibold mt-1",
                children: "06:31 AM"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "rounded-DEFAULT bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-sm flex flex-col items-center text-center shadow-[0_4px_16px_rgba(30,45,90,0.04)]",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-secondary text-[20px] mb-1",
                children: "bedtime"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant leading-tight",
                children: "Midnight / Nisf"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface font-semibold mt-1",
                children: "12:14 AM"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "rounded-DEFAULT bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-sm flex flex-col items-center text-center shadow-[0_4px_16px_rgba(30,45,90,0.04)]",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-tertiary text-[20px] mb-1",
                children: "auto_awesome"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant leading-tight",
                children: "Tahajjud Third"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface font-semibold mt-1",
                children: "03:45 AM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "rounded-lg bg-gradient-to-br from-surface-container-lowest via-surface-container-low to-secondary-fixed/30 backdrop-blur-3xl p-space-lg shadow-[0_12px_32px_rgba(102,59,210,0.08)] flex flex-col gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shadow-sm",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "spa"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm font-bold tracking-wider text-secondary uppercase",
              children: "Daily Spiritual Contemplation"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("blockquote", {
            className: "font-body-lg text-body-lg text-on-surface italic leading-relaxed pt-1",
            children: "\"Guard strictly your habit of prayers, especially the middle prayer, and stand before Allah in profound devotion.\""
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between pt-1",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm font-medium text-on-surface dark:text-on-surface-variant",
              children: "— Surah Al-Baqarah 2:238"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              "aria-label": "Save Verse",
              className: "w-8 h-8 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-primary transition-colors shadow-sm",
              type: "button",
              variant: "primary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px]",
                children: "bookmark_border"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("nav", {
      className: "fixed bottom-0 w-full z-50 pb-safe pointer-events-none",
      "data-active-classes": "text-primary font-label-md",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "w-[calc(100%-2rem)] max-w-md mx-auto mb-6 pointer-events-auto",
        children: /*#__PURE__*/_jsxDEV("div", {
          className: "relative bg-white/80 backdrop-blur-3xl rounded-full px-space-xs py-space-xs shadow-[0_16px_40px_rgba(30,45,90,0.12)] flex items-center justify-between",
          children: [/*#__PURE__*/_jsxDEV("a", {
            className: "flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-all",
            "data-path": "home",
            href: "#",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "home"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm mt-0.5",
              children: "Home"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
            className: "flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-all",
            "data-path": "finance",
            href: "#",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "account_balance_wallet"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm mt-0.5",
              children: "Finance"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative -top-5 flex items-center justify-center px-space-xs",
            children: /*#__PURE__*/_jsxDEV("a", {
              "aria-label": "Add Action",
              className: "w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-secondary-container to-tertiary-fixed flex items-center justify-center text-on-primary shadow-[0_10px_24px_-2px_rgba(79,107,255,0.45)] hover:scale-105 active:scale-95 transition-transform ring-4 ring-surface",
              "data-path": "create-hub",
              href: "#",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[28px]",
                children: "add"
              }, void 0, false)
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
            className: "flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-all",
            "data-path": "prayer-times",
            href: "#",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "schedule"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm mt-0.5",
              children: "Tasks"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
            className: "flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-all",
            "data-path": "more",
            href: "#",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "apps"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm mt-0.5",
              children: "More"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
};
export default PrayerTimes;