import { useState } from 'react';
import { Maximize2 } from 'lucide-react';

export default function ChangeDetection() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">
          Change Detection (Before / After)
        </h3>
      </div>

      <div className="relative flex-1 bg-slate-900 rounded-xl overflow-hidden min-h-[250px] border border-white/10 group select-none mb-4">
        {/* 'After' Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/amazon_after.jpg')" }}
        ></div>
        <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/10 z-20">
          May 26, 2024
        </div>

        {/* 'Before' Image Overlay using clip-path */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/amazon_before.jpg')",
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)` 
          }}
        >
          <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/10">
            May 12, 2024
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white/80 cursor-ew-resize flex items-center justify-center z-30"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:scale-105 transition-transform">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18-6-6 6-6"/>
              <path d="m15 18 6-6-6-6"/>
            </svg>
          </div>
        </div>

        <input 
          type="range" 
          min="0" 
          max="100" 
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-40"
        />

        <button className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/85 rounded-lg text-white backdrop-blur-sm transition-colors border border-white/10 z-20">
          <Maximize2 size={15} />
        </button>
      </div>

      {/* Info footer from screenshot */}
      <div className="flex items-center justify-between text-sm">
        <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg font-semibold text-xs tracking-wide">
          Land Clearing Detected
        </span>
        <span className="text-red-500 font-bold text-sm">
          +24% change
        </span>
      </div>
    </div>
  );
}
