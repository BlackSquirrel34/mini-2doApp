import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // let payload handle /api routes instead of doing it here
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // check for the session cookie
  const payloadToken = request.cookies.get('payload-token')
  if (!payloadToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // once we knew there's a valid token we could pull out user information from there
  // and redirect user accordingly

  // redirect to /home if the user tries to access the root URL
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // let server components handle token verification
  return NextResponse.next()
}

// which rotues do we want to run this middleware on?

export const config = {
  matcher: ['/', '/home', '/todo-create', '/todos/:path*', '/api/:path*'],
}
