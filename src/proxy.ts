import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const pathname = request.nextUrl.pathname

  // 🔍 Logs pour déboguer
  console.log('🛡️ Proxy - Path:', pathname)
  console.log('🛡️ Proxy - Token présent:', accessToken ? '✅ Oui' : '❌ Non')

  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/verify-otp',
    '/forgot-password',
    '/reset-password',
    '/shop',
  ]

  const privateRoutes = [
    '/cart',
    '/checkout',
    '/orders',
    '/profile',
    '/reservations',
    '/loyalty',
  ]

  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )
  
  const isPrivateRoute = privateRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  const isApiRoute = pathname.startsWith('/api')
  const isPublicAsset = pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname === '/favicon.ico'

  // Ignorer les assets publics et les routes API
  if (isPublicAsset || isApiRoute) {
    return NextResponse.next()
  }

  // 1. Si l'utilisateur est connecté et essaie d'accéder à une page d'auth
  const authRoutes = ['/login', '/register', '/verify-otp', '/forgot-password', '/reset-password']
  if (accessToken && authRoutes.some(route => pathname === route)) {
    console.log('🔄 Redirection: déjà connecté -> /')
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 2. Si l'utilisateur n'est pas connecté et essaie d'accéder à une page privée
  if (!accessToken && isPrivateRoute) {
    console.log('🔄 Redirection: non connecté -> /login')
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|fonts).*)',
  ],
}