"use server"

import { revalidatePath } from "next/cache"
import { LeadService } from "@/lib/mock-db"
import { CreateLeadInput, UpdateLeadInput } from "@/types"
import * as admin from 'firebase-admin'
import { headers, cookies } from 'next/headers'
import crypto from 'crypto'

// Inicializar o Firebase Admin SDK com segurança no escopo do servidor
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK em leads.ts:', error);
  }
}

export interface SubmitApplicationInput {
  name: string;
  email: string;
  document: string; // CNPJ/CPF
  phone: string;    // WhatsApp
  revenue?: string;
  teamSize?: string;
  bottleneck?: string;
  nichoSlug?: string;
  referrerId?: string;
  domain?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  fbc?: string;
  fbp?: string;
  client_user_agent?: string;
  client_ip_address?: string;
}

function hashSHA256(val: string | undefined | null): string {
  if (!val) return '';
  return crypto
    .createHash('sha256')
    .update(val.trim().toLowerCase())
    .digest('hex');
}

function getPhoneHashes(rawPhone: string): string[] {
  let clean = rawPhone.replace(/\D/g, '');
  if (!clean) return [];

  // Adiciona o DDI 55 do Brasil se não estiver explícito
  if (!clean.startsWith('55') && clean.length <= 11) {
    clean = '55' + clean;
  }

  const hashes: string[] = [hashSHA256(clean)];

  // Se for celular brasileiro com 13 dígitos iniciados em 55 e possuir o 9 no quinto caractere (ex: 5531998765432)
  if (clean.startsWith('55') && clean.length === 13 && clean[4] === '9') {
    // Remove o 9º dígito (caractere no índice 4) para gerar o hash alternativo (ex: 553198765432)
    const withoutNinth = clean.slice(0, 4) + clean.slice(5);
    hashes.push(hashSHA256(withoutNinth));
  }

  return hashes;
}

export async function submitApplication(data: SubmitApplicationInput) {
  try {
    const { 
      name, email, document, phone, 
      revenue, teamSize, bottleneck, nichoSlug, 
      referrerId, domain,
      utm_source, utm_medium, utm_campaign, utm_content,
      fbc, fbp, client_user_agent, client_ip_address 
    } = data;

    if (!email || !name) {
      return { success: false, error: 'Nome e E-mail são obrigatórios.' };
    }

    const dbAdmin = admin.firestore();
    
    // 1. DEDUPLICAÇÃO E ID DE DOCUMENTO ANTECIPADO (event_id)
    const leadRef = dbAdmin.collection('leads').doc();
    const eventId = leadRef.id;

    // 2. PARSING DE METADADOS DE REDE E IP (Limpando proxies)
    const ipHeader = headers().get('x-forwarded-for') || '';
    const cleanClientIp = client_ip_address || ipHeader.split(',')[0].trim() || headers().get('x-real-ip') || '';
    const cleanUserAgent = client_user_agent || headers().get('user-agent') || '';
    
    const cleanFbc = fbc || cookies().get('_fbc')?.value || '';
    const cleanFbp = fbp || cookies().get('_fbp')?.value || '';

    const leadData = {
      id: eventId,
      name,
      email,
      document: document || '',
      phone,
      revenue: revenue || '',
      teamSize: teamSize || '',
      bottleneck: bottleneck || '',
      nichoSlug: nichoSlug || '',
      domain: domain || '',
      referrerId: referrerId || '',
      status: 'prospect_vip',
      createdAt: new Date().toISOString(),
      tracking: {
        utm_source: utm_source || '',
        utm_medium: utm_medium || '',
        utm_campaign: utm_campaign || '',
        utm_content: utm_content || '',
        fbc: cleanFbc,
        fbp: cleanFbp,
        client_user_agent: cleanUserAgent,
        client_ip_address: cleanClientIp
      }
    };

    // 3. CONVERSIONS API META (CAPI)
    const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;

    const capiPromise = async () => {
      if (!pixelId || !accessToken) {
        console.warn("Aviso: Meta CAPI não executado. Pixel ID ou Access Token ausentes.");
        return { status: 'skipped' };
      }

      const cleanEmail = email.trim().toLowerCase();
      const phoneHashes = getPhoneHashes(phone);

      const capiPayload = {
        data: [
          {
            event_name: 'Lead',
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId, // Deduplicação e Idempotência
            event_source_url: headers().get('referer') || 'https://sinergia.business/apply',
            action_source: 'website',
            user_data: {
              em: [hashSHA256(cleanEmail)],
              ph: phoneHashes,
              client_ip_address: cleanClientIp || undefined,
              client_user_agent: cleanUserAgent || undefined,
              fbc: cleanFbc || undefined,
              fbp: cleanFbp || undefined
            },
            custom_data: {
              currency: 'BRL',
              value: 15000.00
            }
          }
        ]
      };

      try {
        const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(capiPayload)
        });
        const resData = await response.json();
        if (resData.error) {
          console.error("Erro Meta CAPI:", resData.error);
        }
        return resData;
      } catch (err) {
        console.error("Falha ao comunicar com Meta CAPI:", err);
        return { status: 'error', error: err };
      }
    };

    // 4. WEBHOOK TELEMETRIA N8N
    const n8nWebhookUrl = process.env.N8N_APPLY_WEBHOOK_URL;
    
    const n8nPromise = async () => {
      if (!n8nWebhookUrl) {
        console.warn("Aviso: n8n webhook não disparado. N8N_APPLY_WEBHOOK_URL ausente.");
        return { status: 'skipped' };
      }

      try {
        const response = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'process_highticket_application',
            lead: leadData,
            timestamp: new Date().toISOString()
          })
        });
        return { status: 'success', ok: response.ok };
      } catch (err) {
        console.error("Falha ao enviar webhook n8n:", err);
        return { status: 'error', error: err };
      }
    };

    // 5. PARALELISMO SEGURO: PROMISE.ALL PARA EVITAR CONGELAMENTO EM AMBIENTE SERVERLESS
    await Promise.all([
      leadRef.set(leadData),
      capiPromise(),
      n8nPromise()
    ]);

    revalidatePath('/admin/leads');

    return { success: true, docId: eventId };
  } catch (error) {
    console.error("Erro interno na Server Action submitApplication:", error);
    return { success: false, error: 'Erro interno do servidor ao processar aplicação.' };
  }
}

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
