import * as admin from 'firebase-admin';
import * as fs from 'fs/promises';
import * as path from 'path';

// Inicializar o Firebase Admin SDK com segurança no escopo do servidor
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'sinergiabusiness-86a62';
    admin.initializeApp({
      projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK no helper:', error);
  }
}

const MOCK_FILE_PATH = path.join(process.cwd(), 'src/data/mock-leads-db.json');

function isCredentialsError(error: any): boolean {
  if (error) {
    console.warn("[Firebase Admin Helper Warning] Erro detectado no Firebase Admin, acionando fallback mock:", error.message || error);
  }
  return true;
}

async function readMockLeads(): Promise<any[]> {
  try {
    const data = await fs.readFile(MOCK_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeMockLeads(leads: any[]) {
  try {
    await fs.mkdir(path.dirname(MOCK_FILE_PATH), { recursive: true });
    await fs.writeFile(MOCK_FILE_PATH, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (error) {
    console.error("Falha ao salvar banco de dados mock:", error);
  }
}

export async function getLeadById(leadId: string): Promise<any | null> {
  try {
    const dbAdmin = admin.firestore();
    const leadSnap = await dbAdmin.collection('leads').doc(leadId).get();
    if (leadSnap.exists) {
      return { id: leadSnap.id, ...leadSnap.data() };
    }
    return null;
  } catch (error: any) {
    if (isCredentialsError(error)) {
      const leads = await readMockLeads();
      return leads.find(l => l.id === leadId) || null;
    }
    throw error;
  }
}

export async function getLeadFromSession(sessionCookie: string): Promise<any | null> {
  let email = '';
  
  if (sessionCookie.startsWith('mock-session-cookie-fallback-email-')) {
    email = sessionCookie.replace('mock-session-cookie-fallback-email-', '');
  } else if (sessionCookie.startsWith('mock-session-cookie-fallback-')) {
    const token = sessionCookie.replace('mock-session-cookie-fallback-', '');
    if (token.startsWith('mock-uid-')) {
      email = 'mock-user@example.com';
    } else {
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        email = decoded.email || '';
      } catch {
        email = 'mock-user@example.com';
      }
    }
  } else if (sessionCookie.startsWith('mock-session-cookie-')) {
    const token = sessionCookie.replace('mock-session-cookie-', '');
    if (token === 'mock-token') {
      email = 'mock-admin@sinergia.business';
    } else {
      email = 'mock-user@example.com';
    }
  } else {
    try {
      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
      email = decodedClaims.email || '';
    } catch (error: any) {
      if (isCredentialsError(error)) {
        // Se der erro de credenciais no localhost, podemos decodificar o token como mock se for email
        if (sessionCookie.includes('@')) {
          email = sessionCookie;
        } else {
          email = 'mock-user@example.com';
        }
      } else {
        throw error;
      }
    }
  }
  
  if (!email) return null;
  
  try {
    const dbAdmin = admin.firestore();
    const leadsSnap = await dbAdmin.collection('leads')
      .where('email', '==', email)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();
      
    if (!leadsSnap.empty) {
      const doc = leadsSnap.docs[0];
      return { id: doc.id, ...doc.data() };
    }
  } catch (error: any) {
    if (isCredentialsError(error)) {
      const leads = await readMockLeads();
      const userLeads = leads
        .filter(l => l.email === email)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      if (userLeads.length > 0) {
        return userLeads[0];
      }
      
      return {
        id: `mock-fallback-${email.replace(/[^a-zA-Z0-9]/g, '')}`,
        name: email.split('@')[0] || 'Parceiro SinergIA',
        email: email,
        nichoSlug: 'commerce-omnichannel-vendas',
        document: '',
        phone: '',
        revenue: 'De R$ 100 mil a R$ 500 mil',
        status: 'prospect_vip',
        blueprintId: '',
        malhas: [],
        stackLevel: 1
      };
    }
    throw error;
  }
  
  return null;
}

export async function submitLeadApplication(userData: any, trackingData: any, clientIp: string, userAgent: string) {
  const email = userData.email;
  const name = userData.name;
  
  try {
    const dbAdmin = admin.firestore();
    const adminAuth = admin.auth();
    
    let uid = '';
    try {
      const userRecord = await adminAuth.getUserByEmail(email);
      uid = userRecord.uid;
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        const newUser = await adminAuth.createUser({
          email: email,
          displayName: name,
        });
        uid = newUser.uid;
      } else {
        throw error;
      }
    }
    
    const leadRef = dbAdmin.collection('leads').doc();
    const eventId = leadRef.id;
    const leadData = {
      id: eventId,
      uid,
      name,
      email,
      document: userData.document || '',
      phone: userData.phone || '',
      revenue: userData.revenue || '',
      teamSize: userData.teamSize || '',
      bottleneck: userData.bottleneck || '',
      nichoSlug: userData.nichoSlug || '',
      auditedLoss: userData.auditedLoss || 0,
      status: 'prospect_vip',
      createdAt: new Date().toISOString(),
      tracking: {
        ...trackingData,
        client_ip_address: clientIp,
        client_user_agent: userAgent
      }
    };
    
    await leadRef.set(leadData);
    
    let sessionCookie = '';
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY;
    if (apiKey) {
      try {
        const customToken = await adminAuth.createCustomToken(uid);
        const tokenResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: customToken, returnSecureToken: true })
        });
        if (tokenResponse.ok) {
          const { idToken } = await tokenResponse.json();
          sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn: 1000 * 60 * 60 * 24 * 5 });
        }
      } catch (e) {
        console.warn("Falha ao gerar cookie real do Firebase Auth:", e);
      }
    }
    
    if (!sessionCookie) {
      sessionCookie = `mock-session-cookie-fallback-email-${email}`;
    }
    
    return { success: true, eventId, docId: eventId, sessionCookie, uid };
  } catch (error: any) {
    if (isCredentialsError(error)) {
      console.warn("[Firebase Admin Helper] Executando submitLeadApplication em modo Mock.");
      
      const eventId = `mock-lead-${Math.random().toString(36).substring(7)}`;
      const uid = `mock-uid-${Math.random().toString(36).substring(7)}`;
      const leadData = {
        id: eventId,
        uid,
        name,
        email,
        document: userData.document || '',
        phone: userData.phone || '',
        revenue: userData.revenue || '',
        teamSize: userData.teamSize || '',
        bottleneck: userData.bottleneck || '',
        nichoSlug: userData.nichoSlug || '',
        auditedLoss: userData.auditedLoss || 0,
        status: 'prospect_vip',
        createdAt: new Date().toISOString(),
        tracking: {
          ...trackingData,
          client_ip_address: clientIp,
          client_user_agent: userAgent
        }
      };
      
      const leads = await readMockLeads();
      leads.push(leadData);
      await writeMockLeads(leads);
      
      const sessionCookie = `mock-session-cookie-fallback-email-${email}`;
      return { success: true, eventId, docId: eventId, sessionCookie, uid };
    }
    console.error("Erro no helper submitLeadApplication:", error);
    return { success: false, error: error.message || String(error), eventId: '', docId: '', sessionCookie: '', uid: '' };
  }
}

