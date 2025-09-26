'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';

interface PlaybookActivationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  leadName: string;
}

export function PlaybookActivationDialog({ isOpen, onClose, onConfirm, leadName }: PlaybookActivationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ativar Playbook de Abordagem?</AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a iniciar uma sequência de e-mails automatizada de 3 dias para <strong>{leadName}</strong>.
            Os e-mails serão enviados em seu nome. Você pode cancelar a qualquer momento. Deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Sim, Ativar Sequência</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
