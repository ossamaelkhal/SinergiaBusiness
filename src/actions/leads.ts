"use server"

import { revalidatePath } from "next/cache"
import { LeadService } from "@/lib/mock-db"
import { CreateLeadInput, UpdateLeadInput } from "@/types"
import * as admin from 'firebase-admin'
import { headers, cookies } from 'next/headers'
import crypto from 'crypto'
import * as fbHelper from '@/lib/firebase-admin-helper'

export interface SubmitApplicationPayload {
  userData: {
    name: string;
    email: string;
    document: string; // CNPJ/CPF
    phone: string;    // WhatsApp
    revenue?: string;
    teamSize?: string;
    bottleneck?: string;
    nichoSlug?: string;
    auditedLoss?: number;
  };
  trackingData: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    fbc?: string;
    fbp?: string;
    ga_client_id?: string;
    gclid?: string;
    sinergia_affiliate_id?: string;
  };
}

function hashSHA256(val: string | undefined | null): string {
  if (!val) return '';
  return crypto
    .createHash('sha256')
    .update(val.trim().toLowerCase())
    .digest('hex');
}

function getPhoneHashes(rawPhone: string): string[] {
  let clean = rawPhone.replace(/\D/g, ''); // Apenas dígitos
  if (!clean) return [];

  // Se o telefone foi enviado com DDD mas sem o DDI (ex: 11988887777 - 11 dígitos)
  // Ou qualquer formato brasileiro sem DDI, adicionamos 55
  if (!clean.startsWith('55') && (clean.length === 10 || clean.length === 11)) {
    clean = '55' + clean;
  }

  const hashes: string[] = [];

  // Caso 1: Se tem 13 dígitos e começa com 55 e tem o 9 na posição correta (55 + DDD + 9 + 8 dígitos)
  if (clean.startsWith('55') && clean.length === 13 && clean[4] === '9') {
    // Hash do número completo (com o 9º dígito)
    hashes.push(hashSHA256(clean));
    // Hash do número sem o 9º dígito (remove o caractere no índice 4)
    const withoutNinth = clean.slice(0, 4) + clean.slice(5);
    hashes.push(hashSHA256(withoutNinth));
  } else if (clean.startsWith('55') && clean.length === 12) {
    // Se tem 12 dígitos, supõe-se que já está sem o 9º dígito (55 + DDD + 8 dígitos)
    hashes.push(hashSHA256(clean));
    // Adiciona o 9º dígito (insere '9' no índice 4)
    const withNinth = clean.slice(0, 4) + '9' + clean.slice(4);
    hashes.push(hashSHA256(withNinth));
  } else {
    // Caso padrão
    hashes.push(hashSHA256(clean));
  }

  // Garantir hashes únicos
  return Array.from(new Set(hashes));
}

const getSetupPrice = (auditedLoss?: number, nichoSlug?: string, revenue?: string): number => {
  const resolvedLoss = (() => {
    if (auditedLoss && auditedLoss > 0) {
      return auditedLoss;
    }
    const baselines: Record<string, number> = {
      'faturamento-saude-bemestar': 12400,
      'commerce-omnichannel-vendas': 18900,
      'operacoes-urgencia-logistica': 22500,
      'bpo-financeiro-credito-tem': 28200,
      'servicos-tecnicos-comerciais': 14700,
    };
    const base = baselines[nichoSlug || ''] || 16500;
    
    // Multiplicador por Receita
    const rev = (revenue || '').toLowerCase();
    let multiplier = 1.0;
    if (rev === 'enterprise' || rev.includes('enterprise') || rev.includes('acima') || rev.includes('2m') || rev.includes('2 milhões')) {
      multiplier = 2.5;
    } else if (rev === 'poc' || rev.includes('poc') || rev.includes('até 100k') || rev.includes('inicial')) {
      multiplier = 0.5;
    }
    return base * multiplier;
  })();

  const setupPrice = Math.max(1500, (resolvedLoss * 12) * 0.10);
  return setupPrice;
};

