"use client";

import { CheckCircle2, Circle, Clock, Flag } from "lucide-react";
import { Task } from "./data";
import { cn } from "@/lib/utils";

interface TaskItemProps {
    task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
    const priorityColor = {
        low: "text-slate-500",
        medium: "text-blue-500",
        high: "text-orange-500",
        urgent: "text-rose-500",
    };

    const isDone = task.status === "done";

    return (
        <div className={cn(
            "flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 shadow-sm transition-all duration-200 group",
            isDone ? "opacity-60" : "hover:border-primary/20 hover:shadow-md"
        )}>
            {/* Checkbox Placeholder */}
            <button className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                isDone
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/30 hover:border-primary text-transparent"
            )}>
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4" />}
            </button>

            {/* Task Content */}
            <div className="flex-1 min-w-0">
                <h4 className={cn(
                    "font-medium text-foreground truncate transition-all",
                    isDone && "line-through text-muted-foreground"
                )}>
                    {task.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                        <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                            {task.assignee.split(" ").map(n => n[0]).join("")}
                        </span>
                        {task.assignee}
                    </span>
                    <span>•</span>
                    <span>{task.project}</span>
                    <span>•</span>
                    <span className={cn("flex items-center gap-1", isDone && "text-muted-foreground")}>
                        <Clock className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Priority Indicator */}
            <div className="flex-shrink-0">
                <Flag className={cn("w-4 h-4 fill-current", priorityColor[task.priority])} />
            </div>
        </div>
    );
}
