import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";
export default function AddEditIncome({
  setActiveTab
}) {
  const [amount, setAmount] = useState('5,000.00');
  const [payer, setPayer] = useState('TechCorp Global Ltd.');
  const [memo, setMemo] = useState('Monthly senior design lead compensation & quarterly milestone recognition');
  const [currencyIdx, setCurrencyIdx] = useState(0);
  const [taxActive, setTaxActive] = useState(true);
  const [activeSource, setActiveSource] = useState('Salary');
  const [saveState, setSaveState] = useState('idle'); // 'idle', 'saving', 'saved'

  const currencies = [{
    label: 'USD ($)',
    sym: '$'
  }, {
    label: 'AFN (؋)',
    sym: '؋'
  }, {
    label: 'EUR (€)',
    sym: '€'
  }];
  const sources = [{
    id: 'Salary',
    icon: 'work'
  }, {
    id: 'Freelance',
    icon: 'laptop_mac'
  }, {
    id: 'Business',
    icon: 'storefront'
  }, {
    id: 'Bonus',
    icon: 'featured_seasonal_and_gifts'
  }, {
    id: 'Other',
    icon: 'more_horiz'
  }];
  const handleCurrencyToggle = () => {
    setCurrencyIdx(prev => (prev + 1) % currencies.length);
  };
  const handlePreset = val => {
    setAmount(Number(val).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
  };
  const handleReset = () => {
    setAmount('0.00');
    setPayer('');
    setMemo('');
  };
  const handleSave = () => {
    setSaveState('saving');
    setTimeout(() => {
      setSaveState('saved');
      setTimeout(() => {
        setActiveTab('income_management'); // back to income management
      }, 700);
    }, 800);
  };
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to remove this income entry?')) {
      setActiveTab('income_management');
    }
  };
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-gradient-to-b from-[#080e1a] via-[#0e131f] to-[#121826] text-on-surface min-h-screen relative flex flex-col antialiased selection:bg-primary-container selection:text-on-surface",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-surface-container backdrop-blur-xl border-b border-outline-variant",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-margin flex items-center justify-between",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-sm",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "icon",
            "aria-label": "Go back",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-white/10 active:scale-95 transition-all",
            onClick: () => setActiveTab('finance'),
            type: "button",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "arrow_back"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "font-headline-md text-headline-md text-on-surface select-none",
            children: "Add Income"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Search or secondary action",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface dark:text-on-surface-variant hover:text-on-surface hover:bg-white/10 transition-colors",
            type: "button",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "tune"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "w-8 h-8 rounded-full bg-gradient-to-tr from-primary-container to-[#818cf8] flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.4)]",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-surface text-[18px]",
              children: "person"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 w-full pt-16 pb-safe px-margin",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full pb-12 space-y-space-lg select-none",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-row items-center justify-center gap-2 w-full flex-wrap",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary font-label-md text-label-md backdrop-blur-md",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "w-2 h-2 rounded-full bg-primary animate-pulse"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              children: "New Entry"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
            className: "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 font-label-sm text-label-sm",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[14px]",
              children: "verified"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              children: "Auto-categorized"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "inline-flex items-center justify-center gap-1 px-3 py-1.5 text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors font-label-md text-label-md rounded-full bg-white/5 hover:bg-white/10 border border-white/10 active:scale-95",
            onClick: handleReset,
            type: "button",
            variant: "subtle",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[16px]",
              children: "restart_alt"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              children: "Reset"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "relative overflow-hidden rounded-lg bg-surface-container backdrop-blur-3xl border shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5)] p-space-lg",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary/15 blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-emerald-500/10 blur-xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "relative z-10 flex flex-col space-y-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md tracking-wider text-on-surface-variant dark:text-on-surface-variant uppercase",
                children: "Income Amount"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-1 bg-surface-container border px-2.5 py-1 rounded-full shadow-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant",
                  children: "Currency:"
                }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
                  className: "flex items-center gap-0.5 font-label-md text-label-md text-primary font-semibold",
                  onClick: handleCurrencyToggle,
                  type: "button",
                  variant: "subtle",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    children: currencies[currencyIdx].label
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[14px]",
                    children: "expand_more"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-baseline justify-center py-2",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-display-lg text-display-lg text-emerald-400 font-bold tracking-tight mr-1",
                children: "+"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-display-lg text-display-lg text-emerald-400 font-bold tracking-tight",
                children: currencies[currencyIdx].sym
              }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                "aria-label": "Income Amount Value",
                className: "w-56 bg-transparent font-display-lg text-display-lg text-on-surface font-bold tracking-tight focus:outline-none text-left pl-1",
                inputMode: "decimal",
                type: "text",
                value: amount,
                onChange: e => setAmount(e.target.value)
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between gap-1.5 pt-1",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "pill",
                className: `preset-pill flex-1 py-1.5 px-2 rounded-full font-label-md text-label-md text-center transition-all duration-150 active:scale-95 shadow-sm ${amount === '500.00' ? 'bg-gradient-to-r from-primary to-primary text-on-surface shadow-lg shadow-primary/30 border border-primary/40' : 'bg-surface-container hover:bg-surface-container border text-on-surface'}`,
                onClick: () => handlePreset(500),
                type: "button",
                children: ["+", currencies[currencyIdx].sym, "500"]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "pill",
                className: `preset-pill flex-1 py-1.5 px-2 rounded-full font-label-md text-label-md text-center transition-all duration-150 active:scale-95 shadow-sm ${amount === '1,000.00' ? 'bg-gradient-to-r from-primary to-primary text-on-surface shadow-lg shadow-primary/30 border border-primary/40' : 'bg-surface-container hover:bg-surface-container border text-on-surface'}`,
                onClick: () => handlePreset(1000),
                type: "button",
                children: ["+", currencies[currencyIdx].sym, "1,000"]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "pill",
                className: `preset-pill flex-1 py-1.5 px-2 rounded-full font-label-md text-label-md text-center transition-all duration-150 active:scale-95 shadow-sm ${amount === '2,500.00' ? 'bg-gradient-to-r from-primary to-primary text-on-surface shadow-lg shadow-primary/30 border border-primary/40' : 'bg-surface-container hover:bg-surface-container border text-on-surface'}`,
                onClick: () => handlePreset(2500),
                type: "button",
                children: ["+", currencies[currencyIdx].sym, "2,500"]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "pill",
                className: `preset-pill flex-1 py-1.5 px-2 rounded-full font-label-md text-label-md text-center transition-all duration-150 active:scale-95 shadow-sm ${amount === '5,000.00' ? 'bg-gradient-to-r from-primary to-primary text-on-surface shadow-lg shadow-primary/30 border border-primary/40' : 'bg-surface-container hover:bg-surface-container border text-on-surface'}`,
                onClick: () => handlePreset(5000),
                type: "button",
                children: ["+", currencies[currencyIdx].sym, "5,000"]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              children: [/*#__PURE__*/_jsxDEV("h2", {
                className: "font-headline-sm text-headline-sm text-on-surface",
                children: "Income Source"
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                children: "Choose source type for cashflow analytics"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-primary font-semibold",
              children: "Step 1 of 2"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-5 gap-2 pt-1",
            children: sources.map(src => {
              const isActive = activeSource === src.id;
              return /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                className: `source-card flex flex-col items-center justify-center p-2.5 rounded-lg transition-all duration-200 relative group active:scale-95 ${isActive ? 'bg-surface-container border border-primary/40 shadow-lg shadow-primary/10 bg-gradient-to-b from-primary/20 to-[#121a2a]' : 'bg-surface-container hover:bg-surface-container border border-outline-variant shadow-sm'}`,
                onClick: () => setActiveSource(src.id),
                type: "button",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: `w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${isActive ? 'bg-gradient-to-tr from-primary to-primary text-on-surface shadow-[0_4px_12px_rgba(99,102,241,0.4)]' : 'bg-surface-container text-on-surface-variant dark:text-on-surface-variant'}`,
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[20px]",
                    style: isActive ? {
                      fontVariationSettings: "'FILL' 1"
                    } : {},
                    children: src.icon
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: `font-label-md text-label-md truncate w-full text-center ${isActive ? 'text-on-surface font-semibold' : 'text-on-surface-variant dark:text-on-surface-variant'}`,
                  children: src.id
                }, void 0, false), isActive && /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-on-surface flex items-center justify-center shadow-md",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[10px]",
                    children: "check"
                  }, void 0, false)
                }, void 0, false)]
              }, src.id, true);
            })
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "rounded-lg bg-surface-container backdrop-blur-xl border shadow-[0_12px_36px_rgba(0,0,0,0.35)] p-space-lg space-y-space-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "space-y-1",
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant block",
              htmlFor: "payer-input",
              children: "Source Title / Payer Name"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-sm bg-surface-container border border-outline-variant px-space-md py-2.5 rounded-DEFAULT focus-within:border-primary/50 transition-colors",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-primary text-[20px]",
                children: "domain"
              }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                "aria-label": "Source Title or Payer Name",
                className: "w-full bg-transparent font-body-lg text-body-lg text-on-surface focus:outline-none",
                id: "payer-input",
                type: "text",
                value: payer,
                onChange: e => setPayer(e.target.value)
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-outline dark:text-outline text-[18px]",
                children: "edit"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "space-y-1",
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant block",
              htmlFor: "schedule-trigger",
              children: "Deposit Schedule & Recurrence"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between bg-surface-container border border-outline-variant px-space-md py-2.5 rounded-DEFAULT cursor-pointer hover:bg-surface-container transition-colors",
              id: "schedule-trigger",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-cyan-400 text-[20px]",
                  children: "event_repeat"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface truncate",
                    children: "Oct 01, 2026"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-cyan-400 font-medium",
                    children: "Monthly Recurring (1st of month)"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-on-surface-variant dark:text-on-surface-variant text-[20px]",
                children: "tune"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "space-y-1",
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant block",
              htmlFor: "account-selector",
              children: "Destination Account"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between bg-surface-container border border-outline-variant px-space-md py-2.5 rounded-DEFAULT cursor-pointer hover:bg-surface-container transition-colors",
              id: "account-selector",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "material-symbols-outlined text-[16px]",
                    children: "account_balance"
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-lg text-body-lg text-on-surface",
                    children: "Main Savings"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "•••• 9102 • Momentum Yield+"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-on-surface-variant dark:text-on-surface-variant text-[20px]",
                children: "unfold_more"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "space-y-1",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant block",
                htmlFor: "memo-input",
                children: "Notes & Memo"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline dark:text-outline",
                children: "Optional"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "bg-surface-container border border-outline-variant px-space-md py-2.5 rounded-DEFAULT focus-within:border-primary/50 transition-colors",
              children: /*#__PURE__*/_jsxDEV("textarea", {
                "aria-label": "Notes and Memo",
                className: "w-full bg-transparent font-body-md text-body-md text-on-surface placeholder-slate-500 focus:outline-none resize-none",
                id: "memo-input",
                rows: "2",
                value: memo,
                onChange: e => setMemo(e.target.value)
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "pt-2",
            children: /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-md rounded-DEFAULT bg-emerald-500/10 border border-emerald-500/20",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-start gap-space-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-emerald-400 text-[22px] mt-0.5",
                  style: {
                    fontVariationSettings: "'FILL' 1"
                  },
                  children: "spa"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col pr-2",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-headline-sm text-headline-sm text-on-surface",
                    children: "Auto-calculate Barakah & Zakat"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant",
                    children: "Reserve 2.5% for conscious contribution & tax reserve"
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "subtle",
                "aria-checked": taxActive ? 'true' : 'false',
                className: `w-12 h-6 rounded-full flex items-center p-0.5 transition-colors duration-200 shadow-inner ${taxActive ? 'bg-emerald-500' : 'bg-surface-container-high'}`,
                onClick: () => setTaxActive(!taxActive),
                role: "switch",
                type: "button",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: `w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${taxActive ? 'translate-x-6' : 'translate-x-0'}`
                }, void 0, false)
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(GlassCard, {
          className: "p-space-md rounded-lg bg-surface-container backdrop-blur-md border flex items-center justify-between shadow-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "trending_up"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface",
                children: "Monthly Impact"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-cyan-400 font-semibold",
                children: "+18.4% to liquidity goals"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
            className: "font-headline-sm text-headline-sm text-emerald-400 font-bold",
            children: ["+", currencies[currencyIdx].sym, "4,875.00 ", /*#__PURE__*/_jsxDEV("span", {
              className: "font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant font-normal",
              children: "net"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col space-y-space-sm pt-2",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-full py-4 px-6 rounded-DEFAULT bg-gradient-to-r from-primary via-primary to-primary-container hover:from-primary hover:to-primary-container text-on-surface font-headline-sm text-headline-sm shadow-[0_8px_25px_rgba(99,102,241,0.4)] border border-primary/30 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-75 disabled:cursor-not-allowed",
            disabled: saveState !== 'idle',
            onClick: handleSave,
            type: "button",
            variant: "primary",
            children: [saveState === 'idle' && /*#__PURE__*/_jsxDEV(_Fragment, {
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "Save Income Entry"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "arrow_forward"
              }, void 0, false)]
            }, void 0, true), saveState === 'saving' && /*#__PURE__*/_jsxDEV(_Fragment, {
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px] animate-spin",
                children: "refresh"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Saving Income..."
              }, void 0, false)]
            }, void 0, true), saveState === 'saved' && /*#__PURE__*/_jsxDEV(_Fragment, {
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "check_circle"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Saved Successfully"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-2 gap-3",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              variant: "none",
              className: "w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-300 dark:border-slate-600 transition-all active:scale-95 flex items-center justify-center gap-1.5 backdrop-blur-sm",
              onClick: () => setActiveTab('finance'),
              type: "button",
              children: "Cancel"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "w-full py-2.5 px-4 rounded-xl bg-rose-500/90 hover:bg-rose-600 text-white text-sm font-medium border border-rose-400/30 transition-all active:scale-95 flex items-center justify-center gap-1.5 backdrop-blur-sm shadow-md shadow-rose-500/20",
              onClick: handleDelete,
              type: "button",
              variant: "subtle",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "delete"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Delete Income Record"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
}