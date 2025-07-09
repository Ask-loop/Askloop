import React from 'react'
import { cn } from '@/shared/lib/utils'

export const Container = ({
	children,
	className
}: {
	children: React.ReactNode
	className?: string
}) => {
	return (
		<div
			className={cn(
				'mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8',
				className
			)}
		>
			{children}
		</div>
	)
}
