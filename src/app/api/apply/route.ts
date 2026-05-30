import { NextResponse } from 'next/server';
import { submitApplication } from '@/actions/leads';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Normalização automática para suportar payloads planos (flat)
    let payload = data;
    if (!data.userData) {
      payload = {
        userData: {
          name: data.name,
          email: data.email,
          document: data.document,
          phone: data.phone,
          revenue: data.revenue,
          teamSize: data.teamSize,
          bottleneck: data.bottleneck,
          nichoSlug: data.nichoSlug || data.nicho || ''
        },
        trackingData: {
          utm_source: data.utm_source || '',
          utm_medium: data.utm_medium || '',
          utm_campaign: data.utm_campaign || '',
          utm_content: data.utm_content || '',
          fbc: data.fbc || '',
          fbp: data.fbp || '',
          ga_client_id: data.ga_client_id || data.client_id || '',
          gclid: data.gclid || ''
        }
      };
    }

    const result = await submitApplication(payload);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 450 }); // custom error block
    }

    return NextResponse.json({ 
      status: 'success', 
      message: 'Aplicação recebida e processada com sucesso.',
      docId: result.eventId || result.docId,
      eventId: result.eventId
    });

  } catch (error) {
    console.error("Erro na rota /api/apply:", error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}

