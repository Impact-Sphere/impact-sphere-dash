import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/app/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all active:scale-95",
          {
            "bg-primary text-on-primary hover:opacity-90":
              variant === "primary",
            "bg-surface-container-highest text-primary hover:bg-primary hover:text-on-primary":
              variant === "secondary",
            "border border-outline-variant text-on-surface hover:bg-surface-container":
              variant === "outline",
            "text-on-surface-variant hover:bg-surface-container":
              variant === "ghost",
            "px-3 py-1.5 text-xs rounded-full": size === "sm",
            "px-4 py-2 text-sm rounded-xl": size === "md",
            "w-full py-3 text-sm rounded-xl": size === "lg",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
