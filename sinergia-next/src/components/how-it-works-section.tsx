'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Send, Handshake, BarChart3, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Filter,
    title: "Passo 1: Identificação Inteligente",
    description: "Conecte suas fontes de dados e deixe nossa IA identificar os parceiros com maior potencial de sinergia para o seu negócio."
  },
  {
    icon: Send,
    title: "Passo 2: Abordagem Otimizada",
    description: "Utilize templates de comunicação gerados por IA, personalizados para cada parceiro, aumentando drasticamente suas taxas de resposta."
  },
  {
    icon: Handshake,
    title: "Passo 3: Gestão Centralizada",
    description: "Gerencie todo o seu pipeline de parcerias em um único dashboard, com insights e próximos passos sugeridos pela plataforma."
  },
  {
    icon: BarChart3,
    title: "Passo 4: Escala Previsível",
    description: "Transforme parcerias em um canal de receita previsível, com relatórios de ROI claros e insights para otimização contínua."
  }
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-background py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Como a SinergIA Transforma sua Operação</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Um processo de 4 passos, guiado por inteligência, para construir seu motor de crescimento.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* A linha vertical que conecta os passos */}
          <div className="absolute left-8 top-8 h-full border-l-2 border-dashed border-border"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 bg-background border-2 border-primary rounded-full flex items-center justify-center z-10">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary/10 rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
