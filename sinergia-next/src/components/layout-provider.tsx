'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthCarousel } from '@/components/auth-carousel';
import { LandingPageHeader } from '@/components/landing-page/header';
import { Footer } from '@/components/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Sparkles } from 'lucide-react';

export function LayoutProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isAuthRoute = pathname === '/login' || pathname === '/signup';

  if (isDashboardRoute) {
    return (
      <div className="flex h-screen bg-muted/40">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
        </div>
      </div>
    );
  }

  if (isAuthRoute) {
    return (
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center py-12 relative">
           <div className="absolute top-8 left-8">
             <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                <Sparkles className="h-6 w-6 text-primary" />
                <span>SinergIA</span>
              </Link>
           </div>
          {children}
        </div>
        <AuthCarousel />
      </div>
    );
  }

  // Layout Padrão (Landing Page)
  return (
    <>
      <LandingPageHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
