'use client'

import { ArrowRight, Calendar, MessageCircle, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Main CTA */}
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para Transformar seu Negócio?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Junte-se a mais de 500 empresas que já transformaram seus resultados com a SinergIA. 
              Comece hoje e veja o ROI em 30 dias.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Agendar Demonstração Gratuita
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Fale com um Especialista
              </Button>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-white">
              <Zap className="w-8 h-8 mb-4 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2">Implementação Rápida</h3>
              <p className="opacity-90">Soluções prontas para implementação em até 7 dias úteis.</p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-white">
              <Calendar className="w-8 h-8 mb-4 text-green-300" />
              <h3 className="text-xl font-semibold mb-2">ROI em 30 Dias</h3>
              <p className="opacity-90">Garantimos retorno sobre investimento em até 30 dias após implementação.</p>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-white">
              <MessageCircle className="w-8 h-8 mb-4 text-blue-300" />
              <h3 className="text-xl font-semibold mb-2">Suporte 24/7</h3>
              <p className="opacity-90">Apoio constante da nossa equipe especializada durante todo o processo.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
