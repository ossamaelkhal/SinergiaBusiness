"use server"

import { revalidatePath } from "next/cache"
import { LeadService } from "@/lib/mock-db"
import { CreateLeadInput, UpdateLeadInput } from "@/types"

export async function getLeads() {
    try {
        const leads = await LeadService.getAll()
        return { success: true, data: leads }
    } catch (error) {
        return { success: false, error: "Falha ao buscar leads" }
    }
}

export async function createLead(data: CreateLeadInput) {
    try {
        const newLead = await LeadService.create(data)
        revalidatePath("/dashboard/leads")
        return { success: true, data: newLead }
    } catch (error) {
        return { success: false, error: "Falha ao criar lead" }
    }
}

export async function updateLead(id: string, data: UpdateLeadInput) {
    try {
        const updatedLead = await LeadService.update(id, data)
        revalidatePath("/dashboard/leads")
        return { success: true, data: updatedLead }
    } catch (error) {
        return { success: false, error: "Falha ao atualizar lead" }
    }
}

export async function deleteLead(id: string) {
    try {
        await LeadService.delete(id)
        revalidatePath("/dashboard/leads")
        return { success: true }
    } catch (error) {
        return { success: false, error: "Falha ao excluir lead" }
    }
}
