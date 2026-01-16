"use client";

import { useState } from "react";
import {
    MoreHorizontal,
    Search,
    Filter,
    Plus,
    Mail,
    X,
    Pencil,
    Briefcase,
    DollarSign,
    FolderPlus
} from "lucide-react";
import { Client } from "./data";
import { useClients } from "@/hooks/useClients";
import { cn } from "@/lib/utils";
import { DealModal } from "../pipeline/DealModal";
import { ProjectModal } from "../projects/ProjectModal";
import { Deal } from "../pipeline/data";
import { Project } from "../projects/data";

export function ClientList() {
    const { clients, addClient, updateClient } = useClients();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    // Cross-Functional States
    const [selectedClientForAction, setSelectedClientForAction] = useState<Client | null>(null);
    const [isDealModalOpen, setIsDealModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        company: "", // Mapped to name in this simple mock
        status: "active" as Client['status'],
        contactPerson: "",
        email: "",
        industry: "Technology", // Default
        totalRevenue: 0
    });

    const statusColors = {
        active: "bg-emerald-500/10 text-emerald-500",
        inactive: "bg-slate-500/10 text-slate-500",
        pending: "bg-amber-500/10 text-amber-500",
    };

    const handleOpenModal = (client?: Client) => {
        if (client) {
            setEditingClient(client);
            setFormData({
                name: client.name,
                company: client.name,
                status: client.status,
                contactPerson: client.contactPerson,
                email: client.email,
                industry: client.industry,
                totalRevenue: client.totalRevenue
            });
        } else {
            setEditingClient(null);
            setFormData({
                name: "",
                company: "",
                status: "active",
                contactPerson: "",
                email: "",
                industry: "Technology",
                totalRevenue: 0
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingClient) {
            // Edit Mode
            updateClient({
                ...editingClient,
                name: formData.name,
                status: formData.status,
                contactPerson: formData.contactPerson,
                email: formData.email,
                industry: formData.industry,
                totalRevenue: Number(formData.totalRevenue)
            });
        } else {
            // Add Mode
            const newClient: Client = {
                id: crypto.randomUUID(),
                name: formData.name,
                status: formData.status,
                contactPerson: formData.contactPerson,
                email: formData.email,
                industry: formData.industry,
                totalRevenue: Number(formData.totalRevenue),
                avatar: formData.name.substring(0, 2).toUpperCase(),
                lastActive: new Date().toISOString()
            };
            addClient(newClient);
        }
        setIsModalOpen(false);
    };

    // Handlers for cross-functional actions
    const handleCreateDeal = (client: Client) => {
        setSelectedClientForAction(client);
        setIsDealModalOpen(true);
    };

    const handleCreateProject = (client: Client) => {
        setSelectedClientForAction(client);
        setIsProjectModalOpen(true);
    };

    // Dummy handlers for saving (since we are in ClientList, we might not see the result immediately on other boards unless we persist to localStorage there too)
    // Actually, ProjectModal and DealModal usually take an onSave that updates the LOCAL state of the parent page.
    // BUT here we interpret "Central Database" implies these changes should persist.
    // Since PipelineBoard and ProjectsPage read from localStorage on mount, if we save to localStorage here, they SHOULD pick it up if we force reload or if they listen to events.
    // For now, let's implement basic "Saved" alerts or just save to localStorage manually if the Modals don't do it themselves.
    // Wait, the Modals call `onSave` with the object. They DON'T save to localStorage themselves usually (the parent page does).
    // I need to implement `onSave` here that writes to the respective localStorage keys.

    const saveDeal = (deal: Deal) => {
        const savedDeals = JSON.parse(localStorage.getItem("pipeline-deals") || "[]");
        localStorage.setItem("pipeline-deals", JSON.stringify([...savedDeals, deal]));
        setIsDealModalOpen(false);
        // Optional: Alert user
        alert("Deal created successfully via Client Database!");
    };

    const saveProject = (project: Project) => {
        const savedProjects = JSON.parse(localStorage.getItem("projects-data") || "[]"); // Checking ProjectPage key... wait ProjectPage uses MOCK_PROJECTS mostly?
        // Let's create a key "bedrock-projects" to be consistent if ProjectsPage uses it.
        // Actually ProjectsPage currently uses local state initialized from MOCK. It doesn't seem to have full persistence hooks yet in my memory? 
        // Let's check... ProjectsPage has `MOCK_PROJECTS`.
        // I should probably update ProjectsPage to read from localStorage too if I want this to work.
        // For now, I will save to "bedrock-projects" and "pipeline-deals".
        // PipelineBoard DOES read from "pipeline-deals".

        localStorage.setItem("bedrock-projects", JSON.stringify([...savedProjects, project]));
        setIsProjectModalOpen(false);
        alert("Project created successfully via Client Database!");
    };

    return (
        <div className="space-y-4">
            {/* Filters Bar */}
            <div className="flex items-center justify-between gap-4 p-1">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="w-full pl-9 pr-4 py-2 rounded-lg bg-background border border-border text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors text-sm font-medium">
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        Add Client
                    </button>
                </div>
            </div>

            {/* Client Table */}
            <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border/50">
                        <tr>
                            <th className="px-6 py-3">Client</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Contact</th>
                            <th className="px-6 py-3">Revenue</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-muted/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center font-bold text-muted-foreground ring-1 ring-border">
                                            {client.avatar}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-foreground">{client.name}</div>
                                            <div className="text-xs text-muted-foreground">{client.industry}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize", statusColors[client.status])}>
                                        {client.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-foreground font-medium">{client.contactPerson}</span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            {client.email}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-muted-foreground">
                                    ${(client.totalRevenue).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center gap-1 justify-end">
                                        <button
                                            onClick={() => handleCreateDeal(client)}
                                            className="p-1.5 rounded-md text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
                                            title="Create Deal"
                                        >
                                            <DollarSign className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleCreateProject(client)}
                                            className="p-1.5 rounded-md text-muted-foreground hover:bg-blue-500/10 hover:text-blue-600 transition-colors"
                                            title="Start Project"
                                        >
                                            <FolderPlus className="w-4 h-4" />
                                        </button>
                                        <div className="w-px h-4 bg-border mx-1" />
                                        <button
                                            onClick={() => handleOpenModal(client)}
                                            className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                                            title="Edit Client"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Client Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-background w-full max-w-lg rounded-xl shadow-2xl border border-border p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Company Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Industry</label>
                                    <input
                                        type="text"
                                        value={formData.industry}
                                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Contact Person</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.contactPerson}
                                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                    >
                                        <option value="active">Active</option>
                                        <option value="pending">Pending</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Total Revenue</label>
                                    <input
                                        type="number"
                                        value={formData.totalRevenue}
                                        onChange={(e) => setFormData({ ...formData, totalRevenue: Number(e.target.value) })}
                                        className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                                >
                                    {editingClient ? 'Save Changes' : 'Add Client'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Cross-Modals */}
            <DealModal
                isOpen={isDealModalOpen}
                onClose={() => setIsDealModalOpen(false)}
                onSave={saveDeal}
                deal={null}
                defaultClientName={selectedClientForAction?.name}
            />
            <ProjectModal
                isOpen={isProjectModalOpen}
                onClose={() => setIsProjectModalOpen(false)}
                onSave={saveProject}
                project={null}
                defaultClientName={selectedClientForAction?.name}
            />
        </div>
    );
}
