import { Header } from '@/components/Header'

export default function MarketingSiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="pt-20">
        {children}
      </div>
    </>
  )
}
