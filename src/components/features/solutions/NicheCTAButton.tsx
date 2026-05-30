'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface NicheCTAButtonProps {
  slug: string;
  text: string;
  className?: string;
  color?: 'emerald' | 'indigo' | 'fuchsia' | 'amber' | 'cyan' | 'rose';
  variant?: 'primary' | 'secondary' | 'outline';
}

export function NicheCTAButton({ 
  slug, 
  text, 
  className = '', 
  color = 'emerald', 
  variant = 'primary' 
}: NicheCTAButtonProps) {
  const [href, setHref] = useState(`/apply?nicho=${slug}`);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search) {
        const cleanParams = search.startsWith('?') ? `&${search.slice(1)}` : `&${search}`;
        setHref(`/apply?nicho=${slug}${cleanParams}`);
      }
    }
  }, [slug]);

  const buttonMaps: Record<string, string> = {
    emerald: "bg-emerald-500 hover:bg-emerald-400 text-emerald-950 shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] hover:-translate-y-0.5",
    indigo: "bg-indigo-500 hover:bg-indigo-400 text-indigo-950 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5",
    fuchsia: "bg-fuchsia-500 hover:bg-fuchsia-400 text-fuchsia-950 shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:-translate-y-0.5",
    amber: "bg-amber-500 hover:bg-amber-400 text-amber-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:-translate-y-0.5",
    cyan: "bg-cyan-500 hover:bg-cyan-400 text-cyan-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-0.5",
    rose: "bg-rose-500 hover:bg-rose-400 text-rose-950 shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] hover:-translate-y-0.5",
  };

  const styleClass = variant === 'primary'
    ? `h-16 px-8 w-full sm:w-auto rounded-2xl font-black text-lg transition-all duration-300 uppercase tracking-widest flex items-center justify-center ${buttonMaps[color]} ${className}`
    : `h-14 px-8 w-full sm:w-auto rounded-xl font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 flex items-center justify-center ${className}`;

  return (
    <Link href={href} className="w-full sm:w-auto inline-block">
      <Button className={styleClass}>
        {text}
        <ChevronRight className="w-5 h-5 ml-2 shrink-0" />
      </Button>
    </Link>
  );
}
