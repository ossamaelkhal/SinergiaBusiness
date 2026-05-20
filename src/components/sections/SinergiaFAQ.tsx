'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "O SinergIA OS integra com o meu CRM atual (RD Station, Salesforce, HubSpot)?",
    answer: "Sim. Nossa infraestrutura Nível 5 possui webhooks e APIs abertas. Nós conectamos a máquina de vendas diretamente ao seu ecossistema atual. O lead é atendido pela IA no WhatsApp e, em segundos, todas as informações são atualizadas no seu CRM automaticamente."
  },
  {
    question: "Quanto tempo demora para a minha operação estar rodando?",
    answer: "Nosso protocolo TTFV (Time To First Value) é agressivo. Em média, após a reunião de Setup, seus Agentes Inteligentes (Clones Digitais) são forjados, treinados com os dados da sua empresa e colocados no ar em até 48 horas."
  },
  {
    question: "A Inteligência Artificial vai soar como um 'robô burro' para o meu cliente?",
    answer: "Definitivamente não. Nós não usamos 'chatbots de fluxo' com opções de 1 a 9. O SinergIA Genesis Core utiliza LLMs avançados (Modelos de Linguagem Grande) com Fine-Tuning específico para o seu negócio. Ele negocia, entende áudios, tem empatia e quebra objeções exatamente como o seu melhor vendedor faria."
  },
  {
    question: "Meus dados de clientes e segredos de venda estão seguros?",
    answer: "Soberania de Dados é nossa regra número um. Seu 'cérebro' IA é instanciado em um silo privado. Cada venda que ele faz treina apenas o SEU modelo. Suas conversas não são usadas para alimentar o ChatGPT público ou seus concorrentes."
  },
  {
    question: "E se a IA cometer um erro grave em uma negociação?",
    answer: "A Frota Multi-Agente possui uma camada chamada 'SinergIA Guardrail'. Você define as regras de segurança (ex: 'NUNCA dê desconto maior que 10%'). A IA é fisicamente impossibilitada de cruzar essas barreiras. Em caso de dúvidas complexas, ela transfere a conversa para um humano da sua equipe suavemente."
  }
];

export default function SinergiaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full py-24 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold uppercase tracking-widest mb-6">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            Central de Inteligência
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6">
            Dúvidas Frequentes
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Decisões de alto impacto exigem clareza absoluta. Abaixo, quebramos as objeções mais comuns de operações Enterprise.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-slate-900 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)]' : 'bg-slate-950 border-white/10 hover:border-white/20'}`}
              >
                <button
                  className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={`font-bold text-lg md:text-xl pr-8 ${isOpen ? 'text-indigo-400' : 'text-slate-200'}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'bg-indigo-500/20 rotate-180' : 'bg-slate-800'}`}>
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-indigo-400' : 'text-slate-400'}`} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-2 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
