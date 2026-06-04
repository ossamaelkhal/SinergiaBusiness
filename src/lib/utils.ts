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