import { ResourceCard } from "@/components/content/ResourceCard";
import { MOCK_RESOURCES } from "@/components/content/data";
import { Upload, Filter, FolderPlus } from "lucide-react";

export default function ContentPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage templates, documents, and internal resources.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors text-sm font-medium">
                        <FolderPlus className="w-4 h-4" />
                        New Folder
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm hover:shadow-primary/25 hover:shadow-lg">
                        <Upload className="w-4 h-4" />
                        Upload
                    </button>
                </div>
            </div>

            {/* Quick Categories (Optional) */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {["All Files", "Templates", "Sales", "Marketing", "Finance", "Legal"].map((cat, i) => (
                    <button
                        key={cat}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors whitespace-nowrap ${i === 0 ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-background border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Resources List */}
            <div className="grid gap-4 md:grid-cols-2">
                {MOCK_RESOURCES.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
        </div>
    );
}
