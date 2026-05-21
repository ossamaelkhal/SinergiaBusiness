'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "As automações integram com minhas ferramentas atuais (CRMs, planilhas, e-mails)?",
    answer: "Sim. Nossos sistemas são desenhados para se conectar diretamente às ferramentas que sua empresa já utiliza. Seja o seu CRM atual, planilhas de controle ou sistemas de gestão internos, a informação é sincronizada de forma imediata e automática."
  },
  {
    question: "Quanto tempo demora para a minha operação estar no ar?",
    answer: "Prezamos por uma entrega ágil. Após alinharmos as prioridades e fluxos da sua empresa, nossos módulos são configurados e integrados para rodar em sua operação em poucos dias, gerando valor logo nas primeiras semanas."
  },
  {
    question: "As respostas automáticas não vão soar robóticas ou frias para o meu cliente?",
    answer: "De forma alguma. Não utilizamos menus rígidos de 'digite 1 para financeiro, 2 para suporte'. Nossos assistentes virtuais são configurados para utilizar linguagem natural, empática e totalmente adaptada ao tom de voz do seu negócio, respondendo de forma clara e fluida."
  },
  {
    question: "Os dados dos meus clientes e segredos comerciais estão protegidos?",
    answer: "A segurança da informação é nossa prioridade absoluta. Todo o histórico operacional e de atendimento é armazenado em ambiente seguro e privado. Seus dados pertencem exclusivamente à sua empresa e nunca são compartilhados ou utilizados externamente."
  },
  {
    question: "Como garanto que o sistema não tome decisões erradas ou envie mensagens indevidas?",
    answer: "Nossos sistemas operam sob regras de segurança estritas e personalizadas por você (como limites de descontos ou alçadas de decisão). Caso o cliente faça uma pergunta extremamente complexa ou fora do escopo, o sistema transfere o atendimento para uma pessoa da sua equipe de forma simples."
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
            Decisões de alto impacto exigem clareza absoluta. Abaixo, respondemos as principais dúvidas dos nossos clientes e parceiros.
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
