'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { Spinner } from '@/shared/shadcn/ui'
import { useVerifyEmail } from '../model/hooks'
import { AuthWrapper } from './AuthWrapper'
import dictionary from '@/dictionary/en'

export const VerifyEmail = () => {
	const searchParams = useSearchParams()
	const verificationToken = searchParams.get('token') ?? ''

	const { verifyEmailMutation } = useVerifyEmail()

	useEffect(() => {
		verifyEmailMutation({
			verificationToken
		})
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
