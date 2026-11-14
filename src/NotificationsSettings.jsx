import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const NotificationsSettings = () => {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 inset-x-0 z-50 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between relative",
        children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
          "aria-label": "Go back",
          className: "min-w-[44px] min-h-[44px] w-11 h-11 -ml-space-xs rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none active:scale-95 transition-all",
          onClick: "history.back()",
          type: "button",
          variant: "icon",
          children: /*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "arrow_back_ios_new"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute inset-x-16 flex items-center justify-center pointer-events-none",
          children: /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight truncate select-none",
            children: "Notification Preferences"
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
        className: "flex flex-col w-full px-gutter-mobile pb-space-xl space-y-space-md",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "relative w-full",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
            className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md shadow-md backdrop-blur-xl",
            children: /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-start justify-between gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-12 h-12 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0 shadow-inner text-primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[24px]",
                    style: {
                      fontVariationSettings: `'FILL' 1`
                    },
                    children: "notifications_active"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0 pr-space-xs",
                  children: [/*#__PURE__*/_jsxDEV("h2", {
                    className: "font-headline-sm text-headline-sm text-on-surface tracking-tight",
                    children: "Allow Momentum Notifications"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-1",
                    children: "Mindful chimes, prayer calls, and gentle daily agenda alerts."
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "true",
                className: "toggle-btn w-14 h-8 bg-primary rounded-full p-1 transition-colors duration-200 ease-in-out shrink-0 focus:outline-none",
                role: "switch",
                type: "button",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 bg-on-primary rounded-full shadow-md transform translate-x-6 transition-transform duration-200 ease-in-out"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md shadow-md flex flex-col space-y-space-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-secondary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  style: {
                    fontVariationSettings: `'FILL' 1`
                  },
                  children: "mosque"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "Prayer & Adhan Alerts"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-sm text-label-sm uppercase tracking-wider",
              children: "Active"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-3 gap-1 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-1 rounded-lg",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "py-2 rounded-md bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold shadow-sm transition-all text-center",
              type: "button",
              variant: "primary",
              children: "Muted Chime"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "py-2 rounded-md text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all text-center",
              type: "button",
              variant: "subtle",
              children: "Full Adhan"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "py-2 rounded-md text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all text-center",
              type: "button",
              variant: "subtle",
              children: "Vibration"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-1",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-lg text-label-lg text-on-surface ",
                children: "Timing Offset"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-secondary bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 px-2 py-0.5 rounded",
                children: "Exact time"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
              children: "Prepare your mind and ablutions peacefully before entry time."
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-2 gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-3 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-[15px] leading-tight text-on-surface ",
                  children: "Exact (0m)"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                  children: "At adhan"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "w-5 h-5 rounded-full bg-primary flex items-center justify-center",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-2 h-2 rounded-full bg-on-primary"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-3 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-[15px] leading-tight text-on-surface ",
                  children: "5m before"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                  children: "Gentle buzz"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "w-5 h-5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-3 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-[15px] leading-tight text-on-surface ",
                  children: "10m before"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                  children: "Ablution prep"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "w-5 h-5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-3 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-[15px] leading-tight text-on-surface ",
                  children: "15m before"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                  children: "Early pause"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "w-5 h-5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-5 gap-1.5 pt-1",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center justify-center p-2 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                children: "Fajr"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold mt-0.5",
                children: "05:12"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shadow-[0_0_6px_rgba(76,215,246,0.8)]"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center justify-center p-2 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                children: "Dhuhr"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold mt-0.5",
                children: "12:30"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shadow-[0_0_6px_rgba(76,215,246,0.8)]"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center justify-center p-2 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                children: "Asr"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold mt-0.5",
                children: "15:45"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shadow-[0_0_6px_rgba(76,215,246,0.8)]"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center justify-center p-2 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                children: "Maghrib"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold mt-0.5",
                children: "18:18"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shadow-[0_0_6px_rgba(76,215,246,0.8)]"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center justify-center p-2 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                children: "Isha"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold mt-0.5",
                children: "19:42"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shadow-[0_0_6px_rgba(76,215,246,0.8)]"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md shadow-md flex flex-col space-y-space-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-primary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                style: {
                  fontVariationSettings: `'FILL' 1`
                },
                children: "check_circle"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
              className: "font-headline-sm text-headline-sm text-on-surface ",
              children: "Tasks & Habit Reminders"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-3",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md font-semibold text-on-surface ",
                  children: "Due Task Alerts"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "15 mins before due"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "true",
                className: "toggle-btn w-12 h-6 bg-primary rounded-full p-0.5 shrink-0 transition-colors duration-200",
                role: "switch",
                type: "button",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 bg-on-primary rounded-full shadow transform translate-x-6 transition-transform duration-200"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md font-semibold text-on-surface ",
                  children: "Daily Habit Check-in"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Everyday at 08:30 PM"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "true",
                className: "toggle-btn w-12 h-6 bg-primary rounded-full p-0.5 shrink-0 transition-colors duration-200",
                role: "switch",
                type: "button",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 bg-on-primary rounded-full shadow transform translate-x-6 transition-transform duration-200"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md font-semibold text-on-surface ",
                  children: "Overdue Milestone Pushes"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "Gentle nudges for pending target goals"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "false",
                className: "toggle-btn w-12 h-6 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none rounded-full p-0.5 shrink-0 transition-colors duration-200",
                role: "switch",
                type: "button",
                variant: "subtle",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 bg-on-surface-variant rounded-full shadow transform translate-x-0 transition-transform duration-200"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md shadow-md flex flex-col space-y-space-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-tertiary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                style: {
                  fontVariationSettings: `'FILL' 1`
                },
                children: "self_improvement"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
              className: "font-headline-sm text-headline-sm text-on-surface ",
              children: "Mindfulness & Routines"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-3",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md font-semibold text-on-surface ",
                  children: "Morning Intention & Fajr"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "05:00 AM • Soft morning rise"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "true",
                className: "toggle-btn w-12 h-6 bg-primary rounded-full p-0.5 shrink-0 transition-colors duration-200",
                role: "switch",
                type: "button",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 bg-on-primary rounded-full shadow transform translate-x-6 transition-transform duration-200"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md font-semibold text-on-surface ",
                  children: "Midday Pause & Hydration"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "01:00 PM • 3 deep breaths chime"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "true",
                className: "toggle-btn w-12 h-6 bg-primary rounded-full p-0.5 shrink-0 transition-colors duration-200",
                role: "switch",
                type: "button",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 bg-on-primary rounded-full shadow transform translate-x-6 transition-transform duration-200"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md font-semibold text-on-surface ",
                  children: "Evening Wind-down & Murāqabah"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "09:30 PM • Gratitude journaling alert"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "true",
                className: "toggle-btn w-12 h-6 bg-primary rounded-full p-0.5 shrink-0 transition-colors duration-200",
                role: "switch",
                type: "button",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 bg-on-primary rounded-full shadow transform translate-x-6 transition-transform duration-200"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-2.5 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md font-semibold text-on-surface ",
                  children: "Daily Radiance Quote"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                  children: "08:00 AM • Curated wisdom nugget"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "true",
                className: "toggle-btn w-12 h-6 bg-primary rounded-full p-0.5 shrink-0 transition-colors duration-200",
                role: "switch",
                type: "button",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "w-5 h-5 bg-on-primary rounded-full shadow transform translate-x-6 transition-transform duration-200"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md shadow-md flex items-center justify-between gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-start gap-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-10 h-10 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0 text-secondary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[22px]",
                style: {
                  fontVariationSettings: `'FILL' 1`
                },
                children: "bedtime"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col min-w-0",
              children: [/*#__PURE__*/_jsxDEV("h3", {
                className: "font-headline-sm text-headline-sm text-on-surface ",
                children: "Zen Focus / Do Not Disturb"
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-1",
                children: "Silence all civil alerts between 10:30 PM and 04:30 AM while preserving Fajr Adhan."
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-checked": "true",
            className: "toggle-btn w-12 h-6 bg-primary rounded-full p-0.5 shrink-0 transition-colors duration-200",
            role: "switch",
            type: "button",
            variant: "primary",
            children: /*#__PURE__*/_jsxDEV("div", {
              className: "w-5 h-5 bg-on-primary rounded-full shadow transform translate-x-6 transition-transform duration-200"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col items-center pt-space-xs space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-full h-12 rounded-xl bg-gradient-to-r from-primary-container to-secondary-container text-on-primary font-headline-sm text-[16px] flex items-center justify-center gap-space-xs shadow-[0_0_24px_rgba(99,102,241,0.3)] hover:opacity-95 active:scale-[0.99] transition-all",
            type: "button",
            variant: "primary",
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "Save Notification Settings"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "arrow_forward"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-1.5 text-on-surface dark:text-on-surface-variant",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[16px]",
              children: "sync_lock"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm",
              children: "Preferences sync securely across your connected devices."
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default NotificationsSettings;