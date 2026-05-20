# SinergIA Business OS 🌌

O **SinergIA Business OS** é um ecossistema B2B premium de automação cognitiva e orquestração multi-agente de Inteligência Artificial. Ele foi projetado para substituir gargalos operacionais e fluxos de atendimento manuais por uma arquitetura determinística de agentes cognitivos focada em retorno financeiro (ROI) direto.

---

## 🛠️ Arquitetura de Valor (As 3 Frentes Cognitivas)

Nossas soluções e ganchos comerciais de nicho são estruturados sob três pilares operacionais de alta performance:

1. **O Piloto Automático (Atendimento & Conversão):** Agentes cognitivos treinados rodando 24/7 nos principais canais de entrada (WhatsApp, Instagram, Web) para triagem, qualificação, agendamento de consultas e fechamento direto de vendas.
2. **O Resgate Ativo (Recuperação de Caixa):** Varredura autônoma de contas inativas, recuperação de boletos não pagos, reengajamento de carrinhos abandonados e cobrança ativa de glosas de faturamento.
3. **O Backoffice Cognitivo (Automação de Processos):** Processamento em lote de documentos complexos, OCR inteligente de guias médicas (TISS/TUSS), classificação fiscal, emissão de guias tributárias e conciliação bancária sem toque humano.

---

## 🚀 Tecnologias Utilizadas

O projeto utiliza uma stack robusta, moderna e de alta performance:

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router & Server-Side Rendering)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Tipagem estrita e segurança em tempo de compilação)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) & Glassmorphism 2.0
* **Banco de Dados & Auth:** [Firebase](https://firebase.google.com/) (Cloud Firestore para persistência de dados em tempo real e Firebase Authentication para controle de acessos)
* **Orquestradores de Integração:** Webhooks acoplados de telemetria integrando rotas de API com [n8n](https://n8n.io/) e Make.com.

---

## 📂 Estrutura do Repositório

```text
SinergiaBusiness/
├── src/
│   ├── app/                      # Rotas do Next.js (App Router)
│   │   ├── admin/                # Painel C-Level dinâmico com streams do Firestore
│   │   ├── api/                  # Endpoints de API (/api/apply, /api/audit)
│   │   ├── apply/                # Funil de qualificação B2B em etapas
│   │   ├── hub/                  # Portais privados de parceiros e desenvolvedores
│   │   ├── partners/             # Programa de parcerias com simulador interativo de MRR
│   │   ├── solutions/            # Páginas dinâmicas por nichos de mercado baseadas em slugs
│   │   └── layout.tsx            # Layout raiz com tratamento dinâmico de visibilidade
│   ├── components/
│   │   ├── features/             # Componentes dinâmicos de IA (Sonar, Fleet, Builders)
│   │   ├── landing/              # Landing Page unificada
│   │   └── sections/             # Seções da página (Cosmos, Genesis, Nexus, Blueprint)
│   ├── data/
│   │   └── niches.ts             # Banco de dados estruturado das 6 divisões e 38 sub-nichos
│   ├── providers/
│   │   └── AuthProvider.tsx      # Provider de Sessão & Regras de Acesso Baseadas em Funções
│   └── lib/
│       └── firebase.ts           # Inicialização e conexões de ambiente do Firebase
├── apphosting.yaml               # Configuração do Firebase App Hosting
├── firestore.rules               # Regras de segurança de acesso ao Firestore
└── firestore.indexes.json        # Índices compostos de banco de dados
```

---

## 💻 Configuração do Ambiente Local

### 1. Clonar e Instalar Dependências
No seu terminal local, execute:
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Copie o template de variáveis de exemplo e crie seu arquivo local:
```bash
cp .env.example .env.local
```
Edite o arquivo `.env.local` e insira as suas chaves do Firebase, endpoints de webhooks da n8n e IDs de pixels de conversão.

### 3. Executar o Servidor de Desenvolvimento
Inicie o projeto localmente:
```bash
npm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### 4. Compilar para Produção (Build)
Para compilar e otimizar o projeto:
```bash
npm run build
```
O compilador do Next.js fará o type-checking do TypeScript, otimizará imagens e gerará de forma estática (SSG) todas as páginas de soluções baseadas em `niches.ts`.

---

## 🌐 Deploy (Firebase App Hosting)

O deploy de produção deste ecossistema está configurado via **Firebase App Hosting**. 

1. O deploy é acionado automaticamente a cada commit/push realizado na branch principal `main`.
2. O Google Cloud Build intercepta a alteração, cria um container Cloud Run otimizado para o Next.js e atualiza o servidor global de forma transparente.
3. Configurações de recursos de servidor, como CPU e memória da instância do Next.js, podem ser ajustadas em [`apphosting.yaml`](file:///c:/Users/Ossama/Desktop/SinergIA/SinergiaBusiness/apphosting.yaml).
