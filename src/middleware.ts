import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Rotas privadas protegidas pelo middleware (grupo dashboard)
  const privateRoutes = ['/admin', '/hub', '/app', '/dashboard']
  
  const isPrivateRoute = privateRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  // Ler o cookie oficial HttpOnly do Firebase Session
  const hasSession = request.cookies.has('sinergia_session')

  if (isPrivateRoute && !hasSession) {
    // Redirecionamento server-side imediato no primeiro byte para evitar FCP piscando
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  
  // Cache headers para assets estáticos
  if (pathname.startsWith('/_next/static/') || pathname.includes('.')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

