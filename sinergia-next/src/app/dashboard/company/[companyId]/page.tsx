'use client';

import React,, { useState, useEffect } from 'react';
// ... (outras importações)
import { PlaybookActivationDialog } from '@/components/playbook-activation-dialog';
import { toast } from 'sonner';

export default function CompanyDetailsPage() {
  // ... (hooks e estados existentes)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleStatusChange = async (leadId: string, status: LeadStatus) => {
    try {
      await updateLeadStatus(leadId, status);
      toast.success(`Status do lead atualizado para "${status}"`);
    } catch (error) {
      toast.error("Erro ao atualizar status.");
    }
  };

  const onStatusSelect = (lead: Lead, status: LeadStatus) => {
    if (status === 'Qualificado') {
      setSelectedLead(lead);
      setDialogOpen(true);
    } else {
      handleStatusChange(lead.id, status);
    }
  };
  
  const handleConfirmActivation = () => {
    if (selectedLead) {
      handleStatusChange(selectedLead.id, 'Qualificado');
      // FUTURO: Chamar a API para iniciar a sequência de emails.
      toast.info(`Sequência de abordagem iniciada para ${selectedLead.name}.`);
    }
    setDialogOpen(false);
    setSelectedLead(null);
  };

  return (
    <>
      {/* ... (JSX existente) */}
      <ul className="space-y-4">
        {leads.map(lead => (
          <li key={lead.id} /* ... */>
            {/* ... */}
            <DropdownMenu>
              {/* ... */}
              <DropdownMenuContent align="end">
                {(Object.keys(statusColors) as LeadStatus[]).map(status => (
                  <DropdownMenuItem key={status} onClick={() => onStatusSelect(lead, status)}>
                    Marcar como {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
      </ul>
      
      <PlaybookActivationDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmActivation}
        leadName={selectedLead?.name || ''}
      />
    </>
  );
}
