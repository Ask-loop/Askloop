'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
	FormProvider,
	RHFInput,
	RHFInputPassword
} from '@/shared/form-controls'
import { Spinner } from '@/shared/shadcn/ui'
import { Button } from '@/shared/shadcn/ui/button'
import { signUpSchema, SignUpSchemaType } from '../lib'
import { useSignUp } from '../model/hooks'
import { AuthWrapper } from './AuthWrapper'
import { ROUTES } from '@/constants'
import dictionary from '@/dictionary/en'

export const RegisterForm = () => {
	const methods = useForm({
		mode: 'onChange',
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	})

	const { signUpMutation, isPending } = useSignUp()

	const onSubmit = (data: SignUpSchemaType) => {
		signUpMutation(data)
	}

	return (
		<AuthWrapper
			title={dictionary.register.title}
			description={dictionary.register.description}
			link={{ href: ROUTES.signIn, label: dictionary.signIn }}
			linkLabel={dictionary.register.alreadyHaveAccount}
			withOAuth
		>
			<FormProvider
				fullWidth
				className='space-y-4'
				methods={methods}
				onSubmit={onSubmit}
			>
				<RHFInput
					name='displayName'
					label='Display name'
					placeholder='Your display name'
				/>

				<RHFInput
					name='email'
					label='Email address'
					placeholder='your@email.com'
				/>

				<RHFInputPassword
					name='password'
					label='Password'
					placeholder='••••••••'
				/>

				<RHFInputPassword
					name='confirmPassword'
					label='Confirm password'
					placeholder='••••••••'
				/>

				<Button
					type='submit'
					className='group w-full'
					disabled={!methods.formState.isValid || isPending}
					isLoading={isPending}
				>
					{dictionary.signUp}
					<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
				</Button>
			</FormProvider>
		</AuthWrapper>
	)
}
