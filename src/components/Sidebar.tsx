import { LayoutDashboard, Map, Image as ImageIcon, AlertCircle, GitCompare, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Regions', icon: Map, path: '/dashboard/regions' },
  { name: 'Imagery', icon: ImageIcon, path: '/dashboard/imagery' },
  { name: 'Alerts', icon: AlertCircle, path: '/dashboard/alerts' },
  { name: 'Compare', icon: GitCompare, path: '/dashboard/compare' },
  { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-surface border-r border-white/5 hidden md:flex flex-col h-screen fixed top-0 left-0">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <span className="text-xl font-bold tracking-wider text-white">Dashboard</span>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
