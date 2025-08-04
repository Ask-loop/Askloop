export const PUBLIC_ROUTES = {
	home: '/',
	signIn: '/sign-in',
	signUp: '/sign-up',
	resetPassword: '/reset-password',
	explore: '/explore',
	question: '/questions/:slug',
	tags: '/tags',
	users: '/users',
	badges: '/badges',
	leaderboard: '/leaderboard',
	discussions: '/discussions',
	search: '/search',
	userProfile: '/user/:id/:slug'
}

export const PROTECTED_ROUTES = {
	create: '/create',
	settings: '/settings',
	ask: '/ask',
	notifications: '/notifications',
	profile: '/profile'
}

export const PUBLIC_ROUTES_VALUES = Object.values(PUBLIC_ROUTES)
export const PROTECTED_ROUTES_VALUES = Object.values(PROTECTED_ROUTES)

export const ROUTES = {
	...PUBLIC_ROUTES,
	...PROTECTED_ROUTES
}
