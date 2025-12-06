import { FileText, FileSpreadsheet, Presentation, LayoutTemplate } from "lucide-react";

export type FileType = "document" | "spreadsheet" | "presentation" | "template";

export interface Resource {
    id: string;
    title: string;
    type: FileType;
    category: string;
    updatedAt: string;
    author: string;
    size: string;
}

export const MOCK_RESOURCES: Resource[] = [
    {
        id: "1",
        title: "Project Proposal Template",
        type: "template",
        category: "Sales",
        updatedAt: "2024-04-05",
        author: "System",
        size: "2.4 MB",
    },
    {
        id: "2",
        title: "Q1 Financial Review",
        type: "spreadsheet",
        category: "Finance",
        updatedAt: "2024-04-01",
        author: "Mike R.",
        size: "850 KB",
    },
    {
        id: "3",
        title: "Brand Guidelines v2.0",
        type: "document",
        category: "Marketing",
        updatedAt: "2024-03-20",
        author: "Sarah J.",
        size: "15 MB",
    },
    {
        id: "4",
        title: "Client Onboarding Deck",
        type: "presentation",
        category: "Client Success",
        updatedAt: "2024-03-15",
        author: "Alice J.",
        size: "12 MB",
    },
    {
        id: "5",
        title: "SLA Agreement Draft",
        type: "document",
        category: "Legal",
        updatedAt: "2024-04-08",
        author: "Legal Team",
        size: "1.2 MB",
    },
    {
        id: "6",
        title: "Market Analysis Report",
        type: "presentation",
        category: "Strategy",
        updatedAt: "2024-04-02",
        author: "John D.",
        size: "5.6 MB",
    },
];

export const FILE_ICONS = {
    document: { icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    spreadsheet: { icon: FileSpreadsheet, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    presentation: { icon: Presentation, color: "text-orange-500", bg: "bg-orange-500/10" },
    template: { icon: LayoutTemplate, color: "text-purple-500", bg: "bg-purple-500/10" },
};
