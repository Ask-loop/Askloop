import React from 'react'
import { Container } from '@/shared/shadcn/ui/container'
import { Footer } from './footer/ui'
import { Header } from './header/ui'
import { Sidebar } from './sidebar/ui'

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='bg-background flex min-h-screen flex-col'>
			<Header />
			<Container className='flex h-full flex-1'>
				<Sidebar />
				<div className='flex-1 pt-4 pb-12 pl-4 md:pl-8'>{children}</div>
			</Container>
			<Footer />
		</main>
	)
}
