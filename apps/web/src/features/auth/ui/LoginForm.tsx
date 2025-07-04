'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowRight, Link } from 'lucide-react'
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

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2
		}
	}
}

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 10
		}
	}
}

export const LoginForm = () => {
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
						<a href='/forgot-password'>Forgot password?</a>
					</Button>
				</div>

				<Button
					type='submit'
					className='group w-full'
					disabled={!methods.formState.isValid}
				>
					{dictionary.signIn}
					<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
				</Button>
			</FormProvider>
		</AuthWrapper>
	)
}
