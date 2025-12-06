"use client";

import { Bell, Search, User } from "lucide-react";

export function Header() {
    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-10">
            {/* Search / Breadcrumbs */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-9 pl-9 pr-4 rounded-full bg-muted/50 border-none text-sm focus:ring-2 focus:ring-primary/20 transition-all w-64"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
                </button>

                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center text-white font-medium text-xs cursor-pointer ring-2 ring-background shadow-md">
                    JD
                </div>
            </div>
        </header>
    );
}
