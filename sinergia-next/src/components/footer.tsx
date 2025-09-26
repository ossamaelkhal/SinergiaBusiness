import React from 'react';
import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-foreground">SinergIA</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-muted-foreground">© {new Date().getFullYear()} SinergIA. Todos os direitos reservados.</p>
            <nav className="flex justify-center md:justify-end space-x-4 mt-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Termos de Serviço</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Política de Privacidade</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
