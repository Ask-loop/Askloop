export const PUBLIC_ROUTES = {
	home: '/',
	signIn: '/sign-in',
	signUp: '/sign-up',
	resetPassword: '/reset-password',
	questions: '/questions',
	tags: '/tags',
	users: '/users'
}

export const PROTECTED_ROUTES = {
	create: '/create',
	userProfile: '/user/:id/:slug',
	settings: '/settings',
	ask: '/ask'
}

export const PUBLIC_ROUTES_VALUES = Object.values(PUBLIC_ROUTES)
export const PROTECTED_ROUTES_VALUES = Object.values(PROTECTED_ROUTES)

export const ROUTES = {
	...PUBLIC_ROUTES,
	...PROTECTED_ROUTES
}
