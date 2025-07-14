'use client'

import { motion } from 'framer-motion'
import { LoaderCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/shared/shadcn/ui/card'
import { toastCatchError } from '@/shared/utils/toast-message-handler'
import { useAuthStore } from '../model/auth.store'
import { ROUTES } from '@/constants/routes'

export const OAuthSuccess = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const setUser = useAuthStore(state => state.setUser)

	const userParam = searchParams.get('user')

	const handleOAuthSuccess = async () => {
		if (!userParam) {
			toastCatchError('Invalid OAuth response')
			return
		}

		try {
			const user = JSON.parse(decodeURIComponent(userParam))

			setUser(user)

			router.replace(ROUTES.home)
		} catch {
			toastCatchError('Invalid OAuth response')
		}
	}

	useEffect(() => {
		handleOAuthSuccess()
	}, [])

	return (
		<motion.div
			className='bg-background flex min-h-screen items-center justify-center'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<Card className='w-full max-w-md rounded-2xl p-6 shadow-xl'>
				<CardHeader className='text-center'>
					<CardTitle>Signing you in...</CardTitle>
				</CardHeader>
				<CardContent className='text-muted-foreground flex items-center justify-center gap-2'>
					<motion.div
						animate={{ rotate: 360 }}
						transition={{
							repeat: Infinity,
							duration: 1.5,
							ease: 'linear'
						}}
					>
						<LoaderCircle className='h-6 w-6 animate-spin' />
					</motion.div>
					<span>Please wait a moment</span>
				</CardContent>
			</Card>
		</motion.div>
	)
}
