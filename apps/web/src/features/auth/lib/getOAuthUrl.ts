import { AuthEndpoints } from '@/features/auth/api'
import { AuthProviders } from '@/shared/types'

export const getOAuthUrl = (provider: AuthProviders) => {
	return `${process.env.NEXT_PUBLIC_API_URL}${AuthEndpoints.ConnectOauth}/${provider}`
}
