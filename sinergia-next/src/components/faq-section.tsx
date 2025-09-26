'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Para quem a SinergIA foi desenhada?",
    answer: "Para fundadores e líderes de negócios B2B, consultores e agências que buscam escalar sua aquisição de clientes através de um canal previsível de parcerias estratégicas, indo além da prospecção fria e do alto custo de tráfego pago."
  },
  {
    question: "Preciso ser um especialista em tecnologia para usar a plataforma?",
    answer: "Absolutamente não. A SinergIA foi construída sob o princípio de 'Sofisticação sem Esforço'. A complexidade da nossa IA opera nos bastidores para lhe entregar insights claros e ações simples. Se você sabe usar um email, você saberá usar a SinergIA."
  },
  {
    question: "Que tipo de resultados concretos posso esperar?",
    answer: "Nossos usuários mais focados conseguem mapear dezenas de parceiros potenciais na primeira semana e agendar de 3 a 5 novas reuniões de parceria por mês. O objetivo é transformar essas conexões em 2 a 4 novos clientes qualificados mensalmente."
  },
  {
    question: "Isso é apenas uma lista de contatos como o LinkedIn?",
    answer: "Não. O LinkedIn é uma rede social; a SinergIA é um sistema operacional de negócios. Nós não apenas ajudamos a encontrar os parceiros certos com nossa IA, mas fornecemos os playbooks de abordagem e um CRM integrado para gerenciar todo o processo, economizando dezenas de horas e transformando conexões em receita."
  },
  {
    question: "O investimento tem retorno garantido?",
    answer: "Nós garantimos seu risco com uma política de reembolso de 7 dias. Estrategicamente, se a plataforma lhe trouxer apenas um único novo cliente, o investimento já se pagou para sempre. Nós estamos construindo um ativo para o seu negócio, não um custo mensal."
  }
];

export function FaqSection() {
  return (
    <motion.section 
      id="faq" 
      className="bg-background py-20 sm:py-28"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
           <h2 className="text-3xl sm:text-4xl font-bold">Respostas Diretas para Decisões Inteligentes</h2>
           <p className="mt-4 text-lg text-muted-foreground">
             Tudo o que você precisa saber antes de transformar seu negócio.
           </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
             <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
}
