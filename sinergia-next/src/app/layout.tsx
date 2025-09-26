import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from '@/components/ui/sonner';
import { LayoutProvider } from '@/components/layout-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SinergIA',
  description: 'O Sistema Operacional de Negócios para Crescimento Inteligente',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <LayoutProvider>
            {children}
          </LayoutProvider>
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
