export interface SimulationScenario {
  niche: string;
  triggerEvent: string;
  rawBotOutput: string;
  curatedOutput: string;
  contextNote: string;
}

export const sandboxScenarios: Record<string, SimulationScenario> = {
  logistica: {
    niche: "Logística",
    triggerEvent: "[SINAL DE ENTRADA] Interceptado e-mail de fornecedor notificando atraso crítico na rota sudeste.",
    rawBotOutput: "Prezado fornecedor, registramos o atraso. Multas contratuais automáticas serão aplicadas na próxima fatura caso o prazo de 24h seja estourado. Atenciosamente, Robô SinergIA.",
    curatedOutput: "Olá, pessoal. Entendemos os desafios da rota sudeste hoje. Já estamos reorganizando a malha de recebimento para mitigar o impacto. Conseguem nos passar a previsão atualizada para alinharmos o time de pátio? Um abraço, Equipe SinergIA.",
    contextNote: "A IA respondeu de forma fria e punitiva, arriscando o relacionamento com um parceiro estratégico. A interrupção ética salvou a conexão."
  },
  advocacia: {
    niche: "Advocacia",
    triggerEvent: "[SINAL DE ENTRADA] Varredura no diário oficial identificou prazo peremptório de 48h.",
    rawBotOutput: "Prezado cliente, fomos intimados para manifestação em 48h. Favor enviar os documentos pendentes imediatamente sob pena de perda do prazo.",
    curatedOutput: "Olá, tudo bem? Identificamos uma movimentação no seu processo e nossa malha já isolou o prazo. Não se preocupe, nossa equipe técnica já está cuidando da petição. Se precisarmos de algo, te avisamos por aqui. Um abraço!",
    contextNote: "A automação padrão geraria pânico desnecessário no cliente. O toque do Artesão transmitiu segurança e soberania."
  },
  saude: {
    niche: "Saúde & Clínicas",
    triggerEvent: "[SINAL DE ENTRADA] Paciente solicitando cancelamento de procedimento cirúrgico por mensagem.",
    rawBotOutput: "Prezado paciente, cancelamento registrado. Para reagendamento, favor entrar em contato com a central telefônica em horário comercial.",
    curatedOutput: "Olá, compreendemos perfeitamente. Sabendo da importância desse procedimento, separamos duas janelas prioritárias com o especialista para a próxima semana para você não perder o ritmo do tratamento. Qual horário fica melhor?",
    contextNote: "A resposta automática fria aceitaria a perda do cliente. A sensibilidade do Artesão manteve o acolhimento e reteve o paciente."
  }
};

// Cenário de Fallback caso o nicho não esteja explicitamente mapeado
export const defaultScenario: SimulationScenario = {
  niche: "Operações",
  triggerEvent: "[SINAL DE ENTRADA] Lead demonstrou objeção crítica sobre preço no fluxo de e-mails.",
  rawBotOutput: "Prezado lead, nosso preço é fixo conforme a tabela enviada anteriormente. Ficamos no aguardo da sua decisão contrária.",
  curatedOutput: "Olá! Entendemos perfeitamente que cada momento da empresa exige um arranjo de caixa. Vamos fazer o seguinte: nossa malha cognitiva pode ser alocada em slots menores para acompanhar o seu crescimento. Vamos ajustar isso?",
  contextNote: "O bot travou em uma resposta rígida de script. O Artesão Humano interveio para criar uma ponte de negócios flexível."
};
