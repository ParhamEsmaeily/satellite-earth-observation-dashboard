import { useState } from 'react';
import { recentAlerts } from '../data/alerts';
import type { Alert } from '../data/alerts';
import { AlertCircle, ChevronRight, X, ShieldAlert, Navigation, Calendar, Radio } from 'lucide-react';

export default function RecentAlerts() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<string[]>([]);

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'High': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Low': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const handleAcknowledge = (id: string) => {
    setAcknowledgedAlerts(prev => [...prev, id]);
    setSelectedAlert(null);
  };

  return (
    <>
      <div className="bg-surface border border-white/5 rounded-2xl p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertCircle size={18} className="text-red-400" />
            Recent Alerts
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {recentAlerts.length - acknowledgedAlerts.length} Active
          </span>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto pr-2">
          {recentAlerts.map(alert => {
            const isAck = acknowledgedAlerts.includes(alert.id);
            return (
              <div 
                key={alert.id} 
                onClick={() => !isAck && setSelectedAlert(alert)}
                className={`p-4 rounded-xl border transition-colors group relative ${
                  isAck 
                    ? 'border-white/5 bg-white/[0.01] opacity-50 cursor-default' 
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="text-xs text-slate-500">
                    {isAck ? 'Acknowledged' : alert.time}
                  </span>
                </div>
                <h4 className={`text-sm font-semibold mb-1 transition-colors ${
                  isAck ? 'text-slate-500' : 'text-white group-hover:text-primary'
                }`}>
                  {alert.type}
                </h4>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-slate-400 truncate pr-4">{alert.region}</p>
                  {!isAck && <ChevronRight size={14} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alert Inspector Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert size={18} className="text-red-400 animate-pulse" />
                Alert Inspector
              </h3>
              <button 
                onClick={() => setSelectedAlert(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content info */}
            <div className="space-y-4 text-slate-300 text-sm">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                  <span>SEVERITY STATE</span>
                  <span className={`uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{selectedAlert.type}</h4>
              </div>

              <div className="space-y-3 px-1">
                <div className="flex items-center gap-3">
                  <Navigation size={16} className="text-primary" />
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">Target Coordinate Region</p>
                    <p className="text-slate-300 font-medium">{selectedAlert.region}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-primary" />
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">Observation Time</p>
                    <p className="text-slate-300 font-medium">{selectedAlert.time} via CosmoSkyMed-4</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Radio size={16} className="text-primary" />
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase">Sensor Payload band</p>
                    <p className="text-slate-300 font-medium">X-Band Synthetic Aperture Radar (SAR)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex gap-3 pt-6 border-t border-white/5 mt-6">
              <button
                type="button"
                onClick={() => setSelectedAlert(null)}
                className="flex-1 py-2.5 rounded-lg bg-surface hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold transition-all"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleAcknowledge(selectedAlert.id)}
                className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                Acknowledge Alert
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
