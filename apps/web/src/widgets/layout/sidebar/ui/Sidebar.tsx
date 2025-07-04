'use client'

import { motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/shadcn/ui/button'
import { menuItems } from '../config'
import { sidebarVariants } from '../config'
import { useSidebarStore } from '../model'
import { NavLink } from './NavLink'

export const Sidebar = () => {
	const { collapsed, toggle } = useSidebarStore()

	return (
		<motion.aside
			initial={collapsed ? 'closed' : 'open'}
			animate={collapsed ? 'closed' : 'open'}
			variants={sidebarVariants}
			className={cn(
				'bg-sidebar sticky top-16 h-[calc(100vh-8rem)] border-r'
			)}
		>
			<div className='flex flex-1 flex-col gap-4 p-2'>
				<Button
					variant='ghost'
					size='icon'
					className='ml-auto rounded-full'
					onClick={toggle}
					asChild
				>
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.95 }}
					>
						{collapsed ? (
							<ChevronRightIcon size={20} />
						) : (
							<ChevronLeftIcon size={20} />
						)}
					</motion.div>
				</Button>

				{!collapsed && (
					<div className='flex-1 overflow-y-auto'>
						<nav className='flex flex-col gap-2'>
							{menuItems.map(item => (
								<NavLink
									key={item.href}
									href={item.href}
									icon={item.icon}
									title={item.title}
								/>
							))}
						</nav>
					</div>
				)}
			</div>
		</motion.aside>
	)
}
