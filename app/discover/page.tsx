"use client";

import { useState } from "react";
import { Header } from "@/app/components/layout/header";
import { CategoryFilter } from "@/app/components/project/category-filter";
import { FeaturedProjectCard } from "@/app/components/project/featured-project-card";
import { ProjectCard } from "@/app/components/project/project-card";
import { ImpactPulse } from "@/app/components/widgets/impact-pulse";
import { categories, featuredProject, projects } from "@/app/lib/data";

export default function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"all" | "recent">("all");

  return (
    <main className="ml-72 min-h-screen">
      <Header
        title="Project Discovery"
        subtitle="Explore high-impact initiatives awaiting your partnership."
        searchPlaceholder="Search initiatives..."
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <section className="px-12 py-8 space-y-12">
        {/* Category Filters */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Project Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Featured Project */}
          <FeaturedProjectCard project={featuredProject} />

          {/* Standard Project Cards */}
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            />
          ))}

          {/* Impact Pulse Widget */}
          <ImpactPulse percentage={64} amount="$24.8k" />
        </div>
      </section>

      {/* Pagination */}
      <footer className="px-12 py-12 flex justify-between items-center opacity-60">
        <span className="text-xs font-medium">
          Showing 4 of 128 active initiatives
        </span>
        <div className="flex space-x-2">
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-surface-container transition-colors"
            aria-label="Previous page"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_left
            </span>
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center bg-primary text-white"
          >
            1
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-surface-container transition-colors text-xs font-bold"
          >
            2
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-outline-variant/20 flex items-center justify-center hover:bg-surface-container transition-colors"
            aria-label="Next page"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
          </button>
        </div>
      </footer>
    </main>
  );
}
