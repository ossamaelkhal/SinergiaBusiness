'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const includedFeatures = [
  "Acesso vitalício à plataforma SinergIA",
  "Módulo de Análise e Prospecção com IA",
  "CRM de Parceiros integrado",
  "Playbooks de Abordagem e Engajamento",
  "Comunidade Exclusiva de Fundadores B2B",
  "Encontros Semanais de Networking",
];

export function OfferSection() {
  return (
    <motion.section 
      id="oferta" 
      className="bg-muted py-20 sm:py-28"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
           <h2 className="text-3xl sm:text-4xl font-bold">Uma Oferta. Crescimento Ilimitado.</h2>
           <p className="mt-4 text-lg text-muted-foreground">
             Acesse o sistema operacional completo para construir e escalar seu motor de aquisição B2B. Sem mensalidades. Sem complicações.
           </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="max-w-md mx-auto mt-12 bg-background shadow-2xl border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Acesso Vitalício SinergIA</CardTitle>
              <p className="text-4xl font-bold pt-4">R$997</p>
              <p className="text-muted-foreground line-through">Valor Original: R$2.997</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8">
                {includedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full text-lg shadow-lg">
                Garantir Meu Acesso Agora
              </Button>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Pagamento único. Acesso vitalício. Garantia de 7 dias.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
