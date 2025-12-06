"use client";

import {
    MoreHorizontal,
    Search,
    Filter,
    Plus,
    Mail,
    Calendar,
    ArrowUpRight
} from "lucide-react";
import { MOCK_CLIENTS } from "./data";
import { cn } from "@/lib/utils";

export function ClientList() {
    const statusColors = {
        active: "bg-emerald-500/10 text-emerald-500",
        inactive: "bg-slate-500/10 text-slate-500",
        pending: "bg-amber-500/10 text-amber-500",
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
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
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
                        {MOCK_CLIENTS.map((client) => (
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
                                    <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
