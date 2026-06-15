import { nichesData } from '@/data/niches';

export interface FrictionReport {
  imprisonedIntellectHours: number;
  yearlyRevenueLeak: number;
  nicheTitle: string;
}

export function estimateCompanyFriction(nicheSlug: string, employeeCount: number): FrictionReport {
  // Fallback seguro caso o nicho não seja mapeado
  const resolvedSlug = nichesData[nicheSlug] ? nicheSlug : 'commerce-omnichannel-vendas';
  const niche = nichesData[resolvedSlug];

  // Cálculo: 40% da equipe em tarefas braçais, 8 horas semanais
  const imprisonedIntellectHours = Math.round((employeeCount * 0.4) * 8);
  
  // Cálculo: 12% do faturamento mensal do nicho vazando, anualizado
  const yearlyRevenueLeak = Math.round((niche.financialMetrics.billedRevenue * 0.12) * 12);

  return {
    imprisonedIntellectHours,
    yearlyRevenueLeak,
    nicheTitle: niche.shortTitle
  };
}
