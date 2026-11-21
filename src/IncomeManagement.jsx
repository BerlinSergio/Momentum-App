import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const IncomeManagement = ({
  setActiveTab
}) => {
  const [activeFilter, setActiveFilter] = useState('All Sources');
  const filters = [{
    name: 'All Sources',
    count: 5,
    activeClass: 'bg-primary text-on-surface shadow-md shadow-primary/30',
    inactiveClass: 'bg-surface-container-highest backdrop-blur-md border text-on-surface-variant shadow-sm active:bg-surface-container transition-colors'
  }, {
    name: 'Salary',
    count: 1,
    activeClass: 'bg-primary text-on-surface shadow-md shadow-primary/30',
    inactiveClass: 'bg-surface-container-highest backdrop-blur-md border text-on-surface-variant shadow-sm active:bg-surface-container transition-colors'
  }, {
    name: 'Freelance',
    count: 2,
    activeClass: 'bg-primary text-on-surface shadow-md shadow-primary/30',
    inactiveClass: 'bg-surface-container-highest backdrop-blur-md border text-on-surface-variant shadow-sm active:bg-surface-container transition-colors'
  }, {
    name: 'Business',
    count: 1,
    activeClass: 'bg-primary text-on-surface shadow-md shadow-primary/30',
    inactiveClass: 'bg-surface-container-highest backdrop-blur-md border text-on-surface-variant shadow-sm active:bg-surface-container transition-colors'
  }, {
    name: 'Bonus',
    count: 1,
    activeClass: 'bg-primary text-on-surface shadow-md shadow-primary/30',
    inactiveClass: 'bg-surface-container-highest backdrop-blur-md border text-on-surface-variant shadow-sm active:bg-surface-container transition-colors'
  }, {
    name: 'Other',
    count: 0,
    activeClass: 'bg-primary text-on-surface shadow-md shadow-primary/30',
    inactiveClass: 'bg-surface-container-highest backdrop-blur-md border text-outline dark:text-outline shadow-sm active:bg-surface-container opacity-60'
  }];
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface min-h-screen relative flex flex-col selection:bg-primary/30 selection:text-primary/70",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "fixed inset-0 pointer-events-none -z-10 overflow-hidden",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary/15 blur-3xl"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-cyan-600/15 blur-3xl"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute bottom-20 left-1/2 -translate-x-1/2 w-[32rem] h-72 rounded-full bg-tertiary/10 blur-3xl"
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-surface-container backdrop-blur-xl border-b border-outline-variant",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-margin flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "icon",
            "aria-label": "Go back",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors",
            onClick: () => setActiveTab('finance'),
            type: "button",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "arrow_back"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-md text-headline-md text-on-surface select-none tracking-tight",
            children: "Income Management"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Search or secondary action",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors",
            type: "button",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "tune"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_2px_10px_rgba(99,102,241,0.35)]",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-surface text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 w-full bg-transparent pt-16 pb-safe px-margin mt-4",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full pb-32",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-between py-2 mb-2",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-primary text-[18px]",
              children: "calendar_month"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant",
              children: "Period:"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "flex items-center gap-1 bg-surface-container-highest border px-3 py-1 rounded-full text-on-surface transition-all active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.3)]",
              type: "button",
              variant: "pill",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-primary",
                children: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[16px] text-primary",
                children: "keyboard_arrow_down"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-1 text-emerald-400 font-label-sm text-label-sm bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              children: "Live Sync"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "relative w-full rounded-2xl bg-surface-container-highest backdrop-blur-3xl border shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5),0_1px_2px_rgba(255,255,255,0.05)_inset] p-5 mb-space-md overflow-hidden",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -right-12 -top-12 w-44 h-44 rounded-full bg-primary/15 blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-tertiary/10 blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative z-10 flex flex-col gap-4",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-start justify-between",
              children: [/*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant flex items-center gap-1",
                  children: ["Total Monthly Inflow ", /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px] text-outline dark:text-outline",
                    children: "info"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-baseline gap-2 mt-1",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "font-display-lg text-display-lg text-on-surface font-bold tracking-tight",
                    children: "$6,200.00"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2.5 py-1 rounded-full",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[15px]",
                  children: "trending_up"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm font-semibold",
                  children: "+8.4%"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-2 gap-3 pt-2",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "bg-surface-container border border-outline-variant rounded-xl p-3 flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 mb-1",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "w-2 h-2 rounded-full bg-primary"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Active Income"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-on-surface",
                  children: "$5,000.00"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-outline dark:text-outline mt-0.5",
                  children: "80.6% of total"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "bg-surface-container border border-outline-variant rounded-xl p-3 flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 mb-1",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "w-2 h-2 rounded-full bg-sky-400"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Passive & Other"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-on-surface",
                  children: "$1,200.00"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-outline dark:text-outline mt-0.5",
                  children: "19.4% of total"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between bg-primary-container/40 border border-primary/20 backdrop-blur-sm rounded-xl px-3.5 py-2.5 mt-1",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-2.5 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-primary text-[18px]",
                    children: "event_upcoming"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-md text-label-md text-on-surface truncate",
                    children: "TechCorp Salary (+$5,000)"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Oct 31 • Expected in 7 days"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-primary bg-primary-container/60 border border-primary/20 px-2 py-0.5 rounded-full shrink-0 shadow-sm",
                children: "Scheduled"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "flex items-center gap-2.5 mb-space-md",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "flex-1 h-12 rounded-xl bg-gradient-to-r from-primary via-sky-500 to-teal-400 text-on-surface font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-md shadow-primary/30 active:scale-98 transition-transform",
            type: "button",
            variant: "subtle",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "add_circle"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              children: "Add Income"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Export statement",
            className: "h-12 w-12 rounded-xl bg-surface-container-highest backdrop-blur-md border text-on-surface-variant hover:text-on-surface flex items-center justify-center shadow-sm active:scale-95 transition-transform",
            type: "button",
            variant: "subtle",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "download"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Statement reports",
            className: "h-12 w-12 rounded-xl bg-surface-container-highest backdrop-blur-md border text-on-surface-variant hover:text-on-surface flex items-center justify-center shadow-sm active:scale-95 transition-transform",
            type: "button",
            variant: "subtle",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "receipt_long"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-2 mb-3",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex-1 relative flex items-center",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined absolute left-3 text-on-surface-variant dark:text-on-surface-variant text-[20px]",
              children: "search"
            }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
              className: "w-full h-11 pl-10 pr-4 bg-surface-container-highest backdrop-blur-md border rounded-xl text-on-surface placeholder:text-outline dark:text-outline font-body-md text-body-md focus:outline-none shadow-sm",
              placeholder: "Search income sources or notes...",
              type: "text"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Filter by date range",
            className: "h-11 px-3 bg-surface-container-highest backdrop-blur-md border rounded-xl text-on-surface-variant flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform",
            type: "button",
            variant: "pill",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px] text-on-surface-variant dark:text-on-surface-variant",
              children: "calendar_today"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface-variant",
              children: "Date"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-2 overflow-x-auto pb-1 mb-space-md no-scrollbar",
          children: filters.map(filter => /*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "pill",
            className: `shrink-0 px-3.5 py-1.5 rounded-full font-label-md text-label-md ${activeFilter === filter.name ? filter.activeClass : filter.inactiveClass}`,
            onClick: () => setActiveFilter(filter.name),
            type: "button",
            children: [filter.name, " (", filter.count, ")"]
          }, filter.name, true))
        }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
          className: "flex flex-col gap-space-md",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-2.5",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between px-1",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant tracking-wider uppercase",
                children: `This Month • ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "4 Transactions"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "w-full bg-surface-container-highest backdrop-blur-xl border rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.3)] flex flex-col gap-3",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-3",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-11 h-11 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[24px]",
                      children: "corporate_fare"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-headline-sm text-on-surface",
                      children: "TechCorp Solutions"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2 mt-0.5",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "font-label-sm text-label-sm bg-primary/20 border border-primary/20 text-primary px-2 py-0.5 rounded-full",
                        children: "Salary"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                        children: "Oct 01, 2026"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col items-end",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-lg text-headline-lg text-emerald-400 font-bold",
                    children: "+$5,000.00"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Cleared"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between pt-2 border-t border-outline-variant",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-full border border-outline-variant",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px] text-emerald-400",
                    children: "repeat"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Monthly recurring (Day 1)"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1",
                  children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Edit TechCorp income",
                    className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:bg-surface-container transition-colors",
                    type: "button",
                    variant: "icon",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "edit"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Delete TechCorp income",
                    className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-rose-400 active:bg-rose-950/40 transition-colors",
                    type: "button",
                    variant: "icon",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "delete"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "w-full bg-surface-container-highest backdrop-blur-xl border rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.3)] flex flex-col gap-3",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-3",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-11 h-11 rounded-xl bg-secondary/20 border border-purple-400/20 flex items-center justify-center text-secondary shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[24px]",
                      children: "design_services"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-headline-sm text-on-surface",
                      children: "Mobile App UI Design"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2 mt-0.5",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "font-label-sm text-label-sm bg-secondary/20 border border-purple-400/20 text-secondary px-2 py-0.5 rounded-full",
                        children: "Freelance"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                        children: "Oct 14, 2026"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col items-end",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-md text-headline-md text-emerald-400 font-bold",
                    children: "+$650.00"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Invoice #1042"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between pt-2 border-t border-outline-variant",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-full border border-outline-variant",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px] text-on-surface-variant dark:text-on-surface-variant",
                    children: "apartment"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Client: Aura Labs"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1",
                  children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Edit Aura Labs income",
                    className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:bg-surface-container transition-colors",
                    type: "button",
                    variant: "icon",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "edit"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Delete Aura Labs income",
                    className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-rose-400 active:bg-rose-950/40 transition-colors",
                    type: "button",
                    variant: "icon",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "delete"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "w-full bg-surface-container-highest backdrop-blur-xl border rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.3)] flex flex-col gap-3",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-3",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-11 h-11 rounded-xl bg-tertiary/20 border border-teal-400/20 flex items-center justify-center text-tertiary shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[24px]",
                      children: "storefront"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-headline-sm text-on-surface",
                      children: "E-commerce Royalty"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2 mt-0.5",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "font-label-sm text-label-sm bg-tertiary/20 border border-teal-400/20 text-tertiary px-2 py-0.5 rounded-full",
                        children: "Business"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                        children: "Oct 18, 2026"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col items-end",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-md text-headline-md text-emerald-400 font-bold",
                    children: "+$350.00"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Stripe Payout"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between pt-2 border-t border-outline-variant",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-full border border-outline-variant",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px] text-on-surface-variant dark:text-on-surface-variant",
                    children: "auto_awesome"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Digital Design Assets"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1",
                  children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Edit royalty income",
                    className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:bg-surface-container transition-colors",
                    type: "button",
                    variant: "icon",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "edit"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Delete royalty income",
                    className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-rose-400 active:bg-rose-950/40 transition-colors",
                    type: "button",
                    variant: "icon",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "delete"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "w-full bg-surface-container-highest backdrop-blur-xl border rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.3)] flex flex-col gap-3",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-3",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-11 h-11 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[24px]",
                      children: "workspace_premium"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-headline-sm text-on-surface",
                      children: "Q3 Performance Incentive"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2 mt-0.5",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "font-label-sm text-label-sm bg-primary/20 border border-primary/20 text-primary px-2 py-0.5 rounded-full",
                        children: "Bonus"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                        children: "Oct 20, 2026"
                      }, void 0, false)]
                    }, void 0, true)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col items-end",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-md text-headline-md text-emerald-400 font-bold",
                    children: "+$200.00"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "One-time payout"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between pt-2 border-t border-outline-variant",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1.5 bg-surface-container px-2.5 py-1 rounded-full border border-outline-variant",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px] text-on-surface-variant dark:text-on-surface-variant",
                    children: "celebration"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Team KPI Completion"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-1",
                  children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Edit bonus income",
                    className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:bg-surface-container transition-colors",
                    type: "button",
                    variant: "icon",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "edit"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    "aria-label": "Delete bonus income",
                    className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-rose-400 active:bg-rose-950/40 transition-colors",
                    type: "button",
                    variant: "icon",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[16px]",
                      children: "delete"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)
        }, void 0, false), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "w-full bg-surface-container-highest backdrop-blur-xl border rounded-2xl p-4 mt-6 flex items-center gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.3)]",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-secondary/20 border border-purple-400/20 flex items-center justify-center text-secondary shrink-0",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[18px]",
              children: "spa"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-body-sm text-body-sm text-on-surface font-semibold",
              children: "Mindful Prosperity"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
              children: "\"Steady discipline creates lasting tranquility and sustainable abundance.\""
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "fixed bottom-6 inset-x-4 z-40",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "relative w-full h-16 rounded-full bg-surface-container backdrop-blur-3xl border shadow-[0_16px_36px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.08)_inset] flex items-center justify-around px-3",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "subtle",
              className: "flex flex-col items-center justify-center gap-0.5 text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform w-12",
              onClick: () => setActiveTab('dashboard'),
              type: "button",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[22px]",
                children: "home"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-[10px] leading-tight",
                children: "Home"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "subtle",
              className: "flex flex-col items-center justify-center gap-0.5 text-primary active:scale-95 transition-transform w-12 relative",
              onClick: () => setActiveTab('finance'),
              type: "button",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-9 h-6 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  children: "account_balance_wallet"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-[10px] leading-tight text-primary font-semibold",
                children: "Finance"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "relative -top-5 flex items-center justify-center",
              children: /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                "aria-label": "Quick Add",
                className: "w-14 h-14 rounded-full bg-gradient-to-tr from-primary via-sky-500 to-teal-400 flex items-center justify-center text-on-surface shadow-[0_10px_24px_-2px_rgba(99,102,241,0.5)] active:scale-95 transition-transform ring-4 ring-[#090d16]",
                onClick: () => setActiveTab('add_expense'),
                type: "button",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[28px] font-bold",
                  children: "add"
                }, void 0, false)
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "subtle",
              className: "flex flex-col items-center justify-center gap-0.5 text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform w-12",
              onClick: () => setActiveTab('tasks'),
              type: "button",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[22px]",
                children: "checklist"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-[10px] leading-tight",
                children: "Tasks"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "subtle",
              className: "flex flex-col items-center justify-center gap-0.5 text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform w-12",
              onClick: () => setActiveTab('routine'),
              type: "button",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[22px]",
                children: "grid_view"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-[10px] leading-tight",
                children: "More"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default IncomeManagement;