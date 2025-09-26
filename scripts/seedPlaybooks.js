// NOTA: Este é um script de setup para ser executado uma vez, ou a lógica pode ser adaptada para um painel de admin no futuro.
// Este arquivo NÃO faz parte da aplicação Next.js diretamente, mas sim um utilitário para popularmos nosso banco de dados.

import { collection, addDoc } from 'firebase/firestore';
import { db } from './path/to/your/firebase/config'; // Ajuste o caminho conforme necessário

const playbooksCollection = collection(db, 'playbooks');

const initialPlaybook = {
  name: 'Sequência de Abordagem de Lead Qualificado (3 Dias)',
  trigger: 'lead_status_changed_to_qualified',
  steps: [
    {
      day: 0,
      action: 'send_email',
      template: {
        subject: 'Conexão | {companyName} + {leadCompanyName}',
        body: 'Olá {leadName},\n\nNotei que a {leadCompanyName} está fazendo um trabalho excelente em [área de atuação]. Na {companyName}, nós ajudamos empresas como a sua a [resolver um problema específico].\n\nPensei que uma parceria poderia ser mutuamente benéfica. Você teria 15 minutos na próxima semana para uma breve conversa?\n\nAtenciosamente,\n{userName}'
      }
    },
    {
      day: 2,
      action: 'send_email',
      template: {
        subject: 'Re: Conexão | {companyName} + {leadCompanyName}',
        body: 'Olá {leadName},\n\nApenas um rápido follow-up no meu email anterior. Acredito fortemente que uma colaboração entre nossas empresas poderia gerar um valor significativo.\n\nUm exemplo recente foi quando ajudamos [case de sucesso similar] a alcançar [resultado quantificável].\n\nQualquer interesse em explorar isso?\n\nAtenciosamente,\n{userName}'
      }
    }
  ]
};

async function seedPlaybooks() {
  try {
    const docRef = await addDoc(playbooksCollection, initialPlaybook);
    console.log('Playbook inicial adicionado com ID:', docRef.id);
  } catch (error) {
    console.error('Erro ao adicionar playbook:', error);
  }
}

seedPlaybooks();
