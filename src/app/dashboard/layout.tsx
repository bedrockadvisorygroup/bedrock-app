import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background font-sans text-foreground">
            {/* Sidebar - Fixed/Sticky */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen">
                <Header />

                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
