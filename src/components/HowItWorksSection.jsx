import React from 'react';
import { Filter, Send, Handshake, BarChart3 } from 'lucide-react';

const steps = [
    {
        icon: <Filter className="w-10 h-10 text-primary-base" />,
        title: "Passo 1: Identificação",
        description: "Use nossos filtros inteligentes para encontrar empresas e profissionais que já se comunicam com seu cliente ideal.",
        stepNumber: "01"
    },
    {
        icon: <Send className="w-10 h-10 text-primary-base" />,
        title: "Passo 2: Abordagem",
        description: "Utilize nossos templates de 'copiar e colar' para iniciar conversas de parceria que realmente funcionam.",
        stepNumber: "02"
    },
    {
        icon: <Handshake className="w-10 h-10 text-primary-base" />,
        title: "Passo 3: Engajamento",
        description: "Siga nosso playbook para transformar a conversa em uma parceria estratégica com um acordo claro de colaboração.",
        stepNumber: "03"
    },
    {
        icon: <BarChart3 className="w-10 h-10 text-primary-base" />,
        title: "Passo 4: Escala",
        description: "Gerencie todo o seu funil de parcerias em nosso CRM integrado e transforme o canal em uma fonte previsível de novos clientes.",
        stepNumber: "04"
    }
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="bg-secondary-background py-16 sm:py-20">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary-text-primary">Seu motor de aquisição em 4 passos</h2>
                <p className="mt-4 text-lg text-secondary-text-secondary max-w-2xl mx-auto">Da identificação à escala, a SinergIA organiza todo o processo de criação de canais de parceria.</p>
            </div>
            <div className="relative">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-secondary-border transform -translate-y-1/2"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center bg-secondary-background px-4">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 mx-auto mb-6 bg-secondary-hover border border-secondary-border rounded-full flex items-center justify-center">
                                    {step.icon}
                                </div>
                                <span className="absolute -top-2 -right-2 bg-primary-base text-white text-xs font-bold rounded-full h-8 w-8 flex items-center justify-center border-4 border-secondary-background">{step.stepNumber}</span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary-text-primary mb-2">{step.title}</h3>
                            <p className="text-secondary-text-secondary">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};

export default HowItWorksSection;
