import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'SinergIA | Construa seu Motor de Aquisição B2B com Parcerias',
  description: 'Pare de depender de prospecção fria e tráfego pago. Com a SinergIA, você encontra os parceiros ideais, usa abordagens validadas e constrói um canal de aquisição previsível e escalável para seu negócio B2B.',
  // Adicionar mais meta tags Open Graph e Twitter aqui futuramente, conforme o index.html antigo.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
