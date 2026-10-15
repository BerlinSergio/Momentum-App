import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export default function Finance({
  setActiveTab
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const filterDisplay = text => {
    if (!searchQuery) return 'block';
    return text.toLowerCase().includes(searchQuery.toLowerCase()) ? 'block' : 'none';
  };
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container font-body-md text-on-surface relative min-h-screen selection:bg-primary/30 selection:text-indigo-200",
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
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "w-full flex items-center justify-between px-margin pt-1 h-5 text-on-surface-variant select-none",
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "font-label-sm text-label-sm font-semibold tracking-tight text-on-surface",
          children: "9:41"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "w-24 h-4 bg-surface-container rounded-full mx-auto hidden sm:block"
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
            className: "w-8 h-8 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center text-primary",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "bubble_chart"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight",
            children: "Finance"
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
            className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_2px_10px_rgba(99,102,241,0.35)]",
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
        className: "flex flex-col w-full gap-space-md",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-between px-space-xs pt-space-xs",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-headline-md text-headline-md text-on-surface tracking-tight",
              children: "Finance & Expenses"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
              children: "Track spending & financial wellness"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Select month",
            className: "flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container border shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95 transition-transform",
            variant: "pill",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-md text-label-md text-primary",
              children: "October 2026"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[16px] text-primary",
              children: "arrow_drop_down"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "rounded-lg bg-surface-container backdrop-blur-3xl p-5 border shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5),0_1px_2px_rgba(255,255,255,0.05)_inset] relative overflow-hidden",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -right-12 -bottom-10 w-36 h-36 rounded-full bg-gradient-to-br from-primary/20 to-tertiary/15 blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-start justify-between relative z-10",
            children: [/*#__PURE__*/_jsxDEV("div", {
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1.5 mb-1",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[15px]",
                    children: "wallet"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant uppercase tracking-wider",
                  children: "Remaining Balance"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                className: "font-display-lg text-display-lg text-on-surface font-bold tracking-tight",
                children: "$2,750.00"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[14px]",
                children: "eco"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm font-semibold",
                children: "Safe pace"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-2 mt-2 text-on-surface-variant dark:text-on-surface-variant relative z-10",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "w-2 h-2 rounded-full bg-teal-400 animate-pulse"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-body-sm text-body-sm",
              children: ["Safe to spend: ", /*#__PURE__*/_jsxDEV("strong", {
                className: "text-on-surface font-semibold",
                children: "$89.00 / day"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-2 gap-3 mt-4 pt-3.5 bg-surface-container border border-outline-variant rounded-xl p-3 relative z-10",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 text-tertiary",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[15px]",
                  children: "arrow_downward_alt"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm font-medium",
                  children: "Income"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface mt-0.5",
                children: "$6,200.00"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 text-sky-400",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[15px]",
                  children: "arrow_upward_alt"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm font-medium",
                  children: "Expenses"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface mt-0.5",
                children: "$3,450.00"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "mt-4 relative z-10",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex justify-between items-center mb-1.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "Monthly Budget Cap"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-primary font-semibold",
                children: "69% used"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "w-full h-3 bg-surface-container rounded-full overflow-hidden p-0.5 border border-outline-variant",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "h-full bg-gradient-to-r from-primary via-sky-400 to-teal-400 rounded-full",
                style: {
                  width: "69%"
                }
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant mt-1.5 flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "$3,450.00 spent"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "$5,000.00 limit"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "flex flex-col gap-2",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-space-xs",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-md text-label-md text-on-surface-variant tracking-tight uppercase",
              children: "Spending Categories"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              "aria-label": "View breakdown",
              className: "font-label-sm text-label-sm text-primary font-semibold hover:underline",
              variant: "subtle",
              children: "Details"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex gap-2.5 overflow-x-auto pb-1 -mx-margin px-margin",
            children: [/*#__PURE__*/_jsxDEV(GlassCard, {
              className: "shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-surface-container backdrop-blur-xl border shadow-[0_4px_14px_rgba(0,0,0,0.3)]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-9 h-9 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[19px]",
                  children: "home"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                  children: "Housing"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-semibold",
                  children: "$1,450"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-surface-container backdrop-blur-xl border shadow-[0_4px_14px_rgba(0,0,0,0.3)]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/20 flex items-center justify-center text-sky-300",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[19px]",
                  children: "restaurant"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                  children: "Food & Dining"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-semibold",
                  children: "$820"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-surface-container backdrop-blur-xl border shadow-[0_4px_14px_rgba(0,0,0,0.3)]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-9 h-9 rounded-xl bg-secondary/20 border border-purple-400/20 flex items-center justify-center text-secondary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[19px]",
                  children: "shopping_bag"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                  children: "Shopping"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-semibold",
                  children: "$460"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-surface-container backdrop-blur-xl border shadow-[0_4px_14px_rgba(0,0,0,0.3)]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-9 h-9 rounded-xl bg-tertiary/20 border border-teal-400/20 flex items-center justify-center text-tertiary",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[19px]",
                  children: "fitness_center"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                  children: "Wellness"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-semibold",
                  children: "$320"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-surface-container backdrop-blur-xl border shadow-[0_4px_14px_rgba(0,0,0,0.3)]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center text-blue-300",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[19px]",
                  children: "directions_car"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                  children: "Transport"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-semibold",
                  children: "$210"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-surface-container backdrop-blur-xl border shadow-[0_4px_14px_rgba(0,0,0,0.3)]",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/20 flex items-center justify-center text-amber-300",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[19px]",
                  children: "volunteer_activism"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                  children: "Sadaqah"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-semibold",
                  children: "$190"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col gap-2 mt-1",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-2",
            children: [/*#__PURE__*/_jsxDEV(GlassCard, {
              className: "flex-1 flex items-center gap-2 bg-surface-container backdrop-blur-xl px-3.5 py-2.5 rounded-2xl border shadow-[0_2px_10px_rgba(0,0,0,0.3)]",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px] text-on-surface-variant dark:text-on-surface-variant",
                children: "search"
              }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                className: "w-full bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline dark:text-outline focus:outline-none",
                id: "transaction-search",
                placeholder: "Search transactions...",
                type: "text",
                value: searchQuery,
                onChange: e => setSearchQuery(e.target.value)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-primary hover:bg-primary text-on-surface shadow-[0_6px_18px_rgba(79,70,229,0.35)] active:scale-95 transition-all",
              id: "add-expense-btn",
              onClick: handleOpenModal,
              variant: "primary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px] font-semibold",
                children: "add"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md",
                children: "Add"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-space-xs text-on-surface-variant dark:text-on-surface-variant",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-2.5 py-1 rounded-full bg-surface-container border text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1 shadow-sm active:bg-surface-container transition-colors",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: "All Categories"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "expand_more"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-2.5 py-1 rounded-full bg-surface-container border text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1 shadow-sm active:bg-surface-container transition-colors",
                variant: "subtle",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: "Date"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "expand_more"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              "aria-label": "Export statements",
              className: "flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline",
              variant: "subtle",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[14px]",
                children: "ios_share"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Export"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "flex flex-col gap-3 mt-1 pb-4",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-1.5",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between px-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant uppercase tracking-wider font-semibold",
                children: "Today"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "-$73.25"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "transaction-item relative overflow-hidden rounded-2xl bg-surface-container backdrop-blur-xl p-3.5 border shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all",
              style: {
                display: filterDisplay("Organic Groceries Supermarket • 10:15 AM -$64.50")
              },
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-3 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-10 h-10 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "shopping_cart"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-headline-sm text-on-surface truncate",
                      children: "Organic Groceries"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant truncate",
                      children: "Supermarket • 10:15 AM"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2 pl-2 shrink-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
                    children: "-$64.50"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center",
                    children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                      "aria-label": "Edit transaction",
                      className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:bg-surface-container transition-colors",
                      variant: "icon",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "edit"
                      }, void 0, false)
                    }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                      "aria-label": "Delete transaction",
                      className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-rose-400 active:bg-rose-950/40 transition-colors",
                      variant: "icon",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "delete"
                      }, void 0, false)
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "transaction-item relative overflow-hidden rounded-2xl bg-surface-container backdrop-blur-xl p-3.5 border shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all",
              style: {
                display: filterDisplay("Espresso & Pastry Coffee Shop • 8:40 AM -$8.75")
              },
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-3 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/20 flex items-center justify-center text-amber-300 shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "coffee"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-headline-sm text-on-surface truncate",
                      children: "Espresso & Pastry"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant truncate",
                      children: "Coffee Shop • 8:40 AM"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2 pl-2 shrink-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
                    children: "-$8.75"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center",
                    children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                      "aria-label": "Edit transaction",
                      className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:bg-surface-container transition-colors",
                      variant: "icon",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "edit"
                      }, void 0, false)
                    }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                      "aria-label": "Delete transaction",
                      className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-rose-400 active:bg-rose-950/40 transition-colors",
                      variant: "icon",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "delete"
                      }, void 0, false)
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-1.5 mt-1",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between px-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant uppercase tracking-wider font-semibold",
                children: "Yesterday"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "-$215.00"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "transaction-item relative overflow-hidden rounded-2xl bg-surface-container backdrop-blur-xl p-3.5 border shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all",
              style: {
                display: filterDisplay("Equinox Membership Wellness • Oct 23 -$140.00")
              },
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-3 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-10 h-10 rounded-xl bg-tertiary/20 border border-teal-400/20 flex items-center justify-center text-tertiary shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "fitness_center"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-headline-sm text-on-surface truncate",
                      children: "Equinox Membership"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant truncate",
                      children: "Wellness • Oct 23"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2 pl-2 shrink-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
                    children: "-$140.00"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center",
                    children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                      "aria-label": "Edit transaction",
                      className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:bg-surface-container transition-colors",
                      variant: "icon",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "edit"
                      }, void 0, false)
                    }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                      "aria-label": "Delete transaction",
                      className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-rose-400 active:bg-rose-950/40 transition-colors",
                      variant: "icon",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "delete"
                      }, void 0, false)
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "transaction-item relative overflow-hidden rounded-2xl bg-surface-container backdrop-blur-xl p-3.5 border shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all",
              style: {
                display: filterDisplay("High-speed Internet Utilities • Oct 23 -$75.00")
              },
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-3 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center text-blue-300 shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "wifi"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-headline-sm text-on-surface truncate",
                      children: "High-speed Internet"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant truncate",
                      children: "Utilities • Oct 23"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2 pl-2 shrink-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
                    children: "-$75.00"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center",
                    children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                      "aria-label": "Edit transaction",
                      className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:bg-surface-container transition-colors",
                      variant: "icon",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "edit"
                      }, void 0, false)
                    }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                      "aria-label": "Delete transaction",
                      className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-rose-400 active:bg-rose-950/40 transition-colors",
                      variant: "icon",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "delete"
                      }, void 0, false)
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-1.5 mt-1",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between px-space-xs",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant uppercase tracking-wider font-semibold",
                children: "Oct 21"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "-$112.30"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
              className: "transaction-item relative overflow-hidden rounded-2xl bg-surface-container backdrop-blur-xl p-3.5 border shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all",
              style: {
                display: filterDisplay("Weekly Meal Prep & Dining Food • Oct 21 -$112.30")
              },
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-between",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-3 min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400/20 flex items-center justify-center text-orange-300 shrink-0",
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: "material-symbols-outlined text-[20px]",
                      children: "lunch_dining"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-col min-w-0",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "font-headline-sm text-headline-sm text-on-surface truncate",
                      children: "Weekly Meal Prep & Dining"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant truncate",
                      children: "Food • Oct 21"
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center gap-2 pl-2 shrink-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
                    children: "-$112.30"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-center",
                    children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                      "aria-label": "Edit transaction",
                      className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface active:bg-surface-container transition-colors",
                      variant: "icon",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "edit"
                      }, void 0, false)
                    }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                      "aria-label": "Delete transaction",
                      className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-rose-400 active:bg-rose-950/40 transition-colors",
                      variant: "icon",
                      children: /*#__PURE__*/_jsxDEV("span", {
                        className: "material-symbols-outlined text-[16px]",
                        children: "delete"
                      }, void 0, false)
                    }, void 0, false)]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: `fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity duration-300 flex items-end justify-center px-margin pb-6 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`,
          id: "add-modal",
          onClick: e => {
            if (e.target.id === 'add-modal') handleCloseModal();
          },
          children: /*#__PURE__*/_jsxDEV("div", {
            className: `w-full max-w-md bg-surface-container border border-outline-variant rounded-3xl p-5 shadow-2xl flex flex-col gap-4 transform transition-transform duration-300 ${isModalOpen ? 'translate-y-0' : 'translate-y-8'}`,
            id: "modal-box",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-headline-sm text-headline-sm text-on-surface",
                children: "Quick Add Expense"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                "aria-label": "Close modal",
                className: "w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface",
                id: "close-modal-btn",
                onClick: handleCloseModal,
                variant: "icon",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "close"
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col gap-3",
              children: [/*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("label", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant block mb-1",
                  children: "Amount"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center bg-surface-container border rounded-2xl px-3.5 py-2.5",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-md text-headline-md text-primary font-bold mr-1",
                    children: "$"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                    className: "w-full bg-transparent font-headline-md text-headline-md text-on-surface focus:outline-none",
                    placeholder: "0.00",
                    step: "0.01",
                    type: "number"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("label", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant block mb-1",
                  children: "Title"
                }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                  className: "w-full bg-surface-container border rounded-2xl px-3.5 py-2.5 font-body-sm text-body-sm text-on-surface placeholder:text-outline dark:text-outline focus:outline-none",
                  placeholder: "e.g. Artisanal Roastery",
                  type: "text"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("label", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant block mb-1",
                  children: "Category"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "grid grid-cols-3 gap-2",
                  children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "py-2 px-2.5 rounded-xl bg-primary text-on-surface font-label-sm text-label-sm text-center",
                    type: "button",
                    variant: "subtle",
                    children: "Food"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "py-2 px-2.5 rounded-xl bg-surface-container border text-on-surface-variant font-label-sm text-label-sm text-center",
                    type: "button",
                    variant: "subtle",
                    children: "Bills"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                    className: "py-2 px-2.5 rounded-xl bg-surface-container border text-on-surface-variant font-label-sm text-label-sm text-center",
                    type: "button",
                    variant: "subtle",
                    children: "Wellness"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full py-3 rounded-2xl bg-gradient-to-r from-primary via-sky-500 to-teal-400 text-on-surface font-label-md text-label-md font-semibold shadow-[0_8px_20px_rgba(79,70,229,0.4)] active:scale-[0.98] transition-transform",
              id: "save-expense-btn",
              onClick: handleCloseModal,
              variant: "primary",
              children: "Confirm Expense"
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("nav", {
      className: "fixed bottom-0 w-full z-50 pb-safe pointer-events-none",
      "data-active-classes": "bg-primary/20 border border-primary/20 text-primary font-semibold",
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
            "aria-current": "page",
            className: "flex flex-col items-center justify-center flex-1 h-12 rounded-full transition-all bg-primary/20 border border-primary/20 text-primary font-semibold cursor-pointer",
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
              className: "w-14 h-14 -mt-5 rounded-full bg-gradient-to-tr from-primary via-sky-500 to-teal-400 text-on-surface flex items-center justify-center shadow-[0_10px_24px_-2px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95 transition-transform ring-4 ring-[#090d16] cursor-pointer",
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
              children: "More"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false)]
  }, void 0, true);
}