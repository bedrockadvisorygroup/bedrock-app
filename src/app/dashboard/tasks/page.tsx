"use client";

import { useState } from "react";
import { TaskItem } from "@/components/tasks/TaskItem";
import { MOCK_TASKS, Task } from "@/components/tasks/data";
import { Plus, ListFilter, X } from "lucide-react";

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const toggleTaskStatus = (id: string) => {
        setTasks(prev => prev.map(task =>
            task.id === id
                ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
                : task
        ));
    };

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: newTaskTitle,
            status: 'todo',
            priority: 'medium', // Default
            dueDate: new Date().toISOString(),
            assignee: 'Current User', // Placeholder
            project: 'General'
        };

        setTasks(prev => [newTask, ...prev]);
        setNewTaskTitle("");
        setIsModalOpen(false);
    };

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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm hover:shadow-primary/25 hover:shadow-lg"
                    >
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
                    {tasks.filter(t => t.status !== 'done').map((task) => (
                        <TaskItem key={task.id} task={task} onToggleStatus={toggleTaskStatus} />
                    ))}
                    {tasks.filter(t => t.status !== 'done').length === 0 && (
                        <p className="text-sm text-muted-foreground italic pl-1">No active tasks.</p>
                    )}
                </div>

                {/* Completed Tasks Group */}
                <div className="space-y-3 pt-4">
                    <h3 className="text-sm font-medium text-muted-foreground pl-1">Completed</h3>
                    {tasks.filter(t => t.status === 'done').map((task) => (
                        <TaskItem key={task.id} task={task} onToggleStatus={toggleTaskStatus} />
                    ))}
                </div>
            </div>

            {/* Simple Add Task Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-background w-full max-w-md rounded-xl shadow-2xl border border-border p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">New Task</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddTask} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium mb-1.5">Task Title</label>
                                <input
                                    autoFocus
                                    id="title"
                                    type="text"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    placeholder="e.g. Review Q3 Reports"
                                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!newTaskTitle.trim()}
                                    className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg disabled:opacity-50"
                                >
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
