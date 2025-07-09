'use client'

import { useTheme } from 'next-themes'
import { Toaster as SonnerToaster } from 'sonner'

export const Toaster = () => {
	const { theme } = useTheme()

	return (
		<SonnerToaster
			position='top-right'
			duration={5000}
			richColors
			closeButton
			theme={theme === 'dark' ? 'dark' : 'light'}
		/>
	)
}
