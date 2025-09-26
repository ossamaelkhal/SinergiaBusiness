'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, BarChart, Users, Repeat, Briefcase, Activity, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    id: 'unify',
    icon: Target,
    title: 'Unifique Seus Dados',
    description: 'Conecte todas as suas fontes de dados em um único sistema operacional de negócios.',
    visualization: () => (
      <motion.div className="space-y-2">
        <p className="text-sm font-semibold">Fontes de Dados</p>
        <div className="flex space-x-2">
          <Briefcase className="w-8 h-8 text-blue-500" />
          <Activity className="w-8 h-8 text-green-500" />
          <Users className="w-8 h-8 text-purple-500" />
        </div>
      </motion.div>
    ),
  },
  {
    id: 'automate',
    icon: Zap,
    title: 'Automatize Processos',
    description: 'Transforme fluxos de trabalho manuais em processos automatizados e inteligentes.',
     visualization: () => (
      <motion.div className="space-y-2">
         <p className="text-sm font-semibold">Fluxo Automatizado</p>
         <div className="flex items-center space-x-2 text-xs">
           <span>Lead</span>
           <motion.div className="w-8 h-px bg-foreground" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2 }} />
           <span>Qualificação</span>
            <motion.div className="w-8 h-px bg-foreground" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 }} />
           <span>Venda</span>
         </div>
       </motion.div>
    ),
  },
  {
    id: 'insights',
    icon: BarChart,
    title: 'Receba Inteligência Acionável',
    description: 'Receba recomendações proativas para otimizar suas operações e vendas.',
     visualization: () => (
      <Card className="bg-background/50">
        <CardContent className="p-4">
          <p className="text-xs font-semibold">Recomendação da IA:</p>
          <p className="text-sm">Ativar o 'Sistema de Nutrição' pode aumentar sua conversão em até 15%.</p>
        </CardContent>
      </Card>
    ),
  },
];

export function BenefitsSection() {
  const [activeBenefit, setActiveBenefit] = useState(benefits[0].id);

  return (
    <section id="beneficios" className="bg-muted py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">De Dados Brutos a Decisões Brilhantes</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            SinergIA é mais que uma ferramenta. É o sistema operacional que transforma a complexidade do seu negócio em clareza e resultados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                onMouseEnter={() => setActiveBenefit(benefit.id)}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeBenefit === benefit.id ? 'bg-background shadow-lg' : 'hover:bg-background/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 bg-primary/10 p-3 rounded-full ${activeBenefit === benefit.id ? 'text-primary' : ''}`}>
                    <benefit.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative h-64 bg-background/50 rounded-lg border flex items-center justify-center p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBenefit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
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
