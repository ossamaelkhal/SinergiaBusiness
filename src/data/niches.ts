import { Stethoscope, ShoppingBag, Scale, Landmark, Factory, Briefcase, Activity, Home } from 'lucide-react'

export interface AutomaçãoHook {
  title: string
  description: string
}

export interface SubNicheGroup {
  pequenosAlvos: string[]
  grandesAlvos: string[]
}

export interface NicheMetrics {
  avgTicket: number;         // Ticket médio em R$
  currentCAC: number;        // CAC atual antes da SinergIA em R$
  projectedCAC: number;      // CAC projetado com automação autônoma em R$
  estimatedLatency: number;  // Tempo de resposta original da equipe humana (segundos)
  optimizedLatency: number;  // Tempo de resposta da IA da SinergIA (segundos)
  teamCosts: number;         // Custo mensal de equipe em R$
  defaultRate: number;       // Taxa de inadimplência em porcentagem (ex: 3.5)
  leadsPerMonth: number;     // Volume de Leads/mês
  billedRevenue: number;     // Faturamento Faturado/mês
  coldLeadsBase: number;     // Base inativa
  humanTurnoverRate: number;     // Taxa de rotatividade humana (%)
  crmDataErrorRate: number;      // Taxa de erros em dados no CRM (%)
  legacyStackCostPerRep: number; // Custo mensal de ferramentas legadas por atendente (R$)
  leadsHumanCapacity: number;    // Volume máximo de leads atendidos por vendedor/mês
}

export interface BehavioralFriction {
  name: string;             // ex: 'Lead Cherry-Picking'
  rate: number;             // ex: 35 (%)
  impactDescription: string; // ex: 'Corretores ignoram 35% de leads de menor ticket...'
}

export interface SinergiaBlueprint {
  id: string;               // ex: 'omni-interceptor'
  name: string;             // ex: 'Roleta de Corretores Dinâmica & Qualificação Cognitiva'
  description: string;      // ex: 'Interceptação e qualificação automática...'
}

export interface OperationalDNA {
  friction: BehavioralFriction;
  recommendedBlueprints: SinergiaBlueprint[];
  activeFlowNetworks: string[]; // ex: ['Intercepção e Resgate 24/7', 'Backoffice e Conciliação']
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
  headline?: string;
  featuresFreePlaybook?: string[];
  financialMetrics: NicheMetrics;
  operationalDNA: OperationalDNA;
}

