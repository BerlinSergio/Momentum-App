import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export default function Routine({
  setActiveTab
}) {
  const [currentFilterTab, setCurrentFilterTab] = useState(0);
  const tabs = ["All (6)", "Morning (3)", "Afternoon (1)", "Evening (2)"];
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-body-md text-body-md min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-container to-secondary flex items-center justify-center shadow-[0_0_16px_rgba(128,131,255,0.35)]",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-surface-container-lowest font-bold text-[20px]",
              children: "bolt"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-secondary tracking-widest uppercase",
              children: "MOMENTUM"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight",
              children: "Daily Routine"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-11 h-11 flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "notifications"
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
      className: "flex-1 flex flex-col relative w-full pt-16 pb-32 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full px-gutter-mobile space-y-space-md",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-between pt-space-xs",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col min-w-0 pr-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-xs",
              children: [/*#__PURE__*/_jsxDEV("h1", {
                className: "font-headline-md text-headline-md text-on-surface font-semibold tracking-tight",
                children: "Daily Routine"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm font-medium tracking-wide",
                children: "Active"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate mt-0.5",
              children: "Cultivate mindful consistency and barakah every day"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative shrink-0",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-10 h-10 rounded-full bg-gradient-to-tr from-primary-container to-secondary p-0.5 shadow-md",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "w-full h-full rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 overflow-hidden flex items-center justify-center",
                children: /*#__PURE__*/_jsxDEV("img", {
                  className: "w-full h-full object-cover",
                  alt: "Portrait avatar of a mindful professional looking contemplative with soft ambient rim lighting in dark futuristic tones",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuClrx_awarBkBmBF00gYM7emQN8vFTGPLldh9kiUz-EnUpmqX0ERWoNyzdrZdwJUPZzuk_pFmPe3HY01AtevWDtzU94FZceMFlvXPr470UJv-SPjKgT5GbMkvsk_-Y4yckX6JS9HMH1KKhvLAOKmLs1N15ch_Uu2Tq81118f9ulqYtVZKn7qkSsKhbWuQzB8tarW_JH6fZoyLAtDNy8gOLA5orYmBIqiVR1otjjUsbkruobLVbPXUQ"
                }, void 0, false)
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary-container shadow-[0_0_8px_rgba(76,215,246,0.8)]"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-lg",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary-container/15 blur-3xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-secondary/10 blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative z-10 flex flex-col space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col space-y-space-xs max-w-[62%]",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-sm w-fit",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "text-[13px] leading-none",
                    children: "🔥"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm font-semibold text-secondary-fixed tracking-wide",
                    children: "14-Day Routine Streak"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("h2", {
                  className: "font-headline-md text-headline-md text-on-surface font-bold tracking-tight",
                  children: "4 of 6 Done"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant leading-snug",
                  children: "Keep steady. Small steps build profound growth."
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "relative flex items-center justify-center shrink-0 w-24 h-24",
                children: [/*#__PURE__*/_jsxDEV("svg", {
                  className: "w-24 h-24 -rotate-90 transform",
                  viewBox: "0 0 96 96",
                  children: [/*#__PURE__*/_jsxDEV("circle", {
                    className: "text-surface-container-highest/60",
                    cx: "48",
                    cy: "48",
                    fill: "transparent",
                    r: "38",
                    stroke: "currentColor",
                    strokeWidth: "7"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
                    className: "drop-shadow-[0_0_10px_rgba(76,215,246,0.4)]",
                    cx: "48",
                    cy: "48",
                    fill: "transparent",
                    r: "38",
                    stroke: "url(#streak_gradient)",
                    strokeDasharray: "238.76",
                    strokeDashoffset: "78.79",
                    strokeLinecap: "round",
                    strokeWidth: "7.5"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("defs", {
                    children: /*#__PURE__*/_jsxDEV("linearGradient", {
                      id: "streak_gradient",
                      x1: "0%",
                      x2: "100%",
                      y1: "0%",
                      y2: "100%",
                      children: [/*#__PURE__*/_jsxDEV("stop", {
                        offset: "0%",
                        stopColor: "#4cd7f6"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("stop", {
                        offset: "100%",
                        stopColor: "#8083ff"
                      }, void 0, false)]
                    }, void 0, true)
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute inset-0 flex flex-col items-center justify-center text-center",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight leading-none",
                    children: "67%"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant font-medium mt-0.5",
                    children: "Today"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between pt-space-xs",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1.5 text-on-surface dark:text-on-surface-variant font-label-md text-label-md",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px] text-secondary",
                  children: "check_circle"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "2 upcoming today"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-gradient-to-r from-primary-container to-secondary text-surface-container-lowest font-label-md text-label-md font-bold shadow-[0_0_16px_rgba(128,131,255,0.4)] active:scale-95 transition-transform",
                variant: "primary",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] font-bold",
                  children: "add"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Add Routine"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs overflow-x-auto no-scrollbar py-0.5",
          children: tabs.map((tab, index) => /*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "subtle",
            onClick: () => setCurrentFilterTab(index),
            className: currentFilterTab === index ? "px-4 py-2 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-[0_0_14px_rgba(128,131,255,0.35)] shrink-0" : "px-4 py-2 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:text-on-surface font-label-md text-label-md font-medium shrink-0 transition-colors",
            children: tab
          }, index, false))
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-md shadow-sm transition-all",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute right-12 -bottom-2 w-28 h-24 opacity-20 pointer-events-none text-outline-variant",
              children: /*#__PURE__*/_jsxDEV("svg", {
                className: "w-full h-full",
                fill: "currentColor",
                viewBox: "0 0 100 80",
                children: /*#__PURE__*/_jsxDEV("path", {
                  d: "M50 5 C47 15 35 25 35 38 L35 80 L65 80 L65 38 C65 25 53 15 50 5 Z M20 30 C18 36 10 43 10 52 L10 80 L30 80 L30 52 C30 43 22 36 20 30 Z M80 30 C78 36 70 43 70 52 L70 80 L90 80 L90 52 C90 43 82 36 80 30 Z M46 62 A4 4 0 0 1 54 62 L54 80 L46 80 Z"
                }, void 0, false)
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[19px] text-emerald-400 font-bold",
                    style: {
                      fontVariationSettings: "'FILL' 1"
                    },
                    children: "check"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1.5 flex-wrap",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-[16px] leading-snug font-semibold text-on-surface truncate",
                      children: "Morning Fajr & Tah..."
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                      children: "Every Day"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-2 mt-0.5 text-on-surface dark:text-on-surface-variant font-label-md text-label-md",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "text-on-surface font-semibold",
                      children: "05:15 AM"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "inline-block w-1 h-1 rounded-full bg-outline-variant"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-1",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[14px] text-primary",
                        children: "notifications_active"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "truncate",
                        children: "Adhan notification enabled"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-0.5 shrink-0 text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "edit"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:text-error transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "delete"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-md shadow-sm transition-all",
            children: /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-7 h-7 rounded-full bg-tertiary-container/25 flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[19px] text-tertiary font-bold",
                    style: {
                      fontVariationSettings: "'FILL' 1"
                    },
                    children: "check"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1.5 flex-wrap",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-[16px] leading-snug font-semibold text-on-surface truncate",
                      children: "Hydration & Mindf..."
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                      children: "Mon–Fri"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-2 mt-0.5 text-on-surface dark:text-on-surface-variant font-label-md text-label-md",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "text-on-surface font-semibold",
                      children: "06:30 AM"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "inline-block w-1 h-1 rounded-full bg-outline-variant"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-1",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[14px] text-tertiary",
                        children: "timer"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        children: "15 mins"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-0.5 shrink-0 text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "edit"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:text-error transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "delete"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-md shadow-md shadow-secondary/5",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary to-primary-container"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-7 h-7 rounded-full bg-secondary/15 flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "w-3 h-3 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(76,215,246,0.9)]"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1.5 flex-wrap",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-[16px] leading-snug font-semibold text-on-surface truncate",
                      children: "Deep Focus ..."
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-label-sm text-label-sm font-semibold",
                      children: "Now"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                      children: "Mon–Fri"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-2 mt-0.5 text-on-surface dark:text-on-surface-variant font-label-md text-label-md",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "text-secondary font-semibold",
                      children: "09:30 AM"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "inline-block w-1 h-1 rounded-full bg-outline-variant"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-1",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[14px] text-secondary",
                        children: "do_not_disturb_on"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "truncate",
                        children: "10m before with DND mode"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-0.5 shrink-0 text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "edit"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:text-error transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "delete"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-md shadow-sm transition-all",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute right-12 -bottom-2 w-28 h-24 opacity-20 pointer-events-none text-outline-variant",
              children: /*#__PURE__*/_jsxDEV("svg", {
                className: "w-full h-full",
                fill: "currentColor",
                viewBox: "0 0 100 80",
                children: /*#__PURE__*/_jsxDEV("path", {
                  d: "M50 5 C47 15 35 25 35 38 L35 80 L65 80 L65 38 C65 25 53 15 50 5 Z M20 30 C18 36 10 43 10 52 L10 80 L30 80 L30 52 C30 43 22 36 20 30 Z M80 30 C78 36 70 43 70 52 L70 80 L90 80 L90 52 C90 43 82 36 80 30 Z M46 62 A4 4 0 0 1 54 62 L54 80 L46 80 Z"
                }, void 0, false)
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "w-3 h-3 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1.5 flex-wrap",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-[16px] leading-snug font-semibold text-on-surface truncate",
                      children: "Midday Dhuhr & Re..."
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                      children: "Every Day"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-2 mt-0.5 text-on-surface dark:text-on-surface-variant font-label-md text-label-md",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "text-on-surface font-semibold",
                      children: "01:05 PM"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "inline-block w-1 h-1 rounded-full bg-outline-variant"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-1",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[14px] text-on-surface dark:text-on-surface-variant",
                        children: "mosque"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        children: "Congregation prayer"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-0.5 shrink-0 text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "edit"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:text-error transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "delete"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-md shadow-sm transition-all",
            children: /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "w-3 h-3 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1.5 flex-wrap",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-[16px] leading-snug font-semibold text-on-surface truncate",
                      children: "Evening Reading &..."
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                      children: "Sun, Tue, Thu"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-2 mt-0.5 text-on-surface dark:text-on-surface-variant font-label-md text-label-md",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "text-on-surface font-semibold",
                      children: "08:30 PM"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "inline-block w-1 h-1 rounded-full bg-outline-variant"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-1",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[14px] text-on-surface dark:text-on-surface-variant",
                        children: "menu_book"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        children: "25 mins focus"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-0.5 shrink-0 text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "edit"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:text-error transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "delete"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative overflow-hidden rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-md p-space-md shadow-sm transition-all",
            children: /*#__PURE__*/_jsxDEV("div", {
              className: "relative z-10 flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "w-3 h-3 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-1.5 flex-wrap",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-[16px] leading-snug font-semibold text-on-surface truncate",
                      children: "Night Adhkar & Sle..."
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "px-2 py-0.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-sm text-label-sm",
                      children: "Every Day"
                    }, void 0, false)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center gap-2 mt-0.5 text-on-surface dark:text-on-surface-variant font-label-md text-label-md",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "text-on-surface font-semibold",
                      children: "10:00 PM"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "inline-block w-1 h-1 rounded-full bg-outline-variant"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-1",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[14px] text-on-surface dark:text-on-surface-variant",
                        children: "bedtime"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        children: "Wind down mode"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-0.5 shrink-0 text-on-surface dark:text-on-surface-variant",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "edit"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:text-error transition-colors",
                  variant: "icon",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[17px]",
                    children: "delete"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-container-high/90 to-surface-container/70 backdrop-blur-xl p-space-md shadow-md mb-space-xs",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-11 h-11 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(128,131,255,0.25)]",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[24px] text-primary",
                children: "psychiatry"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col min-w-0",
              children: [/*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface font-medium italic leading-relaxed",
                children: "“Consistent small deeds lead to profound inner peace.”"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-secondary font-medium tracking-wide uppercase mt-1",
                children: "Daily Mindfulness Reflection"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("nav", {
      className: "fixed bottom-0 w-full z-50 pb-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl shadow-[0_-1px_16px_rgba(0,0,0,0.4)]",
      "data-active-classes": "text-secondary",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex justify-around items-center h-20 px-space-xs",
        children: [/*#__PURE__*/_jsxDEV("a", {
          onClick: e => {
            e.preventDefault();
            setActiveTab('dashboard');
          },
          className: "flex flex-col items-center justify-center gap-space-xs min-w-[56px] min-h-[44px] text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer",
          "data-path": "home",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "space_dashboard"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm",
            children: "Home"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
          onClick: e => {
            e.preventDefault();
            setActiveTab('finance');
          },
          className: "flex flex-col items-center justify-center gap-space-xs min-w-[56px] min-h-[44px] text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer",
          "data-path": "finance",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "account_balance_wallet"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm",
            children: "Finance"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-center min-w-[56px] min-h-[44px]",
          children: /*#__PURE__*/_jsxDEV("a", {
            onClick: e => e.preventDefault(),
            className: "w-12 h-12 rounded-full bg-gradient-to-tr from-secondary to-primary-container flex items-center justify-center text-surface-container-lowest shadow-[0_0_20px_rgba(76,215,246,0.5)] active:scale-95 transition-all cursor-pointer",
            "data-path": "add-edit-task",
            href: "#",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[26px] font-bold",
              children: "add"
            }, void 0, false)
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("a", {
          onClick: e => {
            e.preventDefault();
            setActiveTab('tasks');
          },
          className: "flex flex-col items-center justify-center gap-space-xs min-w-[56px] min-h-[44px] text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer",
          "data-path": "tasks-and-reminders",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "check_circle"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm",
            children: "Tasks"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
          onClick: e => {
            e.preventDefault();
            setActiveTab('routine');
          },
          "aria-current": "page",
          className: "flex flex-col items-center justify-center gap-space-xs min-w-[56px] min-h-[44px] transition-colors text-secondary cursor-pointer",
          "data-path": "daily-routine",
          href: "#",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "grid_view"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm",
            children: "More"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
}