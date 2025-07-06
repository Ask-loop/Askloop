import { User } from '@/shared/types'

export type Tokens = {
	accessToken: string
	refreshToken: string
}

export type AuthResponse = Tokens & {
	user: User
}

export type VerifyEmailReq = {
	verificationToken: string
}
