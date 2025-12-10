"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { PIPELINE_STAGES, MOCK_DEALS, Deal } from "./data";
import { DealCard } from "./DealCard";
import { cn } from "@/lib/utils";

export function PipelineBoard() {
    const [deals, setDeals] = useState<Deal[]>(MOCK_DEALS);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on client mount
    useEffect(() => {
        const saved = localStorage.getItem("pipeline-deals");
        if (saved) {
            try {
                setDeals(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load deals", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("pipeline-deals", JSON.stringify(deals));
        }
    }, [deals, isLoaded]);

    const handleAddDeal = (stageId: string) => {
        const newDeal: Deal = {
            id: Math.random().toString(36).substr(2, 9),
            title: "New Potential Deal",
            company: "New Client Ltd",
            value: Math.floor(Math.random() * 50000) + 10000,
            stage: stageId as any,
            owner: "You",
            dueDate: new Date().toISOString().split('T')[0],
            priority: "medium",
        };
        setDeals([...deals, newDeal]);
    };

    const handleDeleteDeal = (id: string) => {
        if (confirm("Are you sure you want to delete this deal?")) {
            setDeals(deals.filter(d => d.id !== id));
        }
    };

    const handleEditDeal = (deal: Deal) => {
        const newTitle = prompt("Edit Deal Title:", deal.title);
        if (newTitle === null) return; // Cancelled

        const newValueStr = prompt("Edit Deal Value ($):", deal.value.toString());
        if (newValueStr === null) return; // Cancelled

        const newValue = parseInt(newValueStr);
        if (isNaN(newValue)) {
            alert("Invalid value entered");
            return;
        }

        setDeals(deals.map(d =>
            d.id === deal.id
                ? { ...d, title: newTitle || d.title, value: newValue }
                : d
        ));
    };

    return (
        <div className="h-[calc(100vh-12rem)] overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max px-1 h-full">
                {PIPELINE_STAGES.map((stage) => {
                    const stageDeals = deals.filter((deal) => deal.stage === stage.id);
                    const totalValue = stageDeals.reduce((acc, deal) => acc + deal.value, 0);

                    return (
                        <div key={stage.id} className="w-80 flex flex-col gap-4">
                            {/* Column Header */}
                            <div className="flex items-center justify-between p-1">
                                <div className="flex items-center gap-2">
                                    <div className={cn("w-2 h-2 rounded-full", stage.color.split(" ")[1].replace("text-", "bg-"))} />
                                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                                        {stage.label}
                                    </h3>
                                    <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                                        {stageDeals.length}
                                    </span>
                                </div>
                                {/* Optional: Column Action */}
                            </div>

                            {/* Column Content */}
                            <div className="flex-1 rounded-2xl bg-muted/30 border border-border/40 p-3 space-y-3 overflow-y-auto custom-scrollbar">
                                {stageDeals.map((deal) => (
                                    <DealCard
                                        key={deal.id}
                                        deal={deal}
                                        onEdit={handleEditDeal}
                                        onDelete={handleDeleteDeal}
                                    />
                                ))}

                                {/* Add New Button */}
                                <button
                                    onClick={() => handleAddDeal(stage.id)}
                                    className="w-full py-2.5 rounded-xl border border-dashed border-border text-muted-foreground text-sm font-medium hover:bg-muted/50 hover:text-foreground hover:border-primary/30 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Add Deal
                                </button>
                            </div>

                            {/* Column Footer Summary */}
                            <div className="px-1">
                                <div className="h-1 w-full bg-muted/50 rounded-full overflow-hidden">
                                    <div className={cn("h-full bg-primary/20", stage.color.split(" ")[1].replace("text-", "bg-"))} style={{ width: '60%' }} />
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-muted-foreground font-medium">
                                    <span>Total Value</span>
                                    <span>${(totalValue / 1000).toFixed(1)}k</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
