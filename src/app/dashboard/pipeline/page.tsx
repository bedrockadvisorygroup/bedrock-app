import { PipelineBoard } from "@/components/pipeline/PipelineBoard";
import { Filter, Plus } from "lucide-react";

export default function PipelinePage() {
    return (
        <div className="h-full flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sales Pipeline</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your opportunities and track deal progress.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors text-sm font-medium">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm hover:shadow-primary/25 hover:shadow-lg">
                        <Plus className="w-4 h-4" />
                        New Deal
                    </button>
                </div>
            </div>

            {/* Board */}
            <PipelineBoard />
        </div>
    );
}
