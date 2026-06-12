'use client'

import { useState, useEffect } from 'react'

export function usePerformance(slotsCount: number, nichoSlug: string) {
  // Platform Core cost: platformFee = 1500
  // Cost per slot: 1200
  const platformFee = 1500;
  const pricePerSlot = 1200;
  const totalCost = platformFee + (slotsCount * pricePerSlot);

  // Tempo Humano Emancipado (Carga Braçal Eliminada em horas):
  // Cada slot de agente ativo assume cerca de 160 horas de trabalho manual mensal
  const baseHours = slotsCount * 160;

  // Valor do Capital Intelectual Liberado (anterior headcount leverage):
  // Cada slot gera uma alavancagem média de R$ 4.500/mês
  const intellectualLeverage = slotsCount * 4500;

  // Receita Protegida (Vazamento operacional estancado)
  const baselines: Record<string, number> = {
    'faturamento-saude-bemestar': 12400,
    'commerce-omnichannel-vendas': 18900,
    'operacoes-urgencia-logistica': 22500,
    'bpo-financeiro-credito-tem': 28200,
    'servicos-tecnicos-comerciais': 14700,
    'reputacao-recuperacao-retencao': 16500,
  };
  const defaultLeakage = 15000;
  const nicheLeakage = baselines[nichoSlug || ''] || defaultLeakage;
  
  // Receita Recuperada = 75% do vazamento estancado
  const initialRevenueCapture = nicheLeakage * 0.75;
  const initialSavings = intellectualLeverage + initialRevenueCapture;

  // Ticker reativo
  const [efficiencyGains, setEfficiencyGains] = useState(initialSavings);
  const [hoursEmancipated, setHoursEmancipated] = useState(baseHours);

  useEffect(() => {
    setEfficiencyGains(initialSavings);
    setHoursEmancipated(baseHours);
  }, [initialSavings, baseHours]);

  useEffect(() => {
    // Incrementa um pequeno valor (centavos/reais e horas) a cada 1.500ms
    // Simula a economia em tempo real dos robôs rodando ativos no back-office
    const interval = setInterval(() => {
      setEfficiencyGains((prev) => {
        const increment = Number((Math.random() * (0.45 - 0.15) + 0.15).toFixed(2));
        return prev + increment;
      });
      setHoursEmancipated((prev) => {
        const incrementHours = Number((Math.random() * (0.0003 - 0.0001) + 0.0001).toFixed(6));
        return prev + incrementHours;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const netRoi = efficiencyGains - totalCost;

  return {
    efficiencyGains,
    hoursEmancipated,
    intellectualLeverage,
    revenueCapture: initialRevenueCapture,
    totalCost,
    netRoi
  };
}
