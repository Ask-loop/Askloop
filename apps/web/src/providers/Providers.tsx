import { ReactNode } from 'react'
import { QueryProvider } from './QueryProvider'
import { ThemeProvider } from './ThemeProvider'
import { Toaster } from './Toaster'

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<QueryProvider>
			<Toaster />

			<ThemeProvider>{children}</ThemeProvider>
		</QueryProvider>
	)
}
