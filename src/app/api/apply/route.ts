import { NextResponse } from 'next/server';
import { submitApplication } from '@/actions/leads';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await submitApplication(data);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 450 }); // custom error block
    }

    return NextResponse.json({ 
      status: 'success', 
      message: 'Aplicação recebida e processada com sucesso.',
      docId: result.docId
    });

  } catch (error) {
    console.error("Erro na rota /api/apply:", error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}

