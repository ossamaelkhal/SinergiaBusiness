"use client"; // Diretiva necessária para componentes que usam hooks

import React from 'react';
// O caminho de importação agora aponta para a localização correta do componente na pasta 'features'.
import EnhancedROICalculator from '../features/roi-calculator/EnhancedROICalculator.jsx';

export default function HomePage() {
  return (
    <main>
      {/*
        A Calculadora de ROI é renderizada aqui como a funcionalidade principal.
        As props `isOpen` e `onClose` são passadas para garantir que ela
        se comporte como a página inteira, e não como um modal.
      */}
      <EnhancedROICalculator isOpen={true} onClose={() => {}} />
    </main>
  );
}