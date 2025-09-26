'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, CheckCircle } from 'lucide-react';

interface StatsBarProps {
  companyCount: number;
  leadCount: number;
  qualifiedLeads: number;
}

export function StatsBar({ companyCount, leadCount, qualifiedLeads }: StatsBarProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Empresas Gerenciadas</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{companyCount}</div>
          <p className="text-xs text-muted-foreground">Total de empresas na sua base</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads Totais</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{leadCount}</div>
          <p className="text-xs text-muted-foreground">Total de contatos em todas as empresas</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads Qualificados</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{qualifiedLeads}</div>
          <p className="text-xs text-muted-foreground">Leads prontos para a abordagem</p>
        </CardContent>
      </Card>
    </div>
  );
}
