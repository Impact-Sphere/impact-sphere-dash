import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/app/lib/utils";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, icon = "search", placeholder, ...props }, ref) => {
    return (
      <div className={cn("relative group", className)}>
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
          {icon}
        </span>
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={cn(
            "pl-12 pr-6 py-3 w-full bg-surface-container-low border-none rounded-full text-sm",
            "focus:ring-2 focus:ring-surface-tint/30 placeholder:text-on-surface-variant/50",
            "transition-all outline-none",
          )}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
