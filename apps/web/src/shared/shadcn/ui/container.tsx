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
		<div className={cn('container mx-auto px-4', className)}>
			{children}
		</div>
	)
}
