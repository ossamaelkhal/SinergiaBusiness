import { Stethoscope, ShoppingBag, Scale, Landmark, Factory, Briefcase, Activity } from 'lucide-react'

export interface AutomaçãoHook {
  title: string
  description: string
}

export interface SubNicheGroup {
  pequenosAlvos: string[]
  grandesAlvos: string[]
}

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
  subNicheGroup: SubNicheGroup
  hooks: {
    pilotoAutomatico: AutomaçãoHook
    resgateAtivo: AutomaçãoHook
    backoffice: AutomaçãoHook
  }
}

export const nichesData: Record<string, NicheSolution> = {
  "faturamento-saude-bemestar": {
    slug: "faturamento-saude-bemestar",
    title: "SinergIA para Saúde, Estética e Bem-Estar",
    shortTitle: "Saúde & Bem-Estar",
    subtitle: "Elimine cadeiras vazias, reengaje pacientes inativos e automatize a validação de guias médicos.",
    description: "Clínicas e profissionais de saúde sofrem um sangramento financeiro silencioso com agendas ociosas e pacientes antigos que não concluem tratamentos. A SinergIA cria um fluxo automático de atendimento e confirmação ultra-humanizada.",
    icon: Stethoscope,
    color: "emerald",
    painPoints: [
      {
        title: "Cadeira Vazia e Ociosidade",
        description: "Agendas com buracos e faltas de última hora que destroem o faturamento diário.",
        icon: Activity,
      },
      {
        title: "Abandono de Tratamento",
        description: "Pacientes iniciam um procedimento, mas não são acompanhados e acabam não retornando.",
        icon: Activity,
      },
      {
        title: "Glosas e Burocracia de Convênios",
        description: "Erros de digitação e regras complexas de planos de saúde que retêm o caixa da clínica.",
        icon: Activity,
      }
    ],
    metrics: [
      { value: "Sub-2%", label: "Faltas (No-Show)" },
      { value: "+30%", label: "Retorno de Inativos" },
      { value: "90%", label: "Redução de Glosas" },
    ],
    demoType: "scheduling",
    subNicheGroup: {
      pequenosAlvos: [
        "Autônomos de Saúde (Nutricionistas, Psicólogos, Fisioterapeutas)",
        "Clínicas de Estética e Clínicas Odontológicas de Bairro",
        "Studios de Pilates, Ioga e Treinamento Funcional",
        "Fonoaudiologia e Clínicas de Terapias Especializadas (TEA)"
      ],
      grandesAlvos: [
        "Clínicas de Vacinação Humana",
        "Hospitais e Redes de Franquias Médicas",
        "Laboratórios de Análises Clínicas e Imagem"
      ]
    },
    hooks: {
      pilotoAutomatico: {
        title: "O Guardião da Agenda",
        description: "Inteligência de agendamento ativo fluido (conversacional, não numérico) que qualifica leads do Instagram/WhatsApp 24/7, gerencia as reposições e executa réguas de confirmação de consultas de forma natural e empática."
      },
      resgateAtivo: {
        title: "O Reengajador de Pacientes",
        description: "Agente autônomo que monitora o tempo médio de tratamento e reengaja pacientes sumidos antes que eles entrem em abandono, estimulando novas consultas e retornos programados."
      },
      backoffice: {
        title: "O Auditor de Guias Médico",
        description: "Auditoria médica digital de guias e prontuários para zerar glosas de convênios, validando códigos TISS/TUSS em tempo real antes do envio."
      }
    }
  },

  "commerce-omnichannel-vendas": {
    slug: "commerce-omnichannel-vendas",
    title: "SinergIA para Comércio, Varejo & Marketplaces",
    shortTitle: "Varejo & E-commerce",
    subtitle: "Feche vendas no Direct em segundos, audite taxas de frete e automatize mesas de cotação de atacadistas.",
    description: "Lojas físicas e e-commerces perdem vendas quando o cliente demora mais de 10 minutos para ser atendido. Nossa IA assume o balcão digital de ponta a ponta e audita todas as tarifas invisíveis do varejo moderno.",
    icon: ShoppingBag,
    color: "fuchsia",
    painPoints: [
      {
        title: "Fricção e Demora no Atendimento",
        description: "Clientes desistem de comprar no Direct ou WhatsApp se a resposta sobre frete ou tamanho não for instantânea.",
        icon: Activity,
      },
      {
        title: "Vazamento de Margem nos Marketplaces",
        description: "Cobranças indevidas de frete em devoluções e discrepâncias de repasse que comem o lucro líquido.",
        icon: Activity,
      },
      {
        title: "Digitação Manual de Orçamentos",
        description: "Vendedores de atacadistas perdendo horas digitando listas de compras rabiscadas no papel.",
        icon: Activity,
      }
    ],
    metrics: [
      { value: "Sub-10s", label: "Tempo de Resposta" },
      { value: "2% a 5%", label: "Margem Recuperada" },
      { value: "1 min", label: "Cotação de Listas" },
    ],
    demoType: "sales",
    subNicheGroup: {
      pequenosAlvos: [
        "Lojas de Roupas, Calçados e E-commerce locais (Instagram/Direct)",
        "Ateliês de Costura, Sapatarias e Consertos",
        "Distribuidoras e Atacadistas locais de alimentos e insumos"
      ],
      grandesAlvos: [
        "Redes de Franquias (Moda, Beleza e Alimentação)",
        "Lojistas Multi-Marketplace de Grande Escala (Mercado Livre, Shopee, Amazon)"
      ]
    },
    hooks: {
      pilotoAutomatico: {
        title: "O Vendedor de Pista",
        description: "Monitoramento contínuo de directs e comentários com fechamento automático de carrinho, cálculo de frete (CEP) integrado e emissão de Pix copia-e-cola de forma 100% autônoma."
      },
      resgateAtivo: {
        title: "O Auditor Algorítmico",
        description: "Conciliação centavo por centavo de taxas de marketplaces e auditoria cruzada de royalties ocultos para franqueadores (cruzando vendas fiscais NFC-e com compras de fornecedores homologados)."
      },
      backoffice: {
        title: "A Mesa de Cotação Ativa",
        description: "Processamento por visão computacional (OCR) de listas de compras enviadas por áudio, texto ou foto de papel por clientes de distribuidoras, gerando o carrinho no ERP em 1 minuto."
      }
    }
  },

  "operacoes-urgencia-logistica": {
    slug: "operacoes-urgencia-logistica",
    title: "SinergIA para Operações de Urgência, Logística & Infraestrutura",
    shortTitle: "Logística & Urgência",
    subtitle: "Despache pedidos em segundos, controle frotas e previna multas aduaneiras sem intervenção manual.",
    description: "Em operações logísticas e de urgência, a velocidade de despacho decide quem fecha a venda. Nossa IA elimina o telefone e o papel, automatizando da roteirização de urgência até a validação aduaneira.",
    icon: Factory,
    color: "rose",
    painPoints: [
      {
        title: "Gargalo no Fechamento de Urgência",
        description: "Negócios de entrega e disk-serviços perdem vendas por demora na triagem do endereço e do entregador.",
        icon: Activity,
      },
      {
        title: "Inatividade de Equipamentos e Frotas",
        description: "Máquinas paradas sem aviso de revisão e devoluções em atraso causam ociosidade financeira.",
        icon: Activity,
      },
      {
        title: "Canal Vermelho Alfandegário",
        description: "Atrasos caríssimos na liberação de importações por erros simples de Packing List e Invoices.",
        icon: Activity,
      }
    ],
    metrics: [
      { value: "Sub-30s", label: "Tempo de Despacho" },
      { value: "Zero", label: "Ociosidade de Ativos" },
      { value: "100%", label: "Documentos Auditados" },
    ],
    demoType: "support",
    subNicheGroup: {
      pequenosAlvos: [
        "Delivery e Gastronomia Local (WhatsApp Ordering)",
        "Disk-Gás e Entrega de Água Mineral",
        "Empresas de Mudanças, Fretes e Carretos locais",
        "Locação de Caçambas Entulho e Andaimes"
      ],
      grandesAlvos: [
        "Despacho Aduaneiro, Comex e Empresas de Trading",
        "Locadoras de Frotas de Veículos e Equipamentos Industriais (Yellow Goods)"
      ]
    },
    hooks: {
      pilotoAutomatico: {
        title: "O Despachante Expresso",
        description: "Triagem e fechamento de pedidos de urgência sem menu numérico, integrando dados de endereço históricos do cliente para despachar entregadores em menos de 30 segundos."
      },
      resgateAtivo: {
        title: "O Monitor Preditivo de Ativos",
        description: "Gestão preditiva de prazos de locação de caçambas/maquinários e agendamento de manutenção de frotas por telemetria (IoT) antes que gerem inatividade financeira."
      },
      backoffice: {
        title: "O Validador Documental Aduaneiro",
        description: "OCR avançado de Commercial Invoices e Packing Lists cruzando com regras da Receita Federal para eliminar canais vermelhos alfandegários."
      }
    }
  },

  "bpo-financeiro-credito-tem": {
    slug: "bpo-financeiro-credito-tem",
    title: "SinergIA para BPO Estratégico, Crédito & Finanças",
    shortTitle: "BPO & Finanças",
    subtitle: "Zere cobranças indevidas de contas de consumo, audite LMC diário e libere crédito em 5 minutos.",
    description: "Setores financeiros tradicionais são lentos e propensos a fraudes. A SinergIA implementa agentes cognitivos no backoffice para auditar faturas corporativas de utilities e validar duplicatas na SEFAZ.",
    icon: Landmark,
    color: "amber",
    painPoints: [
      {
        title: "Fraudes e Duplicatas Frias",
        description: "Risco na antecipação de recebíveis sem garantia fiscal real de entrega física do produto.",
        icon: Activity,
      },
      {
        title: "Contas de Consumo Inchadas",
        description: "Telecom, energia e água cobrando taxas de serviços não contratados sem auditoria corporativa.",
        icon: Activity,
      },
      {
        title: "Multas Fiscais de Postos",
        description: "Preenchimento manual diário de Livros de Movimentação de Combustível (LMC) com erros de estoque.",
        icon: Activity,
      }
    ],
    metrics: [
      { value: "Sub-5min", label: "Aprovação de Crédito" },
      { value: "-15% a -30%", label: "Economia de Utilities" },
      { value: "Zero", label: "Multas ANP (LMC)" },
    ],
    demoType: "financial",
    subNicheGroup: {
      pequenosAlvos: [
        "Oficinas Mecânicas e Centros Automotivos de Bairro",
        "Contabilidade de Postos de Combustíveis (LMC Diário)"
      ],
      grandesAlvos: [
        "Empresas de Factoring / FIDCs (Antecipação de Recebíveis)",
        "Médias Empresas com alta conta de Consumo (TEM - Telecom/Energia/Água)"
      ]
    },
    hooks: {
      pilotoAutomatico: {
        title: "O Auditor de Utilities",
        description: "Leitura em lote de faturas complexas de telecomunicações, energia e água, abrindo contestações automáticas nos portais das operadoras ao detectar tarifas indevidas."
      },
      resgateAtivo: {
        title: "O Conciliador de Pista",
        description: "Conciliação diária de pista de postos de combustível (LMC) cruzando tanques, encerrantes e notas fiscais para zerar multas da ANP."
      },
      backoffice: {
        title: "A Mesa de Crédito Digital",
        description: "Análise de conformidade e mesa de crédito digital para Factoring em 5 minutos, validando NF-e direto na SEFAZ e checando assinaturas em canhotos de entrega."
      }
    }
  },

  "servicos-tecnicos-comerciais": {
    slug: "servicos-tecnicos-comerciais",
    title: "SinergIA para Serviços Residenciais, Técnicos e Comerciais",
    shortTitle: "Serviços Técnicos",
    subtitle: "Orce projetos pelo WhatsApp com fotos, acelere trocas de carros e coordene escalas de facilities.",
    description: "Profissionais técnicos de alto valor perdem o dia no trabalho operacional e deixam o comercial abandonado. A SinergIA automatiza a triagem, cotação prévia e gestão de mão de obra de ponta a ponta.",
    icon: Briefcase,
    color: "cyan",
    painPoints: [
      {
        title: "Abandono da Mesa Comercial",
        description: "Profissionais de alto ticket que passam o dia no campo e perdem orçamentos de novos clientes.",
        icon: Activity,
      },
      {
        title: "Mesa de Troca Lenta",
        description: "Avaliação demorada de veículos usados na troca de seminovos, atrasando vendas de carros.",
        icon: Activity,
      },
      {
        title: "Controle Caótico de Escalas",
        description: "Facilities lidando com faltas de última hora e atestados em postos terceirizados de portaria e limpeza.",
        icon: Activity,
      }
    ],
    metrics: [
      { value: "+4x", label: "Capacidade de Propostas" },
      { value: "Sub-60s", label: "Mesa de Troca Usados" },
      { value: "95%", label: "Eficiência de Escala" },
    ],
    demoType: "sales",
    subNicheGroup: {
      pequenosAlvos: [
        "Construtoras e Marcenarias Sob Medida",
        "Empresas de Dedetização e Desentupimento",
        "Estúdios de Tatuagem e Body Art",
        "Concessionárias e Lojas de Seminovos Multimarcas"
      ],
      grandesAlvos: [
        "Empresas de Terceirização de Mão de Obra (Facilities, Limpeza, Segurança)"
      ]
    },
    hooks: {
      pilotoAutomatico: {
        title: "O Orçamentista Técnico de Pista",
        description: "Coleta de fotos/medidas do cliente via WhatsApp, qualificação do projeto, cálculo instantâneo baseado em tabelas de materiais e agendamento da visita do técnico apenas para fechamento do contrato."
      },
      resgateAtivo: {
        title: "O Avaliador de Veículos",
        description: "Birô de dados integrado para concessionárias, fazendo consultas automáticas de placas, sinistros, leilões e tabela FIPE em segundos para acelerar a mesa de troca de seminovos."
      },
      backoffice: {
        title: "O Coordenador de Escalas",
        description: "Controle automático de escalas, faltas e validação de atestados (OCR) via WhatsApp para trabalhadores terceirizados descentralizados."
      }
    }
  },

  "reputacao-recuperacao-retencao": {
    slug: "reputacao-recuperacao-retencao",
    title: "SinergIA para Reputação, Recuperação & CS de Alta Conversão",
    shortTitle: "Reputação & Cobrança",
    subtitle: "Proteja sua marca no Reclame Aqui, recupere inadimplentes e audite chargebacks automaticamente.",
    description: "Resolva queixas antes que vire crise e resgate receitas de clientes inadimplentes. A SinergIA une análise de sentimentos e automação bancária para reter fluxo de caixa e blindar a imagem pública.",
    icon: Scale,
    color: "indigo",
    painPoints: [
      {
        title: "Danos à Reputação Pública",
        description: "Reclamações públicas em fóruns como Reclame Aqui sem resposta imediata do time de CS.",
        icon: Activity,
      },
      {
        title: "Inadimplência Crônica",
        description: "Atrasos recorrentes de pagamentos em escolas livres que exigem cobrança desconfortável e demorada.",
        icon: Activity,
      },
      {
        title: "Fraudes e Chargebacks",
        description: "Contestações indevidas de compras em portais de eventos que sugam a receita pós-show.",
        icon: Activity,
      }
    ],
    metrics: [
      { value: "Sub-5min", label: "Resposta a Reclamações" },
      { value: "+35%", label: "Acordos Recuperados" },
      { value: "80%", label: "Defesa de Chargebacks" },
    ],
    demoType: "support",
    subNicheGroup: {
      pequenosAlvos: [
        "Pequenas Agências de Marketing e Design local",
        "Pequenas Escolas de Música, Dança e Cursos Livres",
        "Academias de Bairro e Box de Crossfit (Mensalidades)"
      ],
      grandesAlvos: [
        "Grandes Marcas e E-commerces (Reclame Aqui / Procon)",
        "Plataformas de Grandes Eventos, Shows e Bilheterias"
      ]
    },
    hooks: {
      pilotoAutomatico: {
        title: "O Agente de Reputação e Resolução",
        description: "Monitoramento em tempo real do Reclame Aqui e Redes Sociais, cruzando o CPF do reclamante com o ERP interno por API, executando a solução (ex: liberar estorno) e redigindo respostas públicas humanizadas em minutos."
      },
      resgateAtivo: {
        title: "O Cobrador de Linha",
        description: "Réguas ativas de cobrança de inadimplentes para escolas e assinaturas locais, negociando descontos permitidos e emitindo a chave Pix atualizada de forma amigável e profissional."
      },
      backoffice: {
        title: "O Defensor de Bilheteria",
        description: "Triagem algorítmica de chargebacks e fraudes em plataformas de bilheteria, coletando provas de entrega do serviço para travar disputas bancárias automaticamente."
      }
    }
  }
}

export const getAllNiches = () => Object.values(nichesData)
export const getNicheBySlug = (slug: string) => nichesData[slug]
