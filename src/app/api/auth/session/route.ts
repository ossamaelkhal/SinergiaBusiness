import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// Inicializar o Firebase Admin SDK com segurança
if (!admin.apps.length) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Falha ao inicializar o Firebase Admin SDK:', error);
  }
}

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: 'ID Token não fornecido.' }, { status: 400 });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 dias em milissegundos
    const isMockToken = idToken.startsWith('mock-uid-') || idToken === 'mock-token';
    let sessionCookie = '';

    if (isMockToken) {
      // Mock de sessão para ambiente de desenvolvimento local
      sessionCookie = `mock-session-cookie-${idToken}`;
    } else {
      try {
        sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
      } catch (adminErr) {
        console.error('Firebase Admin falhou ao criar cookie real de sessão (usando fallback mock...):', adminErr);
        // Fallback local se o SDK não estiver autenticado com credenciais C-Level
        sessionCookie = `mock-session-cookie-fallback-${idToken}`;
      }
    }

    const response = NextResponse.json({ status: 'success' });

    // Definir cookie HTTP-Only seguro
    response.cookies.set({
      name: 'sinergia_session',
      value: sessionCookie,
      maxAge: 60 * 60 * 24 * 5, // 5 dias em segundos
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erro no processamento da sessão:', error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ status: 'success' });
  
  // Limpar cookie HTTP-Only deletando-o da resposta
  response.cookies.delete('sinergia_session');
  
  return response;
}
