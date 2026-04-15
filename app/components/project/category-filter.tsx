"use client";

import { cn } from "@/app/lib/utils";

interface Category {
  id: string;
  label: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = category.id === activeCategory;
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all",
              isActive
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-surface-container-lowest text-on-surface-variant hover:bg-primary-fixed-dim",
            )}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
