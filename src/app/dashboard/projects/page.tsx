import { ProjectCard } from "@/components/projects/ProjectCard";
import { MOCK_PROJECTS } from "@/components/projects/data";
import { Plus, Filter } from "lucide-react";

export default function ProjectsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground mt-1">
                        Track project delivery, timelines, and milestones.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors text-sm font-medium">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm hover:shadow-primary/25 hover:shadow-lg">
                        <Plus className="w-4 h-4" />
                        New Project
                    </button>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_PROJECTS.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
