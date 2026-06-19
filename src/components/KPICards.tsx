import { dashboardStats } from '../data/dashboardStats';
import { Map, Image as ImageIcon, AlertTriangle, Satellite } from 'lucide-react';

export default function KPICards() {
  const cards = [
    {
      title: 'Active Regions',
      value: dashboardStats.activeRegions.value,
      trend: dashboardStats.activeRegions.trend,
      icon: Map,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'New Images',
      value: dashboardStats.newImages.value,
      trend: dashboardStats.newImages.trend,
      icon: ImageIcon,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      title: 'Critical Alerts',
      value: dashboardStats.alerts.value,
      trend: dashboardStats.alerts.trend,
      icon: AlertTriangle,
      color: 'text-red-400',
      bg: 'bg-red-500/10'
    },
    {
      title: 'Next Satellite Pass',
      value: dashboardStats.nextPass.value,
      trend: dashboardStats.nextPass.trend,
      icon: Satellite,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-surface border border-white/5 p-6 rounded-2xl flex items-center justify-between hover:bg-white/[0.02] transition-colors">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">{card.title}</p>
            <h3 className="text-3xl font-bold text-white mb-2">{card.value}</h3>
            <p className={`text-xs font-medium ${card.color}`}>{card.trend}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg}`}>
            <card.icon className={card.color} size={24} />
          </div>
        </div>
      ))}
    </div>
  );
}
