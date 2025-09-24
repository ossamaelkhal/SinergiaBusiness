import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds, options) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // A "linha" que ativa a seção está a 40% da parte de baixo da tela,
      // garantindo que a seção esteja bem visível antes de ser marcada como ativa.
      { rootMargin: '0px 0px -40% 0px' }
    );

    const elements = sectionIds.map((id) => document.getElementById(id));
    elements.forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      elements.forEach((el) => {
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, [sectionIds, options]);

  return activeSection;
};
