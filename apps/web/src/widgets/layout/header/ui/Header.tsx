'use client'

import { BellIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '@/features/auth/model/auth.store'
import { Input } from '@/shared/shadcn/ui'
import { Button } from '@/shared/shadcn/ui/button'
import { Container } from '@/shared/shadcn/ui/container'
import { AskLoopLogo } from '@/shared/ui/Logo'
import { ROUTES } from '@/constants/routes'
import { UserMenu } from '@/entities/user/ui'

export const Header = () => {
	const { isAuthenticated, user } = useAuthStore(
		useShallow(state => ({
			isAuthenticated: state.isAuthenticated,
			user: state.user
		}))
	)

	return (
		<header className='bg-card sticky top-0 z-10 h-16 border-b'>
			<Container className='flex h-full items-center justify-between'>
				<div className='flex items-center gap-4'>
					<AskLoopLogo />

					<Input
						className='hidden w-96 md:block'
						placeholder='Search in AskLoop'
					/>
				</div>

				<div className='flex items-center gap-2'>
					{isAuthenticated ? (
						<>
							<Link href={ROUTES.ask}>
								<Button
									variant='default'
									className='hidden sm:inline-flex'
								>
									<PlusIcon className='mr-1 h-4 w-4' />
									<span>Ask Question</span>
								</Button>
							</Link>

							<Button
								variant='ghost'
								size='icon'
								aria-label='Notifications'
							>
								<BellIcon className='h-5 w-5' />
							</Button>

							<UserMenu />
						</>
					) : (
						<>
							<Link href={ROUTES.signIn}>
								<Button variant='ghost'>
									<span>Sign in</span>
								</Button>
							</Link>

							<Link href={ROUTES.signUp}>
								<Button asChild variant='default'>
									<span>Sign up</span>
								</Button>
							</Link>
						</>
					)}
				</div>
			</Container>
		</header>
	)
}
