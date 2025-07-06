import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import {
	toastCatchError,
	toastSuccess
} from '@/shared/utils/toast-message-handler'
import { signIn, signUp, verifyEmail } from '../../api'
import { setAuthCookie } from '../../lib'
import { AuthSchemaType } from '../../lib/schema'
import { VerifyEmailReq } from '../types'
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
