import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
export default function Calendar({
  setActiveTab
}) {
  return /*#__PURE__*/_jsxDEV("div", {
    className: "bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface font-body-md text-body-md flex flex-col min-h-screen",
    children: [/*#__PURE__*/_jsxDEV("header", {
      className: "fixed top-0 w-full z-50 pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-16 px-gutter-mobile flex items-center justify-between gap-space-xs",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs flex-1 min-w-0",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            variant: "icon",
            "aria-label": "Go Back",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:text-secondary transition-colors -ml-1",
            onClick: () => setActiveTab('dashboard'),
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined",
              children: "arrow_back_ios_new"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col truncate",
            children: /*#__PURE__*/_jsxDEV("h1", {
              className: "font-headline-sm text-headline-sm text-on-surface truncate",
              children: "Afghan Solar Calendar"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-space-xs",
          children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "h-9 px-3 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-secondary hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors font-label-md text-label-md flex items-center justify-center",
            variant: "subtle",
            children: "Today"
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "Toggle View",
            className: "w-11 h-11 flex items-center justify-center rounded-full text-on-surface dark:text-on-surface-variant hover:text-on-surface transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined",
              children: "calendar_view_month"
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
            "aria-label": "User Profile",
            className: "w-11 h-11 flex items-center justify-center",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("img", {
              alt: "Profile",
              className: "w-8 h-8 rounded-full object-cover",
              src: "https://lh3.googleusercontent.com/aida/AEtjO1Xqivgb8WnRmLof77BnZPzyZBpzbvUP1AVCrs3mvDfnB_f1RZXcFmBFA_a6HG6vfOogCi-CZxVreOdw6r686Kaf2HymZuMc7nO4lOXpxAOngehZRKb6t3YLAb7DlypVWHqhxt-xTwWeYAmsI6XFcvhYPOLlUX2ysjARmRemkhivrzCI4_28-zoF78qcnwkZuMSSN64w1b-y6TJvnm0moiPO0NRZ0PsoCWGadzO9EQbk1caL1rDfzQ7UFe5rUxR7vqgqDpSqy2PQ"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 flex flex-col relative w-full pt-16 pb-safe px-gutter-mobile bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col w-full space-y-space-md pb-space-xl",
        children: [/*#__PURE__*/_jsxDEV("section", {
          className: "flex flex-col rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-xl relative overflow-hidden",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/10 rounded-full blur-2xl pointer-events-none"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs overflow-x-auto pb-space-xs text-nowrap",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-amber-300 font-label-md text-label-md",
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "🍂"
              }, void 0, false), " • پاییز Autumn"]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "inline-flex items-center px-2.5 py-1 rounded-full bg-primary/15 text-primary font-label-md text-label-md",
              children: "Month 8 of 12"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-label-md text-label-md",
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: "💧"
              }, void 0, false), " Aquifer Season"]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between mt-space-sm",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              "aria-label": "Previous Month",
              className: "w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface transition-colors",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "chevron_left"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center text-center px-space-xs",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-2",
                children: [/*#__PURE__*/_jsxDEV("h2", {
                  className: "font-headline-md text-headline-md text-on-surface ",
                  children: "Aqrab 1405 SH"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm text-secondary font-medium tracking-wide",
                  children: "عقرب ۱۴۰۵"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-0.5",
                children: "Scorpio (لړم) • Oct 23 – Nov 21, 2026 • 30 Days"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(LiquidButton, {
              "aria-label": "Next Month",
              className: "w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface transition-colors",
              variant: "icon",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[18px]",
                children: "chevron_right"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-space-xs mt-space-md overflow-x-auto pb-1",
            children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-md shadow-primary/20 shrink-0",
              variant: "primary",
              children: "All Days"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "px-3.5 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-md text-label-md shrink-0 transition-colors",
              variant: "subtle",
              children: "National Holidays (تعطیلات)"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "px-3.5 py-1.5 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface dark:text-on-surface-variant font-label-md text-label-md shrink-0 transition-colors",
              variant: "subtle",
              children: "Harvest & Cultural"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "flex flex-col rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-xl",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-7 gap-1 text-center mb-space-sm pb-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase",
                children: "Sh"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface ",
                children: "شنبه"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase",
                children: "Yak"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface ",
                children: "۱‌شنبه"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase",
                children: "Do"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface ",
                children: "۲‌شنبه"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase",
                children: "Seh"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface ",
                children: "۳‌شنبه"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase",
                children: "Ch"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface ",
                children: "۴‌شنبه"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant uppercase",
                children: "Panj"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm text-on-surface ",
                children: "۵‌شنبه"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex flex-col items-center text-tertiary",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm uppercase opacity-80",
                children: "Jom"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-body-sm text-body-sm font-semibold",
                children: "جمعه"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-7 gap-1 text-center",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 opacity-30 flex flex-col items-center justify-center p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "۲۵"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline",
                children: "17 Oct"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 opacity-30 flex flex-col items-center justify-center p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "۲۶"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline",
                children: "18 Oct"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 opacity-30 flex flex-col items-center justify-center p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "۲۷"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline",
                children: "19 Oct"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 opacity-30 flex flex-col items-center justify-center p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "۲۸"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline",
                children: "20 Oct"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 opacity-30 flex flex-col items-center justify-center p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "۲۹"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline",
                children: "21 Oct"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 opacity-30 flex flex-col items-center justify-center p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "۳۰"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline",
                children: "22 Oct"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-tertiary font-bold",
                children: "۱"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "23 Oct"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "12 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-gradient-to-br from-primary via-primary-container to-secondary-container text-on-primary flex flex-col items-center justify-center relative p-0.5 shadow-lg shadow-primary/30 transform scale-[1.03] z-10",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-0.5",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md font-bold",
                  children: "۲"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "text-[9px] font-label-sm tracking-tighter uppercase px-1 py-0.2 bg-on-primary/20 rounded",
                  children: "TODAY"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface font-medium leading-none",
                children: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-on-surface leading-tight",
                children: "13 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۳"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: new Date(Date.now() + 86400000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "14 R2"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary absolute bottom-1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۴"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "26 Oct"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "15 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۵"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "27 Oct"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "16 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۶"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "28 Oct"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "17 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۷"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "29 Oct"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "18 R2"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-error absolute bottom-1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-tertiary font-bold",
                children: "۸"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "30 Oct"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "19 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۹"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "31 Oct"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "20 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۱۰"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "01 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "21 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۱۱"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "02 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "22 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۱۲"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "03 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "23 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۱۳"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "04 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "24 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۱۴"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "05 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "25 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-tertiary font-bold",
                children: "۱۵"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "06 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "26 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۱۶"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "07 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "27 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۱۷"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "08 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "28 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۱۸"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "09 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "29 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۱۹"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "10 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "30 R2"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۲۰"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "11 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "01 J1"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-primary absolute bottom-1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۲۱"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "12 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "02 J1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-tertiary font-bold",
                children: "۲۲"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "13 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "03 J1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۲۳"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "14 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "04 J1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۲۴"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "15 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "05 J1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۲۵"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "16 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "06 J1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۲۶"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "17 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "07 J1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۲۷"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "18 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "08 J1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۲۸"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "19 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "09 J1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-tertiary font-bold",
                children: "۲۹"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "20 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "10 J1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors flex flex-col items-center justify-center relative p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-md text-label-md text-on-surface font-semibold",
                children: "۳۰"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-90 text-on-surface dark:text-on-surface-variant leading-none",
                children: "21 Nov"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline leading-tight",
                children: "11 J1"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 opacity-30 flex flex-col items-center justify-center p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "۱"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline",
                children: "22 Nov"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 opacity-30 flex flex-col items-center justify-center p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "۲"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline",
                children: "23 Nov"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 opacity-30 flex flex-col items-center justify-center p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "۳"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline",
                children: "24 Nov"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 opacity-30 flex flex-col items-center justify-center p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "۴"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline",
                children: "25 Nov"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "h-14 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 opacity-30 flex flex-col items-center justify-center p-0.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-outline",
                children: "۵"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm scale-75 text-outline",
                children: "26 Nov"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "flex flex-col rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl p-space-md shadow-xl",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-2",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-2.5 h-2.5 rounded-full bg-secondary shadow-sm shadow-secondary"
              }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
                className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
                children: "Shanbeh, 2 Aqrab 1405"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "px-2.5 py-0.5 rounded-full bg-primary/20 text-primary font-headline-sm text-headline-sm leading-none pt-1",
              children: "امروز"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
            className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant mt-1",
            children: `${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} • 13 Rabi' al-Thani 1448 AH`
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-2 gap-space-sm mt-space-md",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-sm p-space-sm rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-10 h-10 rounded-full bg-amber-400/10 text-amber-300 flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  style: {
                    fontVariationSettings: "'FILL' 1"
                  },
                  children: "wb_sunny"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "Daylight Length"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-semibold truncate",
                  children: "10h 52m (Kabul)"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-space-sm p-space-sm rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0",
                children: /*#__PURE__*/_jsxDEV("span", {
                  className: "material-symbols-outlined text-[20px]",
                  children: "agriculture"
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col min-w-0",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant truncate",
                  children: "Solar Milestone"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-label-md text-label-md text-on-surface font-semibold truncate",
                  children: "Mid-Autumn Harvest"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "flex flex-col space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-1",
            children: [/*#__PURE__*/_jsxDEV("h3", {
              className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
              children: "Afghan Solar Highlights"
            }, void 0, false), /*#__PURE__*/_jsxDEV(LiquidButton, {
              className: "font-label-md text-label-md text-secondary hover:text-secondary-fixed transition-colors flex items-center gap-0.5",
              variant: "subtle",
              children: ["Aqrab Festivals", /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[14px]",
                children: "arrow_forward"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "space-y-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-start gap-space-sm p-space-sm rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl transition-all shadow-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex flex-col items-center justify-center shrink-0 font-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm font-bold leading-none",
                  children: "۳"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "text-[9px] uppercase tracking-wider font-semibold",
                  children: "Aqrab"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex-1 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-center justify-between gap-2",
                  children: [/*#__PURE__*/_jsxDEV("h4", {
                    className: "font-body-md text-body-md text-on-surface font-semibold truncate",
                    children: "UN Day in Afghanistan"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm shrink-0",
                    children: "Tomorrow"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant line-clamp-2 mt-0.5",
                  children: "Youth development roundtables & regional programs"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-start gap-space-sm p-space-sm rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl transition-all shadow-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-12 h-12 rounded-xl bg-error/15 text-error flex flex-col items-center justify-center shrink-0 font-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm font-bold leading-none",
                  children: "۷"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "text-[9px] uppercase tracking-wider font-semibold",
                  children: "Aqrab"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex-1 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("h4", {
                  className: "font-body-md text-body-md text-on-surface font-semibold truncate",
                  children: "Pomegranate Harvest Festival"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant line-clamp-2 mt-0.5",
                  children: "Cultural agro-expo • جشن انار قندهار و تاشقرغان"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-start gap-space-sm p-space-sm rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl transition-all shadow-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "w-12 h-12 rounded-xl bg-primary/15 text-primary flex flex-col items-center justify-center shrink-0 font-label-sm",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "font-headline-sm text-headline-sm font-bold leading-none",
                  children: "۲۰"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "text-[9px] uppercase tracking-wider font-semibold",
                  children: "Aqrab"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex-1 min-w-0",
                children: [/*#__PURE__*/_jsxDEV("h4", {
                  className: "font-body-md text-body-md text-on-surface font-semibold truncate",
                  children: "Eastern Literature & Iqbal Day"
                }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                  className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant line-clamp-2 mt-0.5",
                  children: "Poetic recitations across Kabul, Balkh, and Herat"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "flex flex-col space-y-space-sm",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-between px-1",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center gap-1.5",
              children: /*#__PURE__*/_jsxDEV("h3", {
                className: "font-headline-sm text-headline-sm text-on-surface font-semibold",
                children: "Daily Schedule (امروز)"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
              children: "2 Reminders"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "space-y-space-xs",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-sm rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl transition-all shadow-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-2.5 h-2.5 rounded-full bg-secondary shrink-0 shadow-sm shadow-secondary"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface font-medium truncate",
                  children: "Kabul Central Market Logistics Check"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-secondary font-semibold shrink-0",
                children: "11:30 AM"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "flex items-center justify-between p-space-sm rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 backdrop-blur-xl transition-all shadow-md",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center gap-space-sm min-w-0 pr-2",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "w-2.5 h-2.5 rounded-full bg-tertiary-container shrink-0 shadow-sm shadow-tertiary-container"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "font-body-md text-body-md text-on-surface font-medium truncate",
                  children: "Garden & Orchard Winterization Prep"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "font-label-sm text-label-sm text-tertiary font-semibold shrink-0",
                children: "04:30 PM"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "pt-space-xs",
          children: /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-full py-3.5 px-space-md rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 hover:from-emerald-500 hover:to-sky-600 text-on-surface font-label-lg text-label-lg shadow-lg shadow-teal-900/40 flex items-center justify-center gap-2 active:scale-[0.99] transition-all",
            variant: "none",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "text-lg leading-none",
              children: "⊕"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              children: "Add Solar Event / National Reminder"
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false)]
  }, void 0, true);
}