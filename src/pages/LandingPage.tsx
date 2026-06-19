import Navbar from '../components/Navbar';
import EarthAnimation from '../components/EarthAnimation';
import { ArrowRight, Globe, Layers, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <main className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Copy */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Live Constellation
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
              Earth Observation. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">
                Smarter Insights.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
              Harness the power of C-band and X-band SAR imagery. Uncover critical changes, monitor global infrastructure, and make data-driven decisions with our advanced geospatial intelligence platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => navigate('/dashboard')}
                className="group flex items-center justify-center gap-2 bg-white text-background px-8 py-4 rounded-lg text-base font-semibold transition-all hover:bg-slate-200"
              >
                Access Dashboard
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="flex items-center justify-center gap-2 bg-surface border border-white/10 text-white px-8 py-4 rounded-lg text-base font-semibold transition-all hover:bg-white/5 hover:border-white/20">
                View Sample Data
              </button>
            </div>
          </div>

          {/* Right Column - Visual Animation */}
          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
            <EarthAnimation />
          </div>
        </div>
      </main>

      {/* Feature Cards Section */}
      <section className="relative z-10 px-6 max-w-7xl mx-auto pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-surface/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl hover:bg-surface/60 hover:border-white/10 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Monitor Areas</h3>
            <p className="text-slate-400 leading-relaxed">
              Define custom regions of interest globally. Track infrastructure changes, natural resources, and maritime activity in near real-time.
            </p>
          </div>

          <div className="bg-surface/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl hover:bg-surface/60 hover:border-white/10 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
              <Layers size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Compare Images</h3>
            <p className="text-slate-400 leading-relaxed">
              Visualize before and after conditions with high-resolution Synthetic Aperture Radar (SAR) regardless of cloud cover or darkness.
            </p>
          </div>

          <div className="bg-surface/40 backdrop-blur-md border border-white/5 p-8 rounded-2xl hover:bg-surface/60 hover:border-white/10 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">View Alerts</h3>
            <p className="text-slate-400 leading-relaxed">
              Receive automated, AI-driven notifications for flood changes, land clearing, and critical infrastructure developments.
            </p>
          </div>

        </div>
      </section>
      
    </div>
  );
}
