import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { domain, source, timestamp } = body;

    if (!domain) {
      return NextResponse.json({ error: 'Domínio é obrigatório' }, { status: 400 });
    }

    // AQUI VOCÊ CONECTA AO SEU MOTOR COGNITIVO (n8n / Clay / Perplexity)
    // O webhook real fica escondido no back-end (segurança)
    const N8N_AUDIT_WEBHOOK = process.env.N8N_AUDIT_WEBHOOK_URL;

    if (N8N_AUDIT_WEBHOOK) {
      // Disparo assíncrono para o orquestrador
      fetch(N8N_AUDIT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'trigger_audit_enrichment',
          domain,
          source,
          timestamp,
          client_ip: req.headers.get('x-forwarded-for') || 'Unknown'
        }),
      }).catch(err => console.error("Falha ao notificar orquestrador de auditoria:", err));
    } else {
      console.warn("Aviso: N8N_AUDIT_WEBHOOK_URL não configurado no .env.local");
    }

    // Retorna imediatamente para o front-end não travar a animação do usuário
    return NextResponse.json({ 
      status: 'success', 
      message: 'Sinal de auditoria registrado e enviado ao orquestrador.' 
    });

  } catch (error) {
    console.error("Erro na rota /api/audit:", error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
