import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { revenue, teamSize, bottleneck, name, email, phone } = data;

    if (!email || !name) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    // AQUI VOCÊ CONECTA AO SEU MOTOR COGNITIVO (n8n / Vapi / Bland AI)
    const N8N_APPLY_WEBHOOK = process.env.N8N_APPLY_WEBHOOK_URL;

    if (N8N_APPLY_WEBHOOK) {
      // Disparo para o orquestrador (que decidirá se liga via IA de voz ou manda pro Downsell)
      fetch(N8N_APPLY_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'process_highticket_application',
          lead: {
            name,
            email,
            phone,
            revenue,
            teamSize,
            bottleneck
          },
          timestamp: new Date().toISOString()
        }),
      }).catch(err => console.error("Falha ao enviar aplicação para orquestrador:", err));
    } else {
      console.warn("Aviso: N8N_APPLY_WEBHOOK_URL não configurado no .env.local");
    }

    return NextResponse.json({ 
      status: 'success', 
      message: 'Aplicação recebida e enviada para processamento cognitivo.' 
    });

  } catch (error) {
    console.error("Erro na rota /api/apply:", error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
