import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import {
	requestPasswordReset,
	resetPassword,
	signIn,
	signUp,
	verifyEmail,
	logout
} from '@/features/auth/api'
import { clearAuthCookie, setAuthCookie } from '@/features/auth/lib'
import {
	AuthSchemaType,
	ResetPasswordSchemaType
} from '@/features/auth/lib/schema'
import { useAuthStore } from '@/features/auth/model/auth.store'
import { ResetPasswordReq, VerifyEmailReq } from '@/features/auth/types'
import {
	toastCatchError,
	toastSuccess
} from '@/shared/utils/toast-message-handler'
import { ROUTES } from '@/constants'

export const useSignIn = () => {
	const router = useRouter()

	const { mutate: signInMutation, isPending } = useMutation({
		mutationFn: (params: AuthSchemaType) => signIn(params),
		onSuccess: async response => {
			const { accessToken, refreshToken } = response.data

			await setAuthCookie({
				accessToken,
				refreshToken
			})

			router.push(ROUTES.home)
		},
		onError: toastCatchError
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
