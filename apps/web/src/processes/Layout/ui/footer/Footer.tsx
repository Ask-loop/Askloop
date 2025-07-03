import { Container } from '@/shared/shadcn/ui/container'

export const Footer = () => {
	return (
		<footer className='bg-background/50 border-t py-6 backdrop-blur-lg h-16'>
			<Container>
				<div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
					<p className='text-muted-foreground text-sm'>
						© 2025 AskLoop. All rights reserved.
					</p>
				</div>
			</Container>
		</footer>
	)
}