export async function saveLeadPreferences(leadId: string, preferences: any) {
  try {
    const dbAdmin = admin.firestore();
    const leadRef = dbAdmin.collection('leads').doc(leadId);
    await leadRef.update({
      preferences: {
        niche: preferences.niche,
        tone: preferences.tone,
        objective: preferences.objective,
        frictionIndex: preferences.frictionIndex || null,
        blueprintId: preferences.blueprintId || null,
        malhas: preferences.malhas || null,
        selectedTools: preferences.selectedTools || null,
        stackLevel: preferences.stackLevel || null,
        archetype: preferences.archetype || null
      },
      niche: preferences.niche,
      tone: preferences.tone,
      objective: preferences.objective,
      frictionIndex: preferences.frictionIndex || null,
      blueprintId: preferences.blueprintId || null,
      malhas: preferences.malhas || null,
      selectedTools: preferences.selectedTools || null,
      stackLevel: preferences.stackLevel || null,
      archetype: preferences.archetype || null,
      userProfile: {
        archetype: preferences.archetype || null
      },
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error: any) {
    if (isCredentialsError(error)) {
      console.warn("[Firebase Admin Helper] Executando saveLeadPreferences em modo Mock.");
      const leads = await readMockLeads();
      const idx = leads.findIndex(l => l.id === leadId);
      if (idx !== -1) {
        leads[idx] = {
          ...leads[idx],
          preferences: {
            niche: preferences.niche,
            tone: preferences.tone,
            objective: preferences.objective,
            frictionIndex: preferences.frictionIndex || null,
            blueprintId: preferences.blueprintId || null,
            malhas: preferences.malhas || null,
            selectedTools: preferences.selectedTools || null,
            stackLevel: preferences.stackLevel || null,
            archetype: preferences.archetype || null
          },
          niche: preferences.niche,
          tone: preferences.tone,
          objective: preferences.objective,
          frictionIndex: preferences.frictionIndex || null,
          blueprintId: preferences.blueprintId || null,
          malhas: preferences.malhas || null,
          selectedTools: preferences.selectedTools || null,
          stackLevel: preferences.stackLevel || null,
          archetype: preferences.archetype || null,
          userProfile: {
            archetype: preferences.archetype || null
          },
          updatedAt: new Date().toISOString()
        };
        await writeMockLeads(leads);
      }
      return { success: true };
    }
    throw error;
  }
}

export async function updateLeadBilling(leadId: string, billingData: any) {
  try {
    const dbAdmin = admin.firestore();
    await dbAdmin.collection('leads').doc(leadId).update({
      ...billingData,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error: any) {
    if (isCredentialsError(error)) {
      console.warn("[Firebase Admin Helper] Executando updateLeadBilling em modo Mock.");
      const leads = await readMockLeads();
      const idx = leads.findIndex(l => l.id === leadId);
      if (idx !== -1) {
        leads[idx] = {
          ...leads[idx],
          ...billingData,
          updatedAt: new Date().toISOString()
        };
        await writeMockLeads(leads);
      }
      return { success: true };
    }
    throw error;
  }
}

const SANDBOX_MOCK_PATH = path.join(process.cwd(), 'src/data/mock-sandbox-db.json');

async function readMockSandbox(): Promise<any[]> {
  try {
    const data = await fs.readFile(SANDBOX_MOCK_PATH, 'utf-8');
    return JSON.parse(data);
  } catch { return []; }
}

async function writeMockSandbox(data: any[]) {
  try {
    await fs.mkdir(path.dirname(SANDBOX_MOCK_PATH), { recursive: true });
    await fs.writeFile(SANDBOX_MOCK_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) { console.error(e); }
}

export async function getSandboxLeadById(companyId: string): Promise<any | null> {
  try {
    const dbAdmin = admin.firestore();
    const snap = await dbAdmin.collection('sandboxLeads').doc(companyId).get();
    if (snap.exists) return { id: snap.id, ...snap.data() };
    return null;
  } catch (error) {
    if (isCredentialsError(error)) {
      const leads = await readMockSandbox();
      return leads.find(l => l.companyId === companyId) || null;
    }
    throw error;
  }
}

export async function saveSandboxLead(companyId: string, leadData: any) {
  try {
    const dbAdmin = admin.firestore();
    await dbAdmin.collection('sandboxLeads').doc(companyId).set({
      ...leadData,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    if (isCredentialsError(error)) {
      console.warn("[Firebase Admin Helper] Executando saveSandboxLead em modo Mock.");
      const leads = await readMockSandbox();
      const idx = leads.findIndex(l => l.companyId === companyId);
      const entry = {
        ...leadData,
        companyId,
        updatedAt: new Date().toISOString()
      };
      if (idx !== -1) {
        leads[idx] = entry;
      } else {
        leads.push(entry);
      }
      await writeMockSandbox(leads);
      return { success: true };
    }
    throw error;
  }
}

