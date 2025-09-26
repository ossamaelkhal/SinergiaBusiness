'use client';

import React from 'react';
import { motion } from 'framer-motion';

const partners = ['TechCorp', 'Innovate Inc.', 'Quantum Solutions', 'Future Systems', 'Nexus Enterprises'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function SocialProofSection() {
  return (
    <motion.section 
      className="bg-muted py-12 sm:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <motion.p 
            className="text-sm font-semibold text-muted-foreground tracking-wider uppercase"
            variants={itemVariants}
          >
            Confiança e Resultados para Empresas que Lideram o Mercado
          </motion.p>
          <motion.div 
            className="mt-8 flex justify-center items-center flex-wrap gap-x-8 gap-y-4"
            variants={containerVariants}
          >
            {partners.map((partner) => (
              <motion.span 
                key={partner} 
                className="text-2xl font-bold text-gray-400 opacity-70"
                variants={itemVariants}
              >
                {partner}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
