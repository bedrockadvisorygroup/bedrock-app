"use client";

import { useState, useEffect } from "react";
import { Client, MOCK_CLIENTS } from "@/components/clients/data";

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial Load
    useEffect(() => {
        const saved = localStorage.getItem("bedrock-clients");
        if (saved) {
            try {
                setClients(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse clients", e);
                setClients(MOCK_CLIENTS);
            }
        } else {
            setClients(MOCK_CLIENTS);
        }
        setIsLoaded(true);
    }, []);

    // Save on Change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("bedrock-clients", JSON.stringify(clients));
            // Dispatch a custom event so other components can react if needed (basic sync)
            window.dispatchEvent(new Event("clients-updated"));
        }
    }, [clients, isLoaded]);

    const addClient = (client: Client) => {
        setClients(prev => [client, ...prev]);
    };

    const updateClient = (updatedClient: Client) => {
        setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
    };

    const deleteClient = (id: string) => {
        setClients(prev => prev.filter(c => c.id !== id));
    };

    const getClientByName = (name: string) => {
        return clients.find(c => c.name.toLowerCase() === name.toLowerCase());
    };

    return {
        clients,
        addClient,
        updateClient,
        deleteClient,
        getClientByName,
        isLoaded
    };
}
