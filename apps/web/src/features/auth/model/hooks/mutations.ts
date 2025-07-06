import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import {
	toastCatchError,
	toastSuccess
} from '@/shared/utils/toast-message-handler'
import {
	requestPasswordReset,
	resetPassword,
	signIn,
	signUp,
	verifyEmail,
	logout
} from '../../api'
import { clearAuthCookie, setAuthCookie } from '../../lib'
import { AuthSchemaType, ResetPasswordSchemaType } from '../../lib/schema'
import { useAuthStore } from '../auth.store'
import { ResetPasswordReq, VerifyEmailReq } from '../types'
import { ROUTES } from '@/constants'

export const useSignIn = () => {
	const router = useRouter()

	const { mutate: signInMutation, isPending } = useMutation({
		mutationFn: (params: AuthSchemaType) => signIn(params),
		onSuccess: response => {
			setAuthCookie({
				accessToken: response.data.accessToken,
				refreshToken: response.data.refreshToken
			})

			router.push(ROUTES.home)
		},
		onError: error => {
			toastCatchError(error)
		}
	})

	return { signInMutation, isPending }
}

export const useSignUp = () => {
	const { mutate: signUpMutation, isPending } = useMutation({
		mutationFn: (params: AuthSchemaType) => signUp(params),
		onSuccess: response => {
			toastSuccess(response?.message)
		},
		onError: error => {
			toastCatchError(error)
		}
	})

	return { signUpMutation, isPending }
}

export const useVerifyEmail = () => {
	const router = useRouter()

	const { mutate: verifyEmailMutation } = useMutation({
		mutationFn: (params: VerifyEmailReq) => verifyEmail(params),
		onSuccess: response => {
			toastSuccess(response?.message)
			router.push(ROUTES.home)
		},
		onError: error => {
			router.push(ROUTES.signIn)
			toastCatchError(error)
		}
	})

	return { verifyEmailMutation }
}

export const useRequestPasswordReset = () => {
	const { mutate: requestPasswordResetMutation, isPending } = useMutation({
		mutationFn: (params: ResetPasswordSchemaType) =>
			requestPasswordReset(params),
		onSuccess: response => {
			toastSuccess(response?.message)
		},
		onError: error => {
			toastCatchError(error)
		}
	})

	return { requestPasswordResetMutation, isPending }
}

export const useResetPassword = () => {
	const router = useRouter()

	const { mutate: resetPasswordMutation, isPending } = useMutation({
		mutationFn: (params: ResetPasswordReq) => resetPassword(params),
		onSuccess: response => {
			toastSuccess(response?.message)
			router.push(ROUTES.signIn)
		},
		onError: error => {
			toastCatchError(error)
		}
	})

	return { resetPasswordMutation, isPending }
}

export const useLogout = () => {
	const router = useRouter()
	const signOut = useAuthStore(state => state.signOut)

	const { mutate: logoutMutation, isPending } = useMutation({
		mutationFn: () => logout(),
		onSuccess: async () => {
			await clearAuthCookie()

			signOut()

			router.replace(ROUTES.signIn)
		},
		onError: error => {
			toastCatchError(error)
		}
	})

	return { logoutMutation, isPending }
}
