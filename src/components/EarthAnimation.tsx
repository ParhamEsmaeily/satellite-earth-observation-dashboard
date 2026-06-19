export default function EarthAnimation() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="absolute h-72 w-72 rounded-full border border-primary/30 animate-pulse" />
      <div className="h-56 w-56 rounded-full bg-gradient-to-br from-blue-500 via-cyan-600 to-slate-900 shadow-[0_0_80px_rgba(59,130,246,0.45)]" />
      <div className="absolute top-20 right-20 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-white">
        Satellite orbit preview
      </div>
    </div>
  );
}
