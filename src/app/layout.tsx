import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SinergIA - Plataforma Premium de IA Multiagente",
  description: "Transforme seu negócio com sistemas operacionais de IA especializados.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/*
        O layout foi simplificado ao máximo para garantir que nada
        interfira na renderização do conteúdo da página (children).
      */}
      <body>
        {children}
      </body>
    </html>
  );
}