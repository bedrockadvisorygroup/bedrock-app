export type DealStage = "lead" | "qualified" | "proposal" | "negotiation" | "closed";

export interface Deal {
    id: string;
    title: string;
    company: string;
    value: number;
    stage: DealStage;
    owner: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
}

export const PIPELINE_STAGES: { id: DealStage; label: string; color: string }[] = [
    { id: "lead", label: "New Leads", color: "bg-blue-500/10 text-blue-500" },
    { id: "qualified", label: "Qualified", color: "bg-purple-500/10 text-purple-500" },
    { id: "proposal", label: "Proposal Sent", color: "bg-amber-500/10 text-amber-500" },
    { id: "negotiation", label: "Negotiation", color: "bg-orange-500/10 text-orange-500" },
    { id: "closed", label: "Closed Won", color: "bg-emerald-500/10 text-emerald-500" },
];

export const MOCK_DEALS: Deal[] = [
    {
        id: "1",
        title: "Enterprise License Expansion",
        company: "Acme Corp",
        value: 125000,
        stage: "negotiation",
        owner: "Sarah J.",
        dueDate: "2024-04-15",
        priority: "high",
    },
    {
        id: "2",
        title: "Q2 Strategy Consulting",
        company: "TechFlow Inc",
        value: 45000,
        stage: "proposal",
        owner: "Mike R.",
        dueDate: "2024-04-20",
        priority: "medium",
    },
    {
        id: "3",
        title: "Global Training Rollout",
        company: "MegaSoft",
        value: 280000,
        stage: "qualified",
        owner: "Sarah J.",
        dueDate: "2024-05-01",
        priority: "high",
    },
    {
        id: "4",
        title: "Audit & Compliance",
        company: "FinType",
        value: 12000,
        stage: "lead",
        owner: "John D.",
        dueDate: "2024-04-10",
        priority: "low",
    },
    {
        id: "5",
        title: "Annual Retainer Renewal",
        company: "LogiStick",
        value: 85000,
        stage: "negotiation",
        owner: "Mike R.",
        dueDate: "2024-04-12",
        priority: "high",
    },
    {
        id: "6",
        title: "System Integration",
        company: "MediCare Plus",
        value: 150000,
        stage: "lead",
        owner: "Sarah J.",
        dueDate: "2024-06-15",
        priority: "medium",
    },
    {
        id: "7",
        title: "Cloud Migration Strategy",
        company: "DataVantage",
        value: 95000,
        stage: "proposal",
        owner: "John D.",
        dueDate: "2024-05-10",
        priority: "medium",
    },
];
