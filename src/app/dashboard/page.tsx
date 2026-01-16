import { ArrowUpRight, DollarSign, Users, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Quick Stats
const stats = [
    {
        label: "Total Revenue",
        value: "$45,231.89",
        change: "+20.1% from last month",
        icon: DollarSign,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        label: "Active Clients",
        value: "+2350",
        change: "+180.1% from last month",
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        label: "Active Projects",
        value: "12",
        change: "+19% from last month",
        icon: Briefcase,
        color: "text-violet-500",
        bg: "bg-violet-500/10",
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Welcome back to Bedrock Strategy & Consulting. Here&apos;s what&apos;s happening today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="p-6 rounded-xl border border-border/50 bg-card/50 shadow-sm backdrop-blur-sm hover:translate-y-[-2px] transition-all duration-300"
                    >
                        <div className="flex items-center justify-between pb-2">
                            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                            <div className={cn("p-2 rounded-full", stat.bg)}>
                                <stat.icon className={cn("w-4 h-4", stat.color)} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl font-bold">{stat.value}</span>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <span className="text-emerald-500 flex items-center">
                                    {stat.change}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Content Placeholder */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border border-border/50 bg-card/50 shadow-sm p-6 min-h-[300px]">
                    <h3 className="font-semibold mb-4">Revenue Overview</h3>
                    <div className="h-full flex items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-lg">
                        Chart Placeholder
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border border-border/50 bg-card/50 shadow-sm p-6 min-h-[300px]">
                    <h3 className="font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <div className="text-sm">
                                    <p className="font-medium">New client onboarded</p>
                                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
