import { HomeIcon, ListIcon, TagIcon, UsersIcon } from 'lucide-react'
import { ROUTES } from '@/constants'

export const sidebarVariants = {
	open: { width: 256 },
	closed: { width: 64 }
}

export const menuItems = [
	{
		title: 'Home',
		icon: <HomeIcon />,
		href: ROUTES.home
	},
	{
		title: 'All Questions',
		icon: <ListIcon />,
		href: ROUTES.questions
	},
	{
		title: 'Tags',
		icon: <TagIcon />,
		href: ROUTES.tags
	},
	{
		title: 'Users',
		icon: <UsersIcon />,
		href: ROUTES.users
	}
]
