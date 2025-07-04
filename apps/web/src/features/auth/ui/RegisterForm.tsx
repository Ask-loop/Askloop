'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {
	FormProvider,
	RHFInput,
	RHFInputPassword
} from '@/shared/form-controls'
import { Button } from '@/shared/shadcn/ui/button'
import { authSchema } from '../lib'
import { AuthWrapper } from './AuthWrapper'
import { ROUTES } from '@/constants'
import dictionary from '@/dictionary/en'

export const RegisterForm = () => {
	const router = useRouter()
	const methods = useForm({
		mode: 'onChange',
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = async (data: any) => {
		try {
			console.log(data)
			router.push('/')
		} catch (error) {
			console.error('Login failed:', error)
		}
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
					name='email'
					label='Email address'
					placeholder='your@email.com'
				/>

				<RHFInputPassword
					name='password'
					label='Password'
					placeholder='••••••••'
				/>

				<Button
					type='submit'
					className='group w-full'
					disabled={!methods.formState.isValid}
				>
					Sign in
					<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
				</Button>
			</FormProvider>
		</AuthWrapper>
	)
}
