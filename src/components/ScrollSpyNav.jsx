import React from 'react';

const sections = [
  { id: 'para-quem', title: 'Para Quem' },
  { id: 'beneficios', title: 'Benefícios' },
  { id: 'como-funciona', title: 'Como Funciona' },
  { id: 'oferta', title: 'Sua Vaga' },
  { id: 'faq', title: 'Dúvidas' },
];

// NOTA: Este é um componente visual estático para demonstrar a inovação.
// A lógica de estado para rastrear o scroll ativo precisaria ser implementada a seguir.
const ScrollSpyNav = ({ activeSection = 'para-quem' }) => {
  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <ul className="flex flex-col items-end space-y-4">
        {sections.map(section => {
          const isActive = section.id === activeSection;
          return (
            <li key={section.id}>
              <a 
                href={`#${section.id}`} 
                className="flex items-center space-x-4 group"
              >
                <span className={`text-right text-sm transition-colors ${isActive ? 'text-primary-base font-bold' : 'text-secondary-text-secondary group-hover:text-secondary-text-primary'}`}>
                  {section.title}
                </span>
                <div 
                  className={`rounded-full transition-all ${isActive ? 'w-3 h-3 bg-primary-base ring-4 ring-primary-base/20' : 'w-2 h-2 bg-secondary-border group-hover:bg-secondary-text-primary'}`}>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ScrollSpyNav;
