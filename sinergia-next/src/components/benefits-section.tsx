'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DatabaseZap, Recycle, BrainCircuit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// Visuais para cada benefício
const UnifyVisualization = () => (
  <p className="text-center text-sm text-muted-foreground">Visão Unificada do Cliente</p>
);

const AutomateVisualization = () => (
  <p className="text-center text-sm text-muted-foreground">Fluxos de Trabalho Inteligentes</p>
);

const InsightsVisualization = () => {
  const data = [
    { name: 'Q1', conversion: 2.1 },
    { name: 'Q2', conversion: 3.5 },
    { name: 'Q3', conversion: 3.2 },
    { name: 'Q4', conversion: 4.8 },
  ];
  return (
    <div className="w-full h-full">
      <p className="text-sm font-semibold mb-2">Crescimento da Conversão com IA</p>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} />
          <Bar dataKey="conversion" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const benefits = [
  {
    id: 'unify',
    icon: DatabaseZap,
    title: 'Unifique Seus Dados',
    description: 'Conecte marketing, vendas e operações em um único cérebro central.',
    visualization: UnifyVisualization,
  },
  {
    id: 'automate',
    icon: Recycle,
    title: 'Automatize o Trabalho Pesado',
    description: 'Transforme processos manuais em fluxos de trabalho que se otimizam sozinhos.',
    visualization: AutomateVisualization,
  },
  {
    id: 'insights',
    icon: BrainCircuit,
    title: 'Receba Inteligência, Não Apenas Dados',
    description: 'Receba recomendações proativas que impulsionam o crescimento e a eficiência.',
    visualization: InsightsVisualization,
  },
];

export function BenefitsSection() {
  const [activeBenefit, setActiveBenefit] = useState(benefits[0].id);

  return (
    <section id="beneficios" className="bg-muted py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">De Dados Brutos a Decisões Brilhantes</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">SinergIA é o sistema operacional que transforma a complexidade em clareza.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {benefits.map((b) => (
              <div
                key={b.id}
                onMouseEnter={() => setActiveBenefit(b.id)}
                className={`p-6 rounded-lg cursor-pointer transition-all ${activeBenefit === b.id ? 'bg-background shadow-lg' : 'hover:bg-background/50'}`}
              >
                 <div className="flex items-center space-x-4">
                   <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full"><b.icon className="w-7 h-7" /></div>
                   <div>
                     <h3 className="text-lg font-semibold">{b.title}</h3>
                     <p className="text-muted-foreground">{b.description}</p>
                   </div>
                 </div>
              </div>
            ))}
          </div>
          <div className="relative h-64 bg-background/50 rounded-lg border flex items-center justify-center p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBenefit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full h-full"
              >
                {benefits.find((b) => b.id === activeBenefit)?.visualization()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
