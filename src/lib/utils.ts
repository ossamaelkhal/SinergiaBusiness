import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Padrão Estrito de Moeda do Ecossistema SinergIA (BRL)
 */
export const formatBRL = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Padrão Estrito de Tempo (Segundos) unificado com a IA
 */
export const formatSeconds = (seconds: number): string => {
  return `${seconds}s`;
};

/**
 * Cálculo de infraestrutura de nuvem base com brackets de desconto progressivo.
 * O nicho de e-commerce e varejo omnichannel possui descontos altamente atrativos.
 */
export function calculateInfraBase(leadsCount: number, nicheSlug?: string): number {
  const isEcommerce = nicheSlug === 'ecommerce' || nicheSlug === 'commerce-omnichannel-vendas';

  if (isEcommerce) {
    if (leadsCount <= 500) {
      return Math.max(490, Math.round(leadsCount * 0.40));
    } else if (leadsCount <= 1500) {
      return Math.max(490, Math.round(500 * 0.40 + (leadsCount - 500) * 0.25));
    } else {
      return Math.max(490, Math.round(500 * 0.40 + 1000 * 0.25 + (leadsCount - 1500) * 0.15));
    }
  } else {
    if (leadsCount <= 500) {
      return Math.max(490, Math.round(leadsCount * 0.50));
    } else if (leadsCount <= 1500) {
      return Math.max(490, Math.round(500 * 0.50 + (leadsCount - 500) * 0.40));
    } else {
      return Math.max(490, Math.round(500 * 0.50 + 1000 * 0.40 + (leadsCount - 1500) * 0.30));
    }
  }
}

export interface SinergiaOSBillingDetails {
  platformFee: number;
  slotsFee: number;
  setupFee: number;
  monthlyTotal: number;
}

export function calculateSinergiaOSPricing(slotsCount: number, stackLevel: number): SinergiaOSBillingDetails {
  const platformFee = 1500;
  const slotsFee = Math.max(0, slotsCount) * 1200;
  
  let setupFee = 3000;
  if (stackLevel === 2) {
    setupFee = 12000;
  } else if (stackLevel === 3) {
    setupFee = 35000;
  }
  
  return {
    platformFee,
    slotsFee,
    setupFee,
    monthlyTotal: platformFee + slotsFee
  };
}
