'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			retry: 1,
			staleTime: 1000 * 60 * 5 // 5 minutes
		}
	}
})

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	)
}
