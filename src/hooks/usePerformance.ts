'use client'

import { useState, useEffect } from 'react'

export function usePerformance(slotsCount: number, nichoSlug: string) {
  // Platform Core cost: platformFee = 1500
  // Cost per slot: 1200
  const platformFee = 1500;
  const pricePerSlot = 1200;
  const totalCost = platformFee + (slotsCount * pricePerSlot);

  // Headcount Leverage (CLT cost savings in Brazil):
  // Each agent slot replaces 1 human FTE. Average cost to company: R$ 4.500/month.
  const headcountLeverage = slotsCount * 4500;

  // Revenue Capture (Operational leakage stopped):
  // Baselines based on the niche's average monthly leakage.
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
  
  // Revenue Captured = 75% of leakage saved by the agents
  const initialRevenueCapture = nicheLeakage * 0.75;
  
  const initialSavings = headcountLeverage + initialRevenueCapture;

  // Ticker reativo
  const [efficiencyGains, setEfficiencyGains] = useState(initialSavings);

  useEffect(() => {
    setEfficiencyGains(initialSavings);
  }, [initialSavings]);

  useEffect(() => {
    // Incrementa um pequeno valor (centavos/reais) a cada 1.500ms
    // Simula a economia em tempo real dos robôs rodando ativos no back-office
    const interval = setInterval(() => {
      setEfficiencyGains((prev) => {
        const increment = Number((Math.random() * (0.45 - 0.15) + 0.15).toFixed(2));
        return prev + increment;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const netRoi = efficiencyGains - totalCost;

  return {
    efficiencyGains,
    headcountLeverage,
    revenueCapture: initialRevenueCapture,
    totalCost,
    netRoi
  };
}
