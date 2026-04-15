import { cn } from "@/app/lib/utils";

interface ProgressBarProps {
  value: number;
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  size = "md",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn("space-y-1.5", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs font-bold">
          <span className="text-primary">{clampedValue}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full overflow-hidden bg-surface-container-high",
          {
            "h-2": size === "sm",
            "h-3": size === "md",
          },
        )}
      >
        <div
          className={cn("h-full transition-all duration-500", {
            "bg-primary": size === "sm",
            "bg-gradient-to-r from-primary via-primary-container to-secondary":
              size === "md",
          })}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
