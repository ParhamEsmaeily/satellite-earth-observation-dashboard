import KPICards from '../components/KPICards';
import MapOverview from '../components/MapOverview';
import ChangeDetection from '../components/ChangeDetection';

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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <MapOverview />
        </div>
        <div>
          <ChangeDetection />
        </div>
      </div>
    </div>
  );
}
