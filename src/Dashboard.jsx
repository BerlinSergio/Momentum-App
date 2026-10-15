import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export default function Dashboard({
  setActiveTab
}) {
  const toggleTask = e => {
    const element = e.currentTarget;
    const box = element.querySelector('.check-box');
    const title = element.querySelector('.task-title');
    const isCompleted = box.classList.contains('bg-primary');
    if (isCompleted) {
      box.classList.remove('bg-primary', 'text-on-surface');
      box.classList.add('bg-surface-container-high/60', 'text-transparent', 'border', '');
      title.classList.remove('line-through', 'opacity-60', 'text-on-surface-variant dark:text-on-surface-variant');
      title.classList.add('font-medium', 'text-on-surface');
    } else {
      box.classList.remove('bg-surface-container-high/60', 'text-transparent', 'border', '');
      box.classList.add('bg-primary', 'text-on-surface');
      title.classList.add('line-through', 'opacity-60', 'text-on-surface-variant dark:text-on-surface-variant');
      title.classList.remove('font-medium', 'text-on-surface');
    }
  };
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-gradient-to-b from-[#090d16] via-[#0d1527] to-[#090d16] font-body-md text-on-surface relative min-h-screen selection:bg-primary-container selection:text-on-surface",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "fixed inset-0 pointer-events-none -z-10 overflow-hidden",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary-container/35 blur-3xl"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-purple-900/30 blur-3xl"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute bottom-20 left-1/2 -translate-x-1/2 w-[32rem] h-72 rounded-full bg-teal-900/25 blur-3xl"
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-surface-container backdrop-blur-xl border-b border-outline-variant/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.4)]",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "w-full flex items-center justify-between px-margin pt-1 h-5 text-on-surface select-none",
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "font-label-sm text-label-sm font-semibold tracking-tight text-on-surface",
          children: "9:41"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "w-24 h-4 bg-white/20 rounded-full mx-auto hidden sm:block"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-1.5 text-on-surface",
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
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight",
            children: "Home"
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
            className: "w-8 h-8 rounded-full bg-primary-container border border-primary/40 flex items-center justify-center shadow-[0_2px_12px_rgba(99,102,241,0.4)]",
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
        className: "flex flex-col w-full gap-y-3.5 pb-6",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-between pt-1 px-1",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col min-w-0 pr-2",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-md text-headline-md text-on-surface tracking-tight",
                children: "Good Evening, Milad"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "text-[20px] select-none",
                children: "👋"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant truncate mt-0.5",
              children: "Stay consistent. Small steps every day."
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary font-semibold tracking-wide uppercase mt-1",
              children: "Monday, 24 Oct"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative shrink-0",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute -inset-1 rounded-full bg-gradient-to-tr from-primary/40 via-secondary/30 to-teal-400/40 blur-md"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "relative w-12 h-12 rounded-full overflow-hidden bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 ring-2 ring-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.5)]",
              children: /*#__PURE__*/_jsxDEV("img", {
                className: "w-full h-full object-cover",
                "data-alt": "Close-up portrait of a cheerful young woman named Aisha wearing an elegant soft beige silk hijab, glowing natural morning lighting, gentle smile, serene and peaceful expression, soft airy pastel background",
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdYkrzI3R4kalTKYaE88l6Az9YRH83KEhalNdPQ5IVFnjS3yBHw16Mo2vlV5X8KoWtLs9DDy-JeihIp9s7YZ29Lc18uzZ8c8UBxp24ztO7uPHrFPTkoNJp1OUYWKchj-IuuxZY4PpqYn00Ww7WWjBRRIGVMLcjt6OMlay7Xe-Jj_YA6Mi4TXwjhOewnE1o_OHuzopEPRm_PcdJQbHOngsnQB085TYf6chwHizjlkQN-66K3bq4NxA",
                alt: "Profile"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "relative overflow-hidden rounded-lg bg-[rgba(19,26,42,0.75)] backdrop-blur-3xl p-5 border shadow-[0_16px_36px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.08)_inset]",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -top-16 -right-12 w-44 h-44 rounded-full bg-gradient-to-br from-primary/20 to-secondary/15 blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative flex items-center justify-between mb-4",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-8 h-8 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "account_balance_wallet"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface",
                children: "Financial Health"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 font-semibold",
              children: "October"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative grid grid-cols-3 gap-2 py-2 mb-3",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant mb-0.5",
                children: "Income"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight",
                children: "؋85,000"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-tertiary flex items-center gap-0.5 mt-0.5 font-medium",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "trending_up"
                }, void 0, false), "+8.4%"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col px-2 border-l ",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant mb-0.5",
                children: "Expenses"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight",
                children: "؋31,500"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant flex items-center gap-0.5 mt-0.5",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px] text-tertiary",
                  children: "check_circle"
                }, void 0, false), "Safe limit"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col pl-2 border-l ",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant mb-0.5",
                children: "Main Balance"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-primary font-bold tracking-tight",
                children: "+؋53,500"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-secondary flex items-center gap-0.5 mt-0.5 font-semibold",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "savings"
                }, void 0, false), "44.3%"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative flex flex-col gap-1.5 pt-2",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "Savings Target (؋60,000)"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-primary font-bold",
                children: "91.6%"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "w-full h-2 rounded-full bg-surface-container/80 overflow-hidden p-0.5 shadow-inner border border-outline-variant",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "h-full rounded-full bg-gradient-to-r from-primary via-secondary to-teal-400 shadow-[0_0_12px_rgba(99,102,241,0.6)] transition-all duration-700",
                style: {
                  width: "91.6%"
                }
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "grid grid-cols-4 gap-2.5",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "flex flex-col items-center justify-center p-3 rounded-DEFAULT bg-[rgba(19,26,42,0.72)] backdrop-blur-xl border shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-95 transition-transform group",
            variant: "subtle",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-10 h-10 rounded-full bg-primary/15 group-hover:bg-primary group-hover:text-on-surface flex items-center justify-center text-primary transition-colors border border-primary/20",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "add_card"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface font-medium text-center mt-2 leading-none",
              children: "Log Cost"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "flex flex-col items-center justify-center p-3 rounded-DEFAULT bg-[rgba(19,26,42,0.72)] backdrop-blur-xl border shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-95 transition-transform group",
            variant: "subtle",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-10 h-10 rounded-full bg-secondary/15 group-hover:bg-secondary group-hover:text-on-surface flex items-center justify-center text-secondary transition-colors border border-secondary/20",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "add_task"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface font-medium text-center mt-2 leading-none",
              children: "Add Task"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "flex flex-col items-center justify-center p-3 rounded-DEFAULT bg-[rgba(19,26,42,0.72)] backdrop-blur-xl border shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-95 transition-transform group",
            variant: "subtle",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-10 h-10 rounded-full bg-tertiary/15 group-hover:bg-teal-400 group-hover:text-on-surface flex items-center justify-center text-tertiary transition-colors border border-tertiary/20",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "bedtime"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface font-medium text-center mt-2 leading-none",
              children: "Prayers"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "flex flex-col items-center justify-center p-3 rounded-DEFAULT bg-[rgba(19,26,42,0.72)] backdrop-blur-xl border shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-95 transition-transform group",
            variant: "subtle",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-10 h-10 rounded-full bg-surface-container/80 group-hover:bg-primary group-hover:text-on-surface flex items-center justify-center text-on-surface-variant transition-colors border border-outline-variant",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "self_improvement"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface font-medium text-center mt-2 leading-none",
              children: "Reflect"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "relative overflow-hidden rounded-lg bg-[rgba(19,26,42,0.75)] backdrop-blur-3xl p-5 border shadow-[0_16px_36px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.08)_inset]",
          children: [/*#__PURE__*/_jsxDEV("svg", {
            className: "absolute -bottom-2 -right-4 w-48 h-36 opacity-[0.08] text-primary pointer-events-none",
            fill: "currentColor",
            viewBox: "0 0 200 150",
            children: [/*#__PURE__*/_jsxDEV("path", {
              d: "M100 20 C95 40 85 55 85 75 L115 75 C115 55 105 40 100 20 Z"
            }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
              d: "M70 60 C65 72 58 82 58 95 L82 95 C82 82 75 72 70 60 Z"
            }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
              d: "M130 60 C125 72 118 82 118 95 L142 95 C142 82 135 72 130 60 Z"
            }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
              height: "60",
              rx: "4",
              width: "8",
              x: "20",
              y: "90"
            }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
              d: "M24 75 L20 90 L28 90 Z"
            }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
              height: "60",
              rx: "4",
              width: "8",
              x: "172",
              y: "90"
            }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
              d: "M176 75 L172 90 L180 90 Z"
            }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
              height: "55",
              rx: "6",
              width: "120",
              x: "40",
              y: "95"
            }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
              cx: "100",
              cy: "120",
              fill: "#090d16",
              r: "14"
            }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
              cx: "70",
              cy: "124",
              fill: "#090d16",
              r: "9"
            }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
              cx: "130",
              cy: "124",
              fill: "#090d16",
              r: "9"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative flex items-center justify-between mb-3.5",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-8 h-8 rounded-full bg-secondary/15 border border-secondary/25 flex items-center justify-center text-secondary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "sync"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface",
                children: "Routine & Prayer"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "font-label-md text-label-md text-primary font-semibold hover:opacity-80 transition-opacity",
              variant: "primary",
              children: "Edit"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative flex items-center justify-between p-3.5 rounded-DEFAULT bg-gradient-to-r from-primary-container/70 via-purple-950/50 to-slate-900/60 border border-primary/20 mb-4 shadow-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2.5",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-sm",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  style: {
                    fontVariationSettings: "'FILL' 1"
                  },
                  children: "light_mode"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface-variant font-medium",
                  children: "Next: Maghrib in 01h 42m"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-on-surface font-bold",
                  children: "18:24"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "px-2.5 py-1 rounded-full bg-primary text-on-surface font-label-sm text-label-sm font-semibold shadow-[0_2px_12px_rgba(129,140,248,0.4)]",
              children: "Upcoming"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "relative flex items-center justify-between gap-1.5 pt-1",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center flex-1 py-1.5 px-1 rounded-DEFAULT bg-surface-container/50 border border-outline-variant",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "Fajr"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface font-semibold my-1",
                children: "5:12 A"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "w-5 h-5 rounded-full bg-tertiary/20 border border-teal-400/40 text-tertiary flex items-center justify-center",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[13px] font-bold",
                  children: "check"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center flex-1 py-1.5 px-1 rounded-DEFAULT bg-primary/20 border border-primary/40 shadow-sm",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-primary font-bold",
                children: "Dhuhr"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-primary font-bold my-1",
                children: "1:05 P"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "w-5 h-5 rounded-full bg-primary text-on-surface flex items-center justify-center shadow-[0_0_10px_rgba(129,140,248,0.7)] animate-pulse",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[13px]",
                  children: "alarm"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center flex-1 py-1.5 px-1 rounded-DEFAULT bg-surface-container/30 border border-outline-variant",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "Asr"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant font-medium my-1",
                children: "4:28 P"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "w-4 h-4 rounded-full bg-surface-container-high/60 flex items-center justify-center"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center flex-1 py-1.5 px-1 rounded-DEFAULT bg-surface-container/30 border border-outline-variant",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "Magh"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant font-medium my-1",
                children: "6:42 P"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "w-4 h-4 rounded-full bg-surface-container-high/60 flex items-center justify-center"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center flex-1 py-1.5 px-1 rounded-DEFAULT bg-surface-container/30 border border-outline-variant",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "Isha"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant font-medium my-1",
                children: "8:05 P"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "w-4 h-4 rounded-full bg-surface-container-high/60 flex items-center justify-center"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "relative overflow-hidden rounded-lg bg-[rgba(19,26,42,0.75)] backdrop-blur-3xl p-5 border shadow-[0_16px_36px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.08)_inset]",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between mb-4",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-8 h-8 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "checklist"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface",
                children: "Today's Tasks"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "pill",
              className: "!bg-primary/20 !border !border-primary/30 hover:!bg-primary-container !text-primary hover:!text-on-surface !flex !items-center !gap-1 !px-3 !py-1",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px] font-bold",
                children: "add"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-semibold",
                children: "Add Task"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-2.5",
            id: "taskList",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "task-item flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container/40 border border-outline-variant hover:bg-surface-container/60 transition-colors cursor-pointer group",
              onClick: toggleTask,
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "check-box w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-surface shadow-sm transition-all shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px] font-bold",
                    children: "check"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "task-title font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant line-through opacity-60 truncate",
                  children: "Drink 500ml water"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1.5 shrink-0 text-on-surface-variant dark:text-on-surface-variant font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "schedule"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "10:00 AM"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "task-item flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container/40 border border-outline-variant hover:bg-surface-container/60 transition-colors cursor-pointer group",
              onClick: toggleTask,
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "check-box w-5 h-5 rounded-full bg-surface-container-high/60 border flex items-center justify-center text-transparent group-hover:text-primary/60 transition-all shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px] font-bold",
                  children: "check"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "task-title font-body-md text-body-md text-on-surface font-medium truncate",
                children: "Review quarterly budget"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1.5 shrink-0 text-on-surface-variant dark:text-on-surface-variant font-label-sm text-label-sm",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[14px]",
                children: "schedule"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "11:30 AM"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "task-item flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container/40 border border-outline-variant hover:bg-surface-container/60 transition-colors cursor-pointer group",
              onClick: toggleTask,
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "check-box w-5 h-5 rounded-full bg-surface-container-high/60 border flex items-center justify-center text-transparent group-hover:text-primary/60 transition-all shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px] font-bold",
                    children: "check"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "task-title font-body-md text-body-md text-on-surface font-medium truncate",
                  children: "Read 20 min Quran & reflection"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1.5 shrink-0 text-on-surface-variant dark:text-on-surface-variant font-label-sm text-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "schedule"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "8:00 PM"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "relative overflow-hidden rounded-lg bg-gradient-to-r from-primary-container/60 via-purple-950/40 to-slate-900/70 border backdrop-blur-xl p-4 shadow-sm flex items-center justify-between",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-3",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "spa"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col min-w-0",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface text-[14px] leading-tight font-semibold",
                children: "Mindful Streak: 14 Days"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface-variant truncate",
                children: "\"Peace comes from within. Do not seek it without.\""
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "w-7 h-7 rounded-full bg-surface-container/80 border flex items-center justify-center text-primary shrink-0 shadow-sm",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px]",
              children: "chevron_right"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("nav", {
      className: "fixed bottom-0 w-full z-50 pb-safe pointer-events-none",
      "data-active-classes": "bg-primary/25 text-primary font-semibold",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "px-margin pb-space-md pt-space-xs",
        children: /*#__PURE__*/_jsxDEV("div", {
          className: "pointer-events-auto mx-auto max-w-[390px] h-[68px] px-space-xs rounded-full bg-[rgba(15,21,35,0.85)] border backdrop-blur-3xl shadow-[0_16px_40px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)_inset] flex items-center justify-between",
          children: [/*#__PURE__*/_jsxDEV("a", {
            onClick: e => {
              e.preventDefault();
              setActiveTab('dashboard');
            },
            "aria-current": "page",
            className: "flex flex-col items-center justify-center flex-1 h-12 rounded-full transition-all bg-primary/25 border border-primary/30 text-primary font-semibold cursor-pointer",
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
              className: "w-14 h-14 -mt-5 rounded-full bg-gradient-to-tr from-primary via-secondary to-teal-400 text-on-surface flex items-center justify-center shadow-[0_8px_24px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95 transition-transform ring-4 ring-[#0f1523] cursor-pointer",
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
            className: "flex flex-col items-center justify-center flex-1 h-12 rounded-full text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface transition-all cursor-pointer",
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
              children: "Routine"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
}