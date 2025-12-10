"use client";

import { Calendar, MoreHorizontal, User } from "lucide-react";
import { Deal } from "./data";
import { cn } from "@/lib/utils";

interface DealCardProps {
    deal: Deal;
}

export function DealCard({ deal, onEdit, onDelete }: DealCardProps & { onEdit: (deal: Deal) => void; onDelete: (id: string) => void }) {
    const priorityColor = {
        low: "bg-slate-500",
        medium: "bg-amber-500",
        high: "bg-rose-500",
    };

    return (
        <div className="group relative p-4 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-default w-full">
            <div className="flex justify-between items-start mb-3">
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        {deal.company}
                    </span>
                    <h4 className="font-medium text-sm text-foreground leading-snug">
                        {deal.title}
                    </h4>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(deal); }}
                        className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-primary transition-colors"
                        title="Edit Deal"
                    >
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(deal.id); }}
                        className="p-1 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors"
                        title="Delete Deal"
                    >
                        <span className="text-xs font-bold">✕</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-[10px] text-white font-medium ring-2 ring-background">
                        {deal.owner.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(deal.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", priorityColor[deal.priority])} />
                    <span className="font-semibold text-sm">
                        ${(deal.value / 1000).toFixed(0)}k
                    </span>
                </div>
            </div>

            {/* Hover Effect Glow */}
            <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
}
