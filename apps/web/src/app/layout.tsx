import { type Metadata } from 'next'
import React from 'react'
import { Providers } from '@/providers/Providers'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: 'AskLoop',
	description:
		'AskLoop is a community platform for asking and answering questions.',
	icons: {
		icon: '/logo.svg'
	}
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
