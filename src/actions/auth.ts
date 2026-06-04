"use server"

import * as admin from 'firebase-admin'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

// Inicializar o Firebase Admin SDK com segurança no escopo do servidor
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK em auth.ts:', error);
  }
}

/**
 * Server Action para gerar e registrar código de login mágico temporário
 * Proteção contra enumeração de e-mails ativada: e-mails inexistentes retornam sucesso fictício.
 */
export async function requestMagicCodeAction(email: string) {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Por favor, insira um e-mail válido.' };
    }

    const adminAuth = admin.auth();
    let uid = '';
    let emailExists = true;

    // 1. Verificar se o e-mail possui um usuário correspondente no Firebase Auth
    try {
      const userRecord = await adminAuth.getUserByEmail(email);
      uid = userRecord.uid;
    } catch (authError: any) {
      if (authError.code === 'auth/user-not-found') {
        // Proteção de enumeração: fingimos sucesso para avançar o front-end
        emailExists = false;
      } else {
        console.error('Erro ao buscar usuário por email:', authError);
        return { success: false, error: 'Erro de comunicação ao verificar conta.' };
      }
    }

    // Se o e-mail de fato não existe no Firebase Auth, não salvamos no banco nem disparamos webhook,
    // mas retornamos sucesso para o front-end avançar silenciosamente.
    if (!emailExists) {
      return { success: true };
    }

    // 2. Gerar código de acesso de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // Expiração em 10 minutos

    const dbAdmin = admin.firestore();

    // 3. Buscar ou criar o documento de lead do cliente
    const leadsSnap = await dbAdmin.collection('leads')
      .where('email', '==', email)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    let leadRef;
    let phone = '';
    
    if (leadsSnap.empty) {
      // Usuário existe no Auth mas não possui lead persistido ainda, cria documento mínimo
      leadRef = dbAdmin.collection('leads').doc();
      await leadRef.set({
        id: leadRef.id,
        email,
        name: email.split('@')[0],
        status: 'prospect_vip',
        createdAt: new Date().toISOString(),
        auth_code: code,
        auth_code_expiresAt: expiresAt
      });
    } else {
      const doc = leadsSnap.docs[0];
      leadRef = doc.ref;
      phone = doc.data().phone || '';
      await leadRef.update({
        auth_code: code,
        auth_code_expiresAt: expiresAt
      });
    }

    // 4. Disparar notificação assíncrona ao webhook do n8n para enviar o WhatsApp/E-mail
    const n8nWebhookUrl = process.env.N8N_APPLY_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'request_magic_code',
          email,
          phone,
          code,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error('Erro ao notificar webhook do Magic Code para n8n:', err));
    }

    return { success: true };
  } catch (error: any) {
    console.error('Erro interno em requestMagicCodeAction:', error);
    return { success: false, error: error.message || 'Erro interno no servidor ao solicitar código.' };
  }
}

/**
 * Server Action para validar o código mágico digitado e gerar o cookie seguro de sessão
 */
export async function verifyMagicCodeAction(email: string, code: string) {
  try {
    if (!email || !code) {
      return { success: false, error: 'E-mail e código de segurança são obrigatórios.' };
    }

    const dbAdmin = admin.firestore();

    // 1. Buscar lead associado ao e-mail
    const leadsSnap = await dbAdmin.collection('leads')
      .where('email', '==', email)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (leadsSnap.empty) {
      return { success: false, error: 'Código de acesso incorreto ou expirado.' };
    }

    const doc = leadsSnap.docs[0];
    const data = doc.data();
    const leadRef = doc.ref;

    // 2. Validar código e timestamp de expiração
    if (!data.auth_code || data.auth_code !== code) {
      return { success: false, error: 'Código de acesso incorreto ou expirado.' };
    }

    const now = new Date().toISOString();
    if (!data.auth_code_expiresAt || now > data.auth_code_expiresAt) {
      return { success: false, error: 'Código de acesso incorreto ou expirado.' };
    }

    // 3. Sucesso: Limpar campos de código de uso único do banco de dados
    await leadRef.update({
      auth_code: admin.firestore.FieldValue.delete(),
      auth_code_expiresAt: admin.firestore.FieldValue.delete()
    });

    // 4. Obter UID do Firebase Auth
    const adminAuth = admin.auth();
    let uid = '';
    try {
      const userRecord = await adminAuth.getUserByEmail(email);
      uid = userRecord.uid;
    } catch (authError) {
      console.error('Erro ao obter UID do usuário na validação do código:', authError);
      return { success: false, error: 'Erro ao autenticar sessão do usuário.' };
    }

    // 5. Trocar Custom Token por ID Token via REST API do Google Identity Toolkit
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY;
    if (!apiKey) {
      return { success: false, error: 'Chave de API do Firebase ausente no servidor.' };
    }

    const customToken = await adminAuth.createCustomToken(uid);
    
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
      console.error('Identity Toolkit REST Error:', errData);
      return { success: false, error: 'Falha ao trocar o token de segurança.' };
    }

    const { idToken } = await tokenResponse.json();

    // 6. Criar e injetar o Session Cookie válido por 5 dias no cabeçalho HTTP
    const expiresIn = 1000 * 60 * 60 * 24 * 5; // 5 dias
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    
    cookies().set('sinergia_session', sessionCookie, {
      maxAge: 5 * 24 * 60 * 60, // 5 dias em segundos
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/'
    });

    // 7. Decidir destino operacional baseado no status do lead
    const status = data.status || 'prospect_vip';
    const redirectUrl = (status === 'active_client' || status === 'CLOSED') ? '/app/client' : '/app/discover';

    return { success: true, redirectUrl };
  } catch (error: any) {
    console.error('Erro interno em verifyMagicCodeAction:', error);
    return { success: false, error: error.message || 'Erro ao validar código mágico.' };
  }
}
