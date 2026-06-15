"use server"

import crypto from 'crypto';
import { estimateCompanyFriction } from '@/lib/frictionEngine';
import { saveSandboxLead } from '@/lib/firebase-admin-helper';

export interface CompanyDataInput {
  name: string;
  email: string;
  phone: string;
  nicheSlug: string;
  employeeCount: number;
  ownerName: string;
}

export async function triggerOutboundSandbox(companyData: CompanyDataInput) {
  try {
    const { name, email, phone, nicheSlug, employeeCount, ownerName } = companyData;
    
    if (!name || !email || !nicheSlug || !employeeCount) {
      throw new Error("Dados obrigatórios ausentes para inicialização do Sandbox.");
    }

    // Calcular heurísticas de atrito usando o frictionEngine
    const report = estimateCompanyFriction(nicheSlug, employeeCount);

    // Gerar um hash único SHA-256 como ID da empresa (companyId)
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim().toLowerCase();
    const rawString = `${normalizedEmail}:${normalizedName}`;
    const companyId = crypto
      .createHash('sha256')
      .update(rawString)
      .digest('hex');

    // Documento do lead de sandbox
    const sandboxLeadDoc = {
      companyId,
      name,
      email,
      phone,
      nicheSlug,
      employeeCount,
      ownerName,
      status: 'prospect_proativo',
      archetype: 'Oprimida por Burocracia',
      imprisonedIntellectHours: report.imprisonedIntellectHours,
      yearlyRevenueLeak: report.yearlyRevenueLeak,
      nicheTitle: report.nicheTitle,
      createdAt: new Date().toISOString()
    };

    // Salvar no Firestore / Mock
    await saveSandboxLead(companyId, sandboxLeadDoc);

    return {
      success: true,
      companyId,
      ...report
    };
  } catch (error: any) {
    console.error("Erro no triggerOutboundSandbox action:", error);
    return {
      success: false,
      error: error.message || String(error)
    };
  }
}
