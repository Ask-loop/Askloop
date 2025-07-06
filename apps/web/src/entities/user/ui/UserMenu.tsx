'use client'

import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { LogOutIcon, MoonIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useAuthStore } from '@/features/auth/model/auth.store'
import { useLogout } from '@/features/auth/model/hooks/mutations'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/shadcn/ui'
import { Switch } from '@/shared/shadcn/ui/switch'
import { UserAvatar } from './UserAvatar'
import { ROUTES } from '@/constants'

export const UserMenu = () => {
	const router = useRouter()
	const user = useAuthStore(state => state.user)
	const { theme, setTheme } = useTheme()
	const { logoutMutation, isPending } = useLogout()

	const handleLogout = () => {
		logoutMutation()
	}

	const handleProfile = () => {
		router.push(
			ROUTES.userProfile
				.replace(':id', user?.id.toString() || '')
				.replace(':slug', user?.email.split('@')[0] || '')
		)
	}

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	const handleToggleTheme = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		toggleTheme()
	}

	const fallback = useMemo(() => {
		if (!user) return ''

		return user.email?.charAt(0).toUpperCase()
	}, [user])

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className='cursor-pointer'>
				<UserAvatar src={user?.picture} fallback={fallback} />
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className='bg-background mt-2.5 border-none p-2'
				align='center'
			>
				<DropdownMenuGroup className='space-y-2'>
					<DropdownMenuItem
						asChild
						className='h-11 cursor-pointer font-semibold'
						onClick={handleProfile}
					>
						<div className='flex items-center gap-2'>
							<UserAvatar
								src={user?.picture}
								fallback={fallback}
							/>

							<div className='flex flex-col'>
								<p className='text-sm font-medium'>
									{user?.email}
								</p>
								<p className='text-muted-foreground text-sm'>
									Profile
								</p>
							</div>
						</div>
					</DropdownMenuItem>

					<DropdownMenuItem className='text-muted-foreground h-11'>
						<div
							onClick={handleToggleTheme}
							className='flex h-full w-full cursor-pointer items-center justify-between'
						>
							<div className='flex items-center gap-2'>
								<MoonIcon className='mr-2 h-4 w-4 text-inherit' />
								Black theme
							</div>

							<Switch
								checked={theme === 'dark'}
								onClick={handleToggleTheme}
							/>
						</div>
					</DropdownMenuItem>

					<DropdownMenuItem
						className='text-destructive flex h-11 cursor-pointer'
						onClick={handleLogout}
					>
						<LogOutIcon className='mr-2 h-4 w-4 text-inherit' />
						{isPending ? 'Logging out...' : 'Logout'}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
