'use client'

import { cn } from '@/shared/lib/utils'
import { Badge } from '@/shared/shadcn/ui'
import { Tag } from '@/shared/types/tag'

type TagListProps = {
	tags: Tag[]
	onTagClick?: (tag: Tag) => void
	variant?: 'default' | 'secondary' | 'outline'
	className?: string
}

export const TagList = ({
	tags,
	onTagClick,
	variant = 'outline',
	className
}: TagListProps) => {
	return (
		<div className={cn('flex flex-wrap gap-2', className)}>
			{tags.map(tag => (
				<Badge
					key={tag.id}
					variant={variant}
					className={cn(
						'text-xs transition-colors',
						onTagClick && 'hover:bg-secondary/80 cursor-pointer'
					)}
					onClick={onTagClick?.bind(null, tag)}
				>
					{tag.name}
				</Badge>
			))}
		</div>
	)
}
