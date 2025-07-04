import { NextRequest, NextResponse } from 'next/server'
import { ROUTES, PUBLIC_ROUTES_VALUES } from './constants'
import { Cookies } from './constants/cookies'

export default function middleware(request: NextRequest) {
	const { nextUrl, cookies } = request
	const accessToken = cookies.get(Cookies.USER)?.value
	const url = nextUrl.clone()

	const isPublicPage = PUBLIC_ROUTES_VALUES.some(
		path => url.pathname === path || url.pathname.startsWith(`${path}/`)
	)

	// if (!accessToken && !isPublicPage) {
	// 	url.pathname = ROUTES.signIn

	// 	return NextResponse.redirect(url)
	// } else if (accessToken && isPublicPage) {
	// 	url.pathname = ROUTES.home

	// 	return NextResponse.redirect(url)
	// }

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
	]
}
