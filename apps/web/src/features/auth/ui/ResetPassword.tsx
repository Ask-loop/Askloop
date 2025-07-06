'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FormProvider, RHFInput } from '@/shared/form-controls'
import { Button } from '@/shared/shadcn/ui/button'
import { resetPasswordSchema } from '../lib/schema'
import { ResetPasswordSchemaType } from '../lib/schema'
import { useRequestPasswordReset } from '../model/hooks/mutations'
import { AuthWrapper } from './AuthWrapper'
import { ROUTES } from '@/constants/routes'
import dictionary from '@/dictionary/en'

export const ResetPassword = () => {
	const methods = useForm<ResetPasswordSchemaType>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const { requestPasswordResetMutation, isPending } =
		useRequestPasswordReset()

	const onSubmit = (data: ResetPasswordSchemaType) => {
		requestPasswordResetMutation(data)
	}

	return (
		<AuthWrapper
			title={dictionary.resetPassword.title}
			description={dictionary.resetPassword.description}
			linkLabel={dictionary.backToSignIn}
			link={{
				label: dictionary.signIn,
				href: ROUTES.signIn
			}}
		>
			<FormProvider
				className='flex flex-col gap-4'
				methods={methods}
				onSubmit={methods.handleSubmit(onSubmit)}
			>
				<RHFInput
					name='email'
					label={dictionary.resetPassword.email}
					placeholder={dictionary.resetPassword.email}
				/>

				<Button type='submit' isLoading={isPending}>
					{dictionary.resetPassword.sendResetLink}
				</Button>
			</FormProvider>
		</AuthWrapper>
	)
}
