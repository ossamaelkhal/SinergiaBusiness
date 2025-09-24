import React from 'react';
import { Zap, Target, BarChart, Users, Repeat } from 'lucide-react';

const benefits = [
    { icon: <Target className="w-7 h-7 text-primary-base" />, text: "Encontre os <span className='text-primary-base font-semibold'>parceiros ideais</span> com filtros avançados." },
    { icon: <Zap className="w-7 h-7 text-primary-base" />, text: "Abordagens validadas para <span className='text-primary-base font-semibold'>iniciar conversas</span> de alto nível." },
    { icon: <BarChart className="w-7 h-7 text-primary-base" />, text: "Transforme parcerias em um <span className='text-primary-base font-semibold'>canal de aquisição</span> previsível." },
    { icon: <Users className="w-7 h-7 text-primary-base" />, text: "Acesse uma <span className='text-primary-base font-semibold'>comunidade exclusiva</span> de empreendedores B2B." },
    { icon: <Repeat className="w-7 h-7 text-primary-base" />, text: "<span className='text-primary-base font-semibold'>Economize dezenas de horas</span> por mês com um processo automatizado." },
  ];

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="bg-secondary-hover py-16 sm:py-20">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-secondary-text-primary">Menos prospecção, mais conversas estratégicas.</h2>
                    <p className="text-lg text-secondary-text-secondary">A SinergIA não é apenas uma lista de contatos. É um sistema completo para você construir um ecossistema de parcerias que gera oportunidades de negócio no piloto automático.</p>
                    <ul className="space-y-4">
                        {benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center space-x-4">
                                <div className="flex-shrink-0 bg-primary-base/10 p-3 rounded-full">
                                    {benefit.icon}
                                </div>
                                <span className="text-lg text-secondary-text-primary" dangerouslySetInnerHTML={{ __html: benefit.text }}></span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative h-96 bg-secondary-background rounded-lg border border-secondary-border flex items-center justify-center">
                    <p className="text-secondary-text-secondary">[Placeholder para um gráfico ou visualização de dados]</p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default BenefitsSection;
