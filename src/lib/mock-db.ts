import { Lead, CreateLeadInput, UpdateLeadInput } from "@/types"

// Temporary in-memory store for development/POC
let leads: Lead[] = [
    {
        id: "1",
        name: "Ana Silva",
        email: "ana.silva@example.com",
        phone: "(11) 99999-0000",
        status: "new",
        source: "Website",
        createdAt: new Date(),
        updatedAt: new Date(),
        notes: "Interessada no plano Enterprise",
    },
    {
        id: "2",
        name: "Carlos Souza",
        email: "carlos.souza@example.com",
        phone: "(21) 98888-1111",
        status: "contacted",
        source: "LinkedIn",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        name: "Tech Solutions",
        email: "contato@techsolutions.com.br",
        phone: "(31) 3333-4444",
        status: "proposal",
        source: "Indicação",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

export const LeadService = {
    async getAll(): Promise<Lead[]> {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        return leads
    },

    async create(input: CreateLeadInput): Promise<Lead> {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const newLead: Lead = {
            ...input,
            id: Math.random().toString(36).substring(7),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        leads.push(newLead)
        return newLead
    },

    async update(id: string, input: UpdateLeadInput): Promise<Lead> {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const index = leads.findIndex((l) => l.id === id)
        if (index === -1) throw new Error("Lead not found")

        const updatedLead = { ...leads[index], ...input, updatedAt: new Date() }
        leads[index] = updatedLead
        return updatedLead
    },

    async delete(id: string): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 500))
        leads = leads.filter((l) => l.id !== id)
    }
}
