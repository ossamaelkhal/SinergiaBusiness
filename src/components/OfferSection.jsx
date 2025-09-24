import React from 'react';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

const OfferSection = () => {

  const includedFeatures = [
    "Acesso vitalício à plataforma SinergIA",
    "Playbooks de abordagem e engajamento",
    "CRM de Parceiros integrado",
    "Acesso à comunidade exclusiva no Discord",
    "Templates e scripts validados",
    "Encontros semanais de networking e tira-dúvidas",
  ];

  return (
    <section id="oferta" className="bg-secondary-hover py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center bg-secondary-background p-8 rounded-lg border border-primary-base shadow-xl shadow-primary-base/10">
            
            {/* Coluna da Esquerda: Descrição */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-text-primary mb-4">Garanta sua vaga na <span className="text-primary-base">Comunidade SinergIA</span></h2>
              <p className="text-secondary-text-secondary mb-6">Esta não é apenas uma ferramenta. É o seu ingresso para um ecossistema de crescimento. Uma única conexão feita aqui pode pagar o investimento centenas de vezes.</p>
              <ul className="space-y-3">
                {includedFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-secondary-text-primary">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna da Direita: Card de Preço */}
            <div className="bg-secondary-hover border border-secondary-border rounded-lg p-8 text-center flex flex-col justify-between h-full">
              <div>
                  <p className="text-secondary-text-secondary">Acesso Vitalício</p>
                  <p className="text-5xl font-bold text-secondary-text-primary my-4">
                    R$997
                  </p>
                  <p className="text-secondary-text-secondary line-through mb-1">De R$1.997</p>
                  <p className="text-sm text-primary-base font-semibold mb-6">Oferta por tempo limitado</p>
              </div>
              
              <Button variant="primary" size="lg" className="w-full shadow-lg transform hover:scale-105 transition-transform">
                Quero Construir Meu Canal de Parcerias
              </Button>

              <p className="text-xs text-secondary-text-secondary mt-4">Pagamento único, acesso vitalício. Sem mensalidades.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
