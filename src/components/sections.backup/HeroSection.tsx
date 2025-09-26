'use client'

import { useState } from 'react'
import { ArrowRight, Play, CheckCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConversionTracker } from '@/components/ConversionTracker'
import { usePerformance } from '@/hooks/usePerformance'

export function HeroSection() {
  const [videoPlaying, setVideoPlaying] = useState(false)
  usePerformance()

  const handleCTAClick = () => {
    // Tracking de conversão
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'engagement',
        event_label: 'hero_cta_primary',
        value: 1
      })
    }
  }

  const handleVideoClick = () => {
    setVideoPlaying(true)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'video_start', {
        event_category: 'engagement',
        event_label: 'hero_demo_video',
        value: 1
      })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Conteúdo Principal */}
            <div className="space-y-8">
              {/* Badge de Credibilidade */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                Plataforma #1 em IA para PMEs no Brasil
              </div>

              {/* Headline Principal */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Transforme seu Negócio com{' '}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    IA Multiagente
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Sistemas operacionais de IA especializados que geram{' '}
                  <strong className="text-primary">ROI de até 300%</strong> em 30 dias. 
                  Automação inteligente, resultados mensuráveis.
                </p>
              </div>

              {/* Benefícios Principais */}
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'ROI comprovado em 30 dias',
                  'Automação 24/7 inteligente',
                  'Integração com 5000+ apps',
                  'Suporte especializado'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg font-semibold group"
                  onClick={handleCTAClick}
                >
                  Começar Transformação Gratuita
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg font-semibold"
                  onClick={handleVideoClick}
                >
                  <Play className="mr-2 w-5 h-5" />
                  Ver Demo (2 min)
                </Button>
              </div>

              {/* Prova Social */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>500+</strong> empresas transformadas
                  </p>
                </div>
              </div>
            </div>

            {/* Área Visual */}
            <div className="relative">
              {!videoPlaying ? (
                <div className="relative group cursor-pointer" onClick={handleVideoClick}>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="/hero-dashboard-preview.jpg"
                      alt="Preview da Plataforma SinergIA"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 animate-bounce">
                    <div className="text-sm font-semibold text-green-600">+300% ROI</div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 animate-pulse">
                    <div className="text-sm font-semibold text-primary">24/7 Ativo</div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tracking de Conversão */}
      <ConversionTracker 
        event="page_view" 
        value={0} 
        items={[{ id: 'hero_section', category: 'landing_page' }]} 
      />
    </section>
  )
}