"use client";

import { MoreVertical, Download } from "lucide-react";
import { Resource, FILE_ICONS } from "./data";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
    resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
    const { icon: Icon, color, bg } = FILE_ICONS[resource.type]; // Fixed: Destructure properly

    return (
        <div className="group flex items-center p-4 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
            <div className={cn("p-3 rounded-lg mr-4", bg, color)}>
                <Icon className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{resource.title}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{resource.category}</span>
                    <span>•</span>
                    <span>{resource.size}</span>
                    <span>•</span>
                    <span>{new Date(resource.updatedAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
