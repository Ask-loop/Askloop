import { AuthProviders } from '@/shared/types'
import { AuthEndpoints } from './constants'

export const getOAuthUrl = (provider: AuthProviders) => {
	return `${process.env.NEXT_PUBLIC_API_URL}${AuthEndpoints.ConnectOauth}/${provider}`
}
