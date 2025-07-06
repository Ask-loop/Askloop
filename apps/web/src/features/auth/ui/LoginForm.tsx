'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Link } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
	FormProvider,
	RHFInput,
	RHFInputPassword
} from '@/shared/form-controls'
import { Spinner } from '@/shared/shadcn/ui'
import { Button } from '@/shared/shadcn/ui/button'
import { authSchema, AuthSchemaType } from '../lib'
import { useAuthStore } from '../model/auth.store'
import { useSignIn } from '../model/hooks'
import { AuthWrapper } from './AuthWrapper'
import { ROUTES } from '@/constants'
import dictionary from '@/dictionary/en'

export const LoginForm = () => {
	const setUser = useAuthStore(state => state.setUser)

	const methods = useForm({
		mode: 'onChange',
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const { signInMutation, isPending } = useSignIn()

	const onSubmit = (data: AuthSchemaType) => {
		signInMutation(data, {
			onSuccess: response => {
				setUser(response.data.user)
			}
		})
	}

	return (
		<AuthWrapper
			title={dictionary.login.title}
			description={dictionary.login.description}
			link={{ href: ROUTES.signUp, label: dictionary.signUp }}
			linkLabel={dictionary.login.dontHaveAccount}
			withOAuth
		>
			<FormProvider
				fullWidth
				className='space-y-4'
				methods={methods}
				onSubmit={onSubmit}
			>
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

				<div className='flex justify-end'>
					<Button
						variant='link'
						size='sm'
						className='text-primary hover:text-primary/80 text-sm'
						asChild
					>
						<Link href={ROUTES.forgotPassword}>
							Forgot password?
						</Link>
					</Button>
				</div>

				<Button
					type='submit'
					className='group w-full'
					disabled={!methods.formState.isValid}
				>
					{isPending ? (
						<Spinner className='text-white' size={20} />
					) : (
						<>
							{dictionary.signIn}
							<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
						</>
					)}
				</Button>
			</FormProvider>
		</AuthWrapper>
	)
}
