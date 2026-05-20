import { Activity, Landmark, Building2, ShoppingBag, GraduationCap, Factory, Stethoscope, Scale, Briefcase, BarChart, HardHat, Car, Dumbbell, Utensils, Scissors } from 'lucide-react'

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
  "saude-clinicas": {
    slug: "saude-clinicas",
    title: "SinergIA para Saúde & Clínicas",
    shortTitle: "Saúde & Bem-Estar",
    subtitle: "Zere o no-show, automatize agendamentos 24/7 e humanize o atendimento para focar 100% no paciente.",
    description: "Para clínicas médicas, odontológicas, estéticas e consultórios, o gargalo não é a prestação do serviço, mas sim a gestão de agenda, a triagem e o faltante (no-show). A SinergIA implementa agentes autônomos que operam a secretaria digital do seu consultório.",
    icon: Stethoscope,
    color: "emerald",
    painPoints: [
      {
        title: "Taxa de No-Show Elevada",
        description: "Pacientes desmarcam de última hora ou simplesmente não aparecem, zerando a receita daquele horário.",
        icon: Activity,
      },
      {
        title: "Recepção Sobrecarregada",
        description: "Telefone tocando e WhatsApp acumulando mensagens de dúvidas simples, triagem e agendamento.",
        icon: Activity,
      },
      {
        title: "Dificuldade na Recuperação",
        description: "Pacientes que pediram orçamento mas não agendaram são esquecidos devido à falta de follow-up da equipe.",
        icon: Activity,
      }
    ],
    solutions: [
      {
        title: "Secretária de Agendamento Autônoma",
        description: "IA integrada ao WhatsApp e ao seu sistema (Feegow, Doctoralia, etc) que consulta agenda, propõe horários e marca a consulta.",
        impact: "Atendimentos 100% em tempo real, 24 horas por dia.",
        features: ["Integração de Agenda", "Tiragem de Dúvidas Clínicas Base", "Confirmação Biométrica/Documental"]
      },
      {
        title: "Motor Anti No-Show & Confirmação",
        description: "Fluxos de confirmação inteligente 48h e 24h antes. Se o paciente cancelar, a IA entra em contato com a lista de espera automaticamente.",
        impact: "Redução de até 60% na vacância da agenda.",
        features: ["Gestão de Fila de Espera Automática", "Remarcação sem atrito", "Lembretes Multicanal (WhatsApp/SMS)"]
      },
      {
        title: "Follow-Up Clínico (Pós-Venda)",
        description: "3 dias após o procedimento, a IA pergunta como o paciente está, gerando retenção, avaliações positivas no Google e identificando alertas médicos.",
        impact: "Avaliações orgânicas em massa e fidelização.",
        features: ["Disparo pós-atendimento", "Pesquisa NPS", "Encaminhamento Médico de Emergência"]
      }
    ],
    metrics: [
      { value: "-45%", label: "Queda em No-shows" },
      { value: "0s", label: "Tempo de Espera" },
      { value: "3x", label: "Mais Agendamentos 24/7" },
    ],
    demoType: "scheduling"
  },

  "servicos-juridicos-contabeis": {
    slug: "servicos-juridicos-contabeis",
    title: "SinergIA para Advogados & Contadores",
    shortTitle: "Jurídico & Contábil",
    subtitle: "Escalabilidade extrema para escritórios através de triagem autônoma e geração de peças.",
    description: "Advogados e contadores perdem horas faturáveis respondendo perguntas corriqueiras de clientes sobre o status de processos, pendências e recolhimento de impostos. Com IA, seu escritório roda on-demand, enquanto seus sócios focam no intelectual.",
    icon: Scale,
    color: "indigo",
    painPoints: [
      {
        title: "Triagem Interminável",
        description: "Muitos contatos de leads que não têm o perfil ou capacidade para contratar o escritório.",
        icon: Scale,
      },
      {
        title: "Follow-up de Documentos",
        description: "Cobrar documentos de clientes para dar andamento em contabilidade/processos toma tempo da equipe técnica.",
        icon: Scale,
      },
      {
        title: "Clientes Inseguros",
        description: "Clientes pedindo 'status do processo' o tempo todo no WhatsApp, gerando atrito e interrupções.",
        icon: Scale,
      }
    ],
    solutions: [
      {
        title: "Triagem Inteligente de Causas/Leads",
        description: "IA que faz as 5 perguntas iniciais, entende se há viabilidade jurídica/contábil e já capta a documentação antes do sócio entrar.",
        impact: "Sócios falam apenas com leads qualificados e municiados.",
        features: ["Análise de Perfil", "Recepção de Documentos", "Classificação de Urgência"]
      },
      {
        title: "Consultor de Status 24/7",
        description: "O cliente manda ou áudio: 'Como está meu processo?'. A IA consulta o Jusbrasil/Esaj ou ERP contábil, resume o andamento e responde.",
        impact: "Zero interrupções da equipe para reports simples.",
        features: ["Integração ERP/Tribunais", "Tradução de Juridiquês para Leigo", "Respostas por Áudio"]
      },
      {
        title: "Robô de Cobrança e Documentação",
        description: "Envio massivo e humanizado de lembretes para fechamento de folha (contábil) ou assinatura de procurações (jurídico).",
        impact: "Prazos cumpridos com folga.",
        features: ["Automação de DAE/DARF", "Lembretes com links PDF", "Validação de envio"]
      }
    ],
    metrics: [
      { value: "90%", label: "Economia de Tempo em Triagem" },
      { value: "+15h", label: "Horas Faturáveis Livres/sem" },
      { value: "Rápido", label: "Fechamento de Contratos" },
    ],
    demoType: "support"
  },

  "varejo-ecommerce": {
    slug: "varejo-ecommerce",
    title: "SinergIA para Varejo & E-commerce",
    shortTitle: "Varejo & E-commerce",
    subtitle: "Venda no piloto automático, recupere carrinhos e escale seu suporte com agentes nativos em vendas.",
    description: "No e-commerce e varejo, a velocidade de atendimento dita a conversão. Carrinhos são abandonados a cada segundo por dúvidas sobre frete, tamanhos ou atrasos. Nossos modelos de IA são treinados como seus melhores vendedores.",
    icon: ShoppingBag,
    color: "fuchsia",
    painPoints: [
      {
        title: "Carrinhos e Pix Abandonados",
        description: "Falta de ação em tempo real faz clientes esfriarem e comprarem do concorrente.",
        icon: ShoppingBag,
      },
      {
        title: "Dúvidas de Pré-venda e Estoque",
        description: "Clientes não finalizam compras pois ficam esperando respostas sobre 'Isso serve para mim?'.",
        icon: ShoppingBag,
      },
      {
        title: "Gargalo de Pós-Venda (Trackings)",
        description: "Mais de 60% dos tickets de suporte são apenas 'Onde está meu pedido?'.",
        icon: ShoppingBag,
      }
    ],
    solutions: [
      {
        title: "Vendedor Virtual Consultivo",
        description: "Um agente que entende o catálogo, faz cross-sell e up-sell, e tira dúvidas técnicas sobre os produtos em menos de 3 segundos.",
        impact: "Aumento drástico no Ticket Médio (LTV).",
        features: ["Treinamento no Catálogo PDF/Site", "Recomendação Cruzada", "Fechamento via Link Gerado"]
      },
      {
        title: "Máquina de Recuperação Ativa",
        description: "Abandono de Carrinho, Pix Vencendo ou Boleto: a IA chama o cliente em 10 minutos (golden hour), trata a objeção e reverte a perda.",
        impact: "Recuperação de até 30% da receita vazada.",
        features: ["Integração Shopify/Nuvemshop/Woocommerce", "Abordagem Persuasiva", "Negociação de Cupom"]
      },
      {
        title: "Suporte e Rastreamento Neutro",
        description: "Respondemos instantaneamente onde está a encomenda integrado aos Correios/MelhorEnvio e resolvemos trocas/devoluções.",
        impact: "SAC que roda sem humanos finais.",
        features: ["Tracking Dinâmico", "Política de Trocas Fixa", "Encaminhamento Humano Crítico"]
      }
    ],
    metrics: [
      { value: "+30%", label: "Aumento na Recuperação" },
      { value: "-75%", label: "Chamados de Suporte" },
      { value: "24/7", label: "Horário de Conversão" },
    ],
    demoType: "sales"
  },

  "educacao-infoprodutos": {
    slug: "educacao-infoprodutos",
    title: "SinergIA para Educação & Infoprodutores",
    shortTitle: "Educação & Info",
    subtitle: "Acompanhamento acadêmico, lançamento em escala e suporte aos alunos resolvidos por IA.",
    description: "Do guru digital à escola tradicional, a experiência do aluno dita o sucesso ou o Reembolso (Chargeback). A SinergIA constrói tutores virtuais, setters de vendas e suporte ativo para o seu negócio de educação rodar no estado da arte.",
    icon: GraduationCap,
    color: "amber",
    painPoints: [
      {
        title: "Chargebacks e Reembolsos",
        description: "O aluno compra na emoção, tem dúvida no 1º módulo, não tem suporte rápido e pede o dinheiro de volta.",
        icon: GraduationCap,
      },
      {
        title: "Escalonamento de Lançamentos",
        description: "Grupos de WhatsApp de lançamento ficam impossíveis de gerir com humanos quando chegam mensagens em massa.",
        icon: GraduationCap,
      },
      {
        title: "Suporte Operacional",
        description: "Resetar senhas, dúvidas sobre 'quando libera o módulo 3' ou falhas na plataforma dominam o time.",
        icon: GraduationCap,
      }
    ],
    solutions: [
      {
        title: "Onboarding Anti-Reembolso",
        description: "Nos primeiros 7 dias, a IA chama o aluno proativamente, garante as credenciais, ensina como usar e comemora as primeiras aulas assistidas.",
        impact: "Redução maciça nas taxas de chargeback/churn.",
        features: ["Verificação de Acesso", "Engajamento Baseado na Kiwify/Hotmart", "Suporte Nível 1"]
      },
      {
        title: "Tutor Especializado (Baseado no seu Método)",
        description: "Um robô treinado em todos os PDF's e transcrições do curso que pode tirar dúvidas técnicas sobre a matéria do aluno, 24/7.",
        impact: "Experiência premium para tickets high-ticket.",
        features: ["Treinamento em RAG", "Compreensão de Áudio do Aluno", "Alinhamento Cópia do Especialista"]
      },
      {
        title: "Setter/Closer Autônomo para Mentoria",
        description: "Aplica de forma inteligente os leads interessados no low-ticket para agendar reuniões com closers de mentoria high-ticket.",
        impact: "Agenda lotada de reuniões para upsell brutal.",
        features: ["Qualificação BANT", "Nutrição de Objeções", "Agendamento Calendly"]
      }
    ],
    metrics: [
      { value: "-40%", label: "Reembolsos Evitados" },
      { value: "+2x", label: "Agendamentos Mentoria" },
      { value: "5s", label: "Resolução de Dúvidas" },
    ],
    demoType: "sales"
  },

  "imobiliarias-construcao": {
    slug: "imobiliarias-construcao",
    title: "SinergIA para Imobiliárias e Construção",
    shortTitle: "Imobiliário",
    subtitle: "Qualificação brutal de leads, agendamento de visitas no fuso do corretor e esteiras de vistoria automatizadas.",
    description: "Corretores gastam 80% do tempo fazendo triagem de leads (turistas imobiliários) e burocracia. Nossos agentes imobiliários autônomos fazem a ponte do lead desde a campanha do Facebook até a visita in loco.",
    icon: Building2,
    color: "cyan",
    painPoints: [
      {
        title: "Leads 'Turistas' (Frio)",
        description: "Muitos leads sem qualificação financeira ou real intenção de compra chegando pelo marketing.",
        icon: Building2,
      },
      {
        title: "Corretores Desorganizados",
        description: "Atraso no feedback do corretor esfria o comprador; follow-up é inconsistente e mal documentado no CRM.",
        icon: Building2,
      },
      {
        title: "Burocracia Operacional",
        description: "Passagem de ficha, aprovação de crédito e agendamento de vistoria paralisam a operação.",
        icon: Building2,
      }
    ],
    solutions: [
      {
        title: "Corretor IA Especialista em Qualificação",
        description: "Lead entra, ia entende interesse (compra/aluguel), metragem, região, e qualifica a renda. Só então passa para o Broker certo.",
        impact: "Corretores lidam apenas com negócios quentes.",
        features: ["Match de Imóveis no CRM", "Qualificação de Renda (Score)", "Pré-reserva"]
      },
      {
        title: "Agendamento e Roteirização de Visitas",
        description: "O robô lida com a agenda compartilhada, marca os melhores horários e reconfirma no dia anterior com localização.",
        impact: "Ganhos em eficiência e rotas na rua.",
        features: ["Agendamento por Região", "Envio de Maps", "Cancelamento/Relocação Autônoma"]
      },
      {
        title: "Inteligência Documental e Contratos",
        description: "Recepção de documentos (CNH, IR, Extratos), pré-validação com visão computacional e criação dos rascunhos de contratos.",
        impact: "Aceleração do fechamento (de semanas para dias).",
        features: ["Leitura de OCR", "Aviso de Faltantes", "Integração Jurídica"]
      }
    ],
    metrics: [
      { value: "100%", label: "Leads Triados Rápido" },
      { value: "+40%", label: "Conversão em Visitas" },
      { value: "24/7", label: "Atendimento Noturno" },
    ],
    demoType: "sales"
  },
  
  "industria-b2b-logistica": {
    slug: "industria-b2b-logistica",
    title: "SinergIA para Indústria B2B & Logística",
    shortTitle: "Indústria & B2B",
    subtitle: "Cote, negocie e libere rotas automaticamente. IA operando seu backoffice como militares em solo.",
    description: "Vendas complexas B2B demoram semanas. A emissão e conferência de centenas de CT-es, NF-es e cotações de fornecedores exigem braço. A IA assume a cognição do trabalho pesado transformando semanas em segundos.",
    icon: Factory,
    color: "rose",
    painPoints: [
      {
        title: "Gargalo no SLA de Cotações",
        description: "Vendedores demoram dias para formatar propostas técnicas complexas de maquinário, insumo e suprimentos.",
        icon: Factory,
      },
      {
        title: "Volume Documental Absurdo",
        description: "Processo arcaico na liberação de fretes, auditoria de notas, manifestos, gerando erros e multas pesadas.",
        icon: Factory,
      },
      {
        title: "Gestão Ativa de Fornecedores",
        description: "Equipe de compras perde muito tempo ligando para orçar ou lidar com paradas de esteira por falha em supplies.",
        icon: Factory,
      }
    ],
    solutions: [
      {
        title: "Gerador Autônomo de Propostas",
        description: "O vendedor passa os dados bases (ou o cliente) e a IA gera uma proposta comercial ultra personalizada com escopo, margem e custos em PDF.",
        impact: "SLA de dias para minutos. Vantagem sobre concorrência.",
        features: ["Leitura Técnica via ERP", "Design/Layout Automático", "Cálculo Tributário Prévio"]
      },
      {
        title: "Auditor de Notas e CT-e",
        description: "Módulo OCR da SinergIA consome imagens/XML, concilia entre ordem de compra, nota fiscal e manifesto, aprovando ou bloqueando autonomamente.",
        impact: "Zero desvios; equipe liberada do backoffice monótono.",
        features: ["Cross-check Triple Match", "Sinalização de Discrepância", "Aviso a Fornecedores"]
      },
      {
        title: "Rastreamento e Relatórios para Varejo",
        description: "Avisos automáticos logísticos em B2B para lojistas aguardando entrega de paletes ou containers.",
        impact: "Fim das ligações: 'Onde está meu caminhão?'.",
        features: ["Integração de Frotas", "Status via WhatsApp", "Reprogramação Autônoma"]
      }
    ],
    metrics: [
      { value: "-80%", label: "Tempo em Cotações" },
      { value: "99%", label: "Precisão Front-Back" },
      { value: "100%", label: "Escalabilidade B2B" },
    ],
    demoType: "sales"
  }
}

export const getAllNiches = () => Object.values(nichesData)
export const getNicheBySlug = (slug: string) => nichesData[slug]
