import { axiosInstance } from '@/shared/api'
import { ApiResponse } from '@/shared/types'
import { AuthEndpoints } from '../lib/constants'
import { AuthSchemaType } from '../lib/schema'
import { AuthResponse, VerifyEmailReq } from '../model/types'

export const signIn = async (params: AuthSchemaType) => {
	const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
		AuthEndpoints.SignIn,
		params
	)

	return response
}

export const signUp = async (params: AuthSchemaType) => {
	const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
		AuthEndpoints.SignUp,
		params
	)

	return response
}

export const verifyEmail = async (params: VerifyEmailReq) => {
	const response = await axiosInstance.post<ApiResponse<null>>(
		AuthEndpoints.VerifyEmail,
		params
	)

	return response
}
