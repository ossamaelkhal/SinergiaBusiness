import React from 'react';
import { ChevronDown } from 'lucide-react';

const FaqItem = ({ question, answer }) => (
  <details className="group border-b border-secondary-border py-4">
    <summary className="flex justify-between items-center cursor-pointer list-none">
      <span className="font-medium text-secondary-text-primary">{question}</span>
      <ChevronDown className="w-5 h-5 text-secondary-text-secondary group-open:rotate-180 transition-transform" />
    </summary>
    <p className="text-secondary-text-secondary mt-3">
      {answer}
    </p>
  </details>
);

const FaqSection = () => {
  const faqs = [
    {
      question: "Para quem é a plataforma SinergIA?",
      answer: "A SinergIA foi desenhada para fundadores e líderes de negócios B2B, consultores, agências e prestadores de serviço que vendem para outras empresas e querem escalar sua aquisição de clientes através de um canal de parcerias estratégicas."
    },
    {
      question: "Eu não sou uma pessoa técnica. Vou conseguir usar?",
      answer: "Com certeza. A plataforma foi construída com uma interface intuitiva e direta. Além disso, nossos playbooks de 'copiar e colar' e o suporte da comunidade garantem que você possa começar a ter resultados sem precisar de conhecimentos técnicos."
    },
    {
      question: "Que tipo de resultados posso esperar?",
      answer: "Nossos clientes mais engajados conseguem agendar de 3 a 5 novas reuniões de parceria por semana. O objetivo é transformar essas parcerias em um canal que gere de 2 a 4 novos clientes qualificados todos os meses de forma consistente."
    },
    {
      question: "Qual o diferencial em relação a simplesmente usar o LinkedIn?",
      answer: "Enquanto o LinkedIn é uma rede social, a SinergIA é uma plataforma de ação. Nós te ajudamos a encontrar os parceiros certos com filtros inteligentes, fornecemos os templates de abordagem e te damos um CRM para gerenciar todo o processo em um só lugar, economizando dezenas de horas por mês."
    },
    {
      question: "O investimento vale a pena?",
      answer: "Se fechar apenas um novo cliente através das parcerias geradas pela plataforma pagar o investimento, pense no ROI de fechar 2, 3 ou 10 novos clientes. A SinergIA não é um custo, é um investimento no canal de aquisição mais subestimado e lucrativo do mercado B2B."
    }
  ];

  return (
    <section id="faq" className="bg-secondary-background py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-text-primary">Dúvidas Frequentes</h2>
            <p className="mt-4 text-lg text-secondary-text-secondary">Respostas diretas para suas perguntas mais importantes.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
