import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const REFRESH_TOKEN_COOKIE = 'refreshToken';
const AUTH_COOKIES = ['accessToken', REFRESH_TOKEN_COOKIE];

const redirectToMain = (request: NextRequest, clearCookie = false) => {
  const response = NextResponse.redirect(new URL('/', request.url));
  if (clearCookie) AUTH_COOKIES.forEach((name) => response.cookies.delete(name));
  return response;
};

export const middleware = (request: NextRequest) => {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE);
  if (!refreshToken?.value) {
    return redirectToMain(request);
  }

  try {
    const { exp } = jwtDecode<{ exp: number }>(refreshToken.value);
    if (exp * 1000 < Date.now()) {
      return redirectToMain(request, true);
    }
  } catch {
    return redirectToMain(request, true);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/form/:path*',
    '/notice/:path*',
    '/faq/:path*',
    '/message/:path*',
    '/fair/:path*',
    '/registration/:path*',
    '/analysis/:path*',
    '/schedule/:path*',
  ],
};
