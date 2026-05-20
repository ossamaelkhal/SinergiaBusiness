import { Stethoscope, ShoppingBag, Scale, Landmark, Factory, Briefcase, Activity } from 'lucide-react'

export interface NicheSolution {
  slug: string
  title: string
  shortTitle: string
  subtitle: string
  description: string
  icon: any
  color: 'emerald' | 'indigo' | 'fuchsia' | 'amber' | 'cyan' | 'rose'
  heroImage?: string
  painPoints: {
    title: string
    description: string
    icon: any
  }[]
  solutions: {
    title: string
    description: string
    impact: string
    features: string[]
  }[]
  metrics: {
    value: string
    label: string
  }[]
  demoType?: 'sales' | 'support' | 'scheduling' | 'financial'
  testimonials?: {
    quote: string
    author: string
    role: string
  }[]
}

export const nichesData: Record<string, NicheSolution> = {
  "faturamento-saude": {
    slug: "faturamento-saude",
    title: "SinergIA para Faturamento Médico",
    shortTitle: "Faturamento Médico & Glosas",
    subtitle: "Zere glosas de convênios, audite guias TISS/TUSS em tempo real e automatize recursos de negativas.",
    description: "Clínicas e hospitais sofrem um sangramento financeiro silencioso devido às glosas dos planos de saúde. A SinergIA implementa agentes cognitivos no backoffice para auditar guias antes do envio e contestar negativas automaticamente.",
    icon: Stethoscope,
    color: "emerald",
    painPoints: [
      {
        title: "Glosas e Negativas Frustrantes",
        description: "Planos de saúde recusam o pagamento de procedimentos por erro de digitação, falta de documentos ou códigos inválidos.",
        icon: Activity,
      },
      {
        title: "Faturamento Manual Lento",
        description: "Faturistas passam o dia revisando guias e recorrendo de negativas seguindo manuais de regras gigantescos que mudam constantemente.",
        icon: Activity,
      },
      {
        title: "Fluxo de Caixa Asfixiado",
        description: "Dinheiro legítimo fica retido por meses nas operadoras de saúde devido à lentidão na conciliação física de guias de exames e consultas.",
        icon: Activity,
      }
    ],
    solutions: [
      {
        title: "Auditor Automático de Guias",
        description: "Agente cognitivo rodando no backoffice que cruza dados do prontuário com as regras específicas do convênio antes de enviar as guias.",
        impact: "Redução de até 90% nas glosas de envio iniciais.",
        features: ["Validação de Códigos TISS/TUSS", "Cruzamento com Prontuário Clínico", "Envio homologado automático"]
      },
      {
        title: "Robô Contestador de Glosas",
        description: "Motor inteligente que identifica a glosa devolvida pelo plano, redige e protocola a petição de recurso de forma 100% autônoma.",
        impact: "Recuperação célere de valores retidos.",
        features: ["Análise de justificativas de negativas", "Geração de minuta de recurso", "Protocolo automático em portais de convênios"]
      },
      {
        title: "Conciliação de Repasses",
        description: "Varredura automática para identificar se o valor pago bate exatamente com a tabela acordada, sinalizando desvios fiscais.",
        impact: "Controle financeiro absoluto sobre as operadoras.",
        features: ["Checagem de taxas administrativas", "Relatório de glosas em aberto", "Integração imediata com ERP médico"]
      }
    ],
    metrics: [
      { value: "-85%", label: "Glosas Perdidas" },
      { value: "Sub-10s", label: "Auditoria de Guia" },
      { value: "+18%", label: "Aumento no Fluxo de Caixa" },
    ],
    demoType: "financial"
  },

  "auditoria-marketplaces": {
    slug: "auditoria-marketplaces",
    title: "SinergIA para Auditoria de Marketplaces",
    shortTitle: "E-commerce & Marketplaces",
    subtitle: "Audite taxas de frete, tarifas variáveis e recupere até 5% do seu faturamento retido nas plataformas.",
    description: "Lojistas que vendem no Mercado Livre, Shopee e Amazon enfrentam um pesadelo financeiro. Nossa IA monitora e audita taxas centavo por centavo, abrindo contestações automáticas contra taxas de frete abusivas e erros de repasse.",
    icon: ShoppingBag,
    color: "fuchsia",
    painPoints: [
      {
        title: "Divergência Crônica de Taxas",
        description: "Plataformas cobrando comissões e fretes em devoluções acima do contratado sem aviso prévio.",
        icon: ShoppingBag,
      },
      {
        title: "Conferência Manual Inviável",
        description: "Equipes perdem centenas de horas cruzando planilhas financeiras gigantescas exportadas de múltiplos marketplaces.",
        icon: ShoppingBag,
      },
      {
        title: "Vazamento Silencioso de Lucro",
        description: "Até 5% do faturamento líquido do lojista some em cobranças indevidas que passam despercebidas.",
        icon: ShoppingBag,
      }
    ],
    solutions: [
      {
        title: "Conciliador de Vendas API-First",
        description: "Agente que roda em tempo real integrado às APIs das plataformas, comparando cada repasse com o ERP interno.",
        impact: "Auditoria precisa de 100% dos pedidos faturados.",
        features: ["Checagem de Taxa Fixa e Variável", "Análise de Frete de Devolução", "Sincronização imediata de ERP"]
      },
      {
        title: "Contestador de Taxas Autônomo",
        description: "Ao identificar uma discrepância de repasse ou cobrança indevida, a IA anexa as provas e abre o chamado de contestação.",
        impact: "Recuperação de receita direto no caixa sem equipe dedicada.",
        features: ["Abertura de chamados via API", "Anexação de relatórios XML", "Acompanhamento de status de disputa"]
      },
      {
        title: "Monitoramento de Margem por SKU",
        description: "Análise analítica de lucratividade real após taxas de marketplace e frete aplicadas a cada produto individual.",
        impact: "Visualização clara do lucro real por mercadoria.",
        features: ["Cálculo de custo de devolução", "Sugestão de reajuste de preço", "Alerta de SKU operando no vermelho"]
      }
    ],
    metrics: [
      { value: "2% a 5%", label: "Faturamento Recuperado" },
      { value: "100%", label: "Repasses Auditados" },
      { value: "Zero", label: "Esforço Manual de Auditoria" },
    ],
    demoType: "financial"
  },

  "juridico-massa": {
    slug: "juridico-massa",
    title: "SinergIA para Advocacia de Massa",
    shortTitle: "Jurídico de Massa & Contencioso",
    subtitle: "Agentes cognitivos que leem Diários Oficiais, elaboram petições padrão e protocolam em segundos.",
    description: "Escritórios de advocacia que lidam com contencioso perdem fortunas com advogados juniores redigindo e protocolando peças simples. A SinergIA automatiza a triagem processual e a redação de minutas com precisão técnica.",
    icon: Scale,
    color: "indigo",
    painPoints: [
      {
        title: "Triagem Lenta de Intimações",
        description: "Prazos em risco pela demora na leitura manual de milhares de Diários Oficiais e sistemas de tribunais.",
        icon: Scale,
      },
      {
        title: "Redação de Peças Repetitivas",
        description: "Advogados qualificados gastando tempo produtivo copiando e colando petições padrão e contestações simples.",
        icon: Scale,
      },
      {
        title: "Jurisprudência Difusa",
        description: "Dificuldade em mapear e cruzar decisões locais e decisões de juízes específicos para embasar defesas.",
        icon: Scale,
      }
    ],
    solutions: [
      {
        title: "Monitor de Diários Oficiais Inteligente",
        description: "Varredura automática e classificação de termos e prazos em intimações, disparando tarefas diretamente no CRM jurídico.",
        impact: "Redução a zero do risco de perda de prazos processuais.",
        features: ["Extração automatizada de termos chave", "Atribuição imediata ao advogado responsável", "Alerta de prioridades de urgência"]
      },
      {
        title: "Copiloto Redator de Petições",
        description: "Agente cognitivo que elabora petições iniciais, recursos e defesas padrão de acordo com as diretrizes do escritório.",
        impact: "Redação de peças em segundos e eliminação do trabalho braçal.",
        features: ["Modelos baseados em IA generativa", "Integração com acervo histórico de peças", "Revisão e conformidade regulatória"]
      },
      {
        title: "Análise Preditiva de Sucesso",
        description: "Cruzamento e leitura de jurisprudência local para estimar a chance de êxito de acordo com o juiz da causa.",
        impact: "Tomada de decisão estratégica sobre acordos comerciais.",
        features: ["Mapeamento de perfil decisório de juízes", "Histórico de decisões de concorrentes", "Relatório estratégico instantâneo"]
      }
    ],
    metrics: [
      { value: "95%", label: "Processos Triados por IA" },
      { value: "Sub-5s", label: "Redação de Petições" },
      { value: "Zero", label: "Prazos Perdidos" },
    ],
    demoType: "support"
  },

  "bpo-financeiro-factoring": {
    slug: "bpo-financeiro-factoring",
    title: "SinergIA para BPO Financeiro & Factoring",
    shortTitle: "BPO Financeiro & Crédito",
    subtitle: "Zere fraudes de duplicatas frias, valide canhotos de entrega por OCR e automatize a conciliação de faturas.",
    description: "FIDCs, Factorings e BPOs operam sob alto estresse de fraudes e verificação documental. A SinergIA implementa OCR avançado e validação automática na SEFAZ para acelerar aprovação de crédito e conciliação bancária.",
    icon: Landmark,
    color: "amber",
    painPoints: [
      {
        title: "Risco de Duplicatas Frias",
        description: "Perigo de antecipar notas fiscais que foram canceladas na SEFAZ ou que não possuem comprovação real de entrega.",
        icon: Landmark,
      },
      {
        title: "Conferência Manual de Canhotos",
        description: "Processo lento de validar canhotos assinados, comprovantes de frete e recibos de logística por humanos.",
        icon: Landmark,
      },
      {
        title: "Conciliação Bancária Atrasada",
        description: "Falta de braço para conciliar extratos e contas a pagar diariamente, gerando atrito no fechamento fiscal.",
        icon: Landmark,
      }
    ],
    solutions: [
      {
        title: "Validador de Notas & Canhotos (OCR)",
        description: "Agente inteligente de visão computacional que analisa assinaturas, extrai dados de canhotos e valida a NF-e direto na SEFAZ.",
        impact: "Aprovação de recebíveis com garantia física de entrega.",
        features: ["Visão computacional para assinaturas", "Consulta direta de chaves na SEFAZ", "Detecção de notas canceladas"]
      },
      {
        title: "Mesa de Crédito Autônoma",
        description: "Análise automatizada de risco do sacado e do cedente em menos de 5 minutos, integrando dados de birôs externos.",
        impact: "Liberação de capital em velocidade competitiva.",
        features: ["Integração com Serasa/Boa Vista", "Análise de histórico de pontualidade", "Cálculo automático de taxa de deságio"]
      },
      {
        title: "Conciliador de Contas Autônomo",
        description: "Lê faturas e extratos, identifica pagamentos entrantes e faz a baixa automática no ERP financeiro da empresa.",
        impact: "BPO financeiro rodando em tempo real com margem alta.",
        features: ["Conciliação Pix e Boletos", "Classificação de plano de contas por IA", "Geração de DRE dinâmica"]
      }
    ],
    metrics: [
      { value: "Sub-5min", label: "Análise de Crédito" },
      { value: "99.8%", label: "Precisão OCR Canhotos" },
      { value: "Zero", label: "Notas Frias Antecipadas" },
    ],
    demoType: "financial"
  },

  "logistica-fretes-comex": {
    slug: "logistica-fretes-comex",
    title: "SinergIA para Logística & Comex",
    shortTitle: "Logística & Comércio Exterior",
    subtitle: "Otimize rotas, audite faturas de fretes e valide documentação aduaneira (BL, Invoice) sem esforço humano.",
    description: "Erros em Commercial Invoices ou atrasos na liberação de mercadorias em portos custam milhares de dólares em multas (demurrage). A SinergIA assume a triagem de documentos de comércio exterior e a auditoria de faturas de fretes B2B.",
    icon: Factory,
    color: "rose",
    painPoints: [
      {
        title: "Burocracia Portuária e Demurrage",
        description: "Atrasos em liberação aduaneira gerados por preenchimento incorreto de documentos como BL e Invoice.",
        icon: Factory,
      },
      {
        title: "Faturas de Frete sem Auditoria",
        description: "Lojistas e indústrias pagam taxas extras abusivas de transportadoras por incapacidade operacional de auditar faturas.",
        icon: Factory,
      },
      {
        title: "Comunicação Caótica WhatsApp",
        description: "Equipes de logística gastando o dia cobrando motoristas, transportadoras e repassando status aos clientes.",
        icon: Factory,
      }
    ],
    solutions: [
      {
        title: "Validador Documental Aduaneiro",
        description: "Agente de processamento de documentos que extrai e valida 100% da papelada de importação e exportação.",
        impact: "Carga liberada sem atrasos fiscais ou multas aduaneiras.",
        features: ["OCR estruturado de Invoice & Packing List", "Classificação Fiscal Automática (NCM)", "Cruzamento com regras da Receita Federal"]
      },
      {
        title: "Auditor de Fretes e Faturas",
        description: "Compara faturas de frete emitidas com a tabela de preços negociada, apontando divergências fiscais.",
        impact: "Bloqueio imediato de cobranças e taxas indevidas.",
        features: ["Mecanismo Triple Match (Nota, Frete e Pedido)", "Relatório automático de divergência", "Sinalização de fretes com quebra de SLA"]
      },
      {
        title: "Operador de Logística no WhatsApp",
        description: "Agente que conversa com motoristas, atualiza status de rotas e responde clientes sobre rastreamento 24h.",
        impact: "Fim das ligações intermináveis solicitando status de carga.",
        features: ["Rastreamento por API de frotas", "Status via WhatsApp estruturado", "Abertura automática de ocorrências em trânsito"]
      }
    ],
    metrics: [
      { value: "Zero", label: "Multas Demurrage" },
      { value: "-90%", label: "Tempo em Validação de Comex" },
      { value: "100%", label: "Faturas de Frete Auditadas" },
    ],
    demoType: "support"
  },

  "recuperacao-credito": {
    slug: "recuperacao-credito",
    title: "SinergIA para Recuperação de Crédito",
    shortTitle: "Cobrança Ativa & Recuperação",
    subtitle: "Substitua call centers caros por agentes autônomos de negociação que geram Pix e boletos no WhatsApp.",
    description: "Empresas perdem milhões de faturamento com inadimplência e custos de assessorias de cobrança ineficientes. A SinergIA implementa agentes de negociação ativos focados em recuperação de crédito amigável e de alta conversão.",
    icon: Briefcase,
    color: "cyan",
    painPoints: [
      {
        title: "Ligações de Cobrança Ignoradas",
        description: "Call centers ligando de números desconhecidos geram taxas de atendimento de menos de 8% dos contatos.",
        icon: Briefcase,
      },
      {
        title: "Custo Elevado de Operação",
        description: "Salários de operadores, turnover alto e licenças de discadores inchando os custos de recuperação de crédito.",
        icon: Briefcase,
      },
      {
        title: "Abordagens Frias Ineficazes",
        description: "Disparos automáticos de SMS e e-mails frios que não dão poder de negociação real ou flexibilidade ao devedor.",
        icon: Briefcase,
      }
    ],
    solutions: [
      {
        title: "Agente Negociador Inteligente",
        description: "Aborda o inadimplente de forma humanizada via WhatsApp ou voz, quebra objeções e oferece parcelamento flexível.",
        impact: "Aumento de até 35% na conversão de acordos de dívidas.",
        features: ["Negociação baseada em margem de desconto", "Adequação cultural e tom amigável", "Integração direta com CRM de cobrança"]
      },
      {
        title: "Geração de Pix & Baixa Bancária",
        description: "Gera links de Pix copia-e-cola em tempo real e acompanha até a efetivação, dando baixa instantânea no sistema financeiro.",
        impact: "Arrecadação líquida e imediata no caixa da empresa.",
        features: ["Criação dinâmica de chaves Pix", "Geração de boletos atualizados", "Envio automatizado de recibo de quitação"]
      },
      {
        title: "Régua de Comunicação Preditiva",
        description: "IA que analisa o histórico e comportamento do devedor para determinar o melhor canal, tom e horário de abordagem.",
        impact: "Abordagem cirúrgica e menor taxa de bloqueio.",
        features: ["Machine learning para horários de conversão", "Roteamento inteligente multicanal", "Evita contato abusivo de cobrança"]
      }
    ],
    metrics: [
      { value: "+35%", label: "Acordos Fechados" },
      { value: "-80%", label: "Custo Operacional de SAC" },
      { value: "100%", label: "Abordagem Amigável (Compliance)" },
    ],
    demoType: "sales"
  }
}

export const getAllNiches = () => Object.values(nichesData)
export const getNicheBySlug = (slug: string) => nichesData[slug]
