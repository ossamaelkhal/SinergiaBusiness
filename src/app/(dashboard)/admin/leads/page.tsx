import { Suspense } from "react"
import { getLeads } from "@/actions/leads"
import { LeadsTable } from "@/app/(dashboard)/dashboard/leads/leads-table"
import { LeadForm } from "@/app/(dashboard)/dashboard/leads/lead-form"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"
import { ProtectedRoute } from "@/components/ProtectedRoute"

export default async function AdminLeadsPage() {
  const { data: leads, error } = await getLeads()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-400" /> Gestão de Leads
              </h2>
              <p className="text-slate-400 mt-1">
                Gerencie seus potenciais clientes e oportunidades de venda.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <LeadForm>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Lead
                </Button>
              </LeadForm>
            </div>
          </div>

          {error ? (
            <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400">
              Erro ao carregar leads: {error}
            </div>
          ) : (
            <Suspense fallback={<div className="text-slate-500">Carregando leads...</div>}>
              <LeadsTable leads={leads || []} />
            </Suspense>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
