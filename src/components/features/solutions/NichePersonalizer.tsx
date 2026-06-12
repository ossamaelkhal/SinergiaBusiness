'use client'

import React, { useEffect, useState } from 'react'
import { getActiveLeadSession } from '@/actions/leads'
import { Sparkles, ShieldCheck, Activity, Users } from 'lucide-react'

export function NichePersonalizer() {
  const [archetype, setArchetype] = useState<string | null>(null)
  const [leadName, setLeadName] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSession() {
      try {
        const res = await getActiveLeadSession()
        if (res.success && res.lead) {
          const leadArchetype = res.lead.archetype || res.lead.userProfile?.archetype || res.lead.preferences?.archetype
          if (leadArchetype) {
            setArchetype(leadArchetype)
          }
          setLeadName(res.lead.name || '')
        }
      } catch (err) {
        console.error('Erro ao carregar sessão personalizada no cliente:', err)
      } finally {
        setLoading(false)
      }
    }
    loadSession()
  }, [])

  if (loading || !archetype) return null

  const config: Record<string, {
    title: string;
    description: string;
    badge: string;
    bg: string;
    border: string;
    text: string;
    icon: React.ReactNode;
  }> = {
    'Oprimida por Burocracia': {
      title: `Alinhamento de Alma: ${leadName || 'Sua Empresa'} Oprimida por Burocracia`,
      description: 'Constatamos que o seu time gasta energia preciosa digitando notas fiscais, conferindo planilhas e redigitando dados. Vamos focar a implantação na eliminação total do trabalho braçal com o SinergIA Fluxo, liberando as pessoas para focar em estratégia e criatividade.',
      badge: 'Foco: Liberação de Trabalho Braçal',
      bg: 'bg-rose-500/10 from-rose-500/5 to-transparent',
      border: 'border-rose-500/20',
      text: 'text-rose-400',
      icon: <Activity className="w-5 h-5 text-rose-400 shrink-0" />
    },
    'Desconectada do Cliente': {
      title: `Alinhamento de Alma: ${leadName || 'Sua Empresa'} Desconectada do Cliente`,
      description: 'Seu maior vazamento de energia está na conexão. Os clientes esperam muito tempo por respostas ou recebem interações frias. Nosso foco principal aqui será reestabelecer o acolhimento humano 24/7 com o SinergIA Conexão, humanizando cada interação.',
      badge: 'Foco: Acolhimento & Relacionamento',
      bg: 'bg-indigo-500/10 from-indigo-500/5 to-transparent',
      border: 'border-indigo-500/20',
      text: 'text-indigo-400',
      icon: <Users className="w-5 h-5 text-indigo-400 shrink-0" />
    },
    'Visionária Cautelosa': {
      title: `Alinhamento de Alma: ${leadName || 'Sua Empresa'} Visionária Cautelosa`,
      description: 'Sua empresa enxerga o futuro e quer escalar com inteligência, mas exige o máximo controle de segurança e processos. Focaremos em implantar os slots de forma assistida pela nossa engenharia concierge com homologação assistida.',
      badge: 'Foco: Segurança & Homologação',
      bg: 'bg-emerald-500/10 from-emerald-500/5 to-transparent',
      border: 'border-emerald-500/20',
      text: 'text-emerald-400',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
    }
  }

  const activeConfig = config[archetype] || config['Visionária Cautelosa']

  return (
    <div className="container mx-auto px-6 pt-4 pb-0 animate-in fade-in duration-500">
      <div className={`bg-gradient-to-r ${activeConfig.bg} border ${activeConfig.border} p-6 md:p-8 rounded-[1.5rem] relative overflow-hidden backdrop-blur-xl flex flex-col md:flex-row gap-6 items-start md:items-center`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full filter blur-[40px]" />
        
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
            {activeConfig.icon}
          </div>
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 ${activeConfig.text}`}>
                {activeConfig.badge}
              </span>
              <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" /> RECOMENDAÇÃO ATIVA
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white tracking-tight leading-snug">
              {activeConfig.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
              {activeConfig.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
