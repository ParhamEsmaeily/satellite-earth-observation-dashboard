import { latestImagery } from '../data/imagery';
import { Image as ImageIcon, Download, Eye } from 'lucide-react';

export default function LatestImagery() {
  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ImageIcon size={18} className="text-purple-400" />
          Latest Imagery
        </h3>
        <button className="text-xs font-medium text-primary hover:text-blue-400 transition-colors">Archive</button>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-xs font-medium text-slate-400 uppercase tracking-wider">
              <th className="pb-3 px-4 font-medium">Region</th>
              <th className="pb-3 px-4 font-medium">Sensor</th>
              <th className="pb-3 px-4 font-medium">Captured Date</th>
              <th className="pb-3 px-4 font-medium">Status</th>
              <th className="pb-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {latestImagery.map(img => (
              <tr key={img.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td className="py-3 px-4 text-white font-medium">{img.region}</td>
                <td className="py-3 px-4 text-slate-300">{img.sensor}</td>
                <td className="py-3 px-4 text-slate-400">{img.date}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                    img.status === 'Processed' 
                      ? 'text-teal-400 bg-teal-500/10 border-teal-500/20'
                      : 'text-blue-400 bg-blue-500/10 border-blue-500/20 animate-pulse'
                  }`}>
                    {img.status === 'Processing' && <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
                    {img.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded"><Eye size={14}/></button>
                    <button className="p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded"><Download size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
