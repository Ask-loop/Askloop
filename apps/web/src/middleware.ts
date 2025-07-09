import { NextRequest, NextResponse } from 'next/server'
import { ROUTES, PUBLIC_ROUTES_VALUES } from './constants'
import { Cookies } from './constants/cookies'

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const accessToken = request.cookies.get(Cookies.USER)?.value

	const url = request.nextUrl.clone()
	const isPublicPage = PUBLIC_ROUTES_VALUES.some(
		route =>
			pathname.startsWith(route) ||
			PUBLIC_ROUTES_VALUES.includes(pathname)
	)

	if (!accessToken && !isPublicPage) {
		url.pathname = ROUTES.signIn

		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
	]
}
