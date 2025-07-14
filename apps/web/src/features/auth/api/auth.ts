import {
	AuthSchemaType,
	ResetPasswordSchemaType,
	SignUpSchemaType
} from '@/features/auth/lib/schema'
import {
	AuthResponse,
	ResetPasswordReq,
	VerifyEmailReq
} from '@/features/auth/types'
import { axiosInstance } from '@/shared/api'
import { ApiResponse, User } from '@/shared/types'
import { AuthEndpoints } from './endpoints'

export const signIn = async (params: AuthSchemaType) => {
	const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
		AuthEndpoints.SignIn,
		params
	)

	return response
}

export const signUp = async (params: SignUpSchemaType) => {
	const response = await axiosInstance.post<ApiResponse<null>>(
		AuthEndpoints.SignUp,
		params
	)

	return response
}

export const verifyEmail = async (params: VerifyEmailReq) => {
	const response = await axiosInstance.post<ApiResponse<User>>(
		AuthEndpoints.VerifyEmail,
		params
	)

	return response
}

export const requestPasswordReset = async (params: ResetPasswordSchemaType) => {
	const response = await axiosInstance.post<ApiResponse<null>>(
		AuthEndpoints.RequestPasswordReset,
		params
	)

	return response
}

export const resetPassword = async (params: ResetPasswordReq) => {
	const response = await axiosInstance.post<ApiResponse<null>>(
		AuthEndpoints.ResetPassword,
		params
	)

	return response
}

export const logout = async () => {
	const response = await axiosInstance.post<ApiResponse<null>>(
		AuthEndpoints.SignOut
	)

	return response
}
