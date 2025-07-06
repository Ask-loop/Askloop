export const enum AuthEndpoints {
	SignIn = '/auth/sign-in',
	SignUp = '/auth/sign-up',
	VerifyEmail = '/auth/verify-email',
	RequestPasswordReset = '/auth/request-password-reset',
	ResetPassword = '/auth/reset-password',
	ChangePassword = '/auth/change-password',
	SignOut = '/auth/sign-out',
	RefreshTokens = '/auth/refresh-tokens',
	DeleteAccount = '/auth/delete-account',
	ConnectOauth = '/auth/oauth/connect',
	GetUser = '/users/me'
}
