'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Spinner } from '@/shared/shadcn/ui'
import { toastSuccess } from '@/shared/utils/toast-message-handler'
import { useAuthStore } from '../model/auth.store'
import { useVerifyEmail } from '../model/hooks'
import { AuthWrapper } from './AuthWrapper'
import { ROUTES } from '@/constants'
import dictionary from '@/dictionary/en'

export const VerifyEmail = () => {
	const searchParams = useSearchParams()
	const verificationToken = searchParams.get('token') ?? ''
	const setUser = useAuthStore(state => state.setUser)
	const router = useRouter()
	const { verifyEmailMutation } = useVerifyEmail()

	useEffect(() => {
		verifyEmailMutation(
			{
				verificationToken
			},
			{
				onSuccess: async response => {
					setUser(response.data)

					toastSuccess(response.message)

					router.push(ROUTES.home)
				}
			}
		)
	}, [verificationToken])

	return (
		<AuthWrapper
			title={dictionary.verifyEmail.title}
			description={dictionary.verifyEmail.description}
		>
			<div className='flex items-center justify-center'>
				<Spinner />
			</div>
		</AuthWrapper>
	)
}
