import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import AppShell from "./components/ui/AppShell";
import React, { useState, useEffect } from 'react';
import LiquidButton from './components/ui/LiquidButton';
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
const CitySelection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Kabul');
  const [customCoordsOpen, setCustomCoordsOpen] = useState(false);
  const cities = [{
    name: 'Kabul',
    country: 'Afghanistan',
    lat: '34.5553° N',
    lng: '69.2075° E',
    elevation: '1,791m'
  }, {
    name: 'Herat',
    country: 'Afghanistan',
    lat: '34.3529° N',
    lng: '62.2040° E',
    elevation: '920m'
  }, {
    name: 'Mazar-i-Sharif',
    country: 'Afghanistan',
    lat: '36.7061° N',
    lng: '67.1108° E',
    elevation: '380m'
  }, {
    name: 'Kandahar',
    country: 'Afghanistan',
    lat: '31.6289° N',
    lng: '65.7372° E',
    elevation: '1,010m'
  }, {
    name: 'Jalalabad',
    country: 'Afghanistan',
    lat: '34.4265° N',
    lng: '70.4515° E',
    elevation: '575m'
  }];
  return /*#__PURE__*/_jsxDEV("div", {
    className: "flex flex-col min-h-screen bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none text-on-surface font-sans selection:bg-primary/30 selection:text-primary selection:backdrop-blur-sm relative overflow-hidden",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -mr-32 -mt-32"
    }, void 0, false), /*#__PURE__*/_jsxDEV("header", {
      className: "sticky top-0 z-40 w-full pt-safe bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none backdrop-blur-xl shadow-sm border-b border-surface-container/50",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "flex items-center h-14 px-gutter-mobile gap-3",
        children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
          className: "w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 active:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors shrink-0 -ml-1 text-on-surface dark:text-on-surface-variant hover:text-on-surface ",
          "aria-label": "Back",
          variant: "icon",
          children: /*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[24px]",
            children: "arrow_back"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col flex-1 overflow-hidden",
          children: [/*#__PURE__*/_jsxDEV("h1", {
            className: "font-title-lg text-title-lg text-on-surface font-medium truncate tracking-tight",
            children: "Location Context"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant truncate",
            children: "For precise solar rhythms & Islamic timings"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "flex-1 w-full px-gutter-mobile pt-space-md pb-safe space-y-space-md",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "relative group",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface dark:text-on-surface-variant group-focus-within:text-primary transition-colors",
          children: /*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[22px]",
            children: "search"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
          type: "text",
          className: "w-full h-13 pl-11 pr-11 rounded-2xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 border border-surface-container text-on-surface font-body-lg text-body-lg placeholder-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all shadow-sm",
          placeholder: "Search city or enter coords...",
          value: searchQuery,
          onChange: e => setSearchQuery(e.target.value)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute inset-y-0 right-0 pr-2 flex items-center",
          children: /*#__PURE__*/_jsxDEV(LiquidButton, {
            className: "w-9 h-9 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-on-surface dark:text-on-surface-variant hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 transition-colors",
            variant: "icon",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[20px]",
              children: "my_location"
            }, void 0, false)
          }, void 0, false)
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "p-4 rounded-2xl bg-gradient-to-br from-surface-container-low to-surface-container-lowest border border-surface-container relative overflow-hidden shadow-sm",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute right-0 top-0 w-24 h-24 bg-secondary-container/20 rounded-bl-full blur-2xl"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-start justify-between relative z-10",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-label-sm text-label-sm text-secondary font-medium uppercase tracking-wider mb-1 flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"
              }, void 0, false), "Active Location"]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "font-headline-md text-headline-md text-on-surface font-semibold tracking-tight",
              children: "Kabul"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-body-md text-body-md text-on-surface dark:text-on-surface-variant mt-0.5",
              children: "Afghanistan"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary border border-secondary/10",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-[22px]",
              children: "location_on"
            }, void 0, false)
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-3 mt-4 pt-4 border-t border-surface-container-high/30 font-mono font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "opacity-60 text-[10px] uppercase mb-0.5",
              children: "Coordinates"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              children: "34.5553° N, 69.2075° E"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "w-px h-6 bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "opacity-60 text-[10px] uppercase mb-0.5",
              children: "Elevation"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              children: "1,791m MSL"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col gap-2",
        id: "cityList",
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "font-title-sm text-title-sm text-on-surface dark:text-on-surface-variant font-medium px-1 pb-1",
          children: "Recommended for you"
        }, void 0, false), cities.map(city => /*#__PURE__*/_jsxDEV("div", {
          onClick: () => setSelectedCity(city.name),
          className: `w-full flex items-center justify-between p-3.5 rounded-xl cursor-pointer select-none transition-all active:scale-[0.99] ${selectedCity === city.name ? 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 shadow-md' : 'bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0'}`,
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col min-w-0 pr-3",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "font-headline-sm text-headline-sm text-on-surface font-semibold truncate",
              children: city.name
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "font-body-sm text-body-sm text-on-surface dark:text-on-surface-variant pt-0.5 truncate",
              children: city.country
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: `flex items-center gap-2 pt-1 font-label-sm text-label-sm font-mono ${selectedCity === city.name ? 'text-secondary' : 'text-on-surface dark:text-on-surface-variant/80'}`,
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: [city.lat, ", ", city.lng]
              }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                className: "text-outline",
                children: "•"
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: city.elevation
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), selectedCity === city.name ? /*#__PURE__*/_jsxDEV("div", {
            className: "w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center shrink-0 shadow-md shadow-secondary-container/30",
            children: /*#__PURE__*/_jsxDEV("span", {
              className: "material-symbols-outlined text-on-secondary-container text-[18px] font-bold",
              children: "check"
            }, void 0, false)
          }, void 0, false) : /*#__PURE__*/_jsxDEV("div", {
            className: "w-7 h-7 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none flex items-center justify-center shrink-0",
            children: /*#__PURE__*/_jsxDEV("div", {
              className: "w-3 h-3 rounded-full bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0"
            }, void 0, false)
          }, void 0, false)]
        }, city.name, true))]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "rounded-xl bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 overflow-hidden transition-all shadow-sm",
        children: [/*#__PURE__*/_jsxDEV(LiquidButton, {
          variant: "none",
          className: "w-full p-3.5 flex items-center justify-between hover:bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-left transition-colors",
          onClick: () => setCustomCoordsOpen(!customCoordsOpen),
          type: "button",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-3",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "w-9 h-9 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 flex items-center justify-center text-primary",
              children: /*#__PURE__*/_jsxDEV("span", {
                className: "material-symbols-outlined text-[20px]",
                children: "tune"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-label-lg text-label-lg text-on-surface font-medium",
              children: "Enter custom latitude, longitude & elevation"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
            className: `material-symbols-outlined text-outline text-[20px] transition-transform ${customCoordsOpen ? 'rotate-180' : ''}`,
            children: "expand_more"
          }, void 0, false)]
        }, void 0, true), customCoordsOpen && /*#__PURE__*/_jsxDEV("div", {
          className: "px-space-md pb-space-md pt-space-xs space-y-3",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-2 gap-2",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant font-mono",
                children: "Latitude (°N/S)"
              }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                className: "w-full h-10 px-3 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-mono font-body-sm text-body-sm focus:outline-none",
                placeholder: "34.5553",
                type: "text"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV("label", {
                className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant font-mono",
                children: "Longitude (°E/W)"
              }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
                className: "w-full h-10 px-3 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-mono font-body-sm text-body-sm focus:outline-none",
                placeholder: "69.2075",
                type: "text"
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "space-y-1",
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "font-label-sm text-label-sm text-on-surface dark:text-on-surface-variant font-mono",
              children: "Elevation (meters MSL)"
            }, void 0, false), /*#__PURE__*/_jsxDEV(GlassInput, {
              className: "w-full h-10 px-3 rounded-lg bg-white/80 text-on-surface shadow-sm /80 dark:shadow-none border-0 text-on-surface font-mono font-body-sm text-body-sm focus:outline-none",
              placeholder: "1791",
              type: "text"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "pt-space-xs",
        children: /*#__PURE__*/_jsxDEV(LiquidButton, {
          className: "w-full h-13 py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary-container to-inverse-primary hover:brightness-110 active:scale-[0.98] text-on-surface font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary-container/25 transition-all",
          type: "button",
          variant: "primary",
          children: [/*#__PURE__*/_jsxDEV("span", {
            children: "Confirm City & Update Solar Rhythms"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "material-symbols-outlined text-[20px]",
            children: "arrow_forward"
          }, void 0, false)]
        }, void 0, true)
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
};
export default CitySelection;