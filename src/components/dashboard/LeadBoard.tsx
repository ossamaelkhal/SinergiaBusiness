'use client';

import React from 'react';
import { Lead, LeadStatus } from '@/services/firestoreService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Phone, Mail, User } from 'lucide-react';

interface LeadBoardProps {
    leads: Lead[];
    onUpdateStatus: (leadId: string, newStatus: LeadStatus) => void;
}

const STATUS_COLUMNS: { id: LeadStatus; label: string; color: string }[] = [
    { id: 'NEW', label: 'Novos', color: 'bg-blue-100 text-blue-800' },
    { id: 'CONTACTED', label: 'Contatados', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'QUALIFIED', label: 'Qualificados', color: 'bg-purple-100 text-purple-800' },
    { id: 'CLOSED', label: 'Fechados', color: 'bg-green-100 text-green-800' },
    { id: 'LOST', label: 'Perdidos', color: 'bg-gray-100 text-gray-800' },
];

export function LeadBoard({ leads, onUpdateStatus }: LeadBoardProps) {
    const getLeadsByStatus = (status: LeadStatus) => {
        return leads.filter((lead) => lead.status === status);
    };

    return (
        <div className="flex h-full gap-4 overflow-x-auto pb-4">
            {STATUS_COLUMNS.map((column) => (
                <div key={column.id} className="w-80 flex-shrink-0 flex flex-col gap-4">
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 border border-gray-200">
                        <h3 className="font-semibold text-gray-700">{column.label}</h3>
                        <Badge variant="secondary" className="bg-white">
                            {getLeadsByStatus(column.id).length}
                        </Badge>
                    </div>

                    <div className="flex flex-col gap-3">
                        {getLeadsByStatus(column.id).map((lead) => (
                            <Card key={lead.id} className="cursor-pointer hover:shadow-md transition-shadow bg-white">
                                <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                                    <CardTitle className="text-sm font-medium leading-none flex items-center gap-2">
                                        <User className="h-3 w-3 text-muted-foreground" />
                                        {lead.name}
                                    </CardTitle>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {STATUS_COLUMNS.map((s) => (
                                                <DropdownMenuItem
                                                    key={s.id}
                                                    onClick={() => lead.id && onUpdateStatus(lead.id, s.id)}
                                                    disabled={lead.status === s.id}
                                                >
                                                    Mover para {s.label}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardHeader>
                                <CardContent className="p-4 pt-2">
                                    <div className="grid gap-1">
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Mail className="mr-2 h-3 w-3" />
                                            <span className="truncate">{lead.email}</span>
                                        </div>
                                        {lead.phone && (
                                            <div className="flex items-center text-xs text-muted-foreground">
                                                <Phone className="mr-2 h-3 w-3" />
                                                <span>{lead.phone}</span>
                                            </div>
                                        )}
                                        <div className="text-[10px] text-gray-400 mt-2 text-right">
                                            {lead.createdAt?.seconds
                                                ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString()
                                                : 'Recent'}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {getLeadsByStatus(column.id).length === 0 && (
                            <div className="h-24 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400">
                                Vazio
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
