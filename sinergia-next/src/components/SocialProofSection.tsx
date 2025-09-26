'use client';

import React from 'react';

const SocialProofSection = () => {
  const partners = [
    'TechCorp',
    'Innovate Inc.',
    'Quantum Solutions',
    'Future Systems',
    'Nexus Enterprises'
  ];

  return (
    <section className="bg-secondary-hover py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p 
            className="text-sm font-semibold text-secondary-text-secondary tracking-wider uppercase"
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            Confiança e Resultados para Empresas que Lideram o Mercado
          </p>
          <div className="mt-8 flex justify-center items-center flex-wrap gap-x-8 gap-y-4">
            {partners.map((partner, index) => (
              <span 
                key={index}
                className="text-2xl font-bold text-gray-400"
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  opacity: 0.7
                }}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