export async function submitApplication(payload: SubmitApplicationPayload) {
  try {
    if (!payload || !payload.userData) {
      return { success: false, error: 'Dados do usuário são obrigatórios.' };
    }

    const { userData, trackingData = {} } = payload;
    const { name, email, document, phone, revenue, teamSize, bottleneck, nichoSlug, auditedLoss } = userData;

    if (!email || !name) {
      return { success: false, error: 'Nome e E-mail são obrigatórios.' };
    }

    // 2. PARSING DE METADADOS DE REDE E IP (Limpando proxies)
    const ipHeader = headers().get('x-forwarded-for') || '';
    const cleanClientIp = ipHeader.split(',')[0].trim() || headers().get('x-real-ip') || '';
    const cleanUserAgent = headers().get('user-agent') || '';
    
    const cleanFbc = trackingData.fbc || cookies().get('_fbc')?.value || '';
    const cleanFbp = trackingData.fbp || cookies().get('_fbp')?.value || '';
    const cleanAffiliateId = trackingData.sinergia_affiliate_id || cookies().get('sinergia_affiliate_id')?.value || '';

    // Chamando o helper que abstrai Firestore e Auth com fallback mock local
    const helperResult = await fbHelper.submitLeadApplication(
      userData,
      {
        utm_source: trackingData.utm_source || '',
        utm_medium: trackingData.utm_medium || '',
        utm_campaign: trackingData.utm_campaign || '',
        utm_content: trackingData.utm_content || '',
        fbc: cleanFbc,
        fbp: cleanFbp,
        ga_client_id: trackingData.ga_client_id || '',
        gclid: trackingData.gclid || '',
        sinergia_affiliate_id: cleanAffiliateId
      },
      cleanClientIp,
      cleanUserAgent
    );

    if (!helperResult.success) {
      return { success: false, error: helperResult.error || 'Erro ao processar aplicação.' };
    }

    const eventId = helperResult.eventId;
    const uid = helperResult.uid;

    // Injeção direta nos cabeçalhos de resposta HTTP
    cookies().set('sinergia_session', helperResult.sessionCookie, {
      maxAge: 5 * 24 * 60 * 60, // 5 dias em segundos
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/'
    });

    // Construção do leadData estruturado para envio de telemetria externa
    const leadData = {
      id: eventId,
      companyId: eventId, // ID padrão de empresa associado ao lead
      uid: uid,           // UID unificado
      name,
      email,
      document: document || '',
      phone,
      revenue: revenue || '',
      teamSize: teamSize || '',
      bottleneck: bottleneck || '',
      nichoSlug: nichoSlug || '',
      auditedLoss: auditedLoss || 0,
      partnerId: cleanAffiliateId || null,
      status: 'prospect_vip',
      createdAt: new Date().toISOString(),
      tracking: {
        utm_source: trackingData.utm_source || '',
        utm_medium: trackingData.utm_medium || '',
        utm_campaign: trackingData.utm_campaign || '',
        utm_content: trackingData.utm_content || '',
        fbc: cleanFbc,
        fbp: cleanFbp,
        ga_client_id: trackingData.ga_client_id || '',
        gclid: trackingData.gclid || '',
        sinergia_affiliate_id: cleanAffiliateId,
        client_user_agent: cleanUserAgent,
        client_ip_address: cleanClientIp
      }
    };

    const revenueKey = (() => {
      if (!revenue) return 'poc';
      const rev = revenue.toLowerCase();
      if (rev === 'enterprise' || rev.includes('acima') || rev.includes('2 milhões') || rev.includes('2m')) {
        return 'enterprise';
      }
      if (rev === 'standard' || rev.includes('500 mil') || rev.includes('100 mil a')) {
        return 'standard';
      }
      return 'poc';
    })();

    // 4.1 Triagem de Alto Ticket e Engenharia Comercial (Red Alert Engine)
    const isHighTicket = revenueKey === 'enterprise' || revenueKey === 'standard';
    const contractValue = getSetupPrice(auditedLoss, nichoSlug, revenue);

    // Formatação do telefone e link de clique-e-converse para o comercial
    const cleanPhoneNumbers = phone.replace(/\D/g, '');
    const cleanWithDdi = (cleanPhoneNumbers.length === 10 || cleanPhoneNumbers.length === 11) && !cleanPhoneNumbers.startsWith('55')
      ? '55' + cleanPhoneNumbers
      : cleanPhoneNumbers;
    const cliqueToChatUrl = `https://wa.me/${cleanWithDdi}`;

    // Motor de script cognitivo para primeira abordagem (Hormozi style)
    let suggestedFirstMessage = '';
    if (nichoSlug === 'faturamento-saude-bemestar') {
      suggestedFirstMessage = "Olá {name}, aqui é o Vinicius da SinergIA. Vi que você acabou de usar o simulador e mapear o Guardião da Agenda para estancar o no-show e as cadeiras vazias na sua clínica. Conseguiu compilar os playbooks operacionais ou ficou com alguma dúvida sobre como rodar o robô de confirmações na sua recepção?";
    } else if (nichoSlug === 'commerce-omnichannel-vendas') {
      suggestedFirstMessage = "Olá {name}, aqui é o Vinicius da SinergIA. Acabei de ver os fluxos do Vendedor de Pista Digital que você montou no nosso simulador de Varejo para capturar vendas no Direct e WhatsApp 24/7. Você quer entender como plugamos essa infraestrutura no seu estoque e no seu ERP para automatizar suas cotações?";
    } else {
      suggestedFirstMessage = "Olá {name}, aqui é o Vinicius da SinergIA. Identifiquei os gargalos operacionais e o vazamento financeiro que você acabou de mapear no nosso Labs Hub. Conseguiu entender como nossos funcionários digitais eliminam esses erros manuais ou prefere que eu te mostre o deploy da infraestrutura na prática?";
    }

    // 5. CONVERSIONS API META (CAPI)
    const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_FB_PIXEL_ID || process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
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
              value: contractValue
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

    // 6. GOOGLE ANALYTICS 4 MEASUREMENT PROTOCOL
    const ga4ApiSecret = process.env.GA4_API_SECRET;
    const ga4MeasurementId = process.env.GA4_MEASUREMENT_ID;

    const ga4Promise = async () => {
      if (!ga4ApiSecret || !ga4MeasurementId) {
        console.warn("Aviso: GA4 Measurement Protocol não executado. API Secret ou Measurement ID ausentes.");
        return { status: 'skipped' };
      }

      const gaClientId = trackingData.ga_client_id || 'ga_fallback_' + eventId;
      const value = contractValue;

      const ga4Payload = {
        client_id: gaClientId,
        events: [{
          name: "generate_lead",
          params: {
            currency: "BRL",
            value: value,
            transaction_id: eventId,
            nicho: nichoSlug || ''
          }
        }]
      };

      try {
        const response = await fetch(`https://www.google-analytics.com/mp/collect?api_secret=${ga4ApiSecret}&measurement_id=${ga4MeasurementId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ga4Payload)
        });
        return { status: 'success', ok: response.ok };
      } catch (err) {
        console.error("Falha ao enviar evento GA4:", err);
        return { status: 'error', error: err };
      }
    };

    // 7. WEBHOOK TELEMETRIA N8N
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
            timestamp: new Date().toISOString(),
            sales_intelligence: {
              priority_alert: isHighTicket,
              commercial_routing: isHighTicket ? "RED_ALERT_IMEDIATO" : "FILA_PADRAO",
              contract_value: contractValue,
              clique_to_chat_url: cliqueToChatUrl,
              suggested_first_message: suggestedFirstMessage.replace('{name}', name)
            }
          })
        });
        return { status: 'success', ok: response.ok };
      } catch (err) {
        console.error("Falha ao enviar webhook n8n:", err);
        return { status: 'error', error: err };
      }
    };

    // 8. PARALELISMO SEGURO: PROMISE.ALL PARA EVITAR CONGELAMENTO EM AMBIENTE SERVERLESS
    await Promise.all([
      capiPromise(),
      ga4Promise(),
      n8nPromise()
    ]);

    revalidatePath('/admin/leads');

    return { success: true, eventId, docId: eventId };
  } catch (error: any) {
    console.error("Erro interno na Server Action submitApplication:", error);
    return { success: false, error: `Erro ao processar aplicação: ${error.message || error}` };
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

export async function saveLeadPreferences(leadId: string, preferences: { 
  niche: string; 
  tone: string; 
  objective: string;
  frictionIndex?: number;
  blueprintId?: string;
  malhas?: string[];
  selectedTools?: string[];
  stackLevel?: number;
  archetype?: 'Oprimida por Burocracia' | 'Desconectada do Cliente' | 'Visionária Cautelosa';
}) {
  try {
    return await fbHelper.saveLeadPreferences(leadId, preferences);
  } catch (error: any) {
    console.error("Erro ao salvar preferências do lead:", error);
    return { success: false, error: error.message || "Falha ao atualizar preferências do lead" };
  }
}

export async function getActiveLeadSession() {
  try {
    const sessionCookie = cookies().get('sinergia_session')?.value;
    if (!sessionCookie) {
      return { success: false, error: 'Sem sessão ativa' };
    }
    const lead = await fbHelper.getLeadFromSession(sessionCookie);
    if (!lead) {
      return { success: false, error: 'Lead não encontrado' };
    }
    return { success: true, lead };
  } catch (error: any) {
    console.error("Erro em getActiveLeadSession:", error);
    return { success: false, error: error.message || String(error) };
  }
}



/**
 * Auxiliar para verificar e validar a sessão do usuário via cookies no servidor
 */
async function verifyUserSession(): Promise<{ uid: string; email: string } | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('sinergia_session')?.value;
  if (!sessionCookie) {
    return null;
  }

  try {
    let uid: string | null = null;
    let email: string | null = null;
    
    if (sessionCookie.startsWith('mock-session-cookie-fallback-')) {
      const token = sessionCookie.replace('mock-session-cookie-fallback-', '');
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        uid = decoded.uid;
        email = decoded.email || null;
      } catch {
        if (token.startsWith('mock-uid-')) {
          uid = token;
          email = 'mock-user@example.com';
        }
      }
    } else if (sessionCookie.startsWith('mock-session-cookie-')) {
      const token = sessionCookie.replace('mock-session-cookie-', '');
      if (token === 'mock-token') {
        uid = 'mock-uid-123456';
        email = 'mock-admin@sinergia.business';
      } else if (token.startsWith('mock-uid-')) {
        uid = token;
        email = 'mock-user@example.com';
      }
    } else {
      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
      uid = decodedClaims.uid;
      email = decodedClaims.email || null;
    }

    if (!uid || !email) return null;
    return { uid, email };
  } catch (error) {
    console.error('Erro ao decodificar sessão do usuário:', error);
    if (process.env.NODE_ENV !== 'production' && sessionCookie.includes('mock')) {
      return { uid: 'mock-uid-123456', email: 'mock-admin@sinergia.business' };
    }
    return null;
  }
}

/**
 * Server Action para salvar credenciais e chaves de integração do cliente ativo
 */
export async function saveClientCredentialsAction(leadId: string, credentials: { whatsapp_api_url: string; whatsapp_access_token: string; crm_api_token: string }) {
  try {
    const session = await verifyUserSession();
    if (!session) {
      return { success: false, error: 'Sessão expirada ou não autenticada.' };
    }

    const dbAdmin = admin.firestore();
    const leadRef = dbAdmin.collection('leads').doc(leadId);
    const leadSnap = await leadRef.get();

    if (!leadSnap.exists) {
      return { success: false, error: 'Lead não encontrado.' };
    }

    const leadData = leadSnap.data();
    const isDevMock = session.uid === 'mock-uid-123456' || session.email === 'mock-admin@sinergia.business';

    if (!isDevMock && leadData?.email !== session.email) {
      return { success: false, error: 'Acesso negado. Você não tem permissão para alterar este lead.' };
    }

    await leadRef.update({
      integration_keys: {
        whatsapp_api_url: credentials.whatsapp_api_url || '',
        whatsapp_access_token: credentials.whatsapp_access_token || '',
        crm_api_token: credentials.crm_api_token || '',
        updatedAt: new Date().toISOString()
      }
    });

    revalidatePath('/app/client/settings');
    revalidatePath('/app/client');
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao salvar credenciais do cliente:', error);
    return { success: false, error: error.message || 'Erro interno ao processar credenciais.' };
  }
}

/**
 * Server Action para salvar a base de conhecimento textual e os metadados dos arquivos de contexto
 */
export async function saveClientContextAction(leadId: string, rawTextContext: string, filesMetadata: any[]) {
  try {
    const session = await verifyUserSession();
    if (!session) {
      return { success: false, error: 'Sessão expirada ou não autenticada.' };
    }

    const dbAdmin = admin.firestore();
    const leadRef = dbAdmin.collection('leads').doc(leadId);
    const leadSnap = await leadRef.get();

    if (!leadSnap.exists) {
      return { success: false, error: 'Lead não encontrado.' };
    }

    const leadData = leadSnap.data();
    const isDevMock = session.uid === 'mock-uid-123456' || session.email === 'mock-admin@sinergia.business';

    if (!isDevMock && leadData?.email !== session.email) {
      return { success: false, error: 'Acesso negado. Você não tem permissão para alterar este lead.' };
    }

    await leadRef.update({
      raw_text_context: rawTextContext || '',
      knowledge_base: filesMetadata || [],
      updatedAt: new Date().toISOString()
    });

    revalidatePath('/app/client/settings');
    revalidatePath('/app/client');
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao salvar contexto do cliente:', error);
    return { success: false, error: error.message || 'Erro interno ao processar base de conhecimento.' };
  }
}
