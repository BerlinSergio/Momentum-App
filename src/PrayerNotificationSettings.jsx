import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const PrayerNotificationSettings = () => {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "fixed inset-0 pointer-events-none z-0 overflow-hidden",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "absolute -top-32 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-primary-fixed/40 to-tertiary-fixed/30 blur-3xl opacity-70"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-gradient-to-bl from-secondary-fixed/35 to-primary-fixed/20 blur-3xl opacity-60"
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-margin flex items-center justify-between bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Go back",
            className: "w-11 h-11 -ml-1 rounded-full flex items-center justify-center text-on-surface hover:text-primary transition-colors active:scale-95",
            onClick: "history.back()",
            type: "button",
            variant: "primary",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[24px]",
              children: "arrow_back"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm tracking-tight text-on-surface ",
            children: "Prayer Notification Settings — Light Mode"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_2px_8px_rgba(42,73,223,0.3)]",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative w-full px-margin pt-16 pb-safe bg-transparent z-10",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full pb-32 space-y-space-lg",
        children: [/*#__PURE__*/_jsxDEV(GlassCard, {
          className: "relative overflow-hidden rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-lg shadow-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br from-primary-fixed/50 to-tertiary-fixed/40 blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative z-10 flex flex-col items-start gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed/60 text-on-primary-fixed font-label-sm text-label-sm tracking-wide",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[14px]",
                children: "tune"
              }, void 0, false), "PREFERENCES • AUDIO & ALERTS"]
            }, void 0, true), /*#__PURE__*/_jsxDEV("h2", {
              className: "font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1",
              children: "Prayer Notifications"
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-md text-body-md text-on-surface dark:text-on-surface-variant leading-relaxed",
              children: "Configure gentle auditory reminders, Adhan cues, and early mindfulness alerts for each daily prayer."
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "relative rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-3xl p-space-lg shadow-[0_8px_24px_-4px_rgba(42,73,223,0.12)]",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between gap-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-md min-w-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "relative flex-shrink-0 w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center shadow-[0_4px_16px_rgba(73,101,249,0.35)]",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-primary text-[26px]",
                  style: {
                    fontVariationSettings: `'FILL' 1`
                  },
                  children: "notifications_active"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-on-surface truncate",
                  children: "Master Prayer Alerts"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant line-clamp-1",
                  children: "Push alerts, full Adhan, & pre-cues"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              "aria-checked": "true",
              className: "relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full p-1 transition-colors duration-300 ease-in-out bg-primary focus:outline-none shadow-sm",
              "data-toggle": "master",
              role: "switch",
              type: "button",
              variant: "primary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition duration-300 ease-in-out translate-x-6"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "px-space-xs",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold",
              children: "Timing Preferences"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl overflow-hidden shadow-sm flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "p-space-lg flex items-center justify-between gap-space-md bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-full bg-secondary-fixed/50 flex items-center justify-center flex-shrink-0 mt-0.5 text-secondary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    style: {
                      fontVariationSettings: `'FILL' 1`
                    },
                    children: "volume_up"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold",
                    children: "At Prayer Time (Adhan)"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Play full Adhan chime exactly when prayer begins"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "true",
                className: "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 bg-primary",
                "data-toggle": "",
                role: "switch",
                type: "button",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-200 translate-x-5"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mx-space-lg"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "p-space-lg flex items-center justify-between gap-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-full bg-tertiary-fixed/60 flex items-center justify-center flex-shrink-0 mt-0.5 text-tertiary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "timer_10"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1.5 flex-wrap",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-lg text-body-lg text-on-surface font-semibold",
                      children: "15 Minutes Before"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "px-2 py-0.5 rounded-full bg-primary-fixed/80 text-on-primary-fixed font-label-sm text-label-sm font-medium",
                      children: "Recommended"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Gentle reminder to conclude tasks and perform wudhu"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "true",
                className: "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 bg-primary",
                "data-toggle": "",
                role: "switch",
                type: "button",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-200 translate-x-5"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mx-space-lg"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "p-space-lg flex items-center justify-between gap-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center flex-shrink-0 mt-0.5 text-outline",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "notifications_paused"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold",
                    children: "10 Minutes Before"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Mindful warning to prepare for congregational prayer"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "false",
                className: "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                "data-toggle": "",
                role: "switch",
                type: "button",
                variant: "subtle",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-200 translate-x-0"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mx-space-lg"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "p-space-lg flex items-center justify-between gap-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center flex-shrink-0 mt-0.5 text-outline",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "alarm"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold",
                    children: "5 Minutes Before"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Final prompt to step toward the prayer sanctuary"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "false",
                className: "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                "data-toggle": "",
                role: "switch",
                type: "button",
                variant: "subtle",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-200 translate-x-0"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "px-space-xs flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold",
              children: "Individual Prayer Reminders"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary font-medium",
              children: "5 Configured"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-space-sm",
            children: [/*#__PURE__*/_jsxDEV(GlassCard, {
              className: "rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-sm flex flex-col gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-sm min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-10 h-10 rounded-full bg-primary-fixed-dim/40 flex items-center justify-center text-primary flex-shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "wb_twilight"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "font-headline-sm text-headline-sm text-on-surface ",
                        children: "Fajr"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold",
                        children: "Loud / Wake Up"
                      }, void 0, false)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                      children: "Full Adhan (Mishary Al-Afasy)"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "true",
                  className: "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 bg-primary",
                  "data-toggle": "",
                  role: "switch",
                  type: "button",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-200 translate-x-5"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between pt-1 pl-12",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:opacity-80 transition-opacity",
                  type: "button",
                  variant: "primary",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "music_note"
                  }, void 0, false), "Change Reciter / Tone"]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-outline",
                  children: "05:12 AM"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-sm flex flex-col gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-sm min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-10 h-10 rounded-full bg-tertiary-fixed/40 flex items-center justify-center text-tertiary flex-shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "light_mode"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "font-headline-sm text-headline-sm text-on-surface ",
                        children: "Dhuhr"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                        children: "Standard"
                      }, void 0, false)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                      children: "Soft Serenity Bell & Chime"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "true",
                  className: "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 bg-primary",
                  "data-toggle": "",
                  role: "switch",
                  type: "button",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-200 translate-x-5"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between pt-1 pl-12",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:opacity-80 transition-opacity",
                  type: "button",
                  variant: "primary",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "music_note"
                  }, void 0, false), "Change Reciter / Tone"]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-outline",
                  children: "12:45 PM"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-sm flex flex-col gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-sm min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-10 h-10 rounded-full bg-primary-fixed/40 flex items-center justify-center text-primary flex-shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "partly_cloudy_day"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "font-headline-sm text-headline-sm text-on-surface ",
                        children: "Asr"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                        children: "Standard"
                      }, void 0, false)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                      children: "Gentle Chime"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "true",
                  className: "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 bg-primary",
                  "data-toggle": "",
                  role: "switch",
                  type: "button",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-200 translate-x-5"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between pt-1 pl-12",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:opacity-80 transition-opacity",
                  type: "button",
                  variant: "primary",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "music_note"
                  }, void 0, false), "Change Reciter / Tone"]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-outline",
                  children: "04:18 PM"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-sm flex flex-col gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-sm min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary flex-shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "routine"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "font-headline-sm text-headline-sm text-on-surface ",
                        children: "Maghrib"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                        children: "Standard"
                      }, void 0, false)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                      children: "Full Sunset Adhan"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "true",
                  className: "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 bg-primary",
                  "data-toggle": "",
                  role: "switch",
                  type: "button",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-200 translate-x-5"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between pt-1 pl-12",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:opacity-80 transition-opacity",
                  type: "button",
                  variant: "primary",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "music_note"
                  }, void 0, false), "Change Reciter / Tone"]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-outline",
                  children: "06:52 PM"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-sm flex flex-col gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-space-sm min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-10 h-10 rounded-full bg-primary-fixed-dim/30 flex items-center justify-center text-primary flex-shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "dark_mode"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "font-headline-sm text-headline-sm text-on-surface ",
                        children: "Isha"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "px-2 py-0.5 rounded-full bg-tertiary-fixed/60 text-on-tertiary-fixed font-label-sm text-label-sm font-semibold",
                        children: "Quiet Mode"
                      }, void 0, false)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                      children: "Calming Night Tone"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  "aria-checked": "true",
                  className: "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 bg-primary",
                  "data-toggle": "",
                  role: "switch",
                  type: "button",
                  variant: "primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-200 translate-x-5"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between pt-1 pl-12",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:opacity-80 transition-opacity",
                  type: "button",
                  variant: "primary",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "music_note"
                  }, void 0, false), "Change Reciter / Tone"]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-outline",
                  children: "08:24 PM"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "px-space-xs",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold",
              children: "Audio & Haptics"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl overflow-hidden shadow-sm flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "p-space-lg flex items-center justify-between gap-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center flex-shrink-0 mt-0.5 text-secondary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "vibration"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold",
                    children: "Vibration & Haptics"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Gentle double pulse during call and alerts"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "true",
                className: "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 bg-primary",
                "data-toggle": "",
                role: "switch",
                type: "button",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-200 translate-x-5"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-px bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 mx-space-lg"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "p-space-lg flex items-center justify-between gap-space-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-space-md min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-9 h-9 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center flex-shrink-0 mt-0.5 text-outline",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    children: "do_not_disturb_on"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold",
                    children: "Respect Do Not Disturb"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                    children: "Override focus modes for Fajr only"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-checked": "false",
                className: "relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                "data-toggle": "",
                role: "switch",
                type: "button",
                variant: "subtle",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition duration-200 translate-x-0"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col gap-space-sm pt-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-full h-14 rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-[0_10px_24px_-2px_rgba(79,107,255,0.45)] active:scale-[0.98] transition-transform",
            id: "save-settings-btn",
            type: "button",
            variant: "primary",
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "Save Notification Settings"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "arrow_forward"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-full h-12 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-md text-label-md flex items-center justify-center shadow-sm hover:text-on-surface active:scale-[0.98] transition-all",
            id: "reset-defaults-btn",
            type: "button",
            variant: "none",
            children: "Reset to Default Schedule"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default PrayerNotificationSettings;