import React from 'react';
import { Check, ArrowRight, Gift, Users, Shield } from 'lucide-react';
import { Button } from './ui/button'; // Reutilizando nosso componente de botão

const ValueStackSection = () => {
  const valueItems = [
    { name: "Acesso total à Plataforma SinergIA", value: 9997, icon: Shield },
    { name: "Módulo: Encontrando Parceiros de Elite", value: 1997, icon: Users },
    { name: "Bônus #1: Templates de Abordagem Validados", value: 997, icon: Gift },
    { name: "Bônus #2: Dashboard de ROI em Tempo Real", value: 2497, icon: Gift },
    { name: "Bônus #3: Suporte VIP via Canais Dedicados", value: 2997, icon: Gift },
  ];

  const totalValue = valueItems.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="bg-secondary-hover py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl sm:text-4xl font-bold text-secondary-text-primary"
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            Uma Oferta Simplesmente Irrecusável
          </h2>
          <p 
            className="mt-4 text-lg text-secondary-text-secondary max-w-3xl mx-auto"
            style={{ fontFamily: 'var(--font-family-sans)' }}
          >
            Veja tudo que você recebe ao se juntar à SinergIA e por que esta será a decisão mais inteligente para o seu negócio este ano.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Coluna de Ancoragem de Preço */}
          <div className="border border-secondary-border rounded-lg p-6">
            <h3 className="text-2xl font-bold text-secondary-text-primary mb-6 text-center">Compare Suas Opções</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-red-500/10 rounded-lg">
                <p className="text-lg font-semibold text-secondary-text-secondary line-through">Contratar uma Agência</p>
                <p className="text-2xl font-bold text-red-500">R$ 5.000/mês</p>
                <p className="text-sm text-secondary-text-secondary mt-1">Sem garantia de resultados, contratos longos.</p>
              </div>
              <div className="text-center p-4 bg-red-500/10 rounded-lg">
                <p className="text-lg font-semibold text-secondary-text-secondary line-through">Contratar um Vendedor</p>
                <p className="text-2xl font-bold text-red-500">R$ 6.000 + comissão</p>
                <p className="text-sm text-secondary-text-secondary mt-1">Curva de aprendizado, custos trabalhistas.</p>
              </div>
              <div className="text-center p-4 bg-red-500/10 rounded-lg">
                <p className="text-lg font-semibold text-secondary-text-secondary line-through">Fazer Sozinho</p>
                <p className="text-2xl font-bold text-red-500">Custo de Oportunidade</p>
                <p className="text-sm text-secondary-text-secondary mt-1">Meses de tentativa e erro, perda de foco.</p>
              </div>
            </div>
          </div>

          {/* Coluna do Stack de Valor */}
          <div className="border-2 border-primary-base rounded-lg p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-secondary-text-primary mb-6 text-center">O Que Você Recebe Hoje:</h3>
            <ul className="space-y-4 mb-6">
              {valueItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 text-primary-base mr-3" />
                    <span className="text-secondary-text-secondary">{item.name}</span>
                  </div>
                  <span className="font-semibold text-secondary-text-primary">R$ {item.value.toLocaleString('pt-BR')}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-secondary-border pt-4 mb-6 flex justify-between items-center">
              <span className="text-lg font-bold text-secondary-text-primary">Valor Total:</span>
              <span className="text-xl font-bold text-secondary-text-primary line-through">R$ {totalValue.toLocaleString('pt-BR')}</span>
            </div>
            <div className="text-center mb-6">
              <p className="text-lg text-secondary-text-secondary">Seu investimento hoje por apenas:</p>
              <p className="text-5xl font-bold text-primary-base my-2">12x de R$ 297</p>
              <p className="text-sm text-secondary-text-secondary">ou R$ 2.997 à vista</p>
            </div>
            <Button size="lg" className="w-full text-lg">
              Quero Acesso Imediato
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueStackSection;
