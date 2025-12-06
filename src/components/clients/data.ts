export interface Client {
    id: string;
    name: string;
    industry: string;
    status: "active" | "inactive" | "pending";
    contactPerson: string;
    email: string;
    totalRevenue: number;
    lastActive: string;
    avatar: string;
}

export const MOCK_CLIENTS: Client[] = [
    {
        id: "1",
        name: "Acme Corp",
        industry: "Manufacturing",
        status: "active",
        contactPerson: "Alice Johnson",
        email: "alice@acme.com",
        totalRevenue: 250000,
        lastActive: "2024-04-01",
        avatar: "AC",
    },
    {
        id: "2",
        name: "TechFlow Inc",
        industry: "Technology",
        status: "active",
        contactPerson: "Bob Smith",
        email: "bob@techflow.com",
        totalRevenue: 180000,
        lastActive: "2024-03-28",
        avatar: "TF",
    },
    {
        id: "3",
        name: "MegaSoft",
        industry: "Software",
        status: "pending",
        contactPerson: "Charlie Brown",
        email: "charlie@megasoft.com",
        totalRevenue: 0,
        lastActive: "2024-04-02",
        avatar: "MS",
    },
    {
        id: "4",
        name: "FinType",
        industry: "Finance",
        status: "inactive",
        contactPerson: "Diana Prince",
        email: "diana@fintype.com",
        totalRevenue: 50000,
        lastActive: "2023-12-15",
        avatar: "FT",
    },
    {
        id: "5",
        name: "LogiStick",
        industry: "Logistics",
        status: "active",
        contactPerson: "Evan Wright",
        email: "evan@logistick.com",
        totalRevenue: 75000,
        lastActive: "2024-04-03",
        avatar: "LS",
    },
];
