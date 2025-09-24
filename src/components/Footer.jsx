import React from 'react';
import { Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-hover border-t border-secondary-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="w-8 h-8 bg-primary-base rounded-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary-text-primary">SinergIA</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-secondary-text-secondary">© {new Date().getFullYear()} SinergIA. Todos os direitos reservados.</p>
            <nav className="flex justify-center md:justify-end space-x-4 mt-2">
              <a href="#" className="text-sm text-secondary-text-secondary hover:text-primary-base">Termos de Serviço</a>
              <a href="#" className="text-sm text-secondary-text-secondary hover:text-primary-base">Política de Privacidade</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
