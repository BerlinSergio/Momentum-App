import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import UserAvatar from './components/UserAvatar';
import {
  Palette, ArrowLeft, Check, CheckCircle2, Sun, Moon, Sparkles, Layers, Wind, ArrowRight, RotateCcw, Monitor, ChevronRight
} from 'lucide-react';
import { useThemeStore, AURA_PRESETS } from './store/useThemeStore';
import { toast } from './components/ui/toast/index.js';

export default function AppearanceDarkMode({ setActiveTab, goBack }) {
  const { t } = useTranslation();
  const {
    theme: globalTheme,
    aura: globalAura,
    glassEffects: globalGlass,
    gentleTransitions: globalTransitions,
    _hasHydrated,
    applyPreferences,
    resetDefaults
  } = useThemeStore();

  const [draftTheme, setDraftTheme] = useState(globalTheme || 'dark');
  const [draftAura, setDraftAura] = useState(globalAura || 'indigo');
  const [draftGlassEffects, setDraftGlassEffects] = useState(globalGlass !== false);
  const [draftGentleTransitions, setDraftGentleTransitions] = useState(globalTransitions !== false);
  const [previewMode, setPreviewMode] = useState('dark');

  const activeAuraPreset = AURA_PRESETS[draftAura] || AURA_PRESETS.indigo;

  // Synchronize draft preferences when theme store completes hydration
  useEffect(() => {
    if (_hasHydrated) {
      if (globalTheme) setDraftTheme(globalTheme);
      if (globalAura) setDraftAura(globalAura);
      if (globalGlass !== undefined) setDraftGlassEffects(globalGlass !== false);
      if (globalTransitions !== undefined) setDraftGentleTransitions(globalTransitions !== false);
    }
  }, [_hasHydrated, globalTheme, globalAura, globalGlass, globalTransitions]);

  // Keep draft settings inside this screen's preview until Apply is pressed.
  // Navigating away or Back must never commit a preview theme globally.

  const handleApply = () => {
    applyPreferences({
      theme: draftTheme,
      aura: draftAura,
      glassEffects: draftGlassEffects,
      gentleTransitions: draftGentleTransitions,
    });
    // Global appearance store updates the displayed component in place.
    // Do not push a themed Appearance screen onto navigation history.
    toast.success(t('toasts.preferencesSaved', 'Preferences saved and applied to your ecosystem'));
  };

  const handleReset = () => {
    resetDefaults();
    setDraftTheme('light');
    setDraftAura('indigo');
    setDraftGlassEffects(true);
    setDraftGentleTransitions(true);
    setPreviewMode('light');
    toast.info(t('toasts.appearanceReset', 'Appearance reset to default settings'));
  };

  return (
    <>
      {/* Top Header Bar (Standardized: Back arrow on far left, clean title, no redundant icon or avatar) */}
      <div className="sticky top-0 z-[60] bg-transparent backdrop-blur-xl flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => (goBack ? goBack('settings_profile_dark_mode') : (setActiveTab ? setActiveTab('settings_profile_dark_mode') : window.history.back()))}
            aria-label="Go back"
            className="p-2 -ml-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer pointer-events-auto"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-white tracking-tight">
            {t('appearance.appearance', 'Appearance')}
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative w-full px-4 pb-36">
        <div className="flex flex-col w-full space-y-4 pt-2">
          {/* Top Utility Bar: Context & Reset Action */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: activeAuraPreset.hex + '20',
                  color: activeAuraPreset.hex,
                }}
              >
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {t('appearance.visualLanguage', 'Visual Language')}
              </span>
            </div>
            <button
              id="reset-btn"
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 backdrop-blur-xl active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" style={{ color: activeAuraPreset.hex }} />
              <span>{t('appearance.resetDefault', 'Reset Default')}</span>
            </button>
          </div>
          {/*  Live Mini Mockup Preview Box  */}
<div className="relative w-full overflow-hidden rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-2.5 w-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: activeAuraPreset.hex }}
                />
                <span className="text-xs font-bold text-white">{t('appearance.canvasPreview', 'Interactive Canvas Preview')}</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewMode((prev) => (prev === 'dark' ? 'light' : 'dark'))}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold shadow-sm hover:bg-white/15 active:scale-95 transition-all cursor-pointer border border-white/10 backdrop-blur-xl"
              >
                {previewMode === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" style={{ color: activeAuraPreset.hex }} />}
                <span>{previewMode === 'dark' ? t('appearance.lightRadiance', 'Preview Light') : t('appearance.darkSanctuary', 'Preview Dark')}</span>
              </button>
            </div>

            {/* Micro Phone Shell */}
            <div
              className={`relative w-full rounded-2xl p-4 transition-all duration-300 shadow-inner overflow-hidden border backdrop-blur-xl ${
                previewMode === 'dark'
                  ? 'bg-black/60 text-white border-white/10'
                  : 'bg-white/90 text-slate-900 border-slate-200/80'
              }`}
            >
              {/* Ambient Gradient Aura inside preview */}
              <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-all duration-500"
                style={{
                  backgroundColor: activeAuraPreset.hex,
                  opacity: previewMode === 'dark' ? 0.35 : 0.22,
                }}
              />

              {/* Mini Header in Preview */}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-sm font-bold text-xs"
                    style={{ backgroundColor: activeAuraPreset.hex }}
                  >
                    M
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-none">Momentum</div>
                    <div className={`text-[10px] mt-0.5 ${previewMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{t('appearance.morningSanctuary', 'Morning Sanctuary')}</div>
                  </div>
                </div>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: activeAuraPreset.hex + '20',
                    color: activeAuraPreset.hex,
                  }}
                >
                  {activeAuraPreset.label}
                </span>
              </div>

              {/* Mini Frosted Widget Card inside preview */}
              <div
                className={`relative rounded-xl p-3 mb-3 shadow-sm border transition-all duration-300 ${
                  previewMode === 'dark'
                    ? (draftGlassEffects ? 'bg-white/[0.06] border-white/10 backdrop-blur-xl' : 'bg-slate-900 border-slate-800')
                    : (draftGlassEffects ? 'bg-white/80 border-slate-200/60 backdrop-blur-xl' : 'bg-white border-slate-200')
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold">{t('habits.dailyCentering', 'Daily Centering')}</span>
                  <span
                    className="text-[11px] font-semibold font-display"
                    style={{ color: activeAuraPreset.hex }}
                  >
                    {t('habits.percentClear', '85% Clear')}
                  </span>
                </div>
                <div className={`w-full rounded-full h-1.5 overflow-hidden ${previewMode === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: '85%',
                      backgroundColor: activeAuraPreset.hex,
                    }}
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <div
                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-white text-[9px]"
                    style={{ backgroundColor: activeAuraPreset.hex }}
                  >
                    ✓
                  </div>
                  <span className={`text-[11px] font-medium ${previewMode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {t('habits.pranayamaBreathwork', 'Pranayama Breathwork (12m)')}
                  </span>
                </div>
              </div>

              {/* Mini Bottom Navigation Dock in preview */}
              <div
                className={`w-full rounded-full py-1.5 px-4 flex items-center justify-between shadow-sm border backdrop-blur-xl ${
                  previewMode === 'dark'
                    ? 'bg-black/60 border-white/10 text-slate-400'
                    : 'bg-white/90 border-slate-200/80 text-slate-500'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeAuraPreset.hex }} />
                <div className="w-2 h-2 rounded-full bg-slate-400/60" />
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                  style={{ backgroundColor: activeAuraPreset.hex }}
                >
                  +
                </div>
                <div className="w-2 h-2 rounded-full bg-slate-400/60" />
                <div className="w-2 h-2 rounded-full bg-slate-400/60" />
              </div>
            </div>
          </div>

          {/* Primary Theme Mode Selection (3 True Glass Cards) */}
          <div className="rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/40 dark:border-white/10">
              <h2 className="text-base font-bold text-white">
                {t('appearance.displayTheme', 'Display Theme')}
              </h2>
              <span className="text-xs font-semibold text-slate-400">
                {t('appearance.atmosphere', 'Atmosphere')}
              </span>
            </div>
            <div className="flex flex-col gap-3" role="radiogroup" aria-label="Theme Mode Selection">
              {/* Option 1: Light Mode */}
              <div
                role="radio"
                aria-checked={draftTheme === 'light'}
                tabIndex={0}
                onClick={() => { setDraftTheme('light'); setPreviewMode('light'); applyPreferences({ theme: 'light' }); }}
                className={`relative rounded-2xl p-4 cursor-pointer transition-all duration-200 select-none backdrop-blur-xl ${
                  draftTheme === 'light'
                    ? 'bg-white/10 border shadow-lg'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 shadow-sm'
                }`}
                style={draftTheme === 'light' ? {
                  borderColor: activeAuraPreset.hex,
                  boxShadow: `0 0 0 2px ${activeAuraPreset.hex}50`,
                } : undefined}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      backgroundColor: activeAuraPreset.hex + '20',
                      color: activeAuraPreset.hex,
                    }}
                  >
                    <Sun className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 pr-7">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{t('appearance.lightRadiance', 'Light Mode')}</span>
                      {draftTheme === 'light' && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: activeAuraPreset.hex + '15',
                            color: activeAuraPreset.hex,
                            borderColor: activeAuraPreset.hex + '40',
                          }}
                        >
                          {t('common.selected', 'Selected')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-normal text-slate-400 mt-1 leading-relaxed">
                      {t('appearance.lightModeDesc', 'Clean, luminous aesthetic with frosted glass and atmospheric radiance. Optimized for daylight clarity and focus.')}
                    </p>
                  </div>
                  {draftTheme === 'light' && (
                    <div
                      className="absolute top-4 right-4 w-6 h-6 rounded-full text-white flex items-center justify-center shadow-md animate-in zoom-in-50 duration-150"
                      style={{ backgroundColor: activeAuraPreset.hex }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Option 2: Dark Sanctuary */}
              <div
                role="radio"
                aria-checked={draftTheme === 'dark'}
                tabIndex={0}
                onClick={() => { setDraftTheme('dark'); setPreviewMode('dark'); applyPreferences({ theme: 'dark' }); }}
                className={`relative rounded-2xl p-4 cursor-pointer transition-all duration-200 select-none backdrop-blur-xl ${
                  draftTheme === 'dark'
                    ? 'bg-white/10 border shadow-lg'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 shadow-sm'
                }`}
                style={draftTheme === 'dark' ? {
                  borderColor: activeAuraPreset.hex,
                  boxShadow: `0 0 0 2px ${activeAuraPreset.hex}50`,
                } : undefined}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      backgroundColor: activeAuraPreset.hex + '20',
                      color: activeAuraPreset.hex,
                    }}
                  >
                    <Moon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 pr-7">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{t('appearance.darkSanctuary', 'Dark Sanctuary')}</span>
                      {draftTheme === 'dark' && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: activeAuraPreset.hex + '15',
                            color: activeAuraPreset.hex,
                            borderColor: activeAuraPreset.hex + '40',
                          }}
                        >
                          {t('common.selected', 'Selected')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-normal text-slate-400 mt-1 leading-relaxed">
                      {t('appearance.darkModeDesc', 'Deep nocturnal sanctuary with restful obsidian depths and low-light visual comfort for evening reflection.')}
                    </p>
                  </div>
                  {draftTheme === 'dark' && (
                    <div
                      className="absolute top-4 right-4 w-6 h-6 rounded-full text-white flex items-center justify-center shadow-md animate-in zoom-in-50 duration-150"
                      style={{ backgroundColor: activeAuraPreset.hex }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Option 3: System Rhythm */}
              <div
                role="radio"
                aria-checked={draftTheme === 'system'}
                tabIndex={0}
                onClick={() => { setDraftTheme('system'); applyPreferences({ theme: 'system' }); }}
                className={`relative rounded-2xl p-4 cursor-pointer transition-all duration-200 select-none backdrop-blur-xl ${
                  draftTheme === 'system'
                    ? 'bg-white/10 border shadow-lg'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 shadow-sm'
                }`}
                style={draftTheme === 'system' ? {
                  borderColor: activeAuraPreset.hex,
                  boxShadow: `0 0 0 2px ${activeAuraPreset.hex}50`,
                } : undefined}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      backgroundColor: activeAuraPreset.hex + '20',
                      color: activeAuraPreset.hex,
                    }}
                  >
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0 pr-7">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{t('appearance.systemRhythm', 'System Rhythm')}</span>
                      {draftTheme === 'system' && (
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: activeAuraPreset.hex + '15',
                            color: activeAuraPreset.hex,
                            borderColor: activeAuraPreset.hex + '40',
                          }}
                        >
                          {t('common.selected', 'Selected')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-normal text-slate-400 mt-1 leading-relaxed">
                      {t('appearance.systemRhythmDesc', 'Follows celestial daylight cycles. Seamlessly shifts between dawn brilliance and nocturnal twilight.')}
                    </p>
                  </div>
                  {draftTheme === 'system' && (
                    <div
                      className="absolute top-4 right-4 w-6 h-6 rounded-full text-white flex items-center justify-center shadow-md animate-in zoom-in-50 duration-150"
                      style={{ backgroundColor: activeAuraPreset.hex }}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Accent Luminescence / Chromatic Aura */}
          <div className="rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/40 dark:border-white/10">
              <h3 className="text-base font-bold text-white">{t('appearance.chromaticAura', 'Chromatic Aura')}</h3>
              <span
                className="text-xs font-bold transition-colors"
                style={{ color: activeAuraPreset.hex }}
              >
                {activeAuraPreset.name}
              </span>
            </div>
            <p className="text-xs font-normal text-slate-400 leading-relaxed">
              {t('appearance.chromaticAuraDesc', 'Subtle ambient glow reflected across frosted navigation docks, buttons, and metrics.')}
            </p>
            {/* Color Swatches Grid */}
            <div className="grid grid-cols-5 gap-2 pt-1" role="radiogroup" aria-label="Accent Palette Selection">
              {Object.values(AURA_PRESETS).map((preset) => {
                const isSelected = draftAura === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => { setDraftAura(preset.id); applyPreferences({ aura: preset.id }); }}
                    className="flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer group"
                  >
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-white transition-all shadow-md ${
                        isSelected
                          ? 'ring-4 ring-offset-2 scale-105 ring-offset-slate-900 shadow-lg'
                          : 'hover:scale-105 active:scale-95'
                      }`}
                      style={{
                        backgroundColor: preset.hex,
                        boxShadow: isSelected ? `0 0 16px ${preset.hex}80` : undefined,
                      }}
                    >
                      {isSelected ? (
                        <Check className="w-4 h-4 stroke-[3] text-white animate-in zoom-in-50 duration-150" />
                      ) : null}
                    </div>
                    <span
                      className={`text-[11px] text-center transition-colors ${
                        isSelected
                          ? 'font-bold text-white'
                          : 'font-medium text-slate-400'
                      }`}
                    >
                      {preset.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Translucency & Motion Preferences (Glassmorphic Physics) */}
          <div className="rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/40 dark:border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">{t('appearance.glassmorphicPhysics', 'Glassmorphic Physics')}</h3>
                <p className="text-xs font-normal text-slate-400 mt-0.5">{t('appearance.renderingEngineDesc', 'Global visual rendering engine & dynamic physics')}</p>
              </div>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors shadow-sm"
                style={{
                  backgroundColor: activeAuraPreset.hex + '15',
                  color: activeAuraPreset.hex,
                  borderColor: activeAuraPreset.hex + '35',
                }}
              >
                {draftGlassEffects && draftGentleTransitions ? t('appearance.fullFidelity', 'Full Fidelity') : draftGlassEffects ? t('appearance.glassOnly', 'Glass Only') : draftGentleTransitions ? t('appearance.motionOnly', 'Motion Only') : t('appearance.performance', 'Performance')}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {/* Toggle 1: Frosted Glass Effects */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-colors"
                      style={{
                        backgroundColor: activeAuraPreset.hex + '20',
                        color: activeAuraPreset.hex,
                      }}
                    >
                      <Layers className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white">{t('appearance.frostedGlassEffects', 'Frosted Glass Effects')}</span>
                  </div>
                  <p className="text-xs font-normal text-slate-400 mt-1 pl-9 leading-relaxed">
                    {t('appearance.frostedGlassDesc', 'Render multi-layer blur filters and edge reflections over wallpaper.')}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={draftGlassEffects}
                  onClick={() => { const next = !draftGlassEffects; setDraftGlassEffects(next); applyPreferences({ glassEffects: next }); }}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none shadow-sm ${
                    draftGlassEffects
                      ? ''
                      : 'bg-white/10 border border-white/10'
                  }`}
                  style={draftGlassEffects ? { backgroundColor: activeAuraPreset.hex } : undefined}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      draftGlassEffects ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2: Gentle Transitions */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200/40 dark:border-white/10">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm transition-colors"
                      style={{
                        backgroundColor: activeAuraPreset.hex + '20',
                        color: activeAuraPreset.hex,
                      }}
                    >
                      <Wind className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white">{t('appearance.gentleTransitions', 'Gentle Transitions')}</span>
                  </div>
                  <p className="text-xs font-normal text-slate-400 mt-1 pl-9 leading-relaxed">
                    {t('appearance.gentleTransitionsDesc', 'Calm, physics-based page morphing and organic card elevations.')}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={draftGentleTransitions}
                  onClick={() => { const next = !draftGentleTransitions; setDraftGentleTransitions(next); applyPreferences({ gentleTransitions: next }); }}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none shadow-sm ${
                    draftGentleTransitions
                      ? ''
                      : 'bg-white/10 border border-white/10'
                  }`}
                  style={draftGentleTransitions ? { backgroundColor: activeAuraPreset.hex } : undefined}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      draftGentleTransitions ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* {t('appearance.atmosphericCanvas', 'Atmospheric Canvas')} & Wallpaper Shortcut */}
          <div className="rounded-3xl p-5 space-y-4 bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/40 dark:border-white/10">
              <h3 className="text-base font-bold text-white">
                {t('appearance.atmosphericCanvas', 'Atmospheric Canvas')}
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                {t('appearance.defaultAmbient', 'Default Ambient')}
              </span>
            </div>
            <div
              onClick={() => setActiveTab && setActiveTab('background_wallpaper_library_dark_mode')}
              className="relative rounded-2xl overflow-hidden bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 p-3.5 shadow-sm group cursor-pointer transition-all active:scale-[0.99] backdrop-blur-xl"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt="Serene Horizon Wallpaper"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDssiR26j8sTUNO43pGWN3KRoiha4FHhqKVhpQeOLpkTXcgXeeGOH3ie0QZfAReV8GDn2RYUMOXjdS-L0kcA_ltLvDbZIR0RzUqYmMy43fzZklx7JqVsfEVwFEKvm4o8MOodHYI4BrOwH_GM8bZHhNPAsHOnRPklY6JbAseRtsTwr6ipWPB1lcKqd7KGMtwGem9UBz8DhNMSlU6_ifnSTbgb7lTJhLCkexS5wx6pIgUNlpHmbbjpUE"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{ backgroundColor: activeAuraPreset.hex + '20' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white truncate">{t('wallpapers.sereneHorizon', 'Serene Horizon')}</span>
                    <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: activeAuraPreset.hex }} />
                  </div>
                  <p className="text-xs font-normal text-slate-400 mt-0.5 truncate">
                    {t('wallpapers.sereneHorizonDesc', 'Pastel sky and mist with 32px diffuse glass refraction.')}
                  </p>
                  <div className="flex items-center gap-1 mt-1 font-semibold text-xs" style={{ color: activeAuraPreset.hex }}>
                    <span>{t('appearance.customizeWallpaper', 'Customize Wallpaper')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Primary Apply Action Button (In-flow, clean spacing above bottom nav) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleApply}
              className="w-full py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer select-none shadow-lg hover:brightness-110"
              style={{
                backgroundColor: activeAuraPreset.hex,
                boxShadow: `0 10px 25px -5px ${activeAuraPreset.hex}60`,
              }}
            >
              <span>{t('appearance.applyAppearance', 'Apply Appearance Preferences')}</span>
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
