# SinergIA Business - Automação Cognitiva Nível 5 (SinergIA OS) 🚀

**SinergIA** deixou de ser um kit de automação ou um chatbot básico para se tornar uma **Máquina de Vendas Autônoma Enterprise**. Este repositório contém a arquitetura completa de front-end (Next.js) e do funil de qualificação High-Ticket.

A estrutura do projeto foi pensada sob uma analogia militar/naval de conquista B2B: interceptar, qualificar, converter e escalar.

---

## 🏗️ A Arquitetura da Conversão (O Funil B2B)

A Landing Page (`LandingPage.tsx`) foi cirurgicamente desenhada para conduzir o lead (CEO/Dono de Empresa) em uma jornada psicológica de conversão em 9 etapas:

1. **O Hook (Hero.tsx):** *"O Fim do Caos"*. Ancoragem imediata com métricas de conversão.
2. **O Diagnóstico de Sangramento (SinergiaAudit.tsx):** A *Isca de FOMO*. O cliente digita o próprio site, o sistema roda uma auditoria falsa/estimada e informa quanto dinheiro ele está perdendo anualmente para a concorrência que já usa I.A. Possui um webhook oculto (n8n) que já captura o domínio na hora.
3. **O Mapa Leigo (SinergiaBlueprint.tsx):** Uma explicação visual, livre de jargões técnicos, de como a SinergIA funciona em 4 passos simples.
4. **O Radar Oculto (SinergiaSonar.tsx):** A arquitetura de extração de leads da Dark Web e LinkedIn.
5. **A Força Aérea (MultiAgentFleet.tsx):** O esquadrão de Agentes I.A. (BDR, Closer, CS) que fecha as vendas.
6. **A Cidade Inteligente (SinergiaOS.tsx):** O hub de controle onde tudo se conecta (CRM, WhatsApp, n8n).
7. **A Prova Financeira (ROICalculator.tsx):** Onde o cliente simula o ganho exato de demitir ferramentas antigas e usar a SinergIA.
8. **A Inteligência Geral (SinergiaGenesis.tsx):** A visão de futuro. A IA que reescreve os próprios playbooks de vendas sozinha.
9. **A Quebra de Objeções (SinergiaFAQ.tsx):** Quebra objeções finais sobre segurança, integração (Salesforce/RD Station) e autonomia.
10. **O Fechamento (CTA.tsx):** O Check-Mate para os planos de 5k a 50k.

---

## 🛥️ As Rotas de Fuga e Segurança (Lifeboats)

Em vendas de R$ 50.000, nós blindamos o funil para não lidar com curiosos, mas não perdemos a venda de quem tem orçamento menor.

- **A Porta Principal (app/apply):** Uma rota exclusiva de Venda Consultiva. O cliente passa por um formulário rigoroso (Typeform-style) informando faturamento, tamanho do time e gargalo atual. Se aprovado, ele cai na pipeline de Setup C-Level.
- **O Jetski de Resgate (FloatingJetski.tsx):** Um botão flutuante de WhatsApp que aparece após 3 segundos de navegação. Se o cliente sentir que a solução "Enterprise" é muito pesada ou cara, ele usa esse botão para pedir ajuda humana imediata. Onde nós vendemos Downsells (Mentorias, Aura Academy, ou Setups mais baratos).

---

## 🛠️ Stack Tecnológica & Tracking

O projeto está forjado com as melhores práticas para rodar rápido e indexar com autoridade:

- **Framework:** Next.js (App Router) + React.
- **Styling:** TailwindCSS (Dark Mode Nativo `slate-950` com gradientes táticos Neon Emerald/Fuchsia/Cyan).
- **SEO & OpenGraph:** Metadados configurados globalmente no `layout.tsx` para garantir que compartilhamentos no LinkedIn/WhatsApp exijam respeito absoluto (Thumbnail: *"SinergIA | O Início do Seu Império B2B"*).
- **Telemetria (Analytics.tsx):**
  - Google Analytics 4 (GA4)
  - Pixel da Meta (Facebook Ads)
  - Hotjar (Mapas de calor e gravação de tela para otimização contínua de Copy).

---

## 🚀 Como Iniciar (Deploy & Development)

**1. Instalar as dependências:**
\`\`\`bash
npm install
\`\`\`

**2. Variáveis de Ambiente:**
Crie um arquivo \`.env.local\` na raiz e insira seus IDs de telemetria:
\`\`\`env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=XXXXXXX
\`\`\`

*(Lembre-se também de trocar a URL do Webhook do n8n/Make dentro de `src/components/sections/SinergiaAudit.tsx` na linha 20 para o seu webhook real).*

**3. Rodar o Navio em Desenvolvimento:**
\`\`\`bash
npm run dev
\`\`\`
O Quartel General estará acessível em `http://localhost:3000`.

---

> *"Nós não vendemos bots. Nós implementamos Automação Cognitiva para operações que se recusam a perder a guerra comercial."*
> **— SinergIA Business**
