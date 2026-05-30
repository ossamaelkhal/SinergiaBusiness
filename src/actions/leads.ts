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

export async function submitApplication(payload: SubmitApplicationPayload) {
  try {
    if (!payload || !payload.userData) {
      return { success: false, error: 'Dados do usuário são obrigatórios.' };
    }

    const { userData, trackingData = {} } = payload;
    const { name, email, document, phone, revenue, teamSize, bottleneck, nichoSlug } = userData;

    if (!email || !name) {
      return { success: false, error: 'Nome e E-mail são obrigatórios.' };
    }

    const dbAdmin = admin.firestore();
    
    // 1. DEDUPLICAÇÃO E ID DE DOCUMENTO ANTECIPADO (event_id)
    const leadRef = dbAdmin.collection('leads').doc();
    const eventId = leadRef.id;

    // 2. PARSING DE METADADOS DE REDE E IP (Limpando proxies)
    const ipHeader = headers().get('x-forwarded-for') || '';
    const cleanClientIp = ipHeader.split(',')[0].trim() || headers().get('x-real-ip') || '';
    const cleanUserAgent = headers().get('user-agent') || '';
    
    const cleanFbc = trackingData.fbc || cookies().get('_fbc')?.value || '';
    const cleanFbp = trackingData.fbp || cookies().get('_fbp')?.value || '';

    // 3. FLUXO DE AUTENTICAÇÃO SILENCIOSA & AUTO-LOGIN (Firebase Auth Admin)
    const adminAuth = admin.auth();
    let uid = '';

    try {
      const userRecord = await adminAuth.getUserByEmail(email);
      uid = userRecord.uid;
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // Criar usuário silenciosamente
        const tempPassword = hashSHA256(document || email).slice(0, 15);
        const newUser = await adminAuth.createUser({
          email: email,
          displayName: name,
          password: tempPassword,
        });
        uid = newUser.uid;
      } else {
        console.error("Erro ao buscar ou criar usuário no Firebase Auth:", error);
        throw error;
      }
    }

    // Gerar Custom Token e trocar por ID Token via REST API para criar o Session Cookie
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY;
    if (!apiKey) {
      console.warn("Aviso: NEXT_PUBLIC_FIREBASE_API_KEY ausente. Cookie de autenticação silenciosa não gerado.");
    } else {
      try {
        const customToken = await adminAuth.createCustomToken(uid);
        
        // Troca do Custom Token por ID Token usando o endpoint oficial do Google Identity Toolkit
        const tokenResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: customToken,
            returnSecureToken: true
          })
        });

        if (!tokenResponse.ok) {
          const errData = await tokenResponse.json();
          console.error("Erro na API do Identity Toolkit ao autenticar silenciosamente:", errData);
        } else {
          const { idToken } = await tokenResponse.json();
          const expiresIn = 1000 * 60 * 60 * 24 * 5; // 5 dias
          const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
          
          // Injeção direta nos cabeçalhos de resposta HTTP
          cookies().set('sinergia_session', sessionCookie, {
            maxAge: 5 * 24 * 60 * 60, // 5 dias em segundos
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/'
          });
        }
      } catch (authError) {
        console.error("Falha ao gerar o session cookie na Server Action:", authError);
      }
    }

    // 4. ESTRUTURAÇÃO DO LEAD COM ATRIBUIÇÃO DE IDENTITY
    const leadData = {
      id: eventId,
      companyId: eventId, // ID padrão de empresa associado ao lead
      uid: uid,           // UID unificado de autenticação silenciosa
      name,
      email,
      document: document || '',
      phone,
      revenue: revenue || '',
      teamSize: teamSize || '',
      bottleneck: bottleneck || '',
      nichoSlug: nichoSlug || '',
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
              value: revenueKey === 'enterprise' ? 50000.00 : revenueKey === 'standard' ? 15000.00 : 997.00
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
      const value = revenueKey === 'enterprise' ? 50000 : revenueKey === 'standard' ? 15000 : 997;

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
            timestamp: new Date().toISOString()
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
      leadRef.set(leadData),
      capiPromise(),
      ga4Promise(),
      n8nPromise()
    ]);

    revalidatePath('/admin/leads');

    return { success: true, eventId, docId: eventId };
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
