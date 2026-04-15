import { cn } from "@/app/lib/utils";

interface ImpactPulseProps {
  percentage: number;
  amount: string;
  className?: string;
}

export function ImpactPulse({
  percentage,
  amount,
  className,
}: ImpactPulseProps) {
  // Calculate stroke dash offset based on percentage
  const circumference = 2 * Math.PI * 45; // r=45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={cn(
        "col-span-12 lg:col-span-4 bg-gradient-to-br from-slate-900 to-primary p-8 rounded-xl text-white overflow-hidden relative",
        className,
      )}
    >
      <div className="relative z-10">
        <h4 className="text-lg font-bold mb-2">The Impact Pulse</h4>
        <p className="text-xs text-white/70 mb-6">
          Real-time global funding momentum
        </p>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 relative">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 100 100"
              role="img"
              aria-label="Impact Pulse Progress"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke="url(#pulseGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient
                  id="pulseGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#680079" />
                  <stop offset="100%" stopColor="#32a3fd" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">
              {percentage}%
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-white/60">
              Live Traction
            </div>
            <div className="text-lg font-bold">
              ↑ {amount}{" "}
              <span className="text-xs font-normal opacity-70">this hour</span>
            </div>
          </div>
        </div>
      </div>
      {/* Abstract Background Graphic */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
    </div>
  );
}
