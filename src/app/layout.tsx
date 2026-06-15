import { Suspense } from 'react'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/providers/AuthProvider"
import { Toaster } from "@/components/ui/sonner"
import SinergiaBot from "@/components/features/bot/SinergiaBot"
import { Analytics } from "@/components/Analytics"
import { AffiliateTracker } from "@/components/AffiliateTracker"
import { DevOmniSwitch } from "@/components/dev/DevOmniSwitch"
import FloatingJetski from "@/components/FloatingJetski"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SinergIA | Orquestração Consciente e Agentes Cognitivos B2B",
  description: "Integre a malha de agentes cognitivos SinergIA com o seu ecossistema. Emancipe seu time da digitação repetitiva e burocrática sob a salvaguarda do Pacto de Humanidade.",
  keywords: ["Automação Cognitiva", "Multi-Agent Swarm", "SinergIA OS", "Tecnologia com Alma", "Crescimento Consciente", "Inteligência Artificial", "CRM", "N8N"],
  openGraph: {
    title: "SinergIA | Orquestração Consciente de Agentes Cognitivos",
    description: "Sua operação não precisa de mais burocracia, precisa de harmonia e emancipação. Descubra a Inteligência Humanocêntrica SinergIA.",
    url: "https://sinergia.business",
    siteName: "SinergIA Business",
    images: [
      {
        url: "/og-image-enterprise.jpg",
        width: 1200,
        height: 630,
        alt: "SinergIA OS Cockpit - Inteligência Humanocêntrica",
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
        <AuthProvider>
          <Suspense fallback={null}>
            <Analytics />
            <AffiliateTracker />
          </Suspense>
          
          {children}

          <Toaster />
          <SinergiaBot />
          <DevOmniSwitch />
          <FloatingJetski />
        </AuthProvider>
      </body>
    </html>
  )
}

