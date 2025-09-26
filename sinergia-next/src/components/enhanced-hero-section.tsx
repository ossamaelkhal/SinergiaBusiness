'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function EnhancedHeroSection() {
  return (
    <section className="relative bg-background text-center py-24 sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5 [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground">
            O Fim da Adivinhação.<br />
            O Início da Inteligência de Negócios.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            SinergIA é o sistema operacional que unifica seus dados, automatiza seus processos e entrega a clareza que você precisa para transformar seu negócio em uma potência de mercado.
          </p>
        </motion.div>
        
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.2 }}
        >
          <Link href="/signup" passHref>
            <Button size="lg" className="text-lg w-full sm:w-auto">
              Comece a Transformação
            </Button>
          </Link>
          <Link href="#como-funciona" passHref>
             <Button size="lg" variant="outline" className="text-lg w-full sm:w-auto">
              Veja como Funciona
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          className="mt-12 flex items-center justify-center space-x-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-2" />
            <span>Baseado em +1,200 horas de consultoria B2B</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
