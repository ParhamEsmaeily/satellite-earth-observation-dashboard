import { Satellite } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 text-primary">
            <Satellite size={24} />
          </div>
          <span className="text-xl font-bold tracking-wider text-white">Satellite EO</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link to="/" className="hover:text-white transition-colors">Platform</Link>
          <Link to="/" className="hover:text-white transition-colors">Solutions</Link>
          <Link to="/" className="hover:text-white transition-colors">Data</Link>
          <Link to="/" className="hover:text-white transition-colors">Resources</Link>
          <Link to="/" className="hover:text-white transition-colors">About</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Sign In
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]"
          >
            Open Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}
