"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PieChart,
    Users,
    Briefcase,
    FileText,
    CheckSquare,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Pipeline", href: "/dashboard/pipeline", icon: PieChart },
    { name: "Clients", href: "/dashboard/clients", icon: Users },
    { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
    { name: "Content", href: "/dashboard/content", icon: FileText },
    { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen sticky top-0 flex flex-col border-r border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-300">
            {/* Brand Logo */}
            <div className="h-16 flex items-center px-6 border-b border-border/40">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                        B
                    </div>
                    <span>Bedrock</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
                            )}
                            <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* Footer / User Settings */}
            <div className="p-4 border-t border-border/40 space-y-1">
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                >
                    <Settings className="w-5 h-5" />
                    Settings
                </Link>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Log Out
                </button>
            </div>
        </aside>
    );
}
