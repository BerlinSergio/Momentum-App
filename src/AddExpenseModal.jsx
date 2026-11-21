import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { confirm } from './components/ui/confirmation/index.js';
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";
const AddExpenseModal = ({
  setActiveTab
}) => {
  const [amount, setAmount] = useState("64.50");
  const [selectedCategory, setSelectedCategory] = useState("Food & Dining");
  const [note, setNote] = useState("Weekly fresh produce, oats, and almond milk");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const adjustAmount = delta => {
    let current = parseFloat(amount) || 0;
    current += delta;
    setAmount(current.toFixed(2));
  };
  const roundUpAmount = () => {
    let current = parseFloat(amount) || 0;
    setAmount(Math.ceil(current).toFixed(2));
  };
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        // Go back to previous screen (dashboard for preview purposes)
        setActiveTab('dashboard');
      }, 500);
    }, 600);
  };
  const handleDelete = async () => {
    const confirmed = await confirm({
      variant: 'destructive',
      titleKey: 'confirm.deleteExpenseTitle',
      messageKey: 'confirm.deleteExpenseDescription',
      confirmLabelKey: 'confirm.delete',
      cancelLabelKey: 'confirm.cancel',
    });
    if (confirmed) {
      setActiveTab('dashboard');
    }
  };
  const categories = [{
    id: "Food & Dining",
    name: "Food",
    icon: "restaurant",
    iconColorClass: ""
  }, {
    id: "Transportation",
    name: "Transport",
    icon: "directions_car",
    iconColorClass: "text-primary"
  }, {
    id: "Shopping",
    name: "Shopping",
    icon: "shopping_bag",
    iconColorClass: "text-sky-400"
  }, {
    id: "Bills & Utilities",
    name: "Bills",
    icon: "receipt_long",
    iconColorClass: "text-tertiary"
  }, {
    id: "Rent & Housing",
    name: "Rent",
    icon: "home",
    iconColorClass: "text-primary"
  }, {
    id: "Health & Fitness",
    name: "Health",
    icon: "ecg_heart",
    iconColorClass: "text-rose-400"
  }, {
    id: "Education",
    name: "Education",
    icon: "school",
    iconColorClass: "text-secondary"
  }, {
    id: "Entertainment",
    name: "Entertain",
    icon: "movie",
    iconColorClass: "text-cyan-400"
  }, {
    id: "Family & Care",
    name: "Family",
    icon: "group",
    iconColorClass: "text-primary"
  }, {
    id: "Work & Professional",
    name: "Work",
    icon: "business_center",
    iconColorClass: "text-on-surface-variant dark:text-on-surface-variant"
  }, {
    id: "Other",
    name: "Other / Uncategorized",
    icon: "more_horiz",
    iconColorClass: "text-on-surface-variant dark:text-on-surface-variant",
    extraClass: "col-span-2"
  }];
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-surface-container text-on-surface min-h-screen relative flex flex-col selection:bg-primary/30 selection:text-primary/70",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "fixed inset-0 pointer-events-none -z-10 overflow-hidden",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary/15 blur-3xl"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-cyan-600/15 blur-3xl"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute bottom-20 left-1/2 -translate-x-1/2 w-[32rem] h-72 rounded-full bg-tertiary/10 blur-3xl"
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-surface-container backdrop-blur-xl border-b border-outline-variant shadow-[0_1px_12px_rgba(0,0,0,0.5)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-margin flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "icon",
            "aria-label": "Go back",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/5 active:bg-white/10 transition-colors",
            onClick: () => setActiveTab('dashboard'),
            type: "button",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "arrow_back"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-md text-headline-md text-on-surface select-none tracking-tight",
            children: "Edit Expense"
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
      className: "flex-1 w-full bg-transparent pt-16 pb-safe px-margin",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full pb-32 space-y-4 mt-4",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-between px-1",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs bg-surface-container-highest border px-3 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.3)]",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "w-2 h-2 rounded-full bg-primary animate-pulse"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant font-medium tracking-wide",
              children: "EDITING TRANSACTION"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary font-bold ml-0.5",
              children: "#TX-8924"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "flex items-center gap-1 text-rose-300 bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 px-3 py-1.5 rounded-full transition-colors active:scale-95 shadow-sm",
            onClick: handleDelete,
            type: "button",
            variant: "pill",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[15px]",
              children: "delete"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm font-semibold",
              children: "Delete"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "w-full bg-surface-container-highest backdrop-blur-3xl rounded-lg p-5 border shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5),0_1px_2px_rgba(255,255,255,0.05)_inset] relative overflow-hidden flex flex-col items-center",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -right-8 -top-8 w-28 h-28 bg-primary/15 rounded-full blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute -left-8 -bottom-8 w-28 h-28 bg-sky-500/15 rounded-full blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between w-full mb-3 relative z-10",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant dark:text-on-surface-variant",
              children: "Expense Amount"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center bg-surface-container border rounded-full p-0.5 shadow-inner",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary text-on-surface font-semibold shadow-sm transition-all",
                type: "button",
                variant: "subtle",
                children: "USD ($)"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-2.5 py-0.5 rounded-full font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface transition-all",
                type: "button",
                variant: "subtle",
                children: "EUR (€)"
              }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                className: "px-2.5 py-0.5 rounded-full font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface transition-all",
                type: "button",
                variant: "subtle",
                children: "AFN (؋)"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-baseline justify-center gap-1 my-2 relative z-10",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-display-lg text-display-lg text-primary select-none font-bold",
              children: "$"
            }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
              className: "font-display-lg text-display-lg text-on-surface bg-transparent text-center focus:outline-none max-w-[190px] font-bold tracking-tight caret-primary",
              inputMode: "decimal",
              type: "text",
              value: amount,
              onChange: e => setAmount(e.target.value)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
            className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant mb-4 relative z-10",
            children: "Tap number to adjust custom balance"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-center flex-wrap gap-2 w-full pt-1 relative z-10",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "pill",
              className: "px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container border text-on-surface font-label-md text-label-md transition-all active:scale-95 shadow-sm",
              onClick: () => adjustAmount(10),
              type: "button",
              children: "+ $10"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "pill",
              className: "px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container border text-on-surface font-label-md text-label-md transition-all active:scale-95 shadow-sm",
              onClick: () => adjustAmount(25),
              type: "button",
              children: "+ $25"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "pill",
              className: "px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container border text-on-surface font-label-md text-label-md transition-all active:scale-95 shadow-sm",
              onClick: () => adjustAmount(50),
              type: "button",
              children: "+ $50"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "px-3 py-1.5 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary font-label-md text-label-md transition-all active:scale-95 flex items-center gap-1 shadow-sm",
              onClick: roundUpAmount,
              type: "button",
              variant: "pill",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[14px]",
                children: "arrow_upward"
              }, void 0, false), "Round Up"]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "w-full bg-surface-container-highest backdrop-blur-3xl rounded-lg p-5 border shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5),0_1px_2px_rgba(255,255,255,0.05)_inset] space-y-3",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-baseline justify-between",
            children: [/*#__PURE__*/_jsxDEV("div", {
              children: [/*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface tracking-tight",
                children: "Category"
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "Classify this transaction"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary font-medium",
              children: selectedCategory
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-3 gap-2 pt-1",
            children: categories.map(cat => {
              const isActive = selectedCategory === cat.id;
              return /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: `flex items-center gap-2 p-2.5 rounded-DEFAULT font-label-md text-label-md transition-all text-left ${cat.extraClass || ''} ${isActive ? 'bg-primary text-on-surface shadow-md shadow-primary/30 border border-primary/30' : 'bg-surface-container hover:bg-surface-container border border-outline-variant text-on-surface'}`,
                onClick: () => setSelectedCategory(cat.id),
                type: "button",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: `material-symbols-outlined text-[18px] ${isActive ? '' : cat.iconColorClass}`,
                  children: cat.icon
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "truncate",
                  children: cat.name
                }, void 0, false), isActive && /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[15px] ml-auto",
                  children: "check"
                }, void 0, false)]
              }, cat.id, true);
            })
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "w-full bg-surface-container-highest backdrop-blur-3xl rounded-lg p-5 border shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5),0_1px_2px_rgba(255,255,255,0.05)_inset] space-y-4",
          children: [/*#__PURE__*/_jsxDEV("h2", {
            className: "font-headline-sm text-headline-sm text-on-surface tracking-tight",
            children: "Transaction Details"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-1",
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant uppercase tracking-wider",
              children: "Date & Time"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container border border-outline-variant hover: hover:bg-surface-container transition-colors cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-2.5",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center text-primary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "calendar_today"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-md text-body-md font-semibold text-on-surface",
                    children: `Today, ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "10:15 AM"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-on-surface-variant dark:text-on-surface-variant text-[18px]",
                children: "edit_calendar"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-1",
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant uppercase tracking-wider",
              children: "Merchant / Payee"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2.5 p-3 rounded-DEFAULT bg-surface-container border border-outline-variant focus-within:border-primary/40 focus-within:bg-surface-container transition-colors",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/20 flex items-center justify-center text-sky-300 shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "storefront"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                className: "w-full font-body-md text-body-md font-semibold text-on-surface bg-transparent focus:outline-none",
                placeholder: "Who did you pay?",
                type: "text",
                defaultValue: "Organic Groceries Market"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-1",
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant uppercase tracking-wider",
              children: "Payment Account"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-3 rounded-DEFAULT bg-surface-container border border-outline-variant hover: hover:bg-surface-container transition-colors cursor-pointer",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-2.5",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-8 h-8 rounded-full bg-tertiary/20 border border-teal-400/20 flex items-center justify-center text-tertiary",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[18px]",
                    children: "credit_card"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  children: [/*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-md text-body-md font-semibold text-on-surface",
                    children: "Default Checking"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                    className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "•••• 4821"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-on-surface-variant dark:text-on-surface-variant text-[18px]",
                children: "expand_more"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col space-y-1",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant uppercase tracking-wider",
                children: "Notes & Receipt"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline dark:text-outline",
                children: [note.length, " / 140"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "p-3 rounded-DEFAULT bg-surface-container border border-outline-variant focus-within:border-primary/40 focus-within:bg-surface-container transition-colors flex flex-col gap-2",
              children: [/*#__PURE__*/_jsxDEV("textarea", {
                className: "w-full font-body-md text-body-md text-on-surface placeholder:text-outline dark:text-outline bg-transparent focus:outline-none resize-none",
                maxLength: "140",
                placeholder: "Add an optional note...",
                rows: "2",
                value: note,
                onChange: e => setNote(e.target.value)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-2 pt-1 border-t border-outline-variant",
                children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container border hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm transition-colors",
                  type: "button",
                  variant: "subtle",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px] text-tertiary",
                    children: "receipt"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: "Receipt Attached"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "flex items-center gap-1 px-2 py-1 rounded-full text-primary hover:bg-primary/10 font-label-sm text-label-sm transition-colors",
                  type: "button",
                  variant: "pill",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "add_a_photo"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: "Replace"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "space-y-3 pt-2",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-primary via-primary to-primary-container text-on-surface font-headline-sm text-headline-sm shadow-lg shadow-primary/40 hover:shadow-lg shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2",
            onClick: handleSave,
            type: "button",
            variant: "primary",
            children: isSaving ? /*#__PURE__*/_jsxDEV(_Fragment, {
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px] animate-spin",
                children: "refresh"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Saving..."
              }, void 0, false)]
            }, void 0, true) : isSaved ? /*#__PURE__*/_jsxDEV(_Fragment, {
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "done_all"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Updated!"
              }, void 0, false)]
            }, void 0, true) : /*#__PURE__*/_jsxDEV(_Fragment, {
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "check_circle"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Save Changes"
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-2 gap-3",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "none",
              className: "w-full py-3 px-4 rounded-full bg-surface-container-highest border hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-body-lg text-body-lg text-center transition-colors active:scale-95",
              onClick: () => setActiveTab('dashboard'),
              type: "button",
              children: "Cancel"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full py-3 px-4 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:bg-rose-500/30 font-body-lg text-body-lg text-center active:scale-95 transition-all flex items-center justify-center gap-1.5",
              onClick: handleDelete,
              type: "button",
              variant: "none",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "delete"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Delete"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default AddExpenseModal;