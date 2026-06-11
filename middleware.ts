import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const protectedRoutes = ['/profile', '/clinic/dashboard']
const authRoutes = ['/login', '/register']
const adminRoutes = ['/clinic/admin']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('token')?.value

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    try {
      const { payload } = await jwtVerify(token, secret)
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/clinic', req.url))
      }
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    try {
      await jwtVerify(token, secret)
      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  if (isAuthRoute && token) {
    try {
      const { payload } = await jwtVerify(token, secret)
      if (payload.role === 'admin') {
        return NextResponse.redirect(new URL('/clinic/admin', req.url))
      }
      return NextResponse.redirect(new URL('/clinic/dashboard', req.url))
    } catch {
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
