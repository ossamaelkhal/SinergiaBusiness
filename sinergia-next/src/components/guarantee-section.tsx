'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export function GuaranteeSection() {
  return (
    <motion.section 
      className="bg-background py-20 sm:py-28"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto bg-muted border-2 border-dashed border-border rounded-lg p-8 sm:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <ShieldCheck className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Sua Satisfação ou seu Dinheiro de Volta. Risco Zero.
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl">
            Temos total confiança de que a SinergIA vai transformar sua operação. Por isso, oferecemos uma garantia incondicional de 7 dias. Se, por qualquer motivo, você não ficar 100% satisfeito, basta nos enviar um email e nós reembolsaremos o valor total do seu investimento. Sem perguntas, sem burocracia.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
