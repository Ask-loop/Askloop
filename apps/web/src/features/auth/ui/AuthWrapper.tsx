import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Button } from '@/shared/shadcn/ui/button'
import { AskLoopLogo } from '@/shared/ui/Logo'
import { OAuthButtons } from './OAuthButtons'

type AuthWrapperProps = {
	children: ReactNode
	withOAuth?: boolean
	title: string
	description: string
	linkLabel?: string
	link?: {
		href: string
		label: string
	}
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2
		}
	}
}

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.4
		}
	}
}

export const AuthWrapper = ({
	children,
	withOAuth,
	title,
	description,
	link,
	linkLabel
}: AuthWrapperProps) => {
	return (
		<div className='from-background/95 to-muted/30 flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4'>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className='mb-8'
			>
				<AskLoopLogo notLink />
			</motion.div>

			<motion.div
				initial='hidden'
				animate='visible'
				variants={containerVariants}
				className='border-border bg-card/80 w-full max-w-md space-y-4 rounded-lg border p-6 shadow-sm backdrop-blur-sm'
			>
				<motion.div variants={itemVariants} className='text-center'>
					<h1 className='text-foreground text-3xl font-bold tracking-tight'>
						{title}
					</h1>
					<p className='text-muted-foreground mt-2 text-sm'>
						{description}
					</p>
				</motion.div>

				{withOAuth && <OAuthButtons />}

				{children}

				<motion.div
					variants={itemVariants}
					className='text-muted-foreground text-center text-sm'
				>
					{linkLabel || ''}
					{link && (
						<Button
							variant='link'
							size='sm'
							className='text-primary hover:text-primary/80 px-1'
							asChild
						>
							<Link href={link.href}>{link.label}</Link>
						</Button>
					)}
				</motion.div>
			</motion.div>
		</div>
	)
}
