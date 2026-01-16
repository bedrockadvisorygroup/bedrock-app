"use client";

import { useState, useEffect } from "react";
import { Deal, PIPELINE_STAGES } from "./data";
import { X, Calendar, DollarSign, Building2, User, Mail, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClients } from "@/hooks/useClients";
import { Client } from "../clients/data";

interface DealModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (deal: Deal) => void;
    deal?: Deal | null;
    defaultClientName?: string;
}

export function DealModal({ isOpen, onClose, onSave, deal, defaultClientName }: DealModalProps) {
    const { clients, addClient } = useClients();

    // Deal Form Data
    const [formData, setFormData] = useState<Deal>({
        id: "",
        title: "",
        company: "",
        value: 0,
        stage: "lead",
        owner: "",
        dueDate: new Date().toISOString(),
        priority: "medium",
    });

    // New Client Form Data (only used if company doesn't exist)
    const [newClientData, setNewClientData] = useState({
        contactPerson: "",
        email: "",
        industry: "Technology"
    });

    const [isNewClient, setIsNewClient] = useState(false);

    useEffect(() => {
        if (deal) {
            setFormData(deal);
            setIsNewClient(false);
        } else {
            setFormData({
                id: Math.random().toString(36).substr(2, 9),
                title: "",
                company: defaultClientName || "",
                value: 0,
                stage: "lead",
                owner: "You",
                dueDate: new Date().toISOString().split('T')[0],
                priority: "medium",
            });
            setIsNewClient(false);
            setNewClientData({ contactPerson: "", email: "", industry: "Technology" });
        }
    }, [deal, isOpen]);

    // Check if company is new whenever it changes
    useEffect(() => {
        if (!formData.company) {
            setIsNewClient(false);
            return;
        }
        const exists = clients.some(c => c.name.toLowerCase() === formData.company.toLowerCase());
        setIsNewClient(!exists);
    }, [formData.company, clients]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // If it's a new client, add them to the database first
        if (isNewClient) {
            const newClient: Client = {
                id: crypto.randomUUID(),
                name: formData.company,
                industry: newClientData.industry,
                status: "active",
                contactPerson: newClientData.contactPerson,
                email: newClientData.email,
                totalRevenue: 0, // Initial revenue could be 0 or derived from deal value? Let's say 0 for now until closed.
                avatar: formData.company.substring(0, 2).toUpperCase(),
                lastActive: new Date().toISOString()
            };
            addClient(newClient);
        }

        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-background w-full max-w-md rounded-xl shadow-2xl border border-border flex flex-col max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-semibold">
                        {deal ? 'Edit Deal' : 'New Deal'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Deal Title</label>
                        <input
                            required
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                            placeholder="e.g. Q4 Audit Service"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Company / Client</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                            <input
                                required
                                list="client-suggestions" // Use datalist for suggestions
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder="Client Company Name"
                            />
                            <datalist id="client-suggestions">
                                {clients.map(c => (
                                    <option key={c.id} value={c.name} />
                                ))}
                            </datalist>
                        </div>
                        {isNewClient && formData.company && (
                            <p className="text-xs text-amber-600 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                New client detected. Please provide details below.
                            </p>
                        )}
                    </div>

                    {/* Conditional New Client Fields */}
                    {isNewClient && (
                        <div className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3 animate-in fade-in slide-in-from-top-2">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-muted-foreground">Contact Person</label>
                                    <div className="relative">
                                        <User className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" />
                                        <input
                                            required
                                            type="text"
                                            value={newClientData.contactPerson}
                                            onChange={(e) => setNewClientData({ ...newClientData, contactPerson: e.target.value })}
                                            className="w-full pl-8 pr-2 py-1.5 text-sm rounded-md bg-background border border-border focus:ring-1 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-medium text-muted-foreground">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" />
                                        <input
                                            required
                                            type="email"
                                            value={newClientData.email}
                                            onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                                            className="w-full pl-8 pr-2 py-1.5 text-sm rounded-md bg-background border border-border focus:ring-1 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground">Industry</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-2.5 top-2 w-3.5 h-3.5 text-muted-foreground" />
                                    <input
                                        required
                                        type="text"
                                        value={newClientData.industry}
                                        onChange={(e) => setNewClientData({ ...newClientData, industry: e.target.value })}
                                        className="w-full pl-8 pr-2 py-1.5 text-sm rounded-md bg-background border border-border focus:ring-1 focus:ring-primary/20 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Value ($)</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Stage</label>
                            <select
                                value={formData.stage}
                                onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                                className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                            >
                                {PIPELINE_STAGES.map(stage => (
                                    <option key={stage.id} value={stage.id}>{stage.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Expected Close</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                <input
                                    required
                                    type="date"
                                    value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg border border-border/50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-sm"
                        >
                            {isNewClient ? 'Save Client & Deal' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
