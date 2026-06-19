import KPICards from '../components/KPICards';
import MapOverview from '../components/MapOverview';

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Generate Report
        </button>
      </div>
      <KPICards />
      <MapOverview />
    </div>
  );
}
