export interface Lead {
    id: string
    name: string
    email: string
    phone: string
    status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost"
    source: string
    createdAt: Date
    updatedAt: Date
    notes?: string
}

export type CreateLeadInput = Omit<Lead, "id" | "createdAt" | "updatedAt">
export type UpdateLeadInput = Partial<CreateLeadInput>
