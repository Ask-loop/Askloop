import { Container } from '@/shared/shadcn/ui/container'
import { Footer } from './footer/ui'
import { Header } from './header/ui'
import { Sidebar } from './sidebar/ui'

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className='bg-background flex min-h-screen flex-col'>
			<Header />
			<div className='flex h-full flex-1'>
				<Sidebar />
				<Container className='flex-1'>{children}</Container>
			</div>
			<Footer />
		</main>
	)
}
