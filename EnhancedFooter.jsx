import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Users
} from 'lucide-react'

const EnhancedFooter = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent"></div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10 py-12 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Receba Estratégias Exclusivas de IA
            </h3>
            <p className="text-white/80 mb-8">
              Dicas semanais, casos de sucesso e novidades sobre automação para PMEs. 
              Seja o primeiro a saber sobre novas funcionalidades e oportunidades.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 backdrop-blur-sm"
                />
              </div>
              <Button className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 px-6 py-3">
                <Mail className="w-4 h-4 mr-2" />
                Inscrever-se
              </Button>
            </div>

            <p className="text-xs text-white/60 mt-4">
              Sem spam. Cancele quando quiser. Seus dados estão seguros conosco.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white animate-pulse" />
                </div>
                <span className="text-2xl font-bold text-white">TROPA DA VIRADA</span>
              </div>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                Somos mais que uma empresa de tecnologia. Somos um movimento de libertação do potencial humano, 
                transformando PMEs brasileiras através de Sistemas Operacionais de IA que eliminam o desperdício 
                de tempo e maximizam resultados.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-2xl font-bold text-orange-400 mb-1">1.247</div>
                  <div className="text-xs text-white/60">PMEs Libertadas</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-2xl font-bold text-green-400 mb-1">280%</div>
                  <div className="text-xs text-white/60">ROI Médio</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors group">
                  <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors group">
                  <Instagram className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors group">
                  <Youtube className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors group">
                  <Twitter className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-white font-semibold mb-6 flex items-center">
                <Shield className="w-4 h-4 mr-2 text-orange-400" />
                Soluções
              </h4>
              <ul className="space-y-3">
                {[
                  'Sistemas de IA',
                  'Automação de Processos',
                  'Consultoria Estratégica',
                  'Implementação Rápida',
                  'Suporte Especializado'
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academy */}
            <div>
              <h4 className="text-white font-semibold mb-6 flex items-center">
                <Award className="w-4 h-4 mr-2 text-purple-400" />
                Aura Academy
              </h4>
              <ul className="space-y-3">
                {[
                  'Treinamento de Vendas',
                  'Certificações IA',
                  'Comunidade Exclusiva',
                  'Programa de Embaixadores',
                  'Recursos Gratuitos'
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center group">
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-6 flex items-center">
                <Users className="w-4 h-4 mr-2 text-green-400" />
                Contato
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white/70 text-sm">E-mail</div>
                    <a href="mailto:contato@tropadavirada.com.br" className="text-white hover:text-orange-400 transition-colors">
                      contato@tropadavirada.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white/70 text-sm">WhatsApp</div>
                    <a href="tel:+5511999999999" className="text-white hover:text-green-400 transition-colors">
                      +55 (11) 99999-9999
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white/70 text-sm">Localização</div>
                    <div className="text-white">São Paulo, Brasil</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-white/70 text-sm">Atendimento</div>
                    <div className="text-white">24/7 via IA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 Tropa da Virada. Todos os direitos reservados.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Cookies
              </a>
            </div>

            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <Shield className="w-4 h-4" />
              <span>Site 100% Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default EnhancedFooter

