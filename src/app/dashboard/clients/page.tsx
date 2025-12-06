import { ClientList } from "@/components/clients/ClientList";

export default function ClientsPage() {
    return (
        <div className="h-full flex flex-col gap-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your client relationships and accounts.
                </p>
            </div>

            {/* Client List */}
            <ClientList />
        </div>
    );
}
