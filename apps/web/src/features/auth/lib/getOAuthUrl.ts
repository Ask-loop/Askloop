import { AuthEndpoints } from '@/features/auth/api'
import { API_URL } from '@/shared/api/instance'
import { AuthProviders } from '@/shared/types'

export const getOAuthUrl = (provider: AuthProviders) => {
	return `${API_URL}${AuthEndpoints.ConnectOauth}/${provider}`
}
