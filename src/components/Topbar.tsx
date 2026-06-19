import { useState } from 'react';
import { Search, Bell, Menu, X, Settings, User, Eye, ShieldAlert, CheckCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Topbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('Junior Developer');
  const [obsBand, setObsBand] = useState('c-band');
  const [radarAlerts, setRadarAlerts] = useState(true);
  const [highRes, setHighRes] = useState(true);
  const [successToast, setSuccessToast] = useState(false);

  // Form states matching current configuration
  const [tempUsername, setTempUsername] = useState(username);
  const [tempObsBand, setTempObsBand] = useState(obsBand);
  const [tempRadarAlerts, setTempRadarAlerts] = useState(radarAlerts);
  const [tempHighRes, setTempHighRes] = useState(highRes);

  const openModal = () => {
    setTempUsername(username);
    setTempObsBand(obsBand);
    setTempRadarAlerts(radarAlerts);
    setTempHighRes(highRes);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername(tempUsername);
    setObsBand(tempObsBand);
    setRadarAlerts(tempRadarAlerts);
    setHighRes(tempHighRes);
    setIsModalOpen(false);

    // Trigger success notification toast
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
    }, 3000);
  };

  return (
    <>
      <header className="h-16 bg-surface/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
        
        <div className="flex items-center gap-4">
          <button className="md:hidden text-slate-400 hover:text-white">
            <Menu size={24} />
          </button>
          
          <Link
            to="/"
            className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:border-primary/40 hover:bg-primary/10 hover:text-white transition-all"
          >
            <Home size={16} />
            <span>Home</span>
          </Link>
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search regions, alerts..." 
              className="bg-background border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 w-64 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* User Welcome */}
          <span className="hidden sm:inline text-sm font-medium text-slate-400">
            Welcome, <span className="text-white font-semibold">{username}</span>
          </span>

          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-surface"></span>
          </button>
          
          {/* Profile Click trigger */}
          <div 
            onClick={openModal}
            className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/20 p-[2px] cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="User Profile Configuration"
          >
            <img src="https://i.pravatar.cc/150?img=33" alt="User profile" className="rounded-full w-full h-full object-cover" />
          </div>
        </div>

      </header>

      {/* Success Alert Toast Notification */}
      {successToast && (
        <div className="fixed left-1/2 top-24 -translate-x-1/2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-3.5 rounded-xl shadow-2xl z-50 flex items-center gap-3 font-semibold animate-in slide-in-from-top-4 duration-300">
          <CheckCircle size={18} />
          <span>Dashboard Settings Saved!</span>
        </div>
      )}

      {/* User Customization Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings size={18} className="text-primary animate-spin-slow" />
                Customize Dashboard
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="space-y-5">
              
              {/* Profile Section */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <User size={13} />
                  User Profile
                </label>
                <input 
                  type="text" 
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50"
                  placeholder="Enter name"
                  required
                />
              </div>

              {/* Data Settings */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Eye size={13} />
                  Default Observation Band
                </label>
                <select 
                  value={tempObsBand}
                  onChange={(e) => setObsBand(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary/50 cursor-pointer"
                >
                  <option value="c-band">C-band SAR (Sentinel-1)</option>
                  <option value="x-band">X-band SAR (Cosmo-SkyMed)</option>
                  <option value="optical">Optical (Sentinel-2)</option>
                </select>
              </div>

              {/* Preferences Toggles */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <ShieldAlert size={13} />
                  Notification Preferences
                </label>
                <div className="space-y-3">
                  
                  {/* Toggle 1: Radar Alerts */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Enable Land Clearing Alerts</span>
                    <button
                      type="button"
                      onClick={() => setTempRadarAlerts(!tempRadarAlerts)}
                      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${tempRadarAlerts ? 'bg-primary' : 'bg-slate-700'}`}
                    >
                      <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${tempRadarAlerts ? 'translate-x-5' : ''}`} />
                    </button>
                  </div>

                  {/* Toggle 2: High Resolution */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">High-Resolution Radar Tiles</span>
                    <button
                      type="button"
                      onClick={() => setTempHighRes(!tempHighRes)}
                      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${tempHighRes ? 'bg-primary' : 'bg-slate-700'}`}
                    >
                      <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${tempHighRes ? 'translate-x-5' : ''}`} />
                    </button>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-lg bg-surface hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white text-sm font-semibold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  Save Configuration
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
}
