'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, Phone, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const navigation = [
  {
    name: 'Soluções',
    href: '#',
    submenu: [
      { name: 'Qualifica - Otimização de Leads', href: '/solucoes/qualifica', description: 'Sistema especializado em qualificação e nutrição de leads' },
      { name: 'Atende - Experiência do Cliente', href: '/solucoes/atende', description: 'Atendimento 24/7 com IA avançada' },
      { name: 'Opera - Excelência Operacional', href: '/solucoes/opera', description: 'Automação completa de processos' },
      { name: 'Calculadora de ROI', href: '/roi-calculator', description: 'Calcule o retorno da sua implementação' }
    ]
  },
  {
    name: 'Casos de Sucesso',
    href: '/casos-de-sucesso'
  },
  {
    name: 'Preços',
    href: '/precos'
  },
  {
    name: 'Recursos',
    href: '#',
    submenu: [
      { name: 'Blog', href: '/blog', description: 'Artigos sobre IA e automação' },
      { name: 'Webinars', href: '/webinars', description: 'Eventos e treinamentos online' },
      { name: 'Documentação', href: '/docs', description: 'Guias técnicos e APIs' },
      { name: 'Central de Ajuda', href: '/ajuda', description: 'Suporte e tutoriais' }
    ]
  }
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SinergIA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="ml-1 w-4 h-4" />}
                </Link>

                {/* Submenu */}
                {item.submenu && activeSubmenu === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-4 z-50">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block px-6 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900">{subitem.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{subitem.description}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700">
              <Phone className="w-4 h-4 mr-2" />
              (11) 9999-9999
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Calendar className="w-4 h-4 mr-2" />
              Demonstração
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200">
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="pl-4 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="px-4 pt-4 border-t border-gray-200 space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  (11) 9999-9999
                </Button>
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Demonstração
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}