export const nichesData: Record<string, NicheSolution> = {
  "faturamento-saude-bemestar": {
    slug: "faturamento-saude-bemestar",
    title: "SinergIA para Saúde, Estética de Alto Padrão e Clínicas",
    shortTitle: "Saúde & Bem-Estar",
    subtitle: "Lote sua agenda com procedimentos de alto ticket, reduza o no-show a quase zero e acabe com o desperdício de leads na recepção.",
    description: "O faturamento da sua clínica está refém de duas variáveis caóticas: o esquecimento dos pacientes e a lentidão humana na recepção. Enquanto você opera ou atende, leads quentes esfriam no WhatsApp e tratamentos antigos são abandonados por falta de acompanhamento. Instalamos uma Clonagem Cognitiva da sua melhor secretária para blindar seu caixa.",
    icon: Stethoscope,
    color: "emerald",
    headline: "Transforme Leads de Clínicas em Procedimentos Agendados em Segundos",
    featuresFreePlaybook: [
      "Confirmação automatizada de consultas via WhatsApp",
      "Resgate de pacientes inativos com IA",
      "Auditoria de guias TISS/TUSS"
    ],
    financialMetrics: {
      avgTicket: 1500,
      currentCAC: 250,
      projectedCAC: 70,
      estimatedLatency: 7200, // 2 horas humanas
      optimizedLatency: 30,   // 30 segundos da IA
      teamCosts: 12000,       // 3 secretárias * R$ 4.000
      defaultRate: 5.0,       // 5% de inadimplência
      leadsPerMonth: 400,
      billedRevenue: 100000,
      coldLeadsBase: 2500,
      humanTurnoverRate: 25,
      crmDataErrorRate: 12,
      legacyStackCostPerRep: 250,
      leadsHumanCapacity: 150
    },
    painPoints: [
      {
        title: "Cadeira Vazia e No-Show",
        description: "Horas ociosas e faltas de última hora que destroem o faturamento diário e jogam o seu custo de tráfego pago no lixo.",
        icon: Activity,
      },
      {
        title: "O Cemitério de Leads no WhatsApp",
        description: "Pacientes prontos para agendar que desistem e vão para o concorrente porque sua recepção demorou mais de 5 minutos para responder.",
        icon: Activity,
      },
      {
        title: "Asfixia por Glosas de Convênios",
        description: "Erros manuais e burocracias de planos de saúde que retêm e sangram o fluxo de caixa legítimo da sua clínica.",
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
        description: "Agente conversacional ultra-humanizado que qualifica leads do Instagram e WhatsApp 24/7, gerencia reposições de faltas e executa réguas de confirmação empáticas sem usar menus numéricos frios."
      },
      resgateAtivo: {
        title: "O Reengajador de Pacientes",
        description: "Monitor inteligente que rastreia o tempo médio de tratamento e aciona pacientes sumidos de forma personalizada, estimulando o retorno e novos fechamentos de pacotes."
      },
      backoffice: {
        title: "O Auditor de Guias TISS/TUSS",
        description: "Inteligência de retaguarda que valida prontuários e códigos em tempo real antes do envio, eliminando glosas e liberando o dinheiro retido pelos convênios."
      }
    },
    operationalDNA: {
      friction: {
        name: 'Discovery No-Show Rate',
        rate: 28,
        impactDescription: 'Pacientes esquecem de comparecer ou desmarcar consultas, gerando 28% de ociosidade operacional nas salas médicas'
      },
      recommendedBlueprints: [
        {
          id: 'agenda-guardian',
          name: 'Blueprint Guardião da Agenda & Triagem Conversacional',
          description: 'Confirmação e reagendamento de consultas via linguagem natural fluida, com preenchimento automático de ociosidades.'
        }
      ],
      activeFlowNetworks: ['Intercepção e Resgate 24/7', 'Validação Documental']
    }
  },

  "commerce-omnichannel-vendas": {
    slug: "commerce-omnichannel-vendas",
    title: "SinergIA para Comércio, Varejo de Escala & Marketplaces",
    shortTitle: "Varejo & E-commerce",
    subtitle: "Capture o dinheiro do seu cliente no exato segundo da intenção de compra. Elimine a demora no WhatsApp e recupere margem confiscada.",
    description: "No varejo moderno, velocidade não é diferencial: é faturamento líquido. Se sua operação demora para passar o valor do frete, confirmar estoque ou enviar um link de pagamento, o cliente compra de outra loja. Nossa IA assume o balcão digital 24/7 e faz auditoria cruzada centavo por centavo de taxas ocultas.",
    icon: ShoppingBag,
    color: "fuchsia",
    headline: "Recupere Margem Confiscada e Resgate Vendas no Segundo Zero",
    featuresFreePlaybook: [
      "Resgate de carrinho abandonado com cupom dinâmico",
      "Atendimento de Direct do Instagram integrado com ERP",
      "Cotação de listas de compras por foto"
    ],
    financialMetrics: {
      avgTicket: 350,
      currentCAC: 80,
      projectedCAC: 22,
      estimatedLatency: 2400, // 40 mins
      optimizedLatency: 10,   // 10 segundos da IA
      teamCosts: 12000,       // 3 vendedores * R$ 4.000
      defaultRate: 4.0,       // 4% de inadimplência
      leadsPerMonth: 800,
      billedRevenue: 120000,
      coldLeadsBase: 3500,
      humanTurnoverRate: 35,
      crmDataErrorRate: 18,
      legacyStackCostPerRep: 150,
      leadsHumanCapacity: 250
    },
    painPoints: [
      {
        title: "A Fricção que Mata Vendas",
        description: "Carrinhos e directs abandonados porque o cliente não recebeu resposta sobre tamanho, cor ou frete em menos de 60 segundos.",
        icon: Activity,
      },
      {
        title: "O Confisco de Margem Oculto",
        description: "Taxas abusivas de marketplaces, cobranças indevidas de frete indevido em devoluções e erros de repasse que engolem seu lucro sem você perceber.",
        icon: Activity,
      },
      {
        title: "Desperdício Humano em Orçamentos",
        description: "Seu time comercial perdendo horas valiosas digitando e decifrando listas de compras rabiscadas em papel ou áudios longos.",
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
        title: "O Vendedor de Pista Digital",
        description: "Atendimento instantâneo de Directs e WhatsApp com fechamento de carrinho automático, cálculo de CEP integrado por API e disparo de Pix copia-e-cola em 10 segundos."
      },
      resgateAtivo: {
        title: "O Conciliador Algorítmico",
        description: "Robô de auditoria que cruza vendas fiscais (NFC-e) com repasses de gateways e marketplaces, caçando cobranças indevidas para recuperar seu lucro confiscado."
      },
      backoffice: {
        title: "A Mesa de Cotação Autônoma",
        description: "Processamento por visão computacional (OCR) de listas de compras enviadas por foto ou áudio, gerando o pedido pronto no ERP em menos de um minuto."
      }
    },
    operationalDNA: {
      friction: {
        name: 'Latency Decay Factor',
        rate: 42,
        impactDescription: 'Demora no WhatsApp faz com que 42% dos compradores migrem para concorrentes em menos de 5 minutos'
      },
      recommendedBlueprints: [
        {
          id: 'omni-checkout-rescuing',
          name: 'Blueprint Resgate Transacional Omnichannel',
          description: 'Acionamento de leads de carrinho abandonado com propostas empáticas integradas ao ERP'
        }
      ],
      activeFlowNetworks: ['Intercepção e Resgate 24/7']
    }
  },

  "operacoes-urgencia-logistica": {
    slug: "operacoes-urgencia-logistica",
    title: "SinergIA para Operações de Urgência, Logística & Distribuição",
    shortTitle: "Logística & Urgência",
    subtitle: "Despache ordens de serviço em segundos, elimine a ociosidade da frota e blinde sua operação contra latências e falhas manuais.",
    description: "Em operações de urgência e logística, o tempo de resposta decide quem fica com o contrato. Centralizar o recebimento em telefones ou planilhas cria um gargalo perigoso que limita sua escala. Nossa infraestrutura assume a triagem de rotas, controle preditivo de ativos e auditoria documental sem intervenção manual.",
    icon: Factory,
    color: "rose",
    headline: "Logística Inteligente: Despacho de Ordens de Serviço em 20 Segundos",
    featuresFreePlaybook: [
      "Triagem e roteirização autônoma de entregas",
      "Monitor preditivo de devolução de frotas",
      "Validador automático de faturas e invoices aduaneiras"
    ],
    financialMetrics: {
      avgTicket: 4500,
      currentCAC: 850,
      projectedCAC: 250,
      estimatedLatency: 3600, // 1 hora
      optimizedLatency: 20,   // 20 segundos da IA
      teamCosts: 25000,       // 5 operadores * R$ 5.000
      defaultRate: 3.5,       // 3.5% de inadimplência
      leadsPerMonth: 300,
      billedRevenue: 300000,
      coldLeadsBase: 2000,
      humanTurnoverRate: 20,
      crmDataErrorRate: 15,
      legacyStackCostPerRep: 400,
      leadsHumanCapacity: 120
    },
    painPoints: [
      {
        title: "O Gargalo do Despacho Humano",
        description: "Perda de ordens de serviço urgentes e cancelamentos de fretes devido à demora na triagem de endereços e alocação de motoristas.",
        icon: Activity,
      },
      {
        title: "A Asfixia da Frota Parada",
        description: "Maquinários e veículos ociosos, prazos de locação estourados sem aviso e falhas de manutenção que paralisam a receita.",
        icon: Activity,
      },
      {
        title: "A Retenção no Canal Vermelho",
        description: "Atrasos fiscais e multas pesadas causadas por erros simples de digitação em Packing Lists e faturas de comércio exterior.",
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
        description: "Triagem conversacional instantânea de chamados e coletas por geolocalização, cruzando históricos e acionando o operador ideal em menos de 30 segundos."
      },
      resgateAtivo: {
        title: "O Monitor Preditivo de Frotas",
        description: "Agente conectado via telemetria e contratos que previne a ociosidade de ativos, cobrando devoluções e agendando revisões antes que causem prejuízo."
      },
      backoffice: {
        title: "O Guardião Documental Aduaneiro",
        description: "Leitura algorítmica e cruzamento de Invoices com as regras fiscais vigentes para detectar inconsistências e aprovar documentações em massa para evitar travas aduaneiras."
      }
    },
    operationalDNA: {
      friction: {
        name: 'Manual Route Allocation Overhead',
        rate: 30,
        impactDescription: 'Demora manual na triagem de endereços e despacho de coletas urgentes causa 30% de atraso e ociosidade de frota'
      },
      recommendedBlueprints: [
        {
          id: 'logistics-router',
          name: 'Blueprint Roteirização e Triagem de Ordens',
          description: 'Roteirização preditiva e alocação de motoristas baseada em contexto geolocalizado em 20s'
        }
      ],
      activeFlowNetworks: ['Intercepção e Resgate 24/7', 'Backoffice e Conciliação']
    }
  },

  "bpo-financeiro-credito-tem": {
    slug: "bpo-financeiro-credito-tem",
    title: "SinergIA para BPO Estratégico, Crédito & Auditoria de Finanças",
    shortTitle: "BPO & Finanças",
    subtitle: "Zere fraudes em antecipações de crédito, conteste a extorsão em faturas de consumo e blinde sua margem de lucro.",
    description: "O backoffice financeiro tradicional é lento, caro e vulnerável a falhas. A SinergIA insere agentes cognitivos de alta performance na retaguarda da sua empresa para auditar contas de utilities (energia, telecom), validar notas fiscais diretamente na SEFAZ e liberar crédito de forma segura.",
    icon: Landmark,
    color: "amber",
    headline: "Mesa de Crédito Autônoma e Auditoria de Contas Sem Erro Humano",
    featuresFreePlaybook: [
      "Leitor automático de faturas de utilities",
      "Auditoria de canhotos de entrega por OCR",
      "Análise cadastral para liberação de crédito rápido"
    ],
    financialMetrics: {
      avgTicket: 8500,
      currentCAC: 1500,
      projectedCAC: 400,
      estimatedLatency: 10800, // 3 horas
      optimizedLatency: 60,    // 60 segundos da IA
      teamCosts: 18000,       // 3 analistas * R$ 6.000
      defaultRate: 6.0,       // 6% de inadimplência
      leadsPerMonth: 200,
      billedRevenue: 500000,
      coldLeadsBase: 1500,
      humanTurnoverRate: 15,
      crmDataErrorRate: 8,
      legacyStackCostPerRep: 500,
      leadsHumanCapacity: 80
    },
    painPoints: [
      {
        title: "A Armadilha das Duplicatas Frias",
        description: "Alto risco e prejuízos com antecipação de recebíveis baseados em notas fiscais sem garantia real de entrega física.",
        icon: Activity,
      },
      {
        title: "A Extorsão das Faturas de Consumo",
        description: "Cobranças abusivas de energia, água e telecomunicações contendo taxas de serviços não contratados que passam sem auditoria.",
        icon: Activity,
      },
      {
        title: "O Pesadelo Fiscal do LMC",
        description: "Erros manuais diários no preenchimento do Livro de Movimentação de Combustível em postos, gerando multas brutais da ANP.",
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
        title: "O Predador de Tarifas Abusivas",
        description: "Leitura em lote de faturas de concessionárias, identificação de desvios contratuais e abertura automática de contestações jurídicas nos portais de utilities."
      },
      resgateAtivo: {
        title: "O Conciliador de Pista ANP",
        description: "Automação fiscal diária para postos de combustíveis, cruzando tanques, encerrantes e notas de entrada para gerar o LMC com zero erro e risco zero de multa."
      },
      backoffice: {
        title: "A Mesa de Crédito Expresso",
        description: "Análise inteligente para Factoring e FIDCs que valida a NF-e na SEFAZ, audita assinaturas em canhotos de entrega por visão computacional e aprova crédito em 5 minutos."
      }
    },
    operationalDNA: {
      friction: {
        name: 'Duplicate/Fraud Invoicing Rate',
        rate: 15,
        impactDescription: '15% de notas fiscais antecipadas possuem inconsistências de canhotos ou assinaturas falsas sem auditoria'
      },
      recommendedBlueprints: [
        {
          id: 'credit-desk-ocr',
          name: 'Blueprint Auditoria e Liberação de Mesa de Crédito',
          description: 'Mesa de análise instantânea que cruza canhotos de entrega via visão computacional e notas na SEFAZ'
        }
      ],
      activeFlowNetworks: ['Backoffice e Conciliação']
    }
  },

  "servicos-tecnicos-comerciais": {
    slug: "servicos-tecnicos-comerciais",
    title: "SinergIA para Empresas de Serviços Técnicos, Engenharia e Facilities",
    shortTitle: "Serviços Técnicos",
    subtitle: "Gere orçamentos automáticos pelo WhatsApp por foto, multiplique sua capacidade comercial e coordene equipes sem caos.",
    description: "Empresas de serviços de alto ticket sofrem com a divisão do fundador: ou ele está no campo executando e coordenando a equipe, ou está no escritório vendendo. A SinergIA resolve o abandono comercial assumindo a triagem técnica, cálculo de propostas por tabelas e coordenação de escalas descentralizadas.",
    icon: Briefcase,
    color: "cyan",
    headline: "Cotações e Orçamentos Técnicos no WhatsApp em Tempo Real",
    featuresFreePlaybook: [
      "Orçamentista autônomo por WhatsApp",
      "Validador e consulta de laudos automotivos",
      "Escalonador inteligente de facilities e atestados"
    ],
    financialMetrics: {
      avgTicket: 12000,
      currentCAC: 2000,
      projectedCAC: 550,
      estimatedLatency: 14400, // 4 horas
      optimizedLatency: 45,    // 45 segundos da IA
      teamCosts: 22000,       // 4 técnicos * R$ 5.500
      defaultRate: 4.5,       // 4.5% de inadimplência
      leadsPerMonth: 250,
      billedRevenue: 400000,
      coldLeadsBase: 1800,
      humanTurnoverRate: 22,
      crmDataErrorRate: 14,
      legacyStackCostPerRep: 200,
      leadsHumanCapacity: 100
    },
    painPoints: [
      {
        title: "O Abandono da Mesa Comercial",
        description: "Orçamentos ricos e contratos de alto valor que evaporam porque o técnico sênior está em campo e não consegue responder os leads.",
        icon: Activity,
      },
      {
        title: "A Lentidão na Mesa de Troca",
        description: "Avaliações demoradas de veículos e imóveis usados que travam o fechamento de vendas de concessionárias e imobiliárias.",
        icon: Activity,
      },
      {
        title: "O Caos em Escalas de Facilities",
        description: "Faltas de última hora, atestados falsificados e postos de serviço descobertos destruindo a reputação e gerando multas contratuais.",
        icon: Activity,
      }
    ],
    metrics: [
      { value: "+4x", label: "Capacidade de Propostas" },
      { value: "Sub-60s", label: "Mesa de Troca Usados" },
      { value: "95%", label: "Escala de Facilities" },
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
        title: "O Engenheiro Orçamentista",
        description: "Captura fotos, escopos e medidas enviados pelo cliente no WhatsApp, calcula insumos com base na tabela de preços da empresa e agenda a visita apenas para fechamento."
      },
      resgateAtivo: {
        title: "O Avaliador de Veículos",
        description: "Mecanismo de consulta automotiva e imobiliária que puxa restrições, leilões, sinistros e médias de mercado em 60 segundos para acelerar negociações comerciais."
      },
      backoffice: {
        title: "O Coordenador de Escalas Ativo",
        description: "Monitoramento de presença e validação por OCR de atestados via WhatsApp para equipes descentralizadas, acionando substitutos automaticamente ao detectar furos."
      }
    },
    operationalDNA: {
      friction: {
        name: 'Quote Abandonment Rate',
        rate: 32,
        impactDescription: 'Técnico sênior em campo deixa 32% dos orçamentos técnicos de alto ticket sem resposta por falta de tempo'
      },
      recommendedBlueprints: [
        {
          id: 'technical-estimator',
          name: 'Blueprint Orçamentista Técnico Autônomo',
          description: 'Cálculo de insumos por tabelas via fotos de escopo enviadas no WhatsApp e agendamento da visita final'
        }
      ],
      activeFlowNetworks: ['Intercepção e Resgate 24/7']
    }
  },

  "reputacao-recuperacao-retencao": {
    slug: "reputacao-recuperacao-retencao",
    title: "SinergIA para Reputação de Marca, Retenção & Recuperação de Caixa",
    shortTitle: "Reputação & Cobrança",
    subtitle: "Reverta crises no Reclame Aqui antes que virem prejuízo, zere a inadimplência crônica de forma amigável e blinde sua receita.",
    description: "A imagem pública e o caixa de uma empresa são seus ativos mais sensíveis. Responder reclamações tarde demais destrói suas vendas futures, e cobrar clientes atrasados desgasta seu time. Nossa IA une análise de sentimentos e automação bancária para reter clientes e resgatar receitas perdidas.",
    icon: Scale,
    color: "indigo",
    headline: "Recuperação Ativa de Inadimplência e Blindagem de Reputação",
    featuresFreePlaybook: [
      "Varredor de queixas no Reclame Aqui com resposta por IA",
      "Régua amigável de cobrança de inadimplentes via WhatsApp",
      "Gerador automático de defesas contra chargebacks"
    ],
    financialMetrics: {
      avgTicket: 950,
      currentCAC: 180,
      projectedCAC: 45,
      estimatedLatency: 18000, // 5 horas
      optimizedLatency: 90,    // 90 segundos da IA
      teamCosts: 15000,       // 3 operadores * R$ 5.000
      defaultRate: 8.0,       // 8% de inadimplência
      leadsPerMonth: 500,
      billedRevenue: 200000,
      coldLeadsBase: 4000,
      humanTurnoverRate: 40,
      crmDataErrorRate: 20,
      legacyStackCostPerRep: 300,
      leadsHumanCapacity: 300
    },
    painPoints: [
      {
        title: "O Sangramento da Imagem Pública",
        description: "Queixas expostas no Reclame Aqui ou redes sociais sem resposta imediata, afastando novos clientes que pesquisam sobre sua marca.",
        icon: Activity,
      },
      {
        title: "A Inadimplência Asfixiante",
        description: "Mensalidades e contratos atrasados in escolas e serviços recorrentes que exigem cobranças desconfortáveis, lentas e ineficientes.",
        icon: Activity,
      },
      {
        title: "A Fraude dos Chargebacks",
        description: "Contestações maliciosas de compras e disputas de cartões em plataformas de eventos e e-commerces que sugam o lucro pós-entrega.",
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
        title: "O Escudo de Reputação Ativo",
        description: "Varredura contínua de plataformas de queixas, cruzando o CPF do reclamante com o banco de dados via API, propondo soluções imediatas e redigindo respostas públicas humanizadas."
      },
      resgateAtivo: {
        title: "O Negociador de Linha Amigável",
        description: "Régua ativa de cobrança humanizada via WhatsApp que executa conciliações financeiras, aplica descontos autorizados e emite Pix atualizados sem gerar atrito."
      },
      backoffice: {
        title: "O Defensor de Receita Automático",
        description: "Defesa automatizada de chargebacks que reúne logs de acesso, termos assinados e comprovantes de entrega de forma algorítmica para vencer disputas bancárias."
      }
    },
    operationalDNA: {
      friction: {
        name: 'Churn Risk Neglect',
        rate: 25,
        impactDescription: '25% de reclamações públicas e atrasos de mensalidades causam churn silencioso por falta de réguas'
      },
      recommendedBlueprints: [
        {
          id: 'reputation-shield',
          name: 'Blueprint Escudo de Reputação & Cobrança Amigável',
          description: 'Cobrança conversacional amigável via WhatsApp combinada com defesa e monitoramento de queixas públicas'
        }
      ],
      activeFlowNetworks: ['Intercepção e Resgate 24/7', 'Backoffice e Conciliação']
    }
  },

  "imobiliario": {
    slug: "imobiliario",
    title: "SinergIA para Mercado Imobiliário e Construtoras",
    shortTitle: "Mercado Imobiliário",
    subtitle: "Transforme Leads de Alto Padrão em Visitas Agendadas em 42 Segundos.",
    description: "O Mercado Imobiliário de alto padrão perde milhões todos os meses porque leads qualificados levam horas para receber um contato humano. Nossa inteligência artificial qualifica o lead, valida o score de crédito e agenda a visita na roleta de corretores em tempo real.",
    icon: Home,
    color: "indigo",
    headline: "Transforme Leads de Alto Padrão em Visitas Agendadas em 42 Segundos",
    featuresFreePlaybook: [
      "Fluxo de triagem autônoma para portais (Zap/VivaReal)",
      "Qualificação por score de crédito automatizada",
      "Distribuição inteligente via Roleta de Corretores"
    ],
    financialMetrics: {
      avgTicket: 750000,
      currentCAC: 1200,
      projectedCAC: 350,
      estimatedLatency: 14400, // 4 horas humanas
      optimizedLatency: 42,    // 42 segundos da IA
      teamCosts: 48000,       // 8 corretores * R$ 6.000
      defaultRate: 2.0,       // 2% de inadimplência
      leadsPerMonth: 150,
      billedRevenue: 2500000,
      coldLeadsBase: 1200,
      humanTurnoverRate: 30,
      crmDataErrorRate: 10,
      legacyStackCostPerRep: 350,
      leadsHumanCapacity: 100
    },
    operationalDNA: {
      friction: {
        name: 'Lead Cherry-Picking',
        rate: 35,
        impactDescription: 'Corretores ignoram 35% de leads de menor ticket, desperdiçando verba de marketing nos portais'
      },
      recommendedBlueprints: [
        {
          id: 'realtor-roleta-qualifier',
          name: 'Blueprint Triador Cognitivo & Roleta de Corretores',
          description: 'Distribuição transparente via roleta instantânea após pré-qualificação financeira no WhatsApp'
        }
      ],
      activeFlowNetworks: ['Intercepção e Resgate 24/7']
    },
    painPoints: [
      {
        title: "Demora no Atendimento",
        description: "Leads de portais como Zap e VivaReal esfriam ou vão para a concorrência após 5 minutos sem resposta.",
        icon: Activity,
      },
      {
        title: "Perda de Tempo com Curiosos",
        description: "Corretores seniores perdendo tempo qualificando contatos sem real capacidade de compra ou perfil de crédito.",
        icon: Activity,
      },
      {
        title: "Distribuição Injusta de Leads",
        description: "Falta de transparência e lentidão na roleta de distribuição de leads entre a equipe comercial.",
        icon: Activity,
      }
    ],
    metrics: [
      { value: "Sub-45s", label: "Tempo de Contato" },
      { value: "-70%", label: "Redução de CAC" },
      { value: "+45%", label: "Visitas Agendadas" },
    ],
    demoType: "scheduling",
    subNicheGroup: {
      pequenosAlvos: [
        "Corretores Autônomos de Alto Padrão",
        "Imobiliárias Locais e de Bairro",
        "Administradoras de Aluguel de Temporada"
      ],
      grandesAlvos: [
        "Grandes Construtoras e Incorporadoras",
        "Redes de Franquias Imobiliárias",
        "Loteadoras e Desenvolvedoras Urbanas"
      ]
    },
    hooks: {
      pilotoAutomatico: {
        title: "O Triador de Portais",
        description: "Agente inteligente integrado com Zap Imóveis, VivaReal e Imovelweb que responde e qualifica leads em menos de 1 minuto."
      },
      resgateAtivo: {
        title: "O Qualificador de Crédito",
        description: "Agente conversacional que realiza pré-análise de capacidade financeira de forma amigável no WhatsApp antes de passar ao corretor."
      },
      backoffice: {
        title: "A Roleta de Distribuição",
        description: "Distribuição instantânea e rotativa de leads quentes e agendamentos confirmados direto no CRM da equipe comercial."
      }
    }
  },

  "ecommerce": {
    slug: "ecommerce",
    title: "SinergIA para E-commerce & Lançamentos Digitais",
    shortTitle: "E-commerce & Lançamentos",
    subtitle: "Recuperação de Carrinhos e Upsell Inteligente com Margem Exponencial.",
    description: "Automatize a recuperação de faturamento perdido em carrinhos abandonados, PIX pendentes e boletos gerados sem interação humana lenta. Aumente o ticket médio da sua operação no WhatsApp de forma 100% autônoma.",
    icon: ShoppingBag,
    color: "emerald",
    headline: "Recuperação de Carrinhos e Upsell Inteligente com Margem Exponencial",
    featuresFreePlaybook: [
      "Régua de conversão transacional via Webhook",
      "Oferta personalizada de Upsell com Inteligência de Margem",
      "Agente de pesquisa de churn pós-abandono"
    ],
    financialMetrics: {
      avgTicket: 280,
      currentCAC: 65,
      projectedCAC: 18,
      estimatedLatency: 1800,  // 30 minutos humanos
      optimizedLatency: 15,    // 15 segundos da IA
      teamCosts: 7000,        // 2 atendentes * R$ 3.500
      defaultRate: 5.0,       // 5% de inadimplência
      leadsPerMonth: 1200,
      billedRevenue: 150000,
      coldLeadsBase: 5000,
      humanTurnoverRate: 30,
      crmDataErrorRate: 16,
      legacyStackCostPerRep: 180,
      leadsHumanCapacity: 400
    },
    operationalDNA: {
      friction: {
        name: 'Cart Churn Factor',
        rate: 45,
        impactDescription: 'Carrinhos e PIX/boletos gerados sem aviso ativo resultam em 45% de perda nas vendas brutas'
      },
      recommendedBlueprints: [
        {
          id: 'cart-rescuer',
          name: 'Blueprint Recuperador Ativo de Vendas e Upsells',
          description: 'Recuperação conversacional acionada por webhook com cupom dinâmico e prospecção de Upsell'
        }
      ],
      activeFlowNetworks: ['Intercepção e Resgate 24/7']
    },
    painPoints: [
      {
        title: "Carrinhos Abandonados",
        description: "Mais de 70% dos clientes iniciam o checkout mas não finalizam a compra por falta de incentivo imediato.",
        icon: Activity,
      },
      {
        title: "PIX e Boletos Pendentes",
        description: "Vendas perdidas porque o cliente gerou o PIX ou boleto e esqueceu de pagar por falta de lembrete dinâmico.",
        icon: Activity,
      },
      {
        title: "Falta de Upsell Pós-Venda",
        description: "Deixar dinheiro na mesa ao não oferecer ofertas complementares personalizadas no momento em que o cliente está mais propenso a comprar.",
        icon: Activity,
      }
    ],
    metrics: [
      { value: "+28%", label: "Recuperação de Vendas" },
      { value: "-72%", label: "CAC Projetado" },
      { value: "+15%", label: "Aumento de AOV/LTV" },
    ],
    demoType: "sales",
    subNicheGroup: {
      pequenosAlvos: [
        "Lojas Shopify e WooCommerce de Nicho",
        "Produtores e Afiliados Digitais de Pequeno Porte",
        "Marcas Próprias Locais (D2C)"
      ],
      grandesAlvos: [
        "Grandes Operações de Droppshipping com Escala",
        "Grandes Infoprodutores e Coprodutores com Lançamentos de 7 dígitos",
        "E-commerces Consolidados com ERP Próprio"
      ]
    },
    hooks: {
      pilotoAutomatico: {
        title: "O Recuperador Transacional",
        description: "Régua conversacional via webhook acionada no exato segundo de abandono, tirando dúvidas e facilitando o pagamento."
      },
      resgateAtivo: {
        title: "O Agente de Inteligência de Margem",
        description: "Oferece descontos inteligentes ou upsells personalizados no WhatsApp para garantir a conversão sem queimar margem desnecessária."
      },
      backoffice: {
        title: "O Auditor de Churn",
        description: "Pesquisa automatizada pós-abandono para entender razões de desistência e alimentar a equipe de produto."
      }
    }
  }
}

