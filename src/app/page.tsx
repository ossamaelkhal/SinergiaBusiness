import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            SinergIA
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Plataforma Premium de IA Multiagente
          </p>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6">
              🎉 Next.js Funcionando!
            </h2>
            <p className="text-gray-300 mb-6">
              Migração para Next.js 14 concluída com sucesso
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/5 rounded-lg p-6">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="text-white font-semibold mb-2">Next.js 14</h3>
                <p className="text-gray-400 text-sm">App Router ativo</p>
              </div>
              <div className="bg-white/5 rounded-lg p-6">
                <div className="text-2xl mb-2">🎨</div>
                <h3 className="text-white font-semibold mb-2">Tailwind CSS</h3>
                <p className="text-gray-400 text-sm">Styling moderno</p>
              </div>
              <div className="bg-white/5 rounded-lg p-6">
                <div className="text-2xl mb-2">🔒</div>
                <h3 className="text-white font-semibold mb-2">TypeScript</h3>
                <p className="text-gray-400 text-sm">Type safety</p>
              </div>
            </div>
            
            <div className="mt-8 space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Começar Agora
              </Button>
              <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                Saiba Mais
              </Button>
            </div>
          </div>

          <div className="text-gray-400 text-sm space-y-2">
            <p>✅ Servidor rodando em localhost:3000</p>
            <p>✅ Componentes carregando</p>
            <p>✅ Tailwind CSS ativo</p>
            <p>✅ TypeScript funcionando</p>
          </div>
        </div>
      </div>
    </div>
  )
}
