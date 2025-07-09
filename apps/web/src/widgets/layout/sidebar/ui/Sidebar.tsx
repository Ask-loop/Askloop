'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/shadcn/ui'
import { menuItems } from '../config'
import { NavLink } from './NavLink'
import { ROUTES } from '@/constants'
import dictionary from '@/dictionary/en'

export const Sidebar = () => {
	return (
		<motion.aside
			className={cn(
				'bg-background sticky top-16 hidden h-full w-56 py-8 md:block'
			)}
		>
			<div className='flex flex-1 flex-col gap-4'>
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

					<div className='mt-10 flex flex-col gap-2 px-2'>
						<h3 className='text-sm font-medium'>
							{dictionary.needHelp}
						</h3>

						<p className='text-muted-foreground text-sm'>
							{dictionary.needHelpDescription}
						</p>

						<Button asChild>
							<Link href={ROUTES.ask}>
								{dictionary.askQuestion}
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</motion.aside>
	)
}
