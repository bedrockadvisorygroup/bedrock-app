"use client";

import { Calendar, MoreHorizontal, Users, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Project } from "./data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const statusConfig = {
        "on-track": { color: "text-emerald-500", bg: "bg-emerald-500/10", icon: CheckCircle2, label: "On Track" },
        "at-risk": { color: "text-amber-500", bg: "bg-amber-500/10", icon: AlertCircle, label: "At Risk" },
        "delayed": { color: "text-rose-500", bg: "bg-rose-500/10", icon: Clock, label: "Delayed" },
        "completed": { color: "text-blue-500", bg: "bg-blue-500/10", icon: CheckCircle2, label: "Completed" },
    };

    const config = statusConfig[project.status];
    const StatusIcon = config.icon;

    return (
        <div className="group p-5 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider flex items-center gap-1.5", config.bg, config.color)}>
                            <StatusIcon className="w-3 h-3" />
                            {config.label}
                        </span>
                        <span className="text-xs text-muted-foreground">• {project.client}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">{project.title}</h3>
                </div>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 h-10">
                {project.description}
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <div className="flex -space-x-2">
                    {project.team.map((initials, i) => (
                        <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-background ring-2 ring-card flex items-center justify-center text-xs font-medium text-muted-foreground border border-border"
                            title={`Team Member ${initials}`}
                        >
                            {initials}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>Due {new Date(project.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                </div>
            </div>
        </div>
    );
}
