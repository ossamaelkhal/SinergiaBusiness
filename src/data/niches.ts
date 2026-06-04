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
    title: "SinergIA para Saúde, Estética de Alto Padrão e Clínicas",
    shortTitle: "Saúde & Bem-Estar",
    subtitle: "Lote sua agenda com procedimentos de alto ticket, reduza o no-show a quase zero e acabe com o desperdício de leads na recepção.",
    description: "O faturamento da sua clínica está refém de duas variáveis caóticas: o esquecimento dos pacientes e a lentidão humana na recepção. Enquanto você opera ou atende, leads quentes esfriam no WhatsApp e tratamentos antigos são abandonados por falta de acompanhamento. Instalamos uma Clonagem Cognitiva da sua melhor secretária para blindar seu caixa.",
    icon: Stethoscope,
    color: "emerald",
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
    }
  },

  "operacoes-urgencia-logistica": {
    slug: "operacoes-urgencia-logistica",
    title: "SinergIA para Operações de Urgência, Logística & Distribuição",
    shortTitle: "Logística & Urgência",
    subtitle: "Despache ordens de serviço em segundos, elimine a ociosidade da frota e blinde sua operação contra gargalos humanos.",
    description: "Em operações de urgência e logística, o tempo de resposta decide quem fica com o contrato. Centralizar o recebimento em telefones ou planilhas cria um gargalo perigoso que limita sua escala. Nossa infraestrutura assume a triagem de rotas, controle preditivo de ativos e auditoria documental sem intervenção manual.",
    icon: Factory,
    color: "rose",
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
    }
  },

  "reputacao-recuperacao-retencao": {
    slug: "reputacao-recuperacao-retencao",
    title: "SinergIA para Reputação de Marca, Retenção & Recuperação de Caixa",
    shortTitle: "Reputação & Cobrança",
    subtitle: "Reverta crises no Reclame Aqui antes que virem prejuízo, zere a inadimplência crônica de forma amigável e blinde sua receita.",
    description: "A imagem pública e o caixa de uma empresa são seus ativos mais sensíveis. Responder reclamações tarde demais destrói suas vendas futuras, e cobrar clientes atrasados desgasta seu time. Nossa IA une análise de sentimentos e automação bancária para reter clientes e resgatar receitas perdidas.",
    icon: Scale,
    color: "indigo",
    painPoints: [
      {
        title: "O Sangramento da Imagem Pública",
        description: "Queixas expostas no Reclame Aqui ou redes sociais sem resposta imediata, afastando novos clientes que pesquisam sobre sua marca.",
        icon: Activity,
      },
      {
        title: "A Inadimplência Asfixiante",
        description: "Mensalidades e contratos atrasados em escolas e serviços recorrentes que exigem cobranças desconfortáveis, lentas e ineficientes.",
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
    }
  }
}

export const getAllNiches = () => Object.values(nichesData)
export const getNicheBySlug = (slug: string) => nichesData[slug]
