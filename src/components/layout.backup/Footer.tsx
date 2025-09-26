
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react'
import Link from 'next/link'

const footerSections = [
  {
    title: 'Soluções',
    links: [
      { name: 'Qualifica - Otimização de Leads', href: '/solucoes/qualifica' },
      { name: 'Atende - Experiência do Cliente', href: '/solucoes/atende' },
      { name: 'Opera - Excelência Operacional', href: '/solucoes/opera' },
      { name: 'Calculadora de ROI', href: '/roi-calculator' }
    ]
  },
  {
    title: 'Empresa',
    links: [
      { name: 'Sobre Nós', href: '/sobre' },
      { name: 'Casos de Sucesso', href: '/casos-de-sucesso' },
      { name: 'Carreiras', href: '/carreiras' },
      { name: 'Imprensa', href: '/imprensa' }
    ]
  },
  {
    title: 'Recursos',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Webinars', href: '/webinars' },
      { name: 'Documentação', href: '/docs' },
      { name: 'Central de Ajuda', href: '/ajuda' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Política de Privacidade', href: '/privacidade' },
      { name: 'Termos de Uso', href: '/termos' },
      { name: 'LGPD', href: '/lgpd' },
      { name: 'Cookies', href: '/cookies' }
    ]
  }
]

const socialLinks = [
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'YouTube', href: '#', icon: Youtube },
  { name: 'Instagram', href: '#', icon: Instagram }
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold">SinergIA</span>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transformamos empresas através de sistemas operacionais de IA multiagente, 
              gerando ROI mensurável e resultados extraordinários.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3" />
                contato@sinergia.ai
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3" />
                (11) 9999-9999
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-5 h-5 mr-3" />
                São Paulo, SP - Brasil
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Siga-nos</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} SinergIA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
