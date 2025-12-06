import { TaskItem } from "@/components/tasks/TaskItem";
import { MOCK_TASKS } from "@/components/tasks/data";
import { Plus, ListFilter } from "lucide-react";

export default function TasksPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
                    <p className="text-muted-foreground mt-1">
                        Stay organized and manage your daily priorities.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors text-sm font-medium">
                        <ListFilter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm hover:shadow-primary/25 hover:shadow-lg">
                        <Plus className="w-4 h-4" />
                        Add Task
                    </button>
                </div>
            </div>

            {/* Task List */}
            <div className="space-y-3">
                {/* Active Tasks Group */}
                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground pl-1">Active</h3>
                    {MOCK_TASKS.filter(t => t.status !== 'done').map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>

                {/* Completed Tasks Group */}
                <div className="space-y-3 pt-4">
                    <h3 className="text-sm font-medium text-muted-foreground pl-1">Completed</h3>
                    {MOCK_TASKS.filter(t => t.status === 'done').map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    );
}
