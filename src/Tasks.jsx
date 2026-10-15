import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export default function Tasks({
  setActiveTab
}) {
  const [activeFilter, setActiveFilter] = useState('today');
  return /*#__PURE__*/_jsxDEV(AppShell, {
    title: "Momentum",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "fixed inset-0 pointer-events-none -z-10 overflow-hidden",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary/20 blur-[100px]"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-secondary/15 blur-[100px]"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute bottom-20 left-1/2 -translate-x-1/2 w-[32rem] h-72 rounded-full bg-tertiary/10 blur-[100px]"
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-surface-container backdrop-blur-xl border-b border-outline-variant/[0.06]",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "w-full flex items-center justify-between px-margin pt-1 h-5 text-on-surface select-none",
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "font-label-sm text-label-sm font-semibold tracking-tight text-on-surface-variant",
          children: "9:41"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "w-24 h-4 bg-surface-container-high/60 rounded-full mx-auto hidden sm:block"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-1.5 text-on-surface-variant",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[14px]",
            children: "signal_cellular_4_bar"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[14px]",
            children: "wifi"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[15px]",
            children: "battery_full"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "h-14 px-margin flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "bubble_chart"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold",
            children: "Tasks"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Notifications",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "notifications"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_12px_rgba(128,131,255,0.4)]",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-surface text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("main", {
      className: "flex flex-col relative w-full pt-14 pb-32 min-h-screen px-margin",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full pb-10 space-y-4",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-between pt-1",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary font-semibold tracking-wider uppercase",
              children: "Monday, Oct 24"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
              className: "font-headline-lg text-headline-lg text-on-surface tracking-tight mt-0.5",
              children: "Tasks & Reminders"
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
              children: "Organize your day with mindful focus"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.4)]",
            children: /*#__PURE__*/_jsxDEV("img", {
              className: "w-full h-full object-cover",
              "data-alt": "Portrait of Aisha, a young smiling woman wearing a soft pastel hijab with warm luminous morning sunlight, serene aesthetic, high key photography",
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOyzBfPV4nzeFXrOh0mMZhLaER0cvmPu4A2w13x7Mpb84nh6r04ulVNKPbCbNt0PTmxdNkKUf581MposMq2XuW2HIE_OI64eGAWbmVb4WAc6lZ3Cfak7afoZGNQiEiYHmD4ZVvktvKIPTCnSt48NzakcKi65PBFKrjx9UFqf0fA7mInaTfbRGr-T7NBzgenUnTWaPn6LUlNJUPlVABtcVXCQq6H-A3WJVglFynGPfF70qYok0UjZc"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "relative rounded-lg bg-surface-container backdrop-blur-3xl p-5 shadow-[0_12px_32px_rgba(0,0,0,0.35)] border overflow-hidden",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -right-8 -top-8 w-28 h-28 bg-primary/20 rounded-full blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  children: "task_alt"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant uppercase tracking-wider",
                  children: "Daily Completion"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
                  className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
                  children: "8 of 12 Completed"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-indigo-600 text-on-surface font-label-md text-label-md shadow-[0_4px_14px_rgba(99,102,241,0.4)] active:scale-95 transition-all",
              id: "quick-add-btn",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px]",
                children: "add"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Add Task"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "mt-4 flex items-center gap-3",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex-1 h-3 rounded-full bg-surface-container/80 overflow-hidden p-0.5 border border-outline-variant",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "h-full rounded-full bg-gradient-to-r from-primary via-secondary to-teal-400 transition-all duration-700 shadow-[0_0_10px_rgba(76,215,246,0.3)]",
                style: {
                  width: "67%"
                }
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-md text-label-md text-secondary font-bold",
              children: "67%"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "mt-3 flex items-center justify-between text-on-surface-variant dark:text-on-surface-variant font-body-sm text-body-sm",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.8)]"
              }, void 0, false), "4 tasks remaining today"]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "text-secondary font-medium",
              children: "Keep your momentum ✨"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center p-1 rounded-full bg-surface-container border backdrop-blur-md",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "filter-tab flex-1 py-1.5 px-3 rounded-full font-label-md text-label-md text-center bg-surface-container text-primary shadow-[0_2px_10px_rgba(0,0,0,0.3)] border transition-all",
            "data-target": "today",
            variant: "primary",
            children: ["Today ", /*#__PURE__*/_jsxDEV("span", {
              className: "ml-1 opacity-90 text-primary font-bold",
              children: "(5)"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "filter-tab flex-1 py-1.5 px-3 rounded-full font-label-md text-label-md text-center text-on-surface-variant dark:text-on-surface-variant transition-all hover:text-on-surface",
            "data-target": "upcoming",
            variant: "pill",
            children: ["Upcoming ", /*#__PURE__*/_jsxDEV("span", {
              className: "ml-1 opacity-70",
              children: "(4)"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "filter-tab flex-1 py-1.5 px-3 rounded-full font-label-md text-label-md text-center text-on-surface-variant dark:text-on-surface-variant transition-all hover:text-on-surface",
            "data-target": "completed",
            variant: "pill",
            children: ["Done ", /*#__PURE__*/_jsxDEV("span", {
              className: "ml-1 opacity-70",
              children: "(8)"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col space-y-2.5",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-1",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
              children: "Today's Focus"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary font-medium",
              children: "Sort by Time"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "task-card flex items-center justify-between p-3.5 rounded-lg bg-surface-container backdrop-blur-xl border shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all group",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-3 min-w-0",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-indigo-600 text-on-surface flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(128,131,255,0.4)] cursor-pointer",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] font-bold",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-lg text-body-lg text-on-surface-variant dark:text-on-surface-variant line-through truncate opacity-80",
                  children: "Morning workout & stretch"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2 mt-0.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-outline dark:text-outline flex items-center gap-0.5",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[12px]",
                      children: "schedule"
                    }, void 0, false), " 7:00 AM"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.2 rounded-full bg-surface-container/80 border border-outline-variant text-on-surface-variant dark:text-on-surface-variant font-label-sm text-label-sm",
                    children: "🔔 6:50 AM"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
              children: /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-error hover:bg-red-500/20 transition-colors",
                title: "Delete",
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "delete"
                }, void 0, false)
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "task-card flex items-center justify-between p-3.5 rounded-lg bg-surface-container backdrop-blur-xl border shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-3 min-w-0",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-6 h-6 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary shrink-0 cursor-pointer hover:bg-secondary hover:text-on-surface transition-all",
                variant: "subtle",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "timelapse"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold truncate",
                    children: "Review Q4 product roadmap"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-label-sm text-label-sm",
                    children: "Work"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2 mt-0.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-secondary font-medium flex items-center gap-0.5",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[12px]",
                      children: "schedule"
                    }, void 0, false), " 11:00 AM"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.2 rounded-full bg-secondary/15 border border-secondary/20 text-secondary font-label-sm text-label-sm",
                    children: "🔔 15m before"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface transition-colors",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "more_vert"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "relative overflow-hidden task-card flex items-center justify-between p-3.5 rounded-lg bg-surface-container backdrop-blur-xl border shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute -right-2 -bottom-2 w-20 h-20 opacity-15 pointer-events-none",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[72px] text-tertiary",
                children: "mosque"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-3 min-w-0 z-10",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-6 h-6 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center shrink-0 cursor-pointer hover:bg-tertiary/30 hover:border-teal-400 transition-all",
                variant: "subtle",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.8)]"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold truncate",
                    children: "Dhuhr Prayer & reflection"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded-full bg-tertiary/20 border border-tertiary/30 text-tertiary font-label-sm text-label-sm",
                    children: "Spiritual"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2 mt-0.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-0.5",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[12px]",
                      children: "schedule"
                    }, void 0, false), " 1:05 PM"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.2 rounded-full bg-tertiary/15 border border-tertiary/25 text-tertiary font-label-sm text-label-sm",
                    children: "🔔 Adhan chime"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-8 h-8 rounded-full flex items-center justify-center text-tertiary hover:text-tertiary transition-colors z-10",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "notifications_active"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "task-card flex items-center justify-between p-3.5 rounded-lg bg-surface-container backdrop-blur-xl border shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-3 min-w-0",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-6 h-6 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center text-secondary shrink-0 cursor-pointer hover:bg-secondary hover:text-on-surface transition-all",
                variant: "subtle",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[15px]",
                  children: "water_drop"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold truncate",
                    children: "Drink 2L daily water quota"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary font-label-sm text-label-sm",
                    children: "3/4 done"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2 mt-0.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant flex items-center gap-0.5",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[12px]",
                      children: "pace"
                    }, void 0, false), " Throughout day"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.2 rounded-full bg-surface-container/80 border border-outline-variant text-on-surface-variant dark:text-on-surface-variant font-label-sm text-label-sm",
                    children: "🔔 Hourly"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1.5",
              children: /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-7 h-7 rounded-full bg-surface-container border flex items-center justify-center text-secondary hover:bg-secondary/20 hover:text-secondary transition-colors text-xs font-bold",
                variant: "subtle",
                children: "+250ml"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "task-card flex items-center justify-between p-3.5 rounded-lg bg-surface-container backdrop-blur-xl border shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-3 min-w-0",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "w-6 h-6 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center shrink-0 cursor-pointer hover:bg-primary/20 hover:border-primary transition-all",
                variant: "primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "w-2.5 h-2.5 rounded-full bg-outline-variant"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold truncate",
                    children: "Grocery run & meal prep"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded-full bg-secondary/20 border border-secondary/30 text-secondary font-label-sm text-label-sm",
                    children: "Personal"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2 mt-0.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant flex items-center gap-0.5",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[12px]",
                      children: "schedule"
                    }, void 0, false), " 5:30 PM"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.2 rounded-full bg-surface-container/80 border border-outline-variant text-on-surface-variant dark:text-on-surface-variant font-label-sm text-label-sm",
                    children: "🔔 At arrival"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface transition-colors",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "more_vert"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col space-y-2 pt-1",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-1",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
              children: "Upcoming Days"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary font-semibold",
              children: "View Week"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
            className: "rounded-lg bg-surface-container backdrop-blur-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.3)] border space-y-3",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between pb-2.5 border-b border-outline-variant/[0.08]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-10 h-10 rounded-2xl bg-primary/20 border border-primary/30 flex flex-col items-center justify-center text-primary",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm font-bold leading-none",
                    children: "TUE"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm leading-none mt-0.5",
                    children: "25"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold",
                    children: "Team Sprint Planning"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "10:00 AM • Product Strategy"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-outline dark:text-outline text-[20px]",
                children: "chevron_right"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-10 h-10 rounded-2xl bg-secondary/20 border border-secondary/30 flex flex-col items-center justify-center text-secondary",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm font-bold leading-none",
                    children: "WED"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm leading-none mt-0.5",
                    children: "26"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface font-semibold",
                    children: "Car maintenance checkup"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "2:00 PM • Auto Service Center"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-outline dark:text-outline text-[20px]",
                children: "chevron_right"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "rounded-lg bg-surface-container backdrop-blur-lg border p-3.5 flex items-center justify-between",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-2.5",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-7 h-7 rounded-full bg-tertiary/20 border border-tertiary/30 flex items-center justify-center text-tertiary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px]",
                children: "done_all"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "Completed Earlier (7)"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "Fajr prayer, Journaling, Hydration..."
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "px-2.5 py-1 rounded-full bg-surface-container text-primary border font-label-sm text-label-sm shadow-sm active:scale-95 transition-all",
            variant: "primary",
            children: "Restore"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("nav", {
      className: "fixed bottom-0 w-full z-50 pb-safe pointer-events-none",
      "data-active-classes": "bg-primary/20 text-primary font-semibold",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "px-margin pb-space-md pt-space-xs",
        children: /*#__PURE__*/_jsxDEV("div", {
          className: "pointer-events-auto mx-auto max-w-[390px] h-[68px] px-space-xs rounded-full bg-surface-container backdrop-blur-3xl border shadow-[0_16px_36px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.08)_inset] flex items-center justify-between",
          children: [/*#__PURE__*/_jsxDEV("a", {
            onClick: e => {
              e.preventDefault();
              setActiveTab('dashboard');
            },
            className: "flex flex-col items-center justify-center flex-1 h-12 rounded-full text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface transition-all cursor-pointer",
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
            onClick: e => {
              e.preventDefault();
              setActiveTab('finance');
            },
            className: "flex flex-col items-center justify-center flex-1 h-12 rounded-full text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface transition-all cursor-pointer",
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
            className: "flex items-center justify-center px-space-xs",
            children: /*#__PURE__*/_jsxDEV("a", {
              onClick: e => e.preventDefault(),
              "aria-label": "Add",
              className: "w-14 h-14 -mt-5 rounded-full bg-gradient-to-tr from-primary via-indigo-600 to-teal-400 text-on-surface flex items-center justify-center shadow-[0_8px_20px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95 transition-transform ring-4 ring-[#090d16] cursor-pointer",
              "data-path": "create-entry",
              href: "#",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[28px] text-on-surface font-bold",
                children: "add"
              }, void 0, false)
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
            onClick: e => {
              e.preventDefault();
              setActiveTab('tasks');
            },
            "aria-current": "page",
            className: "flex flex-col items-center justify-center flex-1 h-12 rounded-full transition-all bg-primary/20 text-primary border border-primary/30 font-semibold shadow-[0_0_12px_rgba(128,131,255,0.2)] cursor-pointer",
            "data-path": "tasks",
            href: "#",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "checklist"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm mt-0.5",
              children: "Tasks"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
            onClick: e => {
              e.preventDefault();
              setActiveTab('routine');
            },
            className: "flex flex-col items-center justify-center flex-1 h-12 rounded-full text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface transition-all cursor-pointer",
            "data-path": "more",
            href: "#",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "grid_view"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm mt-0.5",
              children: "More"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
}