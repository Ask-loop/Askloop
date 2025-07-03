'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib/utils'

type NavLinkProps = {
	href: string
	icon: React.ReactNode | null
	title: string | null
}

export const NavLink = ({ href, icon, title }: NavLinkProps) => {
	const pathname = usePathname()
	const isActive = pathname === href || pathname.startsWith(`${href}/`)

	return (
		<Link
			href={href}
			tabIndex={0}
			className={cn(
				'group flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 outline-none',
				isActive
					? 'bg-primary/15 text-primary font-bold'
					: 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
				'focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2'
			)}
		>
			<motion.span
				initial={{ opacity: 0, x: 8 }}
				animate={{
					opacity: 1,
					x: 0,
					transition: { duration: 0.2 }
				}}
				exit={{ opacity: 0, x: 8 }}
			>
				{icon}
			</motion.span>

			<AnimatePresence>
				{title && (
					<motion.span
						initial={{ opacity: 0, x: 8 }}
						animate={{
							opacity: 1,
							x: 0,
							transition: { duration: 0.2 }
						}}
						exit={{ opacity: 0, x: 8 }}
						className='truncate text-sm font-medium'
					>
						{title}
					</motion.span>
				)}
			</AnimatePresence>
		</Link>
	)
}
