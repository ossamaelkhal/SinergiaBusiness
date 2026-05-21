import { Suspense } from 'react'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/providers/AuthProvider"
import { Toaster } from "@/components/ui/sonner"
import SinergiaBot from "@/components/features/bot/SinergiaBot"
import { Analytics } from "@/components/Analytics"
import { AffiliateTracker } from "@/components/AffiliateTracker"
import { AppLayoutWrapper } from "@/components/navigation/AppLayoutWrapper"
import { DevOmniSwitch } from "@/components/dev/DevOmniSwitch"
import FloatingJetski from "@/components/FloatingJetski"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SinergIA | Automação Cognitiva e Multi-Agent Swarm B2B",
  description: "Substitua gargalos humanos por uma arquitetura determinística de IA. O SinergIA OS raspa a web, qualifica leads e fecha negócios em escala industrial.",
  keywords: ["Automação Cognitiva", "Multi-Agent Swarm", "SinergIA OS", "Sales Engine", "Vendas B2B", "Inteligência Artificial", "CRM", "N8N"],
  openGraph: {
    title: "SinergIA | O Início do Seu Império B2B",
    description: "Sua operação não precisa de mais planilhas, precisa de Autonomia. Descubra o SinergIA Genesis Core.",
    url: "https://sinergia.business",
    siteName: "SinergIA Business",
    images: [
      {
        url: "/og-image-enterprise.jpg",
        width: 1200,
        height: 630,
        alt: "SinergIA OS Cockpit - Automação Nível 5",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased`}>
        <main>
          <AuthProvider>
            <Suspense fallback={null}>
              <Analytics />
              <AffiliateTracker />
            </Suspense>
            
            <AppLayoutWrapper>
              {children}
            </AppLayoutWrapper>

            <Toaster />
            <SinergiaBot />
            <DevOmniSwitch />
            <FloatingJetski />
          </AuthProvider>
        </main>
      </body>
    </html>
  )
}
