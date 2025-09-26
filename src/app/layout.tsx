import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SinergIA - Plataforma Premium de IA Multiagente",
  description: "Transforme seu negócio com sistemas operacionais de IA especializados.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
