export interface Subtask {
    id: string;
    title: string;
    isCompleted: boolean;
    dueDate?: string;
}

export interface Project {
    id: string;
    title: string;
    client: string;
    status: "on-track" | "at-risk" | "delayed" | "completed";
    progress: number;
    dueDate: string;
    team: string[];
    budget: number;
    description: string;
    subtasks: Subtask[];
}

export const MOCK_PROJECTS: Project[] = [
    {
        id: "1",
        title: "Q3 Marketing Strategy Overhaul",
        client: "Acme Corp",
        status: "on-track",
        progress: 65,
        dueDate: "2024-06-30",
        team: ["JS", "MR", "AL"],
        budget: 120000,
        description: "Comprehensive review and reconstruction of digital marketing channels.",
        subtasks: [
            { id: "s1", title: "Audit current channels", isCompleted: true },
            { id: "s2", title: "Define new KPIs", isCompleted: true },
            { id: "s3", title: "Draft content calendar", isCompleted: false },
        ]
    },
    {
        id: "2",
        title: "Cloud Infrastructure Migration",
        client: "TechFlow Inc",
        status: "at-risk",
        progress: 40,
        dueDate: "2024-07-15",
        team: ["DK", "PR"],
        budget: 85000,
        description: "Migrating legacy on-prem servers to AWS cloud environment.",
        subtasks: [
            { id: "s4", title: "Set up VPC", isCompleted: true },
            { id: "s5", title: "Migrate database", isCompleted: false },
            { id: "s6", title: "Switch DNS", isCompleted: false },
        ]
    },
    {
        id: "3",
        title: "Employee Training Portal",
        client: "MegaSoft",
        status: "delayed",
        progress: 85,
        dueDate: "2024-05-20",
        team: ["AL", "JS"],
        budget: 45000,
        description: "Internal portal for onboarding and continuous learning modules.",
        subtasks: [
            { id: "s7", title: "Design UI", isCompleted: true },
            { id: "s8", title: "Develop backend API", isCompleted: true },
            { id: "s9", title: "User acceptance testing", isCompleted: false },
        ]
    },
    {
        id: "4",
        title: "Financial Audit Preparation",
        client: "FinType",
        status: "completed",
        progress: 100,
        dueDate: "2024-04-10",
        team: ["MR"],
        budget: 30000,
        description: "Pre-audit documentation and compliance checks.",
        subtasks: [
            { id: "s10", title: "Gather receipts", isCompleted: true },
            { id: "s11", title: "Reconcile accounts", isCompleted: true },
        ]
    },
    {
        id: "5",
        title: "Supply Chain Optimization",
        client: "LogiStick",
        status: "on-track",
        progress: 25,
        dueDate: "2024-08-01",
        team: ["DK", "JS", "PR"],
        budget: 150000,
        description: "Analysis and restructuring of logistics network for efficiency.",
        subtasks: [
            { id: "s12", title: "Analyze current routes", isCompleted: true },
            { id: "s13", title: "Vendor negotiations", isCompleted: false },
        ]
    },
];
