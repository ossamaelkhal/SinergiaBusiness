
#!/bin/bash

echo "Instalando dependências essenciais..."

# Dependências básicas do React/Next
npm install react@19.0.0 react-dom@19.0.0 next@15.1.6

# Dependências do Tailwind
npm install tailwindcss@4.1.7 tailwindcss-animate@1.0.7

# Utilitários essenciais
npm install clsx@2.0.0 tailwind-merge@2.0.0 lucide-react@0.294.0

# Radix UI (apenas os essenciais)
npm install @radix-ui/react-dialog@1.0.5
npm install @radix-ui/react-tabs@1.0.4
npm install @radix-ui/react-accordion@1.1.2
npm install @radix-ui/react-toast@1.1.5

# Formulários
npm install react-hook-form@7.48.2 zod@3.22.4 @hookform/resolvers@3.3.2

# Dev dependencies
npm install -D @types/node@22.10.5 @types/react@19.0.2 @types/react-dom@19.0.2 typescript@5.7.3

echo "Instalação concluída!"
