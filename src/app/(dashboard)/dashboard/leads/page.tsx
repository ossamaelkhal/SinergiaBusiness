import { Suspense } from "react"
import { getLeads } from "@/actions/leads"
import { LeadsTable } from "./leads-table"
import { LeadForm } from "./lead-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function LeadsPage() {
  const { data: leads, error } = await getLeads()

  if (error) {
    return <div>Erro ao carregar leads: {error}</div>
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">
            Gerencie seus potenciais clientes e oportunidades de venda.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <LeadForm>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Lead
            </Button>
          </LeadForm>
        </div>
      </div>

      <Suspense fallback={<div>Carregando...</div>}>
        <LeadsTable leads={leads || []} />
      </Suspense>
    </div>
  )
}
