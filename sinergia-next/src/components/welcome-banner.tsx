'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface WelcomeBannerProps {
  userName?: string | null;
  companyCount: number;
}

export function WelcomeBanner({ userName, companyCount }: WelcomeBannerProps) {
  if (companyCount > 0) {
    return null; // O banner só aparece se o usuário ainda não tiver empresas
  }

  return (
    <Card className="mb-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="w-6 h-6 mr-3 text-yellow-400" />
          Bem-vindo(a) à SinergIA{userName ? `, ${userName}` : ''}!
        </CardTitle>
        <CardDescription className="text-slate-400">
          Você está a um passo de construir seu motor de aquisição de clientes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          O primeiro passo é adicionar uma empresa que você deseja analisar ou para a qual deseja encontrar parceiros. Vamos começar?
        </p>
        <Button 
          onClick={() => {
            // Foca no campo de nome da empresa
            document.getElementById('companyName')?.focus();
          }}
          className="bg-white text-slate-900 hover:bg-slate-200"
        >
          Adicionar Primeira Empresa
        </Button>
      </CardContent>
    </Card>
  );
}
