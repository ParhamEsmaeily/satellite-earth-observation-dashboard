import { useState } from 'react';
import { regions } from '../data/regions';
import { MapPin, AlertCircle } from 'lucide-react';

export default function MapOverview() {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);

  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-6 flex flex-col h-full select-none">
      
      {/* Dynamic Header HUD */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white">Global Monitored Regions</h3>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
            Active
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
            Alert
          </div>
        </div>
      </div>

      <div className="flex-1 relative bg-[#0b0f19] rounded-xl overflow-hidden border border-white/5 min-h-[350px] group/map">
        
        {/* Generated Clean World Map Background */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-65 mix-blend-lighten"
          style={{ backgroundImage: "url('/clean_world_map.png')" }}
        ></div>

        {/* Grid Overlay Lines (adds satellite imagery feel) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Dynamic Markers */}
        {regions.map((region) => {
          const isSelected = selectedRegion.id === region.id;
          return (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/pin z-10 cursor-pointer"
              style={{ left: `${region.coordinates.x}%`, top: `${region.coordinates.y}%` }}
              title={`Inspect ${region.name}`}
            >
              {/* Pulsing Glowing Selection Wave */}
              <span className={`absolute w-10 h-10 rounded-full border transition-all duration-500 -translate-y-1/4 ${
                isSelected 
                  ? 'animate-[ping_2s_linear_infinite] opacity-100 scale-100' 
                  : 'opacity-0 scale-50 group-hover/pin:opacity-40 group-hover/pin:scale-75'
              } ${
                region.status === 'alert' 
                  ? 'bg-red-500/20 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                  : 'bg-blue-500/20 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
              }`} />

              {/* Marker Icon */}
              {region.status === 'alert' ? (
                <AlertCircle 
                  className={`transition-all duration-300 ${
                    isSelected ? 'text-white scale-110' : 'text-red-400 group-hover/pin:text-red-300'
                  } drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]`} 
                  size={22} 
                />
              ) : (
                <MapPin 
                  className={`transition-all duration-300 ${
                    isSelected ? 'text-white scale-120' : 'text-blue-400 group-hover/pin:text-blue-300'
                  } drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]`} 
                  size={22} 
                />
              )}
              
              {/* Tooltip Card matching the screenshot styling */}
              <div className={`absolute top-full mt-2 px-3 py-2 bg-slate-950/90 border border-white/10 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity z-20 pointer-events-none shadow-2xl ${
                isSelected ? 'opacity-100' : ''
              }`}>
                <span className="font-semibold text-white block">{region.name}</span>
                <span className={`${region.status === 'alert' ? 'text-red-400 font-bold' : 'text-slate-400'} text-[10px]`}>
                  {region.status === 'alert' ? 'Alert detected' : `Updated ${region.lastCapture}`}
                </span>
              </div>
            </button>
          );
        })}

        {/* Selected Region Polygon Overlay Effect */}
        {selectedRegion && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <circle 
              cx={`${selectedRegion.coordinates.x}%`} 
              cy={`${selectedRegion.coordinates.y}%`} 
              r="40" 
              fill="none" 
              stroke={selectedRegion.status === 'alert' ? 'rgba(239,68,68,0.25)' : 'rgba(59,130,246,0.25)'} 
              strokeWidth="1" 
              strokeDasharray="4 4" 
              className="animate-[spin_12s_linear_infinite]" 
            />
            <circle 
              cx={`${selectedRegion.coordinates.x}%`} 
              cy={`${selectedRegion.coordinates.y}%`} 
              r="60" 
              fill="none" 
              stroke={selectedRegion.status === 'alert' ? 'rgba(239,68,68,0.08)' : 'rgba(59,130,246,0.08)'} 
              strokeWidth="1" 
            />
          </svg>
        )}

        {/* Selected Region Info HUD overlay (bottom-left) */}
        {selectedRegion && (
          <div className="absolute bottom-4 left-4 bg-slate-950/85 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl max-w-[280px] pointer-events-none z-20 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-2xl">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-0.5">Selected Target cell</p>
            <h4 className="text-sm font-bold text-white mb-1.5">{selectedRegion.name}</h4>
            <div className="flex items-center gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-semibold">Sensor Status</span>
                <span className={`font-semibold ${selectedRegion.status === 'alert' ? 'text-red-400' : 'text-blue-400'}`}>
                  {selectedRegion.status === 'alert' ? 'Alert Active' : 'Nominal (Active)'}
                </span>
              </div>
              <div className="w-[1px] h-6 bg-white/10" />
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-semibold">Last Pass</span>
                <span className="text-slate-300 font-medium">{selectedRegion.lastCapture}</span>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
