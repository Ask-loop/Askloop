import { FaCog, FaComments, FaCompass, FaMedal, FaUsers } from 'react-icons/fa'
import { FaTag, FaTrophy } from 'react-icons/fa6'
import { HiHome } from 'react-icons/hi'
import { ROUTES } from '@/constants'

export const sidebarVariants = {
	open: { width: 256 },
	closed: { width: 64 }
}

export const menuItems = [
	{
		title: 'Home',
		icon: <HiHome className='size-5' />,
		href: ROUTES.home
	},
	{
		title: 'Explore',
		icon: <FaCompass className='size-5' />,
		href: ROUTES.explore
	},
	{
		title: 'Tags',
		icon: <FaTag className='size-5' />,
		href: ROUTES.tags
	},
	{
		title: 'Users',
		icon: <FaUsers className='size-5' />,
		href: ROUTES.users
	},
	{
		title: 'Badges',
		icon: <FaMedal className='size-5' />,
		href: ROUTES.badges
	},
	{
		title: 'Leaderboard',
		icon: <FaTrophy className='size-5' />,
		href: ROUTES.leaderboard
	},
	{
		title: 'Discussions',
		icon: <FaComments className='size-5' />,
		href: ROUTES.discussions
	},
	{
		title: 'Settings',
		icon: <FaCog className='size-5' />,
		href: ROUTES.settings
	}
]
