import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const TasbeehHistory = () => {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface antialiased flex flex-col min-h-screen relative",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Go back",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            onClick: "history.back()",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "arrow_back"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface truncate max-w-[200px]",
            children: "Dhikr History Detail"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Contextual drafts",
            className: "h-11 px-space-md flex items-center justify-center gap-space-xs rounded-full text-secondary hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            variant: "subtle",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px]",
              children: "drafts"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-md text-label-md hidden sm:inline",
              children: "Drafts"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-primary text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex flex-col relative w-full pt-16 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex-1",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full",
        children: /*#__PURE__*/_jsxDEV("div", {
          className: "w-full max-w-md mx-auto px-gutter-mobile pb-space-xl flex flex-col gap-space-lg",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between pt-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl px-space-md py-space-xs rounded-full shadow-sm",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px] text-secondary",
                children: "calendar_today"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-lg text-label-lg text-on-surface ",
                children: "Today • Oct 26, 2026"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              "aria-label": "Filter timeline",
              className: "w-10 h-10 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-primary transition-colors shadow-sm",
              variant: "primary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "tune"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            children: /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-md text-body-md text-on-surface dark:text-on-surface-variant",
              children: "Reflect upon your daily dhikr milestones and spiritual consistency."
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-lg shadow-xl flex flex-col gap-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-secondary-container/15 blur-2xl pointer-events-none"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm tracking-widest text-outline uppercase font-semibold",
                children: "Today's Recitations"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 bg-secondary-container/20 px-space-sm py-0.5 rounded-full",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px] text-secondary",
                  children: "arrow_back_ios_new"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-secondary font-semibold",
                  children: "Surpassed Goal"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 flex flex-col",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-baseline gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-display-hero-mobile text-display-hero-mobile font-bold tracking-tight text-primary",
                  children: "1,254"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-secondary font-medium",
                  children: "tasbeeh"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                children: "dhikr completed across all sessions today"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 grid grid-cols-3 gap-space-xs pt-space-xs",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 rounded-lg p-space-sm flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-outline",
                  children: "Sessions"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm font-semibold text-on-surface mt-1",
                  children: "8"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: "Target 6"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 rounded-lg p-space-sm flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-outline",
                  children: "Streak"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm font-semibold text-on-surface mt-1",
                  children: "14d 🔥"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: "Personal best"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 rounded-lg p-space-sm flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-outline",
                  children: "Goal Met"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm font-semibold text-secondary mt-1",
                  children: "125%"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
                  children: "1,000 base"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 grid grid-cols-4 gap-1 p-1 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 rounded-lg",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "py-1.5 rounded bg-primary text-on-primary font-label-md text-label-md font-semibold text-center transition-all shadow-md",
                variant: "primary",
                children: "Today"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "py-1.5 rounded text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md text-center transition-all",
                variant: "subtle",
                children: "Week"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "py-1.5 rounded text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md text-center transition-all",
                variant: "subtle",
                children: "Month"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "py-1.5 rounded text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md text-center transition-all",
                variant: "subtle",
                children: "All Time"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-xs",
                children: [/*#__PURE__*/_jsxDEV("h2", {
                  className: "font-headline-sm text-headline-sm font-semibold text-on-surface ",
                  children: "Timeline"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-primary font-label-sm text-label-sm px-space-xs py-0.5 rounded-full font-medium",
                  children: "5 Recorded"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "flex items-center gap-1 font-label-md text-label-md text-secondary hover:underline transition-all",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px]",
                  children: "file_download"
                }, void 0, false), "Export Log"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col gap-space-sm",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl rounded-xl p-space-md flex flex-col gap-space-sm shadow-md transition-all hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-outline",
                    children: "Today • 08:45 PM"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "bg-secondary-container/20 text-secondary font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-semibold",
                    children: "Completed"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-start justify-between gap-space-sm",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("h3", {
                      className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                      children: "SubhanAllah wa bi-Hamdih"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                      children: "Evening Adhkar"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "flex-shrink-0 flex items-center gap-1 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-primary hover:text-on-primary text-primary px-space-sm py-1.5 rounded-full font-label-md text-label-md transition-colors shadow-sm",
                    variant: "primary",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "replay"
                    }, void 0, false), "Repeat"]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between pt-space-xs text-on-surface dark:text-on-surface-variant font-label-md text-label-md bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-xs rounded-lg",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px] text-primary",
                      children: "pin"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      children: "100 / 100"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px] text-outline",
                      children: "timer"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      children: "4m 12s"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl rounded-xl p-space-md flex flex-col gap-space-sm shadow-md transition-all hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-outline",
                    children: "Today • 05:30 PM"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "bg-secondary-container/20 text-secondary font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-semibold",
                    children: "Completed"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-start justify-between gap-space-sm",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("h3", {
                      className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                      children: "Astaghfirullah"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                      children: "Post-Asr Dhikr"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "flex-shrink-0 flex items-center gap-1 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-primary hover:text-on-primary text-primary px-space-sm py-1.5 rounded-full font-label-md text-label-md transition-colors shadow-sm",
                    variant: "primary",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "replay"
                    }, void 0, false), "Repeat"]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between pt-space-xs text-on-surface dark:text-on-surface-variant font-label-md text-label-md bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-xs rounded-lg",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px] text-primary",
                      children: "pin"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      children: "100 / 100"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px] text-outline",
                      children: "timer"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      children: "3m 45s"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl rounded-xl p-space-md flex flex-col gap-space-sm shadow-md transition-all hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-outline",
                    children: "Today • 01:25 PM"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-semibold",
                    children: "Full Set (100)"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-start justify-between gap-space-sm",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("h3", {
                      className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                      children: "Ayatul Kursi & Tasbeeh Fatimah"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                      className: "font-body-sm text-body-sm text-primary font-medium truncate",
                      children: "SubhanAllah 33 • Alhamdulillah 33 • Allahu Akbar 34"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                      children: "Post-Dhuhr"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "flex-shrink-0 flex items-center gap-1 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-primary hover:text-on-primary text-primary px-space-sm py-1.5 rounded-full font-label-md text-label-md transition-colors shadow-sm",
                    variant: "primary",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "replay"
                    }, void 0, false), "Repeat"]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between pt-space-xs text-on-surface dark:text-on-surface-variant font-label-md text-label-md bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-xs rounded-lg",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px] text-primary",
                      children: "pin"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      children: "100 / 100"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px] text-outline",
                      children: "timer"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      children: "5m 10s"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl rounded-xl p-space-md flex flex-col gap-space-sm shadow-md transition-all hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-outline",
                    children: "Today • 06:15 AM"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "bg-secondary-container/20 text-secondary font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-semibold",
                    children: "Completed"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-start justify-between gap-space-sm",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("h3", {
                      className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                      children: "La ilaha illallah wahdahu la..."
                    }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                      children: "Morning Adhkar"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "flex-shrink-0 flex items-center gap-1 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-primary hover:text-on-primary text-primary px-space-sm py-1.5 rounded-full font-label-md text-label-md transition-colors shadow-sm",
                    variant: "primary",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "replay"
                    }, void 0, false), "Repeat"]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between pt-space-xs text-on-surface dark:text-on-surface-variant font-label-md text-label-md bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-xs rounded-lg",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px] text-primary",
                      children: "pin"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      children: "100 / 100"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px] text-outline",
                      children: "timer"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      children: "6m 20s"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-md py-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "h-[1px] bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex-1"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-outline uppercase font-semibold tracking-wider",
                  children: "Yesterday • Oct 23"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "h-[1px] bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex-1"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl rounded-xl p-space-md flex flex-col gap-space-sm shadow-md transition-all hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-outline",
                    children: "Yesterday • 04:10 PM"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "bg-primary-container/30 text-primary font-label-sm text-label-sm px-space-sm py-0.5 rounded-full font-semibold",
                    children: "Friday Special"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-start justify-between gap-space-sm",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("h3", {
                      className: "font-body-lg text-body-lg font-semibold text-on-surface truncate",
                      children: "Salawat upon the Prophet ﷺ"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                      className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant",
                      children: "Jummah Sunnah"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "flex-shrink-0 flex items-center gap-1 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-primary hover:text-on-primary text-primary px-space-sm py-1.5 rounded-full font-label-md text-label-md transition-colors shadow-sm",
                    variant: "primary",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "replay"
                    }, void 0, false), "Repeat"]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between pt-space-xs text-on-surface dark:text-on-surface-variant font-label-md text-label-md bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-xs rounded-lg",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px] text-primary",
                      children: "pin"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      children: "500 / 500"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px] text-outline",
                      children: "timer"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      children: "18m 40s"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-lg shadow-md flex items-start gap-space-md relative overflow-hidden",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px] text-primary",
                style: {
                  fontVariationSettings: `'FILL' 1`
                },
                children: "format_quote"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col gap-1 min-w-0",
              children: [/*#__PURE__*/_jsxDEV("blockquote", {
                className: "font-body-md text-body-md italic text-on-surface ",
                children: "“The remembrance of Allah brings peace to the heart.”"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "— Surah Ar-Ra'd 13:28"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "sticky bottom-4 z-40 w-full pt-space-xs",
            children: /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full h-14 bg-gradient-to-r from-primary-container via-inverse-primary to-primary text-on-primary rounded-full font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-xs shadow-[0_8px_32px_rgba(99,102,241,0.35)] active:scale-[0.98] transition-all",
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[22px]",
                children: "add_circle"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Start New Dhikr Session"
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
};
export default TasbeehHistory;