import { NextRequest, NextResponse } from 'next/server'
import { ROUTES, PUBLIC_ROUTES_VALUES } from './constants'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const accessToken = request.cookies.get('user')?.value
	const url = request.nextUrl.clone()
	const isPublicRoute = PUBLIC_ROUTES_VALUES.some(route =>
		pathname.startsWith(route)
	)

	if (!accessToken && !isPublicRoute) {
		url.pathname = ROUTES.signIn

		return NextResponse.redirect(url)
	} else if (accessToken && isPublicRoute) {
		url.pathname = ROUTES.home

		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
