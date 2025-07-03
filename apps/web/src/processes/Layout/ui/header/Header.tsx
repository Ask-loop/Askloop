import { BellIcon, MessageCircleIcon, PlusIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/shadcn/ui/avatar'
import { Button } from '@/shared/shadcn/ui/button'
import { Input } from '@/shared/shadcn/ui/input'
import { ROUTES } from '@/constants/routes'

export const AskLoopLogo = () => (
	<Link href={ROUTES.home} className='flex items-center gap-2'>
		<MessageCircleIcon className='h-5 w-5' />
		<span className='text-base font-bold'>AskLoop</span>
	</Link>
)

export const Header = () => {
	const isAuthenticated = false

	return (
		<header className='bg-background sticky top-0 z-10 h-16 border-b px-4 py-2'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<AskLoopLogo />

					<Input
						icon={<SearchIcon className='h-4 w-4' />}
						type='text'
						placeholder='Search in AskLoop'
						className='hidden w-96 md:block'
					/>
				</div>

				<div className='flex items-center gap-2'>
					{isAuthenticated ? (
						<>
							<Button
								variant='outline'
								className='hidden rounded-full sm:inline-flex'
							>
								<PlusIcon className='mr-1 h-4 w-4' />
								<span>Ask Question</span>
							</Button>

							<Button
								variant='ghost'
								size='icon'
								aria-label='Notifications'
							>
								<BellIcon className='h-5 w-5' />
							</Button>

							<Button
								variant='ghost'
								size='icon'
								aria-label='User menu'
							>
								<Avatar className='h-8 w-8'>
									<AvatarImage
										src='https://github.com/shadcn.png'
										alt='@user'
									/>
									<AvatarFallback>U</AvatarFallback>
								</Avatar>
							</Button>
						</>
					) : (
						<>
							<Link href={ROUTES.login}>
								<Button variant='ghost'>
									<span>Sign in</span>
								</Button>
							</Link>

							<Link href={ROUTES.register}>
								<Button asChild variant='default'>
									<span>Sign up</span>
								</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	)
}
