import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { weeklyAcquisitions, lastWeeklyAcquisitions } from '../data/acquisitions';
import { BarChart2 } from 'lucide-react';

export default function AcquisitionsChart() {
  const [selectedRange, setSelectedRange] = useState<'this-week' | 'last-week'>('this-week');

  const chartData = selectedRange === 'this-week' ? weeklyAcquisitions : lastWeeklyAcquisitions;

  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BarChart2 size={18} className="text-blue-400" />
          Weekly Acquisitions
        </h3>
        <select 
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value as any)}
          className="bg-background border border-white/10 text-xs text-white rounded px-2 py-1 outline-none cursor-pointer focus:border-primary/50"
        >
          <option value="this-week">This Week</option>
          <option value="last-week">Last Week</option>
        </select>
      </div>

      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="day" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{fill: '#ffffff05'}}
              contentStyle={{ backgroundColor: '#111827', borderColor: '#ffffff20', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ fontSize: '12px' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" />
            <Bar dataKey="cBand" name="C-band SAR" fill="#3B82F6" radius={[4, 4, 0, 0]} stackId="a" />
            <Bar dataKey="xBand" name="X-band SAR" fill="#8B5CF6" radius={[4, 4, 0, 0]} stackId="a" />
            <Bar dataKey="optical" name="Optical" fill="#10B981" radius={[4, 4, 0, 0]} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
