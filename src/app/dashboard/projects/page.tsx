"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { MOCK_PROJECTS, Project } from "@/components/projects/data";
import { Plus, Filter } from "lucide-react";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem("bedrock-projects");
        if (saved) {
            try {
                setProjects(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load projects", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage whenever projects change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("bedrock-projects", JSON.stringify(projects));
        }
    }, [projects, isLoaded]);

    const handleCreateProject = () => {
        setEditingProject(null);
        setIsModalOpen(true);
    };

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    const handleSaveProject = (project: Project) => {
        if (editingProject) {
            setProjects(prev => prev.map(p => p.id === project.id ? project : p));
        } else {
            setProjects(prev => [project, ...prev]);
        }
        setIsModalOpen(false);
    };

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
                    <button
                        onClick={handleCreateProject}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm hover:shadow-primary/25 hover:shadow-lg"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </button>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onEdit={handleEditProject}
                    />
                ))}
            </div>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveProject}
                project={editingProject}
            />
        </div>
    );
}
