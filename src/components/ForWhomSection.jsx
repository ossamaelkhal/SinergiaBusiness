import React from 'react';
import { Users, Briefcase, Mic } from 'lucide-react';

const हूंCards = [
    {
        icon: <Briefcase className="w-8 h-8 mb-4 text-primary-base" />,
        title: "Fundadores e Líderes B2B",
        description: "Que buscam diversificar seus canais de aquisição e encontrar um caminho escalável além de tráfego pago e prospecção fria."
    },
    {
        icon: <Users className="w-8 h-8 mb-4 text-primary-base" />,
        title: "Consultores e Agências",
        description: "Que desejam fechar clientes maiores, estabelecendo parcerias com empresas que já atendem seu perfil de cliente ideal."
    },
    {
        icon: <Mic className="w-8 h-8 mb-4 text-primary-base" />,
        title: "Prestadores de Serviço High-Ticket",
        description: "Que vendem para outras empresas e querem construir um fluxo constante de indicações qualificadas através de uma rede de parceiros."
    }
];

const ForWhomSection = () => {
  return (
    <section id="para-quem" className="bg-secondary-background py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-text-primary">Construído para quem vende B2B e quer escalar</h2>
          <p className="mt-4 text-lg text-secondary-text-secondary max-w-3xl mx-auto">Se você se identifica com um destes perfis, a SinergIA é o seu próximo passo lógico para um crescimento previsível.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {हूंCards.map((card, index) => (
            <div key={index} className="bg-secondary-hover p-8 rounded-lg border border-secondary-border shadow-sm">
              {card.icon}
              <h3 className="text-xl font-bold text-secondary-text-primary mb-2">{card.title}</h3>
              <p className="text-secondary-text-secondary">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWhomSection;
