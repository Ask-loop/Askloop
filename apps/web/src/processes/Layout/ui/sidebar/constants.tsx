import { HomeIcon, TagIcon } from 'lucide-react'

export const sidebarVariants = {
	open: { width: 256 },
	closed: { width: 64 }
}

export const menuItems = [
	{
		title: 'Home',
		icon: <HomeIcon />,
		href: '/'
	},
	{
		title: 'Tags',
		icon: <TagIcon />,
		href: '/tags'
	}
]
