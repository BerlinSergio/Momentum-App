import React from 'react';

import { 
  ArrowLeft, Share2, MoreVertical, Image, Download, Trash2, Cloud, Video, Mic, Check, Play, Maximize, ChevronLeft, ChevronRight, Volume2, MapPin, ArrowRight, Wand2 
} from 'lucide-react';

export default function NoteMediaAttachmentViewerLightMode({ setActiveTab }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10">
      {/* 1. TOP HEADER */}
      <div className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <Image className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-base font-bold text-indigo-950 tracking-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>
            Attachment Details
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab && setActiveTab('home_dashboard_light_mode')}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      
      </div>

      {/* 2. MEDIA VIEWER & ASSET INFO BANNER */}
      <div className="block mx-5 my-3 p-4 rounded-3xl space-y-3 text-white bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 border border-indigo-200/80 text-indigo-700 flex-shrink-0">
              <Image className="w-3.5 h-3.5 text-indigo-600"/>
              MEDIA VIEWER
            </span>
            <span className="text-xs font-medium text-slate-500 truncate">
              • Attached to: Q4 Strategic Reflection
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-600 hover:bg-slate-100 shadow-2xs transition-colors">
              <Download className="w-3.5 h-3.5"/>
            </button>
            <button className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-600 hover:bg-slate-100 shadow-2xs transition-colors">
              <Share2 className="w-3.5 h-3.5"/>
            </button>
            <button className="p-2 rounded-xl bg-rose-50 border border-rose-200/70 text-rose-600 hover:bg-rose-100 shadow-2xs transition-colors">
              <Trash2 className="w-3.5 h-3.5"/>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight truncate">
            Dawn_Reflection_Sky.jpg
          </h2>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 flex-shrink-0">
            <Cloud className="w-3 h-3 text-teal-500"/>
            Synced Cloud Asset
          </span>
        </div>
      </div>

      {/* 3. STANDARDIZED MEDIA TYPE TABS */}
      <div className="flex items-center gap-2 px-5 mb-4 overflow-x-auto scrollbar-none">
        <button className="flex-1 py-2 px-3 rounded-2xl bg-indigo-600 text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap">
          <Image className="w-3.5 h-3.5 text-white"/>
          Photos (4)
        </button>
        <button className="flex-1 py-2 px-3 rounded-2xl bg-white border border-slate-200/80 text-slate-600 text-xs font-semibold hover:bg-slate-50 flex items-center justify-center gap-1.5 whitespace-nowrap shadow-2xs">
          <Video className="w-3.5 h-3.5 text-slate-500"/>
          Videos (2)
        </button>
        <button className="flex-1 py-2 px-3 rounded-2xl bg-white border border-slate-200/80 text-slate-600 text-xs font-semibold hover:bg-slate-50 flex items-center justify-center gap-1.5 whitespace-nowrap shadow-2xs">
          <Mic className="w-3.5 h-3.5 text-slate-500"/>
          Voice Memos (1)
        </button>
      </div>

      {/* 4. MAIN PHOTO PREVIEW CONTAINER */}
      <div className="block mx-5 mb-5 rounded-3xl overflow-hidden relative group h-80 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <img className="w-full h-full object-cover" alt="Dawn Sky" src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600"/>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
          <div className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-slate-900 shadow-sm flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5 text-indigo-600"/>
            <span className="text-[11px] font-bold">1 / 4</span>
          </div>
          <div className="flex items-center gap-1.5">
             <div className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-slate-900 shadow-sm font-semibold text-[11px]">
               100%
             </div>
             <button className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-indigo-600 shadow-sm">
               <Maximize className="w-3.5 h-3.5"/>
             </button>
          </div>
        </div>

        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-auto">
           <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-colors">
             <ChevronLeft className="w-5 h-5"/>
           </button>
        </div>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-auto">
           <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-slate-700 hover:text-indigo-600 transition-colors">
             <ChevronRight className="w-5 h-5"/>
           </button>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-auto">
          <div className="flex flex-col text-white drop-shadow-md">
            <span className="text-[11px] font-medium">Oct 24, 2026 • 06:14 AM</span>
            <span className="text-[10px] font-normal text-white/90">iPhone 16 Pro • 24mm f/1.78</span>
          </div>
          <button className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-bold shadow-sm flex items-center gap-1 hover:bg-white transition-colors">
            <Wand2 className="w-3 h-3"/>
            Enhance
          </button>
        </div>
      </div>

      {/* 5. ALL ATTACHMENTS CAROUSEL STRIP */}
      <div className="flex items-center justify-between px-5 mb-3">
        <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.15)' }}>All Attachments (7)</h3>
        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Select Multiple</button>
      </div>
      
      <div className="px-5 mb-5 flex items-center gap-2.5 overflow-x-auto scrollbar-none pb-1">
        <div className="relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-sm ring-2 ring-indigo-600 cursor-pointer">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=200" alt="thumb1"/>
          <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Check className="w-3 h-3 stroke-[3]"/>
          </div>
        </div>
        <div className="relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-sm cursor-pointer">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=200" alt="thumb2"/>
          <div className="absolute bottom-1 left-1 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-md">
            <span className="text-[9px] font-bold text-slate-900">Photo</span>
          </div>
        </div>
        <div className="relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden shadow-sm cursor-pointer">
          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1629813589973-585a21008f51?auto=format&fit=crop&q=80&w=200" alt="thumb3"/>
          <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
             <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-indigo-600 shadow-sm">
               <Play className="w-3 h-3 fill-indigo-600"/>
             </div>
          </div>
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-900/70 text-white text-[9px] font-semibold">
            01:24
          </div>
        </div>
        <div className="relative shrink-0 w-20 h-20 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-sm p-2 flex flex-col justify-between cursor-pointer">
          <div className="flex items-center justify-between">
            <Mic className="w-4 h-4 text-indigo-500"/>
            <span className="text-[9px] font-bold text-slate-500">Voice</span>
          </div>
          <div className="flex items-end gap-0.5 h-6 px-1">
            <span className="w-1 bg-indigo-400 rounded-full h-2"></span>
            <span className="w-1 bg-indigo-400 rounded-full h-5"></span>
            <span className="w-1 bg-indigo-400 rounded-full h-3"></span>
            <span className="w-1 bg-indigo-400 rounded-full h-6"></span>
            <span className="w-1 bg-indigo-400 rounded-full h-4"></span>
          </div>
          <span className="text-[10px] font-semibold text-slate-600">03:45</span>
        </div>
      </div>

      {/* 6. VIDEO ATTACHMENT PLAYER CARD */}
      <div className="block mx-5 mb-5 p-4 rounded-3xl space-y-3 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <Video className="w-3.5 h-3.5"/>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-bold text-slate-900">Garden_Mindfulness_Walk.mp4</p>
              <span className="text-[10px] font-medium text-slate-500">4K 60fps • HEVC • 42.1 MB</span>
            </div>
          </div>
        </div>
        <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
           <img className="w-full h-full object-cover opacity-80" src="https://images.unsplash.com/photo-1629813589973-585a21008f51?auto=format&fit=crop&q=80&w=400" alt="Video cover"/>
           <div className="absolute inset-0 bg-slate-900/20 flex flex-col justify-between p-3">
             <div className="flex justify-end">
               <span className="px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-bold text-slate-900 flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                 Live Buffer
               </span>
             </div>
             <div className="self-center">
               <button className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/40 flex items-center justify-center hover:scale-105 transition-transform">
                 <Play className="w-5 h-5 fill-white ml-0.5"/>
               </button>
             </div>
             <div className="flex flex-col gap-1.5 w-full">
               <div className="w-full bg-white/70 h-1.5 rounded-full overflow-hidden flex items-center">
                 <div className="bg-indigo-500 h-full w-[45%] rounded-full"></div>
               </div>
               <div className="flex items-center justify-between text-white text-[10px] font-semibold drop-shadow-md">
                 <span>00:38</span>
                 <div className="flex items-center gap-2">
                   <Volume2 className="w-3.5 h-3.5"/>
                   <span>01:24</span>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* 7. ASSET PROPERTIES & CAPTION CARD */}
      <div className="block mx-5 mb-5 p-5 rounded-3xl space-y-4 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Asset Properties</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-3 space-y-0.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-medium text-slate-500">Resolution</span>
            <div className="text-xs font-semibold text-slate-900">3840 × 2160 (4K)</div>
          </div>
          <div className="rounded-2xl p-3 space-y-0.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-medium text-slate-500">File Size</span>
            <div className="text-xs font-semibold text-slate-900">3.2 MB (JPEG)</div>
          </div>
          <div className="rounded-2xl p-3 space-y-0.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-medium text-slate-500">Color Space</span>
            <div className="text-xs font-semibold text-slate-900">Display P3 Wide</div>
          </div>
          <div className="rounded-2xl p-3 space-y-0.5 bg-white/70 backdrop-blur-md border border-white/80 shadow-lg">
            <span className="text-[10px] font-medium text-slate-500">Storage State</span>
            <div className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
              <Cloud className="w-3 h-3"/>
              Encrypted & Cached
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-900">Attachment Caption</label>
            <span className="text-[10px] font-medium text-slate-400">98 / 250</span>
          </div>
          <div className="relative">
            <textarea className="w-full rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 text-xs font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 resize-none" rows="3">Captured immediately after morning Fajr prayer while meditating on the courtyard terrace.</textarea>
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button className="text-slate-400 hover:text-indigo-600 transition-colors"><Mic className="w-4 h-4"/></button>
              <button className="text-slate-400 hover:text-indigo-600 transition-colors"><MapPin className="w-4 h-4"/></button>
            </div>
          </div>
        </div>
      </div>

      {/* 8. STANDARDIZED BOTTOM ACTIONS */}
      <div className="px-5 pb-10 space-y-3">
        <button className="btn-primary w-full">
          Save Media Changes
          <ArrowRight className="w-4 h-4"/>
        </button>
        <button className="btn-danger w-full">
          <Trash2 className="w-4 h-4 text-rose-500"/>
          Remove Attachment from Note
        </button>
      </div>
    </div>
  );
}
