'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FormProvider, RHFInputPassword } from '@/shared/form-controls'
import { Button } from '@/shared/shadcn/ui/button'
import { newPasswordSchema } from '../lib/schema'
import { NewPasswordSchemaType } from '../lib/schema'
import { useResetPassword } from '../model/hooks/mutations'
import { AuthWrapper } from './AuthWrapper'
import { ROUTES } from '@/constants/routes'
import dictionary from '@/dictionary/en'

export const NewPassword = () => {
	const searchParams = useSearchParams()
	const token = searchParams.get('token') ?? ''

	const methods = useForm<NewPasswordSchemaType>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			newPassword: ''
		}
	})

	const { resetPasswordMutation, isPending } = useResetPassword()

	const onSubmit = (data: NewPasswordSchemaType) => {
		resetPasswordMutation({
			newPassword: data.newPassword,
			token
		})
	}

	return (
		<AuthWrapper
			title={dictionary.newPassword.title}
			description={dictionary.newPassword.description}
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
				<RHFInputPassword
					name='newPassword'
					label={dictionary.newPassword.password}
				/>

				<Button type='submit' isLoading={isPending}>
					{dictionary.newPassword.setNewPassword}
				</Button>
			</FormProvider>
		</AuthWrapper>
	)
}
