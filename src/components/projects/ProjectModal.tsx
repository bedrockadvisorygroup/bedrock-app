"use client";

import { useState, useEffect } from "react";
import { Project, Subtask } from "./data";
import { X, Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClients } from "@/hooks/useClients";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (project: Project) => void;
    project?: Project | null;
    defaultClientName?: string;
}

export function ProjectModal({ isOpen, onClose, onSave, project, defaultClientName }: ProjectModalProps) {
    const { clients } = useClients();
    const [formData, setFormData] = useState<Project>({
        id: "",
        title: "",
        client: "",
        status: "on-track",
        progress: 0,
        dueDate: new Date().toISOString(),
        team: [],
        budget: 0,
        description: "",
        subtasks: []
    });

    const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
    const [newSubtaskDueDate, setNewSubtaskDueDate] = useState("");

    useEffect(() => {
        if (project) {
            setFormData(project);
        } else {
            setFormData({
                id: crypto.randomUUID(),
                title: "",
                client: defaultClientName || (clients.length > 0 ? clients[0].name : ""),
                status: "on-track",
                progress: 0,
                dueDate: new Date().toISOString().split('T')[0],
                team: [],
                budget: 0,
                description: "",
                subtasks: []
            });
        }
    }, [project, isOpen, clients]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const calculateProgress = (subtasks: Subtask[]) => {
        if (subtasks.length === 0) return 0;
        const completed = subtasks.filter(s => s.isCompleted).length;
        return Math.round((completed / subtasks.length) * 100);
    };

    const addSubtask = () => {
        if (!newSubtaskTitle.trim()) return;
        const newSubtask: Subtask = {
            id: crypto.randomUUID(),
            title: newSubtaskTitle,
            isCompleted: false,
            dueDate: newSubtaskDueDate || undefined
        };

        setFormData(prev => {
            const updatedSubtasks = [...prev.subtasks, newSubtask];
            return {
                ...prev,
                subtasks: updatedSubtasks,
                progress: calculateProgress(updatedSubtasks)
            };
        });
        setNewSubtaskTitle("");
        setNewSubtaskDueDate("");
    };

    const toggleSubtask = (id: string) => {
        setFormData(prev => {
            const updatedSubtasks = prev.subtasks.map(s =>
                s.id === id ? { ...s, isCompleted: !s.isCompleted } : s
            );
            return {
                ...prev,
                subtasks: updatedSubtasks,
                progress: calculateProgress(updatedSubtasks)
            };
        });
    };

    const deleteSubtask = (id: string) => {
        setFormData(prev => {
            const updatedSubtasks = prev.subtasks.filter(s => s.id !== id);
            return {
                ...prev,
                subtasks: updatedSubtasks,
                progress: calculateProgress(updatedSubtasks)
            };
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-background w-full max-w-2xl rounded-xl shadow-2xl border border-border max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-semibold">
                        {project ? 'Edit Project' : 'New Project'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Project Title</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Client</label>
                                <select
                                    required
                                    value={formData.client}
                                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                >
                                    <option value="" disabled>Select a client</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.name}>
                                            {client.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                rows={2}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                >
                                    <option value="on-track">On Track</option>
                                    <option value="at-risk">At Risk</option>
                                    <option value="delayed">Delayed</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Progress (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Due Date</label>
                            <input
                                type="date"
                                required
                                value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>

                        {/* Subtasks Section */}
                        <div className="space-y-3 pt-4 border-t border-border/50">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium">Subtasks</h3>
                                <span className="text-xs text-muted-foreground">
                                    {formData.subtasks.filter(s => s.isCompleted).length} / {formData.subtasks.length} completed
                                </span>
                            </div>

                            {/* Add Subtask Input */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSubtaskTitle}
                                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
                                    placeholder="Add new subtask..."
                                    className="flex-1 px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                                />
                                <input
                                    type="date"
                                    value={newSubtaskDueDate}
                                    onChange={(e) => setNewSubtaskDueDate(e.target.value)}
                                    className="px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none text-sm w-36"
                                />
                                <button
                                    type="button"
                                    onClick={addSubtask}
                                    className="px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Subtask List */}
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                                {formData.subtasks.length === 0 && (
                                    <p className="text-sm text-muted-foreground italic text-center py-2">No subtasks yet.</p>
                                )}
                                {formData.subtasks.map(subtask => (
                                    <div key={subtask.id} className="flex items-center gap-3 p-2 rounded-lg border border-border/40 bg-card hover:bg-muted/20 group transition-colors">
                                        <button
                                            type="button"
                                            onClick={() => toggleSubtask(subtask.id)}
                                            className={cn("flex-shrink-0 transition-colors", subtask.isCompleted ? "text-primary" : "text-muted-foreground hover:text-primary")}
                                        >
                                            {subtask.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                        </button>
                                        <div className="flex-1 min-w-0">
                                            <div className={cn("text-sm truncate", subtask.isCompleted && "line-through text-muted-foreground")}>
                                                {subtask.title}
                                            </div>
                                            {subtask.dueDate && (
                                                <div className="text-[10px] text-muted-foreground">
                                                    Due: {new Date(subtask.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => deleteSubtask(subtask.id)}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-rose-500 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border bg-muted/20 rounded-b-xl flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg border border-border/50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="project-form"
                        className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm"
                    >
                        {project ? 'Save Changes' : 'Create Project'}
                    </button>
                </div>
            </div>
        </div>
    );
}
