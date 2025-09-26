'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { LandingPageHeader } from '@/components/landing-page/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export function LayoutProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isPublicRoute = ['/', '/login', '/signup'].includes(pathname);
  const isDashboardRoute = pathname.startsWith('/dashboard');

  if (isDashboardRoute) {
    return (
      <div className="flex h-screen bg-muted/40">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <>
      {isPublicRoute && <LandingPageHeader />}
      <main>{children}</main>
    </>
  );
}
