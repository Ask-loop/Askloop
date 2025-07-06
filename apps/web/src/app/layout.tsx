import { type Metadata } from 'next'
import React from 'react'
import './globals.css'
import { Provider } from './provider'

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
				<Provider>{children}</Provider>
			</body>
		</html>
	)
}
