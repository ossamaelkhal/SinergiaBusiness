'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function LandingPageHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-sm border-b' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl">SinergIA</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="#beneficios" className="text-muted-foreground hover:text-primary transition-colors">Benefícios</Link>
          <Link href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors">Como Funciona</Link>
          <Link href="#oferta" className="text-muted-foreground hover:text-primary transition-colors">Oferta</Link>
          <Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
           <Link href="/login" passHref>
            <Button variant="ghost">Entrar</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button>Começar Agora</Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
