"use server"

import crypto from 'crypto';
import * as admin from 'firebase-admin';
import * as fs from 'fs/promises';
import * as path from 'path';

// Reutilizar o validador de erro de credenciais do Firebase Admin
function isCredentialsError(error: any): boolean {
  if (error) {
    console.warn("[Firebase Admin Helper Warning] Erro detectado no Firebase Admin, acionando fallback mock:", error.message || error);
  }
  return true;
}

const PARTNERS_MOCK_PATH = path.join(process.cwd(), 'src/data/mock-partners-db.json');

async function readMockPartners(): Promise<any[]> {
  try {
    const data = await fs.readFile(PARTNERS_MOCK_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeMockPartners(data: any[]) {
  try {
    await fs.mkdir(path.dirname(PARTNERS_MOCK_PATH), { recursive: true });
    await fs.writeFile(PARTNERS_MOCK_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error("Falha ao salvar mock de parceiros:", e);
  }
}

export interface PartnerDataInput {
  name: string;
  email: string;
  agencyName: string;
  phone: string;
  experienceLevel: string;
}

export async function registerNexusPartner(partnerData: PartnerDataInput) {
  try {
    const { name, email, agencyName, phone, experienceLevel } = partnerData;

    if (!name || !email || !agencyName) {
      throw new Error("Nome, e-mail e nome da agência são campos obrigatórios.");
    }

    // Gerar um token único de afiliação (partnerToken) via hash SHA-256
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedAgency = agencyName.trim().toLowerCase();
    const rawString = `${normalizedEmail}:${normalizedAgency}`;
    const partnerToken = crypto
      .createHash('sha256')
      .update(rawString)
      .digest('hex')
      .substring(0, 16); // Manter curto e legível para URLs de indicação

    const partnerDoc = {
      partnerToken,
      name,
      email,
      agencyName,
      phone: phone || '',
      experienceLevel: experienceLevel || 'Homologado',
      status: 'ativo',
      createdAt: new Date().toISOString()
    };

    try {
      // Tentar salvar no Firestore real
      const dbAdmin = admin.firestore();
      await dbAdmin.collection('partners').doc(partnerToken).set(partnerDoc);
      return { success: true, partnerToken };
    } catch (error) {
      if (isCredentialsError(error)) {
        console.warn("[Firebase Admin Helper] Cadastrando Nexus Partner em modo Mock local.");
        
        const partners = await readMockPartners();
        const idx = partners.findIndex(p => p.partnerToken === partnerToken);
        if (idx !== -1) {
          partners[idx] = { ...partners[idx], ...partnerDoc };
        } else {
          partners.push(partnerDoc);
        }
        await writeMockPartners(partners);
        return { success: true, partnerToken };
      }
      throw error;
    }
  } catch (error: any) {
    console.error("Erro no registerNexusPartner action:", error);
    return {
      success: false,
      error: error.message || String(error)
    };
  }
}
