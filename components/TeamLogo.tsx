export default function TeamLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className || ''}`}>
      <svg width="40" height="40" viewBox="0 0 100 100" className="flex-shrink-0">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#00D2BE" strokeWidth="3" />
        <circle cx="50" cy="50" r="40" fill="#0a0a0a" stroke="#00D2BE" strokeWidth="1" />
        <path
          d="M50 15 L58 42 L86 42 L63 58 L71 85 L50 68 L29 85 L37 58 L14 42 L42 42 Z"
          fill="#00D2BE"
        />
      </svg>
      <div className="leading-tight">
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-white">
          AMG Petronas
        </p>
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-f1-teal">
          Formula 1 Team
        </p>
      </div>
    </div>
  );
}