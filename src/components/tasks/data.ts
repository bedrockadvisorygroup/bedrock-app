export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
    id: string;
    title: string;
    assignee: string;
    dueDate: string;
    priority: TaskPriority;
    status: TaskStatus;
    project: string;
}

export const MOCK_TASKS: Task[] = [
    {
        id: "1",
        title: "Draft Q3 Marketing Proposal",
        assignee: "Sarah J.",
        dueDate: "2024-04-12",
        priority: "high",
        status: "in-progress",
        project: "Q3 Marketing Strategy",
    },
    {
        id: "2",
        title: "Review Financial Statements",
        assignee: "Mike R.",
        dueDate: "2024-04-10",
        priority: "urgent",
        status: "todo",
        project: "Financial Audit",
    },
    {
        id: "3",
        title: "Update Client Contact List",
        assignee: "Alice J.",
        dueDate: "2024-04-15",
        priority: "low",
        status: "done",
        project: "Internal Ops",
    },
    {
        id: "4",
        title: "Prepare Slide Deck for Monthly All-Hands",
        assignee: "John D.",
        dueDate: "2024-04-20",
        priority: "medium",
        status: "todo",
        project: "Internal Ops",
    },
    {
        id: "5",
        title: "Conduct User Interviews",
        assignee: "Sarah J.",
        dueDate: "2024-05-01",
        priority: "high",
        status: "todo",
        project: "User Research",
    },
];
