'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			retry: 1
		}
	}
})

export const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster
				position='top-right'
				duration={5000}
				richColors
				closeButton
				theme='dark'
			/>

			{children}
		</QueryClientProvider>
	)
}
