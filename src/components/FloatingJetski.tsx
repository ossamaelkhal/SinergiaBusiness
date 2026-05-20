'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import Link from 'next/link';

export default function FloatingJetski() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Aparece depois de 3 segundos de navegação
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-in slide-in-from-bottom-8 duration-700">
      
      {/* O Bote (Expanded Card) */}
      {isExpanded && (
        <div className="bg-slate-900 border border-emerald-500/30 shadow-2xl shadow-emerald-900/20 rounded-2xl p-4 mb-4 w-72 relative animate-in zoom-in-95 duration-200">
          <button 
            onClick={() => setIsExpanded(false)}
            className="absolute top-3 right-3 text-slate-500 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">SinergIA Comando</div>
              <div className="text-xs text-emerald-400">Online agora</div>
            </div>
          </div>
          
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            Precisa de um resgate? Se a operação Enterprise for pesada demais, me chame. Temos rotas mais leves para começar.
          </p>
          
          <Link 
            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20estou%20no%20site%20da%20SinergIA%20e%20preciso%20de%20ajuda%20para%20entender%20qual%20o%20melhor%20caminho%20para%20minha%20empresa."
            target="_blank"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Falar com Especialista
          </Link>
        </div>
      )}

      {/* O Jetski (Floating Button) */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]"
      >
        {isExpanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

    </div>
  );
}