export const getAllNiches = () => Object.values(nichesData)
export const getNicheBySlug = (slug: string) => nichesData[slug]

export interface ToolStackComplexity {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  category: 'SaaS Nativo' | 'Híbrido' | 'Corporativo/Legado';
  setupFee: number;
}

export const STACK_TOOLS: Record<string, ToolStackComplexity> = {
  // Nível 1
  'shopify': { id: 'shopify', name: 'Shopify', level: 1, category: 'SaaS Nativo', setupFee: 3000 },
  'bling': { id: 'bling', name: 'Bling', level: 1, category: 'SaaS Nativo', setupFee: 3000 },
  'hubspot': { id: 'hubspot', name: 'Hubspot', level: 1, category: 'SaaS Nativo', setupFee: 3000 },
  
  // Nível 2
  'rdstation': { id: 'rdstation', name: 'RD Station', level: 2, category: 'Híbrido', setupFee: 12000 },
  'salesforce': { id: 'salesforce', name: 'Salesforce', level: 2, category: 'Híbrido', setupFee: 12000 },
  'zoho': { id: 'zoho', name: 'Zoho', level: 2, category: 'Híbrido', setupFee: 12000 },
  
  // Nível 3
  'totvs': { id: 'totvs', name: 'TOTVS', level: 3, category: 'Corporativo/Legado', setupFee: 35000 },
  'sap': { id: 'sap', name: 'SAP', level: 3, category: 'Corporativo/Legado', setupFee: 35000 },
  'senior': { id: 'senior', name: 'Senior Sistemas', level: 3, category: 'Corporativo/Legado', setupFee: 35000 },
  'sefaz': { id: 'sefaz', name: 'RPA de Portais Fiscais / SEFAZ', level: 3, category: 'Corporativo/Legado', setupFee: 35000 }
};

