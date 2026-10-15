import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const CurrencySelection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCurrency, setSelectedCurrency] = useState('AFN');
  const [symbolPosition, setSymbolPosition] = useState('right');
  const currencies = [{
    code: 'AFN',
    name: 'Afghan Afghani',
    native: 'افغانۍ (؋)',
    symbol: '؋',
    category: 'asia'
  }, {
    code: 'USD',
    name: 'US Dollar',
    native: 'US Dollar ($)',
    symbol: '$',
    category: 'major'
  }, {
    code: 'EUR',
    name: 'Euro',
    native: 'Euro (€)',
    symbol: '€',
    category: 'major'
  }, {
    code: 'GBP',
    name: 'British Pound',
    native: 'British Pound (£)',
    symbol: '£',
    category: 'major'
  }, {
    code: 'IRR',
    name: 'Iranian Rial',
    native: 'ریال ایران (﷼)',
    symbol: '﷼',
    category: 'asia'
  }, {
    code: 'PKR',
    name: 'Pakistani Rupee',
    native: 'پاکستانی روپیہ (₨)',
    symbol: '₨',
    category: 'asia'
  }, {
    code: 'AED',
    name: 'Emirati Dirham',
    native: 'درهم إماراتي (د.إ)',
    symbol: 'د.إ',
    category: 'middle_east'
  }, {
    code: 'SAR',
    name: 'Saudi Riyal',
    native: 'ريال سعودي (ر.س)',
    symbol: 'ر.س',
    category: 'middle_east'
  }, {
    code: 'TRY',
    name: 'Turkish Lira',
    native: 'Türk Lirası (₺)',
    symbol: '₺',
    category: 'europe'
  }, {
    code: 'INR',
    name: 'Indian Rupee',
    native: 'भारतीय रुपया (₹)',
    symbol: '₹',
    category: 'asia'
  }, {
    code: 'JPY',
    name: 'Japanese Yen',
    native: '日本円 (¥)',
    symbol: '¥',
    category: 'asia'
  }];
  const filteredCurrencies = currencies.filter(c => {
    const matchesQuery = c.code.toLowerCase().includes(searchQuery.toLowerCase()) || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.native.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || c.category === activeFilter;
    return matchesQuery && matchesFilter;
  });
  return /*#__PURE__*/_jsxDEV("div", {
    className: "flex flex-col min-h-screen bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface font-sans overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container relative",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "absolute top-0 right-0 w-[400px] h-[400px] bg-primary-container/15 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-20"
    }, void 0, false), /*#__PURE__*/_jsxDEV("header", {
      className: "sticky top-0 z-40 w-full pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-3xl border-b border-surface-container/50 shadow-sm transition-all duration-300",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center h-14 px-gutter-mobile gap-3",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors shrink-0 -ml-1 text-on-surface dark:text-on-surface-variant hover:text-on-surface ",
            "aria-label": "Go back",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[24px]",
              children: "arrow_back"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col flex-1 overflow-hidden",
            children: /*#__PURE__*/_jsxDEV("h1", {
              className: "font-title-lg text-title-lg text-on-surface font-semibold truncate tracking-tight",
              children: "Base Currency"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "px-gutter-mobile pb-3 pt-1",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "relative group w-full",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface dark:text-on-surface-variant transition-colors group-focus-within:text-primary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "search"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
              type: "text",
              id: "currencySearch",
              className: "w-full h-11 pl-10 pr-10 rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border-none text-on-surface font-body-lg text-body-lg placeholder-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-all shadow-inner shadow-black/5",
              placeholder: "Search currency, code, or country...",
              value: searchQuery,
              onChange: e => setSearchQuery(e.target.value)
            }, void 0, false), searchQuery && /*#__PURE__*/_jsxDEV("div", {
              className: "absolute inset-y-0 right-0 pr-2 flex items-center",
              children: /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "icon",
                className: "w-8 h-8 rounded-full flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
                onClick: () => setSearchQuery(''),
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[18px]",
                  children: "close"
                }, void 0, false)
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 w-full px-gutter-mobile pt-space-sm pb-safe-offset-24 flex flex-col gap-space-md z-10 relative",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "w-full max-w-md mx-auto flex flex-col gap-space-md",
        children: [/*#__PURE__*/_jsxDEV("section", {
          className: "flex items-center gap-2 overflow-x-auto no-scrollbar -mx-gutter-mobile px-gutter-mobile pb-1",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "primary",
            className: `filter-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap border border-transparent ${activeFilter === 'all' ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(128,131,255,0.3)]' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
            onClick: () => setActiveFilter('all'),
            children: "All Currencies"
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "primary",
            className: `filter-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap border border-transparent ${activeFilter === 'major' ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(128,131,255,0.3)]' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
            onClick: () => setActiveFilter('major'),
            children: "Major"
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "primary",
            className: `filter-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap border border-transparent ${activeFilter === 'asia' ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(128,131,255,0.3)]' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
            onClick: () => setActiveFilter('asia'),
            children: "Asia"
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "primary",
            className: `filter-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap border border-transparent ${activeFilter === 'middle_east' ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(128,131,255,0.3)]' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
            onClick: () => setActiveFilter('middle_east'),
            children: "Middle East"
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "primary",
            className: `filter-pill shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all whitespace-nowrap border border-transparent ${activeFilter === 'europe' ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(128,131,255,0.3)]' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
            onClick: () => setActiveFilter('europe'),
            children: "Europe"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center justify-between pl-1",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "font-title-sm text-title-sm text-on-surface dark:text-on-surface-variant font-medium tracking-tight",
            children: "Available Currencies"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm text-primary bg-primary/10 px-2 py-0.5 rounded-md font-mono",
            id: "currencyCounter",
            children: [filteredCurrencies.length, " Currencies"]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 rounded-2xl border border-surface-container shadow-sm overflow-hidden",
          children: /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col",
            id: "currencyListContainer",
            children: [filteredCurrencies.map(currency => /*#__PURE__*/_jsxDEV("div", {
              onClick: () => setSelectedCurrency(currency.code),
              className: `currency-row w-full flex items-center justify-between p-3.5 border-b border-surface-container/50 last:border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 cursor-pointer transition-colors active:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 ${selectedCurrency === currency.code ? 'bg-primary/5' : ''}`,
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-3.5 min-w-0 pr-4",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: `w-11 h-11 rounded-full flex items-center justify-center font-headline-sm text-headline-sm font-semibold shrink-0 transition-colors ${selectedCurrency === currency.code ? 'bg-primary/10 text-primary' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant'}`,
                  children: currency.symbol
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-col min-w-0",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "font-label-lg text-label-lg text-on-surface font-semibold truncate",
                    children: [currency.code, " • ", currency.name]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                    children: currency.native
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true), selectedCurrency === currency.code ? /*#__PURE__*/_jsxDEV("div", {
                className: "w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_12px_rgba(128,131,255,0.5)]",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[16px] font-bold",
                  children: "check"
                }, void 0, false)
              }, void 0, false) : /*#__PURE__*/_jsxDEV("div", {
                className: "w-5 h-5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center"
              }, void 0, false)]
            }, currency.code, true)), filteredCurrencies.length === 0 && /*#__PURE__*/_jsxDEV("div", {
              className: "p-6 text-center text-on-surface dark:text-on-surface-variant font-body-sm",
              children: ["No currencies found for \"", searchQuery, "\"."]
            }, void 0, true)]
          }, void 0, true)
        }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
          className: "w-full rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-space-md shadow-xl flex flex-col gap-space-md",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-sm",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-8 h-8 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-secondary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "tune"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
              className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
              children: "Display Preferences"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col gap-space-xs",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-md text-label-md text-on-surface dark:text-on-surface-variant font-medium",
              children: "Symbol Position"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "grid grid-cols-2 gap-2 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 p-1 rounded-lg",
              children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: `pos-toggle py-2 px-3 rounded-md font-label-md text-label-md transition-all flex items-center justify-center gap-1.5 ${symbolPosition === 'left' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-primary font-semibold shadow-sm' : 'text-on-surface dark:text-on-surface-variant hover:text-on-surface '}`,
                onClick: () => setSymbolPosition('left'),
                type: "button",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: "Left ($100)"
                }, void 0, false), symbolPosition === 'left' && /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "check"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
                variant: "primary",
                className: `pos-toggle py-2 px-3 rounded-md font-label-md text-label-md transition-all flex items-center justify-center gap-1.5 ${symbolPosition === 'right' ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-primary font-semibold shadow-sm' : 'text-on-surface dark:text-on-surface-variant hover:text-on-surface '}`,
                onClick: () => setSymbolPosition('right'),
                type: "button",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: "Right (100 ؋)"
                }, void 0, false), symbolPosition === 'right' && /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[14px]",
                  children: "check"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between p-space-sm rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col min-w-0 pr-2",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-lg text-label-lg text-on-surface font-semibold",
                children: "Decimal Precision"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant truncate",
                children: "Standard bookkeeping format"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "shrink-0 px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-label-sm text-label-sm font-medium",
              children: "2 decimals (.00)"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "pt-space-xs",
          children: /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-full h-13 py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-container via-inverse-primary to-primary text-on-primary font-headline-sm text-headline-sm font-semibold flex items-center justify-center gap-space-sm shadow-[0_0_24px_rgba(128,131,255,0.45)] active:scale-[0.98] transition-all hover:brightness-110",
            type: "button",
            variant: "primary",
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "Confirm Currency Selection"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1",
              children: "arrow_forward"
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
};
export default CurrencySelection;