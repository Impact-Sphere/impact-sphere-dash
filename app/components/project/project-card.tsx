import Image from "next/image";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { ProgressBar } from "@/app/components/ui/progress-bar";
import { cn } from "@/app/lib/utils";
import type { Project } from "@/app/types/project";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const getBadgeVariant = (category: string) => {
    switch (category) {
      case "Education":
        return "secondary";
      case "Healthcare":
        return "primary";
      case "Tech Equity":
        return "tertiary";
      default:
        return "primary";
    }
  };

  return (
    <article
      className={cn(
        "bg-surface-container-lowest rounded-xl p-8 flex flex-col hover:shadow-[0_32px_64px_-12px_rgba(69,0,173,0.08)] transition-all",
        className,
      )}
    >
      <div className="h-48 w-full rounded-xl overflow-hidden mb-6 relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <Badge variant={getBadgeVariant(project.category)}>
        {project.category}
      </Badge>
      <h3 className="text-xl font-bold mt-3">{project.title}</h3>
      <p className="text-sm text-on-surface-variant mt-2 flex-1">
        {project.description}
      </p>
      <div className="mt-8 space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-primary">{project.funded}%</span>
            <span className="text-on-surface-variant">
              {project.raised} / {project.goal}
            </span>
          </div>
          <ProgressBar value={project.funded} size="sm" />
        </div>
        <Button variant="secondary" size="lg">
          Fund Now
        </Button>
      </div>
    </article>
  );
}
