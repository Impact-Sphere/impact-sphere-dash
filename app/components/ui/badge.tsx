import { cn } from "@/app/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "primary",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full",
        {
          "text-secondary bg-secondary-fixed/30": variant === "primary",
          "text-tertiary bg-tertiary-fixed/30": variant === "secondary",
          "text-primary-container bg-primary-fixed-dim/30":
            variant === "tertiary",
        },
        className,
      )}
    >
      {children}
    </span>
  );
}
