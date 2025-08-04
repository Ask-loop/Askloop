import { motion } from 'framer-motion'
import { Check, Hash } from 'lucide-react'
import { useMemo } from 'react'
import { cn } from '@/shared/lib/utils'
import { Tag } from '@/shared/types/tag'

type TagRowProps = {
	tag: Tag
	onClick?: (tag: Tag) => void
	className?: string
	isSelected?: boolean
	disabled?: boolean
}

export const TagRow = ({
	tag,
	onClick,
	className,
	isSelected,
	disabled
}: TagRowProps) => {
	const formattedCount = useMemo(() => {
		if (!tag.usageCount) return '0'
		return tag.usageCount > 1000
			? `${(tag.usageCount / 1000).toFixed(1)}K`
			: tag.usageCount.toString()
	}, [tag.usageCount])

	const handleTagClick = () => {
		if (!disabled && onClick) {
			onClick(tag)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (!disabled && onClick && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault()
			onClick(tag)
		}
	}

	return (
		<div
			className={cn(
				'group relative flex items-center justify-between gap-2 rounded-md p-2 transition-all',
				'h-8 text-sm',
				onClick && !disabled && 'hover:bg-primary/10 cursor-pointer',
				isSelected && 'bg-primary/20 text-primary hover:bg-primary/30',
				disabled && 'cursor-not-allowed opacity-50',
				className
			)}
			onClick={handleTagClick}
			role={onClick && !disabled ? 'button' : undefined}
			tabIndex={onClick && !disabled ? 0 : undefined}
			onKeyDown={handleKeyDown}
			aria-disabled={disabled}
			aria-selected={isSelected}
		>
			<div className='flex min-w-0 flex-1 items-center gap-2 overflow-hidden'>
				<div
					className={cn(
						'flex items-center justify-center',
						'text-muted-foreground',
						isSelected && 'text-primary'
					)}
				>
					{isSelected ? (
						<Check className='h-3 w-3 flex-shrink-0' />
					) : (
						<Hash className='h-3 w-3 flex-shrink-0' />
					)}
				</div>

				<span
					className={cn(
						'truncate font-medium',
						isSelected ? 'text-primary' : 'text-foreground'
					)}
				>
					{tag.name}
				</span>
			</div>

			<span
				className={cn(
					'ml-2 text-xs whitespace-nowrap',
					isSelected ? 'text-primary/80' : 'text-muted-foreground'
				)}
			>
				{formattedCount}
			</span>
		</div>
	)
}
